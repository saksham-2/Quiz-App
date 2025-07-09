import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function QuizOptionsPage() {
  return (
    <div className="container">
      <div className="welcome-section">
        <h1>Welcome to QuizMaster!</h1>
        <p className="welcome-text">
          Your journey to knowledge and fun begins here. Choose your path below:
        </p>
      </div>
      
      <div className="options-grid">
        <Link to="/create-quiz" className="option-card">
          <div className="card">
            <h2>Create Quiz</h2>
            <p>Design your own quiz and challenge others</p>
            <div className="icon">🎨</div>
          </div>
        </Link>
        
        <Link to="/take-quiz" className="option-card">
          <div className="card">
            <h2>Take Quiz</h2>
            <p>Test your knowledge and learn something new</p>
            <div className="icon">📝</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default QuizOptionsPage;
