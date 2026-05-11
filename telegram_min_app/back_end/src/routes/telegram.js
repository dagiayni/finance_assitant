const express = require('express');
const router = express.Router();
const bot = require('../services/telegramBot');
const User = require('../models/users');
const { extractReceiptData } = require('../services/receiptExtractor');
const Receipt = require('../models/receipts');
const Business = require('../models/businesses');
const logger = require('../config/logger');

// POST /telegram/webhook
router.post('/webhook', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.sendStatus(200);

    const chatId = message.chat.id;
    const telegramId = message.from.id.toString();

    // 1. Find user
    const user = await User.findByTelegramId(telegramId);
    if (!user) {
      await bot.sendMessage(chatId, "Welcome! Please open the Mini App to set up your account.");
      return res.sendStatus(200);
    }

    // 2. Handle photos
    if (message.photo) {
      const fileId = message.photo[message.photo.length - 1].file_id;
      await bot.sendMessage(chatId, "Processing your receipt... ⏳");
      
      const imageBase64 = await bot.getFile(fileId);
      const extractedData = await extractReceiptData(imageBase64);
      
      const business = await Business.findById(user.business_id);
      const type = extractedData.vendor_tin === business.master_tin ? 'income' : 'expense';

      const receipt = await Receipt.create({
        business_id: user.business_id,
        uploaded_by: user.id,
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

      await bot.sendMessage(chatId, `✅ Receipt processed!\n\n<b>Vendor:</b> ${receipt.vendor_name}\n<b>Amount:</b> ${receipt.total_amount} ${receipt.currency}\n<b>Type:</b> ${receipt.type}\n\nPlease approve this in the Mini App.`);
    }

    // 3. Handle commands
    if (message.text === '/start') {
      await bot.sendMessage(chatId, `Hello ${user.name}! Use the Mini App button below to manage your finances.`);
    }

    res.sendStatus(200);
  } catch (err) {
    logger.error('Telegram Webhook Error:', err);
    res.sendStatus(200); // Always respond 200 to Telegram to prevent retries
  }
});

module.exports = router;
