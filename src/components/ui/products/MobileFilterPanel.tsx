// src/components/ui/products/MobileFilterPanel.tsx
// Mobile overlay filter panel with grouped filter controls and dismiss functionality
// Appears as bottom sheet on mobile/tablet viewports

import React from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Slider, Button, Divider, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useProductFilters } from '../../../hooks/useProductFilters';

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const AVAILABLE_COLORS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Navy'];
const PRICE_RANGE = { min: 0, max: 500 };

export interface MobileFilterPanelProps {
  onClose?: () => void;
}

export const MobileFilterPanel: React.FC<MobileFilterPanelProps> = ({ onClose }) => {
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

  const handleApplyFilters = () => {
    // Filters are already applied in real-time
    // Just close the panel
    onClose?.();
  };

  const priceMin = priceRange.min ?? PRICE_RANGE.min;
  const priceMax = priceRange.max ?? PRICE_RANGE.max;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '16px',
        backgroundColor: '#fff',
      }}
    >
      {/* Header with Close Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Filters
        </Typography>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Scrollable Filter Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          paddingRight: '8px',
          marginRight: '-8px',
          paddingBottom: '16px',
        }}
      >
        {/* Size Filter Group */}
        <Box sx={{ marginBottom: '24px' }}>
          <Typography
            variant="subtitle2"
            sx={{ marginBottom: '12px', fontWeight: 600 }}
          >
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
          <Typography
            variant="subtitle2"
            sx={{ marginBottom: '12px', fontWeight: 600 }}
          >
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
          <Typography
            variant="subtitle2"
            sx={{ marginBottom: '12px', fontWeight: 600 }}
          >
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
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid #eee',
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            clearFilters();
          }}
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
          Reset
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleApplyFilters}
          sx={{
            textTransform: 'none',
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default MobileFilterPanel;
