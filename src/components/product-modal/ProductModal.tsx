import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useProducts } from '../../hooks/useProducts';
import { VariantSelector } from './VariantSelector';
import styles from './styles.module.scss';

interface Image {
  id: string;
  url: string;
  altText: string;
  isPrimary?: boolean;
}

interface Variant {
  id: string;
  size?: string;
  color?: string;
  available: boolean;
  priceOverride?: number;
}

interface VariantOption {
  value: string;
  label: string;
}

interface ProductModalProps {
  open: boolean;
  product: {
    id: string;
    title: string;
    price: number;
    shortDescription?: string;
    images: Image[];
    variants: Variant[];
    sizeOptions?: VariantOption[];
    colorOptions?: VariantOption[];
  };
  onClose: () => void;
  onAddToCart?: (variantId: string, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  open,
  product,
  onClose,
  onAddToCart,
}) => {
  const { addToCart } = useProducts();
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [adding, setAdding] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState('50% 50%');
  
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number | null>(null);
  const announcer = useRef<HTMLDivElement>(null);

  // Determine available variants and option display
  const availableVariants = product.variants.filter((v) => v.available);
  
  const displaySizeOptions = product.sizeOptions && product.sizeOptions.length > 0 
    ? product.sizeOptions 
    : Array.from(new Set(availableVariants.map((v) => v.size).filter(Boolean))).map((size) => ({ 
        value: size!, 
        label: size! 
      }));
  
  const displayColorOptions = product.colorOptions && product.colorOptions.length > 0
    ? product.colorOptions
    : Array.from(new Set(availableVariants.map((v) => v.color).filter(Boolean))).map((color) => ({ 
        value: color!, 
        label: color! 
      }));

  // Initialize selected variant
  useEffect(() => {
    if (!open) return;
    
    // Don't auto-select - require user to choose
    setSelectedVariantId('');
    setActiveImageIndex(0);
  }, [open, product.id]);

  // Focus trap
  useEffect(() => {
    if (!open || !modalRef.current) return;

    previouslyFocused.current = document.activeElement as HTMLElement;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    firstElement?.focus();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  // Get current price
  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  );
  const displayPrice = selectedVariant?.priceOverride || product.price;

  // Check if variant selection is valid (required selections made)
  const isSizeRequired = displaySizeOptions.length > 0;
  const isColorRequired = displayColorOptions.length > 0;
  
  const currentSelectedVariant = product.variants.find(v => v.id === selectedVariantId);
  const hasSizeSelected = !isSizeRequired || (currentSelectedVariant?.size !== undefined);
  const hasColorSelected = !isColorRequired || (currentSelectedVariant?.color !== undefined);
  const isVariantSelectionValid = hasSizeSelected && hasColorSelected;

  // Handle add to cart
  const handleAdd = useCallback(async () => {
    if (!selectedVariantId) return;
    
    setAdding(true);
    
    // Announce to screen readers
    if (announcer.current) {
      announcer.current.textContent = 'Adding item to cart...';
    }

    try {
      if (onAddToCart) {
        onAddToCart(selectedVariantId, 1);
      } else {
        // Fallback to Redux
        addToCart({
          id: selectedVariantId,
          title: product.title,
          price: displayPrice,
          image: product.images[activeImageIndex]?.url,
        } as any);
      }
      
      if (announcer.current) {
        announcer.current.textContent = 'Item added to cart';
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAdding(false);
    }
  }, [selectedVariantId, product, onAddToCart, addToCart, activeImageIndex, displayPrice]);

  // Zoom effect
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!mainImageRef.current) return;

      const rect = mainImageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Clamp to bounds
      const clampedX = Math.max(0, Math.min(100, x));
      const clampedY = Math.max(0, Math.min(100, y));

      // Use rAF for performance
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setTransformOrigin(`${clampedX}% ${clampedY}%`);
      });
    },
    []
  );

  const handlePointerEnter = () => setZoomActive(true);
  const handlePointerLeave = () => {
    setZoomActive(false);
    setTransformOrigin('50% 50%');
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  // Handle thumbnail keyboard navigation
  const handleThumbnailKeyDown = (
    e: React.KeyboardEvent,
    index: number
  ) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const newIndex = index === 0 ? product.images.length - 1 : index - 1;
      setActiveImageIndex(newIndex);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const newIndex = index === product.images.length - 1 ? 0 : index + 1;
      setActiveImageIndex(newIndex);
    }
  };

  if (!open) return null;

  const currentImage = product.images[activeImageIndex] || product.images[0];

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close product modal"
          type="button"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.container}>
          {/* LEFT: Gallery */}
          <div className={styles.left}>
            {/* Gallery Wrapper: Thumbnails on left, Main image on right */}
            <div className={styles.imageGalleryWrapper}>
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className={styles.thumbnailsColumn}>
                  <div className={styles.thumbnails}>
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`${styles.thumbnail} ${
                          idx === activeImageIndex ? styles.active : ''
                        }`}
                        onClick={() => handleThumbnailClick(idx)}
                        onKeyDown={(e) => handleThumbnailKeyDown(e, idx)}
                        aria-label={`View image ${idx + 1}`}
                        aria-pressed={idx === activeImageIndex}
                        type="button"
                      >
                        <img src={img.url} alt={`Thumbnail ${idx + 1}`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Image with Zoom */}
              <div
                className={styles.mainImageWrapper}
                onPointerMove={handlePointerMove}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                style={{
                  cursor: zoomActive ? 'zoom-in' : 'default',
                  flex: 1,
                }}
              >
                <img
                  ref={mainImageRef}
                  src={currentImage?.url}
                  alt={currentImage?.altText}
                  className={styles.mainImage}
                  style={{
                    transformOrigin: zoomActive ? transformOrigin : '50% 50%',
                    transform: zoomActive ? 'scale(1.5)' : 'scale(1)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className={styles.right}>
            <h2 id="modal-title" className={styles.title}>
              {product.title}
            </h2>

            <div className={styles.price}>
              ${displayPrice.toFixed(2)}
            </div>

            {product.shortDescription && (
              <p className={styles.description}>{product.shortDescription}</p>
            )}

            {/* Variant Selector */}
            {(displaySizeOptions.length > 0 || displayColorOptions.length > 0) && (
              <VariantSelector
                sizeOptions={displaySizeOptions}
                colorOptions={displayColorOptions}
                variants={product.variants}
                selectedVariantId={selectedVariantId}
                onSelectVariant={setSelectedVariantId}
              />
            )}

            {/* CTA Section */}
            <div className={styles.ctaSection}>
              <button
                className={styles.addToCartBtn}
                onClick={handleAdd}
                disabled={adding || !selectedVariantId || !isVariantSelectionValid}
                type="button"
                aria-label={`Add ${product.title} to cart`}
              >
                {adding ? 'Adding to cart...' : 'Add to Cart'}
              </button>
              {!isVariantSelectionValid && (displaySizeOptions.length > 0 || displayColorOptions.length > 0) && (
                <p style={{ fontSize: '12px', color: '#999', marginTop: '8px', marginBottom: 0 }}>
                  Please select all options above
                </p>
              )}
            </div>

            {/* Screen Reader Announcer */}
            <div ref={announcer} className={styles.srOnly} role="status" aria-live="polite" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
