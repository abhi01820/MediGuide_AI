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
      console.log('\n=== REPORT ANALYSIS STARTED ===');
      console.log('Step 1: Performing OCR...');
      console.log('File:', filePath);
      console.log('MIME Type:', mimeType);
      
      const rawText = await ocrService.extractText(filePath, mimeType);
      
      if (!rawText || rawText.trim().length === 0) {
        throw new Error('No text could be extracted from the file');
      }

      console.log('Extracted text length:', rawText.length);
      console.log('Text preview:', rawText.substring(0, 200));

      // Step 2: NER - Extract health metrics
      console.log('\nStep 2: Extracting health metrics (NER)...');
      const healthMetrics = nerService.extractHealthMetrics(rawText);
      console.log('Extracted metrics:', JSON.stringify(healthMetrics, null, 2));

      // Step 3: Hybrid Relation Extraction
      console.log('\nStep 3: Extracting relations...');
      const relations = this.extractRelations(rawText, healthMetrics);
      console.log('Extracted relations:', JSON.stringify(relations, null, 2));

      // Step 4: Generate recommendations based on extracted data
      console.log('\nStep 4: Generating recommendations...');
      const recommendations = this.generateRecommendations(healthMetrics, relations);
      console.log('Generated recommendations:', JSON.stringify(recommendations, null, 2));

      // Step 5: Build structured report
      const structuredReport = {
        rawText: rawText.substring(0, 500), // Store first 500 chars for reference
        healthMetrics,
        relations,
        recommendations,
        extractedAt: new Date(),
        confidence: this.calculateConfidence(healthMetrics, relations)
      };

      console.log('\n=== REPORT ANALYSIS COMPLETED ===\n');

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
      medical: [],
      summary: []
    };

    // Calculate BMI if height and weight are available
    let bmi = null;
    if (metrics.height?.value && metrics.weight?.value) {
      const heightM = metrics.height.value / 100;
      bmi = (metrics.weight.value / (heightM * heightM)).toFixed(1);
      
      let bmiCategory = '';
      if (bmi < 18.5) bmiCategory = 'Underweight';
      else if (bmi < 25) bmiCategory = 'Normal';
      else if (bmi < 30) bmiCategory = 'Overweight';
      else bmiCategory = 'Obese';
      
      recommendations.summary.push(`Your BMI is ${bmi} (${bmiCategory})`);
    }

    // Blood Pressure specific recommendations
    if (metrics.bloodPressure) {
      const { systolic, diastolic, status } = metrics.bloodPressure;
      recommendations.summary.push(`Blood Pressure: ${systolic}/${diastolic} mmHg (${status})`);
      
      if (systolic >= 180 || diastolic >= 120) {
        recommendations.exercise.push('⚠️ URGENT: Consult doctor immediately before starting any exercise');
        recommendations.medical.push('⚠️ HYPERTENSIVE CRISIS: Seek immediate medical attention');
      } else if (systolic >= 140 || diastolic >= 90) {
        recommendations.exercise.push(`Moderate aerobic exercise 5 days/week (current BP: ${systolic}/${diastolic})`);
        recommendations.exercise.push('Avoid heavy weight lifting until BP is controlled');
        recommendations.diet.push(`PRIORITY: Reduce sodium to <1500mg/day (BP: ${systolic}/${diastolic})`);
        recommendations.diet.push('DASH diet recommended for high blood pressure');
        recommendations.medical.push(`Blood pressure medication review needed (Stage 2 Hypertension: ${systolic}/${diastolic})`);
      } else if (systolic >= 130 || diastolic >= 80) {
        recommendations.exercise.push(`30-45 minutes cardio 5 days/week to lower BP from ${systolic}/${diastolic}`);
        recommendations.diet.push(`Limit sodium to 2000mg/day (current BP: ${systolic}/${diastolic})`);
        recommendations.medical.push(`Monitor BP weekly (currently ${status})`);
      } else {
        recommendations.exercise.push(`Maintain 30 minutes daily activity (BP normal: ${systolic}/${diastolic})`);
        recommendations.summary.push('✓ Blood pressure is in healthy range');
      }
    }

    // Blood Sugar specific recommendations
    if (metrics.sugarLevel) {
      const { value, status } = metrics.sugarLevel;
      recommendations.summary.push(`Blood Sugar: ${value} mg/dL (${status})`);
      
      if (value >= 126) {
        recommendations.diet.push(`CRITICAL: Blood sugar at ${value} mg/dL - strict carb control needed`);
        recommendations.diet.push('Eliminate refined sugars and white flour products');
        recommendations.diet.push('Eat small, frequent meals (5-6 times/day)');
        recommendations.exercise.push(`Post-meal walks to manage blood sugar (current: ${value} mg/dL)`);
        recommendations.medical.push(`Diabetes management required (fasting glucose: ${value} mg/dL)`);
        recommendations.medical.push('HbA1c test and endocrinologist consultation needed');
      } else if (value >= 100) {
        recommendations.diet.push(`Pre-diabetes alert (${value} mg/dL): Reduce sugar and refined carbs`);
        recommendations.diet.push('Choose whole grains over refined grains');
        recommendations.exercise.push(`Increase activity to prevent diabetes (current glucose: ${value} mg/dL)`);
        recommendations.medical.push(`Pre-diabetes monitoring needed (glucose: ${value} mg/dL)`);
      } else {
        recommendations.summary.push(`✓ Blood sugar is healthy (${value} mg/dL)`);
      }
    }

    // BMI-based recommendations
    if (bmi) {
      if (bmi >= 30) {
        recommendations.exercise.push(`Obesity detected (BMI ${bmi}): Start with 20 min walks, gradually increase`);
        recommendations.exercise.push('Consider water aerobics or swimming to reduce joint stress');
        recommendations.diet.push(`Weight loss needed (BMI ${bmi}): Reduce daily calories by 500-750`);
        recommendations.walkingGoal = {
          steps: 15000,
          description: `Target for weight loss (current BMI: ${bmi}, Obese category)`
        };
        recommendations.medical.push(`Obesity management program recommended (BMI: ${bmi})`);
      } else if (bmi >= 25) {
        recommendations.exercise.push(`Overweight (BMI ${bmi}): 45 minutes moderate exercise 5 days/week`);
        recommendations.diet.push(`Portion control needed (BMI ${bmi}): Use smaller plates`);
        recommendations.walkingGoal = {
          steps: 12000,
          description: `Increase from 10k to prevent weight gain (current BMI: ${bmi})`
        };
      } else if (bmi < 18.5) {
        recommendations.exercise.push(`Underweight (BMI ${bmi}): Focus on strength training`);
        recommendations.diet.push(`Increase calorie intake (BMI ${bmi}): Add healthy fats and proteins`);
        recommendations.walkingGoal = {
          steps: 8000,
          description: `Moderate activity to build strength (BMI: ${bmi}, Underweight)`
        };
        recommendations.medical.push(`Nutritionist consultation for healthy weight gain (BMI: ${bmi})`);
      } else {
        recommendations.walkingGoal = {
          steps: 10000,
          description: `Maintain healthy weight (BMI: ${bmi}, Normal range)`
        };
        recommendations.summary.push(`✓ Healthy weight range (BMI ${bmi})`);
      }
    }

    // Heart Rate recommendations
    if (metrics.heartRate) {
      const hr = metrics.heartRate.value;
      recommendations.summary.push(`Heart Rate: ${hr} bpm`);
      
      if (hr > 100) {
        recommendations.medical.push(`Elevated resting heart rate (${hr} bpm): Cardiac evaluation needed`);
        recommendations.exercise.push(`Start slowly - current resting HR is high (${hr} bpm)`);
      } else if (hr < 60) {
        recommendations.summary.push(`Low heart rate (${hr} bpm) - may indicate good fitness or need evaluation`);
      }
    }

    // Cholesterol recommendations
    if (metrics.cholesterol) {
      const chol = metrics.cholesterol.value;
      recommendations.summary.push(`Cholesterol: ${chol} mg/dL`);
      
      if (chol > 240) {
        recommendations.diet.push(`High cholesterol (${chol} mg/dL): Limit saturated fats to <7% of calories`);
        recommendations.diet.push('Increase omega-3 foods: salmon, walnuts, flaxseed');
        recommendations.medical.push(`Lipid panel and statin therapy evaluation (cholesterol: ${chol} mg/dL)`);
      } else if (chol > 200) {
        recommendations.diet.push(`Borderline high cholesterol (${chol} mg/dL): Reduce red meat and dairy`);
      }
    }

    // General health recommendations (only if no critical issues)
    const hasCriticalIssues = metrics.bloodPressure?.systolic >= 140 || 
                              metrics.sugarLevel?.value >= 126 || 
                              (bmi && bmi >= 30);
    
    if (!hasCriticalIssues) {
      if (recommendations.exercise.length === 0) {
        recommendations.exercise.push('Maintain 150 minutes moderate exercise per week');
        recommendations.exercise.push('Include strength training 2-3 times weekly');
      }
      
      if (recommendations.diet.length === 0) {
        recommendations.diet.push('Follow balanced diet: 50% carbs, 30% protein, 20% healthy fats');
        recommendations.diet.push('Eat 5-7 servings of fruits/vegetables daily');
      }
    }

    // Add hydration for everyone
    recommendations.diet.push('Stay hydrated: 8-10 glasses of water daily');

    // Condition-based medical recommendations
    if (relations.conditions && relations.conditions.length > 0) {
      relations.conditions.forEach(condition => {
        recommendations.medical.push(`Follow-up needed for ${condition.name}`);
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
