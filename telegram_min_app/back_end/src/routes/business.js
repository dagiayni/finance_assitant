const express = require('express');
const router = express.Router();
const { authMiddleware, ownerOnly } = require('../middleware/auth');
const Business = require('../models/businesses');
const { query } = require('../config/database');
const logger = require('../config/logger');

// POST /api/business/setup
router.post('/setup', authMiddleware, ownerOnly, async (req, res) => {
  try {
    const { name, masterTin, telegramChatId } = req.body;
    
    const business = await Business.create({
      name,
      master_tin: masterTin,
      telegram_chat_id: telegramChatId,
      owner_user_id: req.user.id
    });

    res.json({ business });
  } catch (err) {
    logger.error('Business Setup Error:', err.message);
    res.status(500).json({ error: 'Failed to setup business' });
  }
});

// GET /api/business/stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const businessId = req.user.business_id;
    
    const { rows } = await query(
      `SELECT 
        COUNT(*) as total_receipts,
        SUM(CASE WHEN type = 'income' THEN total_amount ELSE 0 END) as total_income,
        SUM(CASE WHEN type = 'expense' THEN total_amount ELSE 0 END) as total_expense,
        COUNT(DISTINCT vendor_name) as unique_vendors
       FROM receipts 
       WHERE business_id = $1 AND status = 'approved'`,
      [businessId]
    );

    res.json({ stats: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
