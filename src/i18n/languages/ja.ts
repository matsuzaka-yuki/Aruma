import Key from "../i18nKey";
import type { Translation } from "../translation";

export const ja: Translation = {
	// 修复：补充缺失的 animeStatusOnHold 和 animeStatusDropped
	[Key.animeStatusOnHold]: "一時中断",
	[Key.animeStatusDropped]: "中止",
	// ナビゲーション
	[Key.home]: "ホーム",
	[Key.category]: "カテゴリー",
	[Key.archive]: "アーカイブ",
	[Key.friends]: "友達",
	[Key.anime]: "アニメ",
	[Key.diary]: "日記",
	[Key.albums]: "アルバム",
	[Key.other]: "その他",
	[Key.about]: "このブログについて",

	// 検索
	[Key.searchPlaceholder]: "検索",
	[Key.searchResult]: "検索結果",
	[Key.searchResultFor]: "検索結果: {query}",
	[Key.foundPosts]: "{count} 件の関連記事が見つかりました",
	[Key.noSearchResult]: '"{query}" に関連する記事は見つかりませんでした',
	[Key.viewAllPosts]: "すべての記事を見る",

	// 記事関連
	[Key.sticky]: "[固定]",
	[Key.comments]: "{count} 件のコメント",
	[Key.views]: "{count} 回表示",
	[Key.readingTime]: "読了時間: 約 {minutes} 分",
	[Key.wordCount]: "{count} 文字",
	[Key.categoryLabel]: "カテゴリー: ",
	[Key.tagsLabel]: "タグ: ",

	// サイドバー
	[Key.recentReplies]: "最新の返信",
	[Key.noReplies]: "返信はまだありません",
	[Key.tagCloud]: "タグクラウド",
	[Key.categoryCloud]: "カテゴリー",
	[Key.notice]: "お知らせ",

	// サイト統計
	[Key.siteStats]: "サイト統計",
	[Key.siteStatsPosts]: "記事数",
	[Key.siteStatsRunningDays]: "運営日数",
	[Key.siteStatsWords]: "総文字数",

	// ページタイトル
	[Key.friendsTitle]: "リンク集",
	[Key.animeTitle]: "視聴したアニメ",
	[Key.diaryTitle]: "日記",
	[Key.archiveTitle]: "アーカイブ",
	[Key.archiveYear]: "アーカイブ: {year} 年",
	[Key.categoryTitle]: "カテゴリー",
	[Key.categoryWith]: "カテゴリー: {name}",
	[Key.tagWith]: "タグ: {tag}",

	// 日記ページ
	[Key.diaryMinutesAgo]: "分前",
	[Key.diaryHoursAgo]: "時間前",
	[Key.diaryDaysAgo]: "日前",

	// コードコピー
	[Key.copyCode]: "コードをコピー",
	[Key.copySuccess]: "コピーしました！",

	// RSS
	[Key.rssSubscribe]: "RSS フィード",

	// デバイスページ
	[Key.devices]: "デバイス",
	[Key.devicesTitle]: "私のデバイス",
	[Key.devicesViewDetails]: "詳細を見る",

	// アルバムページ
	[Key.albumsSubtitle]: "人生の美しい瞬間の記録です",
	[Key.albumsPhotosCount]: "件の写真",
	[Key.albumsPhotoCount]: "件の写真",
	[Key.albumsEmpty]: "コンテンツはありません",
	[Key.albumsEmptyDesc]:
		"まだアルバムが作成されていません。美しい思い出を追加しましょう！",
	[Key.albumsBackToList]: "アルバムに戻る",

	// アニメページ
	[Key.animeYear]: "年",
	[Key.animeStudio]: "スタジオ",
	[Key.animeEpisodes]: "エピソード",
	[Key.animeEmpty]: "アニメのデータはありません",
	[Key.totalAnime]: "合計アニメ数",
	[Key.local]: "ローカル",
	[Key.all]: "すべて",
	[Key.watching]: "視聴中",
	[Key.completed]: "視聴済み",
	[Key.planned]: "視聴予定",
	[Key.searchAnime]: "アニメを検索...",
	[Key.prevPage]: "前のページ",
	[Key.nextPage]: "次のページ",

	// コメントエリア
	[Key.commentPlaceholder]: "こちらにメッセージを残してください～",
	[Key.kaomoji]: "顔文字",

	// 音楽プレーヤー
	[Key.musicPlayer]: "音楽プレーヤー",
	[Key.musicPlayerShow]: "音楽プレーヤーを表示",
	[Key.musicPlayerHide]: "音楽プレーヤーを非表示",
	[Key.musicPlayerExpand]: "音楽プレーヤーを展開",
	[Key.musicPlayerCollapse]: "音楽プレーヤーを折りたたむ",
	[Key.musicPlayerPause]: "一時停止",
	[Key.musicPlayerPlay]: "再生",
	[Key.musicPlayerPrevious]: "前へ",
	[Key.musicPlayerNext]: "次へ",
	[Key.musicPlayerShuffle]: "シャッフル",
	[Key.musicPlayerRepeat]: "リピート",
	[Key.musicPlayerRepeatOne]: "1 曲のみリピート",
	[Key.musicPlayerVolume]: "音量コントロール",
	[Key.musicPlayerProgress]: "再生状況",
	[Key.musicPlayerCover]: "カバー",
	[Key.musicPlayerPlaylist]: "プレイリスト",
	[Key.musicPlayerLoading]: "読み込み中...",
	[Key.musicPlayerErrorPlaylist]: "プレイリストを取得できませんでした",
	[Key.musicPlayerErrorSong]:
		"現在の曲を読み込めませんでした。次の曲を読み込みます",
	[Key.musicPlayerErrorEmpty]: "プレイリストに利用可能な曲がありません",
	[Key.unknownSong]: "不明な曲",
	[Key.unknownArtist]: "不明なアーティスト",

	// Twikoo
	[Key.twikooCommentDisabled]:
		"[Twikoo] コメント機能が無効になっています。最新のコメントの取得をスキップします。",
	[Key.twikooEnvIdMissing]:
		"[Twikoo] site.config.ts で envId が設定されていません。最新のコメントの取得をスキップします。",
	[Key.twikooFetching]: "[Twikoo] 最新のコメントを取得しています...",
	[Key.twikooFetchFail]: "[Twikoo] 最新のコメントの取得に失敗しました：",
	[Key.twikooParseFail]:
		"[Twikoo] レスポンスの解析に失敗しました。最新のコメントを読み取ることができません：",
};
