document.addEventListener('DOMContentLoaded', () => {
    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .reveal-scale, .skill-card, .project-card');
    revealElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Active Link on Scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
    
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
    
            btn.innerText = 'Sending...';
            btn.disabled = true;
    
            try {
                const formData = new FormData(contactForm);
    
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
    
                const result = await response.json();
    
                if (response.ok && result.success !== false) {
                    btn.innerText = 'Message Sent!';
    
                    contactForm.reset();
    
                    showFormAlert(
                        'Success',
                        'Thank you! Your message has been sent successfully.'
                    );
    
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                    }, 5000);
    
                } else {
                    throw new Error(result.message || 'Form submission failed');
                }
    
            } catch (error) {
                console.error('Form submission error:', error);
    
                btn.innerText = 'Error! Try Again';
                btn.disabled = false;
    
                showFormAlert(
                    'Error',
                    'Something went wrong. Please try again or email directly at roopini.812@gmail.com.'
                );
    
                setTimeout(() => {
                    btn.innerText = originalText;
                }, 5000);
            }
        });
    }

    // Mobile Menu Toggle (Simplified)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
                navLinks.style.padding = '40px';
                navLinks.style.backdropFilter = 'blur(10px)';
            }
        });
    }
});
