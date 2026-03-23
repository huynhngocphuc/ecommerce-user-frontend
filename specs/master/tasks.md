# Implementation Tasks: Repository Tech & Structure Alignment

**Generated**: 2026-03-23  
**Feature**: Repository Tech & Structure Alignment  
**Base Spec**: `specs/master/spec.md`

---

## Phase 0: Verification & Prerequisites

### Pre-flight checks to ensure all dependencies are in place before implementation

- [X] T001 [P] Verify Node.js and npm versions meet minimum requirements (Node 18+, npm 9+) in `package.json` engines field
- [X] T002 [P] Verify `.env.development` and `.env.production` files exist with `REACT_APP_API_BASE_URL` and `REACT_APP_ENV_NAME` variables in `src/utils/env.ts` reference
- [X] T003 [P] Verify `tsconfig.json` is properly configured for React 18 + TypeScript 4.9 in root directory
- [X] T004 [P] Verify `react-scripts` and CRA dependencies are present in `package.json`
- [X] T005 [P] Verify Jest + Testing Library are available via CRA configuration in `package.json` devDependencies

---

## Phase 1: Core Setup (US1)

### Establish the foundational project configuration, build system, and testing infrastructure

- [X] T006 [US1] Create/verify `.env.development` template in root with required vars: `REACT_APP_API_BASE_URL`, `REACT_APP_ENV_NAME`
- [X] T007 [US1] Create/verify `.env.production` template in root with required vars: `REACT_APP_API_BASE_URL`, `REACT_APP_ENV_NAME`
- [X] T008 [US1] Verify `tsconfig.json` at root has `"jsx": "react-jsx"` and proper module resolution for `src/` paths
- [X] T009 [US1] Verify `package.json` scripts include `start`, `build`, `test`, and `eject` with correct entry points
- [X] T010 [US1] Verify `public/index.html` references correct React root div and favicon paths
- [X] T011 [P] [US1] Verify `src/index.tsx` correctly imports React 18 client render and mounts `<App />` to root element
- [X] T012 [P] [US1] Verify `src/App.tsx` imports and renders Redux provider and router contexts
- [X] T013 [US1] Verify `build/` directory contains latest production build from `npm run build`
- [X] T014 [US1] Create/verify `.gitignore` excludes `node_modules/`, `build/`, `.env.development.local`, `.env.production.local`
- [X] T015 [US1] Test `npm install` completes without errors and produces valid `package-lock.json`
- [X] T016 [US1] Test `npm start` launches dev server on port 3000 without TypeScript or syntax errors

---

## Phase 2: API Integration (US2)

### Document API contracts and configure the Axios client for authenticated requests to backend services

- [X] T017 [US2] Verify `specs/master/contracts/frontend-api-contract.md` documents all backend endpoints (auth login, products list, etc.) with methods, paths, request contracts, success/error responses
- [X] T018 [P] [US2] Verify `src/utils/env.ts` exports `getApiBaseUrl()` function that reads and validates `REACT_APP_API_BASE_URL`
- [X] T019 [P] [US2] Verify `src/api/axiosClient.ts` creates and exports Axios instance with baseURL from `getApiBaseUrl()`
- [X] T020 [P] [US2] Verify `src/api/axiosClient.ts` interceptor reads token from `localStorage.token` and injects `Authorization: Bearer <token>` header when present
- [X] T021 [P] [US2] Verify `src/api/axiosClient.ts` interceptor handles 401 responses by clearing token and triggering logout (integration point with auth slice)
- [X] T022 [US2] Create/verify `src/api/authApi.ts` exports `login(email, password)` function that POSTs to `/auth/login` and returns `{ token, user }`
- [X] T023 [US2] Create/verify `src/api/productsApi.ts` exports `getProducts(query?)` function that GETs `/products` with optional pagination/filtering and returns `{ items: [], total }`
- [X] T024 [US2] Create/verify response data mapping in `authApi.ts` and `productsApi.ts` match UserSession and Product entities from `specs/master/data-model.md`
- [X] T025 [US2] Verify Axios error handling in API modules captures and returns error messages/codes for display in UI error boundaries
- [X] T026 [US2] Test `npm test -- authApi.test.ts` validates API functions construct correct requests with auth headers (mock Axios)

---

## Phase 3: State Management (US3)

### Configure Redux store, create slices for authentication and products, and connect to components

- [X] T027 [US3] Verify `src/redux/store.ts` imports Redux Toolkit `configureStore` and creates store with `authSlice.reducer` and `productSlice.reducer`
- [X] T028 [P] [US3] Verify `src/redux/auth/type.ts` exports types: `AuthState`, `UserSession`, `AuthSlice` matching data-model UserSession entity
- [X] T029 [P] [US3] Verify `src/redux/products/type.ts` exports types: `ProductsState`, `Product`, `ProductSlice` matching data-model Product entity
- [X] T030 [US3] Create/verify `src/redux/auth/authSlice.ts` exports slice with actions: `loginStart`, `loginSuccess`, `loginFailure`, `logout`, `setToken`
- [X] T031 [US3] Verify `authSlice.ts` reducer correctly transitions state through `authenticating -> authenticated` on success or `authenticating -> unauthenticated` on failure
- [X] T032 [US3] Verify `authSlice.ts` persists token to `localStorage` on `loginSuccess` in extra reducer or middleware
- [X] T033 [US3] Create/verify `src/redux/products/productSlice.ts` exports slice with actions: `fetchStart`, `fetchSuccess`, `fetchFailure`
- [X] T034 [US3] Verify `productSlice.ts` reducer manages `loading`, `items`, `error`, `total` fields from API response
- [X] T035 [US3] Verify Redux store exports `RootState`, `AppDispatch` types for use in selectors and hooks
- [X] T036 [P] [US3] Create/verify `src/hooks/useAuth.ts` custom hook returns auth state and `login()`/`logout()` dispatch actions
- [X] T037 [P] [US3] Create/verify `src/hooks/useProducts.ts` custom hook returns products state and `fetchProducts()` dispatch action
- [X] T038 [US3] Verify `src/App.tsx` wraps app with `<Provider store={store}>` from React Redux
- [X] T039 [US3] Test `npm test -- authSlice.test.ts` validates slice reducers transition state correctly
- [X] T040 [US3] Test `npm test -- productSlice.test.ts` validates slice reducers manage loading/error states

---

## Phase 4: Styling System (US4)

### Integrate Tailwind CSS with existing MUI/SCSS, document conventions, and validate no conflicts

- [X] T041 [US4] Verify `tailwind.config.js` at root is configured with content scanning `src/**/*.{js,jsx,ts,tsx}` and `public/index.html`
- [X] T042 [US4] Verify Tailwind v3 is listed in `package.json` dependencies
- [X] T043 [P] [US4] Verify `src/assets/styles/main.scss` imports `tailwindcss/base`, `tailwindcss/components`, `tailwindcss/utilities` at appropriate layer positions
- [X] T044 [P] [US4] Verify `src/assets/styles/main.scss` is imported early in `src/index.tsx` before component renders
- [X] T045 [US4] Verify `src/components/layout/` and `src/components/ui/` components can accept both `className` (Tailwind utilities) and `sx` (MUI) props without conflicts
- [X] T046 [US4] Create/verify `src/utils/theme.ts` exports Tailwind config values and color palette for consistent usage across MUI theme provider
- [X] T047 [US4] Document in `TECH_STACK.md` the dual-styling approach: MUI for complex components, Tailwind for rapid utility styling, SCSS for global/shared styles
- [X] T048 [US4] Add Tailwind utility class (e.g., `p-4 text-lg`) to one test component in `src/components/ui/` and verify class is generated in dev build CSS
- [X] T049 [US4] Verify `tailwind.config.js` has `corePlugins.preflight` set appropriately to avoid conflicts with MUI base styles
- [X] T050 [US4] Test `npm start` and inspect CSS bundle confirms Tailwind utilities are present and accessible in DevTools

---

## Phase 5: Routing & Navigation (US5)

### Configure React Router, define application routes, and create navigation components

- [X] T051 [P] [US5] Verify `react-router-dom` is in `package.json` dependencies
- [X] T052 [P] [US5] Create/verify route definitions in `src/utils/routes.tsx` or `src/config/routes.ts` exporting route path constants (e.g., `ROUTE.HOME`, `ROUTE.LOGIN`, `ROUTE.PRODUCTS`)
- [X] T053 [US5] Create/verify `src/pages/LoginPage.tsx` component that dispatches `login(email, password)` from `useAuth()` and navigates on success
- [X] T054 [US5] Create/verify `src/pages/ProductsPage.tsx` component that fetches and lists products using `useProducts()` hook
- [X] T055 [US5] Create/verify `src/pages/ProductDetailPage.tsx` component that fetches single product by id and displays details
- [X] T056 [US5] Create/verify `src/pages/HomePage.tsx` as landing page with navigation to products or dashboard
- [X] T057 [US5] Create/verify `src/components/layout/Header.tsx` navigation component with logout button and user profile display (from auth state)
- [X] T058 [US5] Create/verify `src/components/layout/Sidebar.tsx` or drawer component for navigation links (optional, based on design)
- [X] T059 [US5] Verify `src/App.tsx` uses `<BrowserRouter>` and `<Routes>` to render page components based on current route
- [X] T060 [US5] Verify protected routes (products, dashboard) check `useAuth().isAuthenticated` and redirect to login if not authenticated
- [X] T061 [US5] Create route protection middleware/hook in `src/hooks/useProtectedRoute.ts` to enforce auth before rendering pages
- [X] T062 [US5] Test `npm start` and manually navigate between login, products, and home pages without console errors
- [X] T063 [US5] Test browser back/forward buttons correctly navigate between routes without losing auth state

---

## Phase 6: Integration & Validation

### End-to-end testing, documentation consistency, and performance validation

- [X] T064 [P] [US5] Test `npm test` runs all unit tests in `**/*.test.ts` and `**/*.test.tsx` without failures
- [X] T065 [P] [US5] Test `npm run build` produces optimized production bundle in `build/` directory
- [X] T066 [US5] Verify `build/index.html` is correctly configured and `build/static/` contains minified CSS/JS
- [X] T067 [US5] Run production build locally via `serve -s build` and validate app works with static serving
- [X] T068 [P] Verify all documentation files in `specs/master/` are up-to-date:
  - `spec.md` reflects final feature scope
  - `plan.md` reflects actual implementation path taken
  - `research.md` reflects all technical decisions made
  - `data-model.md` reflects actual entity implementations
  - `contracts/frontend-api-contract.md` reflects actual API integration
  - `quickstart.md` provides accurate local dev instructions
- [X] T069 [P] Run `npm start` with dev tools open and verify:
  - Redux dev tools show auth and products state updates
  - Network tab shows successful API requests with auth headers
  - Console shows no warnings or TypeScript errors
- [X] T070 Verify `struct.md` is still accurate and reflects actual src/ directory organization
- [X] T071 Verify `TECH_STACK.md` lists all installed and used dependencies correctly
- [X] T072 [P] Document any deviations from `spec.md` requirements in `specs/master/IMPLEMENTATION_NOTES.md` if needed
- [X] T073 [P] Create/update `specs/master/VALIDATION_CHECKLIST.md` with pass/fail status for each requirement
- [X] T074 Perform final walkthrough of quickstart steps (`npm install`, `.env` setup, `npm start`) and confirm all work
- [X] T075 Archive completed `specs/master/` directory as a reference snapshot (optional, for historical tracking)

---

## Legend

- **[P]**: Task is parallelizable; can be executed in parallel with other **[P]** tasks in the same phase
- **[USN]**: Task belongs to User Story N (US1=Core Setup, US2=API Integration, US3=State Management, US4=Styling, US5=Routing)
- **Dependency**: Each phase depends on prior phases; tasks within a phase with **[P]** can run in parallel; tasks without **[P]** are sequential

---

## Quick Statistics

- **Total Tasks**: 75
- **Parallelizable**: 26 tasks (35%)
- **Sequential**: 49 tasks (65%)
- **By Phase**:
  - Phase 0: 5 tasks
  - Phase 1: 11 tasks
  - Phase 2: 10 tasks
  - Phase 3: 14 tasks
  - Phase 4: 10 tasks
  - Phase 5: 13 tasks
  - Phase 6: 12 tasks

---

## Execution Notes

1. **Prerequisites First**: Complete all Phase 0 tasks before proceeding to Phase 1.
2. **Parallel Execution**: Within each phase, tasks marked **[P]** can be executed in parallel to reduce overall timeline.
3. **Sequential Flow**: Tasks without **[P]** must be done in order within their phase due to dependencies.
4. **Cross-Phase Dependencies**: Each phase builds on prior phases; do not skip phases.
5. **Validation Checkpoints**: After each phase, run `npm test` and `npm start` to validate the phase before proceeding.
6. **Documentation Tracking**: Update `IMPLEMENTATION_NOTES.md` if any tasks are modified or skipped.

