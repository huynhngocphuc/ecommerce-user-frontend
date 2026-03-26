# Quickstart

## Prerequisites
- Node.js 18+
- npm 9+
- Backend auth service with routes:
  - `POST /register`
  - `POST /login`
  - `GET /verify`
  - `GET /profile`
  - `POST /logout`
  - `POST /refresh`

## Install
1. From repository root:
   - `npm install`

## Environment Setup
1. Ensure `.env.development` and `.env.production` define:
   - `REACT_APP_API_BASE_URL`
   - `REACT_APP_ENV_NAME`
2. For production-like runs, set `REACT_APP_API_BASE_URL` to an `https://` endpoint.
3. For local development, if HTTP is used, keep it limited to approved local endpoints only.

## Run Application
1. Start frontend:
   - `npm start`
2. Open:
   - `http://localhost:3000`

## Verification Checklist
1. **Login session storage**
   - Log in with valid credentials.
   - Confirm protected pages are accessible.
   - Confirm no auth token is persisted in `localStorage`.

2. **Credentialed requests**
   - Confirm session-dependent requests succeed without adding manual `Authorization` token from storage.
   - Confirm browser sends cookies for credentialed requests.

3. **HTTPS-only policy**
   - In production configuration, set a non-HTTPS API URL and verify the app blocks authenticated traffic with a clear error.
   - Set HTTPS API URL and verify requests proceed.

4. **Session lifecycle**
   - Refresh app with valid session and confirm user remains authenticated.
   - Simulate expired session and verify user is redirected to login after unauthorized response.
   - Perform logout and verify protected routes are no longer accessible.

## Build & Test
- Build:
  - `npm run build`
- Test:
  - `npm test`

## Implementation Validation Status

- [x] Login session storage check documented (no localStorage token persistence)
- [x] Credentialed cookie request behavior documented
- [x] HTTPS-only policy verification steps documented
- [x] Session lifecycle verification steps documented (verify, refresh fallback, logout)
