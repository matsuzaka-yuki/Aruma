<script lang="ts">
  import Icon from "@iconify/svelte";
  import { siteConfig } from '../../site.config';
  import { getSocialIcon } from '../../utils/icon-mapping';

  interface Social {
    name: string;
    url: string;
    icon: string;
  }

  const drawerConfig = siteConfig.drawerProfile || {};
  const profileConfig = siteConfig.profileCard || {};
  
  const showSocial = drawerConfig.enable !== false;
  const socialLinks: Social[] = drawerConfig.social?.length 
    ? drawerConfig.social 
    : (profileConfig.social || []);
</script>

<div class="drawer-profile">
  <div class="drawer-avatar">
    <img src={siteConfig.avatar} alt="Avatar" />
  </div>
  {#if showSocial && socialLinks.length > 0}
    <div class="drawer-social">
      {#each socialLinks as s (s.name)}
        <a href={s.url} target="_blank" class="social-icon" title={s.name}>
          <Icon icon={getSocialIcon(s.icon)} />
        </a>
      {/each}
    </div>
  {/if}
</div>
