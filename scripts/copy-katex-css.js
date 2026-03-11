import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyKatexCSS() {
  try {
    const distDir = path.join(__dirname, '../dist');
    if (!fs.existsSync(distDir)) {
      console.log('dist directory does not exist, please run astro build first');
      return;
    }

    const distAstroDir = path.join(distDir, '_astro');
    if (!fs.existsSync(distAstroDir)) {
      console.log('_astro directory does not exist');
      return;
    }

    const katexCssPath = path.join(__dirname, '../node_modules/katex/dist/katex.min.css');
    
    if (!fs.existsSync(katexCssPath)) {
      console.log('KaTeX CSS not found, skipping copy');
      return;
    }

    const destPath = path.join(distAstroDir, 'katex.min.css');
    fs.copyFileSync(katexCssPath, destPath);
    console.log('KaTeX CSS copied to _astro/katex.min.css');
  } catch (error) {
    console.error('Failed to copy KaTeX CSS:', error);
    process.exit(1);
  }
}

copyKatexCSS();
