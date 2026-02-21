// Parent Dashboard Management
// Global state
let currentChildren = [];
let currentSection = 'overview';
let selectedChildId = null;
let currentHomeworkData = [];
let currentSubmissions = [];

// Authentication check
(function checkParentAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
        alert('Please login as a parent to access this page.');
        window.location.href = '../../pages/auth/login.html';
        return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'parent') {
        alert('Access denied. This page is only accessible to parents.');
        window.location.href = '../index.html';
        return;
    }

    // Set parent name and initials
    const parentName = document.getElementById('parentName');
    const sidebarParentName = document.getElementById('sidebarParentName');
    const parentInitials = document.getElementById('parentInitials');

    if (parentName && sidebarParentName && parentInitials) {
        const fullName = `${userData.firstName} ${userData.lastName}`;
        parentName.textContent = fullName;
        sidebarParentName.textContent = fullName;
        const initials = `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
        parentInitials.textContent = initials.toUpperCase();
    }

    // Load dashboard data
    initializeDashboard();
})();

// Initialize dashboard
async function initializeDashboard() {
    try {
        // Load children data
        await loadChildren();

        // Load overview section
        await loadSection('overview');

        // Setup event listeners
        setupEventListeners();
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showError('Failed to load dashboard data');
    }
}

// Load children
async function loadChildren() {
    try {
        const response = await fetch('http://localhost:8000/api/parent/dashboard/stats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load children data');
        }

        const data = await response.json();

        if (data.status === 'success' && data.data && data.data.stats) {
            currentChildren = data.data.stats.children || [];

            // Populate child selector if multiple children
            if (currentChildren.length > 1) {
                populateChildSelector();
            }
        }
    } catch (error) {
        console.error('Error loading children:', error);
        throw error;
    }
}

// Populate child selector
function populateChildSelector() {
    const container = document.getElementById('childSelectorContainer');
    const selector = document.getElementById('childSelector');

    if (!container || !selector) return;

    // Show selector
    container.style.display = 'block';

    // Clear and populate
    selector.innerHTML = '<option value="">All Children</option>';

    currentChildren.forEach(child => {
        const option = document.createElement('option');
        option.value = child._id;
        option.textContent = `${child.firstName} ${child.lastName}`;
        selector.appendChild(option);
    });

    // Add change listener
    selector.addEventListener('change', (e) => {
        selectedChildId = e.target.value || null;
        loadSection(currentSection);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');

            // Update active state
            navLinks.forEach(l => {
                l.classList.remove('bg-purple-100', 'text-purple-700', 'font-bold');
                l.classList.add('text-gray-600');
            });
            link.classList.add('bg-purple-100', 'text-purple-700', 'font-bold');
            link.classList.remove('text-gray-600');

            // Load section
            await loadSection(section);
        });
    });

    // Homework submission form
    const submissionForm = document.getElementById('homeworkSubmissionForm');
    if (submissionForm) {
        submissionForm.addEventListener('submit', handleHomeworkSubmission);
    }

    // File input
    const fileInput = document.getElementById('submissionFiles');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelection);
    }
}

// Load section
async function loadSection(section) {
    currentSection = section;
    const mainContent = document.getElementById('mainContent');

    // Show loading
    mainContent.innerHTML = `
        <div class="text-center py-20">
            <i class="fas fa-spinner fa-spin text-5xl text-purple-500 mb-4"></i>
            <p class="text-gray-600 text-lg">Loading ${section}...</p>
        </div>
    `;

    try {
        switch(section) {
            case 'overview':
                await loadOverview();
                break;
            case 'homework':
                await loadHomework();
                break;
            case 'attendance':
                await loadAttendance();
                break;
            case 'grades':
                await loadGrades();
                break;
            case 'announcements':
                await loadAnnouncements();
                break;
            default:
                await loadOverview();
        }
    } catch (error) {
        console.error(`Error loading ${section}:`, error);
        mainContent.innerHTML = `
            <div class="bg-white rounded-2xl p-8 shadow-lg text-center">
                <i class="fas fa-exclamation-triangle text-5xl text-red-500 mb-4"></i>
                <h3 class="text-xl font-bold text-gray-800 mb-2">Error Loading Content</h3>
                <p class="text-gray-600">${error.message || 'Failed to load data'}</p>
            </div>
        `;
    }
}

// Load Overview Section
async function loadOverview() {
    const mainContent = document.getElementById('mainContent');

    const gradients = [
        'from-pink-400 to-purple-500',
        'from-blue-400 to-indigo-500',
        'from-green-400 to-teal-500',
        'from-yellow-400 to-orange-500'
    ];

    const childrenToShow = selectedChildId
        ? currentChildren.filter(c => c._id === selectedChildId)
        : currentChildren;

    if (childrenToShow.length === 0) {
        mainContent.innerHTML = `
            <div class="bg-white rounded-2xl p-8 shadow-lg text-center">
                <i class="fas fa-child text-5xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-bold text-gray-800 mb-2">No Children Found</h3>
                <p class="text-gray-600">No children are registered under your account.</p>
            </div>
        `;
        return;
    }

    mainContent.innerHTML = `
        <!-- Children Cards -->
        <div>
            <h3 class="font-fredoka text-xl text-gray-800 mb-4">My Children</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${childrenToShow.map((child, index) => {
                    const gradient = gradients[index % gradients.length];
                    const age = child.dateOfBirth ? calculateAge(child.dateOfBirth) : 'N/A';

                    return `
                        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                            <div class="bg-gradient-to-r ${gradient} p-6 text-white">
                                <h3 class="font-fredoka text-2xl">${child.firstName} ${child.lastName}</h3>
                                <p class="opacity-90">${child.className} • ${child.grade.toUpperCase()}</p>
                            </div>
                            <div class="p-6">
                                <div class="grid grid-cols-3 gap-4 mb-6">
                                    <div class="text-center">
                                        <p class="text-2xl font-bold text-blue-500">${age}</p>
                                        <p class="text-xs text-gray-500">Years Old</p>
                                    </div>
                                    <div class="text-center">
                                        <p class="text-2xl font-bold text-green-500">${child.completedHomework || 0}</p>
                                        <p class="text-xs text-gray-500">Completed</p>
                                    </div>
                                    <div class="text-center">
                                        <p class="text-2xl font-bold text-yellow-500">${child.pendingHomework || 0}</p>
                                        <p class="text-xs text-gray-500">Pending</p>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                    <button onclick="viewChildHomework('${child._id}')" class="bg-purple-50 text-purple-700 py-3 rounded-xl font-bold hover:bg-purple-100 transition">
                                        <i class="fas fa-book mr-1"></i> Homework
                                    </button>
                                    <button onclick="viewChildAttendance('${child._id}')" class="bg-blue-50 text-blue-700 py-3 rounded-xl font-bold hover:bg-blue-100 transition">
                                        <i class="fas fa-calendar mr-1"></i> Attendance
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <!-- Quick Stats -->
        <div class="bg-white rounded-2xl p-8 shadow-lg">
            <h3 class="font-fredoka text-xl text-gray-800 mb-6">Quick Summary</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                            <i class="fas fa-check text-xl"></i>
                        </div>
                        <div>
                            <p class="text-3xl font-bold text-green-600">${childrenToShow.reduce((sum, c) => sum + (c.completedHomework || 0), 0)}</p>
                            <p class="text-sm text-gray-700 font-medium">Completed Homework</p>
                        </div>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-white">
                            <i class="fas fa-clock text-xl"></i>
                        </div>
                        <div>
                            <p class="text-3xl font-bold text-yellow-600">${childrenToShow.reduce((sum, c) => sum + (c.pendingHomework || 0), 0)}</p>
                            <p class="text-sm text-gray-700 font-medium">Pending Homework</p>
                        </div>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white">
                            <i class="fas fa-child text-xl"></i>
                        </div>
                        <div>
                            <p class="text-3xl font-bold text-purple-600">${childrenToShow.length}</p>
                            <p class="text-sm text-gray-700 font-medium">${childrenToShow.length === 1 ? 'Child' : 'Children'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load Homework Section
async function loadHomework() {
    const mainContent = document.getElementById('mainContent');

    try {
        const childrenToLoad = selectedChildId
            ? currentChildren.filter(c => c._id === selectedChildId)
            : currentChildren;

        if (childrenToLoad.length === 0) {
            mainContent.innerHTML = `
                <div class="bg-white rounded-2xl p-8 shadow-lg text-center">
                    <i class="fas fa-child text-5xl text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">No Children Selected</h3>
                    <p class="text-gray-600">Please select a child to view homework.</p>
                </div>
            `;
            return;
        }

        // Load homework for each child
        const homeworkPromises = childrenToLoad.map(async child => {
            const response = await fetch(`http://localhost:8000/api/parent/children/${child._id}/homework`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Failed to load homework');

            const data = await response.json();
            return {
                child,
                homework: data.data.homework || []
            };
        });

        const results = await Promise.all(homeworkPromises);

        // Get submissions for all children
        const submissionPromises = childrenToLoad.map(async child => {
            try {
                const response = await fetch(`http://localhost:8000/api/homework?studentId=${child._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                return { childId: child._id, submissions: data.data?.homework || [] };
            } catch {
                return { childId: child._id, submissions: [] };
            }
        });

        const submissionResults = await Promise.all(submissionPromises);
        currentSubmissions = submissionResults;

        mainContent.innerHTML = `
            <div class="bg-white rounded-2xl p-8 shadow-lg">
                <h2 class="font-fredoka text-2xl text-gray-800 mb-6">
                    <i class="fas fa-book text-purple-500 mr-2"></i>
                    Homework Assignments
                </h2>
                ${results.map(({ child, homework }) => `
                    <div class="mb-8 last:mb-0">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                                ${child.firstName.charAt(0)}${child.lastName.charAt(0)}
                            </div>
                            <h3 class="font-bold text-lg">${child.firstName} ${child.lastName}</h3>
                            <span class="text-sm text-gray-500">• ${child.className}</span>
                        </div>

                        ${homework.length === 0 ? `
                            <div class="bg-gray-50 rounded-xl p-6 text-center">
                                <i class="fas fa-inbox text-3xl text-gray-300 mb-2"></i>
                                <p class="text-gray-500">No homework assigned</p>
                            </div>
                        ` : `
                            <div class="space-y-4">
                                ${homework.map(hw => renderHomeworkCard(hw, child)).join('')}
                            </div>
                        `}
                    </div>
                `).join('<hr class="my-8 border-gray-200">')}
            </div>
        `;
    } catch (error) {
        console.error('Error loading homework:', error);
        throw error;
    }
}

// Render homework card
function renderHomeworkCard(homework, child) {
    const dueDate = new Date(homework.dueDate);
    const now = new Date();
    const isOverdue = dueDate < now;
    const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

    // Check if already submitted
    const isSubmitted = homework.submissions && homework.submissions.length > 0;

    return `
        <div class="border-2 ${isOverdue && !isSubmitted ? 'border-red-200 bg-red-50' : 'border-purple-200 bg-white'} rounded-xl p-6 hover:shadow-lg transition">
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <h4 class="font-bold text-lg text-gray-800 mb-1">${homework.title}</h4>
                    <p class="text-sm text-gray-600">${homework.description || 'No description'}</p>
                </div>
                ${isSubmitted ? `
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                        <i class="fas fa-check-circle"></i> Submitted
                    </span>
                ` : isOverdue ? `
                    <span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1">
                        <i class="fas fa-exclamation-circle"></i> Overdue
                    </span>
                ` : `
                    <span class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1">
                        <i class="fas fa-clock"></i> Pending
                    </span>
                `}
            </div>

            <div class="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <span><i class="fas fa-calendar text-purple-500 mr-1"></i> Due: ${dueDate.toLocaleDateString()}</span>
                <span><i class="fas fa-clock text-purple-500 mr-1"></i> ${isOverdue ? 'Overdue' : `${daysUntilDue} days left`}</span>
                ${homework.points ? `<span><i class="fas fa-star text-purple-500 mr-1"></i> ${homework.points} points</span>` : ''}
            </div>

            ${homework.attachments && homework.attachments.length > 0 ? `
                <div class="mb-4">
                    <p class="text-xs font-bold text-gray-600 mb-2">Attachments:</p>
                    <div class="flex flex-wrap gap-2">
                        ${homework.attachments.map(att => `
                            <a href="${att.url}" target="_blank" class="text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition">
                                <i class="fas fa-paperclip mr-1"></i> ${att.filename}
                            </a>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div class="flex gap-2">
                ${isSubmitted ? `
                    <button onclick="viewSubmission('${homework._id}', '${child._id}')" class="flex-1 bg-blue-500 text-white py-2 rounded-xl font-bold hover:bg-blue-600 transition">
                        <i class="fas fa-eye mr-1"></i> View Submission
                    </button>
                ` : `
                    <button onclick="openHomeworkModal('${homework._id}', '${child._id}', '${homework.title}', '${homework.description || ''}')" class="flex-1 bg-purple-500 text-white py-2 rounded-xl font-bold hover:bg-purple-600 transition">
                        <i class="fas fa-upload mr-1"></i> Submit Homework
                    </button>
                `}
            </div>
        </div>
    `;
}

// Load Attendance Section
async function loadAttendance() {
    const mainContent = document.getElementById('mainContent');

    try {
        const childrenToLoad = selectedChildId
            ? currentChildren.filter(c => c._id === selectedChildId)
            : currentChildren;

        if (childrenToLoad.length === 0) {
            mainContent.innerHTML = `
                <div class="bg-white rounded-2xl p-8 shadow-lg text-center">
                    <i class="fas fa-child text-5xl text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">No Children Selected</h3>
                    <p class="text-gray-600">Please select a child to view attendance.</p>
                </div>
            `;
            return;
        }

        // Load attendance for each child
        const attendancePromises = childrenToLoad.map(async child => {
            const response = await fetch(`http://localhost:8000/api/parent/children/${child._id}/attendance`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Failed to load attendance');

            const data = await response.json();
            return {
                child,
                attendance: data.data.records || [],
                stats: data.data.stats || {}
            };
        });

        const results = await Promise.all(attendancePromises);

        mainContent.innerHTML = `
            <div class="bg-white rounded-2xl p-8 shadow-lg">
                <h2 class="font-fredoka text-2xl text-gray-800 mb-6">
                    <i class="fas fa-calendar-check text-purple-500 mr-2"></i>
                    Attendance Records
                </h2>
                ${results.map(({ child, attendance, stats }) => `
                    <div class="mb-8 last:mb-0">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                                ${child.firstName.charAt(0)}${child.lastName.charAt(0)}
                            </div>
                            <h3 class="font-bold text-lg">${child.firstName} ${child.lastName}</h3>
                        </div>

                        <!-- Stats Cards -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div class="bg-green-50 p-4 rounded-xl border border-green-200">
                                <p class="text-2xl font-bold text-green-600">${stats.present || 0}</p>
                                <p class="text-xs text-gray-600">Present</p>
                            </div>
                            <div class="bg-red-50 p-4 rounded-xl border border-red-200">
                                <p class="text-2xl font-bold text-red-600">${stats.absent || 0}</p>
                                <p class="text-xs text-gray-600">Absent</p>
                            </div>
                            <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                                <p class="text-2xl font-bold text-yellow-600">${stats.late || 0}</p>
                                <p class="text-xs text-gray-600">Late</p>
                            </div>
                            <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                <p class="text-2xl font-bold text-blue-600">${stats.attendanceRate || 0}%</p>
                                <p class="text-xs text-gray-600">Rate</p>
                            </div>
                        </div>

                        <!-- Attendance Records -->
                        ${attendance.length === 0 ? `
                            <div class="bg-gray-50 rounded-xl p-6 text-center">
                                <i class="fas fa-calendar-times text-3xl text-gray-300 mb-2"></i>
                                <p class="text-gray-500">No attendance records found</p>
                            </div>
                        ` : `
                            <div class="overflow-x-auto">
                                <table class="min-w-full">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Date</th>
                                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Check In</th>
                                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Check Out</th>
                                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        ${attendance.slice(0, 10).map(record => `
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm">${new Date(record.date).toLocaleDateString()}</td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <span class="px-3 py-1 text-xs rounded-full ${getStatusColor(record.status)}">
                                                        ${record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm">${record.checkInTime || '-'}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm">${record.checkOutTime || '-'}</td>
                                                <td class="px-6 py-4 text-sm">${record.notes || '-'}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                `).join('<hr class="my-8 border-gray-200">')}
            </div>
        `;
    } catch (error) {
        console.error('Error loading attendance:', error);
        throw error;
    }
}

// Load Grades Section
async function loadGrades() {
    const mainContent = document.getElementById('mainContent');

    try {
        const childrenToLoad = selectedChildId
            ? currentChildren.filter(c => c._id === selectedChildId)
            : currentChildren;

        if (childrenToLoad.length === 0) {
            mainContent.innerHTML = `
                <div class="bg-white rounded-2xl p-8 shadow-lg text-center">
                    <i class="fas fa-child text-5xl text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">No Children Selected</h3>
                    <p class="text-gray-600">Please select a child to view grades.</p>
                </div>
            `;
            return;
        }

        // For now, show a placeholder as grades endpoint may need to be implemented
        mainContent.innerHTML = `
            <div class="bg-white rounded-2xl p-8 shadow-lg">
                <h2 class="font-fredoka text-2xl text-gray-800 mb-6">
                    <i class="fas fa-star text-purple-500 mr-2"></i>
                    Grades & Progress
                </h2>
                ${childrenToLoad.map(child => `
                    <div class="mb-8 last:mb-0">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                                ${child.firstName.charAt(0)}${child.lastName.charAt(0)}
                            </div>
                            <h3 class="font-bold text-lg">${child.firstName} ${child.lastName}</h3>
                            <span class="text-sm text-gray-500">• ${child.className}</span>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                                        <i class="fas fa-check-circle"></i>
                                    </div>
                                    <div>
                                        <p class="text-2xl font-bold text-green-700">${child.completedHomework || 0}</p>
                                        <p class="text-sm text-gray-700">Completed</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-white">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div>
                                        <p class="text-2xl font-bold text-yellow-700">${child.pendingHomework || 0}</p>
                                        <p class="text-sm text-gray-700">Pending</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div>
                                        <p class="text-2xl font-bold text-purple-700">${child.totalHomework || 0}</p>
                                        <p class="text-sm text-gray-700">Total Tasks</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-blue-50 rounded-xl p-6 border border-blue-200">
                            <div class="flex items-start gap-3">
                                <i class="fas fa-info-circle text-blue-500 text-xl mt-1"></i>
                                <div>
                                    <p class="font-bold text-blue-900 mb-1">Progress Tracking</p>
                                    <p class="text-sm text-blue-800">Detailed grade reports and progress tracking will be available soon. Teachers are currently evaluating submissions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('<hr class="my-8 border-gray-200">')}
            </div>
        `;
    } catch (error) {
        console.error('Error loading grades:', error);
        throw error;
    }
}

// Load Announcements Section
async function loadAnnouncements() {
    const mainContent = document.getElementById('mainContent');

    try {
        const response = await fetch('http://localhost:8000/api/announcements/my-announcements', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) throw new Error('Failed to load announcements');

        const data = await response.json();
        const announcements = data.data.announcements || [];

        mainContent.innerHTML = `
            <div class="bg-white rounded-2xl p-8 shadow-lg">
                <h2 class="font-fredoka text-2xl text-gray-800 mb-6">
                    <i class="fas fa-bullhorn text-purple-500 mr-2"></i>
                    Announcements
                </h2>

                ${announcements.length === 0 ? `
                    <div class="text-center py-12">
                        <i class="fas fa-inbox text-5xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">No announcements available</p>
                    </div>
                ` : `
                    <div class="space-y-4">
                        ${announcements.map(announcement => `
                            <div class="border-l-4 ${announcement.isPinned ? 'border-yellow-500 bg-yellow-50' : 'border-purple-500 bg-white'} p-6 rounded-r-xl shadow hover:shadow-lg transition">
                                <div class="flex items-start justify-between mb-3">
                                    <div class="flex items-center gap-2">
                                        <h3 class="font-bold text-lg text-gray-800">${announcement.title}</h3>
                                        ${announcement.isPinned ? '<i class="fas fa-thumbtack text-yellow-600"></i>' : ''}
                                    </div>
                                    <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                                        ${announcement.type}
                                    </span>
                                </div>
                                <p class="text-gray-700 mb-4 whitespace-pre-line">${announcement.content}</p>
                                <div class="flex items-center gap-4 text-sm text-gray-500">
                                    <span><i class="fas fa-calendar mr-1"></i> ${new Date(announcement.publishedAt).toLocaleDateString()}</span>
                                    <span><i class="fas fa-user mr-1"></i> ${announcement.createdBy?.firstName || 'Admin'} ${announcement.createdBy?.lastName || ''}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;
    } catch (error) {
        console.error('Error loading announcements:', error);
        throw error;
    }
}

// Modal Functions
function openHomeworkModal(homeworkId, studentId, title, description) {
    document.getElementById('submitHomeworkId').value = homeworkId;
    document.getElementById('submitStudentId').value = studentId;
    document.getElementById('modalHomeworkTitle').textContent = title;
    document.getElementById('modalHomeworkDescription').textContent = description || 'No description provided';
    document.getElementById('submissionText').value = '';
    document.getElementById('fileList').innerHTML = '';
    document.getElementById('homeworkSubmissionModal').classList.remove('hidden');
}

function closeHomeworkModal() {
    document.getElementById('homeworkSubmissionModal').classList.add('hidden');
}

function closeViewSubmissionModal() {
    document.getElementById('viewSubmissionModal').classList.add('hidden');
}

// Handle file selection
function handleFileSelection(e) {
    const files = e.target.files;
    const fileList = document.getElementById('fileList');

    if (files.length === 0) {
        fileList.innerHTML = '';
        return;
    }

    fileList.innerHTML = `
        <p class="text-xs font-bold text-gray-600 mb-2">Selected Files:</p>
        ${Array.from(files).map(file => `
            <div class="text-sm text-gray-700 flex items-center gap-2 mb-1">
                <i class="fas fa-file text-purple-500"></i>
                <span>${file.name} (${(file.size / 1024).toFixed(2)} KB)</span>
            </div>
        `).join('')}
    `;
}

// Handle homework submission
async function handleHomeworkSubmission(e) {
    e.preventDefault();

    const homeworkId = document.getElementById('submitHomeworkId').value;
    const studentId = document.getElementById('submitStudentId').value;
    const textResponse = document.getElementById('submissionText').value.trim();
    const files = document.getElementById('submissionFiles').files;

    if (!textResponse && files.length === 0) {
        showNotification('Please provide either a text response or upload files', 'error');
        return;
    }

    try {
        // For now, we'll submit without file upload (would need to implement file upload to server)
        const submissionData = {
            studentId: studentId,
            submittedBy: 'parent',
            textResponse: textResponse,
            attachments: [] // File upload would be implemented here
        };

        const response = await fetch(`http://localhost:8000/api/homework/${homeworkId}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(submissionData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to submit homework');
        }

        const data = await response.json();

        showNotification('Homework submitted successfully!', 'success');
        closeHomeworkModal();

        // Reload homework section
        await loadHomework();
    } catch (error) {
        console.error('Error submitting homework:', error);
        showNotification(error.message || 'Failed to submit homework', 'error');
    }
}

// View submission
async function viewSubmission(homeworkId, studentId) {
    try {
        // Fetch submission details
        const response = await fetch(`http://localhost:8000/api/homework/${homeworkId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) throw new Error('Failed to load submission');

        const data = await response.json();
        const homework = data.data.homework;

        // Find the specific student's submission
        const submission = homework.submissions?.find(s => s.studentId === studentId);

        if (!submission) {
            showNotification('Submission not found', 'error');
            return;
        }

        const detailsContainer = document.getElementById('submissionDetails');
        detailsContainer.innerHTML = `
            <div class="space-y-6">
                <div>
                    <h3 class="font-bold text-lg mb-2">${homework.title}</h3>
                    <p class="text-sm text-gray-600">${homework.description || 'No description'}</p>
                </div>

                <div class="bg-gray-50 rounded-xl p-4">
                    <p class="text-xs font-bold text-gray-600 mb-2">Submission Status</p>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                        ${submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </span>
                </div>

                <div>
                    <p class="text-xs font-bold text-gray-600 mb-2">Text Response</p>
                    <div class="bg-white border-2 border-gray-200 rounded-xl p-4">
                        <p class="text-gray-800">${submission.textResponse || 'No text response provided'}</p>
                    </div>
                </div>

                <div>
                    <p class="text-xs font-bold text-gray-600 mb-2">Submitted</p>
                    <p class="text-sm text-gray-700">${new Date(submission.submittedAt).toLocaleString()}</p>
                </div>

                ${submission.grade ? `
                    <div class="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                        <p class="text-xs font-bold text-green-800 mb-3">Grade</p>
                        <div class="flex items-center gap-6 mb-3">
                            <div>
                                <p class="text-3xl font-bold text-green-600">${submission.grade.points || 0}/${submission.grade.maxPoints || 0}</p>
                                <p class="text-xs text-gray-600">Points</p>
                            </div>
                            ${submission.grade.stars ? `
                                <div>
                                    <p class="text-3xl font-bold text-yellow-500">${'⭐'.repeat(submission.grade.stars)}</p>
                                    <p class="text-xs text-gray-600">Stars</p>
                                </div>
                            ` : ''}
                        </div>
                        ${submission.grade.feedback ? `
                            <div class="bg-white rounded-lg p-3">
                                <p class="text-xs font-bold text-gray-600 mb-1">Teacher Feedback</p>
                                <p class="text-sm text-gray-700">${submission.grade.feedback}</p>
                            </div>
                        ` : ''}
                    </div>
                ` : `
                    <div class="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
                        <i class="fas fa-clock text-2xl text-yellow-600 mb-2"></i>
                        <p class="text-sm text-yellow-800 font-medium">Waiting for teacher to grade</p>
                    </div>
                `}
            </div>
        `;

        document.getElementById('viewSubmissionModal').classList.remove('hidden');
    } catch (error) {
        console.error('Error viewing submission:', error);
        showNotification('Failed to load submission details', 'error');
    }
}

// Helper function for view child homework
function viewChildHomework(childId) {
    selectedChildId = childId;
    document.getElementById('childSelector').value = childId;

    // Update active nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => {
        l.classList.remove('bg-purple-100', 'text-purple-700', 'font-bold');
        l.classList.add('text-gray-600');
    });
    document.querySelector('[data-section="homework"]').classList.add('bg-purple-100', 'text-purple-700', 'font-bold');
    document.querySelector('[data-section="homework"]').classList.remove('text-gray-600');

    loadSection('homework');
}

// Helper function for view child attendance
function viewChildAttendance(childId) {
    selectedChildId = childId;
    document.getElementById('childSelector').value = childId;

    // Update active nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => {
        l.classList.remove('bg-purple-100', 'text-purple-700', 'font-bold');
        l.classList.add('text-gray-600');
    });
    document.querySelector('[data-section="attendance"]').classList.add('bg-purple-100', 'text-purple-700', 'font-bold');
    document.querySelector('[data-section="attendance"]').classList.remove('text-gray-600');

    loadSection('attendance');
}

// Utility Functions
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function getStatusColor(status) {
    const colors = {
        present: 'bg-green-100 text-green-800',
        absent: 'bg-red-100 text-red-800',
        late: 'bg-yellow-100 text-yellow-800',
        excused: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-xl shadow-lg z-50 transform transition-all duration-300 ${
        type === 'error' ? 'bg-red-500' :
        type === 'success' ? 'bg-green-500' :
        'bg-blue-500'
    } text-white font-medium`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showError(message) {
    showNotification(message, 'error');
}
