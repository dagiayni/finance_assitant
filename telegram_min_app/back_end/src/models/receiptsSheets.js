const { appendRow, getRows } = require('../services/googleSheets');
const { v4: uuidv4 } = require('uuid');

const create = async (receiptData) => {
  const id = uuidv4();
  const row = [
    id,
    receiptData.date || new Date().toISOString().split('T')[0],
    receiptData.vendor_name,
    receiptData.vendor_tin,
    receiptData.total_amount,
    receiptData.type,
    receiptData.status || 'pending',
    receiptData.image_drive_url || '',
    receiptData.uploaded_by,
    receiptData.raw_ocr_text,
    new Date().toISOString()
  ];

  await appendRow('Receipts!A:K', row);
  return { id, ...receiptData };
};

const list = async (business_id) => {
  const rows = await getRows('Receipts!A:K');
  if (!rows) return [];
  
  const headers = rows[0];
  const data = rows.slice(1);
  
  // Basic filtering for MVP (assuming business_id column is matched somehow or just returning all)
  return data.map(row => ({
    id: row[0],
    date: row[1],
    vendor_name: row[2],
    vendor_tin: row[3],
    total_amount: row[4],
    type: row[5],
    status: row[6],
    image_drive_url: row[7],
    uploaded_by: row[8],
    created_at: row[10]
  }));
};

module.exports = {
  create,
  list,
};
