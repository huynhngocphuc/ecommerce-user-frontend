// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { ROUTES } from '../utils/routes';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Shop Electronic
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Your one-stop destination for quality electronics
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate(ROUTES.PRODUCTS)}
        >
          Browse Products
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate(ROUTES.DASHBOARD)}
        >
          Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
