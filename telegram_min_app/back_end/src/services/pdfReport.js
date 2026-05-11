const { query } = require('../config/database');
const logger = require('../config/logger');

const generateMonthlyReport = async (businessId, year, month) => {
  try {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    const { rows: receipts } = await query(
      `SELECT * FROM receipts 
       WHERE business_id = $1 AND status = 'approved' AND date >= $2 AND date <= $3
       ORDER BY date ASC`,
      [businessId, startDate, endDate]
    );

    // In a real app, use 'pdfkit' or 'puppeteer' to generate the PDF.
    // For this MVP, we return the data structure that would populate the PDF.
    return {
      title: `Monthly Financial Report - ${year}/${month}`,
      generatedAt: new Date().toISOString(),
      receipts: receipts,
      summary: {
        total_income: receipts.filter(r => r.type === 'income').reduce((sum, r) => sum + Number(r.total_amount), 0),
        total_expense: receipts.filter(r => r.type === 'expense').reduce((sum, r) => sum + Number(r.total_amount), 0),
        count: receipts.length
      }
    };
  } catch (err) {
    logger.error('Report Generation Error:', err.message);
    throw err;
  }
};

module.exports = {
  generateMonthlyReport,
};
