<script lang="ts">
  import I18nKey from '../../i18n/i18nKey';
  import { i18n } from '../../i18n/translation';
  import SidebarModule from './SidebarModule.svelte';

  const { content = "" }: { content?: string } = $props();
</script>

{#if content}
  <SidebarModule title={i18n(I18nKey.notice)}>
    <div class="sidebar-notice-content">{@html content}</div>
  </SidebarModule>
{/if}
