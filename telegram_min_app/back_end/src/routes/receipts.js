const express = require('express');
const router = express.Router();
const { authMiddleware, ownerOnly } = require('../middleware/auth');
const Receipt = require('../models/receipts');
const Business = require('../models/businesses');
const { extractReceiptData } = require('../services/receiptExtractor');
const logger = require('../config/logger');

// POST /api/receipts/upload
router.post('/upload', authMiddleware, async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ error: 'Missing imageBase64' });

    // Step 1 & 2: OCR + AI Extraction
    const extractedData = await extractReceiptData(imageBase64);
    
    // Step 3: Fetch business to compare TIN
    const business = await Business.findById(req.user.business_id);
    
    // Step 4: Classify based on TIN
    const type = extractedData.vendor_tin === business.master_tin ? 'income' : 'expense';
    
    // Step 5: Save as pending
    const receipt = await Receipt.create({
      business_id: req.user.business_id,
      uploaded_by: req.user.id,
      type,
      vendor_name: extractedData.vendor_name,
      vendor_tin: extractedData.vendor_tin,
      date: extractedData.date,
      total_amount: extractedData.total_amount,
      currency: extractedData.currency,
      tax: extractedData.tax,
      subtotal: extractedData.subtotal,
      raw_ocr_text: extractedData.raw_ocr_text,
      confidence: extractedData.confidence,
      status: 'pending'
    }, extractedData.items);

    res.json({
      receiptId: receipt.id,
      vendor_name: receipt.vendor_name,
      vendor_tin: receipt.vendor_tin,
      total_amount: receipt.total_amount,
      type: receipt.type,
      confidence: receipt.confidence,
      needsReview: receipt.confidence < 0.75
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
