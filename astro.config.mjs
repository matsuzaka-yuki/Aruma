// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeComponents from "rehype-components";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";

import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { rehypeWrapTable } from "./src/plugins/rehype-wrap-table.mjs";
import { remarkDetectMath } from "./src/plugins/remark-detect-math.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.mjs";
import { remarkFixGithubAdmonitions } from "./src/plugins/remark-fix-github-admonitions.js";

// https://astro.build/config
export default defineConfig({
	site: "https://aruma.mysqil.com",
	output: "static",
	trailingSlash: "always",
	integrations: [mdx(), sitemap(), svelte()],

	// 图片优化配置
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp",
			config: {
				limitInputPixels: false,
			},
		},
	},

	markdown: {
		remarkPlugins: [
			remarkMath,
			remarkFixGithubAdmonitions,
			remarkDirective,
			parseDirectiveNode,
			remarkDetectMath,
		],
		rehypePlugins: [
			[rehypeKatex, { output: "htmlAndMath" }],
			rehypeWrapTable,
			[
				rehypeComponents,
				{
					components: {
						github: GithubCardComponent,
						note: (/** @type {any} */ x, /** @type {any} */ y) =>
							AdmonitionComponent(x, y, "note"),
						tip: (/** @type {any} */ x, /** @type {any} */ y) =>
							AdmonitionComponent(x, y, "tip"),
						important: (/** @type {any} */ x, /** @type {any} */ y) =>
							AdmonitionComponent(x, y, "important"),
						caution: (/** @type {any} */ x, /** @type {any} */ y) =>
							AdmonitionComponent(x, y, "caution"),
						warning: (/** @type {any} */ x, /** @type {any} */ y) =>
							AdmonitionComponent(x, y, "warning"),
					},
				},
			],
		],
	},

	vite: {
		// @ts-ignore
		plugins: [tailwindcss()],
	},
});
