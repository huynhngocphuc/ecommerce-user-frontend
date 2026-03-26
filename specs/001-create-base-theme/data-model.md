# Data Model

## Entity: ThemeToken
- Fields:
  - `tokenId` (string, unique)
  - `group` (`typography` | `palette-light` | `palette-dark`)
  - `value` (string)
  - `source` (string; expected `md/styles.md`)
  - `status` (`active` | `reserved`)
- Relationships:
  - Belongs to one `ThemeGroup`.
  - Referenced by one `BaseThemeDefinition`.
- Validation rules:
  - `tokenId` must be unique in the base inventory.
  - `value` must match a source-defined token value.
  - `status` cannot be deleted-only values remain represented.
- State transitions:
  - `reserved -> active` when adopted by a screen.
  - `active -> reserved` if no longer used, without removal.

## Entity: ThemeGroup
- Fields:
  - `groupId` (string, unique)
  - `name` (string)
  - `description` (string)
  - `tokens` (array of `ThemeToken`)
- Relationships:
  - Aggregates many `ThemeToken` entries.
  - Included in one `BaseThemeDefinition`.
- Validation rules:
  - Must include groups for typography, light palette, and dark palette.
  - Group descriptions must define intended usage guidance.

## Entity: ThemeModePolicy
- Fields:
  - `defaultStrategy` (`system-preference`)
  - `supportedModes` (`light`, `dark`)
  - `fallbackBehavior` (string)
- Relationships:
  - Associated with one `BaseThemeDefinition`.
- Validation rules:
  - `defaultStrategy` must be `system-preference`.
  - Both `light` and `dark` modes must be supported.
- State transitions:
  - `mode = light` when system preference is light.
  - `mode = dark` when system preference is dark.

## Entity: TypographySpec
- Fields:
  - `headingPrimary` (`DM Serif Display`)
  - `headingFallbackStack` (string)
  - `bodyPrimary` (`Söhne/Suisse`)
  - `bodyFallbackStack` (string)
- Relationships:
  - Included in one `BaseThemeDefinition`.
- Validation rules:
  - Both typography roles must have explicit fallback stacks.
  - Primary families must map to source values from `md/styles.md`.

## Entity: BaseThemeDefinition
- Fields:
  - `themeId` (string)
  - `tokenInventory` (array of `ThemeToken`)
  - `groups` (array of `ThemeGroup`)
  - `modePolicy` (`ThemeModePolicy`)
  - `typography` (`TypographySpec`)
- Relationships:
  - Root aggregate of all theme entities.
- Validation rules:
  - Must retain 100% of source typography and palette token values.
  - Must include guidance mappings for token-group intent.
