
async function loadHTML(file, position) {
    try {
        const response = await fetch(file);
        const html = await response.text();
        document.body.insertAdjacentHTML(position, html);
    } catch (error) {
        console.error(`Ошибка загрузки ${file}:`, error);
    }
}
// Загружаем header и footer
loadHTML('header.html', 'afterbegin');
loadHTML('footer.html', 'beforeend');