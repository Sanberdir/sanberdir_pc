document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const modalIframe = document.getElementById('modalIframe');
    const closeBtn = document.querySelector('.close-modal');
    const modalLinks = document.querySelectorAll('.main__job__description--pages[data-modal]');

    // Функция для открытия модального окна
    const openModal = (url) => {
        if (url) {
            modalIframe.src = url;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        }
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
    };

    // Обработчик нажатия клавиши Esc
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    // Универсальный обработчик для тач и клик событий
    const handleLinkActivation = (e) => {
        e.preventDefault();
        const modalUrl = e.currentTarget.getAttribute('data-modal');
        openModal(modalUrl);
    };

    // Добавляем обработчики для всех типов устройств
    modalLinks.forEach(link => {
        // Для клика (мышь)
        link.addEventListener('click', handleLinkActivation);
        
        // Для тач-устройств
        link.addEventListener('touchstart', handleLinkActivation, {
            passive: true // Для улучшения производительности
        });
    });

    // Закрытие по клику на крестик
    closeBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('touchstart', closeModal, { passive: true });

    // Закрытие по клику вне окна
    const handleModalClose = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };
    modal.addEventListener('click', handleModalClose);
    modal.addEventListener('touchstart', handleModalClose, { passive: true });
});
