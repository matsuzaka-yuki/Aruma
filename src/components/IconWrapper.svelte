<script lang="ts">
	import Icon from "@iconify/svelte";

	interface Props {
		icon: string;
		class?: string;
		size?: string;
	}

	let { icon, class: className, size }: Props = $props();
	const finalClass = className ?? "";
	const finalSize = size ?? "1em";
</script>

<Icon {icon} class={finalClass} style="font-size: {finalSize};" />
