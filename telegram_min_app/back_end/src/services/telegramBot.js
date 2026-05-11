const axios = require('axios');
const config = require('../config/env');
const logger = require('../config/logger');

const sendMessage = async (chatId, text) => {
  try {
    await axios.post(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML'
    });
  } catch (err) {
    logger.error('Telegram sendMessage Error:', err.message);
  }
};

const sendPhoto = async (chatId, photoUrl, caption) => {
  try {
    await axios.post(`https://api.telegram.org/bot${config.telegramBotToken}/sendPhoto`, {
      chat_id: chatId,
      photo: photoUrl,
      caption: caption,
      parse_mode: 'HTML'
    });
  } catch (err) {
    logger.error('Telegram sendPhoto Error:', err.message);
  }
};

const getFile = async (fileId) => {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${config.telegramBotToken}/getFile?file_id=${fileId}`);
    const filePath = response.data.result.file_path;
    const downloadUrl = `https://api.telegram.org/file/bot${config.telegramBotToken}/${filePath}`;
    
    // Download and convert to base64
    const fileResponse = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
    return Buffer.from(fileResponse.data, 'binary').toString('base64');
  } catch (err) {
    logger.error('Telegram getFile Error:', err.message);
    throw err;
  }
};

module.exports = {
  sendMessage,
  sendPhoto,
  getFile,
};
