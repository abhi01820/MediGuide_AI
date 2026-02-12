import React from 'react';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityIcon from '@mui/icons-material/Security';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: CloudUploadIcon,
      title: 'Upload Reports',
      description: 'Easily upload your medical reports in PDF or image format'
    },
    {
      icon: AnalyticsIcon,
      title: 'AI Analysis',
      description: 'Get intelligent analysis of your health metrics and indicators'
    },
    {
      icon: LocalHospitalIcon,
      title: 'Doctor Recommendations',
      description: 'Find the best nearby doctors based on your health needs'
    },
    {
      icon: SecurityIcon,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and completely confidential'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            MediGuide AI
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.95,
              fontSize: { xs: '1.1rem', md: '1.5rem' }
            }}
          >
            Intelligent Health Report Analysis and Doctor Recommendation System
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Upload your medical reports and get instant AI-powered analysis, 
            personalized health recommendations, and find the best doctors near you.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CloudUploadIcon />}
              onClick={() => navigate('/dashboard')}
              sx={{
                backgroundColor: 'white',
                color: '#1976d2',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              Upload Medical Report
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: 600, mb: 6, color: '#1976d2' }}
        >
          Why Choose MediGuide AI?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: '#e3f2fd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <Icon sx={{ fontSize: 30, color: '#1976d2' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Ready to Take Control of Your Health?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of users who trust MediGuide AI for their health management
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              backgroundColor: '#1976d2',
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600
            }}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
