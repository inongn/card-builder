import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const db = JSON.parse(readFileSync(resolve(root, 'public/db.json'), 'utf8'));

const { PropertyLibrary } = await import('../src/engine/PropertyLibrary.js');
const { CharacterBuilder } = await import('../src/engine/CharacterBuilder.js');
const { collectRenderableNodes } = await import('../src/utils/builderUtils.js');
const { encodeRecipe, decodeRecipe } = await import('../src/utils/recipeCodec.js');

const library = new PropertyLibrary();
db.forEach(prop => { if (prop.id) library.addParsedProperty(prop); });

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

function autoFill(builder, preferences = {}, maxPasses = 25) {
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

            let chosen = null;
            for (const pref of preferList) {
                const match = options.find(o => o.id === pref);
                if (match && !existingIds.has(match.id)) { chosen = match; break; }
            }
            if (!chosen) {
                for (const pref of preferList) {
                    const match = options.find(o => o.id === pref);
                    if (match) { chosen = match; break; }
                }
            }
            if (!chosen) {
                chosen = options.find(o => !existingIds.has(o.id)) || options[0];
            }
            if (!chosen) continue;

            fillSlotByPath(builder, path, chosen.id);
            existingIds.add(chosen.id);
            filledThisPass++;
        }
        if (filledThisPass === 0) break;
    }
}

async function buildCharacter(def) {
    const builder = new CharacterBuilder(library);
    await builder.initialize();

    const updateInputById = (id, value) => {
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
    };

    updateInputById('level', 8);
    updateInputById('name', def.name);
    updateInputById('allocated_str', def.str);
    updateInputById('allocated_dex', def.dex);
    updateInputById('allocated_con', def.con);
    updateInputById('allocated_int', def.int);
    updateInputById('allocated_wis', def.wis);
    updateInputById('allocated_cha', def.cha);

    for (const stat of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
        if (def.origin?.[stat]) updateInputById('origin_' + stat, def.origin[stat]);
    }

    const baseSlots = [
        { slotId: 'species', propId: def.speciesId },
        { slotId: 'background', propId: def.background },
        { slotId: 'class', propId: def.classId },
    ];
    for (const { slotId, propId } of baseSlots) {
        const slots = findUnfilledSlots(builder.propertyTree);
        const target = slots.find(s => s.node.id === slotId);
        if (target) fillSlotByPath(builder, target.path, propId);
    }

    // Subclass preference
    if (!def.prefs) def.prefs = {};
    const subSlotKey = `${def.classId}Subclass`;
    def.prefs[subSlotKey] = [def.subcId];
    def.prefs['subclass'] = [def.subcId];

    autoFill(builder, def.prefs);

    if (def.inputs) {
        for (const [k, v] of Object.entries(def.inputs)) {
            updateInputById(k, v);
        }
    }

    if (def.asi) {
        for (const [k, v] of Object.entries(def.asi)) {
            updateInputById('asi_' + k, v);
        }
    }

    if (def.image) {
        const renderableNodes = collectRenderableNodes(builder.propertyTree, builder.characterData);
        const imageNode = renderableNodes.find(n => n.type === 'Input' && n.node.id === 'image');
        if (imageNode) builder.updateInput(imageNode.path, def.image);
    }

    const recipe = builder.getRecipe();
    const data = builder.getCharacterData();

    return {
        id: def.id,
        name: def.name,
        class: data.meta.class || def.class,
        sub: data.meta.sub || def.sub,
        species: data.meta.species || 'Human',
        background: data.meta.background || def.background,
        level: 8,
        image: def.image,
        recipe,
        characterData: data
    };
}

// ─── Build Mystery Inc Characters ─────────────────────────────────────────────

const CHAR_DEFS = [
    {
        id: 'mystery_inc_fred',
        name: 'Fred Jones',
        class: 'Paladin',
        sub: 'Oath of Glory',
        speciesId: 'human',
        classId: 'paladin',
        subcId: 'oathOfGlory',
        background: 'soldier',
        str: 8, dex: 2, con: 5, int: 2, wis: 2, cha: 8,
        origin: { str: 2, cha: 1 },
        image: 'subclass_headshot/oathofglory.webp',
        prefs: {
            paladinSubclass: ['oathOfGlory'],
            fightingStyle: ['greatWeaponFighting', 'dueling'],
            feat: ['inspiringLeader', 'charger', 'alert'],
            paladinSkillProficiencies: ['athleticsProficiency', 'persuasionProficiency'],
            armamentSlot: ['greatsword', 'javelin']
        }
    },
    {
        id: 'mystery_inc_shaggy',
        name: 'Norville "Shaggy" Rogers',
        class: 'Ranger',
        sub: 'Beast Master',
        speciesId: 'human',
        classId: 'ranger',
        subcId: 'beastMaster',
        background: 'wayfarer',
        str: 2, dex: 8, con: 5, int: 2, wis: 8, cha: 2,
        origin: { dex: 2, wis: 1 },
        inputs: { beastCompanionName: 'Scooby-Doo' },
        image: 'subclass_headshot/beastmaster.webp',
        prefs: {
            rangerSubclass: ['beastMaster'],
            primalCompanion: ['beastOfTheLand'],
            fightingStyle: ['archery', 'twoWeaponFighting'],
            feat: ['alert', 'mobile', 'speedy', 'sharpshooter'],
            rangerSkillProficiencies: ['stealthProficiency', 'survivalProficiency', 'animalHandlingProficiency'],
            armamentSlot: ['shortbow', 'dagger']
        }
    },
    {
        id: 'mystery_inc_velma',
        name: 'Velma Dinkley',
        class: 'Cleric',
        sub: 'Knowledge Domain',
        speciesId: 'human',
        classId: 'cleric',
        subcId: 'knowledgeDomain',
        background: 'sage',
        str: 0, dex: 4, con: 5, int: 8, wis: 8, cha: 2,
        origin: { int: 2, wis: 1 },
        image: 'subclass_headshot/knowledgedomain.webp',
        prefs: {
            clericSubclass: ['knowledgeDomain'],
            feat: ['keenMind', 'observant', 'alert'],
            clericSkillProficiencies: ['historyProficiency', 'insightProficiency', 'religionProficiency'],
            armamentSlot: ['quarterstaff', 'lightCrossbow']
        }
    },
    {
        id: 'mystery_inc_daphne',
        name: 'Daphne Blake',
        class: 'Monk',
        sub: 'Warrior of the Open Hand',
        speciesId: 'human',
        classId: 'monk',
        subcId: 'openHand',
        background: 'noble',
        str: 2, dex: 9, con: 5, int: 1, wis: 6, cha: 4,
        origin: { dex: 2, wis: 1 },
        image: 'subclass_headshot/openhand.webp',
        prefs: {
            monkSubclass: ['openHand'],
            feat: ['athlete', 'charger', 'alert'],
            monkSkillProficiencies: ['acrobaticsProficiency', 'athleticsProficiency', 'insightProficiency'],
            armamentSlot: ['shortsword', 'dart']
        }
    }
];

export async function generateMysteryInc() {
    const gang = [];
    for (const def of CHAR_DEFS) {
        console.log(`Building ${def.name}...`);
        const char = await buildCharacter(def);
        const encoded = await encodeRecipe(char.recipe);
        const decoded = await decodeRecipe(encoded);
        const matches = JSON.stringify(char.recipe) === JSON.stringify(decoded);
        console.log(`  ✓ Built ${char.name} (${char.sub} ${char.class} ${char.level})`);
        console.log(`    Encoded Length: ${encoded.length} chars (Alphanumeric: ${/^[0-9A-Za-z]+$/.test(encoded)})`);
        console.log(`    Roundtrip verified: ${matches}`);
        gang.push({
            ...char,
            encoded
        });
    }
    return gang;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const gang = await generateMysteryInc();
    console.log('\n========================================');
    console.log('MYSTERY INC GANG ENCODED STRINGS:');
    console.log('========================================\n');
    for (const member of gang) {
        console.log(`### ${member.name} (${member.sub} ${member.class} Level ${member.level})`);
        console.log(`Code:\n${member.encoded}\n`);
    }
}
