// Dark Mode Functionality for Shariar Arafat's Portfolio

// DOM Elements
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Check local storage for user preference
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    
    // If the user previously enabled dark mode
    if (darkMode === 'enabled') {
        enableDarkMode();
    }
}

// Enable Dark Mode
function enableDarkMode() {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
}

// Disable Dark Mode
function disableDarkMode() {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
}

// Toggle Dark Mode
function toggleDarkMode() {
    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// Event Listeners
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// Check user's system preference for dark mode
function checkSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enableDarkMode();
    }
}

// Load preferences and system settings on page load
document.addEventListener('DOMContentLoaded', () => {
    // First check if the user has previously set a preference
    const darkMode = localStorage.getItem('darkMode');
    
    if (darkMode === null) {
        // If no preference is stored, check system preference
        checkSystemPreference();
    } else if (darkMode === 'enabled') {
        // If there is a preference and it's enabled
        enableDarkMode();
    }
});

// Listen for changes in system preference
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only apply system preference if user hasn't set their own preference
        if (localStorage.getItem('darkMode') === null) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
} 