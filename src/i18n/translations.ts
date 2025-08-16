import type { Language } from './index';
import { translations } from './translations/index';

// Export the translations and helper function
export { translations };

// Helper function to get translation
export function t(key: string, lang: Language): string {
  const translation = translations[key as keyof typeof translations];
  if (!translation) {
    console.warn(`Translation key "${key}" not found`);
    return key;
  }
  return translation[lang] || translation.en || key;
}