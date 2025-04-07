// Main JavaScript for Shariar Arafat's Portfolio

// DOM Elements
const navbar = document.querySelector('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const allLinks = document.querySelectorAll('.nav-links a');
const downloadBtn = document.getElementById('download-resume');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('.section');
const testimonialSlider = document.querySelector('.testimonials-slider');
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
allLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    allLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Resume Download Functionality (Replace with actual resume PDF path)
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Replace '/path/to/resume.pdf' with your actual resume file path
        const resumePath = 'assets/resume-shariar-arafat.pdf';
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = resumePath;
        link.download = 'Shariar-Arafat-Resume.pdf';
        
        // Append to the body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll simulate success with an alert
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Testimonial Slider
let currentSlide = 0;
const slideCount = testimonials.length;

// Hide all testimonials except the first one
if (testimonials.length > 0) {
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
}

// Testimonial Navigation Functions
function showSlide(index) {
    if (testimonials.length === 0) return;
    
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
    });
    
    // Show the current testimonial
    testimonials[index].style.display = 'block';
    
    // Add animation class
    testimonials[index].classList.add('fade-in');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        testimonials[index].classList.remove('fade-in');
    }, 500);
}

// Next and Previous buttons for testimonials
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    });
}

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.project-card, .service-card, .blog-card, .skill-item, .timeline-item').forEach(element => {
    observer.observe(element);
}); 