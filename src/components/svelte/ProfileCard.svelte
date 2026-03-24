<script lang="ts">
	import Icon from "@iconify/svelte";

	import { siteConfig } from "../../site.config";
	import { getSocialIcon } from "../../utils/icon-mapping";

	const profileConfig = siteConfig.profileCard || {};
	const showSocialLinks = profileConfig.showSocialLinks !== false;
	const socialLinks = profileConfig.social || [];
</script>

<div class="mdui-card mdui-hoverable sidebar-info">
	<div class="sidebar-info-img">
		<div
			class="sidebar-info-bg"
			style={`background-image: url('${siteConfig.sidebarBg}')`}
		></div>
		<div
			class="mdui-img-circle mdui-shadow-3"
			style={`background-image: url('${siteConfig.avatar}')`}
		></div>
	</div>
	<div class="sidebar-info-body">
		<div class="sidebar-info-name">{siteConfig.author}</div>
		<div class="sidebar-info-desc">{siteConfig.description}</div>

		{#if showSocialLinks && socialLinks.length > 0}
			<div class="sidebar-social">
				{#each socialLinks as link (link.name)}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="sidebar-social-icon"
						title={link.name}
					>
						<Icon icon={getSocialIcon(link.icon)} />
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
