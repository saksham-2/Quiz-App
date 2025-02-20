const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION || "1h";
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

// 🟢 Register User
// Remove hashing from signup function
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists (By Email, Not Username)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user (No manual hashing)
    const newUser = new User({ username, email, password });

    await newUser.save(); // `pre("save")` in `userModel.js` will hash the password

    // Generate JWT token
    const payload = { user: { id: newUser.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    res.status(201).json({
      token,
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
      msg: "Registration successful",
    });
  } catch (error) {
    console.error("🚨 Signup Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🔵 Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🟡 Received Login Request:", { email, password });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("🔴 No user found with this email");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Use comparePassword method from userModel.js
    const isPasswordCorrect = await user.comparePassword(password);
    console.log("🔍 Password Match Result:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      console.log("🔴 Password does not match");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    console.log("🟢 Login successful!");
    res.json({ token, user: { id: user.id, email: user.email }, msg: "Login successful" });
  } catch (err) {
    console.error("🚨 Server Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
