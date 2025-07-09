require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;


app.use((req, res, next) => {
    console.log(`🌍 API Request Received: ${req.method} ${req.url}`);
    next();
  });
  

console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET);
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);


connectDB();

app.use(express.json({ extended: false }));
app.use(cors());


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
