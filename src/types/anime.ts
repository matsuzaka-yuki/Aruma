// 统一的动漫项目接口（与现有 anime.json 兼容）
export interface AnimeItem {
	title: string;
	id: string;
	cover: string;
	link: string;
	description: string;
	year: string;
	studio: string;
	progress: number;
	totalEpisodes: number;
	source?: "local" | "bilibili" | "bangumi"; // 数据源标识
	rating?: number; // 评分（Bangumi）
	tags?: string[]; // 标签
	watchStatus?: "watching" | "completed" | "planned"; // 观看状态
}

// Bilibili API 响应类型
export interface BilibiliAnimeResponse {
	code: number;
	message: string;
	data: {
		list: BilibiliAnimeItem[];
		pn: number;
		ps: number;
		total: number;
	};
}

export interface BilibiliAnimeItem {
	season_id: number;
	media_id: number;
	title: string;
	cover: string;
	new_ep: {
		id: number;
		title: string;
	};
	progress: string; // "看到第 X 话"
	is_finish: number; // 1=已完结，0=连载中
	is_started: number; // 1=已开始追，0=未开始
	is_followed: number;
	season_type: number;
	evaluate: string; // 简介
	publish: {
		pub_time: string;
		is_finish: string;
		season_type: string;
	};
	up_info: {
		uname: string; // 制作公司/上传者
	};
}

// Bangumi API 响应类型
export interface BangumiAnimeItem {
	id: number;
	url: string;
	name: string;
	name_cn: string;
	summary: string;
	air_date: string;
	air_weekday: number;
	rating: {
		rank: number;
		score: number;
	};
	images: {
		small: string;
		grid: string;
		large: string;
		medium: string;
		common: string;
	};
	collection?: {
		status: string; // "watching", "done", "dropped", etc.
		ep_status: number; // 已看集数
		vol_status: number; // 总集数
	};
	eps?: number; // 总集数
	type: number; // 1=动画
}
