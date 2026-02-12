import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';

const DoctorCard = ({ doctor }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: '#1976d2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}
          >
            <PersonIcon sx={{ color: 'white', fontSize: 30 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {doctor.name}
            </Typography>
            <Chip 
              label={doctor.specialization} 
              size="small" 
              sx={{ backgroundColor: '#e3f2fd', color: '#1976d2', mt: 0.5 }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon sx={{ fontSize: 18, color: '#666', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {doctor.distance} km away
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StarIcon sx={{ fontSize: 18, color: '#FFC107', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {doctor.rating} / 5.0
          </Typography>
        </Box>

        {doctor.address && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {doctor.address}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
