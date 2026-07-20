import React, { memo, useMemo } from 'react';
import { formatBonus } from '../../engine/RpgEngine';
import { getIconInfo } from '../../utils/cardUtils';
import { AdvantageIndicator } from './AdvantageIndicator';

import 'mdui/components/card.js';
import 'mdui/components/chip.js';
import 'mdui/components/icon.js';


export const CharacterSheet = memo(React.forwardRef(({ char, onNavigate, className }, ref) => {
    const RESOURCE_WRAP_THRESHOLD = 10;

    const resourceCounts = useMemo(() => {
        if (!char || !char.activities) return {};
        const counts = {};
        char.activities.forEach(activity => {
            if (activity.resource) {
                counts[activity.resource] = (counts[activity.resource] || 0) + 1;
            }
        });
        return counts;
    }, [char?.activities]);

    const sortedResources = useMemo(() => {
        if (!char || !char.resources) return [];

        const spellSlots = [];
        const otherResources = [];

        char.resources.forEach(res => {
            const id = res.id || '';
            if (id === 'hitDice') {
                return;
            }
            if (id.match(/^level\d+SpellSlot$/)) {
                spellSlots.push(res);
            } else {
                otherResources.push(res);
            }
        });

        const getSortValue = (res) => {
            const q = res.quantity || 0;
            if (q <= RESOURCE_WRAP_THRESHOLD) return q;
            const rows = Math.ceil(q / RESOURCE_WRAP_THRESHOLD);
            return Math.ceil(q / rows);
        };

        spellSlots.sort((a, b) => {
            const levelA = parseInt((a.id || '').match(/\d+/)?.[0] || '0');
            const levelB = parseInt((b.id || '').match(/\d+/)?.[0] || '0');
            return levelA - levelB;
        });

        otherResources.sort((a, b) => {
            const valA = getSortValue(a);
            const valB = getSortValue(b);

            if (valB !== valA) return valB - valA;

            // If horizontal space is the same, sort by total quantity
            const qA = a.quantity || 0;
            const qB = b.quantity || 0;
            if (qB !== qA) return qB - qA;

            return (a.name || '').localeCompare(b.name || '');
        });

        return [...otherResources, ...spellSlots];
    }, [char?.resources, resourceCounts]);

    if (!char) return null;

    return (
        <div ref={ref} className={`main-card ${className || ''}`}>
            {/* Header: Name and Level Info */}


            <div className="main-card-row">
                <div className="main-card-column" style={{ gridColumn: 'span 6' }}>
                    <div className="card-title main-card-title show-on-print">
                        {char.meta.name}
                    </div>
                    <div className="title-primary" style={{ padding: 0 }}>
                        Lv. {char.meta.level} {char.meta.species} {char.meta.sub} {char.meta.class || 'Unknown Class'}
                    </div>
                </div>
            </div>
            {/* Ability Scores */}
            <div className="main-card-row">
                {Object.entries(char.stats).map(([key, value]) => (
                    <mdui-card variant="filled" className="inner-card main-card-box stat-box" key={key}>
                        <div className="text-secondary">{key.toUpperCase()}</div>
                        <div className="important-number">{formatBonus(value.mod, true)}</div>
                        <div className="text-secondary">{value.score}</div>
                    </mdui-card>
                ))}
            </div>

            {/* Skills and Vitals */}
            <div className="main-card-row">
                {/* Skills Column */}
                <div className="main-card-column">
                    <mdui-card variant="filled" className="inner-card">
                        {Object.entries(char.skills).map(([key, skill]) => {
                            let profIcon = 'radio_button_unchecked';
                            if (skill.proficiency === 1) profIcon = 'circle';
                            if (skill.proficiency === 2) profIcon = 'add_circle';
                            else if (skill.proficiency === 0.5) profIcon = 'contrast';
                            return (
                                <div className="list-item skill-list-item" key={key}>
                                    <div className="text-secondary">{skill.stat.toUpperCase()}</div>
                                    <mdui-icon name={profIcon} class="icon-small"></mdui-icon>
                                    <div className="text-secondary">
                                        {formatBonus(skill.bonus, true)}
                                    </div>

                                    <div className="text-primary">
                                        {skill.adv && !skill.dis && <AdvantageIndicator type="adv" />}
                                        {skill.dis && !skill.adv && <AdvantageIndicator type="dis" />}
                                        {skill.adv && skill.dis && <></>}
                                        {skill.min && <AdvantageIndicator type="min" value={skill.min} />}
                                        {skill.name}</div>
                                </div>
                            );
                        })}
                    </mdui-card>
                    {/* Saving Throws */}
                    <mdui-card variant="filled" className="inner-card">
                        <div className="main-card-list saves-list">
                            {Object.entries(char.saves).map(([key, save]) => {
                                let profIcon = 'radio_button_unchecked';
                                if (save.proficiency === 1) profIcon = 'circle';
                                if (save.proficiency === 2) profIcon = 'adjust';
                                else if (save.proficiency === 0.5) profIcon = 'circle_circle';
                                return (
                                    <div className="list-item saves-list-item" key={key}>
                                        <mdui-icon name={profIcon} class="icon-small"></mdui-icon>
                                        <div className="text-secondary">
                                            {formatBonus(save.bonus, true)}
                                        </div>
                                        <div className="text-primary">
                                            {save.adv && <AdvantageIndicator type="adv" />}
                                            {save.dis && <AdvantageIndicator type="dis" />}
                                            {save.min && <AdvantageIndicator type="min" value={save.min} />}
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </mdui-card>
                </div>

                {/* Vitals Column */}
                <div className="main-card-column">
                    <mdui-card variant="filled" className="main-card-box main-card-box-hp inner-card">
                        <div className="main-card-box-hp-row">
                            <div className="text-secondary">Current</div>
                            <div className="text-secondary">Max</div>
                            <div className="text-secondary">Temp</div>
                        </div>
                        <div className="main-card-box-hp-row">
                            <div className="important-number"></div>
                            <div className="important-number">{char.attributes.hp}</div>
                            <div className="important-number"></div>
                        </div>
                        <div className="text-secondary">HP</div>
                        <div className="main-card-list">
                            <div className="list-item info-list-item">
                                <span className="text-secondary">Hit Dice</span>
                                <span className="text-primary">
                                    {char.resources.find(r => r.id === 'hitDice' || r.name === 'Hit Dice')?.quantity || char.meta.level}d{char.attributes.hitDie}
                                </span>
                            </div>
                        </div>
                    </mdui-card>
                    <div className="main-card-combat-row">
                        <mdui-card variant="filled" className="inner-card main-card-box">
                            <div className="text-secondary">Initiative</div>
                            <div className="important-number">
                                {char.attributes.initiativeAdvantage && <AdvantageIndicator type="adv" />}
                                {char.attributes.initiativeDisadvantage && <AdvantageIndicator type="dis" />}
                                {formatBonus(char.attributes.initiative, true)}
                            </div>
                            <div className="text-secondary">Mod</div>
                        </mdui-card>
                        <mdui-card variant="filled" className="inner-card main-card-box">
                            <div className="text-secondary">Armor</div>
                            <div className="important-number">{char.attributes.ac}</div>
                            <div className="text-secondary">Class</div>
                        </mdui-card>
                        <mdui-card variant="filled" className="inner-card main-card-box">
                            <div className="text-secondary">Movement</div>
                            <div className="important-number">{char.attributes.movement.walk}</div>
                            <div className="text-secondary">Speed</div>
                        </mdui-card>
                    </div>
                    {/* Resources List */}
                    {sortedResources.length > 0 && (
                        <mdui-card variant="filled" className="inner-card">
                            <div className="main-card-list">
                                {sortedResources.map((res, i) => {
                                    const info = getIconInfo(res.id || res.name);
                                    const q = res.quantity || 0;
                                    const rows = q > RESOURCE_WRAP_THRESHOLD ? Math.ceil(q / RESOURCE_WRAP_THRESHOLD) : 1;
                                    const dotsPerRow = Math.max(1, Math.ceil(q / rows));

                                    return (
                                        <div className="list-item resource-list-item" key={i}>
                                            <mdui-icon name={info?.icon || 'circle'} class={`icon-${info?.color} icon-small`}></mdui-icon>
                                            <div className="text-primary">{res.name || res.id}</div>
                                            <div
                                                className="resource-dots"
                                                style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: `repeat(${dotsPerRow}, auto)`,
                                                    justifyItems: 'end',
                                                    direction: 'rtl',
                                                    gap: '2px'
                                                }}
                                            >
                                                {Array(q).fill(0).map((_, j) => (
                                                    <mdui-icon key={j} name="crop_square" style={{ transform: 'rotate(45deg)', direction: 'ltr' }} class="icon-small"></mdui-icon>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </mdui-card>
                    )}

                    {/* Passive Info List */}
                    <mdui-card variant="filled" className="inner-card info-card">
                        <div className="main-card-list">
                            {[
                                { label: 'Senses', data: char.attributes.senses },
                                { label: 'Movement', data: char.attributes.movement },
                                { label: 'Resistances', data: char.attributes.resistances },
                                { label: 'Advantages', data: char.attributes.advantages },
                                { label: 'Immunities', data: char.attributes.immunities },
                                { label: 'Tools', data: char.attributes.tools }
                            ].map((info, idx) => {
                                let displayData = [];
                                if (Array.isArray(info.data)) {
                                    displayData = info.data;
                                } else if (info.data && typeof info.data === 'object') {
                                    displayData = Object.entries(info.data)
                                        .filter(([k, v]) => v && !(info.label === 'Movement' && k === 'walk'))
                                        .map(([k, v]) => {
                                            const label = k.charAt(0).toUpperCase() + k.slice(1);
                                            const unit = typeof v === 'number' ? ' ft' : '';
                                            return `${label} (${v}${unit})`;
                                        });
                                }

                                // Only render if there's actual content to display
                                if (displayData.length === 0) return null;

                                return (
                                    <div className="list-item info-list-item" key={idx}>
                                        <span className="text-secondary">{info.label}</span>
                                        <span className="text-primary" style={{ textAlign: 'right' }}>
                                            {displayData.map((s, i) => (
                                                <React.Fragment key={i}>
                                                    {s}{i < displayData.length - 1 && ', '}
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </mdui-card>
                </div>
            </div>
        </div>
    );
}));
