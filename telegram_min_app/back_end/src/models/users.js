const { query } = require('../config/database');

const findByTelegramId = async (telegramId) => {
  const { rows } = await query(
    'SELECT * FROM users WHERE telegram_id = $1',
    [telegramId]
  );
  return rows[0];
};

const findById = async (id) => {
  const { rows } = await query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return rows[0];
};

const create = async ({ telegram_id, name, email, role, business_id }) => {
  const { rows } = await query(
    `INSERT INTO users (telegram_id, name, email, role, business_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [telegram_id, name, email, role, business_id]
  );
  return rows[0];
};

module.exports = {
  findByTelegramId,
  findById,
  create,
};
