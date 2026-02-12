const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true,
    enum: ['General Physician', 'Cardiologist', 'Endocrinologist', 'Dermatologist', 
           'Orthopedic', 'Neurologist', 'Pediatrician', 'Gynecologist', 'Psychiatrist', 'Other']
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  location: {
    address: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  distance: {
    type: Number, // in km
    default: 0
  },
  phone: String,
  email: String,
  experience: Number, // years of experience
  availability: {
    days: [String],
    hours: String
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for location-based queries
doctorSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Doctor', doctorSchema);
