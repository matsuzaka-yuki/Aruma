<script lang="ts">
  import { i18n } from '../../i18n/translation';
  import I18nKey from '../../i18n/i18nKey';
  import ChipCloud from './ChipCloud.svelte';

  let { categories = [] }: { categories?: { name: string; slug: string }[] } = $props();
</script>

<div class="mdui-card mdui-hoverable sidebar-module">
  <ul class="mdui-list">
    <div class="sidebar-module-title">{i18n(I18nKey.categoryCloud)}</div>
    <li class="mdui-divider mdui-m-y-0"></li>
    <ChipCloud 
      items={categories} 
      hrefPrefix="/category/" 
    />
  </ul>
</div>
