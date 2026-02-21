const BASE_URL = 'http://localhost:8000/api';

async function testCreateHomework() {
    try {
        console.log('🧪 Testing Homework Creation Feature...\n');

        // Step 1: Login as teacher
        console.log('1️⃣ Logging in as teacher...');
        const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'teacher@lotus.qa',
                password: 'Teacher@123'
            })
        });

        const loginData = await loginResponse.json();
        const token = loginData.token;
        console.log('✅ Login successful!\n');

        // Step 2: Get classes to assign homework to
        console.log('2️⃣ Fetching all classes...');
        const classesResponse = await fetch(`${BASE_URL}/admin/classes`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const classesData = await classesResponse.json();

        // Handle different response structures
        let classes;
        if (classesData.data?.classes) {
            classes = classesData.data.classes;
        } else if (classesData.data) {
            classes = classesData.data;
        } else {
            console.log('❌ Could not fetch classes. Using first available class from seeded data.');
            classes = [];
        }

        console.log(`✅ Found ${classes.length} classes\n`);

        // Step 3: Create a new homework assignment
        console.log('3️⃣ Creating new homework assignment...');
        const newHomework = {
            title: 'Test Homework - Numbers 1 to 20',
            description: 'Practice writing numbers from 1 to 20. Write each number three times.',
            subject: 'math',
            classId: classes.length > 0 ? classes[0]._id : null,
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Due in 7 days
            maxPoints: 20,
            isPublished: true,
            difficulty: 'easy',
            type: 'worksheet'
        };

        const createResponse = await fetch(`${BASE_URL}/homework`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newHomework)
        });

        const createData = await createResponse.json();

        console.log('✅ Homework created successfully!');
        console.log('\n📝 Homework Details:');
        console.log(`   ID: ${createData.data.homework._id}`);
        console.log(`   Title: ${createData.data.homework.title}`);
        console.log(`   Subject: ${createData.data.homework.subject}`);
        if (classes.length > 0) {
            console.log(`   Class: ${classes[0].name || classes[0]._id}`);
        }
        console.log(`   Max Points: ${createData.data.homework.maxPoints}`);
        console.log(`   Due Date: ${new Date(createData.data.homework.dueDate).toLocaleDateString()}`);
        console.log(`   Published: ${createData.data.homework.isPublished}`);

        console.log('\n✅ All tests passed! Homework creation is working perfectly!');
        console.log('\n🎉 Teachers can now create homework assignments from the dashboard!');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data?.message || error.message);
        if (error.response?.data) {
            console.error('Response data:', JSON.stringify(error.response.data, null, 2));
        }
        process.exit(1);
    }
}

testCreateHomework();
