// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the Memo model
const memoSchema = new mongoose.Schema({
  title: { type: String, required: true },                    // Title of the memo
  content: String,                                            // Content/body of the memo
  dateCreated: { type: Date, default: Date.now },             // Date when the memo was created, defaults to current date/time
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to the user who created the memo
});

// Export the Memo model based on the memoSchema
module.exports = mongoose.model('Memo', memoSchema);
