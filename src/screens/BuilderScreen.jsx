import React from 'react';
import PropertySelectionTree from '../components/PropertySelectionTree';
import { getAvailableCategories, isBuilderComplete, getCategoryStats, collectRenderableNodes, categorizeNode, STEP_DEFINITIONS, getCategoryForStep, MERGED_CATEGORIES, aggregateCategoryOptions, findOptimalSlotForOption, findMatchingForChoices, getSlotAllowedMap, CATEGORIES, getItemUniqueId, isSameSlotItem } from '../utils/builderUtils.js';
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

const orderedCategories = [
    { key: 'origin', icon: 'person', label: 'Origin' },
    { key: 'class', icon: 'school', label: 'Class' },
    { key: 'abilities', icon: 'fitness_center', label: 'Abilities' },
    { key: 'arsenal', icon: 'shield', label: 'Arsenal' },
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

const formatAcCalculation = (option, characterData) => {
    if (!option) return null;

    const isUnarmoredOption = option.id === 'unarmored' || (option.tags || []).includes('unarmored');

    if (isUnarmoredOption) {
        const cls = (characterData?.meta?.class || '').toLowerCase();
        const sub = (characterData?.meta?.sub || '').toLowerCase();

        if (cls === 'barbarian') {
            return 'AC: 10 + Dexterity + Constitution';
        }
        if (cls === 'monk') {
            return 'AC: 10 + Dexterity + Wisdom';
        }
        if (sub === 'draconic' || sub === 'dance') {
            return 'AC: 10 + Dexterity + Charisma';
        }
        return 'AC: 10 + Dexterity';
    }

    const children = option.children || [];
    const acEffect = children.find(c => c && c.type === 'Effect' && (c.target === 'attributes.ac' || c.target === 'ac'));

    if (acEffect) {
        if (acEffect.operation === 'add') {
            const val = String(acEffect.value).replace(/\$|\(|\)/g, '').trim();
            const num = parseInt(val, 10);
            if (!isNaN(num)) {
                return `AC: +${num}`;
            }
            return `AC: +${val}`;
        }

        if (acEffect.operation === 'set' || !acEffect.operation) {
            let val = String(acEffect.value || '');
            val = val.replace(/^\$\((.*)\)$/, '$1').trim();

            if (/^\d+$/.test(val)) {
                return `AC: ${val}`;
            }

            const minMatch = val.match(/^(\d+)\s*\+\s*Math\.min\((\d+),\s*stats\.dex\.mod\)$/);
            if (minMatch) {
                return `AC: ${minMatch[1]} + Dexterity, up to ${minMatch[2]}`;
            }

            const dexMatch1 = val.match(/^(\d+)\s*\+\s*stats\.dex\.mod$/);
            if (dexMatch1) {
                return `AC: ${dexMatch1[1]} + Dexterity`;
            }
            const dexMatch2 = val.match(/^stats\.dex\.mod\s*\+\s*(\d+)$/);
            if (dexMatch2) {
                return `AC: ${dexMatch2[1]} + Dexterity`;
            }

            if (val.includes('stats.')) {
                let formatted = val
                    .replace(/stats\.dex\.mod/g, 'Dexterity')
                    .replace(/stats\.con\.mod/g, 'Constitution')
                    .replace(/stats\.wis\.mod/g, 'Wisdom')
                    .replace(/stats\.cha\.mod/g, 'Charisma')
                    .replace(/stats\.str\.mod/g, 'Strength')
                    .replace(/stats\.int\.mod/g, 'Intelligence')
                    .replace(/Math\.min\((\d+),\s*Dexterity\)/g, 'Dexterity, up to $1')
                    .replace(/Math\.min\(Dexterity,\s*(\d+)\)/g, 'Dexterity, up to $1');
                return `AC: ${formatted}`;
            }

            return `AC: ${val}`;
        }
    }

    const tags = option.tags || [];
    if (tags.includes('shieldEquipment') || tags.includes('shield') || option.id === 'shieldEquipment') {
        return 'AC: +2';
    }

    return null;
};

const formatDamageMeta = (vars) => {
    if (!vars) return null;
    let roll = vars.damageRoll ? String(vars.damageRoll) : '';
    let type = vars.damageType ? String(vars.damageType) : '';

    if (!roll && !type) return null;

    if (roll.includes('$') || roll.includes('?')) {
        const diceMatches = roll.match(/\d+d\d+/g);
        if (diceMatches && diceMatches.length > 0) {
            const uniqueDice = [...new Set(diceMatches)];
            roll = uniqueDice.join('/');
        } else {
            roll = '';
        }
    }

    const formattedType = type ? (type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()) : '';

    if (roll && formattedType) {
        return `${roll} ${formattedType}`;
    }
    if (roll) {
        return roll;
    }
    if (formattedType) {
        return formattedType;
    }
    return null;
};

// Sub-component for rendering option selection cards
const getOptionChips = (option, onGetProperty, characterData) => {
    let fullOpt = option;
    if (!fullOpt.children && onGetProperty) {
        const fetched = onGetProperty(fullOpt.id);
        if (fetched) fullOpt = { ...fullOpt, ...fetched };
    }

    const chips = [];
    const tags = fullOpt.tags || [];
    const vars = fullOpt.variables || {};

    const isSpell = tags.some(t => t.includes('Spell') || t === 'cantrip') || fullOpt.resource?.toLowerCase().includes('spell');

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

        const dmgMeta = formatDamageMeta(vars);
        if (dmgMeta) {
            chips.push(dmgMeta);
        }

        const acCalc = formatAcCalculation(fullOpt, characterData);
        if (acCalc) {
            chips.push(acCalc);
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
const OptionCard = React.memo(function OptionCard({ option, isSelected, disabled, onClick, characterData, onGetProperty }) {
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

    const labels = React.useMemo(() => {
        return getOptionChips(option, onGetProperty, characterData);
    }, [option, onGetProperty, characterData]);

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
            <div slot="custom" className={`option-item ${shouldShowDesc ? 'option-item-desc' : ''}`} >
                <div className="option-item-header">
                    <div className="option-item-title">{option.displayName || option.name}</div>
                    {isSelected && (
                        <mdui-icon slot="end-icon" name="check_circle" class="icon-primary"></mdui-icon>
                    )}

                </div>
                {labels.length > 0 && (
                    <div className="option-item-meta">
                        {labels.join(' • ')}
                    </div>
                )}

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

        Object.entries(STEP_DEFINITIONS).forEach(([stepKey, stepDef]) => {
            if (stepKey === 'stats') {
                orderedItems.push({ type: 'Abilities', category: 'abilities', step: 'stats' });
                return;
            }

            const stepNodes = renderableNodes.filter(item =>
                (item.type === 'Slot' || item.type === 'Input') && categorizeNode(item) === stepKey
            );
            if (stepNodes.length === 0) return;

            if (stepKey === 'companion' || stepKey === 'steed' || stepKey === 'familiar') {
                orderedItems.push({
                    type: 'Ally',
                    allyType: stepKey,
                    id: `ally-${stepKey}`,
                    title: stepDef.title,
                    items: stepNodes,
                    category: 'arsenal',
                    step: stepKey
                });
                return;
            }

            if (stepKey === 'classOptions') {
                const slotNodes = stepNodes.filter(item => item.type === 'Slot');
                if (slotNodes.length > 0) {
                    const baseNames = new Set(slotNodes.map(i => (i.node.displayName || i.node.name).replace(/ #\d+$/, '')));
                    if (baseNames.size > 1) {
                        orderedItems.push({
                            type: 'MergedCategory',
                            category: 'class',
                            step: 'classOptions',
                            id: 'merged-classOptions',
                            title: 'Class Options',
                            items: slotNodes
                        });
                        return;
                    }
                }
            } else if (MERGED_CATEGORIES.includes(stepKey)) {
                const slotNodes = stepNodes.filter(item => item.type === 'Slot');
                if (slotNodes.length > 0) {
                    orderedItems.push({
                        type: 'MergedCategory',
                        category: stepDef.category,
                        step: stepKey,
                        id: `merged-${stepKey}`,
                        title: stepDef.title,
                        items: slotNodes
                    });
                }
                const inputNodes = stepNodes.filter(item => item.type === 'Input');
                inputNodes.forEach(item => orderedItems.push({ ...item, category: stepDef.category, step: stepKey }));
                return;
            }

            const visitedGroups = new Set();
            stepNodes.forEach(item => {
                if (item.type === 'Slot' && item.node.slotIndex !== undefined) {
                    const baseName = (item.node.displayName || item.node.name).replace(/ #\d+$/, '');
                    if (!visitedGroups.has(baseName)) {
                        visitedGroups.add(baseName);
                        const groupItems = stepNodes.filter(i =>
                            i.type === 'Slot' && (i.node.displayName || i.node.name).replace(/ #\d+$/, '') === baseName
                        );
                        orderedItems.push({ type: 'Group', id: baseName, items: groupItems, category: stepDef.category, step: stepKey });
                    }
                } else {
                    orderedItems.push({ ...item, category: stepDef.category, step: stepKey });
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

    // Uses imported isSameSlotItem helper based on getItemUniqueId

    let matchedItem = categoryItems.find(item => isSameSlotItem(item, selectedSlotItem));
    let displaySlotItem = matchedItem || null;
    let newSlotItemToSet = selectedSlotItem;

    if (categoryItems.length > 0) {
        if (!matchedItem) {
            if (isMobile) {
                displaySlotItem = null;
                newSlotItemToSet = null;
            } else {
                displaySlotItem = categoryItems[0] || null;
                newSlotItemToSet = displaySlotItem;
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

        if (displaySlotItem.type === 'MergedCategory') {
            return aggregateCategoryOptions(displaySlotItem.items, handleGetSlotOptions, onGetProperty);
        }

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

        if (displaySlotItem.type === 'MergedCategory') {
            const currentChoiceIds = displaySlotItem.items.map(i => i.node.filled?.id).filter(Boolean);

            const categoryOptionsMap = new Map();
            displaySlotItem.items.forEach(slotItem => {
                const opts = handleGetSlotOptions ? handleGetSlotOptions(slotItem.node) : [];
                (opts || []).forEach(opt => {
                    let fullOpt = opt;
                    if (!fullOpt.tags && onGetProperty) {
                        const fetched = onGetProperty(opt.id);
                        if (fetched) fullOpt = { ...opt, ...fetched };
                    }
                    if (!categoryOptionsMap.has(opt.id)) {
                        categoryOptionsMap.set(opt.id, { option: fullOpt });
                    }
                });
                if (slotItem.node.filled) {
                    let fullOpt = slotItem.node.filled;
                    if (!fullOpt.tags && onGetProperty) {
                        const fetched = onGetProperty(fullOpt.id);
                        if (fetched) fullOpt = { ...fullOpt, ...fetched };
                    }
                    categoryOptionsMap.set(fullOpt.id, { option: fullOpt });
                }
            });

            const slotAllowedMap = getSlotAllowedMap(displaySlotItem.items, categoryOptionsMap, handleGetSlotOptions);

            if (option.isSelected) {
                const newChoiceIds = currentChoiceIds.filter(id => id !== option.id);
                const matching = findMatchingForChoices(newChoiceIds, displaySlotItem.items, slotAllowedMap);

                displaySlotItem.items.forEach(slotItem => {
                    const filledId = slotItem.node.filled?.id;
                    let matchedChoiceId = null;
                    if (matching) {
                        for (const [cId, targetSlot] of matching.entries()) {
                            if (JSON.stringify(targetSlot.logicalPath) === JSON.stringify(slotItem.logicalPath)) {
                                matchedChoiceId = cId;
                                break;
                            }
                        }
                    }
                    if (filledId && filledId !== matchedChoiceId) {
                        handleClearSlot(slotItem.path);
                    }
                });

                if (matching) {
                    displaySlotItem.items.forEach(slotItem => {
                        const filledId = slotItem.node.filled?.id;
                        let matchedChoiceId = null;
                        for (const [cId, targetSlot] of matching.entries()) {
                            if (JSON.stringify(targetSlot.logicalPath) === JSON.stringify(slotItem.logicalPath)) {
                                matchedChoiceId = cId;
                                break;
                            }
                        }
                        if (matchedChoiceId && filledId !== matchedChoiceId) {
                            handleFillSlot(slotItem.path, matchedChoiceId);
                        }
                    });
                }
            } else if (!option.isDisabled) {
                const newChoiceIds = [...currentChoiceIds, option.id];
                const matching = findMatchingForChoices(newChoiceIds, displaySlotItem.items, slotAllowedMap);

                if (matching) {
                    displaySlotItem.items.forEach(slotItem => {
                        const filledId = slotItem.node.filled?.id;
                        let matchedChoiceId = null;
                        for (const [cId, targetSlot] of matching.entries()) {
                            if (JSON.stringify(targetSlot.logicalPath) === JSON.stringify(slotItem.logicalPath)) {
                                matchedChoiceId = cId;
                                break;
                            }
                        }
                        if (filledId && filledId !== matchedChoiceId) {
                            handleClearSlot(slotItem.path);
                        }
                    });

                    displaySlotItem.items.forEach(slotItem => {
                        const filledId = slotItem.node.filled?.id;
                        let matchedChoiceId = null;
                        for (const [cId, targetSlot] of matching.entries()) {
                            if (JSON.stringify(targetSlot.logicalPath) === JSON.stringify(slotItem.logicalPath)) {
                                matchedChoiceId = cId;
                                break;
                            }
                        }
                        if (matchedChoiceId && filledId !== matchedChoiceId) {
                            handleFillSlot(slotItem.path, matchedChoiceId);
                        }
                    });
                }
            }
            return;
        }

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
        if (!displaySlotItem || (displaySlotItem.type !== 'Group' && displaySlotItem.type !== 'MergedCategory')) return false;
        return displaySlotItem.items.every(i => i.node.filled);
    }, [displaySlotItem]);

    const isItemFilled = React.useCallback((item) => {
        if (!item) return false;
        if (item.type === 'Input') {
            const val = item.node.value ?? item.node.default ?? '';
            return val !== '';
        }
        if (item.type === 'Slot') {
            return !!item.node.filled;
        }
        if (item.type === 'Group' || item.type === 'MergedCategory') {
            return item.items.every(i => i.node.filled);
        }
        if (item.type === 'Ally') {
            return item.items.filter(i => i.type === 'Slot').every(i => i.node.filled);
        }
        if (item.type === 'Abilities') {
            return !!categoryStats['stats']?.isComplete;
        }
        return false;
    }, [categoryStats]);

    const isCurrentSelectionFilled = React.useMemo(() => {
        return isItemFilled(displaySlotItem);
    }, [displaySlotItem, isItemFilled]);

    const handleNextClick = () => {
        if (!displaySlotItem) {
            if (items.length > 0) {
                setSelectedCategory(items[0].category);
                setSelectedSlotItem(items[0]);
            }
            return;
        }

        const currentIndex = items.findIndex(item => isSameSlotItem(item, displaySlotItem));

        let nextItem = null;
        if (currentIndex !== -1 && currentIndex + 1 < items.length) {
            nextItem = items[currentIndex + 1];
        } else {
            // If on the last item, jump to the first unfilled item in the builder, or wrap to items[0]
            nextItem = items.find(item => !isItemFilled(item)) || items[0];
        }

        if (nextItem) {
            if (nextItem.category !== selectedCategory) {
                setSelectedCategory(nextItem.category);
            }
            setSelectedSlotItem(nextItem);
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
        if (displaySlotItem.type === 'Group' || displaySlotItem.type === 'MergedCategory') {
            missingCount = displaySlotItem.items.filter(i => !i.node.filled).length;
        } else if (displaySlotItem.type === 'Ally') {
            missingCount = displaySlotItem.items.filter(i => i.type === 'Slot' && !i.node.filled).length;
        } else if (displaySlotItem.type === 'Abilities') {
            missingCount = categoryStats['stats']?.pending || 0;
        }

        if (displaySlotItem.type === 'Abilities') { // if were in ability selection
            return `Assign ${missingCount}`;
        }
        return `Pick ${missingCount}`;
    }, [displaySlotItem, isCurrentSelectionFilled, isComplete, categoryStats, isMobileOverlayActive]);

    const handleNextOrSaveClick = React.useCallback(() => {
        if (isComplete) {
            if (isMobileOverlayActive) {
                setSelectedSlotItem(null);
            } else {
                onSave();
            }
        } else {
            handleNextClick();
        }
    }, [isComplete, isMobileOverlayActive, setSelectedSlotItem, onSave, handleNextClick]);

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                const targetTag = e.target?.tagName?.toUpperCase() || '';
                if (targetTag === 'TEXTAREA') {
                    return;
                }

                const isDisabled = !isCurrentSelectionFilled && !isComplete;
                if (!isDisabled) {
                    if (e.target && typeof e.target.blur === 'function') {
                        e.target.blur();
                    }
                    e.preventDefault();
                    handleNextOrSaveClick();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown, true);
        return () => window.removeEventListener('keydown', handleKeyDown, true);
    }, [isCurrentSelectionFilled, isComplete, handleNextOrSaveClick]);

    const renderNextOrSaveButton = () => {
        if (isMobile) return null;
        return (
            <mdui-button
                variant="filled"
                disabled={(!isCurrentSelectionFilled && !isComplete) || undefined}
                onClick={handleNextOrSaveClick}
                size="small"
            >
                {isComplete ? 'Save' : (isCurrentSelectionFilled ? 'Next' : nextButtonLabel)}
            </mdui-button>
        );
    };

    let topAppBarTitle = "Aspida";
    if (isMobileOverlayActive && displaySlotItem) {
        if (displaySlotItem.type === 'Group') {
            topAppBarTitle = displaySlotItem.id;
        } else if (displaySlotItem.type === 'MergedCategory') {
            topAppBarTitle = displaySlotItem.title || STEP_DEFINITIONS[displaySlotItem.step]?.title || CATEGORIES[displaySlotItem.category]?.title || displaySlotItem.category;
        } else if (displaySlotItem.type === 'Abilities') {
            topAppBarTitle = 'Ability Scores';
        } else if (displaySlotItem.type === 'Ally') {
            topAppBarTitle = displaySlotItem.title || STEP_DEFINITIONS[displaySlotItem.allyType]?.title || displaySlotItem.allyType;
        } else if (displaySlotItem.node) {
            if (displaySlotItem.node.id === 'level' || displaySlotItem.node.name === 'Level') {
                topAppBarTitle = `Level ${displaySlotItem.node.value ?? displaySlotItem.node.default ?? 1}`;
            } else {
                topAppBarTitle = displaySlotItem.node.displayName || displaySlotItem.node.name || displaySlotItem.title || "Customize";
            }
        } else if (displaySlotItem.title) {
            topAppBarTitle = displaySlotItem.title;
        }
    }

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

    const renderAllyPane = (allyItem) => {
        const { allyType, title, items: allyItems } = allyItem;

        const nameInput = allyItems.find(i => i.type === 'Input');
        const typeSlot = allyItems.find(i => i.type === 'Slot' && (i.node.id?.toLowerCase().includes('type') || i.node.name?.toLowerCase().includes('type') || i.node.id === 'primalCompanion'));
        const envSlot = allyItems.find(i => i.type === 'Slot' && (i.node.id?.toLowerCase().includes('environment') || i.node.name?.toLowerCase().includes('environment')));

        const otherSlots = allyItems.filter(i => i.type === 'Slot' && i !== typeSlot && i !== envSlot);

        const orderedNodes = [nameInput, typeSlot, envSlot, ...otherSlots].filter(Boolean);

        return (
            <div className="options-pane ally-pane" key={`ally-pane-${allyType}`}>
                <div className="options-pane-header">
                    <div className="options-pane-title-group">
                        <span className="options-pane-title">{title}</span>
                        {renderNextOrSaveButton()}
                    </div>
                </div>

                <div className="options-list">
                    {orderedNodes.flatMap(item => {
                        if (item.type === 'Input') {
                            const val = item.node.value ?? item.node.default ?? '';
                            const sectionLabel = item.node.label || item.node.displayName || item.node.name;
                            return [
                                <div key={`title-input-${item.node.id || item.node.name}`} className="section-title">
                                    {sectionLabel}
                                </div>,
                                <div key={`input-${item.node.id || item.node.name}`} style={{ marginBottom: '1rem', padding: '0 0.5rem' }}>
                                    <mdui-text-field
                                        variant="outlined"
                                        type="text"
                                        label={sectionLabel}
                                        value={val}
                                        onInput={(e) => handleUpdateInput(item.path, e.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            ];
                        }

                        const slotNode = item.node;
                        const slotTitle = slotNode.displayName || slotNode.name;
                        let opts = handleGetSlotOptions ? handleGetSlotOptions(slotNode) : [];

                        const currentFilled = slotNode.filled;
                        if (currentFilled && !opts.some(o => o.id === currentFilled.id)) {
                            opts = [...opts, { ...currentFilled, displayName: currentFilled.displayName || currentFilled.name }];
                        }

                        const sectionTitleElement = (
                            <div key={`title-slot-${slotNode.id || slotNode.name}`} className="section-title">
                                {slotTitle}
                            </div>
                        );

                        const cardElements = opts.map(opt => {
                            const fullOpt = onGetProperty ? (onGetProperty(opt.id) || opt) : opt;
                            const optTitle = fullOpt.displayName || fullOpt.name || opt.id;
                            const isSelected = slotNode.filled?.id === opt.id;

                            return (
                                <OptionCard
                                    key={opt.id}
                                    option={{ ...fullOpt, displayName: optTitle }}
                                    isSelected={isSelected}
                                    disabled={false}
                                    onClick={() => {
                                        if (isSelected) {
                                            handleClearSlot(item.path);
                                        } else {
                                            handleFillSlot(item.path, opt.id);
                                        }
                                    }}
                                    characterData={characterData}
                                    onGetProperty={onGetProperty}
                                />
                            );
                        });

                        return [sectionTitleElement, ...cardElements];
                    })}
                </div>
            </div>
        );
    };

    const renderOptionsPane = () => {
        if (!displaySlotItem) {
            const isStats = selectedCategory === 'stats';
            const instructionsTitle = isStats ? "Ability Scores" : "Customize Your Hero";
            return (
                <div className="instructions-panel">
                    <mdui-icon name="handshake" class="instructions-icon"></mdui-icon>
                    <span className="instructions-title">Selection Overview</span>
                    <p className="instructions-text">Select an option on the left to configure your character.</p>
                </div>
            );
        }

        if (displaySlotItem.type === 'Abilities') {
            return renderAbilitiesPane();
        }

        if (displaySlotItem.type === 'Ally') {
            return renderAllyPane(displaySlotItem);
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
        const isMerged = displaySlotItem.type === 'MergedCategory';
        const slotName = isMerged
            ? (displaySlotItem.title || CATEGORIES[displaySlotItem.category]?.title || displaySlotItem.category)
            : (isGroup ? displaySlotItem.id : (displaySlotItem.node?.displayName || displaySlotItem.node?.name || displaySlotItem.title));

        return (
            <div
                className="options-pane"
                key={isMerged ? `merged-pane-${displaySlotItem.id || displaySlotItem.category}` : (displaySlotItem.type === 'Group' ? displaySlotItem.id : JSON.stringify(displaySlotItem.logicalPath))}
            >
                <div className="options-pane-header">
                    <div className="options-pane-title-group">
                        <span className="options-pane-title">{slotName}</span>
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

                            const isSpellList = options.some(opt => {
                                const tags = opt.tags || [];
                                return tags.some(t => t.includes('Spell') || t === 'cantrip') || opt.resource?.toLowerCase().includes('spell');
                            });

                            const hasEquipment = options.some(opt => getEquipmentCategory(opt) !== null);

                            const isFeatList = options.some(opt => {
                                const tags = opt.tags || [];
                                return tags.some(t => t.includes('Feat') || t === 'feat');
                            });

                            const isClassOptionList = options.some(opt => {
                                const tags = opt.tags || [];
                                return tags.includes('circleLand') || tags.includes('elementalFury') || tags.includes('primalOrder') || tags.includes('divineOrder') || tags.includes('blessedStrikes');
                            });



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

                                    const isSelected = isMerged
                                        ? option.isSelected
                                        : (isGroup
                                            ? displaySlotItem.items.some(i => i.node.filled?.id === option.id)
                                            : displaySlotItem.node.filled?.id === option.id);

                                    const isDisabled = isMerged
                                        ? option.isDisabled
                                        : (option.isDisabled || (limitReached && !isSelected));

                                    rendered.push(
                                        <OptionCard
                                            key={option.id}
                                            option={option}
                                            isSelected={isSelected}
                                            disabled={isDisabled}
                                            onClick={() => handleOptionSelect(option)}
                                            characterData={characterData}
                                            onGetProperty={onGetProperty}
                                        />
                                    );
                                });
                                return rendered;

                            } else if (isFeatList) {
                                const getFeatCategory = (opt) => {
                                    const tags = opt.tags || [];
                                    if (tags.includes('fightingStyle')) return "Fighting Styles";
                                    if (tags.includes('feat')) return "Feats";
                                    return null;
                                };

                                const uniqueCategories = new Set(options.map(opt => getFeatCategory(opt)).filter(Boolean));
                                const showHeaders = uniqueCategories.size > 1;

                                let currentCat = null;
                                const rendered = [];
                                options.forEach(option => {
                                    const cat = getFeatCategory(option);

                                    if (cat && cat !== currentCat) {
                                        currentCat = cat;
                                        if (showHeaders) {
                                            rendered.push(
                                                <div className="section-title" key={`feat-header-${cat}`}>
                                                    {cat}
                                                </div>
                                            );
                                        }
                                    }

                                    const isSelected = isMerged
                                        ? option.isSelected
                                        : (isGroup
                                            ? displaySlotItem.items.some(i => i.node.filled?.id === option.id)
                                            : displaySlotItem.node.filled?.id === option.id);

                                    const isDisabled = isMerged
                                        ? option.isDisabled
                                        : (option.isDisabled || (limitReached && !isSelected));

                                    rendered.push(
                                        <OptionCard
                                            key={option.id}
                                            option={option}
                                            isSelected={isSelected}
                                            disabled={isDisabled}
                                            onClick={() => handleOptionSelect(option)}
                                            characterData={characterData}
                                            onGetProperty={onGetProperty}
                                        />
                                    );
                                });
                                return rendered;
                            } else if (isClassOptionList) {
                                const getClassOptionCategory = (opt) => {
                                    const tags = opt.tags || [];
                                    if (tags.includes('primalOrder')) return "Primal Order Options";
                                    if (tags.includes('elementalFury')) return "Elemental Fury Options";
                                    if (tags.includes('circleLand')) return "Land Types";
                                    if (tags.includes('blessedStrikes')) return "Blessed Strikes Options";
                                    if (tags.includes('divineOrder')) return "Divine Order Options";
                                    return null;
                                };

                                const uniqueCategories = new Set(options.map(opt => getClassOptionCategory(opt)).filter(Boolean));
                                const showHeaders = uniqueCategories.size > 1;

                                let currentCat = null;
                                const rendered = [];
                                options.forEach(option => {
                                    const cat = getClassOptionCategory(option);

                                    if (cat && cat !== currentCat) {
                                        currentCat = cat;
                                        if (showHeaders) {
                                            rendered.push(
                                                <div className="section-title" key={`feat-header-${cat}`}>
                                                    {cat}
                                                </div>
                                            );
                                        }
                                    }

                                    const isSelected = isMerged
                                        ? option.isSelected
                                        : (isGroup
                                            ? displaySlotItem.items.some(i => i.node.filled?.id === option.id)
                                            : displaySlotItem.node.filled?.id === option.id);

                                    const isDisabled = isMerged
                                        ? option.isDisabled
                                        : (option.isDisabled || (limitReached && !isSelected));

                                    rendered.push(
                                        <OptionCard
                                            key={option.id}
                                            option={option}
                                            isSelected={isSelected}
                                            disabled={isDisabled}
                                            onClick={() => handleOptionSelect(option)}
                                            characterData={characterData}
                                            onGetProperty={onGetProperty}
                                        />
                                    );
                                });
                                return rendered;
                            } else if (hasEquipment) {
                                const uniqueCategories = new Set(options.map(opt => getEquipmentCategory(opt)).filter(Boolean));
                                const showHeaders = uniqueCategories.size > 1;

                                let currentCat = null;
                                const rendered = [];
                                options.forEach(option => {
                                    const cat = getEquipmentCategory(option);

                                    if (cat && cat !== currentCat) {
                                        currentCat = cat;
                                        const headerNames = {
                                            'unarmored': "Unarmored",
                                            'light': "Light Armor",
                                            'medium': "Medium Armor",
                                            'heavy': "Heavy Armor",
                                            'simple-melee': "Simple Melee Weapons",
                                            'simple-ranged': "Simple Ranged Weapons",
                                            'martial-melee': "Martial Melee Weapons",
                                            'martial-ranged': "Martial Ranged Weapons",
                                            'shield': "Shields"
                                        };
                                        if (showHeaders && headerNames[cat]) {
                                            rendered.push(
                                                <div className="section-title" key={`equip-header-${cat}`}>
                                                    {headerNames[cat]}
                                                </div>
                                            );
                                        }
                                    }

                                    const isSelected = isMerged
                                        ? option.isSelected
                                        : (isGroup
                                            ? displaySlotItem.items.some(i => i.node.filled?.id === option.id)
                                            : displaySlotItem.node.filled?.id === option.id);

                                    const isDisabled = isMerged
                                        ? option.isDisabled
                                        : (option.isDisabled || (limitReached && !isSelected));

                                    rendered.push(
                                        <OptionCard
                                            key={option.id}
                                            option={option}
                                            isSelected={isSelected}
                                            disabled={isDisabled}
                                            onClick={() => handleOptionSelect(option)}
                                            characterData={characterData}
                                            onGetProperty={onGetProperty}
                                        />
                                    );
                                });
                                return rendered;
                            }


                            return options.map(option => {
                                const isSelected = isMerged
                                    ? option.isSelected
                                    : (isGroup
                                        ? displaySlotItem.items.some(i => i.node.filled?.id === option.id)
                                        : displaySlotItem.node.filled?.id === option.id);

                                const isDisabled = isMerged
                                    ? option.isDisabled
                                    : (option.isDisabled || (limitReached && !isSelected));

                                return (
                                    <OptionCard
                                        key={option.id}
                                        option={option}
                                        isSelected={isSelected}
                                        disabled={isDisabled}
                                        onClick={() => handleOptionSelect(option)}
                                        characterData={characterData}
                                        onGetProperty={onGetProperty}
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
                        {orderedCategories.map((cat, index) => {
                            const isAvailable = availableCategories.includes(cat.key);
                            const stats = categoryStats[cat.key] || { pending: 0, isComplete: false };
                            const isActive = selectedCategory === cat.key;

                            let stepIndicatorContent = index + 1;
                            if (stats.isComplete) {
                                stepIndicatorContent = <mdui-icon name="check" class="icon-small"></mdui-icon>;
                            } else if (stats.pending > 0) {
                                stepIndicatorContent = '!';
                            }

                            return (
                                <mdui-collapse-item
                                    key={cat.key}
                                    value={cat.key}
                                    disabled={!isAvailable || undefined}
                                    className={`step-item ${isActive ? 'active' : ''} ${stats.isComplete ? 'completed' : ''} ${!isAvailable ? 'disabled' : ''}`}
                                >
                                    <div slot="header" className="step-header-container">
                                        <div className="step-indicator">
                                            {stepIndicatorContent}
                                        </div>
                                        <div className="step-header">
                                            <div className="step-title-group">
                                                <span className="step-title">{cat.label}</span>
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
                                            filterCategory={cat.key}
                                            selectedSlotPath={displaySlotItem ? getItemUniqueId(displaySlotItem) : null}
                                            onSelectSlot={(item) => {
                                                if (item?.category) {
                                                    setSelectedCategory(item.category);
                                                }
                                                setSelectedSlotItem(item);
                                            }}
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
                    key={displaySlotItem ? getItemUniqueId(displaySlotItem) : 'instructions'}
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
