const { query, pool } = require('../config/database');

const create = async (receiptData, items = []) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { rows } = await client.query(
      `INSERT INTO receipts 
        (business_id, uploaded_by, type, vendor_name, vendor_tin, date, total_amount, currency, tax, subtotal, raw_ocr_text, confidence, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        receiptData.business_id,
        receiptData.uploaded_by,
        receiptData.type,
        receiptData.vendor_name,
        receiptData.vendor_tin,
        receiptData.date,
        receiptData.total_amount,
        receiptData.currency || 'ETB',
        receiptData.tax,
        receiptData.subtotal,
        receiptData.raw_ocr_text,
        receiptData.confidence,
        receiptData.status || 'pending'
      ]
    );

    const receipt = rows[0];

    if (items.length > 0) {
      for (const item of items) {
        await client.query(
          `INSERT INTO receipt_items (receipt_id, description, quantity, unit_price, total)
           VALUES ($1, $2, $3, $4, $5)`,
          [receipt.id, item.description, item.quantity, item.unit_price, item.total]
        );
      }
    }

    await client.query('COMMIT');
    return receipt;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const findById = async (id) => {
  const { rows } = await query('SELECT * FROM receipts WHERE id = $1', [id]);
  if (!rows[0]) return null;
  
  const { rows: items } = await query('SELECT * FROM receipt_items WHERE receipt_id = $1', [id]);
  return { ...rows[0], items };
};

const updateStatus = async (id, { status, approved_by, image_drive_url, corrections = {} }) => {
  const fields = ['status = $1', 'approved_by = $2', 'approved_at = NOW()'];
  const values = [status, approved_by];
  let paramIdx = 3;

  if (image_drive_url) {
    fields.push(`image_drive_url = $${paramIdx++}`);
    values.push(image_drive_url);
  }

  // Handle corrections
  for (const [key, value] of Object.entries(corrections)) {
    if (value !== undefined) {
      fields.push(`${key} = $${paramIdx++}`);
      values.push(value);
    }
  }

  values.push(id);
  const sql = `UPDATE receipts SET ${fields.join(', ')} WHERE id = $${paramIdx} RETURNING *`;
  
  const { rows } = await query(sql, values);
  return rows[0];
};

const list = async ({ business_id, type, status, startDate, endDate }) => {
  let sql = 'SELECT * FROM receipts WHERE business_id = $1';
  const values = [business_id];
  let paramIdx = 2;

  if (type) {
    sql += ` AND type = $${paramIdx++}`;
    values.push(type);
  }
  if (status) {
    sql += ` AND status = $${paramIdx++}`;
    values.push(status);
  }
  if (startDate) {
    sql += ` AND date >= $${paramIdx++}`;
    values.push(startDate);
  }
  if (endDate) {
    sql += ` AND date <= $${paramIdx++}`;
    values.push(endDate);
  }

  sql += ' ORDER BY created_at DESC LIMIT 100';
  const { rows } = await query(sql, values);
  return rows;
};

module.exports = {
  create,
  findById,
  updateStatus,
  list,
};
