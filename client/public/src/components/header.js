class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="lotus-header">
            <div class="lotus-container">
                <div class="header-content">
                    <!-- Logo -->
                    <div class="logo-section">
                        <div class="logo-circle">
                            <span class="logo-emoji">🪷</span>
                        </div>
                        <div class="logo-text">
                            <a href="index.html">
                                <h1 class="school-name">Lotus Kindergarten</h1>
                                <p class="school-location">Doha, Qatar 🇶🇦</p>
                            </a>
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button class="mobile-menu-btn" onclick="toggleMenu()" aria-label="Toggle menu">
                        <i class="fas fa-bars"></i>
                    </button>

                    <!-- Navigation Links -->
                    <div class="nav-menu" id="navLinks">
                        <a href="index.html" class="nav-link">
                            <i class="fas fa-home"></i> Home
                        </a>
                        <a href="about.html" class="nav-link">
                            <i class="fas fa-heart"></i> About
                        </a>
                        <a href="programs.html" class="nav-link">
                            <i class="fas fa-graduation-cap"></i> Programs
                        </a>
                        <a href="games.html" class="nav-link">
                            <i class="fas fa-gamepad"></i> Games
                        </a>
                        <a href="gallery.html" class="nav-link">
                            <i class="fas fa-images"></i> Gallery
                        </a>
                        <a href="contact.html" class="nav-link">
                            <i class="fas fa-envelope"></i> Contact
                        </a>

                        <!-- Login/Profile Button -->
                        <div class="auth-section" id="authSection">
                            <a href="../pages/auth/login.html" class="btn-login" id="loginBtn">
                                <i class="fas fa-sign-in-alt"></i> Login
                            </a>
                            <div class="user-menu" id="userMenu" style="display: none;">
                                <button class="user-avatar" onclick="toggleUserDropdown()">
                                    <i class="fas fa-user-circle"></i>
                                    <span id="userName">User</span>
                                </button>
                                <div class="user-dropdown" id="userDropdown">
                                    <a href="#" id="dashboardLink"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                                    <a href="#" id="profileLink"><i class="fas fa-user"></i> Profile</a>
                                    <a href="#" onclick="handleLogout()"><i class="fas fa-sign-out-alt"></i> Logout</a>
                                </div>
                            </div>
                        </div>

                        <a href="contact.html" class="btn-enroll">
                            <i class="fas fa-star"></i> Enroll Now
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        `;

        // Check authentication status
        this.checkAuth();
    }

    checkAuth() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            const userData = JSON.parse(user);
            const loginBtn = document.getElementById('loginBtn');
            const userMenu = document.getElementById('userMenu');
            const userName = document.getElementById('userName');
            const dashboardLink = document.getElementById('dashboardLink');
            const navLinks = document.getElementById('navLinks');

            if (loginBtn && userMenu && userName) {
                loginBtn.style.display = 'none';
                userMenu.style.display = 'block';
                userName.textContent = userData.firstName || 'User';

                // Set dashboard link based on role
                const dashboardUrls = {
                    'admin': '../admin/dashboard.html',
                    'teacher': '../teacher/dashboard.html',
                    'parent': '../parent/dashboard.html',
                    'student': '../student/dashboard.html'
                };

                if (dashboardLink) {
                    dashboardLink.href = dashboardUrls[userData.role] || '#';
                }

                // Add Homework link for students only (insert before Gallery link)
                if (userData.role === 'student' && navLinks) {
                    const galleryLink = navLinks.querySelector('a[href="gallery.html"]');
                    if (galleryLink && !document.getElementById('homeworkLink')) {
                        const homeworkLink = document.createElement('a');
                        homeworkLink.href = 'homework.html';
                        homeworkLink.className = 'nav-link';
                        homeworkLink.id = 'homeworkLink';
                        homeworkLink.innerHTML = '<i class="fas fa-book"></i> Homework';
                        galleryLink.parentNode.insertBefore(homeworkLink, galleryLink);
                    }
                }
            }
        }
    }
}

customElements.define('app-header', Header);

// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Toggle user dropdown
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('userDropdown');

    if (userMenu && dropdown && !userMenu.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});
