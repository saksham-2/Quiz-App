const express = require("express");
const router = express.Router();
const { createQuiz, getQuizByCode } = require("../controllers/quizController");

// 🟢 Route to create a quiz
router.post("/create-quiz", async (req, res) => {
  // Do not log request details in production
  try {
    await createQuiz(req, res);
  } catch (err) {
    // Avoid logging sensitive error details in production
    // console.error("🚨 Quiz Creation Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// 🔵 Route to fetch quiz by code
router.get("/quiz/:code", async (req, res) => {
  // Do not log request details in production
  try {
    await getQuizByCode(req, res);
  } catch (err) {
    // Avoid logging sensitive error details in production
    // console.error("🚨 Quiz Fetch Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
