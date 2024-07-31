// /src/components/AdminComponent.tsx
import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import '../styles/AdminComponent.css';

const AdminComponent: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleAddQuestion = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/questions', { question, options, correctAnswer });
            alert('Question added successfully');
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    return (
        <div className="admin-container">
            <h2>Add New Question</h2>
            <form onSubmit={handleAddQuestion}>
                <input
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                    />
                ))}
                <input
                    type="text"
                    placeholder="Correct Answer"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                />
                <button type="submit">Add Question</button>
            </form>
        </div>
    );
};

export default AdminComponent;
