// src/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useProtectedRoute } from '../hooks/useProtectedRoute';
import { useProducts } from '../hooks/useProducts';
import { getProductById } from '../api/productsApi';
import { Product } from '../redux/products/type';
import { ROUTES } from '../utils/routes';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { checkAuthentication } = useProtectedRoute();
  const { addToCart } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!checkAuthentication()) return;

    const fetchProduct = async () => {
      try {
        if (!id) {
          setError('Product ID is missing');
          return;
        }
        const data = await getProductById(id);
        setProduct(data);
      } catch (err: any) {
        setError(err?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, checkAuthentication]);

  if (!checkAuthentication()) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && <CircularProgress />}

      {!loading && product && (
        <Box>
          <Button
            onClick={() => navigate(ROUTES.PRODUCTS)}
            sx={{ mb: 2 }}
          >
            ← Back to Products
          </Button>
          {product.imageUrl && (
            <Box
              sx={{
                width: '100%',
                height: 400,
                backgroundImage: `url(${product.imageUrl})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                mb: 3,
              }}
            />
          )}
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>
          {product.category && (
            <Typography color="textSecondary" gutterBottom>
              Category: {product.category}
            </Typography>
          )}
          {product.description && (
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
          )}
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              if (product) {
                addToCart(product);
              }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetailPage;
