import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadTranslations(lang) {
	const i18nDir = path.resolve(__dirname, "../src/i18n/languages");
	const normalizedLang = (lang || "zh-CN").toLowerCase().replace("-", "_");

	const files = fs.readdirSync(i18nDir);
	let langFile = null;

	for (const file of files) {
		const fileLang = file.replace(".ts", "").toLowerCase();
		if (fileLang === normalizedLang) {
			langFile = path.join(i18nDir, file);
			break;
		}
	}

	if (
		!langFile &&
		(normalizedLang.startsWith("zh") || normalizedLang.startsWith("cn"))
	) {
		langFile = path.join(i18nDir, "zh-CN.ts");
	} else if (!langFile) {
		langFile = path.join(i18nDir, "en.ts");
	}

	if (!fs.existsSync(langFile)) {
		console.warn(`Language file not found: ${langFile}`);
		return {};
	}

	const content = fs.readFileSync(langFile, "utf-8");

	const translations = {};

	const patterns = [
		/\[Key\.\w+\]:\s*"([^"]*)"/g,
		/\[Key\.\w+\]:\s*'([^']*)'/g,
	];

	for (const pattern of patterns) {
		let match;
		while ((match = pattern.exec(content)) !== null) {
			const keyMatch = match[0].match(/\[Key\.(\w+)\]/);
			if (keyMatch) {
				translations[keyMatch[1]] = match[1];
			}
		}
	}

	return translations;
}

function createTranslator(lang) {
	const dict = loadTranslations(lang);

	const keyMap = {
		commentDisabled: "twikooCommentDisabled",
		envIdMissing: "twikooEnvIdMissing",
		fetching: "twikooFetching",
		fetchFail: "twikooFetchFail",
		parseFail: "twikooParseFail",
	};

	return (messageKey) => {
		const mappedKey = keyMap[messageKey] || messageKey;
		return dict[mappedKey] || messageKey;
	};
}

function loadSiteConfig() {
	const configPath = path.resolve(__dirname, "../src/site.config.ts");
	const content = fs.readFileSync(configPath, "utf-8");

	// lang
	const langMatch = content.match(/lang:\s*"([^"]+)"/);
	const lang = langMatch ? langMatch[1] : "zh-CN";

	// comment enable
	const commentMatch = content.match(
		/comment:\s*{[\s\S]*?enable:\s*(true|false)/,
	);
	const commentEnabled = commentMatch ? commentMatch[1] === "true" : false;

	// twikoo envId
	const envMatch = content.match(/twikoo:\s*{[\s\S]*?envId:\s*"([^"]+)"/);
	const envId = envMatch ? envMatch[1] : null;

	// recentCommentsPageSize
	const sizeMatch = content.match(/recentCommentsPageSize:\s*(\d+)/);
	const pageSize = sizeMatch ? Number(sizeMatch[1]) : 5;

	return { lang, envId, pageSize, commentEnabled };
}

function loadPostUrls() {
	// 读取当前博客文章列表（src/content/post 下的 md/mdx 文件）
	const postsDir = path.resolve(__dirname, "../src/content/post");
	if (!fs.existsSync(postsDir)) return [];

	const entries = fs.readdirSync(postsDir, { withFileTypes: true });
	const urls = [];

	for (const entry of entries) {
		if (!entry.isFile()) continue;
		const ext = path.extname(entry.name).toLowerCase();
		if (ext !== ".md" && ext !== ".mdx") continue;
		const slug = path.basename(entry.name, ext);
		// 与前端 Twikoo 存储 path 保持一致：/post/{id}（无结尾斜杠）
		urls.push(`/post/${slug}`);
	}

	return urls;
}

function formatDate(lang, timestamp) {
	try {
		return new Intl.DateTimeFormat(lang || "zh-CN", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		}).format(new Date(timestamp));
	} catch {
		return new Date(timestamp).toLocaleDateString();
	}
}

function extractTitleFromUrl(url) {
	const parts = url.split("/").filter(Boolean);
	return parts[parts.length - 1] || "/";
}

async function fetchRecentComments() {
	const { lang, envId, pageSize, commentEnabled } = loadSiteConfig();
	const postUrls = loadPostUrls();
	const translate = createTranslator(lang);

	if (!commentEnabled) {
		console.log(translate("commentDisabled"));
		return;
	}

	if (!envId) {
		console.log(translate("envIdMissing"));
		return;
	}

	// envId 在 HTTP 部署模式下一般就是云函数地址
	const url = envId;

	const payload = {
		// Twikoo 服务端会根据 event 决定调用哪个 API
		// 这里使用 GET_RECENT_COMMENTS，与前端 getRecentComments 对应
		event: "GET_RECENT_COMMENTS",
		pageSize,
		includeReply: false,
		// 只拉取当前博客文章的评论
		urls: postUrls,
	};

	console.log(translate("fetching"), payload);

	let res;
	let text = null;
	try {
		res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		text = await res.text();
	} catch (error) {
		console.error(translate("fetchFail"), error?.message || error);
		return;
	}

	if (!res.ok) {
		console.error(translate("fetchFail"), res.status, res.statusText);
		return;
	}

	let json;
	try {
		json = text ? JSON.parse(text) : [];
	} catch (error) {
		console.error(translate("parseFail"), error?.message || error);
		return;
	}

	const all = json.data || json || [];

	// 再做一层过滤，确保只保留当前站点文章的评论
	const comments = all.filter((item) => postUrls.includes(item.url));

	// 这里只保留评论文本和对应文章链接，不保留昵称等敏感信息
	const replies = comments.map((item) => ({
		id: item.id,
		content: item.commentText || item.comment,
		postUrl: item.url,
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
	const { lang } = loadSiteConfig();
	const translate = createTranslator(lang);
	console.error(translate("twikooFetchFail"), err);
	process.exit(1);
});
