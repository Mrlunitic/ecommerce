const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} = require('../controllers/cartController');

router
  .route('/')
  .get(protect, getCart)
  .post(protect, addToCart);
router
  .route('/:productId')
  .delete(protect, removeFromCart)
  .put(protect, updateCartItem);

module.exports = router;