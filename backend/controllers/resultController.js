// controllers/resultController.js
import { pool } from '../config/db.js';

const submitQuiz = async (req, res) => {
  const { userId, quizId, answers } = req.body;
  try {
    const quiz = await pool.query('SELECT * FROM quizzes WHERE id = $1', [quizId]);
    const questions = quiz.rows[0].questions;

    let correctAnswered = 0;
    let wrongAnswered = 0;

    for (let i = 0; i < questions.length; i++) {
      const question = await pool.query('SELECT * FROM questions WHERE id = $1', [questions[i]]);
      if (question.rows[0].correct_answer === answers[i]) {
        correctAnswered++;
      } else {
        wrongAnswered++;
      }
    }

    const totalQuestions = questions.length;
    const attemptedQuestions = answers.length;

    const result = await pool.query(
      'INSERT INTO results (total_questions, attempted_questions, correct_answered, wrong_answered) VALUES ($1, $2, $3, $4) RETURNING *',
      [totalQuestions, attemptedQuestions, correctAnswered, wrongAnswered]
    );

    await pool.query('UPDATE quizzes SET result = $1 WHERE id = $2', [result.rows[0].id, quizId]);
    await pool.query('UPDATE users SET quizzes = array_append(quizzes, $1) WHERE id = $2', [quizId, userId]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getResult = async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await pool.query('SELECT result FROM quizzes WHERE id = $1', [quizId]);
    const resultId = quiz.rows[0].result;

    const result = await pool.query('SELECT * FROM results WHERE id = $1', [resultId]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { submitQuiz, getResult };
