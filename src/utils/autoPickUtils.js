import { getPresetForCharacter } from '../data/autoPickPresets.js';
import { getSlotAllowedMap, findMatchingForChoices } from './builderUtils.js';

export const AUTO_PICK_POOLS = [
    'classOptions',
    'feats',
    'skills',
    'expertise',
    'spellcasting',
    'equipment',
    'tools',
    'stats'
];

const ASI_IDS = ['abilityScoreImprovement', 'abilityScoreImprovement2', 'abilityScoreImprovement3'];

export const UNIVERSAL_SPELL_PREFERENCES = [
    // Top Utility & Combat Cantrips across all lists
    'guidance', 'fireBolt', 'tollTheDead', 'sacredFlame', 'minorIllusion', 'mageHand',
    'prestidigitation', 'rayOfFrost', 'shockingGrasp', 'viciousMockery', 'eldritchBlast',
    'thaumaturgy', 'druidcraft', 'message', 'chillTouch', 'wordOfRadiance', 'spareTheDying',
    'produceFlame', 'shillelagh', 'thornWhip', 'lightSpell', 'mending', 'bladeWard', 'trueStrike',
    // Top 1st-level spells across all lists (including Divination, Enchantment, Illusion, Necromancy for Fey/Shadow Touched)
    'shieldSpell', 'absorbElements', 'bless', 'healingWord', 'cureWounds', 'findFamiliar',
    'silveryBarbs', 'magicMissile', 'guidingBolt', 'inflictWounds', 'thunderwave', 'featherFall',
    'dissonantWhispers', 'faerieFire', 'goodberry', 'entangle', 'fogCloud', 'detectMagic',
    'shieldOfFaith', 'sanctuary', 'command', 'huntersMark', 'hex', 'armorOfAgathys', 'falseLife',
    'disguiseSelf', 'silentImage', 'sleepSpell', 'giftOfAlacrity', 'tashasHideousLaughter',
    'comprehendLanguages', 'unseenServant',
    // Top 2nd-level spells
    'mistyStep', 'invisibility', 'mirrorImage', 'spiritualWeapon', 'holdPerson', 'lesserRestoration',
    'aid', 'web', 'scorchingRay', 'shatter', 'passWithoutTrace', 'blur', 'shadowBlade', 'vortexWarp',
    // Top 3rd-level spells
    'counterspell', 'fireball', 'spiritGuardians', 'revivify', 'haste', 'flySpell', 'dispelMagic',
    'lightningBolt', 'hypnoticPattern', 'slow', 'massHealingWord'
];

/**
 * Checks if a given item/step is eligible for Auto-Pick.
 */
export function isStepAutoPickEligible(item) {
    if (!item) return false;
    if (item.type === 'Abilities') return true;
    const step = item.step || (item.category === 'abilities' ? 'stats' : null);
    if (step && AUTO_PICK_POOLS.includes(step)) return true;
    return false;
}

/**
 * Checks if a preset setup actually exists for the given item and matches current options.
 */
export function hasAutoPickSetup(displaySlotItem, characterData, options = []) {
    if (!displaySlotItem) return false;
    if (displaySlotItem.type === 'Abilities') {
        return Boolean(characterData?.meta?.class || characterData?.class);
    }
    const preset = getPresetForCharacter(characterData);
    if (!preset) return false;

    const step = displaySlotItem.step || (displaySlotItem.category === 'abilities' ? 'stats' : null);
    if (!step || !AUTO_PICK_POOLS.includes(step)) return false;

    const isMerged = displaySlotItem.type === 'MergedCategory';
    const isGroup = displaySlotItem.type === 'Group';
    const slotItems = (isMerged || isGroup)
        ? displaySlotItem.items || []
        : (displaySlotItem.type === 'Slot' ? [displaySlotItem] : []);

    // For MergedCategory, do not narrow to firstSlot so all slot types (e.g. armor + armament) are included in preferences
    const slotForPrefs = isMerged ? null : (slotItems[0] || displaySlotItem);
    const prefs = getPreferencesForStep(preset, step, slotForPrefs);
    if (!prefs || prefs.length === 0) return false;

    if (options && options.length > 0) {
        const optionIds = new Set(options.map(o => o.id));
        return prefs.some(pId => optionIds.has(pId));
    }

    return true;
}

/**
 * Resolves the candidate preference list for a given pool step from the character preset.
 */
function getPreferencesForStep(preset, poolStep, slotItem = null) {
    if (!preset) return [];

    let list = [];

    if (poolStep === 'feats') {
        // Feats always default to ASI if available!
        list = [...ASI_IDS, ...(preset.feats || [])];
    } else if (poolStep === 'skills') {
        list = preset.skills || [];
    } else if (poolStep === 'expertise') {
        list = preset.expertise || [];
    } else if (poolStep === 'spellcasting') {
        list = Array.from(new Set([
            ...(preset.spellcasting || []),
            ...UNIVERSAL_SPELL_PREFERENCES
        ]));
    } else if (poolStep === 'tools') {
        list = preset.tools || [];
    } else if (poolStep === 'equipment') {
        // Look at slot target if single slot or group
        const target = slotItem?.node?.target || '';
        const targetStr = Array.isArray(target) ? target.join(' ') : String(target);
        if (targetStr.toLowerCase().includes('armor') && !targetStr.toLowerCase().includes('weapon')) {
            list = preset.equipment?.armor || [];
        } else if (targetStr.toLowerCase().includes('armament') || targetStr.toLowerCase().includes('weapon')) {
            list = preset.equipment?.armament || [];
        } else {
            list = [
                ...(preset.equipment?.armor || []),
                ...(preset.equipment?.armament || [])
            ];
        }
    } else if (poolStep === 'classOptions') {
        // Check slot specific options in classOptions preset
        const slotId = slotItem?.node?.id || '';
        const slotName = slotItem?.node?.name || '';
        const target = slotItem?.node?.target || '';
        const targetStr = (Array.isArray(target) ? target.join(' ') : String(target)).toLowerCase();

        const optMap = preset.classOptions || {};
        let matched = [];

        // Check if slot matches any specific key in classOptions (e.g. metamagic, fightingStyle)
        for (const [key, vals] of Object.entries(optMap)) {
            const cleanKey = key.toLowerCase();
            if (
                slotId.toLowerCase().includes(cleanKey) ||
                slotName.toLowerCase().includes(cleanKey) ||
                targetStr.includes(cleanKey)
            ) {
                matched.push(...vals);
            }
        }

        if (matched.length > 0) {
            list = matched;
        } else {
            // Flatten all class options in priority
            const allOpts = Object.values(optMap).flat();
            list = allOpts;
        }
    }

    return list;
}

/**
 * Computes slot fills for a given pool item using Option A:
 * - If any slots are unfilled, fills unfilled slots while preserving existing manual picks.
 * - If all slots are already filled, replaces all slots with recommended presets.
 */
export function computeAutoPickChoices({
    poolStep,
    displaySlotItem,
    options = [],
    characterData,
    handleGetSlotOptions,
    onGetProperty
}) {
    const preset = getPresetForCharacter(characterData);
    if (!preset) return [];

    const isMerged = displaySlotItem.type === 'MergedCategory';
    const isGroup = displaySlotItem.type === 'Group';
    const isSingleSlot = displaySlotItem.type === 'Slot';

    const slotItems = isMerged || isGroup
        ? displaySlotItem.items || []
        : (isSingleSlot ? [displaySlotItem] : []);

    if (slotItems.length === 0) return [];

    // Determine Option A mode:
    // If ANY slot is unfilled => fill remaining empty slots, keeping existing.
    // If ALL slots are already filled => reset and re-pick all slots.
    const hasUnfilled = slotItems.some(i => !i.node.filled);

    // Existing active IDs in character (to avoid duplicate proficiencies / features)
    const existingCharacterIds = new Set();
    const meta = characterData?.meta || {};
    Object.keys(meta).forEach(k => {
        if (typeof meta[k] === 'string') existingCharacterIds.add(meta[k]);
    });

    // Options map for merged matching
    const categoryOptionsMap = new Map();
    options.forEach(opt => {
        let fullOpt = opt;
        if (!fullOpt.tags && onGetProperty) {
            const fetched = onGetProperty(opt.id);
            if (fetched) fullOpt = { ...opt, ...fetched };
        }
        categoryOptionsMap.set(opt.id, { option: fullOpt });
    });

    const slotAllowedMap = getSlotAllowedMap(slotItems, categoryOptionsMap, handleGetSlotOptions, characterData);

    if (isMerged) {
        // Collect current picks
        const currentFilledChoices = hasUnfilled
            ? slotItems.map(i => i.node.filled?.id).filter(Boolean)
            : [];

        // Build preference list
        const rawPreferences = getPreferencesForStep(preset, poolStep);

        // Prepend any specific preferences for equipment (armor vs armament)
        let prioritizedPreferences = [...rawPreferences];
        if (poolStep === 'equipment') {
            const armors = preset.equipment?.armor || [];
            const weapons = preset.equipment?.armament || [];
            prioritizedPreferences = [...armors, ...weapons];
        }

        const candidateChoices = [...currentFilledChoices];
        const usedIds = new Set(candidateChoices);

        // Try adding preferred choices
        for (const prefId of prioritizedPreferences) {
            if (candidateChoices.length >= slotItems.length) break;
            if (usedIds.has(prefId)) continue;

            const optEntry = categoryOptionsMap.get(prefId);
            if (!optEntry || optEntry.option?.isHardcoded) continue;

            // Check if adding this choice still yields a valid bipartite matching
            const testChoices = [...candidateChoices, prefId];
            const testMatch = findMatchingForChoices(testChoices, slotItems, slotAllowedMap);
            if (testMatch) {
                candidateChoices.push(prefId);
                usedIds.add(prefId);
            }
        }

        // If we still need more choices to fill all slots, check remaining options in category
        if (candidateChoices.length < slotItems.length) {
            for (const opt of options) {
                if (candidateChoices.length >= slotItems.length) break;
                if (usedIds.has(opt.id) || opt.isHardcoded) continue;

                const testChoices = [...candidateChoices, opt.id];
                const testMatch = findMatchingForChoices(testChoices, slotItems, slotAllowedMap);
                if (testMatch) {
                    candidateChoices.push(opt.id);
                    usedIds.add(opt.id);
                }
            }
        }

        // Final bipartite match
        const matching = findMatchingForChoices(candidateChoices, slotItems, slotAllowedMap);
        if (!matching) return [];

        const fills = [];
        slotItems.forEach(slotItem => {
            let matchedChoiceId = null;
            for (const [cId, targetSlot] of matching.entries()) {
                if (JSON.stringify(targetSlot.logicalPath) === JSON.stringify(slotItem.logicalPath)) {
                    matchedChoiceId = cId;
                    break;
                }
            }

            const currentFilledId = slotItem.node.filled?.id || null;
            if (matchedChoiceId !== currentFilledId) {
                fills.push({
                    path: slotItem.path,
                    propertyId: matchedChoiceId
                });
            }
        });

        return fills;
    }

    // Single Slot or Group
    const fills = [];
    const usedGroupIds = new Set(
        hasUnfilled
            ? slotItems.map(i => i.node.filled?.id).filter(Boolean)
            : []
    );

    for (const slotItem of slotItems) {
        if (hasUnfilled && slotItem.node.filled) {
            continue; // Keep existing selection
        }

        const slotOpts = handleGetSlotOptions ? handleGetSlotOptions(slotItem.node) : options;
        const validOpts = (slotOpts || []).filter(o => !o.isHardcoded);
        const validMap = new Map(validOpts.map(o => [o.id, o]));

        const prefList = getPreferencesForStep(preset, poolStep, slotItem);

        let chosenId = null;
        for (const prefId of prefList) {
            if (validMap.has(prefId) && !usedGroupIds.has(prefId)) {
                chosenId = prefId;
                break;
            }
        }

        if (!chosenId) {
            for (const opt of validOpts) {
                if (!usedGroupIds.has(opt.id)) {
                    chosenId = opt.id;
                    break;
                }
            }
        }

        if (chosenId) {
            usedGroupIds.add(chosenId);
            fills.push({
                path: slotItem.path,
                propertyId: chosenId
            });
        }
    }

    return fills;
}

/**
 * Computes optimal Ability Score distributions for point buy, origin, and ASI pools.
 */
export function computeAutoPickAbilities(characterData) {
    const preset = getPresetForCharacter(characterData);
    const attr = characterData?.attributes || {};

    const statsList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    const priority = preset?.stats?.priority || statsList;

    const pointBuyLimit = attr.pointBuyLimit || 21;
    const pointBuyScoreLimit = attr.pointBuyScoreLimit || 7;
    const originPoolLimit = attr.originPoolLimit || 3;
    const originScoreLimit = attr.originScoreLimit || 2;
    const asiPoolLimit = attr.asiPoolLimit || 0;
    const originEligible = attr.originEligible || [];

    // 1. Allocated (Point Buy)
    let allocated = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    if (preset?.stats?.allocated) {
        allocated = { ...preset.stats.allocated };
    } else {
        // Standard priority spread: 7, 7, 5, 2, 0, 0 = 21
        const spreads = [7, 7, 5, 2, 0, 0];
        priority.forEach((s, idx) => {
            allocated[s] = spreads[idx] || 0;
        });
    }

    // Ensure total equals pointBuyLimit and no stat exceeds pointBuyScoreLimit
    let allocatedSum = statsList.reduce((sum, s) => sum + (allocated[s] || 0), 0);
    for (const s of statsList) {
        if (allocated[s] > pointBuyScoreLimit) {
            allocatedSum -= (allocated[s] - pointBuyScoreLimit);
            allocated[s] = pointBuyScoreLimit;
        }
    }

    while (allocatedSum < pointBuyLimit) {
        const targetStat = priority.find(s => allocated[s] < pointBuyScoreLimit);
        if (!targetStat) break;
        allocated[targetStat]++;
        allocatedSum++;
    }

    while (allocatedSum > pointBuyLimit) {
        const reversePriority = [...priority].reverse();
        const targetStat = reversePriority.find(s => allocated[s] > 0);
        if (!targetStat) break;
        allocated[targetStat]--;
        allocatedSum--;
    }

    // 2. Origin Pool (+3 from Background)
    const origin = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    const eligiblePool = (originEligible && originEligible.length > 0)
        ? priority.filter(s => originEligible.includes(s))
        : priority;

    let remainingOrigin = originPoolLimit;
    for (const stat of eligiblePool) {
        if (remainingOrigin <= 0) break;
        const add = Math.min(remainingOrigin, originScoreLimit);
        origin[stat] += add;
        remainingOrigin -= add;
    }

    // 3. ASI Pool (from Feats)
    const asi = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    let remainingAsi = asiPoolLimit;

    while (remainingAsi > 0) {
        // Pick highest priority stat whose total (8 + allocated + origin + asi) < 20
        const targetStat = priority.find(s => (8 + allocated[s] + origin[s] + asi[s]) < 20);
        if (!targetStat) break;
        asi[targetStat]++;
        remainingAsi--;
    }

    return { allocated, origin, asi };
}
