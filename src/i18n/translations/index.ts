import type { Language } from '../index';

// Import all translation modules
import { navigationTranslations } from './navigation';
import { homeTranslations } from './home';
import { hymnTranslations } from './hymn';
import { riversTranslations } from './rivers';
import { riverNamesTranslations } from './river-names';
import { riverDescriptionsTranslations } from './river-descriptions';
import { riverContentTranslations } from './river-content';
import { gangaContentTranslations } from './ganga-content';
import { allRiversContentTranslations } from './all-rivers-content';
import { uiTranslations } from './ui';
import { communityTranslations } from './community';
import { eventsTranslations } from './events';
import { studyhubTranslations } from './studyhub';
import { shopTranslations } from './shop';
import { notFoundTranslations } from './404';
import { missionTranslations, appDevelopersTranslations, knowledgeTranslations, creatorsTranslations, artisanTranslations, conservationTranslations, missioncommunityTranslations, ctaTranslations } from './mission';

// Combine all translations
export const translations = {
  ...navigationTranslations,
  ...homeTranslations,
  ...hymnTranslations,
  ...riversTranslations,
  ...riverNamesTranslations,
  ...riverDescriptionsTranslations,
  ...riverContentTranslations,
  ...gangaContentTranslations,
  ...allRiversContentTranslations,
  ...uiTranslations,
  ...communityTranslations,
  ...eventsTranslations,
  ...studyhubTranslations,
  ...shopTranslations,
  ...notFoundTranslations,
  ...missionTranslations,
  ...appDevelopersTranslations,
  ...knowledgeTranslations,
  ...creatorsTranslations,
  ...artisanTranslations,
  ...conservationTranslations,
  ...missioncommunityTranslations,
  ...ctaTranslations,
};

// Helper function to get translation
export function t(key: string, lang: Language): string {
  const translation = translations[key as keyof typeof translations];
  if (!translation) {
    console.warn(`Translation key "${key}" not found`);
    return key;
  }
  return translation[lang] || translation.en || key;
}