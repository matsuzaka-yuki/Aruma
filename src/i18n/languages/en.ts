import Key from "../i18nKey";
import type { Translation } from "../translation";

export const en: Translation = {
	// Navigation
	[Key.home]: "Home",
	[Key.category]: "Categories",
	[Key.archive]: "Archive",
	[Key.friends]: "Friends",
	[Key.anime]: "Anime",
	[Key.diary]: "Diary",
	[Key.albums]: "Albums",
	[Key.other]: "Other",
	[Key.about]: "About",

	// Search
	[Key.searchPlaceholder]: "Search",
	[Key.searchResult]: "Search Results",
	[Key.searchResultFor]: "Search Results: {query}",
	[Key.foundPosts]: "Found {count} related post(s)",
	[Key.noSearchResult]: 'No posts found for "{query}"',
	[Key.viewAllPosts]: "View All Posts",

	// Post related
	[Key.sticky]: "[Sticky]",
	[Key.comments]: "{count} comments",
	[Key.views]: "{count} views",
	[Key.readingTime]: "Reading time: about {minutes} minutes",
	[Key.categoryLabel]: "Category: ",
	[Key.tagsLabel]: "Tags: ",

	// Sidebar
	[Key.recentReplies]: "Recent Replies",
	[Key.noReplies]: "No replies yet",
	[Key.tagCloud]: "Tag Cloud",

	// Page titles
	[Key.friendsTitle]: "Friend Links",
	[Key.animeTitle]: "Anime",
	[Key.diaryTitle]: "Diary",
	[Key.archiveTitle]: "Archive",
	[Key.archiveYear]: "Archive: {year}",
	[Key.categoryTitle]: "Categories",
	[Key.categoryWith]: "Category: {name}",
	[Key.tagWith]: "Tag: {tag}",

	// Diary page
	[Key.diaryMinutesAgo]: " minutes ago",
	[Key.diaryHoursAgo]: " hours ago",
	[Key.diaryDaysAgo]: " days ago",

	// Code copy
	[Key.copyCode]: "Copy code",
	[Key.copySuccess]: "Copied!",

	// RSS
	[Key.rssSubscribe]: "RSS Feed",

	// Devices page
	[Key.devices]: "Devices",
	[Key.devicesTitle]: "My Devices",
	[Key.devicesViewDetails]: "View Details",

	// Albums page
	[Key.albumsSubtitle]: "Capturing beautiful moments",
	[Key.albumsPhotosCount]: "photos",
	[Key.albumsPhotoCount]: "photo",
	[Key.albumsEmpty]: "No albums yet",
	[Key.albumsEmptyDesc]: "No albums have been created",
	[Key.albumsBackToList]: "Back to albums",

	// Anime page
	[Key.animeYear]: "Year",
	[Key.animeStudio]: "Studio",
	[Key.animeEpisodes]: "Episodes",
	[Key.animeEmpty]: "No anime yet",

	// Comment section
	[Key.commentPlaceholder]: "Leave your message here~",
	[Key.kaomoji]: "Kaomoji",

	// Music Player
	[Key.musicPlayer]: "Music Player",
	[Key.musicPlayerShow]: "Show Music Player",
	[Key.musicPlayerHide]: "Hide Music Player",
	[Key.musicPlayerExpand]: "Expand Music Player",
	[Key.musicPlayerCollapse]: "Collapse Music Player",
	[Key.musicPlayerPause]: "Pause",
	[Key.musicPlayerPlay]: "Play",
	[Key.musicPlayerPrevious]: "Previous",
	[Key.musicPlayerNext]: "Next",
	[Key.musicPlayerShuffle]: "Shuffle",
	[Key.musicPlayerRepeat]: "Repeat All",
	[Key.musicPlayerRepeatOne]: "Repeat One",
	[Key.musicPlayerVolume]: "Volume Control",
	[Key.musicPlayerProgress]: "Playback Progress",
	[Key.musicPlayerCover]: "Cover",
	[Key.musicPlayerPlaylist]: "Playlist",
	[Key.musicPlayerLoading]: "Loading...",
	[Key.musicPlayerErrorPlaylist]: "Failed to load playlist",
	[Key.musicPlayerErrorSong]: "Failed to load current song, trying next song",
	[Key.musicPlayerErrorEmpty]: "No available songs in the playlist",
	[Key.unknownSong]: "Unknown Song",
	[Key.unknownArtist]: "Unknown Artist",
};
