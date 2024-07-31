// src/components/HomePage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Welcome to the Quiz App</h1>
            <div className="home-buttons">
                <Link to="/signin">
                    <button>Sign In</button>
                </Link>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
                <button onClick={() => navigate('/admin')}>Admin Panel</button>
                <button onClick={() => navigate('/user')}>User Dashboard</button>
            </div>
        </div>
    );
};

export default HomePage;
