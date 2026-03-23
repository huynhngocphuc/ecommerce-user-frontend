import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ p: 2, textAlign: 'center' }} className="bg-gray-100 border-t border-gray-300 py-4 mt-8">
      <Typography variant="body2" color="textSecondary" className="text-lg text-gray-600">
        © 2026 PeterHuynh
      </Typography>
    </Box>
  );
};

export default Footer;
