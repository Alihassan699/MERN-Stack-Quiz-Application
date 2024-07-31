import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

interface SignUpProps {
    onAuthenticate: (authenticated: boolean) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onAuthenticate }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/auth/signup', { fullName, email, password });
            const response = await axiosInstance.post('/auth/signin', { email, password });
            localStorage.setItem('token', response.data.token);
            onAuthenticate(true);
            navigate('/user');
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Failed to sign up. Please try again.');
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default SignUp;
