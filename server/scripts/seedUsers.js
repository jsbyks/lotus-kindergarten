/**
 * Seed Script - Create Dummy Users for Testing
 * Run with: node server/scripts/seedUsers.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Parent = require('../models/Parent');
const Class = require('../models/Class');

// Test users data
const testUsers = [
    // ADMIN USER
    {
        email: 'admin@lotus.qa',
        password: 'Admin@123',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+974-4444-1111',
        isActive: true
    },

    // TEACHER USERS
    {
        email: 'teacher@lotus.qa',
        password: 'Teacher@123',
        role: 'teacher',
        firstName: 'Sarah',
        lastName: 'Johnson',
        phone: '+974-4444-2222',
        isActive: true,
        teacherData: {
            employeeId: 'TCH001',
            subject: 'General',
            qualification: 'Bachelor of Education',
            experience: 5,
            joinDate: new Date('2020-09-01')
        }
    },
    {
        email: 'teacher2@lotus.qa',
        password: 'Teacher@123',
        role: 'teacher',
        firstName: 'Ahmed',
        lastName: 'Al-Mansoori',
        phone: '+974-4444-2223',
        isActive: true,
        teacherData: {
            employeeId: 'TCH002',
            subject: 'Arabic',
            qualification: 'Master in Early Childhood Education',
            experience: 8,
            joinDate: new Date('2018-09-01')
        }
    },

    // PARENT USERS
    {
        email: 'parent@lotus.qa',
        password: 'Parent@123',
        role: 'parent',
        firstName: 'Mohammed',
        lastName: 'Al-Thani',
        phone: '+974-4444-3333',
        isActive: true,
        parentData: {
            parentId: 'PAR001',
            relationship: 'father',
            occupation: 'Engineer',
            emergencyContact: '+974-4444-3334',
            address: {
                street: 'Street 45',
                city: 'Doha',
                country: 'Qatar'
            }
        }
    },
    {
        email: 'parent2@lotus.qa',
        password: 'Parent@123',
        role: 'parent',
        firstName: 'Fatima',
        lastName: 'Hassan',
        phone: '+974-4444-3335',
        isActive: true,
        parentData: {
            parentId: 'PAR002',
            relationship: 'mother',
            occupation: 'Doctor',
            emergencyContact: '+974-4444-3336',
            address: {
                street: 'Street 32',
                city: 'Doha',
                country: 'Qatar'
            }
        }
    },

    // STUDENT USERS
    {
        email: 'student@lotus.qa',
        password: 'Student@123',
        role: 'student',
        firstName: 'Lina',
        lastName: 'Al-Thani',
        phone: '+974-4444-4444',
        isActive: true,
        studentData: {
            studentId: 'STU001',
            dateOfBirth: new Date('2020-05-15'),
            grade: 'kg1',
            enrollmentDate: new Date('2024-09-01'),
            medicalInfo: 'No allergies',
            emergencyContact: '+974-4444-3334'
        }
    },
    {
        email: 'student2@lotus.qa',
        password: 'Student@123',
        role: 'student',
        firstName: 'Omar',
        lastName: 'Hassan',
        phone: '+974-4444-4445',
        isActive: true,
        studentData: {
            studentId: 'STU002',
            dateOfBirth: new Date('2019-08-20'),
            grade: 'kg2',
            enrollmentDate: new Date('2023-09-01'),
            medicalInfo: 'Asthma - carries inhaler',
            emergencyContact: '+974-4444-3336'
        }
    },
    {
        email: 'student3@lotus.qa',
        password: 'Student@123',
        role: 'student',
        firstName: 'Aisha',
        lastName: 'Al-Mansoori',
        phone: '+974-4444-4446',
        isActive: true,
        studentData: {
            studentId: 'STU003',
            dateOfBirth: new Date('2021-03-10'),
            grade: 'pre-k',
            enrollmentDate: new Date('2025-01-01'),
            medicalInfo: 'No allergies',
            emergencyContact: '+974-4444-5555'
        }
    }
];

// Sample classes
const testClasses = [
    {
        className: 'KG1 - Morning',
        grade: 'kg1',
        section: 'A',
        academicYear: '2025-2026',
        capacity: 20,
        schedule: {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            startTime: '08:00',
            endTime: '12:00'
        }
    },
    {
        className: 'KG2 - Morning',
        grade: 'kg2',
        section: 'A',
        academicYear: '2025-2026',
        capacity: 20,
        schedule: {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            startTime: '08:00',
            endTime: '12:30'
        }
    },
    {
        className: 'Pre-K - Morning',
        grade: 'pre-k',
        section: 'A',
        academicYear: '2025-2026',
        capacity: 15,
        schedule: {
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            startTime: '08:30',
            endTime: '11:30'
        }
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        console.log('📡 Connecting to MongoDB...');
        await mongoose.connect(process.env.DATABASE_URI || process.env.DATABASE_LOCAL);
        console.log('✅ Connected to MongoDB\n');

        // Clear existing test data
        console.log('🗑️  Clearing existing test data...');
        await User.deleteMany({ email: { $regex: /@lotus\.qa$/i } });
        await Student.deleteMany({});
        await Teacher.deleteMany({});
        await Parent.deleteMany({});
        await Class.deleteMany({});
        console.log('✅ Cleared existing data\n');

        // Create Users
        console.log('👥 Creating test users...');
        const createdUsers = [];
        const userIds = {};

        for (const userData of testUsers) {
            // Create user (password will be hashed by pre-save hook)
            const user = await User.create({
                email: userData.email,
                password: userData.password,
                role: userData.role,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                isActive: userData.isActive
            });

            createdUsers.push({
                ...userData,
                userId: user._id
            });

            userIds[userData.email] = user._id;

            console.log(`  ✓ Created ${userData.role}: ${userData.firstName} ${userData.lastName} (${userData.email})`);
        }

        console.log('✅ Created all users\n');

        // Create Classes
        console.log('🏫 Creating classes...');
        const createdClasses = [];

        for (const classData of testClasses) {
            const newClass = await Class.create(classData);
            createdClasses.push(newClass);
            console.log(`  ✓ Created class: ${classData.name}`);
        }

        console.log('✅ Created all classes\n');

        // Assign teachers to classes
        console.log('👩‍🏫 Assigning teachers to classes...');
        const teacher1 = await User.findOne({ email: 'teacher@lotus.qa' });
        const teacher2 = await User.findOne({ email: 'teacher2@lotus.qa' });

        await Class.findOneAndUpdate(
            { name: 'KG1 - Morning' },
            { teacher: teacher1._id }
        );
        await Class.findOneAndUpdate(
            { name: 'KG2 - Morning' },
            { teacher: teacher1._id }
        );
        await Class.findOneAndUpdate(
            { name: 'Pre-K - Morning' },
            { teacher: teacher2._id }
        );

        console.log('✅ Assigned teachers to classes\n');

        // Create Teacher profiles
        console.log('👨‍🏫 Creating teacher profiles...');
        for (const userData of createdUsers.filter(u => u.role === 'teacher')) {
            const classes = await Class.find({ teacher: userData.userId }).select('_id');

            await Teacher.create({
                userId: userData.userId,
                employeeId: userData.teacherData.employeeId,
                subject: userData.teacherData.subject,
                qualification: userData.teacherData.qualification,
                experience: userData.teacherData.experience,
                joinDate: userData.teacherData.joinDate,
                classes: classes.map(c => c._id)
            });

            console.log(`  ✓ Created teacher profile for ${userData.firstName}`);
        }

        console.log('✅ Created teacher profiles\n');

        // Create Parent profiles
        console.log('👪 Creating parent profiles...');
        const parentProfiles = [];

        for (const userData of createdUsers.filter(u => u.role === 'parent')) {
            const parent = await Parent.create({
                userId: userData.userId,
                parentId: userData.parentData.parentId,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone,
                occupation: userData.parentData.occupation,
                relationship: userData.parentData.relationship,
                emergencyContact: userData.parentData.emergencyContact,
                address: userData.parentData.address
            });

            parentProfiles.push({
                email: userData.email,
                parentId: parent._id,
                userId: userData.userId
            });

            console.log(`  ✓ Created parent profile for ${userData.firstName}`);
        }

        console.log('✅ Created parent profiles\n');

        // Create Student profiles and link to parents
        console.log('👶 Creating student profiles...');

        // Student 1 - Lina (child of parent 1)
        const student1Data = createdUsers.find(u => u.email === 'student@lotus.qa');
        const parent1 = parentProfiles.find(p => p.email === 'parent@lotus.qa');
        const kg1Class = await Class.findOne({ grade: 'kg1' });

        const student1 = await Student.create({
            userId: student1Data.userId,
            studentId: student1Data.studentData.studentId,
            firstName: student1Data.firstName,
            lastName: student1Data.lastName,
            dateOfBirth: student1Data.studentData.dateOfBirth,
            class: 'kg1',
            classId: kg1Class._id,
            parentId: parent1.parentId,
            enrollmentDate: student1Data.studentData.enrollmentDate,
            medicalNotes: student1Data.studentData.medicalInfo,
            emergencyContact: {
                name: 'Mohammed Al-Thani',
                phone: student1Data.studentData.emergencyContact,
                relationship: 'Father'
            }
        });

        // Update parent with child
        await Parent.findByIdAndUpdate(parent1.parentId, {
            $push: { children: student1._id }
        });

        // Add student to class
        await Class.findByIdAndUpdate(kg1Class._id, {
            $push: { students: student1._id }
        });

        console.log(`  ✓ Created student: Lina (KG1)`);

        // Student 2 - Omar (child of parent 2)
        const student2Data = createdUsers.find(u => u.email === 'student2@lotus.qa');
        const parent2 = parentProfiles.find(p => p.email === 'parent2@lotus.qa');
        const kg2Class = await Class.findOne({ grade: 'kg2' });

        const student2 = await Student.create({
            userId: student2Data.userId,
            studentId: student2Data.studentData.studentId,
            firstName: student2Data.firstName,
            lastName: student2Data.lastName,
            dateOfBirth: student2Data.studentData.dateOfBirth,
            class: 'kg2',
            classId: kg2Class._id,
            parentId: parent2.parentId,
            enrollmentDate: student2Data.studentData.enrollmentDate,
            medicalNotes: student2Data.studentData.medicalInfo,
            emergencyContact: {
                name: 'Fatima Hassan',
                phone: student2Data.studentData.emergencyContact,
                relationship: 'Mother'
            }
        });

        await Parent.findByIdAndUpdate(parent2.parentId, {
            $push: { children: student2._id }
        });

        await Class.findByIdAndUpdate(kg2Class._id, {
            $push: { students: student2._id }
        });

        console.log(`  ✓ Created student: Omar (KG2)`);

        // Student 3 - Aisha (independent, no parent)
        const student3Data = createdUsers.find(u => u.email === 'student3@lotus.qa');
        const preKClass = await Class.findOne({ grade: 'pre-k' });

        const student3 = await Student.create({
            userId: student3Data.userId,
            studentId: student3Data.studentData.studentId,
            firstName: student3Data.firstName,
            lastName: student3Data.lastName,
            dateOfBirth: student3Data.studentData.dateOfBirth,
            class: 'pre-k',
            classId: preKClass._id,
            enrollmentDate: student3Data.studentData.enrollmentDate,
            medicalNotes: student3Data.studentData.medicalInfo,
            emergencyContact: {
                name: 'School Office',
                phone: student3Data.studentData.emergencyContact,
                relationship: 'Guardian'
            }
        });

        await Class.findByIdAndUpdate(preKClass._id, {
            $push: { students: student3._id }
        });

        console.log(`  ✓ Created student: Aisha (Pre-K)`);
        console.log('✅ Created all student profiles\n');

        // Print summary
        console.log('\n' + '='.repeat(60));
        console.log('🎉 DATABASE SEEDED SUCCESSFULLY!');
        console.log('='.repeat(60));
        console.log('\n📋 TEST ACCOUNTS:\n');

        console.log('👨‍💼 ADMIN:');
        console.log('   Email: admin@lotus.qa');
        console.log('   Password: Admin@123\n');

        console.log('👩‍🏫 TEACHERS:');
        console.log('   Email: teacher@lotus.qa');
        console.log('   Password: Teacher@123');
        console.log('   Name: Sarah Johnson (General - KG1 & KG2)\n');
        console.log('   Email: teacher2@lotus.qa');
        console.log('   Password: Teacher@123');
        console.log('   Name: Ahmed Al-Mansoori (Arabic - Pre-K)\n');

        console.log('👪 PARENTS:');
        console.log('   Email: parent@lotus.qa');
        console.log('   Password: Parent@123');
        console.log('   Name: Mohammed Al-Thani (Child: Lina)\n');
        console.log('   Email: parent2@lotus.qa');
        console.log('   Password: Parent@123');
        console.log('   Name: Fatima Hassan (Child: Omar)\n');

        console.log('👶 STUDENTS:');
        console.log('   Email: student@lotus.qa');
        console.log('   Password: Student@123');
        console.log('   Name: Lina Al-Thani (KG1 - Morning)\n');
        console.log('   Email: student2@lotus.qa');
        console.log('   Password: Student@123');
        console.log('   Name: Omar Hassan (KG2 - Morning)\n');
        console.log('   Email: student3@lotus.qa');
        console.log('   Password: Student@123');
        console.log('   Name: Aisha Al-Mansoori (Pre-K - Morning)\n');

        console.log('='.repeat(60));
        console.log('✅ You can now login with any of these accounts!');
        console.log('🌐 Login URL: http://localhost:3000/pages/auth/login.html');
        console.log('='.repeat(60) + '\n');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n📡 Database connection closed');
        process.exit(0);
    }
}

// Run the seed script
seedDatabase();
