const express = require('express');
const router = express.Router();
const Memo = require('../models/memoModel');

// Create Memo route logic
const createMemo = async (req, res, next) => {
  try {
    const { title, content, user } = req.body;

    const memo = new Memo({
      title,
      content,
      user
    });

    await memo.save();
    res.json(memo);

  } catch (err) {
    next(err);
  }
};

// Read all Memos route logic
const getAllMemos = async (req, res, next) => {
  try {
    const memos = await Memo.find().populate('user', 'username');
    res.json(memos);
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
router.get('/', getAllMemos);
router.get('/:id', getMemoById);
router.put('/:id', updateMemo);
router.delete('/:id', deleteMemo);

module.exports = router;
