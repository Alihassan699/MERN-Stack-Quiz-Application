// /src/components/QuizComponent.tsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import '../styles/QuizComponent.css';

const QuizComponent: React.FC = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axiosInstance.get('/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOptionChange = (option: string) => {
        const updatedSelections = [...selectedOptions];
        updatedSelections[currentQuestionIndex] = option;
        setSelectedOptions(updatedSelections);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
    };

    return (
        <div className="quiz-container">
            {questions.length > 0 && (
                <>
                    <div className="quiz-content">
                        <div className="quiz-question">
                            {questions[currentQuestionIndex].question}
                        </div>
                        {questions[currentQuestionIndex].options.map((option: string, index: number) => (
                            <label key={index} className="option-label">
                                <input
                                    type="radio"
                                    name="options"
                                    value={option}
                                    checked={selectedOptions[currentQuestionIndex] === option}
                                    onChange={() => handleOptionChange(option)}
                                />
                                {option}
                            </label>
                        ))}
                        <div className="timer">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
                        <button onClick={handleNextQuestion}>Next Question</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default QuizComponent;
