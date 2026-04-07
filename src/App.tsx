import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/ui/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SalePage from './pages/SalePage';
import { ROUTES } from './utils/routes';
import { useAuth } from './hooks/useAuth';
import { createAppTheme, resolveInitialThemeMode, resolveSystemPreferredMode } from './utils/theme';

const App: React.FC = () => {
  const { isAuthenticated, isLoading, sessionStatus, bootstrapSession } = useAuth();
  const [themeMode, setThemeMode] = React.useState(resolveInitialThemeMode);

  React.useEffect(() => {
    bootstrapSession();
  }, [bootstrapSession]);

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
  const isAuthChecking = sessionStatus === 'unknown' || isLoading;

  const protectedRouteElement = (element: React.ReactElement) => {
    if (isAuthChecking) {
      return <Box sx={{ p: 3 }}>Checking session...</Box>;
    }

    return isAuthenticated ? element : <Navigate to={ROUTES.LOGIN} />;
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
          <Routes>
            {/* Public routes */}
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route
              path={ROUTES.LOGIN}
              element={isAuthenticated ? <Navigate to={ROUTES.PRODUCTS} /> : <LoginPage />}
            />
            <Route path={ROUTES.NEW_ARRIVALS} element={<NewArrivalsPage />} />
            <Route path={ROUTES.SALE} element={<SalePage />} />

            {/* Protected routes */}
            <Route
              path={ROUTES.PRODUCTS}
              element={<ProductsPage />}
            />
            <Route
              path={ROUTES.PRODUCT_DETAIL}
              element={protectedRouteElement(<ProductDetailPage />)}
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
