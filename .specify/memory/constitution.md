<!--
Sync Impact Report
- Version change: template-placeholder-version → 1.0.0
- Modified principles:
	- Template Principle 1 placeholder → I. Source-of-Truth First
	- Template Principle 2 placeholder → II. Additive & Backward-Safe Change
	- Template Principle 3 placeholder → III. Testable Specifications
	- Template Principle 4 placeholder → IV. Styling System Consistency
	- Template Principle 5 placeholder → V. Incremental Delivery & Traceability
- Added sections:
	- Technical Guardrails
	- Workflow & Quality Gates
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md
	- ✅ .specify/templates/spec-template.md
	- ✅ .specify/templates/tasks-template.md
	- ⚠ pending .specify/templates/commands/*.md (directory not present in repository)
- Follow-up TODOs:
	- TODO(RATIFICATION_DATE): Original adoption date is unknown and must be confirmed from project history.
-->

# Ecommerce User Frontend Constitution

## Core Principles

### I. Source-of-Truth First
All planning and implementation artifacts MUST name their authoritative source documents
for business rules, API behavior, design tokens, and structure constraints. Features MUST
align with those sources or explicitly document justified deviations before implementation.
Rationale: Prevents configuration drift and conflicting behavior across specs, code, and
documentation.

### II. Additive & Backward-Safe Change
Changes that remove, rename, or repurpose existing externally consumed behavior (including
theme tokens, public interfaces, and documented workflows) MUST include a migration plan,
compatibility notes, and explicit approval in the feature artifacts. Additive change is the
default path unless a breaking change is approved.
Rationale: Preserves stability for active contributors and prevents accidental regressions.

### III. Testable Specifications
Every functional requirement MUST be testable, and every success criterion MUST be
measurable. Ambiguous language (for example: "fast", "clean", "intuitive") MUST be
replaced with observable criteria, thresholds, or explicit review checklists.
Rationale: Improves delivery predictability and removes interpretation gaps during
implementation.

### IV. Styling System Consistency
Frontend UI work MUST use the approved project styling layers (MUI/Emotion, Tailwind,
SCSS) and shared theme/token definitions as the canonical styling baseline. New hard-coded
style primitives MUST NOT be introduced when an existing token can satisfy the requirement.
Rationale: Maintains visual consistency and reduces duplicated styling logic.

### V. Incremental Delivery & Traceability
Work MUST be planned and delivered in independently testable user-story increments.
Task plans MUST preserve traceability between requirements, stories, and implementation
tasks, including explicit dependency order and parallel-safe opportunities.
Rationale: Enables MVP-first delivery and transparent progress tracking.

## Technical Guardrails

- Runtime stack for this repository is React + TypeScript on Create React App.
- Existing project structure and documented stack (`TECH_STACK.md`, `struct.md`) MUST be
	treated as constraints for planning outputs unless an approved migration is defined.
- Environment-sensitive behavior MUST be documented in quickstart and verified with
	available local scripts (`npm start`, `npm run build`, `npm test`).
- Source-of-truth design and contract files used by a feature MUST be referenced directly
	in the feature specification and plan.

## Workflow & Quality Gates

- Feature flow SHOULD follow: `specify` → `clarify` (when needed) → `plan` → `tasks` →
	`analyze` → `implement`.
- Constitution Check in implementation plans MUST explicitly evaluate all five core
	principles before Phase 0 and after Phase 1.
- Before implementation starts, tasks MUST confirm requirement coverage and identify any
	unresolved ambiguity.
- Cross-artifact consistency analysis MUST be run before implementation for non-trivial
	features.

## Governance

This constitution is the governing standard for planning and feature delivery artifacts in
this repository. In case of conflict, this document overrides ad-hoc process choices.

Amendment procedure:
1. Propose the amendment with impacted principles/sections and rationale.
2. Update dependent templates and guidance files in the same change.
3. Record a Sync Impact Report at the top of this document.
4. Approve and merge with version update following the policy below.

Versioning policy:
- MAJOR: incompatible governance changes or principle removals/redefinitions.
- MINOR: new principle/section or materially expanded guidance.
- PATCH: clarifications, wording improvements, and non-semantic refinements.

Compliance review expectations:
- Every implementation plan MUST include a Constitution Check gate result.
- Every task plan MUST preserve requirement-to-task traceability.
- Every cross-artifact analysis MUST report principle alignment and unresolved risks.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm original adoption date from repository history. | **Last Amended**: 2026-03-25
