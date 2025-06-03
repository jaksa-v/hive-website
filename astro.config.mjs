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
  integrations: [react(), tailwind(), partytown(), sitemap()],
  adapter: netlify(),
});