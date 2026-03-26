# Auth Session Contract (Frontend ↔ Backend)

## Scope
Defines expected authentication/session behaviors consumed by the frontend for cookie-based auth with HTTPS-only production transport.

## Source-of-Truth Alignment
- Backend routes provided for this feature are treated as canonical:
  - `POST /register`
  - `POST /login`
  - `GET /verify`
  - `GET /profile`
  - `POST /logout`
  - `POST /refresh`
- Frontend route constants and auth API methods must stay aligned with these endpoint paths.

## Transport & Credentials
- Base URL source: `REACT_APP_API_BASE_URL`
- Frontend requests must send credentials (cookies) for session-aware endpoints.
- Production API base URL must use HTTPS.
- Local development HTTP usage is permitted only for explicitly approved local endpoints.
- Frontend must reject invalid or insecure non-local API base URLs before making authenticated calls.

## Authentication Endpoints

### Register
- Method: `POST`
- Path: `/register`
- Request body:
  - `email` (string, required)
  - `password` (string, required)
  - additional profile fields per backend implementation
- Success response:
  - user registration success payload (shape defined by backend)
- Failure response:
  - `message` (string)

### Login
- Method: `POST`
- Path: `/login`
- Request body:
  - `email` (string, required)
  - `password` (string, required)
- Success response:
  - authenticated user payload (if provided)
  - backend sets secure session cookie via `Set-Cookie`
- Failure response:
  - `message` (string)

### Verify Session
- Method: `GET`
- Path: `/verify`
- Behavior:
  - Requires valid auth middleware/session.
  - Returns 200 when session is valid.
- Success response:
  - success marker payload (backend-defined)
- Failure response:
  - `401 Unauthorized` when session is invalid/expired.

### Profile
- Method: `GET`
- Path: `/profile`
- Behavior:
  - Requires valid auth middleware/session.
- Success response:
  - authenticated user profile object
- Failure response:
  - `401 Unauthorized` when session is invalid/expired.

### Logout
- Method: `POST`
- Path: `/logout`
- Behavior:
  - Invalidates active server-side session and clears cookie.
- Success response:
  - logout success payload (backend-defined)
- Failure response:
  - `message` (string)

### Refresh Token/Session
- Method: `POST`
- Path: `/refresh`
- Behavior:
  - Attempts session renewal; may issue updated cookie.
- Success response:
  - renewal success payload (backend-defined)
- Failure response:
  - `401 Unauthorized` or backend error payload

## Client Behavior Contract
- Frontend must not store authentication token in localStorage/sessionStorage.
- Frontend must not require direct cookie/token inspection to determine auth state.
- Frontend determines auth state via `verify`/`profile` and unauthorized handling.
- On `401` for protected requests, frontend transitions to unauthenticated state and requires re-login.

## Error Contract
- Non-2xx responses should include:
  - `message` (string)
- Optional:
  - `code` (string/number)
  - `details` (object/array)

## Compatibility Notes
- Existing user-visible auth flows (register, login, protected navigation, logout) remain intact.
- Migration impact is internal to credential transport/storage and session-state derivation.
