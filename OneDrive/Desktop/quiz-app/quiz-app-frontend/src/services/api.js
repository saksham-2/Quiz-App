import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status code outside 2xx
    // console.error('API Error - Response Data:', error.response.data);
    // console.error('API Error - Status Code:', error.response.status);
    // console.error('API Error - Headers:', error.response.headers);
  } else if (error.request) {
    // No response received
    // console.error('API Error - No Response:', error.request);
  } else {
    // Something went wrong in setting up the request
    // console.error('API Error - Request Setup:', error.message);
  }
  throw error;
};

// Register User
export const registerUser = async (data) => {
  try {
    const response = await api.post('/api/users/signup', data);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
};

// Login User
export const loginUser = async (data) => {
  try {
    const response = await api.post('/api/users/login', data);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
};

// Create Quiz
export const createQuiz = async (data) => {
  try {
    const response = await api.post('/api/quiz/create-quiz', data);
    return response.data;
  } catch (err) {
    handleApiError(err);
  }
};

export const getQuizByCode = async (code) => {
  try {
    const formattedCode = code.trim();
    // console.log(`🟡 Fetching quiz with code: "${formattedCode}"`);

    const response = await axios.get(`http://localhost:5000/api/quiz/quiz/${formattedCode}`);
    return response.data;
  } catch (err) {
    // console.error(`❌ Error fetching quiz with code: "${formattedCode}"`, err.response?.data?.error || "Network Error");
    throw err;
  }
};





