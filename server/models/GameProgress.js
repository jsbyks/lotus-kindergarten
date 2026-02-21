const mongoose = require('mongoose');

const gameProgressSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  sessionsPlayed: {
    type: Number,
    default: 0
  },
  totalTimePlayed: {
    type: Number,
    default: 0 // in seconds
  },
  highScore: {
    type: Number,
    default: 0
  },
  currentLevel: {
    type: Number,
    default: 1
  },
  starsEarned: {
    type: Number,
    default: 0
  },
  achievements: [{
    badge: String,
    earnedAt: Date
  }],
  lastPlayedAt: Date,
  history: [{
    playedAt: Date,
    score: Number,
    level: Number,
    timePlayed: Number
  }]
}, {
  timestamps: true
});

const GameProgress = mongoose.model('GameProgress', gameProgressSchema);

module.exports = GameProgress;
