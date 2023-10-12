const express = require('express');
const router = express.Router();
const Memo = require('../models/memoModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middleware/authMiddleware');

const getAllMemos = async (req, res, next) => {
  // console.log("Request user:", req.user); // Debug statement
  // console.log("Request userID:", req.user.id); // Debug statement
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).send('User not authenticated or invalid user data.');
    }

    const userId = req.user.id;
    // console.log('User ID:', userId);  // Debug statement

    const memos = await Memo.find({ user: userId });

    if (!memos || memos.length === 0) {
      return res.status(404).json({ message: 'No memos found for this user.' });
    }

    res.json(memos);
  } catch (err) {
    console.error("Error in getAllMemos:", err);  // Debug statement
    next(err);
  }
};

// Create Memo route logic
const createMemo = async (req, res, next) => {
  try {
    const { title, content, username } = req.body;

    const user = await User.findOne({ username: username }).select('_id');
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const memo = new Memo({
      title,
      content,
      user: user._id
      // "user" is input for ObjectId for each user
      // (e.g.) ObjectId('0500quati0ua0u0agu904w3')
      // Ur supposed to put '0500quati0ua0u0agu904w3' for 'user' key
    });

    await memo.save();
    res.json(memo);

  } catch (err) {
    next(err);
  }
};

// Read a specific Memo by its ID logic
const getMemoById = async (req, res, next) => {
  try {
    const memo = await Memo.findById(req.params.id).populate('user', 'username');

    if (!memo) {
      return res.status(404).json({ message: 'Memo not found' });
    }

    res.json(memo);
  } catch (err) {
    next(err);
  }
};

// Update Memo route logic
const updateMemo = async (req, res, next) => {
  const { title, content } = req.body;
  const memoFields = {};
  if (title) memoFields.title = title;
  if (content) memoFields.content = content;

  try {
    let memo = await Memo.findById(req.params.id);

    if (!memo) {
      return res.status(404).json({ message: 'Memo not found' });
    }

    memo = await Memo.findByIdAndUpdate(req.params.id, { $set: memoFields }, { new: true });
    res.json(memo);
  } catch (err) {
    next(err);
  }
};

// Delete Memo route logic
const deleteMemo = async (req, res, next) => {
  try {
    const memo = await Memo.findById(req.params.id);

    if (!memo) {
      return res.status(404).json({ message: 'Memo not found' });
    }

    await Memo.findByIdAndRemove(req.params.id);
    res.json({ message: 'Memo removed' });
  } catch (err) {
    next(err);
  }
};

// Routes
// http://localhost:5050/api/memos
router.post('/', createMemo);
router.get('/', authenticateJWT, getAllMemos);
router.get('/:id', getMemoById);
router.put('/:id', updateMemo);
router.delete('/:id', deleteMemo);

module.exports = router;
