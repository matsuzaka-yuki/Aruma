import Key from "../i18nKey";
import type { Translation } from "../translation";

export const ja: Translation = {
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
    [Key.noSearchResult]: "\"{query}\" に関連する記事は見つかりませんでした",
    [Key.viewAllPosts]: "すべての記事を見る",

    // 記事関連
    [Key.sticky]: "[固定]",
    [Key.comments]: "{count} 件のコメント",
    [Key.views]: "{count} 回表示",
    [Key.readingTime]: "読了時間: 約 {minutes} 分",
    [Key.categoryLabel]: "カテゴリー: ",
    [Key.tagsLabel]: "タグ: ",

    // サイドバー
    [Key.recentReplies]: "最新の返信",
    [Key.noReplies]: "返信はまだありません",
    [Key.tagCloud]: "タグクラウド",

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
    [Key.albumsEmptyDesc]: "まだアルバムが作成されていません。美しい思い出を追加しましょう！",
    [Key.albumsBackToList]: "アルバムに戻る",

    // アニメページ
    [Key.animeYear]: "年",
    [Key.animeStudio]: "スタジオ",
    [Key.animeEpisodes]: "エピソード",
    [Key.animeEmpty]: "アニメのデータはありません",
};
