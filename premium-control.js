// ========================================
// CONTROLE DE VERSÃO PREMIUM
// EduGames Brasil
// ========================================

class PremiumControl {
    constructor() {
        this.isPremium = this.checkPremiumStatus();
        this.freeGames = ['alfabeto', 'numeros', 'gramatica']; // Jogos gratuitos
        this.premiumGames = ['calculos', 'matematica-expandido', 'portugues-avancado', 'numeros-expandido']; // Jogos premium
        this.hotmartLink = 'https://pay.hotmart.com/F103352336V'; // SUBSTITUA pelo seu link
    }

    // Verificar se usuário tem versão premium
    checkPremiumStatus() {
        return localStorage.getItem('edugames_premium') === 'true';
    }

    // Ativar versão premium (após compra)
    activatePremium(licenseKey) {
        // Validar chave de licença (você pode implementar validação mais robusta)
        if (this.validateLicense(licenseKey)) {
            localStorage.setItem('edugames_premium', 'true');
            localStorage.setItem('edugames_license', licenseKey);
            localStorage.setItem('edugames_activation_date', Date.now());
            return true;
        }
        return false;
    }

    // Validar chave de licença
    validateLicense(key) {
        // Implementação simples - você pode melhorar isso
        // Formato esperado: EDUGAMES-XXXX-XXXX-XXXX
        const pattern = /^EDUGAMES-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        return pattern.test(key);
    }

    // Verificar se jogo está disponível
    canAccessGame(gameId) {
        if (this.isPremium) {
            return true; // Premium tem acesso a tudo
        }
        return this.freeGames.includes(gameId);
    }

    // Bloquear acesso a jogo premium
    blockPremiumGame(gameName) {
        const modal = this.createPremiumModal(gameName);
        document.body.appendChild(modal);
    }

    // Criar modal de upgrade
    createPremiumModal(gameName) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            ">
                <div style="font-size: 4em; margin-bottom: 20px;">🔒</div>
                <h2 style="color: #667eea; margin-bottom: 15px;">Conteúdo Premium</h2>
                <p style="font-size: 1.1em; margin-bottom: 20px; color: #666;">
                    O jogo <strong>${gameName}</strong> está disponível apenas na versão Premium!
                </p>
                <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3 style="color: #667eea; margin-bottom: 15px;">✨ Versão Premium Inclui:</h3>
                    <ul style="text-align: left; list-style: none; padding: 0;">
                        <li style="margin: 10px 0;">✅ 7 jogos completos</li>
                        <li style="margin: 10px 0;">✅ Todos os níveis desbloqueados</li>
                        <li style="margin: 10px 0;">✅ Relatórios de desempenho</li>
                        <li style="margin: 10px 0;">✅ Sem anúncios</li>
                        <li style="margin: 10px 0;">✅ Atualizações gratuitas</li>
                    </ul>
                </div>
                <div style="font-size: 2em; color: #ff6b35; font-weight: bold; margin: 20px 0;">
                    Apenas R$ 4,99
                </div>
                <button onclick="window.open('${this.hotmartLink}', '_blank')" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 15px 40px;
                    font-size: 1.2em;
                    border-radius: 25px;
                    cursor: pointer;
                    margin: 10px;
                    box-shadow: 0 5px 15px rgba(102,126,234,0.4);
                ">
                    🚀 Comprar Agora
                </button>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #f0f0f0;
                    color: #666;
                    border: none;
                    padding: 15px 40px;
                    font-size: 1em;
                    border-radius: 25px;
                    cursor: pointer;
                    margin: 10px;
                ">
                    Voltar
                </button>
            </div>
        `;

        return modal;
    }

    // Mostrar banner de upgrade na versão gratuita
    showUpgradeBanner() {
        if (this.isPremium) return;

        const banner = document.createElement('div');
        banner.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            max-width: 300px;
            cursor: pointer;
        `;

        banner.innerHTML = `
            <div style="font-size: 2em; margin-bottom: 10px;">⭐</div>
            <h3 style="margin-bottom: 10px;">Upgrade para Premium!</h3>
            <p style="font-size: 0.9em; margin-bottom: 15px;">
                Desbloqueie todos os jogos e recursos por apenas R$ 19,90
            </p>
            <button style="
                background: white;
                color: #667eea;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                font-weight: bold;
                cursor: pointer;
                width: 100%;
            ">
                Saiba Mais
            </button>
        `;

        banner.onclick = () => {
            window.open(this.hotmartLink, '_blank');
        };

        document.body.appendChild(banner);

        // Fechar banner após 10 segundos
        setTimeout(() => {
            banner.style.transition = 'opacity 0.5s';
            banner.style.opacity = '0';
            setTimeout(() => banner.remove(), 500);
        }, 10000);
    }

    // Adicionar marca d'água na versão gratuita
    addWatermark() {
        if (this.isPremium) return;

        const watermark = document.createElement('div');
        watermark.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.9);
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            color: #667eea;
            font-weight: bold;
            z-index: 9998;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        `;
        watermark.textContent = '🆓 Versão Gratuita';
        document.body.appendChild(watermark);
    }

    // Limitar níveis na versão gratuita
    limitLevels(currentLevel, maxFreeLevel = 5) {
        if (this.isPremium) return true;

        if (currentLevel > maxFreeLevel) {
            alert(`Nível ${currentLevel} disponível apenas na versão Premium!\n\nUpgrade agora por apenas R$ 19,90`);
            window.open(this.hotmartLink, '_blank');
            return false;
        }
        return true;
    }
}

// Inicializar controle premium
const premiumControl = new PremiumControl();

// Mostrar banner de upgrade após 30 segundos
setTimeout(() => {
    premiumControl.showUpgradeBanner();
}, 30000);

// Adicionar marca d'água
premiumControl.addWatermark();

// Exportar para uso global
window.premiumControl = premiumControl;
