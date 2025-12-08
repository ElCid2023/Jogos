// Sistema de Segurança EduGames Brasil
class SecurityManager {
    constructor() {
        this.ageGroups = {
            '7-10': { min: 7, max: 10, games: ['alfabeto', 'numeros'] },
            '10-14': { min: 10, max: 14, games: ['gramatica', 'calculos', 'matematica-expandido'] },
            '15-18': { min: 15, max: 18, games: ['portugues-avancado', 'matematica-expandido'] }
        };
    }

    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        return input.replace(/[<>\"'&]/g, '').trim().substring(0, 50);
    }

    validateName(name) {
        try {
            const sanitized = this.sanitizeInput(name);
            if (!sanitized || sanitized.length < 2) {
                throw new Error('Nome deve ter pelo menos 2 caracteres');
            }
            if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(sanitized)) {
                throw new Error('Nome deve conter apenas letras');
            }
            return sanitized;
        } catch (error) {
            console.error('Erro na validação do nome:', error.message);
            return null;
        }
    }

    validateAge(age) {
        try {
            const numAge = parseInt(age);
            if (isNaN(numAge) || numAge < 7 || numAge > 18) {
                throw new Error('Idade deve estar entre 7 e 18 anos');
            }
            return numAge;
        } catch (error) {
            console.error('Erro na validação da idade:', error.message);
            return null;
        }
    }

    getAgeGroup(age) {
        try {
            for (const [group, config] of Object.entries(this.ageGroups)) {
                if (age >= config.min && age <= config.max) {
                    return group;
                }
            }
            throw new Error('Idade fora dos grupos permitidos');
        } catch (error) {
            console.error('Erro ao determinar grupo:', error.message);
            return null;
        }
    }

    canAccessGame(gameId, userAge) {
        try {
            const ageGroup = this.getAgeGroup(userAge);
            if (!ageGroup) return false;
            
            return this.ageGroups[ageGroup].games.includes(gameId);
        } catch (error) {
            console.error('Erro na verificação de acesso:', error.message);
            return false;
        }
    }

    saveSession(name, age) {
        try {
            const sessionData = {
                name: this.validateName(name),
                age: this.validateAge(age),
                timestamp: Date.now()
            };

            if (!sessionData.name || !sessionData.age) {
                throw new Error('Dados inválidos para sessão');
            }

            localStorage.setItem('edugames_session', JSON.stringify(sessionData));
            return sessionData;
        } catch (error) {
            console.error('Erro ao salvar sessão:', error.message);
            return null;
        }
    }

    loadSession() {
        try {
            const sessionStr = localStorage.getItem('edugames_session');
            if (!sessionStr) return null;

            const session = JSON.parse(sessionStr);
            
            if (Date.now() - session.timestamp > 24 * 60 * 60 * 1000) {
                this.clearSession();
                return null;
            }

            return session;
        } catch (error) {
            console.error('Erro ao carregar sessão:', error.message);
            this.clearSession();
            return null;
        }
    }

    clearSession() {
        try {
            localStorage.removeItem('edugames_session');
            localStorage.removeItem('studentName');
            localStorage.removeItem('studentAge');
        } catch (error) {
            console.error('Erro ao limpar sessão:', error.message);
        }
    }

    blockUnauthorizedAccess(requiredGame, currentAge) {
        if (!this.canAccessGame(requiredGame, currentAge)) {
            alert('Acesso negado! Este jogo não está disponível para sua idade.');
            window.location.href = '../index.html';
            return true;
        }
        return false;
    }
}

window.SecurityManager = new SecurityManager();