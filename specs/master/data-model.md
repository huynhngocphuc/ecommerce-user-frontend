# Data Model

## Entity: UserSession
- Fields:
  - `token` (string, required while authenticated)
  - `isAuthenticated` (boolean)
  - `userProfile` (object | null)
- Relationships:
  - Used by `auth` redux slice and API authorization header injection.
- Validation rules:
  - Token must be present to send `Authorization: Bearer <token>` header.
  - Invalid/expired token transitions user to unauthenticated state.
- State transitions:
  - `unauthenticated -> authenticating -> authenticated`
  - `authenticated -> unauthenticated` on logout or auth failure.

## Entity: Product
- Fields:
  - `id` (string or number, unique)
  - `name` (string)
  - `price` (number)
  - `description` (string, optional)
  - `imageUrl` (string, optional)
  - `category` (string, optional)
- Relationships:
  - Managed by `products` redux slice.
  - Retrieved via `productsApi` from backend endpoints.
- Validation rules:
  - `id`, `name`, and `price` required for listing and detail rendering.
  - `price >= 0`.
- State transitions:
  - `idle -> loading -> success | error` for fetch operations.

## Entity: ApiRequestConfig
- Fields:
  - `baseURL` (string from environment)
  - `contentType` (`application/json`)
  - `authorizationHeader` (string | undefined)
- Relationships:
  - Shared by all API modules via `axiosClient`.
- Validation rules:
  - `baseURL` must be defined through `REACT_APP_API_BASE_URL`.
  - Authorization header only set when token exists.
