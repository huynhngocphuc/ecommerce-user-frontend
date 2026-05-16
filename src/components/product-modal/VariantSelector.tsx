import React from 'react';
import styles from './styles.module.scss';

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

interface VariantSelectorProps {
  sizeOptions: VariantOption[];
  colorOptions: VariantOption[];
  variants: Variant[];
  selectedVariantId: string;
  onSelectVariant: (variantId: string) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  sizeOptions,
  colorOptions,
  variants,
  selectedVariantId,
  onSelectVariant,
}) => {
  const handleSizeClick = (size: string) => {
    // Find matching variant for this size + current color (if any)
    const currentVariant = variants.find((v) => v.id === selectedVariantId);
    const matchingVariant = variants.find(
      (v) =>
        v.size === size &&
        v.available &&
        (!currentVariant?.color || v.color === currentVariant?.color)
    );
    if (matchingVariant) {
      onSelectVariant(matchingVariant.id);
    }
  };

  const handleColorClick = (color: string) => {
    // Find matching variant for this color + current size (if any)
    const currentVariant = variants.find((v) => v.id === selectedVariantId);
    const matchingVariant = variants.find(
      (v) =>
        v.color === color &&
        v.available &&
        (!currentVariant?.size || v.size === currentVariant?.size)
    );
    if (matchingVariant) {
      onSelectVariant(matchingVariant.id);
    }
  };

  const currentVariant = variants.find((v) => v.id === selectedVariantId);

  return (
    <>
      {sizeOptions.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Size</div>
          <div
            className={styles.variantGrid}
            role="radiogroup"
            aria-label="Select size"
          >
            {sizeOptions.map((option) => {
              // If no color is selected yet, all sizes are available (that have a matching variant)
              // If color is selected, only show sizes that match that color
              const isAvailable = variants.some(
                (v) =>
                  v.size === option.value &&
                  v.available &&
                  (!currentVariant?.color || v.color === currentVariant?.color)
              );
              const isSelected = currentVariant?.size === option.value;

              return (
                <button
                  key={option.value}
                  className={`${styles.variantButton} ${
                    isSelected ? styles.active : ''
                  }`}
                  onClick={() => handleSizeClick(option.value)}
                  disabled={!isAvailable}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Size ${option.label}${
                    !isAvailable ? ' - Out of stock' : ''
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {colorOptions.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionLabel}>Color</div>
          <div
            className={styles.variantGrid}
            role="radiogroup"
            aria-label="Select color"
          >
            {colorOptions.map((option) => {
              // If no size is selected yet, all colors are available (that have a matching variant)
              // If size is selected, only show colors that match that size
              const isAvailable = variants.some(
                (v) =>
                  v.color === option.value &&
                  v.available &&
                  (!currentVariant?.size || v.size === currentVariant?.size)
              );
              const isSelected = currentVariant?.color === option.value;

              return (
                <button
                  key={option.value}
                  className={`${styles.variantButton} ${
                    isSelected ? styles.active : ''
                  }`}
                  onClick={() => handleColorClick(option.value)}
                  disabled={!isAvailable}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Color ${option.label}${
                    !isAvailable ? ' - Out of stock' : ''
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default VariantSelector;
