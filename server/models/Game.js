const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  description: String,
  instructions: String,
  category: {
    type: String,
    enum: ['memory', 'math', 'language', 'shapes', 'colors', 'music', 'puzzle', 'logic']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard']
  },
  forGrades: [{
    type: String,
    enum: ['pre-k', 'kg1', 'kg2']
  }],
  thumbnail: String,
  gameUrl: String,
  config: {
    timeLimit: Number,
    maxLives: Number,
    pointsPerCorrect: Number,
    levels: Number
  },
  skills: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  playCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
