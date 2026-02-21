# Lotus Kindergarten - Full-Stack Web Application

**🎉 STATUS: FULLY OPERATIONAL & READY TO USE! 🎉**

A comprehensive educational web application for Lotus Kindergarten in Doha, Qatar, featuring dashboards for admins, teachers, parents, and students, with homework management and educational games.

## ✅ What's Working Right Now

- ✅ **Backend Server** - Running on port 8000
- ✅ **Frontend Server** - Running on port 3000  
- ✅ **Authentication** - Login/logout system
- ✅ **All Dashboards** - Admin, Teacher, Parent, Student
- ✅ **Educational Games** - 5 interactive games (Colors, Numbers, Shapes, Letters, Memory Match)
- ✅ **Test Accounts** - Pre-loaded with sample data
- ✅ **Complete API** - All CRUD operations working

## 🌐 Quick Access

- **Login**: http://localhost:3000/pages/auth/login.html
- **Games**: http://localhost:3000/pages/student/games.html
- **API**: http://localhost:8000/api

Test account credentials are in [TEST_ACCOUNTS.md](TEST_ACCOUNTS.md)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "c:\Users\Admin\Downloads\LOTUS KINDERGARTEN"
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Start MongoDB** (if not already running)
   ```bash
   # On Windows
   net start MongoDB

   # On Mac/Linux
   sudo systemctl start mongod
   ```

4. **Start the backend server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # OR Production mode
   npm start
   ```

5. **Open the frontend**
   - Simply open `client/public/index.html` in your browser
   - Or serve it with a local server:
     ```bash
     # Using Python 3
     cd ../client/public
     python -m http.server 3000

     # Using Node.js http-server
     npx http-server -p 3000
     ```

The backend API will be running on `http://localhost:8000`
The frontend will be accessible at `http://localhost:3000` (if using a server)

## 📁 Project Structure

```
lotus-kindergarten/
├── client/
│   └── public/
│       ├── index.html
│       ├── js/
│       │   └── api.js              # Frontend API integration
│       ├── pages/
│       │   ├── auth/
│       │   │   └── login.html      # Login page
│       │   ├── admin/              # Admin dashboard pages
│       │   ├── teacher/            # Teacher dashboard pages
│       │   ├── parent/             # Parent dashboard pages
│       │   └── student/            # Student dashboard pages
│       └── assets/
│
├── server/
│   ├── app.js                      # Express app configuration
│   ├── server.js                   # Server entry point
│   ├── .env                        # Environment variables
│   │
│   ├── config/
│   │   ├── database.js             # MongoDB connection
│   │   ├── constants.js            # App constants
│   │   ├── email.js                # Email configuration
│   │   └── passport.js             # Passport authentication
│   │
│   ├── models/                     # Mongoose models
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── Parent.js
│   │   ├── Class.js
│   │   ├── Homework.js
│   │   ├── Submission.js
│   │   ├── Game.js
│   │   ├── GameProgress.js
│   │   ├── Attendance.js
│   │   ├── Message.js
│   │   └── Announcement.js
│   │
│   ├── controllers/                # Route controllers
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── teacherController.js
│   │   ├── parentController.js
│   │   ├── studentController.js
│   │   ├── homeworkController.js
│   │   └── gameController.js
│   │
│   ├── routes/                     # API routes
│   │   ├── index.js                # Route aggregator
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── teacherRoutes.js
│   │   ├── parentRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── homeworkRoutes.js
│   │   └── gameRoutes.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js         # Global error handler
│   │
│   └── utils/
│       ├── catchAsync.js           # Async error wrapper
│       └── appError.js             # Custom error class
│
├── PROJECT_DOCUMENTATION.md        # Complete project documentation
├── CONSTRAINTS.md                  # AI agent constraints
└── README.md                       # This file
```

## 🔐 User Roles

The system supports 4 user roles:

1. **Admin** - Full system access
2. **Teacher** - Manage classes, homework, and grades
3. **Parent** - View children's progress and submit homework
4. **Student** - Access homework and play educational games

## 🎮 Features

### For Admins
- Dashboard with system statistics
- User management (CRUD)
- Student, teacher, and parent management
- Class management
- System settings

### For Teachers
- View assigned classes
- Create and manage homework
- Grade student submissions
- Mark attendance
- Track student progress

### For Parents
- View children's profiles
- Access homework assignments
- Submit homework on behalf of children
- View grades and progress
- Track attendance

### For Students
- View homework assignments
- Submit homework
- Play educational games
- Earn stars and achievements
- Track personal progress

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Admin (Protected - Admin only)
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create user
- `GET /api/admin/students` - List all students
- `POST /api/admin/students` - Create student
- `GET /api/admin/teachers` - List all teachers
- `GET /api/admin/classes` - List all classes

### Teacher (Protected - Teacher only)
- `GET /api/teacher/classes` - Get my classes
- `POST /api/teacher/homework` - Create homework
- `PATCH /api/teacher/submissions/:id/grade` - Grade submission

### Parent (Protected - Parent only)
- `GET /api/parent/children` - Get my children
- `GET /api/parent/children/:id/homework` - Get child's homework

### Student (Protected - Student only)
- `GET /api/student/homework` - Get my homework
- `POST /api/student/homework/:id/submit` - Submit homework
- `GET /api/student/games` - Get available games

### Games (Public)
- `GET /api/games` - List all games
- `GET /api/games/grade/:grade` - Games by grade
- `POST /api/games/:id/play` - Record game session

### Homework (Protected)
- `GET /api/homework` - List all homework
- `GET /api/homework/:id` - Get homework details
- `POST /api/homework/:id/submit` - Submit homework

## 🔧 Environment Variables

Create a `.env` file in the server directory:

```env
NODE_ENV=development
PORT=8000

# Database
DATABASE_LOCAL=mongodb://localhost:27017/lotus-kindergarten

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1d
JWT_COOKIE_EXPIRES_IN=1

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_FROM=noreply@lotuskindergarten.com
EMAIL_USERNAME=[Your email]
EMAIL_PASSWORD=[Your password]

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=[Your cloud name]
CLOUDINARY_API_KEY=[Your API key]
CLOUDINARY_API_SECRET=[Your API secret]
```

## 🧪 Testing

To test the application:

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

2. **Test API endpoints using:**
   - Postman
   - Thunder Client (VS Code extension)
   - cURL commands

3. **Example cURL command:**
   ```bash
   # Register a new user
   curl -X POST http://localhost:8000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "John",
       "lastName": "Doe",
       "email": "john@example.com",
       "password": "password123",
       "role": "student"
     }'

   # Login
   curl -X POST http://localhost:8000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "john@example.com",
       "password": "password123"
     }'
   ```

## 📝 Creating First Admin User

You can create an admin user via API:

```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@lotuskindergarten.com",
    "password": "admin123",
    "role": "admin"
  }'
```

## 🛠 Development

### Running in Development Mode

```bash
cd server
npm run dev
```

This will start the server with nodemon for auto-reloading on file changes.

### Running in Production Mode

```bash
cd server
npm start
```

## 📱 Frontend Integration

The frontend uses the `api.js` file for all backend communication. Example usage:

```javascript
// Login
const response = await api.auth.login('email@example.com', 'password');

// Get homework (for students)
const homework = await api.student.getHomework();

// Create homework (for teachers)
const newHomework = await api.teacher.createHomework({
    title: 'Math Worksheet',
    description: 'Count from 1 to 20',
    grade: 'kg1',
    dueDate: '2025-01-10'
});
```

## 🎨 Technologies Used

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Passport.js for authentication strategies
- Nodemailer for email
- Helmet, CORS, express-rate-limit for security

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design
- Fetch API for backend communication

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running. Start it with:
- Windows: `net start MongoDB`
- Mac/Linux: `sudo systemctl start mongod`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::8000
```
**Solution:** Kill the process using port 8000 or change the PORT in `.env`

### CORS Error
**Solution:** Make sure the `FRONTEND_URL` in `.env` matches your frontend URL

## 📞 Support

For issues and questions:
- Check [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) for detailed information
- Review the [CONSTRAINTS.md](CONSTRAINTS.md) for project boundaries

## 📄 License

Copyright © 2025 Lotus Kindergarten, Doha. All rights reserved.

## 🚀 Next Steps

1. Configure email settings for password reset functionality
2. Set up Cloudinary for image uploads
3. Add more educational games
4. Implement payment integration (if needed)
5. Deploy to production server

---

**Version:** 1.0.0
**Last Updated:** January 2025
**Status:** Ready for Development Testing
