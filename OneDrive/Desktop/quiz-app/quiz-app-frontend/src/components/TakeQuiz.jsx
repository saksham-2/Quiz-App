import React, { useState } from 'react';
import { getQuizByCode } from '../services/api';
import '../style.css';

function TakeQuiz() {
  const [quizCode, setQuizCode] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(null);

  const fetchQuiz = async () => {
    try {
      // console.log("🟡 Fetching quiz with code:", quizCode);
      const quizData = await getQuizByCode(quizCode); // ✅ Use quizData directly
      // console.log("✅ Quiz Data Fetched:", quizData);
  
      if (!quizData || !quizData.quiz) {
        setMessage("Quiz not found. Please check the code.");
        return;
      }
  
      setQuiz(quizData.quiz); // ✅ Corrected: Directly setting the quiz object
      setCurrentQuestionIndex(0);
      setSelectedOptions({});
      setScore(null);
    } catch (err) {
      // console.error("❌ Error fetching quiz:", err.message);
      setMessage("Quiz not found");
    }
  };
  

  const handleOptionChange = (questionIndex, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option,
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctOption) {
        score += 1;
      }
    });
    setScore(score);
  };

  if (!quiz) {
    return (
      <div className="container">
        <div className="quiz-entry">
          <h1>Take a Quiz</h1>
          <p className="instruction-text">Enter the quiz code provided by your quiz creator to begin.</p>
          <div className="input-group">
            <input
              type="text"
              value={quizCode}
              onChange={(e) => setQuizCode(e.target.value)}
              placeholder="Enter Quiz Code"
              className="quiz-code-input"
            />
            <button onClick={fetchQuiz} className="primary-button">
              Start Quiz
            </button>
          </div>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="container">
      <div className="quiz-container">
        <h1>{quiz.title}</h1>
        
        {score === null ? (
          <div className="quiz-content">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="question-counter">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </p>
            
            <div className="question-card">
              <h2 className="question-text">{currentQuestion.question}</h2>
              <div className="options-list">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={index} 
                    className={`option-item ${selectedOptions[currentQuestionIndex] === option ? 'selected' : ''}`}
                    onClick={() => handleOptionChange(currentQuestionIndex, option)}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      checked={selectedOptions[currentQuestionIndex] === option}
                      onChange={() => {}}
                      id={`option-${index}`}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="navigation-buttons">
              <button 
                onClick={goToPreviousQuestion} 
                disabled={currentQuestionIndex === 0}
                className="nav-button"
              >
                ← Previous
              </button>
              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <button onClick={goToNextQuestion} className="nav-button">
                  Next →
                </button>
              ) : (
                <button onClick={calculateScore} className="submit-button">
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="score-card">
            <div className="score-content">
              <h2>Quiz Completed! 🎉</h2>
              <div className="score-display">
                <span className="score-number">{score}</span>
                <span className="score-divider">/</span>
                <span className="total-questions">{quiz.questions.length}</span>
              </div>
              <p className="score-percentage">
                {Math.round((score / quiz.questions.length) * 100)}% Correct
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TakeQuiz;
