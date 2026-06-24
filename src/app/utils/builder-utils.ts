import { ExpressionEvaluator } from '../../engine/ExpressionEvaluator';
import { PropertyNode, CharacterData } from '../../engine/types';

export interface CategoryInfo {
    title: string;
    terms: string[];
    icon: string;
    order: number;
}

export const CATEGORIES: Record<string, CategoryInfo> = {
    origin: { title: 'Origin', terms: ['name', 'species', 'lineage', 'background', 'ancestry', 'legacy'], icon: 'person', order: 1 },
    class: { title: 'Class', terms: ['class', 'level', 'subclass', 'maneuver', 'order', 'classOption'], icon: 'person', order: 2 },
    feats: { title: 'Feats', terms: ['feat', 'epicboon', 'fightingstyle'], icon: 'emoji_events', order: 3 },
    spellcasting: { title: 'Spellcasting', terms: ['cantrip', 'spell'], icon: 'auto_fix_high', order: 4 },
    skills: { title: 'Skills', terms: ['proficiency', 'expertise'], icon: 'psychology', order: 7 },
    equipment: { title: 'Equipment', terms: ['armor', 'weapon', 'armament', 'hand'], icon: 'shield', order: 9 },
    stats: { title: 'Abilities', terms: ['str', 'dex', 'con', 'int', 'wis', 'cha', 'allocated', 'origin_', 'asi_'], icon: 'fitness_center', order: 10 }
};

export const MATCHING_ORDER = ['spellcasting', 'feats', 'class', 'origin', 'skills', 'equipment', 'stats'];

export interface RenderableItem {
    type: string;
    node: PropertyNode;
    path: number[];
}

export const collectRenderableNodes = (node: PropertyNode | null, char: CharacterData | null, path: number[] = []): RenderableItem[] => {
    const nodes: RenderableItem[] = [];
    if (!node) return nodes;

    if (node.condition) {
        const evaluator = new ExpressionEvaluator(char || undefined);
        if (!evaluator.evaluate(node.condition)) return nodes;
    }

    if (node.type === 'Input' || node.type === 'Slot') {
        nodes.push({ type: node.type, node: node, path: [...path] });
    }

    if (node.children && Array.isArray(node.children)) {
        node.children.forEach((child: PropertyNode, index: number) => {
            nodes.push(...collectRenderableNodes(child, char, [...path, index]));
        });
    }
    return nodes;
};

export const categorizeNode = (item: RenderableItem): string | null => {
    let searchText = '';
    if (item.type === 'Slot') {
        const target = item.node.target;
        searchText = Array.isArray(target) ? target.join(' ').toLowerCase() : String(target || '').toLowerCase();
        searchText += ' ' + (item.node.name || '').toLowerCase() + ' ' + (item.node.id || '').toLowerCase();
    } else {
        searchText = (item.node.name || '').toLowerCase();
    }

    for (const key of MATCHING_ORDER) {
        const category = CATEGORIES[key];
        if (category.terms.some(term => searchText.includes(term))) return key;
    }
    return null;
};

export const getAvailableCategories = (tree: PropertyNode | null, char: CharacterData | null): string[] => {
    if (!tree) return [];
    const renderableNodes = collectRenderableNodes(tree, char);
    const availableCategories = new Set<string>();

    renderableNodes.forEach(item => {
        const match = item.node.name ? item.node.name.match(/^(allocated|origin|asi)_(str|dex|con|int|wis|cha)$/) : null;
        if (match) {
            availableCategories.add('stats');
            return;
        }

        const category = categorizeNode(item);
        if (category) {
            availableCategories.add(category);
        }
    });

    return Array.from(availableCategories);
};

export const isBuilderComplete = (tree: PropertyNode | null, char: CharacterData | null): boolean => {
    if (!tree) return true;
    const nodes = collectRenderableNodes(tree, char);

    // 1. Check all Slots are filled
    const hasUnfilledSlot = nodes.some(item => item.type === 'Slot' && !item.node.filled);
    if (hasUnfilledSlot) return false;

    // 2. Check all relevant Inputs are filled (especially 'name')
    const nameNode = nodes.find(item => item.node.name === 'name');
    if (nameNode && !nameNode.node.value && !nameNode.node.default) return false;

    // 3. Check Ability/Stat pools are fully spent
    if (!char) return false;
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

export interface CategoryStats {
    pending: number;
    isComplete: boolean;
}

export const getCategoryStats = (tree: PropertyNode | null, char: CharacterData | null): Record<string, CategoryStats> => {
    const stats: Record<string, CategoryStats> = {};
    
    // Initialize stats for each category
    Object.keys(CATEGORIES).forEach(key => {
        stats[key] = { pending: 0, isComplete: true };
    });

    if (!tree) return stats;

    const nodes = collectRenderableNodes(tree, char);
    if (!char) return stats;
    const attr = char.attributes || {};
    const meta = char.meta || {};
    const statsList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

    // Count pending slots
    nodes.forEach(item => {
        const category = categorizeNode(item);
        if (!category) return;

        if (item.type === 'Slot') {
            if (!item.node.filled) {
                stats[category].pending++;
                stats[category].isComplete = false;
            }
        }
    });

    // Special handling for Stats category (Ability pools)
    const allocatedSum = statsList.reduce((sum, s) => sum + (meta[`allocated_${s}`] || 0), 0);
    const originSum = statsList.reduce((sum, s) => sum + (meta[`origin_${s}`] || 0), 0);
    const asiSum = statsList.reduce((sum, s) => sum + (meta[`asi_${s}`] || 0), 0);

    const statsCategory = stats['stats'];
    if (statsCategory) {
        let statsPending = 0;
        if (allocatedSum < (attr.pointBuyLimit || 0)) statsPending += ((attr.pointBuyLimit ?? 0) - allocatedSum);
        if (originSum < (attr.originPoolLimit || 0)) statsPending += ((attr.originPoolLimit ?? 0) - originSum);
        if (asiSum < (attr.asiPoolLimit || 0)) statsPending += ((attr.asiPoolLimit ?? 0) - asiSum);

        statsCategory.pending += statsPending;
        if (statsPending > 0) statsCategory.isComplete = false;
    }

    return stats;
};
