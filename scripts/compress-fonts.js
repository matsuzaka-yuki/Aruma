import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Fontmin from "fontmin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getConfig() {
	try {
		const configPath = path.join(__dirname, "../src/site.config.ts");
		const configContent = fs.readFileSync(configPath, "utf-8");

		const langMatch = configContent.match(/lang:\s*["']([^"']+)["']/);
		const lang = langMatch ? langMatch[1] : "zh-CN";

		const fontStartMatch = configContent.match(/font:\s*\{/);
		if (!fontStartMatch) {
			console.log("No font config found, skipping font compression");
			return { lang, fonts: [] };
		}

		const fontStartIndex = fontStartMatch.index;
		let braceCount = 0;
		let i = fontStartIndex + fontStartMatch[0].length - 1;
		let fontEndIndex = -1;

		for (; i < configContent.length; i++) {
			if (configContent[i] === "{") {
				braceCount++;
			} else if (configContent[i] === "}") {
				braceCount--;
				if (braceCount === 0) {
					fontEndIndex = i;
					break;
				}
			}
		}

		if (fontEndIndex === -1) {
			console.log("No font config found, skipping font compression");
			return { lang, fonts: [] };
		}

		const fontConfigStr = configContent.substring(
			fontStartIndex,
			fontEndIndex + 1,
		);
		const fonts = [];

		const fontTypes = ["asciiFont", "cjkFont"];

		for (const fontType of fontTypes) {
			const regex = new RegExp(`${fontType}:\\s*\\{([\\s\\S]*?)\\}`, "m");
			const match = fontConfigStr.match(regex);

			if (match) {
				const fontConfig = match[1];

				const compressMatch = fontConfig.match(
					/enableCompress:\s*(true|false)/,
				);
				const enableCompress = compressMatch
					? compressMatch[1] === "true"
					: false;

				const localFontsMatch = fontConfig.match(
					/localFonts:\s*\[(.*?)\]/s,
				);
				let localFonts = [];

				if (localFontsMatch?.[1].trim()) {
					const fontsStr = localFontsMatch[1];
					localFonts =
						fontsStr
							.match(/["']([^"']+)["']/g)
							?.map((s) => s.replace(/["']/g, "")) || [];
				}

				if (enableCompress && localFonts.length > 0) {
					fonts.push({
						type: fontType,
						files: localFonts,
						enableCompress,
					});
				}
			}
		}

		return { lang, fonts };
	} catch (error) {
		console.error("⚠ Error reading config:", error.message);
		return { lang: "zh-CN", fonts: [] };
	}
}

function readFilesRecursively(dir, fileList = []) {
	if (!fs.existsSync(dir)) return fileList;
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			readFilesRecursively(filePath, fileList);
		} else {
			fileList.push(filePath);
		}
	});

	return fileList;
}

function extractText(content, ext) {
	let text = content;
	let frontmatterText = "";

	if (ext === ".md" || ext === ".mdx") {
		const frontmatterMatch = content.match(/^---[\s\S]*?---/m);
		if (frontmatterMatch) {
			const frontmatter = frontmatterMatch[0];

			const unquotedMatches = frontmatter.match(
				/^\s*\w+:\s*([^'"\n]+)$/gm,
			);
			if (unquotedMatches) {
				unquotedMatches.forEach((match) => {
					const value = match.replace(/^\s*\w+:\s*/, "").trim();
					if (!value.match(/^(true|false|\d{4}-\d{2}-\d{2}|\d+)$/)) {
						frontmatterText += `${value} `;
					}
				});
			}

			const quotedMatches = frontmatter.match(/:\s*['"]([^'"]+)['"]/g);
			if (quotedMatches) {
				quotedMatches.forEach((match) => {
					const value = match.replace(/:\s*['"]([^'"]+)['"]/, "$1");
					frontmatterText += `${value} `;
				});
			}

			const listMatches = frontmatter.match(/^\s*-\s*([^\n]+)$/gm);
			if (listMatches) {
				listMatches.forEach((match) => {
					const value = match.replace(/^\s*-\s*/, "").trim();
					frontmatterText += `${value} `;
				});
			}
		}

		text = text.replace(/^---[\s\S]*?---\s*/m, "");
		text = text.replace(/```[\s\S]*?```/g, "");
		text = text.replace(/`[^`]+`/g, "");
	}

	text = text.replace(/<[^>]*>/g, " ");
	text = text.replace(/[#*_~`[\]()]/g, " ");
	text = text.replace(/https?:\/\/[^\s]+/g, "");
	text = text.replace(/\s+/g, " ").trim();

	const finalText = `${frontmatterText} ${text}`.trim();

	return finalText;
}

function getAsciiCharset() {
	const chars = new Set();

	for (let i = 32; i <= 126; i++) {
		chars.add(String.fromCharCode(i));
	}

	const common = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
	for (const char of common) {
		chars.add(char);
	}

	for (let i = 0; i <= 9; i++) {
		chars.add(String(i));
	}

	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	for (const char of alphabet) {
		chars.add(char);
	}

	return Array.from(chars).sort().join("");
}

async function fetchLocalPlaylistText() {
	try {
		const musicPlayerPath = path.join(
			__dirname,
			"../src/components/svelte/MusicPlayer.svelte",
		);
		if (!fs.existsSync(musicPlayerPath)) {
			console.log(
				"MusicPlayer.svelte not found, skipping local playlist text collection",
			);
			return new Set();
		}

		const content = fs.readFileSync(musicPlayerPath, "utf-8");

		// 提取 localPlaylist 数组
		const playlistMatch = content.match(
			/const localPlaylist\s*=\s*\[([\s\S]*?)\];/,
		);
		if (!playlistMatch) {
			console.log("localPlaylist not found in MusicPlayer.svelte");
			return new Set();
		}

		const textSet = new Set();

		// 提取 title 和 artist 字段的值
		const titleMatches = content.match(/title:\s*["']([^"']+)["']/g) || [];
		const artistMatches =
			content.match(/artist:\s*["']([^"']+)["']/g) || [];

		// 解析并添加字符
		const extractText = (matches) => {
			matches.forEach((match) => {
				const text = match.replace(
					/title:\s*["']|artist:\s*["']|["']/g,
					"",
				);
				for (const char of text) {
					textSet.add(char);
				}
			});
		};

		extractText(titleMatches);
		extractText(artistMatches);

		console.log(
			`Collected ${textSet.size} unique characters from local playlist`,
		);
		return textSet;
	} catch (error) {
		console.log(`Error processing local playlist: ${error.message}`);
		return new Set();
	}
}

async function fetchMetingPlaylistText() {
	try {
		const configPath = path.join(__dirname, "../src/site.config.ts");
		const configContent = fs.readFileSync(configPath, "utf-8");

		const enableMatch = configContent.match(
			/musicPlayer:\s*\{[\s\S]*?enable:\s*(true|false)/,
		);
		if (!enableMatch || enableMatch[1] === "false") {
			console.log(
				"Music player disabled, skipping music text collection",
			);
			return new Set();
		}

		const musicConfigMatch = configContent.match(
			/musicPlayer:\s*\{([\s\S]*?)\}/,
		);

		let meting_api, meting_id, meting_server, meting_type;

		if (!musicConfigMatch) {
			console.log(
				"Music player config not found, skipping music text collection",
			);
			return new Set();
		}

		const configStr = musicConfigMatch[1];

		const modeMatch = configStr.match(/mode:\s*["']([^"']+)["']/);
		const mode = modeMatch ? modeMatch[1] : null;

		if (mode === "local") {
			console.log(
				"Music player mode is 'local', collecting from local playlist...",
			);
			return await fetchLocalPlaylistText();
		}

		if (mode !== "meting") {
			console.log(
				`Music player mode is '${mode}', skipping music text collection`,
			);
			return new Set();
		}

		const apiMatch = configStr.match(/meting_api:\s*["']([^"']+)["']/);
		if (!apiMatch) {
			console.log(
				"meting_api not configured, skipping Meting API text collection",
			);
			return new Set();
		}
		meting_api = apiMatch[1];

		const idMatch = configStr.match(/id:\s*["']([^"']+)["']/);
		if (!idMatch) {
			console.log(
				"id not configured, skipping Meting API text collection",
			);
			return new Set();
		}
		meting_id = idMatch[1];

		const serverMatch = configStr.match(/server:\s*["']([^"']+)["']/);
		meting_server = serverMatch ? serverMatch[1] : "netease";

		const typeMatch = configStr.match(/type:\s*["']([^"']+)["']/);
		meting_type = typeMatch ? typeMatch[1] : "playlist";

		const apiUrl = meting_api
			.replace(":server", meting_server)
			.replace(":type", meting_type)
			.replace(":id", meting_id)
			.replace(":auth", "")
			.replace(":r", Date.now().toString());

		console.log("Fetching music playlist from Meting API...");
		console.log(`  URL: ${apiUrl}`);

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000);

		const textSet = new Set();

		try {
			const response = await fetch(apiUrl, {
				signal: controller.signal,
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
				},
			});
			clearTimeout(timeoutId);

			if (!response.ok) {
				throw new Error(
					`HTTP ${response.status}: ${response.statusText}`,
				);
			}

			const playlist = await response.json();

			if (!Array.isArray(playlist)) {
				throw new Error("API response is not an array");
			}

			console.log(
				`Successfully fetched ${playlist.length} songs from Meting API`,
			);

			let songCount = 0;
			playlist.forEach((song) => {
				const title = song.name ?? song.title ?? "";
				const artist = song.artist ?? song.author ?? "";

				if (title.trim() || artist.trim()) {
					songCount++;

					for (const char of title) {
						textSet.add(char);
					}

					for (const char of artist) {
						textSet.add(char);
					}
				}
			});
			if (songCount === 0) {
				console.log("No valid song data found in API response");
			}
		} catch (fetchError) {
			clearTimeout(timeoutId);

			if (fetchError.name === "AbortError") {
				console.log(
					"Meting API request timeout (10s), skipping music text collection",
				);
			} else {
				console.log(
					`Failed to fetch Meting API data: ${fetchError.message}, skipping music text collection`,
				);
			}
		}

		return textSet;
	} catch (error) {
		console.log(
			`Error processing Meting API config: ${error.message}, skipping music text collection`,
		);
		return new Set();
	}
}

/**
 * 从外部动漫数据源收集文本
 * 当开启了 bilibili 或 bangumi 模式时，从缓存文件中读取番剧数据
 * 提取标题、描述、制作公司等文本中的字符
 */
async function fetchExternalAnimeText() {
	const textSet = new Set();

	try {
		// 检查 site.config.ts 中的 animeSource 配置
		const configPath = path.join(__dirname, "../src/site.config.ts");
		const configContent = fs.readFileSync(configPath, "utf-8");

		// 如果 animeSource 未启用，直接返回空字符串
		if (
			!configContent.includes("animeSource:") ||
			configContent.match(/animeSource:\s*{\s*enable:\s*false/)
		) {
			console.log(
				"animeSource is disabled, skipping external anime text collection",
			);
			return "";
		}

		// 提取 mode 配置
		const modeMatch = configContent.match(
			/animeSource:\s*\{[\s\S]*?mode:\s*["']([^"']+)["']/,
		);
		const mode = modeMatch ? modeMatch[1] : "local";

		console.log(`animeSource mode: ${mode}`);

		// 读取外部动漫缓存文件
		const cacheFile = path.join(
			__dirname,
			"../src/data/external-anime.json",
		);

		if (!fs.existsSync(cacheFile)) {
			console.log(
				"External anime cache file not found, skipping text collection",
			);
			return "";
		}

		const cache = JSON.parse(fs.readFileSync(cacheFile, "utf-8"));

		// 根据模式有选择地收集数据
		if (mode === "bilibili" || mode === "mixed") {
			// 收集 Bilibili 数据文本
			if (cache.bilibili && Array.isArray(cache.bilibili)) {
				console.log(
					`Collecting text from ${cache.bilibili.length} Bilibili anime items`,
				);
				for (const item of cache.bilibili) {
					if (item.title) {
						for (const char of item.title) {
							textSet.add(char);
						}
					}
					if (item.description) {
						for (const char of item.description) {
							textSet.add(char);
						}
					}
					if (item.studio) {
						for (const char of item.studio) {
							textSet.add(char);
						}
					}
				}
			}
		}

		if (mode === "bangumi" || mode === "mixed") {
			// 收集 Bangumi 数据文本
			if (cache.bangumi && Array.isArray(cache.bangumi)) {
				console.log(
					`Collecting text from ${cache.bangumi.length} Bangumi anime items`,
				);
				for (const item of cache.bangumi) {
					if (item.title) {
						for (const char of item.title) {
							textSet.add(char);
						}
					}
					if (item.description) {
						for (const char of item.description) {
							textSet.add(char);
						}
					}
					if (item.studio) {
						for (const char of item.studio) {
							textSet.add(char);
						}
					}
					if (item.tags && Array.isArray(item.tags)) {
						for (const tag of item.tags) {
							for (const char of tag) {
								textSet.add(char);
							}
						}
					}
				}
			}
		}

		const text = Array.from(textSet).sort().join("");
		console.log(
			`Collected ${text.length} unique characters from external anime data`,
		);
		return text;
	} catch (error) {
		console.error("Error fetching external anime text:", error.message);
		return "";
	}
}

async function collectText() {
	const { lang } = await getConfig();

	const textSet = new Set();

	const dataDir = path.join(__dirname, "../src/data");
	const dataFiles = readFilesRecursively(dataDir);

	dataFiles.forEach((file) => {
		if (file.endsWith(".ts") || file.endsWith(".js")) {
			const content = fs.readFileSync(file, "utf-8");

			const patterns = [
				/"([^"\\]|\\.|\\n|\\t)*"/g,
				/'([^'\\]|\\.|\\n|\\t)*'/g,
				/`([^`\\]|\\.|\\n|\\t)*`/g,
			];

			patterns.forEach((pattern) => {
				const matches = content.match(pattern);
				if (matches) {
					matches.forEach((match) => {
						let text = match;

						if (
							(text.startsWith('"') && text.endsWith('"')) ||
							(text.startsWith("'") && text.endsWith("'")) ||
							(text.startsWith("`") && text.endsWith("`"))
						) {
							text = text.slice(1, -1);
						}

						text = text
							.replace(/\\n/g, "\n")
							.replace(/\\t/g, "\t")
							.replace(/\\"/g, '"')
							.replace(/\\'/g, "'");

						for (const char of text) {
							textSet.add(char);
						}
					});
				}
			});
		}
	});

	const configFile = path.join(__dirname, "../src/site.config.ts");
	if (fs.existsSync(configFile)) {
		const content = fs.readFileSync(configFile, "utf-8");

		const patterns = [
			/"([^"\\]|\\.|\\n|\\t)*"/g,
			/'([^'\\]|\\.|\\n|\\t)*'/g,
			/`([^`\\]|\\.|\\n|\\t)*`/g,
		];

		patterns.forEach((pattern) => {
			const matches = content.match(pattern);
			if (matches) {
				matches.forEach((match) => {
					let text = match;

					if (
						(text.startsWith('"') && text.endsWith('"')) ||
						(text.startsWith("'") && text.endsWith("'")) ||
						(text.startsWith("`") && text.endsWith("`"))
					) {
						text = text.slice(1, -1);
					}

					text = text
						.replace(/\\n/g, "\n")
						.replace(/\\t/g, "\t")
						.replace(/\\"/g, '"')
						.replace(/\\'/g, "'");

					for (const char of text) {
						textSet.add(char);
					}
				});
			}
		});
	}

	function findI18nFile(langCode) {
		const i18nDir = path.join(__dirname, "../src/i18n/languages");
		if (!fs.existsSync(i18nDir)) return null;

		const normalizedLang = langCode.toLowerCase().replace(/-/g, "-");
		const files = fs.readdirSync(i18nDir);

		for (const file of files) {
			const fileLang = file.replace(".ts", "").toLowerCase();
			if (
				fileLang === normalizedLang ||
				fileLang === normalizedLang.replace("-", "_")
			) {
				return path.join(i18nDir, file);
			}
		}
		return null;
	}

	const i18nFile = findI18nFile(lang);
	if (i18nFile) {
		const content = fs.readFileSync(i18nFile, "utf-8");

		const patterns = [
			/"([^"\\]|\\.|\\n|\\t)*"/g,
			/'([^'\\]|\\.|\\n|\\t)*'/g,
			/`([^`\\]|\\.|\\n|\\t)*`/g,
		];

		patterns.forEach((pattern) => {
			const matches = content.match(pattern);
			if (matches) {
				matches.forEach((match) => {
					let text = match;

					if (
						(text.startsWith('"') && text.endsWith('"')) ||
						(text.startsWith("'") && text.endsWith("'")) ||
						(text.startsWith("`") && text.endsWith("`"))
					) {
						text = text.slice(1, -1);
					}

					text = text
						.replace(/\\n/g, "\n")
						.replace(/\\t/g, "\t")
						.replace(/\\"/g, '"')
						.replace(/\\'/g, "'");

					for (const char of text) {
						textSet.add(char);
					}
				});
			}
		});
	}

	let contentDir;
	if (process.env.ENABLE_CONTENT_SYNC === "true" && process.env.CONTENT_DIR) {
		contentDir = path.join(__dirname, "..", process.env.CONTENT_DIR);
		console.log(
			`Using external content directory: ${process.env.CONTENT_DIR}`,
		);
	} else {
		contentDir = path.join(__dirname, "../src/content");
	}

	if (!fs.existsSync(contentDir)) {
		console.log(`Content directory does not exist: ${contentDir}`);
		console.log("  Skipping content text collection");
	} else {
		const contentFiles = readFilesRecursively(contentDir);

		contentFiles.forEach((file) => {
			const ext = path.extname(file);
			if ([".md", ".mdx", ".ts", ".js"].includes(ext)) {
				const content = fs.readFileSync(file, "utf-8");
				const text = extractText(content, ext);
				for (const char of text) {
					if (
						char.match(
							/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af\u3000-\u303f\uff00-\uffef]/,
						)
					) {
						textSet.add(char);
					}
				}
			}
		});

		// 将 Twikoo 构建阶段拉取到的最新评论内容加入子集字符集合
		// 仅在 Twikoo 启用时才加入
		try {
			const configPath = path.join(__dirname, "../src/site.config.ts");
			const configContent = fs.readFileSync(configPath, "utf-8");

			// 检查 Twikoo 是否启用
			const twikooEnabledMatch = configContent.match(
				/comment:\s*\{[\s\S]*?enable:\s*(true|false)/,
			);
			const twikooEnabled =
				twikooEnabledMatch && twikooEnabledMatch[1] === "true";

			// 检查是否配置了 envId
			const envIdMatch = configContent.match(
				/twikoo:\s*\{[\s\S]*?envId:\s*["']([^"']+)["']/,
			);
			const hasEnv = envIdMatch && envIdMatch[1];

			if (twikooEnabled && hasEnv) {
				const twikooFile = path.join(
					__dirname,
					"../src/data/twikooRecentComments.json",
				);
				if (fs.existsSync(twikooFile)) {
					const raw = fs.readFileSync(twikooFile, "utf-8");
					const comments = JSON.parse(raw);

					if (Array.isArray(comments)) {
						comments.forEach((item) => {
							const content = item?.content;
							if (typeof content === "string" && content.trim()) {
								for (const char of content) {
									textSet.add(char);
								}
							}
						});
						console.log(
							`Added Twikoo recent comments characters to font subset: ${comments.length} comments`,
						);
					}
				}
			} else {
				console.log(
					"Twikoo is disabled or envId not configured, skipping comment text collection for font subset",
				);
			}
		} catch (err) {
			console.warn(
				"Failed to read Twikoo recent comments for font subset:",
				err.message,
			);
		}
	}

	const commonChars = "0123456789，。！？；：\"\"''（）【】《》、·—…「」『』";
	for (const char of commonChars) {
		textSet.add(char);
	}

	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	for (const char of alphabet) {
		textSet.add(char);
	}

	const metingTextSet = await fetchMetingPlaylistText();

	for (const char of metingTextSet) {
		textSet.add(char);
	}

	if (metingTextSet.size > 0) {
		console.log(
			`Added ${metingTextSet.size} unique characters from music playlist`,
		);
	}

	// 添加：从外部动漫数据源收集文本
	const externalAnimeText = await fetchExternalAnimeText();
	for (const char of externalAnimeText) {
		textSet.add(char);
	}

	// 过滤非法字符，只保留合法的 CJK 和 ASCII 字符
	const filteredTextSet = new Set();
	const validChars =
		/[\u4e00-\u9fff\u3400-\u4dbf\u20000-\u2a6df\u2a700-\u2b73f\u2b740-\u2b81f\u2b820-\u2ceaf\u2ceb0-\u2ebef\u3007\u3021-\u302f\u3038-\u303b\u3040-\u309f\u30a0-\u30ff\u31f0-\u31ff\u3200-\u32ff\u3300-\u33ff\uf900-\ufaff\ufe30-\ufe4f\u2f800-\u2fa1f\uac00-\ud7af\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\ud7b0-\ud7ff\u0021-\u007e\u0080-\u00ff\u3000-\u303f\uff00-\uffef]/;

	for (const char of textSet) {
		if (validChars.test(char)) {
			filteredTextSet.add(char);
		}
	}

	console.log(
		`Filtered ${textSet.size - filteredTextSet.size} invalid characters, kept ${filteredTextSet.size} valid characters`,
	);

	return Array.from(filteredTextSet).sort().join("");
}

async function compressFonts() {
	try {
		const { fonts } = await getConfig();

		if (fonts.length === 0) {
			console.log(
				"No fonts to compress (enableCompress=false or localFonts is empty)",
			);
			return;
		}

		console.log(`Found ${fonts.length} font configs to compress`);

		const distDir = path.join(__dirname, "../dist");
		if (!fs.existsSync(distDir)) {
			console.log(
				"dist directory does not exist, please run astro build first",
			);
			return;
		}

		const distFontDir = path.join(distDir, "fonts");
		if (!fs.existsSync(distFontDir)) {
			fs.mkdirSync(distFontDir, { recursive: true });
		}

		const cjkText = await collectText();
		const asciiText = getAsciiCharset();

		console.log("Starting font compression...");

		let totalOriginalSize = 0;
		let totalCompressedSize = 0;
		let processedCount = 0;

		const errors = [];

		for (const fontConfig of fonts) {
			const text = fontConfig.type === "asciiFont" ? asciiText : cjkText;

			for (const fontFile of fontConfig.files) {
				const fontSrc = path.join(
					__dirname,
					"../public/fonts",
					fontFile,
				);
				const ext = path.extname(fontFile).toLowerCase();
				const baseName = path.basename(fontFile, ext);

				if (!fs.existsSync(fontSrc)) {
					const errorMsg = `Font file does not exist [${fontConfig.type}]: "${fontFile}"\n  Expected path: public/fonts/${fontFile}`;
					errors.push(errorMsg);
					console.log(`Error: ${errorMsg}`);
					continue;
				}

				const originalSize = fs.statSync(fontSrc).size;
				totalOriginalSize += originalSize;

				if (ext === ".woff2" || ext === ".woff") {
					console.log(
						`Skipping ${fontFile} (already web-optimized format)`,
					);

					const destFile = path.join(distFontDir, fontFile);
					fs.copyFileSync(fontSrc, destFile);
					totalCompressedSize += originalSize;
				} else if (ext === ".ttf" || ext === ".otf") {
					console.log(`Compressing ${fontFile}...`);

					let compressionSuccess = false;

					try {
						const fontmin = new Fontmin()
							.src(fontSrc)
							.use(
								Fontmin.glyph({
									text: text,
									hinting: false,
								}),
							)
							.use(
								Fontmin.ttf2woff2({
									deflate: true,
								}),
							)
							.dest(distFontDir);

						await new Promise((resolve, reject) => {
							fontmin.run((err, files) => {
								if (err) {
									reject(err);
								} else {
									resolve(files);
								}
							});
						});

						const compressedFile = path.join(
							distFontDir,
							`${baseName}.woff2`,
						);

						if (fs.existsSync(compressedFile)) {
							const compressedSize =
								fs.statSync(compressedFile).size;
							totalCompressedSize += compressedSize;
							const reduction = (
								(1 - compressedSize / originalSize) *
								100
							).toFixed(2);

							console.log(
								`  ${fontFile} -> ${baseName}.woff2 (${(compressedSize / 1024).toFixed(2)} KB, reduced ${reduction}%)`,
							);
							processedCount++;
							compressionSuccess = true;
						}
					} catch (compressError) {
						console.log(
							`  ⚠ Font subsetting failed for ${fontFile}: ${compressError.message}`,
						);

						try {
							console.log(
								`  ℹ Retrying with WOFF2 conversion only (no subsetting)...`,
							);

							const fontmin = new Fontmin()
								.src(fontSrc)
								.use(
									Fontmin.ttf2woff2({
										deflate: true,
									}),
								)
								.dest(distFontDir);

							await new Promise((resolve, reject) => {
								fontmin.run((err, files) => {
									if (err) {
										reject(err);
									} else {
										resolve(files);
									}
								});
							});

							const compressedFile = path.join(
								distFontDir,
								`${baseName}.woff2`,
							);

							if (fs.existsSync(compressedFile)) {
								const compressedSize =
									fs.statSync(compressedFile).size;
								totalCompressedSize += compressedSize;
								const reduction = (
									(1 - compressedSize / originalSize) *
									100
								).toFixed(2);

								console.log(
									`  ${fontFile} -> ${baseName}.woff2 (${(compressedSize / 1024).toFixed(2)} KB, reduced ${reduction}%) [WOFF2 only]`,
								);
								processedCount++;
								compressionSuccess = true;
							}
						} catch (woff2Error) {
							console.log(
								`  ⚠ WOFF2 conversion also failed: ${woff2Error.message}`,
							);
						}
					}

					if (!compressionSuccess) {
						console.log(`  ℹ Using original ${fontFile} instead`);
						errors.push(
							`Font compression failed: ${fontFile} - unable to convert to WOFF2`,
						);

						const destFile = path.join(distFontDir, fontFile);
						fs.copyFileSync(fontSrc, destFile);
						totalCompressedSize += originalSize;
						processedCount++;
					}
				} else {
					console.log(
						`Unsupported font format, skipping: ${fontFile}`,
					);
				}
			}
		}

		if (errors.length > 0) {
			console.log(
				`\n⚠ Font compression encountered ${errors.length} errors (using original fonts):`,
			);
			errors.forEach((err) => console.log(`  - ${err}`));

			const fontDir = path.join(__dirname, "../public/fonts");
			if (fs.existsSync(fontDir)) {
				const actualFiles = fs
					.readdirSync(fontDir)
					.filter((f) =>
						[".ttf", ".otf", ".woff", ".woff2"].includes(
							path.extname(f).toLowerCase(),
						),
					);

				if (actualFiles.length > 0) {
					console.log("\nAvailable font files:");
					actualFiles.forEach((f) => console.log(`  - ${f}`));
				} else {
					console.log("\n  (font directory is empty)");
				}
			}
		}

		if (processedCount > 0) {
			const totalReduction = (
				(1 - totalCompressedSize / totalOriginalSize) *
				100
			).toFixed(2);
			console.log(`\nFont optimization complete!`);
			console.log(
				`  Files processed: ${processedCount}, Overall reduction: ${totalReduction}%`,
			);
		} else {
			console.log("\nNo font files processed");
		}
	} catch (error) {
		console.error("❌ Font compression failed with critical error:", error);
		console.log("⚠ Build will continue, but fonts may not be optimized");
	}
}

compressFonts();
