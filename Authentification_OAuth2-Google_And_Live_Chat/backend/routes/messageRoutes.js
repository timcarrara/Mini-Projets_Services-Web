const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../utils/authMiddleware');

// Récupérer l'historique des messages
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ timestamp: 1 })
      .populate('sender', 'displayName avatar')
      .limit(50);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;