async function loadHTML(file, position) {
    try {
        const response = await fetch(file);
        const html = await response.text();
        document.body.insertAdjacentHTML(position, html);
        return true; // Указываем, что загрузка завершена
    } catch (error) {
        console.error(`Ошибка загрузки ${file}:`, error);
        return false;
    }
}

// Загружаем header и footer и затем инициализируем бургер-меню
async function loadHeaderFooterAndInit() {
    await loadHTML('header.html', 'afterbegin');
    await loadHTML('footer.html', 'beforeend');
    initBurgerMenu();
}

function initBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerIcon = document.querySelector('.burger-icon');
    const menu = document.querySelector('.header__container--menu');
    const body = document.body;
    
    if (!burgerMenu) return; // Если элемента нет, выходим
    
    burgerMenu.addEventListener('click', function() {
        burgerIcon.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Закрытие меню при клике на пункт меню
    const menuItems = document.querySelectorAll('.header__menu--element');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                burgerIcon.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });
    
    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            burgerIcon.classList.remove('active');
            menu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// Запускаем загрузку
loadHeaderFooterAndInit();