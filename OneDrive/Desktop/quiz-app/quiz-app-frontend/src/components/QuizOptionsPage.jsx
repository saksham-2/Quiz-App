import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css'
function QuizOptionsPage() {
  return (
    <div>
      <h1>Welcome! What would you like to do?</h1>
      <Link to="/create-quiz">
        <button>Create Quiz</button>
      </Link>
      <Link to="/take-quiz">
        <button>Take Quiz</button>
      </Link>
    </div>
  );
}

export default QuizOptionsPage;
