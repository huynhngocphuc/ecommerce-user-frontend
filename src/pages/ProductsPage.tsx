// src/pages/ProductsPage.tsx
import React, { useEffect } from 'react';
import { Box, CircularProgress, Alert, Typography, Chip, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import { useProductFilters } from '../hooks/useProductFilters';
import { ProductGrid } from '../components/ui/products/ProductGrid';
import { FilterSidebar } from '../components/ui/products/FilterSidebar';
import { MobileFilterPanel } from '../components/ui/products/MobileFilterPanel';
import { mapProductsToListItemViews, filterValidListItems, mapActiveFiltersToChipViews } from './products.mappers';
import { GRID_CONTAINER } from './products.constants';
import { SORT_OPTIONS } from './products.constants';

const ProductsPage: React.FC = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const {
    selectedCategories,
    selectedPriceRanges,
    selectedSizes,
    selectedColors,
    selectedBrands,
    selectedStyles,
    sort,
    isMobilePanelOpen,
    setMobilePanelOpen,
    collapsedGroups,
    brandSearchTerm,
    setBrandSearchTerm,
    toggleGroupCollapsed,
    toggleFilterValue,
    removeActiveFilter,
    setSort,
    clearFilters,
    toProductQuery,
    activeFilterChips,
  } = useProductFilters();

  const activeChipViews = mapActiveFiltersToChipViews(activeFilterChips);

  useEffect(() => {
    fetchProducts(toProductQuery());
  }, [fetchProducts, toProductQuery]);

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
          <ProductGrid products={filteredProducts} />
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
    </Box>
  );
};

export default ProductsPage;
