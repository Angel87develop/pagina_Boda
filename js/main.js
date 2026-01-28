/* ============================================
   JAVASCRIPT PRINCIPAL - PÁGINA WEB DE BODA
   Funcionalidades interactivas y animaciones
   ============================================ */

// ============================================
// CONFIGURACIÓN DE FECHAS
// ============================================
// IMPORTANTE: Configura aquí la fecha de tu boda
// Fecha: 21 de Marzo de 2026 a las 3:00 PM (15:00)
const WEDDING_DATE = new Date(2026, 2, 21, 15, 0, 0); // Mes es 0-indexed (2 = Marzo)
const WEDDING_DAY = 21;
const WEDDING_MONTH = 'Marzo';
const WEDDING_YEAR = 2026;

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMusicControl();
    initAnimations();
    initCountdown();
    initGallery();
    initSmoothScroll();
    updateWeddingDate();
});

// ============================================
// CONTROL DE MÚSICA AMBIENTAL
// ============================================
function initMusicControl() {
    const musicBtn = document.getElementById('musicBtn');
    const musicIcon = document.getElementById('musicIcon');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    let isPlaying = false;
    
    // Intentar reproducir música automáticamente (puede ser bloqueado por el navegador)
    backgroundMusic.volume = 0.3; // Volumen bajo para no ser intrusivo
    
    // Intentar reproducir al hacer clic por primera vez
    const tryPlay = () => {
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    isPlaying = true;
                    musicIcon.classList.add('playing');
                    musicIcon.textContent = '♫';
                })
                .catch(() => {
                    // El usuario debe interactuar primero
                    console.log('La reproducción automática fue bloqueada. El usuario debe hacer clic para reproducir.');
                });
        }
    };
    
    // Control de botón de música
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            isPlaying = false;
            musicIcon.classList.remove('playing');
            musicIcon.textContent = '♪';
        } else {
            tryPlay();
        }   
    });
    
    // Detectar cuando la música termina o pausa
    backgroundMusic.addEventListener('pause', () => {
        isPlaying = false;
        musicIcon.classList.remove('playing');
        musicIcon.textContent = '♪';
    });
    
    backgroundMusic.addEventListener('play', () => {
        isPlaying = true;
        musicIcon.classList.add('playing');
        musicIcon.textContent = '♫';
    });
}

// ============================================
// ACTUALIZAR FECHA EN EL HERO
// ============================================
function updateWeddingDate() {
    const weddingDayEl = document.getElementById('weddingDay');
    const weddingMonthEl = document.getElementById('weddingMonth');
    const weddingYearEl = document.getElementById('weddingYear');
    
    if (weddingDayEl) weddingDayEl.textContent = WEDDING_DAY;
    if (weddingMonthEl) weddingMonthEl.textContent = WEDDING_MONTH;
    if (weddingYearEl) weddingYearEl.textContent = WEDDING_YEAR;
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Una vez visible, dejar de observar para mejor rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos con animación
    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
    
    // Animación del hero al cargar
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
}

// ============================================
// CUENTA REGRESIVA
// ============================================
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownSection = document.getElementById('countdown');
    const weddingEndOverlay = document.getElementById('weddingEndOverlay');
    const timelineVideo = document.getElementById('timelineVideo');
    const weddingEndHint = document.getElementById('weddingEndHint');
    
    // Verificar que todos los elementos existan
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        console.error('Error: No se encontraron todos los elementos del contador');
        return;
    }
    
    let hasFinished = false;
    let intervalId = null;

    function showWeddingEnd() {
        if (hasFinished) return;
        hasFinished = true;

        if (weddingEndOverlay) {
            weddingEndOverlay.classList.add('active');
            weddingEndOverlay.setAttribute('aria-hidden', 'false');
        }

        if (timelineVideo) {
            // Intentar reproducir; algunos navegadores lo bloquearán si no hay gesto del usuario.
            const playPromise = timelineVideo.play();
            if (playPromise && typeof playPromise.then === 'function') {
                playPromise.catch(() => {
                    // Mostrar controles y una pista para que el usuario inicie la reproducción.
                    timelineVideo.controls = true;
                    if (weddingEndHint) weddingEndHint.hidden = false;
                });
            }
        }
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const weddingTime = WEDDING_DATE.getTime();
        const difference = weddingTime - now;
        
        if (difference <= 0) {
            // La boda ya pasó
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            if (countdownSection) countdownSection.classList.add('countdown-urgent');
            if (intervalId) clearInterval(intervalId);
            showWeddingEnd();
            return;
        }
        
        // Calcular tiempo restante de forma más precisa
        const totalSeconds = Math.floor(difference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        
        // Calcular los valores individuales
        const days = totalDays;
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;
        
        // Actualizar elementos con formato de dos dígitos
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

        // Cuando falte 1 día o menos, el contador se vuelve rojo
        if (countdownSection) {
            if (totalDays <= 1) countdownSection.classList.add('countdown-urgent');
            else countdownSection.classList.remove('countdown-urgent');
        }
        
        // Animación sutil al cambiar
        const elements = [daysEl, hoursEl, minutesEl, secondsEl].filter(el => el !== null);
        elements.forEach(el => {
            el.style.transform = 'scale(1.1)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Actualizar inmediatamente y luego cada segundo
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
}

// ============================================
// GALERÍA - CARRUSEL CON AUTO-SLIDE
// ============================================
function initGallery() {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carouselTrack) return;
    
    let currentSlide = 0;
    const totalSlides = 8; // w1, w2, w3, w4
    let autoSlideInterval = null;
    let isUserInteracting = false;
    
    // Función para actualizar el carousel
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Ir a la siguiente imagen
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Ir a la imagen anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Ir a un slide específico
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
        pauseAutoSlide();
        resumeAutoSlide(5000); // Reanudar después de 5 segundos
    }
    
    // Iniciar auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!isUserInteracting) {
                nextSlide();
            }
        }, 5000); // Cambiar cada 5 segundos (ajustable)
    }
    
    // Pausar auto-slide
    function pauseAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
        isUserInteracting = true;
    }
    
    // Reanudar auto-slide
    function resumeAutoSlide(delay = 5000) {
        setTimeout(() => {
            isUserInteracting = false;
            if (!autoSlideInterval) {
                startAutoSlide();
            }
        }, delay);
    }
    
    // Event listeners para botones
    if (carouselNext) {
        carouselNext.addEventListener('click', () => {
            nextSlide();
            pauseAutoSlide();
            resumeAutoSlide(5000);
        });
    }
    
    if (carouselPrev) {
        carouselPrev.addEventListener('click', () => {
            prevSlide();
            pauseAutoSlide();
            resumeAutoSlide(5000);
        });
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Pausar auto-slide al hacer hover sobre el carousel
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (galleryCarousel) {
        galleryCarousel.addEventListener('mouseenter', pauseAutoSlide);
        galleryCarousel.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            if (!autoSlideInterval) {
                startAutoSlide();
            }
        });
    }
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        const gallerySection = document.getElementById('gallery');
        const rect = gallerySection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            e.preventDefault();
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else {
                nextSlide();
            }
            pauseAutoSlide();
            resumeAutoSlide(5000);
        }
    });
    
    // Inicializar
    updateCarousel();
    startAutoSlide();
}

// ============================================
// FORMULARIO RSVP CON VALIDACIÓN (ELIMINADO - Reemplazado por sección de Recepción)
// ============================================
/* Función eliminada - ya no se usa el formulario RSVP
function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    const successMessage = document.getElementById('rsvpSuccess');
    
    // Elementos del formulario
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const attendanceSelect = document.getElementById('attendance');
    const guestsInput = document.getElementById('guests');
    const messageInput = document.getElementById('message');
    
    // Elementos de error
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const attendanceError = document.getElementById('attendanceError');
    
    // Validación en tiempo real
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    attendanceSelect.addEventListener('change', () => validateAttendance());
    
    // Validación de nombre
    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            showError(nameError, 'El nombre debe tener al menos 2 caracteres');
            nameInput.style.borderBottomColor = '#d32f2f';
            return false;
        } else {
            hideError(nameError);
            nameInput.style.borderBottomColor = '';
            return true;
        }
    }
    
    // Validación de email
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(emailError, 'El correo electrónico es obligatorio');
            emailInput.style.borderBottomColor = '#d32f2f';
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailError, 'Por favor ingresa un correo electrónico válido');
            emailInput.style.borderBottomColor = '#d32f2f';
            return false;
        } else {
            hideError(emailError);
            emailInput.style.borderBottomColor = '';
            return true;
        }
    }
    
    // Validación de asistencia
    function validateAttendance() {
        const attendance = attendanceSelect.value;
        if (!attendance) {
            showError(attendanceError, 'Por favor selecciona una opción');
            attendanceSelect.style.borderBottomColor = '#d32f2f';
            return false;
        } else {
            hideError(attendanceError);
            attendanceSelect.style.borderBottomColor = '';
            return true;
        }
    }
    
    // Mostrar error
    function showError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Ocultar error
    function hideError(errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    // Enviar formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validar todos los campos
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isAttendanceValid = validateAttendance();
        
        if (isNameValid && isEmailValid && isAttendanceValid) {
            // Preparar datos del formulario
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                attendance: attendanceSelect.value,
                guests: parseInt(guestsInput.value) || 0,
                message: messageInput.value.trim(),
                timestamp: new Date().toISOString()
            };
            
            // Aquí puedes enviar los datos a un backend
            // Por ahora, solo mostramos el mensaje de éxito
            console.log('Datos del formulario:', formData);
            
            // Ocultar formulario y mostrar mensaje de éxito
            form.style.display = 'none';
            successMessage.classList.add('active');
            
            // Scroll suave al mensaje de éxito
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Resetear formulario después de 5 segundos (opcional)
            // setTimeout(() => {
            //     form.reset();
            //     form.style.display = 'block';
            //     successMessage.classList.remove('active');
            // }, 5000);
        } else {
            // Mostrar mensaje de error general
            alert('Por favor completa correctamente todos los campos obligatorios.');
        }
    });
}
*/

// ============================================
// SCROLL SUAVE
// ============================================
function initSmoothScroll() {
    // Scroll suave al indicador del hero
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const invitationSection = document.getElementById('invitation');
            if (invitationSection) {
                invitationSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Links de navegación suave (si se agregan en el futuro)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// FUNCIONES UTILITARIAS
// ============================================

// Función para formatear fechas (si se necesita en el futuro)
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Función para obtener parámetros de URL (útil para tracking)
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// ============================================
// PREVENIR COMPORTAMIENTO POR DEFECTO EN FORMULARIOS
// ============================================
// (No hay formularios activos en este momento)

// ============================================
// OPTIMIZACIÓN: Lazy loading de imágenes
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// MENSAJE DE CONSOLA (OPCIONAL)
// ============================================
console.log('%c 💒 ¡Bienvenido a nuestra boda! 💒', 'color: #556B2F; font-size: 20px; font-weight: bold;');
console.log('%c Gracias por visitar nuestra invitación digital', 'color: #6B8E23; font-size: 14px;');

