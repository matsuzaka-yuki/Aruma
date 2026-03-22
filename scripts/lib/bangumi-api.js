/**
 * Bangumi.tv API 客户端
 * 使用 https://api.bgm.tv/
 */

const BANGIMI_API_BASE = "https://api.bgm.tv/v0";

/**
 * 获取 Bangumi 番剧详细信息（包含 infobox）
 * @param {number} subjectId - 番剧 ID
 * @returns {Promise<Object|null>} 番剧详情
 */
async function fetchSubjectDetail(subjectId) {
	try {
		const headers = {
			"User-Agent": "Aruma/1.0 (https://github.com/your-repo)",
		};
		const response = await fetch(`${BANGIMI_API_BASE}/subjects/${subjectId}`, {
			headers,
		});
		if (!response.ok) return null;
		return await response.json();
	} catch (error) {
		return null;
	}
}

/**
 * 从 infobox 中提取制作公司
 * 按优先级查找: 动画制作 > 制作 > 製作 > 开发
 * @param {Array} infobox - infobox 数组
 * @returns {string} 制作公司名称
 */
function getStudioFromInfobox(infobox) {
	if (!Array.isArray(infobox)) return "Unknown";

	const targetKeys = ["动画制作", "制作", "製作", "开发"];

	for (const key of targetKeys) {
		const item = infobox.find((i) => i.key === key);
		if (item) {
			if (typeof item.value === "string") {
				return item.value;
			}
			if (Array.isArray(item.value)) {
				const validItem = item.value.find((v) => v.v);
				if (validItem) return validItem.v;
			}
		}
	}
	return "Unknown";
}

/**
 * 获取 Bangumi 用户收藏的动画列表
 * 支持分页拉取，突破单次请求 100 条的限制
 * @param {Object} config - 配置对象
 * @param {string} config.userId - 用户 ID
 * @param {number} [config.amount] - 拉取数量（默认 50）
 * @param {boolean} [config.fetchDetail] - 是否获取番剧详情（包含制作公司）
 * @returns {Promise<Array>} 动画列表
 */
async function fetchBangumiAnime(config) {
	const { userId, amount = 50, fetchDetail = true } = config;

	const headers = {
		"User-Agent": "Aruma/1.0 (https://github.com/your-repo)",
	};

	const allAnimeList = [];
	let offset = 0;
	const limit = 100; // Bangumi API 单次请求最大 limit
	let hasMore = true;

	while (hasMore && allAnimeList.length < amount) {
		const params = new URLSearchParams({
			subject_type: "2",
			limit: limit.toString(),
			offset: offset.toString(),
		});

		let url = `${BANGIMI_API_BASE}/users/${userId}/collections?${params.toString()}`;

		try {
			const response = await fetch(url, { headers });
			const data = await response.json();

			let animeList;
			let total = 0;

			if (data.data && Array.isArray(data.data)) {
				animeList = data.data;
				total = data.total || 0;
			} else if (Array.isArray(data)) {
				animeList = data;
			} else {
				throw new Error(`Bangumi API error: unexpected data format`);
			}

			// 如果没有更多数据，退出循环
			if (!animeList || animeList.length === 0) {
				hasMore = false;
				break;
			}

			allAnimeList.push(...animeList);

			// 检查是否已达到所需数量
			if (allAnimeList.length >= amount) {
				break;
			}

			// 检查是否已获取所有数据
			if (total > 0 && allAnimeList.length >= total) {
				hasMore = false;
				break;
			}

			offset += limit;
		} catch (error) {
			console.error(`Failed to fetch Bangumi anime at offset ${offset}:`, error.message);
			hasMore = false;
		}
	}

	// 截取到指定数量
	const result = allAnimeList.slice(0, amount);
	console.log(`Fetched ${result.length} Bangumi anime items`);

	// 转换数据
	let transformed = transformBangumiData(result);

	// 获取番剧详情以提取制作公司
	if (fetchDetail && transformed.length > 0) {
		console.log("Fetching subject details for studio info...");
		const subjectIds = transformed.map((anime) => {
			const id = anime.id.replace("bangumi_", "");
			return parseInt(id, 10);
		});

		// 批量获取详情（限制并发）
		const batchSize = 5;
		for (let i = 0; i < subjectIds.length; i += batchSize) {
			const batch = subjectIds.slice(i, i + batchSize);
			const details = await Promise.all(
				batch.map((id) => fetchSubjectDetail(id))
			);

			details.forEach((detail, index) => {
				if (detail && detail.infobox) {
					const studio = getStudioFromInfobox(detail.infobox);
					if (studio) {
						transformed[i + index].studio = studio;
					}
				}
			});

			// 避免请求过快
			if (i + batchSize < subjectIds.length) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		}
	}

	return transformed;
}

/**
 * Bangumi 收藏状态映射到统一的 watchStatus
 * Bangumi API type (数字): 1=wish, 2=collect, 3=do, 4=on_hold, 5=dropped
 * 统一 watchStatus: planned, completed, watching, onhold, dropped
 */
function mapBangumiStatus(bangumiType) {
	const statusMap = {
		1: "planned",      // wish
		2: "completed",    // collect
		3: "watching",     // do
		4: "onhold",       // on_hold
		5: "dropped",      // dropped
	};
	return statusMap[bangumiType] || "planned";
}

/**
 * 转换 Bangumi 数据为统一的 AnimeItem 格式
 * @param {Array} list - Bangumi API 返回的列表（每个 item 包含 subject 对象）
 * @returns {Array} 转换后的动漫列表
 */
function transformBangumiData(list) {
	return list
		.filter((item) => item.subject_type === 2) // 只保留动画（subject_type=2）
		.map((item) => {
			const subject = item.subject; // 实际的动画数据在 subject 对象中
			return {
				title: subject.name_cn || subject.name,
				id: `bangumi_${subject.id}`,
				cover: subject.images?.large || subject.images?.common || "",
				link: `https://bgm.tv/subject/${subject.id}`,
				description: subject.short_summary || "",
				year: subject.date ? subject.date.substring(0, 4) : "",
				studio: "",
				progress: item.ep_status || 0,
				totalEpisodes: subject.eps || subject.volumes || 0,
				source: "bangumi",
				rating: subject.score,
				tags: subject.tags?.map((t) => t.name) || [],
				watchStatus: mapBangumiStatus(item.type),
			};
		});
}

export { fetchBangumiAnime };
