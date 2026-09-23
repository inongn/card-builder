import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatBonus } from '../../engine/RpgEngine';
import { getIconInfo, renderIcon, getResourceRecovery } from '../../utils/cardUtils';
import { AdvantageIndicator } from './AdvantageIndicator';
import { formatActivityMechanic } from '../../utils/mechanicFormatter';
import { processDiceInChildren } from './DiceRoller';
import { groupActivities, sortByResource, ActivitySheet } from './ActivitySheet';
import { useLocale } from '../../i18n';
import { localizeSubclass, localizeInfoboxValue, localizeSenseOrMovement, evaluateText } from '../../utils/sheetUtils';

import 'mdui/components/icon.js';

// ── Helpers ──────────────────────────────────────────────────────────────────

const categoryOrder = ['core', 'action', 'bonus action', 'reaction', 'free action', 'other'];

const getCategoryLabel = (key, t) => {
    switch (key) {
        case 'core': return t('activitySheet.coreActions');
        case 'action': return t('activitySheet.actions');
        case 'bonus action': return t('activitySheet.bonusActions');
        case 'reaction': return t('activitySheet.reactions');
        case 'free action': return t('activitySheet.specialActions');
        case 'other': return t('activitySheet.otherActions');
        default: return key;
    }
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
    const { localize, formatMechanic } = useLocale();
    const localName = localize(activity.id, 'name', activity.name);
    const localSummary = localize(activity.id, 'summary', activity.summary);
    const effectiveActivity = {
        ...activity,
        name: localName !== activity.name ? localName : activity.name,
        summary: localSummary !== activity.summary ? localSummary : activity.summary
    };
    const formattedLine = formatMechanic(effectiveActivity, char);
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
            <div className="cps-line">{processDiceInChildren(children, false, localName)}</div>
        ),
        blockquote: ({ children }) => <div className="cps-extra">{children}</div>,
        span: ({ children }) => <span>{processDiceInChildren(children, false, localName)}</span>,
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
    const { t, localize, lang } = useLocale();
    const sortedResources = showResources ? sortResources(char.resources || []) : [];

    // Passive info rows
    const infoRows = (() => {
        const rows = [];
        const infoSections = [
            { key: 'senses', label: t('characterSheet.senses'), data: char?.attributes?.senses },
            { key: 'movement', label: t('characterSheet.speed'), data: char?.attributes?.movement },
            { key: 'resistances', label: t('characterSheet.resistances'), data: char?.attributes?.resistances },
            { key: 'advantages', label: t('characterSheet.advantages'), data: char?.attributes?.advantages },
            { key: 'immunities', label: t('characterSheet.immunities'), data: char?.attributes?.immunities },
            { key: 'tools', label: t('characterSheet.tools'), data: char?.attributes?.tools },
        ];
        infoSections.forEach(({ key, label, data }) => {
            let displayData = [];
            if (Array.isArray(data)) {
                displayData = data.map(item => localizeInfoboxValue(item, key, localize, lang));
            } else if (data && typeof data === 'object') {
                displayData = Object.entries(data)
                    .filter(([k, v]) => v && !(key === 'movement' && k === 'walk'))
                    .map(([k, v]) => localizeSenseOrMovement(k, v, key, localize, lang));
            }
            if (displayData.length > 0) rows.push({ label, displayData });
        });
        return rows;
    })();

    const displayClass = (char.meta?.class && localize(char.meta.class.toLowerCase(), 'name', char.meta.class)) || char.meta?.class || '';
    const displaySub = localizeSubclass(char.meta?.sub, char.meta?.subId, localize, lang);
    const displaySpecies = (char.meta?.species && localize(char.meta.species.toLowerCase(), 'name', char.meta.species)) || char.meta?.species;
    const displayBg = (char.meta?.background && localize(char.meta.background.toLowerCase(), 'name', char.meta.background)) || char.meta?.background;

    return (
        <div className="cps-left-col" ref={leftColRef}>
            {/* Name / subtitle */}
            <div className="cps-name-block">
                <div className="cps-char-name">{char.meta.name}</div>
                <div className="cps-char-sub">
                    {[`${t('compactPrint.lv')} ${char.meta.level}`, `${displaySub} ${displayClass}`.trim()].filter(Boolean).join(' ')}
                    {(displaySpecies || displayBg) && (
                        <span className="cps-char-sub2">{' · '}{[displaySpecies, displayBg].filter(Boolean).join(' ')}</span>
                    )}
                </div>
            </div>

            {/* Combat row: Initiative, AC, Speed (No SectionHeading) */}
            <div className="cps-combat-row">
                <div className="cps-stat-box">
                    <div className="cps-stat-label">{t('compactPrint.initiative')}</div>
                    <div className="cps-stat-value">
                        {char.attributes.initiativeAdvantage && <AdvantageIndicator type="adv" />}
                        {char.attributes.initiativeDisadvantage && <AdvantageIndicator type="dis" />}
                        {formatBonus(char.attributes.initiative, true)}
                    </div>
                </div>
                <div className="cps-stat-box">
                    <div className="cps-stat-label">{t('compactPrint.armor')}</div>
                    <div className="cps-stat-value">{char.attributes.ac}</div>
                </div>
                <div className="cps-stat-box">
                    <div className="cps-stat-label">{t('compactPrint.speed')}</div>
                    <div className="cps-stat-value">{char.attributes.movement.walk}</div>
                </div>
            </div>

            {/* HP row (No SectionHeading) */}
            <div className="cps-hp-row">
                <div className="cps-hp-box">
                    <div className="cps-stat-label">{t('compactPrint.hp')}</div>
                    <div className="cps-stat-value">{char.attributes.hp}</div>
                    <div className="cps-stat-sub">d{char.attributes.hitDie}{char.stats.con.mod >= 0 ? `+${char.stats.con.mod}` : char.stats.con.mod}</div>
                </div>
                <div className="cps-hp-input-box">
                    <div className="cps-stat-label">{t('compactPrint.current')}</div>
                    <div className="cps-hp-blank" />
                </div>
                <div className="cps-hp-input-box">
                    <div className="cps-stat-label">{t('compactPrint.temp')}</div>
                    <div className="cps-hp-blank" />
                </div>
            </div>

            {/* Resources (rendered in Col 1 if space permits) */}
            {showResources && sortedResources.length > 0 && (
                <>
                    <SectionHeading label={t('compactPrint.resources')} />
                    <div className="cps-sheet-list">
                        {sortedResources.map((res, i) => {
                            const resKey = res.id || res.name;
                            const info = getIconInfo(resKey);
                            const q = res.quantity || 0;
                            const resDisplayName = localize(resKey, 'name', res.name || res.id);
                            return (
                                <div className="cps-item cps-resource-item" key={i}>
                                    <div className="cps-icon">
                                        <mdui-icon name={info?.icon || 'circle'} class="icon-small" style={{ color: `var(--color-${info?.color})` }} />
                                    </div>
                                    <div className="cps-content cps-line">
                                        <strong>{resDisplayName}</strong>
                                        <div className="cps-resource-right">
                                            <span className="cps-resource-qty">{q}</span>
                                            <span className="cps-resource-recovery">{getResourceRecovery(res, lang)}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Skills */}
            <SectionHeading label={t('compactPrint.skills')} />
            <div className="cps-skill-list">
                {Object.entries(char.skills).map(([key, skill]) => {
                    let profIcon = 'radio_button_unchecked';
                    if (skill.proficiency === 1) profIcon = 'circle';
                    if (skill.proficiency === 2) profIcon = 'add_circle';
                    else if (skill.proficiency === 0.5) profIcon = 'contrast';
                    const skillName = localize(key, 'name', skill.name);
                    return (
                        <div className="cps-skill-row" key={key}>
                            <span className="cps-skill-stat">{skill.stat.toUpperCase()}</span>
                            <mdui-icon name={profIcon} class="icon-small cps-prof-icon" />
                            <span className="cps-skill-bonus">{formatBonus(skill.bonus, true)}</span>
                            <span className="cps-skill-name">
                                {skill.adv && !skill.dis && <AdvantageIndicator type="adv" />}
                                {skill.dis && !skill.adv && <AdvantageIndicator type="dis" />}
                                {skill.min && <AdvantageIndicator type="min" value={skill.min} />}
                                {skillName}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Saving Throws */}
            <SectionHeading label={t('compactPrint.savingThrows')} />
            <div className="cps-saves-list">
                {Object.entries(char.saves).map(([key, save]) => {
                    let profIcon = 'radio_button_unchecked';
                    if (save.proficiency === 1) profIcon = 'circle';
                    if (save.proficiency === 2) profIcon = 'adjust';
                    else if (save.proficiency === 0.5) profIcon = 'circle_circle';
                    const rawSaveName = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                    const saveName = localize(key.toLowerCase(), 'name', rawSaveName);
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
                    <SectionHeading label={t('compactPrint.info')} />
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
                    <SectionHeading label={t('compactPrint.traits')} />
                    <div className="cps-sheet-list">
                        {char.traits.map((trait, i) => (
                            <div className="cps-item" key={trait.id || i}>
                                <div className="cps-content">
                                    <strong>{evaluateText(localize(trait.id, 'name', trait.name), char)}.</strong>{' '}<em>{evaluateText(localize(trait.id, 'description', trait.description), char)}</em>
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
    const { t, localize, lang } = useLocale();
    const sortedResources = sortResources(char.resources || []);

    // Activities grouped by category
    const allActivities = sortActivitiesByCategory(char.activities || []);
    const groupedActivities = groupActivities(allActivities);

    return (
        <div className="cps-right-col">
            {/* Resources */}
            {sortedResources.length > 0 && (
                <>
                    <SectionHeading label={t('compactPrint.resources')} />
                    <div className="cps-sheet-list">
                        {sortedResources.map((res, i) => {
                            const resKey = res.id || res.name;
                            const info = getIconInfo(resKey);
                            const q = res.quantity || 0;
                            const resDisplayName = localize(resKey, 'name', res.name || res.id);
                            return (
                                <div className="cps-item cps-resource-item" key={i}>
                                    <div className="cps-icon">
                                        <mdui-icon name={info?.icon || 'circle'} class="icon-small" style={{ color: `var(--color-${info?.color})` }} />
                                    </div>
                                    <div className="cps-content cps-line">
                                        <strong>{resDisplayName}</strong>
                                        <div className="cps-resource-right">
                                            <span className="cps-resource-qty">{q}</span>
                                            <span className="cps-resource-recovery">{getResourceRecovery(res, lang)}</span>
                                        </div>
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
                    <SectionHeading label={t('compactPrint.traits')} />
                    <div className="cps-sheet-list">
                        {char.traits.map((trait, i) => (
                            <div className="cps-item" key={trait.id || i}>
                                <div className="cps-content">
                                    <strong>{evaluateText(localize(trait.id, 'name', trait.name), char)}.</strong>{' '}<em>{evaluateText(localize(trait.id, 'description', trait.description), char)}</em>
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
                        <SectionHeading label={getCategoryLabel(catKey, t)} />
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
    const { t, localize, lang } = useLocale();
    const sortedResources = showResources ? [] : sortResources(char.resources || []);
    const renderTraits = !showTraits;

    return (
        <div className="cps-right-col">
            {/* Resources (rendered in Col 2 only if NOT in Col 1) */}
            {sortedResources.length > 0 && (
                <>
                    <SectionHeading label={t('compactPrint.resources')} />
                    <div className="cps-sheet-list">
                        {sortedResources.map((res, i) => {
                            const resKey = res.id || res.name;
                            const info = getIconInfo(resKey);
                            const q = res.quantity || 0;
                            const resDisplayName = localize(resKey, 'name', res.name || res.id);
                            return (
                                <div className="cps-item cps-resource-item" key={i}>
                                    <div className="cps-icon">
                                        <mdui-icon name={info?.icon || 'circle'} class="icon-small" style={{ color: `var(--color-${info?.color})` }} />
                                    </div>
                                    <div className="cps-content cps-line">
                                        <strong>{resDisplayName}</strong>
                                        <div className="cps-resource-right">
                                            <span className="cps-resource-qty">{q}</span>
                                            <span className="cps-resource-recovery">{getResourceRecovery(res, lang)}</span>
                                        </div>
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
                    <SectionHeading label={t('compactPrint.traits')} />
                    <div className="cps-sheet-list">
                        {char.traits.map((trait, i) => (
                            <div className="cps-item" key={trait.id || i}>
                                <div className="cps-content">
                                    <strong>{evaluateText(localize(trait.id, 'name', trait.name), char)}.</strong>{' '}<em>{evaluateText(localize(trait.id, 'description', trait.description), char)}</em>
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
