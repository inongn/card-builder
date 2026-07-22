import { ExpressionEvaluator } from '../engine/RpgEngine';

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

    // Class
    level: { title: 'Level', category: 'class', terms: ['level'] },
    class: { title: 'Class', category: 'class', terms: ['class'] },
    subclass: { title: 'Subclass', category: 'class', terms: ['subclass'] },
    classOptions: { title: 'Class Options', category: 'class', terms: ['classoption', 'invocation', 'order', 'fury', 'metamagic', 'maneuver', 'land', 'blessed', 'hunter', 'defensive', 'affinity', 'pact'] },
    feats: { title: 'Feats', category: 'class', terms: ['feat', 'epicboon', 'fightingstyle'] },

    // Abilities
    stats: { title: 'Ability Scores', category: 'abilities', terms: ['str', 'dex', 'con', 'int', 'wis', 'cha', 'allocated', 'origin_', 'asi_'] },
    saves: { title: 'Saving Throws', category: 'abilities', terms: ['strsave', 'dexsave', 'consave', 'intsave', 'wissave', 'chasave', 'savingthrow', 'saveproficiencies', 'saveproficiency'] },
    skills: { title: 'Skills', category: 'abilities', terms: ['proficiency'] },
    expertise: { title: 'Expertise', category: 'abilities', terms: ['expertise'] },
    tools: { title: 'Tools', category: 'abilities', terms: ['tool'] },

    // Arsenal
    spellcasting: { title: 'Spellcasting', category: 'arsenal', terms: ['cantrip', 'spell'] },
    equipment: { title: 'Equipment', category: 'arsenal', terms: ['armor', 'weapon', 'armament', 'hand'] },
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
    'equipment',
    'stats'
];

export const collectRenderableNodes = (node, char, path = [], logicalPath = []) => {
    const nodes = [];
    if (node.condition) {
        const evaluator = new ExpressionEvaluator(char);
        if (!evaluator.evaluate(node.condition)) return nodes;
    }

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
            nodes.push(...collectRenderableNodes(child, char, [...path, index], currentLogicalPath));
        });
    }
    return nodes;
};

export const categorizeNode = (item) => {
    let searchText = '';
    if (item.type === 'Slot') {
        const target = item.node.target;
        searchText = Array.isArray(target) ? target.join(' ').toLowerCase() : String(target || '').toLowerCase();
        searchText += ' ' + (item.node.name || '').toLowerCase() + ' ' + (item.node.id || '').toLowerCase();
    } else {
        searchText = (item.node.name || '').toLowerCase() + ' ' + (item.node.id || '').toLowerCase();
    }

    for (const stepKey of MATCHING_ORDER) {
        const stepDef = STEP_DEFINITIONS[stepKey];
        if (stepDef && stepDef.terms.some(term => searchText.includes(term))) {
            return stepKey;
        }
    }
    return null;
};

export const getAvailableCategories = (tree, char) => {
    if (!tree) return [];
    const renderableNodes = collectRenderableNodes(tree, char);
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

export const isBuilderComplete = (tree, char) => {
    if (!tree) return true;
    const nodes = collectRenderableNodes(tree, char);

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

export const getCategoryStats = (tree, char) => {
    const stats = {};
    if (!tree) return stats;

    const nodes = collectRenderableNodes(tree, char);
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
        return tags.includes('landType') || tags.includes('elementalFury') || tags.includes('primalOrder') || tags.includes('divineOrder') || tags.includes('blessedStrikes');
    });

    if (isClassOption) {
        const getClassOptionCategory = (opt) => {
            const tags = opt.tags || [];
            if (tags.includes('primalOrder') || tags.includes('divineOrder')) return 1;
            if (tags.includes('elementalFury') || tags.includes('blessedStrikes')) return 2;
            if (tags.includes('circleLand')) return 3;
            return 3;
        };
        return [...resolvedOpts].sort((a, b) => {
            const catA = getClassOptionCategory(a);
            const catB = getClassOptionCategory(b);
            if (catA !== catB) return catA - catB;
            return (a.displayName || a.name || '').localeCompare(b.displayName || b.name || '');
        });
    }

    const isShield = (opt) => (opt.tags || []).includes('shield');
    const isUnarmored = (opt) => (opt.tags || []).includes('unarmored');

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

    const expr = (Array.isArray(tagSource) ? tagSource.join(' OR ') : String(tagSource)).toLowerCase();

    const orGroups = expr.split(/\s+or\s+/);
    return orGroups.some(group => {
        const andTokens = group.split(/\s+and\s+/).map(t => t.trim().replace(/^\(|\)$/g, ''));
        return andTokens.every(token => {
            if (!token) return true;
            if (token.startsWith('not ')) {
                const notToken = token.slice(4).trim();
                return !optTags.has(notToken);
            }
            return optTags.has(token);
        });
    });
};

export const getSlotAllowedMap = (slotItems, allCategoryOptionsMap, handleGetSlotOptions) => {
    const slotAllowedMap = new Map();

    slotItems.forEach(item => {
        const allowed = new Set();
        const opts = handleGetSlotOptions ? handleGetSlotOptions(item.node) : [];
        (opts || []).forEach(o => allowed.add(o.id));
        if (item.node.filled?.id) allowed.add(item.node.filled.id);

        for (const [optId, entry] of allCategoryOptionsMap.entries()) {
            if (!allowed.has(optId)) {
                if (matchesSlotTagExpression(entry.option, item.node)) {
                    allowed.add(optId);
                }
            }
        }
        slotAllowedMap.set(item, allowed);
    });

    return slotAllowedMap;
};

export const canMatchChoicesToSlots = (choiceIds, slotItems, slotAllowedMap) => {
    if (choiceIds.length > slotItems.length) return false;
    if (choiceIds.length === 0) return true;

    const visitedSlots = new Array(slotItems.length).fill(false);

    const tryMatch = (choiceIndex) => {
        if (choiceIndex >= choiceIds.length) return true;
        const choiceId = choiceIds[choiceIndex];

        for (let s = 0; s < slotItems.length; s++) {
            if (!visitedSlots[s]) {
                const allowed = slotAllowedMap.get(slotItems[s]);
                if (allowed && allowed.has(choiceId)) {
                    visitedSlots[s] = true;
                    if (tryMatch(choiceIndex + 1)) return true;
                    visitedSlots[s] = false;
                }
            }
        }
        return false;
    };

    return tryMatch(0);
};

export const findMatchingForChoices = (choiceIds, slotItems, slotAllowedMap) => {
    if (choiceIds.length > slotItems.length) return null;

    const slotIndices = slotItems.map((_, i) => i);
    slotIndices.sort((a, b) => {
        const sizeA = slotAllowedMap.get(slotItems[a])?.size || 0;
        const sizeB = slotAllowedMap.get(slotItems[b])?.size || 0;
        return sizeA - sizeB;
    });

    const assignment = new Array(choiceIds.length).fill(-1);
    const usedSlots = new Array(slotItems.length).fill(false);

    const backtrack = (idx) => {
        if (idx >= choiceIds.length) return true;
        const choiceId = choiceIds[idx];

        for (const s of slotIndices) {
            if (!usedSlots[s]) {
                const allowed = slotAllowedMap.get(slotItems[s]);
                if (allowed && allowed.has(choiceId)) {
                    usedSlots[s] = true;
                    assignment[idx] = s;
                    if (backtrack(idx + 1)) return true;
                    usedSlots[s] = false;
                    assignment[idx] = -1;
                }
            }
        }
        return false;
    };

    if (backtrack(0)) {
        const result = new Map();
        choiceIds.forEach((cId, i) => {
            result.set(cId, slotItems[assignment[i]]);
        });
        return result;
    }

    return null;
};

export const aggregateCategoryOptions = (slotItems, handleGetSlotOptions, onGetProperty) => {
    if (!slotItems || slotItems.length === 0) return [];

    const optMap = new Map();

    slotItems.forEach(slotItem => {
        const slotNode = slotItem.node;
        let opts = handleGetSlotOptions ? handleGetSlotOptions(slotNode) : [];
        if (!opts) opts = [];

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
            if (!optMap.has(opt.id)) {
                optMap.set(opt.id, {
                    option: { ...fullOpt, displayName: fullOpt.displayName || fullOpt.name },
                    candidateSlotItems: [],
                    filledSlotItem: null
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

    const slotAllowedMap = getSlotAllowedMap(slotItems, optMap, handleGetSlotOptions);
    const currentChoiceIds = slotItems.map(s => s.node.filled?.id).filter(Boolean);

    const aggregated = Array.from(optMap.values()).map(entry => {
        const isSelected = !!entry.filledSlotItem;
        const testChoices = isSelected ? currentChoiceIds : [...currentChoiceIds, entry.option.id];
        const isDisabled = !isSelected && !canMatchChoicesToSlots(testChoices, slotItems, slotAllowedMap);

        return {
            ...entry.option,
            isSelected,
            isDisabled,
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
        return (opts || []).some(o => o.id === optionId);
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

