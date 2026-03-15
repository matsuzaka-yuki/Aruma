export const socialIconMap: Record<string, string> = {
	github: "fa6-brands:github",
	twitter: "fa6-brands:twitter",
	email: "fa6-solid:envelope",
	facebook: "fa6-brands:facebook",
	instagram: "fa6-brands:instagram",
	linkedin: "fa6-brands:linkedin",
	youtube: "fa6-brands:youtube",
	bilibili: "fa6-brands:bilibili",
	qq: "fa6-brands:qq",
	wechat: "fa6-brands:weixin",
	weibo: "fa6-brands:weibo",
	zhihu: "fa6-brands:zhihu",
	rss: "fa6-solid:rss",
	blog: "fa6-solid:blog",
	douban: "fa6-brands:douban",
	telegram: "fa6-brands:telegram",
	discord: "fa6-brands:discord",
	reddit: "fa6-brands:reddit",
	medium: "fa6-brands:medium",
	stackoverflow: "fa6-brands:stackoverflow",
	link: "fa6-solid:link",
	website: "fa6-solid:globe",
	home: "fa6-solid:house",
};

export function getSocialIcon(iconName: string): string {
	if (iconName.startsWith("fa6-") || iconName.startsWith("fa-")) {
		return iconName.replace(/^fa-/, "fa6-");
	}
	return socialIconMap[iconName.toLowerCase()] || "fa6-solid:link";
}
