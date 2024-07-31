// controllers/quizController.js
import { pool } from '../config/db.js';

const createQuiz = async (req, res) => {
  const { questions } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO quizzes (questions) VALUES ($1) RETURNING *',
      [questions]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getQuizzes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM quizzes');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { questions } = req.body;
  try {
    const result = await pool.query(
      'UPDATE quizzes SET questions = $1 WHERE id = $2 RETURNING *',
      [questions, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM quizzes WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createQuiz, getQuizzes, updateQuiz, deleteQuiz };
