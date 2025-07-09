const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION || "1h";
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

r
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
    console.error("🚨 Signup Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🟡 Received Login Request:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("🔴 No user found with this email");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    console.log("🔍 Password Match Result:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      console.log("🔴 Password does not match");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    console.log("🟢 Login successful!");
    res.json({ token, user: { id: user.id, email: user.email }, msg: "Login successful" });
  } catch (err) {
    console.error("🚨 Server Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
