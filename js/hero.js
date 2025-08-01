// Hero section JavaScript only
        function initHeroSection() {
            // Create floating particles
            function createParticles() {
                const particlesContainer = document.getElementById('particles');
                if (!particlesContainer) return;
                
                const particleCount = 30;

                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    
                    // Random starting position
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 15 + 's';
                    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                    
                    particlesContainer.appendChild(particle);
                }
            }

            // Add interactivity to the code window
            const codeWindow = document.querySelector('.code-window');
            if (codeWindow) {
                codeWindow.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
                });

                codeWindow.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                });
            }

            // Parallax effect for hero content
            function handleParallax() {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.hero-visual');
                const speed = scrolled * 0.5;
                
                if (parallax && scrolled < window.innerHeight) {
                    parallax.style.transform = `translateY(${speed}px)`;
                }
            }

            // Smooth scrolling for CTA buttons
            function initSmoothScrolling() {
                const heroCtaButtons = document.querySelectorAll('.hero a[href^="#"]');
                heroCtaButtons.forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
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

            // Initialize all hero features
            createParticles();
            initSmoothScrolling();
            window.addEventListener('scroll', handleParallax);
        }

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initHeroSection);
        } else {
            initHeroSection();
        }