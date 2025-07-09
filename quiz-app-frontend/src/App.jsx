import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';
import QuizOptionsPage from './components/QuizOptionsPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/quiz-options" element={<QuizOptionsPage />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/take-quiz" element={<TakeQuiz />} />
    </Routes>
  );
}

export default App;
