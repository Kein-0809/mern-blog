
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Registration route
router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      username,
      password: bcrypt.hashSync(password, 10)
    });

    await user.save();

    const payload = {
      id: user.id
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (error) {
    // next(error);
    console.error("Error during registration:", error.message);
    res.status(500).send({ message: "Error registering. Please try again." });
  }
});

// Login route
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      id: user.id
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (error) {
    // next(error);
    console.error("Error during login:", error.message);
    res.status(500).send({ message: "Error login. Please try again." });
  }
});

module.exports = router;