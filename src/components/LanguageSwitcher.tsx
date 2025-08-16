import React from 'react';
import { languages, type Language, getLocalizedPath } from '../i18n';

interface LanguageSwitcherProps {
  currentLang: Language;
  currentPath: string;
  className?: string;
}

export default function LanguageSwitcher({ currentLang, currentPath, className = '' }: LanguageSwitcherProps) {
  const handleLanguageChange = (newLang: Language) => {
    // Navigate to the same page in the new language
    const newPath = getLocalizedPath(currentPath, newLang);
    
    // Navigate to new path
    window.location.href = newPath;
  };

  return (
    <div className={`relative ${className}`}>
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        className="bg-black backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {Object.entries(languages).map(([code, info]) => (
          <option 
            key={code} 
            value={code}
            className="bg-gray-800 text-white"
          >
            {info.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
}