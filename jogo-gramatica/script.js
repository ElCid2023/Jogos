class GrammarGame {
    constructor() {
        this.currentMode = 'morphology';
        this.currentLevel = 1;
        this.score = 0;
        this.streak = 0;
        this.currentChallenge = 0;
        
        this.morphologyData = [
            { word: 'CACHORRO', context: 'O <strong>cachorro</strong> brincava no jardim.', answer: 'Substantivo', options: ['Substantivo', 'Adjetivo', 'Verbo', 'Advérbio'] },
            { word: 'BONITO', context: 'O menino é muito <strong>bonito</strong>.', answer: 'Adjetivo', options: ['Substantivo', 'Adjetivo', 'Verbo', 'Advérbio'] },
            { word: 'CORREU', context: 'João <strong>correu</strong> até a escola.', answer: 'Verbo', options: ['Substantivo', 'Adjetivo', 'Verbo', 'Advérbio'] },
            { word: 'RAPIDAMENTE', context: 'Ela chegou <strong>rapidamente</strong>.', answer: 'Advérbio', options: ['Substantivo', 'Adjetivo', 'Verbo', 'Advérbio'] },
            { word: 'LIVRO', context: 'O <strong>livro</strong> está na mesa.', answer: 'Substantivo', options: ['Substantivo', 'Adjetivo', 'Verbo', 'Preposição'] }
        ];
        
        this.syntaxData = [
            { sentence: 'O menino <span class="highlight">estudou</span> matemática.', word: 'estudou', answer: 'Predicado', options: ['Sujeito', 'Predicado', 'Objeto Direto', 'Adjunto Adverbial'] },
            { sentence: '<span class="highlight">Maria</span> comprou um livro.', word: 'Maria', answer: 'Sujeito', options: ['Sujeito', 'Predicado', 'Objeto Direto', 'Adjunto Adverbial'] },
            { sentence: 'Pedro leu <span class="highlight">o jornal</span>.', word: 'o jornal', answer: 'Objeto Direto', options: ['Sujeito', 'Predicado', 'Objeto Direto', 'Adjunto Adverbial'] },
            { sentence: 'Eles chegaram <span class="highlight">ontem</span>.', word: 'ontem', answer: 'Adjunto Adverbial', options: ['Sujeito', 'Predicado', 'Objeto Direto', 'Adjunto Adverbial'] }
        ];
        
        this.analysisData = [
            { 
                sentence: 'O gato subiu na árvore',
                words: ['O', 'gato', 'subiu', 'na', 'árvore'],
                correct: {
                    sujeito: ['O', 'gato'],
                    predicado: ['subiu'],
                    complemento: ['na', 'árvore']
                }
            },
            {
                sentence: 'Maria comprou flores',
                words: ['Maria', 'comprou', 'flores'],
                correct: {
                    sujeito: ['Maria'],
                    predicado: ['comprou'],
                    complemento: ['flores']
                }
            }
        ];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startChallenge();
        this.playWelcomeSound();
    }
    
    playWelcomeSound() {
        if ('speechSynthesis' in window) {
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance();
                utterance.text = 'Bem-vindos ao jogo de gramática! Vamos aprender morfologia, sintaxe e análise de orações!';
                utterance.lang = 'pt-BR';
                utterance.rate = 0.9;
                utterance.pitch = 1.1;
                speechSynthesis.speak(utterance);
            }, 1000);
        }
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        this.currentChallenge = 0;
        
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.game-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        if (mode === 'morphology') {
            document.getElementById('morphology-mode').classList.add('active');
            document.getElementById('morphology-section').classList.remove('hidden');
        } else if (mode === 'syntax') {
            document.getElementById('syntax-mode').classList.add('active');
            document.getElementById('syntax-section').classList.remove('hidden');
        } else if (mode === 'analysis') {
            document.getElementById('analysis-mode').classList.add('active');
            document.getElementById('analysis-section').classList.remove('hidden');
        }
        
        this.startChallenge();
    }
    
    startChallenge() {
        if (this.currentMode === 'morphology') {
            this.startMorphologyChallenge();
        } else if (this.currentMode === 'syntax') {
            this.startSyntaxChallenge();
        } else if (this.currentMode === 'analysis') {
            this.startAnalysisChallenge();
        }
        
        this.updateDisplay();
    }
    
    startMorphologyChallenge() {
        const data = this.morphologyData[this.currentChallenge % this.morphologyData.length];
        
        document.getElementById('target-word').textContent = data.word;
        document.getElementById('word-context').innerHTML = data.context;
        
        const container = document.getElementById('morphology-options');
        container.innerHTML = '';
        
        data.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkMorphologyAnswer(option, data.answer, button));
            container.appendChild(button);
        });
        
        this.speakChallenge(`Identifique a classe gramatical da palavra ${data.word}`);
    }
    
    startSyntaxChallenge() {
        const data = this.syntaxData[this.currentChallenge % this.syntaxData.length];
        
        document.getElementById('sentence-text').innerHTML = data.sentence;
        
        const container = document.getElementById('syntax-options');
        container.innerHTML = '';
        
        data.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkSyntaxAnswer(option, data.answer, button));
            container.appendChild(button);
        });
        
        this.speakChallenge(`Qual a função sintática da palavra destacada?`);
    }
    
    startAnalysisChallenge() {
        const data = this.analysisData[this.currentChallenge % this.analysisData.length];
        
        document.getElementById('analysis-sentence').textContent = data.sentence;
        
        // Limpar zonas de drop
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.innerHTML = '';
        });
        
        // Criar palavras arrastáveis
        const wordBank = document.getElementById('word-bank');
        wordBank.innerHTML = '';
        
        data.words.forEach((word, index) => {
            const wordEl = document.createElement('div');
            wordEl.className = 'draggable-word';
            wordEl.textContent = word;
            wordEl.draggable = true;
            wordEl.dataset.word = word;
            wordEl.dataset.index = index;
            
            wordEl.addEventListener('dragstart', this.handleDragStart.bind(this));
            wordEl.addEventListener('dragend', this.handleDragEnd.bind(this));
            
            wordBank.appendChild(wordEl);
        });
        
        this.speakChallenge('Arraste as palavras para suas funções sintáticas corretas');
    }
    
    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.word);
        e.dataTransfer.setData('element-id', e.target.dataset.index);
        e.target.classList.add('dragging');
    }
    
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    checkMorphologyAnswer(selected, correct, button) {
        const isCorrect = selected === correct;
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correct) {
                btn.classList.add('correct');
            } else if (btn === button && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        this.processAnswer(isCorrect);
    }
    
    checkSyntaxAnswer(selected, correct, button) {
        const isCorrect = selected === correct;
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correct) {
                btn.classList.add('correct');
            } else if (btn === button && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        this.processAnswer(isCorrect);
    }
    
    checkAnalysisAnswer() {
        const data = this.analysisData[this.currentChallenge % this.analysisData.length];
        let isCorrect = true;
        
        // Verificar cada zona de drop
        Object.keys(data.correct).forEach(function_name => {
            const zone = document.getElementById(function_name + '-zone');
            const droppedWords = Array.from(zone.children).map(el => el.textContent);
            const correctWords = data.correct[function_name];
            
            if (droppedWords.length !== correctWords.length || 
                !droppedWords.every(word => correctWords.includes(word))) {
                isCorrect = false;
            }
        });
        
        this.processAnswer(isCorrect);
    }
    
    processAnswer(isCorrect) {
        if (isCorrect) {
            this.score += 20;
            this.streak++;
            this.playSuccessSound();
        } else {
            this.streak = 0;
            this.playErrorSound();
        }
        
        this.updateDisplay();
        
        setTimeout(() => {
            this.nextChallenge();
        }, 2000);
    }
    
    nextChallenge() {
        this.currentChallenge++;
        if (this.currentChallenge % 5 === 0) {
            this.currentLevel++;
        }
        this.startChallenge();
    }
    
    showHint() {
        let hint = '';
        
        if (this.currentMode === 'morphology') {
            hint = 'Dica: Substantivo é nome de coisas, adjetivo qualifica, verbo é ação, advérbio modifica o verbo.';
        } else if (this.currentMode === 'syntax') {
            hint = 'Dica: Sujeito faz a ação, predicado é a ação, objeto recebe a ação, adjunto adiciona informação.';
        } else if (this.currentMode === 'analysis') {
            hint = 'Dica: Sujeito é quem faz, predicado é o que faz, complemento completa o sentido.';
        }
        
        this.speakChallenge(hint);
    }
    
    speakChallenge(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = text;
            utterance.lang = 'pt-BR';
            utterance.rate = 0.8;
            utterance.pitch = 1.1;
            speechSynthesis.speak(utterance);
        }
    }
    
    playSuccessSound() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = 'Muito bem! Resposta correta!';
            utterance.lang = 'pt-BR';
            utterance.rate = 1.0;
            utterance.pitch = 1.3;
            speechSynthesis.speak(utterance);
        }
    }
    
    playErrorSound() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = 'Não foi dessa vez. Vamos tentar novamente!';
            utterance.lang = 'pt-BR';
            utterance.rate = 1.0;
            utterance.pitch = 0.9;
            speechSynthesis.speak(utterance);
        }
    }
    
    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.currentLevel;
        document.getElementById('streak').textContent = this.streak;
    }
    
    bindEvents() {
        // Botões de modo
        document.getElementById('morphology-mode').addEventListener('click', () => {
            this.switchMode('morphology');
        });
        
        document.getElementById('syntax-mode').addEventListener('click', () => {
            this.switchMode('syntax');
        });
        
        document.getElementById('analysis-mode').addEventListener('click', () => {
            this.switchMode('analysis');
        });
        
        // Controles
        document.getElementById('check-answer').addEventListener('click', () => {
            if (this.currentMode === 'analysis') {
                this.checkAnalysisAnswer();
            }
        });
        
        document.getElementById('next-challenge').addEventListener('click', () => {
            this.nextChallenge();
        });
        
        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });
        
        // Eventos de drag and drop para análise
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.addEventListener('dragover', this.handleDragOver.bind(this));
            zone.addEventListener('drop', this.handleDrop.bind(this));
            zone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        });
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        e.target.classList.remove('drag-over');
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');
        
        const word = e.dataTransfer.getData('text/plain');
        const elementId = e.dataTransfer.getData('element-id');
        
        // Criar elemento dropped
        const droppedEl = document.createElement('div');
        droppedEl.className = 'dropped-word';
        droppedEl.textContent = word;
        
        e.target.appendChild(droppedEl);
        
        // Remover da word bank
        const originalEl = document.querySelector(`[data-index="${elementId}"]`);
        if (originalEl) {
            originalEl.remove();
        }
    }
}

// Inicializar o jogo
document.addEventListener('DOMContentLoaded', () => {
    new GrammarGame();
});