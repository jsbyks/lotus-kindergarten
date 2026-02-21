# 🚀 Quick Start Guide - Lotus Kindergarten

Get your Lotus Kindergarten application up and running in minutes!

---

## 📋 Prerequisites

Before you begin, ensure you have:
- ✅ Node.js (v14 or higher) installed
- ✅ MongoDB installed and running
- ✅ Git (optional, for version control)

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies (if any)
cd ../client
npm install
```

### Step 2: Configure Environment

Create a `.env` file in the `server` directory:

```bash
cd server
copy .env.example .env   # Windows
# or
cp .env.example .env     # Mac/Linux
```

Update `.env` with your settings:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/lotus-kindergarten

# JWT Secret (change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Step 3: Seed Database with Test Data

```bash
cd server
node scripts/seedUsers.js
```

This creates:
- ✅ 1 Admin account
- ✅ 2 Teacher accounts
- ✅ 2 Parent accounts
- ✅ 3 Student accounts
- ✅ 3 Sample classes

---

## 🎮 Running the Application

### Option 1: Use the Quick Start Scripts

**Windows:**
```cmd
START.bat
```

**Mac/Linux:**
```bash
chmod +x START.sh
./START.sh
```

### Option 2: Manual Start

**Terminal 1 - Start MongoDB:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Terminal 2 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 3 - Start Frontend:**
```bash
cd client/public
python -m http.server 3000
# OR
npx http-server -p 3000
```

---

## 🌐 Access the Application

Once running:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **Login Page:** http://localhost:3000/pages/auth/login.html

---

## 🔐 Test Accounts

Use these credentials to login:

### Admin
```
Email: admin@lotus.qa
Password: Admin@123
```

### Teacher
```
Email: teacher@lotus.qa
Password: Teacher@123
```

### Parent
```
Email: parent@lotus.qa
Password: Parent@123
```

### Student
```
Email: student@lotus.qa
Password: Student@123
```

**📖 Full list:** See [TEST_ACCOUNTS.md](TEST_ACCOUNTS.md)

---

## 🧪 Testing the Features

### 1. Test Admin Dashboard
1. Login as `admin@lotus.qa`
2. Access: http://localhost:3000/admin/dashboard.html
3. View all users, students, and teachers

### 2. Test Teacher Dashboard
1. Login as `teacher@lotus.qa`
2. Access: http://localhost:3000/teacher/dashboard.html
3. Create homework assignments
4. View assigned classes

### 3. Test Parent Portal
1. Login as `parent@lotus.qa`
2. Access: http://localhost:3000/parent/dashboard.html
3. View child's (Lina) homework
4. Check progress and grades

### 4. Test Student Dashboard
1. Login as `student@lotus.qa`
2. Access: http://localhost:3000/student/dashboard.html
3. Click "My Homework" to view assignments
4. Click "Play Games" to try educational games

### 5. Test Games
1. Visit: http://localhost:3000/games.html
2. Play **Memory Match Game**
3. Play **Counting Game**
4. Both games work without login!

### 6. Test Homework Access Control
1. Try accessing homework page without login
2. Should redirect to login
3. Login as teacher or parent
4. Should show "Homework is only accessible to students"
5. Login as student
6. Should show homework page ✅

---

## 🛠️ Common Issues & Solutions

### Issue: MongoDB Connection Failed

**Solution:**
```bash
# Check if MongoDB is running
# Windows
sc query MongoDB

# Mac
brew services list

# Linux
sudo systemctl status mongod

# Start MongoDB if not running
# See "Running the Application" section above
```

### Issue: Port Already in Use

**Solution:**
```bash
# Change port in .env file
PORT=8001  # Instead of 8000

# Or kill the process using the port
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

### Issue: Seed Script Fails

**Solution:**
```bash
# Ensure MongoDB is running first
# Then run seed script again
cd server
node scripts/seedUsers.js
```

### Issue: Cannot Access Frontend

**Solution:**
```bash
# Make sure you're in the correct directory
cd client/public

# Try a different port
python -m http.server 3001

# Or use npx
npx http-server -p 3000
```

---

## 📁 Project Structure

```
LOTUS KINDERGARTEN/
├── client/                 # Frontend files
│   ├── public/            # Main public pages
│   │   ├── index.html     # Homepage
│   │   ├── games.html     # Games page
│   │   ├── homework.html  # Homework (students only)
│   │   └── ...
│   ├── pages/             # Additional pages
│   │   └── auth/          # Login/signup
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── css/           # Stylesheets
│   │   └── js/            # JavaScript files
│   └── ...
├── server/                # Backend files
│   ├── controllers/       # Business logic
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── scripts/          # Utility scripts
│   │   └── seedUsers.js  # Test data seed
│   ├── config/           # Configuration
│   ├── app.js            # Express app
│   └── server.js         # Server entry point
└── ...
```

---

## 🎯 Next Steps

After testing:

1. **Customize Content**
   - Update school information
   - Add real images to gallery
   - Customize homepage content

2. **Add More Data**
   - Create more students
   - Add more classes
   - Create homework assignments
   - Add announcements

3. **Implement Additional Features**
   - Create more educational games
   - Add attendance tracking UI
   - Implement messaging system
   - Add file upload for homework

4. **Prepare for Production**
   - Change all default passwords
   - Update JWT secret
   - Configure production database
   - Set up SSL certificate
   - Deploy to hosting service

---

## 📚 Additional Resources

- **Project Documentation:** [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)
- **Test Accounts:** [TEST_ACCOUNTS.md](TEST_ACCOUNTS.md)
- **Setup Guide:** [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Project Status:** [PROJECT_STATUS.md](PROJECT_STATUS.md)

---

## 💡 Tips

- 🔄 **Reseed Database:** Run `node scripts/seedUsers.js` anytime to reset test data
- 🎨 **Customize Fonts:** Edit `client/src/css/global-styles.css`
- 🎮 **Add Games:** Modify `client/public/games.html`
- 📝 **Create Homework:** Login as teacher and use homework APIs

---

## 📞 Need Help?

If you encounter any issues:

1. Check console logs (browser & terminal)
2. Verify MongoDB is running
3. Ensure all dependencies are installed
4. Check `.env` configuration
5. Review error messages carefully

---

**Happy Testing! 🎉**

The Lotus Kindergarten application is now ready to use!

---

**Last Updated:** January 3, 2026
**Version:** 1.0
