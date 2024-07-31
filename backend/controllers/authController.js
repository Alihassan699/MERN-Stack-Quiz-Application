import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

// Sign Up
export const signup = async (req, res) => {
    const { username, email, password, fullName } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, email, password, fullName) VALUES ($1, $2, $3, $4) RETURNING id',
            [username, email, hashedPassword, fullName]
        );
        const userId = result.rows[0].id;
        res.status(201).json({ userId, message: 'User created' });
    } catch (error) {
        console.error('Sign up error:', error);
        res.status(500).json({ error: 'Failed to register' });
    }
};

// Sign In
export const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.status(200).json({ token, message: 'Signed in successfully' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Sign in error:', error);
        res.status(500).json({ error: 'Failed to sign in' });
    }
};
