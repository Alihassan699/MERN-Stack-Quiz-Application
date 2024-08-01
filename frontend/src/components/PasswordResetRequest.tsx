import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import '../styles/PasswordResetRequest.css';

const PasswordResetRequest: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/request-password-reset', { email });
            setMessage(response.data.message);
            setError('');
        } catch (error: any) {
            console.error('Error requesting password reset:', error);
            setError('Failed to request password reset. Please try again.');
        }
    };

    return (
        <div className="password-reset-request-container">
            <h2>Request Password Reset</h2>
            <form onSubmit={handleRequestReset}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                />
                <button type="submit">Send OTP</button>
                {message && <div className="message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
};

export default PasswordResetRequest;
