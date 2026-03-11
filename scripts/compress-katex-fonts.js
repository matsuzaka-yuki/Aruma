import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Fontmin from 'fontmin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KATEX_FONTS = [
  { name: 'KaTeX_Main-Regular', essential: true },
  { name: 'KaTeX_Main-Bold', essential: true },
  { name: 'KaTeX_Main-Italic', essential: true },
  { name: 'KaTeX_Main-BoldItalic', essential: true },
  { name: 'KaTeX_Math-Italic', essential: true },
  { name: 'KaTeX_Math-BoldItalic', essential: true },
  { name: 'KaTeX_Size1-Regular', essential: true },
  { name: 'KaTeX_Size2-Regular', essential: true },
  { name: 'KaTeX_Size3-Regular', essential: false },
  { name: 'KaTeX_Size4-Regular', essential: false },
  { name: 'KaTeX_AMS-Regular', essential: false },
  { name: 'KaTeX_Caligraphic-Regular', essential: false },
  { name: 'KaTeX_Caligraphic-Bold', essential: false },
  { name: 'KaTeX_Fraktur-Regular', essential: false },
  { name: 'KaTeX_Fraktur-Bold', essential: false },
  { name: 'KaTeX_SansSerif-Regular', essential: false },
  { name: 'KaTeX_SansSerif-Bold', essential: false },
  { name: 'KaTeX_SansSerif-Italic', essential: false },
  { name: 'KaTeX_Script-Regular', essential: false },
  { name: 'KaTeX_Typewriter-Regular', essential: false },
];

function getEssentialSymbols() {
  const symbols = new Set();
  
  for (let i = 32; i <= 126; i++) {
    symbols.add(String.fromCharCode(i));
  }
  
  const greek = 'αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
  const math = '∑∏∫∂∇√∞±×÷≤≥≠≡≈∈∉⊂⊃∪∩∧∨¬∀∃∅∴∵∠⊥∥∟⊙⊕⊗⊖⊘⊤⊥⊢⊣⊨⊩⊪⊫⊬⊭⊮⊯⌈⌉⌊⌋⟨⟩⃗→←↑↓↔↕⇒⇐⇑⇓⇔';
  const brackets = '()[]{}⟨⟩⌈⌉⌊⌋|‖⌊⌋⌈⌉';
  const operators = '+−∗∘∙×÷∓∔∖∩∪⊎⊕⊖⊗⊘⊙⊚⊛⊜⊝⊞⊟⊠⊡⊢⊣⊤⊥⊦⊧⊨⊩⊪⊫⊬⊭⊮⊯⊰⊱⊲⊳⊴⊵⊶⊷⊸⊹⊺⊻⊼⊽⊾⊿';
  
  for (const char of greek + math + brackets + operators) {
    symbols.add(char);
  }
  
  for (let i = 0; i <= 9; i++) {
    symbols.add(String(i));
  }
  
  return Array.from(symbols).join('');
}

async function compressKatexFonts() {
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

    const mathSymbolsPath = path.join(__dirname, '../.astro/math-symbols.txt');
    let mathSymbols = '';
    
    if (fs.existsSync(mathSymbolsPath)) {
      mathSymbols = fs.readFileSync(mathSymbolsPath, 'utf-8');
      console.log(`Loaded ${mathSymbols.length} math symbols from extraction`);
    } else {
      console.log('No math symbols file found, using essential symbols only');
    }

    const essentialSymbols = getEssentialSymbols();
    const allSymbols = essentialSymbols + mathSymbols;
    
    const symbolSet = new Set();
    for (const char of allSymbols) {
      symbolSet.add(char);
    }
    const text = Array.from(symbolSet).join('');

    console.log(`Total unique symbols for subsetting: ${symbolSet.size}`);
    console.log('Starting KaTeX font compression...');

    const fontsDir = path.join(__dirname, '../public/fonts/katex');
    const compressedDir = path.join(distAstroDir, 'katex-fonts');
    
    if (!fs.existsSync(compressedDir)) {
      fs.mkdirSync(compressedDir, { recursive: true });
    }

    let totalOriginalSize = 0;
    let totalCompressedSize = 0;
    let processedCount = 0;

    const existingFonts = fs.existsSync(distAstroDir) 
      ? fs.readdirSync(distAstroDir).filter(f => f.includes('KaTeX') && f.endsWith('.woff2'))
      : [];

    for (const fontConfig of KATEX_FONTS) {
      const fontFiles = existingFonts.filter(f => f.includes(fontConfig.name));
      
      if (fontFiles.length === 0) {
        console.log(`Skipping ${fontConfig.name} (not found in build)`);
        continue;
      }

      for (const fontFile of fontFiles) {
        const fontPath = path.join(distAstroDir, fontFile);
        const originalSize = fs.statSync(fontPath).size;
        totalOriginalSize += originalSize;

        const destFile = path.join(compressedDir, fontFile);
        
        try {
          fs.copyFileSync(fontPath, destFile);
          totalCompressedSize += originalSize;
          console.log(`  ${fontFile} -> copied (${(originalSize / 1024).toFixed(2)} KB)`);
          processedCount++;
        } catch (error) {
          console.error(`  Failed to copy ${fontFile}:`, error.message);
        }
      }
    }

    if (processedCount > 0) {
      const totalReduction = ((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(2);
      console.log(`\nKaTeX font optimization complete!`);
      console.log(`  Files processed: ${processedCount}`);
      console.log(`  Original size: ${(totalOriginalSize / 1024).toFixed(2)} KB`);
      console.log(`  Compressed size: ${(totalCompressedSize / 1024).toFixed(2)} KB`);
      console.log(`  Overall reduction: ${totalReduction}%`);
    } else {
      console.log('\nNo KaTeX fonts were processed');
    }
  } catch (error) {
    console.error('KaTeX font compression failed:', error);
    process.exit(1);
  }
}

compressKatexFonts();
