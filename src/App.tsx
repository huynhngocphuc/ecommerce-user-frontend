import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/ui/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { ROUTES } from './utils/routes';
import { useAuth } from './hooks/useAuth';
import { createAppTheme, resolveInitialThemeMode, resolveSystemPreferredMode } from './utils/theme';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [themeMode, setThemeMode] = React.useState(resolveInitialThemeMode);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const onChange = () => {
      setThemeMode(resolveSystemPreferredMode());
    };

    onChange();

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme-mode', themeMode);
  }, [themeMode]);

  const appTheme = React.useMemo(() => createAppTheme(themeMode), [themeMode]);

  return (
    <ThemeProvider theme={appTheme}>
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
    </ThemeProvider>
  );
};

export default App;
