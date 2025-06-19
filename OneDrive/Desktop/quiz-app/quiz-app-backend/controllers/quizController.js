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

    console.log("✅ Generated Quiz Code:", quizCode);

    const quiz = new Quiz({ title, questions, code: quizCode });
    const savedQuiz = await quiz.save();

    console.log("🟢 Quiz Saved Successfully:", savedQuiz);

    res.status(201).json({ msg: "Quiz created successfully!", quizId: quiz._id, code: quiz.code });
  } catch (error) {
    console.error("🚨 Quiz Creation Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getQuizByCode = async (req, res) => {
  try {
    const { code } = req.params;
    console.log(`🔍 Searching for Quiz with Code: "${code}"`);

    const allQuizzes = await Quiz.find({}, { code: 1, _id: 0 });
    console.log("📜 All Stored Quiz Codes in Database:", allQuizzes);

    const quiz = await Quiz.findOne({ code: { $regex: `^${code.trim()}$`, $options: "i" } });

    if (!quiz) {
      console.log(`❌ No quiz found for code: "${code}"`);
      return res.status(404).json({ error: "Quiz not found" });
    }

    console.log("🟢 Quiz Found:", quiz);
    res.json({ quiz });
  } catch (error) {
    console.error("🚨 Quiz Fetch Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
