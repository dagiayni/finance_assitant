const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const logger = require('./config/logger');
const runMigrations = require('./config/migrations');
const receiptRoutes = require('./routes/receipts');
const businessRoutes = require('./routes/business');
const telegramRoutes = require('./routes/telegram');
const reportsRoutes = require('./routes/reports');
const chatRoutes = require('./routes/chat');

const app = express();

// Middleware
app.use(cors({
  origin: config.frontendUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-telegram-user-id']
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/receipts', receiptRoutes);
app.use('/api/business', businessRoutes);
app.use('/telegram', telegramRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler placeholder
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const startServer = async () => {
  try {
    // Run migrations on startup if DATABASE_URL is present
    if (config.databaseUrl) {
      await runMigrations();
    }

    if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
      app.listen(config.port, () => {
        logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
      });
    }
  } catch (err) {
    logger.error('Failed to start server', err);
    // Don't exit in serverless as it might just be a cold start
  }
};

startServer();

module.exports = app;
