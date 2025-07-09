const mongoose = require('mongoose');
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
     
    });
    // Do not log DB connection details in production
    // console.log('MongoDB Connected...');
  } catch (err) {
    // Avoid logging sensitive error details in production
    // console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
