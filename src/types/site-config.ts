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
};

export type CommentConfig = {
	enable: boolean;
	twikoo?: TwikooConfig;
};

export type SiteConfig = {
	title: string;
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
};
