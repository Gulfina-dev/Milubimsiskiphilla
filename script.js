// === МЕНЮ ===
const burgerBtn = document.getElementById('burgerBtn');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');

function openMenu() {
    sideMenu.classList.add('open');
    overlay.classList.add('active');
    
    // Прячем гирлянду при открытии меню
    const garland = document.querySelector('.garland');
    if (garland) garland.style.display = 'none'; 
}

function closeMenu() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('active');
    
    // Возвращаем гирлянду при закрытии меню
    const garland = document.querySelector('.garland');
    if (garland) garland.style.display = 'flex'; 
}
if (burgerBtn) {
    burgerBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
}

// === СЛОТ-МАШИНА (КАЗИК) ===
const spinBtn = document.getElementById('spin-btn');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const slotMessage = document.getElementById('slot-message');
const bulbs = document.querySelectorAll('.bulb'); // Находим лампочки

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

// Функция включения/выключения лампочек
function stopLights() {
    bulbs.forEach(b => b.classList.remove('active'));
}

if (spinBtn) {
    spinBtn.addEventListener('click', () => {
        stopLights(); // Выключаем лампочки перед новым спином
        
        spinBtn.disabled = true;
        slotMessage.textContent = "Крутим... 🎰";
        slotMessage.style.color = "var(--text)";
        
        slot1.classList.add('spinning');
        slot2.classList.add('spinning');
        slot3.classList.add('spinning');

        const spinInterval = setInterval(() => {
            slot1.textContent = getRandomSymbol();
            slot2.textContent = getRandomSymbol();
            slot3.textContent = getRandomSymbol();
        }, 50);

        setTimeout(() => {
            clearInterval(spinInterval); 
            
            slot1.classList.remove('spinning');
            slot2.classList.remove('spinning');
            slot3.classList.remove('spinning');

            const final1 = getRandomSymbol();
            const isWin = Math.random() < 0.3; // 30% шанс победы
            
            if (isWin) {
                slot1.textContent = final1;
                slot2.textContent = final1;
                slot3.textContent = final1;
                
                const randomMsg = winMessages[Math.floor(Math.random() * winMessages.length)];
                slotMessage.textContent = randomMsg;
                slotMessage.style.color = "#ffd700";
                
                // Включаем лампочки и салют
                bulbs.forEach(b => b.classList.add('active'));
                startFireworks();
                
                // Выключаем лампочки через 5 секунд
                setTimeout(stopLights, 5000);

            } else {
                slot1.textContent = final1;
                slot2.textContent = getRandomSymbol();
                slot3.textContent = getRandomSymbol();
                
                slotMessage.textContent = "Почти получилось! Попробуй еще раз 😉";
                slotMessage.style.color = "var(--text)";
            }

            spinBtn.disabled = false;
        }, 1500);
    });
}

// === САЛЮТ ===
const canvas = document.getElementById('fireworksCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let isRunning = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const colors = ['#ffd700', '#db552f', '#f7efe9', '#ff69b4', '#4d9fff'];

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 3 + 1;
            this.velocity = {
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.01;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.x *= 0.98;
            this.velocity.y *= 0.98;
            this.alpha -= this.decay;
        }
    }

    function createExplosion(x, y) {
        for (let i = 0; i < 50; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            if (particle.alpha > 0) {
                particle.update();
                particle.draw();
            } else {
                particles.splice(index, 1);
            }
        });
        
        if (particles.length > 0 || isRunning) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationFrameId);
        }
    }

    window.startFireworks = function() {
        isRunning = true;
        let count = 0;
        const interval = setInterval(() => {
            createExplosion(
                Math.random() * canvas.width, 
                Math.random() * (canvas.height * 0.6)
            );
            count++;
            if (count >= 5) clearInterval(interval);
        }, 300);

        animate();
        
        setTimeout(() => {
            isRunning = false;
        }, 5000);
    };
}

// === МИНИ-ИГРА "ПОЙМАЙ ЛИН" ===
const startGameBtn = document.getElementById('start-game-btn');
const gameArea = document.getElementById('game-area');
const mole = document.getElementById('mole');
const scoreDisplay = document.getElementById('score');
const gameOverText = document.getElementById('game-over-text');

let score = 0;
let gameInterval;
let isPlaying = false;

if (startGameBtn) {
    startGameBtn.addEventListener('click', () => {
        if (isPlaying) return; 
        
        score = 0;
        scoreDisplay.textContent = score;
        isPlaying = true;
        gameOverText.style.display = 'none';
        startGameBtn.style.display = 'none'; 
        gameArea.style.display = 'block'; 

        const showMole = () => {
                        if (score >= 10) {
                clearInterval(gameInterval);
                mole.style.display = 'none';
                gameOverText.style.display = 'block';
                isPlaying = false;
                
                // ЗАПУСКАЕМ САЛЮТ!
                startFireworks();
                
                setTimeout(() => {
                    startGameBtn.style.display = 'block';
                    startGameBtn.textContent = "ЕЩЁ РАЗ";
                    gameArea.style.display = 'none';
                }, 3000);
                return;
            }

            const maxX = gameArea.offsetWidth - 100;
            const maxY = gameArea.offsetHeight - 100;
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;

            mole.style.left = randomX + 'px';
            mole.style.top = randomY + 'px';
            
            // Появление
            mole.style.display = 'block';
            mole.classList.remove('mole-hide');
            mole.classList.add('mole-show');

            // Исчезновение через 1 секунду с анимацией
            setTimeout(() => {
                if (mole.style.display === 'block' && isPlaying) {
                    mole.classList.remove('mole-show');
                    mole.classList.add('mole-hide');
                    // Ждем окончания анимации и прячем
                    setTimeout(() => { mole.style.display = 'none'; }, 200);
                }
            }, 1000);
        };

        gameInterval = setInterval(showMole, 1200);
        showMole();
    });

    mole.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isPlaying) return;

        score++;
        scoreDisplay.textContent = score;
        
        // При клике тоже прячем с анимацией
        mole.classList.remove('mole-show');
        mole.classList.add('mole-hide');
        setTimeout(() => { mole.style.display = 'none'; }, 200);
    });
}
