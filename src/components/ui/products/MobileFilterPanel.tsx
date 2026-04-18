import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Checkbox, FormControlLabel, Button, Divider, IconButton, Chip, TextField } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { FILTER_OPTIONS, PREDEFINED_PRICE_RANGES, SortValue } from '../../../pages/products.constants';

export interface MobileFilterPanelProps {
  onClose?: () => void;
  selectedCategories: string[];
  selectedPriceRanges: string[];
  selectedSizes: string[];
  selectedColors: string[];
  selectedBrands: string[];
  selectedStyles: string[];
  activeFilterChips: Array<{ key: string; group: 'category' | 'priceRange' | 'size' | 'color' | 'brand' | 'style'; value: string; label: string }>;
  brandSearchTerm: string;
  sort: SortValue;
  onBrandSearchTermChange: (value: string) => void;
  onToggleFilterValue: (group: 'category' | 'priceRange' | 'size' | 'color' | 'brand' | 'style', value: string) => void;
  onRemoveActiveFilter: (group: 'category' | 'priceRange' | 'size' | 'color' | 'brand' | 'style', value: string) => void;
  onClearFilters: () => void;
}

export const MobileFilterPanel: React.FC<MobileFilterPanelProps> = ({
  onClose,
  selectedCategories,
  selectedPriceRanges,
  selectedSizes,
  selectedColors,
  selectedBrands,
  selectedStyles,
  activeFilterChips,
  brandSearchTerm,
  onBrandSearchTermChange,
  onToggleFilterValue,
  onRemoveActiveFilter,
  onClearFilters,
}) => {
  const { t } = useTranslation('product');
  const tr = t as unknown as (key: string) => string;

  const handleApplyFilters = () => {
    // Filters are already applied in real-time
    // Just close the panel
    onClose?.();
  };

  const visibleBrands = FILTER_OPTIONS.brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearchTerm.toLowerCase())
  );

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
          {tr('filters')}
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
        {activeFilterChips.length > 0 && (
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {activeFilterChips.map((chip) => (
              <Chip
                key={chip.key}
                label={chip.label}
                onDelete={() => onRemoveActiveFilter(chip.group, chip.value)}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
        )}

        <Typography variant="subtitle2" sx={{ marginBottom: '8px', fontWeight: 700 }}>{tr('category')}</Typography>
        {FILTER_OPTIONS.categories.map((category) => (
          <FormControlLabel
            key={category}
            control={<Checkbox checked={selectedCategories.includes(category)} onChange={() => onToggleFilterValue('category', category)} size="small" />}
            label={category}
            sx={{ display: 'block', marginBottom: '4px', textTransform: 'capitalize' }}
          />
        ))}

        <Divider sx={{ marginBottom: '24px' }} />

        <Typography variant="subtitle2" sx={{ marginBottom: '8px', fontWeight: 700 }}>{tr('price')}</Typography>
        {PREDEFINED_PRICE_RANGES.map((range) => (
          <Chip
            key={range.value}
            label={tr(`price_range.${range.value}`)}
            clickable
            onClick={() => onToggleFilterValue('priceRange', range.value)}
            color={selectedPriceRanges.includes(range.value) ? 'primary' : 'default'}
            variant={selectedPriceRanges.includes(range.value) ? 'filled' : 'outlined'}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}

        <Divider sx={{ marginBottom: '24px' }} />

        <Box sx={{ marginBottom: '24px' }}>
          <Typography
            variant="subtitle2"
            sx={{ marginBottom: '12px', fontWeight: 600 }}
          >
            {tr('size')}
          </Typography>
          {FILTER_OPTIONS.sizes.map((size) => (
            <Chip
              key={size}
              clickable
              onClick={() => onToggleFilterValue('size', size)}
              color={selectedSizes.includes(size) ? 'primary' : 'default'}
              variant={selectedSizes.includes(size) ? 'filled' : 'outlined'}
              sx={{ mr: 1, mb: 1 }}
              label={size}
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
            {tr('color')}
          </Typography>
          {FILTER_OPTIONS.colors.map((color) => (
            <FormControlLabel
              key={color}
              control={
                <Checkbox
                  checked={selectedColors.includes(color)}
                  onChange={() => onToggleFilterValue('color', color)}
                  size="small"
                />
              }
              label={color}
              sx={{ display: 'block', marginBottom: '4px' }}
            />
          ))}
        </Box>

        <Divider sx={{ marginBottom: '24px' }} />

        <Divider sx={{ marginBottom: '24px' }} />

        <Typography variant="subtitle2" sx={{ marginBottom: '8px', fontWeight: 700 }}>{tr('brand')}</Typography>
        <TextField
          size="small"
          fullWidth
          placeholder={tr('search_brand')}
          value={brandSearchTerm}
          onChange={(event) => onBrandSearchTermChange(event.target.value)}
          sx={{ mb: 1 }}
        />
        {visibleBrands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={<Checkbox checked={selectedBrands.includes(brand)} onChange={() => onToggleFilterValue('brand', brand)} size="small" />}
            label={brand}
            sx={{ display: 'block', marginBottom: '4px' }}
          />
        ))}

        <Divider sx={{ marginBottom: '24px', marginTop: '8px' }} />

        <Typography variant="subtitle2" sx={{ marginBottom: '8px', fontWeight: 700 }}>{tr('style_fit')}</Typography>
        {FILTER_OPTIONS.styles.map((style) => (
          <FormControlLabel
            key={style}
            control={<Checkbox checked={selectedStyles.includes(style)} onChange={() => onToggleFilterValue('style', style)} size="small" />}
            label={style}
            sx={{ display: 'block', marginBottom: '4px' }}
          />
        ))}
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
            onClearFilters();
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
          {tr('reset')}
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
          {tr('apply')}
        </Button>
      </Box>
    </Box>
  );
};

export default MobileFilterPanel;
