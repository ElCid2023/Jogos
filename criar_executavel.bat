@echo off
echo ========================================
echo  CRIANDO EXECUTAVEL - EDUGAMES BRASIL
echo ========================================
echo.

REM Criar pasta de distribuição
if not exist "dist" mkdir dist

REM Copiar todos os arquivos para a pasta dist
echo Copiando arquivos...
xcopy /E /I /Y "*.html" "dist\"
xcopy /E /I /Y "*.js" "dist\"
xcopy /E /I /Y "*.css" "dist\"
xcopy /E /I /Y "*.md" "dist\"
xcopy /E /I /Y "*.pdf" "dist\"
xcopy /E /I /Y "*.txt" "dist\"

if exist "jogo-alfabeto" xcopy /E /I /Y "jogo-alfabeto" "dist\jogo-alfabeto\"
if exist "jogo-numeros" xcopy /E /I /Y "jogo-numeros" "dist\jogo-numeros\"
if exist "jogo-gramatica" xcopy /E /I /Y "jogo-gramatica" "dist\jogo-gramatica\"
if exist "jogo-calculos" xcopy /E /I /Y "jogo-calculos" "dist\jogo-calculos\"
if exist "js" xcopy /E /I /Y "js" "dist\js\"
if exist "assets" xcopy /E /I /Y "assets" "dist\assets\"

echo.
echo ========================================
echo  EXECUTAVEL CRIADO COM SUCESSO!
echo ========================================
echo.
echo Pasta: dist\
echo.
echo Para executar: Abra o arquivo index.html na pasta dist
echo.
pause
