import { defineMiddleware } from 'astro:middleware';
import { languages, defaultLanguage, getLanguageFromURL } from './i18n';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Skip middleware for API routes and static assets
  if (pathname.startsWith('/api/') || pathname.startsWith('/_') || pathname.includes('.')) {
    return next();
  }

  // Allow root path to pass through for language selector
  if (pathname === '/') {
    context.locals.lang = defaultLanguage;
    return next();
  }

  const currentLang = getLanguageFromURL(pathname);

  // If the language is not supported, redirect to default language
  if (pathname.startsWith('/') && pathname.split('/')[1] && !(pathname.split('/')[1] in languages)) {
    const newPath = `/${defaultLanguage}${pathname}`;
    return context.redirect(newPath, 302);
  }

  // Add language to locals for use in components
  context.locals.lang = currentLang;

  return next();
});