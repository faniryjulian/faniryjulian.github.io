@echo off
cls
echo ==========================
echo 🎯 Déploiement du portfolio Faniry
echo ==========================

set /p msg="📝 Message du commit : "

echo.
echo 🔄 Ajout des fichiers...
git add .

echo ✍️ Création du commit...
git commit -m "%msg%"

echo 🚀 Envoi sur GitHub...
git push origin main

echo.
echo ✅ Terminé ! Va sur : https://faniryjulian.github.io/faniry-portfolio/
pause
