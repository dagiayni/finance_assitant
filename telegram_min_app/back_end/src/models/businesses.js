const { query } = require('../config/database');

const findById = async (id) => {
  const { rows } = await query('SELECT * FROM businesses WHERE id = $1', [id]);
  return rows[0];
};

const create = async ({ name, master_tin, telegram_chat_id, owner_user_id }) => {
  const { rows } = await query(
    `INSERT INTO businesses (name, master_tin, telegram_chat_id, owner_user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, master_tin, telegram_chat_id, owner_user_id]
  );
  return rows[0];
};

const updateDriveFolder = async (id, folderId) => {
  const { rows } = await query(
    'UPDATE businesses SET drive_folder_id = $1 WHERE id = $2 RETURNING *',
    [folderId, id]
  );
  return rows[0];
};

module.exports = {
  findById,
  create,
  updateDriveFolder,
};
