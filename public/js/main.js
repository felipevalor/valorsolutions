/**
 * Valor Solutions - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initScrambleText();
    initScrollReveal();
    initMagneticButtons();
    initParallaxEffect();
    initCounters();
    initContactForm();
    initNavScroll();
    initBadges();
    initMobileMenu();
    initFaq();
});

/**
 * Custom Cursor
 */
function initCustomCursor() {
    if (window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches) {
        document.getElementById('custom-cursor').style.display = 'none';
        return;
    }

    const cursor = document.getElementById('custom-cursor');
    const point = cursor.querySelector('.cursor-point');
    const ring = cursor.querySelector('.cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        point.style.left = `${mouseX}px`;
        point.style.top = `${mouseY}px`;

        // Hide if over text input/textarea
        const target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
            cursor.style.opacity = '0';
        } else {
            cursor.style.opacity = '1';
        }
    });

    // Lerp for the ring
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;

        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover states
    const interactive = document.querySelectorAll('a, button, .magnetic, .card');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            point.style.width = '16px';
            point.style.height = '16px';
            ring.style.width = '48px';
            ring.style.height = '48px';
        });
        el.addEventListener('mouseleave', () => {
            point.style.width = '8px';
            point.style.height = '8px';
            ring.style.width = '28px';
            ring.style.height = '28px';
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        point.style.transform = 'translate(-50%, -50%) scale(0.5)';
        setTimeout(() => {
            point.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
    });
}

/**
 * Headline Fade Transition
 */
function initScrambleText() {
    const el = document.getElementById('scramble-headline');
    if (!el) return;

    const phrases = [
        "Tecnología que tiene sentido para tu negocio.",
        "Convertimos ideas en productos.",
        "Build, ship, iterate. Sin excusas.",
        "Construimos productos. No páginas bonitas.",
        "De la servilleta al producto en semanas."
    ];

    let counter = 0;

    el.style.transition = 'opacity 0.5s ease';

    const next = () => {
        el.style.opacity = '0';

        setTimeout(() => {
            el.textContent = phrases[counter];
            el.setAttribute('aria-label', phrases[counter]);
            counter = (counter + 1) % phrases.length;
            el.style.opacity = '1';
            setTimeout(next, 4500);
        }, 500);
    };

    next();
}

/**
 * Scroll Reveal & Stagger
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                // Handle staggered children
                const staggered = el.querySelectorAll('.card, .stack-list span, .form-group, .metric');
                if (staggered.length > 0) {
                    staggered.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 60}ms`;
                        child.classList.add('reveal-active');
                    });
                }

                el.classList.add('reveal-active');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'opacity 280ms cubic-bezier(0.16, 1, 0.3, 1), transform 280ms cubic-bezier(0.16, 1, 0.3, 1)';

                observer.unobserve(el);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Magnetic Buttons (disabled)
 */
function initMagneticButtons() {}

/**
 * Parallax Effect
 */
function initParallaxEffect() {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const grid = document.querySelector('.hero-grid');
    const headline = document.getElementById('scramble-headline');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        requestAnimationFrame(() => {
            if (grid) grid.style.transform = `translateY(${scrolled * 0.2}px)`;
            if (headline) headline.style.transform = `translateY(${scrolled * 0.05}px)`;
        });
    });
}

/**
 * Animated Counters
 */
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const suffix = el.getAttribute('data-suffix') || '';
                animateValue(el, 0, target, 800, suffix);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.metric-value').forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 4); // easeOutExpo
        const val = Math.floor(easedProgress * (end - start) + start);
        obj.innerHTML = val + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Navigation Scroll Effect
 */
function initNavScroll() {
    const nav = document.getElementById('header-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/**
 * Contact Form
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;

        // State: Loading
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
        submitBtn.classList.add('btn--loading');
        submitBtn.innerText = 'Enviando...';
        status.className = 'form-status';
        status.innerText = '';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                status.classList.add('success');
                status.innerText = '¡Mensaje recibido!';
                form.reset();
            } else {
                throw new Error(result.error || 'Algo salió mal');
            }
        } catch (err) {
            status.classList.add('error');
            status.innerText = `Error: ${err.message}. Intentá de nuevo.`;
        } finally {
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-busy');
            submitBtn.classList.remove('btn--loading');
            submitBtn.innerText = originalText;
        }
    });
}

/**
 * Badges logic
 */
function initBadges() {
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        if (badge.innerText.toLowerCase().includes('live')) {
            badge.classList.add('live');
        }
    });
}

/**
 * FAQ Accordion
 */
function initFaq() {
    const questions = document.querySelectorAll('.faq-question');

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            questions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                const ans = q.nextElementSibling;
                ans.classList.remove('open');
                ans.setAttribute('hidden', '');
            });
        }
    });

    questions.forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            // Close all
            questions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                const ans = q.nextElementSibling;
                ans.classList.remove('open');
                ans.setAttribute('hidden', '');
            });
            // Open clicked (unless it was already open)
            if (!expanded) {
                btn.setAttribute('aria-expanded', 'true');
                const answer = btn.nextElementSibling;
                answer.classList.add('open');
                answer.removeAttribute('hidden');
            }
        });
    });
}

/**
 * Mobile Menu Logic
 */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (!toggle) return;

    const closeMenu = () => {
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('open');
        toggle.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(!isOpen));
        navLinks.classList.toggle('open');
        document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Escape key closes menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            closeMenu();
            toggle.focus();
        }
    });

    // Focus trap when menu is open
    navLinks.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !navLinks.classList.contains('open')) return;
        const focusable = [...navLinks.querySelectorAll('a')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });
}
