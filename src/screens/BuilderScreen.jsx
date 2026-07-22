import React from 'react';
import PropertySelectionTree from '../components/PropertySelectionTree';
import { getAvailableCategories, isBuilderComplete, getCategoryStats, collectRenderableNodes, categorizeNode } from '../utils/builderUtils.js';
import { ExpressionEvaluator } from '../engine/RpgEngine';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'mdui/components/button-icon.js';
import 'mdui/components/button.js';
import 'mdui/components/icon.js';
import 'mdui/components/badge.js';
import 'mdui/components/card.js';
import 'mdui/components/slider.js';
import 'mdui/components/collapse.js';
import 'mdui/components/collapse-item.js';

const orderedSteps = [
    { key: 'origin', icon: 'person', label: 'Origin' },
    { key: 'class', icon: 'school', label: 'Class' },
    { key: 'feats', icon: 'emoji_events', label: 'Feats' },
    { key: 'stats', icon: 'fitness_center', label: 'Abilities' },
    { key: 'skills', icon: 'psychology', label: 'Skills' },
    { key: 'spellcasting', icon: 'auto_fix_high', label: 'Spells' },
    { key: 'companion', icon: 'pets', label: 'Companion' },
    { key: 'equipment', icon: 'shield', label: 'Equipment' },
];

const isShield = (opt) => {
    const tags = opt.tags || [];
    const vars = opt.variables || {};
    const category = (vars.category || '').toLowerCase();
    return tags.includes('shieldEquipment') || tags.includes('shield') || category === 'shield';
};

const isUnarmored = (opt) => {
    const tags = opt.tags || [];
    return opt.id === 'unarmored' || tags.includes('unarmored');
};

// Sub-component for rendering option selection cards
const getOptionChips = (option) => {
    const chips = [];
    const tags = option.tags || [];
    const vars = option.variables || {};

    const isSpell = tags.some(t => t.includes('Spell') || t === 'cantrip') || option.resource?.toLowerCase().includes('spell');

    if (isSpell) {
        // School
        const schools = ['abjuration', 'conjuration', 'divination', 'enchantment', 'evocation', 'illusion', 'necromancy', 'transmutation'];
        const school = tags.find(t => schools.includes(t.toLowerCase()));
        if (school) {
            chips.push(school.charAt(0).toUpperCase() + school.slice(1).toLowerCase());
        }

        // Damage / Healing / Utility
        if (tags.includes('damageSpell')) {
            chips.push('Damage');
        } else if (tags.includes('healingSpell')) {
            chips.push('Healing');
        } else {
            chips.push('Utility');
        }
    }

    // Equipment / Weapons / Armor
    const isEquipment = tags.includes('item') || vars.classification || vars.damageType || tags.some(t => t.includes('Armor') || t.includes('Weapon'));

    if (isEquipment) {
        if (vars.classification) {
            chips.push(String(vars.classification).charAt(0).toUpperCase() + String(vars.classification).slice(1).toLowerCase());
        }
        if (vars.category) {
            chips.push(String(vars.category).charAt(0).toUpperCase() + String(vars.category).slice(1).toLowerCase());
        }
        if (vars.property) {
            const prop = String(vars.property)
                .replace(/([A-Z])/g, ' $1')
                .trim()
                .split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join('-');
            chips.push(prop);
        }

        // Armor classifications/tags
        if (tags.includes('lightArmor')) {
            chips.push('Light');
        } else if (tags.includes('mediumArmor')) {
            chips.push('Medium');
        } else if (tags.includes('heavyArmor')) {
            chips.push('Heavy');
        }

        // Weapons properties or tags
        if (tags.includes('light') && !chips.includes('Light')) {
            chips.push('Light');
        }
        if (tags.includes('heavy') && !chips.includes('Heavy')) {
            chips.push('Heavy');
        }
        if (tags.includes('medium') && !chips.includes('Medium')) {
            chips.push('Medium');
        }
    }

    return chips;
};

const CustomStatsSlider = ({
    value,
    minScale = 8,
    maxScale = 20,
    creationMin = 8,
    pointBuyMax = 15,
    originMax = 17,
    creationMax = 20,
    dynamicMax,
    onChange
}) => {
    const trackRef = React.useRef(null);
    const thumbRef = React.useRef(null);
    const fillRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);

    const range = maxScale - minScale;
    const pct = (val) => range > 0 ? ((val - minScale) / range) * 100 : 0;

    const calculateValue = (clientX) => {
        if (!trackRef.current) return value;
        const rect = trackRef.current.getBoundingClientRect();
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / width));
        return Math.round(minScale + percentage * range);
    };

    const processNewValue = (newValue) => {
        const clamped = Math.max(creationMin, Math.min(dynamicMax, newValue));

        // Immediate DOM updates for lag-free sliding
        const thumbLeft = `${pct(clamped)}%`;
        const fillWidth = `${clamped > creationMin ? pct(clamped) - pct(creationMin) : 0}%`;
        if (thumbRef.current) {
            thumbRef.current.style.left = thumbLeft;
        }
        if (fillRef.current) {
            fillRef.current.style.width = fillWidth;
        }

        if (clamped !== value) {
            onChange(clamped);
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        const newValue = calculateValue(e.clientX);
        processNewValue(newValue);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        const newValue = calculateValue(e.touches[0].clientX);
        processNewValue(newValue);
    };

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const newValue = calculateValue(e.clientX);
            processNewValue(newValue);
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;
            const newValue = calculateValue(e.touches[0].clientX);
            processNewValue(newValue);
        };

        const handleDragEnd = () => {
            if (isDragging) {
                setIsDragging(false);
            }
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleDragEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, dynamicMax, value]);

    const thumbLeft = `${pct(value)}%`;
    const fillWidth = `${value > creationMin ? pct(value) - pct(creationMin) : 0}%`;

    const showCap = dynamicMax < creationMax;
    const capLeft = `${pct(dynamicMax)}%`;
    const capWidth = `${pct(creationMax) - pct(dynamicMax)}%`;

    const ticksCount = maxScale - minScale + 1;
    const ticks = Array.from({ length: ticksCount }, (_, i) => i);

    return (
        <div
            className="custom-slider-container"
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            <div className="custom-slider-track">
                {/* 0 - creationMin Inactive Left */}
                {creationMin > minScale && (
                    <div
                        className="custom-slider-segment inactive-left"
                        style={{ width: `${pct(creationMin)}%` }}
                    />
                )}

                {/* Point Buy Zone */}
                {pointBuyMax > creationMin && (
                    <div
                        className="custom-slider-segment active-zone point-buy-zone"
                        style={{ left: `${pct(creationMin)}%`, width: `${pct(pointBuyMax) - pct(creationMin)}%` }}
                    />
                )}

                {/* Origin Zone */}
                {originMax > pointBuyMax && (
                    <div
                        className="custom-slider-segment active-zone origin-zone"
                        style={{ left: `${pct(pointBuyMax)}%`, width: `${pct(originMax) - pct(pointBuyMax)}%` }}
                    />
                )}

                {/* ASI Zone */}
                {creationMax > originMax && (
                    <div
                        className="custom-slider-segment active-zone asi-zone"
                        style={{ left: `${pct(originMax)}%`, width: `${pct(creationMax) - pct(originMax)}%` }}
                    />
                )}

                {/* dynamicMax - creationMax Budget Capped */}
                {showCap && (
                    <div
                        className="custom-slider-segment budget-capped"
                        style={{ left: capLeft, width: capWidth }}
                    />
                )}

                {/* creationMax - maxScale Inactive Right */}
                {creationMax < maxScale && (
                    <div
                        className="custom-slider-segment inactive-right"
                        style={{ left: `${pct(creationMax)}%`, width: `${100 - pct(creationMax)}%` }}
                    />
                )}

                {/* Active fill from creationMin to currentValue */}
                <div
                    ref={fillRef}
                    className="custom-slider-segment fill"
                    style={{ left: `${pct(creationMin)}%`, width: fillWidth }}
                />

                {/* Tickmarks */}
                <div className="custom-slider-tickmarks">
                    {ticks.map(tick => (
                        <div key={tick} className="custom-slider-tick" />
                    ))}
                </div>

                {/* Thumb */}
                <div
                    ref={thumbRef}
                    className="custom-slider-thumb"
                    style={{ left: thumbLeft }}
                />
            </div>
        </div>
    );
};

// Sub-component for rendering option selection cards
const OptionCard = React.memo(function OptionCard({ option, isSelected, disabled, onClick, characterData }) {
    const evaluatedDescription = React.useMemo(() => {
        if (!option.description) return '';
        const evaluator = new ExpressionEvaluator(characterData);
        try {
            return evaluator.evaluate(option.description);
        } catch (e) {
            console.error(e);
            return option.description;
        }
    }, [option.description, characterData]);

    const handleCardClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    const chips = React.useMemo(() => {
        const allChips = getOptionChips(option);
        const allowedChips = [];
        const vars = option.variables || {};
        if (vars.property) {
            const prop = String(vars.property)
                .replace(/([A-Z])/g, ' $1')
                .trim()
                .split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join('-');
            if (allChips.includes(prop)) {
                allowedChips.push(prop);
            }
        }
        return allowedChips;
    }, [option]);

    const tags = option.tags || [];
    const shouldShowDesc = tags.some(tag => {
        const t = tag.toLowerCase();
        return t === 'class' || t.includes('subclass') || t === 'species' || t === 'background';
    });

    return (
        <mdui-list-item
            active={isSelected ? 'active' : ''}
            disabled={disabled ? 'disabled' : ''}
            clickable={!disabled}
            onClick={handleCardClick}
        >
            <div slot="custom" className="option-item" >
                <div className="option-item-header">
                    <div className="option-item-title">{option.displayName || option.name}</div>
                    {isSelected && (
                        <mdui-icon slot="end-icon" name="check_circle" class="icon-primary"></mdui-icon>
                    )}
                </div>
                {shouldShowDesc && option.description && (
                    <span className="option-item-body">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{evaluatedDescription}</ReactMarkdown>
                    </span>
                )}
            </div>
        </mdui-list-item>
    );
});

const InputPane = ({ selectedSlotItem, characterData, handleUpdateInput, isMobile, actionButton }) => {
    const { node, path } = selectedSlotItem;
    const isAbilityInput = node.name.match(/^(allocated|origin|asi)_/);
    const [prefix, stat] = isAbilityInput ? node.name.split('_') : [null, null];
    const attr = characterData.attributes || {};
    const meta = characterData.meta || {};

    const isLevel = node.id === 'level' || node.name === 'Level';

    const [localValue, setLocalValue] = React.useState(node.value ?? node.default ?? '');

    React.useEffect(() => {
        setLocalValue(node.value ?? node.default ?? '');
    }, [node.value, node.default]);

    let label = node.displayName || node.name;
    let maxVal = node.max;
    let isDisabled = false;

    const STAT_NAMES = {
        str: 'Strength',
        dex: 'Dexterity',
        con: 'Constitution',
        int: 'Intelligence',
        wis: 'Wisdom',
        cha: 'Charisma'
    };

    if (isAbilityInput && characterData.attributes) {
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
            const otherSum = stats.filter(s => `${prefix}_${s}` !== node.name).reduce((sum, s) => sum + Number(meta[`${prefix}_${s}`] || 0), 0);
            maxVal = Math.min(individualLimit, Math.max(0, collectiveLimit - otherSum));
        } else if (individualLimit !== Infinity) {
            maxVal = individualLimit;
        }
    }

    if (isAbilityInput) {
        const prefixLabel = prefix === 'allocated' ? 'Allocated' : prefix === 'origin' ? 'Origin' : 'ASI';
        label = `${STAT_NAMES[stat.toLowerCase()] || stat.toUpperCase()} (${prefixLabel})`;
    }

    const handleInputChange = (e) => {
        const val = e.target.value;
        setLocalValue(val);

        let newVal = node.subtype === 'number' ? (val === '' ? 0 : Number(val)) : val;
        if (node.subtype === 'number' && maxVal !== undefined) {
            newVal = Math.min(newVal, maxVal);
        }
        handleUpdateInput(path, newVal);
    };

    const handleSliderChange = (val) => {
        setLocalValue(val);
        handleUpdateInput(path, val);
    };

    return (
        <div className="input-pane" key={JSON.stringify(path)}>
            <div className="options-pane-header">
                <div className="options-pane-title-group">
                    <div className="stack-xs">
                        <span className="options-pane-title">{label}</span>
                    </div>
                    {isLevel && !isMobile && (
                        <span className="level-display">
                            {localValue !== '' ? localValue : (node.default ?? 1)}
                        </span>
                    )}
                    {actionButton}
                </div>
            </div>

            <div>
                {node.subtype === 'number' ? (
                    <div className="input-pane-body">
                        {!isLevel && (
                            <div>
                                <span className="ability-name">Current Value</span>
                                <span className="ability-total">{localValue !== '' ? localValue : (node.default ?? 0)}</span>
                            </div>
                        )}
                        <CustomStatsSlider
                            value={Number(localValue !== '' ? localValue : (node.default ?? 0))}
                            minScale={isAbilityInput ? 0 : (node.min ?? 0)}
                            maxScale={isAbilityInput ? 20 : (node.max ?? 20)}
                            creationMin={isAbilityInput ? 0 : (node.min ?? 0)}
                            pointBuyMax={isAbilityInput
                                ? (prefix === 'allocated' ? (attr.pointBuyScoreLimit || 7) : prefix === 'origin' ? (attr.originScoreLimit || 2) : 2)
                                : (node.max ?? 20)
                            }
                            originMax={isAbilityInput
                                ? (prefix === 'allocated' ? (attr.pointBuyScoreLimit || 7) : prefix === 'origin' ? (attr.originScoreLimit || 2) : 2)
                                : (node.max ?? 20)
                            }
                            creationMax={isAbilityInput
                                ? (prefix === 'allocated' ? (attr.pointBuyScoreLimit || 7) : prefix === 'origin' ? (attr.originScoreLimit || 2) : 2)
                                : (node.max ?? 20)
                            }
                            dynamicMax={maxVal !== undefined ? maxVal : (isAbilityInput ? 20 : (node.max ?? 20))}
                            onChange={handleSliderChange}
                        />
                    </div>
                ) : (
                    <mdui-text-field
                        variant="outlined"
                        type={node.subtype || 'text'}
                        value={localValue}
                        disabled={isDisabled || undefined}
                        onInput={handleInputChange}
                    />
                )}
            </div>
        </div>
    );
};

export const BuilderScreen = ({
    selectedCategory,
    setSelectedCategory,
    propertyTree,
    characterData,
    handleUpdateInput,
    handleFillSlot,
    handleClearSlot,
    handleGetSlotOptions,
    onNavigate,
    onGetProperty,
    onSave,
    builderSource,
    isNewCharacterCreation,
    setIsNewCharacterCreation
}) => {
    const isMobile = window.innerWidth <= 890;

    const [selectedSlotItem, setSelectedSlotItem] = React.useState(() => {
        if ((isNewCharacterCreation || !isMobile) && propertyTree) {
            const nodes = collectRenderableNodes(propertyTree, characterData);
            const firstNameItem = nodes.find(item => item.type === 'Input' && (item.node.id === 'name' || item.node.name === 'name'));
            if (firstNameItem) {
                return { ...firstNameItem, category: 'origin' };
            }
        }
        return null;
    });

    const mountedRef = React.useRef(false);
    React.useEffect(() => {
        if (!mountedRef.current && propertyTree) {
            mountedRef.current = true;
            setSelectedCategory('origin');
            if (isNewCharacterCreation || !isMobile) {
                const nodes = collectRenderableNodes(propertyTree, characterData);
                const firstNameItem = nodes.find(item => item.type === 'Input' && (item.node.id === 'name' || item.node.name === 'name'));
                if (firstNameItem) {
                    setSelectedSlotItem({ ...firstNameItem, category: 'origin' });
                }
            } else {
                setSelectedSlotItem(null);
            }
        }
    }, [propertyTree, characterData, setSelectedCategory, isNewCharacterCreation, isMobile]);

    const availableCategories = React.useMemo(() =>
        getAvailableCategories(propertyTree, characterData),
        [propertyTree, characterData]
    );

    const isComplete = React.useMemo(() =>
        isBuilderComplete(propertyTree, characterData),
        [propertyTree, characterData]
    );

    const categoryStats = React.useMemo(() =>
        getCategoryStats(propertyTree, characterData),
        [propertyTree, characterData]
    );

    // Default to the first available category if current selection is invalid
    React.useEffect(() => {
        if (selectedCategory && availableCategories.length > 0 && !availableCategories.includes(selectedCategory)) {
            setSelectedCategory(availableCategories[0]);
        }
    }, [availableCategories, selectedCategory, setSelectedCategory]);

    const items = React.useMemo(() => {
        if (!propertyTree) return [];
        const renderableNodes = collectRenderableNodes(propertyTree, characterData);
        const orderedItems = [];

        orderedSteps.forEach(step => {
            if (step.key === 'stats') {
                orderedItems.push({ type: 'Abilities', category: 'stats' });
                return;
            }

            const categoryNodes = renderableNodes.filter(item =>
                (item.type === 'Slot' || item.type === 'Input') && categorizeNode(item) === step.key
            );

            const visitedGroups = new Set();
            categoryNodes.forEach(item => {
                if (item.type === 'Slot' && item.node.slotIndex !== undefined) {
                    const baseName = (item.node.displayName || item.node.name).replace(/ #\d+$/, '');
                    if (!visitedGroups.has(baseName)) {
                        visitedGroups.add(baseName);
                        const groupItems = categoryNodes.filter(i =>
                            i.type === 'Slot' && (i.node.displayName || i.node.name).replace(/ #\d+$/, '') === baseName
                        );
                        orderedItems.push({ type: 'Group', id: baseName, items: groupItems, category: step.key });
                    }
                } else {
                    orderedItems.push({ ...item, category: step.key });
                }
            });
        });

        return orderedItems;
    }, [propertyTree, characterData]);

    React.useEffect(() => {
        if (isNewCharacterCreation) {
            setIsNewCharacterCreation(false);
        }
    }, [isNewCharacterCreation, setIsNewCharacterCreation]);

    // Synchronously determine the correct display and state item to prevent UI flicker
    const categoryItems = items.filter(item => item.category === selectedCategory);

    const isSameSlotItem = (a, b) => {
        if (a === b) return true;
        if (!a || !b) return false;
        if (a.type !== b.type) return false;
        if (a.type === 'Abilities') return true;
        if (a.type === 'Group') return a.id === b.id;
        return JSON.stringify(a.logicalPath) === JSON.stringify(b.logicalPath);
    };

    let matchedItem = categoryItems.find(item => isSameSlotItem(item, selectedSlotItem));
    let displaySlotItem = matchedItem || null;
    let newSlotItemToSet = selectedSlotItem;

    if (categoryItems.length > 0) {
        if (selectedCategory === 'stats') {
            if (!matchedItem) {
                displaySlotItem = isMobile ? null : { type: 'Abilities', category: 'stats' };
                newSlotItemToSet = displaySlotItem;
            }
        } else if (!matchedItem) {
            if (isMobile) {
                displaySlotItem = null;
                newSlotItemToSet = null;
            } else {
                const unfilled = categoryItems.find(item => {
                    if (item.type === 'Input') {
                        return (item.node.value ?? item.node.default ?? '') === '';
                    }
                    if (item.type === 'Slot') {
                        return !item.node.filled;
                    }
                    if (item.type === 'Group') {
                        return item.items.some(si => !si.node.filled);
                    }
                    return false;
                });
                displaySlotItem = unfilled || categoryItems[0] || null;
                newSlotItemToSet = displaySlotItem;
            }
        } else {
            // It matched!
            // Check if we need to auto-advance on desktop
            if (!isMobile && selectedSlotItem) {
                let wasUnfilled = false;
                if (selectedSlotItem.type === 'Input') {
                    const val = selectedSlotItem.node.value ?? selectedSlotItem.node.default ?? '';
                    wasUnfilled = val === '';
                } else if (selectedSlotItem.type === 'Slot') {
                    wasUnfilled = !selectedSlotItem.node.filled;
                } else if (selectedSlotItem.type === 'Group') {
                    wasUnfilled = selectedSlotItem.items.some(si => !si.node.filled);
                }

                let isNowFilled = false;
                if (matchedItem.type === 'Input') {
                    const val = matchedItem.node.value ?? matchedItem.node.default ?? '';
                    isNowFilled = val !== '';
                } else if (matchedItem.type === 'Slot') {
                    isNowFilled = !!matchedItem.node.filled;
                } else if (matchedItem.type === 'Group') {
                    isNowFilled = matchedItem.items.every(si => si.node.filled);
                }

                if (selectedSlotItem.type === 'Slot' && wasUnfilled && isNowFilled) {
                    const nextUnfilled = categoryItems.find(item => {
                        if (item.type === 'Input') {
                            return (item.node.value ?? item.node.default ?? '') === '';
                        }
                        if (item.type === 'Slot') {
                            return !item.node.filled;
                        }
                        if (item.type === 'Group') {
                            return item.items.some(si => !si.node.filled);
                        }
                        return false;
                    });
                    if (nextUnfilled) {
                        displaySlotItem = nextUnfilled;
                        newSlotItemToSet = nextUnfilled;
                    }
                }
            }
        }
    } else {
        displaySlotItem = null;
        newSlotItemToSet = null;
    }

    if (!isSameSlotItem(newSlotItemToSet, selectedSlotItem)) {
        setSelectedSlotItem(newSlotItemToSet);
    }

    const abilityNodesMap = React.useMemo(() => {
        const map = { allocated: {}, origin: {}, asi: {} };
        if (!propertyTree) return map;
        const renderableNodes = collectRenderableNodes(propertyTree, characterData);
        renderableNodes.forEach(item => {
            if (item.type === 'Input') {
                const match = item.node.name.match(/^(allocated|origin|asi)_(str|dex|con|int|wis|cha)$/);
                if (match) {
                    map[match[1]][match[2]] = item;
                }
            }
        });
        return map;
    }, [propertyTree, characterData]);

    const options = React.useMemo(() => {
        if (!displaySlotItem || displaySlotItem.type === 'Abilities' || displaySlotItem.type === 'Input') return [];
        const node = displaySlotItem.type === 'Slot' ? displaySlotItem.node : displaySlotItem.items[0].node;
        let opts = handleGetSlotOptions ? handleGetSlotOptions(node) : [];

        // Check which slots are filled and ensure their options are in the options list for deselecting
        const filledNodes = displaySlotItem.type === 'Slot'
            ? [displaySlotItem.node]
            : displaySlotItem.items.map(i => i.node);

        filledNodes.forEach(n => {
            const currentFilled = n.filled;
            if (currentFilled && !opts.some(o => o.id === currentFilled.id)) {
                opts.push({
                    ...currentFilled,
                    displayName: currentFilled.displayName || currentFilled.name
                });
            }
        });

        // Resolve missing descriptions using onGetProperty
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

        const getArmamentCategory = (opt) => {
            if (isShield(opt)) return null;

            const tags = opt.tags || [];
            const vars = opt.variables || {};
            const category = (vars.category || '').toLowerCase();
            const classification = (vars.classification || '').toLowerCase();

            // Weapons
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

        const getArmorCategory = (opt) => {
            if (isUnarmored(opt)) return null;

            const tags = opt.tags || [];
            if (tags.includes('lightArmor')) return 'light';
            if (tags.includes('mediumArmor')) return 'medium';
            if (tags.includes('heavyArmor')) return 'heavy';
            return null;
        };

        const hasArmament = resolvedOpts.some(opt => isShield(opt) || getArmamentCategory(opt) !== null);
        const hasArmor = resolvedOpts.some(opt => isUnarmored(opt) || getArmorCategory(opt) !== null);

        if (hasArmament || hasArmor) {
            return [...resolvedOpts].sort((a, b) => {
                const armA = getArmamentCategory(a);
                const armB = getArmamentCategory(b);
                const armoA = getArmorCategory(a);
                const armoB = getArmorCategory(b);

                const getSortValue = (armCat, armoCat, opt) => {
                    if (isUnarmored(opt)) return 1;
                    if (isShield(opt)) return 2;
                    if (armCat === 'simple-melee') return 3;
                    if (armCat === 'simple-ranged') return 4;
                    if (armCat === 'martial-melee') return 5;
                    if (armCat === 'martial-ranged') return 6;
                    if (armoCat === 'light') return 7;
                    if (armoCat === 'medium') return 8;
                    if (armoCat === 'heavy') return 9;
                    return 99;
                };

                const valA = getSortValue(armA, armoA, a);
                const valB = getSortValue(armB, armoB, b);

                if (valA !== valB) return valA - valB;

                return (a.displayName || a.name || '').localeCompare(b.displayName || b.name || '');
            });
        }

        return [...resolvedOpts].sort((a, b) => (a.displayName || a.name || '').localeCompare(b.displayName || b.name || ''));
    }, [displaySlotItem, handleGetSlotOptions, onGetProperty]);

    const handleOptionSelect = (option) => {
        if (!displaySlotItem) return;

        if (displaySlotItem.type === 'Slot') {
            const { node, path } = displaySlotItem;
            if (node.filled?.id === option.id) {
                handleClearSlot(path);
            } else {
                handleFillSlot(path, option.id);
            }
        } else if (displaySlotItem.type === 'Group') {
            const { items } = displaySlotItem;
            const filledSlot = items.find(item => item.node.filled?.id === option.id);

            if (filledSlot) {
                handleClearSlot(filledSlot.path);
            } else {
                const unfilledSlot = items.find(item => !item.node.filled);
                if (unfilledSlot) {
                    handleFillSlot(unfilledSlot.path, option.id);
                }
            }
        }
    };

    const isMobileOverlayActive = isMobile && displaySlotItem;
    const isMobileOptionsActive = !!displaySlotItem;

    const limitReached = React.useMemo(() => {
        if (!displaySlotItem || displaySlotItem.type !== 'Group') return false;
        return displaySlotItem.items.every(i => i.node.filled);
    }, [displaySlotItem]);

    const isCurrentSelectionFilled = React.useMemo(() => {
        if (!displaySlotItem) return false;
        if (displaySlotItem.type === 'Input') {
            const val = displaySlotItem.node.value ?? displaySlotItem.node.default ?? '';
            return val !== '';
        }
        if (displaySlotItem.type === 'Slot') {
            return !!displaySlotItem.node.filled;
        }
        if (displaySlotItem.type === 'Group') {
            return displaySlotItem.items.every(i => i.node.filled);
        }
        if (displaySlotItem.type === 'Abilities') {
            return !!categoryStats['stats']?.isComplete;
        }
        return false;
    }, [displaySlotItem, categoryStats]);

    const handleNextClick = () => {
        // Find current selection index
        const currentIndex = items.findIndex(item => {
            if (displaySlotItem.type !== item.type) return false;
            if (item.type === 'Abilities') return true;
            if (item.type === 'Group') return item.id === displaySlotItem.id;
            return JSON.stringify(item.logicalPath) === JSON.stringify(displaySlotItem.logicalPath);
        });

        // Find the next item (filled or not) whose category is available
        let nextItem = null;
        if (currentIndex !== -1) {
            for (let i = 1; i < items.length; i++) {
                const idx = (currentIndex + i) % items.length;
                const item = items[idx];

                // Check if item's category is available
                if (availableCategories.includes(item.category)) {
                    nextItem = item;
                    break;
                }
            }
        }

        if (nextItem) {
            setSelectedCategory(nextItem.category);
            setSelectedSlotItem(nextItem);
        } else {
            setSelectedSlotItem(null);
        }
    };

    const nextButtonLabel = React.useMemo(() => {
        if (isComplete) {
            return isMobileOverlayActive ? "Review" : "Save";
        }
        if (isCurrentSelectionFilled) {
            return "Next";
        }
        if (!displaySlotItem) {
            return "Next";
        }
        if (displaySlotItem.type === 'Input' || displaySlotItem.type === 'Slot') {
            return "Next";
        }
        // Calculate missing items (N)
        let missingCount = 1;
        if (displaySlotItem.type === 'Group') {
            missingCount = displaySlotItem.items.filter(i => !i.node.filled).length;
        } else if (displaySlotItem.type === 'Abilities') {
            missingCount = categoryStats['stats']?.pending || 0;
        }
        if (displaySlotItem.type === 'Abilities') { // if were in ability selection
            return `Assign ${missingCount}`;
        }
        return `Pick ${missingCount}`;
    }, [displaySlotItem, isCurrentSelectionFilled, isComplete, categoryStats, isMobileOverlayActive]);

    const handleNextOrSaveClick = () => {
        if (isComplete) {
            if (isMobileOverlayActive) {
                setSelectedSlotItem(null);
            } else {
                onSave();
            }
        } else {
            handleNextClick();
        }
    };

    const renderNextOrSaveButton = () => {
        if (isMobile) return null;
        return (
            <mdui-button
                variant="filled"
                disabled={(!isCurrentSelectionFilled && !isComplete) || undefined}
                onClick={isComplete ? onSave : handleNextClick}
                size="small"
            >
                {isComplete ? 'Save' : (isCurrentSelectionFilled ? 'Next' : nextButtonLabel)}
            </mdui-button>
        );
    };

    const topAppBarTitle = isMobileOverlayActive
        ? (displaySlotItem.type === 'Group'
            ? displaySlotItem.id
            : (displaySlotItem.type === 'Abilities'
                ? 'Ability Scores'
                : (displaySlotItem.node && (displaySlotItem.node.id === 'level' || displaySlotItem.node.name === 'Level')
                    ? `Level ${displaySlotItem.node.value ?? displaySlotItem.node.default ?? 1}`
                    : (displaySlotItem.node.displayName || displaySlotItem.node.name)
                )
            )
        )
        : "Aspida";

    const topAppBarLeftAction = isMobileOverlayActive
        ? <mdui-button-icon icon="arrow_back" onClick={() => setSelectedSlotItem(null)}></mdui-button-icon>
        : <mdui-button-icon icon="arrow_back" onClick={() => onNavigate(builderSource)}></mdui-button-icon>;

    const topAppBarRightAction = null;

    const renderAbilitiesPane = () => {
        const attr = characterData.attributes || {};
        const meta = characterData.meta || {};
        const statsList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        const STAT_NAMES = {
            str: 'Strength',
            dex: 'Dexterity',
            con: 'Constitution',
            int: 'Intelligence',
            wis: 'Wisdom',
            cha: 'Charisma'
        };

        const allocatedSum = statsList.reduce((sum, s) => sum + Number(meta[`allocated_${s}`] || 0), 0);
        const originSum = statsList.reduce((sum, s) => sum + Number(meta[`origin_${s}`] || 0), 0);
        const asiSum = statsList.reduce((sum, s) => sum + Number(meta[`asi_${s}`] || 0), 0);

        return (
            <div className="abilities-pane" key="abilities">
                <div className="options-pane-header">
                    <div className="options-pane-title-group">
                        <span className="options-pane-title">Ability Scores</span>
                        {renderNextOrSaveButton()}
                    </div>
                </div>

                <div className="abilities-summary">
                    <div className="summary-item">
                        <div className="stat-label">Allocated</div>
                        <div className="summary-value">{allocatedSum} / {attr.pointBuyLimit}</div>
                    </div>
                    <div className="summary-item">
                        <div className="stat-label">Origin</div>
                        <div className="summary-value">{originSum} / {attr.originPoolLimit}</div>
                    </div>
                    {attr.asiPoolLimit > 0 && (
                        <div className="summary-item">
                            <div className="stat-label">ASI</div>
                            <div className="summary-value">{asiSum} / {attr.asiPoolLimit}</div>
                        </div>
                    )}
                </div>

                <div className="options-list">
                    {statsList.map(stat => {
                        const valAllocated = Number(meta[`allocated_${stat}`] || 0);
                        const valOrigin = Number(meta[`origin_${stat}`] || 0);
                        const valAsi = Number(meta[`asi_${stat}`] || 0);
                        const totalValue = 8 + valAllocated + valOrigin + valAsi;

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

                                    if (curAllocated < attr.pointBuyScoreLimit && currentAllocatedSum < attr.pointBuyLimit) {
                                        curAllocated++;
                                        handleUpdateInput(abilityNodesMap.allocated[stat].path, curAllocated);
                                    } else if ((attr.originEligible || []).includes(stat) && curOrigin < attr.originScoreLimit && currentOriginSum < attr.originPoolLimit) {
                                        curOrigin++;
                                        handleUpdateInput(abilityNodesMap.origin[stat].path, curOrigin);
                                    } else if (currentAsiSum < attr.asiPoolLimit) {
                                        curAsi++;
                                        handleUpdateInput(abilityNodesMap.asi[stat].path, curAsi);
                                    } else break;
                                    delta--;
                                }
                            } else if (delta < 0) {
                                while (delta < 0) {
                                    if (curAsi > 0) {
                                        curAsi--;
                                        handleUpdateInput(abilityNodesMap.asi[stat].path, curAsi);
                                    } else if (curOrigin > 0) {
                                        curOrigin--;
                                        handleUpdateInput(abilityNodesMap.origin[stat].path, curOrigin);
                                    } else if (curAllocated > 0) {
                                        curAllocated--;
                                        handleUpdateInput(abilityNodesMap.allocated[stat].path, curAllocated);
                                    } else break;
                                    delta++;
                                }
                            }
                        };

                        return (
                            <mdui-card className="option-item ability-card" variant="outlined" key={stat}>
                                <div className="option-item-header">
                                    <span className="ability-name">{STAT_NAMES[stat]}</span>
                                    <span className="option-item-total">{totalValue}</span>
                                </div>
                                <CustomStatsSlider
                                    value={totalValue}
                                    minScale={8}
                                    maxScale={20}
                                    creationMin={8}
                                    pointBuyMax={15}
                                    originMax={15 + (attr.originPoolLimit > 0 ? attr.originScoreLimit : 0)}
                                    creationMax={attr.asiPoolLimit > 0 ? 20 : (15 + (attr.originPoolLimit > 0 ? attr.originScoreLimit : 0))}
                                    dynamicMax={dynamicMax}
                                    onChange={(val) => handleSmartChange({ target: { value: String(val) } })}
                                />
                            </mdui-card>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderOptionsPane = () => {
        if (!displaySlotItem) {
            const isStats = selectedCategory === 'stats';
            const instructionsTitle = isStats ? "Ability Scores" : "Customize Your Hero";
            const instructionsText = isStats
                ? "Allocate your ability points on the left using the Point Buy pool. Origin and ASI points can also be distributed here."
                : "Select a slot on the left to see available options, descriptions, and customize your character.";
            const instructionsIcon = isStats ? "fitness_center" : "auto_fix_high";

            return (
                <div className="instructions-panel">
                    <mdui-icon name={instructionsIcon} class="instructions-icon"></mdui-icon>
                    <span className="instructions-title">{instructionsTitle}</span>
                    <p className="instructions-text">{instructionsText}</p>
                </div>
            );
        }

        if (displaySlotItem.type === 'Abilities') {
            return renderAbilitiesPane();
        }

        if (displaySlotItem.type === 'Input') {
            return (
                <InputPane
                    selectedSlotItem={displaySlotItem}
                    characterData={characterData}
                    handleUpdateInput={handleUpdateInput}
                    isMobile={isMobile}
                    actionButton={renderNextOrSaveButton()}
                />
            );
        }

        const isGroup = displaySlotItem.type === 'Group';
        const slotName = isGroup ? displaySlotItem.id : (displaySlotItem.node.displayName || displaySlotItem.node.name);

        return (
            <div
                className="options-pane"
                key={displaySlotItem.type === 'Group' ? displaySlotItem.id : JSON.stringify(displaySlotItem.logicalPath)}
            >
                <div className="options-pane-header">
                    <div className="options-pane-title-group">
                        <span className="options-pane-title">{slotName} Options</span>
                        {renderNextOrSaveButton()}
                    </div>
                </div>

                {options.length === 0 ? (
                    <div className="instructions-panel">
                        <mdui-icon name="info" class="instructions-icon"></mdui-icon>
                        <span className="instructions-title">No Options Available</span>
                        <p className="instructions-text">There are no available choices that fit the prerequisites for this slot.</p>
                    </div>
                ) : (
                    <div className="options-list">
                        {(() => {
                            const getArmamentCategory = (opt) => {
                                if (isShield(opt)) return null;

                                const tags = opt.tags || [];
                                const vars = opt.variables || {};
                                const category = (vars.category || '').toLowerCase();
                                const classification = (vars.classification || '').toLowerCase();

                                // Weapons
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

                            const getArmorCategory = (opt) => {
                                if (isUnarmored(opt)) return null;

                                const tags = opt.tags || [];
                                if (tags.includes('lightArmor')) return 'light';
                                if (tags.includes('mediumArmor')) return 'medium';
                                if (tags.includes('heavyArmor')) return 'heavy';
                                return null;
                            };

                            const isSpellList = options.some(opt => {
                                const tags = opt.tags || [];
                                return tags.some(t => t.includes('Spell') || t === 'cantrip') || opt.resource?.toLowerCase().includes('spell');
                            });

                            const hasArmament = options.some(opt => isShield(opt) || getArmamentCategory(opt) !== null);
                            const hasArmor = options.some(opt => isUnarmored(opt) || getArmorCategory(opt) !== null);

                            if (isSpellList) {
                                const getSpellLevel = (opt) => {
                                    const tags = opt.tags || [];
                                    if (tags.includes('cantrip')) return 0;
                                    if (tags.includes('level1Spell')) return 1;
                                    if (tags.includes('level2Spell')) return 2;
                                    if (tags.includes('level3Spell')) return 3;
                                    if (tags.includes('level4Spell')) return 4;
                                    return 99;
                                };

                                const uniqueLevels = new Set(options.map(opt => getSpellLevel(opt)));
                                const showHeaders = uniqueLevels.size > 1;

                                let currentLvl = -1;
                                const rendered = [];
                                options.forEach(option => {
                                    const lvl = getSpellLevel(option);
                                    if (lvl !== currentLvl) {
                                        currentLvl = lvl;
                                        const levelNames = {
                                            0: "Cantrips",
                                            1: "1st Level Spells",
                                            2: "2nd Level Spells",
                                            3: "3rd Level Spells",
                                            4: "4th Level Spells"
                                        };
                                        if (showHeaders) {
                                            rendered.push(
                                                <div className="section-title" key={`lvl-header-${lvl}`}>
                                                    {levelNames[lvl] || `Level ${lvl} Spells`}
                                                </div>
                                            );
                                        }
                                    }

                                    const isSelected = isGroup
                                        ? displaySlotItem.items.some(i => i.node.filled?.id === option.id)
                                        : displaySlotItem.node.filled?.id === option.id;

                                    rendered.push(
                                        <OptionCard
                                            key={option.id}
                                            option={option}
                                            isSelected={isSelected}
                                            disabled={limitReached && !isSelected}
                                            onClick={() => handleOptionSelect(option)}
                                            characterData={characterData}
                                        />
                                    );
                                });
                                return rendered;
                            } else if (hasArmament || hasArmor) {
                                const uniqueCategories = new Set(options.map(opt => getArmamentCategory(opt) || getArmorCategory(opt)).filter(Boolean));
                                const showHeaders = uniqueCategories.size > 1;

                                let currentCat = null;
                                const rendered = [];
                                options.forEach(option => {
                                    const armCat = getArmamentCategory(option);
                                    const armoCat = getArmorCategory(option);
                                    const cat = armCat || armoCat;

                                    if (cat && cat !== currentCat) {
                                        currentCat = cat;
                                        const headerNames = {
                                            'simple-melee': "Simple Melee Weapons",
                                            'simple-ranged': "Simple Ranged Weapons",
                                            'martial-melee': "Martial Melee Weapons",
                                            'martial-ranged': "Martial Ranged Weapons",
                                            'shield': "Shields",
                                            'light': "Light Armor",
                                            'medium': "Medium Armor",
                                            'heavy': "Heavy Armor",
                                            'unarmored': "Unarmored"
                                        };
                                        if (showHeaders && headerNames[cat]) {
                                            rendered.push(
                                                <div className="section-title" key={`equip-header-${cat}`}>
                                                    {headerNames[cat]}
                                                </div>
                                            );
                                        }
                                    }

                                    const isSelected = isGroup
                                        ? displaySlotItem.items.some(i => i.node.filled?.id === option.id)
                                        : displaySlotItem.node.filled?.id === option.id;

                                    rendered.push(
                                        <OptionCard
                                            key={option.id}
                                            option={option}
                                            isSelected={isSelected}
                                            disabled={limitReached && !isSelected}
                                            onClick={() => handleOptionSelect(option)}
                                            characterData={characterData}
                                        />
                                    );
                                });
                                return rendered;
                            }

                            return options.map(option => {
                                const isSelected = isGroup
                                    ? displaySlotItem.items.some(i => i.node.filled?.id === option.id)
                                    : displaySlotItem.node.filled?.id === option.id;

                                return (
                                    <OptionCard
                                        key={option.id}
                                        option={option}
                                        isSelected={isSelected}
                                        disabled={limitReached && !isSelected}
                                        onClick={() => handleOptionSelect(option)}
                                        characterData={characterData}
                                    />
                                );
                            });
                        })()}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={`container builder-screen ${isMobileOptionsActive ? 'options-active' : ''}`}>
            <mdui-top-app-bar
                variant="small"
            >
                {topAppBarLeftAction}
                <mdui-top-app-bar-title>{topAppBarTitle}</mdui-top-app-bar-title>
                {topAppBarRightAction}
            </mdui-top-app-bar>

            <div className="builder-layout">
                {/* Left panel: Vertical Stepper */}
                <div className="builder-aside">
                    <mdui-collapse
                        accordion
                        value={selectedCategory || ''}
                        onChange={(e) => {
                            if (e.target === e.currentTarget) {
                                const newVal = e.target.value;
                                setSelectedCategory(newVal || null);
                            }
                        }}
                        className="vertical-stepper"
                    >
                        {orderedSteps.map((step, index) => {
                            const isAvailable = availableCategories.includes(step.key);
                            const stats = categoryStats[step.key] || { pending: 0, isComplete: false };
                            const isActive = selectedCategory === step.key;

                            let stepIndicatorContent = index + 1;
                            if (stats.isComplete) {
                                stepIndicatorContent = <mdui-icon name="check" class="icon-small"></mdui-icon>;
                            } else if (stats.pending > 0) {
                                stepIndicatorContent = '!';
                            }

                            return (
                                <mdui-collapse-item
                                    key={step.key}
                                    value={step.key}
                                    disabled={!isAvailable || undefined}
                                    className={`step-item ${isActive ? 'active' : ''} ${stats.isComplete ? 'completed' : ''} ${!isAvailable ? 'disabled' : ''}`}
                                >
                                    <div slot="header" className="step-header-container">
                                        <div className="step-indicator">
                                            {stepIndicatorContent}
                                        </div>
                                        <div className="step-header">
                                            <div className="step-title-group">
                                                <span className="step-title">{step.label}</span>
                                                {stats.pending > 0 && (
                                                    <mdui-badge>{stats.pending}</mdui-badge>
                                                )}
                                            </div>
                                            {isAvailable && (
                                                <mdui-button-icon icon={isActive ? "keyboard_arrow_up" : "keyboard_arrow_down"} variant="text" size="small"></mdui-button-icon>
                                            )}
                                        </div>
                                    </div>
                                    <div className="step-body">
                                        <PropertySelectionTree
                                            tree={propertyTree}
                                            char={characterData}
                                            onUpdateInput={handleUpdateInput}
                                            onFillSlot={handleFillSlot}
                                            onClearSlot={handleClearSlot}
                                            onGetSlotOptions={handleGetSlotOptions}
                                            filterCategory={step.key}
                                            selectedSlotPath={
                                                displaySlotItem
                                                    ? (displaySlotItem.type === 'Group' ? displaySlotItem.id : (displaySlotItem.type === 'Abilities' ? 'abilities' : JSON.stringify(displaySlotItem.logicalPath)))
                                                    : null
                                            }
                                            onSelectSlot={setSelectedSlotItem}
                                            onGetProperty={onGetProperty}
                                        />
                                    </div>
                                </mdui-collapse-item>
                            );
                        })}
                    </mdui-collapse>
                </div>

                {/* Right panel: Scrollable options list or instructions */}
                <div
                    className="builder-main"
                    key={displaySlotItem
                        ? (displaySlotItem.type === 'Group' ? displaySlotItem.id : (displaySlotItem.type === 'Abilities' ? 'abilities' : JSON.stringify(displaySlotItem.logicalPath)))
                        : 'instructions'
                    }
                >
                    {renderOptionsPane()}
                </div>
            </div>

            {isMobile && (isMobileOverlayActive || isComplete) && (
                <mdui-fab
                    key={nextButtonLabel}
                    extended
                    icon={isComplete
                        ? (isMobileOverlayActive ? "visibility" : "save")
                        : (isCurrentSelectionFilled ? "arrow_forward" : "check")
                    }
                    disabled={isMobileOverlayActive && (!isCurrentSelectionFilled && !isComplete) ? true : undefined}
                    onClick={isMobileOverlayActive ? handleNextOrSaveClick : onSave}
                    className="desktop-hidden builder-mobile-fab"
                >
                    {nextButtonLabel}
                </mdui-fab>
            )
            }
        </div >
    );
};
