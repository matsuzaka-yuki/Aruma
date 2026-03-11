// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import rehypeComponents from 'rehype-components';
import { rehypeWrapTable } from './src/plugins/rehype-wrap-table.mjs';
import { GithubCardComponent } from './src/plugins/rehype-component-github-card.mjs';
import { parseDirectiveNode } from './src/plugins/remark-directive-rehype.mjs';
import { remarkDetectMath } from './src/plugins/remark-detect-math.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://aruma.mysqil.com',
  output: 'static',
  integrations: [mdx(), sitemap()],

  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, parseDirectiveNode, remarkDetectMath],
    rehypePlugins: [
      [rehypeKatex, { output: 'htmlAndMath' }],
      rehypeWrapTable,
      [
        rehypeComponents,
        {
          components: {
            github: GithubCardComponent,
          },
        },
      ],
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
