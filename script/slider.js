document.addEventListener('DOMContentLoaded', function () {
  const sliderContainer = document.querySelector('.main__job__description').parentElement;
  const slider = document.querySelector('.main__job__description');
  const slides = document.querySelectorAll('.main__job__description--pages');
  const slideWidth = slides[0].offsetWidth;
  const visibleSlides = 3;
  let currentIndex = Math.floor(slides.length / 2) - 1;
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let translateX = 0;

  // Настройка контейнера
  sliderContainer.style.overflow = 'hidden';
  sliderContainer.style.position = 'relative';
  slider.style.display = 'flex';
  slider.style.transition = 'transform 0.3s ease-out';
  slider.style.cursor = 'grab';

  // Центрируем выбранные слайды
  function updateSliderPosition() {
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

  // Обработчик колеса мыши ТОЛЬКО для слайдера
  slider.addEventListener('wheel', function (e) {
    // Проверяем, что курсор находится над слайдером
    const isOverSlider = e.target.closest('.main__job__description');

    if (isOverSlider) {
      e.preventDefault();
      e.stopPropagation();

      const delta = Math.sign(e.deltaY); // 1 - вниз, -1 - вверх

      if (delta > 0) {
        // Прокрутка вниз (вправо)
        goToSlide(currentIndex + 1);
      } else {
        // Прокрутка вверх (влево)
        goToSlide(currentIndex - 1);
      }
    }
  }, { passive: false });

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
      goToSlide(currentIndex); // Возвращаем на место если движение было маленьким
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
  window.addEventListener('resize', updateSliderPosition);
});