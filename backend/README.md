# MediGuide AI Backend

This is the backend API server for MediGuide AI application.

## Features

- User authentication (register/login)
- JWT-based authorization
- MongoDB database integration
- RESTful API endpoints
- Password hashing with bcrypt
- Input validation

## Prerequisites

- Node.js 18+
- MongoDB 7.0+

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.development` to `.env`
   - Update the values as needed

3. Make sure MongoDB is running locally or update MONGODB_URI

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires authentication)

### Health Check

- `GET /api/health` - Check server status

## Environment Variables

- `PORT` - Server port (default: 8000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time (default: 7d)
- `CORS_ORIGIN` - Allowed CORS origin

## Project Structure

```
backend/
├── config/          # Configuration files
│   └── database.js  # MongoDB connection
├── controllers/     # Route controllers
│   └── authController.js
├── middleware/      # Custom middleware
│   └── auth.js      # JWT authentication
├── models/          # Database models
│   └── User.js      # User model
├── routes/          # API routes
│   └── authRoutes.js
├── .env             # Environment variables (not in git)
├── server.js        # App entry point
└── package.json     # Dependencies
```
