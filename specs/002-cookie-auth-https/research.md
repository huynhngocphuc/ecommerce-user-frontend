# Phase 0 Research: Cookie-Based HTTPS Auth

## Decision 1: Use backend-issued secure HttpOnly cookie sessions
- Decision: Frontend authentication will rely on backend-issued secure cookie sessions instead of storing access tokens in localStorage.
- Rationale: HttpOnly cookies reduce exposure of auth credentials to client-side JavaScript and align with the feature’s security objective.
- Alternatives considered:
  - Keep Bearer token in localStorage: rejected due to XSS exposure risk and explicit feature requirement to stop localStorage token persistence.
  - Store token in sessionStorage: rejected because it remains script-accessible and does not satisfy secure-cookie goal.

## Decision 2: Enable credentialed requests via Axios with cookie transport
- Decision: Axios client should use credentialed requests for auth/session routes so browser-managed cookies are sent automatically.
- Rationale: Cookie-backed sessions require browser credential transport, not manual Authorization header injection.
- Alternatives considered:
  - Continue request interceptor adding `Authorization: Bearer <token>`: rejected as incompatible with HttpOnly cookie-only auth.
  - Per-request manual credential toggling: rejected due to inconsistency risk across auth-protected calls.

## Decision 3: Enforce HTTPS-only API usage in production
- Decision: Frontend must reject non-HTTPS API base URLs in production, with explicit local-development exception policy.
- Rationale: Secure cookie usage and session confidentiality depend on secure transport.
- Alternatives considered:
  - Allow mixed HTTP/HTTPS endpoints: rejected due to transport security risk.
  - Enforce HTTPS in all environments including localhost: rejected because it can block common local development workflows.

## Decision 4: Drive auth state from session verification endpoints, not persisted token
- Decision: Frontend auth status should be established using backend `verify`/`profile` checks on app startup and maintained in Redux in-memory state.
- Rationale: With HttpOnly cookies, client cannot read token directly; auth truth must come from backend session validation.
- Alternatives considered:
  - Infer auth from stale client storage flags: rejected as unreliable and non-authoritative.
  - Treat login response body token as source of truth: rejected for cookie-first session model.

## Decision 5: Preserve existing route-level user flows while changing internals
- Decision: Keep register/login/profile/logout/refresh user journeys intact from user perspective; only internal session transport/state behavior changes.
- Rationale: Constitution principle II (backward-safe changes) and feature requirement FR-009 require no UX regression in established auth flows.
- Alternatives considered:
  - Introduce new auth UX steps or extra prompts: rejected as out-of-scope for this migration.

## Resolved Clarifications
- Clarification: Should frontend set HttpOnly flag directly?
  - Resolution: No. HttpOnly and Secure flags are backend `Set-Cookie` responsibilities; frontend only sends credentialed requests.
- Clarification: Which backend routes define lifecycle behavior?
  - Resolution: Use provided routes (`/register`, `/login`, `/verify`, `/profile`, `/logout`, `/refresh`) as contract surface.
- Clarification: How to support development with HTTPS requirement?
  - Resolution: Permit explicit local development exceptions while enforcing strict HTTPS in production.
