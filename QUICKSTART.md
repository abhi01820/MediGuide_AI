# MediGuide AI - Quick Start Guide

## Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (v7.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
   - OR use Docker: `docker run -d -p 27017:27017 --name mongodb mongo:7.0`

## Quick Setup (Development)

### Option 1: Automated Setup (Windows)

Run the setup script:
```cmd
setup-dev.bat
```

### Option 2: Manual Setup

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd ..
npm install
```

3. **Start MongoDB**

If using MongoDB locally:
```bash
mongod
```

If using Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

4. **Start Backend Server**

Open a new terminal:
```bash
cd backend
npm run dev
```

The backend will run on http://localhost:8000

5. **Start Frontend Development Server**

Open another terminal:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## Quick Setup (Using Docker Compose)

If you have Docker installed:

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 8000
- Frontend on port 3000

## Testing the Application

1. Open http://localhost:5173 (or http://localhost:3000 for Docker)
2. Click "Sign Up" to create a new account
3. Fill in the registration form
4. After successful registration, you'll be redirected to the dashboard
5. You can also test login with your credentials

## API Endpoints

- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/me` - Get current user (requires authentication)
- **GET** `/api/health` - Health check

## Environment Variables

### Backend (.env in backend folder)
```
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mediguide_ai
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
```

### Frontend (.env in root folder)
```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=MediGuide AI
VITE_APP_VERSION=1.0.0
```

## Troubleshooting

### MongoDB Connection Issues

**Error:** "MongoServerError: connect ECONNREFUSED"

**Solution:** Make sure MongoDB is running:
```bash
# Check if MongoDB is running
mongosh

# Or start MongoDB service (Windows)
net start MongoDB

# Or start MongoDB service (Linux/Mac)
sudo systemctl start mongod
```

### Backend Port Already in Use

**Error:** "EADDRINUSE: address already in use :::8000"

**Solution:** Kill the process using port 8000:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill
```

### Frontend Can't Connect to Backend

**Error:** Network errors in browser console

**Solution:** 
1. Make sure backend is running on port 8000
2. Check that VITE_API_BASE_URL in .env is correct
3. Restart the frontend dev server after changing .env

## Project Structure

```
MediGuide_AI/
├── backend/              # Node.js/Express backend
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── .env             # Backend environment variables
│   └── server.js        # Entry point
├── src/                 # React frontend
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   └── utils/          # Helper functions
├── .env                # Frontend environment variables
└── docker-compose.yml  # Docker configuration
```

## Next Steps

- Test registration and login functionality
- Explore the dashboard
- Check MongoDB to see stored users: `mongosh` then `use mediguide_ai` then `db.users.find()`

## Need Help?

Check the following files for more details:
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [backend/README.md](backend/README.md) - Backend documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
