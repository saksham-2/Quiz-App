import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending Login Request:", { email, password }); // Debugging line
      const response = await axios.post("http://localhost:5000/api/users/login", 
        { email, password },
        { headers: { "Content-Type": "application/json" } } // Ensures correct format
      );
  
      console.log("Response:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/quiz-options");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data?.error || "An error occurred");
    }
  };
  
  
  return (
    <div className="login-container">
      <h2>Login to Quiz App</h2>
      {message && <p className="message">{message}</p>} {/* Display success/error message */}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
