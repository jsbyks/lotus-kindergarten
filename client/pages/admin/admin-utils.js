// Admin Utility Functions for Lotus Kindergarten
// API Base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Get JWT token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Set JWT token in localStorage
function setToken(token) {
    localStorage.setItem('token', token);
}

// Remove JWT token
function removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
}

// Check if user is authenticated and has admin role
async function checkAuth() {
    const token = getToken();
    
    if (!token) {
        redirectToLogin();
        return false;
    }

    // Verify token is still valid by making a test request
    try {
        const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Unauthorized');
        }

        // Load user data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (userData.firstName) {
            const nameElement = document.getElementById('adminName');
            if (nameElement) {
                nameElement.textContent = `${userData.firstName} ${userData.lastName}`;
            }
        }

        return true;
    } catch (error) {
        console.error('Authentication failed:', error);
        redirectToLogin();
        return false;
    }
}

// Redirect to login page
function redirectToLogin() {
    window.location.href = '../auth/login.html';
}

// Make authenticated API request
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

        // Handle 204 No Content response
        if (response.status === 204) {
            return { status: 'success', data: null };
        }

        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        removeToken();
        window.location.href = '../auth/login.html';
    }
}

// Show notification toast
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification-toast');
    if (existing) {
        existing.remove();
    }

    // Create notification element
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

    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Format date to readable string
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Format datetime to readable string
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

// Validate email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone number (Qatar format)
function isValidPhone(phone) {
    // Qatar phone format: +974-XXXX-XXXX or similar
    const re = /^\+?974[-\s]?\d{4}[-\s]?\d{4}$/;
    return re.test(phone);
}

// Debounce function for search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other scripts
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
        formatDateTime,
        isValidEmail,
        isValidPhone,
        debounce
    };
}
