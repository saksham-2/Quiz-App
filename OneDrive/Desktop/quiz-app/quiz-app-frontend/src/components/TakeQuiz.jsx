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
      console.log("🟡 Fetching quiz with code:", quizCode);
      const quizData = await getQuizByCode(quizCode); // ✅ Use quizData directly
      console.log("✅ Quiz Data Fetched:", quizData);
  
      if (!quizData || !quizData.quiz) {
        setMessage("Quiz not found. Please check the code.");
        return;
      }
  
      setQuiz(quizData.quiz); // ✅ Corrected: Directly setting the quiz object
      setCurrentQuestionIndex(0);
      setSelectedOptions({});
      setScore(null);
    } catch (err) {
      console.error("❌ Error fetching quiz:", err.message);
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
      <div>
        <input
          type="text"
          value={quizCode}
          onChange={(e) => setQuizCode(e.target.value)}
          placeholder="Enter Quiz Code"
        />
        <button onClick={fetchQuiz}>Fetch Quiz</button>
        {message && <p>{message}</p>}
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div>
      <h1>{quiz.title}</h1>
      {score === null ? (
        <div>
          <div>
            <p>{currentQuestion.question}</p>
            {currentQuestion.options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={selectedOptions[currentQuestionIndex] === option}
                  onChange={() => handleOptionChange(currentQuestionIndex, option)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
          <div>
            <button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <button onClick={goToNextQuestion}>
                Next
              </button>
            ) : (
              <button onClick={calculateScore}>
                Submit and View Score
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>Your Score: {score} / {quiz.questions.length}</h2>
        </div>
      )}
    </div>
  );
}

export default TakeQuiz;
