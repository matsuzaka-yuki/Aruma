import Key from "../i18nKey";
import type { Translation } from "../translation";

export const zhCN: Translation = {
	// 导航
	[Key.home]: "首页",
	[Key.category]: "分类",
	[Key.archive]: "归档",
	[Key.friends]: "友人帐",
	[Key.anime]: "追番",
	[Key.diary]: "日记",
	[Key.albums]: "相册",
	[Key.other]: "其他",
	[Key.about]: "关于",

	// 搜索
	[Key.searchPlaceholder]: "搜索",
	[Key.searchResult]: "搜索结果",
	[Key.searchResultFor]: "搜索结果: {query}",
	[Key.foundPosts]: "共找到 {count} 篇相关内容",
	[Key.noSearchResult]: '没有找到与 "{query}" 相关的文章',
	[Key.viewAllPosts]: "查看全部文章",

	// 文章相关
	[Key.sticky]: "[置顶]",
	[Key.comments]: "{count} 条评论",
	[Key.views]: "{count} 浏览",
	[Key.readingTime]: "阅读时间: 约 {minutes} 分钟",
	[Key.wordCount]: "{count} 字",
	[Key.categoryLabel]: "分类: ",
	[Key.tagsLabel]: "标签: ",

	// 侧边栏
	[Key.recentReplies]: "最新回复",
	[Key.noReplies]: "暂无回复",
	[Key.tagCloud]: "标签云",
	[Key.categoryCloud]: "分类",
	[Key.notice]: "公告",

	// 站点统计
	[Key.siteStats]: "站点统计",
	[Key.siteStatsPosts]: "文章数",
	[Key.siteStatsRunningDays]: "运行天数",
	[Key.siteStatsWords]: "总字数",

	// 页面标题
	[Key.friendsTitle]: "友情链接",
	[Key.animeTitle]: "追番",
	[Key.diaryTitle]: "日记",
	[Key.archiveTitle]: "归档",
	[Key.archiveYear]: "归档: {year} 年",
	[Key.categoryTitle]: "分类",
	[Key.categoryWith]: "分类: {name}",
	[Key.tagWith]: "标签: {tag}",

	// 短文页面
	[Key.diaryMinutesAgo]: " 分钟前",
	[Key.diaryHoursAgo]: " 小时前",
	[Key.diaryDaysAgo]: " 天前",

	// 代码复制
	[Key.copyCode]: "复制代码",
	[Key.copySuccess]: "复制成功",

	// RSS
	[Key.rssSubscribe]: "RSS 订阅",

	// 设备页面
	[Key.devices]: "设备",
	[Key.devicesTitle]: "我的设备",
	[Key.devicesViewDetails]: "查看详情",

	// 相册页面
	[Key.albumsSubtitle]: "记录美好瞬间",
	[Key.albumsPhotosCount]: "张照片",
	[Key.albumsPhotoCount]: "张照片",
	[Key.albumsEmpty]: "暂无相册",
	[Key.albumsEmptyDesc]: "还没有创建任何相册",
	[Key.albumsBackToList]: "返回相册列表",

	// 追番页面
	[Key.animeYear]: "年份",
	[Key.animeStudio]: "制作",
	[Key.animeEpisodes]: "集数",
	[Key.animeEmpty]: "暂无番剧",
	[Key.totalAnime]: "总番剧数",
	[Key.local]: "本地",
	[Key.all]: "全部",
	[Key.watching]: "观看中",
	[Key.completed]: "已完成",
	[Key.planned]: "计划看",
	[Key.animeStatusOnHold]: "搁置",
	[Key.animeStatusDropped]: "抛弃",
	[Key.searchAnime]: "搜索番剧...",
	[Key.prevPage]: "上一页",
	[Key.nextPage]: "下一页",

	// 评论区
	[Key.commentPlaceholder]:
		"大佬呐快看过来！这里是专属留言小角落，快来留下你的足迹喵～",
	[Key.kaomoji]: "颜文字",

	// 音乐播放器
	[Key.musicPlayer]: "音乐播放器",
	[Key.musicPlayerShow]: "显示音乐播放器",
	[Key.musicPlayerHide]: "隐藏播放器",
	[Key.musicPlayerExpand]: "展开音乐播放器",
	[Key.musicPlayerCollapse]: "收起播放器",
	[Key.musicPlayerPause]: "暂停",
	[Key.musicPlayerPlay]: "播放",
	[Key.musicPlayerPrevious]: "上一首",
	[Key.musicPlayerNext]: "下一首",
	[Key.musicPlayerShuffle]: "随机播放",
	[Key.musicPlayerRepeat]: "列表循环",
	[Key.musicPlayerRepeatOne]: "单曲循环",
	[Key.musicPlayerVolume]: "音量控制",
	[Key.musicPlayerProgress]: "播放进度",
	[Key.musicPlayerCover]: "封面",
	[Key.musicPlayerPlaylist]: "播放列表",
	[Key.musicPlayerLoading]: "加载中...",
	[Key.musicPlayerErrorPlaylist]: "播放列表获取失败",
	[Key.musicPlayerErrorSong]: "当前歌曲加载失败，尝试加载下一首",
	[Key.musicPlayerErrorEmpty]: "播放列表中没有可用的歌曲",
	[Key.unknownSong]: "未知歌曲",
	[Key.unknownArtist]: "未知艺术家",

	// Twikoo
	[Key.twikooCommentDisabled]: "[Twikoo] 评论组件未启用，跳过拉取最新评论。",
	[Key.twikooEnvIdMissing]:
		"[Twikoo] envId 未在 site.config.ts 中配置，跳过拉取最新评论。",
	[Key.twikooFetching]: "[Twikoo] 正在拉取最新评论...",
	[Key.twikooFetchFail]: "[Twikoo] 拉取最新评论失败：",
	[Key.twikooParseFail]: "[Twikoo] 响应解析失败，无法读取最新评论：",
	[Key.twikooEmptyFileCreated]: "[Twikoo] 已创建空文件：",
	[Key.twikooNetworkError]: "[Twikoo] 网络请求失败，",
	[Key.twikooResponseError]: "[Twikoo] 响应失败，",
	[Key.twikooJsonParseError]: "[Twikoo] JSON 解析失败，",
	[Key.twikooUnknownError]: "[Twikoo] 发生错误，",
	[Key.twikooFetched]: "[Twikoo] 已拉取 {count} 条最新评论，写入",
};
