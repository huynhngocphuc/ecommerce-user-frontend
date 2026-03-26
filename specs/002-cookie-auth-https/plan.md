# Implementation Plan: Cookie-Based HTTPS Auth

**Branch**: `002-cookie-auth-https` | **Date**: 2026-03-26 | **Spec**: `specs/002-cookie-auth-https/spec.md`
**Input**: Feature specification from `specs/002-cookie-auth-https/spec.md`

## Summary

Migrate frontend authentication from localStorage token persistence to secure cookie-backed session behavior, enforce HTTPS-only API usage in production, and align session lifecycle handling with backend `verify`, `refresh`, and `logout` endpoints while preserving existing user-facing auth flows.

## Technical Context

**Language/Version**: TypeScript 4.9.5, React 18.3.1  
**Primary Dependencies**: Axios, Redux Toolkit, React Redux, React Router, MUI, Emotion, Sass, Tailwind CSS  
**Storage**: Browser-managed secure cookies for auth session; Redux state for in-memory auth status; no localStorage token persistence  
**Testing**: Jest + React Testing Library (CRA defaults), targeted manual browser verification for cookie/session behavior  
**Target Platform**: Modern web browsers (Create React App frontend)
**Project Type**: Single-project frontend web application  
**Performance Goals**: Preserve existing auth flow responsiveness; session verification on app start should not regress perceived startup (target <= 2s from spec)  
**Constraints**: Must remain compatible with CRA setup and current project structure; production auth traffic must use HTTPS; local development exception allowed only for explicitly approved local endpoints  
**Scale/Scope**: Existing e-commerce frontend auth and protected product routes; migration limited to auth/session/client transport behavior

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Phase 0 Gate Check
- **I. Source-of-Truth First**: **PASS** — Sources identified: `specs/002-cookie-auth-https/spec.md`, `.specify/memory/constitution.md`, `TECH_STACK.md`, `struct.md`, existing auth/api modules under `src/`.
- **II. Additive & Backward-Safe Change**: **PASS** — End-user login/register/profile flows retained; storage mechanism changes are internal. Any removed token persistence behavior is intentionally replaced with cookie-session behavior without route-level UX removal.
- **III. Testable Specifications**: **PASS** — Spec includes measurable outcomes (SC-001..SC-005) and acceptance scenarios for each prioritized story.
- **IV. Styling System Consistency**: **PASS** — Feature scope is auth/session transport behavior; no new styling primitives required.
- **V. Incremental Delivery & Traceability**: **PASS** — Stories are independently testable (secure login session, HTTPS enforcement, session lifecycle).

### Post-Phase 1 Re-check
- **I. Source-of-Truth First**: **PASS** — Research, data model, quickstart, and contract artifacts explicitly reference backend auth routes and repository stack constraints.
- **II. Additive & Backward-Safe Change**: **PASS** — Design keeps existing route-level auth journeys while shifting credential transport/storage strategy.
- **III. Testable Specifications**: **PASS** — Contracts and quickstart define verifiable checks for cookie auth, HTTPS blocking, verify/refresh/logout behavior.
- **IV. Styling System Consistency**: **PASS** — No styling-system changes introduced.
- **V. Incremental Delivery & Traceability**: **PASS** — Artifacts map to P1/P2 stories and preserve phased implementation readiness.

## Project Structure

### Documentation (this feature)

```text
specs/002-cookie-auth-https/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── auth-session-contract.md
└── tasks.md             # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
src/
├── api/
│   ├── axiosClient.ts
│   └── authApi.ts
├── hooks/
│   ├── useAuth.ts
│   └── useProtectedRoute.ts
├── redux/
│   └── auth/
│       ├── authSlice.ts
│       └── type.ts
├── pages/
│   └── LoginPage.tsx
├── App.tsx
└── utils/
    └── env.ts
```

**Structure Decision**: Use the existing single-project frontend structure from `struct.md` and current `src/` layout, modifying only auth/session-related modules and adding feature artifacts under `specs/002-cookie-auth-https/`.

## Complexity Tracking

No constitutional violations requiring exemptions.
