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

// Separate component for grouped slots to manage local state and prevent select flickering
function GroupedSlotsSelect({ baseName, items, onFillSlot, onClearSlot, onGetSlotOptions }) {
    const { node } = items[0];

    const propSelectedValues = useMemo(() => {
        return items.map(item => item.node.filled?.id).filter(id => !!id);
    }, [items]);

    const [localValue, setLocalValue] = useState(propSelectedValues);

    useEffect(() => {
        setLocalValue(propSelectedValues);
    }, [propSelectedValues]);

    const options = useMemo(() => {
        let opts = onGetSlotOptions ? onGetSlotOptions(node) : [];
        items.forEach(item => {
            if (item.node.filled && !opts.some(opt => opt.id === item.node.filled.id)) {
                opts.push({ id: item.node.filled.id, displayName: item.node.filled.displayName || item.node.filled.name });
            }
        });
        return [...opts].sort((a, b) => (a.displayName || a.name).localeCompare(b.displayName || b.name));
    }, [node, items, onGetSlotOptions]);

    const handleMultiChange = (e) => {
        let newValues = Array.isArray(e.target.value) ? e.target.value : [e.target.value].filter(v => v !== "");
        const limit = items.length;
        if (newValues.length > limit) newValues = newValues.slice(0, limit);

        // Compute exactly how selectedValues will look in props after the slots are updated:
        const finalValues = [];
        let addIdx = 0;
        const currentFilledIds = items.map(item => item.node.filled?.id).filter(id => !!id);
        const valuesToAdd = newValues.filter(val => !currentFilledIds.includes(val));

        items.forEach(item => {
            const currentId = item.node.filled?.id;
            if (currentId && newValues.includes(currentId)) {
                finalValues.push(currentId);
            } else if (!currentId && addIdx < valuesToAdd.length) {
                finalValues.push(valuesToAdd[addIdx]);
                addIdx++;
            }
        });

        // Instantly update local state to avoid flicker!
        setLocalValue(finalValues);

        // Fire calls to fill/clear slots in background
        items.forEach(item => {
            const currentId = item.node.filled?.id;
            if (currentId && !newValues.includes(currentId)) onClearSlot(item.path);
        });

        let parentAddIdx = 0;
        items.forEach(item => {
            if (!item.node.filled && parentAddIdx < valuesToAdd.length) {
                onFillSlot(item.path, valuesToAdd[parentAddIdx]);
                parentAddIdx++;
            }
        });
    };

    return (
        <mdui-select variant="outlined" label={baseName} multiple value={localValue} onChange={handleMultiChange} placement="bottom-start">
            {options.map((option) => (
                <mdui-menu-item key={option.id} value={option.id} disabled={(localValue.length >= items.length && !localValue.includes(option.id)) || undefined}>
                    {option.displayName || option.name}
                </mdui-menu-item>
            ))}
        </mdui-select>
    );
}

export default function PropertySelectionTree({ tree, char, onUpdateInput, onFillSlot, onClearSlot, onGetSlotOptions, filterCategory }) {
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

    const renderInput = (item) => {
        const { node, path } = item;
        const value = node.value ?? node.default ?? '';
        const isAbilityInput = node.name.match(/^(allocated|origin|asi)_/);
        let maxVal = node.max;
        let isDisabled = false;

        if (isAbilityInput && char.attributes) {
            const [prefix, stat] = node.name.split('_');
            const attr = char.attributes;
            const meta = char.meta || {};
            let individualLimit = node.max ?? Infinity;
            let collectiveLimit = Infinity;

            if (prefix === 'allocated') {
                individualLimit = attr.pointBuyScoreLimit;
                collectiveLimit = attr.pointBuyLimit;
            } else if (prefix === 'origin') {
                individualLimit = attr.originScoreLimit;
                collectiveLimit = attr.originPoolLimit;
                if (attr.originEligible && !attr.originEligible.includes(stat)) isDisabled = true;
            } else if (prefix === 'asi') {
                collectiveLimit = attr.asiPoolLimit;
            }

            if (collectiveLimit !== Infinity) {
                const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
                const otherSum = stats.filter(s => `${prefix}_${s}` !== node.name).reduce((sum, s) => sum + (meta[`${prefix}_${s}`] || 0), 0);
                maxVal = Math.min(individualLimit, Math.max(0, collectiveLimit - otherSum));
            } else if (individualLimit !== Infinity) {
                maxVal = individualLimit;
            }
        }

        let label = node.displayName || node.name;
        if (isAbilityInput) {
            const [prefix, stat] = node.name.split('_');
            const prefixLabel = prefix === 'allocated' ? 'Allocated' : prefix === 'origin' ? 'Origin' : 'ASI';
            label = `${STAT_NAMES[stat.toLowerCase()] || stat.toUpperCase()} (${prefixLabel})`;
        }

        const handleInputChange = (e) => {
            let newVal = node.subtype === 'number' ? (e.target.value === '' ? 0 : Number(e.target.value)) : e.target.value;
            if (node.subtype === 'number' && maxVal !== undefined) newVal = Math.min(newVal, maxVal);
            onUpdateInput(path, newVal);
        };

        if (node.subtype === 'number') {
            return (
                <div className="mdui-number-controls" key={`input-${path.join('-')}`}>
                    <mdui-text-field variant="outlined" label={label} type="number" value={value} min={node.min} max={maxVal} disabled={isDisabled || undefined} onInput={handleInputChange} />
                    <mdui-button-icon icon="remove" onClick={() => onUpdateInput(path, Math.max(Number(value || 0) - 1, node.min ?? 0))} disabled={Number(value) <= (node.min ?? 0) || undefined} />
                    <mdui-button-icon icon="add" onClick={() => onUpdateInput(path, maxVal !== undefined ? Math.min(Number(value || 0) + 1, maxVal) : Number(value || 0) + 1)} disabled={(maxVal !== undefined && Number(value) >= maxVal) || undefined} />
                </div>
            );
        }

        return <mdui-text-field variant="outlined" key={`input-${path.join('-')}`} label={label} type={node.subtype || 'text'} value={value} disabled={isDisabled || undefined} onInput={handleInputChange} />;
    };

    const renderSlot = (item) => {
        const { node, path } = item;
        const selectedValue = node.filled?.id || '';
        let options = onGetSlotOptions ? onGetSlotOptions(node) : [];

        if (selectedValue && node.filled && !options.some(opt => opt.id === selectedValue)) {
            options = [{ id: node.filled.id, displayName: node.filled.displayName || node.filled.name, type: node.filled.type }, ...options];
        }
        options.sort((a, b) => (a.displayName || a.name).localeCompare(b.displayName || b.name));

        const handleSlotChange = (e) => {
            if (e.target.value === '') onClearSlot(path);
            else onFillSlot(path, e.target.value);
        };

        const label = node.displayName || node.name;

        return (
            <mdui-select variant="outlined" key={`slot-${path.join('-')}`} label={label} value={selectedValue} onChange={handleSlotChange} placement="bottom-start">

                {options.map((option) => (
                    <mdui-menu-item key={option.id} value={option.id}>{option.displayName || option.name}</mdui-menu-item>
                ))}
            </mdui-select>
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

    const renderAbilitiesSummary = () => {
        const attr = char.attributes || {};
        const meta = char.meta || {};
        const statsList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        const allocatedSum = statsList.reduce((sum, s) => sum + (meta[`allocated_${s}`] || 0), 0);
        const originSum = statsList.reduce((sum, s) => sum + (meta[`origin_${s}`] || 0), 0);
        const asiSum = statsList.reduce((sum, s) => sum + (meta[`asi_${s}`] || 0), 0);

        return (
            <div className="abilities-summary" key="abilities-summary">
                <div className="summary-item"><div className="stat-label">Allocated</div><div className="summary-value">{allocatedSum} / {attr.pointBuyLimit}</div></div>
                <div className="summary-item"><div className="stat-label">Origin</div><div className="summary-value">{originSum} / {attr.originPoolLimit}</div></div>
                {attr.asiPoolLimit > 0 && <div className="summary-item"><div className="stat-label">ASI</div><div className="summary-value">{asiSum} / {attr.asiPoolLimit}</div></div>}
            </div>
        );
    };

    const renderSmartAbilityInput = (stat, abilityNodesMap) => {
        const attr = char.attributes || {};
        const meta = char.meta || {};
        const statsList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        const valAllocated = meta[`allocated_${stat}`] || 0;
        const valOrigin = meta[`origin_${stat}`] || 0;
        const valAsi = meta[`asi_${stat}`] || 0;
        const totalValue = 8 + valAllocated + valOrigin + valAsi;

        const allocatedSum = statsList.reduce((sum, s) => sum + (meta[`allocated_${s}`] || 0), 0);
        const originSum = statsList.reduce((sum, s) => sum + (meta[`origin_${s}`] || 0), 0);
        const asiSum = statsList.reduce((sum, s) => sum + (meta[`asi_${s}`] || 0), 0);

        const canAddAllocated = Math.min(attr.pointBuyScoreLimit - valAllocated, Math.max(0, attr.pointBuyLimit - allocatedSum));
        const canAddOrigin = (attr.originEligible || []).includes(stat) ? Math.min(attr.originScoreLimit - valOrigin, Math.max(0, attr.originPoolLimit - originSum)) : 0;
        const canAddAsi = Math.max(0, attr.asiPoolLimit - asiSum);
        const dynamicMax = Math.min(20, totalValue + canAddAllocated + canAddOrigin + canAddAsi);

        const handleSmartChange = (e) => {
            const newValue = Math.min(dynamicMax, Number(e.target.value));
            let delta = newValue - totalValue;
            let curAllocated = valAllocated, curOrigin = valOrigin, curAsi = valAsi;

            if (delta > 0) {
                while (delta > 0) {
                    const currentAllocatedSum = statsList.reduce((sum, s) => sum + (s === stat ? curAllocated : (meta[`allocated_${s}`] || 0)), 0);
                    const currentOriginSum = statsList.reduce((sum, s) => sum + (s === stat ? curOrigin : (meta[`origin_${s}`] || 0)), 0);
                    const currentAsiSum = statsList.reduce((sum, s) => sum + (s === stat ? curAsi : (meta[`asi_${s}`] || 0)), 0);

                    if (curAllocated < attr.pointBuyScoreLimit && currentAllocatedSum < attr.pointBuyLimit) { curAllocated++; onUpdateInput(abilityNodesMap.allocated[stat].path, curAllocated); }
                    else if ((attr.originEligible || []).includes(stat) && curOrigin < attr.originScoreLimit && currentOriginSum < attr.originPoolLimit) { curOrigin++; onUpdateInput(abilityNodesMap.origin[stat].path, curOrigin); }
                    else if (currentAsiSum < attr.asiPoolLimit) { curAsi++; onUpdateInput(abilityNodesMap.asi[stat].path, curAsi); }
                    else break;
                    delta--;
                }
            } else if (delta < 0) {
                while (delta < 0) {
                    if (curAsi > 0) { curAsi--; onUpdateInput(abilityNodesMap.asi[stat].path, curAsi); }
                    else if (curOrigin > 0) { curOrigin--; onUpdateInput(abilityNodesMap.origin[stat].path, curOrigin); }
                    else if (curAllocated > 0) { curAllocated--; onUpdateInput(abilityNodesMap.allocated[stat].path, curAllocated); }
                    else break;
                    delta++;
                }
            }
        };

        return (
            <div className="ability-smart-row" key={stat}>
                <div className="mdui-number-controls">
                    <mdui-text-field variant="outlined" label={STAT_NAMES[stat]} type="number" value={totalValue} min={8} max={dynamicMax} onInput={handleSmartChange} class="ability-value-field"
                        helper={`Base 8 + ${valAllocated} Allocated + ${valOrigin} Origin + ${valAsi} ASI`} />
                    <mdui-button-icon icon="remove" onClick={() => handleSmartChange({ target: { value: String(totalValue - 1) } })} disabled={totalValue <= 8 || undefined} />
                    <mdui-button-icon icon="add" onClick={() => handleSmartChange({ target: { value: String(totalValue + 1) } })} disabled={totalValue >= dynamicMax || undefined} />
                </div>
                <div className="ability-breakdown">
                </div>
            </div>
        );
    };

    const categorizedNodes = {};
    const statsList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    const abilityNodesMap = { allocated: {}, origin: {}, asi: {} };

    renderableNodes.forEach(item => {
        if (item.type === 'Input') {
            const match = item.node.name.match(/^(allocated|origin|asi)_(str|dex|con|int|wis|cha)$/);
            if (match) { abilityNodesMap[match[1]][match[2]] = item; return; }
        }
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
                        {key === 'stats' && renderAbilitiesSummary()}
                        {key === 'stats' && statsList.map(stat => renderSmartAbilityInput(stat, abilityNodesMap))}
                        {Object.entries(groups).map(([groupName, groupItems]) => groupItems.length > 1 ? (
                            <GroupedSlotsSelect
                                key={`group-${groupName}`}
                                baseName={groupName}
                                items={groupItems}
                                onFillSlot={onFillSlot}
                                onClearSlot={onClearSlot}
                                onGetSlotOptions={onGetSlotOptions}
                            />
                        ) : (
                            groupItems[0].type === 'Input' ? renderInput(groupItems[0]) : renderSlot(groupItems[0])
                        ))}
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
                <mdui-card key={item.path.join('-')} variant="outlined" className="card-container static-card" style={{ marginBottom: '16px', width: '100%' }}>
                    <div className="card-header">
                        <span className="card-title">{item.fullFilled.displayName || item.fullFilled.name}</span>
                    </div>
                    <div className="card-content">
                        <div className="card-description">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.fullFilled.description}</ReactMarkdown>
                        </div>
                    </div>
                </mdui-card>
            ))}
        </div>
    );
}
