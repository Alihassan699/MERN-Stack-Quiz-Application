import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignIn.css';

interface SignInProps {
    onAuthenticate: (status: boolean) => void;
}

const SignIn: React.FC<SignInProps> = ({ onAuthenticate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signin', { username, password });
            localStorage.setItem('token', response.data.token); // Store token in local storage
            onAuthenticate(true); // Update authentication status
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign In</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p className="sign-up-link">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default SignIn;
