import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import astroParser from "astro-eslint-parser";
import { defineConfig } from "eslint/config";
import astroPlugin from "eslint-plugin-astro";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sveltePlugin from "eslint-plugin-svelte";
import globals from "globals";
import svelteParser from "svelte-eslint-parser";
import tseslint from "typescript-eslint";

const browserGlobals = {
	...globals.browser,
	console: "readonly",
	MutationObserver: "readonly",
	setTimeout: "readonly",
	clearTimeout: "readonly",
	ImageMetadata: "readonly",
	URLSearchParams: "readonly",
	requestAnimationFrame: "readonly",
	HTMLElement: "readonly",
	Element: "readonly",
	Node: "readonly",
	Event: "readonly",
	KeyboardEvent: "readonly",
	CustomEvent: "readonly",
	EventListener: "readonly",
	MediaQueryList: "readonly",
	MediaQueryListEvent: "readonly",
	sessionStorage: "readonly",
	localStorage: "readonly",
	navigator: "readonly",
};

export default defineConfig([
	{
		ignores: [
			"node_modules/**",
			"dist/**",
			".astro/**",
			"public/**",
			"scripts/**",
			"demo/**",
			"**/*.html",
			"**/*.md",
			"**/*.mdx",
		],
	},

	eslint.configs.recommended,
	{
		rules: {
			"no-undef": "off",
			"no-unused-vars": "off",
			"no-unreachable": "off",
			"prefer-const": "warn",
			"no-var": "error",
			eqeqeq: "warn",
			curly: "warn",
			"no-console": "warn",
			"no-debugger": "warn",
			"no-useless-assignment": "off",
			"no-redeclare": "off",
			"no-empty-pattern": "off",
			"no-empty": "off",
			"no-useless-escape": "off",
		},
	},

	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				...globals.browser,
				console: "readonly",
				setTimeout: "readonly",
				clearTimeout: "readonly",
				URLSearchParams: "readonly",
				requestAnimationFrame: "readonly",
			},
		},
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/consistent-type-imports": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/prefer-for-of": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-unused-expressions": "off",
			"@typescript-eslint/triple-slash-reference": "off",
			"@typescript-eslint/consistent-indexed-object-style": "off",
			"@typescript-eslint/unified-signatures": "off",
		},
	},

	{
		files: ["**/*.svelte"],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tseslint.parser,
				svelteConfig: {
					parser: "svelte-eslint-parser",
				},
			},
			globals: browserGlobals,
		},
		plugins: {
			svelte: sveltePlugin,
		},
		processor: sveltePlugin.processors.svelte,
		rules: {
			...sveltePlugin.configs.recommended.rules,
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-expressions": "off",
		},
	},

	{
		files: ["**/*.astro"],
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: [".astro", ".svelte"],
			},
			globals: browserGlobals,
		},
		plugins: {
			astro: astroPlugin,
		},
		processor: astroPlugin.processors["client-side-ts"],
		rules: {
			...astroPlugin.configs.recommended.rules,
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/prefer-for-of": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-expressions": "off",
			"astro/no-deprecated-astro-fetchcontent": "off",
			"astro/no-set-html-directive": "off",
			"astro/no-unused-define-vars-in-style": "off",
		},
	},

	{
		plugins: {
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			"simple-import-sort/imports": "warn",
			"simple-import-sort/exports": "warn",
		},
	},
]);
