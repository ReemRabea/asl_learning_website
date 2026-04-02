/* =============================================
   Gesture Landing Page – JS
   ============================================= */

// ---- Navbar scroll effect ----
const nav = document.getElementById('landing-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ---- Hamburger / Mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ---- Scroll-triggered fade-up animations ----
const fadeElements = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target); // animate once
        }
    });
}, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// Trigger hero elements immediately (they're in viewport on load)
window.addEventListener('load', () => {
    document.querySelectorAll('.hero-content .fade-up, .scroll-indicator').forEach(el => {
        el.classList.add('visible');
    });
});

// ---- Contact form (simple UX feedback) ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('contact-submit');
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = 'Send Message';
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
