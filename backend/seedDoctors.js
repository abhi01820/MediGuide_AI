const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');

dotenv.config();

const sampleDoctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialization: 'General Physician',
    rating: 4.8,
    location: {
      address: '123 Medical Center, Downtown',
      city: 'City Center',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    },
    distance: 2.5,
    phone: '+1-555-0101',
    email: 'sarah.johnson@medicalcenter.com',
    experience: 12,
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '9:00 AM - 5:00 PM'
    }
  },
  {
    name: 'Dr. Michael Chen',
    specialization: 'Cardiologist',
    rating: 4.9,
    location: {
      address: '456 Heart Clinic, City Center',
      city: 'City Center',
      coordinates: {
        latitude: 40.7580,
        longitude: -73.9855
      }
    },
    distance: 3.2,
    phone: '+1-555-0102',
    email: 'michael.chen@heartclinic.com',
    experience: 15,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: '10:00 AM - 6:00 PM'
    }
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialization: 'Endocrinologist',
    rating: 4.7,
    location: {
      address: '789 Diabetes Care, Medical District',
      city: 'Medical District',
      coordinates: {
        latitude: 40.7489,
        longitude: -73.9680
      }
    },
    distance: 4.1,
    phone: '+1-555-0103',
    email: 'emily.rodriguez@diabetescare.com',
    experience: 10,
    availability: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      hours: '8:00 AM - 4:00 PM'
    }
  },
  {
    name: 'Dr. James Wilson',
    specialization: 'Orthopedic',
    rating: 4.6,
    location: {
      address: '321 Bone & Joint Center',
      city: 'Uptown',
      coordinates: {
        latitude: 40.7831,
        longitude: -73.9712
      }
    },
    distance: 5.0,
    phone: '+1-555-0104',
    email: 'james.wilson@bonecenter.com',
    experience: 18,
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      hours: '9:00 AM - 5:00 PM'
    }
  },
  {
    name: 'Dr. Lisa Anderson',
    specialization: 'Dermatologist',
    rating: 4.9,
    location: {
      address: '654 Skin Care Clinic',
      city: 'Downtown',
      coordinates: {
        latitude: 40.7614,
        longitude: -73.9776
      }
    },
    distance: 1.8,
    phone: '+1-555-0105',
    email: 'lisa.anderson@skincare.com',
    experience: 8,
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '10:00 AM - 6:00 PM'
    }
  }
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing doctors
    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    // Insert sample doctors
    await Doctor.insertMany(sampleDoctors);
    console.log('Sample doctors added successfully');

    console.log(`${sampleDoctors.length} doctors have been seeded`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding doctors:', error);
    process.exit(1);
  }
};

seedDoctors();
