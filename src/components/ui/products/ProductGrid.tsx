// src/components/ui/products/ProductGrid.tsx
// CSS Grid wrapper for stable product card alignment
// Enforces strict row/column alignment and responsive column counts

import React from 'react';
import { Box } from '@mui/material';
import { ProductCard, ProductCardProps } from './ProductCard';
import { GRID_COLUMNS } from '../../../pages/products.constants';

export interface ProductGridProps {
  products: ProductCardProps[];
  onOpenProductDetail?: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onOpenProductDetail }) => {
  return (
    <Box
      className="products-grid"
      sx={{
        display: 'grid',
        gap: '16px',
        width: '100%',
        gridAutoRows: 'auto',

        // Desktop: 4 columns (strict)
        '@media (min-width: 1024px)': {
          gridTemplateColumns: `repeat(${GRID_COLUMNS.DESKTOP}, 1fr)`,
        },

        // Tablet: 3 columns target with fallback to 2
        '@media (min-width: 768px) and (max-width: 1023px)': {
          gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
          '@supports not (grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)))': {
            gridTemplateColumns: `repeat(${GRID_COLUMNS.TABLET_FALLBACK}, 1fr)`,
          },
        },

        // Mobile: 2 columns fixed
        '@media (max-width: 767px)': {
          gridTemplateColumns: `repeat(${GRID_COLUMNS.MOBILE}, 1fr)`,
        },

        // Margin center for optional container constraint
        margin: '0 auto',
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
          category={product.category}
          onOpenDetail={onOpenProductDetail}
        />
      ))}
    </Box>
  );
};

export default ProductGrid;
