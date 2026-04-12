// src/pages/products.mappers.ts
// View-model mapping utilities for product listing
// Maps Redux Product entities to ProductListItemView for rendering

import { Product } from '../redux/products/type';

export interface ActiveFilterChipView {
  key: string;
  label: string;
  group: 'category' | 'priceRange' | 'size' | 'color' | 'brand' | 'style';
  value: string;
}

/**
 * ProductListItemView: Canonical card-level view model
 * Aligns with data-model.md ProductListItemView entity
 */
export interface ProductListItemView {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: string;
  size?: string;
  color?: string;
}

export interface ProductMediaView {
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

export interface ProductVariantOptionView {
  value: string;
  label: string;
  available: boolean;
  swatchHex?: string;
}

export interface ProductDetailModalView {
  id: string;
  name: string;
  price: number;
  description: string;
  media: ProductMediaView[];
  sizeOptions: ProductVariantOptionView[];
  colorOptions: ProductVariantOptionView[];
}

/**
 * Map a redux Product to ProductListItemView for card rendering
 * @param product Redux Product entity
 * @returns ProductListItemView for UI rendering
 */
export function mapProductToListItemView(product: Product): ProductListItemView {
  // Validate required fields
  if (!product.id || !product.name || product.price === undefined) {
    console.warn('Invalid product for listing view:', product);
  }

  return {
    id: product.id || product._id || '',
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    category: product.category,
    // size and color are optional filter attributes
    // Add these if backend provides them in Product type
    size: (product as any).size,
    color: (product as any).color,
  };
}

/**
 * Map an array of Products to ProductListItemView[]
 * @param products Array of redux Product entities
 * @returns Array of ProductListItemView for UI rendering
 */
export function mapProductsToListItemViews(products: Product[]): ProductListItemView[] {
  return products.map(mapProductToListItemView);
}

const normalizeVariantOptions = (
  options: Product['sizeOptions'] | Product['colorOptions'] | undefined,
  fallbackValue?: string
): ProductVariantOptionView[] => {
  if (Array.isArray(options) && options.length > 0) {
    return options.map((option) => ({
      value: option.value,
      label: option.label || option.value,
      available: option.available !== false,
      swatchHex: option.swatchHex,
    }));
  }

  if (!fallbackValue) {
    return [];
  }

  return [{ value: fallbackValue, label: fallbackValue, available: true }];
};

export function mapProductToDetailModalView(product: Product): ProductDetailModalView {
  const media =
    product.media && product.media.length > 0
      ? product.media.map((item) => ({
          url: item.url,
          alt: item.alt,
          isPrimary: item.isPrimary,
        }))
      : product.imageUrl
        ? [{ url: product.imageUrl, alt: product.name, isPrimary: true }]
        : [];

  return {
    id: product.id || product._id || '',
    name: product.name,
    price: product.price,
    description: product.description || '',
    media,
    sizeOptions: normalizeVariantOptions(product.sizeOptions, product.size),
    colorOptions: normalizeVariantOptions(product.colorOptions, product.color),
  };
}

/**
 * Validate ProductListItemView for render eligibility
 * @param item ProductListItemView to validate
 * @returns true if item has all required fields and can be rendered
 */
export function isValidListItemView(item: ProductListItemView): boolean {
  return Boolean(item.id && item.name && item.price !== undefined);
}

/**
 * Filter list items by validation
 * @param items Array of ProductListItemView items
 * @returns Filtered array of valid items
 */
export function filterValidListItems(items: ProductListItemView[]): ProductListItemView[] {
  return items.filter(isValidListItemView);
}

export function mapActiveFiltersToChipViews(
  chips: Array<{ key: string; label: string; group: ActiveFilterChipView['group']; value: string }>
): ActiveFilterChipView[] {
  return chips.map((chip) => ({ ...chip }));
}
