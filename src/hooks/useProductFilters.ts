// src/hooks/useProductFilters.ts
// Filter state management for product listing page
// Provides filter state and actions for FilterSidebar and MobileFilterPanel

import { useState, useCallback } from 'react';

export interface PriceRange {
  min?: number;
  max?: number;
}

interface UseProductFiltersReturn {
  selectedSizes: string[];
  selectedColors: string[];
  priceRange: PriceRange;
  isMobilePanelOpen: boolean;
  setMobilePanelOpen: (open: boolean) => void;
  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
  setPriceRange: (range: PriceRange) => void;
  clearFilters: () => void;
}

export const useProductFilters = (): UseProductFiltersReturn => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRangeState] = useState<PriceRange>({});
  const [isMobilePanelOpen, setMobilePanelOpen] = useState(false);

  const toggleSize = useCallback((size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  }, []);

  const toggleColor = useCallback((color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  }, []);

  const setPriceRange = useCallback((range: PriceRange) => {
    // Validate that min <= max if both exist
    if (range.min !== undefined && range.max !== undefined) {
      if (range.min > range.max) {
        console.warn('Invalid price range: min > max');
        return;
      }
    }
    setPriceRangeState(range);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRangeState({});
  }, []);

  return {
    selectedSizes,
    selectedColors,
    priceRange,
    isMobilePanelOpen,
    setMobilePanelOpen,
    toggleSize,
    toggleColor,
    setPriceRange,
    clearFilters,
  };
};
