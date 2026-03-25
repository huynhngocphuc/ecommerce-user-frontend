# Theme Token Contract

## Scope
This contract defines the required base-theme interface consumed by frontend code and documentation for the `001-create-base-theme` feature.

## Source of Truth
- Primary source: `md/styles.md`
- Contract requirement: all source typography and palette values are represented in the base theme inventory.

## Contracted Theme Groups

### 1) Typography Group
Required tokens:
- Heading primary family: `DM Serif Display`
- Body/UI primary family: `Söhne/Suisse`
- Heading fallback stack: required
- Body/UI fallback stack: required

Contract rules:
- Both typography roles must remain defined.
- Fallback stacks are mandatory for each role.

### 2) Light Palette Group
Required values:
- `#FCF8F8`
- `#FBEFEF`
- `#F9DFDF`
- `#FEEAC9`
- `#FFCDC9`
- `#F5AFAF`

### 3) Dark Palette Group
Required values:
- `#3A0519`
- `#670D2F`
- `#850E35`
- `#A53860`
- `#EE6983`
- `#EF88AD`

## Mode Policy Contract
- Supported modes: `light`, `dark`
- Initial active mode policy: `system-preference`
- Both palettes must remain available regardless of current screen usage.

## Preservation Contract
- No source token may be removed due to “unused” status.
- Tokens not currently mapped to UI components must remain in inventory as reserved-for-future-use.

## Validation Checklist
- 100% source token coverage against `md/styles.md`
- Typography includes explicit fallback stacks
- Mode policy follows system preference
- Token grouping and usage guidance are documented

## Contributor Usage Examples

### Typography Usage
- Heading examples (`h1`-`h6`, major section titles): use heading family with heading fallback stack.
- Body/UI examples (paragraph text, table cells, buttons, labels): use body family with body fallback stack.

### Palette Usage
- Surface/background examples:
	- Light mode: prefer `#FCF8F8` / `#FBEFEF` for page/card surfaces.
	- Dark mode: prefer `#3A0519` / `#670D2F` for page/card surfaces.
- Accent/action examples:
	- Light mode accents: `#FFCDC9` / `#F5AFAF`
	- Dark mode accents: `#EE6983` / `#EF88AD`

### Preservation Examples
- If a token is not currently mapped in UI components, keep it in the token inventory as reserved.
- Do not delete palette tokens during cleanup when they are absent from current screens.

## Guidance Walkthrough Criteria
- Pass if a contributor can correctly map:
	1) heading vs body typography roles,
	2) light vs dark surface tokens,
	3) accent token choices,
	using this contract and `md/theme-usage.md` without additional clarification.
