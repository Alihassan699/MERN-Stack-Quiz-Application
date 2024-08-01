// controllers/authController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';
import sendMail from '../config/mailer.js';

// Generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

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
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token, message: 'Signed in successfully' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Sign in error:', error);
        res.status(500).json({ error: 'Failed to sign in' });
    }
};

// Request Password Reset
export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const otp = generateOTP();
        const hashedOTP = await bcrypt.hash(otp, 10);
        const expires = Date.now() + 300000; // OTP expires in 5 minutes

        await pool.query(
            'INSERT INTO password_resets (user_id, otp, expires) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET otp = $2, expires = $3',
            [user.id, hashedOTP, expires]
        );

        await sendMail(user.email, 'Password Reset Request', `Your OTP is ${otp}. It will expire in 5 minutes.`);

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error('Password reset request error:', error);
        res.status(500).json({ error: 'Failed to request password reset' });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetResult = await pool.query('SELECT * FROM password_resets WHERE user_id = $1', [user.id]);
        const resetRecord = resetResult.rows[0];

        if (!resetRecord || Date.now() > resetRecord.expires) {
            return res.status(400).json({ error: 'OTP expired or invalid' });
        }

        const isMatch = await bcrypt.compare(otp, resetRecord.otp);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
        await pool.query('DELETE FROM password_resets WHERE user_id = $1', [user.id]);

        await sendMail(user.email, 'Password Reset Successful', 'Your password has been successfully reset.');

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
};
