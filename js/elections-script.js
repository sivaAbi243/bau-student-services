// ======================
// ELECTIONS PAGE JAVASCRIPT
// ======================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Elections page loaded successfully!');
    
    // Initialize all functionality
    initApplicationActions();
    initSmoothScrolling();
    initMobileMenu();
    initImageLoading();
    initSocialIcons();
    initScrollAnimations();
    initAccessibility();
    
    console.log('All Elections page features initialized!');
});

// ======================
// APPLICATION ACTIONS
// ======================
function initApplicationActions() {
    // Download Application button
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadApplication);
    }
    
    // Submit Application button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitApplication);
    }
    
    // PDF link click
    const pdfIcon = document.querySelector('.pdf-icon');
    if (pdfIcon) {
        pdfIcon.addEventListener('click', function() {
            downloadApplication();
        });
        
        // Make it look clickable
        pdfIcon.style.cursor = 'pointer';
        pdfIcon.title = 'Click to download application form';
    }
}

// ======================
// DOWNLOAD APPLICATION FUNCTION
// ======================
function downloadApplication() {
    // Add click animation
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            downloadBtn.style.transform = 'scale(1)';
        }, 150);
    }
    
    console.log('Download application clicked');
    
    // Create a mock PDF download
    // In a real implementation, this would download the actual PDF file
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual PDF URL
    link.download = 'SGA_Application_Form_Spring2025.pdf';
    
    // Show download notification
    showNotification('Application form download started!', 'success');
    
    // Simulate download
    setTimeout(() => {
        alert('Application Form Downloaded!\n\nThe SGA Election Application Form for Spring 2025 has been downloaded to your device. Please fill it out completely and submit it before the deadline.');
    }, 500);
}

// ======================
// SUBMIT APPLICATION FUNCTION
// ======================
function submitApplication() {
    // Add click animation
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
        }, 150);
    }
    
    console.log('Submit application clicked');
    
    // Show submission modal or redirect to submission form
    showSubmissionModal();
}

// ======================
// SHOW SUBMISSION MODAL
// ======================
function showSubmissionModal() {
    // Create modal for application submission
    const modal = document.createElement('div');
    modal.className = 'submission-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Submit Your Application</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Election:</strong> Spring 2025 Student Government Association</p>
                <p><strong>Deadline:</strong> 06/29 - 10:30 AM</p>
                <br>
                <p>To submit your application, please:</p>
                <ol>
                    <li>Download and complete the application form</li>
                    <li>Gather all required documents</li>
                    <li>Submit via email to: <strong>sga@bau.edu</strong></li>
                    <li>Or submit in person at the Student Services Office</li>
                </ol>
                <br>
                <p><strong>Required Documents:</strong></p>
                <ul>
                    <li>Completed application form</li>
                    <li>Current transcript</li>
                    <li>Two letters of recommendation</li>
                    <li>Personal statement (500 words max)</li>
                </ul>
                <div class="modal-actions">
                    <button class="email-submit-btn">Submit via Email</button>
                    <button class="modal-close-btn">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(28, 45, 90, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s;
    `;
    
    // Style modal elements
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.style.cssText = `
        float: right;
        font-size: 24px;
        cursor: pointer;
        background: none;
        border: none;
        color: #1C2D5A;
    `;
    
    const modalActions = modal.querySelector('.modal-actions');
    modalActions.style.cssText = `
        margin-top: 20px;
        display: flex;
        gap: 15px;
        justify-content: center;
    `;
    
    const emailBtn = modal.querySelector('.email-submit-btn');
    emailBtn.style.cssText = `
        background: #DBA631;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
    `;
    
    const closeModalBtn = modal.querySelector('.modal-close-btn');
    closeModalBtn.style.cssText = `
        background: #1C2D5A;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close functionality
    function closeModal() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    
    // Email submission
    emailBtn.addEventListener('click', function() {
        // Open email client with pre-filled information
        const subject = encodeURIComponent('SGA Election Application - Spring 2025');
        const body = encodeURIComponent('Dear SGA Election Committee,\n\nI am submitting my application for the Spring 2025 Student Government Association elections.\n\nAttached documents:\n- Completed application form\n- Current transcript\n- Letters of recommendation\n- Personal statement\n\nThank you for your consideration.\n\nBest regards,\n[Your Name]');
        
        window.location.href = `mailto:sga@bau.edu?subject=${subject}&body=${body}`;
        
        closeModal();
        showNotification('Email client opened! Please attach your documents and send.', 'success');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// ======================
// NOTIFICATION SYSTEM
// ======================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#3B82F6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ======================
// SMOOTH SCROLLING
// ======================
function initSmoothScrolling() {
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ======================
// MOBILE MENU FUNCTIONALITY
// ======================
function initMobileMenu() {
    function handleResize() {
        if (window.innerWidth <= 768) {
            console.log('Mobile view activated');
        } else {
            console.log('Desktop view activated');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load
}

// ======================
// IMAGE LOADING OPTIMIZATION
// ======================
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s';
        });
        
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            // Set a fallback background
            this.style.background = 'linear-gradient(135deg, #BBD3EE, #28AAE2)';
        });
    });
}

// ======================
// SOCIAL ICONS FUNCTIONALITY
// ======================
function initSocialIcons() {
    document.querySelectorAll('.social-icon, .social-icon-footer').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Visual feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            console.log('Social icon clicked');
        });
    });
}

// ======================
// SCROLL ANIMATIONS
// ======================
function initScrollAnimations() {
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

    // Add scroll animation to sections
    const sections = document.querySelectorAll('.election-section, .candidate-application-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `all 0.8s ease-out ${index * 0.2}s`;
        observer.observe(section);
    });
}

// ======================
// ACCESSIBILITY ENHANCEMENTS
// ======================
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key functionality
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.submission-modal');
            modals.forEach(modal => {
                if (modal) {
                    const event = new MouseEvent('click');
                    modal.dispatchEvent(event);
                }
            });
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class when mouse is used
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus indicators for better accessibility
    const focusableElements = document.querySelectorAll('a, button, .pdf-icon');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #DBA631';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// ======================
// HERO BACKGROUND PARALLAX
// ======================
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-bg-image');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const speed = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
        });
    }
}

// ======================
// NAVIGATION HIGHLIGHTING
// ======================
function initNavigationHighlighting() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            console.log('Navigation item clicked:', this.textContent);
        });
    });
}

// ======================
// ELECTION COUNTDOWN (BONUS FEATURE)
// ======================
function initElectionCountdown() {
    // Set election deadline
    const electionDeadline = new Date('2025-06-29T10:30:00');
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = electionDeadline - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            // You can add a countdown display element to show this
            console.log(`Election deadline: ${days}d ${hours}h ${minutes}m remaining`);
        } else {
            console.log('Election deadline has passed');
        }
    }
    
    // Update countdown every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// ======================
// ERROR HANDLING
// ======================
function initErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript error on Elections page:', e.error);
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection on Elections page:', e.reason);
    });
}

// ======================
// UTILITY FUNCTIONS
// ======================

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Format date for display
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// ======================
// FINAL INITIALIZATION
// ======================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Elections page loaded successfully!');
    
    // Initialize all functionality
    initApplicationActions();
    initSmoothScrolling();
    initMobileMenu();
    initImageLoading();
    initSocialIcons();
    initScrollAnimations();
    initAccessibility();
    initParallaxEffect();
    initNavigationHighlighting();
    initElectionCountdown();
    initErrorHandling();
    
    console.log('All Elections page features initialized!');
});

// ======================
// EXPORT FOR TESTING
// ======================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        downloadApplication,
        submitApplication,
        showNotification,
        debounce,
        formatDate
    };
}