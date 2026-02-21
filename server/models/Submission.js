const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  homeworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homework',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  submittedBy: {
    type: String,
    enum: ['student', 'parent']
  },
  submitterId: mongoose.Schema.Types.ObjectId,
  attachments: [{
    filename: String,
    url: String,
    type: String
  }],
  textResponse: String,
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'late', 'graded', 'returned'],
    default: 'submitted'
  },
  grade: {
    points: Number,
    maxPoints: Number,
    percentage: Number,
    stars: {
      type: Number,
      min: 0,
      max: 5
    },
    feedback: String,
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    gradedAt: Date
  }
}, {
  timestamps: true
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
