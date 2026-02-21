# 🧪 Test Accounts - Lotus Kindergarten

This document contains all test accounts for the Lotus Kindergarten application.

## 🚀 How to Create Test Accounts

Run the seed script from the project root:

```bash
node server/scripts/seedUsers.js
```

This will:
- Clear existing test data
- Create dummy users for all roles
- Create sample classes
- Link students to parents and classes
- Assign teachers to classes

---

## 📋 Test Accounts

### 👨‍💼 Admin Account

**Purpose:** Full system administration access

| Field | Value |
|-------|-------|
| Email | admin@lotus.qa |
| Password | Admin@123 |
| Role | Admin |
| Name | Admin User |
| Phone | +974-4444-1111 |

**Capabilities:**
- Manage all users (create, update, delete)
- Manage all students
- Manage all teachers
- View all classes
- Full system access

---

### 👩‍🏫 Teacher Accounts

#### Teacher 1 - Sarah Johnson

| Field | Value |
|-------|-------|
| Email | teacher@lotus.qa |
| Password | Teacher@123 |
| Role | Teacher |
| Name | Sarah Johnson |
| Phone | +974-4444-2222 |
| Employee ID | TCH001 |
| Subject | General |
| Classes | KG1 - Morning, KG2 - Morning |
| Experience | 5 years |

**Capabilities:**
- View assigned classes
- Create and manage homework for classes
- Grade student submissions
- View student progress

#### Teacher 2 - Ahmed Al-Mansoori

| Field | Value |
|-------|-------|
| Email | teacher2@lotus.qa |
| Password | Teacher@123 |
| Role | Teacher |
| Name | Ahmed Al-Mansoori |
| Phone | +974-4444-2223 |
| Employee ID | TCH002 |
| Subject | Arabic |
| Classes | Pre-K - Morning |
| Experience | 8 years |

**Capabilities:**
- View assigned classes
- Create and manage homework for classes
- Grade student submissions
- View student progress

---

### 👪 Parent Accounts

#### Parent 1 - Mohammed Al-Thani

| Field | Value |
|-------|-------|
| Email | parent@lotus.qa |
| Password | Parent@123 |
| Role | Parent |
| Name | Mohammed Al-Thani |
| Phone | +974-4444-3333 |
| Occupation | Engineer |
| Children | Lina Al-Thani (KG1) |
| Address | West Bay, Doha, Qatar |

**Capabilities:**
- View child's homework
- View child's grades
- Track child's progress
- View child's attendance

#### Parent 2 - Fatima Hassan

| Field | Value |
|-------|-------|
| Email | parent2@lotus.qa |
| Password | Parent@123 |
| Role | Parent |
| Name | Fatima Hassan |
| Phone | +974-4444-3335 |
| Occupation | Doctor |
| Children | Omar Hassan (KG2) |
| Address | Al Sadd, Doha, Qatar |

**Capabilities:**
- View child's homework
- View child's grades
- Track child's progress
- View child's attendance

---

### 👶 Student Accounts

#### Student 1 - Lina Al-Thani

| Field | Value |
|-------|-------|
| Email | student@lotus.qa |
| Password | Student@123 |
| Role | Student |
| Name | Lina Al-Thani |
| Phone | +974-4444-4444 |
| Student ID | STU001 |
| Grade | KG1 |
| Class | KG1 - Morning |
| Date of Birth | May 15, 2020 |
| Parent | Mohammed Al-Thani |
| Medical Info | No allergies |

**Capabilities:**
- View and submit homework
- Play educational games
- View personal progress
- View badges and achievements

#### Student 2 - Omar Hassan

| Field | Value |
|-------|-------|
| Email | student2@lotus.qa |
| Password | Student@123 |
| Role | Student |
| Name | Omar Hassan |
| Phone | +974-4444-4445 |
| Student ID | STU002 |
| Grade | KG2 |
| Class | KG2 - Morning |
| Date of Birth | August 20, 2019 |
| Parent | Fatima Hassan |
| Medical Info | Asthma - carries inhaler |

**Capabilities:**
- View and submit homework
- Play educational games
- View personal progress
- View badges and achievements

#### Student 3 - Aisha Al-Mansoori

| Field | Value |
|-------|-------|
| Email | student3@lotus.qa |
| Password | Student@123 |
| Role | Student |
| Name | Aisha Al-Mansoori |
| Phone | +974-4444-4446 |
| Student ID | STU003 |
| Grade | Pre-K |
| Class | Pre-K - Morning |
| Date of Birth | March 10, 2021 |
| Parent | None (independent) |
| Medical Info | No allergies |

**Capabilities:**
- View and submit homework
- Play educational games
- View personal progress
- View badges and achievements

---

## 🏫 Sample Classes

### KG1 - Morning (Section A)

- **Teacher:** Sarah Johnson
- **Students:** Lina Al-Thani
- **Grade:** KG1
- **Schedule:** Sun-Thu, 8:00 AM - 12:00 PM
- **Max Students:** 20
- **Academic Year:** 2025-2026

### KG2 - Morning (Section A)

- **Teacher:** Sarah Johnson
- **Students:** Omar Hassan
- **Grade:** KG2
- **Schedule:** Sun-Thu, 8:00 AM - 12:30 PM
- **Max Students:** 20
- **Academic Year:** 2025-2026

### Pre-K - Morning (Section A)

- **Teacher:** Ahmed Al-Mansoori
- **Students:** Aisha Al-Mansoori
- **Grade:** Pre-K
- **Schedule:** Sun-Thu, 8:30 AM - 11:30 AM
- **Max Students:** 15
- **Academic Year:** 2025-2026

---

## 🔐 Security Notes

⚠️ **IMPORTANT:**
- These are TEST accounts only
- Never use these credentials in production
- All passwords follow the pattern: `Role@123`
- Change all default passwords in production
- Implement additional security measures for production

---

## 🧪 Testing Scenarios

### Scenario 1: Admin Workflow
1. Login as admin@lotus.qa
2. View all users in system
3. Create a new teacher/student
4. Update user information
5. Delete test user

### Scenario 2: Teacher Workflow
1. Login as teacher@lotus.qa
2. View assigned classes
3. Create homework for KG1
4. Grade submitted homework
5. View student progress

### Scenario 3: Parent Workflow
1. Login as parent@lotus.qa
2. View child's (Lina) information
3. Check homework assignments
4. View grades and progress
5. Check attendance records

### Scenario 4: Student Workflow
1. Login as student@lotus.qa
2. View homework assignments
3. Submit homework
4. Play educational games
5. Check badges and achievements
6. View personal progress

### Scenario 5: Multi-Role Testing
1. Create homework as teacher
2. Login as student and submit homework
3. Login as parent and view child's submission
4. Login as teacher and grade submission
5. Login as student to see grade
6. Login as parent to see grade

---

## 📞 Support

For issues with test accounts:
1. Re-run the seed script: `node server/scripts/seedUsers.js`
2. Check MongoDB connection
3. Verify environment variables in `.env`
4. Check console logs for errors

---

**Last Updated:** January 3, 2026
**Version:** 1.0
