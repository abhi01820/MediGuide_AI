# MediGuide AI - Setup Instructions

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git installed

## Quick Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd MediGuide_AI
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ..
npm install
```

### 3. Configure Environment Variables

**Backend - Create `backend/.env`:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add your MongoDB Atlas connection string:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mediguide_ai?retryWrites=true&w=majority
```

**Frontend - Create `.env`:**
```bash
cd ..
cp .env.example .env
```

### 4. Seed Sample Data (Optional)

```bash
cd backend
npm run seed:doctors
```

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## Important Notes

⚠️ **Never commit your `.env` files to GitHub!**
- The `.env` files contain sensitive credentials
- Always use `.env.example` as a template
- Add actual credentials only on your local machine

## MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Add it to `backend/.env`

## Features

- ✅ User authentication (register/login)
- ✅ Health report analysis with AI (OCR + NER)
- ✅ Doctor recommendations
- ✅ MongoDB Atlas integration
- ✅ JWT authentication
- ✅ File upload support

## Troubleshooting

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill
```

**MongoDB connection failed:**
- Check your connection string in `.env`
- Verify your IP is whitelisted in MongoDB Atlas
- Check database user credentials

For detailed documentation, see:
- [QUICKSTART.md](QUICKSTART.md)
- [backend/README.md](backend/README.md)
- [backend/HOW_IT_WORKS.md](backend/HOW_IT_WORKS.md)
