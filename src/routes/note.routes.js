import express from 'express';
import noteController from '../controllers/note.controller.js';

const router = express.Router();

router.get('/', noteController.getAllNotes);
router.post('/', noteController.createNote);
router.put('/', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

export default router;
