function initProjectsSection() {
            // Lazy loading animation observer
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, observerOptions);

            // Observe all project cards
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                observer.observe(card);
            });

            // Add hover effects for tech tags
            const techTags = document.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px) scale(1.05)';
                });
                
                tag.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Add click analytics (you can customize this)
            const projectLinks = document.querySelectorAll('.project-links a');
            projectLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Prevent default if it's a placeholder link
                    if (this.getAttribute('href') === '#') {
                        e.preventDefault();
                        console.log('Project link clicked:', this.textContent.trim());
                        // You can add your tracking or navigation logic here
                    }
                });
            });

            // Image loading states
            const projectImages = document.querySelectorAll('.project-image img');
            projectImages.forEach(img => {
                const container = img.parentElement;
                container.classList.add('loading');
                
                img.addEventListener('load', function() {
                    container.classList.remove('loading');
                });
                
                img.addEventListener('error', function() {
                    container.classList.remove('loading');
                    // Could add error state here
                });
            });

            // Staggered animation for cards on scroll
            function handleScrollAnimation() {
                const cards = document.querySelectorAll('.project-card');
                const windowHeight = window.innerHeight;
                
                cards.forEach((card, index) => {
                    const cardTop = card.getBoundingClientRect().top;
                    
                    if (cardTop < windowHeight * 0.8) {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    }
                });
            }

            // Initial check and scroll listener
            handleScrollAnimation();
            window.addEventListener('scroll', handleScrollAnimation);
        }

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initProjectsSection);
        } else {
            initProjectsSection();
        }