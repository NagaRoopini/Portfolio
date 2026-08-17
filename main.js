document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // CURSOR GLOW EFFECT
    // ==========================================

    const cursorGlow = document.querySelector('.cursor-glow');

    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }


    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================

    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {

            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

        });
    }


    // ==========================================
    // REVEAL ANIMATIONS
    // ==========================================

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


    const revealElements = document.querySelectorAll(
        '.reveal-text, .reveal-scale, .skill-card, .project-card'
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });


    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute('href')
            );

            if (target) {

                target.scrollIntoView({
                    behavior: 'smooth'
                });

                document
                    .querySelectorAll('.nav-links a')
                    .forEach(link => {
                        link.classList.remove('active');
                    });

                this.classList.add('active');
            }

        });

    });


    // ==========================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================

    window.addEventListener('scroll', () => {

        let current = '';

        const sections = document.querySelectorAll('section');

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }

        });


        document
            .querySelectorAll('.nav-links a')
            .forEach(link => {

                link.classList.remove('active');

                if (
                    link.getAttribute('href').includes(current)
                ) {
                    link.classList.add('active');
                }

            });

    });


    // ==========================================
    // EMAILJS CONTACT FORM
    // ==========================================

    const contactForm =
        document.getElementById('contact-form');


    if (contactForm) {

        contactForm.addEventListener('submit', async function (e) {

            e.preventDefault();

            const button =
                contactForm.querySelector('button');

            const originalText =
                button.innerText;


            // Disable button

            button.disabled = true;

            button.innerText = 'Sending...';


            try {

                // Send form through EmailJS

                await emailjs.sendForm(
                    'YOUR_SERVICE_ID',
                    'YOUR_TEMPLATE_ID',
                    contactForm
                );


                // SUCCESS

                button.innerText = 'Message Sent!';

                button.style.background =
                    'linear-gradient(135deg, #10b981, #059669)';


                showFormAlert(
                    'Success',
                    'Your message has been sent successfully!'
                );


                // Clear form

                contactForm.reset();


                // Restore button

                setTimeout(() => {

                    button.innerText =
                        originalText;

                    button.style.background = '';

                    button.disabled = false;

                }, 5000);


            } catch (error) {

                // ERROR

                console.error(
                    'EmailJS Error:',
                    error
                );


                button.innerText =
                    'Error! Try Again';

                button.style.background =
                    'linear-gradient(135deg, #ef4444, #dc2626)';

                button.disabled = false;


                showFormAlert(
                    'Error',
                    'Something went wrong. Please try again or email directly at roopini.812@gmail.com.'
                );


                setTimeout(() => {

                    button.innerText =
                        originalText;

                    button.style.background = '';

                }, 5000);

            }

        });

    }


    // ==========================================
    // FORM ALERT
    // ==========================================

    function showFormAlert(type, message) {

        const existing =
            document.querySelector('.form-alert');

        if (existing) {
            existing.remove();
        }


        const alertDiv =
            document.createElement('div');


        alertDiv.className =
            `form-alert ${type.toLowerCase()}`;


        alertDiv.innerHTML = `

            <div class="alert-content">

                <i class="${
                    type === 'Success'
                        ? 'fa-solid fa-circle-check'
                        : 'fa-solid fa-triangle-exclamation'
                }"></i>

                <div style="flex-grow: 1;">

                    <h4 style="
                        margin: 0 0 5px 0;
                        font-family: 'Outfit', sans-serif;
                    ">
                        ${type}
                    </h4>

                    <p style="
                        margin: 0;
                        font-size: 0.9rem;
                        line-height: 1.4;
                    ">
                        ${message}
                    </p>

                </div>

                <button
                    class="alert-close"
                    style="
                        background:none;
                        border:none;
                        color:var(--text-muted);
                        cursor:pointer;
                        font-size:1.2rem;
                    "
                    type="button">

                    &times;

                </button>

            </div>
        `;


        document.body.appendChild(alertDiv);


        setTimeout(() => {

            alertDiv.classList.add('fade-out');

            setTimeout(() => {
                alertDiv.remove();
            }, 500);

        }, 8000);


        const closeButton =
            alertDiv.querySelector('.alert-close');


        closeButton.addEventListener(
            'click',
            () => {
                alertDiv.remove();
            }
        );

    }


    // ==========================================
    // MOBILE MENU
    // ==========================================

    const mobileBtn =
        document.querySelector('.mobile-menu-btn');

    const navLinks =
        document.querySelector('.nav-links');


    if (mobileBtn && navLinks) {

        mobileBtn.addEventListener('click', () => {

            navLinks.style.display =
                navLinks.style.display === 'flex'
                    ? 'none'
                    : 'flex';


            if (navLinks.style.display === 'flex') {

                navLinks.style.flexDirection =
                    'column';

                navLinks.style.position =
                    'absolute';

                navLinks.style.top =
                    '80px';

                navLinks.style.left =
                    '0';

                navLinks.style.width =
                    '100%';

                navLinks.style.background =
                    'rgba(15, 23, 42, 0.95)';

                navLinks.style.padding =
                    '40px';

                navLinks.style.backdropFilter =
                    'blur(10px)';
            }

        });

    }

});
