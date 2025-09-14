// ======================
// STUDENT SERVICES SPECIFIC FUNCTIONALITY (UPDATED WITH CAREER LINKS)
// ======================

// ======================
// SERVICE CARD INTERACTIONS
// ======================
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            const serviceType = this.getAttribute('data-service');
            
            console.log(`Service clicked: ${serviceName}`);
            
            // Add click feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Route to specific service pages
            if (serviceType === 'career') {
                // Redirect to career counseling as the main career page
                showNotification('Opening Career Services...', 'success');
                setTimeout(() => {
                    window.location.href = 'career-counseling.html';
                }, 500);
            } else {
                switch(serviceName.toLowerCase()) {
                    case 'career development':
                        showNotification('Opening Career Services...', 'success');
                        setTimeout(() => {
                            window.location.href = 'career-counseling.html';
                        }, 500);
                        break;
                    case 'wellness & support':
                        alert('Wellness & Support page would open here');
                        break;
                    case 'student housing':
                        alert('Student Housing page would open here');
                        break;
                    default:
                        console.log('Service page not found');
                }
            }
        });
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
    });
}

// ======================
// QUICK ACCESS ICONS WITH DROPDOWNS (UPDATED)
// ======================
function initQuickAccessIcons() {
    const quickIcons = document.querySelectorAll('.quick-icon');
    const dropdowns = document.querySelectorAll('.quick-icon-dropdown');
    let activeDropdown = null;
    
    quickIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const dropdownId = this.getAttribute('data-dropdown') + '-dropdown';
            const dropdown = document.getElementById(dropdownId);
            
            // Close other dropdowns
            dropdowns.forEach(dd => {
                if (dd.id !== dropdownId) {
                    dd.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            if (dropdown) {
                const isActive = dropdown.classList.contains('active');
                
                if (isActive) {
                    dropdown.classList.remove('active');
                    activeDropdown = null;
                } else {
                    dropdown.classList.add('active');
                    activeDropdown = dropdown;
                }
            }
            
            // Visual feedback for icon
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Handle dropdown item clicks (UPDATED WITH URL REDIRECTION)
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const action = this.getAttribute('data-action');
            const url = this.getAttribute('data-url');
            const text = this.textContent;
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Handle the action - redirect if URL is provided, otherwise use fallback
            if (url) {
                showNotification(`Opening ${text}...`, 'success');
                setTimeout(() => {
                    safeRedirect(url, `${text} functionality will be available soon.`);
                }, 500);
            } else {
                handleDropdownAction(action, text);
            }
            
            // Close dropdown
            if (activeDropdown) {
                activeDropdown.classList.remove('active');
                activeDropdown = null;
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.quick-icon')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            activeDropdown = null;
        }
    });
    
    // Close dropdowns on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && activeDropdown) {
            activeDropdown.classList.remove('active');
            activeDropdown = null;
        }
    });
}

// ======================
// SAFE REDIRECT FUNCTION (NEW)
// ======================
function safeRedirect(url, fallbackMessage) {
    // Check if we're in a development environment or if the file might exist
    if (url && url.endsWith('.html')) {
        try {
            window.location.href = url;
        } catch (error) {
            console.warn(`Failed to redirect to ${url}:`, error);
            showNotification(fallbackMessage, 'info');
        }
    } else {
        showNotification(fallbackMessage, 'info');
    }
}

// ======================
// DROPDOWN ACTION HANDLER (UPDATED WITH CAREER LINKS)
// ======================
function handleDropdownAction(action, text) {
    console.log(`Dropdown action: ${action} - ${text}`);
    
    // Define actions for each dropdown item
    const actions = {
        // Career Services (these now redirect to actual pages)
        'career-corner-news': () => {
            showNotification('Opening Career Corner News...', 'success');
            setTimeout(() => safeRedirect('career-corner-news.html', 'Career Corner News will be available soon.'), 500);
        },
        'Carrer Corner News': () => { // Handle the typo in original HTML
            showNotification('Opening Career Corner News...', 'success');
            setTimeout(() => safeRedirect('career-corner-news.html', 'Career Corner News will be available soon.'), 500);
        },
        'career-counseling': () => {
            showNotification('Opening Career Counseling...', 'success');
            setTimeout(() => safeRedirect('career-counseling.html', 'Career Counseling will be available soon.'), 500);
        },
        'intern-opportunities': () => {
            showNotification('Opening Intern Opportunities...', 'success');
            setTimeout(() => safeRedirect('intern-opportunities.html', 'Intern Opportunities will be available soon.'), 500);
        },
        'Intern Opportunities': () => { // Handle exact text match
            showNotification('Opening Intern Opportunities...', 'success');
            setTimeout(() => safeRedirect('intern-opportunities.html', 'Intern Opportunities will be available soon.'), 500);
        },
        'career-resources': () => {
            showNotification('Opening Career Resources...', 'success');
            setTimeout(() => safeRedirect('career-resources.html', 'Career Resources will be available soon.'), 500);
        },
        'Resources': () => { // Handle the shorter text match
            showNotification('Opening Career Resources...', 'success');
            setTimeout(() => safeRedirect('career-resources.html', 'Career Resources will be available soon.'), 500);
        },
        'career-elections': () => {
            showNotification('Opening Career Elections...', 'success');
            setTimeout(() => safeRedirect('career-elections.html', 'Career Elections will be available soon.'), 500);
        },
        'Elections': () => { // Handle the shorter text match
            showNotification('Opening Career Elections...', 'success');
            setTimeout(() => safeRedirect('career-elections.html', 'Career Elections will be available soon.'), 500);
        },
        
        // Community Service
        'volunteer-opportunities': () => {
            showNotification('Volunteer Opportunities selected. View available volunteer positions.', 'info');
        },
        'local-partnerships': () => {
            showNotification('Featured Organizations selected. Learn about our community partners.', 'info');
        },
        'Featured Organizations': () => {
            showNotification('Featured Organizations selected. Learn about our community partners.', 'info');
        },
        'Gallery': () => {
            showNotification('Gallery selected. View our community service gallery.', 'info');
        },
        
        // Events
        'Archive': () => {
            showNotification('Archive selected. View past events.', 'info');
        },
        'student-activities': () => {
            showNotification('Student Clubs selected. View ongoing student activities.', 'info');
        },
        'Student Clubs': () => {
            showNotification('Student Clubs selected. View ongoing student activities.', 'info');
        },
        'academic-workshops': () => {
            showNotification('Academic Workshops selected. Register for workshops.', 'info');
        },
        'Academic Workshops': () => {
            showNotification('Academic Workshops selected. Register for workshops.', 'info');
        },
        'Networking': () => {
            showNotification('Networking selected. Join networking events.', 'info');
        },
        
        // Team
        'Office Hours': () => {
            showNotification('Office Hours selected. View current office hours.', 'info');
        },
        'Student Union(The Bay)': () => {
            showNotification('Student Union selected. Learn about The Bay.', 'info');
        }
    };
    
    // Execute the action if it exists
    if (actions[action]) {
        actions[action]();
    } else {
        showNotification(`${text} functionality will be available soon.`, 'info');
    }
}

// ======================
// NEWSLETTER SIGNUP
// ======================
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-signup');
    const emailInput = newsletterForm?.querySelector('input[type="email"]');
    const submitBtn = newsletterForm?.querySelector('button');
    
    if (newsletterForm && emailInput && submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Success feedback
                this.textContent = 'Subscribed!';
                this.style.background = '#28a745';
                emailInput.value = '';
                
                setTimeout(() => {
                    this.textContent = 'Submit';
                    this.style.background = '';
                }, 2000);
                
                console.log('Newsletter subscription:', email);
                // Here you would typically send to your backend
                showNotification('Successfully subscribed to newsletter!', 'success');
            } else {
                // Error feedback
                emailInput.style.borderColor = '#dc3545';
                emailInput.placeholder = 'Please enter a valid email';
                showNotification('Please enter a valid email address', 'error');
                
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                    emailInput.placeholder = 'Yes, subscribe me to your newsletter';
                }, 3000);
            }
        });
        
        // Real-time validation
        emailInput.addEventListener('input', function() {
            if (this.value && validateEmail(this.value)) {
                this.style.borderColor = '#28a745';
            } else if (this.value) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '';
            }
        });
    }
}

// ======================
// EMAIL VALIDATION
// ======================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ======================
// SOCIAL MEDIA INTERACTIONS
// ======================
function initSocialInteractions() {
    // Social images hover effects
    const socialImages = document.querySelectorAll('.social-image');
    socialImages.forEach(image => {
        image.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            console.log('Social media image clicked');
            // Here you could open a lightbox or link to social media
            showNotification('Social media integration coming soon!', 'info');
        });
    });
    
    // Social button
    const socialBtn = document.querySelector('.social-btn');
    if (socialBtn) {
        socialBtn.addEventListener('click', function() {
            showNotification('Social media links will open here', 'info');
            // window.open('https://facebook.com/yourpage', '_blank');
        });
    }
}

// ======================
// EVENTS BANNER INTERACTION
// ======================
function initEventsBanner() {
    const eventsBanner = document.querySelector('.events-banner');
    const learnMoreBtn = document.querySelector('.learn-more-btn');
    
    if (eventsBanner) {
        eventsBanner.addEventListener('click', function() {
            console.log('Events banner clicked');
            showNotification('Events details coming soon!', 'info');
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Check if events page exists
            if (document.querySelector('a[href="all-events.html"]')) {
                window.location.href = 'all-events.html';
            } else {
                showNotification('Events page will be available soon!', 'info');
            }
        });
    }
}

// ======================
// SUCCESS STORIES INTERACTIONS
// ======================
function initSuccessStories() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Success story clicked');
            
            // Visual feedback
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Could open a modal with full story
            showNotification('Full story feature coming soon!', 'info');
        });
    });
}

// ======================
// VIEW MORE BUTTON
// ======================
function initViewMoreButton() {
    const viewMoreBtn = document.querySelector('.view-more-btn');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            showNotification('More services coming soon!', 'info');
            console.log('View more services clicked');
        });
    }
}

// ======================
// BREADCRUMB NAVIGATION
// ======================
function initBreadcrumb() {
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Smooth navigation back to previous pages
            const href = this.getAttribute('href');
            if (href === 'index.html') {
                e.preventDefault();
                showNotification('Navigating to home...', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 300);
            }
        });
    });
}

// ======================
// CONTACT INFO INTERACTIONS
// ======================
function initContactInfo() {
    // Make phone number clickable
    const phoneNumbers = document.querySelectorAll('.contact-info p');
    phoneNumbers.forEach(p => {
        if (p.textContent.includes('+1')) {
            p.style.cursor = 'pointer';
            p.style.textDecoration = 'underline';
            p.addEventListener('click', function() {
                const phoneNumber = this.textContent.replace(/\s/g, '');
                window.location.href = `tel:${phoneNumber}`;
                showNotification(`Calling ${phoneNumber}...`, 'info');
            });
        }
    });
}

// ======================
// PERFORMANCE OPTIMIZATIONS
// ======================
function optimizeImages() {
    // Lazy load images that are not in viewport
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// ======================
// ACCESSIBILITY ENHANCEMENTS
// ======================
function initAccessibility() {
    // Add ARIA labels for better screen reader support
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Service option ${index + 1}: ${card.querySelector('h3').textContent}`);
        
        // Keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add ARIA labels to dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.setAttribute('role', 'menuitem');
        item.setAttribute('tabindex', '0');
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus management
    const focusableElements = document.querySelectorAll('button, a, input, [tabindex="0"]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #f4a261';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// ======================
// ERROR HANDLING
// ======================
function initErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('Student Services page error:', e.error);
        showNotification('An error occurred. Please refresh the page.', 'error');
    });
    
    // Handle image load errors
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
            console.log('Image failed to load:', this.src);
        });
    });
}

// ======================
// SHOW NOTIFICATION FUNCTION (ENHANCED)
// ======================
function showNotification(message, type = 'success') {
    // Remove existing notifications to prevent stacking
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#28a745',
        info: '#17a2b8', 
        error: '#dc3545',
        warning: '#ffc107'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ======================
// LOADING STATES (NEW FEATURE)
// ======================
function showLoadingState(element, loadingText = 'Loading...') {
    if (!element) return;
    
    const originalText = element.textContent;
    const originalCursor = document.body.style.cursor;
    
    element.textContent = loadingText;
    element.disabled = true;
    document.body.style.cursor = 'wait';
    
    return function hideLoading() {
        element.textContent = originalText;
        element.disabled = false;
        document.body.style.cursor = originalCursor;
    };
}

// ======================
// ANALYTICS TRACKING (OPTIONAL)
// ======================
function trackUserInteraction(action, category, label) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: 1
        });
    }
    
    // Console log for development
    console.log(`Analytics: ${action} - ${category} - ${label}`);
}

// ======================
// STUDENT SERVICES INITIALIZATION
// ======================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Student Services Hub JavaScript loaded!');
    
    // Initialize all Student Services specific functionality
    try {
        initServiceCards();
        initQuickAccessIcons();
        initNewsletterSignup();
        initSocialInteractions();
        initEventsBanner();
        initSuccessStories();
        initViewMoreButton();
        initBreadcrumb();
        initContactInfo();
        optimizeImages();
        initAccessibility();
        initErrorHandling();
        
        console.log('All Student Services features initialized successfully!');
        
        // Track page load
        trackUserInteraction('page_load', 'student_services', 'hub');
        
    } catch (error) {
        console.error('Error initializing Student Services:', error);
        showNotification('Some features may not work properly. Please refresh the page.', 'error');
    }
});

// ======================
// UTILITY FUNCTIONS
// ======================

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        trackUserInteraction('scroll_to_section', 'navigation', sectionId);
    }
}

// Format phone number for display
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phone;
}

// Check if user is on mobile device
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Animate number counting
function animateNumber(element, target, duration = 1000) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ======================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ======================
window.StudentServices = {
    scrollToSection,
    formatPhoneNumber,
    isMobileDevice,
    animateNumber,
    showNotification,
    showLoadingState,
    trackUserInteraction,
    debounce,
    isInViewport,
    safeRedirect
};

// ======================
// KEYBOARD SHORTCUTS (BONUS FEATURE)
// ======================
document.addEventListener('keydown', function(e) {
    // Alt + C opens career dropdown
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        const careerIcon = document.querySelector('[data-dropdown="career"]');
        if (careerIcon) {
            careerIcon.click();
        }
    }
    
    // Alt + E opens events dropdown  
    if (e.altKey && e.key === 'e') {
        e.preventDefault();
        const eventsIcon = document.querySelector('[data-dropdown="events"]');
        if (eventsIcon) {
            eventsIcon.click();
        }
    }
    
    // Escape closes all dropdowns
    if (e.key === 'Escape') {
        const activeDropdowns = document.querySelectorAll('.quick-icon-dropdown.active');
        activeDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

console.log('Student Services JavaScript fully loaded with career page integration! 🚀');