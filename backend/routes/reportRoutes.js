const express = require('express');
const {
  uploadReport,
  createReport,
  getUserReports,
  getReportById,
  getReportAnalysis,
  getRecommendations,
  updateReport,
  deleteReport
} = require('../controllers/reportController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Upload and analyze report (OCR + NER + Hybrid Extraction)
router.post('/upload', upload.single('reportFile'), uploadReport);

// Report CRUD routes
router.post('/', createReport);
router.get('/', getUserReports);
router.get('/:id', getReportById);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

// Analysis and recommendations routes
router.get('/:id/analysis', getReportAnalysis);
router.get('/:id/recommendations', getRecommendations);

module.exports = router;
