class CalculusGame {
    constructor() {
        this.studentName = '';
        this.currentMode = 'basic';
        this.sessionStartTime = null;
        this.sessionTimer = null;
        
        this.stats = {
            basic: { correct: 0, total: 0, level: 1 },
            fractions: { correct: 0, total: 0, level: 1 },
            equations: { correct: 0, total: 0, level: 1 },
            geometry: { correct: 0, total: 0, level: 1 }
        };
        
        this.currentProblem = null;
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.playWelcomeSound();
    }
    
    playWelcomeSound() {
        if ('speechSynthesis' in window) {
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance();
                utterance.text = 'Bem-vindos ao jogo de cálculos avançados! Digite seu nome para começar.';
                utterance.lang = 'pt-BR';
                utterance.rate = 0.9;
                utterance.pitch = 1.1;
                speechSynthesis.speak(utterance);
            }, 1000);
        }
    }
    
    startSession() {
        const nameInput = document.getElementById('student-name');
        this.studentName = nameInput.value.trim();
        
        if (!this.studentName) {
            alert('Por favor, digite seu nome para começar!');
            return;
        }
        
        document.querySelector('.student-info').classList.add('hidden');
        document.getElementById('game-area').classList.remove('hidden');
        
        this.sessionStartTime = new Date();
        this.startTimer();
        this.generateProblem();
        
        this.speakText(`Olá ${this.studentName}! Vamos começar com operações básicas.`);
    }
    
    startTimer() {
        this.sessionTimer = setInterval(() => {
            const elapsed = new Date() - this.sessionStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            document.getElementById('session-time').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.game-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        document.getElementById(`${mode}-mode`).classList.add('active');
        document.getElementById(`${mode}-section`).classList.remove('hidden');
        
        this.generateProblem();
        this.updateStats();
    }
    
    generateProblem() {
        switch(this.currentMode) {
            case 'basic':
                this.generateBasicProblem();
                break;
            case 'fractions':
                this.generateFractionProblem();
                break;
            case 'equations':
                this.generateEquationProblem();
                break;
            case 'geometry':
                this.generateGeometryProblem();
                break;
        }
    }
    
    generateBasicProblem() {
        const level = this.stats.basic.level;
        let num1, num2, operation, answer;
        
        if (level <= 3) {
            // Multiplicação e divisão básica
            num1 = Math.floor(Math.random() * 50) + 10;
            num2 = Math.floor(Math.random() * 12) + 2;
            operation = Math.random() > 0.5 ? '×' : '÷';
            
            if (operation === '×') {
                answer = num1 * num2;
            } else {
                answer = num1;
                num1 = answer * num2;
            }
        } else if (level <= 6) {
            // Números maiores
            num1 = Math.floor(Math.random() * 200) + 50;
            num2 = Math.floor(Math.random() * 50) + 10;
            operation = Math.random() > 0.5 ? '+' : '-';
            answer = operation === '+' ? num1 + num2 : num1 - num2;
        } else {
            // Problemas complexos
            num1 = Math.floor(Math.random() * 100) + 20;
            num2 = Math.floor(Math.random() * 100) + 20;
            operation = '×';
            answer = num1 * num2;
        }
        
        this.currentProblem = { num1, num2, operation, answer };
        document.getElementById('basic-problem').textContent = `${num1} ${operation} ${num2} = ?`;
        document.getElementById('basic-level').textContent = level;
        document.getElementById('basic-answer').value = '';
        document.getElementById('basic-answer').focus();
    }
    
    generateFractionProblem() {
        const level = this.stats.fractions.level;
        let num1, den1, num2, den2, operation;
        
        if (level <= 2) {
            // Frações simples
            den1 = Math.floor(Math.random() * 8) + 2;
            den2 = den1; // Mesmo denominador
            num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
            num2 = Math.floor(Math.random() * (den2 - 1)) + 1;
            operation = '+';
        } else {
            // Denominadores diferentes
            den1 = Math.floor(Math.random() * 6) + 2;
            den2 = Math.floor(Math.random() * 6) + 2;
            num1 = Math.floor(Math.random() * den1) + 1;
            num2 = Math.floor(Math.random() * den2) + 1;
            operation = Math.random() > 0.5 ? '+' : '-';
        }
        
        // Calcular resposta
        const mmc = this.lcm(den1, den2);
        const newNum1 = num1 * (mmc / den1);
        const newNum2 = num2 * (mmc / den2);
        const resultNum = operation === '+' ? newNum1 + newNum2 : newNum1 - newNum2;
        
        // Simplificar
        const gcd = this.gcd(Math.abs(resultNum), mmc);
        const finalNum = resultNum / gcd;
        const finalDen = mmc / gcd;
        
        this.currentProblem = { 
            num1, den1, num2, den2, operation,
            answer: { numerator: finalNum, denominator: finalDen }
        };
        
        document.getElementById('fractions-problem').textContent = 
            `${num1}/${den1} ${operation} ${num2}/${den2} = ?`;
        document.getElementById('numerator').value = '';
        document.getElementById('denominator').value = '';
        document.getElementById('numerator').focus();
    }
    
    generateEquationProblem() {
        const level = this.stats.equations.level;
        let a, b, x;
        
        if (level <= 2) {
            // x + a = b
            x = Math.floor(Math.random() * 20) + 1;
            a = Math.floor(Math.random() * 15) + 1;
            b = x + a;
            this.currentProblem = { equation: `x + ${a} = ${b}`, answer: x };
            document.getElementById('equation-problem').textContent = `x + ${a} = ${b}`;
        } else if (level <= 4) {
            // ax + b = c
            x = Math.floor(Math.random() * 10) + 1;
            a = Math.floor(Math.random() * 5) + 2;
            b = Math.floor(Math.random() * 10) + 1;
            const c = a * x + b;
            this.currentProblem = { equation: `${a}x + ${b} = ${c}`, answer: x };
            document.getElementById('equation-problem').textContent = `${a}x + ${b} = ${c}`;
        } else {
            // ax - b = c
            x = Math.floor(Math.random() * 8) + 1;
            a = Math.floor(Math.random() * 4) + 2;
            b = Math.floor(Math.random() * 8) + 1;
            const c = a * x - b;
            this.currentProblem = { equation: `${a}x - ${b} = ${c}`, answer: x };
            document.getElementById('equation-problem').textContent = `${a}x - ${b} = ${c}`;
        }
        
        document.getElementById('equation-answer').value = '';
        document.getElementById('equation-answer').focus();
    }
    
    generateGeometryProblem() {
        const level = this.stats.geometry.level;
        const problems = [
            'rectangle', 'triangle', 'circle', 'trapezoid'
        ];
        
        const problemType = problems[Math.floor(Math.random() * Math.min(level + 1, problems.length))];
        
        if (problemType === 'rectangle') {
            const width = Math.floor(Math.random() * 15) + 3;
            const height = Math.floor(Math.random() * 12) + 3;
            const area = width * height;
            
            this.currentProblem = { type: 'rectangle', width, height, answer: area };
            document.getElementById('geometry-problem').textContent = 'Área do retângulo:';
            
            const rect = document.querySelector('.rectangle');
            const dimensions = rect.querySelectorAll('.dimension');
            dimensions[0].textContent = `${width} cm`;
            dimensions[1].textContent = `${height} cm`;
        }
        
        document.getElementById('geometry-answer').value = '';
        document.getElementById('geometry-answer').focus();
    }
    
    checkAnswer() {
        let isCorrect = false;
        let userAnswer;
        
        switch(this.currentMode) {
            case 'basic':
                userAnswer = parseInt(document.getElementById('basic-answer').value);
                isCorrect = userAnswer === this.currentProblem.answer;
                break;
                
            case 'fractions':
                const num = parseInt(document.getElementById('numerator').value);
                const den = parseInt(document.getElementById('denominator').value);
                isCorrect = num === this.currentProblem.answer.numerator && 
                           den === this.currentProblem.answer.denominator;
                break;
                
            case 'equations':
                userAnswer = parseInt(document.getElementById('equation-answer').value);
                isCorrect = userAnswer === this.currentProblem.answer;
                break;
                
            case 'geometry':
                userAnswer = parseInt(document.getElementById('geometry-answer').value);
                isCorrect = userAnswer === this.currentProblem.answer;
                break;
        }
        
        this.stats[this.currentMode].total++;
        
        if (isCorrect) {
            this.stats[this.currentMode].correct++;
            this.playSuccessSound();
            
            // Aumentar nível a cada 3 acertos
            if (this.stats[this.currentMode].correct % 3 === 0) {
                this.stats[this.currentMode].level++;
            }
        } else {
            this.playErrorSound();
        }
        
        this.updateStats();
        
        setTimeout(() => {
            this.generateProblem();
        }, 1500);
    }
    
    showHint() {
        let hint = '';
        
        switch(this.currentMode) {
            case 'basic':
                if (this.currentProblem.operation === '×') {
                    hint = `Dica: ${this.currentProblem.num1} vezes ${this.currentProblem.num2}. Tente fazer a multiplicação por partes.`;
                } else if (this.currentProblem.operation === '÷') {
                    hint = `Dica: Quantas vezes ${this.currentProblem.num2} cabe em ${this.currentProblem.num1}?`;
                }
                break;
                
            case 'fractions':
                hint = 'Dica: Para somar frações, encontre o denominador comum e some os numeradores.';
                break;
                
            case 'equations':
                hint = 'Dica: Isole o x fazendo operações inversas dos dois lados da equação.';
                break;
                
            case 'geometry':
                hint = 'Dica: Área do retângulo = largura × altura.';
                break;
        }
        
        this.speakText(hint);
    }
    
    finishSession() {
        clearInterval(this.sessionTimer);
        
        document.getElementById('game-area').classList.add('hidden');
        document.getElementById('report-section').classList.remove('hidden');
        
        this.generateReport();
    }
    
    generateReport() {
        const totalCorrect = Object.values(this.stats).reduce((sum, stat) => sum + stat.correct, 0);
        const totalQuestions = Object.values(this.stats).reduce((sum, stat) => sum + stat.total, 0);
        const finalGrade = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 10).toFixed(1) : '0.0';
        
        document.getElementById('report-name').textContent = this.studentName;
        document.getElementById('final-grade').textContent = finalGrade;
        
        // Detalhes por categoria
        Object.keys(this.stats).forEach(mode => {
            const stat = this.stats[mode];
            const grade = stat.total > 0 ? ((stat.correct / stat.total) * 10).toFixed(1) : '0.0';
            
            document.getElementById(`${mode}-performance`).textContent = `${stat.correct}/${stat.total}`;
            document.getElementById(`${mode}-grade`).textContent = grade;
        });
        
        const totalTime = new Date() - this.sessionStartTime;
        const minutes = Math.floor(totalTime / 60000);
        const seconds = Math.floor((totalTime % 60000) / 1000);
        
        document.getElementById('total-time').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('session-date').textContent = 
            new Date().toLocaleDateString('pt-BR');
        
        this.speakText(`Parabéns ${this.studentName}! Sua nota final foi ${finalGrade}.`);
    }
    
    printReport() {
        window.print();
    }
    
    newSession() {
        location.reload();
    }
    
    updateStats() {
        const totalCorrect = Object.values(this.stats).reduce((sum, stat) => sum + stat.correct, 0);
        const totalQuestions = Object.values(this.stats).reduce((sum, stat) => sum + stat.total, 0);
        const currentGrade = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 10).toFixed(1) : '0.0';
        
        document.getElementById('correct-count').textContent = totalCorrect;
        document.getElementById('total-count').textContent = totalQuestions;
        document.getElementById('current-grade').textContent = currentGrade;
    }
    
    // Funções auxiliares
    gcd(a, b) {
        return b === 0 ? a : this.gcd(b, a % b);
    }
    
    lcm(a, b) {
        return (a * b) / this.gcd(a, b);
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
        this.speakText('Muito bem! Resposta correta!');
    }
    
    playErrorSound() {
        this.speakText('Ops! Tente novamente na próxima.');
    }
    
    bindEvents() {
        document.getElementById('start-session').addEventListener('click', () => {
            this.startSession();
        });
        
        document.getElementById('student-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.startSession();
            }
        });
        
        // Modos de jogo
        document.getElementById('basic-mode').addEventListener('click', () => {
            this.switchMode('basic');
        });
        
        document.getElementById('fractions-mode').addEventListener('click', () => {
            this.switchMode('fractions');
        });
        
        document.getElementById('equations-mode').addEventListener('click', () => {
            this.switchMode('equations');
        });
        
        document.getElementById('geometry-mode').addEventListener('click', () => {
            this.switchMode('geometry');
        });
        
        // Verificar respostas
        document.getElementById('check-basic').addEventListener('click', () => {
            this.checkAnswer();
        });
        
        document.getElementById('check-fraction').addEventListener('click', () => {
            this.checkAnswer();
        });
        
        document.getElementById('check-equation').addEventListener('click', () => {
            this.checkAnswer();
        });
        
        document.getElementById('check-geometry').addEventListener('click', () => {
            this.checkAnswer();
        });
        
        // Enter para verificar
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkAnswer();
                }
            });
        });
        
        // Controles
        document.getElementById('next-problem').addEventListener('click', () => {
            this.generateProblem();
        });
        
        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });
        
        document.getElementById('finish-session').addEventListener('click', () => {
            this.finishSession();
        });
        
        // Relatório
        document.getElementById('print-report').addEventListener('click', () => {
            this.printReport();
        });
        
        document.getElementById('new-session').addEventListener('click', () => {
            this.newSession();
        });
    }
}

// Inicializar o jogo
document.addEventListener('DOMContentLoaded', () => {
    new CalculusGame();
});