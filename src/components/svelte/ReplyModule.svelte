<script lang="ts">
	import I18nKey from "../../i18n/i18nKey";
	import { i18n } from "../../i18n/translation";
	import SidebarModule from "./SidebarModule.svelte";

	interface Reply {
		id: number;
		author: string;
		content: string;
		postTitle: string;
		postUrl: string;
		date: string;
	}

	const { replies = [] }: { replies?: Reply[] } = $props();
</script>

<SidebarModule title={i18n(I18nKey.recentReplies)}>
	{#if replies.length > 0}
		{#each replies as reply (reply.id)}
			<li class="mdui-list-item mdui-ripple sidebar-module-list">
				<a href={reply.postUrl} class="sidebar-reply-link">
					<div class="sidebar-reply-author">{reply.author}</div>
					<div class="sidebar-reply-content">{reply.content}</div>
					<div class="sidebar-reply-meta">
						<span class="sidebar-reply-post">{reply.postTitle}</span
						>
						<span class="sidebar-reply-date">{reply.date}</span>
					</div>
				</a>
			</li>
		{/each}
	{:else}
		<li class="mdui-list-item mdui-ripple sidebar-module-list">
			<div class="sidebar-reply-text">{i18n(I18nKey.noReplies)}</div>
		</li>
	{/if}
</SidebarModule>
