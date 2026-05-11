const express = require('express');
const router = express.Router();
const { authMiddleware, ownerOnly } = require('../middleware/auth');
const { generateMonthlyReport } = require('../services/pdfReport');

// GET /api/reports/monthly
router.get('/monthly', authMiddleware, ownerOnly, async (req, res) => {
  try {
    const { year, month } = req.query;
    if (!year || !month) return res.status(400).json({ error: 'Missing year or month' });

    const reportData = await generateMonthlyReport(req.user.business_id, year, month);
    
    // For MVP, we return JSON. In production, we'd stream a PDF file.
    res.json(reportData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

module.exports = router;
