# Tech Stack

## Core
- React 18 (`react`, `react-dom`)
- TypeScript (`typescript`)
- Vite (`vite`, `@vitejs/plugin-react`)

## UI & Styling
- **MUI** (`@mui/material`, `@mui/icons-material`, `@mui/x-data-grid`) - Complex components, theme management
- **Emotion** (`@emotion/react`, `@emotion/styled`) - CSS-in-JS styling for MUI
- **Sass/SCSS** (`sass`) - Global styles and shared component styles

### Styling Approach
The project uses a two-tier styling system:

1. **MUI + Emotion** - For complex, theme-aware components with consistent Material Design
2. **SCSS** - For global styles, shared design tokens, and complex styling scenarios

#### Implementation Details
- Components can accept both `className` and `sx` props when needed
- Global styles are composed in `src/assets/styles/main.scss`
- Theme values from MUI theme are exported in `src/utils/theme.ts` and used across components

#### Example Component Usage
```tsx
<Box className="p-4 text-lg" sx={{ color: 'primary.main' }}>
  Combined MUI sx and SCSS className
</Box>
```

## State & Routing
- Redux Toolkit (`@reduxjs/toolkit`)
- React Redux (`react-redux`)
- React Router (`react-router-dom`)

## API & Networking
- Axios (`axios`)
- Centralized client with auth token interceptor in `src/api/axiosClient.ts`

## Testing
- Jest + Testing Library (`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`)

## Build & Scripts
- `npm start` (dev server)
- `npm run dev` (alias for the dev server)
- `npm run build` (production build)
- `npm run preview` (local production preview)

## Environment
- Vite env files: `.env.development`, `.env.production`
- Required variables: `VITE_API_BASE_URL`, `VITE_APP_ENV_NAME`
