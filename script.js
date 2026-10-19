// === МЕНЮ ===
const burgerBtn = document.getElementById('burgerBtn');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');

function openMenu() {
    sideMenu.classList.add('open');
    overlay.classList.add('active');
}

function closeMenu() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('active');
}

if (burgerBtn) {
    burgerBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
}

// === КАЗИК (Заглушка) ===
const spinBtn = document.getElementById('spin-btn');
const wheelResult = document.getElementById('wheel-result');

if (spinBtn) {
    spinBtn.addEventListener('click', () => {
        wheelResult.textContent = "Крутим...";
        setTimeout(() => {
            wheelResult.textContent = "Тут будет предсказание! (Пример)";
        }, 800);
    });
}