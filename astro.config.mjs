import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from "@astrojs/cloudflare";
import { remarkModifiedTime } from "./remark-modified-time.mjs";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
  site: "https://dev.wellwich.com",
  integrations: [tailwind(), sitemap()]
});