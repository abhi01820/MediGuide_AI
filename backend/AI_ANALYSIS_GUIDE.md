# AI-Powered Report Analysis System

## Overview

Your MediGuide AI now includes **advanced AI-powered report analysis** using:

1. **OCR (Optical Character Recognition)** - Extracts text from PDFs and images
2. **NER (Named Entity Recognition)** - Identifies health metrics from text
3. **Hybrid Relation Extraction** - Connects entities and generates insights

---

## How It Works

### Architecture Flow

```
PDF/Image Upload 
    ↓
[OCR Service] → Extract raw text
    ↓
[NER Service] → Identify health metrics (BP, sugar, weight, etc.)
    ↓
[Hybrid Relation Extractor] → Connect metrics to conditions
    ↓
[AI Recommendations] → Generate personalized health advice
    ↓
Store in MongoDB
```

---

## Technologies Used

### 1. **OCR (Optical Character Recognition)**
- **Library**: `tesseract.js` (for images) + `pdf-parse` (for PDFs)
- **Purpose**: Converts scanned medical reports into readable text
- **Supported formats**: PDF, JPG, PNG, TIFF

**Example**:
```javascript
// Input: Scanned report image
// Output: "Height: 175 cm, Weight: 75 kg, Blood Pressure: 120/80 mmHg..."
```

### 2. **NER (Named Entity Recognition)**
- **Approach**: Custom regex patterns + medical domain knowledge
- **Entities Extracted**:
  - Height (cm/feet)
  - Weight (kg/lbs)
  - Blood Pressure (systolic/diastolic)
  - Blood Sugar (mg/dL)
  - Heart Rate (bpm)
  - Cholesterol levels

**Example**:
```javascript
// Input Text: "Patient's blood pressure is 120/80 mmHg"
// Extracted Entity: 
{
  bloodPressure: {
    systolic: 120,
    diastolic: 80,
    status: "High BP Stage 1"
  }
}
```

### 3. **Hybrid Relation Extraction**
- **Combines**:
  - **Rule-based patterns**: Regex for structured data
  - **Contextual analysis**: Understanding medical relationships
  
**Relations Extracted**:
- **Metric → Condition**: "High BP → Hypertension"
- **Condition → Medication**: "Diabetes → Metformin"
- **Metric → Recommendation**: "BMI 30 → Exercise plan"
- **Temporal trends**: "Blood sugar increasing over time"

**Example**:
```javascript
// If sugar level = 130 mg/dL
// Relation: Creates link to "Pre-diabetes" condition
// Recommendation: "Consult endocrinologist"
```

---

## API Usage

### Upload and Analyze Report

```http
POST /api/reports/upload
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data

Form Data:
- reportFile: [PDF or Image file]
```

**PowerShell Example**:
```powershell
# Login first
$login = Invoke-RestMethod -Uri "http://localhost:8000/api/auth/login" `
  -Method Post -ContentType "application/json" `
  -Body '{"email":"your@email.com","password":"yourpassword"}'

$token = $login.token

# Upload report
$headers = @{
    "Authorization" = "Bearer $token"
}

curl -X POST "http://localhost:8000/api/reports/upload" `
  -H "Authorization: Bearer $token" `
  -F "reportFile=@C:\path\to\report.pdf"
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
      "exercise": [
        "30 minutes of moderate cardio 5 days a week",
        "Strength training 2-3 times per week"
      ],
      "diet": [
        "Reduce sodium intake",
        "Increase fruits and vegetables"
      ],
      "walkingGoal": {
        "steps": 10000,
        "description": "Daily walking for cardiovascular health"
      }
    }
  },
  "analysis": {
    "confidence": 0.87,
    "relations": {
      "conditions": [
        {
          "name": "High BP Stage 1",
          "relatedMetric": "bloodPressure",
          "severity": "medium"
        }
      ]
    },
    "extractedMetrics": 4
  }
}
```

---

## Installation

Install the new dependencies:

```bash
cd backend
npm install
```

This will install:
- `tesseract.js` - OCR engine
- `pdf-parse` - PDF text extraction
- `multer` - File upload handling

---

## File Structure

```
backend/
├── services/
│   ├── ocrService.js              # OCR: Extract text from PDF/images
│   ├── nerService.js              # NER: Extract health metrics
│   └── hybridRelationExtractor.js # Hybrid: Connect entities + generate insights
├── middleware/
│   └── upload.js                  # Multer configuration for file uploads
├── uploads/                       # Stored uploaded reports
└── controllers/
    └── reportController.js        # Updated with AI analysis
```

---

## How Each Component Works

### 1. OCR Service (`ocrService.js`)
```javascript
// For PDFs: Uses pdf-parse to extract text
extractTextFromPDF(filePath)

// For Images: Uses Tesseract OCR
extractTextFromImage(filePath)

// Auto-detects and processes
extractText(filePath, mimeType)
```

### 2. NER Service (`nerService.js`)
```javascript
// Regex patterns find health metrics
extractHeight(text)      // "Height: 175 cm" → {value: 175, unit: "cm"}
extractWeight(text)      // "Weight: 75 kg"  → {value: 75, unit: "kg"}
extractBloodPressure(text) // "BP: 120/80"  → {systolic: 120, diastolic: 80}
extractSugarLevel(text)  // "Sugar: 95 mg/dL" → {value: 95, status: "Normal"}
```

### 3. Hybrid Extractor (`hybridRelationExtractor.js`)
```javascript
// Main analysis pipeline
analyzeReport(filePath, mimeType)
  ↓
1. OCR → Extract text
2. NER → Extract metrics
3. Extract relations between entities
4. Generate AI recommendations
5. Calculate confidence score
```

**Relations Extracted**:
- **Conditions**: Links metrics to medical conditions
- **Medications**: Finds prescribed drugs
- **Symptoms**: Identifies patient complaints
- **Trends**: Detects changes over time

---

## Example: Complete Flow

1. **User uploads** `blood_test.pdf`
2. **OCR** extracts: "Blood Pressure: 140/90 mmHg, Glucose: 110 mg/dL"
3. **NER** identifies:
   - BP: 140/90 (High BP Stage 2)
   - Sugar: 110 (Pre-diabetes)
4. **Hybrid Extractor** creates relations:
   - Condition: "Hypertension" (from BP)
   - Condition: "Pre-diabetes" (from glucose)
5. **AI generates recommendations**:
   - Exercise: "30 min cardio daily"
   - Diet: "Low sodium, low sugar"
   - Medical: "Consult cardiologist"
6. **Stored in MongoDB** with 87% confidence score

---

## Benefits

✅ **Automated**: No manual data entry needed
✅ **Accurate**: Multi-step validation (OCR → NER → Relations)
✅ **Intelligent**: Understands medical context and relationships
✅ **Comprehensive**: Extracts metrics + conditions + recommendations
✅ **Scalable**: Can process thousands of reports

---

## Testing

1. **Install dependencies**:
```bash
cd backend
npm install
```

2. **Restart server**:
```bash
npm run dev
```

3. **Upload a report**:
```bash
# Use the test PDF in your project
curl -X POST "http://localhost:8000/api/reports/upload" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "reportFile=@report_sample.pdf"
```

---

## Next Steps

1. Install dependencies: `npm install`
2. Restart backend server
3. Test with sample PDF report
4. Check MongoDB for extracted data
5. View AI-generated recommendations

Your MediGuide AI is now powered by advanced AI analysis! 🚀
