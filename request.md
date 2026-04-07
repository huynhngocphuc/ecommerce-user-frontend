Refactor the existing product listing page of the clothing e-commerce system to achieve a clean, consistent, and modern e-commerce UI.

## Overall Layout
- Max container width: 1200–1320px (centered)
- Layout structure:
  - Left sidebar for filters
  - Right section for product grid

## Sidebar (Filters)
- Fixed width: 240–280px
- Contains filters:
  - Size
  - Color
  - Price range
- Should support independent vertical scrolling if content overflows

## Product Grid
- Occupies the remaining width (~75–80%)
- Use a clean and consistent grid layout with even spacing
- Strong alignment between rows and columns (no shifting)

### Responsive Behavior
- Desktop: 4 columns
- Tablet: 2–3 columns
- Mobile: 2 columns

- Prefer CSS Grid over Flexbox for precise alignment

## Product Card

### Card Dimensions
- Width: 280–320px
- Height: auto (based on content)

### Product Image (CRITICAL REQUIREMENT)
- Must maintain a consistent aspect ratio across all products:
  - 1:1 (square) OR 4:5 (portrait)
- Recommended dimensions:
  - ~300x300 (1:1)
  - ~320x400 (4:5)
- Must NOT distort or stretch
- Must NOT break or shift the layout
- Use:
  - object-fit: cover
  - fixed aspect ratio container
- Border radius: 8–12px

### Card Content Layout
- Image at the top (dominant area)
- Below image:
  - Product name (max 2 lines, truncated if needed)
  - Price
- Maintain clear spacing and visual hierarchy

## Visual Design
- Minimal UI (clean, whitespace-focused, low noise)
- Visual-first approach (images are the primary focus)
- Ensure all product cards align perfectly regardless of content differences

## Interaction
- Subtle hover effects:
  - Slight image zoom
  - Soft shadow elevation
- Smooth transitions (200–300ms)
- Avoid heavy or distracting animations

## Technical Requirements
- Enforce consistent image aspect ratios to prevent layout shift
- Ensure grid stability even with inconsistent product data
- Use responsive image techniques (e.g. srcset, optimized formats like WebP/AVIF)
- Optimize for performance and fast loading

## Goal
- Match modern e-commerce UI standards (similar to Zara / Uniqlo)
- Prioritize product imagery, clarity, and easy browsing
- Ensure a stable, visually consistent product grid