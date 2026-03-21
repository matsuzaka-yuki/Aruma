import type { AstroIntegration } from "astro";

export function mathPlugin(): AstroIntegration {
	return {
		name: "math-plugin",
		hooks: {
			"astro:config:setup": ({ updateConfig }) => {
				updateConfig({
					markdown: {
						remarkPlugins: [
							() => {
								return (tree: any, file: any) => {
									let hasMath = false;

									function visit(node: any) {
										if (
											node.type === "math" ||
											node.type === "inlineMath"
										) {
											hasMath = true;
											return;
										}
										if (node.children) {
											for (const child of node.children) {
												visit(child);
												if (hasMath) {
													return;
												}
											}
										}
									}

									visit(tree);
									file.data.hasMath = hasMath;
								};
							},
						],
					},
				});
			},
		},
	};
}
