// src/components/Dashboard.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Get user role from token or session
        const token = localStorage.getItem('token');
        if (token) {
            // Decode the token to get user information
            // Here you should check the role or permission
            // For example:
            // if (isAdmin(token)) {
            //     navigate('/admin');
            // } else {
            //     navigate('/user');
            // }
            navigate('/user'); // Placeholder, implement actual role-based redirection
        } else {
            navigate('/signin');
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Dashboard;
