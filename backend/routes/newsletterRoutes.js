const express = require('express');
const router = express.Router();
const {
  subscribe,
  unsubscribe,
  getSubscribers
} = require('../controllers/newsletterController');
const { adminAuth } = require('../middleware/auth');

// Public routes
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin routes
router.get('/subscribers', adminAuth, getSubscribers);

module.exports = router;