const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://vaibhaav2006:taskflow-cl-1@taskflow-collection1.xynet64.mongodb.net/?retryWrites=true&w=majority&appName=TaskFlow-Collection1', {
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;