# 🚀 Setup Guide

Complete step-by-step guide to set up the Lotus Kindergarten Doha project on your local machine.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** (v14.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **MongoDB** (v4.4 or higher)
  - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
  - Or use MongoDB Atlas (cloud)
  - Verify installation: `mongod --version`
  
- **Git**
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`
  
- **Code Editor**
  - Recommended: VS Code, WebStorm, or Sublime Text

### Optional Tools

- **Postman** or **Insomnia** - For API testing
- **MongoDB Compass** - GUI for MongoDB
- **Git GUI Client** - For easier Git operations

---

## 🔧 Installation Steps

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd lotus-kindergarten
```

### Step 2: Install Dependencies

#### Backend Dependencies

```bash
# Navigate to server directory
cd server

# Install all dependencies
npm install
```

#### Frontend Dependencies

```bash
# Navigate to client directory
cd ../client

# Install all dependencies (if package.json exists)
npm install
```

### Step 3: Database Setup

#### Option A: Local MongoDB

1. **Start MongoDB service**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   # or
   mongod --dbpath /path/to/data
   ```

2. **Verify MongoDB is running**
   ```bash
   mongo --version
   # or
   mongosh
   ```

#### Option B: MongoDB Atlas (Cloud)

1. **Create MongoDB Atlas account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create a cluster**
   - Choose free tier (M0)
   - Select region closest to you
   - Create cluster

3. **Get connection string**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. **Configure database access**
   - Go to "Database Access"
   - Create database user
   - Set network access (add your IP or 0.0.0.0/0 for development)

### Step 4: Environment Configuration

1. **Create environment file**
   ```bash
   cd server
   cp .env.example .env
   ```

2. **Edit `.env` file**
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # Database Configuration
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/lotus-kindergarten
   
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lotus-kindergarten?retryWrites=true&w=majority
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   
   # Email Configuration (for password reset, notifications)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@lotuskindergarten.com
   
   # File Upload Configuration
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   
   # Admin Default Credentials (change after first login)
   ADMIN_EMAIL=admin@lotuskindergarten.com
   ADMIN_PASSWORD=Admin123!
   ```

3. **Generate JWT Secret** (optional)
   ```bash
   # Generate a random secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

### Step 5: Database Initialization

1. **Run database migrations** (if available)
   ```bash
   cd server
   npm run migrate
   ```

2. **Seed initial data** (if available)
   ```bash
   npm run seed
   ```

   This will create:
   - Default admin user
   - Sample classes
   - Sample games
   - Test data (optional)

### Step 6: Start Development Server

#### Start Backend Server

```bash
# From server directory
cd server
npm run dev
```

The server should start on `http://localhost:3000`

#### Start Frontend (if using a build tool)

```bash
# From client directory
cd client
npm start
# or
npm run dev
```

---

## ✅ Verification

### Check Backend

1. **Test server health**
   ```bash
   curl http://localhost:3000/api/health
   # or open in browser
   ```

2. **Check API documentation**
   - Visit: `http://localhost:3000/api/docs` (if available)

### Check Database Connection

```bash
# Using MongoDB shell
mongosh
use lotus-kindergarten
show collections
```

### Check Frontend

1. Open browser: `http://localhost:3000`
2. You should see the homepage
3. Try accessing login page: `http://localhost:3000/login`

---

## 🔐 Default Credentials

After seeding the database, you can use these default credentials:

### Admin Account
- **Email**: `admin@lotuskindergarten.com`
- **Password**: `Admin123!`
- **Role**: Admin

### Test Accounts (if seeded)
- **Teacher**: `teacher@lotuskindergarten.com` / `Teacher123!`
- **Parent**: `parent@lotuskindergarten.com` / `Parent123!`
- **Student**: `student@lotuskindergarten.com` / `Student123!`

⚠️ **Important**: Change all default passwords after first login!

---

## 🛠️ Development Tools Setup

### VS Code Extensions (Recommended)

Install these extensions for better development experience:

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **MongoDB for VS Code** - MongoDB integration
- **Thunder Client** - API testing
- **GitLens** - Git integration
- **Live Server** - Local development server

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true
  }
}
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

Or change port in `.env` file.

#### 2. MongoDB Connection Error

**Error**: `MongoNetworkError: failed to connect`

**Solutions**:
- Check if MongoDB is running
- Verify connection string in `.env`
- Check firewall settings
- For Atlas: verify IP whitelist

#### 3. Module Not Found

**Error**: `Cannot find module 'xyz'`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. Permission Denied

**Error**: `EACCES: permission denied`

**Solution**:
```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### 5. JWT Secret Missing

**Error**: `JWT_SECRET is not defined`

**Solution**: Ensure `.env` file exists and contains `JWT_SECRET`

---

## 📦 Production Setup

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<strong-random-secret>
FRONTEND_URL=https://yourdomain.com
```

### Build for Production

```bash
# Build frontend
cd client
npm run build

# Start production server
cd server
npm start
```

### Using PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start server.js --name lotus-kindergarten

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

---

## 🔄 Updating the Project

### Pull Latest Changes

```bash
git pull origin main
npm install
npm run migrate  # If migrations exist
```

### Reset Database (Development Only)

```bash
# Drop and recreate database
npm run db:reset

# Reseed data
npm run seed
```

---

## 📚 Next Steps

After setup is complete:

1. ✅ Read [README.md](./README.md) for project overview
2. ✅ Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API details
3. ✅ Check [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines
4. ✅ Explore the codebase structure
5. ✅ Start developing!

---

## 🆘 Need Help?

If you encounter issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review error logs in console
3. Check MongoDB logs
4. Verify all environment variables
5. Contact the development team

---

**Last Updated**: January 2025  
**Setup Guide Version**: 1.0.0
