const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructions: String,
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  grade: {
    type: String,
    enum: ['pre-k', 'kg1', 'kg2']
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  subject: {
    type: String,
    enum: ['english', 'arabic', 'math', 'science', 'art', 'islamic', 'other']
  },
  type: {
    type: String,
    enum: ['worksheet', 'project', 'reading', 'activity', 'game']
  },
  attachments: [{
    filename: String,
    url: String,
    type: String
  }],
  dueDate: Date,
  assignedDate: {
    type: Date,
    default: Date.now
  },
  maxPoints: Number,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard']
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission'
  }]
}, {
  timestamps: true
});

const Homework = mongoose.model('Homework', homeworkSchema);

module.exports = Homework;
