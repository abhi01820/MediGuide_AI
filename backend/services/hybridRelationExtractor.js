const ocrService = require('./ocrService');
const nerService = require('./nerService');

/**
 * Hybrid Relation Extraction Service
 * Combines pattern-based and ML-based approaches for entity relation extraction
 */
class HybridRelationExtractor {
  /**
   * Analyze health report and extract structured data with relations
   * @param {string} filePath - Path to uploaded file
   * @param {string} mimeType - MIME type of file
   * @returns {Promise<Object>} Structured health data with relations
   */
  async analyzeReport(filePath, mimeType) {
    try {
      // Step 1: OCR - Extract text from PDF/Image
      console.log('Step 1: Performing OCR...');
      const rawText = await ocrService.extractText(filePath, mimeType);
      
      if (!rawText || rawText.trim().length === 0) {
        throw new Error('No text could be extracted from the file');
      }

      // Step 2: NER - Extract health metrics
      console.log('Step 2: Extracting health metrics (NER)...');
      const healthMetrics = nerService.extractHealthMetrics(rawText);

      // Step 3: Hybrid Relation Extraction
      console.log('Step 3: Extracting relations...');
      const relations = this.extractRelations(rawText, healthMetrics);

      // Step 4: Generate recommendations based on extracted data
      console.log('Step 4: Generating recommendations...');
      const recommendations = this.generateRecommendations(healthMetrics, relations);

      // Step 5: Build structured report
      const structuredReport = {
        rawText: rawText.substring(0, 500), // Store first 500 chars for reference
        healthMetrics,
        relations,
        recommendations,
        extractedAt: new Date(),
        confidence: this.calculateConfidence(healthMetrics, relations)
      };

      return structuredReport;
    } catch (error) {
      console.error('Report analysis error:', error);
      throw error;
    }
  }

  /**
   * Extract relations between entities using hybrid approach
   * Combines rule-based patterns with contextual analysis
   */
  extractRelations(text, metrics) {
    const relations = {
      // Medical conditions detected
      conditions: this.extractConditions(text, metrics),
      
      // Medications and their relations to conditions
      medications: this.extractMedications(text),
      
      // Symptoms and their relations to metrics
      symptoms: this.extractSymptoms(text),
      
      // Doctor recommendations from report
      doctorNotes: this.extractDoctorNotes(text),
      
      // Temporal relations (trends over time)
      trends: this.extractTrends(text, metrics)
    };

    return relations;
  }

  /**
   * Extract medical conditions with relations to metrics
   */
  extractConditions(text, metrics) {
    const conditions = [];

    // Check for diabetes based on sugar levels
    if (metrics.sugarLevel) {
      if (metrics.sugarLevel.value >= 126) {
        conditions.push({
          name: 'Diabetes',
          relatedMetric: 'sugarLevel',
          severity: 'high',
          confidence: 0.9
        });
      } else if (metrics.sugarLevel.value >= 100) {
        conditions.push({
          name: 'Pre-diabetes',
          relatedMetric: 'sugarLevel',
          severity: 'medium',
          confidence: 0.85
        });
      }
    }

    // Check for hypertension based on BP
    if (metrics.bloodPressure) {
      const { systolic, diastolic } = metrics.bloodPressure;
      if (systolic >= 140 || diastolic >= 90) {
        conditions.push({
          name: 'Hypertension',
          relatedMetric: 'bloodPressure',
          severity: 'high',
          confidence: 0.9
        });
      }
    }

    // Check for obesity based on BMI
    if (metrics.height && metrics.weight) {
      const heightM = metrics.height.value / 100;
      const bmi = metrics.weight.value / (heightM * heightM);
      
      if (bmi >= 30) {
        conditions.push({
          name: 'Obesity',
          relatedMetric: 'bmi',
          severity: 'high',
          confidence: 0.95
        });
      } else if (bmi >= 25) {
        conditions.push({
          name: 'Overweight',
          relatedMetric: 'bmi',
          severity: 'medium',
          confidence: 0.95
        });
      }
    }

    // Extract from text patterns
    const textConditions = nerService.extractConditions(text);
    textConditions.forEach(condition => {
      conditions.push({
        name: condition,
        source: 'text',
        confidence: 0.7
      });
    });

    return conditions;
  }

  /**
   * Extract medications with dosage and frequency
   */
  extractMedications(text) {
    const medications = [];
    
    // Pattern: "Medication: [name] [dosage] [frequency]"
    const medPatterns = [
      /(?:medication|drug|prescription)[:\s]+([a-z]+)\s+(\d+\s*mg)\s+(.*)/gi,
      /taking\s+([a-z]+)\s+(\d+\s*mg)?/gi
    ];

    for (const pattern of medPatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        medications.push({
          name: match[1],
          dosage: match[2] || 'not specified',
          frequency: match[3] || 'not specified',
          confidence: 0.8
        });
      }
    }

    return medications;
  }

  /**
   * Extract symptoms mentioned in report
   */
  extractSymptoms(text) {
    const symptoms = [];
    const symptomKeywords = [
      'headache', 'dizziness', 'fatigue', 'pain', 'nausea',
      'shortness of breath', 'chest pain', 'weakness', 'fever'
    ];

    const lowerText = text.toLowerCase();
    symptomKeywords.forEach(symptom => {
      if (lowerText.includes(symptom)) {
        symptoms.push({
          name: symptom,
          confidence: 0.75
        });
      }
    });

    return symptoms;
  }

  /**
   * Extract doctor's notes and recommendations
   */
  extractDoctorNotes(text) {
    const notes = [];
    const patterns = [
      /(?:doctor's?\s+note|recommendation|advice)[:\s]+([^.]+)/gi,
      /(?:suggested|advised|recommended)[:\s]+([^.]+)/gi
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        notes.push(match[1].trim());
      }
    }

    return notes;
  }

  /**
   * Extract trends (comparing with previous values)
   */
  extractTrends(text, metrics) {
    const trends = {};
    
    // Look for comparative language
    const increasePatterns = /(\w+)\s+(?:increased|risen|went up|higher)/gi;
    const decreasePatterns = /(\w+)\s+(?:decreased|fallen|went down|lower)/gi;
    const stablePatterns = /(\w+)\s+(?:stable|unchanged|same)/gi;

    let match;
    while ((match = increasePatterns.exec(text)) !== null) {
      trends[match[1]] = 'increasing';
    }
    while ((match = decreasePatterns.exec(text)) !== null) {
      trends[match[1]] = 'decreasing';
    }
    while ((match = stablePatterns.exec(text)) !== null) {
      trends[match[1]] = 'stable';
    }

    return trends;
  }

  /**
   * Generate personalized recommendations based on extracted data
   */
  generateRecommendations(metrics, relations) {
    const recommendations = {
      exercise: [],
      diet: [],
      walkingGoal: null,
      medical: []
    };

    // Exercise recommendations based on BMI and BP
    if (metrics.bloodPressure?.systolic >= 130) {
      recommendations.exercise.push('30 minutes of moderate cardio 5 days a week');
      recommendations.exercise.push('Focus on aerobic exercises to lower blood pressure');
    }

    if (metrics.weight) {
      recommendations.exercise.push('Strength training 2-3 times per week');
      recommendations.exercise.push('Yoga or stretching for flexibility');
    }

    // Walking goal
    const heightM = metrics.height?.value / 100 || 1.7;
    const bmi = metrics.weight?.value / (heightM * heightM);
    
    if (bmi >= 25) {
      recommendations.walkingGoal = {
        steps: 12000,
        description: 'Increase daily steps to help with weight management'
      };
    } else {
      recommendations.walkingGoal = {
        steps: 10000,
        description: 'Regular walking helps maintain cardiovascular health and weight management'
      };
    }

    // Diet recommendations
    if (metrics.sugarLevel?.value >= 100) {
      recommendations.diet.push('Reduce processed foods and sugar intake');
      recommendations.diet.push('Focus on low glycemic index foods');
      recommendations.diet.push('Include more fiber-rich foods');
    }

    if (metrics.bloodPressure?.systolic >= 130) {
      recommendations.diet.push('Reduce sodium intake to less than 2000mg per day');
      recommendations.diet.push('Increase potassium-rich foods (bananas, spinach)');
    }

    recommendations.diet.push('Increase intake of fruits and vegetables');
    recommendations.diet.push('Stay hydrated - drink 8 glasses of water daily');
    recommendations.diet.push('Include lean proteins in every meal');

    // Medical recommendations
    if (relations.conditions.length > 0) {
      relations.conditions.forEach(condition => {
        if (condition.name === 'Hypertension') {
          recommendations.medical.push('Consult a cardiologist for blood pressure management');
        } else if (condition.name.includes('Diabetes')) {
          recommendations.medical.push('Consult an endocrinologist for diabetes management');
        }
      });
    }

    return recommendations;
  }

  /**
   * Calculate overall confidence score for the extraction
   */
  calculateConfidence(metrics, relations) {
    let totalScore = 0;
    let count = 0;

    // Count extracted metrics
    Object.keys(metrics).forEach(key => {
      if (metrics[key]) {
        totalScore += 0.9; // High confidence for metrics
        count++;
      }
    });

    // Factor in relations confidence
    if (relations.conditions) {
      relations.conditions.forEach(condition => {
        totalScore += condition.confidence || 0.7;
        count++;
      });
    }

    return count > 0 ? (totalScore / count).toFixed(2) : 0;
  }
}

module.exports = new HybridRelationExtractor();
