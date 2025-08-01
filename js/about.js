function initAboutSkillsSections() {
            // Intersection Observer for animations
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

            // Observe skill categories
            const skillCategories = document.querySelectorAll('.skill-category');
            skillCategories.forEach(category => {
                observer.observe(category);
            });

            // Add hover effects for skill items
            const skillItems = document.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(5px)';
                    this.style.backgroundColor = 'rgba(0, 212, 255, 0.05)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                    this.style.backgroundColor = 'transparent';
                });
            });

            // Animate stats counter
            function animateStats() {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace('+', ''));
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        stat.textContent = Math.floor(current) + '+';
                    }, 30);
                });
            }

            // Trigger stats animation when about section is visible
            const aboutSection = document.querySelector('.about');
            const aboutObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(animateStats, 500);
                        aboutObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            if (aboutSection) {
                aboutObserver.observe(aboutSection);
            }

            // Add smooth transitions for profile image
            const imageContainer = document.querySelector('.image-container');
            if (imageContainer) {
                imageContainer.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05) rotate(2deg)';
                });
                
                imageContainer.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1) rotate(0deg)';
                });
            }

            // Staggered animation for skill categories
            function handleSkillsAnimation() {
                const categories = document.querySelectorAll('.skill-category');
                const windowHeight = window.innerHeight;
                
                categories.forEach((category, index) => {
                    const categoryTop = category.getBoundingClientRect().top;
                    
                    if (categoryTop < windowHeight * 0.8) {
                        setTimeout(() => {
                            category.style.opacity = '1';
                            category.style.transform = 'translateY(0)';
                        }, index * 150);
                    }
                });
            }

            // Initial check and scroll listener
            handleSkillsAnimation();
            window.addEventListener('scroll', handleSkillsAnimation);
        }

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAboutSkillsSections);
        } else {
            initAboutSkillsSections();
        }