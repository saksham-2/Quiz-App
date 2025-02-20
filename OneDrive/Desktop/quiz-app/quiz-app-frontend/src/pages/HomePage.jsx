import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <Link to="/signup">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}

export default HomePage;
