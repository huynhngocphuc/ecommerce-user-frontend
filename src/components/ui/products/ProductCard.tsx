// src/components/ui/products/ProductCard.tsx
// Product card component with stable 4:5 media frame and content hierarchy
// Supports hover interactions and responsive image delivery

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { PRODUCT_CARD } from '../../../pages/products.constants';
import { ROUTE_PATHS } from '../../../utils/routes';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: string;
  onOpenDetail?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  category,
  onOpenDetail,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onOpenDetail) {
      onOpenDetail(id);
      return;
    }

    navigate(ROUTE_PATHS.PRODUCT_DETAIL(id));
  };

  return (
    <Box
      className="product-card"
      onClick={handleCardClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        borderRadius: `${PRODUCT_CARD.BORDER_RADIUS_MIN_PX}px`,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
      }}
    >
      {/* Media Frame - Canonical 4:5 Aspect Ratio */}
      <Box
        className="product-card-media"
        sx={{
          position: 'relative',
          width: '100%',
          paddingBottom: '125%', // 4:5 aspect ratio = 125% height
          backgroundColor: '#f5f5f5',
          overflow: 'hidden',
        }}
      >
        {imageUrl ? (
          <picture style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}>
            {/* Modern format with fallbacks (AVIF/WebP + JPEG/PNG) */}
            <source
              type="image/avif"
              srcSet={`${imageUrl}?format=avif&w=200 1x, ${imageUrl}?format=avif&w=400 2x`}
            />
            <source
              type="image/webp"
              srcSet={`${imageUrl}?format=webp&w=200 1x, ${imageUrl}?format=webp&w=400 2x`}
            />
            <img
              src={imageUrl}
              alt={name}
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: `${PRODUCT_CARD.BORDER_RADIUS_MIN_PX}px`,
                transition: 'transform 0.3s ease',
              }}
            />
          </picture>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#e0e0e0',
              color: '#999',
              fontSize: '12px',
            }}
          >
            No Image
          </Box>
        )}
      </Box>

      {/* Content Section */}
      <Box
        className="product-card-content"
        sx={{
          padding: '12px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Product Name - 2-line Clamp */}
        <Typography
          className="product-card-name"
          variant="body2"
          sx={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: PRODUCT_CARD.NAME_CLAMP_LINES,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            margin: '0 0 8px 0',
            flex: 1,
          }}
        >
          {name}
        </Typography>

        {/* Category Badge (Optional) */}
        {category && (
          <Typography
            variant="caption"
            sx={{
              fontSize: '11px',
              color: '#999',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {category}
          </Typography>
        )}

        {/* Price */}
        <Typography
          className="product-card-price"
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#000',
            margin: 0,
          }}
        >
          ${price.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;
