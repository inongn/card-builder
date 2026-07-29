/**
 * Generator script: builds fully-filled level-8 sample characters
 * by running the actual CharacterBuilder engine.
 * 
 * Outputs: src/data/sampleCharacters.js
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// ─── Shim browser APIs ────────────────────────────────────────────────────────

// Shim fetch so PropertyLibrary.loadFromData() would work – but we override it below
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

// ─── Load portraits metadata ──────────────────────────────────────────────────

const portraitsMetadataPath = resolve(root, 'public/portraits/metadata.json');
const portraitsMetadata = existsSync(portraitsMetadataPath)
    ? JSON.parse(readFileSync(portraitsMetadataPath, 'utf8'))
    : [];

// Track which portrait filenames have been used per class+species combo
const usedPortraitFilenames = new Set();

/**
 * Pick a portrait path for a character by class, species, and subclass.
 * Prioritises class+subclass+species match, then class+species match. Cycles through to avoid repeats.
 */
/**
 * Pick a headshot portrait path based directly on the subclass ID.
 * Targets files inside public/subclass_headshot/
 */
function pickPortrait(subcId) {
    if (!subcId) return '';

    // Normalize subclass ID to lowercase without spaces, underscores, or special characters
    const cleanSubc = subcId.toLowerCase().replace(/[^a-z0-9]/g, '');

    const headshotDir = resolve(root, 'public', 'subclass_headshot');

    if (!existsSync(headshotDir)) return '';

    const files = readdirSync(headshotDir);

    // Find matching image file regardless of extension (.jpg, .png, .webp)
    const match = files.find(file => {
        const nameWithoutExt = file.substring(0, file.lastIndexOf('.')).toLowerCase().replace(/[^a-z0-9]/g, '');
        return nameWithoutExt === cleanSubc;
    });

    return match ? `subclass_headshot/${match}` : '';
}

// ─── Load DB ──────────────────────────────────────────────────────────────────

const db = JSON.parse(readFileSync(resolve(root, 'public/db.json'), 'utf8'));
const library = new PropertyLibrary();
db.forEach(prop => { if (prop.id) library.addParsedProperty(prop); });
console.log(`Loaded ${library.properties.size} properties`);

const globallyUsedIds = new Set();

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Find all unfilled Slot nodes in the tree, returned as {node, path[]} */
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

/** Navigate the tree by logical path, returning the node (or null) */
function navigatePath(root, path) {
    let current = root;
    for (const step of path) {
        if (!current?.children) return null;
        current = current.children.find(c => c.id === step.id && c.slotIndex === step.slotIndex);
        if (!current) return null;
    }
    return current;
}

/**
 * Fill a slot by its logical path using the applyRecipe mechanism.
 * We use builder.applyRecipe to replay + add, which is the safest approach.
 */
function fillSlotByPath(builder, logicalPath, propertyId) {
    const recipe = builder.getRecipe();
    // Add this slot to the recipe
    recipe.slots.push({ path: logicalPath, propertyId });
    builder.applyRecipe(recipe);
}

/**
 * Get all valid options for a slot (by its target tag expression)
 */
function getOptions(builder, slotNode) {
    if (!slotNode?.target) return [];
    try {
        return library.findByTags(slotNode.target);
    } catch {
        return [];
    }
}

function pickOption(options, existingIds, prefer = []) {
    // 1. Try preferred options that are NOT yet globally used
    for (const pref of prefer) {
        const match = options.find(o => o.id === pref);
        if (match && !existingIds.has(match.id) && !globallyUsedIds.has(match.id)) {
            globallyUsedIds.add(match.id);
            return match;
        }
    }
    // 2. Try preferred options that are already globally used (fallback)
    for (const pref of prefer) {
        const match = options.find(o => o.id === pref);
        if (match && !existingIds.has(match.id)) {
            globallyUsedIds.add(match.id);
            return match;
        }
    }
    // 3. Try option not used in this character AND not used globally
    for (const opt of options) {
        if (!existingIds.has(opt.id) && !globallyUsedIds.has(opt.id)) {
            globallyUsedIds.add(opt.id);
            return opt;
        }
    }
    // 4. Pick first not already used in this character
    for (const opt of options) {
        if (!existingIds.has(opt.id)) {
            globallyUsedIds.add(opt.id);
            return opt;
        }
    }
    // 5. Allow duplicates if nothing else
    if (options[0]) {
        globallyUsedIds.add(options[0].id);
        return options[0];
    }
    return null;
}

/** Collect all currently active or filled propertyIds in the entire tree */
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

/**
 * Auto-fill all available unfilled slots in the builder.
 * Repeats until no more slots can be filled (some slots only appear after others are filled).
 * 
 * @param {CharacterBuilder} builder
 * @param {Object} preferences - { slotId: propertyId } or { [slotIdPattern]: propertyId[] }
 * @param {number} maxPasses
 */
function autoFill(builder, preferences = {}, maxPasses = 20) {
    let totalFilled = 0;
    for (let pass = 0; pass < maxPasses; pass++) {
        const slots = findUnfilledSlots(builder.propertyTree);
        if (slots.length === 0) break;

        let filledThisPass = 0;
        const existingIds = collectActivePropertyIds(builder.propertyTree);

        for (const { node, path } of slots) {
            if (node.filled) continue; // may have been filled by earlier slot this pass

            const options = getOptions(builder, node);
            if (options.length === 0) continue;

            // Check if this slot id has a preference
            const slotId = node.id || '';
            let preferList = preferences[slotId] || preferences['*'] || [];
            if (!Array.isArray(preferList)) preferList = [preferList];

            // Dynamic theme/synergy additions to preferList
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
                    ranger: ['huntersMark', 'goodberry', 'longstrider', 'passWithoutTrace', 'fogCloud', 'cureWounds']
                };
                const spells = classSpells[classKey] || [];
                preferList = [...preferList, ...spells];
            } else if (node.target && (node.target.includes('proficiency') || node.target.includes('Proficiency') || node.target.includes('skill') || node.target.includes('Skill'))) {
                const classSkills = {
                    barbarian: ['athleticsProficiency', 'intimidationProficiency', 'survivalProficiency', 'perceptionProficiency'],
                    bard: ['performanceProficiency', 'persuasionProficiency', 'deceptionProficiency', 'insightProficiency', 'acrobaticsProficiency'],
                    cleric: ['insightProficiency', 'religionProficiency', 'medicineProficiency', 'historyProficiency'],
                    druid: ['natureProficiency', 'survivalProficiency', 'animalHandlingProficiency', 'insightProficiency'],
                    fighter: ['athleticsProficiency', 'acrobaticsProficiency', 'intimidationProficiency', 'perceptionProficiency'],
                    monk: ['acrobaticsProficiency', 'athleticsProficiency', 'stealthProficiency', 'insightProficiency'],
                    paladin: ['athleticsProficiency', 'persuasionProficiency', 'religionProficiency', 'insightProficiency'],
                    ranger: ['stealthProficiency', 'survivalProficiency', 'perceptionProficiency', 'natureProficiency'],
                    rogue: ['stealthProficiency', 'sleightOfHandProficiency', 'acrobaticsProficiency', 'perceptionProficiency', 'deceptionProficiency'],
                    sorcerer: ['arcanaProficiency', 'deceptionProficiency', 'persuasionProficiency', 'insightProficiency'],
                    warlock: ['deceptionProficiency', 'intimidationProficiency', 'arcanaProficiency', 'historyProficiency'],
                    wizard: ['arcanaProficiency', 'historyProficiency', 'investigationProficiency', 'religionProficiency']
                };
                const skills = classSkills[classKey] || [];
                preferList = [...preferList, ...skills];
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

// ─── Character definitions ────────────────────────────────────────────────────
// Each entry: { id, name, class, sub, species, level, inputs, prefs }
//   inputs: partial input override {path, value}[]
//   prefs: {slotId: [preferredPropertyId, ...]} - slot fill preferences

const LEVEL = 8;

const CHARACTERS = [

    // ─── BARBARIAN ────────────────────────────────────────────────────────────

    {
        id: 'sample_barbarian_ancestralGuardian',
        name: 'Grak Ironbone',
        class: 'Barbarian', sub: 'Path of the Ancestral Guardian',
        species: 'Human', background: 'soldier',
        speciesId: 'human', classId: 'barbarian', subcId: 'ancestralGuardian',
        str: 9, dex: 3, con: 6, int: 1, wis: 2, cha: 0,
        prefs: {
            barbarianSkillProficiencies: ['athleticsProficiency', 'intimidationProficiency'],
            barbarianSubclass: ['ancestralGuardian'],
        }
    },
    {
        id: 'sample_barbarian_lament',
        name: 'Elara Grieve',
        class: 'Barbarian', sub: 'Path of the Lament',
        species: 'Leonin', background: 'hermit',
        speciesId: 'leonin', classId: 'barbarian', subcId: 'lament',
        str: 8, dex: 3, con: 6, int: 1, wis: 3, cha: 0,
        prefs: {
            barbarianSkillProficiencies: ['survivalProficiency', 'insightProficiency'],
            barbarianSubclass: ['lament'],
        }
    },
    {
        id: 'sample_barbarian_berserker',
        name: 'Riven Steel',
        class: 'Barbarian', sub: 'Path of the Berserker',
        species: 'Human', background: 'soldier',
        speciesId: 'human', classId: 'barbarian', subcId: 'berserker',
        str: 9, dex: 4, con: 6, int: 1, wis: 4, cha: 0,
        prefs: {
            barbarianSkillProficiencies: ['athleticsProficiency', 'intimidationProficiency', 'animalHandlingProficiency', 'perceptionProficiency'],
            barbarianSubclass: ['berserker'],
            feat: ['crusher', 'alert'],
            asi: ['str'],
        }
    },
    {
        id: 'sample_barbarian_wildHeart',
        name: 'Vael Pathstride',
        class: 'Barbarian', sub: 'Path of the Wild Heart',
        species: 'Satyr', background: 'guide',
        speciesId: 'satyr', classId: 'barbarian', subcId: 'wildHeart',
        str: 8, dex: 5, con: 5, int: 0, wis: 3, cha: 0,
        prefs: {
            barbarianSkillProficiencies: ['animalHandlingProficiency', 'perceptionProficiency'],
            barbarianSubclass: ['wildHeart'],
        }
    },
    {
        id: 'sample_barbarian_worldTree',
        name: 'Soren Deeproot',
        class: 'Barbarian', sub: 'Path of the World Tree',
        species: 'Elf', background: 'hermit',
        speciesId: 'elf', classId: 'barbarian', subcId: 'worldTree',
        str: 8, dex: 3, con: 8, int: 0, wis: 2, cha: 0,
        prefs: {
            barbarianSkillProficiencies: ['survivalProficiency', 'natureProficiency'],
            barbarianSubclass: ['worldTree'],
        }
    },
    {
        id: 'sample_barbarian_zealot',
        name: 'Kaelin Emberbound',
        class: 'Barbarian', sub: 'Path of the Zealot',
        species: 'Dragonborn', background: 'acolyte',
        speciesId: 'dragonborn', classId: 'barbarian', subcId: 'zealot',
        str: 8, dex: 3, con: 5, int: 0, wis: 3, cha: 2,
        prefs: {
            barbarianSkillProficiencies: ['intimidationProficiency', 'athleticsProficiency'],
            barbarianSubclass: ['zealot'],
        }
    },

    // ─── BARD ─────────────────────────────────────────────────────────────────

    {
        id: 'sample_bard_moon',
        name: 'Lyra Lunaris',
        class: 'Bard', sub: 'College of the Moon',
        species: 'Elf', background: 'hermit',
        speciesId: 'elf', classId: 'bard', subcId: 'moon',
        str: 0, dex: 3, con: 3, int: 3, wis: 3, cha: 8,
        prefs: {
            skillProficiencies: ['perceptionProficiency', 'insightProficiency', 'persuasionProficiency'],
            bardSubclass: ['moon'],
        }
    },
    {
        id: 'sample_bard_spirits',
        name: 'Sable Haunt',
        class: 'Bard', sub: 'College of Spirits',
        species: 'Goliath', background: 'charlatan',
        speciesId: 'goliath', classId: 'bard', subcId: 'spirits',
        str: 0, dex: 3, con: 3, int: 3, wis: 2, cha: 8,
        prefs: {
            skillProficiencies: ['deceptionProficiency', 'insightProficiency', 'historyProficiency'],
            bardSubclass: ['spirits'],
        }
    },
    {
        id: 'sample_bard_dance',
        name: 'Morgan Cadence',
        class: 'Bard', sub: 'Dance',
        species: 'Human', background: 'entertainer',
        speciesId: 'human', classId: 'bard', subcId: 'dance',
        str: 0, dex: 5, con: 3, int: 2, wis: 2, cha: 9,
        prefs: {
            skillProficiencies: ['performanceProficiency', 'acrobaticsProficiency', 'persuasionProficiency'],
            bardSubclass: ['dance'],
        }
    },
    {
        id: 'sample_bard_glamour',
        name: 'Sylvan Whisper',
        class: 'Bard', sub: 'Glamour',
        species: 'Elf', background: 'noble',
        speciesId: 'elf', classId: 'bard', subcId: 'glamour',
        str: 0, dex: 3, con: 3, int: 3, wis: 0, cha: 9,
        prefs: {
            skillProficiencies: ['persuasionProficiency', 'deceptionProficiency', 'performanceProficiency'],
            bardSubclass: ['glamour'],
        }
    },
    {
        id: 'sample_bard_lore',
        name: 'Perrin Quill',
        class: 'Bard', sub: 'Lore',
        species: 'Human', background: 'sage',
        speciesId: 'human', classId: 'bard', subcId: 'lore',
        str: 0, dex: 3, con: 2, int: 4, wis: 3, cha: 6,
        prefs: {
            skillProficiencies: ['arcanaProficiency', 'historyProficiency', 'persuasionProficiency'],
            bardSubclass: ['lore'],
        }
    },
    {
        id: 'sample_bard_valor',
        name: 'Darin Harmon',
        class: 'Bard', sub: 'Valor',
        species: 'Dragonborn', background: 'soldier',
        speciesId: 'dragonborn', classId: 'bard', subcId: 'valor',
        str: 4, dex: 4, con: 3, int: 1, wis: 2, cha: 6,
        prefs: {
            skillProficiencies: ['performanceProficiency', 'persuasionProficiency', 'athleticsProficiency'],
            bardSubclass: ['valor'],
        }
    },

    // ─── CLERIC ───────────────────────────────────────────────────────────────

    {
        id: 'sample_cleric_grave',
        name: 'Soren Elegy',
        class: 'Cleric', sub: 'Grave',
        species: 'Elf', background: 'acolyte',
        speciesId: 'elf', classId: 'cleric', subcId: 'graveDomain',
        str: 1, dex: 3, con: 4, int: 2, wis: 7, cha: 2,
        prefs: {
            clericSkillProficiencies: ['medicineProficiency', 'religionProficiency'],
            clericSubclass: ['graveDomain'],
        }
    },
    {
        id: 'sample_cleric_knowledge',
        name: 'Aryn Codex',
        class: 'Cleric', sub: 'Knowledge',
        species: 'Orc', background: 'sage',
        speciesId: 'orc', classId: 'cleric', subcId: 'knowledgeDomain',
        str: 0, dex: 2, con: 3, int: 5, wis: 7, cha: 2,
        prefs: {
            clericSkillProficiencies: ['historyProficiency', 'arcanaProficiency'],
            clericSubclass: ['knowledgeDomain'],
        }
    },
    {
        id: 'sample_cleric_life',
        name: 'Meryn Haven',
        class: 'Cleric', sub: 'Life',
        species: 'Human', background: 'acolyte',
        speciesId: 'human', classId: 'cleric', subcId: 'lifeDomain',
        str: 2, dex: 1, con: 4, int: 1, wis: 7, cha: 2,
        prefs: {
            clericSkillProficiencies: ['medicineProficiency', 'insightProficiency'],
            clericSubclass: ['lifeDomain'],
            armamentSlot: ['mace', 'shieldEquipment', 'longsword'],
        }
    },
    {
        id: 'sample_cleric_light',
        name: 'Valen Dawn',
        class: 'Cleric', sub: 'Light',
        species: 'Elf', background: 'acolyte',
        speciesId: 'elf', classId: 'cleric', subcId: 'lightDomain',
        str: 0, dex: 3, con: 3, int: 4, wis: 5, cha: 2,
        prefs: {
            clericSkillProficiencies: ['religionProficiency', 'perceptionProficiency'],
            clericSubclass: ['lightDomain'],
        }
    },
    {
        id: 'sample_cleric_trickery',
        name: 'Nyx Veil',
        class: 'Cleric', sub: 'Trickery',
        species: 'Halfling', background: 'charlatan',
        speciesId: 'halfling', classId: 'cleric', subcId: 'trickeryDomain',
        str: 0, dex: 4, con: 3, int: 3, wis: 5, cha: 4,
        prefs: {
            clericSkillProficiencies: ['deceptionProficiency', 'insightProficiency'],
            clericSubclass: ['trickeryDomain'],
        }
    },
    {
        id: 'sample_cleric_war',
        name: 'Dael Ironheart',
        class: 'Cleric', sub: 'War',
        species: 'Tiefling', background: 'soldier',
        speciesId: 'tiefling', classId: 'cleric', subcId: 'warDomain',
        str: 4, dex: 2, con: 5, int: 1, wis: 5, cha: 2,
        prefs: {
            clericSkillProficiencies: ['religionProficiency', 'persuasionProficiency'],
            clericSubclass: ['warDomain'],
        }
    },

    // ─── DRUID ────────────────────────────────────────────────────────────────

    {
        id: 'sample_druid_preservation',
        name: 'Fern Keeper',
        class: 'Druid', sub: 'Circle of Preservation',
        species: 'Gnome', background: 'hermit',
        speciesId: 'gnome', classId: 'druid', subcId: 'circleOfPreservation',
        str: 0, dex: 3, con: 3, int: 4, wis: 8, cha: 0,
        prefs: { druidSubclass: ['circleOfPreservation'] }
    },
    {
        id: 'sample_druid_titan',
        name: 'Boulder Stonehide',
        class: 'Druid', sub: 'Circle of the Titan',
        species: 'Triton', background: 'guide',
        speciesId: 'triton', classId: 'druid', subcId: 'circleOfTheTitan',
        str: 4, dex: 2, con: 5, int: 1, wis: 8, cha: 0,
        prefs: { druidSubclass: ['circleOfTheTitan'] }
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
        id: 'sample_druid_moon',
        name: 'Arden Wilds',
        class: 'Druid', sub: 'Moon',
        species: 'Aasimar', background: 'guide',
        speciesId: 'aasimar', classId: 'druid', subcId: 'circleOfTheMoon',
        str: 2, dex: 2, con: 4, int: 1, wis: 9, cha: 0,
        prefs: { druidSubclass: ['circleOfTheMoon'], savingThrowProficiency: ['conSave'] }
    },
    {
        id: 'sample_druid_sea',
        name: 'Coral Tides',
        class: 'Druid', sub: 'Sea',
        species: 'Triton', background: 'sailor',
        speciesId: 'triton', classId: 'druid', subcId: 'circleOfTheSea',
        str: 1, dex: 3, con: 3, int: 2, wis: 9, cha: 0,
        prefs: { druidSubclass: ['circleOfTheSea'], keenObserver: ['perceptionProficiency'] }
    },
    {
        id: 'sample_druid_stars',
        name: 'Aster Starlight',
        class: 'Druid', sub: 'Stars',
        species: 'Elf', background: 'sage',
        speciesId: 'elf', classId: 'druid', subcId: 'circleOfTheStars',
        str: 0, dex: 3, con: 3, int: 5, wis: 9, cha: 0,
        prefs: { druidSubclass: ['circleOfTheStars'] }
    },

    // ─── FIGHTER ──────────────────────────────────────────────────────────────

    {
        id: 'sample_fighter_arcaneArcher',
        name: 'Lorn Bowcraft',
        class: 'Fighter', sub: 'Arcane Archer',
        species: 'Elf', background: 'sage',
        speciesId: 'elf', classId: 'fighter', subcId: 'arcaneArcher',
        str: 4, dex: 7, con: 4, int: 3, wis: 2, cha: 0,
        prefs: {
            fighterskillproficiencies: ['arcanaProficiency', 'perceptionProficiency'],
            fightingStyle: ['archery'],
            fighterSubclass: ['arcaneArcher'],
        }
    },
    {
        id: 'sample_fighter_banneret',
        name: 'Valdris Banner',
        class: 'Fighter', sub: 'Banneret',
        species: 'Human', background: 'noble',
        speciesId: 'human', classId: 'fighter', subcId: 'banneret',
        str: 7, dex: 3, con: 5, int: 2, wis: 2, cha: 1,
        prefs: {
            fighterskillproficiencies: ['persuasionProficiency', 'athleticsProficiency'],
            fightingStyle: ['defense'],
            fighterSubclass: ['banneret'],
        }
    },
    {
        id: 'sample_fighter_battleMaster',
        name: 'Kaelin Gale',
        class: 'Fighter', sub: 'Battle Master',
        species: 'Dragonborn', background: 'soldier',
        speciesId: 'dragonborn', classId: 'fighter', subcId: 'battleMaster',
        str: 6, dex: 3, con: 6, int: 3, wis: 3, cha: 0,
        prefs: {
            fighterskillproficiencies: ['athleticsProficiency', 'perceptionProficiency'],
            fightingStyle: ['greatWeaponFighting'],
            fighterSubclass: ['battleMaster'],
        }
    },
    {
        id: 'sample_fighter_champion',
        name: 'Bryn Vanguard',
        class: 'Fighter', sub: 'Champion',
        species: 'Human', background: 'soldier',
        speciesId: 'human', classId: 'fighter', subcId: 'champion',
        str: 8, dex: 3, con: 6, int: 1, wis: 2, cha: 0,
        prefs: {
            fighterskillproficiencies: ['athleticsProficiency', 'intimidationProficiency'],
            fightingStyle: ['greatWeaponFighting'],
            fighterSubclass: ['champion'],
        }
    },
    {
        id: 'sample_fighter_eldritchKnight',
        name: 'Valen Weave',
        class: 'Fighter', sub: 'Eldritch Knight',
        species: 'Human', background: 'sage',
        speciesId: 'human', classId: 'fighter', subcId: 'eldritchKnight',
        str: 5, dex: 4, con: 4, int: 5, wis: 2, cha: 0,
        prefs: {
            fighterskillproficiencies: ['arcanaProficiency', 'athleticsProficiency'],
            fightingStyle: ['defense'],
            fighterSubclass: ['eldritchKnight'],
        }
    },
    {
        id: 'sample_fighter_psiWarrior',
        name: 'Callen Mindpulse',
        class: 'Fighter', sub: 'Psi Warrior',
        species: 'Human', background: 'sage',
        speciesId: 'human', classId: 'fighter', subcId: 'psiWarrior',
        str: 5, dex: 3, con: 4, int: 6, wis: 2, cha: 0,
        prefs: {
            fighterskillproficiencies: ['arcanaProficiency', 'insightProficiency'],
            fightingStyle: ['defense'],
            fighterSubclass: ['psiWarrior'],
        }
    },

    // ─── MONK ─────────────────────────────────────────────────────────────────

    {
        id: 'sample_monk_mysticArts',
        name: 'Yuen Arcane',
        class: 'Monk', sub: 'Warrior of the Mystic Arts',
        species: 'Human', background: 'sage',
        speciesId: 'human', classId: 'monk', subcId: 'mysticArts',
        str: 3, dex: 6, con: 3, int: 5, wis: 4, cha: 0,
        prefs: {
            monkSkillProficiencies: ['arcanaProficiency', 'acrobaticsProficiency'],
            monkSubclass: ['mysticArts'],
        }
    },
    {
        id: 'sample_monk_venom',
        name: 'Cobra Strike',
        class: 'Monk', sub: 'Warrior of Venom',
        species: 'Human', background: 'criminal',
        speciesId: 'human', classId: 'monk', subcId: 'venom',
        str: 4, dex: 7, con: 3, int: 2, wis: 4, cha: 0,
        prefs: {
            monkSkillProficiencies: ['stealthProficiency', 'acrobaticsProficiency'],
            monkSubclass: ['venom'],
        }
    },
    {
        id: 'sample_monk_elements',
        name: 'Shuran Breeze',
        class: 'Monk', sub: 'the Elements',
        species: 'Orc', background: 'hermit',
        speciesId: 'orc', classId: 'monk', subcId: 'elements',
        str: 4, dex: 6, con: 4, int: 1, wis: 5, cha: 0,
        prefs: {
            monkSkillProficiencies: ['acrobaticsProficiency', 'insightProficiency'],
            monkSubclass: ['elements'],
        }
    },
    {
        id: 'sample_monk_mercy',
        name: 'Tae Meridian',
        class: 'Monk', sub: 'Mercy',
        species: 'Human', background: 'acolyte',
        speciesId: 'human', classId: 'monk', subcId: 'mercy',
        str: 3, dex: 6, con: 3, int: 3, wis: 6, cha: 0,
        prefs: {
            monkSkillProficiencies: ['insightProficiency', 'acrobaticsProficiency'],
            monkSubclass: ['mercy'],
        }
    },
    {
        id: 'sample_monk_openHand',
        name: 'Jiao Starlight',
        class: 'Monk', sub: 'the Open Hand',
        species: 'Human', background: 'hermit',
        speciesId: 'human', classId: 'monk', subcId: 'openHand',
        str: 4, dex: 6, con: 3, int: 2, wis: 5, cha: 0,
        prefs: {
            monkSkillProficiencies: ['acrobaticsProficiency', 'athleticsProficiency'],
            monkSubclass: ['openHand'],
        }
    },
    {
        id: 'sample_monk_shadows',
        name: 'Shade Umbra',
        class: 'Monk', sub: 'Shadow',
        species: 'Elf', background: 'criminal',
        speciesId: 'elf', classId: 'monk', subcId: 'shadows',
        str: 3, dex: 7, con: 3, int: 2, wis: 4, cha: 1,
        prefs: {
            monkSkillProficiencies: ['stealthProficiency', 'acrobaticsProficiency'],
            monkSubclass: ['shadows'],
        }
    },

    // ─── PALADIN ──────────────────────────────────────────────────────────────

    {
        id: 'sample_paladin_devotion',
        name: 'Lorin Aegis',
        class: 'Paladin', sub: 'Oath of Devotion',
        species: 'Human', background: 'acolyte',
        speciesId: 'human', classId: 'paladin', subcId: 'oathOfDevotion',
        str: 6, dex: 2, con: 4, int: 1, wis: 2, cha: 5,
        prefs: { paladinSubclass: ['oathOfDevotion'] }
    },
    {
        id: 'sample_paladin_glory',
        name: 'Aureli Crest',
        class: 'Paladin', sub: 'Oath of Glory',
        species: 'Tiefling', background: 'noble',
        speciesId: 'tiefling', classId: 'paladin', subcId: 'oathOfGlory',
        str: 6, dex: 3, con: 4, int: 0, wis: 2, cha: 5,
        prefs: { paladinSubclass: ['oathOfGlory'] }
    },
    {
        id: 'sample_paladin_ancients',
        name: 'Elyn Verdant',
        class: 'Paladin', sub: 'Oath of the Ancients',
        species: 'Elf', background: 'guide',
        speciesId: 'elf', classId: 'paladin', subcId: 'oathOfTheAncients',
        str: 5, dex: 3, con: 4, int: 1, wis: 4, cha: 4,
        prefs: { paladinSubclass: ['oathOfTheAncients'] }
    },
    {
        id: 'sample_paladin_vengeance',
        name: 'Sable Nemesis',
        class: 'Paladin', sub: 'Oath of Vengeance',
        species: 'Dragonborn', background: 'criminal',
        speciesId: 'dragonborn', classId: 'paladin', subcId: 'oathOfVengeance',
        str: 6, dex: 3, con: 4, int: 1, wis: 1, cha: 6,
        prefs: { paladinSubclass: ['oathOfVengeance'] }
    },
    {
        id: 'sample_paladin_nobleGenie',
        name: 'Sariel Dao',
        class: 'Paladin', sub: 'Oath of the Noble Genies',
        species: 'Dragonborn', background: 'noble',
        speciesId: 'dragonborn', classId: 'paladin', subcId: 'oathOfGenies',
        str: 5, dex: 3, con: 4, int: 0, wis: 2, cha: 6,
        prefs: { paladinSubclass: ['oathOfGenies'] }
    },
    {
        id: 'sample_paladin_oathbreaker',
        name: 'Malakor Fallen',
        class: 'Paladin', sub: 'Oathbreaker',
        species: 'Tiefling', background: 'soldier',
        speciesId: 'tiefling', classId: 'paladin', subcId: 'oathbreaker',
        str: 6, dex: 2, con: 4, int: 0, wis: 1, cha: 6,
        prefs: { paladinSubclass: ['oathbreaker'] }
    },

    // ─── RANGER ───────────────────────────────────────────────────────────────

    {
        id: 'sample_ranger_beastMaster',
        name: 'Rowan Strider',
        class: 'Ranger', sub: 'Beast Master',
        species: 'Human', background: 'guide',
        speciesId: 'human', classId: 'ranger', subcId: 'beastMaster',
        str: 3, dex: 6, con: 3, int: 2, wis: 6, cha: 0,
        prefs: { rangerSubclass: ['beastMaster'] }
    },
    {
        id: 'sample_ranger_feyWanderer',
        name: 'Lirien Horizon',
        class: 'Ranger', sub: 'Fey Wanderer',
        species: 'Elf', background: 'wayfarer',
        speciesId: 'elf', classId: 'ranger', subcId: 'feyWanderer',
        str: 3, dex: 6, con: 3, int: 2, wis: 5, cha: 1,
        prefs: { rangerSubclass: ['feyWanderer'] }
    },
    {
        id: 'sample_ranger_gloomStalker',
        name: 'Miren Obscura',
        class: 'Ranger', sub: 'Gloom Stalker',
        species: 'Dwarf', background: 'criminal',
        speciesId: 'dwarf', classId: 'ranger', subcId: 'gloomStalker',
        str: 3, dex: 7, con: 3, int: 3, wis: 5, cha: 0,
        prefs: { rangerSubclass: ['gloomStalker'], deftExplorerExpertise: ['stealthExpertise'] }
    },
    {
        id: 'sample_ranger_hunter',
        name: 'Rien Boulder',
        class: 'Ranger', sub: 'Hunter',
        species: 'Human', background: 'soldier',
        speciesId: 'human', classId: 'ranger', subcId: 'hunter',
        str: 4, dex: 6, con: 4, int: 2, wis: 4, cha: 0,
        prefs: { rangerSubclass: ['hunter'], deftExplorerExpertise: ['perceptionExpertise'] }
    },
    {
        id: 'sample_ranger_winterWalker',
        name: 'Boreal Frost',
        class: 'Ranger', sub: 'Winter Walker',
        species: 'Goliath', background: 'guide',
        speciesId: 'goliath', classId: 'ranger', subcId: 'winterWalker',
        str: 2, dex: 7, con: 3, int: 1, wis: 6, cha: 0,
        prefs: { rangerSubclass: ['winterWalker'] }
    },
    {
        id: 'sample_ranger_hollowWarden',
        name: 'Thorn Briar',
        class: 'Ranger', sub: 'Hollow Warden',
        species: 'Dragonborn', background: 'hermit',
        speciesId: 'dragonborn', classId: 'ranger', subcId: 'hollowWarden',
        str: 3, dex: 6, con: 3, int: 1, wis: 6, cha: 0,
        prefs: { rangerSubclass: ['hollowWarden'] }
    },

    // ─── ROGUE ────────────────────────────────────────────────────────────────

    {
        id: 'sample_rogue_arcaneTrickster',
        name: 'Gris Trick',
        class: 'Rogue', sub: 'Arcane Trickster',
        species: 'Orc', background: 'charlatan',
        speciesId: 'orc', classId: 'rogue', subcId: 'arcaneTrickster',
        str: 1, dex: 7, con: 3, int: 4, wis: 3, cha: 0,
        prefs: {
            rogueSkillProficiencies: ['sleightOfHandProficiency', 'stealthProficiency', 'deceptionProficiency', 'arcanaProficiency'],
            rogueSubclass: ['arcaneTrickster'],
            rogueExpertise1: ['stealthExpertise', 'arcanaProficiency'],
            rogueExpertise2: ['deceptionExpertise', 'investigationExpertise'],
        }
    },
    {
        id: 'sample_rogue_assassin',
        name: 'Vex Mirage',
        class: 'Rogue', sub: 'Assassin',
        species: 'Dragonborn', background: 'criminal',
        speciesId: 'dragonborn', classId: 'rogue', subcId: 'assassin',
        str: 1, dex: 8, con: 3, int: 4, wis: 2, cha: 1,
        prefs: {
            rogueSkillProficiencies: ['stealthProficiency', 'deceptionProficiency', 'acrobaticsProficiency', 'perceptionProficiency'],
            rogueSubclass: ['assassin'],
            rogueExpertise1: ['stealthExpertise', 'deceptionExpertise'],
            rogueExpertise2: ['perceptionExpertise', 'acrobaticsExpertise'],
        }
    },
    {
        id: 'sample_rogue_soulknife',
        name: 'Kael Psi',
        class: 'Rogue', sub: 'Soulknife',
        species: 'Aasimar', background: 'wayfarer',
        speciesId: 'aasimar', classId: 'rogue', subcId: 'soulknife',
        str: 2, dex: 7, con: 3, int: 4, wis: 3, cha: 0,
        prefs: {
            rogueSkillProficiencies: ['acrobaticsProficiency', 'stealthProficiency', 'insightProficiency', 'perceptionProficiency'],
            rogueSubclass: ['soulknife'],
            rogueExpertise1: ['perceptionExpertise', 'insightExpertise'],
            rogueExpertise2: ['acrobaticsExpertise', 'stealthExpertise'],
        }
    },
    {
        id: 'sample_rogue_thief',
        name: 'Darin Swift',
        class: 'Rogue', sub: 'Thief',
        species: 'Human', background: 'criminal',
        speciesId: 'human', classId: 'rogue', subcId: 'thief',
        str: 1, dex: 8, con: 3, int: 3, wis: 3, cha: 0,
        prefs: {
            rogueSkillProficiencies: ['stealthProficiency', 'sleightOfHandProficiency', 'acrobaticsProficiency', 'deceptionProficiency'],
            rogueSubclass: ['thief'],
            rogueExpertise1: ['stealthExpertise', 'sleightOfHandExpertise'],
            rogueExpertise2: ['deceptionExpertise', 'acrobaticsExpertise'],
        }
    },
    {
        id: 'sample_rogue_phantom',
        name: 'Vael Shroud',
        class: 'Rogue', sub: 'Phantom',
        species: 'Human', background: 'hermit',
        speciesId: 'human', classId: 'rogue', subcId: 'phantom',
        str: 1, dex: 8, con: 3, int: 3, wis: 3, cha: 2,
        prefs: {
            rogueSkillProficiencies: ['stealthProficiency', 'insightProficiency', 'perceptionProficiency', 'deceptionProficiency'],
            rogueSubclass: ['phantom'],
            rogueExpertise1: ['stealthExpertise', 'insightExpertise'],
            rogueExpertise2: ['perceptionExpertise', 'deceptionExpertise'],
        }
    },
    {
        id: 'sample_rogue_scion',
        name: 'Reth Scourge',
        class: 'Rogue', sub: 'Scion',
        species: 'Orc', background: 'criminal',
        speciesId: 'orc', classId: 'rogue', subcId: 'scion',
        str: 2, dex: 8, con: 3, int: 5, wis: 1, cha: 1,
        prefs: {
            rogueSkillProficiencies: ['stealthProficiency', 'deceptionProficiency', 'intimidationProficiency', 'investigationProficiency'],
            rogueSubclass: ['scion'],
            rogueExpertise1: ['stealthExpertise', 'deceptionExpertise'],
            rogueExpertise2: ['intimidationExpertise', 'investigationExpertise'],
            dreadAllegiance: ['myrkulPact'],
        }
    },

    // ─── SORCERER ─────────────────────────────────────────────────────────────

    {
        id: 'sample_sorcerer_aberrant',
        name: 'Qal Mind',
        class: 'Sorcerer', sub: 'Aberrant',
        species: 'Dragonborn', background: 'sage',
        speciesId: 'dragonborn', classId: 'sorcerer', subcId: 'aberrant',
        str: 1, dex: 3, con: 3, int: 4, wis: 2, cha: 6,
        prefs: { sorcererSubclass: ['aberrant'] }
    },
    {
        id: 'sample_sorcerer_clockwork',
        name: 'Keth Meridian',
        class: 'Sorcerer', sub: 'Clockwork',
        species: 'Dwarf', background: 'artisan',
        speciesId: 'dwarf', classId: 'sorcerer', subcId: 'clockwork',
        str: 1, dex: 3, con: 3, int: 4, wis: 2, cha: 6,
        prefs: { sorcererSubclass: ['clockwork'] }
    },
    {
        id: 'sample_sorcerer_draconic',
        name: 'Sylis Flame',
        class: 'Sorcerer', sub: 'Draconic',
        species: 'Human', background: 'noble',
        speciesId: 'human', classId: 'sorcerer', subcId: 'draconic',
        str: 1, dex: 3, con: 3, int: 3, wis: 2, cha: 7,
        prefs: { sorcererSubclass: ['draconic'] }
    },
    {
        id: 'sample_sorcerer_wildMagic',
        name: 'Blythe Flux',
        class: 'Sorcerer', sub: 'Wild Magic',
        species: 'Human', background: 'charlatan',
        speciesId: 'human', classId: 'sorcerer', subcId: 'wildMagic',
        str: 1, dex: 4, con: 3, int: 3, wis: 2, cha: 7,
        prefs: { sorcererSubclass: ['wildMagic'] }
    },
    {
        id: 'sample_sorcerer_shadow',
        name: 'Vesper Shadow',
        class: 'Sorcerer', sub: 'Shadow Sorcery',
        species: 'Human', background: 'criminal',
        speciesId: 'human', classId: 'sorcerer', subcId: 'shadow',
        str: 1, dex: 4, con: 3, int: 2, wis: 2, cha: 7,
        prefs: { sorcererSubclass: ['shadow'] }
    },
    {
        id: 'sample_sorcerer_demonic',
        name: 'Azazel Rift',
        class: 'Sorcerer', sub: 'Demonic Sorcery',
        species: 'Tiefling', background: 'hermit',
        speciesId: 'tiefling', classId: 'sorcerer', subcId: 'demonic',
        str: 1, dex: 3, con: 4, int: 2, wis: 2, cha: 7,
        prefs: { sorcererSubclass: ['demonic'] }
    },

    // ─── WARLOCK ──────────────────────────────────────────────────────────────

    {
        id: 'sample_warlock_archfey',
        name: 'Mire Fey',
        class: 'Warlock', sub: 'Archfey',
        species: 'Elf', background: 'wayfarer',
        speciesId: 'elf', classId: 'warlock', subcId: 'archfeyPatron',
        str: 1, dex: 4, con: 3, int: 3, wis: 2, cha: 7,
        prefs: { warlockSubclass: ['archfeyPatron'] }
    },
    {
        id: 'sample_warlock_celestial',
        name: 'Luce Sol',
        class: 'Warlock', sub: 'Celestial',
        species: 'Dwarf', background: 'acolyte',
        speciesId: 'dwarf', classId: 'warlock', subcId: 'celestialPatron',
        str: 1, dex: 3, con: 3, int: 3, wis: 3, cha: 8,
        prefs: { warlockSubclass: ['celestialPatron'], savingThrowProficiency: ['wisSave'] }
    },
    {
        id: 'sample_warlock_fiend',
        name: 'Bael Cinder',
        class: 'Warlock', sub: 'Fiend',
        species: 'Tiefling', background: 'criminal',
        speciesId: 'tiefling', classId: 'warlock', subcId: 'fiendPatron',
        str: 6, dex: 5, con: 3, int: 3, wis: 2, cha: 7,
        prefs: {
            warlockSubclass: ['fiendPatron'],
            pactOfTheBladeSlot: ['battleaxe'],
            armamentSlot: ['club']
        }
    },
    {
        id: 'sample_warlock_greatOldOne',
        name: 'Zell Void',
        class: 'Warlock', sub: 'Great Old One',
        species: 'Human', background: 'hermit',
        speciesId: 'human', classId: 'warlock', subcId: 'greatOldOnePatron',
        str: 1, dex: 3, con: 3, int: 4, wis: 2, cha: 8,
        prefs: { warlockSubclass: ['greatOldOnePatron'], keenObserver: ['perceptionProficiency'] }
    },
    {
        id: 'sample_warlock_undead',
        name: 'Morbius Dread',
        class: 'Warlock', sub: 'The Undead',
        species: 'Human', background: 'sage',
        speciesId: 'human', classId: 'warlock', subcId: 'undeadPatron',
        str: 1, dex: 3, con: 4, int: 2, wis: 2, cha: 7,
        prefs: { warlockSubclass: ['undeadPatron'] }
    },
    {
        id: 'sample_warlock_vestige',
        name: 'Elysia Relic',
        class: 'Warlock', sub: 'Vestige',
        species: 'Aasimar', background: 'acolyte',
        speciesId: 'aasimar', classId: 'warlock', subcId: 'vestigePatron',
        str: 1, dex: 3, con: 4, int: 2, wis: 2, cha: 7,
        prefs: { warlockSubclass: ['vestigePatron'] }
    },

    // ─── WIZARD ───────────────────────────────────────────────────────────────

    {
        id: 'sample_wizard_abjurer',
        name: 'Alyn Ward',
        class: 'Wizard', sub: 'Abjurer',
        species: 'Dwarf', background: 'sage',
        speciesId: 'dwarf', classId: 'wizard', subcId: 'abjurer',
        str: 1, dex: 2, con: 5, int: 9, wis: 2, cha: 0,
        prefs: { wizardSubclass: ['abjurer'] }
    },
    {
        id: 'sample_wizard_diviner',
        name: 'Oren Sight',
        class: 'Wizard', sub: 'Diviner',
        species: 'Tiefling', background: 'sage',
        speciesId: 'tiefling', classId: 'wizard', subcId: 'diviner',
        str: 1, dex: 2, con: 3, int: 8, wis: 4, cha: 0,
        prefs: { wizardSubclass: ['diviner'], keenObserver: ['investigationProficiency'] }
    },
    {
        id: 'sample_wizard_evoker',
        name: 'Blair Spark',
        class: 'Wizard', sub: 'Evoker',
        species: 'Elf', background: 'sage',
        speciesId: 'elf', classId: 'wizard', subcId: 'evoker',
        str: 1, dex: 3, con: 4, int: 8, wis: 2, cha: 0,
        prefs: { wizardSubclass: ['evoker'] }
    },
    {
        id: 'sample_wizard_illusionist',
        name: 'Fhan Shimmer',
        class: 'Wizard', sub: 'Illusionist',
        species: 'Gnome', background: 'charlatan',
        speciesId: 'gnome', classId: 'wizard', subcId: 'illusionist',
        str: 1, dex: 3, con: 3, int: 8, wis: 2, cha: 1,
        prefs: { wizardSubclass: ['illusionist'] }
    },
    {
        id: 'sample_wizard_bladesinger',
        name: 'Eldrin Blade',
        class: 'Wizard', sub: 'Bladesinging',
        species: 'Elf', background: 'noble',
        speciesId: 'elf', classId: 'wizard', subcId: 'bladesinger',
        str: 1, dex: 5, con: 3, int: 8, wis: 2, cha: 0,
        prefs: { wizardSubclass: ['bladesinger'] }
    },
    {
        id: 'sample_wizard_necromancer',
        name: 'Mortis Grave',
        class: 'Wizard', sub: 'Necromancer',
        species: 'Human', background: 'sage',
        speciesId: 'human', classId: 'wizard', subcId: 'necromancer',
        str: 1, dex: 3, con: 4, int: 8, wis: 2, cha: 0,
        prefs: { wizardSubclass: ['necromancer'] }
    },

    // ─── ARTIFICER ─────────────────────────────────────────────────────────────

    {
        id: 'sample_artificer_alchemist',
        name: 'Vyla Brewer',
        class: 'Artificer', sub: 'Alchemist',
        species: 'Gnome', background: 'artisan',
        speciesId: 'gnome', classId: 'artificer', subcId: 'alchemist',
        str: 0, dex: 3, con: 3, int: 8, wis: 4, cha: 0,
        prefs: { artificerSubclass: ['alchemist'] }
    },
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
        id: 'sample_artificer_cartographer',
        name: 'Navi Tracker',
        class: 'Artificer', sub: 'Cartographer',
        species: 'Human', background: 'guide',
        speciesId: 'human', classId: 'artificer', subcId: 'cartographer',
        str: 1, dex: 3, con: 3, int: 8, wis: 3, cha: 0,
        prefs: { artificerSubclass: ['cartographer'], keenObserver: ['investigationProficiency'] }
    },
    {
        id: 'sample_artificer_armorer',
        name: 'Kael Bulwark',
        class: 'Artificer', sub: 'Armorer',
        species: 'Dwarf', background: 'soldier',
        speciesId: 'dwarf', classId: 'artificer', subcId: 'armorer',
        str: 1, dex: 3, con: 3, int: 8, wis: 2, cha: 0,
        prefs: {
            artificerSubclass: ['armorer'],
            armorModel: ['dreadnaughtModel']
        }
    },
    {
        id: 'sample_artificer_reanimator',
        name: 'Frankie Stitch',
        class: 'Artificer', sub: 'Reanimator',
        species: 'Human', background: 'hermit',
        speciesId: 'human', classId: 'artificer', subcId: 'reanimator',
        str: 1, dex: 3, con: 3, int: 8, wis: 3, cha: 0,
        prefs: {
            artificerSubclass: ['reanimator'],
            strangeModifications: ['ferocity'],
            savingThrowProficiency: ['conSave'],
        }
    },
    {
        id: 'sample_artificer_battleSmith',
        name: 'Vorn Ironclad',
        class: 'Artificer', sub: 'Battle Smith',
        species: 'Human', background: 'soldier',
        speciesId: 'human', classId: 'artificer', subcId: 'battleSmith',
        str: 3, dex: 3, con: 5, int: 8, wis: 2, cha: 0,
        prefs: { artificerSubclass: ['battleSmith'] }
    }
];


// ─── Build each character ─────────────────────────────────────────────────────

const SAMPLE_ID_PREFIX = 'sample_';

/**
 * Distribute `totalPoints` across stats, prioritising those with the highest
 * allocated values. Respects a per-stat cap of `perStatMax`.
 * Returns an object { str, dex, con, int, wis, cha } with the distributed values.
 */
function distributePool(allocations, totalPoints, perStatMax = 2) {
    const statNames = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    const result = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    // Sort stats by allocated value descending to prioritise primary stats
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

    // Dynamically inject class/subclass specific feats!
    if (!def.prefs) def.prefs = {};

    // Choose appropriate Level 4 Feat mapping to represent all 42 general feats
    const feat4Map = {
        // Barbarian (4)
        'sample_barbarian_berserker': 'crusher',
        'sample_barbarian_wildHeart': 'durable',
        'sample_barbarian_worldTree': 'charger',
        'sample_barbarian_zealot': 'greatWeaponMaster',

        // Bard (5)
        'sample_bard_dance': 'martialWeaponTraining',
        'sample_bard_glamour': 'actor',
        'sample_bard_lore': 'skillExpert',
        'sample_bard_moon': 'feyTouched',
        'sample_bard_valor': 'heavilyArmored',

        // Cleric (5)
        'sample_cleric_knowledge': 'observant',
        'sample_cleric_life': 'heavyArmorMaster',
        'sample_cleric_light': 'spellSniper',
        'sample_cleric_trickery': 'feyTouched',
        'sample_cleric_war': 'alert',

        // Druid (4)
        'sample_druid_land': 'chef',
        'sample_druid_moon': 'resilient',
        'sample_druid_sea': 'telekinetic',
        'sample_druid_stars': 'keenMind',

        // Fighter (5)
        'sample_fighter_banneret': 'shieldMaster',
        'sample_fighter_battleMaster': 'polearmMaster',
        'sample_fighter_champion': 'slasher',
        'sample_fighter_eldritchKnight': 'warCaster',
        'sample_fighter_psiWarrior': 'telepathic',

        // Monk (4)
        'sample_monk_elements': 'speedy',
        'sample_monk_mercy': 'grappler',
        'sample_monk_openHand': 'athlete',
        'sample_monk_shadows': 'weaponMaster',

        // Paladin (5)
        'sample_paladin_devotion': 'sentinel',
        'sample_paladin_glory': 'inspiringLeader',
        'sample_paladin_ancients': 'mountedCombatant',
        'sample_paladin_nobleGenies': 'ritualCaster',
        'sample_paladin_vengeance': 'mageSlayer',

        // Ranger (5)
        'sample_ranger_beastMaster': 'sharpshooter',
        'sample_ranger_feyWanderer': 'feyTouched',
        'sample_ranger_gloomStalker': 'skulker',
        'sample_ranger_hunter': 'crossbowExpert',
        'sample_ranger_winterWalker': 'mediumArmorMaster',

        // Rogue (5)
        'sample_rogue_arcaneTrickster': 'ritualCaster',
        'sample_rogue_assassin': 'dualWielder',
        'sample_rogue_scionOfTheThree': 'keenMind',
        'sample_rogue_soulknife': 'piercer',
        'sample_rogue_thief': 'poisoner',

        // Sorcerer (5)
        'sample_sorcerer_aberrant': 'telepathic',
        'sample_sorcerer_clockwork': 'telekinetic',
        'sample_sorcerer_draconic': 'elementalAdept',
        'sample_sorcerer_spellfire': 'spellSniper',
        'sample_sorcerer_wildMagic': 'lightlyArmored',

        // Warlock (4)
        'sample_warlock_archfey': 'feyTouched',
        'sample_warlock_celestial': 'inspiringLeader',
        'sample_warlock_fiend': 'shadowTouched',
        'sample_warlock_greatOldOne': 'moderatelyArmored',

        // Wizard (5)
        'sample_wizard_abjurer': 'warCaster',
        'sample_wizard_bladesinger': 'defensiveDuelist',
        'sample_wizard_diviner': 'keenMind',
        'sample_wizard_evoker': 'spellSniper',
        'sample_wizard_illusionist': 'actor',

        // Artificer (4)
        'sample_artificer_alchemist': 'keenMind',
        'sample_artificer_artillerist': 'spellSniper',
        'sample_artificer_cartographer': 'telekinetic',
        'sample_artificer_armorer': 'heavyArmorMaster',
        'sample_artificer_reanimator': 'resilient'
    };

    // Feat 8 Map
    const feat8Map = {
        // Barbarian (4)
        'sample_barbarian_berserker': 'charger',
        'sample_barbarian_wildHeart': 'charger',
        'sample_barbarian_worldTree': 'speedy',
        'sample_barbarian_zealot': 'sentinel',

        // Bard (5)
        'sample_bard_dance': 'speedy',
        'sample_bard_glamour': 'inspiringLeader',
        'sample_bard_lore': 'alert',
        'sample_bard_moon': 'telekinetic',
        'sample_bard_valor': 'warCaster',

        // Cleric (5)
        'sample_cleric_knowledge': 'keenMind',
        'sample_cleric_life': 'warCaster',
        'sample_cleric_light': 'feyTouched',
        'sample_cleric_trickery': 'shadowTouched',
        'sample_cleric_war': 'sentinel',

        // Druid (4)
        'sample_druid_land': 'telekinetic',
        'sample_druid_moon': 'durable',
        'sample_druid_sea': 'observant',
        'sample_druid_stars': 'spellSniper',

        // Fighter (5)
        'sample_fighter_banneret': 'inspiringLeader',
        'sample_fighter_battleMaster': 'sentinel',
        'sample_fighter_champion': 'greatWeaponMaster',
        'sample_fighter_eldritchKnight': 'elementalAdept',
        'sample_fighter_psiWarrior': 'keenMind',

        // Monk (4)
        'sample_monk_elements': 'elementalAdept',
        'sample_monk_mercy': 'athlete',
        'sample_monk_openHand': 'charger',
        'sample_monk_shadows': 'skulker',

        // Paladin (5)
        'sample_paladin_devotion': 'shieldMaster',
        'sample_paladin_glory': 'charger',
        'sample_paladin_ancients': 'polearmMaster',
        'sample_paladin_nobleGenies': 'feyTouched',
        'sample_paladin_vengeance': 'greatWeaponMaster',

        // Ranger (5)
        'sample_ranger_beastMaster': 'alert',
        'sample_ranger_feyWanderer': 'skillExpert',
        'sample_ranger_gloomStalker': 'sharpshooter',
        'sample_ranger_hunter': 'sharpshooter',
        'sample_ranger_winterWalker': 'slasher',

        // Rogue (5)
        'sample_rogue_arcaneTrickster': 'warCaster',
        'sample_rogue_assassin': 'piercer',
        'sample_rogue_scionOfTheThree': 'observant',
        'sample_rogue_soulknife': 'speedy',
        'sample_rogue_thief': 'defensiveDuelist',

        // Sorcerer (5)
        'sample_sorcerer_aberrant': 'feyTouched',
        'sample_sorcerer_clockwork': 'warCaster',
        'sample_sorcerer_draconic': 'spellSniper',
        'sample_sorcerer_spellfire': 'feyTouched',
        'sample_sorcerer_wildMagic': 'alert',

        // Warlock (4)
        'sample_warlock_archfey': 'spellSniper',
        'sample_warlock_celestial': 'resilient',
        'sample_warlock_fiend': 'elementalAdept',
        'sample_warlock_greatOldOne': 'observant',

        // Wizard (5)
        'sample_wizard_abjurer': 'alert',
        'sample_wizard_bladesinger': 'warCaster',
        'sample_wizard_diviner': 'observant',
        'sample_wizard_evoker': 'elementalAdept',
        'sample_wizard_illusionist': 'shadowTouched',

        // Artificer (4)
        'sample_artificer_alchemist': 'alert',
        'sample_artificer_artillerist': 'elementalAdept',
        'sample_artificer_cartographer': 'observant',
        'sample_artificer_armorer': 'sentinel',
        'sample_artificer_reanimator': 'warCaster'
    };

    let feat4 = feat4Map[def.id] || 'abilityScoreImprovement';
    let feat8 = feat8Map[def.id] || 'abilityScoreImprovement';

    // Assign preferences dynamically (casing guard for Bard's Feat slots)
    def.prefs.level4feat = [feat4];
    def.prefs.level4Feat = [feat4];
    def.prefs.level8feat = [feat8];
    def.prefs.level8Feat = [feat8];

    // Weapon / Armor / Shield Preferences by Class/Subclass
    let armorPref = ['unarmored'];
    let weaponPref = ['club', 'dagger'];

    const classId = def.classId;
    const subcId = def.subcId;

    if (classId === 'barbarian') {
        armorPref = ['unarmored', 'hideArmor'];
        if (subcId === 'berserker') {
            weaponPref = ['maul', 'greatclub', 'handaxe'];
        } else if (subcId === 'wildHeart') {
            weaponPref = ['greataxe', 'javelin', 'handaxe'];
        } else if (subcId === 'worldTree') {
            weaponPref = ['halberd', 'pike', 'javelin'];
        } else {
            weaponPref = ['greatsword', 'greataxe', 'javelin'];
        }
    } else if (classId === 'bard') {
        if (subcId === 'dance') {
            armorPref = ['studdedLeatherArmor', 'leatherArmor'];
            weaponPref = ['rapier', 'shortsword', 'dagger'];
        } else if (subcId === 'valor') {
            armorPref = ['breastplate', 'scaleMail', 'studdedLeatherArmor'];
            weaponPref = ['longsword', 'shieldEquipment', 'rapier'];
        } else {
            armorPref = ['leatherArmor', 'paddedArmor'];
            weaponPref = ['dagger', 'lightCrossbow', 'quarterstaff'];
        }
    } else if (classId === 'cleric') {
        if (subcId === 'lifeDomain' || subcId === 'warDomain') {
            armorPref = ['plateArmor', 'chainMail', 'splintArmor'];
            weaponPref = [subcId === 'warDomain' ? 'warhammer' : 'mace', 'shieldEquipment'];
        } else {
            armorPref = ['breastplate', 'scaleMail', 'studdedLeatherArmor'];
            weaponPref = ['mace', 'shieldEquipment', 'lightCrossbow'];
        }
    } else if (classId === 'druid') {
        armorPref = ['hideArmor', 'leatherArmor'];
        if (subcId === 'circleOfTheSea') {
            weaponPref = ['trident', 'shieldEquipment', 'quarterstaff'];
        } else if (subcId === 'circleOfTheMoon') {
            weaponPref = ['scimitar', 'shieldEquipment', 'quarterstaff'];
        } else {
            weaponPref = ['quarterstaff', 'dagger', 'sickle'];
        }
    } else if (classId === 'fighter') {
        armorPref = ['plateArmor', 'chainMail', 'splintArmor'];
        if (subcId === 'battleMaster') {
            weaponPref = ['halberd', 'glaive', 'greatsword'];
        } else if (subcId === 'champion') {
            weaponPref = ['greatsword', 'greataxe', 'maul'];
        } else if (subcId === 'banneret' || subcId === 'eldritchKnight') {
            weaponPref = ['longsword', 'shieldEquipment', 'javelin'];
        } else {
            weaponPref = ['greatsword', 'rapier', 'javelin'];
        }
    } else if (classId === 'monk') {
        armorPref = ['unarmored'];
        if (subcId === 'shadows') {
            weaponPref = ['shortsword', 'dagger'];
        } else {
            weaponPref = ['club', 'quarterstaff'];
        }
    } else if (classId === 'paladin') {
        armorPref = ['plateArmor', 'chainMail', 'splintArmor'];
        if (subcId === 'ancients') {
            weaponPref = ['halberd', 'glaive', 'shieldEquipment'];
        } else if (subcId === 'vengeance') {
            weaponPref = ['greatsword', 'greataxe', 'javelin'];
        } else {
            weaponPref = ['longsword', 'shieldEquipment', 'javelin'];
        }
    } else if (classId === 'ranger') {
        armorPref = ['breastplate', 'scaleMail', 'studdedLeatherArmor'];
        if (subcId === 'beastMaster' || subcId === 'gloomStalker') {
            weaponPref = ['longbow', 'shortsword', 'dagger'];
        } else if (subcId === 'hunter') {
            weaponPref = ['handCrossbow', 'shortsword', 'dagger'];
        } else {
            weaponPref = ['rapier', 'shieldEquipment', 'scimitar'];
        }
    } else if (classId === 'rogue') {
        armorPref = ['studdedLeatherArmor', 'leatherArmor'];
        if (subcId === 'assassin') {
            weaponPref = ['rapier', 'shortsword', 'dagger'];
        } else if (subcId === 'soulknife') {
            weaponPref = ['dagger', 'shortsword'];
        } else {
            weaponPref = ['rapier', 'shortbow', 'dagger'];
        }
    } else if (classId === 'sorcerer' || classId === 'wizard' || classId === 'warlock') {
        armorPref = ['unarmored'];
        if (classId === 'wizard' && subcId === 'bladesinger') {
            weaponPref = ['rapier', 'shortsword', 'dagger'];
        } else {
            weaponPref = ['dagger', 'quarterstaff', 'lightCrossbow'];
        }
    } else if (classId === 'artificer') {
        if (subcId === 'armorer') {
            armorPref = ['plateArmor', 'chainMail'];
            weaponPref = ['shieldEquipment', 'quarterstaff', 'dagger'];
        } else if (subcId === 'artillerist') {
            armorPref = ['breastplate', 'scaleMail', 'studdedLeatherArmor'];
            weaponPref = ['pistol', 'musket', 'lightCrossbow', 'dagger'];
        } else {
            armorPref = ['breastplate', 'scaleMail', 'studdedLeatherArmor'];
            weaponPref = ['lightCrossbow', 'quarterstaff', 'dagger'];
        }
    }

    def.prefs.armor = armorPref;
    def.prefs.armamentSlot = weaponPref;

    // Metamagic options for Sorcerers
    if (classId === 'sorcerer') {
        if (subcId === 'aberrant') {
            def.prefs.metamagic = ['heightenedSpell', 'subtleSpell'];
        } else if (subcId === 'clockwork') {
            def.prefs.metamagic = ['carefulSpell', 'extendedSpell'];
        } else if (subcId === 'draconic') {
            def.prefs.metamagic = ['empoweredSpell', 'transmutedSpell'];
        } else if (subcId === 'spellfire') {
            def.prefs.metamagic = ['distantSpell', 'twinnedSpell'];
        } else if (subcId === 'wildMagic') {
            def.prefs.metamagic = ['quickenedSpell', 'seekingSpell'];
        }
    }

    // Eldritch Invocations for Warlocks
    if (classId === 'warlock') {
        if (subcId === 'archfeyPatron') {
            def.prefs.eldritchInvocations = ['pactOfTheChainFolder', 'investmentOfTheChainMaster', 'armorOfShadows', 'agonizingBlast', 'repellingBlast', 'ascendantStep'];
        } else if (subcId === 'celestialPatron') {
            def.prefs.eldritchInvocations = ['pactOfTheTomeFolder', 'fiendishVigor', 'maskOfManyFaces', 'mistyVisions', 'gazeOfTwoMinds', 'giftOfTheDepths'];
        } else if (subcId === 'fiendPatron') {
            def.prefs.eldritchInvocations = ['pactOfTheBladeFolder', 'thirstingBlade', 'eldritchSmite', 'devilSight', 'whispersOfTheGrave', 'eldritchMind'];
        } else if (subcId === 'greatOldOnePatron') {
            def.prefs.eldritchInvocations = ['eldritchSpear', 'lessonsOfTheFirstOnes', 'oneWithShadows', 'otherworldlyLeap', 'masterOfMyriadForms', 'agonizingBlast'];
        }
    }

    // Divine Order for Clerics
    if (classId === 'cleric') {
        if (subcId === 'lifeDomain' || subcId === 'warDomain') {
            def.prefs.divineOrder = ['protector'];
        } else {
            def.prefs.divineOrder = ['thaumaturge'];
        }
    }
    // Ensure total ability score points exactly equal 21 and no stat exceeds 12
    const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    let currentSum = stats.reduce((sum, s) => sum + def[s], 0);

    // 1. Enforce the hard cap of 12 per stat before modifying totals
    for (const s of stats) {
        if (def[s] > 12) {
            currentSum -= (def[s] - 12);
            def[s] = 12;
        }
    }

    // 2. Add points if under 21, prioritizing the highest stat that is under 12
    while (currentSum < 21) {
        let maxKey = null;
        for (const s of stats) {
            if (def[s] < 12) {
                if (!maxKey || def[s] > def[maxKey]) {
                    maxKey = s;
                }
            }
        }
        // If all available stats are capped at 12, break to prevent infinite loop
        if (!maxKey) break;

        def[maxKey]++;
        currentSum++;
    }

    // 3. Remove points if over 21, targeting the lowest non-zero stat
    while (currentSum > 21) {
        let minKey = null;
        for (const s of stats) {
            if (def[s] > 0) {
                if (!minKey || def[s] < def[minKey]) {
                    minKey = s;
                }
            }
        }
        // If all stats are 0, break to prevent infinite loop
        if (!minKey) break;

        def[minKey]--;
        currentSum--;
    }
    // Dynamically find inputs by their id instead of hardcoding tree indices
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

        // Use applyRecipe's robust logical path updating by pushing to inputs
        if (inputNodes.length > 0) {
            const recipe = builder.getRecipe();

            // Remove existing input if any
            recipe.inputs = recipe.inputs.filter(i => i.path[i.path.length - 1].id !== id);

            recipe.inputs.push({ path: inputNodes[0], value });
            builder.applyRecipe(recipe);
        }
    };

    updateInputById('level', LEVEL);
    updateInputById('allocated_str', def.str);
    updateInputById('allocated_dex', def.dex);
    updateInputById('allocated_con', def.con);
    updateInputById('allocated_int', def.int);
    updateInputById('allocated_wis', def.wis);
    updateInputById('allocated_cha', def.cha);
    updateInputById('name', def.name);

    // Distribute origin pool (3 pts from background) to primary stats (max 2/stat)
    const originDist = distributePool(def, 3, 2);
    for (const stat of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
        if (originDist[stat] > 0) updateInputById(`origin_${stat}`, originDist[stat]);
    }

    // Fill species / background / class in top-level slots (use applyRecipe)
    // Fill base slots (species, background, class)
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

    // Ensure def.prefs includes the target subclass ID under common slot ID variations
    if (!def.prefs) def.prefs = {};
    const subSlotKey = `${def.classId}Subclass`;
    def.prefs[subSlotKey] = [def.subcId];
    def.prefs['subclass'] = [def.subcId]; // Fallback key

    // Auto-fill will now naturally pick it up once the class node exposes the subclass slot!
    autoFill(builder, def.prefs);

    // Distribute ASI pool AFTER autoFill so we know the actual pool limit granted by feats.
    // Cap at 1 per stat so each feat's +1 goes to a different stat (avoids score cap violations).
    const actualAsiLimit = builder.characterData.attributes?.asiPoolLimit || 0;
    if (actualAsiLimit > 0) {
        const asiDist = distributePool(def, actualAsiLimit, 1);
        for (const stat of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
            if (asiDist[stat] > 0) updateInputById(`asi_${stat}`, asiDist[stat]);
        }
    }
    // Set character image to a matching portrait from public/portraits/
    // Set character image directly from public/subclass_headshot/
    const imgUrl = pickPortrait(def.subcId);
    if (imgUrl) {
        const renderableNodes = collectRenderableNodes(builder.propertyTree, builder.characterData);
        const levelNode = renderableNodes.find(n => n.type === 'Input' && n.node.id === 'level');
        if (levelNode) {
            builder.updateInput(levelNode.path, LEVEL);
        }
        const imageNode = renderableNodes.find(n => n.type === 'Input' && n.node.id === 'image');
        if (imageNode) {
            builder.updateInput(imageNode.path, imgUrl);
        }
    }    // Get final recipe
    const recipe = builder.getRecipe();

    // Get subclass display name
    const subName = builder.characterData.meta?.sub || def.sub;

    return {
        id: def.id,
        name: def.name,
        class: def.class,
        sub: subName,
        species: def.species,
        level: LEVEL,
        image: imgUrl,
        recipe
    };
}

// ─── Generate and write ───────────────────────────────────────────────────────

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
        // Fall back to minimal version
        results.push({
            id: def.id,
            name: def.name,
            class: def.class,
            sub: def.sub,
            species: def.species,
            level: LEVEL,
            image: '',
            recipe: { inputs: [], slots: [] }
        });
    }
}

// Serialize
const serialized = results.map(char => {
    const recipeStr = JSON.stringify(char.recipe, null, 8)
        .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)": /g, '$1: ')   // unquote keys
        .replace(/"/g, "'");                                   // single quotes

    return `    {
        id: '${char.id}',
        name: '${char.name.replace(/'/g, "\\'")}',
        class: '${char.class}',
        sub: '${char.sub.replace(/'/g, "\\'")}',
        species: '${char.species}',
        level: ${char.level},
        image: '${char.image || ''}',
        recipe: ${recipeStr}
    }`;
}).join(',\n\n');

const output = `/**
 * Sample characters for debug/testing purposes.
 * One character per subclass across all 12 classes.
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
console.log(`   Total slots filled: ${results.reduce((s, c) => s + c.recipe.slots.length, 0)}`);