// ======================
// TRIPS PAGE FUNCTIONALITY WITH ENHANCED PAGINATION
// ======================

// ======================
// REGISTRATION FORM LINKS (UPDATE THESE WITH YOUR ACTUAL LINKS)
// ======================
const REGISTRATION_LINKS = {
    'FALL GETAWAY HIKE': 'https://forms.cloud.microsoft/r/22Fuau0mxb',
    'Kings Dominion, VA': 'https://your-form-link.com/kings-dominion-registration',
    'NEW YORK , USA': 'https://your-form-link.com/niagara-registration',
    'Washington DC , USA': 'https://your-form-link.com/halloween-registration',
    'MIAMI, FLORIDA': 'https://your-form-link.com/miami-registration',
    'COLORADO, USA': 'https://your-form-link.com/colorado-registration',
    'CHICAGO, ILLINOIS': 'https://your-form-link.com/chicago-registration',
    'ARIZONA, USA': 'https://your-form-link.com/arizona-registration',
    'WYOMING, USA': 'https://your-form-link.com/yellowstone-registration',
    'CALIFORNIA, USA': 'https://your-form-link.com/tahoe-registration',
    'BOSTON, MASSACHUSETTS': 'https://your-form-link.com/boston-registration',
    'ORLANDO, FLORIDA': 'https://your-form-link.com/orlando-registration'
};

// Default registration link if specific location not found
const DEFAULT_REGISTRATION_LINK = 'https://your-default-form-link.com/trip-registration';

// ======================
// PAGINATION FUNCTIONALITY (ENHANCED)
// ======================
function initPagination() {
    const dots = document.querySelectorAll('.dot');
    const pages = document.querySelectorAll('.trips-grid');
    let currentPage = 1;
    let isTransitioning = false;
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (isTransitioning) return; // Prevent clicks during transition
            
            const targetPage = parseInt(this.getAttribute('data-page'));
            
            if (targetPage === currentPage) return; // Don't transition to same page
            
            switchToPage(targetPage);
        });
    });
    
    function switchToPage(pageNumber) {
        isTransitioning = true;
        const dots = document.querySelectorAll('.dot');
        const pages = document.querySelectorAll('.trips-grid');
        const currentPageElement = document.querySelector(`.page-${currentPage}`);
        const targetPageElement = document.querySelector(`.page-${pageNumber}`);
        
        // Update dots
        dots.forEach(d => d.classList.remove('active'));
        document.querySelector(`[data-page="${pageNumber}"]`).classList.add('active');
        
        // Animate out current page
        if (currentPageElement) {
            currentPageElement.style.opacity = '0';
            currentPageElement.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentPageElement.classList.remove('active');
                
                // Animate in new page
                if (targetPageElement) {
                    targetPageElement.classList.add('active');
                    setTimeout(() => {
                        targetPageElement.style.opacity = '1';
                        targetPageElement.style.transform = 'translateY(0)';
                        
                        // Re-initialize trip cards for new page
                        initTripCardsForPage(pageNumber);
                        
                        // Show notification
                        showNotification(`Loaded page ${pageNumber} trips`, 'success');
                        
                        isTransitioning = false;
                    }, 50);
                }
            }, 300);
        }
        
        currentPage = pageNumber;
    }
    
    // Keyboard navigation for pagination
    document.addEventListener('keydown', function(e) {
        if (isTransitioning) return;
        
        if (e.key === 'ArrowLeft' && currentPage > 1) {
            switchToPage(currentPage - 1);
        } else if (e.key === 'ArrowRight' && currentPage < dots.length) {
            switchToPage(currentPage + 1);
        }
    });
    
    // Initialize first page
    initTripCardsForPage(1);
}

// ======================
// TRIP CARDS INTERACTIONS (UPDATED FOR FORM REGISTRATION)
// ======================
function initTripCards() {
    initTripCardsForPage(1); // Initialize first page
}

function initTripCardsForPage(pageNumber) {
    const currentPageCards = document.querySelectorAll(`.page-${pageNumber} .trip-card`);
    const currentPageBtns = document.querySelectorAll(`.page-${pageNumber} .more-info-btn`);
    
    // Trip card hover effects
    currentPageCards.forEach(card => {
        // Remove existing listeners to prevent duplicates
        card.replaceWith(card.cloneNode(true));
    });
    
    // Re-get cards after cloning
    const freshCards = document.querySelectorAll(`.page-${pageNumber} .trip-card`);
    const freshBtns = document.querySelectorAll(`.page-${pageNumber} .more-info-btn`);
    
    freshCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('more-info-btn')) return;
            
            const location = this.querySelector('.trip-location').textContent;
            console.log(`Trip clicked: ${location}`);
            
            // Visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // More info button handlers - NOW OPENS REGISTRATION FORM
    freshBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const tripCard = this.closest('.trip-card');
            const location = tripCard.querySelector('.trip-location').textContent;
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Open registration form
            openRegistrationForm(location);
        });
    });
}

// ======================
// REGISTRATION FORM FUNCTIONALITY
// ======================
function openRegistrationForm(location) {
    // Get the registration link for this location
    const registrationLink = REGISTRATION_LINKS[location] || DEFAULT_REGISTRATION_LINK;
    
    // Show loading notification
    showNotification(`Opening registration form for ${location}...`, 'info');
    
    // Add a small delay for better user experience
    setTimeout(() => {
        // Open the registration form in a new tab
        window.open(registrationLink, '_blank');
        
        // Show confirmation notification
        showNotification(`Registration form opened for ${location}`, 'success');
    }, 500);
}

// ======================
// UTILITY FUNCTION TO UPDATE REGISTRATION LINKS
// ======================
function updateRegistrationLink(location, newLink) {
    REGISTRATION_LINKS[location] = newLink;
    showNotification(`Registration link updated for ${location}`, 'success');
}

// ======================
// ACTIVITY ICONS INTERACTIONS
// ======================
function initActivityIcons() {
    const activityIcons = document.querySelectorAll('.activity-icon');
    
    activityIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const activity = this.querySelector('span').textContent;
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            filterTripsByActivity(activity);
        });
    });
}

// ======================
// ACTIVITY TYPES INTERACTIONS
// ======================
function initActivityTypes() {
    const activityTypes = document.querySelectorAll('.activity-type');
    
    activityTypes.forEach(activity => {
        activity.addEventListener('click', function() {
            const activityName = this.querySelector('h3').textContent;
            
            // Visual feedback
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            showActivityDetails(activityName);
        });
        
        // Hover effects
        activity.addEventListener('mouseenter', function() {
            this.querySelector('.activity-image').style.transform = 'scale(1.1)';
        });
        
        activity.addEventListener('mouseleave', function() {
            this.querySelector('.activity-image').style.transform = 'scale(1)';
        });
    });
}

// ======================
// UTILITY FUNCTIONS
// ======================

// Filter trips by activity
function filterTripsByActivity(activity) {
    console.log(`Filtering trips by: ${activity}`);
    showNotification(`Showing trips for: ${activity}`, 'info');
    
    // Highlight selected activity
    const activityIcons = document.querySelectorAll('.activity-icon');
    activityIcons.forEach(icon => {
        const iconText = icon.querySelector('span').textContent;
        if (iconText === activity) {
            icon.style.background = 'rgba(28, 45, 90, 0.1)';
            icon.style.borderRadius = '12px';
            setTimeout(() => {
                icon.style.background = '';
                icon.style.borderRadius = '';
            }, 2000);
        }
    });
}

// Show activity details
function showActivityDetails(activityName) {
    const activityInfo = {
        'HIKING': {
            description: 'Experience breathtaking mountain trails and scenic landscapes with guided tours.',
            duration: '3-5 days',
            difficulty: 'Moderate to Advanced',
            price: '$299-599'
        },
        'RAFTING': {
            description: 'Navigate exciting rapids and enjoy river adventures with professional guides.',
            duration: '1-2 days',
            difficulty: 'Beginner to Intermediate',
            price: '$149-299'
        },
        'SCUBA DIVING': {
            description: 'Explore underwater worlds and marine life in crystal clear waters.',
            duration: '2-4 days',
            difficulty: 'Beginner to Advanced',
            price: '$399-799'
        }
    };
    
    const info = activityInfo[activityName];
    if (info) {
        const message = `${activityName}\n\n${info.description}\n\nDuration: ${info.duration}\nDifficulty: ${info.difficulty}\nPrice Range: ${info.price}`;
        alert(message);
    }
}

// ======================
// BREADCRUMB NAVIGATION
// ======================
function initBreadcrumb() {
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === 'student-services.html') {
                showNotification('Returning to Student Services Hub...', 'info');
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
}

// ======================
// HERO SECTION INTERACTIONS
// ======================
function initHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.addEventListener('click', function() {
            const heroText = this.querySelector('.hero-text');
            if (heroText) {
                heroText.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    heroText.style.transform = 'scale(1)';
                }, 200);
            }
            
            showNotification('Ready for your next adventure?', 'info');
        });
    }
}

// ======================
// FOOTER INTERACTIONS
// ======================
function initFooter() {
    const footerLinks = document.querySelectorAll('.footer-column a');
    const socialIcons = document.querySelectorAll('.footer-social .social-icon');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            showNotification(`Navigating to: ${linkText}`, 'info');
        });
    });
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            showNotification('Social media integration coming soon', 'info');
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
    
    const animatedElements = document.querySelectorAll('.trip-card, .activity-type, .activity-icon');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ======================
// NOTIFICATION SYSTEM
// ======================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${colors[type] || colors.success};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 14px;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
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
// ERROR HANDLING
// ======================
function initErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('Trips page error:', e.error);
    });
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x250?text=Image+Not+Available';
        });
    });
}

// ======================
// RESPONSIVE UTILITIES
// ======================
function initResponsiveFeatures() {
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        const heroText = document.querySelectorAll('.hero-text h2');
        heroText.forEach(text => {
            if (isMobile) {
                text.style.fontSize = '28px';
                text.style.letterSpacing = '1px';
            } else {
                text.style.fontSize = '48px';
                text.style.letterSpacing = '2px';
            }
        });
        
        const iconsGrid = document.querySelector('.icons-grid');
        if (iconsGrid) {
            if (isMobile) {
                iconsGrid.style.flexDirection = 'column';
                iconsGrid.style.alignItems = 'center';
                iconsGrid.style.gap = '30px';
            } else {
                iconsGrid.style.flexDirection = 'row';
                iconsGrid.style.gap = '80px';
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
}

// ======================
// TRIPS PAGE INITIALIZATION
// ======================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced Trips Page JavaScript loaded with Registration Forms!');
    
    // Initialize all functionality
    initTripCards();
    initActivityIcons();
    initPagination(); // Enhanced pagination with transitions
    initActivityTypes();
    initBreadcrumb();
    initHeroSection();
    initFooter();
    initScrollAnimations();
    initErrorHandling();
    initResponsiveFeatures();
    
    console.log('All Trips page features initialized with registration forms!');
    
    // Welcome message
    setTimeout(() => {
        showNotification('Welcome to Up Coming Trips! Click "More Info" to register for trips.', 'info');
    }, 1000);
});

// ======================
// EXPORT FOR EXTERNAL USE
// ======================
window.TripsPage = {
    openRegistrationForm,
    updateRegistrationLink,
    filterTripsByActivity,
    showNotification,
    REGISTRATION_LINKS
};