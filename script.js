// Enhanced interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Prompt Carousel Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.prompt-slide');
    const promptBtns = document.querySelectorAll('.prompt-btn');
    const prevBtn = document.getElementById('prevPrompt');
    const nextBtn = document.getElementById('nextPrompt');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        promptBtns.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Event listeners for carousel
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    promptBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => showSlide(index));
    });

    // Auto-advance carousel
    setInterval(nextSlide, 5000);

    // Animate elements on scroll with enhanced effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-card, .chapter-card, .testimonial-card, .stat, .hero-badge, .hero-title, .hero-subtitle'
    );

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.feature-card, .chapter-card, .testimonial-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Interactive mini-prompts
    const miniPrompts = document.querySelectorAll('.mini-prompt');

    miniPrompts.forEach(prompt => {
        prompt.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Show tooltip or modal (placeholder)
            console.log('Prompt clicked:', this.textContent);
        });
    });

    // Typing animation for stats
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + 'K+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Animate stats when they come into view
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                const text = statValue.textContent;

                if (text.includes('K+')) {
                    const num = parseFloat(text) * 1000;
                    animateNumber(statValue, num);
                } else if (text.includes('★')) {
                    statValue.textContent = '4.8★';
                } else if (text.includes('%')) {
                    const num = parseInt(text);
                    animateNumber(statValue, num);
                    setTimeout(() => {
                        statValue.textContent = num + '%';
                    }, 2000);
                }

                statObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.stat').forEach(stat => {
        statObserver.observe(stat);
    });

    // Add click effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .stat, .logo, .mini-prompt');

    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Enhanced Memory Bubbles Interaction
    const memoryBubbles = document.querySelectorAll('.memory-bubble');

    memoryBubbles.forEach(bubble => {
        bubble.addEventListener('click', function() {
            const memory = this.dataset.memory;

            // Create magical sparkle effect
            createSparkleEffect(this);

            // Show memory insight (placeholder for future modal)
            console.log(`Exploring ${memory} memories...`);

            // Add temporary glow effect
            this.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '';
            }, 2000);
        });
    });

    // Soul Insights Quiz Functionality
    window.quizData = {
        userName: '',
        userEmail: '',
        style: '',
        time: ''
    };

    window.currentStep = 1;

    // Debug: Log quiz initialization
    console.log('Quiz initialized, current step:', window.currentStep);
    console.log('Active quiz steps:', document.querySelectorAll('.quiz-step.active').length);

    // Quiz navigation functions
    window.nextQuizStep = function() {
        const currentStepEl = document.querySelector(`.quiz-step[data-step="${window.currentStep}"]`);

        if (window.currentStep === 1) {
            // Validate form inputs
            const nameInput = document.getElementById('userName');
            const emailInput = document.getElementById('userEmail');

            if (!nameInput.value.trim()) {
                nameInput.focus();
                nameInput.style.borderColor = '#ef4444';
                return;
            }

            if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                emailInput.focus();
                emailInput.style.borderColor = '#ef4444';
                return;
            }

            // Store user data
            window.quizData.userName = nameInput.value.trim();
            window.quizData.userEmail = emailInput.value.trim();
        }

        // Move to next step
        currentStepEl.classList.remove('active');
        window.currentStep++;

        const nextStepEl = document.querySelector(`.quiz-step[data-step="${window.currentStep}"]`);
        if (nextStepEl) {
            nextStepEl.classList.add('active');
        }
    };

    window.selectOption = function(element, type, value) {
        // Store the selection
        window.quizData[type] = value;

        // Visual feedback
        const options = element.parentElement.querySelectorAll('.quiz-option');
        options.forEach(opt => opt.classList.remove('selected'));
        element.classList.add('selected');

        // Auto-advance after a short delay
        setTimeout(() => {
            const currentStepEl = document.querySelector(`.quiz-step[data-step="${window.currentStep}"]`);
            currentStepEl.classList.remove('active');
            window.currentStep++;

            const nextStepEl = document.querySelector(`.quiz-step[data-step="${window.currentStep}"]`);
            if (nextStepEl) {
                nextStepEl.classList.add('active');

                // If this is the results step, show results
                if (window.currentStep === 4) {
                    showQuizResults();
                }
            }
        }, 1000);
    };

    window.showQuizResults = function() {
        const { userName, style, time } = window.quizData;

        // Update greeting
        const greeting = document.querySelector('.user-greeting');
        greeting.textContent = `Hello ${userName}! Here's your personalized reflection profile.`;

        // Show style result
        const styleResult = document.querySelector('.style-result');
        const styleDescriptions = {
            analytical: "You're an Analytical Soul who thrives on deep thinking and connecting patterns. Your reflections explore the 'why' behind experiences with logical frameworks and cause-effect analysis.",
            creative: "You're a Creative Storyteller who sees life as a beautiful narrative. Your reflections paint vivid pictures and explore metaphors through visual storytelling and artistic expression.",
            intuitive: "You're an Intuitive Feeler who trusts inner wisdom and emotional intelligence. Your reflections honor feelings and instincts through mindful awareness and emotional intelligence.",
            structured: "You're a Structured Planner who loves organization and clear frameworks. Your reflections create actionable insights and goals through systematic planning and progress tracking."
        };

        styleResult.textContent = styleDescriptions[style] || "Your unique reflection style is being analyzed...";

        // Show recommendations
        const recommendationsList = document.querySelector('.recommendations-list');
        const recommendations = {
            analytical: [
                "Start with pattern-recognition prompts that help you identify recurring themes",
                "Use structured frameworks to analyze your experiences systematically",
                "Track your personal growth with measurable insights and data points",
                "Explore cause-and-effect relationships in your life decisions"
            ],
            creative: [
                "Begin with visual storytelling prompts that inspire artistic expression",
                "Use metaphors and imagery to describe your life experiences",
                "Create beautiful narratives that capture the essence of your journey",
                "Express emotions through creative writing and artistic reflection"
            ],
            intuitive: [
                "Focus on emotion-centered prompts that honor your feelings",
                "Trust your inner wisdom and gut instincts in your reflections",
                "Practice mindful awareness and present-moment reflection",
                "Explore your emotional intelligence and interpersonal connections"
            ],
            structured: [
                "Use goal-oriented prompts that help you plan and organize",
                "Create actionable insights from your reflection sessions",
                "Track your progress with systematic frameworks and checklists",
                "Set clear objectives for your personal development journey"
            ]
        };

        const userRecommendations = recommendations[style] || [];
        recommendationsList.innerHTML = userRecommendations
            .map(rec => `<div class="recommendation-item">${rec}</div>`)
            .join('');
    };

    window.submitQuizResults = function() {
        const { userName, userEmail, style, time } = window.quizData;

        // Submit data to server
        fetch('submit_quiz.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName,
                userEmail: userEmail,
                style: style,
                time: time
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Thank you ${userName}! Your information has been saved. We'll notify you when SoulMemoir launches!`);
            } else {
                // Fallback: create downloadable file
                const userData = `${userName},${userEmail},${style},${time}\n`;
                const blob = new Blob([userData], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'user_signup.txt';
                a.click();
                URL.revokeObjectURL(url);
                alert(`Thank you ${userName}! Your information has been saved locally.`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Fallback: create downloadable file
            const userData = `${userName},${userEmail},${style},${time}\n`;
            const blob = new Blob([userData], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'user_signup.txt';
            a.click();
            URL.revokeObjectURL(url);
            alert(`Thank you ${userName}! Your information has been saved locally.`);
        });
    };

    window.restartQuiz = function() {
        // Reset quiz data
        window.quizData = {
            userName: '',
            userEmail: '',
            style: '',
            time: ''
        };
        window.currentStep = 1;

        // Reset form
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';

        // Reset all steps
        document.querySelectorAll('.quiz-step').forEach(step => {
            step.classList.remove('active');
        });

        // Show first step
        document.querySelector('.quiz-step[data-step="1"]').classList.add('active');

        // Remove selections
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected');
        });
    };

    // Input validation styling
    document.addEventListener('input', function(e) {
        if (e.target.matches('#userName, #userEmail')) {
            e.target.style.borderColor = '';
        }
    });

    // Timeline Items Animation on Scroll
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';

                // Animate timeline marker
                const marker = entry.target.querySelector('.timeline-marker');
                marker.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    marker.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.8s ease';
        timelineObserver.observe(item);
    });

    // Constellation Lines Animation
    function animateConstellation() {
        const bubbles = document.querySelectorAll('.memory-bubble');
        const constellation = document.querySelector('.constellation');

        if (bubbles.length >= 2 && constellation) {
            bubbles.forEach((bubble, index) => {
                const nextBubble = bubbles[(index + 1) % bubbles.length];
                const line = constellation.children[index];

                if (line) {
                    const rect1 = bubble.getBoundingClientRect();
                    const rect2 = nextBubble.getBoundingClientRect();

                    const x1 = rect1.left + rect1.width / 2;
                    const y1 = rect1.top + rect1.height / 2;
                    const x2 = rect2.left + rect2.width / 2;
                    const y2 = rect2.top + rect2.height / 2;

                    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

                    line.style.width = length + 'px';
                    line.style.left = x1 + 'px';
                    line.style.top = y1 + 'px';
                    line.style.transform = `rotate(${angle}deg)`;
                }
            });
        }
    }

    // Sparkle Effect Function
    function createSparkleEffect(element) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #fbbf24;
                border-radius: 50%;
                pointer-events: none;
                animation: sparkleAnimation 1s ease-out forwards;
            `;

            const rect = element.getBoundingClientRect();
            sparkle.style.left = (rect.left + rect.width / 2) + 'px';
            sparkle.style.top = (rect.top + rect.height / 2) + 'px';

            document.body.appendChild(sparkle);

            // Random direction for sparkle
            const angle = (i / 8) * 360;
            const distance = 50 + Math.random() * 30;

            setTimeout(() => {
                sparkle.style.transform = `translate(${Math.cos(angle * Math.PI / 180) * distance}px, ${Math.sin(angle * Math.PI / 180) * distance}px)`;
                sparkle.style.opacity = '0';
            }, 10);

            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Personalized Message Function
    function showPersonalizedMessage(style) {
        const messages = {
            analytical: "Perfect! Your analytical mind will love our structured reflection frameworks and pattern-recognition prompts.",
            creative: "Wonderful! Your creative spirit will flourish with our visual storytelling prompts and metaphorical explorations.",
            intuitive: "Beautiful! Your intuitive nature will resonate with our emotion-focused prompts and mindfulness exercises.",
            structured: "Excellent! Your organized approach will thrive with our goal-setting prompts and progress tracking features."
        };

        // Create temporary message overlay
        const messageDiv = document.createElement('div');
        messageDiv.className = 'personalized-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-heart"></i>
                <p>${messages[style]}</p>
            </div>
        `;
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(59, 130, 246, 0.95);
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            z-index: 1000;
            max-width: 400px;
            text-align: center;
            animation: messageSlideIn 0.5s ease-out;
        `;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'messageSlideOut 0.5s ease-in forwards';
            setTimeout(() => messageDiv.remove(), 500);
        }, 3000);
    }

    // Enhanced parallax effect for all floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

        // Memory bubbles parallax
        const memoryBubbles = document.querySelectorAll('.memory-bubble');
        memoryBubbles.forEach((bubble, index) => {
            const speed = 0.3 + (index * 0.1);
            bubble.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Quote particles parallax
        const quoteParticles = document.querySelectorAll('.quote-particle');
        quoteParticles.forEach((particle, index) => {
            const speed = 0.2 + (index * 0.05);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Initialize constellation animation
    setTimeout(animateConstellation, 1000);
    window.addEventListener('resize', animateConstellation);
});

// Add CSS for all interactive effects
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(180deg);
            opacity: 0;
        }
    }

    @keyframes messageSlideIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    @keyframes messageSlideOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }

    .quiz-option.selected {
        border-color: var(--primary-color) !important;
        background: rgba(59, 130, 246, 0.1) !important;
        transform: translateY(-3px) scale(1.02) !important;
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3) !important;
    }

    .style-card.highlighted {
        transform: translateY(-15px) scale(1.05) !important;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2) !important;
        border: 2px solid var(--primary-color) !important;
    }

    .style-card.highlighted::before {
        opacity: 1 !important;
        height: 6px !important;
    }

    .btn, .stat, .logo, .memory-bubble, .quiz-option, .style-card {
        position: relative;
        overflow: hidden;
    }

    .memory-bubble {
        cursor: pointer;
    }

    .memory-bubble:active {
        transform: scale(0.95);
    }

    .timeline-item:nth-child(even) .timeline-content {
        transform: translateX(50px);
    }

    .personalized-message {
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .personalized-message .message-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .personalized-message i {
        font-size: 2rem;
        color: #fbbf24;
    }

    .personalized-message p {
        margin: 0;
        line-height: 1.6;
    }
`;
document.head.appendChild(style);
