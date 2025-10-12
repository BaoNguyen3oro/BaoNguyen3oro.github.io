/**
 * Factory.ai-Inspired Theme JavaScript
 * Handles animations, scroll effects, and interactive elements
 */

(function() {
  'use strict';

  // ============================================
  // 1. SMOOTH SCROLL FOR NAVIGATION LINKS
  // ============================================
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.factory-nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only handle anchor links
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.factory-nav-menu');
            if (mobileMenu) {
              mobileMenu.classList.remove('active');
            }
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Update active state
            updateActiveNavLink(href);
          }
        }
      });
    });
  }

  // ============================================
  // 2. UPDATE ACTIVE NAVIGATION LINK ON SCROLL
  // ============================================
  function updateActiveNavLink(activeHref) {
    const navLinks = document.querySelectorAll('.factory-nav-link');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === activeHref) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });
      
      if (current) {
        updateActiveNavLink('#' + current);
      }
    });
  }

  // ============================================
  // 3. HEADER SCROLL EFFECT
  // ============================================
  function initHeaderScroll() {
    const header = document.querySelector('.factory-header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ============================================
  // 4. MOBILE MENU TOGGLE
  // ============================================
  function initMobileMenu() {
    const menuToggle = document.querySelector('.factory-menu-toggle');
    const navMenu = document.querySelector('.factory-nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.factory-nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }

  // ============================================
  // 5. SCROLL ANIMATIONS
  // ============================================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.factory-scroll-animate');
    
    if (!animatedElements.length) return;
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
  }

  // ============================================
  // 6. CARD HOVER EFFECTS
  // ============================================
  function initCardHoverEffects() {
    const cards = document.querySelectorAll('.factory-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  // ============================================
  // 7. INITIALIZE ALL FEATURES
  // ============================================
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    initSmoothScroll();
    initScrollSpy();
    initHeaderScroll();
    initMobileMenu();
    initScrollAnimations();
    initCardHoverEffects();
    
    console.log('Factory.ai theme initialized');
  }

  // Start initialization
  init();

})();
