const express = require("express");
const { signup, login } = require("../controllers/userController"); // ✅ Make sure the path is correct

const router = express.Router();

// Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
