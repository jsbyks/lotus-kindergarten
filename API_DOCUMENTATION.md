# 📡 API Documentation

Complete API reference for Lotus Kindergarten Doha backend.

**Base URL**: `http://localhost:3000/api`  
**Production URL**: `https://api.lotuskindergarten.com/api`

---

## 📋 Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Students](#students)
- [Teachers](#teachers)
- [Parents](#parents)
- [Classes](#classes)
- [Homework](#homework)
- [Games](#games)
- [Messages](#messages)
- [Reports](#reports)
- [Error Handling](#error-handling)

---

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Register User

**POST** `/auth/register`

Register a new user account.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "parent",
  "phone": "+97412345678"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "parent"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": "Email is required",
    "password": "Password must be at least 8 characters"
  }
}
```

---

### Login

**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "parent"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

---

### Forgot Password

**POST** `/auth/forgot-password`

Request password reset email.

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

---

### Reset Password

**POST** `/auth/reset-password`

Reset password using token from email.

**Request Body**:
```json
{
  "token": "reset-token-from-email",
  "password": "NewSecurePassword123!"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### Verify Email

**POST** `/auth/verify-email`

Verify user email address.

**Request Body**:
```json
{
  "token": "verification-token"
}
```

---

### Refresh Token

**POST** `/auth/refresh`

Refresh JWT token.

**Headers**:
```
Authorization: Bearer <current-token>
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "token": "new-jwt-token",
    "expiresIn": "7d"
  }
}
```

---

## 👥 Users

### Get Current User

**GET** `/users/me`

Get authenticated user's profile.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "parent",
    "phone": "+97412345678",
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

---

### Update Profile

**PUT** `/users/me`

Update authenticated user's profile.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+97412345679"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": { /* updated user object */ }
  }
}
```

---

### Change Password

**POST** `/users/change-password`

Change user password.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!"
}
```

---

## 👶 Students

### Get All Students

**GET** `/students`

Get list of all students (Admin/Teacher only).

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `class` (optional): Filter by class ID
- `search` (optional): Search by name

**Response** (200):
```json
{
  "success": true,
  "data": {
    "students": [
      {
        "id": "507f1f77bcf86cd799439011",
        "firstName": "Emma",
        "lastName": "Johnson",
        "dateOfBirth": "2019-05-15",
        "class": {
          "id": "507f1f77bcf86cd799439012",
          "name": "KG1-A"
        },
        "parent": {
          "id": "507f1f77bcf86cd799439013",
          "name": "John Doe"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

---

### Get Student by ID

**GET** `/students/:id`

Get student details.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "student": {
      "id": "507f1f77bcf86cd799439011",
      "firstName": "Emma",
      "lastName": "Johnson",
      "dateOfBirth": "2019-05-15",
      "class": { /* class object */ },
      "parent": { /* parent object */ },
      "progress": {
        "gamesCompleted": 15,
        "homeworkSubmitted": 8,
        "averageGrade": 4.5
      }
    }
  }
}
```

---

### Create Student

**POST** `/students`

Create new student (Admin only).

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "firstName": "Emma",
  "lastName": "Johnson",
  "dateOfBirth": "2019-05-15",
  "classId": "507f1f77bcf86cd799439012",
  "parentId": "507f1f77bcf86cd799439013",
  "medicalInfo": {
    "allergies": ["Peanuts"],
    "medications": []
  }
}
```

---

### Update Student

**PUT** `/students/:id`

Update student information.

**Headers**: `Authorization: Bearer <token>`

---

### Delete Student

**DELETE** `/students/:id`

Delete student (Admin only).

**Headers**: `Authorization: Bearer <token>`

---

## 📚 Homework

### Get Homework List

**GET** `/homework`

Get list of homework assignments.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `studentId` (optional): Filter by student
- `classId` (optional): Filter by class
- `status` (optional): Filter by status (pending, submitted, graded)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response** (200):
```json
{
  "success": true,
  "data": {
    "homework": [
      {
        "id": "507f1f77bcf86cd799439011",
        "title": "Math Practice",
        "description": "Complete pages 1-5",
        "dueDate": "2025-01-20T23:59:59Z",
        "class": {
          "id": "507f1f77bcf86cd799439012",
          "name": "KG1-A"
        },
        "teacher": {
          "id": "507f1f77bcf86cd799439014",
          "name": "Ms. Sarah"
        },
        "status": "pending",
        "submission": null,
        "grade": null
      }
    ],
    "pagination": { /* pagination object */ }
  }
}
```

---

### Get Homework by ID

**GET** `/homework/:id`

Get homework details.

**Headers**: `Authorization: Bearer <token>`

---

### Create Homework

**POST** `/homework`

Create new homework assignment (Teacher only).

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "Math Practice",
  "description": "Complete pages 1-5 in workbook",
  "classId": "507f1f77bcf86cd799439012",
  "dueDate": "2025-01-20T23:59:59Z",
  "attachments": ["file1.pdf", "file2.jpg"],
  "instructions": "Please complete and submit by due date"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Homework created successfully",
  "data": {
    "homework": { /* homework object */ }
  }
}
```

---

### Submit Homework

**POST** `/homework/:id/submit`

Submit homework (Student/Parent).

**Headers**: `Authorization: Bearer <token>`

**Request Body** (multipart/form-data):
```json
{
  "submission": "Homework completed!",
  "attachments": ["file1.pdf", "file2.jpg"]
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Homework submitted successfully",
  "data": {
    "submission": {
      "id": "507f1f77bcf86cd799439015",
      "submittedAt": "2025-01-18T14:30:00Z",
      "status": "submitted"
    }
  }
}
```

---

### Grade Homework

**POST** `/homework/:id/grade`

Grade homework submission (Teacher only).

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "grade": 5,
  "feedback": "Excellent work! Keep it up!",
  "stars": 5
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Homework graded successfully",
  "data": {
    "grade": {
      "grade": 5,
      "stars": 5,
      "feedback": "Excellent work!",
      "gradedAt": "2025-01-19T10:00:00Z"
    }
  }
}
```

---

## 🎮 Games

### Get Available Games

**GET** `/games`

Get list of all available educational games.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "games": [
      {
        "id": "507f1f77bcf86cd799439011",
        "name": "Memory Match",
        "description": "Match pairs of cards",
        "category": "memory",
        "difficulty": ["easy", "medium", "hard"],
        "icon": "🧠",
        "enabled": true
      },
      {
        "id": "507f1f77bcf86cd799439012",
        "name": "Counting Fun",
        "description": "Learn to count numbers",
        "category": "math",
        "difficulty": ["easy", "medium", "hard"],
        "icon": "🔢",
        "enabled": true
      }
    ]
  }
}
```

---

### Get Game Progress

**GET** `/games/progress/:studentId`

Get student's game progress.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "progress": [
      {
        "gameId": "507f1f77bcf86cd799439011",
        "gameName": "Memory Match",
        "level": "medium",
        "score": 850,
        "completed": true,
        "lastPlayed": "2025-01-18T15:30:00Z",
        "attempts": 3,
        "bestScore": 950
      }
    ],
    "totalGamesPlayed": 8,
    "totalScore": 6500,
    "achievements": ["first-game", "perfect-score"]
  }
}
```

---

### Save Game Progress

**POST** `/games/progress`

Save game progress after completion.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "gameId": "507f1f77bcf86cd799439011",
  "studentId": "507f1f77bcf86cd799439016",
  "level": "medium",
  "score": 850,
  "completed": true,
  "timeSpent": 300
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Progress saved successfully",
  "data": {
    "progress": { /* progress object */ },
    "achievements": ["new-achievement"]
  }
}
```

---

## 💬 Messages

### Get Messages

**GET** `/messages`

Get messages/conversations.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `userId` (optional): Filter by user
- `type` (optional): Filter by type (inbox, sent)
- `unread` (optional): Filter unread only

---

### Send Message

**POST** `/messages`

Send a message.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "to": "507f1f77bcf86cd799439013",
  "subject": "Question about homework",
  "body": "Hello, I have a question...",
  "attachments": []
}
```

---

## 📊 Reports

### Get Student Report

**GET** `/reports/student/:studentId`

Get comprehensive student report (Teacher/Parent).

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `startDate` (optional): Report start date
- `endDate` (optional): Report end date

**Response** (200):
```json
{
  "success": true,
  "data": {
    "student": { /* student object */ },
    "homework": {
      "total": 10,
      "submitted": 8,
      "graded": 7,
      "averageGrade": 4.5
    },
    "games": {
      "totalPlayed": 15,
      "totalScore": 12000,
      "favoriteGame": "Memory Match"
    },
    "attendance": {
      "present": 45,
      "absent": 2,
      "percentage": 95.7
    }
  }
}
```

---

## ⚠️ Error Handling

### Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": "Field-specific error message"
  },
  "code": "ERROR_CODE"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

### Common Error Codes

- `VALIDATION_ERROR` - Input validation failed
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ENTRY` - Resource already exists
- `SERVER_ERROR` - Internal server error

### Example Error Responses

**401 Unauthorized**:
```json
{
  "success": false,
  "message": "Authentication required",
  "code": "UNAUTHORIZED"
}
```

**404 Not Found**:
```json
{
  "success": false,
  "message": "Student not found",
  "code": "NOT_FOUND"
}
```

**422 Validation Error**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Email is required",
    "password": "Password must be at least 8 characters"
  },
  "code": "VALIDATION_ERROR"
}
```

---

## 🔒 Rate Limiting

API requests are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per 15 minutes
- **General endpoints**: 100 requests per 15 minutes
- **File upload endpoints**: 10 requests per hour

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## 📝 Notes

- All dates are in ISO 8601 format (UTC)
- File uploads use multipart/form-data
- Maximum file size: 5MB
- Supported file types: PDF, JPG, PNG, DOC, DOCX
- Pagination defaults: 10 items per page

---

**Last Updated**: January 2025  
**API Version**: 1.0.0
