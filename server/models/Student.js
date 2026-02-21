const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    unique: true,
    required: true
  },
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  class: {
    type: String,
    enum: ['pre-k', 'kg1', 'kg2']
  },
  section: String,
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent'
  },
  enrollmentDate: Date,
  photo: String,
  allergies: [String],
  medicalNotes: String,
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  gameProgress: {
    totalStars: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
