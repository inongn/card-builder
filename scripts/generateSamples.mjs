/**
 * Generator script: builds fully-filled level-8 sample characters
 * by running the actual CharacterBuilder engine.
 * 
 * Outputs: src/data/sampleCharacters.js
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
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
        if (child.visible === false) continue;
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
        id: 'sample_barbarian_berserker',
        name: 'Grunk Ironjaw',
        class: 'Barbarian', sub: 'Path of the Berserker',
        species: 'Orc', background: 'soldier',
        speciesId: 'orc', classId: 'barbarian', subcId: 'berserker',
        str: 8, dex: 3, con: 5, int: 0, wis: 3, cha: 0,
        prefs: {
            barbarianSkillProficiencies: ['athleticsProficiency', 'intimidationProficiency', 'animalHandlingProficiency', 'perceptionProficiency'],
            barbarianSubclass: ['berserker'],
            feat: ['crusher', 'alert'],
            asi: ['str'],
        }
    },
    {
        id: 'sample_barbarian_wildHeart',
        name: 'Sylva Mossrunner',
        class: 'Barbarian', sub: 'Path of the Wild Heart',
        species: 'Minotaur', background: 'guide',
        speciesId: 'minotaur', classId: 'barbarian', subcId: 'wildHeart',
        str: 6, dex: 4, con: 4, int: 0, wis: 2, cha: 0,
        prefs: {
            barbarianSkillProficiencies: ['animalHandlingProficiency', 'perceptionProficiency'],
            barbarianSubclass: ['wildHeart'],
        }
    },
    {
        id: 'sample_barbarian_worldTree',
        name: 'Bjorveld Ashroot',
        class: 'Barbarian', sub: 'Path of the World Tree',
        species: 'Goliath', background: 'hermit',
        speciesId: 'goliath', classId: 'barbarian', subcId: 'worldTree',
        str: 7, dex: 2, con: 6, int: 0, wis: 1, cha: 0,
        prefs: {
            barbarianSkillProficiencies: ['survivalProficiency', 'natureProficiency'],
            barbarianSubclass: ['worldTree'],
        }
    },
    {
        id: 'sample_barbarian_zealot',
        name: 'Korrax Flameheart',
        class: 'Barbarian', sub: 'Path of the Zealot',
        species: 'Aasimar', background: 'acolyte',
        speciesId: 'aasimar', classId: 'barbarian', subcId: 'zealot',
        str: 6, dex: 2, con: 4, int: 0, wis: 2, cha: 2,
        prefs: {
            barbarianSkillProficiencies: ['intimidationProficiency', 'athleticsProficiency'],
            barbarianSubclass: ['zealot'],
        }
    },

    // ─── BARD ─────────────────────────────────────────────────────────────────

    {
        id: 'sample_bard_dance',
        name: 'Mirabel Twostep',
        class: 'Bard', sub: 'College of Dance',
        species: 'Satyr', background: 'entertainer',
        speciesId: 'satyr', classId: 'bard', subcId: 'dance',
        str: 0, dex: 4, con: 2, int: 1, wis: 2, cha: 7,
        prefs: {
            skillProficiencies: ['performanceProficiency', 'acrobaticsProficiency', 'persuasionProficiency'],
            bardSubclass: ['dance'],
        }
    },
    {
        id: 'sample_bard_glamour',
        name: 'Sylindra Moonsong',
        class: 'Bard', sub: 'College of Glamour',
        species: 'Tiefling', background: 'noble',
        speciesId: 'tiefling', classId: 'bard', subcId: 'glamour',
        str: 0, dex: 2, con: 2, int: 2, wis: 0, cha: 7,
        prefs: {
            skillProficiencies: ['persuasionProficiency', 'deceptionProficiency', 'performanceProficiency'],
            bardSubclass: ['glamour'],
        }
    },
    {
        id: 'sample_bard_lore',
        name: 'Pemberwick Thistledown',
        class: 'Bard', sub: 'College of Lore',
        species: 'Gnome', background: 'sage',
        speciesId: 'gnome', classId: 'bard', subcId: 'lore',
        str: 0, dex: 2, con: 1, int: 3, wis: 2, cha: 5,
        prefs: {
            skillProficiencies: ['arcanaProficiency', 'historyProficiency', 'persuasionProficiency'],
            bardSubclass: ['lore'],
        }
    },
    {
        id: 'sample_bard_valor',
        name: 'Dax Steelstring',
        class: 'Bard', sub: 'College of Valor',
        species: 'Human', background: 'soldier',
        speciesId: 'human', classId: 'bard', subcId: 'valor',
        str: 3, dex: 3, con: 2, int: 1, wis: 1, cha: 5,
        prefs: {
            skillProficiencies: ['performanceProficiency', 'persuasionProficiency', 'athleticsProficiency'],
            bardSubclass: ['valor'],
        }
    },

    // ─── CLERIC ───────────────────────────────────────────────────────────────

    {
        id: 'sample_cleric_life',
        name: 'Sister Merindah',
        class: 'Cleric', sub: 'Life Domain',
        species: 'Aasimar', background: 'acolyte',
        speciesId: 'aasimar', classId: 'cleric', subcId: 'lifeDomain',
        str: 1, dex: 0, con: 3, int: 1, wis: 5, cha: 2,
        prefs: {
            clericSkillProficiencies: ['medicineProficiency', 'insightProficiency'],
            clericSubclass: ['lifeDomain'],
        }
    },
    {
        id: 'sample_cleric_light',
        name: 'Vael Sunmantle',
        class: 'Cleric', sub: 'Light Domain',
        species: 'Elf', background: 'acolyte',
        speciesId: 'elf', classId: 'cleric', subcId: 'lightDomain',
        str: 0, dex: 2, con: 2, int: 3, wis: 4, cha: 2,
        prefs: {
            clericSkillProficiencies: ['religionProficiency', 'perceptionProficiency'],
            clericSubclass: ['lightDomain'],
        }
    },
    {
        id: 'sample_cleric_trickery',
        name: 'Nyx Shadowveil',
        class: 'Cleric', sub: 'Trickery Domain',
        species: 'Tiefling', background: 'charlatan',
        speciesId: 'tiefling', classId: 'cleric', subcId: 'trickeryDomain',
        str: 0, dex: 3, con: 2, int: 2, wis: 4, cha: 3,
        prefs: {
            clericSkillProficiencies: ['deceptionProficiency', 'insightProficiency'],
            clericSubclass: ['trickeryDomain'],
        }
    },
    {
        id: 'sample_cleric_war',
        name: 'Commander Barek',
        class: 'Cleric', sub: 'War Domain',
        species: 'Dwarf', background: 'soldier',
        speciesId: 'dwarf', classId: 'cleric', subcId: 'warDomain',
        str: 3, dex: 1, con: 4, int: 1, wis: 4, cha: 1,
        prefs: {
            clericSkillProficiencies: ['religionProficiency', 'persuasionProficiency'],
            clericSubclass: ['warDomain'],
        }
    },

    // ─── DRUID ────────────────────────────────────────────────────────────────

    {
        id: 'sample_druid_land',
        name: 'Wren Fernhollow',
        class: 'Druid', sub: 'Circle of the Land',
        species: 'Halfling', background: 'hermit',
        speciesId: 'halfling', classId: 'druid', subcId: 'circleOfTheLand',
        str: 0, dex: 2, con: 2, int: 3, wis: 6, cha: 0,
        prefs: { druidSubclass: ['circleOfTheLand'] }
    },
    {
        id: 'sample_druid_moon',
        name: 'Torrin Bearpaw',
        class: 'Druid', sub: 'Circle of the Moon',
        species: 'Human', background: 'guide',
        speciesId: 'human', classId: 'druid', subcId: 'circleOfTheMoon',
        str: 1, dex: 1, con: 3, int: 1, wis: 7, cha: 0,
        prefs: { druidSubclass: ['circleOfTheMoon'] }
    },
    {
        id: 'sample_druid_sea',
        name: 'Coraline Wavecrest',
        class: 'Druid', sub: 'Circle of the Sea',
        species: 'Triton', background: 'sailor',
        speciesId: 'triton', classId: 'druid', subcId: 'circleOfTheSea',
        str: 0, dex: 2, con: 2, int: 2, wis: 7, cha: 0,
        prefs: { druidSubclass: ['circleOfTheSea'] }
    },
    {
        id: 'sample_druid_stars',
        name: 'Astraea Cosmoss',
        class: 'Druid', sub: 'Circle of the Stars',
        species: 'Gnome', background: 'sage',
        speciesId: 'gnome', classId: 'druid', subcId: 'circleOfTheStars',
        str: 0, dex: 2, con: 2, int: 4, wis: 7, cha: 0,
        prefs: { druidSubclass: ['circleOfTheStars'] }
    },

    // ─── FIGHTER ──────────────────────────────────────────────────────────────

    {
        id: 'sample_fighter_battleMaster',
        name: 'Kira Steelwind',
        class: 'Fighter', sub: 'Battle Master',
        species: 'Dwarf', background: 'soldier',
        speciesId: 'dwarf', classId: 'fighter', subcId: 'battleMaster',
        str: 5, dex: 2, con: 5, int: 2, wis: 2, cha: 0,
        prefs: {
            fighterskillproficiencies: ['athleticsProficiency', 'perceptionProficiency'],
            fightingStyle: ['greatWeaponFighting'],
            fighterSubclass: ['battleMaster'],
        }
    },
    {
        id: 'sample_fighter_champion',
        name: 'Brulda Crushfist',
        class: 'Fighter', sub: 'Champion',
        species: 'Orc', background: 'soldier',
        speciesId: 'orc', classId: 'fighter', subcId: 'champion',
        str: 7, dex: 2, con: 5, int: 0, wis: 1, cha: 0,
        prefs: {
            fighterskillproficiencies: ['athleticsProficiency', 'intimidationProficiency'],
            fightingStyle: ['greatWeaponFighting'],
            fighterSubclass: ['champion'],
        }
    },
    {
        id: 'sample_fighter_eldritchKnight',
        name: 'Valdris Spellblade',
        class: 'Fighter', sub: 'Eldritch Knight',
        species: 'Elf', background: 'sage',
        speciesId: 'elf', classId: 'fighter', subcId: 'eldritchKnight',
        str: 4, dex: 3, con: 3, int: 4, wis: 1, cha: 0,
        prefs: {
            fighterskillproficiencies: ['arcanaProficiency', 'athleticsProficiency'],
            fightingStyle: ['defense'],
            fighterSubclass: ['eldritchKnight'],
        }
    },
    {
        id: 'sample_fighter_psiWarrior',
        name: 'Callion Mindstrike',
        class: 'Fighter', sub: 'Psi Warrior',
        species: 'Gnome', background: 'sage',
        speciesId: 'gnome', classId: 'fighter', subcId: 'psiWarrior',
        str: 4, dex: 2, con: 3, int: 5, wis: 1, cha: 0,
        prefs: {
            fighterskillproficiencies: ['arcanaProficiency', 'insightProficiency'],
            fightingStyle: ['defense'],
            fighterSubclass: ['psiWarrior'],
        }
    },

    // ─── MONK ─────────────────────────────────────────────────────────────────

    {
        id: 'sample_monk_elements',
        name: 'Suzara Windfire',
        class: 'Monk', sub: 'Warrior of the Elements',
        species: 'Human', background: 'hermit',
        speciesId: 'human', classId: 'monk', subcId: 'elements',
        str: 3, dex: 5, con: 3, int: 0, wis: 4, cha: 0,
        prefs: {
            monkSkillProficiencies: ['acrobaticsProficiency', 'insightProficiency'],
            monkSubclass: ['elements'],
        }
    },
    {
        id: 'sample_monk_mercy',
        name: 'Physician Tae',
        class: 'Monk', sub: 'Warrior of Mercy',
        species: 'Halfling', background: 'acolyte',
        speciesId: 'halfling', classId: 'monk', subcId: 'mercy',
        str: 2, dex: 5, con: 2, int: 2, wis: 5, cha: 0,
        prefs: {
            monkSkillProficiencies: ['insightProficiency', 'acrobaticsProficiency'],
            monkSubclass: ['mercy'],
        }
    },
    {
        id: 'sample_monk_openHand',
        name: 'Brother Jiao',
        class: 'Monk', sub: 'Warrior of the Open Hand',
        species: 'Human', background: 'hermit',
        speciesId: 'human', classId: 'monk', subcId: 'openHand',
        str: 3, dex: 5, con: 2, int: 1, wis: 4, cha: 0,
        prefs: {
            monkSkillProficiencies: ['acrobaticsProficiency', 'athleticsProficiency'],
            monkSubclass: ['openHand'],
        }
    },
    {
        id: 'sample_monk_shadows',
        name: 'Shade Veil',
        class: 'Monk', sub: 'Warrior of Shadow',
        species: 'Tiefling', background: 'criminal',
        speciesId: 'tiefling', classId: 'monk', subcId: 'shadows',
        str: 2, dex: 6, con: 2, int: 1, wis: 3, cha: 1,
        prefs: {
            monkSkillProficiencies: ['stealthProficiency', 'acrobaticsProficiency'],
            monkSubclass: ['shadows'],
        }
    },

    // ─── PALADIN ──────────────────────────────────────────────────────────────

    {
        id: 'sample_paladin_devotion',
        name: 'Ser Lysandra Brightshield',
        class: 'Paladin', sub: 'Oath of Devotion',
        species: 'Aasimar', background: 'acolyte',
        speciesId: 'aasimar', classId: 'paladin', subcId: 'oathOfDevotion',
        str: 5, dex: 1, con: 3, int: 0, wis: 2, cha: 4,
        prefs: { paladinSubclass: ['oathOfDevotion'] }
    },
    {
        id: 'sample_paladin_glory',
        name: 'Aurelius Goldhelm',
        class: 'Paladin', sub: 'Oath of Glory',
        species: 'Leonin', background: 'noble',
        speciesId: 'leonin', classId: 'paladin', subcId: 'oathOfGlory',
        str: 5, dex: 2, con: 3, int: 0, wis: 1, cha: 4,
        prefs: { paladinSubclass: ['oathOfGlory'] }
    },
    {
        id: 'sample_paladin_ancients',
        name: 'Elarinde Greenvow',
        class: 'Paladin', sub: 'Oath of the Ancients',
        species: 'Elf', background: 'guide',
        speciesId: 'elf', classId: 'paladin', subcId: 'oathOfTheAncients',
        str: 4, dex: 2, con: 3, int: 1, wis: 3, cha: 3,
        prefs: { paladinSubclass: ['oathOfTheAncients'] }
    },
    {
        id: 'sample_paladin_vengeance',
        name: 'Sable Duskfall',
        class: 'Paladin', sub: 'Oath of Vengeance',
        species: 'Tiefling', background: 'criminal',
        speciesId: 'tiefling', classId: 'paladin', subcId: 'oathOfVengeance',
        str: 5, dex: 2, con: 3, int: 1, wis: 0, cha: 5,
        prefs: { paladinSubclass: ['oathOfVengeance'] }
    },

    // ─── RANGER ───────────────────────────────────────────────────────────────

    {
        id: 'sample_ranger_beastMaster',
        name: 'Fern Quickarrow',
        class: 'Ranger', sub: 'Beast Master',
        species: 'Halfling', background: 'guide',
        speciesId: 'halfling', classId: 'ranger', subcId: 'beastMaster',
        str: 2, dex: 5, con: 2, int: 1, wis: 5, cha: 0,
        prefs: { rangerSubclass: ['beastMaster'] }
    },
    {
        id: 'sample_ranger_feyWanderer',
        name: 'Lirinde Moonwalk',
        class: 'Ranger', sub: 'Fey Wanderer',
        species: 'Elf', background: 'wayfarer',
        speciesId: 'elf', classId: 'ranger', subcId: 'feyWanderer',
        str: 2, dex: 5, con: 2, int: 2, wis: 4, cha: 1,
        prefs: { rangerSubclass: ['feyWanderer'] }
    },
    {
        id: 'sample_ranger_gloomStalker',
        name: 'Mira Shadowtread',
        class: 'Ranger', sub: 'Gloom Stalker',
        species: 'Tiefling', background: 'criminal',
        speciesId: 'tiefling', classId: 'ranger', subcId: 'gloomStalker',
        str: 2, dex: 6, con: 2, int: 2, wis: 4, cha: 0,
        prefs: { rangerSubclass: ['gloomStalker'] }
    },
    {
        id: 'sample_ranger_hunter',
        name: 'Rex Bouldershot',
        class: 'Ranger', sub: 'Hunter',
        species: 'Goliath', background: 'soldier',
        speciesId: 'goliath', classId: 'ranger', subcId: 'hunter',
        str: 3, dex: 5, con: 3, int: 1, wis: 3, cha: 0,
        prefs: { rangerSubclass: ['hunter'] }
    },

    // ─── ROGUE ────────────────────────────────────────────────────────────────

    {
        id: 'sample_rogue_arcaneTrickster',
        name: 'Pip Nimblefingers',
        class: 'Rogue', sub: 'Arcane Trickster',
        species: 'Gnome', background: 'charlatan',
        speciesId: 'gnome', classId: 'rogue', subcId: 'arcaneTrickster',
        str: 0, dex: 6, con: 2, int: 3, wis: 2, cha: 0,
        prefs: {
            rogueSkillProficiencies: ['sleightOfHandProficiency', 'stealthProficiency', 'deceptionProficiency', 'arcanaProficiency'],
            rogueSubclass: ['arcaneTrickster'],
        }
    },
    {
        id: 'sample_rogue_assassin',
        name: 'Vex Nightfall',
        class: 'Rogue', sub: 'Assassin',
        species: 'Tiefling', background: 'criminal',
        speciesId: 'tiefling', classId: 'rogue', subcId: 'assassin',
        str: 0, dex: 7, con: 2, int: 3, wis: 1, cha: 0,
        prefs: {
            rogueSkillProficiencies: ['stealthProficiency', 'deceptionProficiency', 'acrobaticsProficiency', 'perceptionProficiency'],
            rogueSubclass: ['assassin'],
        }
    },
    {
        id: 'sample_rogue_soulknife',
        name: 'Kalax Voidcut',
        class: 'Rogue', sub: 'Soulknife',
        species: 'Human', background: 'wayfarer',
        speciesId: 'human', classId: 'rogue', subcId: 'soulknife',
        str: 1, dex: 6, con: 2, int: 3, wis: 2, cha: 0,
        prefs: {
            rogueSkillProficiencies: ['acrobaticsProficiency', 'stealthProficiency', 'insightProficiency', 'perceptionProficiency'],
            rogueSubclass: ['soulknife'],
        }
    },
    {
        id: 'sample_rogue_thief',
        name: 'Dex Quickpocket',
        class: 'Rogue', sub: 'Thief',
        species: 'Halfling', background: 'criminal',
        speciesId: 'halfling', classId: 'rogue', subcId: 'thief',
        str: 0, dex: 7, con: 2, int: 2, wis: 2, cha: 0,
        prefs: {
            rogueSkillProficiencies: ['stealthProficiency', 'sleightOfHandProficiency', 'acrobaticsProficiency', 'deceptionProficiency'],
            rogueSubclass: ['thief'],
        }
    },

    // ─── SORCERER ─────────────────────────────────────────────────────────────

    {
        id: 'sample_sorcerer_aberrant',
        name: 'Qaldrix Deepthought',
        class: 'Sorcerer', sub: 'Aberrant Sorcery',
        species: 'Gnome', background: 'sage',
        speciesId: 'gnome', classId: 'sorcerer', subcId: 'aberrant',
        str: 0, dex: 2, con: 2, int: 3, wis: 1, cha: 5,
        prefs: { sorcererSubclass: ['aberrant'] }
    },
    {
        id: 'sample_sorcerer_clockwork',
        name: 'Cog Precisus',
        class: 'Sorcerer', sub: 'Clockwork Sorcery',
        species: 'Gnome', background: 'artisan',
        speciesId: 'gnome', classId: 'sorcerer', subcId: 'clockwork',
        str: 0, dex: 2, con: 2, int: 3, wis: 1, cha: 5,
        prefs: { sorcererSubclass: ['clockwork'] }
    },
    {
        id: 'sample_sorcerer_draconic',
        name: 'Skaryx Emberclaw',
        class: 'Sorcerer', sub: 'Draconic Sorcery',
        species: 'Dragonborn', background: 'noble',
        speciesId: 'dragonborn', classId: 'sorcerer', subcId: 'draconic',
        str: 0, dex: 2, con: 2, int: 2, wis: 1, cha: 6,
        prefs: { sorcererSubclass: ['draconic'] }
    },
    {
        id: 'sample_sorcerer_wildMagic',
        name: 'Blix Unpredictus',
        class: 'Sorcerer', sub: 'Wild Magic Sorcery',
        species: 'Halfling', background: 'charlatan',
        speciesId: 'halfling', classId: 'sorcerer', subcId: 'wildMagic',
        str: 0, dex: 3, con: 2, int: 2, wis: 1, cha: 6,
        prefs: { sorcererSubclass: ['wildMagic'] }
    },

    // ─── WARLOCK ──────────────────────────────────────────────────────────────

    {
        id: 'sample_warlock_archfey',
        name: 'Mira Thornwhisper',
        class: 'Warlock', sub: 'Archfey Patron',
        species: 'Elf', background: 'wayfarer',
        speciesId: 'elf', classId: 'warlock', subcId: 'archfeyPatron',
        str: 0, dex: 3, con: 2, int: 2, wis: 1, cha: 6,
        prefs: { warlockSubclass: ['archfeyPatron'] }
    },
    {
        id: 'sample_warlock_celestial',
        name: 'Lux Dawnpact',
        class: 'Warlock', sub: 'Celestial Patron',
        species: 'Aasimar', background: 'acolyte',
        speciesId: 'aasimar', classId: 'warlock', subcId: 'celestialPatron',
        str: 0, dex: 2, con: 2, int: 2, wis: 2, cha: 7,
        prefs: { warlockSubclass: ['celestialPatron'] }
    },
    {
        id: 'sample_warlock_fiend',
        name: 'Bael Ashpact',
        class: 'Warlock', sub: 'Fiend Patron',
        species: 'Tiefling', background: 'criminal',
        speciesId: 'tiefling', classId: 'warlock', subcId: 'fiendPatron',
        str: 5, dex: 4, con: 2, int: 2, wis: 1, cha: 7,
        prefs: {
            warlockSubclass: ['fiendPatron'],
            pactOfTheBladeSlot: ['battleaxe'],
            armamentSlot: ['club']
        }
    },
    {
        id: 'sample_warlock_greatOldOne',
        name: 'Zelara Voidpact',
        class: 'Warlock', sub: 'Great Old One Patron',
        species: 'Human', background: 'hermit',
        speciesId: 'human', classId: 'warlock', subcId: 'greatOldOnePatron',
        str: 0, dex: 2, con: 2, int: 3, wis: 1, cha: 7,
        prefs: { warlockSubclass: ['greatOldOnePatron'] }
    },

    // ─── WIZARD ───────────────────────────────────────────────────────────────

    {
        id: 'sample_wizard_abjurer',
        name: 'Aldus Wardmage',
        class: 'Wizard', sub: 'Abjurer',
        species: 'Dwarf', background: 'sage',
        speciesId: 'dwarf', classId: 'wizard', subcId: 'abjurer',
        str: 0, dex: 1, con: 4, int: 7, wis: 1, cha: 0,
        prefs: { wizardSubclass: ['abjurer'] }
    },
    {
        id: 'sample_wizard_diviner',
        name: 'Oracle Seerus',
        class: 'Wizard', sub: 'Diviner',
        species: 'Gnome', background: 'sage',
        speciesId: 'gnome', classId: 'wizard', subcId: 'diviner',
        str: 0, dex: 1, con: 2, int: 7, wis: 3, cha: 0,
        prefs: { wizardSubclass: ['diviner'] }
    },
    {
        id: 'sample_wizard_evoker',
        name: 'Blastus Firebolt',
        class: 'Wizard', sub: 'Evoker',
        species: 'Human', background: 'sage',
        speciesId: 'human', classId: 'wizard', subcId: 'evoker',
        str: 0, dex: 2, con: 3, int: 7, wis: 1, cha: 0,
        prefs: { wizardSubclass: ['evoker'] }
    },
    {
        id: 'sample_wizard_illusionist',
        name: 'Phantasma Veil',
        class: 'Wizard', sub: 'Illusionist',
        species: 'Tiefling', background: 'charlatan',
        speciesId: 'tiefling', classId: 'wizard', subcId: 'illusionist',
        str: 0, dex: 2, con: 2, int: 7, wis: 1, cha: 1,
        prefs: { wizardSubclass: ['illusionist'] }
    },

    // ─── ARTIFICER ─────────────────────────────────────────────────────────────

    {
        id: 'sample_artificer_alchemist',
        name: 'Fizzy Potionson',
        class: 'Artificer', sub: 'Alchemist',
        species: 'Gnome', background: 'artisan',
        speciesId: 'gnome', classId: 'artificer', subcId: 'alchemist',
        str: 0, dex: 2, con: 3, int: 7, wis: 1, cha: 0,
        prefs: { artificerSubclass: ['alchemist'] }
    },
    {
        id: 'sample_artificer_artillerist',
        name: 'Boomer Gearloose',
        class: 'Artificer', sub: 'Artillerist',
        species: 'Dwarf', background: 'artisan',
        speciesId: 'dwarf', classId: 'artificer', subcId: 'artillerist',
        str: 0, dex: 3, con: 2, int: 7, wis: 1, cha: 0,
        prefs: { artificerSubclass: ['artillerist'] }
    },
    {
        id: 'sample_artificer_cartographer',
        name: 'Mapmaker Pathfinder',
        class: 'Artificer', sub: 'Cartographer',
        species: 'Human', background: 'guide',
        speciesId: 'human', classId: 'artificer', subcId: 'cartographer',
        str: 0, dex: 2, con: 2, int: 7, wis: 2, cha: 0,
        prefs: { artificerSubclass: ['cartographer'] }
    },
    {
        id: 'sample_artificer_armorer',
        name: 'Ironclad Bulwark',
        class: 'Artificer', sub: 'Armorer',
        species: 'Orc', background: 'soldier',
        speciesId: 'orc', classId: 'artificer', subcId: 'armorer',
        str: 0, dex: 2, con: 2, int: 7, wis: 1, cha: 0,
        prefs: {
            artificerSubclass: ['armorer'],
            armorModel: ['dreadnaughtModel']
        }
    },
    {
        id: 'sample_artificer_reanimator',
        name: 'Dr. Frankenstitch',
        class: 'Artificer', sub: 'Reanimator',
        species: 'Human', background: 'hermit',
        speciesId: 'human', classId: 'artificer', subcId: 'reanimator',
        str: 0, dex: 2, con: 2, int: 7, wis: 2, cha: 0,
        prefs: {
            artificerSubclass: ['reanimator'],
            strangeModifications: ['ferocity']
        }
    }
];

// ─── Build each character ─────────────────────────────────────────────────────

const SAMPLE_ID_PREFIX = 'sample_';

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
    // Set level first via input path [1]
    builder.updateInput([1], LEVEL);
    // Set stats
    builder.updateInput([2], def.str);
    builder.updateInput([3], def.dex);
    builder.updateInput([4], def.con);
    builder.updateInput([5], def.int);
    builder.updateInput([6], def.wis);
    builder.updateInput([7], def.cha);
    // Set name
    builder.updateInput([0], def.name);

    // Fill species / background / class in top-level slots (use applyRecipe)
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

    // Fill subclass slot
    const subcSlots = findUnfilledSlots(builder.propertyTree);
    const subcTarget = subcSlots.find(s => s.node.id && s.node.id.endsWith('Subclass'));
    if (subcTarget) {
        fillSlotByPath(builder, subcTarget.path, def.subcId);
    }

    // Auto-fill remaining slots with preferences
    autoFill(builder, def.prefs || {});

    // Get final recipe
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
        console.error(` ✗  ERROR: ${err.message}`);
        // Fall back to minimal version
        results.push({
            id: def.id,
            name: def.name,
            class: def.class,
            sub: def.sub,
            species: def.species,
            level: LEVEL,
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