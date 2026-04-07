// src/components/ui/products/FilterSidebar.tsx
// Desktop sticky filter sidebar with grouped filter controls
// Supports size, color, and price range filtering

import React from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Slider, Button, Divider } from '@mui/material';
import { useProductFilters } from '../../../hooks/useProductFilters';

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const AVAILABLE_COLORS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Navy'];
const PRICE_RANGE = { min: 0, max: 500 };

export const FilterSidebar: React.FC = () => {
  const {
    selectedSizes,
    selectedColors,
    priceRange,
    toggleSize,
    toggleColor,
    setPriceRange,
    clearFilters,
  } = useProductFilters();

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange({
        min: newValue[0],
        max: newValue[1],
      });
    }
  };

  const priceMin = priceRange.min ?? PRICE_RANGE.min;
  const priceMax = priceRange.max ?? PRICE_RANGE.max;

  return (
    <Box
      sx={{
        padding: '16px',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {/* Filter Title */}
      <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 600 }}>
        Filters
      </Typography>

      {/* Size Filter Group */}
      <Box sx={{ marginBottom: '24px' }}>
        <Typography variant="subtitle2" sx={{ marginBottom: '12px', fontWeight: 600 }}>
          Size
        </Typography>
        {AVAILABLE_SIZES.map((size) => (
          <FormControlLabel
            key={size}
            control={
              <Checkbox
                checked={selectedSizes.includes(size)}
                onChange={() => toggleSize(size)}
                size="small"
              />
            }
            label={size}
            sx={{ display: 'block', marginBottom: '4px' }}
          />
        ))}
      </Box>

      <Divider sx={{ marginBottom: '24px' }} />

      {/* Color Filter Group */}
      <Box sx={{ marginBottom: '24px' }}>
        <Typography variant="subtitle2" sx={{ marginBottom: '12px', fontWeight: 600 }}>
          Color
        </Typography>
        {AVAILABLE_COLORS.map((color) => (
          <FormControlLabel
            key={color}
            control={
              <Checkbox
                checked={selectedColors.includes(color)}
                onChange={() => toggleColor(color)}
                size="small"
              />
            }
            label={color}
            sx={{ display: 'block', marginBottom: '4px' }}
          />
        ))}
      </Box>

      <Divider sx={{ marginBottom: '24px' }} />

      {/* Price Filter Group */}
      <Box sx={{ marginBottom: '24px' }}>
        <Typography variant="subtitle2" sx={{ marginBottom: '12px', fontWeight: 600 }}>
          Price Range
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', marginBottom: '12px' }}>
          ${priceMin} - ${priceMax}
        </Typography>
        <Slider
          value={[priceMin, priceMax]}
          onChange={handlePriceChange}
          min={PRICE_RANGE.min}
          max={PRICE_RANGE.max}
          step={10}
          marks={[
            { value: PRICE_RANGE.min, label: '$0' },
            { value: PRICE_RANGE.max, label: '$500' },
          ]}
          sx={{ marginBottom: '16px' }}
        />
      </Box>

      <Divider sx={{ marginBottom: '24px' }} />

      {/* Clear Filters Button */}
      <Button
        fullWidth
        variant="outlined"
        onClick={clearFilters}
        sx={{
          textTransform: 'none',
          borderColor: '#ccc',
          color: '#000',
          '&:hover': {
            borderColor: '#999',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        Clear Filters
      </Button>
    </Box>
  );
};

export default FilterSidebar;
