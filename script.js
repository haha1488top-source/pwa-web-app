let count = parseInt(localStorage.getItem('clickCount')) || 0;
const counterElement = document.getElementById('count');
const clickerImg = document.getElementById('clicker');

function updateCounter() {
    counterElement.textContent = count;
    localStorage.setItem('clickCount', count);
}

function resetCounter() {
    if(confirm('Скинути рахунок?')) {
        count = 0;
        updateCounter();
    }
}

clickerImg.addEventListener('click', () => {
    count++;
    updateCounter();
    
    // Анімація
    clickerImg.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickerImg.style.transform = 'scale(1)';
    }, 100);
});

// Перевірка офлайн режиму
window.addEventListener('online', () => {
    console.log('Онлайн!');
});

window.addEventListener('offline', () => {
    console.log('Офлайн! Але гра працює!');
});

// Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
    updateCounter();
    console.log('Гра завантажена!');
});
