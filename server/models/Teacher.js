const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeId: {
    type: String,
    unique: true,
    required: true
  },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  qualification: String,
  specialization: String,
  assignedClasses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }],
  hireDate: Date,
  photo: String,
  bio: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
