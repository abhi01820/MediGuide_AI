const Doctor = require('../models/Doctor');

// @desc    Get nearby doctors
// @route   GET /api/doctors/nearby
// @access  Public
exports.getNearbyDoctors = async (req, res) => {
  try {
    const { specialization, limit = 10 } = req.query;

    let query = {};
    
    if (specialization) {
      query.specialization = specialization;
    }

    const doctors = await Doctor.find(query)
      .sort({ rating: -1, distance: 1 })
      .limit(parseInt(limit));

    res.json({
      count: doctors.length,
      doctors
    });
  } catch (error) {
    console.error('Get nearby doctors error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch doctors',
      error: error.message 
    });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ doctor });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch doctor',
      error: error.message 
    });
  }
};

// @desc    Get doctors by specialization
// @route   GET /api/doctors/specialization/:specialization
// @access  Public
exports.getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.params;
    const { limit = 10 } = req.query;

    const doctors = await Doctor.find({ specialization })
      .sort({ rating: -1 })
      .limit(parseInt(limit));

    res.json({
      specialization,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    console.error('Get doctors by specialization error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch doctors',
      error: error.message 
    });
  }
};

// @desc    Create a new doctor (Admin only - for now public for testing)
// @route   POST /api/doctors
// @access  Public
exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();

    res.status(201).json({
      message: 'Doctor added successfully',
      doctor
    });
  } catch (error) {
    console.error('Create doctor error:', error);
    res.status(500).json({ 
      message: 'Failed to create doctor',
      error: error.message 
    });
  }
};
