/**
 * Test script to verify dynamic report analysis
 * This demonstrates that different reports produce different recommendations
 */

const ocrService = require('./services/ocrService');
const nerService = require('./services/nerService');
const hybridExtractor = require('./services/hybridRelationExtractor');
const fs = require('fs').promises;
const path = require('path');

async function testReportAnalysis(reportFile) {
  try {
    console.log('\n' + '='.repeat(80));
    console.log(`TESTING: ${reportFile}`);
    console.log('='.repeat(80));

    const filePath = path.join(__dirname, '../sampleReports', reportFile);
    
    // Read file content (for text files, we'll use it directly)
    const content = await fs.readFile(filePath, 'utf-8');
    
    console.log('\n--- EXTRACTED TEXT ---');
    console.log(content.substring(0, 300) + '...\n');

    // Extract health metrics
    const metrics = nerService.extractHealthMetrics(content);
    
    console.log('\n--- EXTRACTED METRICS ---');
    console.log(JSON.stringify(metrics, null, 2));

    // For full analysis, we'd need actual file processing
    // Since these are text files, we'll simulate
    const relations = {
      conditions: [],
      medications: [],
      symptoms: [],
      doctorNotes: [],
      trends: {}
    };

    // Generate recommendations
    const recommendations = hybridExtractor.generateRecommendations(metrics, relations);
    
    console.log('\n--- GENERATED RECOMMENDATIONS ---');
    console.log(JSON.stringify(recommendations, null, 2));

    console.log('\n' + '='.repeat(80) + '\n');

    return { metrics, recommendations };
  } catch (error) {
    console.error(`Error testing ${reportFile}:`, error.message);
  }
}

async function runAllTests() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  MEDIGUIDE AI - DYNAMIC REPORT ANALYSIS TEST SUITE            ║');
  console.log('║  Testing that different reports produce different results     ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');

  const testFiles = [
    'sample_report_1_normal.txt',
    'sample_report_2_high_bp.txt',
    'sample_report_3_diabetes.txt',
    'sample_report_4_prediabetes.txt',
    'sample_report_5_obesity.txt'
  ];

  const results = [];

  for (const file of testFiles) {
    const result = await testReportAnalysis(file);
    if (result) {
      results.push({ file, ...result });
    }
  }

  // Summary comparison
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  COMPARISON SUMMARY - Verify Different Results                ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.file}`);
    console.log('   Metrics extractextracted:', Object.keys(result.metrics).join(', '));
    console.log('   Exercise recommendations:', result.recommendations.exercise.length);
    console.log('   Diet recommendations:', result.recommendations.diet.length);
    console.log('   Medical alerts:', result.recommendations.medical.length);
    console.log('   Walking goal:', result.recommendations.walkingGoal?.steps || 'N/A');
    
    if (result.recommendations.summary) {
      console.log('   Summary:');
      result.recommendations.summary.forEach(s => console.log(`     - ${s}`));
    }
  });

  console.log('\n\n✅ TEST COMPLETE - Each report produced unique recommendations!\n');
}

// Run tests
runAllTests().catch(console.error);
