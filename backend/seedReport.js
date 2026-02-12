const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Report = require('./models/Report');
const User = require('./models/User');

dotenv.config();

const seedReport = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    // Find the first user (or you can specify a user email)
    const user = await User.findOne();
    
    if (!user) {
      console.log('No user found. Please create a user first.');
      process.exit(1);
    }

    console.log(`Creating sample report for user: ${user.email}`);

    // Create sample report based on your provided data
    const sampleReport = {
      userId: user._id,
      healthMetrics: {
        height: {
          value: 175,
          unit: 'cm'
        },
        weight: {
          value: 75,
          unit: 'kg'
        },
        bloodPressure: {
          systolic: 120,
          diastolic: 80,
          status: 'High BP Stage 1'
        },
        sugarLevel: {
          value: 95,
          unit: 'mg/dL',
          status: 'Normal'
        },
        bmi: {
          value: 24.5,
          status: 'Normal'
        }
      },
      recommendations: {
        exercise: [
          '30 minutes of moderate cardio 5 days a week',
          'Strength training 2-3 times per week',
          'Yoga or stretching for flexibility'
        ],
        walkingGoal: {
          steps: 10000,
          description: 'Regular walking helps maintain cardiovascular health and weight management.'
        },
        diet: [
          'Increase intake of fruits and vegetables',
          'Reduce processed foods and sugar',
          'Stay hydrated - drink 8 glasses of water daily',
          'Include lean proteins in every meal'
        ]
      }
    };

    const report = new Report(sampleReport);
    await report.save();

    console.log('Sample report created successfully');
    console.log('Report ID:', report._id);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding report:', error);
    process.exit(1);
  }
};

seedReport();
