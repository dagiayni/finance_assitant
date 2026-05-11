const fs = require('fs');
const path = require('path');
const { query } = require('./database');
const logger = require('./logger');

const runMigrations = async () => {
  try {
    logger.info('Starting database migrations...');
    const migrationPath = path.join(__dirname, '../migrations/001_init_schema.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    await query(sql);
    logger.info('Database migrations completed successfully');
  } catch (err) {
    logger.error('Database migration failed', err);
    throw err;
  }
};

if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = runMigrations;
