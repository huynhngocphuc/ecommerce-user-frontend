// src/pages/ProductsPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Alert, Card, CardContent, CardActions, Button } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useProtectedRoute } from '../hooks/useProtectedRoute';
import { ROUTE_PATHS } from '../utils/routes';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { checkAuthentication } = useProtectedRoute();
  const { items, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    if (!checkAuthentication()) return;
    fetchProducts();
  }, [checkAuthentication, fetchProducts]);

  if (!checkAuthentication()) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && <CircularProgress />}

      {!loading && items.length === 0 && (
        <Typography color="textSecondary">No products available</Typography>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {items.map((product) => (
          <Box key={product.id}>
            <Card>
              {product.imageUrl && (
                <Box
                  sx={{
                    width: '100%',
                    height: 200,
                    backgroundImage: `url(${product.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  ${product.price.toFixed(2)}
                </Typography>
                {product.description && (
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                )}
                {product.category && (
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Category: {product.category}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(ROUTE_PATHS.PRODUCT_DETAIL(product.id))}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ProductsPage;
