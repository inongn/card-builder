import React, { memo, useMemo, useState } from 'react';
import { formatBonus } from '../../engine/RpgEngine';
import { getIconInfo, getResourceRecovery } from '../../utils/cardUtils';
import { AdvantageIndicator } from './AdvantageIndicator';
import { DiceRoller } from './DiceRoller';
import { useI18n } from '../../i18n/I18nContext.jsx';

import 'mdui/components/card.js';
import 'mdui/components/chip.js';
import 'mdui/components/icon.js';

function evaluateHpFormula(input) {
    if (input === null || input === undefined) return '';
    const str = String(input).trim();
    if (!str) return '';

    // If it's pure numbers, sanitize and return string formatted integer
    if (/^-?\d+$/.test(str)) {
        return String(Math.max(0, parseInt(str, 10)));
    }

    // Only allow simple math characters: digits, whitespace, +, -, *, /, (, )
    if (!/^[\d\s+\-*/()]+$/.test(str)) {
        // Safe fallback: extract digits or keep 0
        const numericOnly = str.replace(/[^\d]/g, '');
        return numericOnly ? String(Math.max(0, parseInt(numericOnly, 10))) : '';
    }

    try {
        // Safe evaluation of basic math expressions using Function
        const result = new Function(`"use strict"; return (${str})`)();
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
            return String(Math.max(0, Math.floor(result)));
        }
    } catch (e) {
        // On evaluation error, attempt to keep numeric digits
        const numericOnly = str.replace(/[^\d]/g, '');
        return numericOnly ? String(Math.max(0, parseInt(numericOnly, 10))) : '';
    }
    return '';
}

const SPANISH_DAMAGE_TERMS = {
    acid: 'Ácido',
    bludgeoning: 'Contundente',
    cold: 'Frío',
    fire: 'Fuego',
    force: 'Fuerza',
    lightning: 'Relámpago',
    necrotic: 'Necrótico',
    piercing: 'Perforante',
    poison: 'Veneno',
    psychic: 'Psíquico',
    radiant: 'Radiante',
    slashing: 'Cortante',
    thunder: 'Trueno'
};

const SPANISH_CONDITION_TERMS = {
    blinded: 'Cegado',
    charmed: 'Hechizado',
    deafened: 'Ensordecido',
    frightened: 'Asustado',
    grappled: 'Agarrado',
    incapacitated: 'Incapacitado',
    invisible: 'Invisible',
    paralyzed: 'Paralizado',
    petrified: 'Petrificado',
    poisoned: 'Envenenado',
    prone: 'Derribado',
    restrained: 'Apresado',
    stunned: 'Aturdido',
    unconscious: 'Inconsciente',
    exhaustion: 'Agotamiento'
};

const SPANISH_SENSE_TERMS = {
    darkvision: 'Visión en la oscuridad',
    blindsight: 'Vista ciega',
    tremorsense: 'Sentido del temblor',
    truesight: 'Visión verdadera'
};

const SPANISH_MOVEMENT_TERMS = {
    walk: 'Velocidad',
    fly: 'Volar',
    swim: 'Nadar',
    climb: 'Trepar',
    burrow: 'Excavar'
};

const SPANISH_TOOL_TERMS = {
    thievestools: 'Herramientas de ladrón',
    smithstools: 'Herramientas de herrero',
    tinkerstools: 'Herramientas de hojalatero',
    herbalismkit: 'Kit de herboristería',
    poisonerskit: 'Kit de envenenador',
    disguisekit: 'Kit de disfraz',
    forgerykit: 'Kit de falsificación',
    navigatorstools: 'Herramientas de navegante',
    alchemistssupplies: 'Suministros de alquimista',
    brewerssupplies: 'Suministros de cervecero',
    calligrapherssupplies: 'Suministros de calígrafo',
    carpenterstools: 'Herramientas de carpintero',
    cartographerstools: 'Herramientas de cartógrafo',
    cobblerstools: 'Herramientas de zapatero',
    cooksutensils: 'Utensilios de cocinero',
    glassblowerstools: 'Herramientas de soplador de vidrio',
    jewelerstools: 'Herramientas de joyero',
    leatherworkerstools: 'Herramientas de peletero',
    masonstools: 'Herramientas de albañil',
    painterssupplies: 'Suministros de pintor',
    potterstools: 'Herramientas de alfarero',
    weaverstools: 'Herramientas de tejedor',
    woodcarverstools: 'Herramientas de tallador de madera',
    landvehicles: 'Vehículos (terrestres)',
    watervehicles: 'Vehículos (acuáticos)',
    musicalinstrument: 'Instrumento musical'
};

function formatInfoValue(sectionKey, rawVal, locale) {
    if (rawVal === null || rawVal === undefined) return '';
    const str = String(rawVal).trim();
    if (locale !== 'es') return str;

    const lower = str.toLowerCase().replace(/['_\s-]/g, '');

    // Senses
    if (sectionKey === 'senses') {
        for (const [k, name] of Object.entries(SPANISH_SENSE_TERMS)) {
            if (lower.startsWith(k)) {
                return str.replace(new RegExp(k, 'i'), name).replace(/\bft\.?\b/gi, 'pies').replace(/\bfeet\b/gi, 'pies');
            }
        }
    }

    // Movement
    if (sectionKey === 'movement') {
        for (const [k, name] of Object.entries(SPANISH_MOVEMENT_TERMS)) {
            if (lower.startsWith(k)) {
                return str.replace(new RegExp(k, 'i'), name).replace(/\bft\.?\b/gi, 'pies').replace(/\bfeet\b/gi, 'pies');
            }
        }
    }

    // Resistances / Immunities
    if (sectionKey === 'resistances' || sectionKey === 'immunities') {
        const clean = str.replace(/\s*damage\s*/gi, '').trim().toLowerCase();
        if (SPANISH_DAMAGE_TERMS[clean]) return SPANISH_DAMAGE_TERMS[clean];
        if (SPANISH_CONDITION_TERMS[clean]) return SPANISH_CONDITION_TERMS[clean];
    }

    // Advantages
    if (sectionKey === 'advantages') {
        const clean = str.replace(/^saves?\s+against\s+(being\s+)?/i, '').replace(/\s*damage\s*/gi, '').trim().toLowerCase();
        if (SPANISH_CONDITION_TERMS[clean]) return `Contra ${SPANISH_CONDITION_TERMS[clean].toLowerCase()}`;
        if (SPANISH_DAMAGE_TERMS[clean]) return `Contra ${SPANISH_DAMAGE_TERMS[clean].toLowerCase()}`;
    }

    // Tools
    if (sectionKey === 'tools') {
        if (SPANISH_TOOL_TERMS[lower]) return SPANISH_TOOL_TERMS[lower];
    }

    // General damage term fallback
    for (const [k, name] of Object.entries(SPANISH_DAMAGE_TERMS)) {
        if (lower.includes(k)) {
            return str.replace(new RegExp(k, 'i'), name).replace(/\bdamage\b/gi, '');
        }
    }

    return str;
}

export const CharacterSheet = memo(React.forwardRef(({ char, onNavigate, className, variant, interactive = true }, ref) => {
    const { t, locale } = useI18n();
    const isPlayMode = variant !== 'static' && interactive !== false;
    const RESOURCE_WRAP_THRESHOLD = 10;

    const charId = char?.meta?.name || 'character';
    const storageKey = `play_state_${charId}`;

    const [playState, setPlayState] = useState(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : { currentHp: '', tempHp: '', usedResources: {} };
        } catch (e) {
            return { currentHp: '', tempHp: '', usedResources: {} };
        }
    });

    const updatePlayState = (updater) => {
        setPlayState(prev => {
            const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
            try {
                localStorage.setItem(storageKey, JSON.stringify(next));
            } catch (e) {
                // ignore quota / storage errors
            }
            return next;
        });
    };

    const handleToggleResourceDot = (resKey, dotIndex) => {
        if (!isPlayMode) return;
        updatePlayState(prev => {
            const currentUsed = prev.usedResources?.[resKey] || 0;
            let nextUsed;
            if (currentUsed > dotIndex) {
                nextUsed = dotIndex;
            } else {
                nextUsed = dotIndex + 1;
            }
            return {
                ...prev,
                usedResources: {
                    ...(prev.usedResources || {}),
                    [resKey]: nextUsed
                }
            };
        });
    };

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

            const qA = a.quantity || 0;
            const qB = b.quantity || 0;
            if (qB !== qA) return qB - qA;

            return (a.name || '').localeCompare(b.name || '');
        });

        return [...otherResources, ...spellSlots];
    }, [char?.resources, resourceCounts]);

    if (!char) return null;

    const hitDiceQuantity = char?.resources?.find(r => r.id === 'hitDice' || r.name === 'Hit Dice')?.quantity || char?.meta?.level || 1;

    return (
        <div ref={ref} className={`main-card ${className || ''}`}>
            {/* Header: Name and Level Info */}
            <div className="main-card-row">
                <div className="main-card-column col-span-full">
                    <div className="main-card-title-row">
                        <div className="card-subtitle-container">
                            <span className="title-primary show-on-print">{char.meta.name}</span>
                            <div className="print-subtitle-container show-on-print">
                                <span className="card-subtitle">
                                    {[`${locale === 'es' ? 'Nivel' : 'Level'} ${char.meta.level}`, `${char.meta.sub || ''} ${char.meta.class || (locale === 'es' ? 'Clase desconocida' : 'Unknown Class')}`.trim()].filter(Boolean).join(' ')}
                                </span>
                                <span className="card-subtitle">
                                    {[char.meta.species, char.meta.background].filter(Boolean).join(' ')}
                                </span>
                            </div>

                        </div>
                        <div className="title-primary card-subtitle-container hide-on-print">
                            {[`${locale === 'es' ? 'Nivel' : 'Level'} ${char.meta.level}`, `${char.meta.sub || ''} ${char.meta.class || (locale === 'es' ? 'Clase desconocida' : 'Unknown Class')}`.trim()].filter(Boolean).join(' ')}

                            <span className="mobile-hidden title-secondary">
                                {[char.meta.species, char.meta.background].filter(Boolean).join(' ')}
                            </span>
                        </div>
                        <div className="title-secondary desktop-hidden hide-on-print">
                            {[char.meta.species, char.meta.background].filter(Boolean).join(' ')}
                        </div>

                    </div>
                </div>
            </div>

            {/* Ability Scores */}
            <div className="main-card-row stat-box-row hide-on-print">
                {Object.entries(char.stats).map(([key, value]) => {
                    const shortName = t(`rules.abilitiesShort.${key}`, key.toUpperCase());
                    return (
                        <mdui-card variant="filled" className="inner-card main-card-box stat-box" key={key}>
                            <div className="text-secondary">{shortName}</div>
                            <div className="important-number">
                                <DiceRoller formula={formatBonus(value.mod, true)} label={`${shortName} check`} interactive={isPlayMode} showIcon={false}>
                                    {formatBonus(value.mod, true)}
                                </DiceRoller>
                            </div>
                            <div className="text-secondary">{value.score}</div>
                        </mdui-card>
                    );
                })}
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
                                    <div className="text-secondary">{t(`rules.abilitiesShort.${skill.stat}`, skill.stat.toUpperCase())}</div>
                                    <mdui-icon name={profIcon} class="icon-small"></mdui-icon>
                                    <div className="text-secondary">
                                        <DiceRoller
                                            formula={formatBonus(skill.bonus, true)}
                                            label={`${skill.name} check`}
                                            interactive={isPlayMode}
                                            showIcon={false}
                                            rollOptions={{ adv: skill.adv, dis: skill.dis, min: skill.min }}
                                        >
                                            {formatBonus(skill.bonus, true)}
                                        </DiceRoller>
                                    </div>

                                    <div className="text-primary">
                                        {skill.adv && !skill.dis && <AdvantageIndicator type="adv" />}
                                        {skill.dis && !skill.adv && <AdvantageIndicator type="dis" />}
                                        {skill.adv && skill.dis && <></>}
                                        {skill.min && <AdvantageIndicator type="min" value={skill.min} />}
                                        {skill.name}
                                    </div>
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
                                const saveName = t(`rules.abilities.${key}`, key.charAt(0).toUpperCase() + key.slice(1).toLowerCase());
                                const saveRollLabel = locale === 'es' ? `Tirada de Salvación de ${saveName}` : `${saveName} save`;
                                return (
                                    <div className="list-item saves-list-item" key={key}>
                                        <mdui-icon name={profIcon} class="icon-small"></mdui-icon>
                                        <div className="text-secondary">
                                            <DiceRoller
                                                formula={formatBonus(save.bonus, true)}
                                                label={saveRollLabel}
                                                interactive={isPlayMode}
                                                showIcon={false}
                                                rollOptions={{ adv: save.adv, dis: save.dis, min: save.min }}
                                            >
                                                {formatBonus(save.bonus, true)}
                                            </DiceRoller>
                                        </div>
                                        <div className="text-primary">
                                            {save.adv && <AdvantageIndicator type="adv" />}
                                            {save.dis && <AdvantageIndicator type="dis" />}
                                            {save.min && <AdvantageIndicator type="min" value={save.min} />}
                                            {saveName}
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
                            <div className="text-secondary">{t('ui.play.current')}</div>
                            <div className="text-secondary">{t('ui.play.max')}</div>
                            <div className="text-secondary">{t('ui.play.temp')}</div>
                        </div>
                        <div className="main-card-box-hp-row">
                            <div className="important-number">
                                {isPlayMode ? (
                                    <input
                                        type="text"
                                        className="hp-input"
                                        value={playState.currentHp}
                                        placeholder={char.attributes.hp}
                                        onChange={(e) => {
                                            updatePlayState({ currentHp: e.target.value });
                                        }}
                                        onBlur={(e) => {
                                            const resolved = evaluateHpFormula(e.target.value);
                                            updatePlayState({ currentHp: resolved });
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const resolved = evaluateHpFormula(e.target.value);
                                                updatePlayState({ currentHp: resolved });
                                                e.target.blur();
                                            }
                                        }}
                                    />
                                ) : null}
                            </div>
                            <div className="important-number">{char.attributes.hp}
                                <div className="text-secondary">(<DiceRoller formula={`1d${char.attributes.hitDie} + ${char.stats.con.mod}`} label="Hit Die roll" interactive={isPlayMode} showIcon={false}>
                                    d{char.attributes.hitDie}{char.stats.con.mod >= 0 ? `+${char.stats.con.mod}` : char.stats.con.mod}
                                </DiceRoller>)</div>

                            </div>
                            <div className="important-number">
                                {isPlayMode ? (
                                    <input
                                        type="text"
                                        className="hp-input"
                                        value={playState.tempHp}
                                        placeholder="0"
                                        onChange={(e) => {
                                            updatePlayState({ tempHp: e.target.value });
                                        }}
                                        onBlur={(e) => {
                                            const resolved = evaluateHpFormula(e.target.value);
                                            updatePlayState({ tempHp: resolved });
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const resolved = evaluateHpFormula(e.target.value);
                                                updatePlayState({ tempHp: resolved });
                                                e.target.blur();
                                            }
                                        }}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </mdui-card>

                    <div className="main-card-combat-row">
                        <mdui-card variant="filled" className="inner-card main-card-box">
                            <div className="text-secondary">{t('ui.play.initiative')}</div>
                            <div className="important-number">
                                {char.attributes.initiativeAdvantage && <AdvantageIndicator type="adv" />}
                                {char.attributes.initiativeDisadvantage && <AdvantageIndicator type="dis" />}
                                <DiceRoller formula={formatBonus(char.attributes.initiative, true)} label={`${t('ui.play.initiative')} roll`} interactive={isPlayMode} showIcon={false}>
                                    {formatBonus(char.attributes.initiative, true)}
                                </DiceRoller>
                            </div>
                            <div className="text-secondary">{locale === 'es' ? 'Bono' : 'Mod'}</div>
                        </mdui-card>
                        <mdui-card variant="filled" className="inner-card main-card-box">
                            <div className="text-secondary">{locale === 'es' ? 'Clase de' : 'Armor'}</div>
                            <div className="important-number">{char.attributes.ac}</div>
                            <div className="text-secondary">{locale === 'es' ? 'Armadura' : 'Class'}</div>
                        </mdui-card>
                        <mdui-card variant="filled" className="inner-card main-card-box">
                            <div className="text-secondary">{t('ui.play.speed')}</div>
                            <div className="important-number">{char.attributes.movement.walk}</div>
                            <div className="text-secondary">{locale === 'es' ? 'Pies' : 'Speed'}</div>
                        </mdui-card>
                    </div>

                    {/* Resources List */}
                    {sortedResources.length > 0 && (
                        <mdui-card variant="filled" className="inner-card">
                            <div className="main-card-list">
                                {sortedResources.map((res, i) => {
                                    const resKey = res.id || res.name;
                                    const info = getIconInfo(resKey);
                                    const q = res.quantity || 0;
                                    const rows = q > RESOURCE_WRAP_THRESHOLD ? Math.ceil(q / RESOURCE_WRAP_THRESHOLD) : 1;
                                    const dotsPerRow = Math.max(1, Math.ceil(q / rows));
                                    const usedCount = playState.usedResources?.[resKey] || 0;
                                    const recovery = getResourceRecovery(res);

                                    return (
                                        <div className="list-item resource-list-item" key={i}>
                                            <mdui-icon name={info?.icon || 'circle'} class={`icon-small`} style={{ color: `var(--color-${info?.color})` }}></mdui-icon>
                                            <div className="text-primary resource-name">{res.name || res.id}</div>
                                            <div className="resource-right">
                                                {isPlayMode && (
                                                    <div className="resource-dots hide-on-print" style={{ gridTemplateColumns: `repeat(${dotsPerRow}, auto)` }}>
                                                        {Array(q).fill(0).map((_, j) => {
                                                            const isUsed = j < usedCount;
                                                            return (
                                                                <mdui-icon
                                                                    key={j}
                                                                    name={isUsed ? 'square' : 'crop_square'}
                                                                    class={`icon-small icon-rotated ${isPlayMode ? 'resource-dot-interactive' : ''} ${isUsed ? 'used' : ''}`}
                                                                    onClick={() => handleToggleResourceDot(resKey, j)}
                                                                ></mdui-icon>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                                <div className="text-secondary resource-qty show-on-print">{q}</div>
                                                <div className="text-secondary resource-recovery">{recovery}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </mdui-card>
                    )}

                    {/* Traits List */}
                    {char.traits && char.traits.length > 0 && (
                        <mdui-card variant="filled" className="inner-card">
                            <div className="main-card-list">
                                {char.traits.map((trait, i) => (
                                    <div className="list-item trait-list-item" key={trait.id || i}>
                                        <span className="trait-name">{trait.name}</span>
                                        <span className=" trait-description">{trait.description}</span>
                                    </div>
                                ))}
                            </div>
                        </mdui-card>
                    )}

                    {/* Passive Info List */}
                    <mdui-card variant="filled" className="inner-card info-card">
                        <div className="main-card-list">
                            {[
                                { key: 'senses', label: t('rules.info.senses', 'Senses'), data: char?.attributes?.senses },
                                { key: 'movement', label: t('rules.info.movement', 'Movement'), data: char?.attributes?.movement },
                                { key: 'resistances', label: t('rules.info.resistances', 'Resistances'), data: char?.attributes?.resistances },
                                { key: 'advantages', label: t('rules.info.advantages', 'Advantages'), data: char?.attributes?.advantages },
                                { key: 'immunities', label: t('rules.info.immunities', 'Immunities'), data: char?.attributes?.immunities },
                                { key: 'tools', label: t('rules.info.tools', 'Tools'), data: char?.attributes?.tools }
                            ].map((info, idx) => {
                                let displayData = [];
                                if (Array.isArray(info.data)) {
                                    displayData = info.data.map(item => formatInfoValue(info.key, item, locale)).filter(Boolean);
                                } else if (info.data && typeof info.data === 'object') {
                                    displayData = Object.entries(info.data)
                                        .filter(([k, v]) => v && !(info.key === 'movement' && k === 'walk'))
                                        .map(([k, v]) => {
                                            let label = k.charAt(0).toUpperCase() + k.slice(1);
                                            if (locale === 'es') {
                                                if (info.key === 'senses' && SPANISH_SENSE_TERMS[k.toLowerCase()]) {
                                                    label = SPANISH_SENSE_TERMS[k.toLowerCase()];
                                                } else if (info.key === 'movement' && SPANISH_MOVEMENT_TERMS[k.toLowerCase()]) {
                                                    label = SPANISH_MOVEMENT_TERMS[k.toLowerCase()];
                                                }
                                            }
                                            const unit = typeof v === 'number' ? (locale === 'es' ? ' pies' : ' ft') : '';
                                            return `${label} (${v}${unit})`;
                                        });
                                }
                                if (displayData.length === 0) return null;

                                return (
                                    <div className="list-item info-list-item" key={idx}>
                                        <span className="text-secondary">{info.label}</span>
                                        <span className="text-primary text-right">
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
