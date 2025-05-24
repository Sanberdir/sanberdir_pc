document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const modalIframe = document.getElementById('modalIframe');
    const closeBtn = document.querySelector('.close-modal');
    const modalLinks = document.querySelectorAll('.main__job__description--pages[data-modal]');

    // Для отслеживания свайпа
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    const openModal = (url) => {
        if (url && !isSwiping) { // Открываем только если не было свайпа
            modalIframe.src = url;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        }
        isSwiping = false; // Сбрасываем флаг свайпа
    };

    const closeModal = () => {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
    };

    modalLinks.forEach(link => {
        // Запоминаем начальную позицию касания
        link.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isSwiping = false;
        }, { passive: true });

        // Проверяем, было ли движение (свайп)
        link.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            
            // Если движение больше 10px по X или Y — считаем это свайпом
            if (Math.abs(touchX - touchStartX) > 10 || Math.abs(touchY - touchStartY) > 10) {
                isSwiping = true;
            }
        }, { passive: true });

        // Обработка клика/тапа (только если не было свайпа)
        link.addEventListener('touchend', (e) => {
            if (!isSwiping) {
                e.preventDefault();
                const modalUrl = link.getAttribute('data-modal');
                openModal(modalUrl);
            }
        }, { passive: false }); // passive: false, чтобы preventDefault() работал

        // Для кликов мышью (старая логика)
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalUrl = link.getAttribute('data-modal');
            openModal(modalUrl);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('touchend', closeModal, { passive: true });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    modal.addEventListener('touchend', (e) => {
        if (e.target === modal) closeModal();
    }, { passive: true });
});
