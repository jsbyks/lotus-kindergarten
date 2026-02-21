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
const DB = process.env.DATABASE_URI || process.env.DATABASE_LOCAL || 'mongodb://localhost:27017/lotus-kindergarten';

console.log('Connecting to MongoDB...');
mongoose
  .connect(DB, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log('✅ DB connection successful!'))
  .catch((err) => console.error('❌ DB connection error:', err));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle unhandled rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
