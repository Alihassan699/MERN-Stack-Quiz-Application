// /src/components/ResultComponent.tsx
import React from 'react';
import '../styles/ResultComponent.css';

interface ResultProps {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
}

const ResultComponent: React.FC<ResultProps> = ({ score, totalQuestions, correctAnswers }) => {
    return (
        <div className="result-container">
            <h2>Quiz Results</h2>
            <p>Total Questions: {totalQuestions}</p>
            <p>Correct Answers: {correctAnswers}</p>
            <p>Your Score: {score}</p>
        </div>
    );
};

export default ResultComponent;
