import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/QuizComponent.css';

const QuizComponent: React.FC = () => {
    const { quizId } = useParams<{ quizId: string }>();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(90);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axiosInstance.get(`/quizzes/${quizId}`);
                setQuestions(response.data.questions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [quizId]);

    useEffect(() => {
        if (timeRemaining === 0) {
            handleNextQuestion();
        }
        const timer = setTimeout(() => {
            setTimeRemaining(timeRemaining - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeRemaining]);

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = e.target.value;
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeRemaining(90);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            await axiosInstance.post('/results', { quizId, answers });
            navigate(`/result/${quizId}`);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    return (
        <div className="quiz-container">
            {questions.length > 0 && (
                <div className="quiz-content">
                    <p className="quiz-question">{questions[currentQuestion].statement}</p>
                    {questions[currentQuestion].options.map((option: string, index: number) => (
                        <label key={index} className="option-label">
                            <input
                                type="radio"
                                name="answer"
                                value={option}
                                onChange={handleAnswerChange}
                            />
                            {option}
                        </label>
                    ))}
                    <p className="timer">Time Remaining: {timeRemaining}s</p>
                    <button onClick={handleNextQuestion}>Next</button>
                </div>
            )}
        </div>
    );
};

export default QuizComponent;
