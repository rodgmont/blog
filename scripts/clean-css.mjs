import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cssPath = join(__dirname, '../src/app/globals.css');

const content = readFileSync(cssPath, 'utf8');
const lines = content.split('\n');

// Keep only lines 1–935 (index 0–934)
const clean = lines.slice(0, 935).join('\n') + '\n';

writeFileSync(cssPath, clean, 'utf8');
console.log(`✅ globals.css cleaned. Lines: ${clean.split('\n').length}`);
