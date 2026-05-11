const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { answerFinancialQuery } = require('../services/chatbot');

// POST /api/chat
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { query: userQuery } = req.body;
    if (!userQuery) return res.status(400).json({ error: 'Missing query' });

    const answer = await answerFinancialQuery(req.user.business_id, userQuery);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: 'Chatbot failed to respond' });
  }
});

module.exports = router;
