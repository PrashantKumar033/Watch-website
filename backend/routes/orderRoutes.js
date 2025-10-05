const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders
} = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/auth');

// User routes
router.post('/', auth, createOrder);
router.get('/my-orders', auth, getUserOrders);
router.get('/:id', auth, getOrder);

// Admin routes
router.get('/', adminAuth, getAllOrders);
router.put('/:id/status', adminAuth, updateOrderStatus);

module.exports = router;