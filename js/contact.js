function initContactSection() {
            const form = document.getElementById('contactForm');
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const formMessage = document.getElementById('formMessage');

            // Form submission handler
            form.addEventListener('submit', async function(e) {
                e.preventDefault();

                // Update button state
                submitBtn.disabled = true;
                btnText.textContent = 'Sending...';

                try {
                    const formData = new FormData(form);
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        showMessage('Thanks for your message! I\'ll get back to you soon.', 'success');
                        form.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    showMessage('Oops! There was a problem sending your message. Please try again.', 'error');
                }

                // Reset button state
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
            });

            // Show form message
            function showMessage(message, type) {
                formMessage.textContent = message;
                formMessage.className = `form-message ${type} show`;
                
                setTimeout(() => {
                    formMessage.classList.remove('show');
                }, 5000);
            }

            // Add focus effects to form inputs
            const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
            formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'translateY(-2px)';
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'translateY(0)';
                });
            });

            // Add hover effects to contact methods
            const contactMethods = document.querySelectorAll('.contact-method');
            contactMethods.forEach(method => {
                method.addEventListener('mouseenter', function() {
                    const icon = this.querySelector('.method-icon');
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                });
                
                method.addEventListener('mouseleave', function() {
                    const icon = this.querySelector('.method-icon');
                    icon.style.transform = 'scale(1) rotate(0deg)';
                });
            });

            // Add click analytics for social links (you can customize this)
            const socialLinks = document.querySelectorAll('.social-icon, .contact-method');
            socialLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Add your analytics tracking here
                    console.log('Contact link clicked:', this.getAttribute('href') || this.textContent.trim());
                });
            });

            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, observerOptions);

            // Observe contact sections
            const contactSections = document.querySelectorAll('.contact-form-section, .contact-info');
            contactSections.forEach(section => {
                observer.observe(section);
            });
        }

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initContactSection);
        } else {
            initContactSection();
        }