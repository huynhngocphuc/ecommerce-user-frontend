# Repository Structure and Design Patterns

## High-Level Structure

```text
src/
	api/         API client and endpoint wrappers
	assets/      SCSS and static style assets
	components/  Reusable layout and UI components
	context/     Context-related code (currently minimal)
	data/        Static data
	hooks/       Reusable stateful logic via custom hooks
	pages/       Route-level page components
	redux/       Global state slices and store
	services/    Reserved service layer (currently minimal usage)
	utils/       Shared constants, routes, theme, env helpers
```

## Design Patterns Found

### 1) Layered Architecture
- Intent: Separate responsibilities by app layer (UI, state, API, utilities).
- Where used:
	- UI layer: `src/pages/*`, `src/components/*`
	- State layer: `src/redux/*`
	- API/data-access layer: `src/api/*`
	- Utility/config layer: `src/utils/*`
- Evidence: `src/pages/ProductsPage.tsx` consumes `useProducts`, which dispatches Redux async logic, which calls `src/api/productsApi.ts`.

### 2) Provider Pattern (Dependency Injection via React Context)
- Intent: Make cross-cutting services available to the full tree.
- Where used:
	- `src/index.tsx`: `<Provider store={store}>`
	- `src/index.tsx`: `<BrowserRouter>`
	- `src/App.tsx`: `<ThemeProvider theme={appTheme}>`
- Notes: This gives global access to Redux state, router context, and theme tokens.

### 3) Singleton Pattern (Shared Instances)
- Intent: Create one shared instance for global concerns.
- Where used:
	- `src/redux/store.ts`: exported `store` singleton
	- `src/api/axiosClient.ts`: exported Axios instance configured once
- Notes: Ensures consistent middleware/interceptor behavior and single app state store.

### 4) Facade Pattern via Custom Hooks
- Intent: Expose a simpler API over complex Redux or routing internals.
- Where used:
	- `src/hooks/useAuth.ts`: wraps state selection + auth dispatch actions
	- `src/hooks/useProducts.ts`: wraps products state selection + fetch dispatch
	- `src/hooks/useProtectedRoute.ts`: wraps navigation + auth checks
- Notes: Page components consume focused methods instead of low-level store logic.

### 5) Redux Slice Pattern + Unidirectional Data Flow
- Intent: Group state, reducers, and async actions by domain.
- Where used:
	- `src/redux/auth/authSlice.ts`
	- `src/redux/products/productSlice.ts`
	- combined in `src/redux/store.ts`
- Notes: State transitions flow from dispatched actions to reducers to UI re-render.

### 6) Async Command Pattern with `createAsyncThunk`
- Intent: Encapsulate asynchronous workflows as dispatchable commands.
- Where used:
	- `src/redux/auth/authSlice.ts`: `login`, `refreshSession`, `bootstrapSession`, `logoutSession`
	- `src/redux/products/productSlice.ts`: `fetchProducts`
- Notes: Standardized pending/fulfilled/rejected lifecycle simplifies async state handling.

### 7) Service/Repository-Like API Layer
- Intent: Keep HTTP concerns out of UI/state files.
- Where used:
	- `src/api/authApi.ts`
	- `src/api/productsApi.ts`
	- shared transport in `src/api/axiosClient.ts`
- Notes: This centralizes endpoint paths, error conversion, and credential behavior.

### 8) Guard Pattern for Route Protection
- Intent: Enforce auth checks before rendering protected views.
- Where used:
	- `src/App.tsx`: `protectedRouteElement(...)`
	- `src/hooks/useProtectedRoute.ts`: `checkAuthentication(...)`
- Notes: Both route-level and page-level checks are present.

### 9) Observer/Event Pattern
- Intent: React to events without tight coupling.
- Where used:
	- `src/api/axiosClient.ts`: dispatches global `logout` event on 401
	- `src/hooks/useAuth.ts`: subscribes to global `logout` event
	- `src/App.tsx`: listens to `matchMedia(...).addEventListener('change', ...)`
- Notes: Event-based decoupling is used for auth invalidation and system theme changes.

### 10) Factory Pattern for Theme Construction
- Intent: Create object variants from a function based on input mode.
- Where used:
	- `src/utils/theme.ts`: `createAppTheme(mode)`
	- consumed in `src/App.tsx` via `useMemo`
- Notes: Encapsulates MUI theme construction and token mapping.

### 11) Composition Pattern for App Layout
- Intent: Build pages by composing independent UI blocks.
- Where used:
	- `src/App.tsx`: `Header + Routes + Footer` inside a shared shell
	- `src/pages/ProductsPage.tsx`: card grid composed from MUI primitives
- Notes: Encourages reusable building blocks instead of inheritance.

## Summary

The codebase primarily follows a layered React + Redux architecture with strong use of custom-hook facades, thunk-based async commands, and a centralized API client. Route guards, provider-based dependency injection, and event-driven auth/session handling are consistently applied in core flows.