// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // Unique username for each user
  hashedPassword: { type: String, required: true },           // Password hashed for security
  memos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Memo' }]  // Array of references to the user's memos
});

// Export the User model based on the userSchema
module.exports = mongoose.model('User', userSchema);
