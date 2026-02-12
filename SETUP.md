# Environment Setup Guide

Your current Node.js version (12.22.9) is too old for this project. This guide will help you set up the correct environment.

## Option 1: Automated Setup (Recommended)

Run the setup script:

```bash
chmod +x setup-environment.sh
./setup-environment.sh
```

This will:
- Install nvm (Node Version Manager)
- Install Node.js 18
- Install all project dependencies

After the script completes, run:
```bash
npm run dev
```

## Option 2: Manual Setup

### Step 1: Install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

### Step 2: Close and reopen your terminal, then install Node.js 18

```bash
nvm install 18
nvm use 18
nvm alias default 18
```

### Step 3: Verify installation

```bash
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher
```

### Step 4: Install dependencies

```bash
npm install
```

### Step 5: Run the application

```bash
npm run dev
```

## Option 3: Using Docker (Alternative)

If you prefer Docker:

```bash
docker build -t mediguide-ai .
docker run -p 3000:3000 mediguide-ai
```

## Troubleshooting

### If you get "nvm: command not found"

Add this to your `~/.bashrc` or `~/.zshrc`:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Then run: `source ~/.bashrc`

### If npm install fails

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Switching Node versions in new terminals

Each time you open a new terminal, run:
```bash
nvm use 18
```

Or add this to your `~/.bashrc`:
```bash
nvm use default
```

## Quick Start Commands

```bash
# After environment is set up:
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

The app will be available at: http://localhost:3000
