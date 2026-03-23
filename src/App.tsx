import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/ui/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { ROUTES } from './utils/routes';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ flex: 1 }}>
        <Routes>
          {/* Public routes */}
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path={ROUTES.PRODUCTS}
            element={isAuthenticated ? <ProductsPage /> : <Navigate to={ROUTES.LOGIN} />}
          />
          <Route
            path={ROUTES.PRODUCT_DETAIL}
            element={isAuthenticated ? <ProductDetailPage /> : <Navigate to={ROUTES.LOGIN} />}
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
