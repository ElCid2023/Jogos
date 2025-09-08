class NumbersGame {
    constructor() {
        this.currentMode = 'numbers';
        this.currentNumber = 1;
        this.score = 0;
        this.streak = 0;
        this.currentProblem = null;
        this.difficulty = 'easy';
        this.hasPlayedInstructions = {
            numbers: false,
            math: false
        };
        this.consecutiveErrors = 0;
        
        this.numbers = [
            { num: 1, word: 'UM', visual: '🟦' },
            { num: 2, word: 'DOIS', visual: '🟦🟦' },
            { num: 3, word: 'TRÊS', visual: '🟦🟦🟦' },
            { num: 4, word: 'QUATRO', visual: '🟦🟦🟦🟦' },
            { num: 5, word: 'CINCO', visual: '🟦🟦🟦🟦🟦' },
            { num: 6, word: 'SEIS', visual: '🟦🟦🟦🟦🟦🟦' },
            { num: 7, word: 'SETE', visual: '🟦🟦🟦🟦🟦🟦🟦' },
            { num: 8, word: 'OITO', visual: '🟦🟦🟦🟦🟦🟦🟦🟦' },
            { num: 9, word: 'NOVE', visual: '🟦🟦🟦🟦🟦🟦🟦🟦🟦' },
            { num: 10, word: 'DEZ', visual: '🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦' }
        ];
        
        this.init();
    }

    init() {
        this.createNumbersGrid();
        this.updateNumberDisplay();
        this.bindEvents();
        this.playWelcomeSound();
    }

    createNumbersGrid() {
        const grid = document.getElementById('numbers-grid');
        for (let i = 1; i <= 20; i++) {
            const button = document.createElement('button');
            button.className = 'number-btn';
            button.textContent = i;
            button.addEventListener('click', () => this.selectNumber(i));
            grid.appendChild(button);
        }
    }

    updateNumberDisplay() {
        const current = this.numbers.find(n => n.num === this.currentNumber) || 
                       { num: this.currentNumber, word: this.numberToWord(this.currentNumber), visual: this.createVisual(this.currentNumber) };
        
        document.getElementById('current-number').textContent = current.num;
        document.getElementById('number-word').textContent = current.word;
        document.getElementById('visual-count').textContent = current.visual;
        
        // Atualizar botões ativos
        document.querySelectorAll('.number-btn').forEach((btn, index) => {
            btn.classList.toggle('active', parseInt(btn.textContent) === this.currentNumber);
        });
        
        this.updateScore();
    }

    numberToWord(num) {
        const words = ['', 'UM', 'DOIS', 'TRÊS', 'QUATRO', 'CINCO', 'SEIS', 'SETE', 'OITO', 'NOVE', 'DEZ',
                      'ONZE', 'DOZE', 'TREZE', 'QUATORZE', 'QUINZE', 'DEZESSEIS', 'DEZESSETE', 'DEZOITO', 'DEZENOVE', 'VINTE'];
        return words[num] || num.toString();
    }

    createVisual(num) {
        const colors = ['🟦', '🟩', '🟨', '🟪', '🟫'];
        let visual = '';
        const color = colors[Math.floor(num / 5) % colors.length];
        
        for (let i = 0; i < Math.min(num, 15); i++) {
            visual += color;
            if ((i + 1) % 5 === 0) visual += ' ';
        }
        
        if (num > 15) visual += ` +${num - 15}`;
        return visual;
    }

    selectNumber(num) {
        this.currentNumber = num;
        this.updateNumberDisplay();
        this.playNumberSound();
        this.addScore(5);
        this.showFeedback('.number-display');
    }

    playNumberSound() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            const current = this.numbers.find(n => n.num === this.currentNumber) || 
                           { word: this.numberToWord(this.currentNumber) };
            utterance.text = `Número ${this.currentNumber}. ${current.word}`;
            utterance.lang = 'pt-BR';
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            speechSynthesis.speak(utterance);
        }
        this.playClickSound();
    }

    playWelcomeSound() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = 'Bem-vindos ao jogo de números! Vamos aprender matemática!';
            utterance.lang = 'pt-BR';
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            speechSynthesis.speak(utterance);
        }
    }

    switchMode(mode) {
        this.currentMode = mode;
        
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (mode === 'numbers') {
            document.getElementById('numbers-mode').classList.add('active');
            document.getElementById('numbers-section').classList.remove('hidden');
            document.getElementById('math-section').classList.add('hidden');
        } else {
            document.getElementById('math-mode').classList.add('active');
            document.getElementById('numbers-section').classList.add('hidden');
            document.getElementById('math-section').classList.remove('hidden');
            this.generateMathProblem();
        }
    }

    generateMathProblem() {
        const maxNum = this.difficulty === 'easy' ? 10 : this.difficulty === 'medium' ? 20 : 50;
        const operations = ['+', '-'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        let num1, num2, answer;
        
        if (operation === '+') {
            num1 = Math.floor(Math.random() * maxNum) + 1;
            num2 = Math.floor(Math.random() * maxNum) + 1;
            answer = num1 + num2;
        } else {
            num1 = Math.floor(Math.random() * maxNum) + 5;
            num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
            answer = num1 - num2;
        }
        
        this.currentProblem = { num1, num2, operation, answer };
        
        document.getElementById('math-display').textContent = `${num1} ${operation} ${num2} = ?`;
        document.getElementById('visual-math').textContent = this.createMathVisual(num1, num2, operation);
        
        this.createAnswerOptions();
    }

    createMathVisual(num1, num2, operation) {
        const visual1 = this.createVisual(Math.min(num1, 10));
        const visual2 = this.createVisual(Math.min(num2, 10));
        const symbol = operation === '+' ? ' + ' : ' - ';
        return visual1 + symbol + visual2 + ' = ?';
    }

    createAnswerOptions() {
        const container = document.getElementById('answer-options');
        container.innerHTML = '';
        
        const correctAnswer = this.currentProblem.answer;
        const options = [correctAnswer];
        
        // Gerar opções incorretas
        while (options.length < 3) {
            const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
            if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
                options.push(wrongAnswer);
            }
        }
        
        // Embaralhar opções
        options.sort(() => Math.random() - 0.5);
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option, button));
            container.appendChild(button);
        });
    }

    checkAnswer(selectedAnswer, button) {
        const isCorrect = selectedAnswer === this.currentProblem.answer;
        
        // Desabilitar todos os botões
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
            if (parseInt(btn.textContent) === this.currentProblem.answer) {
                btn.classList.add('correct');
            } else if (btn === button && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        if (isCorrect) {
            this.addScore(20);
            this.streak++;
            this.playSuccessSound();
            this.showFeedback('.math-problem');
        } else {
            this.streak = 0;
            this.playErrorSound();
        }
        
        this.updateScore();
        
        setTimeout(() => {
            this.generateMathProblem();
        }, 2000);
    }

    playSuccessSound() {
        this.consecutiveErrors = 0;
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            const phrases = ['Muito bem!', 'Correto!', 'Perfeito!', 'Excelente!'];
            utterance.text = phrases[Math.floor(Math.random() * phrases.length)];
            utterance.lang = 'pt-BR';
            utterance.rate = 1.0;
            utterance.pitch = 1.3;
            speechSynthesis.speak(utterance);
        }
        this.playToneSequence([523, 659, 784]);
    }

    playErrorSound() {
        this.consecutiveErrors++;
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            if (this.consecutiveErrors === 1) {
                utterance.text = 'Ops! Tente novamente!';
            } else if (this.consecutiveErrors === 2) {
                utterance.text = 'Quase! Tente outra vez.';
            } else {
                utterance.text = 'Vamos com calma. Use os dedos para contar se precisar.';
            }
            utterance.lang = 'pt-BR';
            utterance.rate = 1.0;
            utterance.pitch = 0.9;
            speechSynthesis.speak(utterance);
        }
        this.playToneSequence([392, 330, 262]);
    }

    playToneSequence(frequencies) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.2);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + index * 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.2 + 0.2);
            
            oscillator.start(audioContext.currentTime + index * 0.2);
            oscillator.stop(audioContext.currentTime + index * 0.2 + 0.2);
        });
    }

    playClickSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    nextNumber() {
        this.currentNumber = this.currentNumber < 20 ? this.currentNumber + 1 : 1;
        this.updateNumberDisplay();
        this.playNumberSound();
    }

    prevNumber() {
        this.currentNumber = this.currentNumber > 1 ? this.currentNumber - 1 : 20;
        this.updateNumberDisplay();
        this.playNumberSound();
    }

    addScore(points) {
        this.score += points;
        if (this.streak >= 3) {
            this.score += this.streak * 2; // Bônus por sequência
        }
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('streak').textContent = this.streak;
    }

    showFeedback(selector) {
        const element = document.querySelector(selector);
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }

    showHint() {
        if (this.currentProblem) {
            const { num1, num2, operation } = this.currentProblem;
            let hint = '';
            
            if (operation === '+') {
                hint = `Dica: Conte ${num1} + ${num2}. Use os dedos para ajudar!`;
            } else {
                hint = `Dica: Comece com ${num1} e tire ${num2}. ${num1} - ${num2}`;
            }
            
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance();
                utterance.text = hint;
                utterance.lang = 'pt-BR';
                utterance.rate = 0.8;
                speechSynthesis.speak(utterance);
            }
        }
    }

    bindEvents() {
        // Botões de modo
        document.getElementById('numbers-mode').addEventListener('click', () => {
            this.switchMode('numbers');
        });

        document.getElementById('math-mode').addEventListener('click', () => {
            this.switchMode('math');
        });

        // Controles de números
        document.getElementById('play-number-sound').addEventListener('click', () => {
            this.playNumberSound();
        });

        document.getElementById('next-number').addEventListener('click', () => {
            this.nextNumber();
        });

        document.getElementById('prev-number').addEventListener('click', () => {
            this.prevNumber();
        });

        // Controles de matemática
        document.getElementById('new-problem').addEventListener('click', () => {
            this.generateMathProblem();
        });

        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });

        document.getElementById('difficulty-select').addEventListener('change', (e) => {
            this.difficulty = e.target.value;
            if (this.currentMode === 'math') {
                this.generateMathProblem();
            }
        });

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (this.currentMode === 'numbers') {
                switch(e.key) {
                    case 'ArrowRight':
                        this.nextNumber();
                        break;
                    case 'ArrowLeft':
                        this.prevNumber();
                        break;
                    case ' ':
                        e.preventDefault();
                        this.playNumberSound();
                        break;
                }
            }
        });
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new NumbersGame();
});