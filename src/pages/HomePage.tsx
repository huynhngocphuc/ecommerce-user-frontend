// src/pages/HomePage.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Trang chủ
      </Typography>
      <Typography variant="body1">
        Chào mừng bạn đến với cửa hàng điện tử!
      </Typography>
    </Box>
  );
};

export default HomePage;
