import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminComponent from './components/AdminComponent';
import UserComponent from './components/UserComponent';
import QuizComponent from './components/QuizComponent';
import ResultComponent from './components/ResultComponent';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PasswordResetRequest from './components/PasswordResetRequest';
import PasswordReset from './components/PasswordReset';
import './App.css';

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const App: React.FC = () => {
    const [authenticated, setAuthenticated] = useState(isAuthenticated());

    useEffect(() => {
        setAuthenticated(isAuthenticated());
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignIn onAuthenticate={setAuthenticated} />} />
                <Route path="/signup" element={<SignUp onAuthenticate={setAuthenticated} />} />
                <Route path="/request-password-reset" element={<PasswordResetRequest />} />
                <Route path="/reset-password/:email" element={<PasswordReset />} />
                <Route path="/admin" element={authenticated ? <AdminComponent /> : <Navigate to="/signin" />} />
                <Route path="/user" element={authenticated ? <UserComponent /> : <Navigate to="/signin" />} />
                <Route path="/quiz" element={authenticated ? <QuizComponent /> : <Navigate to="/signin" />} />
                <Route path="/result" element={authenticated ? <ResultComponent /> : <Navigate to="/signin" />} />
            </Routes>
        </Router>
    );
};

export default App;
