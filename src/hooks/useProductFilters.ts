import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FILTER_OPTIONS,
  FILTER_QUERY_KEYS,
  PREDEFINED_PRICE_RANGES,
  SORT_OPTIONS,
  SortValue,
} from '../pages/products.constants';
import { ProductListQuery } from '../api/productsApi';

const SORT_SET = new Set(SORT_OPTIONS.map((item) => item.value));

type FilterGroupKey = 'category' | 'size' | 'color' | 'brand' | 'style' | 'priceRange';

const splitListParam = (value: string | null) => {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const parsePositiveNumber = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }
  return Math.trunc(parsed);
};

export interface ProductFiltersState {
  selectedCategories: string[];
  selectedPriceRanges: string[];
  selectedSizes: string[];
  selectedColors: string[];
  selectedBrands: string[];
  selectedStyles: string[];
  sort: SortValue;
  page: number;
}

interface UseProductFiltersReturn extends ProductFiltersState {
  isMobilePanelOpen: boolean;
  setMobilePanelOpen: (open: boolean) => void;
  collapsedGroups: Record<string, boolean>;
  brandSearchTerm: string;
  setBrandSearchTerm: (value: string) => void;
  toggleGroupCollapsed: (group: string) => void;
  toggleFilterValue: (group: FilterGroupKey, value: string) => void;
  removeActiveFilter: (group: FilterGroupKey, value: string) => void;
  setSort: (sort: SortValue) => void;
  clearFilters: () => void;
  toProductQuery: (limit?: number) => ProductListQuery;
  activeFilterChips: Array<{ key: string; group: FilterGroupKey; value: string; label: string }>;
}

export const useProductFilters = (): UseProductFiltersReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [brandSearchTerm, setBrandSearchTerm] = useState('');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    category: false,
    price: false,
    size: false,
    color: false,
    brand: false,
    style: false,
  });

  const selectedCategories = useMemo(
    () => splitListParam(searchParams.get(FILTER_QUERY_KEYS.CATEGORY)).filter((v) => FILTER_OPTIONS.categories.includes(v as any)),
    [searchParams]
  );
  const selectedPriceRanges = useMemo(
    () => splitListParam(searchParams.get(FILTER_QUERY_KEYS.PRICE_RANGE)).filter((v) => PREDEFINED_PRICE_RANGES.some((r) => r.value === v)),
    [searchParams]
  );
  const selectedSizes = useMemo(
    () => splitListParam(searchParams.get(FILTER_QUERY_KEYS.SIZE)).filter((v) => FILTER_OPTIONS.sizes.includes(v as any)),
    [searchParams]
  );
  const selectedColors = useMemo(
    () => splitListParam(searchParams.get(FILTER_QUERY_KEYS.COLOR)).filter((v) => FILTER_OPTIONS.colors.includes(v as any)),
    [searchParams]
  );
  const selectedBrands = useMemo(
    () => splitListParam(searchParams.get(FILTER_QUERY_KEYS.BRAND)).filter((v) => FILTER_OPTIONS.brands.includes(v as any)),
    [searchParams]
  );
  const selectedStyles = useMemo(
    () => splitListParam(searchParams.get(FILTER_QUERY_KEYS.STYLE)).filter((v) => FILTER_OPTIONS.styles.includes(v as any)),
    [searchParams]
  );

  const sort = useMemo<SortValue>(() => {
    const rawSort = searchParams.get(FILTER_QUERY_KEYS.SORT) as SortValue | null;
    return rawSort && SORT_SET.has(rawSort) ? rawSort : 'newest';
  }, [searchParams]);

  const page = useMemo(() => parsePositiveNumber(searchParams.get(FILTER_QUERY_KEYS.PAGE), 1), [searchParams]);

  const updateListParam = useCallback(
    (key: string, values: string[]) => {
      const next = new URLSearchParams(searchParams);
      if (values.length > 0) {
        next.set(key, values.join(','));
      } else {
        next.delete(key);
      }
      next.set(FILTER_QUERY_KEYS.PAGE, '1');
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const toggleFilterValue = useCallback(
    (group: FilterGroupKey, value: string) => {
      const keyMap: Record<FilterGroupKey, string> = {
        category: FILTER_QUERY_KEYS.CATEGORY,
        priceRange: FILTER_QUERY_KEYS.PRICE_RANGE,
        size: FILTER_QUERY_KEYS.SIZE,
        color: FILTER_QUERY_KEYS.COLOR,
        brand: FILTER_QUERY_KEYS.BRAND,
        style: FILTER_QUERY_KEYS.STYLE,
      };
      const key = keyMap[group];
      const currentValues = splitListParam(searchParams.get(key));
      const exists = currentValues.includes(value);
      const nextValues = exists
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      updateListParam(key, nextValues);
    },
    [searchParams, updateListParam]
  );

  const removeActiveFilter = useCallback(
    (group: FilterGroupKey, value: string) => {
      const keyMap: Record<FilterGroupKey, string> = {
        category: FILTER_QUERY_KEYS.CATEGORY,
        priceRange: FILTER_QUERY_KEYS.PRICE_RANGE,
        size: FILTER_QUERY_KEYS.SIZE,
        color: FILTER_QUERY_KEYS.COLOR,
        brand: FILTER_QUERY_KEYS.BRAND,
        style: FILTER_QUERY_KEYS.STYLE,
      };
      const key = keyMap[group];
      const currentValues = splitListParam(searchParams.get(key)).filter((item) => item !== value);
      updateListParam(key, currentValues);
    },
    [searchParams, updateListParam]
  );

  const setSort = useCallback(
    (nextSort: SortValue) => {
      const next = new URLSearchParams(searchParams);
      if (nextSort === 'newest') {
        next.delete(FILTER_QUERY_KEYS.SORT);
      } else {
        next.set(FILTER_QUERY_KEYS.SORT, nextSort);
      }
      next.set(FILTER_QUERY_KEYS.PAGE, '1');
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const clearFilters = useCallback(() => {
    const next = new URLSearchParams(searchParams);
    next.delete(FILTER_QUERY_KEYS.CATEGORY);
    next.delete(FILTER_QUERY_KEYS.PRICE_RANGE);
    next.delete(FILTER_QUERY_KEYS.SIZE);
    next.delete(FILTER_QUERY_KEYS.COLOR);
    next.delete(FILTER_QUERY_KEYS.BRAND);
    next.delete(FILTER_QUERY_KEYS.STYLE);
    next.delete(FILTER_QUERY_KEYS.SORT);
    next.set(FILTER_QUERY_KEYS.PAGE, '1');
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const toggleGroupCollapsed = useCallback((group: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  }, []);

  const activeFilterChips = useMemo(() => {
    const chips: Array<{ key: string; group: FilterGroupKey; value: string; label: string }> = [];
    selectedCategories.forEach((value) => chips.push({ key: `category-${value}`, group: 'category', value, label: value }));
    selectedPriceRanges.forEach((value) => {
      const option = PREDEFINED_PRICE_RANGES.find((item) => item.value === value);
      chips.push({ key: `priceRange-${value}`, group: 'priceRange', value, label: option?.label || value });
    });
    selectedSizes.forEach((value) => chips.push({ key: `size-${value}`, group: 'size', value, label: value }));
    selectedColors.forEach((value) => chips.push({ key: `color-${value}`, group: 'color', value, label: value }));
    selectedBrands.forEach((value) => chips.push({ key: `brand-${value}`, group: 'brand', value, label: value }));
    selectedStyles.forEach((value) => chips.push({ key: `style-${value}`, group: 'style', value, label: value }));
    return chips;
  }, [selectedBrands, selectedCategories, selectedColors, selectedPriceRanges, selectedSizes, selectedStyles]);

  const toProductQuery = useCallback(
    (limit = 12): ProductListQuery => {
      const query: ProductListQuery = {
        page,
        limit,
      };

      if (selectedCategories.length > 0) query.category = selectedCategories.join(',');
      if (selectedSizes.length > 0) query.size = selectedSizes.join(',');
      if (selectedColors.length > 0) query.color = selectedColors.join(',');
      if (selectedBrands.length > 0) query.brand = selectedBrands.join(',');
      if (selectedStyles.length > 0) query.style = selectedStyles.join(',');
      if (selectedPriceRanges.length > 0) query.priceRange = selectedPriceRanges.join(',');

      if (sort === 'price-asc') {
        query.sortBy = 'price';
        query.sortOrder = 'asc';
      } else if (sort === 'price-desc') {
        query.sortBy = 'price';
        query.sortOrder = 'desc';
      } else {
        query.sortBy = 'createdAt';
        query.sortOrder = 'desc';
      }

      return query;
    },
    [page, selectedBrands, selectedCategories, selectedColors, selectedPriceRanges, selectedSizes, selectedStyles, sort]
  );

  return {
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
    clearFilters,
    toProductQuery,
    activeFilterChips,
  };
};
