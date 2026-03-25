# Theme Usage Guide

## Purpose
This guide defines how to apply base theme typography and palette groups consistently.

## Source Alignment
- Source of truth: `md/styles.md`
- Contract reference: `specs/001-create-base-theme/contracts/theme-token-contract.md`

## Typography Guidance

### Heading Role
- Primary family: `DM Serif Display`
- Fallback stack: `"DM Serif Display", "Times New Roman", Times, serif`
- Use for: page titles, section headers, emphasized display text.

### Body/UI Role
- Primary family: `Söhne/Suisse`
- Fallback stack: `Söhne, "Suisse Int'l", Suisse, Inter, "Segoe UI", Arial, sans-serif`
- Use for: paragraph text, labels, navigation items, table content, buttons.

## Palette Guidance

### Light Group (`themeLight`)
- Use for light-mode surfaces and supporting accents.
- Suggested mapping:
  - Surface backgrounds: `light100`, `light200`
  - Subtle highlights: `light300`, `light400`
  - Accent actions: `light500`, `light600`

### Dark Group (`themeDark`)
- Use for dark-mode surfaces and supporting accents.
- Suggested mapping:
  - Surface backgrounds: `dark100`, `dark200`
  - Secondary accents: `dark300`, `dark400`
  - Primary accents: `dark500`, `dark600`

## Reserved Token Policy
- Tokens not currently used in components remain reserved for future use.
- Do not remove tokens because they are unused in current screens.

## Walkthrough Check (Pass/Fail)
A walkthrough passes if a contributor can do all of the following without extra clarification:
1. Pick the correct typography role for a new page title and body text.
2. Pick correct surface tokens for light mode and dark mode.
3. Pick an accent token for action emphasis while preserving token-group intent.
