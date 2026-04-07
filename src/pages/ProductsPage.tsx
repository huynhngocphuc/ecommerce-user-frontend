// src/pages/ProductsPage.tsx
import React, { useEffect } from 'react';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useProductFilters } from '../hooks/useProductFilters';
import { ProductGrid } from '../components/ui/products/ProductGrid';
import { FilterSidebar } from '../components/ui/products/FilterSidebar';
import { MobileFilterPanel } from '../components/ui/products/MobileFilterPanel';
import { mapProductsToListItemViews, filterValidListItems } from './products.mappers';
import { GRID_CONTAINER } from './products.constants';

const ProductsPage: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const {
    priceRange,
    isMobilePanelOpen,
    setMobilePanelOpen,
  } = useProductFilters();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Map and filter products based on active filters and validation
  const filteredProducts = React.useMemo(() => {
    if (!products) return [];
    
    // Map products to view model (ProductListItemView)
    const viewModels = mapProductsToListItemViews(products);
    
    // Filter by valid items
    const validItems = filterValidListItems(viewModels);
    
    // Apply price filter
    return validItems.filter((product) => {
      if (priceRange.min !== undefined && product.price < priceRange.min) {
        return false;
      }
      if (priceRange.max !== undefined && product.price > priceRange.max) {
        return false;
      }
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, priceRange]);

  console.log('ProductsPage render - products:', products, 'filteredProducts:', filteredProducts);
  return (
    <Box
      className="products-page-container"
      sx={{
        display: 'flex',
        gap: 2,
        maxWidth: `${GRID_CONTAINER.MAX_WIDTH_PX}px`,
        margin: '0 auto',
        padding: `0 ${GRID_CONTAINER.PADDING_PX}px`,
        py: 4,
      }}
    >
      {/* Desktop Sticky Sidebar */}
      <Box className="filter-sidebar">
        <FilterSidebar />
      </Box>

      {/* Products Grid Region */}
      <Box className="products-grid-region" sx={{ flex: 1 }}>
        {/* Page Title */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Products
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <Typography color="textSecondary">
            {products?.length === 0
              ? 'No products available'
              : 'No products match your filters'}
          </Typography>
        )}

        {/* Product Grid */}
        {!loading && products.length > 0 && (
          <ProductGrid products={products} />
        )}
      </Box>

      {/* Mobile Filter Panel Overlay */}
      {isMobilePanelOpen && (
        <>
          <Box
            className="mobile-filter-backdrop open"
            onClick={() => setMobilePanelOpen(false)}
          />
          <Box className="mobile-filter-panel open">
            <MobileFilterPanel onClose={() => setMobilePanelOpen(false)} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductsPage;
