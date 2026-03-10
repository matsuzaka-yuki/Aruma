import { h } from "hastscript";
import { visit } from "unist-util-visit";

/**
 * Parses directive nodes in markdown and converts them to HTML elements.
 * This allows using ::directive{attr="value"} syntax in markdown.
 */
export function parseDirectiveNode() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        const data = node.data || (node.data = {});
        node.attributes = node.attributes || {};

        if (
          node.children.length > 0 &&
          node.children[0].data &&
          node.children[0].data.directiveLabel
        ) {
          node.attributes["has-directive-label"] = true;
        }

        const hast = h(node.name, node.attributes);

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
}
