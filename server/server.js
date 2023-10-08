const express = require('express');
const winston = require('winston');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const memoRoutes = require('./routes/memoRoutes');
const cors = require('cors');

// Initialize express app
const app = express();

// Define and use explicit path for '.env'
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Enable CORS (Cross-Origin Resource Sharing) that can connect frontend and backend code with different port num
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/memos', memoRoutes);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({ message: err.message, stack: err.stack });
  }
  res.status(500).json({ message: 'Server Error' });
});

// Server start-up
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});