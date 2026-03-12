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
 * Scramble Text Effect
 */
class ScrambleText {
    constructor(el) {
        this.el = el;
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.update = this.update.bind(this);
    }

    scramble(text) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, text.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = text[i] || '';
            const start = Math.floor(Math.random() * 120);
            const end = start + Math.floor(Math.random() * 80);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.12) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

function initScrambleText() {
    const el = document.getElementById('scramble-headline');
    if (!el) return;

    const phrases = [
        "Del problema al producto.",
        "Convertimos ideas en productos.",
        "El producto que imaginás, construido a tu medida.",
        "Build, ship, iterate. Sin excusas.",
        "Construimos productos. No páginas bonitas.",
        "De la servilleta al producto en semanas."
    ];

    const fx = new ScrambleText(el);
    let counter = 0;

    const next = () => {
        fx.scramble(phrases[counter]).then(() => {
            setTimeout(next, 4500);
        });
        counter = (counter + 1) % phrases.length;
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
 * Magnetic Buttons
 */
function initMagneticButtons() {
    if (window.matchMedia("(hover: none)").matches) return;

    const buttons = document.querySelectorAll('.magnetic');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'none';
        });
    });
}

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
 * Mobile Menu Logic
 */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}
