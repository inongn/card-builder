import { ExpressionEvaluator } from '../engine/RpgEngine';

export const CATEGORIES = {
    origin: { title: 'Origin', terms: ['name', 'species', 'lineage', 'background', 'ancestry', 'legacy'], icon: 'person', order: 1 },
    class: { title: 'Class', terms: ['class', 'level', 'subclass', 'maneuver', 'order', 'classOption'], icon: 'person', order: 2 },
    feats: { title: 'Feats', terms: ['feat', 'epicboon', 'fightingstyle'], icon: 'emoji_events', order: 3 },
    spellcasting: { title: 'Spellcasting', terms: ['cantrip', 'spell'], icon: 'auto_fix_high', order: 4 },
    skills: { title: 'Skills', terms: ['proficiency'], icon: 'psychology', order: 7 },
    expertise: { title: 'Expertise', terms: ['expertise'], icon: 'workspace_premium', order: 8 },
    equipment: { title: 'Equipment', terms: ['armor', 'weapon', 'hand'], icon: 'shield', order: 9 },
    stats: { title: 'Abilities', terms: ['str', 'dex', 'con', 'int', 'wis', 'cha', 'allocated', 'origin_', 'asi_'], icon: 'fitness_center', order: 10 }
};

export const MATCHING_ORDER = ['spellcasting', 'class', 'origin', 'feats', 'expertise', 'skills', 'equipment', 'stats'];

export const collectRenderableNodes = (node, char, path = []) => {
    const nodes = [];
    if (node.condition) {
        const evaluator = new ExpressionEvaluator(char);
        if (!evaluator.evaluate(node.condition)) return nodes;
    }

    if (node.type === 'Input' || node.type === 'Slot') {
        nodes.push({ type: node.type, node: node, path: [...path] });
    }

    if (node.children && Array.isArray(node.children)) {
        node.children.forEach((child, index) => {
            nodes.push(...collectRenderableNodes(child, char, [...path, index]));
        });
    }
    return nodes;
};

export const categorizeNode = (item) => {
    let searchText = '';
    if (item.type === 'Slot') {
        const target = item.node.target;
        searchText = Array.isArray(target) ? target.join(' ').toLowerCase() : String(target || '').toLowerCase();
    } else {
        searchText = (item.node.name || '').toLowerCase();
    }

    for (const key of MATCHING_ORDER) {
        const category = CATEGORIES[key];
        if (category.terms.some(term => searchText.includes(term))) return key;
    }
    return null;
};

export const getAvailableCategories = (tree, char) => {
    if (!tree) return [];
    const renderableNodes = collectRenderableNodes(tree, char);
    const availableCategories = new Set();

    renderableNodes.forEach(item => {
        // Stats is always available if any stat-related input exists
        const match = item.node.name.match(/^(allocated|origin|asi)_(str|dex|con|int|wis|cha)$/);
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
