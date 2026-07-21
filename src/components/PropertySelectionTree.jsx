import React, { useState, useEffect, useMemo } from 'react';
import { ExpressionEvaluator } from '../engine/RpgEngine';
import 'mdui/components/collapse.js';
import 'mdui/components/collapse-item.js';
import 'mdui/components/button-icon.js';
import 'mdui/components/text-field.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/icon.js';
import 'mdui/components/card.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { CATEGORIES, MATCHING_ORDER, collectRenderableNodes, categorizeNode } from '../utils/builderUtils.js';


export default function PropertySelectionTree({
    tree,
    char,
    onUpdateInput,
    onFillSlot,
    onClearSlot,
    onGetSlotOptions,
    filterCategory,
    selectedSlotPath,
    onSelectSlot,
    onGetProperty
}) {
    if (!tree) return null;

    const renderableNodes = collectRenderableNodes(tree, char);

    const STAT_NAMES = {
        str: 'Strength',
        dex: 'Dexterity',
        con: 'Constitution',
        int: 'Intelligence',
        wis: 'Wisdom',
        cha: 'Charisma'
    };

    const renderInputCard = (item) => {
        const { node, path } = item;
        const isActive = selectedSlotPath === JSON.stringify(item.logicalPath);
        const isAbilityInput = node.name.match(/^(allocated|origin|asi)_/);

        let label = node.displayName || node.name;
        if (isAbilityInput) {
            const [prefix, stat] = node.name.split('_');
            const prefixLabel = prefix === 'allocated' ? 'Allocated' : prefix === 'origin' ? 'Origin' : 'ASI';
            label = `${STAT_NAMES[stat.toLowerCase()] || stat.toUpperCase()} (${prefixLabel})`;
        }

        const value = node.value ?? node.default ?? '';

        const handleCardClick = () => {
            if (onSelectSlot) {
                onSelectSlot(item);
            }
        };

        return (
            <mdui-list-item
                key={`input-card-${path.join('-')}`}
                onClick={handleCardClick}
                active={isActive}
                rounded
            >
                {label}
                <span slot="description">
                    {value !== '' ? value : 'Not configured'}
                </span>
            </mdui-list-item>
        );
    };

    const renderSlot = (item) => {
        const { node, path } = item;
        const filledValue = node.filled?.displayName || node.filled?.name || '';
        const isActive = selectedSlotPath === JSON.stringify(item.logicalPath);
        const label = node.displayName || node.name;

        const handleCardClick = () => {
            if (onSelectSlot) {
                onSelectSlot(item);
            }
        };

        const handleClearClick = (e) => {
            e.stopPropagation();
            if (onClearSlot) {
                onClearSlot(path);
            }
        };

        return (
            <mdui-list-item
                key={`slot-${path.join('-')}`}
                onClick={handleCardClick}
                rounded
                active={isActive}
            >
                <mdui-button-icon
                    icon="clear"
                    onClick={handleClearClick}
                    variant="text"
                    slot="end-icon"
                ></mdui-button-icon>

                {label}
                <span slot="description">
                    {filledValue || 'Select...'}
                </span>
            </mdui-list-item>
        );
    };

    const renderGroupedSlotCard = (groupName, groupItems) => {
        const pathStr = `group-${groupName}`;
        const isActive = selectedSlotPath === groupName;
        const filledValues = groupItems.map(item => item.node.filled?.displayName || item.node.filled?.name).filter(Boolean);
        const totalCount = groupItems.length;
        const filledCount = filledValues.length;

        const handleCardClick = () => {
            if (onSelectSlot) {
                onSelectSlot({ type: 'Group', id: groupName, items: groupItems });
            }
        };

        const handleClearAll = (e) => {
            e.stopPropagation();
            groupItems.forEach(item => {
                if (item.node.filled && onClearSlot) {
                    onClearSlot(item.path);
                }
            });
        };

        return (
            <mdui-list-item
                key={pathStr}
                rounded
                onClick={handleCardClick}
                active={isActive}
            >
                <mdui-button-icon
                    icon="clear"
                    onClick={handleClearAll}
                    variant="text"
                    slot="end-icon"
                ></mdui-button-icon>
                {groupName}
                <span slot="description">
                    {filledCount > 0 ? filledValues.join(', ') : 'Select... (' + totalCount + ')'}
                </span>
            </mdui-list-item>
        );
    };

    const groupSlots = (items) => {
        const groups = {};
        items.forEach(item => {
            if (item.type === 'Slot' && item.node.slotIndex !== undefined) {
                // Use the displayName but strip the # suffix to get the base translated name
                const baseName = (item.node.displayName || item.node.name).replace(/ #\d+$/, '');
                if (!groups[baseName]) groups[baseName] = [];
                groups[baseName].push(item);
            } else {
                const key = `${item.type}-${item.path.join('-')}`;
                groups[key] = [item];
            }
        });
        return groups;
    };

    const renderSmartAbilitiesCard = () => {
        const isActive = selectedSlotPath === 'abilities';
        return (
            <mdui-list-item
                key="ability-scores-card"
                rounded
                onClick={() => onSelectSlot && onSelectSlot({ type: 'Abilities' })}
                active={isActive}
            >
                Ability Scores
                <span slot="description">
                    Configure Ability Scores
                </span>
            </mdui-list-item>
        );
    };

    const categorizedNodes = {};

    renderableNodes.forEach(item => {
        const category = categorizeNode(item);
        if (category) {
            if (!categorizedNodes[category]) categorizedNodes[category] = [];
            categorizedNodes[category].push(item);
        }
    });

    const groupedCategorizedNodes = {};
    Object.entries(categorizedNodes).forEach(([category, items]) => { groupedCategorizedNodes[category] = groupSlots(items); });

    return (
        <div className="category-creator">
            {Object.entries(CATEGORIES).sort(([, a], [, b]) => a.order - b.order).map(([key]) => {
                if (filterCategory && filterCategory !== key) return null;
                const groups = groupedCategorizedNodes[key] || {};
                if (key !== 'stats' && Object.keys(groups).length === 0) return null;

                return (
                    <div key={key} className="category-section">
                        {key === 'stats' ? (
                            renderSmartAbilitiesCard()
                        ) : (
                            Object.entries(groups).map(([groupName, groupItems]) => groupItems.length > 1 ? (
                                renderGroupedSlotCard(groupName, groupItems)
                            ) : (
                                groupItems[0].type === 'Input' ? renderInputCard(groupItems[0]) : renderSlot(groupItems[0])
                            ))
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export const PropertySelectionDescription = ({ tree, char, filterCategory, onGetProperty }) => {
    const category = CATEGORIES[filterCategory];

    const renderableNodes = tree ? collectRenderableNodes(tree, char) : [];
    const folderCards = renderableNodes.filter(item => {
        if (categorizeNode(item) !== filterCategory) return false;
        if (item.type !== 'Slot') return false;
        if (!item.node.filled) return false;

        let filled = item.node.filled;
        let type = (filled.type || '').toLowerCase();

        // If description is missing, look it up directly from the library using onGetProperty
        if (!filled.description && onGetProperty) {
            const fullProp = onGetProperty(filled.id);
            if (fullProp) {
                filled = fullProp;
                type = (filled.type || '').toLowerCase();
            }
        }

        // Augment the item with the full object so we render description correctly
        const evaluator = new ExpressionEvaluator(char);
        item.fullFilled = {
            ...filled,
            displayName: evaluator.evaluate(filled.name),
            description: evaluator.evaluate(filled.description)
        };

        return type === 'folder' && item.fullFilled.description;
    });

    if (!category && folderCards.length === 0) return null;

    return (
        <div className="property-selection-description">

            {folderCards.map(item => (
                <mdui-list-item key={item.path.join('-')} rounded class="list-item">
                    <span slot="header">{item.fullFilled.displayName || item.fullFilled.name}</span>
                    <span slot="description">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.fullFilled.description}</ReactMarkdown>
                    </span>
                </mdui-list-item>
            ))}
        </div>
    );
}
