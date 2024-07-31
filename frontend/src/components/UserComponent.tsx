// src/components/UserComponent.tsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import '../styles/UserComponent.css';

const UserComponent: React.FC = () => {
    const [quizzes, setQuizzes] = useState<any[]>([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axiosInstance.get('/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <div className="user-container">
            <h2>Available Quizzes</h2>
            {quizzes.map((quiz) => (
                <div key={quiz.id} className="quiz-item">
                    <p>Quiz ID: {quiz.id}</p>
                    <button onClick={() => window.location.href = `/quiz/${quiz.id}`}>
                        Start Quiz
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UserComponent;
