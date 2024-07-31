// routes/questionRoutes.js
import { Router } from 'express';
import { addQuestion, getQuestions, updateQuestion, deleteQuestion } from '../controllers/questionController.js';

const router = Router();

router.post('/', addQuestion);
router.get('/', getQuestions);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
