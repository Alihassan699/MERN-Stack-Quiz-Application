// src/components/AdminComponent.tsx
import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import '../styles/AdminComponent.css';

const AdminComponent: React.FC = () => {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [quizQuestions, setQuizQuestions] = useState<string[]>([]);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        const question = { statement: questionText, options, correctAnswer };
        await axiosInstance.post('/questions', question);
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
    };

    const createQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        await axiosInstance.post('/quizzes', { questions: quizQuestions });
        setQuizQuestions([]);
    };

    return (
        <div className="admin-container">
            <h2>Add Question</h2>
            <form onSubmit={addQuestion}>
                <input
                    type="text"
                    placeholder="Question Statement"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                />
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                ))}
                <select
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                >
                    <option value="">Select Correct Answer</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            Option {index + 1}: {option}
                        </option>
                    ))}
                </select>
                <button type="submit">Add Question</button>
            </form>

            <h2>Create Quiz</h2>
            <form onSubmit={createQuiz}>
                <input
                    type="text"
                    placeholder="Quiz Questions (comma-separated IDs)"
                    value={quizQuestions.join(', ')}
                    onChange={(e) => setQuizQuestions(e.target.value.split(',').map(id => id.trim()))}
                />
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
};

export default AdminComponent;
