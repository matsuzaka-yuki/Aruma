import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readFilesRecursively(dir, fileList = [], extensions = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      readFilesRecursively(filePath, fileList, extensions);
    } else {
      if (extensions.length === 0 || extensions.includes(path.extname(file))) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

function extractMathFormulas(content) {
  const formulas = [];
  
  const patterns = [
    /\$\$([\s\S]*?)\$\$/g,
    /\$([^$]+?)\$/g,
    /\\\[([\s\S]*?)\\\]/g,
    /\\\[([\s\S]*?)\\\]/g,
    /\\begin\{([^}]+)\}([\s\S]*?)\\end\{\1\}/g,
  ];

  patterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      formulas.push(match[1] || match[0]);
    }
  });

  return formulas;
}

function extractMathSymbols(text) {
  const symbolSet = new Set();
  
  const mathRanges = [
    [0x0020, 0x007F],
    [0x00A0, 0x00FF],
    [0x0370, 0x03FF],
    [0x2000, 0x206F],
    [0x2070, 0x209F],
    [0x2150, 0x218F],
    [0x2190, 0x21FF],
    [0x2200, 0x22FF],
    [0x2300, 0x23FF],
    [0x25A0, 0x25FF],
    [0x27C0, 0x27EF],
    [0x2900, 0x297F],
    [0x2980, 0x29FF],
    [0x2A00, 0x2AFF],
    [0x2B00, 0x2BFF],
    [0x1D400, 0x1D7FF],
  ];

  for (const char of text) {
    const code = char.codePointAt(0);
    for (const [start, end] of mathRanges) {
      if (code >= start && code <= end) {
        symbolSet.add(char);
        break;
      }
    }
  }

  const commonSymbols = '∑∏∫∂∇√∞±×÷≤≥≠≡≈∈∉⊂⊃∪∩∧∨¬∀∃∅∴∵∠⊥∥∟⊙⊕⊗⊖⊘⊤⊥⊢⊣⊨⊩⊪⊫⊬⊭⊮⊯⌈⌉⌊⌋⟨⟩⃗';
  for (const char of commonSymbols) {
    symbolSet.add(char);
  }

  for (let i = 0; i <= 9; i++) {
    symbolSet.add(String(i));
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (const char of alphabet) {
    symbolSet.add(char);
  }

  const greek = 'αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
  for (const char of greek) {
    symbolSet.add(char);
  }

  return Array.from(symbolSet).sort().join('');
}

async function extractMathSymbolsFromContent() {
  const contentDir = path.join(__dirname, '../src/content');
  
  if (!fs.existsSync(contentDir)) {
    console.log('Content directory does not exist:', contentDir);
    return '';
  }

  const contentFiles = readFilesRecursively(contentDir, [], ['.md', '.mdx']);
  
  let allMathText = '';
  let filesWithMath = 0;

  contentFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const formulas = extractMathFormulas(content);
    
    if (formulas.length > 0) {
      filesWithMath++;
      allMathText += formulas.join(' ');
    }
  });

  console.log(`Scanned ${contentFiles.length} files`);
  console.log(`Found ${filesWithMath} files with math formulas`);

  if (allMathText.trim() === '') {
    console.log('No math formulas found, using default symbol set');
    return extractMathSymbols('');
  }

  const symbols = extractMathSymbols(allMathText);
  console.log(`Extracted ${symbols.length} unique math symbols`);

  const outputDir = path.join(__dirname, '../.astro');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'math-symbols.txt');
  fs.writeFileSync(outputPath, symbols, 'utf-8');
  console.log(`Math symbols saved to: ${outputPath}`);

  return symbols;
}

extractMathSymbolsFromContent()
  .then((symbols) => {
    console.log('\nMath symbol extraction complete!');
    console.log(`Total symbols: ${symbols.length}`);
  })
  .catch((error) => {
    console.error('Math symbol extraction failed:', error);
    process.exit(1);
  });
