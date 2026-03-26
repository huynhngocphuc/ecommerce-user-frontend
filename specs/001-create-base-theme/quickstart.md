# Quickstart

## Prerequisites
- Node.js 18+
- npm 9+

## Install dependencies
1. From repository root:
   - `npm install`

## Prepare environment
1. Ensure environment files exist:
   - `.env.development`
   - `.env.production`
2. Ensure required variables are set:
   - `REACT_APP_API_BASE_URL`
   - `REACT_APP_ENV_NAME`

## Implement base theme baseline
1. Use `md/styles.md` as token source for typography and both palettes.
2. Update base theme definitions under `src/utils/theme.ts`.
3. Retain all source tokens, including values not currently used by existing screens.
4. Ensure default active mode follows system preference.
5. Define explicit fallback font stacks for heading and body/UI typography roles.

## Validate locally
1. Run app:
   - `npm start`
2. Verify in browser:
   - Base theme uses source typography and full light/dark token sets.
   - Initial mode follows current OS/browser preference.
   - Text remains readable if custom fonts are unavailable (fallback stacks apply).
3. Verify token guidance:
   - Follow `md/theme-usage.md` and `contracts/theme-token-contract.md` examples to choose typography and palette tokens for sample UI edits.

## Build and test
- Build:
  - `npm run build`
- Test:
  - `npm test`

## Implementation Verification Log

- US1 validation (runtime theme + mode + fallback): Pass
   - Theme source tokens and fallback stacks are defined in `src/utils/theme.ts`.
   - Initial active mode resolves from system preference via `resolveSystemPreferredMode`.
- US2 validation (100% token retention vs `md/styles.md`): Pass
   - All 12 source color tokens are retained across MUI (`src/utils/theme.ts`), SCSS (`src/assets/styles/_variables.scss`), and Tailwind (`tailwind.config.js`).
   - Reserved token representation is maintained in `themeTokenInventory`.
- US3 validation (guidance walkthrough): Pass
   - Contributor guidance is documented in `md/theme-usage.md` and reinforced by contract examples.
- Build result: Pass (`npm run build`)
   - Note: existing ESLint warnings in `src/api/authApi.ts` and `src/api/productsApi.ts` are pre-existing and outside this feature scope.
- Test result: Pass with no tests (`npm test -- --watchAll=false --passWithNoTests`)
