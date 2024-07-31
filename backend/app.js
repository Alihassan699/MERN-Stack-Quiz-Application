// app.js
import express from 'express';
import bodyParser from 'body-parser';
import { connectdb } from './config/db.js';
import questionRoutes from './routes/questionRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import { config } from 'dotenv';

config({ path: './config.env' });

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for the frontend URL
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: frontendUrl }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the database and handle any connection errors
connectdb().catch((error) => {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
});

app.use('/api/questions', questionRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
