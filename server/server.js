const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Load .env from the server directory regardless of CWD
dotenv.config({ path: path.join(__dirname, '.env') });
const app = require('./app');

// Database connection
const DB = process.env.DATABASE_URI || process.env.DATABASE_LOCAL;

if (!DB) {
  console.error('❌ FATAL: DATABASE_URI environment variable is not set!');
  console.error('   Set it in your Render dashboard → Environment → DATABASE_URI');
  process.exit(1);
}

// Mask password in logs for security
const maskedDB = DB.replace(/:([^@]+)@/, ':****@');
console.log(`🔌 Connecting to MongoDB: ${maskedDB}`);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`🚀 App running on port ${port} (DB connecting in background...)`);
});

mongoose
  .connect(DB, {
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 15000,
  })
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((err) => {
    console.error('❌ MongoDB connection FAILED:', err.message);
    console.error('   Check: 1) DATABASE_URI is correct  2) Atlas IP whitelist includes 0.0.0.0/0');
  });

// Handle unhandled rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
