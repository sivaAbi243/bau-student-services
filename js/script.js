// ======================
// SCROLL ANIMATION OBSERVER
// ======================
function createScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal classes
    const elementsToReveal = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-fade');
    elementsToReveal.forEach(element => {
        observer.observe(element);
    });
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
// PARALLAX SCROLLING (OPTIMIZED)
// ======================
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translate3d(0, ${speed}px, 0)`;
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// ======================
// HOVER EFFECTS
// ======================
function initHoverEffects() {
    // Add hover effects for club cards
    document.querySelectorAll('.club-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ======================
// BUTTON INTERACTIONS (UPDATED)
// ======================
function initButtonInteractions() {
    // Add click handlers for buttons
    document.querySelectorAll('.find-club-btn, .register-btn, .view-more-btn, .elections-btn, .apply-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Don't prevent default for buttons with onclick handlers
            if (!this.hasAttribute('onclick')) {
                e.preventDefault();
            }
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Add some feedback for button clicks
            if (this.classList.contains('register-btn')) {
                // Register buttons now redirect to registration page
                const eventCard = this.closest('.event-card');
                if (eventCard) {
                    const eventTitle = eventCard.querySelector('.event-title').textContent;
                    const eventDate = eventCard.querySelector('.event-date').textContent;
                    
                    const eventName = encodeURIComponent(eventTitle);
                    const eventDateParam = encodeURIComponent(eventDate);
                    
                    window.location.href = `registration.html?event=${eventName}&date=${eventDateParam}`;
                }
            } else if (this.classList.contains('find-club-btn')) {
                alert('Club finder functionality would be implemented here!');
            } else if (this.classList.contains('view-more-btn')) {
                // This now redirects to all-events.html via onclick
                console.log('Redirecting to all events page');
            } else if (this.classList.contains('elections-btn')) {
                // This redirects to elections.html via onclick
                console.log('Redirecting to elections page');
            } else if (this.classList.contains('apply-btn')) {
                // This redirects to elections.html via onclick
                console.log('Redirecting to elections application page');
            }
        });
    });
}

// ======================
// SIDE NAVIGATION UPDATES
// ======================
function initSideNavigation() {
    // Add click handlers for side navigation
    document.querySelectorAll('.side-nav-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Navigation is now handled by onclick attributes in HTML
            // But we can add additional functionality here if needed
            const itemClass = this.classList[1]; // Gets the specific class (benefits, member, chat)
            console.log(`Navigating to ${itemClass} page`);
        });
    });
}

// ======================
// STATS ANIMATION
// ======================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + '+';
        }, 50);
    });
}

// ======================
// STATS OBSERVER
// ======================
function initStatsObserver() {
    // Trigger stats animation when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ======================
// DROPDOWN FUNCTIONALITY
// ======================
function initDropdowns() {
    document.querySelectorAll('.selector-dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            // This would typically open a dropdown menu
            // For now, just provide visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            console.log('Dropdown clicked:', this.textContent);
        });
    });
}

// ======================
// SOCIAL ICONS
// ======================
function initSocialIcons() {
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Visual feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Determine which social platform
            const iconText = this.textContent.toLowerCase();
            let platform = '';
            
            switch(iconText) {
                case 'f':
                    platform = 'Facebook';
                    break;
                case '@':
                    platform = 'Twitter/X';
                    break;
                case 'in':
                    platform = 'LinkedIn';
                    break;
                case 'x':
                    platform = 'Twitter/X';
                    break;
                default:
                    platform = 'Social Media';
            }
            
            console.log(`${platform} link clicked`);
            // In a real implementation, you would redirect to the actual social media pages
        });
    });
}

// ======================
// NAVIGATION ENHANCEMENTS (NEW)
// ======================
function initNavigationEnhancements() {
    // Smooth scroll for anchor links within the page
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
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === 'index.html' && linkPage === '#') ||
            (currentPage === '' && linkPage === '#')) {
            link.classList.add('active');
        }
    });
}

// ======================
// RESPONSIVE MENU TOGGLE
// ======================
function initMobileMenu() {
    // This function can be expanded to handle mobile menu toggle
    // For now, it just handles window resize events
    
    function handleResize() {
        const sideNav = document.querySelector('.side-nav');
        if (window.innerWidth <= 768) {
            if (sideNav) {
                sideNav.style.display = 'none';
            }
        } else {
            if (sideNav) {
                sideNav.style.display = 'block';
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load
}

// ======================
// FORM VALIDATION (for future use)
// ======================
function initFormValidation() {
    // This function can be used when adding contact forms or other forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation logic here
            console.log('Form submitted:', this);
            
            // Show success message
            alert('Form submitted successfully!');
        });
    });
}

// ======================
// PERFORMANCE MONITORING
// ======================
function initPerformanceMonitoring() {
    // Monitor scroll performance
    let scrollCount = 0;
    let lastScrollTime = Date.now();
    
    window.addEventListener('scroll', () => {
        scrollCount++;
        const currentTime = Date.now();
        
        // Log scroll performance every 100 scrolls
        if (scrollCount % 100 === 0) {
            const timeDiff = currentTime - lastScrollTime;
            console.log(`Scroll performance: ${scrollCount} scrolls in ${timeDiff}ms`);
            lastScrollTime = currentTime;
        }
    }, { passive: true });
}

// ======================
// ERROR HANDLING
// ======================
function initErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // In production, you might want to send this to an error tracking service
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        // In production, you might want to send this to an error tracking service
    });
}

// ======================
// ACCESSIBILITY FEATURES
// ======================
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals or overlays
        if (e.key === 'Escape') {
            // Close any open modals
            console.log('Escape key pressed');
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            // Ensure proper tab order
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class when mouse is used
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ======================
// INITIALIZATION (UPDATED)
// ======================
document.addEventListener('DOMContentLoaded', function() {
    console.log('SGA Website JavaScript loaded successfully!');
    
    // Initialize all functionality
    createScrollObserver();
    initSmoothScrolling();
    initHoverEffects();
    initButtonInteractions(); // Updated function
    initSideNavigation();
    initStatsObserver();
    initDropdowns();
    initSocialIcons();
    initMobileMenu();
    initFormValidation();
    initPerformanceMonitoring();
    initErrorHandling();
    initAccessibility();
    initNavigationEnhancements(); // New function
    
    // Initialize optimized parallax scrolling
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    
    console.log('All SGA website features initialized!');
});

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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
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

// Smooth animation utility
function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Get random number between min and max
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ======================
// ADDITIONAL FEATURES
// ======================

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Dark mode toggle (for future implementation)
function initDarkMode() {
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });
        
        // Load saved preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Search functionality (for future implementation)
function initSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');
    
    if (searchInput) {
        const debouncedSearch = debounce((query) => {
            if (query.length > 2) {
                // Perform search
                console.log('Searching for:', query);
                // In a real implementation, you would search through content
                // and display results in searchResults
            }
        }, 300);
        
        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });
    }
}

// Cookie consent (for future implementation)
function initCookieConsent() {
    const cookieBanner = document.querySelector('#cookie-banner');
    const acceptCookies = document.querySelector('#accept-cookies');
    
    if (cookieBanner && acceptCookies) {
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieBanner.style.display = 'block';
        }
        
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }
}

// Analytics tracking (for future implementation)
function initAnalytics() {
    // Track page views
    console.log('Page view tracked:', window.location.pathname);
    
    // Track button clicks
    document.querySelectorAll('button, .btn').forEach(button => {
        button.addEventListener('click', () => {
            console.log('Button clicked:', button.textContent || button.className);
        });
    });
    
    // Track external link clicks
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('External link clicked:', link.href);
        });
    });
}

// ======================
// BROWSER COMPATIBILITY
// ======================

// Check for browser support
function checkBrowserSupport() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        requestAnimationFrame: 'requestAnimationFrame' in window,
        localStorage: 'localStorage' in window,
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid')
    };
    
    console.log('Browser feature support:', features);
    
    // Add polyfills or fallbacks for unsupported features
    if (!features.intersectionObserver) {
        console.warn('IntersectionObserver not supported, scroll animations may not work');
    }
}

// ======================
// FINAL INITIALIZATION
// ======================

// Run additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check browser compatibility
    checkBrowserSupport();
    
    // Initialize additional features
    initLazyLoading();
    initDarkMode();
    initSearch();
    initCookieConsent();
    initAnalytics();
    
    console.log('All additional features initialized!');
});

// ======================
// EXPORT FOR TESTING
// ======================

// Export functions for testing (if in module environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        isInViewport,
        animateValue,
        random,
        formatNumber
    };
}