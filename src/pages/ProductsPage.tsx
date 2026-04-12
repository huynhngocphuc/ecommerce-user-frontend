// src/pages/ProductsPage.tsx
import React, { useEffect } from 'react';
import { Box, CircularProgress, Alert, Typography, Chip, Button, FormControl, InputLabel, Select, MenuItem, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useProducts } from '../hooks/useProducts';
import { useProductFilters } from '../hooks/useProductFilters';
import { ProductGrid } from '../components/ui/products/ProductGrid';
import { FilterSidebar } from '../components/ui/products/FilterSidebar';
import { MobileFilterPanel } from '../components/ui/products/MobileFilterPanel';
import { ProductDetailModal } from '../components/ui/products/ProductDetailModal';
import { mapProductsToListItemViews, filterValidListItems, mapActiveFiltersToChipViews } from './products.mappers';
import { GRID_CONTAINER } from './products.constants';
import { SORT_OPTIONS } from './products.constants';
import { AppDispatch, RootState } from '../redux/store';
import { getProductById } from '../api/productsApi';
import {
  clearProductDetail,
  closeProductDetailModal,
  openProductDetailModal,
  setProductDetailError,
  setProductDetailLoading,
  setProductDetailSuccess,
} from '../redux/products/productSlice';
import { ROUTE_PATHS } from '../utils/routes';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, loading, error, fetchProducts, pagination, addToCart } = useProducts();
  const modalDetailState = useSelector((state: RootState) => state.products.productDetail);
  const {
    selectedCategories,
    selectedPriceRanges,
    selectedSizes,
    selectedColors,
    selectedBrands,
    selectedStyles,
    sort,
    page,
    isMobilePanelOpen,
    setMobilePanelOpen,
    collapsedGroups,
    brandSearchTerm,
    setBrandSearchTerm,
    toggleGroupCollapsed,
    toggleFilterValue,
    removeActiveFilter,
    setSort,
    setPage,
    clearFilters,
    toProductQuery,
    activeFilterChips,
    modalProductId,
    isProductModalOpen,
    openProductModal,
    closeProductModal,
  } = useProductFilters();

  const activeChipViews = mapActiveFiltersToChipViews(activeFilterChips);

  useEffect(() => {
    fetchProducts(toProductQuery());
  }, [fetchProducts, toProductQuery]);

  useEffect(() => {
    if (!modalProductId) {
      dispatch(closeProductDetailModal());
      dispatch(clearProductDetail());
      return;
    }

    let mounted = true;
    dispatch(openProductDetailModal(modalProductId));
    dispatch(setProductDetailLoading());

    getProductById(modalProductId)
      .then((product) => {
        if (!mounted) {
          return;
        }
        dispatch(setProductDetailSuccess(product));
      })
      .catch((apiError: any) => {
        if (!mounted) {
          return;
        }
        dispatch(setProductDetailError(apiError?.message || 'Failed to load product detail'));
      });

    return () => {
      mounted = false;
    };
  }, [dispatch, modalProductId]);

  const handleOpenProductDetail = React.useCallback(
    (productId: string) => {
      openProductModal(productId);
    },
    [openProductModal]
  );

  const handleCloseProductDetail = React.useCallback(() => {
    closeProductModal();
    dispatch(closeProductDetailModal());
    dispatch(clearProductDetail());
  }, [closeProductModal, dispatch]);

  const handleOpenFullDetail = React.useCallback(
    (productId: string) => {
      navigate(ROUTE_PATHS.PRODUCT_DETAIL(productId), {
        state: {
          returnTo: `/products${window.location.search || ''}`,
        },
      });
    },
    [navigate]
  );

  const handleAddToCartFromModal = React.useCallback(
    (selection: { selectedSize?: string; selectedColor?: string }) => {
      if (!modalDetailState.product) {
        return;
      }

      addToCart({
        ...modalDetailState.product,
        selectedSize: selection.selectedSize,
        selectedColor: selection.selectedColor,
      });
    },
    [addToCart, modalDetailState.product]
  );

  // Map and filter products based on active filters and validation
  const filteredProducts = React.useMemo(() => {
    if (!products) return [];
    
    // Map products to view model (ProductListItemView)
    const viewModels = mapProductsToListItemViews(products);
    
    // Filter by valid items
    const validItems = filterValidListItems(viewModels);
    
    return validItems;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

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
        <FilterSidebar
          selectedCategories={selectedCategories}
          selectedPriceRanges={selectedPriceRanges}
          selectedSizes={selectedSizes}
          selectedColors={selectedColors}
          selectedBrands={selectedBrands}
          selectedStyles={selectedStyles}
          collapsedGroups={collapsedGroups}
          brandSearchTerm={brandSearchTerm}
          sort={sort}
          onBrandSearchTermChange={setBrandSearchTerm}
          onToggleGroupCollapsed={toggleGroupCollapsed}
          onToggleFilterValue={toggleFilterValue}
          onClearFilters={clearFilters}
        />
      </Box>

      {/* Products Grid Region */}
      <Box className="products-grid-region" sx={{ flex: 1 }}>
        {/* Page Title */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Products
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                labelId="sort-label"
                value={sort}
                label="Sort by"
                onChange={(event) => setSort(event.target.value as any)}
              >
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body2" color="textSecondary" sx={{ ml: 'auto' }}>
              Showing {filteredProducts.length > 0 ? (page - 1) * pagination.limit + 1 : 0} - {Math.min(page * pagination.limit, pagination.totalItems)} of {pagination.totalItems}
            </Typography>
            <Button
              variant="outlined"
              className="filter-control"
              onClick={() => setMobilePanelOpen(true)}
              sx={{ display: { xs: 'inline-flex', lg: 'none' }, textTransform: 'none' }}
            >
              Open Filters
            </Button>
          </Box>
        </Box>

        {activeChipViews.length > 0 && (
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            {activeChipViews.map((chip) => (
              <Chip
                key={chip.key}
                label={chip.label}
                onDelete={() => removeActiveFilter(chip.group, chip.value)}
                color="primary"
                variant="outlined"
              />
            ))}
            <Button size="small" onClick={clearFilters} sx={{ textTransform: 'none' }}>
              Clear all
            </Button>
          </Box>
        )}

        {/* Error Alert */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <Typography color="textSecondary">
            {activeChipViews.length > 0
              ? 'No products match your filters'
              : 'No products available'}
          </Typography>
        )}

        {/* Product Grid */}
        {!loading && filteredProducts.length > 0 && (
          <ProductGrid products={filteredProducts} onOpenProductDetail={handleOpenProductDetail} />
        )}

        {/* Pagination */}
        {!loading && filteredProducts.length > 0 && pagination.totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={pagination.totalPages}
              page={page}
              onChange={(_, pageNumber) => setPage(pageNumber)}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
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
            <MobileFilterPanel
              onClose={() => setMobilePanelOpen(false)}
              selectedCategories={selectedCategories}
              selectedPriceRanges={selectedPriceRanges}
              selectedSizes={selectedSizes}
              selectedColors={selectedColors}
              selectedBrands={selectedBrands}
              selectedStyles={selectedStyles}
              activeFilterChips={activeChipViews}
              brandSearchTerm={brandSearchTerm}
              sort={sort}
              onBrandSearchTermChange={setBrandSearchTerm}
              onToggleFilterValue={toggleFilterValue}
              onRemoveActiveFilter={removeActiveFilter}
              onClearFilters={clearFilters}
            />
          </Box>
        </>
      )}

      <ProductDetailModal
        open={isProductModalOpen}
        product={modalDetailState.product}
        loading={modalDetailState.loading}
        error={modalDetailState.error}
        onClose={handleCloseProductDetail}
        onOpenFullDetail={handleOpenFullDetail}
        onAddToCart={handleAddToCartFromModal}
      />
    </Box>
  );
};

export default ProductsPage;
