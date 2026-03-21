<script lang="ts">
  import I18nKey from '../../i18n/i18nKey';
  import { i18n } from '../../i18n/translation';
  import SidebarModule from './SidebarModule.svelte';

  const { 
    postCount = 0, 
    wordCount = 0, 
    siteStartDate 
  }: { 
    postCount?: number; 
    wordCount?: number;
    siteStartDate?: string;
  } = $props();

  // 计算运行天数
  function calculateRunningDays(startDate?: string): number {
    if (!startDate) {return 0;}
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const runningDays = $derived(calculateRunningDays(siteStartDate));

  // 格式化数字
  function formatNumber(num: number): string {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + 'w';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }
</script>

<SidebarModule title={i18n(I18nKey.siteStats)}>
  <div class="site-stats-content">
    <div class="stat-item">
      <span class="mdui-icon material-icons">article</span>
      <span class="stat-label">{i18n(I18nKey.siteStatsPosts)}</span>
      <span class="stat-value">{postCount}</span>
    </div>
    <div class="stat-item">
      <span class="mdui-icon material-icons">schedule</span>
      <span class="stat-label">{i18n(I18nKey.siteStatsRunningDays)}</span>
      <span class="stat-value">{runningDays}</span>
    </div>
    {#if wordCount > 0}
      <div class="stat-item">
        <span class="mdui-icon material-icons">text_fields</span>
        <span class="stat-label">{i18n(I18nKey.siteStatsWords)}</span>
        <span class="stat-value">{formatNumber(wordCount)}</span>
      </div>
    {/if}
  </div>
</SidebarModule>

<style>
  .site-stats-content {
    padding: 12px 16px;
  }

  .stat-item {
    display: flex;
    align-items: center;
    padding: 8px 0;
    gap: 8px;
  }

  .stat-item:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  :global(.mdui-theme-layout-dark) .stat-item:not(:last-child) {
    border-bottom-color: rgba(255, 255, 255, 0.08);
  }

  .stat-item .mdui-icon {
    font-size: 20px;
    color: var(--mdui-color-primary, #1a73e8);
    opacity: 0.8;
  }

  :global(.mdui-theme-layout-dark) .stat-item .mdui-icon {
    color: #fff;
  }

  .stat-label {
    flex: 1;
    font-size: 14px;
    color: var(--mdui-color-on-surface, rgba(0, 0, 0, 0.7));
  }

  :global(.mdui-theme-layout-dark) .stat-label {
    color: #fff;
  }

  .stat-value {
    font-size: 16px;
    font-weight: 600;
    color: var(--mdui-color-primary, #1a73e8);
  }

  :global(.mdui-theme-layout-dark) .stat-value {
    color: #fff;
  }
</style>
