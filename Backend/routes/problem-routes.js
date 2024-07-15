// routes/problem.js
const express = require('express');
const Problem = require('../models/problem');
const router = express.Router();
const authenticateUser = require('../middlewares/auth-middleware');

// Get problems by category for a specific user
router.get('/:category', authenticateUser, async (req, res) => {
  try {
    const problems = await Problem.find({ category: req.params.category, user: req.user._id });
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new problem
router.post('/', authenticateUser, async (req, res) => {
  try {
    const newProblem = new Problem({ ...req.body, user: req.user._id });
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a problem
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const updatedProblem = await Problem.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProblem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a problem
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    await Problem.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
