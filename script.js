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

// === СЛОТ-МАШИНА ===
const spinBtn = document.getElementById('spin-btn');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const slotMessage = document.getElementById('slot-message');

// Символы и поздравления
const symbols = ['🍒', '💎', '🍋', '7️⃣', '⭐', '🔔'];
const winMessages = [
    "🎉 Бинго! Ты сорвала джекпот!",
    "💖 Невероятно! Три в ряд!",
    "🚀 Космос! Ты выиграла!",
    "🌟 Ты просто создана для побед!",
    "🥂 За твою удачу! Ура!"
];

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

if (spinBtn) {
    spinBtn.addEventListener('click', () => {
        // Блокируем кнопку и запускаем тряску
        spinBtn.disabled = true;
        slotMessage.textContent = "Крутим... 🎰";
        slotMessage.style.color = "var(--text)";
        
        slot1.classList.add('spinning');
        slot2.classList.add('spinning');
        slot3.classList.add('spinning');

        // Быстрая смена символов (эффект вращения)
        const spinInterval = setInterval(() => {
            slot1.textContent = getRandomSymbol();
            slot2.textContent = getRandomSymbol();
            slot3.textContent = getRandomSymbol();
        }, 50);

        // Остановка через 1.5 секунды
        setTimeout(() => {
            clearInterval(spinInterval); // Останавливаем смену
            
            // Убираем тряску
            slot1.classList.remove('spinning');
            slot2.classList.remove('spinning');
            slot3.classList.remove('spinning');

            // Выбираем финальные символы
            const final1 = getRandomSymbol();
            const final2 = getRandomSymbol();
            const final3 = getRandomSymbol();

            // В редких случаях (чтобы было интересно играть) 
            // подгоняем символы, чтобы иногда был выигрыш
            const isWin = Math.random() < 0.3; // 30% шанс победы
            
            if (isWin) {
                slot1.textContent = final1;
                slot2.textContent = final1;
                slot3.textContent = final1;
                
                // Выводим рандомное поздравление
                const randomMsg = winMessages[Math.floor(Math.random() * winMessages.length)];
                slotMessage.textContent = randomMsg;
                slotMessage.style.color = "var(--accent)"; // Оранжевый цвет для победы
            } else {
                slot1.textContent = final1;
                slot2.textContent = final2;
                slot3.textContent = final3;
                
                slotMessage.textContent = "Почти получилось! Попробуй еще раз 😉";
                slotMessage.style.color = "var(--text)";
            }

            // Разблокируем кнопку
            spinBtn.disabled = false;
        }, 1500);
    });
}
