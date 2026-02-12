#!/bin/bash

echo "🏥 MediGuide AI - Environment Setup"
echo "===================================="
echo ""

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    echo "📦 Installing nvm (Node Version Manager)..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    # Load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    echo "✅ nvm installed successfully!"
    echo ""
else
    echo "✅ nvm is already installed"
    echo ""
fi

# Load nvm in current session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "📥 Installing Node.js 18..."
nvm install 18
nvm use 18
nvm alias default 18

echo ""
echo "✅ Node.js installed successfully!"
node --version
npm --version

echo ""
echo "📦 Installing project dependencies..."
npm install

echo ""
echo "✅ Environment setup complete!"
echo ""
echo "To start the application, run:"
echo "  npm run dev"
echo ""
echo "If you open a new terminal, run this first:"
echo "  nvm use 18"
