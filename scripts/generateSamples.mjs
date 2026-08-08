import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
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
const { collectRenderableNodes } = await import('../src/utils/builderUtils.js');

function pickPortrait(subcId) {
    if (!subcId) return '';
    const cleanSubc = subcId.toLowerCase().replace(/[^a-z0-9]/g, '');
    const headshotDir = resolve(root, 'public', 'subclass_headshot');
    if (!existsSync(headshotDir)) return '';
    const files = readdirSync(headshotDir);

    let match = files.find(file => {
        const ext = file.substring(file.lastIndexOf('.')).toLowerCase();
        const nameWithoutExt = file.substring(0, file.lastIndexOf('.')).toLowerCase().replace(/[^a-z0-9]/g, '');
        return nameWithoutExt === cleanSubc && ext === '.webp';
    });

    if (!match) {
        match = files.find(file => {
            const nameWithoutExt = file.substring(0, file.lastIndexOf('.')).toLowerCase().replace(/[^a-z0-9]/g, '');
            return nameWithoutExt === cleanSubc;
        });
    }

    return match ? `subclass_headshot/${match}` : '';
}

// ─── Load DB ──────────────────────────────────────────────────────────────────

const db = JSON.parse(readFileSync(resolve(root, 'public/db.json'), 'utf8'));
const library = new PropertyLibrary();
db.forEach(prop => { if (prop.id) library.addParsedProperty(prop); });
console.log(`Loaded ${library.properties.size} properties`);

const globallyUsedIds = new Set();

function findUnfilledSlots(node, path = []) {
    const results = [];
    if (!node || node.visible === false) return results;
    if (!node.children) return results;
    for (const child of node.children) {
        if (!child || child.visible === false) continue;
        const step = { id: child.id, slotIndex: child.slotIndex };
        const childPath = [...path, step];
        if (child.type === 'Slot' && !child.filled) {
            results.push({ node: child, path: childPath });
        }
        results.push(...findUnfilledSlots(child, childPath));
    }
    return results;
}

function fillSlotByPath(builder, logicalPath, propertyId) {
    const recipe = builder.getRecipe();
    recipe.slots.push({ path: logicalPath, propertyId });
    builder.applyRecipe(recipe);
}

function getOptions(builder, slotNode) {
    if (!slotNode?.target) return [];
    try {
        return library.findByTags(slotNode.target);
    } catch {
        return [];
    }
}

function pickOption(options, existingIds, prefer = []) {
    for (const pref of prefer) {
        const match = options.find(o => o.id === pref);
        if (match && !existingIds.has(match.id) && !globallyUsedIds.has(match.id)) {
            globallyUsedIds.add(match.id);
            return match;
        }
    }
    for (const pref of prefer) {
        const match = options.find(o => o.id === pref);
        if (match && !existingIds.has(match.id)) {
            globallyUsedIds.add(match.id);
            return match;
        }
    }
    for (const opt of options) {
        if (!existingIds.has(opt.id) && !globallyUsedIds.has(opt.id)) {
            globallyUsedIds.add(opt.id);
            return opt;
        }
    }
    for (const opt of options) {
        if (!existingIds.has(opt.id)) {
            globallyUsedIds.add(opt.id);
            return opt;
        }
    }
    if (options[0]) {
        globallyUsedIds.add(options[0].id);
        return options[0];
    }
    return null;
}

function collectActivePropertyIds(node, results = new Set()) {
    if (!node || node.visible === false) return results;
    if (node.propertyId) results.add(node.propertyId);
    if (node.id && node.type !== 'Slot') results.add(node.id);
    if (node.children) {
        for (const child of node.children) {
            collectActivePropertyIds(child, results);
        }
    }
    return results;
}

function autoFill(builder, preferences = {}, maxPasses = 20) {
    let totalFilled = 0;
    for (let pass = 0; pass < maxPasses; pass++) {
        const slots = findUnfilledSlots(builder.propertyTree);
        if (slots.length === 0) break;

        let filledThisPass = 0;
        const existingIds = collectActivePropertyIds(builder.propertyTree);

        for (const { node, path } of slots) {
            if (node.filled) continue;

            const options = getOptions(builder, node);
            if (options.length === 0) continue;

            const slotId = node.id || '';
            const slotNameCamel = (node.name || '').replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase()).replace(/\s+/g, '');
            let preferList = preferences[slotId] || preferences[node.name] || preferences[slotNameCamel] || preferences['*'] || [];
            if (!Array.isArray(preferList)) preferList = [preferList];

            const classKey = builder.characterData.meta?.class?.toLowerCase() || '';
            if (node.target && (node.target.includes('cantrip') || node.target.includes('spell') || node.target.includes('Spell'))) {
                const classSpells = {
                    barbarian: [],
                    bard: ['viciousMockery', 'prestidigitation', 'healingWord', 'cureWounds', 'invisibility', 'shatter', 'suggestion', 'disguiseSelf', 'thunderwave', 'detectMagic', 'holdPerson', 'silence', 'mirrorImage', 'compulsion'],
                    cleric: ['guidance', 'sacredFlame', 'bless', 'healingWord', 'cureWounds', 'spiritualWeapon', 'spiritGuardians', 'revivify', 'guidingBolt', 'inflictWounds', 'holdPerson', 'lesserRestoration', 'aid'],
                    druid: ['shillelagh', 'guidance', 'produceFlame', 'entangle', 'healingWord', 'spikeGrowth', 'passWithoutTrace', 'callLightning', 'thunderwave', 'fogCloud', 'barkskin', 'heatMetal'],
                    wizard: ['fireBolt', 'prestidigitation', 'mageHand', 'shield', 'mageArmor', 'magicMissile', 'mistyStep', 'fireball', 'mirrorImage', 'counterspell', 'detectMagic', 'thunderwave', 'shatter', 'web'],
                    sorcerer: ['fireBolt', 'mindSliver', 'prestidigitation', 'shield', 'magicMissile', 'scorchingRay', 'mistyStep', 'fireball', 'haste', 'web', 'shatter'],
                    warlock: ['eldritchBlast', 'prestidigitation', 'hex', 'hellishRebuke', 'mistyStep', 'shatter', 'hungerOfHadar', 'armorOfAgathys', 'holdPerson'],
                    paladin: ['bless', 'heroism', 'cureWounds', 'shieldOfFaith', 'thunderousSmite', 'wrathfulSmite'],
                    ranger: ['huntersMark', 'goodberry', 'longstrider', 'passWithoutTrace', 'fogCloud', 'cureWounds'],
                    psion: ['mindSliver', 'telekineticFling', 'mageHand', 'shield', 'mageArmor', 'mindSpike', 'dissonantWhispers', 'detectThoughts', 'levitate', 'mistyStep', 'shatter', 'holdPerson', 'invisibility', 'fly', 'haste', 'hypnoticPattern', 'telekinesis', 'dimensionDoor']
                };
                const spells = classSpells[classKey] || [];
                preferList = [...preferList, ...spells];
            }

            const chosen = pickOption(options, existingIds, preferList);
            if (!chosen) continue;

            fillSlotByPath(builder, path, chosen.id);
            existingIds.add(chosen.id);
            filledThisPass++;
            totalFilled++;
        }

        if (filledThisPass === 0) break;
    }
    return totalFilled;
}

const LEVEL = 8;

// 14 Kept Subclasses — 1 per class
const CHARACTERS = [
    {
        id: 'sample_artificer_artillerist',
        name: 'Brem Cog',
        class: 'Artificer', sub: 'Artillerist',
        species: 'Gnome', background: 'artisan',
        speciesId: 'gnome', classId: 'artificer', subcId: 'artillerist',
        str: 1, dex: 4, con: 3, int: 8, wis: 2, cha: 0,
        prefs: { artificerSubclass: ['artillerist'] }
    },
    {
        id: 'sample_barbarian_berserker',
        name: 'Riven Steel',
        class: 'Barbarian', sub: 'Path of the Berserker',
        species: 'Human', background: 'soldier',
        speciesId: 'human', classId: 'barbarian', subcId: 'berserker',
        str: 9, dex: 4, con: 6, int: 1, wis: 4, cha: 0,
        prefs: { barbarianSubclass: ['berserker'] }
    },
    {
        id: 'sample_bard_lore',
        name: 'Perrin Quill',
        class: 'Bard', sub: 'Lore',
        species: 'Human', background: 'sage',
        speciesId: 'human', classId: 'bard', subcId: 'lore',
        str: 0, dex: 3, con: 2, int: 4, wis: 3, cha: 6,
        prefs: { bardSubclass: ['lore'] }
    },
    {
        id: 'sample_cleric_life',
        name: 'Meryn Haven',
        class: 'Cleric', sub: 'Life',
        species: 'Human', background: 'acolyte',
        speciesId: 'human', classId: 'cleric', subcId: 'lifeDomain',
        str: 2, dex: 1, con: 4, int: 1, wis: 7, cha: 2,
        prefs: { clericSubclass: ['lifeDomain'] }
    },
    {
        id: 'sample_druid_land',
        name: 'Wren Hollow',
        class: 'Druid', sub: 'Land',
        species: 'Gnome', background: 'hermit',
        speciesId: 'gnome', classId: 'druid', subcId: 'circleOfTheLand',
        str: 0, dex: 3, con: 3, int: 4, wis: 8, cha: 0,
        prefs: { druidSubclass: ['circleOfTheLand'] }
    },
    {
        id: 'sample_fighter_champion',
        name: 'Bryn Vanguard',
        class: 'Fighter', sub: 'Champion',
        species: 'Human', background: 'soldier',
        speciesId: 'human', classId: 'fighter', subcId: 'champion',
        str: 8, dex: 3, con: 6, int: 1, wis: 2, cha: 0,
        prefs: { fighterSubclass: ['champion'] }
    },
    {
        id: 'sample_monk_openHand',
        name: 'Jiao Starlight',
        class: 'Monk', sub: 'the Open Hand',
        species: 'Human', background: 'hermit',
        speciesId: 'human', classId: 'monk', subcId: 'openHand',
        str: 0, dex: 8, con: 4, int: 0, wis: 6, cha: 0,
        prefs: { monkSubclass: ['openHand'] }
    },
    {
        id: 'sample_paladin_devotion',
        name: 'Sir Gareth Lightbringer',
        class: 'Paladin', sub: 'Devotion',
        species: 'Human', background: 'noble',
        speciesId: 'human', classId: 'paladin', subcId: 'oathOfDevotion',
        str: 7, dex: 0, con: 4, int: 0, wis: 2, cha: 5,
        prefs: { paladinSubclass: ['oathOfDevotion'] }
    },
    {
        id: 'sample_psion_psykinetic',
        name: 'Kael Mindweaver',
        class: 'Psion', sub: 'Psykinetic',
        species: 'Human', background: 'sage',
        speciesId: 'human', classId: 'psion', subcId: 'psykinetic',
        str: 0, dex: 3, con: 3, int: 8, wis: 4, cha: 0,
        prefs: { psionSubclass: ['psykinetic'] }
    },
    {
        id: 'sample_ranger_hunter',
        name: 'Talon Strider',
        class: 'Ranger', sub: 'Hunter',
        species: 'Elf', background: 'guide',
        speciesId: 'elf', classId: 'ranger', subcId: 'hunter',
        str: 0, dex: 8, con: 3, int: 0, wis: 5, cha: 2,
        prefs: { rangerSubclass: ['hunter'] }
    },
    {
        id: 'sample_rogue_thief',
        name: 'Jax Shadowstep',
        class: 'Rogue', sub: 'Thief',
        species: 'Halfling', background: 'criminal',
        speciesId: 'halfling', classId: 'rogue', subcId: 'thief',
        str: 0, dex: 9, con: 4, int: 2, wis: 3, cha: 0,
        prefs: { rogueSubclass: ['thief'] }
    },
    {
        id: 'sample_sorcerer_draconic',
        name: 'Ignis Scale',
        class: 'Sorcerer', sub: 'Draconic Sorcery',
        species: 'Dragonborn', background: 'noble',
        speciesId: 'dragonborn', classId: 'sorcerer', subcId: 'draconic',
        str: 0, dex: 3, con: 4, int: 0, wis: 2, cha: 9,
        prefs: { sorcererSubclass: ['draconic'] }
    },
    {
        id: 'sample_warlock_fiend',
        name: 'Malakor Brimstone',
        class: 'Warlock', sub: 'Fiend Patron',
        species: 'Tiefling', background: 'charlatan',
        speciesId: 'tiefling', classId: 'warlock', subcId: 'fiendPatron',
        str: 0, dex: 3, con: 4, int: 0, wis: 2, cha: 9,
        prefs: { warlockSubclass: ['fiendPatron'] }
    },
    {
        id: 'sample_wizard_evoker',
        name: 'Archmage Valerius',
        class: 'Wizard', sub: 'Evoker',
        species: 'Elf', background: 'sage',
        speciesId: 'elf', classId: 'wizard', subcId: 'evoker',
        str: 0, dex: 3, con: 3, int: 9, wis: 3, cha: 0,
        prefs: { wizardSubclass: ['evoker'] }
    }
];

function distributePool(allocations, totalPoints, perStatMax = 2) {
    const statNames = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    const result = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    const sorted = [...statNames].sort((a, b) => allocations[b] - allocations[a]);
    let remaining = totalPoints;
    for (const stat of sorted) {
        if (remaining <= 0) break;
        const add = Math.min(remaining, perStatMax);
        result[stat] += add;
        remaining -= add;
    }
    return result;
}

async function buildCharacter(def) {
    const builder = new CharacterBuilder(library);
    await builder.initialize();

    if (!def.prefs) def.prefs = {};

    function updateInputById(id, value) {
        const inputNodes = [];
        const findInputs = (node, path = []) => {
            if (!node || node.visible === false) return;
            if (node.children) {
                node.children.forEach((child) => {
                    const step = { id: child.id, slotIndex: child.slotIndex };
                    const currentPath = [...path, step];
                    if (child.type === 'Input' && child.id === id) {
                        inputNodes.push(currentPath);
                    }
                    findInputs(child, currentPath);
                });
            }
        };
        findInputs(builder.propertyTree);

        if (inputNodes.length > 0) {
            const recipe = builder.getRecipe();
            recipe.inputs = recipe.inputs.filter(i => i.path[i.path.length - 1].id !== id);
            recipe.inputs.push({ path: inputNodes[0], value });
            builder.applyRecipe(recipe);
        }
    }

    updateInputById('level', LEVEL);
    updateInputById('allocated_str', def.str);
    updateInputById('allocated_dex', def.dex);
    updateInputById('allocated_con', def.con);
    updateInputById('allocated_int', def.int);
    updateInputById('allocated_wis', def.wis);
    updateInputById('allocated_cha', def.cha);
    updateInputById('name', def.name);

    const originDist = distributePool(def, 3, 2);
    for (const stat of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
        if (originDist[stat] > 0) updateInputById(`origin_${stat}`, originDist[stat]);
    }

    const baseSlots = [
        { slotId: 'species', propId: def.speciesId },
        { slotId: 'background', propId: def.background },
        { slotId: 'class', propId: def.classId },
    ];

    for (const { slotId, propId } of baseSlots) {
        const slots = findUnfilledSlots(builder.propertyTree);
        const target = slots.find(s => s.node.id === slotId);
        if (target) {
            fillSlotByPath(builder, target.path, propId);
        }
    }

    const subSlotKey = `${def.classId}Subclass`;
    def.prefs[subSlotKey] = [def.subcId];
    def.prefs['subclass'] = [def.subcId];

    autoFill(builder, def.prefs);

    const actualAsiLimit = builder.characterData.attributes?.asiPoolLimit || 0;
    if (actualAsiLimit > 0) {
        const asiDist = distributePool(def, actualAsiLimit, 1);
        for (const stat of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
            if (asiDist[stat] > 0) updateInputById(`asi_${stat}`, asiDist[stat]);
        }
    }

    const imgUrl = pickPortrait(def.subcId);
    if (imgUrl) {
        const renderableNodes = collectRenderableNodes(builder.propertyTree, builder.characterData);
        const levelNode = renderableNodes.find(n => n.type === 'Input' && n.node.id === 'level');
        if (levelNode) builder.updateInput(levelNode.path, LEVEL);
        const imageNode = renderableNodes.find(n => n.type === 'Input' && n.node.id === 'image');
        if (imageNode) builder.updateInput(imageNode.path, imgUrl);
    }

    const recipe = builder.getRecipe();
    const subName = builder.characterData.meta?.sub || def.sub;
    const backgroundName = builder.characterData.meta?.background || '';

    return {
        id: def.id,
        name: def.name,
        class: def.class,
        sub: subName,
        species: def.species,
        background: backgroundName,
        level: LEVEL,
        image: imgUrl,
        recipe
    };
}

console.log(`\nGenerating ${CHARACTERS.length} sample characters at level ${LEVEL}...\n`);

const results = [];
for (const def of CHARACTERS) {
    process.stdout.write(`  Building ${def.id}...`);
    try {
        const char = await buildCharacter(def);
        results.push(char);
        console.log(` ✓  (${char.recipe.slots.length} slots filled)`);
    } catch (err) {
        console.error(` ✗  ERROR:`, err.stack || err);
        results.push({
            id: def.id,
            name: def.name,
            class: def.class,
            sub: def.sub,
            species: def.species,
            background: '',
            level: LEVEL,
            image: '',
            recipe: { inputs: [], slots: [] }
        });
    }
}

const SAMPLE_ID_PREFIX = 'sample_';
const serialized = results.map(char => {
    const recipeStr = JSON.stringify(char.recipe, null, 8)
        .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)": /g, '$1: ')
        .replace(/"/g, "'");

    return `    {
        id: '${char.id}',
        name: '${char.name.replace(/'/g, "\\'")}',
        class: '${char.class}',
        sub: '${char.sub.replace(/'/g, "\\'")}',
        species: '${char.species}',
        background: '${char.background.replace(/'/g, "\\'")}',
        level: ${char.level},
        image: '${char.image || ''}',
        recipe: ${recipeStr}
    }`;
}).join(',\n\n');

const output = `/**
 * Sample characters for debug/testing purposes.
 * One character per subclass across all 14 classes.
 * Auto-generated at level ${LEVEL} by scripts/generateSamples.mjs
 * 
 * To regenerate: node scripts/generateSamples.mjs
 */

export const SAMPLE_CHARACTERS = [
${serialized}
];

export const SAMPLE_ID_PREFIX = '${SAMPLE_ID_PREFIX}';
`;

const outPath = resolve(root, 'src/data/sampleCharacters.js');
writeFileSync(outPath, output, 'utf8');
console.log(`\n✅ Written to ${outPath}`);
console.log(`   Total characters: ${results.length}`);