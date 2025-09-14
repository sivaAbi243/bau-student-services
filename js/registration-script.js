// ======================
// REGISTRATION PAGE JAVASCRIPT
// ======================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Registration page loaded successfully!');
    
    // Initialize page functionality
    getEventDetailsFromURL();
    initFormSubmission();
    
    console.log('Registration page features initialized!');
});

// ======================
// GET EVENT DETAILS FROM URL
// ======================
function getEventDetailsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('event');
    const eventDate = urlParams.get('date');
    
    if (eventName) {
        document.getElementById('eventName').textContent = decodeURIComponent(eventName);
    }
    
    if (eventDate) {
        document.getElementById('eventDate').textContent = decodeURIComponent(eventDate);
    }
}

// ======================
// GO BACK TO EVENTS PAGE
// ======================
function goBack() {
    if (document.referrer && document.referrer.includes('all-events.html')) {
        window.history.back();
    } else {
        window.location.href = 'all-events.html';
    }
}

// ======================
// FORM SUBMISSION HANDLING
// ======================
function initFormSubmission() {
    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const inputs = this.querySelectorAll('input[required]');
        const name = inputs[0].value; // First input is name
        const eventName = document.getElementById('eventName').textContent;
        
        // Simple validation
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#F15B47';
                isValid = false;
            } else {
                input.style.borderColor = '#1C2D5A';
            }
        });
        
        if (isValid) {
            // Show success message
            alert(`Registration successful! Thank you ${name} for registering for "${eventName}". You will receive a confirmation email shortly.`);
            
            // Reset form
            this.reset();
            
            // Redirect back to events page after 2 seconds
            setTimeout(() => {
                window.location.href = 'all-events.html';
            }, 2000);
        } else {
            alert('Please fill in all required fields.');
        }
    });
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#F15B47';
            } else {
                this.style.borderColor = '#1C2D5A';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#28AAE2';
        });
    });
}