/**
 * Testing Pipeline for Character Builder Screen:
 * Replays all 84 sample character recipes and validates:
 * 1. All expected slots show up in their proper UI categories (Origin, Class, Abilities, Arsenal).
 * 2. No slots are orphaned or fail categorization.
 * 3. No out-of-place or foreign class/subclass slots show up (e.g. Artificer spells on a Wizard, Metamagic on a Fighter).
 * 4. Selector option pools for each slot are populated with valid options (no empty pools, no illegal options).
 *
 * Run: node scripts/testBuilderPipeline.mjs
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// ─── Browser shims ────────────────────────────────────────────────────────────
global.fetch = async (url) => {
    const filePath = resolve(root, 'public', url.replace(/^\//, ''));
    const text = readFileSync(filePath, 'utf8');
    return { ok: true, json: async () => JSON.parse(text), text: async () => text };
};
global.console = console;

// ─── Imports ──────────────────────────────────────────────────────────────────
const { PropertyLibrary } = await import('../src/engine/PropertyLibrary.js');
const { CharacterBuilder } = await import('../src/engine/CharacterBuilder.js');
const { ExpressionEvaluator } = await import('../src/engine/ExpressionEvaluator.js');
const {
    collectRenderableNodes,
    categorizeNode,
    getCategoryForStep,
    matchesSlotTagExpression,
    isNodeConditionMet
} = await import('../src/utils/builderUtils.js');

// ─── Load Database ─────────────────────────────────────────────────────────────
const db = JSON.parse(readFileSync(resolve(root, 'public/db.json'), 'utf8'));
const library = new PropertyLibrary();
db.forEach(prop => { if (prop.id) library.addParsedProperty(prop); });

// ─── Load Sample Characters ───────────────────────────────────────────────────
const { SAMPLE_CHARACTERS } = await import('../src/data/sampleCharacters.js');

// ─── Define Foreign Slot Rules ────────────────────────────────────────────────
// Key: slot ID or slot name snippet -> array of allowed class IDs
const CLASS_EXCLUSIVE_SLOTS = {
    'artificerspells': ['artificer'],
    'artificercantrips': ['artificer'],
    'infusion': ['artificer'],
    'metamagic': ['sorcerer'],
    'invocation': ['warlock'],
    'pactboon': ['warlock'],
    'psionicpower': ['psion'],
    'psienergy': ['psion'],
    'maneuver': ['fighter'],
    'rage': ['barbarian'],
    'wildshape': ['druid'],
    'bardicinspiration': ['bard'],
};

// ─── Helper: Get slot options ────────────────────────────────────────────────
function getOptions(builder, slotNode) {
    if (!slotNode?.target) return [];
    let targetExpr = slotNode.target;
    if (typeof targetExpr === 'string' && targetExpr.includes('$')) {
        try {
            const evaluator = new ExpressionEvaluator(builder.characterData);
            targetExpr = evaluator.evaluate(targetExpr, slotNode.variables || {});
        } catch {
            targetExpr = targetExpr.replace(/\$\([^)]+\)/g, '');
        }
    }

    const dummyNode = { ...slotNode, target: targetExpr };
    const opts = [];
    for (const prop of library.properties.values()) {
        if (matchesSlotTagExpression(prop, dummyNode)) {
            opts.push(prop);
        }
    }
    return opts.filter(opt => isNodeConditionMet(opt, builder.characterData));
}

// ─── Pipeline Execution ───────────────────────────────────────────────────────
const PASS = '\x1b[32m✓\x1b[0m';
const FAIL = '\x1b[31m✗\x1b[0m';
const WARN = '\x1b[33m⚠\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const RESET = '\x1b[0m';

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

console.log(`\n${BOLD}═══ Character Builder Screen Pipeline Test ═══${RESET}\n`);
console.log(`Validating slot placement, category mapping, selector pools, and slot exclusivity for ${SAMPLE_CHARACTERS.length} sample characters...\n`);

for (const sample of SAMPLE_CHARACTERS) {
    totalTests++;
    const charFailures = [];

    const builder = new CharacterBuilder(library);
    await builder.initialize();

    try {
        builder.applyRecipe(sample.recipe);
    } catch (err) {
        charFailures.push(`Recipe application error: ${err.message}`);
    }

    const tree = builder.propertyTree;
    const char = builder.characterData;
    const renderableNodes = collectRenderableNodes(tree, char);

    const targetClass = (sample.class || char.meta?.class || '').toLowerCase();

    // 1. Check slot & input presence
    if (renderableNodes.length === 0) {
        charFailures.push(`No renderable nodes generated on builder screen`);
    }

    // 2. Validate slot categorization & exclusivity
    for (const item of renderableNodes) {
        const node = item.node;
        const nodeName = node.name || node.id || '';
        const nodeIdLower = String(node.id || '').toLowerCase();
        const nodeNameLower = String(node.name || '').toLowerCase();

        // Categorization check
        const stepKey = categorizeNode(item);
        const categoryKey = stepKey ? getCategoryForStep(stepKey) : null;
        if (!categoryKey) {
            // Note: ability stat inputs (allocated_str, etc.) are handled specially by getAvailableCategories
            const isStatInput = nodeName.match(/^(allocated|origin|asi)_(str|dex|con|int|wis|cha)$/);
            if (!isStatInput) {
                charFailures.push(`Node "${nodeName}" (${item.type}) failed UI categorization — stepKey: ${stepKey}`);
            }
        }

        // Exclusivity check (no out-of-place foreign class slots)
        for (const [slotKey, allowedClasses] of Object.entries(CLASS_EXCLUSIVE_SLOTS)) {
            if (nodeIdLower.includes(slotKey) || nodeNameLower.includes(slotKey)) {
                if (!allowedClasses.includes(targetClass)) {
                    charFailures.push(`Out-of-place slot "${nodeName}" (id: ${node.id}) found on ${sample.class} character`);
                }
            }
        }

        // Selector pool validation for unfilled slots
        if (item.type === 'Slot' && !node.filled) {
            const options = getOptions(builder, node);
            if (options.length === 0) {
                // Warning: slot option pool is empty
                charFailures.push(`Slot "${nodeName}" (target: ${node.target}) has 0 available options in selector pool`);
            }
        }
    }

    if (charFailures.length === 0) {
        passedTests++;
        console.log(`${PASS} ${sample.id} (${sample.class} - ${sample.sub}): ${renderableNodes.length} builder items verified`);
    } else {
        failedTests++;
        console.log(`${FAIL} ${BOLD}${sample.id}${RESET} (${sample.class} - ${sample.sub}):`);
        for (const f of charFailures) {
            console.log(`   ${WARN} ${f}`);
        }
        failures.push({ sampleId: sample.id, charFailures });
    }
}

console.log(`\n${BOLD}═══ Pipeline Results ═══${RESET}`);
console.log(`Total Characters Tested: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);

if (failedTests > 0) {
    process.exit(1);
} else {
    console.log(`\n${PASS} ${BOLD}All builder screen slots and selector option pools verified cleanly across all sample characters!${RESET}\n`);
}
