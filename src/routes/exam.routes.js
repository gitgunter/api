import express from 'express';
import examController from '../controllers/exam.controller.js';

const router = express.Router();

router.get('/questions/:limit', examController.getQuestions);
router.get('/boolean/:limit', examController.getBooleanQuestions);
router.get('/', examController.getAllExams);
router.get('/:id', examController.getExam);
router.post('/', examController.createExam);
router.delete('/:id', examController.deleteExam);

export default router;
