import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css';

interface SignInProps {
    onAuthenticate: (authenticated: boolean) => void;
}

const SignIn: React.FC<SignInProps> = ({ onAuthenticate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/signin', { email, password });
            localStorage.setItem('token', response.data.token);
            onAuthenticate(true);
            navigate('/user');
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <div id="form" className="signin-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="userid"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="input1"
                />
                <button type="submit" className="btn">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
