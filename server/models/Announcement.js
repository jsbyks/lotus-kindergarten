const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['general', 'urgent', 'event', 'holiday'],
    default: 'general'
  },
  targetAudience: [{
    type: String,
    enum: ['all', 'teachers', 'parents', 'pre-k', 'kg1', 'kg2']
  }],
  attachments: [String],
  publishedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: Date,
  isPinned: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
