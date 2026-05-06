/**
 * clean-portfolio-css.mjs
 *
 * Elimina todo el CSS legacy del portfolio (pf-nf-*, pf-quadrant, pf-deck,
 * popup duplicados) que quedó acumulado de iteraciones anteriores de diseño.
 *
 * Mantiene solo las líneas 1–935 del archivo globals.css (la sección válida).
 *
 * Uso: node scripts/clean-portfolio-css.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath }              from 'url';
import { dirname, join }             from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cssPath   = join(__dirname, '../src/app/globals.css');

const lines = readFileSync(cssPath, 'utf8').split('\n');

// Línea 935 (índice 934) es el último cierre del bloque .pf-card--featured .pf-card__meta
// Todo lo que sigue es código legacy de iteraciones pasadas.
const CLEAN_UNTIL = 935;

const clean = lines.slice(0, CLEAN_UNTIL).join('\n') + '\n';

writeFileSync(cssPath, clean, 'utf8');

const finalCount = readFileSync(cssPath, 'utf8').split('\n').length;
console.log(`✅  globals.css limpiado. Líneas activas: ${finalCount} (eliminadas: ${lines.length - finalCount})`);
