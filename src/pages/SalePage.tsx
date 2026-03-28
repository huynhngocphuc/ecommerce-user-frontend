import React from 'react';
import { Container, Typography } from '@mui/material';

const SalePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sale
      </Typography>
      <Typography color="text.secondary">
        Discounted products will be listed here.
      </Typography>
    </Container>
  );
};

export default SalePage;
