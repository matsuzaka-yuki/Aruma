import avatarImage from "./assets/home/logo.webp";
import backgroundImage from "./assets/home/bg.webp";
import sidebarImage from "./assets/home/sidebar.webp";
import type { SiteConfig } from "./types/site-config";

export const siteConfig: SiteConfig = {
	title: "有希",
	description: "有希的个人博客",
	author: "有希",
	lang: "zh-CN",
	avatar: avatarImage.src,
	background: backgroundImage.src,
	sidebarBg: sidebarImage.src,
	postBackground: "rgba(255, 255, 255, 0.7)", // 文章背景色 (带透明度)
	sidebarBackground: "rgba(255, 255, 255, 0.8)", // 侧边栏背景色
	glassmorphism: true,
	social: [
		{ name: "GitHub", url: "https://github.com/nut612", icon: "github" },
		{ name: "Twitter", url: "https://twitter.com", icon: "twitter" },
		{ name: "Email", url: "mailto:example@email.com", icon: "email" },
	],
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

	// 预定义侧栏组件
	// { type: "divider" } ky1 分隔线
	// { type: "category", icon: "widgets" }, ky2 归档
	// { type: "archive", icon: "access_time" }, ky3 分类

	// 随机图片配置
	randomImage: {
		enable: true, // 是否启用随机图片
		ignoreHeroImage: true, // 设为 true 时，即使文章设置了 heroImage 也会强制使用随机图
		url: "https://www.loliapi.com/acg/pc", // 随机图片 API 地址
		optimizeApiImage: false, // 是否对API启用图片优化
	},
	// 功能页面配置
	featurePages: {
		albums: true, // 是否启用相册功能
	},

	// 图片优化配置
	imageOptimization: {
		enable: true, //设为 true 启用所有图片优化功能
		apiDomains: ["loliapi.com"], // API 域名排除列表（这些域名的图片不会被优化）
		quality: 85, // 图片质量 (1-100)，推荐 85
		formats: ["webp", "avif"] as const, // 输出格式（按优先级排序，WebP 优先保证兼容性）
		lazyLoading: {
			// 懒加载配置
			enable: true, // 是否启用懒加载
			threshold: "300px", // 距离视口 300px 时开始加载
		},
		preload: {
			// 预加载配置
			enable: true, // 是否启用预加载
			criticalImages: 3, // 预加载前 3 张关键图片（首屏图片）
			as: "image", // 预加载类型：'image' 或 'fetch'
		},
	},

	// 字体配置
	font: {
		asciiFont: {
			fontFamily: "ZenMaruGothic-Medium",
			fontWeight: "400",
			localFonts: ["ZenMaruGothic-Medium.ttf"],
			enableCompress: true,
		},
		cjkFont: {
			fontFamily: "zk",
			fontWeight: "400",
			localFonts: ["zk.ttf"],
			enableCompress: true,
		},
	},

	// 评论配置
	comment: {
		enable: true,
		twikoo: {
			envId: "https://twikoo.vercel.com/",
			masterTag: "博主", //设置成你Twikoo里面站长的标识名字，用于获取认证图标，注意要区分语言
		},
	},
};

export const footerConfig = {
	enable: false,
	customHtml: "",
	// 也可以直接编辑 FooterConfig.html 文件来添加备案号等自定义内容
	// 注意：若 customHtml 不为空，则使用 customHtml 中的内容；若 customHtml 留空，则使用 FooterConfig.html 文件中的内容
};
