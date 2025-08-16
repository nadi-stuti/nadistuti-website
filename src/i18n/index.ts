// Supported languages with their native names and codes
export const languages = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்', dir: 'ltr' },
  te: { name: 'Telugu', nativeName: 'తెలుగు', dir: 'ltr' },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', dir: 'ltr' },
  ml: { name: 'Malayalam', nativeName: 'മലയാളം', dir: 'ltr' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' },
  gu: { name: 'Gujarati', nativeName: 'ગુજરાતી', dir: 'ltr' },
  mr: { name: 'Marathi', nativeName: 'मराठी', dir: 'ltr' },
  pa: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', dir: 'ltr' },
  or: { name: 'Odia', nativeName: 'ଓଡ଼ିଆ', dir: 'ltr' },
  as: { name: 'Assamese', nativeName: 'অসমীয়া', dir: 'ltr' },
  sa: { name: 'Sanskrit', nativeName: 'संस्कृतम्', dir: 'ltr' }
} as const;

export type Language = keyof typeof languages;
export const defaultLanguage: Language = 'en';

// Get language from URL or default
export function getLanguageFromURL(pathname: string): Language {
  const langCode = pathname.split('/')[1];
  if (langCode && langCode in languages) {
    return langCode as Language;
  }
  return defaultLanguage;
}

// Generate paths for all languages
export function getLocalizedPath(path: string, lang: Language): string {
  return `/${lang}${path}`;
}

// Get alternate language links for SEO
export function getAlternateLinks(path: string) {
  return Object.keys(languages).map(lang => ({
    lang,
    href: getLocalizedPath(path, lang as Language)
  }));
}