# Guia de Teste Manual - EduGames Brasil

## ✅ Checklist de Testes

### Teste 1: Faixa Etária 10 anos (Limite Inferior 10-14)
1. [ ] Abrir index.html no navegador
2. [ ] Digitar nome: "Teste Aluno 10"
3. [ ] Digitar idade: 10
4. [ ] Clicar em "Confirmar Idade"
5. [ ] **Resultado Esperado**: Deve mostrar os jogos para 10-14 anos
   - Gramática Básica
   - Matemática Intermediária
   - Cálculos Avançados
6. [ ] Clicar em cada jogo e verificar se abre sem erros

### Teste 2: Faixa Etária 12 anos (Meio da Faixa 10-14)
1. [ ] Limpar sessão (botão "Limpar Sessão" no rodapé)
2. [ ] Digitar nome: "Teste Aluno 12"
3. [ ] Digitar idade: 12
4. [ ] Clicar em "Confirmar Idade"
5. [ ] **Resultado Esperado**: Deve mostrar os jogos para 10-14 anos
6. [ ] Testar todos os botões dentro dos jogos:
   - [ ] Botão "Verificar"
   - [ ] Botão "Novo Desafio"
   - [ ] Botão "Dica"
   - [ ] Botão "Revisão"
   - [ ] Botões de modo (Morfologia, Sintaxe, etc.)

### Teste 3: Faixa Etária 14 anos (Limite Superior 10-14)
1. [ ] Limpar sessão
2. [ ] Digitar nome: "Teste Aluno 14"
3. [ ] Digitar idade: 14
4. [ ] Clicar em "Confirmar Idade"
5. [ ] **Resultado Esperado**: Deve mostrar os jogos para 10-14 anos
6. [ ] Verificar se todos os comandos funcionam

### Teste 4: Faixa Etária 15 anos (Limite Inferior 15-18)
1. [ ] Limpar sessão
2. [ ] Digitar nome: "Teste Aluno 15"
3. [ ] Digitar idade: 15
4. [ ] Clicar em "Confirmar Idade"
5. [ ] **Resultado Esperado**: Deve mostrar os jogos para 15-18 anos
   - Português Avançado
   - Matemática Ensino Médio
6. [ ] Clicar em cada jogo e verificar se abre sem erros

### Teste 5: Faixa Etária 17 anos (Meio da Faixa 15-18)
1. [ ] Limpar sessão
2. [ ] Digitar nome: "Teste Aluno 17"
3. [ ] Digitar idade: 17
4. [ ] Clicar em "Confirmar Idade"
5. [ ] **Resultado Esperado**: Deve mostrar os jogos para 15-18 anos
6. [ ] Testar todos os botões dentro dos jogos:
   - [ ] Botão "Verificar"
   - [ ] Botão "Novo Desafio"
   - [ ] Botão "Dica"
   - [ ] Botão "Finalizar Sessão"
   - [ ] Botões de modo (Subordinadas, Literatura, etc.)

### Teste 6: Faixa Etária 18 anos (Limite Superior 15-18)
1. [ ] Limpar sessão
2. [ ] Digitar nome: "Teste Aluno 18"
3. [ ] Digitar idade: 18
4. [ ] Clicar em "Confirmar Idade"
5. [ ] **Resultado Esperado**: Deve mostrar os jogos para 15-18 anos
6. [ ] Verificar se todos os comandos funcionam

### Teste 7: Navegação entre Jogos
1. [ ] Entrar em um jogo (ex: Gramática Básica)
2. [ ] Clicar no botão "🏠 Início"
3. [ ] **Resultado Esperado**: Deve voltar para a seleção de jogos SEM perder a sessão
4. [ ] Entrar em outro jogo (ex: Cálculos Avançados)
5. [ ] Verificar se funciona normalmente

### Teste 8: Botão Sair
1. [ ] Dentro de um jogo, clicar no botão "🚪 Sair"
2. [ ] **Resultado Esperado**: Deve limpar a sessão e voltar para a tela inicial
3. [ ] Verificar se precisa inserir nome e idade novamente

### Teste 9: Persistência de Sessão
1. [ ] Fazer login com nome e idade
2. [ ] Fechar o navegador
3. [ ] Abrir novamente o index.html
4. [ ] **Resultado Esperado**: Deve manter a sessão e mostrar os jogos diretamente

### Teste 10: Expiração de Sessão
1. [ ] Abrir o Console do navegador (F12)
2. [ ] Executar: `localStorage.setItem('edugames_session', JSON.stringify({name: 'Teste', age: 12, timestamp: Date.now() - 25*60*60*1000}))`
3. [ ] Recarregar a página
4. [ ] **Resultado Esperado**: Deve pedir para fazer login novamente

## 🐛 Problemas Conhecidos Corrigidos

- ✅ Alunos de 10 anos agora podem acessar jogos intermediários
- ✅ Botões não travam mais nas faixas 10-14 e 15-18
- ✅ Todos os comandos funcionam corretamente
- ✅ Inicialização dos jogos funciona adequadamente

## 📝 Observações

- Se encontrar algum erro, abra o Console do navegador (F12) e verifique as mensagens
- Limpe o cache do navegador antes de testar (Ctrl + Shift + Delete)
- Teste em diferentes navegadores: Chrome, Firefox, Edge

## ✅ Resultado dos Testes

Data: ___/___/______
Testador: _________________

| Teste | Status | Observações |
|-------|--------|-------------|
| Teste 1 (10 anos) | ⬜ OK / ⬜ ERRO | |
| Teste 2 (12 anos) | ⬜ OK / ⬜ ERRO | |
| Teste 3 (14 anos) | ⬜ OK / ⬜ ERRO | |
| Teste 4 (15 anos) | ⬜ OK / ⬜ ERRO | |
| Teste 5 (17 anos) | ⬜ OK / ⬜ ERRO | |
| Teste 6 (18 anos) | ⬜ OK / ⬜ ERRO | |
| Teste 7 (Navegação) | ⬜ OK / ⬜ ERRO | |
| Teste 8 (Sair) | ⬜ OK / ⬜ ERRO | |
| Teste 9 (Persistência) | ⬜ OK / ⬜ ERRO | |
| Teste 10 (Expiração) | ⬜ OK / ⬜ ERRO | |

---
**Desenvolvido por Prof. Borges**
