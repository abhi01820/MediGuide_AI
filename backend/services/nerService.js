/**
 * NER Service - Named Entity Recognition for Health Reports
 * Extracts health metrics from unstructured text
 */
class NERService {
  /**
   * Extract health metrics using regex patterns and NER
   * @param {string} text - Raw text from OCR
   * @returns {Object} Extracted health metrics
   */
  extractHealthMetrics(text) {
    const metrics = {
      height: this.extractHeight(text),
      weight: this.extractWeight(text),
      bloodPressure: this.extractBloodPressure(text),
      sugarLevel: this.extractSugarLevel(text),
      cholesterol: this.extractCholesterol(text),
      heartRate: this.extractHeartRate(text)
    };

    return this.cleanMetrics(metrics);
  }

  /**
   * Extract height from text
   */
  extractHeight(text) {
    // Patterns: "Height: 175 cm", "Height 175cm", "H: 5'9\"", etc.
    const patterns = [
      /height\s*[:\s]+\s*(\d+\.?\d*)\s*(cm|centimeter)/i,
      /height\s*[:\s]+\s*(\d+)\s*'\s*(\d+)?\s*"?/i, // feet/inches
      /(\d+\.?\d*)\s*(cm|centimeter)(?!.*cholesterol)/i // avoid matching with other numbers
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        let value = parseFloat(match[1]);
        const unit = match[2]?.toLowerCase();
        
        // Convert feet/inches to cm if needed
        if (unit === undefined && match[2]) {
          // feet and inches format
          const feet = parseInt(match[1]);
          const inches = parseInt(match[2] || 0);
          value = (feet * 30.48) + (inches * 2.54);
        }
        
        // Sanity check - height should be between 50-250 cm
        if (value >= 50 && value <= 250) {
          return {
            value: Math.round(value),
            unit: 'cm'
          };
        }
      }
    }
    return null;
  }

  /**
   * Extract weight from text
   */
  extractWeight(text) {
    // Patterns: "Weight: 75 kg", "Weight 75kg", "75.5 kg", etc.
    const patterns = [
      /weight\s*[:\s]+\s*(\d+\.?\d*)\s*(kg|kilogram|lbs|pounds)/i,
      /(\d+\.?\d*)\s*(kg|kilogram)(?!.*\d)/i // Match kg but avoid matching other numbers
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        let value = parseFloat(match[1]);
        const unit = match[2].toLowerCase();
        
        // Convert lbs to kg if needed
        if (unit === 'lbs' || unit === 'pounds') {
          value = value * 0.453592;
        }
        
        // Sanity check - weight should be between 20-300 kg
        if (value >= 20 && value <= 300) {
          return {
            value: Math.round(value),
            unit: 'kg'
          };
        }
      }
    }
    return null;
  }

  /**
   * Extract blood pressure from text
   */
  extractBloodPressure(text) {
    // Patterns: "120/80", "BP: 120/80 mmHg", "Blood Pressure 120/80"
    const patterns = [
      /blood\s*pressure[:\s]+(\d+)\s*\/\s*(\d+)/i,
      /bp[:\s]+(\d+)\s*\/\s*(\d+)/i,
      /(\d+)\s*\/\s*(\d+)\s*mmhg/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const systolic = parseInt(match[1]);
        const diastolic = parseInt(match[2]);
        
        return {
          systolic,
          diastolic,
          status: this.getBPStatus(systolic, diastolic)
        };
      }
    }
    return null;
  }

  /**
   * Extract blood sugar level from text
   */
  extractSugarLevel(text) {
    // Patterns: "Blood Sugar: 95 mg/dL", "Glucose 95", "Blood Sugar (Fasting): 92 mg/dL"
    const patterns = [
      /blood\s*sugar\s*[\(]?\s*fasting\s*[\)]?\s*[:\s]+\s*(\d+\.?\d*)\s*(mg\/dl|mmol\/l)?/i,
      /(?:blood\s*sugar|sugar\s*level)\s*[\(]?[^)]*[\)]?\s*[:\s]+\s*(\d+\.?\d*)\s*(mg\/dl|mmol\/l)?/i,
      /fasting\s*(?:blood\s*)?glucose\s*[:\s]+\s*(\d+\.?\d*)\s*(mg\/dl|mmol\/l)?/i,
      /glucose\s*[:\s]+\s*(\d+\.?\d*)\s*(mg\/dl|mmol\/l)?/i,
      /(\d+\.?\d*)\s*mg\/dl\s*(?:glucose|sugar)/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        let value = parseFloat(match[1]);
        const unit = match[2]?.toLowerCase() || 'mg/dl';
        
        // Convert mmol/L to mg/dL if needed
        if (unit === 'mmol/l') {
          value = value * 18.0182;
        }
        
        // Sanity check - blood sugar should be between 50-500 mg/dL
        if (value >= 50 && value <= 500) {
          return {
            value: Math.round(value),
            unit: 'mg/dL',
            status: this.getSugarStatus(value)
          };
        }
      }
    }
    return null;
  }

  /**
   * Extract cholesterol from text
   */
  extractCholesterol(text) {
    const patterns = [
      /cholesterol\s*[\(]?\s*total\s*[\)]?\s*[:\s]+\s*(\d+\.?\d*)\s*(mg\/dl)?/i,
      /total\s*cholesterol\s*[:\s]+\s*(\d+\.?\d*)\s*(mg\/dl)?/i,
      /cholesterol\s*[:\s]+\s*(\d+\.?\d*)\s*(mg\/dl)?/i,
      /(\d+\.?\d*)\s*mg\/dl\s*cholesterol/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const value = parseFloat(match[1]);
        // Sanity check - cholesterol should be between 100-400 mg/dL
        if (value >= 100 && value <= 400) {
          return {
            value: value,
            unit: 'mg/dL'
          };
        }
      }
    }
    return null;
  }

  /**
   * Extract heart rate from text
   */
  extractHeartRate(text) {
    const patterns = [
      /heart\s*rate\s*[:\s]+\s*(\d+)\s*bpm/i,
      /pulse\s*[:\s]+\s*(\d+)\s*bpm/i,
      /(\d+)\s*beats?\s*per\s*minute/i,
      /(\d+)\s*bpm/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const value = parseInt(match[1]);
        // Sanity check - heart rate should be between 30-220 bpm
        if (value >= 30 && value <= 220) {
          return {
            value: value,
            unit: 'bpm'
          };
        }
      }
    }
    return null;
  }

  /**
   * Determine blood pressure status
   */
  getBPStatus(systolic, diastolic) {
    if (systolic < 120 && diastolic < 80) {
      return 'Normal';
    } else if (systolic < 130 && diastolic < 80) {
      return 'Elevated';
    } else if (systolic < 140 || diastolic < 90) {
      return 'High BP Stage 1';
    } else if (systolic < 180 || diastolic < 120) {
      return 'High BP Stage 2';
    } else {
      return 'Hypertensive Crisis';
    }
  }

  /**
   * Determine blood sugar status
   */
  getSugarStatus(value) {
    if (value < 100) {
      return 'Normal';
    } else if (value < 126) {
      return 'Pre-diabetes';
    } else {
      return 'Diabetes';
    }
  }

  /**
   * Clean up extracted metrics
   */
  cleanMetrics(metrics) {
    const cleaned = {};
    
    for (const [key, value] of Object.entries(metrics)) {
      if (value !== null && value !== undefined) {
        cleaned[key] = value;
      }
    }
    
    return cleaned;
  }

  /**
   * Extract relations between entities
   * Hybrid approach: Pattern matching + contextual analysis
   */
  extractRelations(text, metrics) {
    const relations = [];

    // Find related conditions or diagnoses
    const conditions = this.extractConditions(text);
    const medications = this.extractMedications(text);
    const recommendations = this.extractRecommendations(text);

    return {
      conditions,
      medications,
      recommendations,
      metrics
    };
  }

  /**
   * Extract medical conditions from text
   */
  extractConditions(text) {
    const conditions = [];
    const conditionPatterns = [
      /(?:diagnosed with|suffering from|has)\s+([a-z\s]+)/gi,
      /condition[:\s]+([a-z\s]+)/gi
    ];

    // Common medical conditions
    const knownConditions = [
      'diabetes', 'hypertension', 'high blood pressure', 'obesity',
      'cholesterol', 'heart disease', 'asthma', 'arthritis'
    ];

    for (const pattern of conditionPatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const condition = match[1].trim().toLowerCase();
        if (knownConditions.some(known => condition.includes(known))) {
          conditions.push(condition);
        }
      }
    }

    return [...new Set(conditions)]; // Remove duplicates
  }

  /**
   * Extract medications from text
   */
  extractMedications(text) {
    const medications = [];
    const patterns = [
      /medication[:\s]+([a-z\s\d]+)/gi,
      /prescribed[:\s]+([a-z\s\d]+)/gi,
      /taking[:\s]+([a-z\s\d]+)/gi
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        medications.push(match[1].trim());
      }
    }

    return [...new Set(medications)];
  }

  /**
   * Extract recommendations from text
   */
  extractRecommendations(text) {
    const recommendations = {
      exercise: [],
      diet: [],
      lifestyle: []
    };

    // Exercise recommendations
    const exercisePatterns = [
      /exercise[:\s]+([^.]+)/gi,
      /physical activity[:\s]+([^.]+)/gi,
      /(\d+\s*minutes?\s+.*(?:walk|jog|cardio|exercise).*)/gi
    ];

    for (const pattern of exercisePatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        recommendations.exercise.push(match[1].trim());
      }
    }

    // Diet recommendations
    const dietPatterns = [
      /diet[:\s]+([^.]+)/gi,
      /nutrition[:\s]+([^.]+)/gi,
      /(?:eat|avoid|consume|reduce)[:\s]+([^.]+)/gi
    ];

    for (const pattern of dietPatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        recommendations.diet.push(match[1].trim());
      }
    }

    return recommendations;
  }
}

module.exports = new NERService();
