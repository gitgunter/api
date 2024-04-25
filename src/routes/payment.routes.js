import express from 'express';
import paymentController from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/purchase-plan', paymentController.createOrder);
router.post('/webhooks', paymentController.lemonSqueezyWebhook);

export default router;
