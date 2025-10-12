/* ============================================
   Factory Theme JavaScript
   Modern interactions and animations
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // 1. SMOOTH SCROLL FOR NAVIGATION
    // ============================================
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '#/') {
                    e.preventDefault();
                    const targetId = href.replace('#/', '').replace('#', '');
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // ============================================
    // 2. HEADER SCROLL EFFECTS
    // ============================================
    function initHeaderScroll() {
        const header = document.querySelector('.factory-header, .header');
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class when page is scrolled
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ============================================
    // 3. INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all elements with scroll-animate class
        const animatedElements = document.querySelectorAll('.factory-scroll-animate');
        animatedElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // 4. MOBILE NAVIGATION TOGGLE
    // ============================================
    function initMobileNav() {
        const menuToggle = document.querySelector('.factory-menu-toggle');
        const navMenu = document.querySelector('.factory-nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }

    // ============================================
    // 5. PARALLAX EFFECT
    // ============================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.factory-parallax');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // ============================================
    // 6. FORM HANDLING
    // ============================================
    function initForms() {
        const forms = document.querySelectorAll('.factory-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Show loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                try {
                    // Add your form submission logic here
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    // Show success message
                    showNotification('Message sent successfully!', 'success');
                    form.reset();
                } catch (error) {
                    showNotification('Error sending message. Please try again.', 'error');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        });
    }

    // ============================================
    // 7. NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `factory-notification factory-notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // ============================================
    // 8. LAZY LOADING IMAGES
    // ============================================
    function initLazyLoad() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // ============================================
    // 9. ACTIVE NAVIGATION HIGHLIGHTING
    // ============================================
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.factory-nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                
                if (href && (href.includes(current) || href === `#/${current}` || href === `#${current}`)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ============================================
    // 10. REMOVE OLD MATRIX/TERMINAL EFFECTS
    // ============================================
    function cleanupOldEffects() {
        // Remove terminal typing effects
        const terminalElements = document.querySelectorAll('.terminal-boot, .terminal-line, .terminal-cursor, .terminal-prompt');
        terminalElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Remove Matrix rain canvas if exists
        const matrixCanvas = document.querySelector('#matrix-rain');
        if (matrixCanvas) {
            matrixCanvas.remove();
        }
        
        // Stop any typing animations
        if (window.typist) {
            window.typist = null;
        }
    }

    // ============================================
    // 11. INITIALIZE EVERYTHING
    // ============================================
    function init() {
        // Clean up old effects first
        cleanupOldEffects();
        
        // Initialize new features
        initSmoothScroll();
        initHeaderScroll();
        initScrollAnimations();
        initMobileNav();
        initParallax();
        initForms();
        initLazyLoad();
        initActiveNav();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export functions for external use
    window.factoryTheme = {
        showNotification,
        init
    };

})();
