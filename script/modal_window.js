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
            // Добавляем обработчик события нажатия клавиши
            document.addEventListener('keydown', handleKeyDown);
        }
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = '';
        // Удаляем обработчик события нажатия клавиши
        document.removeEventListener('keydown', handleKeyDown);
    };

    // Обработчик нажатия клавиши Esc
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    // Обработчики для ссылок, открывающих модальное окно
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalUrl = link.getAttribute('data-modal');
            openModal(modalUrl);
        });
    });

    // Закрытие по клику на крестик
    closeBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});