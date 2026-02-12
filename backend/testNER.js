const nerService = require('./services/nerService');

// Sample text extracted from your report
const sampleText = `
Health Metrics
Height: 175cm
Weight: 75kg
Blood Pressure: 120/80mmHg - High BP Stage 1
Sugar Level: 95mg/dL - Normal
Body Mass Index (BMI): 24.5 - Normal

Patient shows elevated blood pressure levels. 
Recommend consulting a cardiologist.
Exercise: 30 minutes of moderate cardio 5 days a week.
Diet: Increase intake of fruits and vegetables, reduce sodium.
`;

console.log('🔬 Testing NER Service...\n');
console.log('Input Text:');
console.log('='.repeat(50));
console.log(sampleText);
console.log('='.repeat(50));
console.log('\n');

console.log('📊 Extracted Health Metrics:');
console.log('='.repeat(50));
const metrics = nerService.extractHealthMetrics(sampleText);
console.log(JSON.stringify(metrics, null, 2));
console.log('='.repeat(50));
console.log('\n');

console.log('🔗 Extracted Relations:');
console.log('='.repeat(50));
const relations = nerService.extractRelations(sampleText, metrics);
console.log(JSON.stringify(relations, null, 2));
console.log('='.repeat(50));

console.log('\n✅ NER Test Complete!');
console.log(`\nExtracted ${Object.keys(metrics).length} health metrics`);
console.log(`Found ${relations.conditions.length} conditions`);
console.log(`Generated ${relations.recommendations.exercise.length} exercise recommendations`);
