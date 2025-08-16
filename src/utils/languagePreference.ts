import type { Language } from '../i18n/index';
import { languages, defaultLanguage } from '../i18n/index';

export const LANGUAGE_STORAGE_KEY = 'preferred-language';

/**
 * Get the user's preferred language from localStorage
 */
export function getPreferredLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved && saved in languages) {
    return saved as Language;
  }
  return null;
}

/**
 * Save the user's preferred language to localStorage
 */
export function setPreferredLanguage(language: Language): void {
  if (typeof window === 'undefined') return;
  
  if (language in languages) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
}

/**
 * Check if this is the user's first visit (no language preference saved)
 */
export function isFirstVisit(): boolean {
  if (typeof window === 'undefined') return false;
  return !localStorage.getItem(LANGUAGE_STORAGE_KEY);
}

/**
 * Redirect to the user's preferred language or show language selector
 */
export function handleLanguageRedirect(): void {
  if (typeof window === 'undefined') return;
  
  const currentPath = window.location.pathname;
  
  // Don't redirect if we're already on a language-specific page
  if (currentPath !== '/' && currentPath !== '/index.html') {
    return;
  }
  
  const preferredLang = getPreferredLanguage();
  
  if (preferredLang) {
    // Redirect to preferred language
    window.location.href = `/${preferredLang}/`;
  }
  // If no preferred language, the LanguageSelector component will handle showing the popup
}

/**
 * Get browser's preferred languages and suggest the best match
 */
export function getBrowserLanguagePreference(): Language {
  if (typeof window === 'undefined') return defaultLanguage;
  
  const browserLangs = navigator.languages || [navigator.language];
  
  for (const browserLang of browserLangs) {
    // Check exact match first (e.g., 'hi')
    const langCode = browserLang.split('-')[0].toLowerCase();
    if (langCode in languages) {
      return langCode as Language;
    }
  }
  
  return defaultLanguage;
}