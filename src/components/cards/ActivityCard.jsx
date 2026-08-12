import React, { memo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderGridValue, renderIcon, sortDescription } from '../../utils/cardUtils';
import { processDiceInChildren } from './DiceRoller';
import { formatActivityMechanic } from '../../utils/mechanicFormatter';

import 'mdui/components/card.js';
import 'mdui/components/collapse-item.js';
import 'mdui/components/divider.js';

import { AutoFitContent } from '../AutoFitContent';

export const ActivityCard = memo(({ activity, variant = 'collapsible', char }) => {
    if (!activity) return null;

    const isPlayMode = variant !== 'static';
    const RESOURCE_WRAP_THRESHOLD = 10;
    const [usedDots, setUsedDots] = useState(0);

    const markdownComponents = {
        p: ({ children }) => (
            <div className="card-description-paragraph">
                <p>{processDiceInChildren(children, isPlayMode, activity.name)}</p>
            </div>
        ),
        li: ({ children }) => (
            <li>{processDiceInChildren(children, isPlayMode, activity.name)}</li>
        ),
        span: ({ children }) => (
            <span>{processDiceInChildren(children, isPlayMode, activity.name)}</span>
        )
    };

    const handleDotClick = (e, index) => {
        e.stopPropagation();
        if (!isPlayMode) return;
        setUsedDots(prev => (prev > index ? index : index + 1));
    };

    const renderDots = (quantity) => {
        const rows = quantity > RESOURCE_WRAP_THRESHOLD ? Math.ceil(quantity / RESOURCE_WRAP_THRESHOLD) : 1;
        const dotsPerRow = Math.max(1, Math.ceil(quantity / rows));

        return (
            <div
                className="resource-dots"
                key="dots"
                style={{ gridTemplateColumns: `repeat(${dotsPerRow}, auto)` }}
            >
                {Array(quantity).fill(0).map((_, j) => {
                    const isUsed = j < usedDots;
                    return (
                        <mdui-icon
                            key={j}
                            name={isUsed ? 'square' : 'crop_square'}
                            class={`icon-small icon-rotated ${isPlayMode ? 'resource-dot-interactive' : ''} ${isUsed ? 'used' : ''}`}
                            onClick={(e) => handleDotClick(e, j)}
                        ></mdui-icon>
                    );
                })}
            </div>
        );
    };

    const renderResourceOption = (resId) => {
        const lowerId = resId.toLowerCase();
        const isSpellSlot = lowerId.includes('spellslot');

        if (isSpellSlot) {
            const hasSpecific = char?.resources?.some(r => (r.id || '').toLowerCase() === lowerId || (r.name || '').toLowerCase() === lowerId);
            const hasPact = char?.resources?.some(r => r.id === 'pactMagicSpellSlot');

            if (!hasSpecific && !hasPact) return null;
            return <React.Fragment key={resId}>{renderIcon(resId, false)}</React.Fragment>;
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

                        const hasResourceIcon = options.length > 0;

                        const tags = activity.tags || [];
                        const isLimited = activity.uses === 1 || tags.includes('innateLR') || tags.includes('innateSR') || tags.includes('limitedLR') || tags.includes('limitedSR');

                        if (hasResourceIcon) {
                            const elements = [];
                            options.forEach((opt, i) => {
                                elements.push(opt);
                                if (i < options.length - 1) {
                                    elements.push(<span key={`sep-${i}`} className="text-or-separator">or</span>);
                                }
                            });
                            return elements;
                        }

                        if (isLimited) {
                            const isUsed = usedDots > 0;
                            return (
                                <mdui-icon
                                    name="replay"
                                    class={`icon-middle ${isPlayMode ? 'resource-dot-interactive' : ''} ${isUsed ? 'used' : ''}`}
                                    style={{ color: isUsed ? 'var(--mdui-color-outline)' : 'var(--color-accent)' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (isPlayMode) setUsedDots(prev => (prev ? 0 : 1));
                                    }}
                                ></mdui-icon>
                            );
                        }

                        if (activity.uses && activity.uses > 1) {
                            return renderDots(activity.uses);
                        }

                        return renderIcon('atWill', false);
                    })()}
                </div>
            </div>
        </div>
    );

    const getActivitySubtitle = () => {
        const tags = activity.tags || [];

        // 0. Weapon Attack check
        const isWeaponAttack = (activity.id && String(activity.id).toLowerCase().includes('weaponattack')) ||
            tags.some(t => String(t).toLowerCase() === 'weaponattack');

        if (isWeaponAttack) {
            return 'Weapon Attack';
        }

        // 1. Spells check
        const isSpell = tags.some(t => String(t).includes('Spell') || String(t) === 'cantrip') || (activity.resource && String(activity.resource).toLowerCase().includes('spell'));

        if (isSpell) {
            const schools = ['abjuration', 'conjuration', 'divination', 'enchantment', 'evocation', 'illusion', 'necromancy', 'transmutation'];
            const foundSchoolTag = tags.find(t => schools.includes(String(t).toLowerCase()));
            const schoolName = foundSchoolTag
                ? foundSchoolTag.charAt(0).toUpperCase() + foundSchoolTag.slice(1).toLowerCase()
                : '';

            const isCantrip = tags.includes('cantrip');
            if (isCantrip) {
                return schoolName ? `${schoolName} Cantrip` : 'Cantrip';
            }

            let levelNum = null;
            const levelTag = tags.find(t => /^level\d+Spell$/i.test(String(t)));
            if (levelTag) {
                const match = levelTag.match(/\d+/);
                if (match) levelNum = match[0];
            } else if (activity.resource) {
                const match = String(activity.resource).match(/\d+/);
                if (match) levelNum = match[0];
            }

            if (levelNum) {
                return schoolName ? `Level ${levelNum} ${schoolName}` : `Level ${levelNum} Spell`;
            }

            return schoolName ? `${schoolName} Spell` : 'Spell';
        }

        // 2. Ancestry / Parent tags check for Species, Subclass, Class
        const ancestry = activity.sourceAncestry || [];
        const allAncestryTags = ancestry.flatMap(a => (a.tags || []).map(t => String(t).toLowerCase()));
        const allAncestryIds = ancestry.map(a => String(a.id || '').toLowerCase());
        const allAncestryFilledTags = ancestry.flatMap(a => (a.filledTags || []).map(t => String(t).toLowerCase()));

        // Check isFeat first — a feat benefit should be labeled as such even when the feat
        // was granted via a species trait (human Versatile) or a class feature/invocation
        // (Lessons of the First Ones). Without this, the species/class ancestor check fires first.
        const isFeat = tags.some(t => String(t).toLowerCase().includes('feat')) ||
            allAncestryTags.some(t => t.includes('feat')) ||
            allAncestryFilledTags.some(t => t.includes('feat')) ||
            allAncestryIds.some(id => id.includes('feat'));

        if (isFeat) return 'Feat Benefit';

        const isSpecies = tags.some(t => String(t).toLowerCase() === 'species') ||
            allAncestryTags.includes('species') ||
            allAncestryIds.some(id => id.startsWith('species-') || id === 'species');

        if (isSpecies) return 'Species Trait';

        const isSubclass = tags.some(t => String(t).toLowerCase().includes('subclass')) ||
            allAncestryTags.some(t => t.includes('subclass')) ||
            allAncestryIds.some(id => id.includes('subclass'));

        if (isSubclass) return 'Subclass Feature';

        const isClass = tags.some(t => String(t).toLowerCase() === 'class') ||
            allAncestryTags.includes('class') ||
            allAncestryIds.some(id => id.startsWith('class-') || id.includes('class'));

        if (isClass) return 'Class Feature';

        return 'Core Feature';
    };

    const displayDescription = activity.description || formatActivityMechanic(activity, char);

    let subtitleText = getActivitySubtitle();

    const bodyContent = (
        <>
            {subtitleText && (
                <div className="card-subtitle-container">
                    <span className="card-subtitle">{subtitleText}</span>
                </div>
            )}
            <div className="card-grid">
                {activity.time && renderGridValue(activity.time, 'time')}
                {activity.range && renderGridValue(activity.range, 'range')}
                {activity.duration && renderGridValue(activity.duration, 'duration')}
            </div>
            <div className="card-content">
                {variant === 'static' ? (
                    <AutoFitContent>
                        {displayDescription && (
                            <div className="card-description">
                                {Array.isArray(displayDescription) ?
                                    displayDescription.map((line, i) => (
                                        <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={markdownComponents}>{line}</ReactMarkdown>
                                    )) :
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{displayDescription}</ReactMarkdown>
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
                        {displayDescription && (
                            <div className="card-description">
                                {Array.isArray(displayDescription) ?
                                    displayDescription.map((line, i) => (
                                        <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={markdownComponents}>{line}</ReactMarkdown>
                                    )) :
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{displayDescription}</ReactMarkdown>
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
