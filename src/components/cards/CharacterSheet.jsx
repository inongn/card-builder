import React, { memo, useMemo } from 'react';
import { formatBonus } from '../../engine/RpgEngine';
import { getIconInfo } from '../../utils/cardUtils';
import { AdvantageIndicator } from './AdvantageIndicator';

import 'mdui/components/card.js';
import 'mdui/components/chip.js';
import 'mdui/components/icon.js';

export const CharacterSheet = memo(({ char }) => {
    const sortedResources = useMemo(() => {
        if (!char || !char.resources) return [];

        const spellSlots = [];
        const otherResources = [];

        char.resources.forEach(res => {
            const id = res.id || '';
            if (id.match(/^level\d+SpellSlot$/)) {
                spellSlots.push(res);
            } else {
                otherResources.push(res);
            }
        });

        spellSlots.sort((a, b) => {
            const levelA = parseInt((a.id || '').match(/\d+/)?.[0] || '0');
            const levelB = parseInt((b.id || '').match(/\d+/)?.[0] || '0');
            return levelA - levelB;
        });

        otherResources.sort((a, b) => {
            const qA = a.quantity || 0;
            const qB = b.quantity || 0;
            if (qB !== qA) return qB - qA;
            return (a.name || '').localeCompare(b.name || '');
        });

        return [...otherResources, ...spellSlots];
    }, [char?.resources]);

    if (!char) return null;

    return (
        <mdui-card variant="filled" className="main-card">
            {/* Header: Name and Level Info */}
            <div className="main-card-row">
                <div className="card-title main-card-title">
                    {char.meta.name}
                </div>
            </div>
            <div className="main-card-row">
                <div className="text-primary card-title">
                    Lv. {char.meta.level} {char.meta.species} {char.meta.class || 'Unknown Class'}
                </div>
            </div>

            {/* Ability Scores */}
            <div className="main-card-row">
                {Object.entries(char.stats).map(([key, value]) => (
                    <div className="main-card-box stat-box" key={key}>
                        <div className="stat-label">{key.toUpperCase()}</div>
                        <div className="stat-value">{formatBonus(value.mod, true)}</div>
                        <div className="stat-score">{value.score}</div>
                    </div>
                ))}
            </div>

            {/* Skills and Vitals */}
            <div className="main-card-row">
                {/* Skills Column */}
                <div className="main-card-column">
                    <div className="main-card-list">
                        {Object.entries(char.skills).map(([key, skill]) => {
                            let profIcon = 'radio_button_unchecked';
                            if (skill.proficiency === 1) profIcon = 'circle';
                            if (skill.proficiency === 2) profIcon = 'add_circle';
                            else if (skill.proficiency === 0.5) profIcon = 'brightness_2';
                            return (
                                <div className="list-item skill-list-item" key={key}>
                                    <mdui-icon name={profIcon} class="icon-small"></mdui-icon>
                                    <div className="text-secondary">{skill.stat.toUpperCase()}</div>
                                    <div className="text-primary">{skill.name}</div>
                                    <div className="text-secondary">
                                        {skill.adv && <AdvantageIndicator type="adv" />}
                                        {skill.dis && <AdvantageIndicator type="dis" />}
                                        {formatBonus(skill.bonus, true)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Vitals Column */}
                <div className="main-card-column">
                    <div className="main-card-box main-card-box-hp">
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
                    </div>

                    <div className="main-card-combat-row">
                        <div className="main-card-box">
                            <div className="text-secondary">Initiative</div>
                            <div className="important-number">
                                {formatBonus(char.attributes.initiative, true)}
                                {char.attributes.adv && <AdvantageIndicator type="adv" />}
                                {char.attributes.dis && <AdvantageIndicator type="dis" />}
                            </div>
                            <div className="text-secondary">Mod</div>
                        </div>
                        <div className="main-card-box">
                            <div className="text-secondary">Armor</div>
                            <div className="important-number">{char.attributes.ac}</div>
                            <div className="text-secondary">Class</div>
                        </div>
                        <div className="main-card-box">
                            <div className="text-secondary">Speed</div>
                            <div className="important-number">{char.attributes.movement.walk}</div>
                            <div className="text-secondary">ft</div>
                        </div>
                    </div>

                    {/* Passive Info List */}
                    <div className="main-card-list">
                        {[
                            { label: 'Senses', data: char.attributes.senses },
                            { label: 'Movement', data: char.attributes.movement },
                            { label: 'Resistances', data: char.attributes.resistances },
                            { label: 'Advantages', data: char.attributes.advantages },
                            { label: 'Immunities', data: char.attributes.immunities }
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

                            return (
                                <div className="list-item info-list-item" key={idx}>
                                    <span className="text-secondary">{info.label}</span>
                                    <span className="text-primary">
                                        {displayData.length > 0 ? displayData.map((s, i) => (
                                            <React.Fragment key={i}>
                                                {s}{i < displayData.length - 1 && ', '}
                                            </React.Fragment>
                                        )) : <span className="text-muted">-</span>}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Saving Throws */}
                    <div className="main-card-list">
                        {Object.entries(char.saves).map(([key, save]) => {
                            let profIcon = 'radio_button_unchecked';
                            if (save.proficiency === 1) profIcon = 'circle';
                            if (save.proficiency === 2) profIcon = 'adjust';
                            else if (save.proficiency === 0.5) profIcon = 'circle_circle';
                            return (
                                <div className="list-item skill-list-item" key={key}>
                                    <mdui-icon name={profIcon} class="icon-small"></mdui-icon>
                                    <div className="text-secondary">{save.stat.toUpperCase()}</div>
                                    <div className="text-primary">Save</div>
                                    <div className="text-secondary">
                                        {save.adv && <AdvantageIndicator type="adv" />}
                                        {save.dis && <AdvantageIndicator type="dis" />}
                                        {formatBonus(save.bonus, true)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Resources (Chips) */}
            <div className="main-card-row">
                {sortedResources.length > 0 && (
                    <div className="main-card-list resource-list">
                        {sortedResources.map((res, i) => {
                            const info = getIconInfo(res.id || res.name);
                            return (
                                <mdui-chip className="list-item resource-list-item" key={i}>
                                    <mdui-icon name={info?.icon || 'circle'} class={`icon-${info?.color} icon-small`}></mdui-icon>
                                    <div className="text-primary">{res.name || res.id}</div>
                                    {Array(res.quantity).fill(0).map((_, j) => (
                                        <mdui-icon key={j} name="radio_button_unchecked" class="icon-small"></mdui-icon>
                                    ))}
                                </mdui-chip>
                            );
                        })}
                    </div>
                )}
            </div>
        </mdui-card>
    );
});
