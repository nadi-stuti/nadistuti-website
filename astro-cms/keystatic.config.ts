import { config, collection, fields } from '@keystatic/core';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'हिन्दी', value: 'hi' },
  { label: 'অসমীয়া', value: 'as' },
  { label: 'বাংলা', value: 'bn' },
  { label: 'ગુજરાતી', value: 'gu' },
  { label: 'ಕನ್ನಡ', value: 'kn' },
  { label: 'മലയാളം', value: 'ml' },
  { label: 'मराठी', value: 'mr' },
  { label: 'ଓଡ଼ିଆ', value: 'or' },
  { label: 'ਪੰਜਾਬੀ', value: 'pa' },
  { label: 'संस्कृतम्', value: 'sa' },
  { label: 'தமிழ்', value: 'ta' },
  { label: 'తెలుగు', value: 'te' },
] as const;

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    pages: collection({
      label: 'Pages',
      slugField: 'slug',
      path: 'src/content/pages/*.json',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'URL Slug (e.g., home, watch)' } }),
        title: fields.object(
          Object.fromEntries(
            languages.map(lang => [
              lang.value,
              fields.text({ label: `Title (${lang.label})` }),
            ])
          ), { label: 'Page Titles' }
        ),
        description: fields.object(
          Object.fromEntries(
            languages.map(lang => [
              lang.value,
              fields.text({
                label: `SEO Description (${lang.label})`,
                multiline: true,
              }),
            ])
          ), { label: 'Page Descriptions' }
        ),
        content: fields.object(
          Object.fromEntries(
            languages.map(lang => [
              lang.value,
              fields.markdoc({
                label: `Content (${lang.label})`,
                extension: 'mdoc',
              }),
            ])
          ), { label: 'Page Content' }
        ),
      },
    }),
  },
});
