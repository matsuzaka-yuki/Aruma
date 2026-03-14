/**
 * 外部动漫数据拉取脚本
 * 在构建时执行，从 Bilibili 和/或 Bangumi 拉取追番数据
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { fetchBilibiliAnime } from "./lib/bilibili-api.js";
import { fetchBangumiAnime } from "./lib/bangumi-api.js";
import {
	isCacheValid,
	writeCache,
	getCachedAnime,
} from "./lib/cache-manager.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIG_FILE = join(__dirname, "../src/site.config.ts");

/**
 * 解析 site.config.ts 获取动漫数据源配置
 */
function parseConfig() {
	const configContent = readFileSync(CONFIG_FILE, "utf-8");

	// 检查 animeSource 是否存在
	if (!configContent.includes("animeSource:")) {
		console.log(
			"No animeSource config found, skipping external anime fetch",
		);
		return null;
	}

	// 提取 animeSource 块的内容（从 animeSource: 到 };）
	const startIndex = configContent.indexOf("animeSource:");
	const endIndex = configContent.indexOf("};", startIndex);

	if (endIndex === -1) {
		console.log(
			"Invalid animeSource config format, skipping external anime fetch",
		);
		return null;
	}

	const animeSourceBlock = configContent.substring(startIndex, endIndex);

	// 只检查 animeSource 块内的 enable 字段
	if (animeSourceBlock.match(/enable:\s*false/)) {
		console.log("animeSource is disabled, skipping external anime fetch");
		return null;
	}

	// 从 animeSource 块中提取 mode 配置
	const modeMatch = animeSourceBlock.match(/mode:\s*['"]([^'"]+)['"]/);
	const mode = modeMatch ? modeMatch[1] : "mixed";

	// 提取配置值（改进版）
	const config = {
		enable: true,
		mode: mode,
		bilibili: {
			userId:
				extractConfigValue(configContent, "bilibili", "userId") || "",
			token: extractConfigValue(configContent, "bilibili", "token") || "",
			amount: parseInt(
				extractConfigValue(configContent, "bilibili", "amount") || "50",
			),
			cacheTime: parseInt(
				extractConfigValue(configContent, "bilibili", "cacheTime") ||
					"86400",
			),
		},
		bangumi: {
			userId:
				extractConfigValue(configContent, "bangumi", "userId") || "",
			amount: parseInt(
				extractConfigValue(configContent, "bangumi", "amount") || "50",
			),
			cacheTime: parseInt(
				extractConfigValue(configContent, "bangumi", "cacheTime") ||
					"86400",
			),
		},
	};

	console.log("Parsed animeSource config:", {
		enable: config.enable,
		mode: config.mode,
	});

	return config;
}

/**
 * 从配置内容中提取值（改进版）
 * 支持提取字符串和数字值
 */
function extractConfigValue(content, section, key) {
	// 构建正则表达式，匹配 section: { ... key: value ... } 结构
	// 首先找到 section 块
	const sectionRegex = new RegExp(`${section}:\\s*{([\\s\\S]*?)}\\s*,`, "m");
	const sectionMatch = content.match(sectionRegex);

	if (!sectionMatch) {
		return null;
	}

	const sectionContent = sectionMatch[1];

	// 在 section 块中查找 key
	// 支持字符串值（单引号或双引号）和数字值
	const keyRegex = new RegExp(`${key}:\\s*['"]?([^'"}\\s,]+)['"]?`, "m");
	const keyMatch = sectionContent.match(keyRegex);

	return keyMatch ? keyMatch[1] : null;
}

/**
 * 主函数
 */
async function main() {
	console.log("=== Fetching External Anime Data ===");

	const config = parseConfig();
	if (!config) {
		console.log("External anime fetch skipped");
		return;
	}

	const results = {
		bilibili: [],
		bangumi: [],
	};

	// 拉取 Bilibili 数据
	if (config.mode === "bilibili" || config.mode === "mixed") {
		const bilibiliConfig = config.bilibili;
		if (bilibiliConfig.userId) {
			try {
				if (isCacheValid("bilibili", bilibiliConfig.cacheTime)) {
					console.log("Using cached Bilibili data");
					results.bilibili = getCachedAnime("bilibili");
				} else {
					console.log(
						`Fetching Bilibili anime for user ${bilibiliConfig.userId}...`,
					);
					results.bilibili = await fetchBilibiliAnime(bilibiliConfig);
					writeCache(results.bilibili, "bilibili");
				}
			} catch (error) {
				console.error("Failed to fetch Bilibili data:", error.message);
			}
		}
	}

	// 拉取 Bangumi 数据
	if (config.mode === "bangumi" || config.mode === "mixed") {
		const bangumiConfig = config.bangumi;
		if (bangumiConfig.userId) {
			try {
				if (isCacheValid("bangumi", bangumiConfig.cacheTime)) {
					console.log("Using cached Bangumi data");
					results.bangumi = getCachedAnime("bangumi");
				} else {
					console.log(
						`Fetching Bangumi anime for user ${bangumiConfig.userId}...`,
					);
					results.bangumi = await fetchBangumiAnime(bangumiConfig);
					writeCache(results.bangumi, "bangumi");
				}
			} catch (error) {
				console.error("Failed to fetch Bangumi data:", error.message);
			}
		}
	}

	console.log(`=== Fetch Complete ===`);
	console.log(`Bilibili: ${results.bilibili.length} items`);
	console.log(`Bangumi: ${results.bangumi.length} items`);
}

main().catch(console.error);
