/**
 * 社交平台图标映射到 Material Icons
 */
export const socialIconMap: Record<string, string> = {
	// 通用社交平台
	github: "code",
	twitter: "share",
	email: "email",
	facebook: "public",
	instagram: "camera_alt",
	linkedin: "work",
	youtube: "play_circle_filled",

	// 中国社交平台
	bilibili: "play_circle",
	qq: "chat",
	wechat: "chat_bubble",
	weibo: "public",
	zhihu: "question_answer",

	// 其他常见平台
	rss: "rss_feed",
	blog: "article",
	douban: "library_books",
	telegram: "send",
	discord: "forum",
	reddit: "forum",
	medium: "article",
	stackoverflow: "code",

	// 通用 fallback
	link: "link",
	website: "language",
	home: "home",
};

/**
 * 获取社交图标
 * @param iconName 配置中的图标名称
 * @returns Material Icons 图标名称
 */
export function getSocialIcon(iconName: string): string {
	return socialIconMap[iconName.toLowerCase()] || "link";
}
