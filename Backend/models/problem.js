const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  link: { type: String, required: true },
  notes: { type: String, required: false },
  status: { type: String, required: true, enum: ['solved', 'unsolved', 'attempted'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  // Reference to the user
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
