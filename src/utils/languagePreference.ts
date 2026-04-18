// Language preference management for user storefront app
const STORAGE_KEY = 'user_app.language';
const SUPPORTED_LANGUAGES = ['en', 'vi'];
const DEFAULT_LANGUAGE = 'vi';

export const loadLanguagePreference = (): string => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      return stored;
    }
  } catch (e) {
    console.warn('Failed to read language preference from localStorage:', e);
  }
  return DEFAULT_LANGUAGE;
};

export const saveLanguagePreference = (language: string): void => {
  try {
    if (SUPPORTED_LANGUAGES.includes(language)) {
      localStorage.setItem(STORAGE_KEY, language);
    }
  } catch (e) {
    console.warn('Failed to save language preference to localStorage:', e);
  }
};

export const resetLanguagePreference = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to reset language preference:', e);
  }
};

export const getDefaultLanguage = (): string => DEFAULT_LANGUAGE;
export const getFallbackLanguage = (): string => 'en';
