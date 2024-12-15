// Page loading and navigation
function loadPage(pageUrl) {
    fetch(pageUrl)
        .then(response => response.text())
        .then(html => {
            document.getElementById('app').innerHTML = html;
            initializePageListeners();
        })
        .catch(error => console.error('Error loading page:', error));
}

// Authentication functions
function signup(username, email, password) {
    // Similar to previous implementation
}

function login(username, password) {
    // Similar to previous implementation
}

function initializePageListeners() {
    // Login page listeners
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (login(username, password)) {
                loadPage('homepage.html');
            }
        });
    }

    // Signup page listeners
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('new-username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (signup(username, email, password)) {
                loadPage('login.html');
            }
        });
    }

    // Logout functionality
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Logout logic
            loadPage('login.html');
        });
    }

    // Other page-specific initializations would go here
}

// Initial page load
document.addEventListener('DOMContentLoaded', () => {
    loadPage('login.html');
});

