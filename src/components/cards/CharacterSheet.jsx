import React, { memo, useMemo } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { formatBonus } from '../../engine/RpgEngine';
import { getIconInfo } from '../../utils/cardUtils';
import { AdvantageIndicator } from './AdvantageIndicator';

import 'mdui/components/card.js';
import 'mdui/components/chip.js';
import 'mdui/components/icon.js';

export const CharacterSheet = memo(({ char }) => {
    const { t } = useTranslation();
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
                    Lv. {char.meta.level} {char.meta.species} {char.meta.class || t('ui.unknownClass')}
                </div>
            </div>

            {/* Ability Scores */}
            <div className="main-card-row">
                {Object.entries(char.stats).map(([key, value]) => (
                    <div className="main-card-box stat-box" key={key}>
                        <div className="stat-label">{t(`ui.${key.toLowerCase()}`).toUpperCase()}</div>
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
                                    <div className="text-secondary">{t(`ui.${skill.stat.toLowerCase()}`).toUpperCase()}</div>
                                    <div className="text-primary">{t(`ui.${key.toLowerCase()}`)}</div>
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
                            <div className="text-secondary">{t('ui.current')}</div>
                            <div className="text-secondary">{t('ui.max')}</div>
                            <div className="text-secondary">{t('ui.temp')}</div>
                        </div>
                        <div className="main-card-box-hp-row">
                            <div className="important-number"></div>
                            <div className="important-number">{char.attributes.hp}</div>
                            <div className="important-number"></div>
                        </div>
                        <div className="text-secondary">{t('ui.hp')}</div>
                    </div>

                    <div className="main-card-combat-row">
                        {(() => {
                            const currentLang = i18next.language || 'en';
                            const isMetric = !currentLang.startsWith('en');

                            let speedVal = char.attributes.speed;
                            let speedSub = t('ui.feet');

                            if (isMetric && typeof speedVal === 'number') {
                                speedVal = (speedVal / 5) * 1.5;
                                speedVal = Number.isInteger(speedVal) ? speedVal : speedVal.toFixed(1);
                                speedSub = t('ui.meters');
                            } else if (isMetric && typeof speedVal === 'string') {
                                // Fallback for string speeds (e.g. "30 ft")
                                speedVal = speedVal.replace(/(\d+)\s*(ft|feet|foot)/gi, (match, p1) => {
                                    const meters = (parseInt(p1) / 5) * 1.5;
                                    return Number.isInteger(meters) ? meters : meters.toFixed(1);
                                });
                                speedSub = t('ui.meters');
                            }

                            return [
                                { label: t('ui.init'), val: formatBonus(char.attributes.initiative, true), sub: t('ui.mod'), adv: char.attributes.adv, dis: char.attributes.dis },
                                { label: t('ui.armor'), val: char.attributes.ac, sub: t('ui.class_label') },
                                { label: t('ui.speed'), val: speedVal, sub: speedSub },
                            ].map((box, i) => (
                                <div className="main-card-box" key={i}>
                                    <div className="text-secondary">{box.label}</div>
                                    <div className="important-number">
                                        {box.val}
                                        {box.adv && <AdvantageIndicator type="adv" />}
                                        {box.dis && <AdvantageIndicator type="dis" />}
                                    </div>
                                    <div className="text-secondary">{box.sub}</div>
                                </div>
                            ));
                        })()}
                    </div>

                    {/* Passive Info List */}
                    <div className="main-card-list">
                        {[
                            { label: t('ui.senses'), data: char.attributes.senses },
                            { label: t('ui.resistances'), data: char.attributes.resistances },
                            { label: t('ui.advantages'), data: char.attributes.advantages },
                            { label: t('ui.immunities'), data: char.attributes.immunities }
                        ].map((info, idx) => (
                            <div className="list-item info-list-item" key={idx}>
                                <span className="text-secondary">{info.label}</span>
                                <span className="text-primary">
                                    {info.data?.length > 0 ? info.data.map((s, i) => (
                                        <React.Fragment key={i}>
                                            {i18next.exists(`ui.${s.toLowerCase()}`) ? t(`ui.${s.toLowerCase()}`) : s}{i < info.data.length - 1 && ', '}
                                        </React.Fragment>
                                    )) : <span className="text-muted">-</span>}
                                </span>
                            </div>
                        ))}
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
                                    <div className="text-secondary">{t(`ui.${save.stat.toLowerCase()}`).toUpperCase()}</div>
                                    <div className="text-primary">{t('ui.save_label')}</div>
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
                                    <div className="text-primary">{info?.shortName && i18next.exists(info.shortName) ? i18next.t(info.shortName) : (res.name || res.id)}</div>
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
