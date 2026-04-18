// src/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useProtectedRoute } from '../hooks/useProtectedRoute';
import { useProducts } from '../hooks/useProducts';
import { getProductById } from '../api/productsApi';
import { Product } from '../redux/products/type';
import { ROUTES } from '../utils/routes';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('product');
  const tr = t as unknown as (key: string) => string;
  const { t: tCommon } = useTranslation('common');
  const trCommon = tCommon as unknown as (key: string) => string;
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
          setError(tr('product_id_missing'));
          return;
        }
        const data = await getProductById(id);
        setProduct(data);
      } catch (err: any) {
        setError(err?.message || tr('failed_to_load'));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, checkAuthentication, tr]);

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
            onClick={() => navigate((location.state as any)?.returnTo || ROUTES.PRODUCTS)}
            sx={{ mb: 2 }}
          >
            {tr('back_to_products')}
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
              {tr('category')}: {product.category}
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
            {trCommon('add_to_cart')}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetailPage;
