import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderGridValue, renderIcon, sortDescription } from '../../utils/cardUtils';

import 'mdui/components/card.js';
import 'mdui/components/collapse-item.js';
import 'mdui/components/divider.js';

import { AutoFitContent } from '../AutoFitContent';

const markdownComponents = {
    p: ({ children }) => (
        <div className="card-description-paragraph">
            <p>{children}</p>
        </div>
    )
};

export const ActivityCard = memo(({ activity, variant = 'collapsible', char }) => {
    if (!activity) return null;

    const RESOURCE_WRAP_THRESHOLD = 10;

    const renderDots = (quantity) => {
        const rows = quantity > RESOURCE_WRAP_THRESHOLD ? Math.ceil(quantity / RESOURCE_WRAP_THRESHOLD) : 1;
        const dotsPerRow = Math.max(1, Math.ceil(quantity / rows));

        return (
            <div
                className="resource-dots"
                key="dots"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${dotsPerRow}, auto)`,
                    justifyItems: 'end',
                    direction: 'rtl',
                    gap: '2px'
                }}
            >
                {Array(quantity).fill(0).map((_, j) => (
                    <mdui-icon key={j} name="crop_square" style={{ transform: 'rotate(45deg)', direction: 'ltr' }} class="icon-small"></mdui-icon>
                ))}
            </div>
        );
    };

    const renderResourceOption = (resId) => {
        const lowerId = resId.toLowerCase();
        const isSpellSlot = lowerId.includes('spellslot');

        if (isSpellSlot) {
            // Requirement: check that the character actually has level<n>SpellSlot, or at the very least pactMagicSpellSlot
            const hasSpecific = char?.resources?.some(r => (r.id || '').toLowerCase() === lowerId || (r.name || '').toLowerCase() === lowerId);
            const hasPact = char?.resources?.some(r => r.id === 'pactMagicSpellSlot');

            if (!hasSpecific && !hasPact) return null;
            return <React.Fragment key={resId}>{renderIcon(resId, false)}</React.Fragment>;
        }

        // Standard resource logic
        const res = char?.resources?.find(r => r.id === resId || r.name === resId);

        // If resource exists and it's used by only ONE activity, show dots
        // UNLESS it's a spell slot (handled above)
        if (res) {
            const count = char.activities.filter(a => {
                const aRes = a.resource;
                return Array.isArray(aRes) ? aRes.includes(resId) : aRes === resId;
            }).length;

            if (count === 1) {
                return <React.Fragment key={resId}>{renderDots(res.quantity)}</React.Fragment>;
            }
        }

        return <React.Fragment key={resId}>{renderIcon(resId, false)}</React.Fragment>;
    };

    const hasExtra = activity.extra && (
        Array.isArray(activity.extra)
            ? activity.extra.some(line => {
                if (!line) return false;
                if (typeof line === 'object') {
                    return (line.name && String(line.name).trim() !== '') || (line.description && String(line.description).trim() !== '');
                }
                return String(line).trim() !== '';
            })
            : (typeof activity.extra === 'object'
                ? (activity.extra.name && String(activity.extra.name).trim() !== '') || (activity.extra.description && String(activity.extra.description).trim() !== '')
                : String(activity.extra).trim() !== '')
    );

    const headerContent = (
        <div className="card-header" slot={variant === 'collapsible' ? 'header' : undefined}>
            <span className="card-title">{activity.name}</span>
            <div className="card-meta">
                <div className="card-meta-resource">
                    {(() => {
                        const rawResource = activity.resource || activity.resources;
                        const resourceList = Array.isArray(rawResource) ? rawResource : (rawResource ? [rawResource] : []);
                        const options = resourceList.map(renderResourceOption).filter(Boolean);

                        const elements = [];
                        options.forEach((opt, i) => {
                            elements.push(opt);
                            if (i < options.length - 1) {
                                elements.push(<span key={`sep-${i}`} style={{ fontSize: '0.8rem', opacity: 0.7, fontWeight: 'bold' }}>or</span>);
                            }
                        });

                        if (activity.uses) {
                            if (elements.length > 0) {
                                elements.push(<span key="sep-uses" style={{ fontSize: '0.8rem', opacity: 0.7, fontWeight: 'bold' }}>or</span>);
                            }
                            elements.push(renderDots(activity.uses));
                        }

                        if (elements.length === 0) {
                            return renderIcon('atWill', false);
                        }

                        return elements;
                    })()}
                </div>
            </div>
        </div>
    );

    const bodyContent = (
        <>
            <div className="card-grid">
                {activity.time && renderGridValue(activity.time, 'time')}
                {activity.range && renderGridValue(activity.range, 'range')}
                {activity.duration && renderGridValue(activity.duration, 'duration')}
            </div>
            <div className="card-content">
                {variant === 'static' ? (
                    <AutoFitContent>
                        {activity.description && (
                            <div className="card-description">
                                {Array.isArray(activity.description) ?
                                    activity.description.map((line, i) => (
                                        <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={markdownComponents}>{line}</ReactMarkdown>
                                    )) :
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{activity.description}</ReactMarkdown>
                                }
                            </div>
                        )}


                        {hasExtra && (
                            <div className="card-description extra">
                                <mdui-divider></mdui-divider>
                                {Array.isArray(activity.extra) ?
                                    sortDescription(activity.extra).map((line, i) => (
                                        <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                            {typeof line === 'object' && line !== null
                                                ? `${line.name ? `**${line.name}.** ` : ''}${line.description || ''}`
                                                : String(line)}
                                        </ReactMarkdown>
                                    )) :
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                        {typeof activity.extra === 'object' && activity.extra !== null
                                            ? `${activity.extra.name ? `**${activity.extra.name}.** ` : ''}${activity.extra.description || ''}`
                                            : String(activity.extra)}
                                    </ReactMarkdown>
                                }
                            </div>
                        )}
                    </AutoFitContent>
                ) : (
                    <>
                        {activity.description && (
                            <div className="card-description">
                                {Array.isArray(activity.description) ?
                                    activity.description.map((line, i) => (
                                        <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={markdownComponents}>{line}</ReactMarkdown>
                                    )) :
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{activity.description}</ReactMarkdown>
                                }
                            </div>
                        )}

                        {hasExtra && (
                            <div className="card-description extra">
                                <mdui-divider></mdui-divider>

                                {Array.isArray(activity.extra) ?
                                    sortDescription(activity.extra).map((line, i) => (
                                        <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                            {typeof line === 'object' && line !== null
                                                ? `${line.name ? `**${line.name}.** ` : ''}${line.description || ''}`
                                                : String(line)}
                                        </ReactMarkdown>
                                    )) :
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                        {typeof activity.extra === 'object' && activity.extra !== null
                                            ? `${activity.extra.name ? `**${activity.extra.name}.** ` : ''}${activity.extra.description || ''}`
                                            : String(activity.extra)}
                                    </ReactMarkdown>
                                }
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );

    if (variant === 'static') {
        return (
            <mdui-card variant="outlined" class="card-container static-card">
                {headerContent}
                {bodyContent}
            </mdui-card>
        );
    }

    return (
        <mdui-collapse-item mdui-card class="card-container pseudo-card">
            {headerContent}
            {bodyContent}
        </mdui-collapse-item>
    );
});
