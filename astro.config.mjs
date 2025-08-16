// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

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

  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});