import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        © 2023 E-commerce Admin
      </Typography>
    </Box>
  );
};

export default Footer;
