import React from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  IconButton,
  Chip,
  TextField,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { FILTER_OPTIONS, PREDEFINED_PRICE_RANGES } from '../../../pages/products.constants';
import { SortValue } from '../../../pages/products.constants';

interface FilterSidebarProps {
  selectedCategories: string[];
  selectedPriceRanges: string[];
  selectedSizes: string[];
  selectedColors: string[];
  selectedBrands: string[];
  selectedStyles: string[];
  collapsedGroups: Record<string, boolean>;
  brandSearchTerm: string;
  sort: SortValue;
  onBrandSearchTermChange: (value: string) => void;
  onToggleGroupCollapsed: (group: string) => void;
  onToggleFilterValue: (group: 'category' | 'priceRange' | 'size' | 'color' | 'brand' | 'style', value: string) => void;
  onClearFilters: () => void;
}

const COLOR_SWATCH: Record<string, string> = {
  Black: '#111111',
  White: '#ffffff',
  Red: '#d84343',
  Blue: '#3662f4',
  Green: '#2f9e44',
  Navy: '#1b2a5a',
};

const renderGroupTitle = (
  title: string,
  group: string,
  collapsedGroups: Record<string, boolean>,
  onToggleGroupCollapsed: (group: string) => void
) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{title}</Typography>
    <IconButton size="small" onClick={() => onToggleGroupCollapsed(group)}>
      {collapsedGroups[group] ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
    </IconButton>
  </Box>
);

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategories,
  selectedPriceRanges,
  selectedSizes,
  selectedColors,
  selectedBrands,
  selectedStyles,
  collapsedGroups,
  brandSearchTerm,
  onBrandSearchTermChange,
  onToggleGroupCollapsed,
  onToggleFilterValue,
  onClearFilters,
}) => {
  const visibleBrands = FILTER_OPTIONS.brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearchTerm.toLowerCase())
  );

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
      <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 700 }}>
        Filters
      </Typography>

      {renderGroupTitle('Category', 'category', collapsedGroups, onToggleGroupCollapsed)}
      {!collapsedGroups.category && FILTER_OPTIONS.categories.map((category) => (
        <FormControlLabel
          key={category}
          control={<Checkbox checked={selectedCategories.includes(category)} onChange={() => onToggleFilterValue('category', category)} size="small" />}
          label={category}
          sx={{ display: 'block', marginBottom: '4px', textTransform: 'capitalize' }}
        />
      ))}

      <Divider sx={{ marginBottom: '16px', marginTop: '12px' }} />

      {renderGroupTitle('Price', 'price', collapsedGroups, onToggleGroupCollapsed)}
      {!collapsedGroups.price && PREDEFINED_PRICE_RANGES.map((range) => (
        <Chip
          key={range.value}
          label={range.label}
          clickable
          onClick={() => onToggleFilterValue('priceRange', range.value)}
          color={selectedPriceRanges.includes(range.value) ? 'primary' : 'default'}
          variant={selectedPriceRanges.includes(range.value) ? 'filled' : 'outlined'}
          sx={{ mr: 1, mb: 1 }}
        />
      ))}

      <Divider sx={{ marginBottom: '16px', marginTop: '12px' }} />

      {/* Size Filter Group */}
      {renderGroupTitle('Size', 'size', collapsedGroups, onToggleGroupCollapsed)}
      {!collapsedGroups.size && (
      <Box sx={{ marginBottom: '24px' }}>
        {FILTER_OPTIONS.sizes.map((size) => (
          <Chip
            key={size}
            label={size}
            clickable
            onClick={() => onToggleFilterValue('size', size)}
            color={selectedSizes.includes(size) ? 'primary' : 'default'}
            variant={selectedSizes.includes(size) ? 'filled' : 'outlined'}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
      )}

      <Divider sx={{ marginBottom: '16px', marginTop: '12px' }} />

      {renderGroupTitle('Color', 'color', collapsedGroups, onToggleGroupCollapsed)}
      {!collapsedGroups.color && (
      <Box sx={{ marginBottom: '24px' }}>
        {FILTER_OPTIONS.colors.map((color) => (
          <Button
            key={color}
            onClick={() => onToggleFilterValue('color', color)}
            variant={selectedColors.includes(color) ? 'contained' : 'outlined'}
            sx={{
              mr: 1,
              mb: 1,
              minWidth: 92,
              justifyContent: 'flex-start',
              textTransform: 'none',
            }}
            startIcon={<Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: COLOR_SWATCH[color], border: '1px solid #ccc' }} />}
          >
            {color}
          </Button>
        ))}
      </Box>
      )}

      <Divider sx={{ marginBottom: '16px', marginTop: '12px' }} />

      {renderGroupTitle('Brand', 'brand', collapsedGroups, onToggleGroupCollapsed)}
      {!collapsedGroups.brand && (
        <Box sx={{ marginBottom: '16px' }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search brand..."
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
          {visibleBrands.length === 0 && (
            <Typography variant="caption" color="text.secondary">No matching brands</Typography>
          )}
        </Box>
      )}

      <Divider sx={{ marginBottom: '16px', marginTop: '12px' }} />

      {renderGroupTitle('Style / Fit', 'style', collapsedGroups, onToggleGroupCollapsed)}
      {!collapsedGroups.style && FILTER_OPTIONS.styles.map((style) => (
        <FormControlLabel
          key={style}
          control={<Checkbox checked={selectedStyles.includes(style)} onChange={() => onToggleFilterValue('style', style)} size="small" />}
          label={style}
          sx={{ display: 'block', marginBottom: '4px' }}
        />
      ))}

      <Divider sx={{ marginBottom: '24px' }} />

      <Button
        fullWidth
        variant="outlined"
        onClick={onClearFilters}
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
