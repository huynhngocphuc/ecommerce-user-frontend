# ProductModal Component

A premium, accessible product modal for fashion ecommerce. Displays product images with thumbnail gallery, variant selectors (size/color), and Add to Cart CTA with a subtle pointer-based zoom effect on the main image.

## Props

```typescript
type Props = {
  open: boolean                           // Modal visibility state
  product: Product                        // Product object with images & variants
  initialVariantId?: string               // Optional preselected variant
  onClose: () => void                     // Called when modal is dismissed
  onAddToCart?: (variantId: string, quantity: number) => Promise<void> | void  // Optional callback; uses Redux dispatch if not provided
}

type Product = {
  id: string
  title: string
  shortDescription?: string
  price: number
  images: Image[]
  variants?: Variant[]
}

type Image = { id: string; url: string; altText?: string; isPrimary?: boolean }
type Variant = { id: string; size?: string; color?: string; priceOverride?: number | null; stockStatus?: string }
```

## Features

- **Responsive Layout**: Two-column desktop (gallery left, info right); stacked mobile layout.
- **Thumbnail Gallery**: Main image with keyboard-navigable thumbnails below.
- **Pointer Zoom**: On hover, main image scales slightly with transform-origin following cursor; uses requestAnimationFrame for performance.
- **Variant Selectors**: Button-based size and color selection with disabled states for out-of-stock variants.
- **Add to Cart**: Primary CTA; integrates with existing Redux `useProducts()` hook or custom callback.
- **Accessibility**: 
  - Focus trap inside modal
  - ESC to close, overlay click to close
  - `role="dialog"`, `aria-modal="true"`, ARIA labels for all controls
  - Keyboard navigation for thumbnails (Arrow Left/Right)
  - Focus restoration on close
  - ARIA live region announcements for add-to-cart
- **Performance**: Lazy-loaded thumbnails, CSS transforms for zoom, optimized animations.

## Usage

```tsx
import { useState } from 'react'
import ProductModal from '@/components/product-modal'

export function ProductCard({ product }) {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setOpen(true)}>View Details</button>
      <ProductModal
        open={open}
        product={product}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
```

## Styling

- Uses SCSS modules (`styles.module.scss`)
- Follows 8px spacing system
- Dark theme: `#111` for text, `#fff` backgrounds, `#ddd` borders
- Rounded corners: 16px for modal, 12px for images, 8px for buttons
- Soft shadow: `0 20px 40px rgba(0,0,0,0.15)`
- Typography: Modern font (Inter/Poppins), weights 600–700 for hierarchy

## Subcomponents

- **VariantSelector**: Button-based size/color selector with `role="radiogroup"`
- **Gallery**: Main image + thumbnails with thumbnail lazy-loading
- **ProductModal**: Main container, state management, overlay, focus trap

## Testing

- **Unit Tests**: `__tests__/product-modal.test.tsx` — thumbnail navigation, variant selection, add-to-cart
- **Accessibility Tests**: Keyboard navigation (Tab, Shift+Tab, ESC, Arrow keys), focus trap, screen reader announcements
- **Manual QA**: Cross-browser (Chrome, Firefox, Safari), mobile viewports, pointer interactions

## Performance Notes

- Images use `loading="lazy"` for thumbnails; main image eagerly loaded
- CSS transforms for zoom (composited, no layout reflow)
- rAF batching for `pointerMove` transform-origin updates
- Modal does not render when `open={false}`

## Accessibility Checklist

- [x] Focus trap (Tab cycles through focusable elements)
- [x] ESC to close (restores focus to trigger)
- [x] Overlay click to close
- [x] `role="dialog"`, `aria-modal="true"`
- [x] Keyboard navigation for thumbnails (Arrow Left/Right)
- [x] ARIA live region for add-to-cart announcements
- [x] Visible focus indicators on all buttons and thumbnails
- [x] Out-of-stock variants disabled and announced
- [x] Alt text on all images

## Future Enhancements

- Add Framer Motion for subtle enter/exit animations (optional)
- Swipe gesture support for mobile thumbnail navigation
- Product size/fit guide in Additional Info section
- Video support in gallery
