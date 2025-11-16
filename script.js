// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Change icon
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    if (mobileMenu.classList.contains('active')) {
        menuIcon.textContent = '✕';
    } else {
        menuIcon.textContent = '☰';
    }
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
        menuIcon.textContent = '☰';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll for trip cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all trip cards
document.addEventListener('DOMContentLoaded', () => {
    const tripCards = document.querySelectorAll('.trip-card');
    tripCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// ========================================
// Booking Modal Functions
// ========================================

let selectedTripName = '';

function openBookingModal(tripName) {
    selectedTripName = tripName;
    const modal = document.getElementById('bookingModal');
    const modalTripName = document.getElementById('modalTripName');
    const tripNameInput = document.getElementById('tripName');
    
    modalTripName.textContent = `Book: ${tripName}`;
    tripNameInput.value = tripName;
    modal.classList.add('active');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    
    // Reset form
    document.getElementById('bookingForm').reset();
    
    // Re-enable body scroll
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'bookingModal') {
                closeBookingModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBookingModal();
        }
    });
    
    // Set minimum date for booking
    const bookingDateInput = document.getElementById('bookingDate');
    if (bookingDateInput) {
        // Set minimum date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        bookingDateInput.setAttribute('min', minDate);
    }
    
    // File Upload Validation
    const passportImageInput = document.getElementById('passportImage');
    if (passportImageInput) {
        passportImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Check file size (max 10MB for Netlify)
                if (file.size > 10 * 1024 * 1024) {
                    alert('File size must be less than 10MB');
                    e.target.value = '';
                    return;
                }
                
                // Check file type
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Please upload a valid image file (JPG, PNG) or PDF');
                    e.target.value = '';
                    return;
                }
            }
        });
    }
});

console.log('Sea Secrets Booking System with Netlify Forms Loaded! 🌊');
