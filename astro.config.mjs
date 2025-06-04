// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

import partytown from "@astrojs/partytown";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://hiveagency.me',
  integrations: [
    react(), 
    tailwind(), 
    partytown(), 
    sitemap({
      lastmod: new Date(),
      priority: 0.7,
      changefreq: 'weekly',
      customPages: [
        'https://hiveagency.me/',
        'https://hiveagency.me/about/',
        'https://hiveagency.me/categories/',
        'https://hiveagency.me/contact/',
        'https://hiveagency.me/programs/'
      ]
    })
  ],
  adapter: netlify(),
});