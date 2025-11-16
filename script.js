// ========================================
// Header Scroll Effect
// ========================================

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// Mobile Menu Toggle
// ========================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
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
document.getElementById('bookingModal').addEventListener('click', (e) => {
    if (e.target.id === 'bookingModal') {
        closeBookingModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBookingModal();
    }
});

// ========================================
// Smooth Scroll Animation
// ========================================

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

// ========================================
// Set minimum date for booking
// ========================================

const bookingDateInput = document.getElementById('bookingDate');
if (bookingDateInput) {
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    bookingDateInput.setAttribute('min', minDate);
}

// ========================================
// File Upload Validation
// ========================================

document.getElementById('passportImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    if (file) {
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
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

console.log('Sea Secrets Booking System Loaded Successfully! 🌊');
console.log('Using FormSubmit for email delivery');
