import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        username,
        email,
        password,
      });

      if (response.data.token) {
        setMessage("User created successfully! Redirecting...");
        localStorage.setItem('token', response.data.token);

        // Delay redirection to let user see the success message
        setTimeout(() => {
          navigate('/quiz-options'); 
        }, 2000);
      }
    } catch (err) {
      // console.error("Register Error:", err.response?.data?.error || 'An error occurred');
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register for Quiz App</h2>
      {message && <p className="message">{message}</p>} {/* Display success/error message */}
      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
