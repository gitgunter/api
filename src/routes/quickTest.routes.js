import express from 'express';
import quickTestController from '../controllers/quickTest.controller.js';

const router = express.Router();

router.get('/', quickTestController.getAllQuickTests);
router.get('/:id', quickTestController.getQuickTest);
router.post('/', quickTestController.createQuickTest);
router.delete('/:id', quickTestController.deleteQuickTest);

export default router;
