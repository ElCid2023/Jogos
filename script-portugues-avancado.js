class AdvancedPortugueseGame {
    constructor() {
        this.studentName = '';
        this.currentMode = 'subordinadas';
        this.currentChallenge = 0;
        this.sessionStartTime = null;
        this.sessionTimer = null;
        
        this.stats = {
            subordinadas: { correct: 0, total: 0 },
            literatura: { correct: 0, total: 0 },
            redacao: { correct: 0, total: 0 },
            interpretacao: { correct: 0, total: 0 }
        };
        
        this.hasPlayedInstructions = {
            subordinadas: false,
            literatura: false,
            redacao: false,
            interpretacao: false
        };
        
        // Dados das Orações Subordinadas
        this.subordinadasData = [
            {
                sentence: '"Espero que você venha à festa."',
                clause: 'que você venha',
                answer: 'Subordinada Substantiva Objetiva Direta',
                options: ['Subordinada Substantiva Objetiva Direta', 'Subordinada Adjetiva Restritiva', 'Subordinada Adverbial Temporal', 'Coordenada Sindética Aditiva']
            },
            {
                sentence: '"O livro que comprei é interessante."',
                clause: 'que comprei',
                answer: 'Subordinada Adjetiva Restritiva',
                options: ['Subordinada Adjetiva Restritiva', 'Subordinada Substantiva Subjetiva', 'Subordinada Adverbial Causal', 'Coordenada Sindética Adversativa']
            },
            {
                sentence: '"Quando chegou, todos saíram."',
                clause: 'Quando chegou',
                answer: 'Subordinada Adverbial Temporal',
                options: ['Subordinada Adverbial Temporal', 'Subordinada Substantiva Predicativa', 'Subordinada Adjetiva Explicativa', 'Coordenada Assindética']
            },
            {
                sentence: '"É necessário que estudemos mais."',
                clause: 'que estudemos mais',
                answer: 'Subordinada Substantiva Subjetiva',
                options: ['Subordinada Substantiva Subjetiva', 'Subordinada Adverbial Final', 'Subordinada Adjetiva Restritiva', 'Coordenada Sindética Conclusiva']
            }
        ];
        
        // Dados de Literatura
        this.literaturaData = [
            {
                text: '"Minha terra tem palmeiras, onde canta o Sabiá..."',
                work: 'Canção do Exílio - Gonçalves Dias',
                question: 'A qual escola literária pertence este poema?',
                answer: 'Romantismo',
                options: ['Romantismo', 'Parnasianismo', 'Realismo', 'Modernismo']
            },
            {
                text: '"Capitu, Capitu, Capitu... Os olhos de ressaca..."',
                work: 'Dom Casmurro - Machado de Assis',
                question: 'Qual característica do Realismo está presente?',
                answer: 'Análise psicológica',
                options: ['Análise psicológica', 'Idealização romântica', 'Linguagem rebuscada', 'Nacionalismo exagerado']
            },
            {
                text: '"No meio do caminho tinha uma pedra..."',
                work: 'Carlos Drummond de Andrade',
                question: 'Este verso é característico de qual movimento?',
                answer: 'Modernismo',
                options: ['Modernismo', 'Simbolismo', 'Parnasianismo', 'Romantismo']
            }
        ];
        
        // Dados de Redação
        this.redacaoData = [
            {
                text: 'O Brasil enfrenta sérios problemas ambientais. _____, é necessário implementar políticas sustentáveis.',
                question: 'Qual conectivo melhor completa o texto?',
                answer: 'Portanto',
                options: ['Portanto', 'Entretanto', 'Embora', 'Quando']
            },
            {
                text: 'A educação é fundamental para o desenvolvimento. _____, muitas escolas carecem de recursos.',
                question: 'Qual conectivo expressa oposição?',
                answer: 'Contudo',
                options: ['Contudo', 'Assim', 'Logo', 'Porque']
            },
            {
                text: 'Qual tipo de texto tem como objetivo convencer o leitor?',
                question: 'Identifique o tipo textual:',
                answer: 'Dissertativo-argumentativo',
                options: ['Dissertativo-argumentativo', 'Narrativo', 'Descritivo', 'Injuntivo']
            }
        ];
        
        // Dados de Interpretação
        this.interpretacaoData = [
            {
                text: '"A ironia do destino fez com que o homem mais rico da cidade morresse de fome, cercado por suas riquezas que não podia comer."',
                question: 'Qual figura de linguagem predomina no texto?',
                answer: 'Ironia',
                options: ['Ironia', 'Metáfora', 'Metonímia', 'Hipérbole']
            },
            {
                text: '"Suas palavras eram punhais que atravessavam meu coração."',
                question: 'Identifique a figura de linguagem:',
                answer: 'Metáfora',
                options: ['Metáfora', 'Comparação', 'Personificação', 'Antítese']
            },
            {
                text: '"O silêncio gritava mais alto que qualquer palavra."',
                question: 'Que recurso estilístico foi utilizado?',
                answer: 'Paradoxo',
                options: ['Paradoxo', 'Pleonasmo', 'Eufemismo', 'Catacrese']
            }
        ];
        
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
                utterance.text = 'Bem-vindos ao EduGames Brasil - Português Avançado! Digite seu nome para começar.';
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
        this.startChallenge();
        
        this.speakText(`Olá ${this.studentName}! Vamos começar com orações subordinadas.`);
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
        this.currentChallenge = 0;
        
        speechSynthesis.cancel();
        
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.game-section').forEach(section => {
            section.classList.add('hidden');
        });
        
        document.getElementById(`${mode}-mode`).classList.add('active');
        document.getElementById(`${mode}-section`).classList.remove('hidden');
        
        this.hasPlayedInstructions[mode] = false;
        
        setTimeout(() => {
            this.startChallenge();
        }, 300);
    }
    
    startChallenge() {
        switch(this.currentMode) {
            case 'subordinadas':
                this.startSubordinadasChallenge();
                break;
            case 'literatura':
                this.startLiteraturaChallenge();
                break;
            case 'redacao':
                this.startRedacaoChallenge();
                break;
            case 'interpretacao':
                this.startInterpretacaoChallenge();
                break;
        }
        
        this.updateStats();
    }
    
    startSubordinadasChallenge() {
        const data = this.subordinadasData[this.currentChallenge % this.subordinadasData.length];
        
        document.getElementById('sentence-text').textContent = data.sentence;
        document.getElementById('highlighted-clause').textContent = data.clause;
        
        const container = document.getElementById('subordinadas-options');
        container.innerHTML = '';
        
        data.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option, data.answer, button));
            container.appendChild(button);
        });
        
        if (!this.hasPlayedInstructions.subordinadas) {
            this.speakText('Classifique a oração subordinada destacada na frase.');
            this.hasPlayedInstructions.subordinadas = true;
        }
    }
    
    startLiteraturaChallenge() {
        const data = this.literaturaData[this.currentChallenge % this.literaturaData.length];
        
        document.getElementById('literature-text').textContent = data.text;
        document.getElementById('work-info').textContent = data.work;
        document.getElementById('literature-question').textContent = data.question;
        
        const container = document.getElementById('literatura-options');
        container.innerHTML = '';
        
        data.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option, data.answer, button));
            container.appendChild(button);
        });
        
        if (!this.hasPlayedInstructions.literatura) {
            this.speakText('Analise o texto literário e responda sobre suas características.');
            this.hasPlayedInstructions.literatura = true;
        }
    }
    
    startRedacaoChallenge() {
        const data = this.redacaoData[this.currentChallenge % this.redacaoData.length];
        
        document.getElementById('writing-text').textContent = data.text;
        document.querySelector('#redacao-section .question').textContent = data.question;
        
        const container = document.getElementById('redacao-options');
        container.innerHTML = '';
        
        data.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option, data.answer, button));
            container.appendChild(button);
        });
        
        if (!this.hasPlayedInstructions.redacao) {
            this.speakText('Escolha a melhor opção para completar ou analisar o texto.');
            this.hasPlayedInstructions.redacao = true;
        }
    }
    
    startInterpretacaoChallenge() {
        const data = this.interpretacaoData[this.currentChallenge % this.interpretacaoData.length];
        
        document.getElementById('interpretation-text').innerHTML = `<p>${data.text}</p>`;
        document.getElementById('interpretation-question').textContent = data.question;
        
        const container = document.getElementById('interpretacao-options');
        container.innerHTML = '';
        
        data.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(option, data.answer, button));
            container.appendChild(button);
        });
        
        if (!this.hasPlayedInstructions.interpretacao) {
            this.speakText('Interprete o texto e identifique os recursos utilizados.');
            this.hasPlayedInstructions.interpretacao = true;
        }
    }
    
    checkAnswer(selected, correct, button) {
        const isCorrect = selected === correct;
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correct) {
                btn.classList.add('correct');
            } else if (btn === button && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        this.stats[this.currentMode].total++;
        
        if (isCorrect) {
            this.stats[this.currentMode].correct++;
            this.playSuccessSound();
        } else {
            this.playErrorSound();
        }
        
        this.updateStats();
        
        setTimeout(() => {
            this.nextChallenge();
        }, 2000);
    }
    
    nextChallenge() {
        this.currentChallenge++;
        this.startChallenge();
    }
    
    updateStats() {
        const totalCorrect = Object.values(this.stats).reduce((sum, stat) => sum + stat.correct, 0);
        const totalQuestions = Object.values(this.stats).reduce((sum, stat) => sum + stat.total, 0);
        const currentGrade = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 10).toFixed(1) : '0.0';
        
        document.getElementById('correct-count').textContent = totalCorrect;
        document.getElementById('total-count').textContent = totalQuestions;
        document.getElementById('current-grade').textContent = currentGrade;
        document.getElementById('current-problem').textContent = totalQuestions + 1;
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
        
        this.speakText(`Parabéns ${this.studentName}! Sua nota final em Português Avançado foi ${finalGrade}.`);
    }
    
    sendToGoogleForms() {
        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe_FORM_ID_AQUI/formResponse';
        
        const formData = new FormData();
        formData.append('entry.1111111111', this.studentName);
        formData.append('entry.2222222222', document.getElementById('final-grade').textContent);
        formData.append('entry.3333333333', document.getElementById('session-date').textContent);
        formData.append('entry.4444444444', document.getElementById('total-time').textContent);
        formData.append('entry.5555555555', `Subordinadas: ${document.getElementById('subordinadas-grade').textContent} | Literatura: ${document.getElementById('literatura-grade').textContent} | Redação: ${document.getElementById('redacao-grade').textContent} | Interpretação: ${document.getElementById('interpretacao-grade').textContent}`);
        
        fetch(formUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
        
        alert('✅ Resultado de Português Avançado enviado para o professor!');
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
        this.speakText('Não foi dessa vez. Continue tentando!');
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
        document.getElementById('subordinadas-mode').addEventListener('click', () => {
            this.switchMode('subordinadas');
        });
        
        document.getElementById('literatura-mode').addEventListener('click', () => {
            this.switchMode('literatura');
        });
        
        document.getElementById('redacao-mode').addEventListener('click', () => {
            this.switchMode('redacao');
        });
        
        document.getElementById('interpretacao-mode').addEventListener('click', () => {
            this.switchMode('interpretacao');
        });
        
        // Controles
        document.getElementById('next-challenge').addEventListener('click', () => {
            this.nextChallenge();
        });
        
        document.getElementById('finish-session').addEventListener('click', () => {
            this.finishSession();
        });
        
        // Relatório
        document.getElementById('send-google-forms').addEventListener('click', () => {
            this.sendToGoogleForms();
        });
        
        document.getElementById('print-report').addEventListener('click', () => {
            window.print();
        });
        
        document.getElementById('new-session').addEventListener('click', () => {
            location.reload();
        });
    }
}

// Inicializar o jogo
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedPortugueseGame();
});