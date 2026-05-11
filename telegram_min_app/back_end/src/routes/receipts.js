const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { extractReceiptData } = require('../services/receiptExtractor');
const { upsertReceipt } = require('../services/pinecone');
const bot = require('../services/telegramBot');
const config = require('../config/env');
const logger = require('../config/logger');
const { v4: uuidv4 } = require('uuid');

// POST /api/receipts/upload
router.post('/upload', authMiddleware, async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) return res.status(400).json({ error: 'Missing imageBase64' });

    // Step 1 & 2: OCR + AI Extraction
    const extractedData = await extractReceiptData(imageBase64);
    
    // Return data for front-end to display/edit
    res.json({
      id: uuidv4(),
      vendor_name: extractedData.vendor_name,
      vendor_tin: extractedData.vendor_tin,
      total_amount: extractedData.total_amount,
      currency: extractedData.currency || 'ETB',
      date: extractedData.date,
      items: extractedData.items || [],
      raw_ocr_text: extractedData.raw_ocr_text,
      confidence: extractedData.confidence,
      type: 'expense',
      needsReview: (extractedData.confidence || 0) < 0.75
    });
  } catch (err) {
    logger.error('Upload Route Error:', err);
    res.status(500).json({ error: 'Failed to process receipt', details: err.message });
  }
});

// POST /api/receipts/approve
router.post('/approve', authMiddleware, async (req, res) => {
  try {
    const receiptData = req.body; // Full data from front-end
    
    // 1. Save to Pinecone
    await upsertReceipt({
      ...receiptData,
      status: 'approved',
      approved_by: req.user.telegram_id,
      approved_at: new Date().toISOString()
    });

    // 2. Notify Telegram Group
    if (config.telegramGroupId) {
      const message = `🔔 <b>New Approved Receipt</b>\n\n` +
                      `<b>Vendor:</b> ${receiptData.vendor_name}\n` +
                      `<b>Amount:</b> ${receiptData.total_amount} ${receiptData.currency}\n` +
                      `<b>Date:</b> ${receiptData.date}\n` +
                      `<b>Type:</b> ${receiptData.type}\n` +
                      `<b>Approved By:</b> ${req.user.name || req.user.telegram_id}`;
      
      await bot.sendMessage(config.telegramGroupId, message);
    }

    res.json({ success: true, message: 'Receipt approved and saved to Pinecone' });
  } catch (err) {
    logger.error('Approval Error:', err);
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
