import React from 'react';
import { Container, Typography } from '@mui/material';

const NewArrivalsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        New Arrivals
      </Typography>
      <Typography color="text.secondary">
        New arrival products will be listed here.
      </Typography>
    </Container>
  );
};

export default NewArrivalsPage;
