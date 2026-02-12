@echo off
echo ====================================
echo  MediGuide AI - Development Setup
echo ====================================
echo.

echo [1/4] Checking if MongoDB is installed...
where mongod >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: MongoDB not found. Please install MongoDB or use Docker.
    echo You can download MongoDB from: https://www.mongodb.com/try/download/community
    echo.
    echo Or run with Docker: docker run -d -p 27017:27017 --name mongodb mongo:7.0
    echo.
    pause
)

echo [2/4] Installing backend dependencies...
cd backend
if not exist "node_modules" (
    call npm install
) else (
    echo Backend dependencies already installed.
)
cd ..

echo.
echo [3/4] Installing frontend dependencies...
if not exist "node_modules" (
    call npm install
) else (
    echo Frontend dependencies already installed.
)

echo.
echo [4/4] Setup complete!
echo.
echo ====================================
echo  To start the application:
echo ====================================
echo.
echo 1. Start MongoDB (if not using Docker):
echo    - Run 'mongod' in a separate terminal
echo.
echo 2. Start Backend:
echo    - Open a terminal in the 'backend' folder
echo    - Run: npm run dev
echo.
echo 3. Start Frontend:
echo    - Open a terminal in the root folder
echo    - Run: npm run dev
echo.
echo The app will be available at: http://localhost:5173
echo The API will be available at: http://localhost:8000
echo.
pause
