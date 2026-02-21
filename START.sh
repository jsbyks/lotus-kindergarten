#!/bin/bash

echo "================================"
echo "LOTUS KINDERGARTEN - Quick Start"
echo "================================"
echo ""

echo "[1/4] Checking MongoDB..."
# Try to start MongoDB
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac
    brew services start mongodb-community &>/dev/null || echo "MongoDB already running"
else
    # Linux
    sudo systemctl start mongod &>/dev/null || echo "MongoDB already running"
fi
echo "✓ MongoDB is running"
echo ""

echo "[2/4] Starting Backend Server..."
cd server
# Start backend in background
npm run dev &
BACKEND_PID=$!
echo "✓ Backend server started (PID: $BACKEND_PID)"
echo ""

echo "[3/4] Starting Frontend Server..."
cd ../client/public
# Try Python first, then Node.js http-server
if command -v python3 &>/dev/null; then
    python3 -m http.server 3000 &
elif command -v python &>/dev/null; then
    python -m http.server 3000 &
else
    npx http-server -p 3000 &
fi
FRONTEND_PID=$!
echo "✓ Frontend server started (PID: $FRONTEND_PID)"
echo ""

echo "[4/4] Opening Browser..."
sleep 3
# Open browser based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac
    open http://localhost:3000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open http://localhost:3000 &>/dev/null || echo "Please open: http://localhost:3000"
fi
echo "✓ Browser opened"
echo ""

echo "================================"
echo "✓ Application is now running!"
echo "================================"
echo ""
echo "Backend API: http://localhost:8000"
echo "Frontend:    http://localhost:3000"
echo "Login Page:  http://localhost:3000/pages/auth/login.html"
echo ""
echo "Default Admin Credentials:"
echo "Email:    admin@lotus.com"
echo "Password: admin123"
echo ""
echo "To stop the servers, run: ./STOP.sh"
echo "Or press Ctrl+C"
echo ""

# Keep script running
wait
