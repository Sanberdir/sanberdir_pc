document.addEventListener('DOMContentLoaded', function () {
  const sliderContainer = document.querySelector('.main__job__description').parentElement;
  const slider = document.querySelector('.main__job__description');
  const slides = document.querySelectorAll('.main__job__description--pages');
  const slideWidth = slides[0].offsetWidth;
  let visibleSlides = window.innerWidth <= 768 ? 1 : 3;
  let currentIndex = Math.floor(slides.length / 2) - 1;
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let translateX = 0;
  let touchStartX = 0;
  let touchCurrentX = 0;

  // Настройка контейнера
  sliderContainer.style.overflow = 'hidden';
  sliderContainer.style.position = 'relative';
  slider.style.display = 'flex';
  slider.style.transition = 'transform 0.3s ease-out';
  slider.style.cursor = 'grab';

  // Центрируем выбранные слайды
  function updateSliderPosition() {
    visibleSlides = window.innerWidth <= 768 ? 1 : 3;
    const containerWidth = sliderContainer.offsetWidth;
    translateX = (containerWidth - visibleSlides * slideWidth) / 2 - currentIndex * slideWidth;
    slider.style.transform = `translateX(${translateX}px)`;
  }

  // Переключение слайдов
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index > slides.length - visibleSlides) index = slides.length - visibleSlides;

    currentIndex = index;
    slider.style.transition = 'transform 0.3s ease-out';
    updateSliderPosition();
  }

  // Обработчики событий мыши
  slides.forEach(slide => {
    slide.addEventListener('dragstart', (e) => e.preventDefault());

    slide.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      currentX = startX;
      slider.style.cursor = 'grabbing';
      slider.style.transition = 'none';
      e.preventDefault();
    });
  });

  // Обработчик колеса мыши
  slider.addEventListener('wheel', function (e) {
    const isOverSlider = e.target.closest('.main__job__description');

    if (isOverSlider) {
      e.preventDefault();
      e.stopPropagation();

      const delta = Math.sign(e.deltaY);

      if (delta > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
  }, { passive: false });

  // Обработчики сенсорных событий
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    touchStartX = e.touches[0].clientX;
    touchCurrentX = touchStartX;
    slider.style.transition = 'none';
    e.preventDefault();
  }, { passive: false });

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    touchCurrentX = touch.clientX;
    const diffX = touchCurrentX - touchStartX;
    translateX += diffX;
    slider.style.transform = `translateX(${translateX}px)`;
    touchStartX = touchCurrentX;
    e.preventDefault();
  }, { passive: false });

  slider.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;

    const diffX = touchCurrentX - touchStartX;

    if (diffX < -50) {
      goToSlide(currentIndex + 1);
    } else if (diffX > 50) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex);
    }
    e.preventDefault();
  }, { passive: false });

  // Общие обработчики для мыши
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const diffX = e.clientX - currentX;
    currentX = e.clientX;
    translateX += diffX;
    slider.style.transform = `translateX(${translateX}px)`;
  });

  document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    slider.style.cursor = 'grab';

    const diffX = e.clientX - startX;

    if (diffX < -50) {
      goToSlide(currentIndex + 1);
    } else if (diffX > 50) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex);
    }
  });

  document.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      slider.style.cursor = 'grab';
      goToSlide(currentIndex);
    }
  });

  // Инициализация
  updateSliderPosition();
  window.addEventListener('resize', function() {
    visibleSlides = window.innerWidth <= 768 ? 1 : 3;
    updateSliderPosition();
  });
});
