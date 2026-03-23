# Tech Stack

## Core
- React 18 (`react`, `react-dom`)
- TypeScript (`typescript`)
- Create React App (`react-scripts`)

## UI & Styling
- **MUI** (`@mui/material`, `@mui/icons-material`, `@mui/x-data-grid`) - Complex components, theme management
- **Emotion** (`@emotion/react`, `@emotion/styled`) - CSS-in-JS styling for MUI
- **Tailwind CSS** (`tailwindcss`) - Utility-based rapid styling and responsive design
- **Sass/SCSS** (`sass`) - Global styles and shared component styles

### Dual-Styling Approach
The project uses a three-tier styling system:

1. **MUI + Emotion** - For complex, theme-aware components with consistent Material Design
2. **Tailwind CSS** - For rapid utility-based styling, responsive layouts, and one-off customizations
3. **SCSS** - For global styles, shared design tokens, and complex styling scenarios

#### Implementation Details
- Tailwind preflight is **disabled** (`corePlugins.preflight: false`) to avoid conflicts with MUI base styles
- Components can accept both `className` (Tailwind) and `sx` (MUI) props simultaneously
- Global styles import Tailwind layers in `src/assets/styles/main.scss`
- Color palette values are mirrored in `tailwind.config.js` for consistency
- Theme values from MUI theme are exported in `src/utils/theme.ts` and used across components

#### Example Component Usage
```tsx
<Box className="p-4 text-lg" sx={{ color: 'primary.main' }}>
  Combined MUI sx and Tailwind className
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
- `npm run build` (production build)
- `npm test` (test runner)
- `npm run eject` (CRA eject)

## Environment
- CRA env files: `.env.development`, `.env.production`
- Required variables: `REACT_APP_API_BASE_URL`, `REACT_APP_ENV_NAME`
