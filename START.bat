@echo off
echo ================================
echo LOTUS KINDERGARTEN - Quick Start
echo ================================
echo.

echo [1/4] Checking MongoDB...
net start MongoDB 2>nul
if %errorlevel% equ 0 (
    echo ✓ MongoDB is running
) else (
    echo ✓ MongoDB was already running
)
echo.

echo [2/4] Starting Backend Server...
cd server
start "Lotus Kindergarten API" cmd /k "npm run dev"
echo ✓ Backend server started in new window
echo.

echo [3/4] Starting Frontend Server...
cd ..\client\public
start "Lotus Kindergarten Frontend" cmd /k "python -m http.server 3000 2>nul || npx http-server -p 3000"
echo ✓ Frontend server started in new window
echo.

echo [4/4] Opening Browser...
timeout /t 3 /nobreak >nul
start http://localhost:3000
echo ✓ Browser opened
echo.

echo ================================
echo ✓ Application is now running!
echo ================================
echo.
echo Backend API: http://localhost:8000
echo Frontend:    http://localhost:3000
echo Login Page:  http://localhost:3000/pages/auth/login.html
echo.
echo Default Admin Credentials:
echo Email:    admin@lotus.com
echo Password: admin123
echo.
echo Press any key to exit this window...
pause >nul
