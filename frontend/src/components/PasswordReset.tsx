import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams } from 'react-router-dom';
import '../styles/PasswordReset.css';

const PasswordReset: React.FC = () => {
    const { email } = useParams();
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/reset-password', { email, otp, newPassword });
            setMessage(response.data.message);
            setError('');
        } catch (error: any) {
            console.error('Error resetting password:', error);
            setError('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="password-reset-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-input"
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                />
                <button type="submit">Reset Password</button>
                {message && <div className="message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default PasswordReset;
