require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const DB = process.env.DATABASE_URI;

mongoose.connect(DB, {serverSelectionTimeoutMS: 5000})
  .then(async () => {
    const user = await User.findOne({email: 'student@lotus.qa'}).select('+password');
    console.log('User found:', !!user);

    if(user) {
      const isMatch = await bcrypt.compare('Student@123', user.password);
      console.log('Password match:', isMatch);
      console.log('Password hash length:', user.password.length);
    }

    process.exit(0);
  })
  .catch(err => {
    console.log('Error:', err.message);
    process.exit(1);
  });
