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
      console.error('Create Quiz Error:', err.message);
      setMessage('Error creating quiz.');
    }
  };
  


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          placeholder="Quiz Title"
          required
        />
        {questions.map((question, index) => (
          <div key={index}>
            <input
              type="text"
              name="question"
              value={question.question}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Question"
              required
            />
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, optionIndex, e)}
                placeholder={`Option ${optionIndex + 1}`}
                required
              />
            ))}
            <input
              type="text"
              name="correctOption"
              value={question.correctOption}
              onChange={(e) => handleQuestionChange(index, e)}
              placeholder="Correct Option"
              required
            />
            <button type="button" onClick={() => deleteQuestion(index)}>Delete Question</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Create Quiz</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateQuiz;
