import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Product } from '../../../redux/products/type';
import { mapProductToDetailModalView } from '../../../pages/products.mappers';

interface ProductDetailModalProps {
  open: boolean;
  product: Product | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onOpenFullDetail: (productId: string) => void;
  onAddToCart: (selection: { selectedSize?: string; selectedColor?: string }) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  open,
  product,
  loading,
  error,
  onClose,
  onOpenFullDetail,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const detailView = useMemo(() => {
    if (!product) {
      return null;
    }
    return mapProductToDetailModalView(product);
  }, [product]);

  useEffect(() => {
    setSelectedSize(null);
    setSelectedColor(null);
    setActiveMediaIndex(0);
    setTouchStartX(null);
  }, [detailView?.id]);

  const mediaItems = detailView?.media || [];
  const activeMedia = mediaItems[activeMediaIndex] || mediaItems[0];

  const handleThumbnailClick = (index: number) => {
    setActiveMediaIndex(index);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.changedTouches[0].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || mediaItems.length < 2) {
      return;
    }

    const deltaX = event.changedTouches[0].clientX - touchStartX;
    const swipeThreshold = 40;

    if (Math.abs(deltaX) < swipeThreshold) {
      return;
    }

    if (deltaX < 0) {
      setActiveMediaIndex((current) => (current + 1) % mediaItems.length);
    } else {
      setActiveMediaIndex((current) => (current - 1 + mediaItems.length) % mediaItems.length);
    }
  };

  const isSizeRequired = Boolean(detailView && detailView.sizeOptions.length > 0);
  const isColorRequired = Boolean(detailView && detailView.colorOptions.length > 0);
  const canAddToCart =
    Boolean(detailView) &&
    (!isSizeRequired || Boolean(selectedSize)) &&
    (!isColorRequired || Boolean(selectedColor));

  useEffect(() => {
    if (!open) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [open, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="product-detail-modal"
      slotProps={{
        backdrop: {
          className: 'product-detail-modal-backdrop',
        },
        paper: {
          className: 'product-detail-modal-paper',
        },
      }}
    >
      <Box className="product-detail-modal-content">
        <IconButton aria-label="Close product detail" onClick={onClose} className="product-detail-modal-close">
          <CloseIcon />
        </IconButton>

        {loading && (
          <Stack className="product-detail-modal-loading" alignItems="center" justifyContent="center" spacing={2}>
            <CircularProgress />
            <Typography variant="body2">Loading product details...</Typography>
          </Stack>
        )}

        {!loading && error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && detailView && (
          <Box className="product-detail-modal-layout">
            <Box className="product-detail-modal-media-column">
              <Box
                className="product-detail-modal-media"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {activeMedia ? (
                  <img
                    key={activeMedia.url}
                    src={activeMedia.url}
                    alt={activeMedia.alt || detailView.name}
                    className="product-detail-main-image"
                  />
                ) : (
                  <Box className="product-detail-modal-no-image">No image available</Box>
                )}
              </Box>

              {mediaItems.length > 1 && (
                <Stack direction="row" spacing={1} className="product-detail-modal-thumbnails" useFlexGap>
                  {mediaItems.map((media, index) => (
                    <button
                      key={`${media.url}-${index}`}
                      type="button"
                      className={`product-detail-modal-thumb ${index === activeMediaIndex ? 'active' : ''}`}
                      onClick={() => handleThumbnailClick(index)}
                      aria-label={`Show image ${index + 1}`}
                    >
                      <img src={media.url} alt={media.alt || `${detailView.name} thumbnail ${index + 1}`} />
                    </button>
                  ))}
                </Stack>
              )}
            </Box>

            <Box className="product-detail-modal-info">
              <Typography variant="h5">{detailView.name}</Typography>
              <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                ${detailView.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {detailView.description || 'No description available for this product.'}
              </Typography>

              {detailView.sizeOptions.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Sizes
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {detailView.sizeOptions.map((option) => (
                      <Chip
                        key={`size-${option.value}`}
                        label={option.label}
                        variant={selectedSize === option.value ? 'filled' : 'outlined'}
                        size="small"
                        onClick={() => setSelectedSize(option.value)}
                        className="product-detail-option-chip"
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {detailView.colorOptions.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Colors
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {detailView.colorOptions.map((option) => (
                      <Chip
                        key={`color-${option.value}`}
                        label={option.label}
                        variant={selectedColor === option.value ? 'filled' : 'outlined'}
                        size="small"
                        onClick={() => setSelectedColor(option.value)}
                        className="product-detail-option-swatch"
                        sx={
                          option.swatchHex
                            ? {
                                borderColor: option.swatchHex,
                                color: selectedColor === option.value ? '#fff' : option.swatchHex,
                                backgroundColor: selectedColor === option.value ? option.swatchHex : 'transparent',
                              }
                            : undefined
                        }
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {!canAddToCart && (isSizeRequired || isColorRequired) && (
                <Typography variant="caption" color="error" sx={{ mb: 1 }}>
                  Select required options before adding to cart.
                </Typography>
              )}

              <Button
                variant="contained"
                disabled={!canAddToCart}
                onClick={() =>
                  onAddToCart({
                    selectedSize: selectedSize || undefined,
                    selectedColor: selectedColor || undefined,
                  })
                }
                sx={{ textTransform: 'none', mb: 1 }}
              >
                Add to cart
              </Button>

              <Button
                variant="outlined"
                onClick={() => onOpenFullDetail(detailView.id)}
                className="product-detail-modal-full-link"
              >
                View full product page
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default ProductDetailModal;
