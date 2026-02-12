const express = require('express');
const {
  getNearbyDoctors,
  getDoctorById,
  getDoctorsBySpecialization,
  createDoctor
} = require('../controllers/doctorController');

const router = express.Router();

// Public routes
router.get('/nearby', getNearbyDoctors);
router.get('/specialization/:specialization', getDoctorsBySpecialization);
router.get('/:id', getDoctorById);
router.post('/', createDoctor);

module.exports = router;
