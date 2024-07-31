// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminComponent from './components/AdminComponent';
import UserComponent from './components/UserComponent';
import QuizComponent from './components/QuizComponent';
import ResultComponent from './components/ResultComponent';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './App.css';

// Function to check if the user is authenticated
const isAuthenticated = () => {
    // Replace this with your actual authentication logic
    return !!localStorage.getItem('token');
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/admin"
                    element={isAuthenticated() ? <AdminComponent /> : <Navigate to="/signin" />}
                />
                <Route
                    path="/user"
                    element={isAuthenticated() ? <UserComponent /> : <Navigate to="/signin" />}
                />
                <Route path="/quiz/:quizId" element={<QuizComponent />} />
                <Route path="/result/:quizId" element={<ResultComponent />} />
            </Routes>
        </Router>
    );
};

export default App;
