const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createOrder,
  getOrderById,
  initiateEsewaPayment,
} = require('../controllers/paymentController');

router.route('/orders').post(protect, createOrder);
router.route('/orders/:id').get(protect, getOrderById);
router.route('/esewa').post(protect, initiateEsewaPayment);

module.exports = router;