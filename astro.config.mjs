// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), tailwind()],
  adapter: netlify()
});