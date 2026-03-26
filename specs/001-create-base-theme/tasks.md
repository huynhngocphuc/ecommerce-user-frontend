# Tasks: Base Theme Foundation

**Input**: Design documents from `/specs/001-create-base-theme/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No new automated tests are explicitly requested in the feature specification. Validation tasks focus on independent manual verification plus existing project build/test commands.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare baseline files and token source references for implementation

- [X] T001 Verify source token list in md/styles.md and capture immutable baseline values in specs/001-create-base-theme/research.md
- [X] T002 Audit current theme implementation and integration points in src/utils/theme.ts and src/App.tsx
- [X] T003 [P] Confirm styling-system alignment constraints in tailwind.config.js and src/assets/styles/_variables.scss

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build core theme structures required before any user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create typed theme token inventory structure for typography/light/dark groups in src/utils/theme.ts
- [X] T005 [P] Define shared fallback font stack constants for heading and body/UI roles in src/utils/theme.ts
- [X] T006 [P] Add system-preference mode resolution helper and exported mode policy in src/utils/theme.ts
- [X] T007 Refactor exported theme objects to consume the shared token inventory and mode policy in src/utils/theme.ts
- [X] T008 Wire theme initialization path to selected mode policy in src/App.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Apply consistent visual base (Priority: P1) 🎯 MVP

**Goal**: Deliver a base theme with source typography, complete palettes, system-preference default mode, and required fallback stacks

**Independent Test**: Run app and verify base theme values in active mode are sourced from md/styles.md, with explicit fallback stacks applied when primary fonts are unavailable

### Implementation for User Story 1

- [X] T009 [US1] Replace current theme typography and palette values with source-aligned base tokens in src/utils/theme.ts
- [X] T010 [US1] Implement explicit heading and body/UI fallback stacks in theme typography definitions in src/utils/theme.ts
- [X] T011 [US1] Ensure initial theme mode follows system preference during app startup in src/App.tsx
- [X] T012 [US1] Validate US1 manually using quickstart criteria and record verification notes in specs/001-create-base-theme/quickstart.md

**Checkpoint**: User Story 1 is independently functional and demonstrable

---

## Phase 4: User Story 2 - Preserve full design token set (Priority: P2)

**Goal**: Preserve all style tokens from source file even if currently unused

**Independent Test**: Compare token inventory in implementation against md/styles.md and confirm full retention with no removed source tokens

### Implementation for User Story 2

- [X] T013 [US2] Add explicit reserved-token representation for currently unused values in src/utils/theme.ts
- [X] T014 [US2] Mirror full source palette token sets into SCSS token definitions in src/assets/styles/_variables.scss
- [X] T015 [P] [US2] Mirror full source palette token sets into theme extension entries in tailwind.config.js
- [X] T016 [US2] Update preservation rules and verification checklist in specs/001-create-base-theme/contracts/theme-token-contract.md
- [X] T017 [US2] Validate full token retention by cross-checking md/styles.md with implementation inventory and document outcome in specs/001-create-base-theme/quickstart.md

**Checkpoint**: User Story 2 is independently functional and testable

---

## Phase 5: User Story 3 - Support clear theme usage guidance (Priority: P3)

**Goal**: Provide clear usage guidance for typography and palette groups to reduce inconsistent token usage

**Independent Test**: A contributor can choose appropriate token groups for common text/surface/accent tasks using the written guidance only

### Implementation for User Story 3

- [X] T018 [US3] Create theme usage guidance document for token-group intent in md/theme-usage.md
- [X] T019 [US3] Add cross-reference to usage guidance from quickstart and implementation notes in specs/001-create-base-theme/quickstart.md
- [X] T020 [US3] Add contributor-facing usage examples for typography/light/dark token groups in specs/001-create-base-theme/contracts/theme-token-contract.md
- [X] T021 [US3] Verify guidance clarity with a walkthrough check and capture pass/fail criteria in md/theme-usage.md

**Checkpoint**: User Story 3 is independently functional and testable

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency checks and release-readiness validation across stories

- [X] T022 [P] Perform consistency pass across src/utils/theme.ts, tailwind.config.js, and src/assets/styles/_variables.scss
- [X] T023 Run build and test commands (`npm run build`, `npm test`) and capture outcomes in specs/001-create-base-theme/quickstart.md
- [X] T024 [P] Update feature documentation summary and completion notes in specs/001-create-base-theme/plan.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
  - Recommended sequence: US1 (MVP) → US2 → US3
  - US2 and US3 may proceed in parallel after US1 if staffing allows
- **Polish (Phase 6)**: Depends on all targeted user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational; no dependency on other stories
- **User Story 2 (P2)**: Starts after Foundational; depends on US1 baseline theme structure for inventory preservation
- **User Story 3 (P3)**: Starts after Foundational; references outputs from US1/US2 for guidance examples

### Within Each User Story

- Implement core story behavior first
- Validate independently using the listed Independent Test criteria
- Complete story documentation updates tied to that story

### Parallel Opportunities

- Phase 1: `T003` can run in parallel with `T001`/`T002`
- Phase 2: `T005` and `T006` can run in parallel after `T004`
- Phase 4: `T015` can run in parallel with `T014`
- Phase 6: `T022` and `T024` can run in parallel after story completion

---

## Parallel Example: User Story 2

```bash
Task: "Mirror full source palette token sets into SCSS token definitions in src/assets/styles/_variables.scss"
Task: "Mirror full source palette token sets into theme extension entries in tailwind.config.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate User Story 1 independently using quickstart checks
5. Demo/review MVP before expanding scope

### Incremental Delivery

1. Setup + Foundational
2. Deliver US1 (base working theme)
3. Deliver US2 (full token preservation)
4. Deliver US3 (usage guidance)
5. Finish with Polish phase checks

### Parallel Team Strategy

1. Team completes Setup + Foundational together
2. Then split:
   - Developer A: US1 completion and runtime validation
   - Developer B: US2 token-preservation implementation
   - Developer C: US3 guidance documentation
3. Rejoin for Polish and final build/test validation

---

## Notes

- [P] tasks denote no file conflict/dependency on incomplete tasks
- User story labels map tasks to independently testable increments
- Keep implementation aligned to source token list in md/styles.md
- Do not remove tokens based on current usage
