import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { PRODUCT_MODAL_MEDIA } from '../../../pages/products.constants';
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
  const { t } = useTranslation('product');
  const tr = t as unknown as (key: string, options?: Record<string, unknown>) => string;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [brokenMediaUrls, setBrokenMediaUrls] = useState<string[]>([]);

  const detailView = useMemo(() => {
    if (!product) {
      return null;
    }
    return mapProductToDetailModalView(product);
  }, [product]);

  useEffect(() => {
    setSelectedSize(null);
    setSelectedColor(null);
    setBrokenMediaUrls([]);
    setTouchStartX(null);
  }, [detailView?.id]);

  const mediaItems = useMemo(() => detailView?.media || [], [detailView]);
  const activeMedia = mediaItems[activeMediaIndex] || mediaItems[0];

  useEffect(() => {
    const primaryIndex = mediaItems.findIndex((media) => media.isPrimary);
    setActiveMediaIndex(primaryIndex >= 0 ? primaryIndex : 0);
  }, [mediaItems]);

  useEffect(() => {
    if (activeMediaIndex >= mediaItems.length) {
      setActiveMediaIndex(0);
    }
  }, [activeMediaIndex, mediaItems.length]);

  const isBrokenMedia = Boolean(activeMedia && brokenMediaUrls.includes(activeMedia.url));

  const handleThumbnailClick = (index: number) => {
    if (index === activeMediaIndex) {
      return;
    }
    setActiveMediaIndex(index);
  };

  const handleMediaError = (mediaUrl: string) => {
    setBrokenMediaUrls((current) => (current.includes(mediaUrl) ? current : [...current, mediaUrl]));
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
            <Typography variant="body2">{tr('loading_product_details')}</Typography>
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
                sx={{
                  minHeight: {
                    xs: PRODUCT_MODAL_MEDIA.MOBILE_MAIN_MEDIA_MIN_HEIGHT_PX,
                    md: PRODUCT_MODAL_MEDIA.MAIN_MEDIA_MIN_HEIGHT_PX,
                  },
                }}
              >
                {activeMedia && !isBrokenMedia ? (
                  <img
                    key={activeMedia.url}
                    src={activeMedia.url}
                    alt={activeMedia.alt || detailView.name}
                    className="product-detail-main-image"
                    loading="eager"
                    decoding="async"
                    onError={() => handleMediaError(activeMedia.url)}
                  />
                ) : (
                  <Box className="product-detail-modal-no-image">{tr('no_image_available')}</Box>
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
                      aria-label={tr('show_image', { index: index + 1 })}
                    >
                        {!brokenMediaUrls.includes(media.url) ? (
                          <img
                            src={media.url}
                            alt={media.alt || `${detailView.name} thumbnail ${index + 1}`}
                            loading="lazy"
                            decoding="async"
                            onError={() => handleMediaError(media.url)}
                          />
                        ) : (
                          <Box className="product-detail-modal-thumb-fallback">{tr('no_image')}</Box>
                        )}
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
                {detailView.description || tr('no_description')}
              </Typography>

              {detailView.sizeOptions.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {tr('sizes')}
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
                    {tr('colors')}
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
                  {tr('select_required_options')}
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
                {tr('add_to_cart')}
              </Button>

              <Button
                variant="outlined"
                onClick={() => onOpenFullDetail(detailView.id)}
                className="product-detail-modal-full-link"
              >
                {tr('view_full_product_page')}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default ProductDetailModal;
