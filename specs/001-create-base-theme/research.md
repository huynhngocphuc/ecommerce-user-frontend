# Phase 0 Research: Base Theme Foundation

## Decision 1: Use `md/styles.md` as the canonical token source
- Decision: Treat `md/styles.md` as the single source of truth for initial typography and color tokens.
- Rationale: The feature explicitly requires base-theme creation from this file and preserving all provided values.
- Alternatives considered:
  - Derive tokens from current `src/utils/theme.ts`: rejected because existing values diverge from requested palette/fonts.
  - Pull tokens from mixed SCSS/Tailwind sources first: rejected because it can introduce drift before baseline is established.

## Decision 2: Preserve complete token inventory, including currently unused values
- Decision: Include every dark/light color and both typography roles in the base token inventory without pruning.
- Rationale: User constraint requires no removal based on current usage or perceived suitability.
- Alternatives considered:
  - Keep only currently referenced tokens: rejected because it violates explicit scope.
  - Mark unused tokens as deprecated: rejected for initial baseline because no deprecation requirement exists.

## Decision 3: Set initial mode by system preference while keeping both palettes active
- Decision: Define light and dark palettes and apply initial mode via system preference.
- Rationale: Clarification accepted during `/speckit.clarify` requires `prefers-color-scheme` behavior.
- Alternatives considered:
  - Fixed light default: rejected by clarification outcome.
  - Fixed dark default: rejected by clarification outcome.
  - Token-only with no active mode policy: rejected because behavior would remain ambiguous.

## Decision 4: Require explicit fallback font stacks for both typography roles
- Decision: Specify fallback stacks for heading and body/UI fonts.
- Rationale: Clarification accepted during `/speckit.clarify` and needed for resilience when custom fonts are unavailable.
- Alternatives considered:
  - Browser default fallback only: rejected because behavior becomes inconsistent across clients.
  - Fallback for body only: rejected because heading text still risks inconsistent rendering.

## Decision 5: Document a theme token contract for internal consumers
- Decision: Create a feature contract describing required token groups, mode policy, and preservation rules.
- Rationale: The theme definition is consumed by multiple frontend layers (MUI theme usage, SCSS/Tailwind alignment, UI components).
- Alternatives considered:
  - Skip contract documentation: rejected because it weakens consistency for future implementation and reviews.

## Resolved Clarifications
- Initial active mode follows system preference.
- Fallback stacks are mandatory for both heading and body/UI fonts.
- Token preservation includes values not currently used in screens.

## Immutable Source Baseline (from `md/styles.md`)

### Typography
- Heading: `DM Serif Display`
- Body/UI: `Söhne/Suisse`

### Dark Palette
- `#3A0519`
- `#670D2F`
- `#850E35`
- `#A53860`
- `#EE6983`
- `#EF88AD`

### Light Palette
- `#FCF8F8`
- `#FBEFEF`
- `#F9DFDF`
- `#FEEAC9`
- `#FFCDC9`
- `#F5AFAF`

This baseline is treated as immutable input for initial implementation and retention checks.
