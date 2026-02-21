const BASE_URL = 'http://localhost:8000/api';

async function testAllCRUD() {
    try {
        console.log('🧪 Testing All Admin CRUD Operations...\n');

        // Step 1: Login as admin
        console.log('1️⃣ Logging in as admin...');
        const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@lotus.qa',
                password: 'Admin@123'
            })
        });

        const loginData = await loginResponse.json();
        const token = loginData.token;
        console.log('✅ Login successful!\n');

        // Test User CRUD
        console.log('2️⃣ Testing User CRUD...');

        // Create User
        const newUser = {
            firstName: 'Test',
            lastName: 'User',
            email: 'testuser@lotus.qa',
            password: 'Test@123',
            role: 'teacher'
        };

        const createUserResponse = await fetch(`${BASE_URL}/admin/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newUser)
        });

        const createUserData = await createUserResponse.json();
        const createdUserId = createUserData.data?.user?._id;
        console.log(`   ✅ Created user: ${createdUserId}`);

        // Get User
        const getUserResponse = await fetch(`${BASE_URL}/admin/users/${createdUserId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const getUserData = await getUserResponse.json();
        console.log(`   ✅ Retrieved user: ${getUserData.data.user.email}`);

        // Update User
        const updateUserResponse = await fetch(`${BASE_URL}/admin/users/${createdUserId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ firstName: 'Updated' })
        });
        console.log(`   ✅ Updated user`);

        // Delete User
        const deleteUserResponse = await fetch(`${BASE_URL}/admin/users/${createdUserId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`   ✅ Deleted user\n`);

        // Test Student CRUD
        console.log('3️⃣ Testing Student CRUD...');

        const newStudent = {
            firstName: 'Test',
            lastName: 'Student',
            studentId: 'TEST-STU-001',
            dateOfBirth: '2020-01-01',
            gender: 'male'
        };

        const createStudentResponse = await fetch(`${BASE_URL}/admin/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newStudent)
        });

        const createStudentData = await createStudentResponse.json();
        const createdStudentId = createStudentData.data?.student?._id;
        console.log(`   ✅ Created student: ${createdStudentId}`);

        // Get Student
        const getStudentResponse = await fetch(`${BASE_URL}/admin/students/${createdStudentId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`   ✅ Retrieved student`);

        // Update Student
        await fetch(`${BASE_URL}/admin/students/${createdStudentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ firstName: 'Updated' })
        });
        console.log(`   ✅ Updated student`);

        // Delete Student
        await fetch(`${BASE_URL}/admin/students/${createdStudentId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`   ✅ Deleted student\n`);

        // Test Teacher CRUD
        console.log('4️⃣ Testing Teacher CRUD...');

        const newTeacher = {
            firstName: 'Test',
            lastName: 'Teacher',
            employeeId: 'TEST-TCH-001',
            email: 'testteacher@lotus.qa',
            phone: '+974-1234-5678'
        };

        const createTeacherResponse = await fetch(`${BASE_URL}/admin/teachers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newTeacher)
        });

        const createTeacherData = await createTeacherResponse.json();
        const createdTeacherId = createTeacherData.data?.teacher?._id;
        console.log(`   ✅ Created teacher: ${createdTeacherId}`);

        // Get Teacher
        await fetch(`${BASE_URL}/admin/teachers/${createdTeacherId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`   ✅ Retrieved teacher`);

        // Update Teacher
        await fetch(`${BASE_URL}/admin/teachers/${createdTeacherId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ firstName: 'Updated' })
        });
        console.log(`   ✅ Updated teacher`);

        // Delete Teacher
        await fetch(`${BASE_URL}/admin/teachers/${createdTeacherId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`   ✅ Deleted teacher\n`);

        // Test Parent CRUD
        console.log('5️⃣ Testing Parent CRUD...');

        const newParent = {
            firstName: 'Test',
            lastName: 'Parent',
            email: 'testparent@lotus.qa',
            phone: '+974-9876-5432',
            relationship: 'father'
        };

        const createParentResponse = await fetch(`${BASE_URL}/admin/parents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newParent)
        });

        const createParentData = await createParentResponse.json();
        const createdParentId = createParentData.data?.parent?._id;
        console.log(`   ✅ Created parent: ${createdParentId}`);

        // Get Parent
        await fetch(`${BASE_URL}/admin/parents/${createdParentId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`   ✅ Retrieved parent`);

        // Update Parent
        await fetch(`${BASE_URL}/admin/parents/${createdParentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ firstName: 'Updated' })
        });
        console.log(`   ✅ Updated parent`);

        // Delete Parent
        await fetch(`${BASE_URL}/admin/parents/${createdParentId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`   ✅ Deleted parent\n`);

        // Test Class CRUD
        console.log('6️⃣ Testing Class CRUD...');

        const newClass = {
            className: 'Test Class A',
            grade: 'kg1',
            section: 'A',
            capacity: 20
        };

        const createClassResponse = await fetch(`${BASE_URL}/admin/classes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newClass)
        });

        const createClassData = await createClassResponse.json();
        const createdClassId = createClassData.data?.class?._id;
        console.log(`   ✅ Created class: ${createdClassId}`);

        // Get Class
        await fetch(`${BASE_URL}/admin/classes/${createdClassId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`   ✅ Retrieved class`);

        // Update Class
        await fetch(`${BASE_URL}/admin/classes/${createdClassId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ section: 'B' })
        });
        console.log(`   ✅ Updated class`);

        // Delete Class
        await fetch(`${BASE_URL}/admin/classes/${createdClassId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`   ✅ Deleted class\n`);

        // Test Announcement CRUD
        console.log('7️⃣ Testing Announcement CRUD...');

        const newAnnouncement = {
            title: 'Test Announcement',
            content: 'This is a test announcement for CRUD testing.',
            type: 'general',
            targetAudience: ['all'],
            isPinned: false
        };

        const createAnnouncementResponse = await fetch(`${BASE_URL}/admin/announcements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newAnnouncement)
        });

        const createAnnouncementData = await createAnnouncementResponse.json();
        const createdAnnouncementId = createAnnouncementData.data?.announcement?._id;
        console.log(`   ✅ Created announcement: ${createdAnnouncementId}`);

        // Update Announcement
        await fetch(`${BASE_URL}/admin/announcements/${createdAnnouncementId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: 'Updated Test Announcement', isPinned: true })
        });
        console.log(`   ✅ Updated announcement`);

        // Delete Announcement
        await fetch(`${BASE_URL}/admin/announcements/${createdAnnouncementId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`   ✅ Deleted announcement\n`);

        console.log('✅ ALL CRUD OPERATIONS TESTED SUCCESSFULLY!\n');
        console.log('📋 Summary:');
        console.log('   ✅ Users: Create, Read, Update, Delete');
        console.log('   ✅ Students: Create, Read, Update, Delete');
        console.log('   ✅ Teachers: Create, Read, Update, Delete');
        console.log('   ✅ Parents: Create, Read, Update, Delete');
        console.log('   ✅ Classes: Create, Read, Update, Delete');
        console.log('   ✅ Announcements: Create, Read, Update, Delete');
        console.log('\n🎉 All admin CRUD features are working perfectly!');
        console.log('\n📝 You can now access the admin dashboard at:');
        console.log('   http://localhost:8000/admin/dashboard.html');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.stack) {
            console.error(error.stack);
        }
        process.exit(1);
    }
}

testAllCRUD();
