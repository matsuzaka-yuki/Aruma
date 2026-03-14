/**
 * Bilibili 追番数据 API 客户端
 * 参考 Mizuki 项目的 update-bilibili.mjs 实现
 * 使用 axios 库发送请求
 */

import axios from "axios";

const API_BASE = "https://api.bilibili.com/x/space/bangumi/follow/list";
const PAGE_SIZE = 30;

// 状态映射：1=想看，2=在看，3=已看
const STATUS_MAP = {
	1: "planned",
	2: "watching",
	3: "completed",
};

// 延迟函数
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 带重试机制的请求
async function withRetry(apiCall, retries = 3) {
	for (let i = 0; i < retries; i++) {
		try {
			return await apiCall();
		} catch (error) {
			if (i === retries - 1) throw error;
			await delay(1000);
			console.warn(`Request failed, retrying attempt ${i + 1}...`);
		}
	}
}

/**
 * 获取 Bilibili 追番列表
 * @param {Object} config - 配置对象
 * @param {string} config.userId - 用户 ID
 * @param {string} [config.token] - SESSDATA token（可选）
 * @param {number} [config.amount] - 拉取数量（默认 50）
 * @returns {Promise<Array>} 追番列表
 */
async function fetchBilibiliAnime(config) {
	const { userId, token = "", amount = 50 } = config;

	const headers = token ? { cookie: `SESSDATA=${token};` } : {};

	try {
		console.log(`Fetching Bilibili anime for user ${userId}...`);

		const statuses = [1, 2, 3];
		const allResults = [];
		let remainingAmount = amount;

		for (const status of statuses) {
			if (remainingAmount <= 0) break;

			console.log(
				`  Fetching status ${status} (${STATUS_MAP[status]})...`,
			);
			const data = await fetchByStatus(userId, status, remainingAmount, headers);
			allResults.push(...data);
			remainingAmount -= data.length;
			await delay(300);
		}

		return transformBilibiliData(allResults);
	} catch (error) {
		console.error("Failed to fetch Bilibili anime:", error.message);
		return [];
	}
}

/**
 * 根据状态获取数据
 */
async function fetchByStatus(userId, status, amount, headers) {
	// 先获取总页数
	const pageResponse = await withRetry(() =>
		axios.get(
			`${API_BASE}?type=1&follow_status=${status}&vmid=${userId}&ps=1&pn=1`,
			{ headers },
		),
	);

	if (pageResponse?.data?.code !== 0) {
		console.warn(`Failed to get page info for status ${status}`);
		return [];
	}

	const total = pageResponse.data.data.total || 0;
	const totalPages = Math.ceil(total / PAGE_SIZE);

	console.log(`    Total: ${total}, Pages: ${totalPages}`);

	const allItems = [];

	// 分页获取数据
	for (let pn = 1; pn <= totalPages && allItems.length < amount; pn++) {
		console.log(`    Fetching page ${pn}/${totalPages}...`);
		const response = await withRetry(() =>
			axios.get(
				`${API_BASE}?type=1&follow_status=${status}&vmid=${userId}&ps=${PAGE_SIZE}&pn=${pn}`,
				{ headers },
			),
		);

		if (response?.data?.code === 0 && response.data.data.list) {
			allItems.push(...response.data.data.list);
			await delay(200); // 避免请求过快
		}
	}

	return allItems.slice(0, amount);
}

/**
 * 转换 Bilibili 数据为统一的 AnimeItem 格式
 * @param {Array} list - Bilibili API 返回的列表
 * @returns {Array} 转换后的动漫列表
 */
function transformBilibiliData(list) {
	return list.map((item) => {
		// 处理观看进度
		let progress = 0;
		if (item.progress) {
			if (typeof item.progress === "string" && item.progress.trim()) {
				const progressMatch = item.progress.match(/(\d+)/);
				if (progressMatch) {
					progress = parseInt(progressMatch[1], 10) || 0;
				}
			} else if (typeof item.progress === "number") {
				progress = item.progress;
			}
		}

		// 总集数
		const totalEpisodes = item.total_count || 0;

		// 描述
		let description = item.evaluate || item.summary || "";
		if (description) {
			description = description
				.replace(/\u003c/g, "<")
				.replace(/\u003e/g, ">")
				.replace(/\n/g, " ")
				.trim();
		}

		// 提取年份
		let year = "";
		if (item.publish?.release_date) {
			const dateMatch = item.publish.release_date.match(/^(\d{4})/);
			if (dateMatch) {
				year = dateMatch[1];
			}
		} else if (item.publish?.pub_time) {
			const dateMatch = item.publish.pub_time.match(/^(\d{4})/);
			if (dateMatch) {
				year = dateMatch[1];
			}
		}

		// 提取地区/制作信息
		let studio = "";
		if (item.areas && item.areas.length > 0) {
			studio = item.areas[0].name || "";
		}

		// 提取类型/标签
		const tags = [];
		if (item.styles && Array.isArray(item.styles)) {
			tags.push(...item.styles);
		}
		if (tags.length === 0 && item.season_type_name) {
			tags.push(item.season_type_name);
		}
		if (tags.length === 0) {
			tags.push("Unknown");
		}

		// 构建链接
		let link = "#";
		if (item.url) {
			link = item.url;
		} else if (item.season_id) {
			link = `https://www.bilibili.com/bangumi/play/ss${item.season_id}`;
		} else if (item.media_id) {
			link = `https://www.bilibili.com/bangumi/media/md${item.media_id}/`;
		}

		// 将 HTTP 封面链接转换为 HTTPS
		let cover = item.cover || "";
		if (cover && cover.startsWith("http://")) {
			cover = cover.replace("http://", "https://");
		}

		// 状态映射：1=想看，2=在看，3=已看
		const STATUS_MAP = { 1: "planned", 2: "watching", 3: "completed" };

		return {
			title: item.title || "Unknown",
			id: `bilibili_${item.season_id || item.media_id}`,
			cover: cover,
			link: link,
			description: description,
			year: year,
			studio: studio,
			progress: progress,
			totalEpisodes: totalEpisodes,
			source: "bilibili",
			tags: tags,
			rating: item.rating?.score
				? parseFloat(item.rating.score.toFixed(1))
				: 0,
			watchStatus: STATUS_MAP[item.follow_status] || "planned",
		};
	});
}

export { fetchBilibiliAnime };
