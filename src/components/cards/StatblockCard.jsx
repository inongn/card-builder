import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderGridValue } from '../../utils/cardUtils';
import { processDiceInChildren, DiceRoller } from './DiceRoller';
import 'mdui/components/card.js';
import 'mdui/components/collapse-item.js';
import 'mdui/components/divider.js';
import { AutoFitContent } from '../AutoFitContent';

export const StatblockCard = memo(({ statblock, variant = 'collapsible' }) => {
    if (!statblock) return null;

    const isPlayMode = variant !== 'static';

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

    const renderStats = () => {
        if (!stats) return null;
        return (
            <div className="statblock-stats-row">
                {Object.entries(stats).map(([stat, value]) => (
                    <div key={stat} className="statblock-stat-item">
                        <strong>{stat.toUpperCase()}</strong>
                        <div>{processDiceInChildren(String(value), isPlayMode, `${name} ${stat.toUpperCase()}`)}</div>
                    </div>
                ))}
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
                <strong>Speed</strong> {activeMovements.join(', ')}
            </div>
        );
    };

    const bodyContent = (
        <div className="card-content card-description">
            <div>
                <div>
                    <strong>Armor Class</strong> {ac}
                </div>
                <div>
                    <strong>Hit Points</strong> {processDiceInChildren(String(hp || ''), isPlayMode, `${name} HP`)}
                </div>
                {renderMovement()}
            </div>
            <div>
                {senses && (() => {
                    const activeSenses = Object.entries(senses)
                        .filter(([_, range]) => range !== 0)
                        .map(([type, range]) => `${type} ${range} ft.`);

                    if (activeSenses.length === 0) return null;

                    return (
                        <div>
                            <strong>Senses</strong> {activeSenses.join(', ')}
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
                            <span>Traits</span>
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
                            <span>Actions</span>
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
                            <span>Bonus Actions</span>
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
                            <span>Reactions</span>
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
                <AutoFitContent minFontSize={0.35}>
                    {bodyContent}
                </AutoFitContent>
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
