/**
 * Bangumi.tv API 客户端
 * 使用 https://api.bgm.tv/
 */

const BANGIMI_API_BASE = "https://api.bgm.tv";

/**
 * 获取 Bangumi 用户收藏的动画列表
 * 支持分页拉取，突破单次请求 100 条的限制
 * @param {Object} config - 配置对象
 * @param {string} config.userId - 用户 ID
 * @param {number} [config.amount] - 拉取数量（默认 50）
 * @returns {Promise<Array>} 动画列表
 */
async function fetchBangumiAnime(config) {
	const { userId, amount = 50 } = config;

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

		let url = `${BANGIMI_API_BASE}/v0/users/${userId}/collections?${params.toString()}`;

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

	return transformBangumiData(result);
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
				studio: "", // Bangumi API 不直接提供制作公司
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
