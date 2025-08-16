// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://nadistuti.com",
  i18n: {
    defaultLocale: "en",
    locales: [
      "en",
      "hi",
      "ta",
      "te",
      "kn",
      "ml",
      "bn",
      "gu",
      "mr",
      "pa",
      "or",
      "as",
      "sa",
    ],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});
