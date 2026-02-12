const Report = require('../models/Report');
const hybridExtractor = require('../services/hybridRelationExtractor');
const fs = require('fs').promises;

// @desc    Upload and analyze health report using OCR + NER + Hybrid Extraction
// @route   POST /api/reports/upload
// @access  Private
exports.uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;

    console.log('Processing uploaded file:', req.file.filename);
    console.log('File type:', mimeType);

    // Step 1-3: OCR + NER + Hybrid Relation Extraction
    const analysisResult = await hybridExtractor.analyzeReport(filePath, mimeType);

    // Create report in database
    const report = new Report({
      userId: req.user._id,
      healthMetrics: analysisResult.healthMetrics,
      recommendations: analysisResult.recommendations,
      fileName: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`
    });

    await report.save();

    // Clean up uploaded file (optional - keep if you want to store originals)
    // await fs.unlink(filePath);

    res.status(201).json({
      message: 'Report analyzed successfully',
      report,
      analysis: {
        confidence: analysisResult.confidence,
        relations: analysisResult.relations,
        extractedMetrics: Object.keys(analysisResult.healthMetrics).length,
        textPreview: analysisResult.rawText,
        timestamp: analysisResult.extractedAt
      },
      debug: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        metricsFound: Object.keys(analysisResult.healthMetrics)
      }
    });
  } catch (error) {
    console.error('Upload and analysis error:', error);
    
    // Clean up file if there was an error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    res.status(500).json({ 
      message: 'Failed to analyze report',
      error: error.message 
    });
  }
};

// @desc    Create/Upload a new health report
// @route   POST /api/reports
// @access  Private
exports.createReport = async (req, res) => {
  try {
    const { healthMetrics, recommendations } = req.body;

    const report = new Report({
      userId: req.user._id,
      healthMetrics,
      recommendations
    });

    await report.save();

    res.status(201).json({
      message: 'Report created successfully',
      report
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ 
      message: 'Failed to create report',
      error: error.message 
    });
  }
};

// @desc    Get all reports for logged-in user
// @route   GET /api/reports
// @access  Private
exports.getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      count: reports.length,
      reports
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch reports',
      error: error.message 
    });
  }
};

// @desc    Get a specific report by ID
// @route   GET /api/reports/:id
// @access  Private
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ report });
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch report',
      error: error.message 
    });
  }
};

// @desc    Get analysis for a report
// @route   GET /api/reports/:id/analysis
// @access  Private
exports.getReportAnalysis = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Generate detailed analysis based on health metrics
    const analysis = generateHealthAnalysis(report.healthMetrics);

    res.json({
      reportId: report._id,
      healthMetrics: report.healthMetrics,
      analysis
    });
  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({ 
      message: 'Failed to get analysis',
      error: error.message 
    });
  }
};

// @desc    Get recommendations for a report
// @route   GET /api/reports/:id/recommendations
// @access  Private
exports.getRecommendations = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({
      reportId: report._id,
      recommendations: report.recommendations
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ 
      message: 'Failed to get recommendations',
      error: error.message 
    });
  }
};

// @desc    Update a report
// @route   PUT /api/reports/:id
// @access  Private
exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({
      message: 'Report updated successfully',
      report
    });
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ 
      message: 'Failed to update report',
      error: error.message 
    });
  }
};

// @desc    Delete a report
// @route   DELETE /api/reports/:id
// @access  Private
exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ 
      message: 'Failed to delete report',
      error: error.message 
    });
  }
};

// Helper function to generate health analysis
function generateHealthAnalysis(metrics) {
  const analysis = {
    summary: [],
    warnings: [],
    recommendations: []
  };

  // BMI Analysis
  if (metrics.bmi) {
    analysis.summary.push(`Your BMI is ${metrics.bmi.value}, which is considered ${metrics.bmi.status}`);
    
    if (metrics.bmi.status !== 'Normal') {
      analysis.warnings.push(`BMI is ${metrics.bmi.status.toLowerCase()}`);
      if (metrics.bmi.status === 'Overweight' || metrics.bmi.status === 'Obese') {
        analysis.recommendations.push('Consider a balanced diet and regular exercise to achieve a healthy weight');
      }
    }
  }

  // Blood Pressure Analysis
  if (metrics.bloodPressure) {
    const { systolic, diastolic, status } = metrics.bloodPressure;
    analysis.summary.push(`Blood pressure: ${systolic}/${diastolic} mmHg (${status})`);
    
    if (status !== 'Normal') {
      analysis.warnings.push(`Blood pressure is ${status}`);
      analysis.recommendations.push('Monitor blood pressure regularly and consult a cardiologist');
      analysis.recommendations.push('Reduce salt intake and manage stress levels');
    }
  }

  // Sugar Level Analysis
  if (metrics.sugarLevel) {
    analysis.summary.push(`Blood sugar: ${metrics.sugarLevel.value} ${metrics.sugarLevel.unit} (${metrics.sugarLevel.status})`);
    
    if (metrics.sugarLevel.status !== 'Normal') {
      analysis.warnings.push(`Blood sugar is ${metrics.sugarLevel.status}`);
      analysis.recommendations.push('Consult an endocrinologist for proper diabetes management');
      analysis.recommendations.push('Monitor carbohydrate intake and maintain regular meal times');
    }
  }

  return analysis;
}
