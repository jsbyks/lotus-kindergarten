# Lotus Kindergarten Doha - Full-Stack Web Application
## Complete Technical Documentation & Development Roadmap

---

## 📋 PROJECT OVERVIEW

| Field | Details |
|-------|---------|
| **Client** | Lotus Kindergarten |
| **Location** | Doha, Qatar |
| **Project Type** | Full-Stack Educational Web Application |
| **Programs Offered** | Pre-K, KG1, KG2 |
| **Tech Stack** | Frontend (HTML/CSS/JS) + Backend (Node.js) + Database |

---

## 🏫 SCHOOL PROGRAMS

| Program | Age Range | Description |
|---------|-----------|-------------|
| **Pre-K** | 3-4 years | Foundation skills, play-based learning |
| **KG1** | 4-5 years | Early literacy, numeracy, social skills |
| **KG2** | 5-6 years | School readiness, advanced curriculum |

---

## 📁 COMPLETE PROJECT STRUCTURE

```
lotus-kindergarten/
│
├── 📂 client/                          # FRONTEND
│   ├── 📂 public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── 📂 assets/
│   │       ├── 📂 images/
│   │       ├── 📂 icons/
│   │       ├── 📂 videos/
│   │       └── 📂 sounds/              # Game sounds
│   │
│   ├── 📂 src/
│   │   ├── 📂 css/
│   │   │   ├── main.css
│   │   │   ├── components.css
│   │   │   ├── dashboard.css
│   │   │   ├── games.css
│   │   │   └── responsive.css
│   │   │
│   │   ├── 📂 js/
│   │   │   ├── main.js
│   │   │   ├── auth.js                 # Authentication handling
│   │   │   ├── api.js                  # API calls
│   │   │   ├── utils.js                # Utility functions
│   │   │   ├── validation.js           # Form validation
│   │   │   └── notifications.js        # Toast/alerts
│   │   │
│   │   ├── 📂 components/              # Reusable components
│   │   │   ├── header.js
│   │   │   ├── footer.js
│   │   │   ├── sidebar.js
│   │   │   ├── modal.js
│   │   │   ├── loader.js
│   │   │   └── datatable.js
│   │   │
│   │   └── 📂 games/                   # Game modules
│   │       ├── gameEngine.js
│   │       ├── memory.js
│   │       ├── counting.js
│   │       ├── alphabet.js
│   │       ├── shapes.js
│   │       ├── colors.js
│   │       ├── puzzles.js
│   │       ├── matching.js
│   │       ├── spelling.js
│   │       ├── math.js
│   │       └── music.js
│   │
│   └── 📂 pages/
│       ├── 📂 public/                  # Public pages
│       │   ├── index.html              # Homepage
│       │   ├── about.html
│       │   ├── programs.html
│       │   ├── admissions.html
│       │   ├── gallery.html
│       │   ├── events.html
│       │   ├── news.html
│       │   ├── contact.html
│       │   └── careers.html
│       │
│       ├── 📂 auth/                    # Authentication pages
│       │   ├── login.html
│       │   ├── register.html
│       │   ├── forgot-password.html
│       │   ├── reset-password.html
│       │   └── verify-email.html
│       │
│       ├── 📂 admin/                   # Admin dashboard
│       │   ├── dashboard.html
│       │   ├── students.html
│       │   ├── teachers.html
│       │   ├── parents.html
│       │   ├── classes.html
│       │   ├── homework.html
│       │   ├── games-manager.html
│       │   ├── reports.html
│       │   ├── announcements.html
│       │   ├── settings.html
│       │   └── audit-logs.html
│       │
│       ├── 📂 teacher/                 # Teacher dashboard
│       │   ├── dashboard.html
│       │   ├── my-classes.html
│       │   ├── students.html
│       │   ├── homework-create.html
│       │   ├── homework-review.html
│       │   ├── grades.html
│       │   ├── attendance.html
│       │   ├── progress-reports.html
│       │   ├── messages.html
│       │   ├── calendar.html
│       │   └── profile.html
│       │
│       ├── 📂 parent/                  # Parent dashboard
│       │   ├── dashboard.html
│       │   ├── my-children.html
│       │   ├── homework.html
│       │   ├── grades.html
│       │   ├── attendance.html
│       │   ├── progress.html
│       │   ├── messages.html
│       │   ├── payments.html
│       │   ├── calendar.html
│       │   └── profile.html
│       │
│       ├── 📂 student/                 # Student/Child dashboard
│       │   ├── dashboard.html
│       │   ├── my-homework.html
│       │   ├── submit-homework.html
│       │   ├── my-grades.html
│       │   ├── games-hub.html
│       │   ├── achievements.html
│       │   ├── my-profile.html
│       │   └── 📂 games/
│       │       ├── index.html
│       │       ├── memory.html
│       │       ├── counting.html
│       │       ├── alphabet.html
│       │       ├── shapes.html
│       │       ├── colors.html
│       │       ├── puzzles.html
│       │       ├── math.html
│       │       ├── spelling.html
│       │       └── music.html
│       │
│       └── 📂 errors/                  # Error pages
│           ├── 404.html
│           ├── 403.html
│           ├── 500.html
│           └── maintenance.html
│
├── 📂 server/                          # BACKEND
│   ├── 📄 app.js                       # Express app setup
│   ├── 📄 server.js                    # Server entry point
│   ├── 📄 package.json
│   ├── 📄 .env                         # Environment variables
│   ├── 📄 .env.example
│   │
│   ├── 📂 config/
│   │   ├── database.js                 # MongoDB connection
│   │   ├── passport.js                 # Authentication config
│   │   ├── cloudinary.js               # Image upload config
│   │   ├── email.js                    # Email service config
│   │   └── constants.js                # App constants
│   │
│   ├── 📂 models/                      # Database models
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── Parent.js
│   │   ├── Admin.js
│   │   ├── Class.js
│   │   ├── Homework.js
│   │   ├── Submission.js
│   │   ├── Grade.js
│   │   ├── Attendance.js
│   │   ├── Game.js
│   │   ├── GameProgress.js
│   │   ├── Achievement.js
│   │   ├── Message.js
│   │   ├── Announcement.js
│   │   ├── Event.js
│   │   ├── Payment.js
│   │   └── AuditLog.js
│   │
│   ├── 📂 controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── teacherController.js
│   │   ├── parentController.js
│   │   ├── studentController.js
│   │   ├── homeworkController.js
│   │   ├── gradeController.js
│   │   ├── attendanceController.js
│   │   ├── gameController.js
│   │   ├── messageController.js
│   │   ├── paymentController.js
│   │   └── reportController.js
│   │
│   ├── 📂 routes/
│   │   ├── index.js                    # Route aggregator
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── teacherRoutes.js
│   │   ├── parentRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── homeworkRoutes.js
│   │   ├── gameRoutes.js
│   │   ├── messageRoutes.js
│   │   └── publicRoutes.js
│   │
│   ├── 📂 middleware/
│   │   ├── auth.js                     # JWT verification
│   │   ├── roleCheck.js                # Role-based access
│   │   ├── validation.js               # Input validation
│   │   ├── rateLimiter.js              # API rate limiting
│   │   ├── errorHandler.js             # Global error handler
│   │   ├── logger.js                   # Request logging
│   │   └── upload.js                   # File upload handler
│   │
│   ├── 📂 services/
│   │   ├── emailService.js
│   │   ├── smsService.js
│   │   ├── notificationService.js
│   │   ├── reportService.js
│   │   └── gameService.js
│   │
│   ├── 📂 utils/
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   ├── encryption.js
│   │   ├── tokenGenerator.js
│   │   └── responseFormatter.js
│   │
│   └── 📂 tests/
│       ├── auth.test.js
│       ├── homework.test.js
│       ├── games.test.js
│       └── api.test.js
│
├── 📂 database/
│   ├── 📂 migrations/
│   ├── 📂 seeds/
│   │   ├── adminSeed.js
│   │   ├── classesSeed.js
│   │   └── gamesSeed.js
│   └── 📂 backups/
│
├── 📄 README.md
├── 📄 PROJECT_DOCUMENTATION.md
├── 📄 API_DOCUMENTATION.md
├── 📄 .gitignore
├── 📄 docker-compose.yml
└── 📄 nginx.conf
```

---

## 🔧 TECHNOLOGY STACK

### Frontend
| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 / Tailwind CSS | Styling |
| JavaScript (ES6+) | Interactivity |
| Font Awesome | Icons |
| Google Fonts | Typography |
| Chart.js | Dashboard charts |
| FullCalendar.js | Calendar views |
| SweetAlert2 | Alerts & modals |
| DataTables | Data tables |
| Swiper.js | Carousels |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Passport.js | Authentication middleware |
| Multer | File uploads |
| Nodemailer | Email service |
| express-validator | Input validation |
| helmet | Security headers |
| cors | Cross-origin requests |
| morgan | HTTP logging |
| winston | Application logging |
| dotenv | Environment variables |
| node-cron | Scheduled tasks |

### DevOps & Deployment
| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Nginx | Reverse proxy |
| PM2 | Process management |
| GitHub Actions | CI/CD |
| Cloudinary | Image hosting |
| MongoDB Atlas | Cloud database |

---

## 🗄️ DATABASE SCHEMA

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  role: Enum ['admin', 'teacher', 'parent', 'student'],
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String,
  isActive: Boolean (default: true),
  isVerified: Boolean (default: false),
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Students Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  studentId: String (unique, e.g., "LK-2024-001"),
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: Enum ['male', 'female'],
  class: Enum ['pre-k', 'kg1', 'kg2'],
  section: String (e.g., 'A', 'B'),
  classId: ObjectId (ref: Classes),
  parentId: ObjectId (ref: Parents),
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
    totalStars: Number,
    level: Number,
    badges: [String]
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Teachers Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  employeeId: String (unique),
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  qualification: String,
  specialization: String,
  assignedClasses: [ObjectId] (ref: Classes),
  hireDate: Date,
  photo: String,
  bio: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Parents Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  parentId: String (unique),
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
  children: [ObjectId] (ref: Students),
  relationship: Enum ['father', 'mother', 'guardian'],
  occupation: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Classes Collection
```javascript
{
  _id: ObjectId,
  className: String (e.g., "Pre-K A"),
  grade: Enum ['pre-k', 'kg1', 'kg2'],
  section: String,
  academicYear: String (e.g., "2024-2025"),
  teacherId: ObjectId (ref: Teachers),
  assistantTeacherId: ObjectId (ref: Teachers),
  students: [ObjectId] (ref: Students),
  capacity: Number,
  schedule: {
    startTime: String,
    endTime: String,
    days: [String]
  },
  classroom: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Homework Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  instructions: String,
  classId: ObjectId (ref: Classes),
  grade: Enum ['pre-k', 'kg1', 'kg2'],
  teacherId: ObjectId (ref: Teachers),
  subject: Enum ['english', 'arabic', 'math', 'science', 'art', 'islamic', 'other'],
  type: Enum ['worksheet', 'project', 'reading', 'activity', 'game'],
  attachments: [{
    filename: String,
    url: String,
    type: String
  }],
  dueDate: Date,
  assignedDate: Date,
  maxPoints: Number,
  difficulty: Enum ['easy', 'medium', 'hard'],
  isPublished: Boolean,
  submissions: [ObjectId] (ref: Submissions),
  createdAt: Date,
  updatedAt: Date
}
```

### Submissions Collection
```javascript
{
  _id: ObjectId,
  homeworkId: ObjectId (ref: Homework),
  studentId: ObjectId (ref: Students),
  submittedBy: Enum ['student', 'parent'],
  submitterId: ObjectId,
  attachments: [{
    filename: String,
    url: String,
    type: String
  }],
  textResponse: String,
  submittedAt: Date,
  status: Enum ['pending', 'submitted', 'late', 'graded', 'returned'],
  grade: {
    points: Number,
    maxPoints: Number,
    percentage: Number,
    stars: Number (1-5),
    feedback: String,
    gradedBy: ObjectId (ref: Teachers),
    gradedAt: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Games Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  description: String,
  instructions: String,
  category: Enum ['memory', 'math', 'language', 'shapes', 'colors', 'music', 'puzzle', 'logic'],
  difficulty: Enum ['easy', 'medium', 'hard'],
  forGrades: [Enum ['pre-k', 'kg1', 'kg2']],
  thumbnail: String,
  gameUrl: String,
  config: {
    timeLimit: Number,
    maxLives: Number,
    pointsPerCorrect: Number,
    levels: Number
  },
  skills: [String],
  isActive: Boolean,
  playCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### GameProgress Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Students),
  gameId: ObjectId (ref: Games),
  sessionsPlayed: Number,
  totalTimePlayed: Number (seconds),
  highScore: Number,
  currentLevel: Number,
  starsEarned: Number,
  achievements: [{
    badge: String,
    earnedAt: Date
  }],
  lastPlayedAt: Date,
  history: [{
    playedAt: Date,
    score: Number,
    level: Number,
    timePlayed: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Attendance Collection
```javascript
{
  _id: ObjectId,
  classId: ObjectId (ref: Classes),
  date: Date,
  records: [{
    studentId: ObjectId (ref: Students),
    status: Enum ['present', 'absent', 'late', 'excused'],
    checkInTime: Date,
    checkOutTime: Date,
    notes: String
  }],
  markedBy: ObjectId (ref: Teachers),
  createdAt: Date,
  updatedAt: Date
}
```

### Messages Collection
```javascript
{
  _id: ObjectId,
  conversationId: String,
  senderId: ObjectId (ref: Users),
  senderRole: Enum ['admin', 'teacher', 'parent'],
  recipientId: ObjectId (ref: Users),
  recipientRole: Enum ['admin', 'teacher', 'parent'],
  subject: String,
  message: String,
  attachments: [String],
  isRead: Boolean,
  readAt: Date,
  replyTo: ObjectId (ref: Messages),
  createdAt: Date
}
```

### Announcements Collection
```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  type: Enum ['general', 'urgent', 'event', 'holiday'],
  targetAudience: [Enum ['all', 'teachers', 'parents', 'pre-k', 'kg1', 'kg2']],
  attachments: [String],
  publishedBy: ObjectId (ref: Users),
  publishedAt: Date,
  expiresAt: Date,
  isPinned: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### AuditLog Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  userRole: String,
  action: String,
  resource: String,
  resourceId: ObjectId,
  details: Object,
  ipAddress: String,
  userAgent: String,
  createdAt: Date
}
```

---

## 🔐 AUTHENTICATION & SECURITY

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. LOGIN REQUEST                                                │
│     ┌──────────┐         ┌──────────┐         ┌──────────┐     │
│     │  Client  │────────▶│  Server  │────────▶│ Database │     │
│     │  (Form)  │ email/  │(Validate)│  Query  │ (Users)  │     │
│     └──────────┘ password└──────────┘         └──────────┘     │
│                                                                  │
│  2. VERIFICATION                                                 │
│     ┌──────────┐         ┌──────────┐                          │
│     │  bcrypt  │────────▶│  Match?  │                          │
│     │ compare  │         │  Yes/No  │                          │
│     └──────────┘         └──────────┘                          │
│                               │                                  │
│  3. TOKEN GENERATION          ▼                                  │
│     ┌──────────────────────────────────────┐                    │
│     │  JWT Token (Access + Refresh)        │                    │
│     │  - userId, role, permissions         │                    │
│     │  - Access: 15min, Refresh: 7 days    │                    │
│     └──────────────────────────────────────┘                    │
│                                                                  │
│  4. PROTECTED ROUTES                                             │
│     ┌──────────┐         ┌──────────┐         ┌──────────┐     │
│     │  Request │────────▶│  Auth    │────────▶│ Role     │     │
│     │ + Token  │         │Middleware│         │ Check    │     │
│     └──────────┘         └──────────┘         └──────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Security Measures

| Layer | Implementation |
|-------|----------------|
| **Password Security** | bcrypt hashing (12 salt rounds) |
| **Token Security** | JWT with RS256, short expiry, refresh tokens |
| **API Security** | Rate limiting (100 req/15min), CORS, Helmet.js |
| **Input Validation** | express-validator, sanitization, XSS prevention |
| **Database Security** | Mongoose validation, injection prevention |
| **Session Security** | HTTP-only cookies, secure flag, SameSite |
| **File Upload** | Type validation, size limits, virus scan |
| **Audit Logging** | All sensitive actions logged |
| **HTTPS** | SSL/TLS encryption |
| **2FA (Optional)** | TOTP for admin accounts |

### Role-Based Access Control (RBAC)

```javascript
const permissions = {
  admin: {
    users: ['create', 'read', 'update', 'delete'],
    students: ['create', 'read', 'update', 'delete'],
    teachers: ['create', 'read', 'update', 'delete'],
    parents: ['create', 'read', 'update', 'delete'],
    classes: ['create', 'read', 'update', 'delete'],
    homework: ['create', 'read', 'update', 'delete'],
    games: ['create', 'read', 'update', 'delete'],
    reports: ['create', 'read', 'export'],
    settings: ['read', 'update'],
    auditLogs: ['read']
  },
  teacher: {
    students: ['read', 'update'],  // own classes only
    homework: ['create', 'read', 'update', 'delete'],  // own classes
    grades: ['create', 'read', 'update'],
    attendance: ['create', 'read', 'update'],
    messages: ['create', 'read'],
    games: ['read', 'assign'],
    reports: ['read']  // own classes
  },
  parent: {
    children: ['read'],
    homework: ['read', 'submit'],
    grades: ['read'],
    attendance: ['read'],
    messages: ['create', 'read'],
    payments: ['read', 'create'],
    games: ['read']
  },
  student: {
    homework: ['read', 'submit'],
    grades: ['read'],
    games: ['play'],
    achievements: ['read'],
    profile: ['read']
  }
};
```

---

## 🔌 API ENDPOINTS

### Authentication APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/logout` | User logout | Authenticated |
| POST | `/api/auth/refresh-token` | Refresh access token | Authenticated |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| POST | `/api/auth/reset-password` | Reset password | Public |
| GET | `/api/auth/verify-email/:token` | Verify email | Public |
| GET | `/api/auth/me` | Get current user | Authenticated |
| PUT | `/api/auth/change-password` | Change password | Authenticated |

### Admin APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/admin/dashboard` | Dashboard stats | Admin |
| GET | `/api/admin/users` | List all users | Admin |
| POST | `/api/admin/users` | Create user | Admin |
| PUT | `/api/admin/users/:id` | Update user | Admin |
| DELETE | `/api/admin/users/:id` | Delete user | Admin |
| GET | `/api/admin/students` | List all students | Admin |
| POST | `/api/admin/students` | Create student | Admin |
| GET | `/api/admin/teachers` | List all teachers | Admin |
| POST | `/api/admin/teachers` | Create teacher | Admin |
| GET | `/api/admin/classes` | List all classes | Admin |
| POST | `/api/admin/classes` | Create class | Admin |
| GET | `/api/admin/reports` | Generate reports | Admin |
| GET | `/api/admin/audit-logs` | View audit logs | Admin |
| PUT | `/api/admin/settings` | Update settings | Admin |

### Teacher APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/teacher/dashboard` | Dashboard data | Teacher |
| GET | `/api/teacher/classes` | My classes | Teacher |
| GET | `/api/teacher/classes/:id/students` | Class students | Teacher |
| GET | `/api/teacher/homework` | My homework | Teacher |
| POST | `/api/teacher/homework` | Create homework | Teacher |
| PUT | `/api/teacher/homework/:id` | Update homework | Teacher |
| DELETE | `/api/teacher/homework/:id` | Delete homework | Teacher |
| GET | `/api/teacher/submissions` | View submissions | Teacher |
| PUT | `/api/teacher/submissions/:id/grade` | Grade submission | Teacher |
| GET | `/api/teacher/attendance/:classId` | View attendance | Teacher |
| POST | `/api/teacher/attendance` | Mark attendance | Teacher |
| GET | `/api/teacher/messages` | View messages | Teacher |
| POST | `/api/teacher/messages` | Send message | Teacher |

### Parent APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/parent/dashboard` | Dashboard data | Parent |
| GET | `/api/parent/children` | My children | Parent |
| GET | `/api/parent/children/:id` | Child details | Parent |
| GET | `/api/parent/homework` | Children's homework | Parent |
| POST | `/api/parent/homework/:id/submit` | Submit homework | Parent |
| GET | `/api/parent/grades` | Children's grades | Parent |
| GET | `/api/parent/attendance` | Children's attendance | Parent |
| GET | `/api/parent/messages` | View messages | Parent |
| POST | `/api/parent/messages` | Send message | Parent |
| GET | `/api/parent/payments` | View payments | Parent |

### Student APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/student/dashboard` | Dashboard data | Student |
| GET | `/api/student/homework` | My homework | Student |
| POST | `/api/student/homework/:id/submit` | Submit homework | Student |
| GET | `/api/student/grades` | My grades | Student |
| GET | `/api/student/games` | Available games | Student |
| POST | `/api/student/games/:id/start` | Start game session | Student |
| POST | `/api/student/games/:id/complete` | Complete game | Student |
| GET | `/api/student/achievements` | My achievements | Student |
| GET | `/api/student/progress` | My progress | Student |

### Game APIs
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/games` | List all games | Authenticated |
| GET | `/api/games/:grade` | Games by grade | Authenticated |
| GET | `/api/games/:id` | Game details | Authenticated |
| POST | `/api/games/:id/play` | Record play session | Student |
| GET | `/api/games/:id/leaderboard` | Game leaderboard | Authenticated |
| POST | `/api/games` | Create game | Admin |
| PUT | `/api/games/:id` | Update game | Admin |

---

## 👥 USER DASHBOARDS

### 🔴 ADMIN DASHBOARD

```
┌─────────────────────────────────────────────────────────────────────┐
│  🪷 LOTUS KINDERGARTEN - ADMIN DASHBOARD          [👤 Admin] [🚪]  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  📊 OVERVIEW                                                  │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │  │
│  │  │ 👨‍🎓 156  │ │ 👨‍🏫 12   │ │ 👨‍👩‍👧 145  │ │ 📚 28   │ │ 🎮 95%  │ │  │
│  │  │Students │ │Teachers │ │Parents  │ │Homework │ │Attend.  │ │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  SIDEBAR              MAIN CONTENT                                  │
│  ┌──────────┐        ┌────────────────────────────────────────────┐│
│  │ Dashboard│        │  RECENT ACTIVITY                           ││
│  │ Students │        │  ───────────────                           ││
│  │ Teachers │        │  • New student enrolled: Ahmed Ali         ││
│  │ Parents  │        │  • Homework submitted: 15 new              ││
│  │ Classes  │        │  • Payment received: QAR 4,200             ││
│  │ Homework │        │                                            ││
│  │ Games    │        │  ┌─────────────────┐ ┌─────────────────┐   ││
│  │ Attendance│       │  │ ENROLLMENT CHART│ │ ATTENDANCE CHART│   ││
│  │ Reports  │        │  │     📈          │ │      📊         │   ││
│  │ Messages │        │  └─────────────────┘ └─────────────────┘   ││
│  │ Settings │        │                                            ││
│  │ Audit Log│        │  QUICK ACTIONS                             ││
│  └──────────┘        │  [+ Add Student] [+ Add Teacher] [📢 Announce]│
│                      └────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**Admin Features:**
- [ ] Complete system overview with statistics
- [ ] Manage all users (CRUD operations)
- [ ] Manage students, teachers, parents
- [ ] Manage classes and sections
- [ ] View all homework and submissions
- [ ] Manage games library
- [ ] Generate reports (PDF/Excel)
- [ ] Send announcements
- [ ] System settings
- [ ] View audit logs
- [ ] Backup management

---

### 🟢 TEACHER DASHBOARD

```
┌─────────────────────────────────────────────────────────────────────┐
│  🪷 LOTUS KINDERGARTEN - TEACHER DASHBOARD    [👩‍🏫 Ms. Sarah] [🚪]  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Good Morning, Ms. Sarah! 🌟                                        │
│                                                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │ 📚 My Classes│ │ 📝 Homework │ │ ✅ Pending  │ │ 📊 Today    │   │
│  │     3       │ │     12      │ │    5 grade  │ │   95%       │   │
│  │   classes   │ │  assigned   │ │  submissions│ │  attendance │   │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘   │
│                                                                     │
│  SIDEBAR              MAIN CONTENT                                  │
│  ┌──────────┐        ┌────────────────────────────────────────────┐│
│  │ Dashboard│        │  MY CLASSES                                 ││
│  │ My Classes│       │  ┌──────────────────────────────────────┐  ││
│  │ Students │        │  │ Pre-K A     │ KG1 B      │ KG2 A     │  ││
│  │ Homework │        │  │ 18 students │ 20 students│ 22 students│  ││
│  │ Submissions│      │  │ [View]      │ [View]     │ [View]    │  ││
│  │ Grades   │        │  └──────────────────────────────────────┘  ││
│  │ Attendance│       │                                            ││
│  │ Messages │        │  PENDING SUBMISSIONS                        ││
│  │ Calendar │        │  • Lina Ahmed - Letter Tracing (Pre-K A)   ││
│  │ Profile  │        │  • Omar Hassan - Counting 1-20 (KG1 B)     ││
│  └──────────┘        │  [Grade All]                               ││
│                      └────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**Teacher Features:**
- [ ] View assigned classes
- [ ] View students in each class
- [ ] Create/edit/delete homework
- [ ] Upload worksheets (PDF, images)
- [ ] View and grade submissions
- [ ] Add feedback with stars
- [ ] Mark daily attendance
- [ ] Generate progress reports
- [ ] Message parents
- [ ] View class calendar
- [ ] Assign games to classes

---

### 🔵 PARENT DASHBOARD

```
┌─────────────────────────────────────────────────────────────────────┐
│  🪷 LOTUS KINDERGARTEN - PARENT PORTAL      [👨 Mr. Ahmed] [🚪]    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Welcome back! Here's how Lina is doing 🌟                          │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  👧 LINA AHMED                                                │  │
│  │  Pre-K A | Student ID: LK-2024-042                           │  │
│  │  ⭐⭐⭐⭐⭐ Excellent Progress!                                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │ 📚 Homework │ │ ⭐ Grades   │ │ 📅 Attendance│ │ 🎮 Games    │   │
│  │  2 pending  │ │   92%       │ │    98%      │ │  15 stars   │   │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘   │
│                                                                     │
│  SIDEBAR              MAIN CONTENT                                  │
│  ┌──────────┐        ┌────────────────────────────────────────────┐│
│  │ Dashboard│        │  PENDING HOMEWORK                          ││
│  │ My Children│      │  ┌──────────────────────────────────────┐  ││
│  │ Homework │        │  │ 📝 Letter B Tracing                  │  ││
│  │ Grades   │        │  │    Due: Tomorrow | Easy              │  ││
│  │ Attendance│       │  │    [Download] [Upload Completed]     │  ││
│  │ Progress │        │  ├──────────────────────────────────────┤  ││
│  │ Messages │        │  │ 🔢 Count Objects 1-10                │  ││
│  │ Payments │        │  │    Due: Sunday | Medium              │  ││
│  │ Calendar │        │  │    [Download] [Upload Completed]     │  ││
│  │ Profile  │        │  └──────────────────────────────────────┘  ││
│  └──────────┘        │                                            ││
│                      │  RECENT GRADES                              ││
│                      │  • Letter A Tracing: ⭐⭐⭐⭐⭐ Excellent!    ││
│                      └────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**Parent Features:**
- [ ] View child's profile
- [ ] View homework assignments
- [ ] Download worksheets
- [ ] Upload completed homework
- [ ] View grades and feedback
- [ ] View attendance records
- [ ] Track learning progress
- [ ] View game achievements
- [ ] Message teachers
- [ ] View/pay fees
- [ ] View school calendar
- [ ] Receive notifications

---

### 🟡 STUDENT/CHILD DASHBOARD

```
┌─────────────────────────────────────────────────────────────────────┐
│  🪷 LOTUS KINDERGARTEN                        [👧 Lina] [🚪]        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │     🌟 Welcome, Lina! 🌟                                      │  │
│  │     You have earned 156 stars! Keep going!                    │  │
│  │     Level: ⭐⭐⭐ Super Star                                    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                                                                 ││
│  │   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌──────────┐ ││
│  │   │ 📚        │   │ 🎮        │   │ ⭐        │   │ 🏆       │ ││
│  │   │ My        │   │ Play      │   │ My        │   │ My       │ ││
│  │   │ Homework  │   │ Games     │   │ Grades    │   │ Badges   │ ││
│  │   │           │   │           │   │           │   │          │ ││
│  │   └───────────┘   └───────────┘   └───────────┘   └──────────┘ ││
│  │                                                                 ││
│  │   ┌─────────────────────────────────────────────────────────┐  ││
│  │   │  🎮 FUN GAMES FOR YOU!                                   │  ││
│  │   │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │  ││
│  │   │  │ 🧠  │ │ 🔢  │ │ 🔤  │ │ 🎨  │ │ 🔷  │ │ 🎵  │       │  ││
│  │   │  │Match│ │Count│ │ABC  │ │Color│ │Shape│ │Music│       │  ││
│  │   │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘       │  ││
│  │   └─────────────────────────────────────────────────────────┘  ││
│  │                                                                 ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  🏆 MY BADGES: [🌟 First Star] [📚 Homework Hero] [🎮 Game Master] │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Student Features:**
- [ ] Child-friendly colorful interface
- [ ] Large, easy-to-click buttons
- [ ] View homework (with pictures)
- [ ] Submit homework (with help)
- [ ] Play educational games
- [ ] Earn stars and badges
- [ ] View achievements
- [ ] Progress visualization
- [ ] Audio instructions (optional)

---

## 🎮 GAMES SYSTEM

### Games by Grade Level

| Game | Pre-K | KG1 | KG2 | Skills |
|------|-------|-----|-----|--------|
| Memory Match | ✅ Easy (4 pairs) | ✅ Medium (6 pairs) | ✅ Hard (8 pairs) | Memory |
| Counting Fun | ✅ 1-5 | ✅ 1-10 | ✅ 1-20 | Numbers |
| Alphabet Adventure | ✅ A-M | ✅ A-Z | ✅ Words | Literacy |
| Shape Safari | ✅ Basic (4) | ✅ More (8) | ✅ Complex (12) | Geometry |
| Color Quest | ✅ Primary | ✅ + Secondary | ✅ + Shades | Colors |
| Pattern Play | ✅ Simple | ✅ Medium | ✅ Complex | Logic |
| Puzzle Time | ✅ 4 pieces | ✅ 9 pieces | ✅ 16 pieces | Problem-solving |
| Word Builder | ❌ | ✅ 3-letter | ✅ 4-letter | Spelling |
| Math Fun | ❌ | ✅ Addition | ✅ Add/Subtract | Math |
| Music Maker | ✅ Sounds | ✅ Rhythms | ✅ Songs | Music |

### Game Engine Features

```javascript
// Game Configuration Structure
const gameConfig = {
  id: 'memory-match',
  name: 'Memory Match',
  levels: {
    'pre-k': {
      pairs: 4,
      timeLimit: null,
      hints: 3,
      starsPerLevel: { 1: 1, 2: 2, 3: 3 }
    },
    'kg1': {
      pairs: 6,
      timeLimit: 120,
      hints: 2,
      starsPerLevel: { 1: 1, 2: 2, 3: 3 }
    },
    'kg2': {
      pairs: 8,
      timeLimit: 90,
      hints: 1,
      starsPerLevel: { 1: 1, 2: 2, 3: 3 }
    }
  },
  rewards: {
    completion: 10,
    perfectScore: 25,
    speedBonus: 15,
    noHints: 20
  },
  sounds: {
    flip: 'flip.mp3',
    match: 'match.mp3',
    wrong: 'wrong.mp3',
    win: 'win.mp3'
  }
};
```

### Reward System

| Achievement | Stars | Badge |
|-------------|-------|-------|
| First game completed | 5 | 🌟 First Star |
| 10 games completed | 20 | 🎮 Game Explorer |
| 50 games completed | 50 | 🎮 Game Master |
| Perfect score | 10 | 💯 Perfect! |
| Complete all memory levels | 30 | 🧠 Memory Champion |
| Complete all math levels | 30 | 🔢 Math Wizard |
| 7-day streak | 25 | 🔥 On Fire! |
| All homework submitted | 20 | 📚 Homework Hero |

---

## ⚠️ ERROR HANDLING

### Frontend Error Handling

```javascript
// Centralized error handler
const ErrorHandler = {
  // API error handling
  handleApiError(error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    
    switch (status) {
      case 400:
        this.showError('Invalid request. Please check your input.');
        break;
      case 401:
        this.showError('Session expired. Please login again.');
        AuthService.logout();
        break;
      case 403:
        this.showError('You do not have permission to perform this action.');
        break;
      case 404:
        this.showError('The requested resource was not found.');
        break;
      case 422:
        this.showValidationErrors(error.response.data.errors);
        break;
      case 429:
        this.showError('Too many requests. Please wait a moment.');
        break;
      case 500:
        this.showError('Server error. Please try again later.');
        break;
      default:
        this.showError(message || 'An unexpected error occurred.');
    }
  },
  
  // Show error notification
  showError(message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: message,
      confirmButtonColor: '#9B5DE5'
    });
  },
  
  // Show validation errors
  showValidationErrors(errors) {
    const errorList = errors.map(e => `• ${e.message}`).join('\n');
    Swal.fire({
      icon: 'warning',
      title: 'Please fix the following:',
      text: errorList,
      confirmButtonColor: '#9B5DE5'
    });
  }
};
```

### Backend Error Handling

```javascript
// Custom Error Classes
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super('Validation Error', 422);
    this.errors = errors;
  }
}

class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
  }
}

class AuthorizationError extends AppError {
  constructor(message = 'Not authorized') {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

// Global Error Handler Middleware
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    userId: req.user?.id
  });
  
  // Development response
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
  
  // Production response
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      errors: err.errors
    });
  }
  
  // Unknown errors in production
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong. Please try again later.'
  });
};
```

### Error Response Format

```json
// Success Response
{
  "status": "success",
  "data": { ... },
  "message": "Operation completed successfully"
}

// Error Response
{
  "status": "fail",
  "message": "Validation Error",
  "errors": [
    { "field": "email", "message": "Email is required" },
    { "field": "password", "message": "Password must be at least 8 characters" }
  ]
}

// Server Error Response
{
  "status": "error",
  "message": "Something went wrong. Please try again later."
}
```

---

## 📦 NPM PACKAGES

### Backend Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "express-validator": "^7.0.1",
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^1.41.0",
    "nodemailer": "^6.9.7",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "winston": "^3.11.0",
    "dotenv": "^16.3.1",
    "express-rate-limit": "^7.1.5",
    "express-mongo-sanitize": "^2.2.0",
    "xss-clean": "^0.1.4",
    "hpp": "^0.2.3",
    "cookie-parser": "^1.4.6",
    "compression": "^1.7.4",
    "node-cron": "^3.0.3",
    "slugify": "^1.6.6",
    "validator": "^13.11.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "eslint": "^8.55.0"
  }
}
```

---

## 🚀 DEVELOPMENT PHASES

### Phase 1: Foundation ✅ COMPLETED
- [x] Single-page prototype
- [x] Basic design system
- [x] Color scheme & fonts
- [x] Responsive layout
- [x] Basic games (2)
- [x] Project documentation

### Phase 2: Frontend Structure 🔄 IN PROGRESS
- [ ] Create file/folder structure
- [ ] Separate pages from index.html
- [ ] Create reusable components
- [ ] Implement navigation system
- [ ] Design all dashboard layouts
- [ ] Create login/register pages
- [ ] Style all forms

### Phase 3: Backend Setup
- [ ] Initialize Node.js project
- [ ] Set up Express server
- [ ] Configure MongoDB connection
- [ ] Create database models
- [ ] Set up authentication (JWT)
- [ ] Create middleware (auth, validation)
- [ ] Set up file upload (Cloudinary)
- [ ] Configure email service

### Phase 4: API Development
- [ ] Authentication APIs
- [ ] Admin APIs
- [ ] Teacher APIs
- [ ] Parent APIs
- [ ] Student APIs
- [ ] Game APIs
- [ ] Message APIs
- [ ] File upload APIs
- [ ] API documentation

### Phase 5: Dashboard Development
- [ ] Admin dashboard (full features)
- [ ] Teacher dashboard (full features)
- [ ] Parent dashboard (full features)
- [ ] Student dashboard (child-friendly)
- [ ] Integrate with APIs
- [ ] Real-time notifications

### Phase 6: Games Development
- [ ] Game engine architecture
- [ ] Memory Match (3 levels)
- [ ] Counting Fun (3 levels)
- [ ] Alphabet Adventure (3 levels)
- [ ] Shape Safari (3 levels)
- [ ] Color Quest (3 levels)
- [ ] Pattern Play (3 levels)
- [ ] Puzzle Time (3 levels)
- [ ] Word Builder (2 levels)
- [ ] Math Fun (2 levels)
- [ ] Music Maker (3 levels)
- [ ] Progress tracking
- [ ] Achievement system

### Phase 7: Homework Platform
- [ ] Homework creation (teachers)
- [ ] File upload/download
- [ ] Submission system
- [ ] Grading interface
- [ ] Feedback with stars
- [ ] Progress reports
- [ ] Parent notifications

### Phase 8: Testing & Security
- [ ] Unit tests
- [ ] Integration tests
- [ ] Security audit
- [ ] Performance testing
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Accessibility testing

### Phase 9: Deployment
- [ ] Set up production server
- [ ] Configure Nginx
- [ ] SSL certificate
- [ ] MongoDB Atlas setup
- [ ] Environment configuration
- [ ] CI/CD pipeline
- [ ] Monitoring setup
- [ ] Backup system

### Phase 10: Launch & Handover
- [ ] Final testing
- [ ] Documentation
- [ ] Training materials
- [ ] Admin credentials
- [ ] Support handover

---

## 💰 PRICING ESTIMATE

| Package | Features | Price (QAR) |
|---------|----------|-------------|
| **Basic Website** | Homepage + 5 pages + Contact form | 5,000 - 8,000 |
| **Standard Website** | 10 pages + Gallery + Events | 10,000 - 15,000 |
| **With Games** | + 10 Educational games | +8,000 - 12,000 |
| **Homework Platform** | + Full homework system | +15,000 - 20,000 |
| **Complete System** | All dashboards + Full features | 45,000 - 60,000 |
| **Monthly Maintenance** | Updates + Hosting + Support | 1,500 - 2,500/month |

---

## 📋 CLIENT REQUIREMENTS CHECKLIST

### Required from Lotus Kindergarten:
- [ ] Official school name (exact spelling)
- [ ] School logo (high resolution)
- [ ] Tagline/motto
- [ ] Complete address
- [ ] Phone numbers (main, WhatsApp)
- [ ] Email addresses
- [ ] Working hours
- [ ] Social media links
- [ ] School history
- [ ] Mission & Vision statements
- [ ] Staff photos and bios
- [ ] Facility photos
- [ ] Actual fee structure (QAR)
- [ ] Admission requirements
- [ ] Academic calendar
- [ ] Class schedules

---

## 📞 NEXT STEPS

1. **Finalize requirements** with client
2. **Get content and images** from school
3. **Set up development environment**
4. **Begin Phase 2** (Frontend Structure)
5. **Weekly progress updates** to client

---

## 📂 CURRENT PROJECT FILES

| File | Description | Status |
|------|-------------|--------|
| `index.html` | Homepage prototype | ✅ Complete |
| `PROJECT_DOCUMENTATION.md` | This file | ✅ Complete |

---

*Document Version: 2.0*
*Last Updated: January 2025*
*Project Status: Phase 1 Complete*
