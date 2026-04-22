# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

- Node.js 20 or newer
- npm 9 or newer

If you use nvm, run:

```bash
nvm use
```

This repository includes a `.nvmrc` file pinned to Node 20.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Environment Configuration

This project uses Create React App environment files:

- `.env.development` for `npm start`
- `.env.production` for `npm run build`

Required variables:

- `REACT_APP_API_BASE_URL`
- `REACT_APP_ENV_NAME`

Environment values are read via [src/utils/env.ts](src/utils/env.ts).

## Auth Session Migration Notes

- Frontend auth no longer stores access tokens in `localStorage`.
- Session state is derived from backend session routes and browser-managed cookies.
- Auth API contract routes used by the frontend:
	- `POST /register`
	- `POST /login`
	- `GET /verify`
	- `GET /profile`
	- `POST /logout`
	- `POST /refresh`
- Axios is configured with credentialed requests (`withCredentials: true`).
- Production/non-local API configuration requires HTTPS; insecure API base URLs are blocked.

## Header Feature Notes

- Header now supports desktop and mobile layouts with a sticky top position.
- Desktop navigation includes: Home, Shop, New Arrivals, Sale.
- Mobile navigation switches to a hamburger drawer for viewports below 768px.
- Right-side actions include Search, Cart (with quantity badge), and User Account.
- Cart badge is reactive to Redux cart state, hides at zero, and displays `99+` for overflow.
- Hover interactions are subtle on desktop and suppressed for coarse pointer/touch devices.

## Product Listing Feature Notes (004-refactor-product-grid)

### Overview

The product listing page (`/products`) features a modern e-commerce interface with:
- **Stable CSS Grid layout** with responsive column counts (4 desktop, 3 tablet target/2 fallback, 2 mobile)
- **Canonical 4:5 product media frames** with `object-fit: cover` preventing image distortion
- **Sticky desktop filter sidebar** (240-280px) with independent scroll and size/color/price filters
- **Mobile filter overlay panel** (bottom-sheet) that is dismissible via close button and backdrop
- **Client-side filter pipeline** for real-time product filtering by price range
- **Responsive image delivery** using modern formats (AVIF/WebP) with JPEG/PNG fallback
- **Hover interaction polish** with subtle media zoom (1.05x) and soft elevation (≤ 300ms transition)
- **Accessibility-first** with reduced-motion support and lazy-loading image hints

### Layout Architecture

**Desktop (≥ 1024px):**
- Two-region layout: sticky filter sidebar + product grid region
- Sidebar is 240-280px wide, sticky in viewport
- Grid enforces 4 columns strict alignment
- Container max-width 1200-1320px, centered

**Tablet (768-1023px):**
- Single column layout (sidebar hidden)
- Filter control button above grid (opens overlay)
- Grid targets 3 columns with fallback to 2 when width insufficient
- Overlay filter panel (max-height 80vh) dismissible

**Mobile (< 768px):**
- Single column layout (sidebar hidden)
- Filter control button above grid
- Grid fixed to 2 columns
- Overlay filter panel (max-height 90vh) dismissible
- Tighter column gap (12px vs 16px desktop) for space efficiency

### Product Card Structure

**Content Order:** Media → Product Name → Price → Category Badge (optional)
- Media frame: 4:5 aspect ratio, `object-fit: cover`, 8-12px border radius
- Name: Clamped to 2 lines with ellipsis
- Price: Always visible, formatted with `$` and two decimal places
- Category: Optional metadata displayed above price in muted text

### Filter Integration

**Components:**
- `FilterSidebar.tsx`: Desktop sticky sidebar with checkboxes and price range slider
- `MobileFilterPanel.tsx`: Mobile/tablet bottom-sheet overlay with same controls
- `useProductFilters.ts`: Hook providing state (selectedSizes, selectedColors, priceRange, isMobilePanelOpen)

**Filter Groups:**
- Size: XS, S, M, L, XL, XXL (UI-ready, requires backend Product schema update)
- Color: Black, White, Red, Blue, Green, Navy (UI-ready, requires backend Product schema update)
- Price: Range slider $0-$500 with $10 step increment

**Filtering Pipeline:**
- Client-side real-time filtering in ProductsPage.tsx useMemo
- Currently supports price range filtering (min/max bounds)
- Size/color filters are UI-complete but require backend Product type extension
- Empty state displays "No products match your filters" when no results

### Image Optimization

**Format Strategy:**
- Picture element prioritizes AVIF → WebP → JPEG/PNG fallback
- Responsive widths via srcset (1x at 200px, 2x at 400px)
- Lazy loading (loading="lazy") and async decoding (decoding="async")

**Implementation:**
- Backend must support format conversion via query parameters: `?format=avif&w=200`
- Fallback to original imageUrl if format conversion not supported
- No broken image state; placeholder "No Image" renders when missing

**Note:** Future enhancement may replace parameter-based conversion with explicit multi-source image URLs if backend format conversion service is unavailable.

### Performance Targets

- **CLS (Cumulative Layout Shift):** ≤ 0.05 on initial load
- **Hover transitions:** ≤ 300ms for smooth 60fps animation
- **Image load:** Lazy loading defers off-screen images until near-viewport
- **Reduced motion:** Safe-mode transition fallback for users with prefers-reduced-motion enabled

### Accessibility Features

- **Reduced motion support:** Scale transitions reduced (1.05 → 1.02) and shadow softened when prefers-reduced-motion: reduce
- **Keyboard navigation:** Cards are clickable via enter/space (native link semantics)
- **Alt text:** Product name used as alt text for all images
- **Semantic HTML:** Proper heading hierarchy and link markup

### State Management

**Redux Preservation:**
- Product fetching via existing `useProducts()` hook (unchanged)
- Product data structure preserved (Product type in redux/products/type.ts)
- Cart state preserved (independent from listing refactor)

**Local Filter State:**
- `useProductFilters()` hook manages client-side filter UI state
- Filter state is ephemeral (reset on page reload)
- Ready for future integration with URL query parameters or backend filtering API

### Validation & Testing

See [specs/004-refactor-product-grid/quickstart.md](specs/004-refactor-product-grid/quickstart.md) for:
- Complete manual validation checklist (layout, cards, interactions, images, build)
- Responsive design validation steps per viewport
- Performance measurement procedures
- Regression checks against existing functionality


------------------Speckit--------------------
/speckit.specify
/speckit.plan
/speckit.tasks
/speckit.implement
