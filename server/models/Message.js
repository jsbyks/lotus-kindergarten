const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: String,
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderRole: {
    type: String,
    enum: ['admin', 'teacher', 'parent']
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientRole: {
    type: String,
    enum: ['admin', 'teacher', 'parent']
  },
  subject: String,
  message: {
    type: String,
    required: true
  },
  attachments: [String],
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
