import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Ajv from 'ajv';
import { CharacterBuilder } from '../src/engine/CharacterBuilder.js';
import { formatActivityMechanic } from '../src/utils/mechanicFormatter.js';

const PRIMITIVES_SCHEMA_PATH = path.resolve('data/schema/primitives.schema.json');
const MECHANIC_SCHEMA_PATH = path.resolve('data/schema/activityMechanic.schema.json');
const DATA_DIR = path.resolve('data');

// Initialize Ajv with draft-07 support
const ajv = new Ajv({ allErrors: true, verbose: true });
const primitivesSchema = JSON.parse(fs.readFileSync(PRIMITIVES_SCHEMA_PATH, 'utf8'));
const mechanicSchema = JSON.parse(fs.readFileSync(MECHANIC_SCHEMA_PATH, 'utf8'));
ajv.addSchema(primitivesSchema);
const validateMechanic = ajv.compile(mechanicSchema);

/**
 * Authoritative mock character with all attributes, stats, resources, and scaling variables.
 */
export const MOCK_CHARACTER = {
    meta: {
        level: 8,
        class: 'fighter',
        sub: 'Necromancer',
        steedname: 'Shadowfax',
        familiarEnvironment: 'Land',
        familiarType: 'Celestial'
    },
    stats: {
        str: { score: 18, mod: 4 },
        dex: { score: 14, mod: 2 },
        con: { score: 16, mod: 3 },
        int: { score: 16, mod: 3 },
        wis: { score: 14, mod: 2 },
        cha: { score: 10, mod: 0 }
    },
    attributes: {
        prof: 3,
        ac: 16,
        melee: { attack: 7, bonus: 4 },
        finesse: { attack: 5, bonus: 2 },
        ranged: { attack: 5, bonus: 2 },
        spellcasting: { attack: 7, save: 15, bonus: 3 },
        movement: { walk: 30, fly: 0, swim: 0, climb: 0 },
        shieldEquipped: false,
        weaponMastery: true,
        monkSaveDC: 15,
        superioritySave: 15,
        superiorityDie: '1d8',
        bardicDie: 8,
        cunningStrikeSave: 15,
        martialArtsDie: 8,
        hitDie: 'd8',
        psiDice: '1d8',
        rageDamage: 2,
        sneakAttackDice: '4d6',
        dragonicAncestryDamage: 'fire',
        pactOfTheBlade: true,
        pactOfTheChain: true
    },
    skills: {
        acrobatics: { bonus: 2, proficiency: 0 },
        animal_handling: { bonus: 2, proficiency: 0 },
        arcana: { bonus: 6, proficiency: 1 },
        athletics: { bonus: 7, proficiency: 1 },
        deception: { bonus: 0, proficiency: 0 },
        history: { bonus: 6, proficiency: 1 },
        insight: { bonus: 5, proficiency: 1 },
        intimidation: { bonus: 0, proficiency: 0 },
        investigation: { bonus: 6, proficiency: 1 },
        medicine: { bonus: 2, proficiency: 0 },
        nature: { bonus: 6, proficiency: 1 },
        perception: { bonus: 5, proficiency: 1 },
        performance: { bonus: 0, proficiency: 0 },
        persuasion: { bonus: 0, proficiency: 0 },
        religion: { bonus: 6, proficiency: 1 },
        sleight_of_hand: { bonus: 2, proficiency: 0 },
        stealth: { bonus: 5, proficiency: 1 },
        survival: { bonus: 2, proficiency: 0 }
    },
    saves: {
        str: { bonus: 7 },
        dex: { bonus: 2 },
        con: { bonus: 6 },
        int: { bonus: 3 },
        wis: { bonus: 2 },
        cha: { bonus: 0 }
    },
    resources: [
        { id: 'level1SpellSlot', name: '1st Level Spell Slot', quantity: 4 },
        { id: 'level2SpellSlot', name: '2nd Level Spell Slot', quantity: 3 },
        { id: 'level3SpellSlot', name: '3rd Level Spell Slot', quantity: 3 },
        { id: 'level4SpellSlot', name: '4th Level Spell Slot', quantity: 2 },
        { id: 'level5SpellSlot', name: '5th Level Spell Slot', quantity: 1 },
        { id: 'focusPoints', name: 'Focus Points', quantity: 8 },
        { id: 'favoredEnemy', name: 'Favored Enemy', quantity: 3 },
        { id: 'channelDivinity', name: 'Channel Divinity', quantity: 2 },
        { id: 'sorceryPoints', name: 'Sorcery Points', quantity: 8 },
        { id: 'rage', name: 'Rage', quantity: 4 },
        { id: 'bardicInspiration', name: 'Bardic Inspiration', quantity: 4 }
    ]
};

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
 * Walks parsed object tree to find all matching nodes
 */
function findNodes(node, targetType, file, parentChain = []) {
    const list = [];
    if (!node || typeof node !== 'object') return list;

    if (node.type === targetType) {
        list.push({ node, file, parentChain: [...parentChain] });
    }

    const currentName = node.name || node.id || '';
    const nextChain = currentName ? [...parentChain, currentName] : parentChain;

    if (Array.isArray(node)) {
        node.forEach(item => list.push(...findNodes(item, targetType, file, nextChain)));
    } else {
        Object.keys(node).forEach(key => {
            list.push(...findNodes(node[key], targetType, file, nextChain));
        });
    }
    return list;
}

/**
 * Categorizes an activity into human-friendly sections
 */
function categorizeActivity(activity, filePath) {
    const rel = path.relative(DATA_DIR, filePath).replace(/\\/g, '/');
    if (rel.startsWith('core/')) return 'Core Activities';
    if (rel.startsWith('equipment/weapons/')) return 'Weapons';
    if (rel.startsWith('equipment/')) return 'Equipment & Gear';
    if (rel.startsWith('spells/cantrips/')) return 'Spells: Cantrips';
    if (rel.startsWith('spells/level1Spells/')) return 'Spells: 1st Level';
    if (rel.startsWith('spells/level2Spells/')) return 'Spells: 2nd Level';
    if (rel.startsWith('spells/level3Spells/')) return 'Spells: 3rd Level';
    if (rel.startsWith('spells/level4Spells/')) return 'Spells: 4th Level';
    if (rel.startsWith('spells/level5Spells/')) return 'Spells: 5th Level';
    if (rel.startsWith('spells/')) return 'Spells: Higher Level';
    if (rel.startsWith('classes/subclasses/')) {
        const parts = rel.split('/');
        return `Subclass Features (${parts[2]})`;
    }
    if (rel.startsWith('classes/')) {
        const parts = rel.split('/');
        return `Class Features (${parts[1].replace('.yml', '')})`;
    }
    if (rel.startsWith('feats/')) return 'Feats';
    return 'Miscellaneous Activities';
}

/**
 * Applies a list of Effect nodes to an activity using CharacterBuilder
 */
function applyEffectsToActivity(activity, effectNodes) {
    const builder = new CharacterBuilder({ getProperty: () => null });
    builder.characterData = structuredClone(MOCK_CHARACTER);
    const actCopy = structuredClone(activity);
    if (actCopy.id === 'weaponAttack' && !actCopy.variables) {
        actCopy.variables = {
            name: 'Weapon Attack',
            category: 'martial',
            classification: 'melee',
            mastery: 'push',
            property: 'versatile',
            damageType: 'bludgeoning',
            damageRoll: '1d8',
            range: '5 feet'
        };
    }
    builder.characterData.activities = [actCopy];
    effectNodes.forEach(eff => {
        try {
            builder.applyEffect(eff);
        } catch (e) {
            // Ignored if effect cannot apply to this scope
        }
    });
    return actCopy;
}

/**
 * Main auditing and markdown generator function
 */
export async function runAudit({ generateMarkdown = false, markdownPath = 'activities_audit.md' } = {}) {
    console.log('=== Authoritative Activity & Mechanics Audit ===\n');

    const yamlFiles = getYamlFiles(DATA_DIR);
    const activities = [];
    const effects = [];

    yamlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const docs = yaml.loadAll(content);
            docs.forEach(doc => {
                if (!doc) return;
                activities.push(...findNodes(doc, 'Activity', file));
                effects.push(...findNodes(doc, 'Effect', file));
            });
        } catch (err) {
            console.error(`Error reading ${file}:`, err.message);
        }
    });

    console.log(`Scanned ${yamlFiles.length} files.`);
    console.log(`Found ${activities.length} total Activity nodes.`);

    // Filter effects that target activities
    const actEffects = effects.filter(e => typeof e.node.target === 'string' && e.node.target.includes('activities'));
    console.log(`Found ${actEffects.length} Effect nodes targeting activities.`);

    // Group effects by source feature
    const featureMap = new Map();
    actEffects.forEach(eff => {
        const featureKey = eff.file + '::' + (eff.node.name || eff.parentChain.slice(-1)[0] || eff.node.id || 'effect');
        if (!featureMap.has(featureKey)) {
            featureMap.set(featureKey, {
                file: eff.file,
                name: eff.node.name || eff.parentChain.slice(-1)[0] || eff.node.id,
                effects: []
            });
        }
        featureMap.get(featureKey).effects.push(eff.node);
    });

    const features = Array.from(featureMap.values());
    features.forEach(feat => {
        const p = feat.file.replace(/\\/g, '/');
        if (p.includes('/feats/')) {
            feat.category = 'feat';
        } else if (p.includes('/core/')) {
            feat.category = 'core';
        } else if (p.includes('/classes/')) {
            feat.category = 'class';
            const match = p.match(/classes\/(?:subclasses\/|classOptions\/)?([^\/]+)/);
            feat.className = match ? match[1].replace('.yml', '') : 'class';
            if (p.includes('/subclasses/')) {
                const subMatch = p.match(/subclasses\/[^\/]+\/([^\/]+)\.ya?ml/);
                if (subMatch) feat.subclassName = subMatch[1];
            }
        } else {
            feat.category = 'other';
        }
    });

    console.log(`Identified ${features.length} unique modifying features/sources.\n`);

    let totalVariations = 0;
    let schemaErrors = 0;
    let unresolvedExpressions = 0;
    const errorDetails = [];

    // Data structures for markdown generation
    const categoriesMap = new Map();

    activities.forEach(({ node: act, file }) => {
        const category = categorizeActivity(act, file);
        if (!categoriesMap.has(category)) {
            categoriesMap.set(category, []);
        }

        const actRecord = {
            id: act.id,
            name: act.name || act.id,
            file: path.relative(process.cwd(), file),
            time: act.time || 'N/A',
            range: act.range || 'N/A',
            duration: act.duration || 'N/A',
            resource: Array.isArray(act.resource) ? act.resource.join(', ') : (act.resource || 'None'),
            tags: act.tags || [],
            hasMechanic: Boolean(act.mechanic),
            baselineProse: '',
            variations: [],
            classStacks: []
        };

        if (act.id === 'weaponAttack' && !act.variables) {
            act.variables = {
                name: 'Weapon Attack',
                category: 'martial',
                classification: 'melee',
                mastery: 'push',
                property: 'versatile',
                damageType: 'bludgeoning',
                damageRoll: '1d8',
                range: '5 feet'
            };
        }

        // 1. Baseline Evaluation
        totalVariations++;
        if (act.mechanic) {
            const valid = validateMechanic(act.mechanic);
            if (!valid) {
                schemaErrors++;
                errorDetails.push(`Baseline schema error in ${act.id} (${actRecord.file}): ${JSON.stringify(validateMechanic.errors)}`);
            }
        }
        const baselineProse = formatActivityMechanic(act, MOCK_CHARACTER);
        actRecord.baselineProse = baselineProse;
        if (baselineProse && baselineProse.includes('$(')) {
            unresolvedExpressions++;
            errorDetails.push(`Unresolved $( in baseline ${act.id}: ${baselineProse}`);
        }

        // Test which features modify this activity
        const applicableFeatures = [];
        features.forEach(feat => {
            const modified = applyEffectsToActivity(act, feat.effects);
            if (JSON.stringify(modified) !== JSON.stringify(act)) {
                applicableFeatures.push({ feat, modified });
            }
        });

        // 2. Individual Feature Variations
        applicableFeatures.forEach(({ feat, modified }) => {
            totalVariations++;
            if (modified.mechanic) {
                const valid = validateMechanic(modified.mechanic);
                if (!valid) {
                    schemaErrors++;
                    errorDetails.push(`Feature ${feat.name} on ${act.id} (${feat.file}): ${JSON.stringify(validateMechanic.errors)}`);
                }
            }
            const prose = formatActivityMechanic(modified, MOCK_CHARACTER);
            if (prose && prose.includes('$(')) {
                unresolvedExpressions++;
                errorDetails.push(`Unresolved $( in ${act.id} + ${feat.name}: ${prose}`);
            }

            actRecord.variations.push({
                featureName: feat.name,
                featureFile: path.relative(process.cwd(), feat.file),
                category: feat.category,
                prose
            });
        });

        // 3. Realistic Class Build Stacks (No Multiclassing)
        const universalFeats = applicableFeatures.filter(af => af.feat.category === 'core' || af.feat.category === 'feat');
        const classFeatures = applicableFeatures.filter(af => af.feat.category === 'class');
        const classesRepresented = Array.from(new Set(classFeatures.map(cf => cf.feat.className)));

        classesRepresented.forEach(cls => {
            const clsFeats = classFeatures.filter(cf => cf.feat.className === cls);
            const subMap = new Map();
            clsFeats.forEach(cf => {
                const sub = cf.feat.subclassName || '_base_';
                if (!subMap.has(sub)) subMap.set(sub, []);
                subMap.get(sub).push(cf);
            });

            const baseFeats = subMap.get('_base_') || [];
            const subKeys = Array.from(subMap.keys()).filter(k => k !== '_base_');
            const combos = subKeys.length > 0 ? subKeys.map(k => [...baseFeats, ...subMap.get(k)]) : [baseFeats];

            combos.forEach(combo => {
                const stackEffects = [...universalFeats.flatMap(u => u.feat.effects), ...combo.flatMap(c => c.feat.effects)];
                const stacked = applyEffectsToActivity(act, stackEffects);
                totalVariations++;
                if (stacked.mechanic) {
                    const valid = validateMechanic(stacked.mechanic);
                    if (!valid) {
                        schemaErrors++;
                        errorDetails.push(`Class stack ${cls} on ${act.id}: ${JSON.stringify(validateMechanic.errors)}`);
                    }
                }
                const prose = formatActivityMechanic(stacked, MOCK_CHARACTER);
                if (prose && prose.includes('$(')) {
                    unresolvedExpressions++;
                    errorDetails.push(`Unresolved $( in ${act.id} + stack ${cls}: ${prose}`);
                }

                const stackFeaturesNames = [...universalFeats.map(u => u.feat.name), ...combo.map(c => c.feat.name)];
                actRecord.classStacks.push({
                    stackName: `${cls.toUpperCase()}${combo[0]?.feat?.subclassName ? ` (${combo[0].feat.subclassName})` : ''} + [${stackFeaturesNames.join(', ')}]`,
                    prose
                });
            });
        });

        // Universal-only stack if multiple universal features and no class features
        if (classesRepresented.length === 0 && universalFeats.length > 1) {
            const stackEffects = universalFeats.flatMap(u => u.feat.effects);
            const stacked = applyEffectsToActivity(act, stackEffects);
            totalVariations++;
            if (stacked.mechanic) {
                const valid = validateMechanic(stacked.mechanic);
                if (!valid) {
                    schemaErrors++;
                    errorDetails.push(`Universal stack on ${act.id}: ${JSON.stringify(validateMechanic.errors)}`);
                }
            }
            const prose = formatActivityMechanic(stacked, MOCK_CHARACTER);
            if (prose && prose.includes('$(')) {
                unresolvedExpressions++;
                errorDetails.push(`Unresolved $( in ${act.id} + universal stack: ${prose}`);
            }

            actRecord.classStacks.push({
                stackName: `Universal Stack (${universalFeats.map(u => u.feat.name).join(' + ')})`,
                prose
            });
        }

        categoriesMap.get(category).push(actRecord);
    });

    console.log('--- Summary ---');
    console.log(`Total 'Activity' nodes:       ${activities.length}`);
    console.log(`Total variations evaluated:  ${totalVariations}`);
    console.log(`Mechanic schema errors:      ${schemaErrors}`);
    console.log(`Unresolved expressions ($(): ${unresolvedExpressions}`);

    if (errorDetails.length > 0) {
        console.error('\n❌ Errors found during validation:');
        errorDetails.slice(0, 20).forEach(err => console.error(`  - ${err}`));
        if (errorDetails.length > 20) {
            console.error(`  ... and ${errorDetails.length - 20} more errors.`);
        }
    } else {
        console.log('\n✅ All Activities, Variations, and Realistic Stacks are 100% valid with 0 unresolved expressions!');
    }

    if (generateMarkdown) {
        console.log(`\nGenerating human-readable audit markdown to [${markdownPath}]...`);
        let md = `# Activity Mechanics & Prose Sentence Construction Audit\n\n`;
        md += `> **Audit Generated:** ${new Date().toISOString()}\n`;
        md += `> **Total Activities Audited:** ${activities.length}\n`;
        md += `> **Total Distinct Variations Evaluated:** ${totalVariations}\n`;
        md += `> **Schema Validation Errors:** ${schemaErrors}\n`;
        md += `> **Unresolved Expressions:** ${unresolvedExpressions}\n\n`;

        md += `## Table of Contents\n\n`;
        for (const catName of categoriesMap.keys()) {
            const anchor = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            md += `- [${catName}](#${anchor}) (${categoriesMap.get(catName).length} activities)\n`;
        }
        md += `\n---\n\n`;

        for (const [catName, records] of categoriesMap.entries()) {
            const anchor = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            md += `## ${catName}\n\n`;

            records.forEach(rec => {
                md += `### ${rec.name} (\`${rec.id}\`)\n\n`;
                md += `- **Source File:** [\`${rec.file}\`](file://${path.resolve(rec.file)})\n`;
                md += `- **Time:** \`${rec.time}\` | **Range:** \`${rec.range}\` | **Duration:** \`${rec.duration}\`\n`;
                if (rec.resource !== 'None') {
                    md += `- **Resource:** \`${rec.resource}\`\n`;
                }
                if (rec.tags.length > 0) {
                    md += `- **Tags:** ${rec.tags.map(t => `\`${t}\``).join(', ')}\n`;
                }
                md += `\n`;

                md += `#### Baseline Prose\n\n`;
                if (rec.baselineProse) {
                    md += `> ${rec.baselineProse.replace(/\n/g, '\n> ')}\n\n`;
                } else {
                    md += `> *(No formatted output)*\n\n`;
                }

                if (rec.variations.length > 0) {
                    md += `#### Individual Feature Modifications (${rec.variations.length})\n\n`;
                    rec.variations.forEach(v => {
                        md += `* **+ ${v.featureName}** *(from [\`${v.featureFile}\`](file://${path.resolve(v.featureFile)}))*\n`;
                        md += `  > ${v.prose.replace(/\n/g, '\n  > ')}\n\n`;
                    });
                }

                if (rec.classStacks.length > 0) {
                    md += `#### Realistic Combined Class Stacks (${rec.classStacks.length})\n\n`;
                    rec.classStacks.forEach(s => {
                        md += `* **Stack: ${s.stackName}**\n`;
                        md += `  > ${s.prose.replace(/\n/g, '\n  > ')}\n\n`;
                    });
                }

                md += `---\n\n`;
            });
        }

        fs.writeFileSync(markdownPath, md, 'utf8');
        console.log(`✅ Markdown written to ${markdownPath} (${(fs.statSync(markdownPath).size / 1024).toFixed(1)} KB)`);
    }

    if (schemaErrors > 0 || unresolvedExpressions > 0) {
        process.exit(1);
    }
}

// Direct execution from CLI
if (process.argv[1] && process.argv[1].endsWith('validateActivities.js')) {
    const isMarkdown = process.argv.includes('--markdown');
    const outIdx = process.argv.indexOf('--output');
    const outPath = outIdx !== -1 && process.argv[outIdx + 1] ? process.argv[outIdx + 1] : 'activities_audit.md';
    runAudit({ generateMarkdown: isMarkdown || Boolean(process.env.GENERATE_MARKDOWN), markdownPath: outPath });
}
