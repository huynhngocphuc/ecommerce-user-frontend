# Data Model

## Entity: AuthenticatedSession
- Fields:
  - `status` (enum: `unknown` | `authenticated` | `unauthenticated`)
  - `isRefreshing` (boolean)
  - `lastVerifiedAt` (ISO datetime string | null)
  - `failureReason` (string | null)
- Relationships:
  - Derived from backend auth routes (`verify`, `profile`, `refresh`, `logout`).
  - Stored in frontend auth Redux slice as authoritative session state.
- Validation rules:
  - `authenticated` status requires successful backend verification.
  - `unauthenticated` status is set on 401 or explicit logout success.
- State transitions:
  - `unknown -> authenticated` on successful startup verify/profile call.
  - `unknown -> unauthenticated` on failed verify/profile call.
  - `authenticated -> unauthenticated` on logout or repeated refresh failure.
  - `authenticated -> authenticated` on successful refresh cycle.

## Entity: SessionCredentialCookie
- Fields:
  - `httpOnly` (boolean, backend-managed)
  - `secure` (boolean, backend-managed)
  - `sameSite` (enum/string, backend-managed)
  - `path` (string, backend-managed)
  - `expiresAt` (datetime | null, backend-managed)
- Relationships:
  - Issued/invalidated by backend login/logout/refresh behavior.
  - Sent by browser automatically on credentialed Axios requests.
- Validation rules:
  - Frontend must not persist or expose raw token values in localStorage.
  - Production requests requiring auth must be sent over HTTPS.
- State transitions:
  - Created/updated after successful login and refresh.
  - Invalidated on logout or session expiration.

## Entity: ApiSecurityPolicy
- Fields:
  - `apiBaseUrl` (string)
  - `protocol` (enum: `https` | `http`)
  - `allowLocalHttp` (boolean)
  - `withCredentials` (boolean)
- Relationships:
  - Applied by shared Axios client to all API modules.
  - Influences acceptance/rejection of outbound authenticated requests.
- Validation rules:
  - In production, `protocol` must be `https`.
  - Local HTTP allowance must be explicitly scoped to local development only.
- State transitions:
  - Evaluated at app startup from environment configuration.
  - Rejects insecure config before authenticated traffic is sent.
