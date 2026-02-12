#!/bin/bash

echo "🚀 MediGuide AI - Quick Setup for New Environment"
echo "=================================================="
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository"
    echo "Please clone the repository first:"
    echo "  git clone https://github.com/YOUR_USERNAME/MediGuide_AI.git"
    echo "  cd MediGuide_AI"
    exit 1
fi

echo "📋 Step 1: Setting up Node.js environment..."
echo ""

# Check if Node.js 18+ is available
NODE_VERSION=$(node --version 2>/dev/null | cut -d'v' -f2 | cut -d'.' -f1)

if [ -z "$NODE_VERSION" ] || [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js 18+ not found. Running environment setup..."
    chmod +x setup-environment.sh
    ./setup-environment.sh
else
    echo "✅ Node.js $(node --version) is already installed"
fi

echo ""
echo "📦 Step 2: Installing dependencies..."
npm install

echo ""
echo "🔧 Step 3: Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo "⚠️  Please update .env with your API endpoint"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
echo "To run with Docker:"
echo "  docker-compose up"
echo ""
