const Quiz = require("../models/quizModel");

// Function to generate a random 6-character alphanumeric code
const generateQuizCode = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};



exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ error: "Title and questions are required" });
    }

    let quizCode;
    let existingQuiz;
    
    // Ensure the quiz code is unique
    do {
      quizCode = Math.random().toString(36).substr(2, 6).toUpperCase();
      existingQuiz = await Quiz.findOne({ code: quizCode });
    } while (existingQuiz);

    const quiz = new Quiz({ title, questions, code: quizCode });
    const savedQuiz = await quiz.save();

    res.status(201).json({ msg: "Quiz created successfully!", quizId: quiz._id, code: quiz.code });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getQuizByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const quiz = await Quiz.findOne({ code: { $regex: `^${code.trim()}$`, $options: "i" } });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json({ quiz });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
