import fs from "fs";
import path from "path";
import { siteConfig } from "../src/site.config";

type RecentComment = {
	id: string;
	url: string;
	nick: string;
	comment: string;
	commentText: string;
	created: number;
	relativeTime?: string;
};

type Reply = {
	id: string;
	author: string;
	content: string;
	postTitle: string;
	postUrl: string;
	date: string;
};

function formatDate(timestamp: number): string {
	try {
		return new Intl.DateTimeFormat(siteConfig.lang || "zh-CN", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		}).format(new Date(timestamp));
	} catch {
		return new Date(timestamp).toLocaleDateString();
	}
}

function extractTitleFromUrl(url: string): string {
	const parts = url.split("/").filter(Boolean);
	return parts[parts.length - 1] || "/";
}

async function fetchRecentComments() {
	const commentConfig = siteConfig.comment;
	const twikooConfig = commentConfig?.twikoo as any;

	if (!commentConfig?.enable || !twikooConfig?.envId) {
		console.log("[Twikoo] 评论未启用或 envId 未配置，跳过拉取最新评论。");
		return;
	}

	const pageSize = twikooConfig.recentCommentsPageSize ?? 5;

	// 直接通过 Twikoo HTTP 接口调用 getRecentComments
	const endpoint = new URL(twikooConfig.envId);
	// 适配部分部署方式需要带上路径
	const url = endpoint.toString();

	const payload = {
		event: "GET_RECENT_COMMENTS",
		pageSize,
		includeReply: false,
	};

	console.log("[Twikoo] 正在拉取最新评论...", payload);

	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		console.error("[Twikoo] 拉取最新评论失败", res.status, res.statusText);
		return;
	}

	const json = (await res.json()) as { data?: RecentComment[] };
	const comments = json.data || [];

	const replies: Reply[] = comments.map((item) => ({
		id: item.id,
		author: item.nick,
		content: item.commentText || item.comment,
		postTitle: extractTitleFromUrl(item.url),
		postUrl: item.url,
		date: item.relativeTime || formatDate(item.created),
	}));

	const outputDir = path.resolve(__dirname, "../src/data");
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	const outputFile = path.join(outputDir, "twikooRecentComments.json");
	fs.writeFileSync(outputFile, JSON.stringify(replies, null, 2), "utf-8");

	console.log(
		`[Twikoo] 已拉取 ${replies.length} 条最新评论，写入 ${outputFile}`,
	);
}

fetchRecentComments().catch((err) => {
	console.error("[Twikoo] 拉取最新评论脚本执行出错", err);
	process.exit(1);
});
