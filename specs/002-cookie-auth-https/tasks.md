# Tasks: Cookie-Based HTTPS Auth

**Input**: Design documents from `/specs/002-cookie-auth-https/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/auth-session-contract.md`, `quickstart.md`

**Tests**: No explicit TDD requirement in the feature specification; this task list uses implementation + verification tasks.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare auth-session migration baseline and shared constants.

- [X] T001 Create auth session constants for cookie/HTTPS policy in src/utils/env.ts
- [X] T002 [P] Add shared auth route path constants for verify/logout/refresh in src/utils/routes.tsx
- [X] T003 [P] Add session bootstrap action placeholders and types in src/redux/auth/type.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core auth client/state foundation required before user stories.

**⚠️ CRITICAL**: No user story work starts until this phase is complete.

- [X] T004 Remove localStorage token request injection and enable credentialed requests in src/api/axiosClient.ts
- [X] T005 Implement centralized unauthorized (401) handling event strategy in src/api/axiosClient.ts
- [X] T006 Refactor auth slice state shape from token persistence to session status in src/redux/auth/authSlice.ts
- [X] T007 [P] Add auth API methods for verify/profile/logout/refresh contract surface in src/api/authApi.ts
- [X] T008 Wire logout event listener to Redux auth state reset in src/hooks/useAuth.ts
- [X] T009 Validate source-of-truth alignment between frontend endpoints and contract definitions in specs/002-cookie-auth-https/contracts/auth-session-contract.md

**Checkpoint**: Shared auth/session foundation is ready for story implementation.

---

## Phase 3: User Story 1 - Secure Login Session (Priority: P1) 🎯 MVP

**Goal**: Authenticate users with cookie-backed sessions and stop token persistence in browser storage.

**Independent Test**: Login successfully, access protected route, then verify no auth token exists in `localStorage`.

### Implementation for User Story 1

- [X] T010 [US1] Refactor login response handling to support cookie-session flow in src/api/authApi.ts
- [X] T011 [US1] Update login thunk to set authenticated session state without persistToken/localStorage in src/redux/auth/authSlice.ts
- [X] T012 [P] [US1] Update auth hook authentication selector to use session status instead of token presence in src/hooks/useAuth.ts
- [X] T013 [US1] Update login page success/error handling for session-based login in src/pages/LoginPage.tsx
- [X] T014 [US1] Update protected routing guard to rely on session status in src/App.tsx
- [X] T015 [US1] Manual verification: login flow stores no token in browser localStorage in specs/002-cookie-auth-https/quickstart.md

**Checkpoint**: User Story 1 is independently functional with cookie-backed session login.

---

## Phase 4: User Story 2 - HTTPS-Only Auth Traffic (Priority: P1)

**Goal**: Enforce secure transport for authenticated API communication in production.

**Independent Test**: Configure insecure production API URL and confirm requests are blocked; configure HTTPS URL and confirm requests succeed.

### Implementation for User Story 2

- [X] T016 [US2] Add API base URL protocol validation and production HTTPS enforcement in src/utils/env.ts
- [X] T017 [US2] Integrate HTTPS policy guard into axios client initialization in src/api/axiosClient.ts
- [X] T018 [P] [US2] Add explicit local-development HTTP exception logic in src/utils/env.ts
- [X] T019 [US2] Surface clear frontend error for blocked insecure API configuration in src/api/axiosClient.ts
- [X] T020 [US2] Manual verification: insecure endpoint blocked and HTTPS endpoint allowed in specs/002-cookie-auth-https/quickstart.md

**Checkpoint**: User Story 2 is independently functional with HTTPS policy enforced.

---

## Phase 5: User Story 3 - Reliable Session Lifecycle (Priority: P2)

**Goal**: Verify session on app startup, handle refresh/logout behavior, and recover safely from expired sessions.

**Independent Test**: Reload app with valid session, simulate expired session for redirect, and confirm logout revokes protected access.

### Implementation for User Story 3

- [X] T021 [US3] Implement startup session verification thunk using verify/profile endpoints in src/redux/auth/authSlice.ts
- [X] T022 [P] [US3] Trigger session bootstrap on app initialization in src/App.tsx
- [X] T023 [US3] Implement refresh-on-session-failure strategy using refresh endpoint in src/redux/auth/authSlice.ts
- [X] T024 [US3] Implement logout API call and local auth-state teardown in src/redux/auth/authSlice.ts
- [X] T025 [P] [US3] Update protected-route hook behavior for unknown/loading/authenticated states in src/hooks/useProtectedRoute.ts
- [X] T026 [US3] Manual verification: startup verify, refresh fallback, and logout behavior in specs/002-cookie-auth-https/quickstart.md

**Checkpoint**: User Story 3 is independently functional with full cookie-session lifecycle behavior.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency and documentation pass across stories.

- [X] T027 [P] Update auth migration notes and endpoint expectations in README.md
- [X] T028 [P] Reconcile API contract notes with final implementation behavior in specs/002-cookie-auth-https/contracts/auth-session-contract.md
- [X] T029 Run full quickstart scenario validation and record final checks in specs/002-cookie-auth-https/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Starts immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: Depends on Phase 2 completion.
- **Phase 4 (US2)**: Depends on Phase 2 completion.
- **Phase 5 (US3)**: Depends on Phase 2 completion; can start after US1 for simpler auth-state reuse.
- **Phase 6 (Polish)**: Depends on all selected user stories being complete.

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories; first MVP slice.
- **US2 (P1)**: No dependency on US1/US3; relies only on foundational Axios/env setup.
- **US3 (P2)**: Depends on foundational state model and benefits from US1 login state shape.

### Within Each User Story

- Update API/state model first.
- Update hooks/pages/routes second.
- Execute story-specific manual verification task last.

---

## Parallel Opportunities

- **Setup**: T002 and T003 can run in parallel.
- **Foundational**: T007 can run in parallel with T004–T006 after interface alignment starts.
- **US1**: T012 can run in parallel with T013 after T011.
- **US2**: T018 can run in parallel with T017 once T016 is drafted.
- **US3**: T022 and T025 can run in parallel after T021 establishes session states.
- **Polish**: T027 and T028 can run in parallel.

---

## Parallel Example: User Story 1

```bash
Task: "T012 [US1] Update auth hook authentication selector to use session status instead of token presence in src/hooks/useAuth.ts"
Task: "T013 [US1] Update login page success/error handling for session-based login in src/pages/LoginPage.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "T017 [US2] Integrate HTTPS policy guard into axios client initialization in src/api/axiosClient.ts"
Task: "T018 [US2] Add explicit local-development HTTP exception logic in src/utils/env.ts"
```

## Parallel Example: User Story 3

```bash
Task: "T022 [US3] Trigger session bootstrap on app initialization in src/App.tsx"
Task: "T025 [US3] Update protected-route hook behavior for unknown/loading/authenticated states in src/hooks/useProtectedRoute.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate US1 via T015.
4. Demo/deploy MVP slice.

### Incremental Delivery

1. Deliver US1 (secure cookie-based login session).
2. Deliver US2 (HTTPS-only transport enforcement).
3. Deliver US3 (session lifecycle reliability).
4. Finish polish and cross-cutting documentation.

### Parallel Team Strategy

1. Team aligns on Phase 1 and Phase 2 together.
2. Split by stories after foundation:
   - Developer A: US1
   - Developer B: US2
   - Developer C: US3
3. Merge at Phase 6 and run full quickstart validation.

---

## Notes

- All tasks follow strict checklist format: `- [ ] Txxx [P] [USx] Description with file path`.
- [P] markers denote no file-level conflict and no dependency on incomplete predecessor tasks.
- User-story labels are included only for story phases (US1/US2/US3).
- This plan preserves requirement-to-task traceability for FR-001 through FR-009.
