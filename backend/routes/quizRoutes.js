// routes/quizRoutes.js
import { Router } from 'express';
import { createQuiz, getQuizzes, updateQuiz, deleteQuiz } from '../controllers/quizController.js';

const router = Router();

router.post('/', createQuiz);
router.get('/', getQuizzes);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);

export default router;
