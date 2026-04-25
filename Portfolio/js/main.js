document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // CUSTOM CURSOR
    // ==========================================
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX - 3 + 'px';
        dot.style.top = mouseY - 3 + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX - 18 + 'px';
        ring.style.top = ringY - 18 + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Cursor hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, .skill-tag, .edu-card, .timeline-content');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    // ==========================================
    // TYPING EFFECT
    // ==========================================
    const typedEl = document.getElementById('typedText');
    const phrases = ['Frontend Developer', 'Flutter Expert', 'Next.js Developer', 'Tech Leader'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typedEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === current.length) {
            typingSpeed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // pause before next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1200);

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Navbar background
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // HAMBURGER MENU
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ==========================================
    // SCROLL REVEAL
    // ==========================================
    const revealElements = document.querySelectorAll(
        '.section-header, .about-text, .about-education, .timeline-item, .skill-category, .footer-content, .edu-card'
    );

    revealElements.forEach((el, i) => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-item');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const numEl = el.querySelector('.stat-number');
                const target = parseInt(el.dataset.target);
                const suffix = el.dataset.suffix || '';
                let count = 0;
                const duration = 1500;
                const step = target / (duration / 16);

                function updateCount() {
                    count += step;
                    if (count >= target) {
                        numEl.textContent = target + suffix;
                    } else {
                        numEl.textContent = Math.floor(count) + suffix;
                        requestAnimationFrame(updateCount);
                    }
                }
                updateCount();
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ==========================================
    // PARTICLES
    // ==========================================
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = (60 + Math.random() * 40) + '%';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (8 + Math.random() * 12) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';

        // Random colors
        const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)', '#fff'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particlesContainer.appendChild(particle);
    }

    // ==========================================
    // SMOOTH SCROLL (for anchor links)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================
    // PARALLAX on hero glows
    // ==========================================
    const glows = document.querySelectorAll('.glow');

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        glows.forEach((glow, i) => {
            const speed = (i + 1) * 15;
            glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ==========================================
    // HIDE SCROLL INDICATOR ON SCROLL
    // ==========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }, { passive: true });
    }

});