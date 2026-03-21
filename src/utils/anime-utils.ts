import type { AnimeItem } from "../types/anime";

export type AnimeStatus =
	| "watching"
	| "completed"
	| "planned"
	| "onhold"
	| "dropped";

export function getAnimeStatus(anime: AnimeItem): AnimeStatus {
	if (anime.watchStatus) {
		return anime.watchStatus;
	}
	if (anime.progress > 0 && anime.progress < anime.totalEpisodes) {
		return "watching";
	}
	if (anime.progress >= anime.totalEpisodes && anime.totalEpisodes > 0) {
		return "completed";
	}
	return "planned";
}

export function getProgressPercent(
	progress: number,
	totalEpisodes: number,
): number {
	if (totalEpisodes <= 0) {
		return 0;
	}
	return (progress / totalEpisodes) * 100;
}
