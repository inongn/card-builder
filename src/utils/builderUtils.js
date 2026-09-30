import { ExpressionEvaluator } from '../engine/RpgEngine.js';

export const CATEGORIES = {
    origin: { title: 'Origin', icon: 'person', order: 1 },
    class: { title: 'Class', icon: 'school', order: 2 },
    abilities: { title: 'Abilities', icon: 'fitness_center', order: 3 },
    arsenal: { title: 'Arsenal', icon: 'shield', order: 4 }
};

export const STEP_DEFINITIONS = {
    // Origin
    name: { title: 'Name', category: 'origin', terms: ['name'] },
    species: { title: 'Species', category: 'origin', terms: ['species'] },
    lineage: { title: 'Lineage', category: 'origin', terms: ['lineage', 'ancestry', 'legacy'] },
    background: { title: 'Background', category: 'origin', terms: ['background'] },
    image: { title: 'Portrait', category: 'origin', terms: ['image', 'portrait'] },

    // Class
    level: { title: 'Level', category: 'class', terms: ['level'] },
    class: { title: 'Class', category: 'class', terms: ['class'] },
    subclass: { title: 'Subclass', category: 'class', terms: ['subclass'] },
    classOptions: { title: 'Class Options', category: 'class', terms: ['vestigeType', 'classoption', 'invocation', 'order', 'fury', 'metamagic', 'maneuver', 'landtype', 'armormodel','blessedstrikes', 'huntersPrey', 'defensiveTactics', 'affinity', 'dreadallegianceo', 'aspectOfTheWilds'] },
    feats: { title: 'Feats', category: 'class', terms: ['feat', 'epicboon', 'fightingstyle'] },

    // Abilities
    stats: { title: 'Ability Scores', category: 'abilities', terms: ['str', 'dex', 'con', 'int', 'wis', 'cha', 'allocated', 'origin_', 'asi_'] },
    saves: { title: 'Saving Throws', category: 'abilities', terms: ['strsave', 'dexsave', 'consave', 'intsave', 'wissave', 'chasave', 'savingthrow', 'saveproficiencies', 'saveproficiency'] },
    skills: { title: 'Skills', category: 'abilities', terms: ['proficiency'] },
    expertise: { title: 'Expertise', category: 'abilities', terms: ['expertise'] },
    tools: { title: 'Tools', category: 'abilities', terms: ['tool'] },

    // Arsenal
    spellcasting: { title: 'Spellcasting', category: 'arsenal', terms: ['cantrip', 'spell'] },
    equipment: { title: 'Equipment', category: 'arsenal', terms: ['armor', 'weapon', 'armament'] },
    companion: { title: 'Companion', category: 'arsenal', terms: ['companion', 'primalcompanion'] },
    steed: { title: 'Steed', category: 'arsenal', terms: ['steed'] },
    familiar: { title: 'Familiar', category: 'arsenal', terms: ['familiar'] }
};

export const getCategoryForStep = (stepKey) => {
    return STEP_DEFINITIONS[stepKey]?.category || null;
};

export const getItemUniqueId = (item) => {
    if (!item) return '';
    if (item.type === 'Abilities') return 'abilities-stats';
    if (item.type === 'Ally') return `ally-${item.allyType}`;
    if (item.type === 'MergedCategory') return `merged-${item.step || item.id || item.category}`;
    if (item.type === 'Group') return `group-${item.id}`;
    if (item.type === 'Input') return `input-${item.node?.id || item.node?.name || (item.path ? item.path.join('-') : '')}`;
    if (item.type === 'Slot') {
        if (item.logicalPath) return `slot-${JSON.stringify(item.logicalPath)}`;
        return `slot-${item.node?.id || item.node?.name || (item.path ? item.path.join('-') : '')}`;
    }
    return JSON.stringify(item);
};

export const isSameSlotItem = (a, b) => {
    if (a === b) return true;
    if (!a || !b) return false;
    return getItemUniqueId(a) === getItemUniqueId(b);
};

export const MATCHING_ORDER = [
    'image',
    'lineage',
    'spellcasting',
    'feats',
    'familiar',
    'steed',
    'companion',
    'classOptions',
    'subclass',
    'class',
    'species',
    'background',
    'name',
    'level',
    'tools',
    'saves',
    'skills',
    'expertise',
    'stats',
      'equipment',

];

/**
 * Safely evaluates whether a given node's condition evaluates to true,
 * mirroring the exact truthiness logic used in the CharacterBuilder.
 */
export const isNodeConditionMet = (node, char, evaluator = null) => {
    if (!node) return false;

    // Respect the visibility flag calculated by the CharacterBuilder engine
    if (node.visible === false) return false;

    // If it has a condition and character data is available, evaluate strictly
    if (node.condition && char) {
        try {
            const ev = evaluator || new ExpressionEvaluator(char);
            const result = ev.evaluate(node.condition);
            // Strict truthiness: treat null, false, undefined, and unresolvable string expressions as false
            return !!result && !(typeof result === 'string' && result.includes('$('));
        } catch {
            return false;
        }
    }

    return true;
};

export const collectRenderableNodes = (node, char, path = [], logicalPath = [], evaluator = null) => {
    const ev = evaluator || (char ? new ExpressionEvaluator(char) : null);
    const nodes = [];
    if (!isNodeConditionMet(node, char, ev)) return nodes;

    const step = { id: node.id || node.name, slotIndex: node.slotIndex };
    const currentLogicalPath = [...logicalPath, step];

    if (node.type === 'Input' || node.type === 'Slot') {
        nodes.push({
            type: node.type,
            node: node,
            path: [...path],
            logicalPath: currentLogicalPath
        });
    }

    if (node.children && Array.isArray(node.children)) {
        node.children.forEach((child, index) => {
            nodes.push(...collectRenderableNodes(child, char, [...path, index], currentLogicalPath, ev));
        });
    }
    return nodes;
};

export const categorizeNode = (item) => {
    if (!item) return null;
    const node = item.node || item;
    const type = item.type || node.type;

    let searchText = '';
    if (type === 'Slot') {
        const target = node.target;
        searchText = Array.isArray(target) ? target.join(' ').toLowerCase() : String(target || '').toLowerCase();
        searchText += ' ' + (node.name || '').toLowerCase() + ' ' + (node.id || '').toLowerCase();
    } else {
        searchText = (node.name || '').toLowerCase() + ' ' + (node.id || '').toLowerCase();
        if (node.tags) {
            searchText += ' ' + (Array.isArray(node.tags) ? node.tags.join(' ') : String(node.tags)).toLowerCase();
        }
        if (node.target) {
            searchText += ' ' + (Array.isArray(node.target) ? node.target.join(' ') : String(node.target)).toLowerCase();
        }
        if (node.resource) {
            searchText += ' ' + String(node.resource).toLowerCase();
        }
        if (node.type) {
            searchText += ' ' + String(node.type).toLowerCase();
        }
    }

    for (const stepKey of MATCHING_ORDER) {
        const stepDef = STEP_DEFINITIONS[stepKey];
        if (stepDef && stepDef.terms.some(term => searchText.includes(term))) {
            return stepKey;
        }
    }
    return null;
};

export const getAvailableCategories = (tree, char, precomputedNodes = null) => {
    if (!tree) return [];
    const renderableNodes = precomputedNodes || collectRenderableNodes(tree, char);
    const availableCategories = new Set();

    renderableNodes.forEach(item => {
        const match = item.node.name.match(/^(allocated|origin|asi)_(str|dex|con|int|wis|cha)$/);
        if (match) {
            availableCategories.add('abilities');
            return;
        }

        const stepKey = categorizeNode(item);
        if (stepKey) {
            const categoryKey = getCategoryForStep(stepKey);
            if (categoryKey) {
                availableCategories.add(categoryKey);
            }
        }
    });

    return Array.from(availableCategories);
};

export const isBuilderComplete = (tree, char, precomputedNodes = null) => {
    if (!tree) return true;
    const nodes = precomputedNodes || collectRenderableNodes(tree, char);

    // 1. Check all Slots are filled
    const hasUnfilledSlot = nodes.some(item => item.type === 'Slot' && !item.node.filled);
    if (hasUnfilledSlot) return false;

    // 2. Check all relevant Inputs are filled (especially 'name')
    const nameNode = nodes.find(item => item.node.name === 'name');
    if (nameNode && !nameNode.node.value && !nameNode.node.default) return false;

    // 3. Check Ability/Stat pools are fully spent
    const attr = char.attributes || {};
    const meta = char.meta || {};
    const statsList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

    const allocatedSum = statsList.reduce((sum, s) => sum + (meta[`allocated_${s}`] || 0), 0);
    if (allocatedSum < (attr.pointBuyLimit || 0)) return false;

    const originSum = statsList.reduce((sum, s) => sum + (meta[`origin_${s}`] || 0), 0);
    if (originSum < (attr.originPoolLimit || 0)) return false;

    const asiSum = statsList.reduce((sum, s) => sum + (meta[`asi_${s}`] || 0), 0);
    if (asiSum < (attr.asiPoolLimit || 0)) return false;

    return true;
};

export const getCategoryStats = (tree, char, precomputedNodes = null) => {
    const stats = {};
    if (!tree) return stats;

    const nodes = precomputedNodes || collectRenderableNodes(tree, char);
    const attr = char.attributes || {};
    const meta = char.meta || {};
    const statsList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

    // Initialize stats for each top-level category and step
    Object.keys(CATEGORIES).forEach(key => {
        stats[key] = { pending: 0, isComplete: true };
    });
    Object.keys(STEP_DEFINITIONS).forEach(key => {
        stats[key] = { pending: 0, isComplete: true };
    });

    nodes.forEach(item => {
        const stepKey = categorizeNode(item);
        if (!stepKey) return;
        const categoryKey = getCategoryForStep(stepKey);

        if (item.type === 'Slot') {
            if (!item.node.filled) {
                if (stats[stepKey]) {
                    stats[stepKey].pending++;
                    stats[stepKey].isComplete = false;
                }
                if (categoryKey && stats[categoryKey]) {
                    stats[categoryKey].pending++;
                    stats[categoryKey].isComplete = false;
                }
            }
        }
    });

    // Special handling for Stats category (Ability pools)
    const allocatedSum = statsList.reduce((sum, s) => sum + (meta[`allocated_${s}`] || 0), 0);
    const originSum = statsList.reduce((sum, s) => sum + (meta[`origin_${s}`] || 0), 0);
    const asiSum = statsList.reduce((sum, s) => sum + (meta[`asi_${s}`] || 0), 0);

    let statsPending = 0;
    if (allocatedSum < (attr.pointBuyLimit || 0)) statsPending += (attr.pointBuyLimit - allocatedSum);
    if (originSum < (attr.originPoolLimit || 0)) statsPending += (attr.originPoolLimit - originSum);
    if (asiSum < (attr.asiPoolLimit || 0)) statsPending += (attr.asiPoolLimit - asiSum);

    if (stats['stats']) {
        stats['stats'].pending += statsPending;
        if (statsPending > 0) stats['stats'].isComplete = false;
    }
    if (stats['abilities']) {
        stats['abilities'].pending += statsPending;
        if (statsPending > 0) stats['abilities'].isComplete = false;
    }

    return stats;
};

export const MERGED_CATEGORIES = ['skills', 'expertise', 'tools', 'saves', 'spellcasting', 'equipment', 'feats', 'classOptions'];

export const getMergedCategorySlotItems = (tree, char, categoryKey) => {
    if (!tree) return [];
    const renderableNodes = collectRenderableNodes(tree, char);
    return renderableNodes.filter(item => item.type === 'Slot' && categorizeNode(item) === categoryKey);
};

export const sortCategoryOptions = (opts, onGetProperty) => {
    const resolvedOpts = opts.map(opt => {
        if (!opt.description && onGetProperty) {
            const full = onGetProperty(opt.id);
            if (full) {
                return {
                    ...opt,
                    ...full,
                    displayName: opt.displayName || opt.name || full.displayName || full.name
                };
            }
        }
        return opt;
    });

    const isSpell = resolvedOpts.some(opt => {
        const tags = opt.tags || [];
        return tags.some(t => t.includes('Spell') || t === 'cantrip') || opt.resource?.toLowerCase().includes('spell');
    });

    if (isSpell) {
        const getSpellLevel = (opt) => {
            const tags = opt.tags || [];
            if (tags.includes('cantrip')) return 0;
            if (tags.includes('level1Spell')) return 1;
            if (tags.includes('level2Spell')) return 2;
            if (tags.includes('level3Spell')) return 3;
            if (tags.includes('level4Spell')) return 4;
            return 99;
        };
        return [...resolvedOpts].sort((a, b) => {
            const lvlA = getSpellLevel(a);
            const lvlB = getSpellLevel(b);
            if (lvlA !== lvlB) return lvlA - lvlB;
            return (a.displayName || a.name || '').localeCompare(b.displayName || b.name || '');
        });
    }

    const isFeat = resolvedOpts.some(opt => {
        const tags = opt.tags || [];
        return tags.some(t => t.includes('feat') || t === 'fightingStyle');
    });

    if (isFeat) {
        const getFeatCategory = (opt) => {
            const tags = opt.tags || [];
            if (tags.includes('fightingStyle')) return 0;
            if (tags.includes('feat')) return 1;
            return 99;
        };
        return [...resolvedOpts].sort((a, b) => {
            const catA = getFeatCategory(a);
            const catB = getFeatCategory(b);
            if (catA !== catB) return catA - catB;
            return (a.displayName || a.name || '').localeCompare(b.displayName || b.name || '');
        });
    }

    const isClassOption = resolvedOpts.some(opt => {
        const tags = opt.tags || [];
        return tags.includes('landType') || tags.includes('elementalFury') || tags.includes('primalOrder') || tags.includes('divineOrder') || tags.includes('blessedStrikes') || tags.includes('elementalAffinity') || tags.includes('metamagic') || tags.includes('eldritchInvocation') || tags.includes('vestigeType');
    });

    if (isClassOption) {
        const getClassOptionCategory = (opt) => {
            const tags = opt.tags || [];
            if (tags.includes('primalOrder') || tags.includes('divineOrder') || tags.includes('metamagic') || tags.includes('eldritchInvocation')) return 1;
            if (tags.includes('elementalFury') || tags.includes('blessedStrikes') || tags.includes('elementalAffinity')) return 2;
            if (tags.includes('circleLand') || tags.includes('vestigeType')) return 3;
            return 3;
        };
        return [...resolvedOpts].sort((a, b) => {
            const catA = getClassOptionCategory(a);
            const catB = getClassOptionCategory(b);
            if (catA !== catB) return catA - catB;
            return (a.displayName || a.name || '').localeCompare(b.displayName || b.name || '');
        });
    }

    const isShield = (opt) => (opt.tags || []).includes('shield') || (opt.tags || []).includes('shieldEquipment') || opt.id === 'shieldEquipment';
    const isUnarmored = (opt) => (opt.tags || []).includes('unarmored') || opt.id === 'unarmored';

    const getArmamentCategory = (opt) => {
        if (isShield(opt)) return null;

        const tags = opt.tags || [];
        const vars = opt.variables || {};
        const category = (vars.category || '').toLowerCase();
        const classification = (vars.classification || '').toLowerCase();

        const isWep = vars.classification || vars.damageRoll || tags.includes('martial') || tags.includes('simple');
        if (isWep) {
            let cat = '';
            if (category === 'simple' || tags.includes('simple')) cat = 'simple';
            else if (category === 'martial' || tags.includes('martial')) cat = 'martial';

            let cls = '';
            if (classification === 'melee' || classification === 'thrown' || classification === 'finesse' || tags.includes('melee')) cls = 'melee';
            else if (classification === 'ranged' || tags.includes('ranged')) cls = 'ranged';

            if (cat && cls) return `${cat}-${cls}`;
            if (cat) return cat;
        }

        return null;
    };

    const getEquipmentCategory = (opt) => {
        if (isUnarmored(opt)) return 'unarmored';

        const tags = opt.tags || [];
        if (tags.includes('lightArmor')) return 'light';
        if (tags.includes('mediumArmor')) return 'medium';
        if (tags.includes('heavyArmor')) return 'heavy';

        const armCat = getArmamentCategory(opt);
        if (armCat) return armCat;

        if (isShield(opt)) return 'shield';

        return null;
    };

    const hasEquipment = resolvedOpts.some(opt => getEquipmentCategory(opt) !== null);

    if (hasEquipment) {
        return [...resolvedOpts].sort((a, b) => {
            const catA = getEquipmentCategory(a);
            const catB = getEquipmentCategory(b);

            const getSortValue = (cat) => {
                if (cat === 'unarmored') return 1;
                if (cat === 'light') return 2;
                if (cat === 'medium') return 3;
                if (cat === 'heavy') return 4;
                if (cat === 'simple-melee') return 5;
                if (cat === 'simple-ranged') return 6;
                if (cat === 'martial-melee') return 7;
                if (cat === 'martial-ranged') return 8;
                if (cat === 'shield') return 9;
                return 99;
            };

            const valA = getSortValue(catA);
            const valB = getSortValue(catB);

            if (valA !== valB) return valA - valB;

            return (a.displayName || a.name || '').localeCompare(b.displayName || b.name || '');
        });
    }

    return [...resolvedOpts].sort((a, b) => (a.displayName || a.name || '').localeCompare(b.displayName || b.name || ''));
};

export const matchesSlotTagExpression = (opt, slotNode) => {
    if (!opt || !slotNode) return false;
    const tagSource = slotNode.target || slotNode.tags;
    if (!tagSource) return true;

    const optTags = new Set((opt.tags || []).map(t => String(t).toLowerCase()));
    if (opt.id) optTags.add(String(opt.id).toLowerCase());

    const expr = (Array.isArray(tagSource) ? tagSource.join(' OR ') : String(tagSource))
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .replace(/,/g, ' OR ')
        .trim();

    const tokens = expr.split(/\s+/).filter(Boolean);
    let pos = 0;

    const parseOr = () => {
        let val = parseAnd();
        while (pos < tokens.length && tokens[pos].toUpperCase() === 'OR') {
            pos++;
            const right = parseAnd();
            val = val || right;
        }
        return val;
    };

    const parseAnd = () => {
        let val = parseNot();
        while (pos < tokens.length) {
            const tok = tokens[pos].toUpperCase();
            if (tok === 'OR' || tok === ')') break;
            if (tok === 'AND') {
                pos++;
            }
            const right = parseNot();
            val = val && right;
        }
        return val;
    };

    const parseNot = () => {
        if (pos < tokens.length && tokens[pos].toUpperCase() === 'NOT') {
            pos++;
            return !parseNot();
        }
        return parseAtom();
    };

    const parseAtom = () => {
        if (pos >= tokens.length) return false;
        const tok = tokens[pos];
        if (tok === '(') {
            pos++;
            const val = parseOr();
            if (pos < tokens.length && tokens[pos] === ')') pos++;
            return val;
        }
        pos++;
        return optTags.has(tok.toLowerCase());
    };

    return parseOr();
};

export const getSlotAllowedMap = (slotItems, allCategoryOptionsMap, handleGetSlotOptions, char) => {
    const slotAllowedMap = new Map();

    slotItems.forEach(item => {
        const allowed = new Set();
        let opts = handleGetSlotOptions ? handleGetSlotOptions(item.node) : [];
        if (opts) {
            opts = opts.filter(o => isNodeConditionMet(o, char));
        }

        (opts || []).forEach(o => allowed.add(o.id));
        if (item.node.filled?.id) allowed.add(item.node.filled.id);

        for (const [optId, entry] of allCategoryOptionsMap.entries()) {
            if (!allowed.has(optId)) {
                if (isNodeConditionMet(entry.option, char) && matchesSlotTagExpression(entry.option, item.node)) {
                    allowed.add(optId);
                }
            }
        }
        slotAllowedMap.set(item, allowed);
    });

    return slotAllowedMap;
};

export const findMatchingForChoices = (choiceIds, slotItems, slotAllowedMap) => {
    if (!choiceIds || !slotItems) return null;
    if (choiceIds.length > slotItems.length) return null;
    if (choiceIds.length === 0) return new Map();

    const numChoices = choiceIds.length;
    const numSlots = slotItems.length;

    // Build adjacency list: choice index -> array of slot indices
    const adj = new Array(numChoices);
    for (let c = 0; c < numChoices; c++) {
        const cId = choiceIds[c];
        const allowedSlots = [];
        for (let s = 0; s < numSlots; s++) {
            const allowed = slotAllowedMap.get(slotItems[s]);
            if (allowed && allowed.has(cId)) {
                // If this slot currently holds this choice, prioritize it to preserve existing assignments
                if (slotItems[s].node?.filled?.id === cId) {
                    allowedSlots.unshift(s);
                } else {
                    allowedSlots.push(s);
                }
            }
        }
        if (allowedSlots.length === 0) return null;
        adj[c] = allowedSlots;
    }

    // Sort choice indices by degree (most constrained choices first)
    const choiceOrder = Array.from({ length: numChoices }, (_, i) => i)
        .sort((a, b) => adj[a].length - adj[b].length);

    // matchSlot[s] = choice index currently assigned to slot s (-1 if unassigned)
    const matchSlot = new Array(numSlots).fill(-1);

    function dfs(c, visited) {
        for (const s of adj[c]) {
            if (!visited[s]) {
                visited[s] = true;
                if (matchSlot[s] === -1 || dfs(matchSlot[s], visited)) {
                    matchSlot[s] = c;
                    return true;
                }
            }
        }
        return false;
    }

    const visited = new Array(numSlots);
    for (const c of choiceOrder) {
        visited.fill(false);
        if (!dfs(c, visited)) {
            return null;
        }
    }

    const result = new Map();
    for (let s = 0; s < numSlots; s++) {
        const c = matchSlot[s];
        if (c !== -1) {
            result.set(choiceIds[c], slotItems[s]);
        }
    }
    return result;
};

export const canMatchChoicesToSlots = (choiceIds, slotItems, slotAllowedMap) => {
    if (!choiceIds || !slotItems) return false;
    if (choiceIds.length > slotItems.length) return false;
    if (choiceIds.length === 0) return true;
    return findMatchingForChoices(choiceIds, slotItems, slotAllowedMap) !== null;
};

export const isValidHardcodedOption = (node, categoryKey) => {
    if (!node) return false;

    const nodeType = (node.type || '').toLowerCase();
    if (nodeType === 'slot' || nodeType === 'input' || nodeType === 'resource' || nodeType === 'attribute') {
        return false;
    }
    if (nodeType === 'effect' && !['skills', 'expertise', 'tools', 'saves'].includes(categoryKey)) {
        return false;
    }

    const nodeId = String(node.id || node.name || '').toLowerCase();
    const tags = new Set((node.tags || []).map(t => String(t).toLowerCase()));
    const target = String(node.target || '').toLowerCase();

    // Ignore generic features/slots/resources by name/id
    if (nodeId.includes('slot') || nodeId.includes('spellcasting') || nodeId.includes('hitdie') || nodeId.includes('classname') || nodeId.includes('weaponproficiency') || nodeId.includes('training') || nodeId.includes('breathweapon') || nodeId.includes('mastery') || nodeId.includes('unarmed')) {
        return false;
    }

    if (categoryKey === 'spellcasting') {
        const isSpellTag = tags.has('cantrip') || tags.has('level1spell') || tags.has('level2spell') ||
            tags.has('level3spell') || tags.has('level4spell') || tags.has('level5spell') ||
            tags.has('level6spell') || tags.has('level7spell') || tags.has('level8spell') ||
            tags.has('level9spell') || tags.has('spell');
        const isActivitySpell = nodeType === 'activity' && (tags.size === 0 || isSpellTag || (node.resource && String(node.resource).toLowerCase().includes('spell')));
        return isSpellTag || isActivitySpell;
    }

    if (categoryKey === 'skills') {
        return tags.has('skillproficiency') || target.startsWith('skills.') || nodeId.endsWith('proficiency');
    }

    if (categoryKey === 'expertise') {
        return tags.has('skillexpertise') || nodeId.endsWith('expertise');
    }

    if (categoryKey === 'tools') {
        return tags.has('tool') || tags.has('toolproficiency') || target === 'attributes.tools' || nodeId.endsWith('tools') || nodeId.endsWith('kit');
    }

    if (categoryKey === 'feats') {
        return tags.has('feat') || tags.has('originfeat') || tags.has('generalfeat') || tags.has('fightingstyle') || tags.has('epicboon');
    }

    if (categoryKey === 'saves') {
        return tags.has('saveproficiency') || tags.has('savingthrow') || target.includes('save');
    }

    if (nodeType === 'folder' && !tags.has('feat') && !tags.has('originfeat') && !tags.has('generalfeat') && !tags.has('fightingstyle')) {
        return false;
    }

    return true;
};

export const getMergedCategoryHardcodedNodes = (tree, char, stepKey) => {
    if (!tree) return [];

    const filledSlotPropertyIds = new Set();
    const collectFilledSlotIds = (node) => {
        if (!node) return;
        if (!isNodeConditionMet(node, char)) return;

        if (node.type === 'Slot' && node.filled?.id) {
            filledSlotPropertyIds.add(node.filled.id);
        }
        if (node.children && Array.isArray(node.children)) {
            node.children.forEach(collectFilledSlotIds);
        }
    };
    collectFilledSlotIds(tree);

    const hardcodedNodes = [];
    const seenIds = new Set();

    const traverse = (node, path = []) => {
        if (!node) return;
        if (!isNodeConditionMet(node, char)) return;

        // Skip traversing into children of slots belonging to the current step,
        // because their selections are user choices in this step, not hardcoded granted features
        if (node.type === 'Slot' && node.filled && categorizeNode(node) === stepKey) {
            return;
        }

        const nodeId = node.id || node.name;
        if (nodeId && !filledSlotPropertyIds.has(nodeId) && !seenIds.has(nodeId)) {
            if (isValidHardcodedOption(node, stepKey)) {
                const nodeCategory = categorizeNode({ type: node.type, node });
                if (nodeCategory === stepKey) {
                    seenIds.add(nodeId);
                    hardcodedNodes.push(node);
                }
            }
        }

        if (node.children && Array.isArray(node.children)) {
            node.children.forEach((child, index) => traverse(child, [...path, index]));
        }
    };

    traverse(tree);
    return hardcodedNodes;
};

export const aggregateCategoryOptions = (slotItems = [], handleGetSlotOptions, onGetProperty, hardcodedNodes = [], char) => {
    if ((!slotItems || slotItems.length === 0) && (!hardcodedNodes || hardcodedNodes.length === 0)) return [];

    const optMap = new Map();
    const hardcodedOptionIds = new Set();

    (slotItems || []).forEach(slotItem => {
        const slotNode = slotItem.node;
        let opts = handleGetSlotOptions ? handleGetSlotOptions(slotNode) : [];
        if (!opts) opts = [];

        // Filter out choices whose reference/node conditions evaluate to false
        opts = opts.filter(opt => isNodeConditionMet(opt, char));

        const currentFilled = slotNode.filled;
        if (currentFilled && !opts.some(o => o.id === currentFilled.id)) {
            opts = [
                ...opts,
                {
                    ...currentFilled,
                    displayName: currentFilled.displayName || currentFilled.name
                }
            ];
        }

        opts.forEach(opt => {
            let fullOpt = opt;
            if (!fullOpt.tags && onGetProperty) {
                const fetched = onGetProperty(opt.id);
                if (fetched) fullOpt = { ...opt, ...fetched };
            }

            if (!isNodeConditionMet(fullOpt, char)) return;

            if (!optMap.has(opt.id)) {
                optMap.set(opt.id, {
                    option: { ...fullOpt, displayName: fullOpt.displayName || fullOpt.name },
                    candidateSlotItems: [],
                    filledSlotItem: null,
                    isHardcoded: false
                });
            }

            const entry = optMap.get(opt.id);
            if (!entry.candidateSlotItems.some(s => JSON.stringify(s.logicalPath) === JSON.stringify(slotItem.logicalPath))) {
                entry.candidateSlotItems.push(slotItem);
            }

            if (slotNode.filled?.id === opt.id) {
                entry.filledSlotItem = slotItem;
            }
        });
    });

    (hardcodedNodes || []).forEach(hNode => {
        if (!isNodeConditionMet(hNode, char)) return;

        const hId = hNode.id || hNode.name;
        if (!hId) return;

        hardcodedOptionIds.add(hId);

        let fullOpt = hNode;
        if (onGetProperty) {
            const fetched = onGetProperty(hId);
            if (fetched) fullOpt = { ...hNode, ...fetched };
        }

        if (!isNodeConditionMet(fullOpt, char)) return;

        if (!optMap.has(hId)) {
            optMap.set(hId, {
                option: { ...fullOpt, displayName: fullOpt.displayName || fullOpt.name },
                candidateSlotItems: [],
                filledSlotItem: null,
                isHardcoded: true
            });
        } else {
            const entry = optMap.get(hId);
            entry.isHardcoded = true;
            entry.option = { ...entry.option, ...fullOpt, displayName: fullOpt.displayName || fullOpt.name || entry.option.displayName || entry.option.name };
        }
    });

    const slotAllowedMap = getSlotAllowedMap(slotItems || [], optMap, handleGetSlotOptions, char);
    const currentChoiceIds = (slotItems || [])
        .map(s => s.node.filled?.id)
        .filter(id => Boolean(id) && !hardcodedOptionIds.has(id));

    const aggregated = Array.from(optMap.values()).map(entry => {
        if (entry.isHardcoded) {
            return {
                ...entry.option,
                isSelected: true,
                isDisabled: true,
                isHardcoded: true,
                filledSlotPath: null,
                candidateSlotItems: entry.candidateSlotItems
            };
        }

        const isSelected = !!entry.filledSlotItem;
        const testChoices = isSelected ? currentChoiceIds : [...currentChoiceIds, entry.option.id];
        const isDisabled = !!entry.option.isDisabled || (!isSelected && !canMatchChoicesToSlots(testChoices, slotItems || [], slotAllowedMap));

        return {
            ...entry.option,
            isSelected,
            isDisabled,
            isHardcoded: false,
            filledSlotPath: entry.filledSlotItem ? entry.filledSlotItem.path : null,
            candidateSlotItems: entry.candidateSlotItems
        };
    });

    return sortCategoryOptions(aggregated, onGetProperty);
};

export const findOptimalSlotForOption = (optionId, slotItems, handleGetSlotOptions) => {
    const candidateSlots = slotItems.filter(item => {
        if (item.node.filled) return false;
        const opts = handleGetSlotOptions ? handleGetSlotOptions(item.node) : [];
        return (opts || []).some(o => o.id === optionId && !o.isDisabled);
    });

    if (candidateSlots.length === 0) return null;

    // Rank candidate slots by total option count ascending (most restricted slot first)
    candidateSlots.sort((a, b) => {
        const countA = (handleGetSlotOptions ? handleGetSlotOptions(a.node) : []).length;
        const countB = (handleGetSlotOptions ? handleGetSlotOptions(b.node) : []).length;
        return countA - countB;
    });

    return candidateSlots[0].path;
};