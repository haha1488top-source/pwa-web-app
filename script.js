let count = localStorage.getItem('clickCount') || 0;
const counterElement = document.getElementById('count');
const clickerImg = document.getElementById('clicker');

function updateCounter() {
    counterElement.textContent = count;
    localStorage.setItem('clickCount', count);
}

function resetCounter() {
    count = 0;
    updateCounter();
}

clickerImg.addEventListener('click', () => {
    count++;
    updateCounter();
    
    // Додаємо анімацію
    clickerImg.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickerImg.style.transform = 'scale(1)';
    }, 100);
});

// Ініціалізація
updateCounter();
