import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams } from 'react-router-dom';
import '../styles/ResultComponent.css';

const ResultComponent: React.FC = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await axiosInstance.get(`/results/${quizId}`);
                setResult(response.data);
            } catch (error) {
                console.error('Error fetching result:', error);
            }
        };

        fetchResult();
    }, [quizId]);

    return (
        <div className="container">
            <h2>Quiz Result</h2>
            {result ? (
                <div>
                    <p>Total Questions: {result.totalQuestions}</p>
                    <p>Attempted Questions: {result.attemptedQuestions}</p>
                    <p>Correct Answers: {result.correctAnswered}</p>
                    <p>Wrong Answers: {result.wrongAnswered}</p>
                </div>
            ) : (
                <p>Loading result...</p>
            )}
        </div>
    );
};

export default ResultComponent;
