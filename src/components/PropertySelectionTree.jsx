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

import { CATEGORIES, STEP_DEFINITIONS, getCategoryForStep, MATCHING_ORDER, collectRenderableNodes, categorizeNode, MERGED_CATEGORIES, getItemUniqueId } from '../utils/builderUtils.js';


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
        const isActive = selectedSlotPath === getItemUniqueId(item);
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
        const isActive = selectedSlotPath === getItemUniqueId(item);
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
        const groupItem = { type: 'Group', id: groupName, items: groupItems, category: filterCategory };
        const pathStr = `group-${groupName}`;
        const isActive = selectedSlotPath === getItemUniqueId(groupItem);
        const filledValues = groupItems.map(item => item.node.filled?.displayName || item.node.filled?.name).filter(Boolean);
        const totalCount = groupItems.length;
        const filledCount = filledValues.length;

        const handleCardClick = () => {
            if (onSelectSlot) {
                onSelectSlot(groupItem);
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

    const renderSingleMergedCard = (cardId, title, slotItems, categoryKey, stepKey) => {
        const mergedItem = { type: 'MergedCategory', category: categoryKey, step: stepKey, id: cardId, title: title, items: slotItems };
        const filledValues = slotItems.map(item => item.node.filled?.displayName || item.node.filled?.name).filter(Boolean);
        const totalCount = slotItems.length;
        const filledCount = filledValues.length;

        const isActive = selectedSlotPath === getItemUniqueId(mergedItem);

        const handleCardClick = () => {
            if (onSelectSlot) {
                onSelectSlot(mergedItem);
            }
        };

        const handleClearAll = (e) => {
            e.stopPropagation();
            slotItems.forEach(item => {
                if (item.node.filled && onClearSlot) {
                    onClearSlot(item.path);
                }
            });
        };

        return (
            <mdui-list-item
                key={cardId}
                onClick={handleCardClick}
                active={isActive}
            >
                {filledCount > 0 && (
                    <mdui-button-icon
                        icon="clear"
                        onClick={handleClearAll}
                        variant="text"
                        slot="end-icon"
                    ></mdui-button-icon>
                )}
                {title}
                <span slot="description">
                    {filledCount > 0 ? filledValues.join(', ') : `Select... (${totalCount})`}
                </span>
            </mdui-list-item>
        );
    };

    const renderAllyCard = (allyType, allyItems) => {
        if (!allyItems || allyItems.length === 0) return null;

        const title = STEP_DEFINITIONS[allyType]?.title || allyType;
        const allyItem = {
            type: 'Ally',
            allyType: allyType,
            id: `ally-${allyType}`,
            title: title,
            items: allyItems,
            category: 'arsenal',
            step: allyType
        };

        const filledValues = allyItems
            .map(item => {
                if (item.type === 'Input') {
                    return item.node.value ?? item.node.default ?? '';
                }
                return item.node.filled?.displayName || item.node.filled?.name || '';
            })
            .filter(Boolean);

        const isActive = selectedSlotPath === getItemUniqueId(allyItem);

        const handleCardClick = () => {
            if (onSelectSlot) {
                onSelectSlot(allyItem);
            }
        };

        const handleClearAll = (e) => {
            e.stopPropagation();
            allyItems.forEach(item => {
                if (item.type === 'Input' && onUpdateInput) {
                    onUpdateInput(item.path, '');
                } else if (item.type === 'Slot' && item.node.filled && onClearSlot) {
                    onClearSlot(item.path);
                }
            });
        };

        return (
            <mdui-list-item
                key={allyItem.id}
                onClick={handleCardClick}
                active={isActive}
            >
                {filledValues.length > 0 && (
                    <mdui-button-icon
                        icon="clear"
                        onClick={handleClearAll}
                        variant="text"
                        slot="end-icon"
                    ></mdui-button-icon>
                )}
                {title}
                <span slot="description">
                    {filledValues.length > 0 ? filledValues.join(', ') : 'Configure ' + title}
                </span>
            </mdui-list-item>
        );
    };

    const groupSlots = (items) => {
        const groups = {};
        items.forEach(item => {
            if (item.type === 'Slot' && item.node.slotIndex !== undefined) {
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
        const abilitiesItem = { type: 'Abilities', category: 'abilities', step: 'stats' };
        const isActive = selectedSlotPath === getItemUniqueId(abilitiesItem);
        return (
            <mdui-list-item
                key="ability-scores-card"

                onClick={() => onSelectSlot && onSelectSlot(abilitiesItem)}
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
        const stepKey = categorizeNode(item);
        if (stepKey) {
            if (!categorizedNodes[stepKey]) categorizedNodes[stepKey] = [];
            categorizedNodes[stepKey].push(item);
        }
    });

    return (
        <React.Fragment>
            {Object.entries(STEP_DEFINITIONS)
                .filter(([, stepDef]) => !filterCategory || stepDef.category === filterCategory)
                .map(([stepKey, stepDef]) => {
                    const itemsForStep = categorizedNodes[stepKey] || [];
                    if (stepKey !== 'stats' && itemsForStep.length === 0) return null;

                    if (stepKey === 'stats') {
                        return renderSmartAbilitiesCard();
                    }

                    if (stepKey === 'companion' || stepKey === 'steed' || stepKey === 'familiar') {
                        return renderAllyCard(stepKey, itemsForStep);
                    }

                    if (stepKey === 'classOptions') {
                        const slotItems = itemsForStep.filter(i => i.type === 'Slot');
                        if (slotItems.length === 0) return null;

                        const baseNames = new Set(slotItems.map(i => (i.node.displayName || i.node.name).replace(/ #\d+$/, '')));
                        if (baseNames.size > 1) {
                            return renderSingleMergedCard(`merged-classOptions`, 'Class Options', slotItems, stepDef.category, 'classOptions');
                        }
                    }

                    if (MERGED_CATEGORIES.includes(stepKey)) {
                        const slotItems = itemsForStep.filter(i => i.type === 'Slot');
                        if (slotItems.length === 0) return null;
                        return renderSingleMergedCard(`merged-${stepKey}`, stepDef.title, slotItems, stepDef.category, stepKey);
                    }

                    const groups = groupSlots(itemsForStep);
                    return Object.entries(groups).map(([groupName, groupItems]) => {
                        if (groupItems.length > 1) {
                            return renderGroupedSlotCard(groupName, groupItems);
                        }
                        const single = groupItems[0];
                        return single.type === 'Input' ? renderInputCard(single) : renderSlot(single);
                    });
                })}
        </React.Fragment>
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
                <mdui-list-item key={item.path.join('-')} class="list-item">
                    <span slot="header">{item.fullFilled.displayName || item.fullFilled.name}</span>
                    <span slot="description">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.fullFilled.description}</ReactMarkdown>
                    </span>
                </mdui-list-item>
            ))}
        </div>
    );
}
