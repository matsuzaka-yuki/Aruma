<script lang="ts">
  const { 
    items = [], 
    hrefPrefix 
  }: { 
    items?: string[] | { name: string; slug: string }[], 
    hrefPrefix: string 
  } = $props();

  function getLabel(item: string | { name: string; slug: string }): string {
    return typeof item === 'string' ? item : item.name;
  }

  function getSlug(item: string | { name: string; slug: string }): string {
    return typeof item === 'string' ? item : item.slug;
  }
</script>

<div class="sidebar-tag">
  {#each items as item (getSlug(item))}
    <a href={`${hrefPrefix}${getSlug(item)}`} class="tag-link">
      <div class="mdui-chip">
        <span class="mdui-chip-title">{getLabel(item)}</span>
      </div>
    </a>
  {/each}
</div>
