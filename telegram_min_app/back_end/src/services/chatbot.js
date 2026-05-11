const axios = require('axios');
const config = require('../config/env');
const logger = require('../config/logger');
const { query } = require('../config/database');

const answerFinancialQuery = async (businessId, userQuery) => {
  try {
    // 1. Fetch relevant receipts (For MVP, we fetch recent ones to provide context)
    // In production, this would use Pinecone vector search
    const { rows: contextReceipts } = await query(
      `SELECT vendor_name, date, total_amount, type FROM receipts 
       WHERE business_id = $1 AND status = 'approved' 
       ORDER BY date DESC LIMIT 20`,
      [businessId]
    );

    const contextText = contextReceipts.map(r => 
      `${r.date}: ${r.vendor_name} - ${r.total_amount} ETB (${r.type})`
    ).join('\n');

    const prompt = `
      You are a financial assistant for a Habesha business owner. 
      Answer the user's question based on their recent receipts.
      
      Recent Receipts:
      ${contextText}
      
      Question: ${userQuery}
    `;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'Authorization': `Bearer ${config.groqApiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    logger.error('Chat Service Error:', err.message);
    throw err;
  }
};

module.exports = {
  answerFinancialQuery,
};
