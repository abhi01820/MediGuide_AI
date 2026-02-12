# MediGuide AI

Intelligent Health Report Analysis and Doctor Recommendation System powered by AI

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [How It Works - AI Analysis](#how-it-works---ai-analysis)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

MediGuide AI is a comprehensive healthcare application that uses advanced AI techniques to analyze medical reports and provide personalized health recommendations. The system combines OCR (Optical Character Recognition), NER (Named Entity Recognition), and Hybrid Relation Extraction to automatically extract health metrics from uploaded medical reports and generate intelligent insights.

### Key Capabilities

- 🏥 **AI-Powered Report Analysis** - Upload PDF or image reports for automatic analysis
- 📊 **Health Metrics Dashboard** - View extracted height, weight, blood pressure, sugar levels
- 🎯 **BMI Calculator** - Automatic BMI calculation with health categories
- 💊 **Personalized Recommendations** - AI-generated exercise, diet, and walking suggestions
- 👨‍⚕️ **Doctor Finder** - Find nearby doctors with ratings and specializations
- 🔐 **Secure Authentication** - JWT-based login and registration
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

---

## ✨ Features

### Frontend Features
- 🏥 **Modern Healthcare UI** - Clean, professional interface with healthcare theme
- 📊 **Health Report Analysis** - Upload and analyze medical reports (PDF/Images)
- 📈 **Health Metrics Dashboard** - View comprehensive health data
- 🎯 **BMI Calculator** - Automatic BMI calculation with health categories
- 💊 **Personalized Recommendations** - Get exercise, diet, and walking suggestions
- 👨‍⚕️ **Doctor Finder** - Find nearby doctors with ratings and specializations
- 🔐 **Authentication** - Secure login and registration
- 📱 **Responsive Design** - Works on all devices

### Backend Features
- 🔍 **OCR Processing** - Extract text from PDFs and scanned images
- 🧠 **NER Analysis** - Identify health metrics using pattern recognition
- 🔗 **Hybrid Relation Extraction** - Connect entities and generate medical insights
- 🔒 **JWT Authentication** - Secure user authentication
- 💾 **MongoDB Integration** - Robust data storage
- 📤 **File Upload Support** - Handle PDF and image uploads
- ✅ **Input Validation** - Comprehensive data validation

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with functional components and hooks
- **Material-UI** - Professional UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Tesseract.js** - OCR engine for images
- **pdf-parse** - PDF text extraction
- **Multer** - File upload handling

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB 7.0+ (local or MongoDB Atlas)
- Git installed

### Option 1: One-Command Setup (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd MediGuide_AI

# Run quick start script
chmod +x quick-start.sh
./quick-start.sh
```

### Option 2: Automated Setup (Windows)

```cmd
setup-dev.bat
```

### Option 3: Manual Setup

#### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 2. Install Frontend Dependencies
```bash
cd ..
npm install
```

#### 3. Configure Environment Variables

**Backend** - Create `backend/.env`:
```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mediguide_ai
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

**Frontend** - Create `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=MediGuide AI
VITE_APP_VERSION=1.0.0
```

#### 4. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or using Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

#### 5. Start Backend Server
```bash
cd backend
npm run dev
```

Backend runs on: http://localhost:8000

#### 6. Start Frontend Development Server
```bash
npm run dev
```

Frontend runs on: http://localhost:5173

### Option 4: Docker Compose

```bash
docker-compose up -d
```

This starts:
- MongoDB on port 27017
- Backend API on port 8000
- Frontend on port 3000

---

## 📁 Project Structure

```
MediGuide_AI/
├── backend/                    # Node.js/Express backend
│   ├── config/                 # Configuration files
│   │   └── database.js         # MongoDB connection
│   ├── controllers/            # Route controllers
│   │   ├── authController.js   # Authentication logic
│   │   ├── doctorController.js # Doctor operations
│   │   └── reportController.js # Report analysis logic
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js             # JWT authentication
│   │   └── upload.js           # File upload handling
│   ├── models/                 # Mongoose models
│   │   ├── User.js             # User model
│   │   ├── Doctor.js           # Doctor model
│   │   └── Report.js           # Report model
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── doctorRoutes.js     # Doctor endpoints
│   │   └── reportRoutes.js     # Report endpoints
│   ├── services/               # AI Services
│   │   ├── ocrService.js       # OCR: Extract text from PDF/images
│   │   ├── nerService.js       # NER: Extract health metrics
│   │   └── hybridRelationExtractor.js  # Hybrid AI analysis
│   ├── uploads/                # Stored uploaded reports
│   ├── seedDoctors.js          # Sample doctor data seeder
│   ├── seedReport.js           # Sample report data seeder
│   ├── testNER.js              # NER testing script
│   ├── .env                    # Environment variables (not in git)
│   ├── server.js               # Entry point
│   └── package.json            # Backend dependencies
├── src/                        # React frontend
│   ├── components/             # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── DoctorCard.jsx
│   │   └── MetricCard.jsx
│   ├── pages/                  # Page components
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── services/               # API services
│   │   └── api.js
│   ├── utils/                  # Helper functions
│   │   └── helpers.js
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── sampleReports/              # Sample medical reports for testing
├── .env                        # Frontend environment variables
├── .env.example                # Environment template
├── docker-compose.yml          # Docker configuration
├── Dockerfile                  # Container configuration
├── package.json                # Frontend dependencies
├── vite.config.js              # Vite configuration
├── setup-environment.sh        # Automated Node.js setup
├── setup-dev.bat               # Windows setup script
├── quick-start.sh              # One-command setup
└── README.md                   # This file
```

---

## 🔧 Setup Instructions

### Environment Setup

Your Node.js version must be 18 or higher. If you have an older version:

**Using nvm (Recommended):**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install Node.js 18
nvm install 18
nvm use 18
nvm alias default 18

# Verify
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher
```

**Or use the automated setup:**
```bash
chmod +x setup-environment.sh
./setup-environment.sh
```

### MongoDB Setup

**Option 1: MongoDB Atlas (Cloud - Recommended)**

1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string
6. Add it to `backend/.env`:
```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/mediguide_ai?retryWrites=true&w=majority
```

**Option 2: Local MongoDB**

```bash
# Install MongoDB (Windows)
# Download from https://www.mongodb.com/try/download/community

# Install MongoDB (Linux)
sudo apt install mongodb

# Install MongoDB (macOS)
brew install mongodb-community

# Start MongoDB
mongod
```

**Option 3: Docker**

```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

### Seed Sample Data

```bash
cd backend

# Seed sample doctors
npm run seed:doctors

# Seed sample report
npm run seed:report
```

---

## 🔬 How It Works - AI Analysis

### AI Processing Pipeline

```
📄 Upload Report (PDF/Image)
        ↓
    🔍 Stage 1: OCR
    Extract text from document
        ↓
    🧠 Stage 2: NER  
    Identify health entities
        ↓
    🔗 Stage 3: Hybrid Relation Extraction
    Connect entities + Generate insights
        ↓
    💾 Store in MongoDB
```

### Stage 1: OCR (Optical Character Recognition)

**File**: `backend/services/ocrService.js`

**Purpose**: Convert scanned/PDF reports into machine-readable text

**Technologies**:
- **`pdf-parse`**: Extracts text from PDF files
- **`tesseract.js`**: OCR engine for scanned images (JPG, PNG, TIFF)

**Example**:
```javascript
// Input: report_sample.pdf (binary file)
const text = await ocrService.extractText(filePath, 'application/pdf');

// Output: Plain text
"Health Metrics
Height: 175cm
Weight: 75kg  
Blood Pressure: 120/80mmHg
Sugar Level: 95mg/dL"
```

**Supported Formats**:
- ✅ PDF files
- ✅ JPEG/JPG images
- ✅ PNG images
- ✅ TIFF scans

### Stage 2: NER (Named Entity Recognition)

**File**: `backend/services/nerService.js`

**Purpose**: Extract structured health data from unstructured text

**Entities Extracted**:

#### Height
- Patterns: "Height: 175 cm", "H: 5'9\"", "Height 175cm"
- Output: `{ value: 175, unit: 'cm' }`

#### Weight
- Patterns: "Weight: 75 kg", "Weight 165 lbs"
- Output: `{ value: 75, unit: 'kg' }`

#### Blood Pressure
- Patterns: "BP: 120/80", "Blood Pressure 120/80 mmHg"
- Output: `{ systolic: 120, diastolic: 80, status: "High BP Stage 1" }`

**Smart Classification**:
- Normal: systolic < 120 and diastolic < 80
- Elevated: systolic < 130 and diastolic < 80
- High BP Stage 1: systolic < 140 or diastolic < 90
- High BP Stage 2: systolic < 180 or diastolic < 120
- Hypertensive Crisis: systolic ≥ 180 or diastolic ≥ 120

#### Blood Sugar
- Patterns: "Blood Sugar: 95 mg/dL", "Glucose 95", "Fasting Glucose: 110 mg/dL"
- Output: `{ value: 95, unit: 'mg/dL', status: 'Normal' }`

**Smart Classification**:
- Normal: < 100 mg/dL
- Pre-diabetes: 100-125 mg/dL
- Diabetes: ≥ 126 mg/dL

#### Additional Metrics
- ✅ Cholesterol levels
- ✅ Heart rate (bpm)
- ✅ BMI (calculated automatically from height and weight)

### Stage 3: Hybrid Relation Extraction

**File**: `backend/services/hybridRelationExtractor.js`

**Purpose**: Connect extracted entities to generate medical insights

**Relations Extracted**:

#### 1. Metric → Condition Relations
```javascript
// High blood pressure detected
Input: { bloodPressure: { systolic: 140, diastolic: 90 } }

Output: {
  condition: "Hypertension",
  relatedMetric: "bloodPressure",
  severity: "high",
  confidence: 0.9
}
```

#### 2. Metric → Recommendation Relations
```javascript
// Elevated BMI
Input: BMI = 27 (Overweight)

Output:
- Exercise: "30 minutes cardio 5 days/week"
- Diet: "Reduce processed foods"
- Medical: "Consult nutritionist"
```

#### 3. AI Recommendation Engine

Based on extracted data, generates personalized advice:

```javascript
// Input: BP = 135/85, BMI = 28
// Output Recommendations:
{
  exercise: [
    "30 minutes of moderate cardio 5 days a week",
    "Focus on aerobic exercises to lower blood pressure",
    "Strength training 2-3 times per week"
  ],
  diet: [
    "Reduce sodium intake to less than 2000mg per day",
    "Increase potassium-rich foods (bananas, spinach)",
    "Reduce processed foods"
  ],
  walkingGoal: {
    steps: 12000,
    description: "Increase daily steps to help with weight management"
  },
  medical: [
    "Consult a cardiologist for blood pressure management"
  ]
}
```

### Complete Example Flow

**Input**: Upload `report_sample.pdf`

**Step 1 - OCR Extraction**:
```
Raw text: "Height 175cm Weight 75kg Blood Pressure 120/80mmHg..."
```

**Step 2 - NER Entity Extraction**:
```javascript
{
  height: { value: 175, unit: 'cm' },
  weight: { value: 75, unit: 'kg' },
  bloodPressure: { systolic: 120, diastolic: 80, status: 'High BP Stage 1' },
  sugarLevel: { value: 95, unit: 'mg/dL', status: 'Normal' },
  bmi: { value: 24.5, status: 'Normal' }
}
```

**Step 3 - Hybrid Relation Extraction**:
```javascript
{
  conditions: [
    {
      name: "High BP Stage 1",
      relatedMetric: "bloodPressure",
      severity: "medium",
      confidence: 0.9
    }
  ],
  recommendations: {
    exercise: ["30 minutes of moderate cardio 5 days a week"],
    diet: ["Reduce sodium intake", "Increase fruits and vegetables"],
    medical: ["Consult a cardiologist"]
  },
  confidence: 0.87
}
```

**Step 4 - Stored in MongoDB** with all extracted data and recommendations.

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer YOUR_TOKEN
```

### Report Endpoints (Authentication Required)

#### Upload and Analyze Report
```http
POST /api/reports/upload
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data

Form Data:
- reportFile: [PDF or Image file]
```

**Response**:
```json
{
  "message": "Report analyzed successfully",
  "report": {
    "_id": "...",
    "healthMetrics": {
      "height": { "value": 175, "unit": "cm" },
      "weight": { "value": 75, "unit": "kg" },
      "bloodPressure": {
        "systolic": 120,
        "diastolic": 80,
        "status": "High BP Stage 1"
      },
      "sugarLevel": {
        "value": 95,
        "unit": "mg/dL",
        "status": "Normal"
      }
    },
    "recommendations": {
      "exercise": ["30 minutes of moderate cardio 5 days a week"],
      "diet": ["Reduce sodium intake"],
      "walkingGoal": {
        "steps": 10000,
        "description": "Daily walking for cardiovascular health"
      }
    }
  }
}
```

#### Get All Reports for User
```http
GET /api/reports
Authorization: Bearer YOUR_TOKEN
```

#### Get Specific Report
```http
GET /api/reports/:reportId
Authorization: Bearer YOUR_TOKEN
```

#### Get Report Analysis
```http
GET /api/reports/:reportId/analysis
Authorization: Bearer YOUR_TOKEN
```

#### Get Report Recommendations
```http
GET /api/reports/:reportId/recommendations
Authorization: Bearer YOUR_TOKEN
```

#### Update Report
```http
PUT /api/reports/:reportId
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "healthMetrics": {
    "bloodPressure": {
      "systolic": 115,
      "diastolic": 75,
      "status": "Normal"
    }
  }
}
```

#### Delete Report
```http
DELETE /api/reports/:reportId
Authorization: Bearer YOUR_TOKEN
```

### Doctor Endpoints (Public)

#### Get Nearby Doctors
```http
GET /api/doctors/nearby
GET /api/doctors/nearby?specialization=Cardiologist
GET /api/doctors/nearby?limit=5
```

**Response**:
```json
{
  "count": 3,
  "doctors": [
    {
      "_id": "...",
      "name": "Dr. Sarah Johnson",
      "specialization": "General Physician",
      "rating": 4.8,
      "location": {
        "address": "123 Medical Center, Downtown",
        "city": "City Center"
      },
      "distance": 2.5,
      "phone": "+1-555-0101",
      "experience": 12
    }
  ]
}
```

#### Get Doctor by ID
```http
GET /api/doctors/:doctorId
```

#### Get Doctors by Specialization
```http
GET /api/doctors/specialization/Cardiologist
```

### Testing with PowerShell

**Login and Save Token**:
```powershell
$loginResponse = Invoke-RestMethod -Uri "http://localhost:8000/api/auth/login" `
  -Method Post -ContentType "application/json" `
  -Body '{"email":"john@example.com","password":"password123"}'

$token = $loginResponse.token
```

**Upload Report**:
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}

curl -X POST "http://localhost:8000/api/reports/upload" `
  -H "Authorization: Bearer $token" `
  -F "reportFile=@C:\path\to\report.pdf"
```

**Get Reports**:
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/reports" `
  -Method Get -Headers $headers
```

---

## 🚀 Deployment

### Docker Deployment

#### Using Docker Compose (Recommended)

```bash
# Build and start
docker-compose up -d

# Stop
docker-compose down
```

#### Using Docker Directly

```bash
# Build the image
docker build -t mediguide-ai .

# Run the container
docker run -p 3000:3000 mediguide-ai
```

Access at: http://localhost:3000

### Manual Deployment

#### Steps

1. **Install dependencies**:
```bash
npm install
```

2. **Build the application**:
```bash
npm run build
```

3. **Serve the build**:
```bash
npx serve -s dist -l 3000
```

### Deployment Platforms

#### Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production
vercel --prod
```

#### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

#### AWS/DigitalOcean/Other Cloud Providers

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your server
3. Configure your web server (Nginx/Apache) to serve the static files

### Production Checklist

- [ ] Update API URLs to production endpoints
- [ ] Enable HTTPS
- [ ] Set up CORS on backend
- [ ] Configure proper caching headers
- [ ] Enable compression (gzip)
- [ ] Set up monitoring/analytics
- [ ] Test on multiple devices and browsers
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure environment variables on deployment platform
- [ ] Set up automated backups for MongoDB
- [ ] Configure rate limiting
- [ ] Set up logging

---

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/MediGuide_AI.git
```

3. Follow the setup instructions above
4. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

5. Make your changes
6. Test your changes:
```bash
npm run dev
```

7. Commit your changes:
```bash
git commit -m "Add your feature"
```

8. Push to your fork:
```bash
git push origin feature/your-feature-name
```

9. Create a Pull Request

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Material-UI components for consistency
- Write meaningful commit messages
- Comment complex logic

### Testing

Before submitting a PR:
- Ensure the app builds: `npm run build`
- Test all features manually
- Check responsive design on different screen sizes
- Verify backend API functionality
- Check for console errors

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error**: "MongoServerError: connect ECONNREFUSED"

**Solution**: Make sure MongoDB is running:
```bash
# Check if MongoDB is running
mongosh

# Or start MongoDB service (Windows)
net start MongoDB

# Or start MongoDB service (Linux/Mac)
sudo systemctl start mongod
```

### Backend Port Already in Use

**Error**: "EADDRINUSE: address already in use :::8000"

**Solution**: Kill the process using port 8000:
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill
```

### Frontend Can't Connect to Backend

**Error**: Network errors in browser console

**Solution**: 
1. Make sure backend is running on port 8000
2. Check that `VITE_API_BASE_URL` in `.env` is correct
3. Restart the frontend dev server after changing `.env`

### npm install Fails

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### nvm Command Not Found

Add this to your `~/.bashrc` or `~/.zshrc`:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Then run: `source ~/.bashrc`

---

## 📊 Features in Detail

### Health Metrics Tracked
- Height (cm)
- Weight (kg)
- Blood Pressure (mmHg)
- Sugar Level (mg/dL)
- Heart Rate (bpm)
- BMI (auto-calculated)
- Cholesterol levels

### BMI Categories
- Underweight: < 18.5
- Normal: 18.5 - 24.9
- Overweight: 25 - 29.9
- Obese: ≥ 30

### Recommendations Generated
- **Exercise**: Custom workout plans based on metrics
- **Walking**: Daily step goals adjusted for BMI
- **Diet**: Nutrition tips and meal suggestions
- **Medical**: Specialist consultation recommendations

### Doctor Specializations Available
- General Physician
- Cardiologist
- Endocrinologist
- Dermatologist
- Orthopedic
- Neurologist
- Pediatrician
- Gynecologist
- Psychiatrist

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📄 License

This project is part of MediGuide AI healthcare system.

---

## 📞 Contact

For questions or support, contact: support@mediguide.ai

---

## 🙏 Acknowledgments

- Tesseract.js for OCR capabilities
- React and Material-UI communities
- MongoDB for robust data storage
- All contributors and testers

---

**Built with ❤️ for better healthcare management**
