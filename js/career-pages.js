// ======================
// CAREER PAGES SHARED JAVASCRIPT
// ======================

// ======================
// UTILITY FUNCTIONS
// ======================

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification function
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
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Create sample PDF download
function createSamplePDFDownload(filename, title) {
    // Create a simple base64 encoded PDF
    const pdfContent = `JVBERi0xLjcKCjEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL091dGxpbmVzIDIgMCBSCi9QYWdlcyAzIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKL1R5cGUgL091dGxpbmVzCi9Db3VudCAwCj4+CmVuZG9iagoKMyAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDEKL0tpZHMgWzQgMCBSXQo+PgplbmRvYmoKCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAzIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA5IDAgUgo+Pgo+PgovTWVkaWFCb3ggWzAuMDAwIDAuMDAwIDYxMi4wMDAgNzkyLjAwMF0KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iagoKNSAwIG9iago8PAovTGVuZ3RoIDQ0Cj4+CnN0cmVhbQpCVAovRjEgMTggVGYKNTAgNzUwIFRkCigoJHt0aXRsZX0pIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDc0IDAwMDAwIG4gCjAwMDAwMDAxMjAgMDAwMDAgbiAKMDAwMDAwMDE3OSAwMDAwMCBuIAowMDAwMDAwMzY0IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNgovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDU2CiUlRU9G`;
    
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${pdfContent}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ======================
// CAREER CORNER NEWS FUNCTIONALITY
// ======================
function initCareerCornerNews() {
    // Newsletter subscription form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('.email-input');
        const subscribeBtn = newsletterForm.querySelector('.subscribe-btn');

        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            if (validateEmail(email)) {
                subscribeBtn.textContent = 'Subscribed!';
                subscribeBtn.style.background = '#28a745';
                emailInput.value = '';
                
                setTimeout(() => {
                    subscribeBtn.textContent = 'Subscribe Now';
                    subscribeBtn.style.background = '';
                }, 3000);
                
                showNotification('Successfully subscribed to Career Corner News!', 'success');
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }

    // Download button
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            this.textContent = 'Downloading...';
            
            // Simulate download
            setTimeout(() => {
                this.textContent = 'Download Document';
                showNotification('Newsletter downloaded successfully!', 'success');
                createSamplePDFDownload('Career-Corner-News-Latest.pdf', 'Career Corner News - Sample Issue');
            }, 1000);
        });
    }
}

// ======================
// CAREER COUNSELING FUNCTIONALITY
// ======================
function initCareerCounseling() {
    const calendlyBtn = document.getElementById('calendly-redirect');
    
    if (calendlyBtn) {
        calendlyBtn.addEventListener('click', function() {
            // Show loading state
            this.textContent = 'Redirecting to Calendly...';
            this.style.background = '#666';
            
            // Redirect to Calendly after a short delay
            setTimeout(() => {
                window.open('https://calendly.com', '_blank');
                
                // Reset button after redirect
                setTimeout(() => {
                    this.textContent = 'Book Meeting on Calendly';
                    this.style.background = '';
                }, 1000);
            }, 500);
        });
    }
}

// ======================
// INTERN OPPORTUNITIES FUNCTIONALITY
// ======================
function initInternOpportunities() {
    const downloadBtn = document.getElementById('download-booklet');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            this.textContent = 'Downloading...';
            this.style.background = '#666';
            
            // Simulate download
            setTimeout(() => {
                this.textContent = 'Download Current Booklet';
                this.style.background = '';
                showNotification('Internship booklet downloaded successfully!', 'success');
                createSamplePDFDownload('Internship-Opportunities-Booklet.pdf', 'Internship Opportunities Booklet');
            }, 1000);
        });
    }
}

// ======================
// CAREER RESOURCES FUNCTIONALITY
// ======================
function initCareerResources() {
    const downloadBtn = document.getElementById('download-guide');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            this.textContent = 'Downloading...';
            this.style.background = '#666';
            
            // Simulate download
            setTimeout(() => {
                this.textContent = 'Download Career Guide';
                this.style.background = '';
                showNotification('Career guide downloaded successfully!', 'success');
                createSamplePDFDownload('BAU-Complete-Career-Guide.pdf', 'Complete Career Guide');
            }, 1000);
        });
    }

    // Add click tracking for external links
    const resourceLinks = document.querySelectorAll('.resource-links a');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function() {
            const siteName = this.textContent;
            showNotification(`Opening ${siteName}...`, 'info');
        });
    });
}

// ======================
// SHARED FUNCTIONALITY FOR ALL CAREER PAGES
// ======================
function initSharedFeatures() {
    // Breadcrumb navigation
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === 'index.html' || href === 'student-services.html') {
                e.preventDefault();
                showNotification('Navigating...', 'info');
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });

    // Contact info interactions
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

    // Social media links
    const socialIcons = document.querySelectorAll('.footer-social-icon, .social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Social media integration coming soon!', 'info');
        });
    });
}

// ======================
// ACCESSIBILITY ENHANCEMENTS
// ======================
function initAccessibility() {
    // Add keyboard navigation for buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        
        button.addEventListener('keydown', function(e) {
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
        console.error('Career page error:', e.error);
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
// MAIN INITIALIZATION
// ======================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Career pages JavaScript loaded!');
    
    try {
        // Initialize shared features
        initSharedFeatures();
        initAccessibility();
        initErrorHandling();
        
        // Initialize page-specific features based on current page
        const currentPage = window.location.pathname.split('/').pop();
        
        switch(currentPage) {
            case 'career-corner-news.html':
                initCareerCornerNews();
                console.log('Career Corner News initialized');
                break;
            case 'career-counseling.html':
                initCareerCounseling();
                console.log('Career Counseling initialized');
                break;
            case 'intern-opportunities.html':
                initInternOpportunities();
                console.log('Intern Opportunities initialized');
                break;
            case 'career-resources.html':
                initCareerResources();
                console.log('Career Resources initialized');
                break;
            default:
                console.log('General career page features loaded');
        }
        
        console.log('All career page features initialized successfully!');
        
    } catch (error) {
        console.error('Error initializing career pages:', error);
        showNotification('Some features may not work properly. Please refresh the page.', 'error');
    }
});

// ======================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ======================
window.CareerPages = {
    validateEmail,
    showNotification,
    createSamplePDFDownload,
    initCareerCornerNews,
    initCareerCounseling,
    initInternOpportunities,
    initCareerResources
};

console.log('Career pages JavaScript fully loaded!');