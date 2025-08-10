#!/bin/bash

# CancerNet Global - Installation Script
echo "🏥 Installing CancerNet Global - AI-Powered Cancer Registry"
echo "=================================================="

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check npm installation
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo "✅ npm $(npm --version) detected"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "🚀 To start the application:"
echo "   npm run dev"
echo ""
echo "This will start:"
echo "   • Frontend at http://localhost:3000"
echo "   • Backend at http://localhost:5000"
echo ""
echo "🔐 Demo login credentials:"
echo "   Medical ID: MD123456"
echo "   Hospital: Johns Hopkins Hospital"
echo "   Region: United States - Northeast"
echo "   Password: demo123"
echo ""
echo "📚 Full documentation available in README.md"
echo "=================================================="
