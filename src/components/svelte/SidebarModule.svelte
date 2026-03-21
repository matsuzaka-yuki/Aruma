<script lang="ts">
  const { 
    title,
    children 
  }: { 
    title: string,
    children?: any 
  } = $props();
</script>

<div class="mdui-card mdui-hoverable sidebar-module">
  <ul class="mdui-list">
    <div class="sidebar-module-title">{title}</div>
    <li class="mdui-divider mdui-m-y-0"></li>
    <slot />
  </ul>
</div>
