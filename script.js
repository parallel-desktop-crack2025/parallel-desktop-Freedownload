/**
 * SoftsMac Landing Page JavaScript
 * Enhanced animations and interactivity
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
    // Initialize all features
    initParticleSystem();
    initScrollAnimations();
    initButtonAnimations();
    initHeaderScrollEffect();
    initSmoothScrolling();
    
    console.log('SoftsMac Landing Page Loaded Successfully!');
});

/**
 * Particle System
 * Creates floating particles for background animation
 */
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = window.innerWidth > 768 ? 50 : 25;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    // Create new particles periodically
    setInterval(() => {
        if (document.querySelectorAll('.particle').length < particleCount) {
            createParticle(particlesContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 6 + 2; // 2-8px
    const startX = Math.random() * window.innerWidth;
    const drift = (Math.random() - 0.5) * 200; // -100 to 100px drift
    const duration = Math.random() * 15 + 15; // 15-30s
    const delay = Math.random() * 5; // 0-5s delay
    
    // Apply styles
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = startX + 'px';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    particle.style.setProperty('--drift', drift + 'px');
    
    // Add glowing effect to some particles
    if (Math.random() > 0.7) {
        particle.style.background = 'rgba(102, 126, 234, 0.3)';
        particle.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.5)';
    }
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

/**
 * Scroll Animations
 * Handles fade-in animations on scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Button Animations
 * Enhanced button interactions and effects
 */
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        // Magnetic hover effect
        button.addEventListener('mousemove', function(e) {
            createMagneticEffect(e, this);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Learn More button scroll behavior
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple-effect';
    
    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function createMagneticEffect(event, button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (event.clientX - centerX) * 0.1;
    const deltaY = (event.clientY - centerY) * 0.1;
    
    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

/**
 * Header Scroll Effect
 * Changes header appearance on scroll
 */
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide/show header based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Smooth Scrolling
 * Enhanced smooth scrolling for better UX
 */
function initSmoothScrolling() {
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/**
 * Dynamic CSS Animations
 * Add dynamic keyframes for ripple effect
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate {
        animation-play-state: running !important;
    }
    
    /* Enhanced particle animations */
    .particle:nth-child(3n) {
        background: linear-gradient(45deg, rgba(102, 126, 234, 0.2), rgba(116, 75, 162, 0.2));
    }
    
    .particle:nth-child(3n+1) {
        background: linear-gradient(45deg, rgba(74, 172, 254, 0.2), rgba(0, 242, 254, 0.2));
    }
    
    .particle:nth-child(3n+2) {
        background: linear-gradient(45deg, rgba(240, 147, 251, 0.2), rgba(245, 87, 108, 0.2));
    }
`;
document.head.appendChild(style);

/**
 * Performance Optimization
 * Throttle scroll events for better performance
 */
function throttle(func, wait) {
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

/**
 * Responsive Particle Count
 * Adjust particle count based on device performance
 */
function getOptimalParticleCount() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Reduce particles on smaller screens and high DPI displays
    if (width < 768) return 15;
    if (pixelRatio > 2) return 30;
    if (width > 1920) return 60;
    return 40;
}

/**
 * Error Handling
 * Graceful fallbacks for unsupported features
 */
window.addEventListener('error', function(e) {
    console.warn('Non-critical error:', e.message);
    // Continue execution - don't let small errors break the experience
});

/**
 * Accessibility Enhancements
 * Respect user preferences
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-normal', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

/**
 * Touch Device Optimizations
 * Enhanced experience for touch devices
 */
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch-specific styles
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        .touch-device .cta-button:hover {
            transform: none;
        }
        
        .touch-device .cta-button:active {
            transform: scale(0.98);
        }
        
        .touch-device .feature-card:hover {
            transform: none;
        }
    `;
    document.head.appendChild(touchStyle);
}
