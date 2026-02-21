// Teacher Utility Functions for Lotus Kindergarten
const API_BASE_URL = 'http://localhost:8000/api';

function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
}

async function checkAuth() {
    const token = getToken();
    
    if (!token) {
        redirectToLogin();
        return false;
    }

    try {
        // Verify token and role
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        if (userData.role !== 'teacher') {
            alert('Access denied. Teacher account required.');
            redirectToLogin();
            return false;
        }

        // Update teacher name in header
        if (userData.firstName) {
            const nameElement = document.getElementById('teacherName');
            if (nameElement) {
                nameElement.textContent = userData.firstName;
            }
        }

        return true;
    } catch (error) {
        console.error('Authentication failed:', error);
        redirectToLogin();
        return false;
    }
}

function redirectToLogin() {
    window.location.href = '../auth/login.html';
}

async function apiRequest(endpoint, method = 'GET', data = null) {
    const token = getToken();
    
    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    if (data && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        if (!response.ok) {
            if (response.status === 401) {
                removeToken();
                redirectToLogin();
                throw new Error('Unauthorized');
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }

        if (response.status === 204) {
            return { status: 'success', data: null };
        }

        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        removeToken();
        window.location.href = '../auth/login.html';
    }
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification-toast');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    
    const icon = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    }[type] || 'fa-info-circle';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getToken,
        setToken,
        removeToken,
        checkAuth,
        apiRequest,
        logout,
        showNotification,
        formatDate,
        formatDateTime
    };
}
