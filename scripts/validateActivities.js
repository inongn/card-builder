import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Ajv from 'ajv';
import { formatActivityMechanic } from '../src/utils/mechanicFormatter.js';
import { formatActivityMechanicEs, setMechanicFormatterEsTranslations } from '../src/utils/mechanicFormatterEs.js';

const PRIMITIVES_SCHEMA_PATH = path.resolve('data/schema/primitives.schema.json');
const MECHANIC_SCHEMA_PATH = path.resolve('data/schema/activityMechanic.schema.json');
const ES_DATA_PATH = path.resolve('public/locales/es/data.json');
const DATA_DIR = path.resolve('data');

// Initialize Ajv with draft-07 support
const ajv = new Ajv({ allErrors: true, verbose: true });

// Load schemas and translations
const primitivesSchema = JSON.parse(fs.readFileSync(PRIMITIVES_SCHEMA_PATH, 'utf8'));
const mechanicSchema = JSON.parse(fs.readFileSync(MECHANIC_SCHEMA_PATH, 'utf8'));
let esData = {};
try {
  esData = JSON.parse(fs.readFileSync(ES_DATA_PATH, 'utf8'));
  setMechanicFormatterEsTranslations(esData);
} catch (e) {}

ajv.addSchema(primitivesSchema);
const validateMechanic = ajv.compile(mechanicSchema);

let totalFilesScanned = 0;
let totalActivitiesFound = 0;
let totalMechanicsValidated = 0;
let totalSchemaErrors = 0;
let totalFormatErrorsEn = 0;
let totalFormatErrorsEs = 0;
let unparsedTokensEn = [];
let unparsedTokensEs = [];
let englishLeakageEs = [];

/**
 * Recursively scans directory for YAML files
 */
function getYamlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (file !== 'schema') {
                results = results.concat(getYamlFiles(filePath));
            }
        } else if (file.endsWith('.yml') || file.endsWith('.yaml')) {
            results.push(filePath);
        }
    });
    return results;
}

/**
 * Walks parsed object tree to find all `type: Activity` nodes
 */
function findActivities(node, currentPath = '') {
    const activities = [];
    if (!node || typeof node !== 'object') return activities;

    if (node.type === 'Activity') {
        activities.push({ node, path: currentPath || 'root' });
    }

    if (Array.isArray(node)) {
        node.forEach((item, idx) => {
            activities.push(...findActivities(item, `${currentPath}[${idx}]`));
        });
    } else {
        Object.keys(node).forEach(key => {
            if (key !== 'type') {
                const childPath = currentPath ? `${currentPath}.${key}` : key;
                activities.push(...findActivities(node[key], childPath));
            }
        });
    }

    return activities;
}

console.log('=== Activity Mechanic Validation (Schema & Formatter EN/ES) ===\n');

const yamlFiles = getYamlFiles(DATA_DIR);
totalFilesScanned = yamlFiles.length;

// Sample mock character data for resolution of attributes like spellcasting, etc.
const mockCharacter = {
    meta: { level: 5 },
    stats: {
        str: { score: 10, mod: 0 },
        dex: { score: 14, mod: 2 },
        con: { score: 12, mod: 1 },
        int: { score: 18, mod: 4 },
        wis: { score: 12, mod: 1 },
        cha: { score: 10, mod: 0 }
    },
    attributes: {
        prof: 3,
        rageDamage: 2,
        bardicDie: 8,
        superiorityDie: 8,
        superioritySave: 15,
        martialArtsDie: 6,
        sneakAttackDice: 3,
        spellcasting: {
            attack: 7,
            save: 15,
            bonus: 4,
            ability: 'int'
        }
    },
    resources: [
        { id: 'level1SpellSlot', max: 4, value: 4 },
        { id: 'level2SpellSlot', max: 3, value: 3 },
        { id: 'level3SpellSlot', max: 2, value: 2 }
    ]
};

const sampleRenders = [];

yamlFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const docs = yaml.loadAll(content);

        docs.forEach(doc => {
            if (!doc) return;
            const activities = findActivities(doc);
            totalActivitiesFound += activities.length;

            activities.forEach(({ node, path: nodePath }) => {
                if (node.mechanic) {
                    totalMechanicsValidated++;
                    const valid = validateMechanic(node.mechanic);
                    if (!valid) {
                        totalSchemaErrors++;
                        const relFile = path.relative(process.cwd(), file);
                        console.error(`❌ Schema Error in [${relFile}] -> Node (${node.id || nodePath}):`);
                        validateMechanic.errors.forEach(err => {
                            console.error(`   - ${err.instancePath || '/'} : ${err.message}`);
                        });
                    }

                    // Validate English Formatter
                    let renderedEn = '';
                    try {
                        renderedEn = formatActivityMechanic(node, mockCharacter);
                        const tokenMatch = renderedEn.match(/\$\([^)]+\)/g);
                        if (tokenMatch) {
                            unparsedTokensEn.push({ id: node.id || nodePath, tokens: tokenMatch, file });
                        }
                    } catch (err) {
                        totalFormatErrorsEn++;
                        console.error(`❌ EN Formatter Exception [${node.id || nodePath}]:`, err.message);
                    }

                    // Validate Spanish Formatter
                    let renderedEs = '';
                    try {
                        renderedEs = formatActivityMechanicEs(node, mockCharacter, esData);
                        const tokenMatch = renderedEs.match(/\$\([^)]+\)/g);
                        if (tokenMatch) {
                            unparsedTokensEs.push({ id: node.id || nodePath, tokens: tokenMatch, file });
                        }

                        // Check for common English leaks in structured text
                        // (Only checking mechanics that don't fallback purely to description)
                        const leaks = [];
                        if (/\bfeet\b/i.test(renderedEs)) leaks.push('feet');
                        if (/\bfoot\b/i.test(renderedEs)) leaks.push('foot');
                        if (/_Saving Throw:_/i.test(renderedEs)) leaks.push('Saving Throw');
                        if (/_Attack Roll:_/i.test(renderedEs)) leaks.push('Attack Roll');
                        if (/_Hit:_/i.test(renderedEs)) leaks.push('Hit');
                        if (/_Miss:_/i.test(renderedEs)) leaks.push('Miss');
                        if (/_Failure:_/i.test(renderedEs)) leaks.push('Failure');
                        if (/_Success:_/i.test(renderedEs)) leaks.push('Success');
                        if (/_Concentration:_/i.test(renderedEs)) leaks.push('Concentration');
                        if (/_Duration:_/i.test(renderedEs)) leaks.push('Duration');
                        if (/_Upcast:_/i.test(renderedEs)) leaks.push('Upcast');
                        if (/\bBonus Action\b/i.test(renderedEs)) leaks.push('Bonus Action');
                        if (/\bReaction\b/i.test(renderedEs)) leaks.push('Reaction');
                        if (/\bHit Points\b/i.test(renderedEs)) leaks.push('Hit Points');
                        if (/\bTemporary Hit Points\b/i.test(renderedEs)) leaks.push('Temporary Hit Points');

                        if (leaks.length > 0) {
                            const isTextFallback = !node.mechanic || (
                                node.mechanic.pattern === 'automatic' && (node.mechanic.text || (node.mechanic.payloads && (node.mechanic.payloads.text || (Array.isArray(node.mechanic.payloads) && node.mechanic.payloads.some(p => p.type === 'text')))))
                            );
                            englishLeakageEs.push({ id: node.id || nodePath, leaks, renderedEs, file, isTextFallback });
                        }
                    } catch (err) {
                        totalFormatErrorsEs++;
                        console.error(`❌ ES Formatter Exception [${node.id || nodePath}]:`, err.message);
                    }

                    if (sampleRenders.length < 8 && ['fireball', 'cureWounds', 'spiritualWeapon', 'shield', 'magicMissile', 'sacredFlame', 'mistyStep', 'burningHands'].includes(node.id)) {
                        sampleRenders.push({ id: node.id, en: renderedEn, es: renderedEs });
                    }
                }
            });
        });
    } catch (err) {
        console.error(`Error reading ${file}:`, err.message);
    }
});

const structuredLeaks = englishLeakageEs.filter(l => !l.isTextFallback);
const textFallbackLeaks = englishLeakageEs.filter(l => l.isTextFallback);

console.log('--- Summary ---');
console.log(`Files scanned:              ${totalFilesScanned}`);
console.log(`Total 'Activity' nodes:     ${totalActivitiesFound}`);
console.log(`Nodes with 'mechanic':     ${totalMechanicsValidated}`);
console.log(`Schema errors:              ${totalSchemaErrors}`);
console.log(`EN Formatter errors:        ${totalFormatErrorsEn}`);
console.log(`ES Formatter errors:        ${totalFormatErrorsEs}`);
console.log(`Unparsed tokens (EN):       ${unparsedTokensEn.length}`);
console.log(`Unparsed tokens (ES):       ${unparsedTokensEs.length}`);
console.log(`English leakage (ES total): ${englishLeakageEs.length}`);
console.log(`  - Structured mechanics:   ${structuredLeaks.length}`);
console.log(`  - Text fallback/payloads: ${textFallbackLeaks.length}`);

if (structuredLeaks.length > 0) {
    console.log('\n--- Structured Mechanics English Leakages in ES (all) ---');
    structuredLeaks.forEach(({ id, leaks, renderedEs }) => {
        console.log(`[${id}] Leaks: [${leaks.join(', ')}]`);
        console.log(`Rendered: ${renderedEs}\n`);
    });
}

if (unparsedTokensEs.length > 0) {
    console.log('\n--- Unparsed Tokens in ES (first 5) ---');
    unparsedTokensEs.slice(0, 5).forEach(({ id, tokens }) => {
        console.log(`[${id}] Tokens: ${tokens.join(', ')}`);
    });
}

console.log('\n--- Sample Activity Renders ---');
sampleRenders.forEach(({ id, en, es }) => {
    console.log(`\n🔹 [${id}]`);
    console.log(`EN: ${en}`);
    console.log(`ES: ${es}`);
});

if (totalSchemaErrors > 0 || totalFormatErrorsEn > 0 || totalFormatErrorsEs > 0) {
    process.exit(1);
}

