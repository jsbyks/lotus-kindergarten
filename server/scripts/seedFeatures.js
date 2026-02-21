const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const Homework = require('../models/Homework');
const Announcement = require('../models/Announcement');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Class = require('../models/Class');

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ DB connection successful!');
    seedFeatures();
}).catch(err => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
});

async function seedFeatures() {
    try {
        // Get users and related data
        const adminUser = await User.findOne({ email: 'admin@lotus.qa' });
        const teacherUser = await User.findOne({ email: 'teacher@lotus.qa' });
        const teacher = await Teacher.findOne({ userId: teacherUser._id });
        const classes = await Class.find();
        const students = await Student.find();

        console.log('\n🎯 Seeding Homework Assignments...');

        // Clear existing homework
        await Homework.deleteMany({});

        const homeworkData = [
            {
                title: 'Learning Colors - Red and Blue',
                description: 'Draw and color 3 red objects and 3 blue objects. You can draw apples, balls, flowers, or anything you like!',
                subject: 'art',
                classId: classes[0]._id,
                teacherId: teacher._id,
                assignedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                maxPoints: 10,
                isPublished: true,
                attachments: []
            },
            {
                title: 'Count to 10',
                description: 'Practice counting from 1 to 10. Draw the correct number of stars for each number.',
                subject: 'math',
                classId: classes[0]._id,
                teacherId: teacher._id,
                assignedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                maxPoints: 10,
                isPublished: true,
                attachments: []
            },
            {
                title: 'ABC Song Practice',
                description: 'Practice singing the ABC song with your parents. Can you name 5 things that start with the letter A?',
                subject: 'english',
                classId: classes[1]._id,
                teacherId: teacher._id,
                assignedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                maxPoints: 10,
                isPublished: true,
                attachments: []
            },
            {
                title: 'Shape Hunt',
                description: 'Find objects in your home that are circles, squares, and triangles. Draw or take pictures of what you find!',
                subject: 'math',
                classId: classes[1]._id,
                teacherId: teacher._id,
                assignedDate: new Date(),
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                maxPoints: 15,
                isPublished: true,
                attachments: []
            },
            {
                title: 'My Family Drawing',
                description: 'Draw a picture of your family. Show everyone who lives in your house with you!',
                subject: 'art',
                classId: classes[2]._id,
                teacherId: teacher._id,
                assignedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
                maxPoints: 10,
                isPublished: true,
                attachments: []
            },
            {
                title: 'Story Time: The Three Little Pigs',
                description: 'Listen to the story of The Three Little Pigs. Draw your favorite part of the story.',
                subject: 'english',
                classId: classes[2]._id,
                teacherId: teacher._id,
                assignedDate: new Date(),
                dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
                maxPoints: 10,
                isPublished: true,
                attachments: []
            }
        ];

        const homework = await Homework.insertMany(homeworkData);
        console.log(`✅ Created ${homework.length} homework assignments`);

        console.log('\n📢 Seeding Announcements...');

        // Clear existing announcements
        await Announcement.deleteMany({});

        const announcementData = [
            {
                title: '🎉 Welcome to Lotus Kindergarten!',
                content: 'Welcome to the new school year! We are excited to have all our students and families. Please check the parent handbook for important information.',
                type: 'general',
                targetAudience: ['all'],
                isPinned: true,
                publishedBy: adminUser._id,
                publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                isActive: true
            },
            {
                title: '📅 Parent-Teacher Conference',
                content: 'Parent-Teacher conferences will be held next week from Monday to Friday, 3:00 PM - 6:00 PM. Please schedule your time slot through the parent portal.',
                type: 'event',
                targetAudience: ['parents'],
                isPinned: true,
                publishedBy: adminUser._id,
                publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                isActive: true
            },
            {
                title: '🎨 Art Supplies Needed',
                content: 'Dear Parents, please send the following art supplies with your child: crayons, safety scissors, glue stick, and colored paper. Thank you!',
                type: 'general',
                targetAudience: ['parents'],
                isPinned: false,
                publishedBy: teacherUser._id,
                publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                isActive: true
            },
            {
                title: '🏃 Sports Day Next Friday!',
                content: 'Get ready for our annual Sports Day! Students should wear comfortable clothes and running shoes. We will have fun races, games, and activities!',
                type: 'event',
                targetAudience: ['all'],
                isPinned: false,
                publishedBy: adminUser._id,
                publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                isActive: true
            },
            {
                title: '📚 Library Day Schedule',
                content: 'Teachers: Please note the updated library schedule. Pre-K visits on Mondays, KG1 on Wednesdays, and KG2 on Fridays at 10:00 AM.',
                type: 'general',
                targetAudience: ['teachers'],
                isPinned: false,
                publishedBy: adminUser._id,
                publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                isActive: true
            },
            {
                title: '🍎 Healthy Snack Week',
                content: 'This week is Healthy Snack Week! Please pack nutritious snacks like fruits, vegetables, yogurt, or whole grain crackers for your child.',
                type: 'general',
                targetAudience: ['parents'],
                isPinned: false,
                publishedBy: teacherUser._id,
                publishedAt: new Date(),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                isActive: true
            },
            {
                title: '🎭 School Play Auditions',
                content: 'We are preparing for our winter school play! Students interested in participating should let their teacher know by Friday.',
                type: 'event',
                targetAudience: ['all'],
                isPinned: false,
                publishedBy: adminUser._id,
                publishedAt: new Date(),
                isActive: true
            },
            {
                title: '🚨 School Closure - Holiday',
                content: 'The school will be closed next Monday for the national holiday. Classes will resume on Tuesday. Enjoy the long weekend!',
                type: 'holiday',
                targetAudience: ['all'],
                isPinned: true,
                publishedBy: adminUser._id,
                publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                isActive: true
            }
        ];

        const announcements = await Announcement.insertMany(announcementData);
        console.log(`✅ Created ${announcements.length} announcements`);

        console.log('\n📋 Seeding Attendance Records...');

        // Clear existing attendance
        await Attendance.deleteMany({});

        const attendanceData = [];

        // Create attendance for the past 5 school days
        for (let i = 5; i > 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            // Skip weekends
            if (date.getDay() === 0 || date.getDay() === 6) continue;

            for (const classItem of classes) {
                const classStudents = students.filter(s =>
                    s.classId.toString() === classItem._id.toString()
                );

                const records = classStudents.map(student => {
                    // Randomly assign attendance status (mostly present)
                    const rand = Math.random();
                    let status = 'present';

                    if (rand > 0.95) status = 'absent';
                    else if (rand > 0.90) status = 'late';
                    else if (rand > 0.85) status = 'excused';

                    // Create proper Date objects for check-in/out times
                    const checkInDate = new Date(date);
                    checkInDate.setHours(status === 'late' ? 8 : 8, status === 'late' ? 30 : 0, 0, 0);

                    const checkOutDate = status === 'absent' ? null : new Date(date);
                    if (checkOutDate) {
                        checkOutDate.setHours(15, 0, 0, 0);
                    }

                    return {
                        studentId: student._id,
                        status,
                        checkInTime: status === 'absent' ? null : checkInDate,
                        checkOutTime: checkOutDate,
                        notes: status === 'late' ? 'Traffic delay' : (status === 'excused' ? 'Doctor appointment' : '')
                    };
                });

                attendanceData.push({
                    classId: classItem._id,
                    date: new Date(date.setHours(0, 0, 0, 0)),
                    records,
                    markedBy: teacher._id
                });
            }
        }

        const attendance = await Attendance.insertMany(attendanceData);
        console.log(`✅ Created ${attendance.length} attendance records`);

        console.log('\n✅ Feature seeding completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - ${homework.length} homework assignments`);
        console.log(`   - ${announcements.length} announcements`);
        console.log(`   - ${attendance.length} attendance records`);
        console.log('\n🎉 Your system is now fully populated with sample data!');
        console.log('\n📝 You can now:');
        console.log('   - View and submit homework as a student');
        console.log('   - Create and grade homework as a teacher');
        console.log('   - View announcements relevant to your role');
        console.log('   - Mark and view attendance records');
        console.log('   - Monitor student progress as a parent');

        process.exit(0);
    } catch (err) {
        console.error('❌ Error seeding features:', err);
        process.exit(1);
    }
}
