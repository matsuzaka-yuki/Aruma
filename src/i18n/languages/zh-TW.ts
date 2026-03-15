import Key from "../i18nKey";
import type { Translation } from "../translation";

export const zhTW: Translation = {
	// 導航
	[Key.home]: "首頁",
	[Key.category]: "分類",
	[Key.archive]: "歸檔",
	[Key.friends]: "友人帳",
	[Key.anime]: "追番",
	[Key.diary]: "日記",
	[Key.albums]: "相簿",
	[Key.other]: "其他",
	[Key.about]: "關於",

	// 搜尋
	[Key.searchPlaceholder]: "搜尋",
	[Key.searchResult]: "搜尋結果",
	[Key.searchResultFor]: "搜尋結果: {query}",
	[Key.foundPosts]: "共找到 {count} 篇相關內容",
	[Key.noSearchResult]: "沒有找到與「{query}」相關的文章",
	[Key.viewAllPosts]: "查看全部文章",

	// 文章相關
	[Key.sticky]: "[置頂]",
	[Key.comments]: "{count} 則留言",
	[Key.views]: "{count} 瀏覽",
	[Key.readingTime]: "閱讀時間: 約 {minutes} 分鐘",
	[Key.wordCount]: "{count} 字",
	[Key.categoryLabel]: "分類: ",
	[Key.tagsLabel]: "標籤: ",

	// 側邊欄
	[Key.recentReplies]: "最新回覆",
	[Key.noReplies]: "暫無回覆",
	[Key.tagCloud]: "標籤雲",
	[Key.categoryCloud]: "分類",
	[Key.notice]: "公告",

	// 站點統計
	[Key.siteStats]: "站點統計",
	[Key.siteStatsPosts]: "文章數",
	[Key.siteStatsRunningDays]: "運行天數",
	[Key.siteStatsWords]: "總字數",

	// 頁面標題
	[Key.friendsTitle]: "友情連結",
	[Key.animeTitle]: "追番",
	[Key.diaryTitle]: "日記",
	[Key.archiveTitle]: "歸檔",
	[Key.archiveYear]: "歸檔: {year} 年",
	[Key.categoryTitle]: "分類",
	[Key.categoryWith]: "分類: {name}",
	[Key.tagWith]: "標籤: {tag}",

	// 短文頁面
	[Key.diaryMinutesAgo]: " 分鐘前",
	[Key.diaryHoursAgo]: " 小時前",
	[Key.diaryDaysAgo]: " 天前",

	// 程式碼複製
	[Key.copyCode]: "複製程式碼",
	[Key.copySuccess]: "複製成功",

	// RSS
	[Key.rssSubscribe]: "RSS 訂閱",
	[Key.atomSubscribe]: "Atom 訂閱",

	// 設備頁面
	[Key.devices]: "設備",
	[Key.devicesTitle]: "我的設備",
	[Key.devicesViewDetails]: "查看詳情",

	// 相簿頁面
	[Key.albumsSubtitle]: "記錄美好瞬間",
	[Key.albumsPhotosCount]: "張照片",
	[Key.albumsPhotoCount]: "張照片",
	[Key.albumsEmpty]: "暫無相簿",
	[Key.albumsEmptyDesc]: "還沒有建立任何相簿",
	[Key.albumsBackToList]: "返回相簿列表",

	// 追番頁面
	[Key.animeYear]: "年份",
	[Key.animeStudio]: "製作",
	[Key.animeEpisodes]: "集數",
	[Key.animeEmpty]: "暫無番劇",
	[Key.totalAnime]: "總番劇數",
	[Key.local]: "本地",
	[Key.all]: "全部",
	[Key.watching]: "觀看中",
	[Key.completed]: "已完成",
	[Key.planned]: "計劃看",
	[Key.animeStatusOnHold]: "擱置",
	[Key.animeStatusDropped]: "拋棄",
	[Key.searchAnime]: "搜尋番劇...",
	[Key.prevPage]: "上一頁",
	[Key.nextPage]: "下一頁",

	// 評論區
	[Key.commentPlaceholder]:
		"大佬吶快看過來！這裡是專屬留言小角落，快來留下你的足跡喵～",
	[Key.kaomoji]: "顏文字",

	// 音樂播放器
	[Key.musicPlayer]: "音樂播放器",
	[Key.musicPlayerShow]: "顯示音樂播放器",
	[Key.musicPlayerHide]: "隱藏播放器",
	[Key.musicPlayerExpand]: "展開音樂播放器",
	[Key.musicPlayerCollapse]: "收起播放器",
	[Key.musicPlayerPause]: "暫停",
	[Key.musicPlayerPlay]: "播放",
	[Key.musicPlayerPrevious]: "上一首",
	[Key.musicPlayerNext]: "下一首",
	[Key.musicPlayerShuffle]: "隨機播放",
	[Key.musicPlayerRepeat]: "列表循環",
	[Key.musicPlayerRepeatOne]: "單曲循環",
	[Key.musicPlayerVolume]: "音量控制",
	[Key.musicPlayerProgress]: "播放進度",
	[Key.musicPlayerCover]: "封面",
	[Key.musicPlayerPlaylist]: "播放列表",
	[Key.musicPlayerLoading]: "載入中...",
	[Key.musicPlayerErrorPlaylist]: "播放列表獲取失敗",
	[Key.musicPlayerErrorSong]: "當前歌曲載入失敗，嘗試載入下一首",
	[Key.musicPlayerErrorEmpty]: "播放列表中沒有可用的歌曲",
	[Key.unknownSong]: "未知歌曲",
	[Key.unknownArtist]: "未知藝術家",

	// Twikoo
	[Key.twikooCommentDisabled]: "[Twikoo] 評論組件未啟用，跳過拉取最新評論。",
	[Key.twikooEnvIdMissing]:
		"[Twikoo] envId 未在 site.config.ts 中配置，跳過拉取最新評論。",
	[Key.twikooFetching]: "[Twikoo] 正在拉取最新評論...",
	[Key.twikooFetchFail]: "[Twikoo] 拉取最新評論失敗：",
	[Key.twikooParseFail]: "[Twikoo] 響應解析失敗，無法讀取最新評論：",
	[Key.twikooEmptyFileCreated]: "[Twikoo] 已建立空檔案：",
	[Key.twikooNetworkError]: "[Twikoo] 網路請求失敗，",
	[Key.twikooResponseError]: "[Twikoo] 響應失敗，",
	[Key.twikooJsonParseError]: "[Twikoo] JSON 解析失敗，",
	[Key.twikooUnknownError]: "[Twikoo] 發生錯誤，",
	[Key.twikooFetched]: "[Twikoo] 已拉取 {count} 條最新評論，寫入",
};
