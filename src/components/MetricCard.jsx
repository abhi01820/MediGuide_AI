import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const MetricCard = ({ title, value, unit, status, icon: Icon, color }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          {Icon && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '8px',
                backgroundColor: `${color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon sx={{ color: color, fontSize: 24 }} />
            </Box>
          )}
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {value}
          {unit && (
            <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 1 }}>
              {unit}
            </Typography>
          )}
        </Typography>
        {status && (
          <Typography 
            variant="body2" 
            sx={{ 
              color: status.color,
              fontWeight: 500,
              backgroundColor: `${status.color}20`,
              display: 'inline-block',
              px: 1.5,
              py: 0.5,
              borderRadius: 1
            }}
          >
            {status.status}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
