# Bus Tracking System - Quick Start Script

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "🚌 Bus Tracking System Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Check if MongoDB is running
Write-Host "`n[1/3] Checking MongoDB..." -ForegroundColor Yellow
try {
    $mongoVersion = mongosh --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MongoDB is installed (v$mongoVersion)" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ MongoDB not found! Please install MongoDB first." -ForegroundColor Red
    Write-Host "Download from: https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
    exit 1
}

# Start Backend Server
Write-Host "`n[2/3] Starting Backend Server..." -ForegroundColor Yellow
$serverPath = Join-Path $PSScriptRoot "server"

# Check if node_modules exists
if (-Not (Test-Path "$serverPath\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location $serverPath
    npm install
    Set-Location ..
}

# Start backend in new terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$serverPath'; Write-Host '🚀 Starting Backend Server...' -ForegroundColor Green; npm run dev"

Write-Host "✅ Backend server starting on http://localhost:5000" -ForegroundColor Green

# Wait for backend to start
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start Frontend
Write-Host "`n[3/3] Starting Frontend..." -ForegroundColor Yellow

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

Write-Host "✅ Frontend server starting on http://localhost:5173" -ForegroundColor Green

# Start frontend in current terminal
Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "`n📝 Login Credentials:" -ForegroundColor Yellow
Write-Host "   Admin:    admin / admin123" -ForegroundColor White
Write-Host "   Driver:   driver1 / driver123" -ForegroundColor White
Write-Host "   Student:  student1 / student123" -ForegroundColor White
Write-Host "`n🌐 Access URLs:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "`n🚀 Starting frontend now..." -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

npm run dev
