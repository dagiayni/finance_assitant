const { Pinecone } = require('@pinecone-database/pinecone');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/env');
const logger = require('../config/logger');

// Initialize Pinecone
const pc = new Pinecone({
  apiKey: config.pineconeApiKey
});

// Initialize Google AI for embeddings
const genAI = new GoogleGenerativeAI(config.googleApiKey || config.groqApiKey); // Fallback to groq key if they use openrouter/google?

const getEmbedding = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: "embedding-001" });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (err) {
    logger.error('Embedding Error:', err.message);
    throw err;
  }
};

const upsertReceipt = async (receiptData) => {
  try {
    const index = pc.index('financeai'); // Name from user's URL: financeai-tczhfkd...
    
    // Create a text summary for embedding
    const summary = `Vendor: ${receiptData.vendor_name}, Amount: ${receiptData.total_amount}, Date: ${receiptData.date}, TIN: ${receiptData.vendor_tin}, OCR: ${receiptData.raw_ocr_text}`;
    
    const embedding = await getEmbedding(summary);

    await index.upsert([{
      id: receiptData.id,
      values: embedding,
      metadata: {
        ...receiptData,
        // Pinecone metadata doesn't support complex objects, so we stringify items if needed
        items: JSON.stringify(receiptData.items || [])
      }
    }]);

    return true;
  } catch (err) {
    logger.error('Pinecone Upsert Error:', err.message);
    throw err;
  }
};

const queryReceipts = async (queryText) => {
  try {
    const index = pc.index('financeai');
    const embedding = await getEmbedding(queryText);

    const queryResponse = await index.query({
      vector: embedding,
      topK: 10,
      includeMetadata: true
    });

    return queryResponse.matches.map(match => ({
      score: match.score,
      ...match.metadata,
      items: JSON.parse(match.metadata.items || '[]')
    }));
  } catch (err) {
    logger.error('Pinecone Query Error:', err.message);
    throw err;
  }
};

module.exports = {
  upsertReceipt,
  queryReceipts,
};
