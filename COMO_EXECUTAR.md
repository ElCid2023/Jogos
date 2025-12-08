# 🎮 Como Executar o EduGames Brasil

## ✅ Método Simples (Recomendado)

### Opção 1: Abrir Diretamente no Navegador

1. Navegue até a pasta do projeto:
   ```
   C:\Users\Professor\Documents\criacoes-em-ia\Edugames Brasil
   ```

2. Localize o arquivo **`index.html`**

3. Clique duas vezes no arquivo **`index.html`**
   - Ou clique com botão direito → Abrir com → Seu navegador preferido

4. Pronto! O jogo abrirá no navegador

---

## 📦 Criar Versão Distribuível

Se você quiser criar uma pasta separada para distribuir o jogo:

### Windows:

1. Abra o Prompt de Comando (cmd) na pasta do projeto

2. Execute os seguintes comandos:

```batch
mkdir EduGames-Executavel
xcopy /E /I /Y *.html EduGames-Executavel\
xcopy /E /I /Y *.js EduGames-Executavel\
xcopy /E /I /Y *.css EduGames-Executavel\
xcopy /E /I /Y jogo-alfabeto EduGames-Executavel\jogo-alfabeto\
xcopy /E /I /Y jogo-numeros EduGames-Executavel\jogo-numeros\
xcopy /E /I /Y jogo-gramatica EduGames-Executavel\jogo-gramatica\
xcopy /E /I /Y jogo-calculos EduGames-Executavel\jogo-calculos\
xcopy /E /I /Y js EduGames-Executavel\js\
xcopy /E /I /Y assets EduGames-Executavel\assets\
```

3. A pasta **`EduGames-Executavel`** será criada com todos os arquivos necessários

4. Você pode copiar essa pasta para qualquer lugar ou compartilhar com outros

---

## 🌐 Executar em Servidor Local (Opcional)

Se você tiver Python instalado:

```bash
# Python 3
python -m http.server 8000

# Depois abra no navegador:
# http://localhost:8000
```

---

## 📋 Requisitos

- ✅ Navegador moderno (Chrome, Firefox, Edge, Safari)
- ✅ JavaScript habilitado
- ✅ Nenhuma instalação adicional necessária!

---

## 🎯 Arquivos Principais

- **`index.html`** - Página inicial (ESTE É O ARQUIVO PRINCIPAL)
- **`RELATORIO_COMPLETO.html`** - Documentação completa
- **`RELATORIO_COMPLETO.md`** - Documentação em Markdown
- **`CORRECOES_FINAIS.md`** - Lista de correções realizadas

---

## 💡 Dicas

1. **Primeira vez usando?**
   - Apenas abra o arquivo `index.html` no navegador
   - Digite seu nome e idade
   - Comece a jogar!

2. **Problemas?**
   - Limpe o cache do navegador (Ctrl + Shift + Delete)
   - Tente outro navegador
   - Verifique se JavaScript está habilitado

3. **Compartilhar com outros?**
   - Copie toda a pasta do projeto
   - Mantenha a estrutura de pastas intacta
   - Instrua para abrir o arquivo `index.html`

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todos os arquivos estão na pasta
2. Abra o Console do navegador (F12) para ver erros
3. Consulte o arquivo `RELATORIO_COMPLETO.html` para mais informações

---

**Desenvolvido por Prof. Borges**
