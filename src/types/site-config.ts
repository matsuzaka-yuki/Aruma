export type SocialLink = {
	name: string;
	url: string;
	icon: string;
};

export type NavItem = {
	name?: string;
	path?: string;
	type?: string;
	icon?: string;
	children?: NavItem[];
};

export type RandomImageConfig = {
	enable: boolean;
	ignoreHeroImage: boolean;
	url: string;
	optimizeApiImage?: boolean; // 是否优化此 API 的图片（默认 false，保持原样）
};

export type FeaturePagesConfig = {
	albums: boolean;
};

export type FooterConfig = {
	enable: boolean;
	customHtml?: string;
};

export type FontCategoryConfig = {
	fontFamily: string;
	fontWeight: string | number;
	localFonts: string[];
	enableCompress: boolean;
};

export type FontConfig = {
	asciiFont: FontCategoryConfig;
	cjkFont: FontCategoryConfig;
};

export type ImageOptimizationConfig = {
	enable: boolean; // 总开关（默认 false）
	apiDomains: string[]; // API 域名排除列表
	quality: number; // 图片质量 (1-100)
	formats: ("webp" | "avif")[]; // 输出格式
	lazyLoading: {
		enable: boolean;
		threshold: string; // 例：'300px'
	};
	preload: {
		enable: boolean;
		criticalImages?: number; // 首屏关键图片数量（默认 3）
		as?: "image" | "fetch"; // 预加载类型
	};
};

export type TwikooConfig = {
	envId: string;
	region?: string;
	lang?: string;
	masterTag?: string; // 博主标识文字
	recentCommentsPageSize?: number; // 首页最新回复显示条数
};

export type CommentConfig = {
	enable: boolean;
	twikoo?: TwikooConfig;
};

export type MusicPlayerConfig = {
	enable: boolean; // 是否启用音乐播放器
	mode: "meting" | "local"; // 播放器模式
	meting_api: string; // Meting API 地址
	id: string; // 歌单 ID
	server: string; // 音乐源服务器 (netease/tencent/kugou 等)
	type: string; // 播单类型 (playlist/album/artist 等)
};

export type NoticeConfig = {
	enable: boolean; // 是否启用公告
	content: string; // 公告内容，支持简单 HTML
};

// 侧栏模块配置
export type SidebarModuleConfig = {
	name: "profile" | "notice" | "reply" | "category" | "tag"; // 模块名称
};

export type SidebarConfig = {
	modules: SidebarModuleConfig[]; // 模块数组，按顺序显示
};

export type SiteConfig = {
	title: string;
	subtitle?: string; // 副标题
	description: string;
	author: string;
	lang: string;
	avatar: string;
	background: string;
	sidebarBg: string;
	postBackground: string;
	sidebarBackground: string;
	glassmorphism: boolean;
	social: SocialLink[];
	nav: NavItem[];
	randomImage: RandomImageConfig;
	featurePages: FeaturePagesConfig;
	font?: FontConfig;
	imageOptimization?: ImageOptimizationConfig;
	comment?: CommentConfig;
	musicPlayer?: MusicPlayerConfig; // 音乐播放器配置
	notice?: NoticeConfig; // 侧边栏公告配置
	sidebar?: SidebarConfig; // 侧栏模块配置
	animeSource?: AnimeSourceConfig; // 动漫数据源配置
};

// 动漫数据源配置
export type AnimeSourceConfig = {
	enable: boolean;
	mode: "local" | "bilibili" | "bangumi" | "mixed";
	pageSize?: number; // 每页显示数量，超过此数量开始分页
	bilibili?: BilibiliAnimeConfig;
	bangumi?: BangumiAnimeConfig;
	local?: LocalAnimeConfig;
};

export type BilibiliAnimeConfig = {
	userId: string; // Bilibili 用户 ID
	token?: string; // SESSDATA（可选，用于获取私有数据）
	amount?: number; // 拉取数量（默认 50）
	cacheTime?: number; // 缓存时间（秒，默认 86400）
	hideMedia?: boolean; // 隐藏媒体信息
};

export type BangumiAnimeConfig = {
	userId: string; // Bangumi 用户 ID
	token?: string; // Access Token（可选）
	amount?: number; // 拉取数量（默认 50）
	cacheTime?: number; // 缓存时间（秒，默认 86400）
};

export type LocalAnimeConfig = {
	dataPath: string; // 本地 JSON 文件路径（默认 "src/data/anime.json"）
};
