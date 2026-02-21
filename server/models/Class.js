const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    enum: ['pre-k', 'kg1', 'kg2'],
    required: true
  },
  section: String,
  academicYear: String,
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  assistantTeacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  capacity: Number,
  schedule: {
    startTime: String,
    endTime: String,
    days: [String]
  },
  classroom: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
