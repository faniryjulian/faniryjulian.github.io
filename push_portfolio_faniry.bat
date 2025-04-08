@echo off
cd /d %~dp0
echo =============================
echo 📁 Déploiement du portfolio Faniry
echo =============================
echo 🕒 Début à 2025-03-26 12:11:35
echo.

echo ⬇️ Récupération des dernières modifications depuis GitHub...
git pull origin main

echo.
echo ➕ Ajout des fichiers...
git add .

echo 📝 Création du commit...
git commit -m "Mise à jour automatique : 2025-03-26 12:11:35"

echo 🚀 Envoi sur GitHub...
git push origin main

echo ✅ Terminé ! Va sur : https://faniryjulian.github.io/
pause
