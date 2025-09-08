class AlphabetGame {
    constructor() {
        this.currentMode = 'letters';
        this.currentIndex = 0;
        this.currentPhase = 0;
        this.score = 0;
        this.wordSlots = [];
        this.hasPlayedInstructions = {
            letters: false,
            words: false
        };
        this.consecutiveErrors = 0;
        
        this.phases = [
            { word: 'SOL', emoji: '☀️', letters: ['S', 'O', 'L'] },
            { word: 'MAR', emoji: '🌊', letters: ['M', 'A', 'R'] },
            { word: 'CÉU', emoji: '☁️', letters: ['C', 'É', 'U'] },
            { word: 'CASA', emoji: '🏠', letters: ['C', 'A', 'S', 'A'] },
            { word: 'GATO', emoji: '🐱', letters: ['G', 'A', 'T', 'O'] },
            { word: 'FLOR', emoji: '🌸', letters: ['F', 'L', 'O', 'R'] },
            { word: 'BOLA', emoji: '⚽', letters: ['B', 'O', 'L', 'A'] },
            { word: 'PATO', emoji: '🦆', letters: ['P', 'A', 'T', 'O'] },
            { word: 'RATO', emoji: '🐭', letters: ['R', 'A', 'T', 'O'] },
            { word: 'VACA', emoji: '🐄', letters: ['V', 'A', 'C', 'A'] },
            { word: 'CAVALO', emoji: '🐴', letters: ['C', 'A', 'V', 'A', 'L', 'O'] },
            { word: 'ZEBRA', emoji: '🦓', letters: ['Z', 'E', 'B', 'R', 'A'] },
            { word: 'LEÃO', emoji: '🦁', letters: ['L', 'E', 'Ã', 'O'] },
            { word: 'URSO', emoji: '🐻', letters: ['U', 'R', 'S', 'O'] },
            { word: 'PEIXE', emoji: '🐟', letters: ['P', 'E', 'I', 'X', 'E'] },
            { word: 'ÁRVORE', emoji: '🌳', letters: ['Á', 'R', 'V', 'O', 'R', 'E'] },
            { word: 'BANANA', emoji: '🍌', letters: ['B', 'A', 'N', 'A', 'N', 'A'] },
            { word: 'MAÇÃ', emoji: '🍎', letters: ['M', 'A', 'Ç', 'Ã'] },
            { word: 'LIVRO', emoji: '📚', letters: ['L', 'I', 'V', 'R', 'O'] },
            { word: 'ESCOLA', emoji: '🏫', letters: ['E', 'S', 'C', 'O', 'L', 'A'] },
            { word: 'AMIGO', emoji: '👫', letters: ['A', 'M', 'I', 'G', 'O'] },
            { word: 'FAMÍLIA', emoji: '👨‍👩‍👧‍👦', letters: ['F', 'A', 'M', 'Í', 'L', 'I', 'A'] },
            { word: 'CORAÇÃO', emoji: '❤️', letters: ['C', 'O', 'R', 'A', 'Ç', 'Ã', 'O'] },
            { word: 'ESTRELA', emoji: '⭐', letters: ['E', 'S', 'T', 'R', 'E', 'L', 'A'] },
            { word: 'BORBOLETA', emoji: '🦋', letters: ['B', 'O', 'R', 'B', 'O', 'L', 'E', 'T', 'A'] },
            { word: 'ARCO-ÍRIS', emoji: '🌈', letters: ['A', 'R', 'C', 'O', '-', 'Í', 'R', 'I', 'S'] },
            { word: 'CHOCOLATE', emoji: '🍫', letters: ['C', 'H', 'O', 'C', 'O', 'L', 'A', 'T', 'E'] },
            { word: 'BICICLETA', emoji: '🚲', letters: ['B', 'I', 'C', 'I', 'C', 'L', 'E', 'T', 'A'] },
            { word: 'COMPUTADOR', emoji: '💻', letters: ['C', 'O', 'M', 'P', 'U', 'T', 'A', 'D', 'O', 'R'] },
            { word: 'FELICIDADE', emoji: '😊', letters: ['F', 'E', 'L', 'I', 'C', 'I', 'D', 'A', 'D', 'E'] }
        ];
        this.alphabet = [
            { letter: 'A', word: 'ABELHA', emoji: '🐝' },
            { letter: 'B', word: 'BOLA', emoji: '⚽' },
            { letter: 'C', word: 'CASA', emoji: '🏠' },
            { letter: 'D', word: 'DADO', emoji: '🎲' },
            { letter: 'E', word: 'ELEFANTE', emoji: '🐘' },
            { letter: 'F', word: 'FLOR', emoji: '🌸' },
            { letter: 'G', word: 'GATO', emoji: '🐱' },
            { letter: 'H', word: 'HIPOPÓTAMO', emoji: '🦛' },
            { letter: 'I', word: 'IGREJA', emoji: '⛪' },
            { letter: 'J', word: 'JACARÉ', emoji: '🐊' },
            { letter: 'K', word: 'KIWI', emoji: '🥝' },
            { letter: 'L', word: 'LEÃO', emoji: '🦁' },
            { letter: 'M', word: 'MACACO', emoji: '🐵' },
            { letter: 'N', word: 'NAVIO', emoji: '🚢' },
            { letter: 'O', word: 'ÓCULOS', emoji: '👓' },
            { letter: 'P', word: 'PATO', emoji: '🦆' },
            { letter: 'Q', word: 'QUEIJO', emoji: '🧀' },
            { letter: 'R', word: 'RATO', emoji: '🐭' },
            { letter: 'S', word: 'SOL', emoji: '☀️' },
            { letter: 'T', word: 'TARTARUGA', emoji: '🐢' },
            { letter: 'U', word: 'UVA', emoji: '🍇' },
            { letter: 'V', word: 'VACA', emoji: '🐄' },
            { letter: 'W', word: 'WIFI', emoji: '📶' },
            { letter: 'X', word: 'XÍCARA', emoji: '☕' },
            { letter: 'Y', word: 'YOGA', emoji: '🧘' },
            { letter: 'Z', word: 'ZEBRA', emoji: '🦓' }
        ];
        
        this.init();
    }

    init() {
        this.createAlphabetGrid();
        this.updateDisplay();
        this.setupWordGame();
        this.bindEvents();
        this.playWelcomeSound();
    }

    createAlphabetGrid() {
        const grid = document.getElementById('alphabet-grid');
        this.alphabet.forEach((item, index) => {
            const button = document.createElement('button');
            button.className = 'letter-btn';
            button.textContent = item.letter;
            button.addEventListener('click', () => this.selectLetter(index));
            grid.appendChild(button);
        });
    }

    updateDisplay() {
        const current = this.alphabet[this.currentIndex];
        document.getElementById('current-letter').textContent = current.letter;
        document.getElementById('letter-word').textContent = current.word;
        document.getElementById('letter-image').textContent = current.emoji;
        
        // Atualizar botões ativos
        document.querySelectorAll('.letter-btn').forEach((btn, index) => {
            btn.classList.toggle('active', index === this.currentIndex);
        });
        
        document.getElementById('score').textContent = this.score;
    }

    selectLetter(index) {
        this.currentIndex = index;
        this.updateDisplay();
        this.playLetterSound();
        this.addScore(10);
        this.showFeedback();
    }

    playLetterSound() {
        // Síntese de voz para pronunciar a letra e palavra com pausa
        if ('speechSynthesis' in window) {
            const current = this.alphabet[this.currentIndex];
            
            // Primeira parte: Letra
            const letterUtterance = new SpeechSynthesisUtterance();
            letterUtterance.text = `Letra ${current.letter}`;
            letterUtterance.lang = 'pt-BR';
            letterUtterance.rate = 0.8;
            letterUtterance.pitch = 1.2;
            
            // Segunda parte: Palavra (com pausa)
            letterUtterance.onend = () => {
                setTimeout(() => {
                    const wordUtterance = new SpeechSynthesisUtterance();
                    wordUtterance.text = `encontramos na palavra ${current.word}`;
                    wordUtterance.lang = 'pt-BR';
                    wordUtterance.rate = 0.8;
                    wordUtterance.pitch = 1.1;
                    speechSynthesis.speak(wordUtterance);
                }, 800); // Pausa de 800ms
            };
            
            speechSynthesis.speak(letterUtterance);
        }
        
        // Som de clique visual
        this.playClickSound();
    }

    playClickSound() {
        // Criar som de clique usando Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    playWelcomeSound() {
        if ('speechSynthesis' in window) {
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance();
                utterance.text = 'Bem-vindos ao jogo do alfabeto! Cliquem nas letras para ouvir como elas aparecem nas palavras!';
                utterance.lang = 'pt-BR';
                utterance.rate = 0.9;
                utterance.pitch = 1.1;
                speechSynthesis.speak(utterance);
            }, 1000);
        }
    }

    nextLetter() {
        this.currentIndex = (this.currentIndex + 1) % this.alphabet.length;
        this.updateDisplay();
        this.playLetterSound();
    }

    prevLetter() {
        this.currentIndex = this.currentIndex === 0 ? this.alphabet.length - 1 : this.currentIndex - 1;
        this.updateDisplay();
        this.playLetterSound();
    }

    addScore(points) {
        this.score += points;
        this.updateDisplay();
    }

    showFeedback() {
        const letterDisplay = document.querySelector('.letter-display');
        letterDisplay.style.transform = 'scale(1.05)';
        letterDisplay.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            letterDisplay.style.transform = 'scale(1)';
        }, 300);
    }

    switchMode(mode) {
        this.currentMode = mode;
        
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (mode === 'letters') {
            document.getElementById('letters-mode').classList.add('active');
            document.getElementById('letters-section').classList.remove('hidden');
            document.getElementById('words-section').classList.add('hidden');
        } else {
            document.getElementById('words-mode').classList.add('active');
            document.getElementById('letters-section').classList.add('hidden');
            document.getElementById('words-section').classList.remove('hidden');
            
            // Áudio de boas-vindas apenas na primeira vez
            if ('speechSynthesis' in window && !this.hasPlayedInstructions.words) {
                const utterance = new SpeechSynthesisUtterance();
                utterance.text = 'Agora vamos montar palavras! Você vai arrastar as letras para formar as palavras.';
                utterance.lang = 'pt-BR';
                utterance.rate = 0.9;
                utterance.pitch = 1.1;
                utterance.onend = () => {
                    this.startWordGame();
                };
                speechSynthesis.speak(utterance);
            } else {
                this.startWordGame();
            }
        }
    }

    setupWordGame() {
        this.currentPhase = 0;
        this.startWordGame();
    }

    startWordGame() {
        const phase = this.phases[this.currentPhase];
        document.getElementById('word-image').textContent = phase.emoji;
        document.getElementById('word-hint').textContent = phase.word;
        document.getElementById('current-phase').textContent = this.currentPhase + 1;
        
        this.createWordSlots(phase.word);
        this.createAvailableLetters(phase.letters);
        
        document.getElementById('next-phase').classList.add('hidden');
        
        // Áudio explicativo
        this.playWordInstructions(phase.word);
    }

    createWordSlots(word) {
        const container = document.getElementById('word-slots');
        container.innerHTML = '';
        this.wordSlots = [];
        
        for (let i = 0; i < word.length; i++) {
            const slot = document.createElement('div');
            slot.className = 'letter-slot';
            slot.dataset.index = i;
            slot.dataset.letter = word[i];
            
            slot.addEventListener('dragover', this.handleDragOver.bind(this));
            slot.addEventListener('drop', this.handleDrop.bind(this));
            slot.addEventListener('dragleave', this.handleDragLeave.bind(this));
            
            container.appendChild(slot);
            this.wordSlots.push({ element: slot, letter: word[i], filled: false });
        }
    }

    createAvailableLetters(letters) {
        const container = document.getElementById('available-letters');
        container.innerHTML = '';
        
        // Adicionar letras extras para confundir
        const extraLetters = ['B', 'D', 'E', 'I', 'M', 'N', 'P', 'R', 'U', 'X'];
        const allLetters = [...letters];
        
        // Adicionar algumas letras extras aleatórias
        for (let i = 0; i < 3; i++) {
            const randomLetter = extraLetters[Math.floor(Math.random() * extraLetters.length)];
            if (!allLetters.includes(randomLetter)) {
                allLetters.push(randomLetter);
            }
        }
        
        // Embaralhar letras
        allLetters.sort(() => Math.random() - 0.5);
        
        allLetters.forEach((letter, index) => {
            const letterEl = document.createElement('div');
            letterEl.className = 'draggable-letter';
            letterEl.textContent = letter;
            letterEl.draggable = true;
            letterEl.dataset.letter = letter;
            letterEl.dataset.id = index;
            
            letterEl.addEventListener('dragstart', this.handleDragStart.bind(this));
            letterEl.addEventListener('dragend', this.handleDragEnd.bind(this));
            
            container.appendChild(letterEl);
        });
    }

    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.letter);
        e.dataTransfer.setData('element-id', e.target.dataset.id);
        e.target.classList.add('dragging');
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
        e.target.classList.add('drop-target');
    }

    handleDragLeave(e) {
        e.target.classList.remove('drop-target');
    }

    handleDrop(e) {
        e.preventDefault();
        e.target.classList.remove('drop-target');
        
        const droppedLetter = e.dataTransfer.getData('text/plain');
        const elementId = e.dataTransfer.getData('element-id');
        const slot = e.target;
        const slotIndex = parseInt(slot.dataset.index);
        
        if (droppedLetter === slot.dataset.letter && !this.wordSlots[slotIndex].filled) {
            slot.textContent = droppedLetter;
            slot.classList.add('filled');
            this.wordSlots[slotIndex].filled = true;
            
            // Marcar letra como usada
            const letterElement = document.querySelector(`[data-id="${elementId}"]`);
            letterElement.classList.add('used');
            letterElement.draggable = false;
            
            this.playClickSound();
            this.checkWordComplete();
        } else {
            // Erro - letra errada
            this.consecutiveErrors++;
            this.playErrorFeedback();
        }
    }

    checkWordComplete() {
        const allFilled = this.wordSlots.every(slot => slot.filled);
        
        if (allFilled) {
            this.playSuccessSound();
            this.addScore(50);
            document.getElementById('next-phase').classList.remove('hidden');
            
            // Animação de sucesso
            document.querySelector('.target-word').style.transform = 'scale(1.1)';
            setTimeout(() => {
                document.querySelector('.target-word').style.transform = 'scale(1)';
            }, 500);
        }
    }

    checkWord() {
        this.checkWordComplete();
    }

    clearWord() {
        this.wordSlots.forEach(slot => {
            slot.element.textContent = '';
            slot.element.classList.remove('filled');
            slot.filled = false;
        });
        
        document.querySelectorAll('.draggable-letter').forEach(letter => {
            letter.classList.remove('used');
            letter.draggable = true;
        });
        
        document.getElementById('next-phase').classList.add('hidden');
    }

    nextPhase() {
        if (this.currentPhase < this.phases.length - 1) {
            this.currentPhase++;
            this.startWordGame();
        } else {
            this.playWelcomeSound();
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance();
                utterance.text = 'Parabéns! Você completou todas as fases!';
                utterance.lang = 'pt-BR';
                speechSynthesis.speak(utterance);
            }
            this.currentPhase = 0;
            this.startWordGame();
        }
    }

    playSuccessSound() {
        this.consecutiveErrors = 0;
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            const phrases = ['Muito bem!', 'Parabéns!', 'Perfeito!', 'Excelente!'];
            utterance.text = phrases[Math.floor(Math.random() * phrases.length)];
            utterance.lang = 'pt-BR';
            utterance.rate = 1.0;
            utterance.pitch = 1.3;
            speechSynthesis.speak(utterance);
        }
        this.playToneSequence([523, 659, 784]);
    }

    playWordInstructions(word) {
        if ('speechSynthesis' in window) {
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance();
                // Instruções completas apenas na primeira vez ou após muitos erros
                if (!this.hasPlayedInstructions.words || this.consecutiveErrors >= 3) {
                    utterance.text = `Mova as letras para montar a palavra ${word}. Arraste cada letra para o lugar correto!`;
                    this.hasPlayedInstructions.words = true;
                    this.consecutiveErrors = 0;
                } else {
                    utterance.text = `Agora monte: ${word}`;
                }
                utterance.lang = 'pt-BR';
                utterance.rate = 0.8;
                utterance.pitch = 1.1;
                speechSynthesis.speak(utterance);
            }, 500);
        }
    }

    playErrorFeedback() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            if (this.consecutiveErrors === 1) {
                utterance.text = 'Ops! Tente outra letra.';
            } else if (this.consecutiveErrors === 2) {
                utterance.text = 'Quase lá! Tente novamente.';
            } else if (this.consecutiveErrors >= 3) {
                utterance.text = 'Vamos com calma. Observe bem as letras da palavra.';
            }
            utterance.lang = 'pt-BR';
            utterance.rate = 1.0;
            utterance.pitch = 0.9;
            speechSynthesis.speak(utterance);
        }
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

    bindEvents() {
        // Botões de modo
        document.getElementById('letters-mode').addEventListener('click', () => {
            this.switchMode('letters');
        });

        document.getElementById('words-mode').addEventListener('click', () => {
            this.switchMode('words');
        });

        // Controles de letras
        document.getElementById('play-sound').addEventListener('click', () => {
            this.playLetterSound();
        });

        document.getElementById('next-letter').addEventListener('click', () => {
            this.nextLetter();
        });

        document.getElementById('prev-letter').addEventListener('click', () => {
            this.prevLetter();
        });

        // Controles de palavras
        document.getElementById('check-word').addEventListener('click', () => {
            this.checkWord();
        });

        document.getElementById('clear-word').addEventListener('click', () => {
            this.clearWord();
        });

        document.getElementById('next-phase').addEventListener('click', () => {
            this.nextPhase();
        });

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (this.currentMode === 'letters') {
                switch(e.key) {
                    case 'ArrowRight':
                        this.nextLetter();
                        break;
                    case 'ArrowLeft':
                        this.prevLetter();
                        break;
                    case ' ':
                        e.preventDefault();
                        this.playLetterSound();
                        break;
                }
            }
        });
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new AlphabetGame();
});