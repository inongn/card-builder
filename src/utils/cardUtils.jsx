import React from 'react';
import 'mdui/components/icon.js';
import 'mdui/components/chip.js';

// ============================================================================
// CONSTANTS
// ============================================================================

export const TERM_ICONS = {
    'bonus action': { icon: 'change_history', color: 'bonus-action', shortName: 'Bonus Action' }, // Triangle
    'free action': { icon: 'lens_blur', color: 'accent', shortName: 'Free Action' }, // Dashed circle/loader
    'null': { icon: 'lens_blur', color: 'accent', shortName: 'Free Action' },
    'action': { icon: 'circle', color: 'action', shortName: 'Action' },
    'reaction': { icon: 'flare', color: 'reaction', shortName: 'Reaction' }, // Sparkle
    'ritual': { icon: 'self_improvement', color: 'accent', shortName: 'Ritual' },
    'bludgeoning': { icon: 'explosion', color: 'physical', shortName: 'Bludgeoning' },
    'piercing': { icon: 'ads_click', color: 'physical', shortName: 'Piercing' }, // Target/arrow feel
    'slashing': { icon: 'content_cut', color: 'physical', shortName: 'Slashing' }, // Nearest to sword/cut
    'fire': { icon: 'local_fire_department', color: 'fire', shortName: 'Fire' },
    'cold': { icon: 'ac_unit', color: 'cold', shortName: 'Cold' },
    'acid': { icon: 'water_drop', color: 'acid', shortName: 'Acid' },
    'lightning': { icon: 'bolt', color: 'lightning', shortName: 'Lightning' },
    'poison': { icon: 'test_tube', color: 'poison', shortName: 'Poison' },
    'necrotic': { icon: 'skull', color: 'necrotic', shortName: 'Necrotic' },
    'radiant': { icon: 'light_mode', color: 'radiant', shortName: 'Radiant' },
    'force': { icon: 'flare', color: 'force', shortName: 'Force' },
    'thunder': { icon: 'graphic_eq', color: 'thunder', shortName: 'Thunder' }, // Waveform
    'psychic': { icon: 'psychology', color: 'psychic', shortName: 'Psychic' },
    'Instantaneous': { icon: 'bolt', color: 'accent', shortName: 'Instantaneous' },
    'healing': { icon: 'favorite', color: 'healing', shortName: 'Healing' },

    'concentration': { icon: 'psychology', color: 'accent', shortName: 'Concentration' },
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
    'tireless': { icon: 'air', color: 'healing', shortName: 'Tireless' },
    'wholenessOfBody': { icon: 'self_improvement', color: 'healing', shortName: 'Wholeness' },
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
    'self': { icon: 'person_pin_circle', color: 'accent', shortName: 'Self' },
    'touch': { icon: 'back_hand', color: 'accent', shortName: 'Touch' },
    'limited': { icon: 'replay', color: 'accent', shortName: 'Limited' },
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
    return text;
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
            return { ...p, content: content.trim() };
        }
        return p;
    }).filter(p => p.type !== 'text' || p.content !== '');

    const hasIcon = processedParts.some(p => p.type === 'icon');

    // Choose primary icon for the chip
    let primaryIcon = 'straighten';
    if (type === 'duration') primaryIcon = 'schedule';
    if (type === 'time') primaryIcon = 'hourglass_top';
    if (type === 'resource') primaryIcon = 'layers';

    if (hasIcon) {
        // Use the first icon found as the primary
        const firstIcon = processedParts.find(p => p.type === 'icon').info;
        const iconColor = firstIcon.color;

        const content = processedParts.map((p, i) => {
            if (p.type === 'text') return p.content;
            if (p.type === 'icon' && processedParts.length === 1 && showLabel) {
                return p.info.shortName;
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
    if (showLabel) {
        return (
            <mdui-chip variant="filled" className="grid-value-chip">
                <mdui-icon slot="icon" name={primaryIcon} class="icon-accent"></mdui-icon>
                <span className="text-primary">{str}</span>
            </mdui-chip>
        );
    }

    return (
        <div className="grid-value-chip" title={str}>
            <mdui-icon name={primaryIcon} class="icon-accent"></mdui-icon>
        </div>
    );
};
