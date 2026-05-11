const express = require('express');
const router = express.Router();
const { authMiddleware, ownerOnly } = require('../middleware/auth');
const Receipt = require('../models/receiptsSheets');
const { extractReceiptData } = require('../services/receiptExtractor');
const logger = require('../config/logger');

// POST /api/receipts/upload
router.post('/upload', authMiddleware, async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ error: 'Missing imageBase64' });

    // Step 1 & 2: OCR + AI Extraction
    const extractedData = await extractReceiptData(imageBase64);
    
    // Step 4: Classify (Simplified for Sheets MVP)
    const type = 'expense'; // Default to expense if no master TIN comparison for now
    
    // Step 5: Save to Google Sheets
    const receipt = await Receipt.create({
      uploaded_by: req.user.telegram_id, // Use telegram_id for Sheets MVP
      type,
      vendor_name: extractedData.vendor_name,
      vendor_tin: extractedData.vendor_tin,
      date: extractedData.date,
      total_amount: extractedData.total_amount,
      currency: extractedData.currency,
      raw_ocr_text: extractedData.raw_ocr_text,
      confidence: extractedData.confidence,
      status: 'pending'
    });

    res.json({
      receiptId: receipt.id,
      vendor_name: receipt.vendor_name,
      vendor_tin: receipt.vendor_tin,
      total_amount: receipt.total_amount,
      type: receipt.type,
      confidence: receipt.confidence,
      needsReview: (receipt.confidence || 0) < 0.75
    });
  } catch (err) {
    logger.error('Upload Route Error:', err);
    res.status(500).json({ error: 'Failed to process receipt', details: err.message });
  }
});

// POST /api/receipts/:id/approve
router.post('/:id/approve', authMiddleware, ownerOnly, async (req, res) => {
  try {
    const { corrections } = req.body;
    const receiptId = req.params.id;

    const receipt = await Receipt.updateStatus(receiptId, {
      status: 'approved',
      approved_by: req.user.id,
      corrections
    });

    // TODO: Google Drive upload, Pinecone embedding, Telegram notification (placeholder services for now)
    
    res.json({ receipt });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed', details: err.message });
  }
});

// GET /api/receipts
router.get('/', authMiddleware, async (req, res) => {
  try {
    const receipts = await Receipt.list({
      business_id: req.user.business_id,
      ...req.query
    });
    res.json({ receipts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch receipts' });
  }
});

module.exports = router;
