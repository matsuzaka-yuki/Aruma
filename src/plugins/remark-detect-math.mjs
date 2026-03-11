import { visit } from 'unist-util-visit';

export function remarkDetectMath() {
  return (tree, file) => {
    let hasMath = false;

    visit(tree, 'math', () => {
      hasMath = true;
    });

    visit(tree, 'inlineMath', () => {
      hasMath = true;
    });

    file.data.hasMath = hasMath;
  };
}
