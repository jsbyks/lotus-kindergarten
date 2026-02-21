const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parentId: {
    type: String,
    unique: true,
    required: true
  },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  alternatePhone: String,
  address: {
    street: String,
    city: String,
    country: String
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  relationship: {
    type: String,
    enum: ['father', 'mother', 'guardian']
  },
  occupation: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;
