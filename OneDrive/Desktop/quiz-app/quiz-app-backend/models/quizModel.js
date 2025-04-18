const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questions: [
    {
      question: String,
      options: [String],
      correctOption: String
    }
  ],
  code: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Quiz', QuizSchema);
