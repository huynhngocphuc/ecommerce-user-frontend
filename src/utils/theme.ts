import { createTheme } from '@mui/material/styles';

export type ThemeMode = 'light' | 'dark';

export const THEME_MODE_POLICY = 'system-preference' as const;

export const typographyTokens = {
  headingPrimary: 'DM Serif Display',
  bodyPrimary: 'Söhne, Suisse',
} as const;

export const headingFallbackStack = '"DM Serif Display", "Times New Roman", Times, serif';
export const bodyFallbackStack = 'Söhne, "Suisse Int\'l", Suisse, Inter, "Segoe UI", Arial, sans-serif';

export const paletteTokens = {
  dark: {
    dark100: '#3A0519',
    dark200: '#670D2F',
    dark300: '#850E35',
    dark400: '#A53860',
    dark500: '#EE6983',
    dark600: '#EF88AD',
  },
  light: {
    light100: '#FCF8F8',
    light200: '#FBEFEF',
    light300: '#F9DFDF',
    light400: '#FEEAC9',
    light500: '#FFCDC9',
    light600: '#F5AFAF',
  },
} as const;

type TokenStatus = 'active' | 'reserved';

export const themeTokenInventory = {
  typography: [
    { tokenId: 'heading-primary', value: typographyTokens.headingPrimary, source: 'md/styles.md', status: 'active' as TokenStatus },
    { tokenId: 'heading-fallback-stack', value: headingFallbackStack, source: 'md/styles.md', status: 'active' as TokenStatus },
    { tokenId: 'body-primary', value: typographyTokens.bodyPrimary, source: 'md/styles.md', status: 'active' as TokenStatus },
    { tokenId: 'body-fallback-stack', value: bodyFallbackStack, source: 'md/styles.md', status: 'active' as TokenStatus },
  ],
  'palette-light': [
    { tokenId: 'light-100', value: paletteTokens.light.light100, source: 'md/styles.md', status: 'active' as TokenStatus },
    { tokenId: 'light-200', value: paletteTokens.light.light200, source: 'md/styles.md', status: 'active' as TokenStatus },
    { tokenId: 'light-300', value: paletteTokens.light.light300, source: 'md/styles.md', status: 'reserved' as TokenStatus },
    { tokenId: 'light-400', value: paletteTokens.light.light400, source: 'md/styles.md', status: 'reserved' as TokenStatus },
    { tokenId: 'light-500', value: paletteTokens.light.light500, source: 'md/styles.md', status: 'active' as TokenStatus },
    { tokenId: 'light-600', value: paletteTokens.light.light600, source: 'md/styles.md', status: 'reserved' as TokenStatus },
  ],
  'palette-dark': [
    { tokenId: 'dark-100', value: paletteTokens.dark.dark100, source: 'md/styles.md', status: 'active' as TokenStatus },
    { tokenId: 'dark-200', value: paletteTokens.dark.dark200, source: 'md/styles.md', status: 'active' as TokenStatus },
    { tokenId: 'dark-300', value: paletteTokens.dark.dark300, source: 'md/styles.md', status: 'reserved' as TokenStatus },
    { tokenId: 'dark-400', value: paletteTokens.dark.dark400, source: 'md/styles.md', status: 'reserved' as TokenStatus },
    { tokenId: 'dark-500', value: paletteTokens.dark.dark500, source: 'md/styles.md', status: 'active' as TokenStatus },
    { tokenId: 'dark-600', value: paletteTokens.dark.dark600, source: 'md/styles.md', status: 'reserved' as TokenStatus },
  ],
} as const;

export const resolveSystemPreferredMode = (): ThemeMode => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const resolveInitialThemeMode = (): ThemeMode => resolveSystemPreferredMode();

export const createAppTheme = (mode: ThemeMode) => {
  const isDarkMode = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDarkMode ? paletteTokens.dark.dark500 : paletteTokens.light.light500,
      },
      secondary: {
        main: isDarkMode ? paletteTokens.dark.dark600 : paletteTokens.light.light600,
      },
      background: {
        default: isDarkMode ? paletteTokens.dark.dark100 : paletteTokens.light.light100,
        paper: isDarkMode ? paletteTokens.dark.dark200 : paletteTokens.light.light200,
      },
      text: {
        primary: isDarkMode ? paletteTokens.light.light100 : paletteTokens.dark.dark100,
        secondary: isDarkMode ? paletteTokens.light.light300 : paletteTokens.dark.dark200,
      },
      success: {
        main: isDarkMode ? paletteTokens.dark.dark400 : paletteTokens.light.light400,
      },
      error: {
        main: isDarkMode ? paletteTokens.dark.dark300 : paletteTokens.light.light600,
      },
      warning: {
        main: isDarkMode ? paletteTokens.dark.dark600 : paletteTokens.light.light500,
      },
    },
    typography: {
      fontFamily: bodyFallbackStack,
      fontSize: 14,
      fontWeightRegular: 400,
      fontWeightBold: 700,
      h1: { fontFamily: headingFallbackStack },
      h2: { fontFamily: headingFallbackStack },
      h3: { fontFamily: headingFallbackStack },
      h4: { fontFamily: headingFallbackStack },
      h5: { fontFamily: headingFallbackStack },
      h6: { fontFamily: headingFallbackStack },
    },
    shape: {
      borderRadius: 8,
    },
  });
};

export const lightTheme = createAppTheme('light');
