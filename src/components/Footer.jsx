import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1976d2', color: 'white', py: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalHospitalIcon sx={{ mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                MediGuide AI
              </Typography>
            </Box>
            <Typography variant="body2">
              Intelligent Health Report Analysis and Doctor Recommendation System
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              About Us
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
              Services
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none' }}>
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Info
            </Typography>
            <Typography variant="body2">
              Email: support@mediguide.ai
            </Typography>
            <Typography variant="body2">
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 3, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            © 2026 MediGuide AI. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
