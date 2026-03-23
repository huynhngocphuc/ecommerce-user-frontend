# Quickstart

## Prerequisites
- Node.js 18+ (recommended)
- npm 9+

## Install
1. From repository root:
   - `npm install`

## Environment setup
1. Ensure the following files/values exist:
   - `.env.development`
   - `.env.production`
2. Required variables:
   - `REACT_APP_API_BASE_URL`
   - `REACT_APP_ENV_NAME`

## Run locally
1. Start development server:
   - `npm start`
2. Open:
   - `http://localhost:3000`

## Build
- `npm run build`

## Test
- `npm test`

## Tailwind usage check
- Tailwind is configured globally in `src/assets/styles/main.scss`.
- Add any utility class (example: `className="p-4"`) in a component to validate class generation and remove the no-utilities warning.
