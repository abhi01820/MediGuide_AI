export const calculateBMI = (weight, height) => {
  // height in cm, weight in kg
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi.toFixed(1);
};

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: 'Underweight', color: '#FFA726' };
  if (bmi < 25) return { category: 'Normal', color: '#66BB6A' };
  if (bmi < 30) return { category: 'Overweight', color: '#FFA726' };
  return { category: 'Obese', color: '#EF5350' };
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const formatBloodPressure = (systolic, diastolic) => {
  return `${systolic}/${diastolic} mmHg`;
};

export const getBloodPressureStatus = (systolic, diastolic) => {
  if (systolic < 120 && diastolic < 80) {
    return { status: 'Normal', color: '#66BB6A' };
  } else if (systolic < 130 && diastolic < 80) {
    return { status: 'Elevated', color: '#FFA726' };
  } else if (systolic < 140 || diastolic < 90) {
    return { status: 'High BP Stage 1', color: '#FF7043' };
  } else {
    return { status: 'High BP Stage 2', color: '#EF5350' };
  }
};

export const getSugarLevelStatus = (value, type = 'fasting') => {
  if (type === 'fasting') {
    if (value < 100) return { status: 'Normal', color: '#66BB6A' };
    if (value < 126) return { status: 'Pre-diabetes', color: '#FFA726' };
    return { status: 'Diabetes', color: '#EF5350' };
  }
  return { status: 'Check with doctor', color: '#42A5F5' };
};
