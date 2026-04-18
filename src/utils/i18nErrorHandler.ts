import type { i18n as I18nInstance } from 'i18next';
import { getFallbackLanguage } from './languagePreference';

// Track if we've already switched to fallback to avoid infinite loops
let fallbackApplied = false;

export const setupI18nErrorHandler = (i18nInstance: I18nInstance) => {
  // Listen for resource load failures
  (i18nInstance as any).on('missingKey', (lngs: string[], ns: string, key: string) => {
    console.warn(`Missing translation key: ${ns}.${key} for languages:`, lngs);
  });

  // Handle backend communication errors
  (i18nInstance as any).on('error', (err: any) => {
    console.error('i18n error:', err);
    if (!fallbackApplied && (i18nInstance as any).language !== getFallbackLanguage()) {
      console.warn('Switching to English fallback due to resource load failure');
      fallbackApplied = true;
      (i18nInstance as any).changeLanguage(getFallbackLanguage());
    }
  });
};

export const resetFallbackState = () => {
  fallbackApplied = false;
};

export default setupI18nErrorHandler;
