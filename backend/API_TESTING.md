# MediGuide AI - API Testing Guide

## Base URL
```
http://localhost:8000/api
```

## Authentication Endpoints

### 1. Register User
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

### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
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

### 3. Get Current User
```http
GET /api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Report Endpoints (All require authentication)

### 1. Create Health Report
```http
POST /api/reports
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "healthMetrics": {
    "height": {
      "value": 175,
      "unit": "cm"
    },
    "weight": {
      "value": 75,
      "unit": "kg"
    },
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
    "exercise": [
      "30 minutes of moderate cardio 5 days a week",
      "Strength training 2-3 times per week",
      "Yoga or stretching for flexibility"
    ],
    "walkingGoal": {
      "steps": 10000,
      "description": "Regular walking helps maintain cardiovascular health and weight management."
    },
    "diet": [
      "Increase intake of fruits and vegetables",
      "Reduce processed foods and sugar",
      "Stay hydrated - drink 8 glasses of water daily",
      "Include lean proteins in every meal"
    ]
  }
}
```

### 2. Get All Reports for User
```http
GET /api/reports
Authorization: Bearer YOUR_TOKEN_HERE
```

### 3. Get Specific Report
```http
GET /api/reports/:reportId
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. Get Report Analysis
```http
GET /api/reports/:reportId/analysis
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**
```json
{
  "reportId": "...",
  "healthMetrics": { ... },
  "analysis": {
    "summary": [
      "Your BMI is 24.5, which is considered Normal",
      "Blood pressure: 120/80 mmHg (High BP Stage 1)"
    ],
    "warnings": ["Blood pressure is High BP Stage 1"],
    "recommendations": [
      "Monitor blood pressure regularly and consult a cardiologist",
      "Reduce salt intake and manage stress levels"
    ]
  }
}
```

### 5. Get Report Recommendations
```http
GET /api/reports/:reportId/recommendations
Authorization: Bearer YOUR_TOKEN_HERE
```

### 6. Update Report
```http
PUT /api/reports/:reportId
Authorization: Bearer YOUR_TOKEN_HERE
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

### 7. Delete Report
```http
DELETE /api/reports/:reportId
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Doctor Endpoints (Public)

### 1. Get Nearby Doctors
```http
GET /api/doctors/nearby
GET /api/doctors/nearby?specialization=Cardiologist
GET /api/doctors/nearby?limit=5
```

**Response:**
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

### 2. Get Doctor by ID
```http
GET /api/doctors/:doctorId
```

### 3. Get Doctors by Specialization
```http
GET /api/doctors/specialization/Cardiologist
GET /api/doctors/specialization/General%20Physician
```

### 4. Add New Doctor (For testing)
```http
POST /api/doctors
Content-Type: application/json

{
  "name": "Dr. John Smith",
  "specialization": "Neurologist",
  "rating": 4.5,
  "location": {
    "address": "999 Brain Center",
    "city": "Medical District",
    "coordinates": {
      "latitude": 40.7500,
      "longitude": -73.9700
    }
  },
  "distance": 3.5,
  "phone": "+1-555-0199",
  "email": "john.smith@braincenter.com",
  "experience": 20,
  "availability": {
    "days": ["Monday", "Wednesday", "Friday"],
    "hours": "9:00 AM - 5:00 PM"
  }
}
```

---

## Testing with PowerShell

### Get Doctors (No auth required)
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/doctors/nearby" -Method Get
```

### Login and Save Token
```powershell
$loginResponse = Invoke-RestMethod -Uri "http://localhost:8000/api/auth/login" -Method Post -ContentType "application/json" -Body '{"email":"john@example.com","password":"password123"}'
$token = $loginResponse.token
```

### Create Report (With auth)
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$body = @{
    healthMetrics = @{
        height = @{ value = 175; unit = "cm" }
        weight = @{ value = 75; unit = "kg" }
        bloodPressure = @{ systolic = 120; diastolic = 80; status = "Normal" }
        sugarLevel = @{ value = 95; unit = "mg/dL"; status = "Normal" }
    }
    recommendations = @{
        exercise = @("30 minutes cardio", "Strength training")
        walkingGoal = @{ steps = 10000; description = "Daily goal" }
        diet = @("Eat vegetables", "Drink water")
    }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:8000/api/reports" -Method Post -Headers $headers -Body $body
```

### Get Reports
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/reports" -Method Get -Headers $headers
```

---

## Available Specializations
- General Physician
- Cardiologist
- Endocrinologist
- Dermatologist
- Orthopedic
- Neurologist
- Pediatrician
- Gynecologist
- Psychiatrist
- Other
