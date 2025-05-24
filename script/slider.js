document.addEventListener('DOMContentLoaded', function () {
  const sliderContainer = document.querySelector('.main__job__description').parentElement;
  const slider = document.querySelector('.main__job__description');
  const slides = document.querySelectorAll('.main__job__description--pages');
  const slideWidth = slides[0].offsetWidth;
  let visibleSlides = window.innerWidth <= 768 ? 1 : 3;
  let currentIndex = Math.floor(slides.length / 2) - 1;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;

  // Настройка контейнера
  sliderContainer.style.overflow = 'hidden';
  sliderContainer.style.position = 'relative';
  slider.style.display = 'flex';
  slider.style.transition = 'transform 0.3s ease-out';
  slider.style.cursor = 'grab';

  // Рассчитываем позицию слайдера
  function setSliderPosition() {
    visibleSlides = window.innerWidth <= 768 ? 1 : 3;
    const containerWidth = sliderContainer.offsetWidth;
    currentTranslate = (containerWidth - visibleSlides * slideWidth) / 2 - currentIndex * slideWidth;
    prevTranslate = currentTranslate;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  // Анимация перетаскивания
  function animation() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
    if (isDragging) requestAnimationFrame(animation);
  }

  // Переключение слайдов с "прилипанием"
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index > slides.length - visibleSlides) index = slides.length - visibleSlides;

    currentIndex = index;
    setSliderPosition();
  }

  // Обработчики для мыши
  slides.forEach((slide, index) => {
    // Отключаем стандартное перетаскивание
    slide.addEventListener('dragstart', (e) => e.preventDefault());

    // События мыши
    slide.addEventListener('mousedown', (e) => {
      isDragging = true;
      startPos = e.clientX;
      slider.style.cursor = 'grabbing';
      slider.style.transition = 'none';
      
      // Запускаем анимацию
      animation();
      e.preventDefault();
    });
  });

  // События касания для мобильных
  slides.forEach((slide, index) => {
    slide.addEventListener('touchstart', (e) => {
      isDragging = true;
      startPos = e.touches[0].clientX;
      slider.style.transition = 'none';
      animation();
      e.preventDefault();
    }, { passive: false });

    slide.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const currentPosition = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
      }
      e.preventDefault();
    }, { passive: false });

    slide.addEventListener('touchend', () => {
      if (isDragging) {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
        
        // Определяем направление и силу свайпа
        if (movedBy < -50) {
          goToSlide(currentIndex + 1);
        } else if (movedBy > 50) {
          goToSlide(currentIndex - 1);
        } else {
          goToSlide(currentIndex);
        }
      }
    });
  });

  // Общие обработчики для мыши
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const currentPosition = e.clientX;
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      const movedBy = currentTranslate - prevTranslate;
      
      if (movedBy < -50) {
        goToSlide(currentIndex + 1);
      } else if (movedBy > 50) {
        goToSlide(currentIndex - 1);
      } else {
        goToSlide(currentIndex);
      }
      slider.style.cursor = 'grab';
    }
  });

  document.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      goToSlide(currentIndex);
      slider.style.cursor = 'grab';
    }
  });

  // Обработчик колеса мыши
  slider.addEventListener('wheel', function (e) {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    goToSlide(currentIndex + delta);
  }, { passive: false });

  // Ресайз
  window.addEventListener('resize', function() {
    visibleSlides = window.innerWidth <= 768 ? 1 : 3;
    setSliderPosition();
  });

  // Инициализация
  setSliderPosition();
});
