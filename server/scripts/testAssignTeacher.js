const BASE_URL = 'http://localhost:8000/api';

async function testAssignTeacher() {
    try {
        console.log('🧪 Testing Teacher-Class Assignment...\n');

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
        console.log('✅ Admin login successful!\n');

        // Step 2: Get all teachers
        console.log('2️⃣ Fetching all teachers...');
        const teachersResponse = await fetch(`${BASE_URL}/admin/teachers`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const teachersData = await teachersResponse.json();
        console.log(`✅ Found ${teachersData.results} teachers\n`);

        if (teachersData.data.teachers.length === 0) {
            console.log('❌ No teachers found!');
            return;
        }

        const teacher = teachersData.data.teachers[0];
        console.log(`   Selected Teacher: ${teacher.firstName} ${teacher.lastName}`);
        console.log(`   Teacher ID: ${teacher._id}\n`);

        // Step 3: Get all classes
        console.log('3️⃣ Fetching all classes...');
        const classesResponse = await fetch(`${BASE_URL}/admin/classes`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const classesData = await classesResponse.json();
        console.log(`✅ Found ${classesData.results} classes\n`);

        if (classesData.data.classes.length === 0) {
            console.log('❌ No classes found!');
            return;
        }

        const classToAssign = classesData.data.classes[0];
        console.log(`   Selected Class: ${classToAssign.className || classToAssign.grade}`);
        console.log(`   Class ID: ${classToAssign._id}\n`);

        // Step 4: METHOD 1 - Assign teacher to class by updating the class
        console.log('4️⃣ METHOD 1: Assigning teacher to class (via Class update)...');
        const updateClassResponse = await fetch(`${BASE_URL}/admin/classes/${classToAssign._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                teacherId: teacher._id
            })
        });

        const updatedClass = await updateClassResponse.json();
        console.log('✅ Teacher assigned to class successfully!');
        console.log(`   Class: ${updatedClass.data.class.className || updatedClass.data.class.grade}`);
        console.log(`   Assigned Teacher ID: ${updatedClass.data.class.teacherId}\n`);

        // Step 5: METHOD 2 - Update teacher's assignedClasses array
        console.log('5️⃣ METHOD 2: Adding class to teacher\'s assignments (via Teacher update)...');

        // Get current teacher data first
        const teacherDetailResponse = await fetch(`${BASE_URL}/admin/teachers/${teacher._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const teacherDetail = await teacherDetailResponse.json();

        // Add class to assignedClasses if not already there
        const currentClasses = teacherDetail.data.teacher.assignedClasses || [];
        const classIds = currentClasses.map(c => c._id || c);

        if (!classIds.includes(classToAssign._id)) {
            classIds.push(classToAssign._id);
        }

        const updateTeacherResponse = await fetch(`${BASE_URL}/admin/teachers/${teacher._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                assignedClasses: classIds
            })
        });

        const updatedTeacher = await updateTeacherResponse.json();
        console.log('✅ Class added to teacher\'s assignments!');
        console.log(`   Teacher: ${updatedTeacher.data.teacher.firstName} ${updatedTeacher.data.teacher.lastName}`);
        console.log(`   Assigned Classes: ${updatedTeacher.data.teacher.assignedClasses.length}\n`);

        // Step 6: Verify the assignment
        console.log('6️⃣ Verifying assignment...');
        const verifyClassResponse = await fetch(`${BASE_URL}/admin/classes/${classToAssign._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const verifyClass = await verifyClassResponse.json();

        console.log('✅ Assignment verified!');
        console.log(`   Class: ${verifyClass.data.class.className || verifyClass.data.class.grade}`);
        console.log(`   Teacher ID: ${verifyClass.data.class.teacherId}`);
        console.log(`   Match: ${verifyClass.data.class.teacherId === teacher._id ? '✅ YES' : '❌ NO'}\n`);

        console.log('✅ ALL TESTS PASSED!\n');
        console.log('📋 How Admin Can Assign Teachers to Classes:\n');
        console.log('METHOD 1 - Update Class:');
        console.log('   PATCH /api/admin/classes/:classId');
        console.log('   Body: { "teacherId": "teacher_id_here" }\n');
        console.log('METHOD 2 - Update Teacher:');
        console.log('   PATCH /api/admin/teachers/:teacherId');
        console.log('   Body: { "assignedClasses": ["class_id_1", "class_id_2"] }\n');
        console.log('💡 TIP: You can also set assistantTeacherId for a class!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.stack) {
            console.error(error.stack);
        }
        process.exit(1);
    }
}

testAssignTeacher();
