const axios = require('axios');
const FormData = require('form-data');
const config = require('../config/env');
const logger = require('../config/logger');

const extractFromOCRSpace = async (imageBase64) => {
  try {
    const form = new FormData();
    form.append('base64Image', `data:image/jpeg;base64,${imageBase64}`);
    form.append('apikey', config.ocrSpaceApiKey || 'helloworld'); // Default free key if none
    form.append('OCREngine', '2');
    form.append('language', 'eng');
    form.append('scale', 'true');
    form.append('detectOrientation', 'true');

    const response = await axios.post('https://api.ocr.space/parse/image', form, {
      headers: form.getHeaders(),
      timeout: 30000,
    });

    if (response.data.IsErroredOnProcessing) {
      throw new Error(response.data.ErrorMessage || 'OCR.space processing error');
    }

    return response.data.ParsedResults[0].ParsedText;
  } catch (err) {
    logger.error('OCR.space Error:', err.message);
    throw err;
  }
};

const parseWithAI = async (rawText) => {
  try {
    const prompt = `
      Extract structured data from the following raw OCR text of a financial receipt. 
      Return ONLY a JSON object with these fields:
      - vendor_name: string
      - vendor_tin: string (Ethiopian TIN format if available)
      - date: string (YYYY-MM-DD)
      - total_amount: number
      - currency: string (default ETB)
      - tax: number
      - subtotal: number
      - items: array of { description: string, quantity: number, unit_price: number, total: number }
      - confidence: number (0.0 to 1.0)

      Raw OCR Text:
      ${rawText}
    `;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Authorization': `Bearer ${config.groqApiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    let content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (err) {
    logger.error('AI Parsing Error:', err.message);
    throw err;
  }
};

const extractReceiptData = async (imageBase64) => {
  const rawText = await extractFromOCRSpace(imageBase64);
  const parsedData = await parseWithAI(rawText);
  return { ...parsedData, raw_ocr_text: rawText };
};

module.exports = {
  extractReceiptData,
};
