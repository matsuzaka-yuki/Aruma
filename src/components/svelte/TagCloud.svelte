<script lang="ts">
	import I18nKey from "../../i18n/i18nKey";
	import { i18n } from "../../i18n/translation";
	import ChipCloud from "./ChipCloud.svelte";
	import SidebarModule from "./SidebarModule.svelte";

	const { tags = [] }: { tags?: string[] } = $props();
</script>

<SidebarModule title={i18n(I18nKey.tagCloud)}>
	<ChipCloud items={tags} hrefPrefix="/tags/" />
</SidebarModule>
