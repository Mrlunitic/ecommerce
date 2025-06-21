const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Initiate eSewa payment
// @route   POST /api/payment/esewa
// @access  Private
const initiateEsewaPayment = asyncHandler(async (req, res) => {
  const { amount, orderId } = req.body;

  const params = {
    amt: amount,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: amount,
    pid: orderId,
    scd: process.env.ESEWA_MERCHANT_CODE,
    su: `${process.env.FRONTEND_URL}/payment/success`,
    fu: `${process.env.FRONTEND_URL}/payment/failure`,
  };

  res.json({
    url: `https://rc-epay.esewa.com.np/api/epay/main`,
    params,
  });
});

module.exports = {
  createOrder,
  getOrderById,
  initiateEsewaPayment,
};