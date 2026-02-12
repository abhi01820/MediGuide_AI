const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  healthMetrics: {
    height: {
      value: Number,
      unit: { type: String, default: 'cm' }
    },
    weight: {
      value: Number,
      unit: { type: String, default: 'kg' }
    },
    bloodPressure: {
      systolic: Number,
      diastolic: Number,
      status: String // Normal, High BP Stage 1, High BP Stage 2, etc.
    },
    sugarLevel: {
      value: Number,
      unit: { type: String, default: 'mg/dL' },
      status: String // Normal, Pre-diabetes, Diabetes
    },
    bmi: {
      value: Number,
      status: String // Underweight, Normal, Overweight, Obese
    }
  },
  recommendations: {
    exercise: [String],
    walkingGoal: {
      steps: Number,
      description: String
    },
    diet: [String]
  },
  fileUrl: String,
  fileName: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate BMI before saving
reportSchema.pre('save', function(next) {
  if (this.healthMetrics.height?.value && this.healthMetrics.weight?.value) {
    const heightInMeters = this.healthMetrics.height.value / 100;
    const bmi = this.healthMetrics.weight.value / (heightInMeters * heightInMeters);
    
    this.healthMetrics.bmi = {
      value: Math.round(bmi * 10) / 10,
      status: getBMIStatus(bmi)
    };
  }
  
  this.updatedAt = Date.now();
  next();
});

function getBMIStatus(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

module.exports = mongoose.model('Report', reportSchema);
