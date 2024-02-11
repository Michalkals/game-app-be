const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  nickname: String,
  score: Number,
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model('Score', scoreSchema);