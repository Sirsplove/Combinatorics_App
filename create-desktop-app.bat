@echo off
echo 🚀 Creating Desktop App - Simple Method
echo ======================================

echo.
echo Creating portable desktop app...

REM Create a simple launcher script
echo @echo off > CombinatoricsApp.bat
echo start "" "%~dp0index.html" >> CombinatoricsApp.bat

REM Create a simple HTML launcher
echo ^<!DOCTYPE html^> > launcher.html
echo ^<html^> >> launcher.html
echo ^<head^> >> launcher.html
echo     ^<title^>Combinatorics App Launcher^</title^> >> launcher.html
echo     ^<style^> >> launcher.html
echo         body { font-family: Arial, sans-serif; padding: 20px; background: #1a1a1a; color: #e8e8e8; text-align: center; } >> launcher.html
echo         .launcher { max-width: 600px; margin: 0 auto; padding: 40px; background: rgba(30, 30, 30, 0.95); border-radius: 16px; border: 1px solid rgba(0, 180, 216, 0.2); } >> launcher.html
echo         .btn { background: linear-gradient(135deg, #00b4d8, #0096c7); color: white; padding: 15px 30px; border: none; border-radius: 12px; font-size: 1.2rem; cursor: pointer; margin: 10px; } >> launcher.html
echo         .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0, 180, 216, 0.6); } >> launcher.html
echo     ^</style^> >> launcher.html
echo ^</head^> >> launcher.html
echo ^<body^> >> launcher.html
echo     ^<div class="launcher"^> >> launcher.html
echo         ^<h1^>🚗 Combinatorics App^</h1^> >> launcher.html
echo         ^<p^>Interactive combinatorics learning with real-world problems^</p^> >> launcher.html
echo         ^<button class="btn" onclick="window.open('index.html', '_blank')"^>Launch App^</button^> >> launcher.html
echo         ^<br^>^<br^> >> launcher.html
echo         ^<button class="btn" onclick="window.open('https://sirsplove.github.io/Combinatorics_App/', '_blank')"^>Open Online Version^</button^> >> launcher.html
echo     ^</div^> >> launcher.html
echo ^</body^> >> launcher.html
echo ^</html^> >> launcher.html

echo.
echo ✅ Desktop app created!
echo.
echo 📁 Files created:
echo    - CombinatoricsApp.bat (Windows launcher)
echo    - launcher.html (Cross-platform launcher)
echo.
echo 🚀 To use:
echo    1. Double-click CombinatoricsApp.bat (Windows)
echo    2. Or open launcher.html in any browser
echo.
echo 🌐 Online version: https://sirsplove.github.io/Combinatorics_App/
echo.
pause
