document.addEventListener('DOMContentLoaded', function() {
    // Навигация при скролле
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenu = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(mobileMenu, {toggle: false});

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(event) {
        const isClickInside = mobileMenu.contains(event.target) || 
                            event.target.closest('.navbar-toggler');
        
        if (!isClickInside && mobileMenu.classList.contains('show')) {
            bsCollapse.hide();
        }
    });

    // Закрытие меню при прокрутке
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        if (mobileMenu.classList.contains('show')) {
            bsCollapse.hide();
        }
        lastScrollTop = window.pageYOffset;
    });

    // Изменение навбара при скролле
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Плавная прокрутка к секциям
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Закрываем мобильное меню при клике на ссылку
                if (mobileMenu.classList.contains('show')) {
                    bsCollapse.hide();
                }
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Отправка сообщения в Telegram
    window.sendToTelegram = function() {
        const message = document.getElementById('message').value;
        const telegramUsername = 'matakov';
        const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
    };

    // Анимация появления элементов при скролле
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Счетчики для секции статистики
    const counters = document.querySelectorAll('.counter-number');

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 секунды
        const step = target / (duration / 16); // 16мс - примерно один кадр при 60fps

        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.round(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        const counterObserver = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });

        counterObserver.observe(counter);
    });

    // Обработка отправки формы
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Здесь будет код для отправки формы
            const formData = new FormData(this);

            // Имитация отправки формы
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';

            setTimeout(() => {
                submitButton.textContent = 'Отправлено!';
                this.reset();

                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 2000);
            }, 1500);
        });
    }

    // Переключение отзывов
    const testimonialSlider = document.querySelector('.carousel');
    if (testimonialSlider) {
        const prevButton = document.querySelector('.carousel-control-prev');
        const nextButton = document.querySelector('.carousel-control-next');

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                testimonialSlider.carousel('prev');
            });

            nextButton.addEventListener('click', () => {
                testimonialSlider.carousel('next');
            });
        }
    }
});
