import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/SignIn.css';

interface SignInProps {
    onAuthenticate: (authenticated: boolean) => void;
}

const SignIn: React.FC<SignInProps> = ({ onAuthenticate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/signin', { email, password });
            localStorage.setItem('token', response.data.token);
            onAuthenticate(true);
            navigate('/user');
        } catch (error: any) {
            console.error('Error signing in:', error);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                />
                <button type="submit">Sign In</button>
                {error && <div className="error-message">{error}</div>}
            </form>
            <div className="sign-up-link">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
            <div className="forgot-password-link">
                <p>Forgot your password? <Link to="/request-password-reset">Reset Password</Link></p>
            </div>
        </div>
    );
};

export default SignIn;
