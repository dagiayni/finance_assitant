const express = require('express');
const router = express.Router();
const bot = require('../services/telegramBot');
const { extractReceiptData } = require('../services/receiptExtractor');
const Receipt = require('../models/receiptsSheets');
const config = require('../config/env');
const logger = require('../config/logger');

// POST /telegram/webhook
router.post('/webhook', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.sendStatus(200);

    const chatId = message.chat.id;
    const telegramId = message.from.id.toString();

    // 1. Find or "Mock" user for Sheets MVP
    // In production, you'd check a real User table
    const userName = message.from.first_name || 'Business Owner';

    // 3. Handle commands
    if (message.text === '/start') {
      const welcomeText = `<b>Welcome to Habesha Finance Assistant!</b>\n\nI'm your AI-powered financial companion. Snap a photo of a receipt, and I'll track your expenses automatically.\n\nClick the button below to open your dashboard:`;
      
      const replyMarkup = {
        inline_keyboard: [
          [
            {
              text: "🚀 Open Finance Dashboard",
              web_app: { url: config.frontendUrl }
            }
          ]
        ]
      };

      await bot.sendMessage(chatId, welcomeText, replyMarkup);
      return res.sendStatus(200);
    }

    // 2. Handle photos
    if (message.photo) {
      const fileId = message.photo[message.photo.length - 1].file_id;
      await bot.sendMessage(chatId, "Processing your receipt... ⏳");
      
      try {
        const imageBase64 = await bot.getFile(fileId);
        const extractedData = await extractReceiptData(imageBase64);
        
        // Save to Google Sheets
        const receipt = await Receipt.create({
          uploaded_by: telegramId,
          type: 'expense',
          vendor_name: extractedData.vendor_name,
          vendor_tin: extractedData.vendor_tin,
          date: extractedData.date,
          total_amount: extractedData.total_amount,
          currency: extractedData.currency,
          raw_ocr_text: extractedData.raw_ocr_text,
          confidence: extractedData.confidence,
          status: 'pending'
        });

        const successText = `✅ <b>Receipt processed!</b>\n\n<b>Vendor:</b> ${receipt.vendor_name}\n<b>Amount:</b> ${receipt.total_amount} ${receipt.currency}\n\nPlease review and approve it in the Mini App.`;
        
        const successMarkup = {
          inline_keyboard: [[{ text: "📝 Review in App", web_app: { url: `${config.frontendUrl}/upload` } }]]
        };

        await bot.sendMessage(chatId, successText, successMarkup);
      } catch (err) {
        logger.error('Error processing photo from Telegram:', err);
        await bot.sendMessage(chatId, "❌ Sorry, I couldn't process that receipt. Please try again or upload it directly in the app.");
      }
    }

    res.sendStatus(200);
  } catch (err) {
    logger.error('Telegram Webhook Error:', err);
    res.sendStatus(200); // Always respond 200 to Telegram to prevent retries
  }
});

module.exports = router;
