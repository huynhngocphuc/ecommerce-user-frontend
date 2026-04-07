// Product Listing Page Constants
// Layout constraints, breakpoints, and configuration values
// Location: src/pages/products.constants.ts

/**
 * Sidebar dimensions (desktop only)
 */
export const SIDEBAR_DIMENSIONS = {
  MIN_WIDTH_PX: 240,
  MAX_WIDTH_PX: 280,
};

/**
 * Grid container constraints
 */
export const GRID_CONTAINER = {
  MIN_WIDTH_PX: 1200,
  MAX_WIDTH_PX: 1320,
  PADDING_PX: 16,
  GAP_PX: 16,
};

/**
 * Responsive breakpoints (pixels)
 * Must align with SCSS breakpoints in src/assets/styles/products-page.scss
 */
export const BREAKPOINTS = {
  MOBILE_MIN: 0,
  TABLET_MIN: 768,
  DESKTOP_MIN: 1024,
};

/**
 * Grid column counts per breakpoint
 * Aligns with LayoutBreakpointState in data-model.md
 */
export const GRID_COLUMNS = {
  DESKTOP: 4,
  TABLET_TARGET: 3,
  TABLET_FALLBACK: 2,
  MOBILE: 2,
};

/**
 * Product card sizing
 */
export const PRODUCT_CARD = {
  ASPECT_RATIO: '4:5',
  ASPECT_RATIO_NUMBER: 1.25, // 5/4
  BORDER_RADIUS_MIN_PX: 8,
  BORDER_RADIUS_MAX_PX: 12,
  NAME_CLAMP_LINES: 2,
};

/**
 * Media frame configuration
 * Aligns with ProductMediaFrame in data-model.md
 */
export const MEDIA_FRAME = {
  ASPECT_RATIO: '4:5' as const,
  OBJECT_FIT: 'cover' as const,
  BORDER_RADIUS_PX: 8,
  SOURCE_SET_POLICY: 'avif-webp-fallback' as const,
};

/**
 * Interaction timings and transitions
 */
export const INTERACTION = {
  HOVER_TRANSITION_MS: 300,
  FILTER_PANEL_ANIMATION_MS: 300,
  REDUCED_MOTION_DETECT: '(prefers-reduced-motion: reduce)',
};

/**
 * Filter panel configuration
 */
export const FILTER_PANEL = {
  MOBILE_MAX_HEIGHT_PERCENT: 80, // of viewport height
  MOBILE_BORDER_RADIUS_PX: 16,
  BACKDROP_Z_INDEX: 99,
  PANEL_Z_INDEX: 100,
};

/**
 * Responsive image source set policy
 * Prioritizes modern formats with fallback support
 */
export const IMAGE_SOURCE_POLICY = {
  FORMATS: ['avif', 'webp', 'jpeg', 'png'],
  PREFERRED_MIMES: ['image/avif', 'image/webp'],
  FALLBACK_MIME: 'image/jpeg',
};

/**
 * Utility: Get current grid columns based on viewport width
 * @param viewportWidthPx Viewport width in pixels
 * @returns Number of grid columns to display
 */
export function getGridColumnsForViewport(viewportWidthPx: number): number {
  if (viewportWidthPx >= BREAKPOINTS.DESKTOP_MIN) {
    return GRID_COLUMNS.DESKTOP;
  }
  if (viewportWidthPx >= BREAKPOINTS.TABLET_MIN) {
    // For tablet, try 3 columns but fallback to 2 if space is tight
    // This logic is handled by CSS media queries, but this function
    // can be used for initial render or server-side layout decisions
    return GRID_COLUMNS.TABLET_TARGET;
  }
  return GRID_COLUMNS.MOBILE;
}

/**
 * Utility: Determine if viewport is a specific size
 */
export const getViewportClass = (viewportWidthPx: number) => {
  if (viewportWidthPx >= BREAKPOINTS.DESKTOP_MIN) return 'desktop';
  if (viewportWidthPx >= BREAKPOINTS.TABLET_MIN) return 'tablet';
  return 'mobile';
};
