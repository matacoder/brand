document.addEventListener('DOMContentLoaded', function() {
    // Переключение версий сайта
    const versionButtons = document.querySelectorAll('.version-btn');
    const businessVersion = document.getElementById('business-version');
    const techVersion = document.getElementById('tech-version');
    const navbarMenu = document.querySelector('.navbar-collapse ul');
    const mainNavbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(mobileMenu, {toggle: false});

    // Меню для разных версий
    const businessMenu = `
        <li class="nav-item"><a class="nav-link" href="#services">Услуги</a></li>
        <li class="nav-item"><a class="nav-link" href="#prototyping">Прототипирование</a></li>
        <li class="nav-item"><a class="nav-link" href="#examples">Примеры</a></li>
        <li class="nav-item"><a class="nav-link" href="#training">Обучение</a></li>
        <li class="nav-item"><a class="nav-link" href="#testimonials">Отзывы</a></li>
        <li class="nav-item"><a class="nav-link" href="#contact">Контакты</a></li>
    `;

    const techMenu = `
        <li class="nav-item"><a class="nav-link" href="#tech-services">Услуги</a></li>
        <li class="nav-item"><a class="nav-link" href="#tech-path">Карьерный путь</a></li>
        <li class="nav-item"><a class="nav-link" href="#tech-skills">Навыки</a></li>
        <li class="nav-item"><a class="nav-link" href="#tech-testimonials">Отзывы</a></li>
        <li class="nav-item"><a class="nav-link" href="#tech-contact">Контакты</a></li>
    `;

    // Функция для обновления URL с якорем
    function updateUrlWithAnchor(version) {
        const url = new URL(window.location.href);
        url.hash = version;
        window.history.pushState({}, '', url);
    }

    // Функция для переключения версии
    function switchVersion(version) {
        // Обновляем активную кнопку
        versionButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`[data-version="${version}"]`);
        activeButton.classList.add('active');
        
        // Переключаем контент
        if (version === 'business') {
            businessVersion.classList.remove('d-none');
            techVersion.classList.add('d-none');
            navbarMenu.innerHTML = businessMenu;
        } else {
            businessVersion.classList.add('d-none');
            techVersion.classList.remove('d-none');
            navbarMenu.innerHTML = techMenu;
        }
        
        // Закрываем мобильное меню при переключении
        if (mobileMenu.classList.contains('show')) {
            bsCollapse.hide();
        }

        // Обновляем стили навбара
        if (window.pageYOffset > 50) {
            mainNavbar.classList.add('scrolled');
        } else {
            mainNavbar.classList.remove('scrolled');
        }
    }

    // Обработчик клика по кнопкам переключения
    versionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const version = this.dataset.version;
            switchVersion(version);
            updateUrlWithAnchor(version);
        });
    });

    // Проверяем якорь при загрузке страницы
    const hash = window.location.hash.slice(1);
    if (hash === 'business' || hash === 'tech') {
        switchVersion(hash);
    }

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

    // Плавная прокрутка к секциям
    const navLinks = document.querySelectorAll('.nav-link');
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
