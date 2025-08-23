import React from 'react';
import { Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({children}) => {
  return (
    <Container>
      <Box my={4}>
        <Outlet/>
      </Box>
    </Container>
  );
};

export default AuthLayout;