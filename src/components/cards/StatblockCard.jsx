import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderGridValue } from '../../utils/cardUtils';
import 'mdui/components/card.js';
import 'mdui/components/collapse-item.js';
import 'mdui/components/divider.js';
import { AutoFitContent } from '../AutoFitContent';

export const StatblockCard = memo(({ statblock, variant = 'collapsible' }) => {
    if (!statblock) return null;

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
        bonusActions = []
    } = statblock;


    const headerContent = (
        <div className="card-header" slot={variant === 'collapsible' ? 'header' : undefined}>
            <span className="card-title">{category.charAt(0).toUpperCase() + category.slice(1)}: {name}</span>
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
                        <div>{value}</div>
                    </div>
                ))}
            </div>
        );
    };

    const renderMovement = () => {
        if (!movement) return null;
        return (
            <div>
                <strong>Speed</strong> {Object.entries(movement).map(([type, speed]) => `${type} ${speed} ft.`).join(', ')}
            </div>
        );
    };

    const bodyContent = (
        <div className="card-content">
            <div>
                <div>
                    <strong>Armor Class</strong> {ac}
                </div>
                <div>
                    <strong>Hit Points</strong> {hp}
                </div>
                {renderMovement()}
            </div>
            <div>
                {senses && (
                    <div>
                        <strong>Senses</strong> {Object.entries(senses).map(([type, range]) => `${type} ${range} ft.`).join(', ')}
                    </div>
                )}
            </div>
            <mdui-divider></mdui-divider>

            {renderStats()}





            <div>
                {traits.length > 0 && (
                    <div>
                        <mdui-divider></mdui-divider>
                        {traits.map((trait, i) => (
                            <div key={i}>
                                <strong>{trait.name}.</strong> <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: 'span' }}>{trait.description}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                )}

                <mdui-divider></mdui-divider>

                {actions.length > 0 && (
                    <div>
                        {actions.map((action, i) => (
                            <div key={i}>
                                <strong>{action.name}.</strong> <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: 'span' }}>{action.description}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                )}


                {bonusActions.length > 0 && (
                    <div>
                        <mdui-divider></mdui-divider>
                        {bonusActions.map((action, i) => (
                            <div key={i}>
                                <strong>{action.name}.</strong> <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: 'span' }}>{action.description}</ReactMarkdown>
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
                <AutoFitContent>
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
