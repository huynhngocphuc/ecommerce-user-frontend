# Localization Notes (Storefront)

## Scope Implemented
- Added i18n initialization and locale resources for `en` and `vi`.
- Added persistent language preference using `user_app.language`.
- Added header language switcher (`EN`/`VI`).
- Localized scoped storefront UI:
  - Header labels and navigation labels.
  - Products page title, sort/filter controls, and empty states.
  - Filter sidebar and mobile filter panel static text.
  - Product detail page and product detail modal static text.

## Fallback Behavior
- Default language: `vi`.
- Fallback language: `en`.
- Runtime i18n error handler switches to fallback when resource errors occur.

## Notes
- Existing project warnings unrelated to i18n remain (unused variables in pre-existing files).
- `npm run build` succeeds.

## Pending Manual Validation
- Rapid language toggle behavior under repeated switches.
- Layout checks for long Vietnamese content on mobile and desktop.
- Explicit missing-key/fallback simulation scenarios.
