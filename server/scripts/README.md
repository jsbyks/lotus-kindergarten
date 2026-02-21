# 🛠️ Scripts Directory

Utility scripts for the Lotus Kindergarten backend.

---

## 📜 Available Scripts

### seedUsers.js

**Purpose:** Seed the database with test users and sample data for development and testing.

**Usage:**
```bash
# From the server directory
node scripts/seedUsers.js

# Or from project root
node server/scripts/seedUsers.js
```

**What it does:**
1. Connects to MongoDB
2. Clears existing test data (emails ending in @lotus.qa)
3. Creates test users for all roles:
   - 1 Admin
   - 2 Teachers
   - 2 Parents
   - 3 Students
4. Creates sample classes (KG1, KG2, Pre-K)
5. Links students to parents and classes
6. Assigns teachers to classes
7. Creates teacher and parent profiles

**Output:**
```
📡 Connecting to MongoDB...
✅ Connected to MongoDB

🗑️  Clearing existing test data...
✅ Cleared existing data

👥 Creating test users...
  ✓ Created admin: Admin User (admin@lotus.qa)
  ✓ Created teacher: Sarah Johnson (teacher@lotus.qa)
  ...
✅ Created all users

🏫 Creating classes...
  ✓ Created class: KG1 - Morning
  ✓ Created class: KG2 - Morning
  ✓ Created class: Pre-K - Morning
✅ Created all classes

...

🎉 DATABASE SEEDED SUCCESSFULLY!
```

**Created Accounts:**

| Role | Email | Password | Name |
|------|-------|----------|------|
| Admin | admin@lotus.qa | Admin@123 | Admin User |
| Teacher | teacher@lotus.qa | Teacher@123 | Sarah Johnson |
| Teacher | teacher2@lotus.qa | Teacher@123 | Ahmed Al-Mansoori |
| Parent | parent@lotus.qa | Parent@123 | Mohammed Al-Thani |
| Parent | parent2@lotus.qa | Parent@123 | Fatima Hassan |
| Student | student@lotus.qa | Student@123 | Lina Al-Thani |
| Student | student2@lotus.qa | Student@123 | Omar Hassan |
| Student | student3@lotus.qa | Student@123 | Aisha Al-Mansoori |

**Requirements:**
- MongoDB must be running
- `.env` file must be configured with valid MONGO_URI
- All dependencies must be installed (`npm install`)

**Safety:**
- Only deletes users with emails ending in `@lotus.qa`
- Safe to run multiple times (will recreate test data)
- Does not affect production data

---

## 🔜 Future Scripts

### Planned scripts for future development:

#### seedHomework.js
Create sample homework assignments for testing.

#### seedAttendance.js
Generate attendance records for students.

#### seedAnnouncements.js
Create sample school announcements.

#### cleanupDatabase.js
Remove old/expired data from the database.

#### backupDatabase.js
Create database backups.

#### migrateData.js
Handle database schema migrations.

#### generateReports.js
Generate sample reports for testing.

---

## 📝 Creating New Scripts

When creating a new script:

1. Create file in `server/scripts/` directory
2. Add shebang and description at top:
   ```javascript
   /**
    * Script Name - Brief Description
    * Run with: node server/scripts/scriptName.js
    */
   ```

3. Import required dependencies:
   ```javascript
   const mongoose = require('mongoose');
   require('dotenv').config();
   ```

4. Create main async function:
   ```javascript
   async function mainFunction() {
       try {
           await mongoose.connect(process.env.MONGO_URI);
           console.log('✅ Connected to MongoDB');

           // Script logic here

       } catch (error) {
           console.error('❌ Error:', error);
           process.exit(1);
       } finally {
           await mongoose.connection.close();
           console.log('📡 Database connection closed');
           process.exit(0);
       }
   }

   mainFunction();
   ```

5. Add proper error handling
6. Use clear console messages with emojis
7. Add to this README
8. Document in main project documentation

---

## 🧪 Testing Scripts

Before committing a script:

1. Test on development database
2. Verify error handling
3. Check console output is clear
4. Ensure database connection closes properly
5. Test edge cases
6. Document usage and output

---

## ⚠️ Important Notes

- **Never** run scripts directly on production without testing
- Always backup database before running data modification scripts
- Scripts should be idempotent (safe to run multiple times)
- Use descriptive console messages
- Handle errors gracefully
- Close database connections properly

---

## 📚 Related Documentation

- [QUICK_START.md](../../QUICK_START.md) - Quick start guide
- [TEST_ACCOUNTS.md](../../TEST_ACCOUNTS.md) - Test account details
- [PROJECT_DOCUMENTATION.md](../../PROJECT_DOCUMENTATION.md) - Full documentation

---

**Last Updated:** January 3, 2026
