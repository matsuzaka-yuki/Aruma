import { siteConfig } from "../site.config";

export function isApiImage(url: string): boolean {
	const config = siteConfig.imageOptimization;
	if (!config?.enable) {
		return false;
	}

	const isExcluded = config.apiDomains.some((domain) => url.includes(domain));
	if (isExcluded) {
		return true;
	}

	if (
		siteConfig.randomImage.enable &&
		url.startsWith(siteConfig.randomImage.url)
	) {
		return !siteConfig.randomImage.optimizeApiImage;
	}

	return false;
}

export function isExternalImage(url: string): boolean {
	return url.startsWith("http://") || url.startsWith("https://");
}

export function isLocalImage(url: string): boolean {
	return !isExternalImage(url);
}

export function shouldOptimizeImage(url: string): boolean {
	const config = siteConfig.imageOptimization;
	if (!config?.enable) {
		return false;
	}
	if (isApiImage(url)) {
		return false;
	}
	if (isExternalImage(url)) {
		return false;
	}
	return true;
}

export function getLazyLoadingConfig() {
	const config = siteConfig.imageOptimization;
	if (!config?.lazyLoading.enable) {
		return { enable: false };
	}
	return {
		enable: true,
		loading: "lazy" as const,
		threshold: config.lazyLoading.threshold,
	};
}

export function getPreloadConfig() {
	const config = siteConfig.imageOptimization;
	if (!config?.preload.enable) {
		return { enable: false };
	}
	return {
		enable: true,
		criticalImages: config.preload.criticalImages || 3,
		as: config.preload.as || "image",
	};
}
