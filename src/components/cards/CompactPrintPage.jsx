import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatBonus } from '../../engine/RpgEngine';
import { getIconInfo, renderIcon } from '../../utils/cardUtils';
import { AdvantageIndicator } from './AdvantageIndicator';
import { formatActivityMechanic } from '../../utils/mechanicFormatter';
import { processDiceInChildren } from './DiceRoller';
import { groupActivities, sortByResource, ActivitySheet } from './ActivitySheet';


import 'mdui/components/icon.js';

// ── Helpers ──────────────────────────────────────────────────────────────────

const categoryOrder = ['core', 'action', 'bonus action', 'reaction', 'free action', 'other'];
const categoryLabels = {
    core: 'Core Actions',
    action: 'Actions',
    'bonus action': 'Bonus Actions',
    reaction: 'Reactions',
    'free action': 'Special Actions',
    other: 'Other',
};

function sortActivitiesByCategory(activities = []) {
    const grouped = groupActivities(activities);
    const sorted = [];
    categoryOrder.forEach(key => {
        if (grouped[key] && grouped[key].length > 0) {
            sorted.push(...sortByResource(grouped[key]));
        }
    });
    return sorted;
}

// Sort resources: spell slots last (ascending level), others by quantity desc
function sortResources(resources = []) {
    const THRESHOLD = 10;
    if (!resources || resources.length === 0) return [];
    const spellSlots = [];
    const other = [];
    resources.forEach(res => {
        if ((res.id || '').match(/^level\d+SpellSlot$/)) spellSlots.push(res);
        else other.push(res);
    });
    const sv = (res) => {
        const q = res.quantity || 0;
        return q <= THRESHOLD ? q : Math.ceil(q / Math.ceil(q / THRESHOLD));
    };
    spellSlots.sort((a, b) => parseInt((a.id || '').match(/\d+/)?.[0] || '0') - parseInt((b.id || '').match(/\d+/)?.[0] || '0'));
    other.sort((a, b) => {
        const d = sv(b) - sv(a); if (d !== 0) return d;
        const qd = (b.quantity || 0) - (a.quantity || 0); if (qd !== 0) return qd;
        return (a.name || '').localeCompare(b.name || '');
    });
    return [...other, ...spellSlots];
}

// ── Compact activity-style item ───────────────────────────────────────────────

const CompactSheetItem = memo(({ activity, char }) => {
    if (!activity) return null;
    const formattedLine = formatActivityMechanic(activity, char);
    const rawResource = activity.resource || activity.resources;
    const resourceList = Array.isArray(rawResource) ? rawResource : (rawResource ? [rawResource] : []);
    let resourceIcon = null;
    for (const resId of resourceList) {
        if (!resId) continue;
        const lowerId = String(resId).toLowerCase();
        if (lowerId.includes('spellslot')) {
            const hasSpecific = char?.resources ? char.resources.some(r => (r.id || '').toLowerCase() === lowerId || (r.name || '').toLowerCase() === lowerId) : true;
            const hasPact = char?.resources ? char.resources.some(r => r.id === 'pactMagicSpellSlot') : false;
            if (hasSpecific || hasPact) { resourceIcon = renderIcon(resId, false); break; }
        } else {
            resourceIcon = renderIcon(resId, false);
            break;
        }
    }

    const mdComponents = {
        p: ({ children }) => (
            <div className="cps-line">{processDiceInChildren(children, false, activity.name)}</div>
        ),
        blockquote: ({ children }) => <div className="cps-extra">{children}</div>,
        span: ({ children }) => <span>{processDiceInChildren(children, false, activity.name)}</span>,
    };

    return (
        <div className="cps-item">
            {resourceIcon && <div className="cps-icon">{resourceIcon}</div>}
            <div className="cps-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {formattedLine}
                </ReactMarkdown>
            </div>
        </div>
    );
});

// ── Section heading used across both columns ──────────────────────────────────

const SectionHeading = ({ label }) => (
    <div className="cps-heading">{label}</div>
);

// ── Left column: Name, Combat, HP, Resources?, Skills, Saves, Info, Traits? ─

const CompactLeftColumn = memo(({ char, leftColRef, showResources = false, showTraits = false }) => {
    const sortedResources = showResources ? sortResources(char.resources || []) : [];

    // Passive info rows
    const infoRows = (() => {
        const rows = [];
        const infoSections = [
            { label: 'Senses', data: char?.attributes?.senses },
            { label: 'Movement', data: char?.attributes?.movement },
            { label: 'Resistances', data: char?.attributes?.resistances },
            { label: 'Advantages', data: char?.attributes?.advantages },
            { label: 'Immunities', data: char?.attributes?.immunities },
            { label: 'Tools', data: char?.attributes?.tools },
        ];
        infoSections.forEach(({ label, data }) => {
            let displayData = [];
            if (Array.isArray(data)) {
                displayData = [...data];
            } else if (data && typeof data === 'object') {
                displayData = Object.entries(data)
                    .filter(([k, v]) => v && !(label === 'Movement' && k === 'walk'))
                    .map(([k, v]) => {
                        const l = k.charAt(0).toUpperCase() + k.slice(1);
                        const unit = typeof v === 'number' ? ' ft' : '';
                        return `${l} (${v}${unit})`;
                    });
            }
            if (displayData.length > 0) rows.push({ label, displayData });
        });
        return rows;
    })();

    return (
        <div className="cps-left-col" ref={leftColRef}>
            {/* Name / subtitle */}
            <div className="cps-name-block">
                <div className="cps-char-name">{char.meta.name}</div>
                <div className="cps-char-sub">
                    {[`Level ${char.meta.level}`, `${char.meta.sub || ''} ${char.meta.class || ''}`.trim()].filter(Boolean).join(' ')}
                    {(char.meta.species || char.meta.background) && (
                        <span className="cps-char-sub2">{' · '}{[char.meta.species, char.meta.background].filter(Boolean).join(' ')}</span>
                    )}
                </div>
            </div>

            {/* Combat row: Initiative, AC, Speed (No SectionHeading) */}
            <div className="cps-combat-row">
                <div className="cps-stat-box">
                    <div className="cps-stat-label">Initiative</div>
                    <div className="cps-stat-value">
                        {char.attributes.initiativeAdvantage && <AdvantageIndicator type="adv" />}
                        {char.attributes.initiativeDisadvantage && <AdvantageIndicator type="dis" />}
                        {formatBonus(char.attributes.initiative, true)}
                    </div>
                </div>
                <div className="cps-stat-box">
                    <div className="cps-stat-label">Armor</div>
                    <div className="cps-stat-value">{char.attributes.ac}</div>
                </div>
                <div className="cps-stat-box">
                    <div className="cps-stat-label">Speed</div>
                    <div className="cps-stat-value">{char.attributes.movement.walk}</div>
                </div>
            </div>

            {/* HP row (No SectionHeading) */}
            <div className="cps-hp-row">
                <div className="cps-hp-box">
                    <div className="cps-stat-label">Max</div>
                    <div className="cps-stat-value">{char.attributes.hp}</div>
                    <div className="cps-stat-sub">d{char.attributes.hitDie}{char.stats.con.mod >= 0 ? `+${char.stats.con.mod}` : char.stats.con.mod}</div>
                </div>
                <div className="cps-hp-input-box">
                    <div className="cps-stat-label">Current HP</div>
                    <div className="cps-hp-blank" />
                </div>
                <div className="cps-hp-input-box">
                    <div className="cps-stat-label">Temp HP</div>
                    <div className="cps-hp-blank" />
                </div>
            </div>

            {/* Resources (rendered in Col 1 if space permits) */}
            {showResources && sortedResources.length > 0 && (
                <>
                    <SectionHeading label="Resources" />
                    <div className="cps-sheet-list">
                        {sortedResources.map((res, i) => {
                            const resKey = res.id || res.name;
                            const info = getIconInfo(resKey);
                            const q = res.quantity || 0;
                            return (
                                <div className="cps-item cps-resource-item" key={i}>
                                    <div className="cps-icon">
                                        <mdui-icon name={info?.icon || 'circle'} class="icon-small" style={{ color: `var(--color-${info?.color})` }} />
                                    </div>
                                    <div className="cps-content cps-line">
                                        <strong>{res.name || res.id}</strong>
                                        <span className="cps-resource-qty">{q}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Skills */}
            <SectionHeading label="Skills" />
            <div className="cps-skill-list">
                {Object.entries(char.skills).map(([key, skill]) => {
                    let profIcon = 'radio_button_unchecked';
                    if (skill.proficiency === 1) profIcon = 'circle';
                    if (skill.proficiency === 2) profIcon = 'add_circle';
                    else if (skill.proficiency === 0.5) profIcon = 'contrast';
                    return (
                        <div className="cps-skill-row" key={key}>
                            <span className="cps-skill-stat">{skill.stat.toUpperCase()}</span>
                            <mdui-icon name={profIcon} class="icon-small cps-prof-icon" />
                            <span className="cps-skill-bonus">{formatBonus(skill.bonus, true)}</span>
                            <span className="cps-skill-name">
                                {skill.adv && !skill.dis && <AdvantageIndicator type="adv" />}
                                {skill.dis && !skill.adv && <AdvantageIndicator type="dis" />}
                                {skill.min && <AdvantageIndicator type="min" value={skill.min} />}
                                {skill.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Saving Throws */}
            <SectionHeading label="Saving Throws" />
            <div className="cps-saves-list">
                {Object.entries(char.saves).map(([key, save]) => {
                    let profIcon = 'radio_button_unchecked';
                    if (save.proficiency === 1) profIcon = 'circle';
                    if (save.proficiency === 2) profIcon = 'adjust';
                    else if (save.proficiency === 0.5) profIcon = 'circle_circle';
                    const saveName = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                    return (
                        <div className="cps-save-row" key={key}>
                            <mdui-icon name={profIcon} class="icon-small cps-prof-icon" />
                            <span className="cps-skill-bonus">{formatBonus(save.bonus, true)}</span>
                            <span className="cps-skill-name">
                                {save.adv && <AdvantageIndicator type="adv" />}
                                {save.dis && <AdvantageIndicator type="dis" />}
                                {save.min && <AdvantageIndicator type="min" value={save.min} />}
                                {saveName}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Info */}
            {infoRows.length > 0 && (
                <>
                    <SectionHeading label="Info" />
                    <div className="cps-sheet-list">
                        {infoRows.map(({ label, displayData }, idx) => (
                            <div className="cps-item" key={idx}>
                                <div className="cps-content">
                                    <strong>{label}:</strong>{' '}{displayData.join(', ')}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Traits (rendered in Col 1 if space permits) */}
            {showTraits && char.traits && char.traits.length > 0 && (
                <>
                    <SectionHeading label="Traits" />
                    <div className="cps-sheet-list">
                        {char.traits.map((trait, i) => (
                            <div className="cps-item" key={trait.id || i}>
                                <div className="cps-content">
                                    <strong>{trait.name}.</strong>{' '}<em>{trait.description}</em>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
});

// ── Right column: Resources?, Traits?, Activities ─────────────────────────────

const CompactRightColumn = memo(({ char }) => {
    const sortedResources = sortResources(char.resources || []);

    // Activities grouped by category
    const allActivities = sortActivitiesByCategory(char.activities || []);
    const groupedActivities = groupActivities(allActivities);

    return (
        <div className="cps-right-col">
            {/* Resources */}
            {sortedResources.length > 0 && (
                <>
                    <SectionHeading label="Resources" />
                    <div className="cps-sheet-list">
                        {sortedResources.map((res, i) => {
                            const resKey = res.id || res.name;
                            const info = getIconInfo(resKey);
                            const q = res.quantity || 0;
                            return (
                                <div className="cps-item cps-resource-item" key={i}>
                                    <div className="cps-icon">
                                        <mdui-icon name={info?.icon || 'circle'} class="icon-small" style={{ color: `var(--color-${info?.color})` }} />
                                    </div>
                                    <div className="cps-content cps-line">
                                        <strong>{res.name || res.id}</strong>
                                        <span className="cps-resource-qty">{q}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Traits */}
            {char.traits && char.traits.length > 0 && (
                <>
                    <SectionHeading label="Traits" />
                    <div className="cps-sheet-list">
                        {char.traits.map((trait, i) => (
                            <div className="cps-item" key={trait.id || i}>
                                <div className="cps-content">
                                    <strong>{trait.name}.</strong>{' '}<em>{trait.description}</em>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Activities by category */}
            {categoryOrder.map(catKey => {
                const acts = groupedActivities[catKey] || [];
                if (acts.length === 0) return null;
                return (
                    <div key={catKey} className="aside-card-group">
                        <SectionHeading label={categoryLabels[catKey]} />
                        <div className="cps-sheet-list">
                            {acts.map((act, idx) => (
                                <CompactSheetItem key={`${act.id || 'act'}-${idx}`} activity={act} char={char} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

// ── Main export ───────────────────────────────────────────────────────────────

export const CompactPrintPage = memo(({ char, style }) => {
    if (!char) return null;
    return (
        <div className="cps-page" style={style}>
            <CompactLeftColumn char={char} showResources={false} showTraits={false} />
            <CompactRightColumn char={char} />
        </div>
    );
});

// ── Right column for compact activity layout ───────────────────────────────────

const CompactActivityRightColumn = memo(({ char, activitySlotRef, groupedActivities, showResources = true, showTraits = true }) => {
    const sortedResources = showResources ? [] : sortResources(char.resources || []);
    const renderTraits = !showTraits;

    return (
        <div className="cps-right-col">
            {/* Resources (rendered in Col 2 only if NOT in Col 1) */}
            {sortedResources.length > 0 && (
                <>
                    <SectionHeading label="Resources" />
                    <div className="cps-sheet-list">
                        {sortedResources.map((res, i) => {
                            const resKey = res.id || res.name;
                            const info = getIconInfo(resKey);
                            const q = res.quantity || 0;
                            return (
                                <div className="cps-item cps-resource-item" key={i}>
                                    <div className="cps-icon">
                                        <mdui-icon name={info?.icon || 'circle'} class="icon-small" style={{ color: `var(--color-${info?.color})` }} />
                                    </div>
                                    <div className="cps-content cps-line">
                                        <strong>{res.name || res.id}</strong>
                                        <span className="cps-resource-qty">{q}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Traits (rendered in Col 2 only if NOT in Col 1) */}
            {renderTraits && char.traits && char.traits.length > 0 && (
                <>
                    <SectionHeading label="Traits" />
                    <div className="cps-sheet-list">
                        {char.traits.map((trait, i) => (
                            <div className="cps-item" key={trait.id || i}>
                                <div className="cps-content">
                                    <strong>{trait.name}.</strong>{' '}<em>{trait.description}</em>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Activities Slot 0 — measured for overflow */}
            <div className="cps-activity-slot" ref={activitySlotRef}>
                <ActivitySheet
                    groupedActivities={groupedActivities}
                    characterData={char}
                    printMode={true}
                />
            </div>
        </div>
    );
});

// ── Compact first page: left half = 2-col compact panel, right half = overflow ─

export const CompactActivityPrintPage = memo(({
    char,
    style,
    leftColRef,
    activitySlotRef,
    page1OverflowRef,
    groupedActivities,
    page1OverflowActivities,
    showResourcesInCol1 = true,
    showTraitsInCol1 = true
}) => {
    if (!char) return null;
    return (
        <div className="print-page first-page activity-sheet-print-page" style={style}>
            <div className="print-grid activity-sheet-2x1-grid">
                {/* Left half-page: compact two-column panel */}
                <div className="compact-charsheet-print-slot">
                    <div className="cps-two-col-panel">
                        <CompactLeftColumn
                            char={char}
                            leftColRef={leftColRef}
                            showResources={showResourcesInCol1}
                            showTraits={showTraitsInCol1}
                        />
                        <CompactActivityRightColumn
                            char={char}
                            activitySlotRef={activitySlotRef}
                            groupedActivities={groupedActivities}
                            showResources={showResourcesInCol1}
                            showTraits={showTraitsInCol1}
                        />
                    </div>
                </div>
                {/* Right half-page: slot 1 overflow from the compact right col */}
                <div className="activity-sheet-print-slot" ref={page1OverflowRef}>
                    {page1OverflowActivities && (
                        <ActivitySheet
                            groupedActivities={page1OverflowActivities}
                            characterData={char}
                            printMode={true}
                        />
                    )}
                </div>
            </div>
        </div>
    );
});
