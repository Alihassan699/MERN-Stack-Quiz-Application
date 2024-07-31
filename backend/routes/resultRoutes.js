// routes/resultRoutes.js
import { Router } from 'express';
import { submitQuiz, getResult } from '../controllers/resultController.js';

const router = Router();

router.post('/', submitQuiz);
router.get('/:quizId', getResult);

export default router;
