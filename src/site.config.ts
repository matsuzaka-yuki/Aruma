import avatarImage from "./assets/home/logo.webp";
import backgroundImage from "./assets/home/bg.webp";
import sidebarImage from "./assets/home/sidebar.webp";
import type { SiteConfig } from "./types/site-config";

export const siteConfig: SiteConfig = {
	title: "有希",
	subtitle: "有希的个人博客",
	description: "有希的个人博客",
	author: "有希",
	lang: "zh-CN",
	avatar: avatarImage.src,
	background: backgroundImage.src,
	sidebarBg: sidebarImage.src,
	postBackground: "rgba(255, 255, 255, 0.7)",
	sidebarBackground: "rgba(255, 255, 255, 0.8)",
	glassmorphism: true,
	nav: [
		{ name: "home", path: "/", icon: "home" },
		{ type: "category", icon: "widgets" },
		{ type: "archive", icon: "access_time" },
		{ name: "albums", path: "/albums", icon: "photo_album" },
		{ name: "friends", path: "/friends", icon: "link" },
		{ name: "anime", path: "/anime", icon: "movie" },
		{ name: "diary", path: "/diary", icon: "book" },
		{ name: "devices", path: "/devices", icon: "devices" },
		{
			name: "other",
			path: "javascript:;",
			icon: "folder",
			children: [{ name: "about", path: "/about" }],
		},
	],

	randomImage: {
		enable: true,
		ignoreHeroImage: true,
		url: "https://www.loliapi.com/acg/pc",
		optimizeApiImage: false,
	},
	featurePages: {
		albums: true,
	},

	imageOptimization: {
		enable: true,
		apiDomains: ["loliapi.com"],
		quality: 85,
		formats: ["webp", "avif"] as const,
		lazyLoading: {
			enable: true,
			threshold: "300px",
		},
		preload: {
			enable: true,
			criticalImages: 3,
			as: "image",
		},
	},

	font: {
		asciiFont: {
			fontFamily: "ZenMaruGothic-Medium",
			fontWeight: "400",
			localFonts: ["ZenMaruGothic-Medium.ttf"],
			enableCompress: true,
		},
		cjkFont: {
			fontFamily: "loli",
			fontWeight: "400",
			localFonts: ["loli.ttf"],
			enableCompress: true,
		},
	},

	comment: {
		enable: false,
		twikoo: {
			envId: "https://twikoo.vercel.app/",
			masterTag: "博主",
			recentCommentsPageSize: 5,
		},
	},

	musicPlayer: {
		enable: true,
		mode: "local" as const,
		meting_api:
			"https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",
		id: "14164869977",
		server: "netease" as const,
		type: "playlist" as const,
	},

	notice: {
		enable: true,
		content: "今天的天气看起来不错",
	},

	sidebar: {
		modules: [
			{ name: "profile" },
			{ name: "stats" },
			{ name: "notice" },
			{ name: "reply" },
			{ name: "category" },
			{ name: "tag" },
		],
	},

	siteStats: {
		siteStartDate: "2024-01-01",
	},

	// ========================================
	// 社交链接图标配置
	// ========================================
	// 图标格式：使用 Iconify 格式，如 "fa6-brands:github"（FA6 品牌图标）或 "fa6-solid:envelope"（FA6 实心图标）
	// 可用图标参考：https://icones.js.org/collection/fa6-brands 和 https://icones.js.org/collection/fa6-solid
	// ========================================

	// 【个人信息卡片配置】
	// 生效位置：页面右侧侧栏的个人信息卡片（ProfileCard）
	// ----------------------------------------
	profileCard: {
		// social: 社交链接列表，包含 name（名称）、url（跳转链接）、icon（图标）
		social: [
			{
				name: "GitHub",
				url: "https://github.com/matsuzaka-yuki/Aruma",
				icon: "fa6-brands:github",
			},
			{
				name: "bilibili",
				url: "https://space.bilibili.com/701864046",
				icon: "fa6-brands:bilibili",
			},
			{
				name: "Email",
				url: "mailto:becky.balde@email.com",
				icon: "fa6-solid:envelope",
			},
		],
		showSocialLinks: true,
	},

	// 【抽屉个人信息配置】
	// 生效位置：移动端左侧抽屉菜单顶部的个人信息区域（DrawerProfile）
	// ----------------------------------------
	drawerProfile: {
		enable: true,
		social: [
			{
				name: "GitHub",
				url: "https://github.com/matsuzaka-yuki/Aruma",
				icon: "fa6-brands:github",
			},
			{
				name: "bilibili",
				url: "https://space.bilibili.com/701864046",
				icon: "fa6-brands:bilibili",
			},
			{
				name: "Email",
				url: "mailto:becky.balde@email.com",
				icon: "fa6-solid:envelope",
			},
		],
	},

	// 【页脚社交链接配置】
	// 生效位置：页面底部的社交链接区域（Footer）
	// ----------------------------------------
	footerSocial: {
		enable: true,
		social: [
			{
				name: "GitHub",
				url: "https://github.com/matsuzaka-yuki/Aruma",
				icon: "fa6-brands:github",
			},
			{
				name: "bilibili",
				url: "https://space.bilibili.com/701864046",
				icon: "fa6-brands:bilibili",
			},
			{
				name: "Email",
				url: "mailto:becky.balde@email.com",
				icon: "fa6-solid:envelope",
			},
		],
	},

	animeSource: {
		enable: true,
		mode: "local" as const,
		pageSize: 10,
		local: {
			dataPath: "src/data/anime.json",
		},
		bilibili: {
			userId: "701864046",
			token: "",
			amount: 50,
			cacheTime: 86400,
		},
		bangumi: {
			userId: "sai",
			token: "",
			amount: 50,
			cacheTime: 86400,
		},
	},
};

export const footerConfig = {
	enable: false,
	customHtml: "",
};
