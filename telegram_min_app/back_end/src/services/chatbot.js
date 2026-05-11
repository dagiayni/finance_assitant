const axios = require('axios');
const config = require('../config/env');
const logger = require('../config/logger');
const { queryReceipts } = require('./pinecone');

const answerFinancialQuery = async (businessId, userQuery) => {
  try {
    // 1. Fetch relevant receipts using Pinecone vector search
    const matches = await queryReceipts(userQuery);

    const contextText = matches.map(r => 
      `${r.date}: ${r.vendor_name} - ${r.total_amount} ${r.currency} (${r.type})`
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
