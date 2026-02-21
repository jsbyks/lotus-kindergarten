// Student Dashboard Management
// Handles all student dashboard operations including homework, grades, attendance, and announcements

// Global state
let currentStudent = null;
let currentHomework = [];
let currentGrades = [];
let currentAttendance = [];
let currentAnnouncements = [];
let currentMonth = new Date();

// Initialize dashboard
async function initializeDashboard() {
    // Check authentication
    const user = api.getUser();
    const token = api.getToken();

    if (!user || !token) {
        window.location.href = '../../pages/auth/login.html';
        return;
    }

    if (user.role !== 'student') {
        showNotification('This dashboard is only for students', 'error');
        window.location.href = '/index.html';
        return;
    }

    currentStudent = user;

    // Update welcome message
    updateWelcomeSection();

    // Load initial data
    await Promise.all([
        loadStudentInfo(),
        loadHomework(),
        loadGrades()
    ]);

    // Setup event listeners
    setupEventListeners();
}

// Update welcome section with student info
function updateWelcomeSection() {
    if (!currentStudent) return;

    const welcomeMsg = document.getElementById('welcomeMessage');
    if (welcomeMsg && currentStudent.firstName) {
        welcomeMsg.textContent = `Hello, ${currentStudent.firstName}! 👋`;
    }
}

// Load student information
async function loadStudentInfo() {
    try {
        const response = await api.student.getProgress();

        if (response.status === 'success' && response.data) {
            const { stars = 0, level = 1, className = 'My Class' } = response.data;

            document.getElementById('starsDisplay').textContent = `⭐ ${stars} Stars`;
            document.getElementById('levelDisplay').textContent = `🏆 Level ${level}`;
            document.getElementById('classDisplay').textContent = `🎒 ${className}`;
        }
    } catch (error) {
        console.error('Error loading student info:', error);
        // Set default values
        document.getElementById('starsDisplay').textContent = '⭐ 0 Stars';
        document.getElementById('levelDisplay').textContent = '🏆 Level 1';
        document.getElementById('classDisplay').textContent = '🎒 My Class';
    }
}

// Load homework
async function loadHomework() {
    try {
        const response = await api.student.getHomework();

        if (response.status === 'success' && response.data) {
            currentHomework = response.data;
            displayHomework(currentHomework);
            updateHomeworkStats();
        }
    } catch (error) {
        console.error('Error loading homework:', error);
        document.getElementById('homeworkList').innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-exclamation-circle text-4xl mb-3"></i>
                <p>Unable to load homework. Please try again later.</p>
            </div>
        `;
    }
}

// Display homework
function displayHomework(homework) {
    const container = document.getElementById('homeworkList');

    if (!homework || homework.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <div class="text-6xl mb-4">🎉</div>
                <h3 class="font-fredoka text-2xl text-gray-700 mb-2">All Done!</h3>
                <p class="text-gray-500">No homework right now. Great job!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = homework.map(hw => {
        const dueDate = new Date(hw.dueDate);
        const isOverdue = dueDate < new Date() && hw.submissionStatus === 'pending';
        const status = hw.submissionStatus || 'pending';

        const statusInfo = getStatusInfo(status, isOverdue);
        const subjectIcon = getSubjectIcon(hw.subject);

        return `
            <div class="bg-white rounded-2xl p-6 shadow-md border-l-4 ${statusInfo.borderColor} hover:shadow-lg transition">
                <div class="flex items-start gap-4">
                    <div class="w-16 h-16 ${statusInfo.bgColor} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                        ${subjectIcon}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-fredoka text-xl text-gray-800 mb-2">${hw.title}</h3>
                        <div class="flex flex-wrap gap-2 mb-3">
                            <span class="text-sm text-gray-600">
                                <i class="fas fa-book-open mr-1"></i>${hw.subject || 'General'}
                            </span>
                            <span class="text-sm text-gray-600">
                                <i class="far fa-calendar mr-1"></i>Due: ${formatDate(dueDate)}
                            </span>
                            ${hw.maxPoints ? `
                                <span class="text-sm text-gray-600">
                                    <i class="fas fa-trophy mr-1"></i>${hw.maxPoints} points
                                </span>
                            ` : ''}
                        </div>
                        ${hw.description ? `
                            <p class="text-gray-600 text-sm mb-3 line-clamp-2">${hw.description}</p>
                        ` : ''}
                        <div class="flex flex-wrap gap-3 items-center">
                            <span class="homework-badge ${statusInfo.badgeClass}">
                                <i class="${statusInfo.icon}"></i>
                                ${statusInfo.text}
                            </span>
                            ${hw.grade ? `
                                <span class="homework-badge badge-graded">
                                    <i class="fas fa-star"></i>
                                    ${hw.grade}/${hw.maxPoints}
                                </span>
                            ` : ''}
                            ${status === 'pending' ? `
                                <button
                                    onclick="openSubmissionModal('${hw._id}')"
                                    class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-bold transition text-sm"
                                    type="button"
                                >
                                    <i class="fas fa-paper-plane mr-2"></i>Submit Now
                                </button>
                            ` : ''}
                            ${status === 'submitted' || status === 'late' ? `
                                <span class="text-sm text-blue-600 font-semibold">
                                    <i class="fas fa-hourglass-half mr-1"></i>Waiting for teacher
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get status information
function getStatusInfo(status, isOverdue) {
    if (isOverdue) {
        return {
            text: 'Overdue',
            badgeClass: 'badge-late',
            icon: 'fas fa-exclamation-triangle',
            borderColor: 'border-red-400',
            bgColor: 'bg-red-100'
        };
    }

    const statusMap = {
        pending: {
            text: 'To Do',
            badgeClass: 'badge-pending',
            icon: 'far fa-clock',
            borderColor: 'border-yellow-400',
            bgColor: 'bg-yellow-100'
        },
        submitted: {
            text: 'Submitted',
            badgeClass: 'badge-submitted',
            icon: 'fas fa-check',
            borderColor: 'border-blue-400',
            bgColor: 'bg-blue-100'
        },
        late: {
            text: 'Submitted Late',
            badgeClass: 'badge-late',
            icon: 'fas fa-clock',
            borderColor: 'border-orange-400',
            bgColor: 'bg-orange-100'
        },
        graded: {
            text: 'Graded',
            badgeClass: 'badge-graded',
            icon: 'fas fa-star',
            borderColor: 'border-green-400',
            bgColor: 'bg-green-100'
        }
    };

    return statusMap[status] || statusMap.pending;
}

// Get subject icon
function getSubjectIcon(subject) {
    const iconMap = {
        'Math': '🔢',
        'Mathematics': '🔢',
        'English': '🔤',
        'Reading': '📖',
        'Writing': '✏️',
        'Science': '🔬',
        'Art': '🎨',
        'Music': '🎵',
        'Physical Education': '⚽',
        'PE': '⚽'
    };

    return iconMap[subject] || '📚';
}

// Format date
function formatDate(date) {
    const d = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (d.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (d.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow';
    } else {
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}

// Update homework stats
function updateHomeworkStats() {
    const completed = currentHomework.filter(hw => hw.submissionStatus === 'graded').length;
    const pending = currentHomework.filter(hw => hw.submissionStatus === 'pending').length;
    const total = currentHomework.length;

    document.getElementById('completedCount').textContent = completed;
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('totalCount').textContent = total;
}

// Open submission modal
function openSubmissionModal(homeworkId) {
    const homework = currentHomework.find(hw => hw._id === homeworkId);
    if (!homework) return;

    const modal = document.getElementById('submissionModal');
    const formContainer = document.getElementById('submissionForm');

    formContainer.innerHTML = `
        <div class="mb-6">
            <h4 class="font-bold text-lg text-gray-800 mb-2">${homework.title}</h4>
            <p class="text-gray-600 text-sm">${homework.description || ''}</p>
            <div class="mt-2 text-sm text-gray-500">
                <i class="far fa-calendar mr-2"></i>Due: ${formatDate(homework.dueDate)}
            </div>
        </div>

        <form id="homeworkSubmissionForm" onsubmit="submitHomework(event, '${homeworkId}')">
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">
                        <i class="fas fa-pencil-alt mr-2"></i>Your Answer
                    </label>
                    <textarea
                        id="submissionText"
                        rows="6"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Type your answer here..."
                        required
                    ></textarea>
                </div>

                <div>
                    <label class="block text-gray-700 font-semibold mb-2">
                        <i class="fas fa-link mr-2"></i>Link (Optional)
                    </label>
                    <input
                        type="url"
                        id="submissionLink"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://..."
                    />
                    <p class="text-xs text-gray-500 mt-1">Add a link to your work (Google Docs, video, etc.)</p>
                </div>

                <div>
                    <label class="block text-gray-700 font-semibold mb-2">
                        <i class="fas fa-comment mr-2"></i>Notes for Teacher (Optional)
                    </label>
                    <textarea
                        id="submissionNotes"
                        rows="3"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Any special notes or questions..."
                    ></textarea>
                </div>

                <div class="flex gap-3 pt-4">
                    <button
                        type="submit"
                        class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-bold transition"
                    >
                        <i class="fas fa-paper-plane mr-2"></i>Submit Homework
                    </button>
                    <button
                        type="button"
                        onclick="closeSubmissionModal()"
                        class="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-bold transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Close submission modal
function closeSubmissionModal(event) {
    if (event && event.target !== event.currentTarget) return;

    const modal = document.getElementById('submissionModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Submit homework
async function submitHomework(event, homeworkId) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';

    const submissionData = {
        content: document.getElementById('submissionText').value,
        link: document.getElementById('submissionLink').value || undefined,
        notes: document.getElementById('submissionNotes').value || undefined
    };

    try {
        const response = await api.student.submitHomework(homeworkId, submissionData);

        if (response.status === 'success') {
            showNotification('Homework submitted successfully!', 'success');
            closeSubmissionModal();
            await loadHomework();
        }
    } catch (error) {
        console.error('Error submitting homework:', error);
        showNotification(error.message || 'Failed to submit homework', 'error');
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Submit Homework';
    }
}

// Load grades
async function loadGrades() {
    try {
        const response = await api.student.getGrades();

        if (response.status === 'success' && response.data) {
            currentGrades = response.data.grades || response.data || [];
            displayGrades(currentGrades);
        }
    } catch (error) {
        console.error('Error loading grades:', error);
        document.getElementById('gradesList').innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-exclamation-circle text-4xl mb-3"></i>
                <p>Unable to load grades. Please try again later.</p>
            </div>
        `;
    }
}

// Display grades
function displayGrades(grades) {
    const container = document.getElementById('gradesList');

    if (!grades || grades.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <div class="text-6xl mb-4">📊</div>
                <h3 class="font-fredoka text-2xl text-gray-700 mb-2">No Grades Yet</h3>
                <p class="text-gray-500">Complete homework to see your grades here!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = grades.map(grade => {
        const percentage = grade.maxPoints ? ((grade.grade / grade.maxPoints) * 100).toFixed(0) : 0;
        const stars = getStarRating(percentage);
        const subjectIcon = getSubjectIcon(grade.subject);

        return `
            <div class="bg-gradient-to-r from-white to-purple-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl">
                        ${subjectIcon}
                    </div>
                    <div class="flex-1">
                        <h3 class="font-fredoka text-xl text-gray-800 mb-1">${grade.title || grade.homeworkTitle || 'Assignment'}</h3>
                        <p class="text-sm text-gray-600 mb-2">
                            <i class="fas fa-book mr-1"></i>${grade.subject || 'General'}
                            ${grade.submittedAt ? ` • ${new Date(grade.submittedAt).toLocaleDateString()}` : ''}
                        </p>
                        <div class="flex items-center gap-4">
                            <div class="star-rating">
                                ${stars}
                            </div>
                            <div class="text-2xl font-bold text-purple-600">
                                ${grade.grade}/${grade.maxPoints}
                            </div>
                            <div class="text-sm font-semibold px-3 py-1 rounded-full ${getGradeColor(percentage)}">
                                ${percentage}%
                            </div>
                        </div>
                        ${grade.feedback ? `
                            <div class="mt-3 bg-blue-50 rounded-lg p-3">
                                <p class="text-sm text-gray-700">
                                    <i class="fas fa-comment text-blue-500 mr-2"></i>
                                    <span class="font-semibold">Teacher's feedback:</span> ${grade.feedback}
                                </p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get star rating
function getStarRating(percentage) {
    const fullStars = Math.floor(percentage / 20);
    const halfStar = percentage % 20 >= 10 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt star"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star star" style="color: #D1D5DB;"></i>';
    }
    return stars;
}

// Get grade color
function getGradeColor(percentage) {
    if (percentage >= 90) return 'bg-green-100 text-green-700';
    if (percentage >= 80) return 'bg-blue-100 text-blue-700';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-700';
    if (percentage >= 60) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
}

// Load attendance data
async function loadAttendanceData() {
    try {
        const response = await api.request('/student/attendance');

        if (response.status === 'success' && response.data) {
            currentAttendance = response.data.attendance || response.data || [];
            displayAttendance();
            window.attendanceLoaded = true;
        }
    } catch (error) {
        console.error('Error loading attendance:', error);
        // Display sample attendance for demonstration
        displayAttendance();
        window.attendanceLoaded = true;
    }
}

// Display attendance calendar
function displayAttendance() {
    const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    document.getElementById('currentMonth').textContent = monthYear;

    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.innerHTML += '<div></div>';
    }

    // Add days of the month
    const today = new Date();
    let presentCount = 0;
    let absentCount = 0;
    let streakCount = 0;

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isFuture = currentDate > today;
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

        let status = 'future';
        let className = 'attendance-future';

        if (!isFuture && !isWeekend) {
            // Check attendance record
            const attendanceRecord = currentAttendance.find(a => {
                const recordDate = new Date(a.date);
                return recordDate.toDateString() === currentDate.toDateString();
            });

            if (attendanceRecord) {
                status = attendanceRecord.status === 'present' ? 'present' : 'absent';
            } else {
                // Random attendance for demo (80% present)
                status = Math.random() > 0.2 ? 'present' : 'absent';
            }

            className = status === 'present' ? 'attendance-present' : 'attendance-absent';

            if (status === 'present') {
                presentCount++;
                streakCount++;
            } else {
                absentCount++;
                streakCount = 0;
            }
        } else if (isWeekend) {
            className = 'attendance-future';
        }

        calendarDays.innerHTML += `
            <div class="attendance-day ${className}" title="${status}">
                ${day}
            </div>
        `;
    }

    // Update stats
    document.getElementById('presentDays').textContent = presentCount;
    document.getElementById('absentDays').textContent = absentCount;

    const totalDays = presentCount + absentCount;
    const attendanceRate = totalDays > 0 ? ((presentCount / totalDays) * 100).toFixed(0) : 0;
    document.getElementById('attendanceRate').textContent = attendanceRate + '%';
    document.getElementById('streak').textContent = streakCount;
}

// Change month
function changeMonth(direction) {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1);
    displayAttendance();
}

// Load announcements
async function loadAnnouncements() {
    try {
        const response = await api.request('/announcements/my-announcements');

        if (response.status === 'success' && response.data) {
            currentAnnouncements = response.data.announcements || response.data || [];
            displayAnnouncements(currentAnnouncements);
            window.announcementsLoaded = true;
        }
    } catch (error) {
        console.error('Error loading announcements:', error);
        document.getElementById('announcementsList').innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-exclamation-circle text-4xl mb-3"></i>
                <p>Unable to load announcements. Please try again later.</p>
            </div>
        `;
    }
}

// Display announcements
function displayAnnouncements(announcements) {
    const container = document.getElementById('announcementsList');

    if (!announcements || announcements.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <div class="text-6xl mb-4">📢</div>
                <h3 class="font-fredoka text-2xl text-gray-700 mb-2">No Announcements</h3>
                <p class="text-gray-500">Check back later for school news!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = announcements.map(announcement => {
        const isPinned = announcement.isPinned;
        const date = new Date(announcement.createdAt || announcement.date);
        const typeInfo = getAnnouncementTypeInfo(announcement.type);

        return `
            <div class="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition ${isPinned ? 'border-2 border-yellow-400' : ''}">
                ${isPinned ? `
                    <div class="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold mb-3">
                        <i class="fas fa-thumbtack mr-1"></i>Pinned
                    </div>
                ` : ''}
                <div class="flex items-start gap-4">
                    <div class="w-14 h-14 ${typeInfo.bgColor} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                        ${typeInfo.icon}
                    </div>
                    <div class="flex-1">
                        <h3 class="font-fredoka text-xl text-gray-800 mb-2">${announcement.title}</h3>
                        <p class="text-gray-600 mb-3">${announcement.message || announcement.content}</p>
                        <div class="flex flex-wrap gap-3 items-center text-sm text-gray-500">
                            <span>
                                <i class="far fa-calendar mr-1"></i>${date.toLocaleDateString()}
                            </span>
                            <span class="px-3 py-1 rounded-full ${typeInfo.badgeClass}">
                                ${typeInfo.label}
                            </span>
                            ${announcement.author ? `
                                <span>
                                    <i class="fas fa-user mr-1"></i>${announcement.author}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get announcement type information
function getAnnouncementTypeInfo(type) {
    const typeMap = {
        general: {
            icon: '📢',
            label: 'General',
            bgColor: 'bg-blue-100',
            badgeClass: 'bg-blue-100 text-blue-700'
        },
        event: {
            icon: '🎉',
            label: 'Event',
            bgColor: 'bg-purple-100',
            badgeClass: 'bg-purple-100 text-purple-700'
        },
        holiday: {
            icon: '🏖️',
            label: 'Holiday',
            bgColor: 'bg-green-100',
            badgeClass: 'bg-green-100 text-green-700'
        },
        important: {
            icon: '⚠️',
            label: 'Important',
            bgColor: 'bg-red-100',
            badgeClass: 'bg-red-100 text-red-700'
        },
        achievement: {
            icon: '🏆',
            label: 'Achievement',
            bgColor: 'bg-yellow-100',
            badgeClass: 'bg-yellow-100 text-yellow-700'
        }
    };

    return typeMap[type] || typeMap.general;
}

// Setup event listeners
function setupEventListeners() {
    // Homework filter
    const homeworkFilter = document.getElementById('homeworkFilter');
    if (homeworkFilter) {
        homeworkFilter.addEventListener('change', (e) => {
            const filter = e.target.value;
            let filteredHomework = currentHomework;

            if (filter !== 'all') {
                filteredHomework = currentHomework.filter(hw => {
                    if (filter === 'graded') {
                        return hw.submissionStatus === 'graded';
                    }
                    return hw.submissionStatus === filter;
                });
            }

            displayHomework(filteredHomework);
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSubmissionModal();
        }
    });
}

// Make functions globally available
window.initializeDashboard = initializeDashboard;
window.switchTab = switchTab;
window.openSubmissionModal = openSubmissionModal;
window.closeSubmissionModal = closeSubmissionModal;
window.submitHomework = submitHomework;
window.changeMonth = changeMonth;
window.loadAttendanceData = loadAttendanceData;
window.loadAnnouncements = loadAnnouncements;
