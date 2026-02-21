# Lotus Kindergarten - Complete Setup Guide

This guide will walk you through setting up the Lotus Kindergarten application from scratch.

## ✅ Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Node.js v16+ installed ([Download](https://nodejs.org/))
- [ ] MongoDB v5+ installed ([Download](https://www.mongodb.com/try/download/community))
- [ ] A code editor (VS Code recommended)
- [ ] A web browser (Chrome/Firefox recommended)
- [ ] Terminal/Command Prompt access

## 🚀 Step-by-Step Setup

### Step 1: Install MongoDB

#### On Windows:
1. Download MongoDB Community Edition
2. Run the installer
3. Check "Install MongoDB as a Service"
4. Complete the installation
5. Start MongoDB:
   ```cmd
   net start MongoDB
   ```

#### On Mac (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### On Linux (Ubuntu):
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Step 2: Verify MongoDB Installation

```bash
# Check if MongoDB is running
mongosh

# Or
mongo

# You should see MongoDB shell
# Type 'exit' to quit
```

### Step 3: Install Server Dependencies

```bash
# Navigate to server directory
cd "c:\Users\Admin\Downloads\LOTUS KINDERGARTEN\server"

# Install all dependencies
npm install
```

This will install all packages listed in package.json:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- passport
- and more...

### Step 4: Configure Environment Variables

The `.env` file is already created in the server directory. You can keep the defaults for development, or update:

```env
# Basic configuration (already set)
NODE_ENV=development
PORT=8000
DATABASE_LOCAL=mongodb://localhost:27017/lotus-kindergarten
JWT_SECRET=super-long-secret-key-for-jwt-token-security-lotus-kindergarten

# Optional: Update these if you want email functionality
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Optional: Update for image upload functionality
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 5: Start the Backend Server

```bash
# Make sure you're in the server directory
cd server

# Start in development mode (with auto-reload)
npm run dev

# OR start in production mode
npm start
```

You should see:
```
App running on port 8000...
DB connection successful!
```

### Step 6: Test the API

Open a new terminal and test if the API is working:

```bash
# Test the base endpoint
curl http://localhost:8000

# You should see:
# {"status":"success","message":"Welcome to Lotus Kindergarten API","version":"1.0.0"}
```

Or simply open http://localhost:8000 in your browser.

### Step 7: Set Up Frontend

The frontend files are already in place. To run them:

#### Option A: Open Directly (Simple)
Simply open `client/public/index.html` in your browser.

#### Option B: Use a Local Server (Recommended)

Using Python:
```bash
cd client/public
python -m http.server 3000
```

Using Node.js:
```bash
cd client/public
npx http-server -p 3000
```

Then open http://localhost:3000 in your browser.

### Step 8: Create Your First Admin User

#### Using cURL:
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"Admin\",\"lastName\":\"User\",\"email\":\"admin@lotus.com\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

#### Using Postman:
1. Open Postman
2. Create a new POST request to: `http://localhost:8000/api/auth/signup`
3. Set Headers: `Content-Type: application/json`
4. Set Body (raw JSON):
```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@lotus.com",
  "password": "admin123",
  "role": "admin"
}
```
5. Click Send

Save the returned `token` for authenticated requests.

### Step 9: Test Login

Now try logging in at: http://localhost:3000/pages/auth/login.html

Use the credentials:
- Email: admin@lotus.com
- Password: admin123

You should be redirected to the admin dashboard!

## 🧪 Testing the Application

### Create Test Users

Create a teacher:
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"Sarah\",\"lastName\":\"Johnson\",\"email\":\"teacher@lotus.com\",\"password\":\"teacher123\",\"role\":\"teacher\"}"
```

Create a parent:
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"Ahmed\",\"lastName\":\"Ali\",\"email\":\"parent@lotus.com\",\"password\":\"parent123\",\"role\":\"parent\"}"
```

Create a student:
```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"Lina\",\"lastName\":\"Ahmed\",\"email\":\"student@lotus.com\",\"password\":\"student123\",\"role\":\"student\"}"
```

### Test API Endpoints

#### Get all users (requires admin token):
```bash
curl -X GET http://localhost:8000/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Get homework (requires student token):
```bash
curl -X GET http://localhost:8000/api/student/homework \
  -H "Authorization: Bearer YOUR_STUDENT_TOKEN_HERE"
```

#### Get games:
```bash
curl -X GET http://localhost:8000/api/games
```

## 📊 Verify Database

Check if data is being saved to MongoDB:

```bash
# Open MongoDB shell
mongosh

# Use the lotus-kindergarten database
use lotus-kindergarten

# Show all collections
show collections

# View users
db.users.find().pretty()

# Count users
db.users.countDocuments()

# Exit
exit
```

## 🎨 Customization

### Change Colors

Edit the frontend HTML files to change the color scheme. Current colors:
- Pink: `#FF6B9D`
- Purple: `#9B5DE5`
- Blue: `#00BBF9`
- Green: `#00F5D4`
- Yellow: `#FEE440`

### Add School Logo

1. Place your logo in `client/public/assets/images/logo.png`
2. Update HTML files to reference the logo

### Configure Email

To enable password reset emails:

1. Get Gmail App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification
   - App passwords → Generate new password

2. Update `.env`:
```env
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## 🔧 Troubleshooting

### Issue: MongoDB not connecting

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
1. Check if MongoDB is running:
   ```bash
   # Windows
   net start MongoDB

   # Mac
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

2. Check MongoDB is listening on port 27017:
   ```bash
   netstat -an | findstr 27017
   ```

### Issue: Port 8000 already in use

**Error:** `EADDRINUSE: address already in use :::8000`

**Solutions:**
1. Kill the process using port 8000:
   ```bash
   # Windows
   netstat -ano | findstr :8000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -ti:8000 | xargs kill -9
   ```

2. Or change the port in `.env`:
   ```env
   PORT=8080
   ```
   And update frontend `api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/api';
   ```

### Issue: CORS errors in browser

**Error:** `Access to fetch at 'http://localhost:8000/api/...' from origin...`

**Solution:** Make sure the server is running and CORS is configured in `app.js`:
```javascript
app.use(cors({
    origin: '*', // or specific origin
    credentials: true
}));
```

### Issue: Login not working

**Solutions:**
1. Check browser console for errors (F12)
2. Verify API is responding: visit http://localhost:8000
3. Check if user exists in database:
   ```bash
   mongosh
   use lotus-kindergarten
   db.users.find({email: "admin@lotus.com"})
   ```
4. Clear browser cache and localStorage
5. Check network tab in browser DevTools

### Issue: npm install fails

**Solutions:**
1. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```

3. Update npm:
   ```bash
   npm install -g npm@latest
   ```

## 📱 Mobile Testing

To test on mobile devices on the same network:

1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig

   # Mac/Linux
   ifconfig
   ```

2. Update `.env`:
   ```env
   FRONTEND_URL=http://YOUR_IP:3000
   ```

3. Update `client/public/js/api.js`:
   ```javascript
   const API_BASE_URL = 'http://YOUR_IP:8000/api';
   ```

4. Access from mobile: `http://YOUR_IP:3000`

## 🚀 Deployment Preparation

For production deployment:

1. Update `.env`:
   ```env
   NODE_ENV=production
   DATABASE_URI=your-mongodb-atlas-uri
   FRONTEND_URL=https://yourdomain.com
   ```

2. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name lotus-kindergarten
   pm2 save
   pm2 startup
   ```

3. Set up Nginx as reverse proxy

4. Enable HTTPS with Let's Encrypt

## 📞 Getting Help

If you encounter issues not covered here:

1. Check the logs:
   ```bash
   # Server logs
   npm run dev

   # MongoDB logs
   # Windows: C:\Program Files\MongoDB\Server\5.0\log\mongod.log
   # Mac: /usr/local/var/log/mongodb/mongo.log
   # Linux: /var/log/mongodb/mongod.log
   ```

2. Review the documentation:
   - [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)
   - [README.md](README.md)

3. Common MongoDB commands:
   ```bash
   mongosh
   show dbs                           # List databases
   use lotus-kindergarten             # Switch to database
   show collections                   # List collections
   db.users.find().pretty()          # View all users
   db.users.deleteMany({})           # Clear users (careful!)
   ```

## ✅ Setup Complete!

You should now have:
- ✅ MongoDB running
- ✅ Backend server running on port 8000
- ✅ Frontend accessible (port 3000 or direct file)
- ✅ Admin user created
- ✅ API endpoints working

Next steps:
1. Explore the admin dashboard
2. Create test data (students, teachers, classes)
3. Create homework assignments
4. Test the games functionality
5. Customize for your school

---

**Happy coding!** 🎉

For more information, see [README.md](README.md) and [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md).
