@echo off
echo 🚀 Combinatorics App - Quick Start
echo ================================

echo.
echo Installing dependencies...
call npm install

echo.
echo Building desktop app...
call npm run build-win

echo.
echo ✅ Build complete! Check the 'dist' folder for your .exe file
echo.
echo 📱 For mobile apps, run:
echo    npx cap add android
echo    npx cap add ios
echo.
echo 🌐 Web app is already deployed at:
echo    https://sirsplove.github.io/Combinatorics_App/
echo.
pause
