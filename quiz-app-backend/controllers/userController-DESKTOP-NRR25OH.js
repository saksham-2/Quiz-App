const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION || "1h";
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;


// Remove hashing from signup function
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = new User({ username, email, password });

    await newUser.save(); 

    const payload = { user: { id: newUser.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    res.status(201).json({
      token,
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
      msg: "Registration successful",
    });
  } catch (error) {
    // Avoid logging sensitive error details in production
    console.error("🚨 Signup Error");
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Do not log sensitive info like email or password

    const user = await User.findOne({ email });
    if (!user) {
      // Optionally log generic info for debugging
      // console.warn("Login attempt with invalid email");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    // Do not log password match results

    if (!isPasswordCorrect) {
      // Optionally log generic info for debugging
      // console.warn("Login attempt with incorrect password");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    // Do not log successful logins with user info
    res.json({ token, user: { id: user.id, email: user.email }, msg: "Login successful" });
  } catch (err) {
    // Avoid logging sensitive error details in production
    console.error("🚨 Server Error");
    res.status(500).json({ error: "Server error" });
  }
};
