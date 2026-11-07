import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderGridValue } from '../../utils/cardUtils';
import { processDiceInChildren, DiceRoller } from './DiceRoller';
import { formatBonus } from '../../engine/helpers.js';
import 'mdui/components/card.js';
import 'mdui/components/collapse-item.js';
import 'mdui/components/divider.js';
import { AutoFitContent } from '../AutoFitContent';
import { useLocale } from '../../i18n';

export const StatblockCard = memo(({ statblock, variant = 'collapsible', char }) => {
    if (!statblock) return null;

    const { t } = useLocale();
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

    const markdownComponents = {
        p: ({ children }) => (
            <span>{processDiceInChildren(children, isPlayMode, name)}</span>
        ),
        span: ({ children }) => (
            <span>{processDiceInChildren(children, isPlayMode, name)}</span>
        )
    };

    const headerContent = (
        <div className="card-header" slot={variant === 'collapsible' ? 'header' : undefined}>
            <span className="card-title">{name}</span>
            <div className="card-meta">
                <span className="text-secondary">{size} {classification}</span>
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

        const activeMovements = Object.entries(movement)
            .filter(([_, speed]) => speed !== 0)
            .map(([type, speed]) => `${type} ${speed} ft.`);

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
                    const activeSenses = Object.entries(sensesObj)
                        .filter(([_, range]) => range !== 0)
                        .map(([type, range]) => `${type} ${range} ft.`);

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
                        {traits.map((trait, i) => (
                            <div key={i}>
                                <strong>{trait.name}.</strong> <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{trait.description}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                )}

                {actions.length > 0 && (
                    <div>
                        <div className="statblock-section-header">
                            <span>{t('statblock.actions')}</span>
                            <mdui-divider></mdui-divider>
                        </div>
                        {actions.map((action, i) => (
                            <div key={i}>
                                <strong>{action.name}.</strong> <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{action.description}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                )}

                {bonusActions.length > 0 && (
                    <div>
                        <div className="statblock-section-header">
                            <span>{t('statblock.bonusActions')}</span>
                            <mdui-divider></mdui-divider>
                        </div>
                        {bonusActions.map((action, i) => (
                            <div key={i}>
                                <strong>{action.name}.</strong> <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{action.description}</ReactMarkdown>
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
                                <strong>{reaction.name}.</strong> <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{reaction.description}</ReactMarkdown>
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
