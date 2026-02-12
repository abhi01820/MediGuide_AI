# MediGuide AI - Frontend

Intelligent Health Report Analysis and Doctor Recommendation System

## Features

- 🏥 **Modern Healthcare UI** - Clean, professional interface with healthcare theme
- 📊 **Health Report Analysis** - Upload and analyze medical reports (PDF/Images)
- 📈 **Health Metrics Dashboard** - View height, weight, blood pressure, sugar levels
- 🎯 **BMI Calculator** - Automatic BMI calculation with health categories
- 💊 **Personalized Recommendations** - Get exercise, diet, and walking suggestions
- 👨‍⚕️ **Doctor Finder** - Find nearby doctors with ratings and specializations
- 🔐 **Authentication** - Secure login and registration
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **React 18** - Modern React with functional components and hooks
- **Material-UI** - Professional UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── DoctorCard.jsx
│   └── MetricCard.jsx
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
├── services/           # API services
│   └── api.js
├── utils/              # Helper functions
│   └── helpers.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher

### Installation

**Option 1: Automated Setup (Recommended)**
```bash
# Make setup script executable and run it
chmod +x setup-environment.sh
./setup-environment.sh

# Start development server
npm run dev
```

**Option 2: Manual Setup**
```bash
# Ensure you have Node.js 18+
node --version

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at: http://localhost:5173

### Other Commands

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

**Run with Docker:**
```bash
docker-compose up
```

For detailed setup instructions, see [SETUP.md](SETUP.md)  
For deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## Usage

### Landing Page
- View project overview and features
- Click "Upload Medical Report" to go to dashboard
- Click "Get Started" to login/register

### Authentication
- **Register:** Create new account with email and password
- **Login:** Access dashboard with credentials
- Form validation included

### Dashboard
1. **Upload Report:** Select PDF or image file and upload
2. **View Metrics:** See extracted health data
3. **Check BMI:** View calculated BMI with category
4. **Get Recommendations:** Personalized exercise, diet, and walking tips
5. **Find Doctors:** Browse nearby doctors with specializations

## API Configuration

Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

## Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Then update the values:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_API_URL=http://localhost:8000/api
```

## Features in Detail

### Health Metrics
- Height (cm)
- Weight (kg)
- Blood Pressure (mmHg)
- Sugar Level (mg/dL)
- Heart Rate (bpm)

### BMI Categories
- Underweight: < 18.5
- Normal: 18.5 - 24.9
- Overweight: 25 - 29.9
- Obese: ≥ 30

### Recommendations
- **Exercise:** Custom workout plans
- **Walking:** Daily step goals
- **Diet:** Nutrition tips and meal suggestions

### Doctor Information
- Name and specialization
- Distance from user
- Rating (out of 5)
- Address

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of MediGuide AI healthcare system.

## Contact

For questions or support, contact: support@mediguide.ai
