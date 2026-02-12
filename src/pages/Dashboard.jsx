import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HeightIcon from '@mui/icons-material/Height';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MetricCard from '../components/MetricCard';
import DoctorCard from '../components/DoctorCard';
import { reportAPI, doctorAPI } from '../services/api';
import { calculateBMI, getBMICategory, getBloodPressureStatus, getSugarLevelStatus } from '../utils/helpers';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [reportData, setReportData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [nearbyDoctors, setNearbyDoctors] = useState([]);

  // Sample data for demonstration
  const sampleReportData = {
    height: 175,
    weight: 75,
    bloodPressure: { systolic: 120, diastolic: 80 },
    sugarLevel: 95,
    heartRate: 72
  };

  const sampleRecommendations = {
    exercise: [
      '30 minutes of moderate cardio 5 days a week',
      'Strength training 2-3 times per week',
      'Yoga or stretching for flexibility'
    ],
    walking: '10,000 steps per day recommended',
    diet: [
      'Increase intake of fruits and vegetables',
      'Reduce processed foods and sugar',
      'Stay hydrated - drink 8 glasses of water daily',
      'Include lean proteins in every meal'
    ]
  };

  const sampleDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'General Physician',
      distance: 2.5,
      rating: 4.8,
      address: '123 Medical Center, Downtown'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Cardiologist',
      distance: 3.2,
      rating: 4.9,
      address: '456 Heart Clinic, City Center'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialization: 'Endocrinologist',
      distance: 4.1,
      rating: 4.7,
      address: '789 Diabetes Care, Medical District'
    }
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setUploadError('');
      } else {
        setUploadError('Please upload a PDF or image file (JPG, PNG)');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError('Please select a file first');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('report', file);

      // API call would go here
      // const response = await reportAPI.uploadReport(formData);
      
      // Simulating API response with sample data
      setTimeout(() => {
        setReportData(sampleReportData);
        setRecommendations(sampleRecommendations);
        setNearbyDoctors(sampleDoctors);
        setUploading(false);
      }, 2000);
    } catch (error) {
      setUploadError(error.response?.data?.message || 'Upload failed. Please try again.');
      setUploading(false);
    }
  };

  const bmi = reportData ? calculateBMI(reportData.weight, reportData.height) : null;
  const bmiCategory = bmi ? getBMICategory(bmi) : null;
  const bpStatus = reportData ? getBloodPressureStatus(reportData.bloodPressure.systolic, reportData.bloodPressure.diastolic) : null;
  const sugarStatus = reportData ? getSugarLevelStatus(reportData.sugarLevel) : null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        Health Dashboard
      </Typography>

      {/* Upload Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Upload Medical Report
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Choose File
            <input
              type="file"
              hidden
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </Button>
          {file && (
            <Typography variant="body2" color="text.secondary">
              {file.name}
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file || uploading}
            startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
          >
            {uploading ? 'Uploading...' : 'Upload & Analyze'}
          </Button>
        </Box>
        {uploadError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {uploadError}
          </Alert>
        )}
        {file && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Supported formats: PDF, JPG, PNG
          </Alert>
        )}
      </Paper>

      {reportData && (
        <>
          {/* Health Metrics Section */}
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Health Metrics
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Height"
                value={reportData.height}
                unit="cm"
                icon={HeightIcon}
                color="#42A5F5"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Weight"
                value={reportData.weight}
                unit="kg"
                icon={MonitorWeightIcon}
                color="#66BB6A"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Blood Pressure"
                value={`${reportData.bloodPressure.systolic}/${reportData.bloodPressure.diastolic}`}
                unit="mmHg"
                status={bpStatus}
                icon={FavoriteIcon}
                color="#EF5350"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Sugar Level"
                value={reportData.sugarLevel}
                unit="mg/dL"
                status={sugarStatus}
                icon={BloodtypeIcon}
                color="#AB47BC"
              />
            </Grid>
          </Grid>

          {/* BMI Section */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Body Mass Index (BMI)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {bmi}
              </Typography>
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: bmiCategory.color,
                    backgroundColor: `${bmiCategory.color}20`,
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    fontWeight: 600
                  }}
                >
                  {bmiCategory.category}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Recommendations Section */}
          {recommendations && (
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Personalized Recommendations
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', backgroundColor: '#E3F2FD' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <FitnessCenterIcon sx={{ color: '#1976d2', mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Exercise
                        </Typography>
                      </Box>
                      <List dense>
                        {recommendations.exercise.map((item, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CheckCircleIcon sx={{ fontSize: 18, color: '#1976d2' }} />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', backgroundColor: '#E8F5E9' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <DirectionsWalkIcon sx={{ color: '#66BB6A', mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Walking Goal
                        </Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 600, color: '#66BB6A', mb: 1 }}>
                        10,000
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        steps per day
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        Regular walking helps maintain cardiovascular health and weight management.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%', backgroundColor: '#FFF3E0' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <RestaurantIcon sx={{ color: '#FFA726', mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Diet Tips
                        </Typography>
                      </Box>
                      <List dense>
                        {recommendations.diet.map((item, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CheckCircleIcon sx={{ fontSize: 18, color: '#FFA726' }} />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Doctor Recommendations Section */}
          {nearbyDoctors.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Recommended Doctors Near You
              </Typography>
              <Grid container spacing={3}>
                {nearbyDoctors.map((doctor) => (
                  <Grid item xs={12} md={4} key={doctor.id}>
                    <DoctorCard doctor={doctor} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}

      {!reportData && !uploading && (
        <Paper sx={{ p: 6, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
          <CloudUploadIcon sx={{ fontSize: 80, color: '#1976d2', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            No Report Uploaded
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload your medical report to get started with AI-powered analysis
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Dashboard;
