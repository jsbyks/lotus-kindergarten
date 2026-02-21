// Mobile Menu Toggle
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Hero Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

function goToSlide(index) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('bg-purple-500');
    dots[currentSlide].classList.add('bg-purple-200');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.remove('bg-purple-200');
    dots[currentSlide].classList.add('bg-purple-500');
}

function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
}

if (slides.length > 0) {
    setInterval(nextSlide, 4000);
}

// Memory Game
const emojis = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁'];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createMemoryGame() {
    const gameContainer = document.getElementById('memoryGame');
    if (!gameContainer) return;
    
    gameContainer.innerHTML = '';
    cards = shuffleArray([...emojis, ...emojis]);
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    
    const moveCountElement = document.getElementById('moveCount');
    if (moveCountElement) moveCountElement.textContent = moves;
    
    const gameMessage = document.getElementById('gameMessage');
    if (gameMessage) gameMessage.classList.add('hidden');
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-back"></div>
                <div class="memory-card-front">${emoji}</div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card, index));
        gameContainer.appendChild(card);
    });
}

function flipCard(card, index) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    flippedCards.push({ card, index, emoji: cards[index] });
    
    if (flippedCards.length === 2) {
        moves++;
        const moveCountElement = document.getElementById('moveCount');
        if (moveCountElement) moveCountElement.textContent = moves;
        
        if (flippedCards[0].emoji === flippedCards[1].emoji) {
            flippedCards.forEach(fc => fc.card.classList.add('matched'));
            matchedPairs++;
            flippedCards = [];
            
            if (matchedPairs === emojis.length) {
                const gameMessage = document.getElementById('gameMessage');
                if (gameMessage) gameMessage.classList.remove('hidden');
            }
        } else {
            setTimeout(() => {
                flippedCards.forEach(fc => fc.card.classList.remove('flipped'));
                flippedCards = [];
            }, 1000);
        }
    }
}

function resetMemoryGame() {
    createMemoryGame();
}

// Counting Game
const countEmojis = ['🍎', '⭐', '🌸', '🎈', '🦋', '🐠', '🌈', '🍀'];
let correctAnswer = 0;
let countScore = 0;

function newCountingRound() {
    const display = document.getElementById('countingDisplay');
    const options = document.getElementById('countingOptions');
    const message = document.getElementById('countMessage');
    
    if (!display || !options || !message) return;
    
    message.classList.add('hidden');
    
    correctAnswer = Math.floor(Math.random() * 8) + 1;
    const emoji = countEmojis[Math.floor(Math.random() * countEmojis.length)];
    
    display.textContent = emoji.repeat(correctAnswer);
    
    options.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = 'bg-pink-100 hover:bg-pink-200 text-pink-600 font-bold py-3 rounded-xl transition';
        btn.addEventListener('click', () => checkAnswer(i));
        options.appendChild(btn);
    }
}

function checkAnswer(answer) {
    const message = document.getElementById('countMessage');
    if (answer === correctAnswer) {
        countScore++;
        const scoreElement = document.getElementById('countScore');
        if (scoreElement) scoreElement.textContent = countScore;
        
        message.textContent = '🎉 Correct! Great job!';
        message.className = 'text-center mt-4 font-fredoka text-xl text-green-500';
    } else {
        message.textContent = '❌ Try again! The answer was ' + correctAnswer;
        message.className = 'text-center mt-4 font-fredoka text-xl text-red-500';
    }
    message.classList.remove('hidden');
    setTimeout(newCountingRound, 1500);
}

// Homework Portal Demo
function showHomework() {
    alert('🔐 Demo Mode\n\nIn the full version, parents can:\n• View homework assignments\n• Download worksheets\n• Submit completed work\n• Track child\'s progress\n• Communicate with teachers');
}

// Smooth Scrolling
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Initialize Games
    createMemoryGame();
    newCountingRound();
});
