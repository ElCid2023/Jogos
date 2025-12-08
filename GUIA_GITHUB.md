# 🚀 Como Subir o EduGames Brasil no GitHub

## 📋 Pré-requisitos

1. **Criar conta no GitHub** (se ainda não tiver)
   - Acesse: https://github.com
   - Clique em "Sign up"
   - Siga as instruções

2. **Instalar Git no Windows**
   - Baixe: https://git-scm.com/download/win
   - Execute o instalador
   - Use as opções padrão

---

## 🎯 Passo a Passo Completo

### PASSO 1: Criar Repositório no GitHub

1. Faça login no GitHub
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name:** `edugames-brasil`
   - **Description:** "Plataforma de jogos educativos interativos para estudantes brasileiros"
   - Marque: **✅ Public** (para usar GitHub Pages grátis)
   - Marque: **✅ Add a README file**
   - Marque: **✅ Add .gitignore** → Selecione "None"
5. Clique em **"Create repository"**

---

### PASSO 2: Preparar o Projeto Localmente

1. Abra o **Git Bash** (ou Prompt de Comando)

2. Navegue até a pasta do projeto:
```bash
cd "C:\Users\Professor\Documents\criacoes-em-ia\Edugames Brasil"
```

3. Inicialize o Git:
```bash
git init
```

4. Configure seu nome e email (primeira vez apenas):
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

---

### PASSO 3: Criar arquivo .gitignore

Crie um arquivo chamado `.gitignore` na pasta do projeto com este conteúdo:

```
# Arquivos do sistema
.DS_Store
Thumbs.db
desktop.ini

# Arquivos temporários
*.tmp
*.bak
*.swp
*~

# Logs
*.log

# Pasta de distribuição (se criar)
dist/
EduGames-Executavel/
```

---

### PASSO 4: Adicionar Arquivos ao Git

1. Adicione todos os arquivos:
```bash
git add .
```

2. Faça o primeiro commit:
```bash
git commit -m "Primeiro commit: EduGames Brasil completo"
```

---

### PASSO 5: Conectar ao GitHub

1. Copie a URL do seu repositório no GitHub
   - Exemplo: `https://github.com/seu-usuario/edugames-brasil.git`

2. Adicione o repositório remoto:
```bash
git remote add origin https://github.com/seu-usuario/edugames-brasil.git
```

3. Envie os arquivos para o GitHub:
```bash
git branch -M main
git push -u origin main
```

4. Digite seu usuário e senha do GitHub quando solicitado
   - **Nota:** Pode precisar criar um Personal Access Token
   - Vá em: GitHub → Settings → Developer settings → Personal access tokens → Generate new token

---

### PASSO 6: Ativar GitHub Pages (Hospedar Online GRÁTIS!)

1. No seu repositório no GitHub, clique em **"Settings"**

2. No menu lateral, clique em **"Pages"**

3. Em **"Source"**, selecione:
   - Branch: **main**
   - Folder: **/ (root)**

4. Clique em **"Save"**

5. Aguarde alguns minutos

6. Seu site estará disponível em:
   ```
   https://seu-usuario.github.io/edugames-brasil/
   ```

---

## 🎉 Pronto! Seu Jogo Está Online!

Agora qualquer pessoa pode acessar seu jogo pela URL:
```
https://seu-usuario.github.io/edugames-brasil/
```

---

## 📝 Comandos Git Úteis

### Atualizar o projeto depois de fazer mudanças:

```bash
# 1. Ver o que mudou
git status

# 2. Adicionar mudanças
git add .

# 3. Fazer commit
git commit -m "Descrição das mudanças"

# 4. Enviar para GitHub
git push
```

### Ver histórico de commits:
```bash
git log
```

### Criar uma nova branch:
```bash
git checkout -b nome-da-branch
```

### Voltar para branch main:
```bash
git checkout main
```

---

## 🌟 Melhorar o README do GitHub

Crie um arquivo `README.md` bonito na raiz do projeto:

```markdown
# 🎮 EduGames Brasil

Plataforma de jogos educativos interativos para estudantes brasileiros de 7 a 18 anos.

## 🚀 Acesse Online

👉 **[Jogar Agora](https://seu-usuario.github.io/edugames-brasil/)**

## 📚 Jogos Disponíveis

### 7-10 anos
- 🔤 Jogo do Alfabeto
- 🔢 Jogo de Números

### 10-14 anos
- 📖 Gramática Básica
- 🧮 Cálculos Avançados
- 🔢 Matemática Intermediária

### 15-18 anos
- 📚 Português Avançado
- 🧮 Matemática Ensino Médio

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- Web Speech API
- LocalStorage API

## 📖 Documentação

- [Relatório Completo](RELATORIO_COMPLETO.html)
- [Como Executar](COMO_EXECUTAR.md)
- [Guia de Testes](TESTE_MANUAL.md)

## 👨‍💻 Desenvolvedor

**Prof. Borges**

## 📄 Licença

Este projeto é de código aberto para fins educacionais.
```

---

## 💡 Dicas Importantes

### ✅ Vantagens do GitHub Pages:
- **Grátis** para projetos públicos
- **Rápido** - CDN global
- **Fácil** - Atualiza automaticamente
- **Confiável** - Hospedado pelo GitHub
- **HTTPS** - Seguro por padrão

### ⚠️ Limitações:
- Apenas sites estáticos (HTML/CSS/JS)
- Limite de 1GB de espaço
- Limite de 100GB de banda por mês
- Sem backend/banco de dados

### 🎯 Perfeito para:
- ✅ Jogos em HTML/JavaScript
- ✅ Portfólios
- ✅ Documentação
- ✅ Landing pages
- ✅ Projetos educacionais

---

## 🔄 Fluxo de Trabalho Recomendado

```
1. Fazer mudanças localmente
2. Testar no navegador
3. git add .
4. git commit -m "descrição"
5. git push
6. Aguardar 1-2 minutos
7. Ver mudanças online!
```

---

## 🆘 Problemas Comuns

### Erro: "Permission denied"
**Solução:** Use Personal Access Token ao invés de senha
- GitHub → Settings → Developer settings → Personal access tokens

### Erro: "Repository not found"
**Solução:** Verifique se a URL está correta
```bash
git remote -v  # Ver URL atual
git remote set-url origin URL-CORRETA  # Corrigir URL
```

### Site não atualiza
**Solução:** 
- Aguarde 2-5 minutos
- Limpe cache do navegador (Ctrl + Shift + Delete)
- Verifique se o push foi bem-sucedido

### Arquivos grandes
**Solução:** Adicione ao .gitignore
```
*.pdf
*.mp4
*.zip
```

---

## 📱 Compartilhar o Jogo

Depois de publicado, você pode:

1. **Compartilhar o link:**
   ```
   https://seu-usuario.github.io/edugames-brasil/
   ```

2. **Criar QR Code:**
   - Use: https://www.qr-code-generator.com/
   - Cole a URL do seu jogo
   - Baixe o QR Code
   - Alunos podem escanear com celular!

3. **Incorporar em site:**
   ```html
   <iframe src="https://seu-usuario.github.io/edugames-brasil/" 
           width="100%" height="600px"></iframe>
   ```

---

## 🎓 Recursos Adicionais

- **Documentação Git:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/
- **GitHub Pages:** https://pages.github.com/
- **Markdown Guide:** https://www.markdownguide.org/

---

## ✅ Checklist Final

- [ ] Conta no GitHub criada
- [ ] Git instalado no computador
- [ ] Repositório criado no GitHub
- [ ] Projeto enviado com `git push`
- [ ] GitHub Pages ativado
- [ ] Site funcionando online
- [ ] README.md atualizado
- [ ] Link compartilhado com alunos

---

**🎉 Parabéns! Seu jogo está online e acessível para o mundo todo!**

---

**Desenvolvido por Prof. Borges**
