const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/users');
const logger = require('../config/logger');

const authMiddleware = async (req, res, next) => {
  try {
    const telegramUserId = req.headers['x-telegram-user-id'];
    const authHeader = req.headers['authorization'];

    if (!telegramUserId || !authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing headers' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);

    if (decoded.telegram_id !== telegramUserId) {
      return res.status(401).json({ error: 'Unauthorized: Token mismatch' });
    }

    const user = await User.findByTelegramId(telegramUserId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    logger.error('Auth Error:', err.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

const ownerOnly = (req, res, next) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ error: 'Forbidden: Owner access required' });
  }
  next();
};

module.exports = {
  authMiddleware,
  ownerOnly,
};
