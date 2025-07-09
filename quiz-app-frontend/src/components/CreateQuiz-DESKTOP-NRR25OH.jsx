import React, { useState } from 'react';
import { createQuiz } from '../services/api';
import '../style.css';

function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctOption: '' }]);
  const [message, setMessage] = useState('');

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOption: '' }]);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createQuiz({ title: quizTitle, questions });
      setMessage(`Quiz created successfully! Your quiz code is: ${response.code}`);
    } catch (err) {
      // console.error('Create Quiz Error:', err.message);
      setMessage('Error creating quiz.');
    }
  };

  return (
    <div className="container">
      <div className="create-quiz">
        <h1>Create a New Quiz</h1>
        <p className="instruction-text">
          Design your quiz by adding questions and their options. Make sure to mark the correct answer for each question.
        </p>

        <form onSubmit={handleSubmit} className="quiz-form">
          <div className="form-group">
            <label htmlFor="quiz-title">Quiz Title</label>
            <input
              id="quiz-title"
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="Enter an engaging title for your quiz"
              required
              className="title-input"
            />
          </div>

          {questions.map((question, index) => (
            <div key={index} className="question-section">
              <div className="question-header">
                <h3>Question {index + 1}</h3>
                <button 
                  type="button" 
                  onClick={() => deleteQuestion(index)}
                  className="delete-button"
                  title="Delete this question"
                >
                  ×
                </button>
              </div>

              <div className="form-group">
                <label htmlFor={`question-${index}`}>Question Text</label>
                <input
                  id={`question-${index}`}
                  type="text"
                  name="question"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, e)}
                  placeholder="Type your question here"
                  required
                  className="question-input"
                />
              </div>

              <div className="options-grid">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="form-group">
                    <label htmlFor={`option-${index}-${optionIndex}`}>
                      Option {optionIndex + 1}
                    </label>
                    <input
                      id={`option-${index}-${optionIndex}`}
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e)}
                      placeholder={`Enter option ${optionIndex + 1}`}
                      required
                      className="option-input"
                    />
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label htmlFor={`correct-${index}`}>Correct Answer</label>
                <input
                  id={`correct-${index}`}
                  type="text"
                  name="correctOption"
                  value={question.correctOption}
                  onChange={(e) => handleQuestionChange(index, e)}
                  placeholder="Enter the correct option exactly as written above"
                  required
                  className="correct-input"
                />
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button 
              type="button" 
              onClick={addQuestion}
              className="add-button"
            >
              + Add Another Question
            </button>
            <button 
              type="submit"
              className="submit-button"
            >
              Create Quiz
            </button>
          </div>
        </form>

        {message && (
          <div className="message success-message">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateQuiz;
