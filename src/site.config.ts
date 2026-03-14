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
			fontFamily: "loli",
			fontWeight: "400",
			localFonts: ["loli.ttf"],
			enableCompress: true,
		},
	},

	// 评论配置
	comment: {
		enable: false,
		twikoo: {
			envId: "https://twikoo.vercel.app/",
			masterTag: "博主", // 设置成你 Twikoo 里面站长的标识名字，用于获取认证图标，注意要区分语言
			recentCommentsPageSize: 5, // 首页最新回复显示条数
		},
	},

	// 音乐播放器配置
	musicPlayer: {
		enable: true, // 启用音乐播放器
		mode: "local" as const, // 使用 Meting API 模式
		meting_api:
			"https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",
		id: "14164869977", // 默认歌单 ID
		server: "netease" as const, // 网易云音乐
		type: "playlist" as const, // 播单类型
	},

	// 侧边栏公告配置
	notice: {
		enable: true, // 是否启用公告
		content: "今天的天气看起来不错", // 公告内容，支持简单 HTML
	},

	// 侧栏模块配置
	sidebar: {
		modules: [
			{ name: "profile" },
			{ name: "notice" },
			{ name: "reply" },
			{ name: "category" },
			{ name: "tag" },
		],
	},

	// 动漫外部数据源配置，不开启默认Local（示例，当前禁用）
	// 详细说明请参考 docs/EXTERNAL_ANIME_SOURCE.md
	animeSource: {
		enable: true, // 设为 true 启用
		mode: "local" as const, // 数据源模式：'local' | 'bilibili' | 'bangumi' | 'mixed'
		pageSize: 10, // 每页显示数量，超过此数量开始分页
		// 本地数据源配置
		local: {
			dataPath: "src/data/anime.json", // 本地 JSON 文件路径
		},
		// Bilibili 数据源配置
		bilibili: {
			userId: "701864046", // 必填，从 https://space.bilibili.com/12345678 获取
			token: "", // 可选，SESSDATA token，从浏览器 Cookie 获取
			amount: 50, // 拉取数量
			cacheTime: 86400, // 缓存时间（秒），默认 24 小时
		},
		// Bangumi 数据源配置
		bangumi: {
			userId: "sai", // 必填，从 https://bgm.tv/user/yourname 获取
			token: "", // 可选，Access Token，从 https://next.bgm.tv/demo/access-token 获取
			amount: 50, // 拉取数量
			cacheTime: 86400, // 缓存时间（秒）
		},
	},
};

export const footerConfig = {
	enable: false,
	customHtml: "",
	// 也可以直接编辑 FooterConfig.html 文件来添加备案号等自定义内容
	// 注意：若 customHtml 不为空，则使用 customHtml 中的内容；若 customHtml 留空，则使用 FooterConfig.html 文件中的内容
};
