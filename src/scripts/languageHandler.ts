/**
 * Client-side language preference handler
 * This script should be included in your main layout to handle language preferences
 */

// Available languages
const SUPPORTED_LANGUAGES = [
  'en', 'hi', 'ta', 'te', 'kn', 'ml', 'bn', 'gu', 'mr', 'pa', 'or', 'as', 'sa'
];

const LANGUAGE_STORAGE_KEY = 'preferred-language';

/**
 * Get the current language from the URL
 */
function getCurrentLanguage(): string {
  const pathname = window.location.pathname;
  const langCode = pathname.split('/')[1];
  return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : 'en';
}

/**
 * Get saved language preference
 */
function getSavedLanguage(): string | null {
  return localStorage.getItem(LANGUAGE_STORAGE_KEY);
}

/**
 * Save language preference
 */
function saveLanguagePreference(language: string): void {
  if (SUPPORTED_LANGUAGES.includes(language)) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
}

/**
 * Handle language preference on page load
 */
function handleLanguagePreference(): void {
  const currentLang = getCurrentLanguage();
  const savedLang = getSavedLanguage();
  
  // Save current language if not already saved
  if (!savedLang) {
    saveLanguagePreference(currentLang);
  }
  
  // If user has a different saved preference and we're not on root page
  // (root page handles this with the popup)
  if (savedLang && savedLang !== currentLang && window.location.pathname !== '/') {
    // Optional: You could redirect here, but it might be disruptive
    // For now, just update the saved preference to current page language
    saveLanguagePreference(currentLang);
  }
}

/**
 * Add language switcher functionality if present on page
 */
function initLanguageSwitcher(): void {
  const languageSwitchers = document.querySelectorAll('[data-language-switcher]');
  
  languageSwitchers.forEach(switcher => {
    switcher.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = (e.currentTarget as HTMLElement).dataset.lang;
      
      if (targetLang && SUPPORTED_LANGUAGES.includes(targetLang)) {
        // Save the new preference
        saveLanguagePreference(targetLang);
        
        // Redirect to the same page in the new language
        const currentPath = window.location.pathname;
        const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}/, '') || '/';
        window.location.href = `/${targetLang}${pathWithoutLang}`;
      }
    });
  });
}

/**
 * Initialize language handling
 */
function initLanguageHandler(): void {
  handleLanguagePreference();
  initLanguageSwitcher();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageHandler);
} else {
  initLanguageHandler();
}

// Export functions for use in other scripts
(window as any).languageHandler = {
  getCurrentLanguage,
  getSavedLanguage,
  saveLanguagePreference,
  SUPPORTED_LANGUAGES
};