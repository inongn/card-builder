/**
 * Audit script: loads each sample character from sampleCharacters.js,
 * replays their recipe through the CharacterBuilder engine, and reports
 * any unfilled slots or pool deficits using the same logic as the UI save-gate.
 *
 * Run: node scripts/auditSamples.mjs
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// ─── Shim browser APIs ────────────────────────────────────────────────────────
global.fetch = async (url) => {
    const filePath = resolve(root, 'public', url.replace(/^\//, ''));
    const text = readFileSync(filePath, 'utf8');
    return { ok: true, json: async () => JSON.parse(text), text: async () => text };
};
global.console = console;

// ─── Import engine ────────────────────────────────────────────────────────────
const { PropertyLibrary } = await import('../src/engine/PropertyLibrary.js');
const { CharacterBuilder } = await import('../src/engine/CharacterBuilder.js');
const { collectRenderableNodes, isBuilderComplete } = await import('../src/utils/builderUtils.js');

// ─── Load DB ──────────────────────────────────────────────────────────────────
const db = JSON.parse(readFileSync(resolve(root, 'public/db.json'), 'utf8'));
const library = new PropertyLibrary();
db.forEach(prop => { if (prop.id) library.addParsedProperty(prop); });

// ─── Load sample characters ────────────────────────────────────────────────────
const { SAMPLE_CHARACTERS } = await import('../src/data/sampleCharacters.js');

// ─── Audit each character ─────────────────────────────────────────────────────

const PASS = '\x1b[32m✓\x1b[0m';
const FAIL = '\x1b[31m✗\x1b[0m';
const WARN = '\x1b[33m⚠\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const RESET = '\x1b[0m';

let totalFailed = 0;
let totalPassed = 0;

console.log(`\n${BOLD}═══ Sample Character Audit ═══${RESET}\n`);

for (const sample of SAMPLE_CHARACTERS) {
    const builder = new CharacterBuilder(library);
    await builder.initialize();

    try {
        builder.applyRecipe(sample.recipe);
    } catch (err) {
        console.log(`${FAIL} ${sample.id}: recipe replay failed — ${err.message}`);
        totalFailed++;
        continue;
    }

    const tree = builder.propertyTree;
    const char = builder.characterData;

    const complete = isBuilderComplete(tree, char);

    if (complete) {
        console.log(`${PASS} ${sample.id}`);
        totalPassed++;
        continue;
    }

    totalFailed++;
    console.log(`\n${FAIL} ${BOLD}${sample.id}${RESET} — incomplete`);

    // ── Unfilled slots ──────────────────────────────────────────────────────
    const nodes = collectRenderableNodes(tree, char);
    const unfilled = nodes.filter(item => item.type === 'Slot' && !item.node.filled);

    if (unfilled.length > 0) {
        console.log(`   ${WARN} Unfilled slots (${unfilled.length}):`);
        for (const item of unfilled) {
            const node = item.node;
            const label = node.name || node.id || '(unnamed)';
            const target = node.target ? `${DIM}→ ${String(node.target).substring(0, 80)}${RESET}` : '';
            const qty = (node.quantity !== undefined && node.quantity !== 1) ? ` [qty: ${node.quantity}]` : '';
            console.log(`      • ${label}${qty}  ${target}`);
        }
    }

    // ── Pool deficits ──────────────────────────────────────────────────────
    const attr = char.attributes || {};
    const meta = char.meta || {};
    const statsList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

    const allocatedSum = statsList.reduce((sum, s) => sum + (meta[`allocated_${s}`] || 0), 0);
    const allocatedLimit = attr.pointBuyLimit || 0;
    if (allocatedSum < allocatedLimit) {
        console.log(`   ${WARN} Point-buy pool: ${allocatedSum}/${allocatedLimit} (${allocatedLimit - allocatedSum} unspent)`);
    }

    const originSum = statsList.reduce((sum, s) => sum + (meta[`origin_${s}`] || 0), 0);
    const originLimit = attr.originPoolLimit || 0;
    if (originSum < originLimit) {
        console.log(`   ${WARN} Origin pool: ${originSum}/${originLimit} (${originLimit - originSum} unspent)`);
    }

    const asiSum = statsList.reduce((sum, s) => sum + (meta[`asi_${s}`] || 0), 0);
    const asiLimit = attr.asiPoolLimit || 0;
    if (asiSum < asiLimit) {
        console.log(`   ${WARN} ASI pool: ${asiSum}/${asiLimit} (${asiLimit - asiSum} unspent)`);
    }

    console.log();
}

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n${BOLD}═══ Summary ═══${RESET}`);
console.log(`  ${PASS} Passed: ${totalPassed}`);
console.log(`  ${FAIL} Failed: ${totalFailed}`);
console.log(`  Total:  ${SAMPLE_CHARACTERS.length}\n`);

if (totalFailed > 0) process.exit(1);
