// API Configuration
// In production the server serves the frontend too, so use a relative path.
// Locally we need the full URL because index.html is opened directly.
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8000/api'
    : '/api';

// API Helper Functions
const api = {
    // Get auth token from localStorage
    getToken() {
        return localStorage.getItem('token');
    },

    // Set auth token
    setToken(token) {
        localStorage.setItem('token', token);
    },

    // Remove auth token
    removeToken() {
        localStorage.removeItem('token');
    },

    // Get user data
    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Set user data
    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Remove user data
    removeUser() {
        localStorage.removeItem('user');
    },

    // Make API request
    async request(endpoint, options = {}) {
        const token = this.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Auth APIs
    auth: {
        async signup(userData) {
            const data = await api.request('/auth/signup', {
                method: 'POST',
                body: JSON.stringify(userData)
            });

            if (data.token) {
                api.setToken(data.token);
                api.setUser(data.data.user);
            }

            return data;
        },

        async login(email, password) {
            const data = await api.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (data.token) {
                api.setToken(data.token);
                api.setUser(data.data.user);
            }

            return data;
        },

        logout() {
            api.removeToken();
            api.removeUser();
            window.location.href = '/index.html';
        }
    },

    // Student APIs
    student: {
        async getHomework() {
            return await api.request('/student/homework');
        },

        async submitHomework(homeworkId, submission) {
            return await api.request(`/student/homework/${homeworkId}/submit`, {
                method: 'POST',
                body: JSON.stringify(submission)
            });
        },

        async getGrades() {
            return await api.request('/student/grades');
        },

        async getProgress() {
            return await api.request('/student/progress');
        },

        async getAchievements() {
            return await api.request('/student/achievements');
        },

        async getAttendance() {
            return await api.request('/student/attendance');
        }
    },

    // Parent APIs
    parent: {
        async getChildren() {
            return await api.request('/parent/children');
        },

        async getChildHomework(studentId) {
            return await api.request(`/parent/children/${studentId}/homework`);
        },

        async getChildGrades(studentId) {
            return await api.request(`/parent/children/${studentId}/grades`);
        },

        async getChildProgress(studentId) {
            return await api.request(`/parent/children/${studentId}/progress`);
        }
    },

    // Teacher APIs
    teacher: {
        async getClasses() {
            return await api.request('/teacher/classes');
        },

        async getClassStudents(classId) {
            return await api.request(`/teacher/classes/${classId}/students`);
        },

        async createHomework(homeworkData) {
            return await api.request('/teacher/homework', {
                method: 'POST',
                body: JSON.stringify(homeworkData)
            });
        },

        async getHomework() {
            return await api.request('/teacher/homework');
        },

        async gradeSubmission(submissionId, gradeData) {
            return await api.request(`/teacher/submissions/${submissionId}/grade`, {
                method: 'PATCH',
                body: JSON.stringify(gradeData)
            });
        }
    },

    // Admin APIs
    admin: {
        async getAllUsers() {
            return await api.request('/admin/users');
        },

        async createUser(userData) {
            return await api.request('/admin/users', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
        },

        async updateUser(userId, userData) {
            return await api.request(`/admin/users/${userId}`, {
                method: 'PATCH',
                body: JSON.stringify(userData)
            });
        },

        async deleteUser(userId) {
            return await api.request(`/admin/users/${userId}`, {
                method: 'DELETE'
            });
        },

        async getAllStudents() {
            return await api.request('/admin/students');
        },

        async createStudent(studentData) {
            return await api.request('/admin/students', {
                method: 'POST',
                body: JSON.stringify(studentData)
            });
        }
    },

    // Game APIs
    games: {
        async getAll() {
            return await api.request('/games');
        },

        async getByGrade(grade) {
            return await api.request(`/games/grade/${grade}`);
        },

        async getById(gameId) {
            return await api.request(`/games/${gameId}`);
        },

        async recordSession(gameId, sessionData) {
            return await api.request(`/games/${gameId}/play`, {
                method: 'POST',
                body: JSON.stringify(sessionData)
            });
        },

        async getProgress(studentId) {
            return await api.request(`/games/progress/${studentId}`);
        },

        async getLeaderboard(gameId) {
            return await api.request(`/games/${gameId}/leaderboard`);
        }
    },

    // Homework APIs
    homework: {
        async getAll() {
            return await api.request('/homework');
        },

        async getById(homeworkId) {
            return await api.request(`/homework/${homeworkId}`);
        },

        async submit(homeworkId, submissionData) {
            return await api.request(`/homework/${homeworkId}/submit`, {
                method: 'POST',
                body: JSON.stringify(submissionData)
            });
        }
    }
};

// Check if user is authenticated
function isAuthenticated() {
    return !!api.getToken();
}

// Redirect to login if not authenticated
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/auth/login.html';
        return false;
    }
    return true;
}

// Get current user role
function getUserRole() {
    const user = api.getUser();
    return user ? user.role : null;
}

// Show notification
function showNotification(message, type = 'info') {
    // Simple notification implementation
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#00C851' : '#33b5e5'};
        color: white;
        border-radius: 4px;
        z-index: 10000;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
