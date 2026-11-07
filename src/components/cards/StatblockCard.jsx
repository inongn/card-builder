import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderGridValue } from '../../utils/cardUtils';
import { processDiceInChildren, DiceRoller } from './DiceRoller';
import { formatBonus } from '../../engine/helpers.js';
import { formatStatblockEntry, statblockEntryLabel, STATBLOCK_TRAITS_ES } from '../../utils/statblockFormatter.js';
import { evaluateText } from '../../utils/sheetUtils.js';
import 'mdui/components/card.js';
import 'mdui/components/collapse-item.js';
import 'mdui/components/divider.js';
import { AutoFitContent } from '../AutoFitContent';
import { useLocale } from '../../i18n';

const SIZES_ES = {
    tiny: 'Diminuto',
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
    huge: 'Enorme',
    gargantuan: 'Gargantuesco'
};

const CREATURE_TYPES_ES = {
    aberration: 'Aberración',
    beast: 'Bestia',
    celestial: 'Celestial',
    construct: 'Autómata',
    dragon: 'Dragón',
    elemental: 'Elemental',
    fey: 'Feérico',
    fiend: 'Inmunda',
    giant: 'Gigante',
    humanoid: 'Humanoide',
    monstrosity: 'Monstruosidad',
    ooze: 'Cieno',
    plant: 'Planta',
    undead: 'Muerto Viviente'
};

const MOVEMENT_NAMES_ES = {
    walk: 'caminar',
    swim: 'nadar',
    fly: 'volar',
    climb: 'escalar',
    burrow: 'excavar'
};

const SENSES_ES = {
    darkvision: 'visión en la oscuridad',
    blindsight: 'visión a ciegas',
    tremorsense: 'sentido de la vibración',
    truesight: 'visión verdadera'
};

export const StatblockCard = memo(({ statblock, variant = 'collapsible', char }) => {
    if (!statblock) return null;

    const { t, lang, localize, formatMechanic } = useLocale();
    const isEs = lang === 'es';
    const isPlayMode = variant !== 'static';
    const isWildShape = statblock.category === 'wildShape' || statblock.tags?.includes('lunarWildShape') || statblock.tags?.includes('wildShapeTemplate');

    const {
        name,
        size,
        classification,
        ac,
        hp,
        movement,
        stats,
        category,
        senses,
        traits = [],
        actions = [],
        bonusActions = [],
        reactions = []
    } = statblock;

    const displayName = localize(statblock.id, 'name', name);
    const displaySize = isEs ? (SIZES_ES[size?.toLowerCase()] || size) : size;
    const displayClassif = isEs ? (CREATURE_TYPES_ES[classification?.toLowerCase()] || classification) : classification;

    const markdownComponents = {
        p: ({ children }) => (
            <span>{processDiceInChildren(children, isPlayMode, displayName)}</span>
        ),
        span: ({ children }) => (
            <span>{processDiceInChildren(children, isPlayMode, displayName)}</span>
        )
    };

    const headerContent = (
        <div className="card-header" slot={variant === 'collapsible' ? 'header' : undefined}>
            <span className="card-title">{displayName}</span>
            <div className="card-meta">
                <span className="text-secondary">{displaySize} {displayClassif}</span>
            </div>
        </div>
    );

    const statToSaveKey = {
        str: 'strength',
        dex: 'dexterity',
        con: 'constitution',
        int: 'intelligence',
        wis: 'wisdom',
        cha: 'charisma'
    };

    const renderStats = () => {
        if (!stats) return null;
        return (
            <div className="statblock-stats-row">
                {Object.entries(stats).map(([stat, value]) => {
                    const numScore = Number(value);
                    const statKey = stat.toLowerCase();
                    const saveKey = statToSaveKey[statKey];

                    if (!isNaN(numScore)) {
                        const mod = Math.floor((numScore - 10) / 2);
                        let save = mod;

                        if (statblock.saves && statblock.saves[statKey] !== undefined) {
                            save = Number(statblock.saves[statKey]);
                        } else if (isWildShape) {
                            if (char) {
                                const isProficient = (char.saves?.[saveKey]?.proficiency || 0) > 0;
                                if (isProficient) {
                                    save += Number(char.attributes?.prof || 0);
                                }
                                if (statKey === 'con') {
                                    if (char.attributes?.increasedToughness !== undefined) {
                                        save += Number(char.attributes.increasedToughness || 0);
                                    } else if (char.attributes?.conSaveBonus !== undefined) {
                                        save += Number(char.attributes.conSaveBonus || 0);
                                    } else if ((char.meta?.sub === 'Circle of the Moon' || char.meta?.sub === 'Moon') && (char.meta?.level >= 6)) {
                                        save += Number(char.stats?.wis?.mod || 0);
                                    }
                                }
                            }
                        }

                        if (statblock.saveBonus && statblock.saveBonus[statKey] !== undefined) {
                            save += Number(statblock.saveBonus[statKey]) || 0;
                        }

                        const modStr = formatBonus(mod);
                        const saveStr = formatBonus(save);
                        const formattedDisplay = `${numScore} (${modStr}/${saveStr})`;

                        return (
                            <div key={stat} className="statblock-stat-item">
                                <strong>{stat.toUpperCase()}</strong>
                                <div>
                                    {isPlayMode ? (
                                        <span>
                                            {numScore} (
                                            <DiceRoller formula={modStr} label={`${name} ${stat.toUpperCase()} check`} interactive={true} showIcon={false}>
                                                {modStr}
                                            </DiceRoller>
                                            /
                                            <DiceRoller formula={saveStr} label={`${name} ${stat.toUpperCase()} save`} interactive={true} showIcon={false}>
                                                {saveStr}
                                            </DiceRoller>
                                            )
                                        </span>
                                    ) : (
                                        formattedDisplay
                                    )}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={stat} className="statblock-stat-item">
                            <strong>{stat.toUpperCase()}</strong>
                            <div>{processDiceInChildren(String(value), isPlayMode, `${name} ${stat.toUpperCase()}`)}</div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderMovement = () => {
        if (!movement) return null;

        const unit = isEs ? 'pies' : 'feet';
        const activeMovements = Object.entries(movement)
            .filter(([_, speed]) => speed !== 0)
            .map(([type, speed]) => {
                const label = isEs ? (MOVEMENT_NAMES_ES[type] || type) : type;
                return `${label} ${speed} ${unit}`;
            });

        if (activeMovements.length === 0) return null;

        return (
            <div>
                <strong>{t('statblock.speed')}</strong> {activeMovements.join(', ')}
            </div>
        );
    };

    const bodyContent = (
        <div className="card-content card-description statblock-content">
            <div>
                <div>
                    <strong>{t('statblock.armorClass')}</strong> {ac}
                </div>
                {!isWildShape && hp && (
                    <div>
                        <strong>{t('statblock.hitPoints')}</strong> {processDiceInChildren(String(hp || ''), isPlayMode, `${name} HP`)}
                    </div>
                )}
                {renderMovement()}
            </div>
            <div>
                {senses && (() => {
                    const sensesObj = { ...senses };
                    delete sensesObj.passivePerception;
                    const unit = isEs ? 'pies' : 'feet';
                    const activeSenses = Object.entries(sensesObj)
                        .filter(([_, range]) => range !== 0)
                        .map(([type, range]) => {
                            const label = isEs ? (SENSES_ES[type] || type) : type;
                            return `${label} ${range} ${unit}`;
                        });

                    if (activeSenses.length === 0) return null;

                    return (
                        <div>
                            <strong>{t('statblock.senses')}</strong> {activeSenses.join(', ')}
                        </div>
                    );
                })()}
            </div>
            <mdui-divider></mdui-divider>

            {renderStats()}

            <div>
                {traits.length > 0 && (
                    <div>
                        <div className="statblock-section-header">
                            <span>{t('statblock.traits')}</span>
                            <mdui-divider></mdui-divider>
                        </div>
                        {traits.map((trait, i) => {
                            const traitTrans = isEs ? (STATBLOCK_TRAITS_ES[trait.name] || (trait.id ? { name: localize(trait.id, 'name', trait.name), description: localize(trait.id, 'description', trait.description) } : null)) : null;
                            const traitName = traitTrans?.name || trait.name;
                            const rawDesc = traitTrans?.description || trait.description;
                            const traitDesc = evaluateText(rawDesc, char || statblock);
                            return (
                                <div key={i}>
                                    <strong>{traitName}.</strong> <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{traitDesc}</ReactMarkdown>
                                </div>
                            );
                        })}
                    </div>
                )}

                {actions.length > 0 && (() => {
                    const sortedActions = [...actions].sort((a, b) => {
                        const aIsMulti = a.id === 'multiattack' || a.name?.toLowerCase() === 'multiattack';
                        const bIsMulti = b.id === 'multiattack' || b.name?.toLowerCase() === 'multiattack';
                        if (aIsMulti && !bIsMulti) return -1;
                        if (!aIsMulti && bIsMulti) return 1;
                        return 0;
                    });
                    return (
                        <div>
                            <div className="statblock-section-header">
                                <span>{t('statblock.actions')}</span>
                                <mdui-divider></mdui-divider>
                            </div>
                            {sortedActions.map((action, i) => (
                                <div key={i}>
                                    <strong>{statblockEntryLabel(action, lang, localize)}.</strong> <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{formatStatblockEntry(action, statblock, char, 'actions', formatMechanic)}</ReactMarkdown>
                                </div>
                            ))}
                        </div>
                    );
                })()}

                {bonusActions.length > 0 && (
                    <div>
                        <div className="statblock-section-header">
                            <span>{t('statblock.bonusActions')}</span>
                            <mdui-divider></mdui-divider>
                        </div>
                        {bonusActions.map((action, i) => (
                            <div key={i}>
                                <strong>{statblockEntryLabel(action, lang, localize)}.</strong> <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{formatStatblockEntry(action, statblock, char, 'bonusActions', formatMechanic)}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                )}

                {reactions.length > 0 && (
                    <div>
                        <div className="statblock-section-header">
                            <span>{t('statblock.reactions')}</span>
                            <mdui-divider></mdui-divider>
                        </div>
                        {reactions.map((reaction, i) => (
                            <div key={i}>
                                <strong>{statblockEntryLabel(reaction, lang, localize)}.</strong> <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{formatStatblockEntry(reaction, statblock, char, 'reactions', formatMechanic)}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    if (variant === 'static') {
        return (
            <mdui-card variant="outlined" class="card-container static-card statblock-card">
                {headerContent}
                <div className="card-content statblock-content-wrapper">
                    <AutoFitContent minFontSize={0.3} maxFontSize={0.78}>
                        {bodyContent}
                    </AutoFitContent>
                </div>
            </mdui-card>
        );
    }

    return (
        <mdui-collapse-item mdui-card class="card-container pseudo-card statblock-card">
            {headerContent}
            {bodyContent}
        </mdui-collapse-item>
    );
});
