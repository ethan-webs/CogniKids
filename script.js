// CogniKids Interactive App Simulator
class CogniKidsSimulator {
    constructor() {
        this.currentGame = null;
        this.gameData = {
            abc: {
                letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                currentIndex: 0,
                correctCount: 0,
                totalQuestions: 5
            },
            numbers: {
                numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                currentIndex: 0,
                correctCount: 0,
                totalQuestions: 5
            },
            shapes: {
                shapes: ['🔺', '🔴', '🔵', '🟡', '🟢', '🟠', '🟣', '⚫', '⚪', '🟤'],
                names: ['Triangle', 'Red Circle', 'Blue Circle', 'Yellow Circle', 'Green Circle', 'Orange Circle', 'Purple Circle', 'Black Circle', 'White Circle', 'Brown Circle'],
                currentIndex: 0,
                correctCount: 0,
                totalQuestions: 5
            }
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showMenu();
    }

    setupEventListeners() {
        // Add click handlers for game buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('game-btn')) {
                const gameType = e.target.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.startGame(gameType);
            }
        });
    }

    startGame(gameType) {
        this.currentGame = gameType;
        const game = this.gameData[gameType];
        game.currentIndex = 0;
        game.correctCount = 0;
        
        this.showGameScreen(gameType);
        this.displayQuestion(gameType);
    }

    showMenu() {
        const gameScreen = document.getElementById('gameScreen');
        gameScreen.innerHTML = `
            <div class="game-menu">
                <h3>Choose Your Adventure!</h3>
                <div class="game-options">
                    <button class="game-btn" onclick="simulator.startGame('abc')">
                        <i class="fas fa-font"></i>
                        <span>ABCs</span>
                    </button>
                    <button class="game-btn" onclick="simulator.startGame('numbers')">
                        <i class="fas fa-calculator"></i>
                        <span>123s</span>
                    </button>
                    <button class="game-btn" onclick="simulator.startGame('shapes')">
                        <i class="fas fa-shapes"></i>
                        <span>Shapes</span>
                    </button>
                </div>
            </div>
        `;
    }

    showGameScreen(gameType) {
        const gameScreen = document.getElementById('gameScreen');
        let gameContent = '';
        
        switch(gameType) {
            case 'abc':
                gameContent = `
                    <div class="game-state active" id="abcGame">
                        <h3>Let's Learn Letters!</h3>
                        <div class="letter-display" id="letterDisplay">A</div>
                        <p>Click the letter you see!</p>
                        <div class="game-options">
                            <button class="game-btn" onclick="simulator.checkAnswer('abc', 'A')">A</button>
                            <button class="game-btn" onclick="simulator.checkAnswer('abc', 'B')">B</button>
                            <button class="game-btn" onclick="simulator.checkAnswer('abc', 'C')">C</button>
                        </div>
                        <div class="game-feedback" id="feedback"></div>
                        <div class="progress" id="progress">Question 1 of 5</div>
                    </div>
                `;
                break;
            case 'numbers':
                gameContent = `
                    <div class="game-state active" id="numbersGame">
                        <h3>Let's Count!</h3>
                        <div class="number-display" id="numberDisplay">1</div>
                        <p>How many fingers do you see?</p>
                        <div class="game-options">
                            <button class="game-btn" onclick="simulator.checkAnswer('numbers', 1)">1</button>
                            <button class="game-btn" onclick="simulator.checkAnswer('numbers', 2)">2</button>
                            <button class="game-btn" onclick="simulator.checkAnswer('numbers', 3)">3</button>
                        </div>
                        <div class="game-feedback" id="feedback"></div>
                        <div class="progress" id="progress">Question 1 of 5</div>
                    </div>
                `;
                break;
            case 'shapes':
                gameContent = `
                    <div class="game-state active" id="shapesGame">
                        <h3>Let's Learn Shapes!</h3>
                        <div class="shape-display" id="shapeDisplay">🔺</div>
                        <p>What shape is this?</p>
                        <div class="game-options">
                            <button class="game-btn" onclick="simulator.checkAnswer('shapes', 'Triangle')">Triangle</button>
                            <button class="game-btn" onclick="simulator.checkAnswer('shapes', 'Circle')">Circle</button>
                            <button class="game-btn" onclick="simulator.checkAnswer('shapes', 'Square')">Square</button>
                        </div>
                        <div class="game-feedback" id="feedback"></div>
                        <div class="progress" id="progress">Question 1 of 5</div>
                    </div>
                `;
                break;
        }
        
        gameScreen.innerHTML = gameContent;
    }

    displayQuestion(gameType) {
        const game = this.gameData[gameType];
        const currentIndex = game.currentIndex;
        
        switch(gameType) {
            case 'abc':
                const letter = game.letters[currentIndex];
                document.getElementById('letterDisplay').textContent = letter;
                break;
            case 'numbers':
                const number = game.numbers[currentIndex];
                document.getElementById('numberDisplay').textContent = number;
                break;
            case 'shapes':
                const shape = game.shapes[currentIndex];
                document.getElementById('shapeDisplay').textContent = shape;
                break;
        }
        
        document.getElementById('progress').textContent = `Question ${currentIndex + 1} of ${game.totalQuestions}`;
    }

    checkAnswer(gameType, answer) {
        const game = this.gameData[gameType];
        const currentIndex = game.currentIndex;
        let correctAnswer = '';
        let isCorrect = false;
        
        switch(gameType) {
            case 'abc':
                correctAnswer = game.letters[currentIndex];
                isCorrect = answer === correctAnswer;
                break;
            case 'numbers':
                correctAnswer = game.numbers[currentIndex];
                isCorrect = answer === correctAnswer;
                break;
            case 'shapes':
                correctAnswer = game.names[currentIndex];
                isCorrect = answer === correctAnswer;
                break;
        }
        
        const feedback = document.getElementById('feedback');
        
        if (isCorrect) {
            game.correctCount++;
            feedback.innerHTML = '<div class="correct">🎉 Great job! You got it right!</div>';
            feedback.style.display = 'block';
        } else {
            feedback.innerHTML = `<div class="incorrect">😊 Not quite! The answer is ${correctAnswer}. Try again!</div>`;
            feedback.style.display = 'block';
        }
        
        // Move to next question after a short delay
        setTimeout(() => {
            game.currentIndex++;
            if (game.currentIndex < game.totalQuestions) {
                this.displayQuestion(gameType);
                feedback.style.display = 'none';
            } else {
                this.showResults(gameType);
            }
        }, 2000);
    }

    showResults(gameType) {
        const game = this.gameData[gameType];
        const percentage = Math.round((game.correctCount / game.totalQuestions) * 100);
        
        const gameScreen = document.getElementById('gameScreen');
        gameScreen.innerHTML = `
            <div class="game-results">
                <h3>🎉 Great Job!</h3>
                <div class="results-display">
                    <div class="score">You got ${game.correctCount} out of ${game.totalQuestions} correct!</div>
                    <div class="percentage">That's ${percentage}%!</div>
                </div>
                <div class="celebration">${this.getCelebrationMessage(percentage)}</div>
                <div class="game-options">
                    <button class="game-btn" onclick="simulator.startGame('${gameType}')">
                        <i class="fas fa-redo"></i>
                        <span>Play Again</span>
                    </button>
                    <button class="game-btn" onclick="simulator.showMenu()">
                        <i class="fas fa-home"></i>
                        <span>Back to Menu</span>
                    </button>
                </div>
            </div>
        `;
    }

    getCelebrationMessage(percentage) {
        if (percentage >= 90) {
            return "🌟 You're a superstar learner!";
        } else if (percentage >= 70) {
            return "🎯 Excellent work!";
        } else if (percentage >= 50) {
            return "👍 Good job! Keep practicing!";
        } else {
            return "💪 Keep trying! You're learning!";
        }
    }
}

// Initialize the simulator when the page loads
let simulator;
document.addEventListener('DOMContentLoaded', function() {
    simulator = new CogniKidsSimulator();
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add some fun animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.curriculum-card, .control-card, .testimonial-card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.game-btn, .pricing-btn, .app-badge');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
