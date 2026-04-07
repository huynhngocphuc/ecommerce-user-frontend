// src/pages/products.mappers.ts
// View-model mapping utilities for product listing
// Maps Redux Product entities to ProductListItemView for rendering

import { Product } from '../redux/products/type';

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
    id: product.id,
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
