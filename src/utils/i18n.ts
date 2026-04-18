import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setupI18nErrorHandler } from './i18nErrorHandler';
import { loadLanguagePreference } from './languagePreference';

import commonEnglish from '../locales/en/common.json';
import commonVietnamese from '../locales/vi/common.json';
import productEnglish from '../locales/en/product.json';
import productVietnamese from '../locales/vi/product.json';
import adminEnglish from '../locales/en/admin.json';
import adminVietnamese from '../locales/vi/admin.json';

const resources = {
  en: {
    common: commonEnglish,
    product: productEnglish,
    admin: adminEnglish,
  },
  vi: {
    common: commonVietnamese,
    product: productVietnamese,
    admin: adminVietnamese,
  },
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    lng: loadLanguagePreference(), // Load from localStorage if available
    fallbackLng: 'en', // Fallback to English if translation not found
    interpolation: {
      escapeValue: false, // React already escapes content
    },
    react: {
      useSuspense: false, // Disable suspense for now to avoid issues
    },
  });

// Set up error handling for resource load failures
setupI18nErrorHandler(i18n);

export default i18n;
