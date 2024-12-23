const express = require('express');
const { initiatePayment, confirm, failed, initiatePaymentProduct, confirmProduct } = require('../controllers/paymentController');

const router = express.Router();

// POST route for submitting feedback
router.post('/initiate/:id', initiatePayment);

router.post('/confirm-payment/:id', confirm)

router.post('/initiate-product/:id', initiatePaymentProduct);

router.post('/confirm-payment-product/:id', confirmProduct)

router.post('/failed-payment', failed)

module.exports = router;