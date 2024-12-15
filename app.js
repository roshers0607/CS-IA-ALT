// User data storage (would be replaced by backend in real app)
let users = JSON.parse(localStorage.getItem('fitnessUsers')) || [];
let currentUser = null;

// Authentication functions
function signup(username, email, password) {
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        alert('Username already exists');
        return false;
    }
    
    const newUser = {
        username,
        email,
        password,
        workouts: [],
        meals: [],
        stats: {
            musclesWorked: [],
            totalWorkoutTime: 0,
            caloriesBurned: 0,
            nutrition: {
                protein: 0,
                carbs: 0,
                fat: 0
            }
        }
    };
    
    users.push(newUser);
    localStorage.setItem('fitnessUsers', JSON.stringify(users));
    return true;
}

function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        updateDashboard();
        showPage('dashboard-page');
        return true;
    }
    alert('Invalid username or password');
    return false;
}

function logout() {
    currentUser = null;
    showPage('login-page');
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// BMI Calculator
function calculateBMI() {
    const height = document.getElementById('height').value / 100;
    const weight = document.getElementById('weight').value;
    
    if (height && weight) {
        const bmi = weight / (height * height);
        const bmiResult = document.getElementById('bmi-result');
        
        if (bmi < 18.5) bmiResult.textContent = `BMI: ${bmi.toFixed(1)} (Underweight)`;
        else if (bmi < 25) bmiResult.textContent = `BMI: ${bmi.toFixed(1)} (Normal weight)`;
        else if (bmi < 30) bmiResult.textContent = `BMI: ${bmi.toFixed(1)} (Overweight)`;
        else bmiResult.textContent = `BMI: ${bmi.toFixed(1)} (Obese)`;
    }
}

// Dashboard Update
function updateDashboard() {
    if (!currentUser) return;
    
    const musclesWorked = document.getElementById('muscles-worked');
    musclesWorked.innerHTML = currentUser.stats.musclesWorked.join(', ') || 'No muscles worked this week';
    
    document.getElementById('total-workout-time').textContent = 
        `${currentUser.stats.totalWorkoutTime} mins`;
    
    document.getElementById('calories-burned').textContent = 
        `${currentUser.stats.caloriesBurned} cal`;
    
    document.getElementById('protein-intake').textContent = 
        `${currentUser.stats.nutrition.protein}g`;
    document.getElementById('carbs-intake').textContent = 
        `${currentUser.stats.nutrition.carbs}g`;
    document.getElementById('fat-intake').textContent = 
        `${currentUser.stats.nutrition.fat}g`;
}

// Event Listeners
document.getElementById('signup-form').addEventListener('submit', (e) => {
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
        showPage('login-page');
    }
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

document.getElementById('signup-link').addEventListener('click', () => showPage('signup-page'));

document.getElementById('logout-btn').addEventListener('click', logout);

document.getElementById('bmi-calculator-btn').addEventListener('click', () => showPage('bmi-calculator-page'));
document.getElementById('calculate-bmi').addEventListener('click', calculateBMI);
document.getElementById('back-to-dashboard-bmi').addEventListener('click', () => showPage('dashboard-page'));

document.getElementById('workout-planner-btn').addEventListener('click', () => showPage('workout-planner-page'));
document.getElementById('back-to-dashboard').addEventListener('click', () => showPage('dashboard-page'));

document.getElementById('meal-planner-btn').addEventListener('click', () => showPage('meal-planner-page'));
document.getElementById('back-to-dashboard-meal').addEventListener('click', () => showPage('dashboard-page'));

// Initial page load
showPage('login-page');
