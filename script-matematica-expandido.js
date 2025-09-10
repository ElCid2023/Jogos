class ExpandedMathGame {
    constructor() {
        this.currentAge = '7-10';
        this.currentMode = 'counting';
        this.currentLevel = 1;
        this.currentProblem = null;
        this.stats = {
            correct: 0,
            total: 0,
            streak: 0
        };
        
        // Dados para 7-10 anos
        this.basicProblems = {
            counting: [
                { question: 'Quantos objetos há? 🍎🍎🍎', answer: '3', visual: '🍎🍎🍎' },
                { question: 'Conte os animais: 🐱🐱🐱🐱🐱', answer: '5', visual: '🐱🐱🐱🐱🐱' },
                { question: 'Quantas flores? 🌸🌸🌸🌸', answer: '4', visual: '🌸🌸🌸🌸' }
            ],
            operations: [
                { question: '2 + 3 = ?', answer: '5', hint: 'Some 2 + 3' },
                { question: '8 - 3 = ?', answer: '5', hint: 'Tire 3 de 8' },
                { question: '4 × 2 = ?', answer: '8', hint: '4 vezes 2' }
            ]
        };
        
        // Dados para 10-14 anos
        this.intermediateProblems = {
            fractions: [
                { question: '1/2 + 1/4 = ?', answer: '3/4', hint: 'Encontre denominador comum' },
                { question: '2/3 × 3/4 = ?', answer: '1/2', hint: 'Multiplique numeradores e denominadores' },
                { question: '3/5 ÷ 2/3 = ?', answer: '9/10', hint: 'Multiplique pelo inverso' }
            ],
            equations: [
                { question: '2x + 5 = 13', answer: '4', hint: 'Isole o x' },
                { question: '3x - 7 = 14', answer: '7', hint: 'Some 7 aos dois lados' },
                { question: 'x² - 9 = 0', answer: '3', hint: 'Fatore a diferença de quadrados' }
            ],
            geometry: [
                { question: 'Área do retângulo: 5cm × 8cm', answer: '40', hint: 'Área = largura × altura' },
                { question: 'Perímetro do quadrado: lado = 6cm', answer: '24', hint: 'Perímetro = 4 × lado' },
                { question: 'Área do círculo: raio = 3cm (π ≈ 3,14)', answer: '28.26', hint: 'Área = π × r²' }
            ]
        };
        
        // Dados para 15-18 anos
        this.advancedProblems = {
            functions: [
                { question: 'Se f(x) = 2x + 3, calcule f(5)', answer: '13', hint: 'Substitua x por 5' },
                { question: 'Encontre as raízes de x² - 5x + 6 = 0', answer: '2,3', hint: 'Use Bhaskara ou fatoração' },
                { question: 'Se f(x) = x³ - 2x, calcule f(-1)', answer: '1', hint: 'Substitua x por -1' },
                { question: 'Domínio de f(x) = √(x-2)', answer: 'x≥2', hint: 'Radicando deve ser ≥ 0' }
            ],
            formulas: [
                { question: 'Δ = b² - 4ac, onde a=1, b=-5, c=6', answer: '1', hint: 'Discriminante da equação quadrática' },
                { question: 'Volume da esfera: r = 3cm (π ≈ 3,14)', answer: '113.04', hint: 'V = (4/3)πr³' },
                { question: 'Lei dos cossenos: c² = a² + b² - 2ab.cos(C), a=3, b=4, C=90°', answer: '5', hint: 'cos(90°) = 0' },
                { question: 'Área do triângulo: base = 8cm, altura = 6cm', answer: '24', hint: 'A = (b × h)/2' }
            ],
            financial: [
                { question: 'Juros simples: C=R$1000, i=5% a.m., t=3 meses', answer: '150', hint: 'J = C × i × t' },
                { question: 'Montante composto: C=R$2000, i=10% a.a., t=2 anos', answer: '2420', hint: 'M = C(1+i)ⁿ' },
                { question: 'Desconto simples: N=R$500, d=8%, t=2 meses', answer: '80', hint: 'D = N × d × t' },
                { question: '15% de R$ 240 = ?', answer: '36', hint: 'Multiplique por 0,15' },
                { question: 'Taxa equivalente: 2% a.m. em taxa anual', answer: '24', hint: 'Multiplique por 12 (juros simples)' }
            ]
        };
        
        this.reviewContent = {
            intermediate: {
                fractions: {
                    title: 'Frações',
                    topics: [
                        {
                            name: 'O que são frações?',
                            content: 'Frações representam partes de um todo. O número de cima (numerador) indica quantas partes temos, e o de baixo (denominador) em quantas partes o todo foi dividido.',
                            example: 'Exemplo: 3/4 significa 3 partes de um todo dividido em 4 partes iguais.'
                        },
                        {
                            name: 'Soma de Frações',
                            content: 'Para somar frações com denominadores iguais, some os numeradores. Para denominadores diferentes, encontre o MMC.',
                            example: 'Exemplo: 1/4 + 2/4 = 3/4 | 1/2 + 1/3 = 3/6 + 2/6 = 5/6'
                        }
                    ]
                },
                equations: {
                    title: 'Equações',
                    topics: [
                        {
                            name: 'Equações do 1º Grau',
                            content: 'Uma equação do 1º grau tem a forma ax + b = 0. Para resolver, isole o x.',
                            example: 'Exemplo: 2x + 5 = 13 → 2x = 13 - 5 → 2x = 8 → x = 4'
                        }
                    ]
                }
            },
            advanced: {
                functions: {
                    title: 'Funções',
                    topics: [
                        {
                            name: 'Função do 1º Grau',
                            content: 'Tem a forma f(x) = ax + b. O gráfico é uma reta.',
                            example: 'Exemplo: f(x) = 2x + 3. Se x = 5, então f(5) = 2(5) + 3 = 13'
                        }
                    ]
                },
                financial: {
                    title: 'Matemática Financeira',
                    topics: [
                        {
                            name: 'Juros Simples',
                            content: 'J = C × i × t (Capital × taxa × tempo). Montante = Capital + Juros',
                            example: 'Exemplo: R$1000 a 5% a.m. por 3 meses = 1000 × 0,05 × 3 = R$150'
                        }
                    ]
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.generateProblem();
        this.playWelcomeSound();
    }
    
    playWelcomeSound() {
        if ('speechSynthesis' in window) {
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance();
                utterance.text = 'Bem-vindos ao EduGames Brasil - Matemática Completa! Escolha sua faixa etária para começar.';
                utterance.lang = 'pt-BR';
                utterance.rate = 0.9;
                utterance.pitch = 1.1;
                speechSynthesis.speak(utterance);
            }, 1000);
        }
    }
    
    switchAge(age) {
        this.currentAge = age;
        this.stats = { correct: 0, total: 0, streak: 0 };
        
        document.querySelectorAll('.age-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.level-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        document.querySelector(`[data-age="${age}"]`).classList.add('active');
        
        if (age === '7-10') {
            document.getElementById('basic-level').classList.remove('hidden');
            this.currentMode = 'counting';
        } else if (age === '10-14') {
            document.getElementById('intermediate-level').classList.remove('hidden');
            this.currentMode = 'fractions';
        } else if (age === '15-18') {
            document.getElementById('advanced-level').classList.remove('hidden');
            this.currentMode = 'functions';
        }
        
        this.generateProblem();
        this.updateStats();
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById(`${mode}-mode`).classList.add('active');
        
        this.generateProblem();
    }
    
    generateProblem() {
        let problems;
        
        if (this.currentAge === '7-10') {
            problems = this.basicProblems[this.currentMode];
        } else if (this.currentAge === '10-14') {
            problems = this.intermediateProblems[this.currentMode];
        } else if (this.currentAge === '15-18') {
            problems = this.advancedProblems[this.currentMode];
        }
        
        if (!problems || problems.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * problems.length);
        this.currentProblem = problems[randomIndex];
        
        document.getElementById('problem-text').textContent = this.currentProblem.question;
        
        // Mostrar visual se disponível
        const visualElement = document.getElementById('problem-visual');
        if (this.currentProblem.visual) {
            visualElement.textContent = this.currentProblem.visual;
            visualElement.style.display = 'block';
        } else {
            visualElement.style.display = 'none';
        }
        
        // Limpar resposta anterior
        document.getElementById('answer-input').value = '';
        
        // Configurar tipo de resposta baseado na idade
        if (this.currentAge === '7-10') {
            // Crianças: sempre múltipla escolha
            this.setupMultipleChoice();
        } else if (this.currentAge === '15-18' && (this.currentMode === 'functions' || this.currentMode === 'formulas')) {
            // Ensino médio: múltipla escolha para funções e fórmulas
            this.setupMultipleChoice();
        } else {
            // Outros casos: digitação
            document.getElementById('multiple-choice').classList.add('hidden');
            document.getElementById('input-answer').classList.remove('hidden');
            document.getElementById('answer-input').focus();
        }
    }
    
    setupMultipleChoice() {
        const container = document.getElementById('multiple-choice');
        container.innerHTML = '';
        container.classList.remove('hidden');
        document.getElementById('input-answer').classList.add('hidden');
        
        // Gerar opções incorretas
        const correctAnswer = this.currentProblem.answer;
        const options = [correctAnswer];
        
        // Adicionar opções incorretas baseadas no tipo de problema
        while (options.length < 4) {
            let wrongAnswer;
            if (this.currentAge === '7-10') {
                // Para crianças: opções simples próximas à resposta
                const correct = parseInt(correctAnswer);
                wrongAnswer = (correct + Math.floor(Math.random() * 6) - 3).toString();
                if (wrongAnswer === '0' || wrongAnswer.includes('-')) {
                    wrongAnswer = (correct + Math.floor(Math.random() * 3) + 1).toString();
                }
            } else if (this.currentMode === 'functions') {
                wrongAnswer = (parseInt(correctAnswer) + Math.floor(Math.random() * 10) - 5).toString();
            } else if (this.currentMode === 'financial') {
                wrongAnswer = (parseFloat(correctAnswer) * (0.8 + Math.random() * 0.4)).toFixed(2);
            } else {
                wrongAnswer = (parseFloat(correctAnswer) + Math.random() * 20 - 10).toFixed(2);
            }
            
            if (!options.includes(wrongAnswer) && wrongAnswer !== correctAnswer && wrongAnswer > 0) {
                options.push(wrongAnswer);
            }
        }
        
        // Embaralhar opções
        options.sort(() => Math.random() - 0.5);
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkMultipleChoice(option, button));
            container.appendChild(button);
        });
    }
    
    checkMultipleChoice(selected, button) {
        const isCorrect = selected === this.currentProblem.answer;
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === this.currentProblem.answer) {
                btn.classList.add('correct');
            } else if (btn === button && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        this.processAnswer(isCorrect);
    }
    
    checkAnswer() {
        const userAnswer = document.getElementById('answer-input').value.trim();
        const correctAnswer = this.currentProblem.answer;
        
        // Verificar diferentes formatos de resposta
        let isCorrect = false;
        
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            isCorrect = true;
        } else if (this.currentMode === 'fractions') {
            // Para frações, aceitar diferentes formatos
            isCorrect = this.compareFractions(userAnswer, correctAnswer);
        } else if (this.currentMode === 'financial' || this.currentMode === 'geometry') {
            // Para problemas numéricos, aceitar pequenas diferenças
            const userNum = parseFloat(userAnswer);
            const correctNum = parseFloat(correctAnswer);
            isCorrect = Math.abs(userNum - correctNum) < 0.1;
        }
        
        this.processAnswer(isCorrect);
    }
    
    compareFractions(user, correct) {
        // Simplificar comparação de frações
        try {
            const userParts = user.split('/');
            const correctParts = correct.split('/');
            
            if (userParts.length === 2 && correctParts.length === 2) {
                const userValue = parseInt(userParts[0]) / parseInt(userParts[1]);
                const correctValue = parseInt(correctParts[0]) / parseInt(correctParts[1]);
                return Math.abs(userValue - correctValue) < 0.001;
            }
        } catch (e) {
            return false;
        }
        return false;
    }
    
    processAnswer(isCorrect) {
        this.stats.total++;
        
        if (isCorrect) {
            this.stats.correct++;
            this.stats.streak++;
            this.playSuccessSound();
            
            // Aumentar nível a cada 5 acertos
            if (this.stats.correct % 5 === 0) {
                this.currentLevel++;
            }
        } else {
            this.stats.streak = 0;
            this.playErrorSound();
        }
        
        this.updateStats();
        
        setTimeout(() => {
            this.generateProblem();
        }, 2000);
    }
    
    showHint() {
        if (this.currentProblem && this.currentProblem.hint) {
            this.speakText(`Dica: ${this.currentProblem.hint}`);
        } else {
            this.speakText('Pense com calma e tente novamente.');
        }
    }
    
    updateStats() {
        document.getElementById('correct-count').textContent = this.stats.correct;
        document.getElementById('total-count').textContent = this.stats.total;
        document.getElementById('player-level').textContent = this.currentLevel;
        document.getElementById('streak').textContent = this.stats.streak;
        document.getElementById('current-problem').textContent = this.stats.total + 1;
    }
    
    speakText(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = text;
            utterance.lang = 'pt-BR';
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            speechSynthesis.speak(utterance);
        }
    }
    
    playSuccessSound() {
        const phrases = ['Muito bem!', 'Correto!', 'Perfeito!', 'Excelente!'];
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        this.speakText(phrase);
    }
    
    playErrorSound() {
        const phrases = ['Ops! Tente novamente.', 'Quase lá!', 'Não foi dessa vez.'];
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        this.speakText(phrase);
    }
    
    bindEvents() {
        // Seleção de idade
        document.querySelectorAll('.age-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const age = btn.dataset.age;
                this.switchAge(age);
            });
        });
        
        // Modos de jogo e botões de revisão (delegação de eventos)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('mode-btn')) {
                const mode = e.target.id.replace('-mode', '');
                this.switchMode(mode);
            }
            
            if (e.target.id === 'review-btn-intermediate') {
                this.showReview('intermediate');
            }
            
            if (e.target.id === 'review-btn-advanced') {
                this.showReview('advanced');
            }
        });
        
        // Verificar resposta
        document.getElementById('check-answer').addEventListener('click', () => {
            this.checkAnswer();
        });
        
        // Enter para verificar
        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
        
        // Próximo problema
        document.getElementById('next-problem').addEventListener('click', () => {
            this.generateProblem();
        });
        
        // Dica
        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });
        

        
        // Voltar da revisão
        document.getElementById('back-to-game')?.addEventListener('click', () => {
            this.hideReview();
        });
    }
    
    showReview(level) {
        document.getElementById('game-area').classList.add('hidden');
        document.getElementById('review-section').classList.remove('hidden');
        
        const content = this.reviewContent[level];
        const reviewContent = document.getElementById('review-content');
        reviewContent.innerHTML = '';
        
        Object.keys(content).forEach(topicKey => {
            const topic = content[topicKey];
            
            const topicDiv = document.createElement('div');
            topicDiv.className = 'review-topic';
            
            topicDiv.innerHTML = `
                <h3>${topic.title}</h3>
                ${topic.topics.map(item => `
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: #667eea; margin-bottom: 10px;">${item.name}</h4>
                        <p>${item.content}</p>
                        <div class="review-example">
                            <strong>${item.example}</strong>
                        </div>
                    </div>
                `).join('')}
            `;
            
            reviewContent.appendChild(topicDiv);
        });
        
        this.speakText('Aqui está a revisão dos conteúdos. Leia com atenção e depois volte para praticar!');
    }
    
    hideReview() {
        document.getElementById('review-section').classList.add('hidden');
        document.getElementById('game-area').classList.remove('hidden');
        
        this.speakText('Agora que você revisou, vamos praticar!');
    }
}

// Inicializar o jogo
document.addEventListener('DOMContentLoaded', () => {
    new ExpandedMathGame();
});