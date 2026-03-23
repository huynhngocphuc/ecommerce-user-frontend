# Phase 0 Research: Repository Tech & Structure Alignment

## Decision 1: Use CRA-compatible Tailwind integration approach
- Decision: Use Tailwind CSS v3 configuration with `tailwind.config.js` content scanning for `src/**/*.{js,jsx,ts,tsx}` and `public/index.html`.
- Rationale: This repository uses Create React App (`react-scripts`), where Tailwind v3 configuration is stable and straightforward.
- Alternatives considered:
  - Tailwind v4 default install: rejected for this repo because CRA compatibility and migration shape are less predictable.

## Decision 2: Keep dual styling system (MUI + SCSS + Tailwind)
- Decision: Retain existing MUI/Emotion and SCSS while enabling Tailwind utility usage incrementally.
- Rationale: Existing UI already uses MUI theme provider and SCSS imports; replacing all styling now is unnecessary scope.
- Alternatives considered:
  - Full migration to Tailwind-only styling: rejected due to high churn and no requirement for migration.

## Decision 3: Preserve current frontend-first folder structure
- Decision: Use current `src/` organization (`api`, `assets`, `components`, `context`, `data`, `hooks`, `pages`, `redux`, `services`, `utils`) as the implementation structure baseline.
- Rationale: Structure is already established and documented in `struct.md`; this minimizes friction and rework.
- Alternatives considered:
  - Reorganize into feature slices immediately: rejected as out-of-scope for this planning task.

## Decision 4: Treat backend APIs as external contract surface
- Decision: Document frontend-consumed API contracts in `contracts/frontend-api-contract.md`.
- Rationale: Frontend exposes integration expectations via `src/api` and `axiosClient` behaviors; documenting these contracts reduces integration ambiguity.
- Alternatives considered:
  - Skip contracts documentation: rejected because API integration is external to this repository and benefits from explicit contracts.

## Resolved Clarifications
- Language/version baseline: TypeScript + React app from existing repository configuration.
- Platform: Browser-based web frontend.
- Test approach: CRA/Jest + Testing Library defaults.
- Project structure source of truth: `struct.md` and actual repository layout.
