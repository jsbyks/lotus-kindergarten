// Admin Management - Complete CRUD Operations
const API_BASE = 'http://localhost:8000/api';

// Get auth token
function getToken() {
    return localStorage.getItem('token');
}

// Show modal
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">${title}</h2>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
            </div>
            ${content}
        </div>
    `;
    document.body.appendChild(modal);
}

// Create User Form
function showCreateUserForm() {
    const content = `
        <form onsubmit="createUser(event)" class="space-y-4">
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                <input type="text" name="firstName" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                <input type="text" name="lastName" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                <input type="email" name="email" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Password *</label>
                <input type="password" name="password" required minlength="8" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Role *</label>
                <select name="role" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                    <option value="parent">Parent</option>
                    <option value="student">Student</option>
                </select>
            </div>
            <div class="flex gap-3 pt-4">
                <button type="submit" class="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold transition">
                    Create User
                </button>
                <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
                    Cancel
                </button>
            </div>
        </form>
    `;
    showModal('Create New User', content);
}

// Create User
async function createUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    try {
        const response = await fetch(`${API_BASE}/admin/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('✅ User created successfully!');
            document.querySelector('.fixed').remove();
            // Reload users view
            document.querySelector('[data-section="users"]').click();
        } else {
            alert('❌ Error: ' + (data.message || 'Failed to create user'));
        }
    } catch (error) {
        alert('❌ Error creating user: ' + error.message);
    }
}

// Edit User Form
async function showEditUserForm(userId) {
    try {
        const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        const data = await response.json();

        if (data.status === 'success') {
            const user = data.data.user;
            const content = `
                <form onsubmit="updateUser(event, '${userId}')" class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                        <input type="text" name="firstName" value="${user.firstName}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                        <input type="text" name="lastName" value="${user.lastName}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                        <input type="email" name="email" value="${user.email}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Role *</label>
                        <select name="role" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                            <option value="teacher" ${user.role === 'teacher' ? 'selected' : ''}>Teacher</option>
                            <option value="parent" ${user.role === 'parent' ? 'selected' : ''}>Parent</option>
                            <option value="student" ${user.role === 'student' ? 'selected' : ''}>Student</option>
                        </select>
                    </div>
                    <p class="text-sm text-gray-500">Leave password empty to keep current password</p>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                        <input type="password" name="password" minlength="8" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition">
                            Update User
                        </button>
                        <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
                            Cancel
                        </button>
                    </div>
                </form>
            `;
            showModal('Edit User', content);
        }
    } catch (error) {
        alert('❌ Error loading user: ' + error.message);
    }
}

// Update User
async function updateUser(event, userId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    // Remove password if empty
    if (!userData.password) {
        delete userData.password;
    }

    try {
        const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('✅ User updated successfully!');
            document.querySelector('.fixed').remove();
            document.querySelector('[data-section="users"]').click();
        } else {
            alert('❌ Error: ' + (data.message || 'Failed to update user'));
        }
    } catch (error) {
        alert('❌ Error updating user: ' + error.message);
    }
}

// Delete User
async function deleteUser(userId, userName) {
    if (!confirm(`Are you sure you want to delete user: ${userName}?\n\nThis action cannot be undone.`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });

        if (response.ok) {
            alert('✅ User deleted successfully!');
            document.querySelector('[data-section="users"]').click();
        } else {
            alert('❌ Failed to delete user');
        }
    } catch (error) {
        alert('❌ Error deleting user: ' + error.message);
    }
}

// Create Class Form
function showCreateClassForm() {
    const content = `
        <form onsubmit="createClass(event)" class="space-y-4">
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Class Name *</label>
                <input type="text" name="className" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Grade *</label>
                <select name="grade" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Select Grade</option>
                    <option value="pre-k">Pre-K</option>
                    <option value="kg1">KG1</option>
                    <option value="kg2">KG2</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Section</label>
                <input type="text" name="section" placeholder="e.g., A, B, Morning, Afternoon" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Classroom</label>
                <input type="text" name="classroom" placeholder="e.g., Room 101" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Capacity</label>
                <input type="number" name="capacity" min="1" max="50" placeholder="20" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Academic Year</label>
                <input type="text" name="academicYear" placeholder="2025-2026" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div class="flex gap-3 pt-4">
                <button type="submit" class="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold transition">
                    Create Class
                </button>
                <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
                    Cancel
                </button>
            </div>
        </form>
    `;
    showModal('Create New Class', content);
}

// Create Class
async function createClass(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const classData = Object.fromEntries(formData);

    // Convert capacity to number if present
    if (classData.capacity) {
        classData.capacity = parseInt(classData.capacity);
    }

    try {
        const response = await fetch(`${API_BASE}/admin/classes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(classData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('✅ Class created successfully!');
            document.querySelector('.fixed').remove();
            document.querySelector('[data-section="classes"]').click();
        } else {
            alert('❌ Error: ' + (data.message || 'Failed to create class'));
        }
    } catch (error) {
        alert('❌ Error creating class: ' + error.message);
    }
}

// Create Announcement Form
function showCreateAnnouncementForm() {
    const content = `
        <form onsubmit="createAnnouncement(event)" class="space-y-4">
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                <input type="text" name="title" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Content *</label>
                <textarea name="content" required rows="4" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Type *</label>
                <select name="type" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="general">General</option>
                    <option value="urgent">Urgent</option>
                    <option value="event">Event</option>
                    <option value="holiday">Holiday</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Target Audience * (Hold Ctrl/Cmd to select multiple)</label>
                <select name="targetAudience" multiple required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" size="6">
                    <option value="all">All</option>
                    <option value="teachers">Teachers</option>
                    <option value="parents">Parents</option>
                    <option value="pre-k">Pre-K</option>
                    <option value="kg1">KG1</option>
                    <option value="kg2">KG2</option>
                </select>
            </div>
            <div class="flex items-center gap-2">
                <input type="checkbox" name="isPinned" id="isPinned" class="w-5 h-5 text-purple-600">
                <label for="isPinned" class="text-sm font-bold text-gray-700">Pin this announcement</label>
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Expires At (Optional)</label>
                <input type="datetime-local" name="expiresAt" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div class="flex gap-3 pt-4">
                <button type="submit" class="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold transition">
                    Create Announcement
                </button>
                <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
                    Cancel
                </button>
            </div>
        </form>
    `;
    showModal('Create New Announcement', content);
}

// Create Announcement
async function createAnnouncement(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Handle multi-select for targetAudience
    const targetAudience = Array.from(formData.getAll('targetAudience'));

    const announcementData = {
        title: formData.get('title'),
        content: formData.get('content'),
        type: formData.get('type'),
        targetAudience: targetAudience,
        isPinned: formData.get('isPinned') === 'on',
        expiresAt: formData.get('expiresAt') || null
    };

    try {
        const response = await fetch(`${API_BASE}/admin/announcements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(announcementData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('✅ Announcement created successfully!');
            document.querySelector('.fixed').remove();
            document.querySelector('[data-section="announcements"]').click();
        } else {
            alert('❌ Error: ' + (data.message || 'Failed to create announcement'));
        }
    } catch (error) {
        alert('❌ Error creating announcement: ' + error.message);
    }
}

// ============= STUDENT MANAGEMENT =============

// Create Student Form
async function showCreateStudentForm() {
    try {
        // Fetch classes for dropdown
        const classesResponse = await fetch(`${API_BASE}/admin/classes`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        const classesData = await classesResponse.json();
        const classes = classesData.data?.classes || [];

        const content = `
            <form onsubmit="createStudent(event)" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                        <input type="text" name="firstName" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                        <input type="text" name="lastName" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Student ID *</label>
                    <input type="text" name="studentId" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Date of Birth *</label>
                    <input type="date" name="dateOfBirth" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Gender *</label>
                    <select name="gender" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Class</label>
                    <select name="classId" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="">Not Assigned</option>
                        ${classes.map(c => `<option value="${c._id}">${c.className || c.grade}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Enrollment Date</label>
                    <input type="date" name="enrollmentDate" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Medical Conditions</label>
                    <textarea name="medicalConditions" rows="2" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                </div>
                <div class="flex gap-3 pt-4">
                    <button type="submit" class="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold transition">
                        Create Student
                    </button>
                    <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
                        Cancel
                    </button>
                </div>
            </form>
        `;
        showModal('Create New Student', content);
    } catch (error) {
        alert('❌ Error loading form: ' + error.message);
    }
}

// Create Student
async function createStudent(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const studentData = Object.fromEntries(formData);

    // Remove empty fields
    Object.keys(studentData).forEach(key => {
        if (!studentData[key]) delete studentData[key];
    });

    try {
        const response = await fetch(`${API_BASE}/admin/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(studentData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('✅ Student created successfully!');
            document.querySelector('.fixed').remove();
            document.querySelector('[data-section="students"]').click();
        } else {
            alert('❌ Error: ' + (data.message || 'Failed to create student'));
        }
    } catch (error) {
        alert('❌ Error creating student: ' + error.message);
    }
}

// Edit Student Form
async function showEditStudentForm(studentId) {
    try {
        const [studentResponse, classesResponse] = await Promise.all([
            fetch(`${API_BASE}/admin/students/${studentId}`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            }),
            fetch(`${API_BASE}/admin/classes`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            })
        ]);

        const studentData = await studentResponse.json();
        const classesData = await classesResponse.json();

        if (studentData.status === 'success') {
            const student = studentData.data.student;
            const classes = classesData.data?.classes || [];

            const content = `
                <form onsubmit="updateStudent(event, '${studentId}')" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                            <input type="text" name="firstName" value="${student.firstName || ''}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                            <input type="text" name="lastName" value="${student.lastName || ''}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Student ID *</label>
                        <input type="text" name="studentId" value="${student.studentId || ''}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
                        <input type="date" name="dateOfBirth" value="${student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : ''}" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                        <select name="gender" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="">Select Gender</option>
                            <option value="male" ${student.gender === 'male' ? 'selected' : ''}>Male</option>
                            <option value="female" ${student.gender === 'female' ? 'selected' : ''}>Female</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Class</label>
                        <select name="classId" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="">Not Assigned</option>
                            ${classes.map(c => `<option value="${c._id}" ${student.classId?._id === c._id ? 'selected' : ''}>${c.className || c.grade}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Medical Conditions</label>
                        <textarea name="medicalConditions" rows="2" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">${student.medicalConditions || ''}</textarea>
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition">
                            Update Student
                        </button>
                        <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
                            Cancel
                        </button>
                    </div>
                </form>
            `;
            showModal('Edit Student', content);
        }
    } catch (error) {
        alert('❌ Error loading student: ' + error.message);
    }
}

// Update Student
async function updateStudent(event, studentId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const studentData = Object.fromEntries(formData);

    // Remove empty fields
    Object.keys(studentData).forEach(key => {
        if (!studentData[key]) delete studentData[key];
    });

    try {
        const response = await fetch(`${API_BASE}/admin/students/${studentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(studentData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('✅ Student updated successfully!');
            document.querySelector('.fixed').remove();
            document.querySelector('[data-section="students"]').click();
        } else {
            alert('❌ Error: ' + (data.message || 'Failed to update student'));
        }
    } catch (error) {
        alert('❌ Error updating student: ' + error.message);
    }
}

// Delete Student
async function deleteStudent(studentId, studentName) {
    if (!confirm(`Are you sure you want to delete student: ${studentName}?\n\nThis action cannot be undone.`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/admin/students/${studentId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });

        if (response.ok) {
            alert('✅ Student deleted successfully!');
            document.querySelector('[data-section="students"]').click();
        } else {
            alert('❌ Failed to delete student');
        }
    } catch (error) {
        alert('❌ Error deleting student: ' + error.message);
    }
}

// ============= TEACHER MANAGEMENT =============

// Create Teacher Form
function showCreateTeacherForm() {
    const content = `
        <form onsubmit="createTeacher(event)" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                    <input type="text" name="firstName" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <input type="text" name="lastName" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                </div>
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Employee ID *</label>
                <input type="text" name="employeeId" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                <input type="email" name="email" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                <input type="tel" name="phone" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Qualification</label>
                <input type="text" name="qualification" placeholder="e.g., Bachelor's in Education" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Specialization</label>
                <input type="text" name="specialization" placeholder="e.g., Early Childhood Education" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Hire Date</label>
                <input type="date" name="hireDate" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                <textarea name="bio" rows="3" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            </div>
            <div class="flex gap-3 pt-4">
                <button type="submit" class="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold transition">
                    Create Teacher
                </button>
                <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
                    Cancel
                </button>
            </div>
        </form>
    `;
    showModal('Create New Teacher', content);
}

// Create Teacher
async function createTeacher(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const teacherData = Object.fromEntries(formData);

    // Remove empty fields
    Object.keys(teacherData).forEach(key => {
        if (!teacherData[key]) delete teacherData[key];
    });

    try {
        const response = await fetch(`${API_BASE}/admin/teachers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(teacherData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('✅ Teacher created successfully!');
            document.querySelector('.fixed').remove();
            document.querySelector('[data-section="teachers"]').click();
        } else {
            alert('❌ Error: ' + (data.message || 'Failed to create teacher'));
        }
    } catch (error) {
        alert('❌ Error creating teacher: ' + error.message);
    }
}

// Edit Teacher Form
async function showEditTeacherForm(teacherId) {
    try {
        const response = await fetch(`${API_BASE}/admin/teachers/${teacherId}`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        const data = await response.json();

        if (data.status === 'success') {
            const teacher = data.data.teacher;
            const content = `
                <form onsubmit="updateTeacher(event, '${teacherId}')" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                            <input type="text" name="firstName" value="${teacher.firstName || ''}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                            <input type="text" name="lastName" value="${teacher.lastName || ''}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Employee ID *</label>
                        <input type="text" name="employeeId" value="${teacher.employeeId || ''}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                        <input type="email" name="email" value="${teacher.email || ''}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                        <input type="tel" name="phone" value="${teacher.phone || ''}" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Qualification</label>
                        <input type="text" name="qualification" value="${teacher.qualification || ''}" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Specialization</label>
                        <input type="text" name="specialization" value="${teacher.specialization || ''}" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Bio</label>
                        <textarea name="bio" rows="3" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">${teacher.bio || ''}</textarea>
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition">
                            Update Teacher
                        </button>
                        <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
                            Cancel
                        </button>
                    </div>
                </form>
            `;
            showModal('Edit Teacher', content);
        }
    } catch (error) {
        alert('❌ Error loading teacher: ' + error.message);
    }
}

// Update Teacher
async function updateTeacher(event, teacherId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const teacherData = Object.fromEntries(formData);

    // Remove empty fields
    Object.keys(teacherData).forEach(key => {
        if (!teacherData[key]) delete teacherData[key];
    });

    try {
        const response = await fetch(`${API_BASE}/admin/teachers/${teacherId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(teacherData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('✅ Teacher updated successfully!');
            document.querySelector('.fixed').remove();
            document.querySelector('[data-section="teachers"]').click();
        } else {
            alert('❌ Error: ' + (data.message || 'Failed to update teacher'));
        }
    } catch (error) {
        alert('❌ Error updating teacher: ' + error.message);
    }
}

// Delete Teacher
async function deleteTeacher(teacherId, teacherName) {
    if (!confirm(`Are you sure you want to delete teacher: ${teacherName}?\n\nThis action cannot be undone.`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/admin/teachers/${teacherId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });

        if (response.ok) {
            alert('✅ Teacher deleted successfully!');
            document.querySelector('[data-section="teachers"]').click();
        } else {
            alert('❌ Failed to delete teacher');
        }
    } catch (error) {
        alert('❌ Error deleting teacher: ' + error.message);
    }
}

// ============= PARENT MANAGEMENT =============

// Create Parent Form
async function showCreateParentForm() {
    try {
        // Fetch students for dropdown
        const studentsResponse = await fetch(`${API_BASE}/admin/students`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        const studentsData = await studentsResponse.json();
        const students = studentsData.data?.students || [];

        const content = `
            <form onsubmit="createParent(event)" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                        <input type="text" name="firstName" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                        <input type="text" name="lastName" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <input type="email" name="email" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                    <input type="tel" name="phone" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Relationship</label>
                    <select name="relationship" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="guardian">Guardian</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Occupation</label>
                    <input type="text" name="occupation" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Address</label>
                    <textarea name="address" rows="2" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Emergency Contact</label>
                    <input type="tel" name="emergencyContact" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                </div>
                <div class="flex gap-3 pt-4">
                    <button type="submit" class="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold transition">
                        Create Parent
                    </button>
                    <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
                        Cancel
                    </button>
                </div>
            </form>
        `;
        showModal('Create New Parent', content);
    } catch (error) {
        alert('❌ Error loading form: ' + error.message);
    }
}

// Create Parent
async function createParent(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const parentData = Object.fromEntries(formData);

    // Remove empty fields
    Object.keys(parentData).forEach(key => {
        if (!parentData[key]) delete parentData[key];
    });

    try {
        const response = await fetch(`${API_BASE}/admin/parents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(parentData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('✅ Parent created successfully!');
            document.querySelector('.fixed').remove();
            document.querySelector('[data-section="parents"]').click();
        } else {
            alert('❌ Error: ' + (data.message || 'Failed to create parent'));
        }
    } catch (error) {
        alert('❌ Error creating parent: ' + error.message);
    }
}

// Edit Parent Form
async function showEditParentForm(parentId) {
    try {
        const response = await fetch(`${API_BASE}/admin/parents/${parentId}`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        const data = await response.json();

        if (data.status === 'success') {
            const parent = data.data.parent;
            const content = `
                <form onsubmit="updateParent(event, '${parentId}')" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                            <input type="text" name="firstName" value="${parent.firstName || ''}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                            <input type="text" name="lastName" value="${parent.lastName || ''}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                        <input type="email" name="email" value="${parent.email || ''}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                        <input type="tel" name="phone" value="${parent.phone || ''}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Relationship</label>
                        <select name="relationship" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="father" ${parent.relationship === 'father' ? 'selected' : ''}>Father</option>
                            <option value="mother" ${parent.relationship === 'mother' ? 'selected' : ''}>Mother</option>
                            <option value="guardian" ${parent.relationship === 'guardian' ? 'selected' : ''}>Guardian</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Occupation</label>
                        <input type="text" name="occupation" value="${parent.occupation || ''}" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Address</label>
                        <textarea name="address" rows="2" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">${parent.address || ''}</textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Emergency Contact</label>
                        <input type="tel" name="emergencyContact" value="${parent.emergencyContact || ''}" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition">
                            Update Parent
                        </button>
                        <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
                            Cancel
                        </button>
                    </div>
                </form>
            `;
            showModal('Edit Parent', content);
        }
    } catch (error) {
        alert('❌ Error loading parent: ' + error.message);
    }
}

// Update Parent
async function updateParent(event, parentId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const parentData = Object.fromEntries(formData);

    // Remove empty fields
    Object.keys(parentData).forEach(key => {
        if (!parentData[key]) delete parentData[key];
    });

    try {
        const response = await fetch(`${API_BASE}/admin/parents/${parentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(parentData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('✅ Parent updated successfully!');
            document.querySelector('.fixed').remove();
            document.querySelector('[data-section="parents"]').click();
        } else {
            alert('❌ Error: ' + (data.message || 'Failed to update parent'));
        }
    } catch (error) {
        alert('❌ Error updating parent: ' + error.message);
    }
}

// Delete Parent
async function deleteParent(parentId, parentName) {
    if (!confirm(`Are you sure you want to delete parent: ${parentName}?\n\nThis action cannot be undone.`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/admin/parents/${parentId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });

        if (response.ok) {
            alert('✅ Parent deleted successfully!');
            document.querySelector('[data-section="parents"]').click();
        } else {
            alert('❌ Failed to delete parent');
        }
    } catch (error) {
        alert('❌ Error deleting parent: ' + error.message);
    }
}

// Edit Announcement Form
async function showEditAnnouncementForm(announcementId) {
    try {
        const response = await fetch(`${API_BASE}/admin/announcements`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        const data = await response.json();

        if (data.status === 'success') {
            const announcement = data.data.announcements.find(a => a._id === announcementId);
            if (!announcement) {
                alert('❌ Announcement not found');
                return;
            }

            const content = `
                <form onsubmit="updateAnnouncement(event, '${announcementId}')" class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                        <input type="text" name="title" value="${announcement.title}" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Content *</label>
                        <textarea name="content" required rows="4" class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">${announcement.content}</textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Type *</label>
                        <select name="type" required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="general" ${announcement.type === 'general' ? 'selected' : ''}>General</option>
                            <option value="urgent" ${announcement.type === 'urgent' ? 'selected' : ''}>Urgent</option>
                            <option value="event" ${announcement.type === 'event' ? 'selected' : ''}>Event</option>
                            <option value="holiday" ${announcement.type === 'holiday' ? 'selected' : ''}>Holiday</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Target Audience * (Hold Ctrl/Cmd to select multiple)</label>
                        <select name="targetAudience" multiple required class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" size="6">
                            <option value="all" ${announcement.targetAudience.includes('all') ? 'selected' : ''}>All</option>
                            <option value="teachers" ${announcement.targetAudience.includes('teachers') ? 'selected' : ''}>Teachers</option>
                            <option value="parents" ${announcement.targetAudience.includes('parents') ? 'selected' : ''}>Parents</option>
                            <option value="pre-k" ${announcement.targetAudience.includes('pre-k') ? 'selected' : ''}>Pre-K</option>
                            <option value="kg1" ${announcement.targetAudience.includes('kg1') ? 'selected' : ''}>KG1</option>
                            <option value="kg2" ${announcement.targetAudience.includes('kg2') ? 'selected' : ''}>KG2</option>
                        </select>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="checkbox" name="isPinned" id="isPinned" ${announcement.isPinned ? 'checked' : ''} class="w-5 h-5 text-purple-600">
                        <label for="isPinned" class="text-sm font-bold text-gray-700">Pin this announcement</label>
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition">
                            Update Announcement
                        </button>
                        <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-xl font-bold transition">
                            Cancel
                        </button>
                    </div>
                </form>
            `;
            showModal('Edit Announcement', content);
        }
    } catch (error) {
        alert('❌ Error loading announcement: ' + error.message);
    }
}

// Update Announcement
async function updateAnnouncement(event, announcementId) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const targetAudience = Array.from(formData.getAll('targetAudience'));

    const announcementData = {
        title: formData.get('title'),
        content: formData.get('content'),
        type: formData.get('type'),
        targetAudience: targetAudience,
        isPinned: formData.get('isPinned') === 'on'
    };

    try {
        const response = await fetch(`${API_BASE}/admin/announcements/${announcementId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(announcementData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            alert('✅ Announcement updated successfully!');
            document.querySelector('.fixed').remove();
            document.querySelector('[data-section="announcements"]').click();
        } else {
            alert('❌ Error: ' + (data.message || 'Failed to update announcement'));
        }
    } catch (error) {
        alert('❌ Error updating announcement: ' + error.message);
    }
}

// Make functions globally available
window.showCreateUserForm = showCreateUserForm;
window.createUser = createUser;
window.showEditUserForm = showEditUserForm;
window.updateUser = updateUser;
window.deleteUser = deleteUser;
window.showCreateClassForm = showCreateClassForm;
window.createClass = createClass;
window.showCreateAnnouncementForm = showCreateAnnouncementForm;
window.createAnnouncement = createAnnouncement;
window.showEditAnnouncementForm = showEditAnnouncementForm;
window.updateAnnouncement = updateAnnouncement;
window.showCreateStudentForm = showCreateStudentForm;
window.createStudent = createStudent;
window.showEditStudentForm = showEditStudentForm;
window.updateStudent = updateStudent;
window.deleteStudent = deleteStudent;
window.showCreateTeacherForm = showCreateTeacherForm;
window.createTeacher = createTeacher;
window.showEditTeacherForm = showEditTeacherForm;
window.updateTeacher = updateTeacher;
window.deleteTeacher = deleteTeacher;
window.showCreateParentForm = showCreateParentForm;
window.createParent = createParent;
window.showEditParentForm = showEditParentForm;
window.updateParent = updateParent;
window.deleteParent = deleteParent;
