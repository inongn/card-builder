import React from 'react';
import i18next from 'i18next';
import 'mdui/components/icon.js';
import 'mdui/components/chip.js';

// ============================================================================
// CONSTANTS
// ============================================================================

export const TERM_ICONS = {
    'bonus action': { icon: 'change_history', color: 'bonus-action', shortName: 'ui.bonusAction' }, // Triangle
    'free action': { icon: 'lens_blur', color: 'accent', shortName: 'ui.freeAction' }, // Dashed circle/loader
    'null': { icon: 'lens_blur', color: 'accent', shortName: 'ui.freeAction' },
    'action': { icon: 'circle', color: 'action', shortName: 'ui.action' },
    'reaction': { icon: 'flare', color: 'reaction', shortName: 'ui.reaction' }, // Sparkle
    'ritual': { icon: 'self_improvement', color: 'accent', shortName: 'ui.ritual' },
    'bludgeoning': { icon: 'explosion', color: 'physical', shortName: 'ui.bludgeoning' },
    'piercing': { icon: 'ads_click', color: 'physical', shortName: 'ui.piercing' }, // Target/arrow feel
    'slashing': { icon: 'content_cut', color: 'physical', shortName: 'ui.slashing' }, // Nearest to sword/cut
    'fire': { icon: 'local_fire_department', color: 'fire', shortName: 'ui.fire' },
    'cold': { icon: 'ac_unit', color: 'cold', shortName: 'ui.cold' },
    'acid': { icon: 'water_drop', color: 'acid', shortName: 'ui.acid' },
    'lightning': { icon: 'bolt', color: 'lightning', shortName: 'ui.lightning' },
    'poison': { icon: 'test_tube', color: 'poison', shortName: 'ui.poison' },
    'necrotic': { icon: 'skull', color: 'necrotic', shortName: 'ui.necrotic' },
    'radiant': { icon: 'light_mode', color: 'radiant', shortName: 'ui.radiant' },
    'force': { icon: 'flare', color: 'force', shortName: 'ui.force' },
    'thunder': { icon: 'graphic_eq', color: 'thunder', shortName: 'ui.thunder' }, // Waveform
    'psychic': { icon: 'psychology', color: 'psychic', shortName: 'ui.psychic' },
    'Instantaneous': { icon: 'bolt', color: 'accent', shortName: 'ui.instantaneous' },
    'healing': { icon: 'favorite', color: 'healing', shortName: 'ui.healing' },

    'concentration': { icon: 'psychology', color: 'accent', shortName: 'ui.concentration' },
    'level1SpellSlot': { icon: 'filter_1', color: 'spell-slot', shortName: 'Spell Slot' },
    'level2SpellSlot': { icon: 'filter_2', color: 'spell-slot', shortName: 'Spell Slot' },
    'level3SpellSlot': { icon: 'filter_3', color: 'spell-slot', shortName: 'Spell Slot' },
    'level4SpellSlot': { icon: 'filter_4', color: 'spell-slot', shortName: 'Spell Slot' },
    'level5SpellSlot': { icon: 'filter_5', color: 'spell-slot', shortName: 'Spell Slot' },
    'level6SpellSlot': { icon: 'filter_6', color: 'spell-slot', shortName: 'Spell Slot' },
    'level7SpellSlot': { icon: 'filter_7', color: 'spell-slot', shortName: 'Spell Slot' },
    'level8SpellSlot': { icon: 'filter_8', color: 'spell-slot', shortName: 'Spell Slot' },
    'level9SpellSlot': { icon: 'filter_9', color: 'spell-slot', shortName: 'Spell Slot' },
    'adrenalineRush': { icon: 'air', color: 'action', shortName: 'Adrenaline Rush' },
    'secondWind': { icon: 'air', color: 'healing', shortName: 'Second Wind' },
    'layOnHandsPool': { icon: 'front_hand', color: 'healing', shortName: 'Hands' }, // Or 'pan_tool_alt'
    'channelDivinity': { icon: 'auto_awesome', color: 'radiant', shortName: 'Channel Divinity' },
    'clericChannelDivinity': { icon: 'auto_awesome', color: 'radiant', shortName: 'Channel Divinity' },
    'giantAncestry': { icon: 'terrain', color: 'accent', shortName: 'Giant Ancestry' },
    'stonecunning': { icon: 'diamond', color: 'accent', shortName: 'Stonecunning' },
    'tireless': { icon: 'air', color: 'healing', shortName: 'Tire' },
    'wholenessOfBody': { icon: 'self_improvement', color: 'healing', shortName: 'Whole' },
    'focusPoints': { icon: 'motion_photos_on', color: 'action', shortName: 'Focus' }, // Concentric circles
    'sneak': { icon: 'colorize', color: 'fire', shortName: 'Sneak' }, // Closest to dagger/pointy
    'rage': { icon: 'show_chart', color: 'fire', shortName: 'Rage' }, // Pulse alternative
    'bardicInspiration': { icon: 'music_note', color: 'healing', shortName: 'Bardic Inspiration' },
    'wildShape': { icon: 'pets', color: 'healing', shortName: 'Wild Shape' },
    'innateSorcery': { icon: 'magic_button', color: 'radiant', shortName: 'Innate Sorcery' },
    'sorceryPoints': { icon: 'brightness_low', color: 'radiant', shortName: 'Sorcery Points' },
    'pactMagicSpellSlot': { icon: 'square', color: 'spell-slot', shortName: 'Spell Slots' },
    'darkOnesLuck': { icon: 'show_chart', color: 'fire', shortName: 'Dark One\'s Luck' },
    'psionicEnergyDice': { icon: 'casino', color: 'psychic', shortName: 'Psionic Die' }, // Geometric shape for dice
    'superiorityDice': { icon: 'casino', color: 'fire', shortName: 'Superiority Die' },
    'breathWeapon': { icon: 'airwave', color: 'action', shortName: 'Breath Weapon' },
    'indomitable': { icon: 'emoji_events', color: 'radiant', shortName: 'Indomitable' },
    'actionSurge': { icon: 'show_chart', color: 'fire', shortName: 'Action Surge' },
    'hitDice': { icon: 'casino', color: 'healing', shortName: 'Hit Die' },
    'draconicFlight': { icon: 'flutter_dash', color: 'action', shortName: 'Draconic Flight' },
    'largeForm': { icon: 'open_in_full', color: 'accent', shortName: 'Large Form' },
    'self': { icon: 'person_pin_circle', color: 'accent', shortName: 'ui.self' },
    'touch': { icon: 'back_hand', color: 'accent', shortName: 'ui.touch' },
    'limited': { icon: 'replay', color: 'accent', shortName: 'ui.limited' },
};

// Internal normalized map for lookups
export const NORM_ICONS = Object.fromEntries(
    Object.entries(TERM_ICONS).map(([k, v]) => [k.toLowerCase().replace(/\s+/g, ''), v])
);

const TERM_KEYS = Object.keys(TERM_ICONS).sort((a, b) => b.length - a.length);
export const TERM_PATTERN = new RegExp(`\\b(${TERM_KEYS.join('|')})\\b`, 'gi');

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getIconInfo = (text) => {
    if (!text) return null;
    const termKey = text.toLowerCase().replace(/\s+/g, '');
    return NORM_ICONS[termKey] || null;
};

export const sortDescription = (lines) => {
    if (!Array.isArray(lines)) return lines;

    const getScore = (line) => {
        const text = String(line).toLowerCase();
        if (text.includes('on a hit') || text.includes('when you hit')) return 80;
        if (text.includes('on a miss') || text.includes('when you miss')) return 70;
        if (text.includes('you can replace')) return -1;
        return 0;
    };

    return [...lines].sort((a, b) => {
        const scoreA = getScore(a);
        const scoreB = getScore(b);
        return (scoreA !== scoreB) ? scoreB - scoreA : 0;
    });
};

const translateText = (text) => {
    if (!text) return '';
    let result = text;

    // Distance conversion (feet to meters) if not English
    // Approximation: 5ft = 1.5m
    const currentLang = i18next.language || 'en';
    if (!currentLang.startsWith('en')) {
        result = result.replace(/(\d+)\s*(ft|feet|foot)/gi, (match, p1) => {
            const feet = parseInt(p1);
            const meters = (feet / 5) * 1.5;
            // Format to 1 decimal place if needed, or integer if round
            const formattedMeters = Number.isInteger(meters) ? meters : meters.toFixed(1);
            return `${formattedMeters} m`;
        });
    }

    return result.replace(/\b(minutes?|hours?|rounds?|up to)\b/gi, (match) => {
        const key = match.toLowerCase().replace(/\s+/g, '');
        const normalizedKey = key === 'upto' ? 'upTo' : key;
        return i18next.exists(`ui.${normalizedKey}`) ? i18next.t(`ui.${normalizedKey}`) : match;
    });
};

export const renderGridValue = (text, type = 'range', showLabel = true) => {
    if (!text) return null;

    let str = String(text);
    const parts = [];
    let lastIndex = 0;
    const regex = new RegExp(TERM_PATTERN, 'gi');
    let match;

    while ((match = regex.exec(str)) !== null) {
        if (match.index > lastIndex) {
            parts.push({
                type: 'text',
                content: str.slice(lastIndex, match.index)
            });
        }

        const info = getIconInfo(match[0]);
        if (info) {
            parts.push({
                type: 'icon',
                info: info
            });
        } else {
            parts.push({
                type: 'text',
                content: match[0]
            });
        }

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) {
        parts.push({
            type: 'text',
            content: str.slice(lastIndex)
        });
    }

    // Post-process parts: clean punctuation and spaces
    const processedParts = parts.map((p, i) => {
        if (p.type === 'text') {
            let content = p.content;
            // Remove leading comma/space if it follows an icon
            if (i > 0 && parts[i - 1].type === 'icon') {
                content = content.replace(/^[,.\s]+/, '');
            }
            // Remove trailing comma/space if an icon follows
            if (i < parts.length - 1 && parts[i + 1].type === 'icon') {
                content = content.replace(/[,.\s]+$/, '');
            }
            return { ...p, content: translateText(content.trim()) };
        }
        return p;
    }).filter(p => p.type !== 'text' || p.content !== '');

    const hasIcon = processedParts.some(p => p.type === 'icon');

    // Choose primary icon for the chip
    let primaryIcon = 'straighten';
    if (type === 'duration') primaryIcon = 'schedule';
    if (type === 'time') primaryIcon = 'bolt';
    if (type === 'resource') primaryIcon = 'layers';

    if (hasIcon) {
        // Use the first icon found as the primary
        const firstIcon = processedParts.find(p => p.type === 'icon').info;
        const iconColor = firstIcon.color;

        const content = processedParts.map((p, i) => {
            if (p.type === 'text') return p.content;
            if (p.type === 'icon' && processedParts.length === 1 && showLabel) {
                return i18next.exists(p.info.shortName) ? i18next.t(p.info.shortName) : p.info.shortName;
            }
            return '';
        }).join(' ').trim();

        if (showLabel) {
            return (
                <mdui-chip variant="filled" className="grid-value-chip">
                    <mdui-icon slot="icon" name={firstIcon.icon} class={`icon-${iconColor}`}></mdui-icon>
                    <span className="text-primary">{content}</span>
                </mdui-chip>
            );
        }

        return (
            <div className="grid-value-chip" title={content}>
                <mdui-icon name={firstIcon.icon} class={`icon-${iconColor}`}></mdui-icon>
            </div>
        );
    }

    // No icon found case
    const translatedStr = translateText(str);
    if (showLabel) {
        return (
            <mdui-chip variant="filled" className="grid-value-chip">
                <mdui-icon slot="icon" name={primaryIcon} class="icon-accent"></mdui-icon>
                <span className="text-primary">{translatedStr}</span>
            </mdui-chip>
        );
    }

    return (
        <div className="grid-value-chip" title={translatedStr}>
            <mdui-icon name={primaryIcon} class="icon-accent"></mdui-icon>
        </div>
    );
};
