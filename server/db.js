// Import the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Asynchronous function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Once the connection is successfully established
mongoose.connection.once('open', () => {
  console.log('MongoDB connection established');
});

// If there's an error with the connection
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection disconnected');
});

module.exports = connectDB;

