export interface IconInfo {
  icon: string;
  color: string;
  shortName: string;
}

export const TERM_ICONS: Record<string, IconInfo> = {
    'bonus action': { icon: 'play_arrow', color: 'bonus-action', shortName: 'Bonus' },
    'atWill': { icon: 'circle', color: 'accent', shortName: 'Special' }, // Fallback to circle/dots
    'free action': { icon: 'auto_awesome', color: 'accent', shortName: 'Special' },
    'action': { icon: 'circle', color: 'action', shortName: 'Action' },
    'reaction': { icon: 'emergency', color: 'reaction', shortName: 'Reaction' },
    'ritual': { icon: 'self_improvement', color: 'accent', shortName: 'Ritual' },
    'bludgeoning': { icon: 'explosion', color: 'physical', shortName: 'Bludgeoning' },
    'piercing': { icon: 'ads_click', color: 'physical', shortName: 'Piercing' },
    'slashing': { icon: 'content_cut', color: 'physical', shortName: 'Slashing' },
    'fire': { icon: 'local_fire_department', color: 'fire', shortName: 'Fire' },
    'cold': { icon: 'ac_unit', color: 'cold', shortName: 'Cold' },
    'acid': { icon: 'water_drop', color: 'acid', shortName: 'Acid' },
    'lightning': { icon: 'bolt', color: 'lightning', shortName: 'Lightning' },
    'poison': { icon: 'test_tube', color: 'poison', shortName: 'Poison' },
    'necrotic': { icon: 'skull', color: 'necrotic', shortName: 'Necrotic' },
    'radiant': { icon: 'light_mode', color: 'radiant', shortName: 'Radiant' },
    'force': { icon: 'flare', color: 'force', shortName: 'Force' },
    'thunder': { icon: 'graphic_eq', color: 'thunder', shortName: 'Thunder' },
    'psychic': { icon: 'psychology', color: 'psychic', shortName: 'Psychic' },
    'instantaneous': { icon: 'bolt', color: 'accent', shortName: 'Instant' },
    'healing': { icon: 'favorite', color: 'healing', shortName: 'Healing' },
    'concentration, up to ': { icon: 'psychology', color: 'accent', shortName: 'Concentration' },
    'spellSlot': { icon: 'filter_none', color: 'spell-slot', shortName: 'Spell Slot' },
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
    'layOnHands': { icon: 'front_hand', color: 'healing', shortName: 'Hands' },
    'channelDivinity': { icon: 'auto_awesome', color: 'radiant', shortName: 'Channel Divinity' },
    'clericChannelDivinity': { icon: 'blur_circular', color: 'radiant', shortName: 'Channel Divinity' },
    'giantAncestry': { icon: 'terrain', color: 'accent', shortName: 'Giant Ancestry' },
    'stonecunning': { icon: 'diamond', color: 'accent', shortName: 'Stonecunning' },
    'tireless': { icon: 'air', color: 'healing', shortName: 'Tireless' },
    'dreadfulStrike': { icon: 'remove_red_eye', color: 'necrotic', shortName: 'Tireless' },
    'chillingRetribution': { icon: 'ac_unit', color: 'cold', shortName: 'Chilling Retribution' },
    'favoredEnemy': { icon: 'my_location', color: 'fire', shortName: 'Favored Enemy' },
    'naturesVeil': { icon: 'forest', color: 'action', shortName: 'Nature\'s Veil' },
    'wholenessOfBody': { icon: 'self_improvement', color: 'healing', shortName: 'Wholeness' },
    'focusPoints': { icon: 'filter_none', color: 'action', shortName: 'Focus' },
    '1 focusPoints': { icon: 'filter_1', color: 'action', shortName: 'Focus' },
    '2 focusPoints': { icon: 'filter_2', color: 'action', shortName: 'Focus' },
    '3 focusPoints': { icon: 'filter_3', color: 'action', shortName: 'Focus' },
    '4 focusPoints': { icon: 'filter_4', color: 'action', shortName: 'Focus' },
    '5 focusPoints': { icon: 'filter_5', color: 'action', shortName: 'Focus' },
    '6 focusPoints': { icon: 'filter_6', color: 'action', shortName: 'Focus' },
    '7 focusPoints': { icon: 'filter_7', color: 'action', shortName: 'Focus' },
    'flurryOfHealingAndHarm': { icon: 'back_hand', color: 'fire', shortName: 'Flurry of Healing and Harm' },
    'sneak': { icon: 'colorize', color: 'fire', shortName: 'Sneak' },
    'rage': { icon: 'show_chart', color: 'fire', shortName: 'Rage' },
    'bardicInspiration': { icon: 'music_note', color: 'healing', shortName: 'Bardic Inspiration' },
    'wildShape': { icon: 'pets', color: 'action', shortName: 'Wild Shape' },
    'naturalRecoveryRestore': { icon: 'hive', color: 'healing', shortName: 'Natural Recovery: Restore' },
    'naturalRecoveryCast': { icon: 'spa', color: 'healing', shortName: 'Natural Recovery: Cast' },
    'wildResurgence': { icon: 'nature', color: 'fire', shortName: 'Wild Resurgence' },
    'natureMagician': { icon: 'auto_awesome', color: 'fire', shortName: 'Nature Magician' },
    'sorceryPoints': { icon: 'filter_none', color: 'psychic', shortName: 'Sorcery Points' },
    '1 sorceryPoints': { icon: 'filter_1', color: 'psychic', shortName: '1 Sorcery Point' },
    '2 sorceryPoints': { icon: 'filter_2', color: 'psychic', shortName: '2 Sorcery Points' },
    '3 sorceryPoints': { icon: 'filter_3', color: 'psychic', shortName: '3 Sorcery Points' },
    '4 sorceryPoints': { icon: 'filter_4', color: 'psychic', shortName: '4 Sorcery Points' },
    '5 sorceryPoints': { icon: 'filter_5', color: 'psychic', shortName: '5 Sorcery Points' },
    '6 sorceryPoints': { icon: 'filter_6', color: 'psychic', shortName: '6 Sorcery Points' },
    '7 sorceryPoints': { icon: 'filter_7', color: 'psychic', shortName: '7 Sorcery Points' },
    'pactMagicSpellSlot': { icon: 'filter_none', color: 'spell-slot', shortName: 'Spell Slots' },
    'psionicEnergyDice': { icon: 'casino', color: 'psychic', shortName: 'Psionic Die' },
    'telekineticMovement': { icon: 'control_camera', color: 'psychic', shortName: 'Telekinetic Movement' },
    'psiPoweredLeap': { icon: 'redo', color: 'psychic', shortName: 'Psi Powered Leap' },
    'guardedMind': { icon: 'shield', color: 'psychic', shortName: 'Guarded Mind' },
    'bulwarkOfForce': { icon: 'cyclone', color: 'psychic', shortName: 'Bulwark of Force' },
    'telekineticMaster': { icon: 'front_hand', color: 'psychic', shortName: 'Telekinesis' },
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
    'bloodthirst': { icon: 'water_drop', color: 'fire', shortName: 'Bloodthirst' },
    'warriorOfTheGods': { icon: 'storm', color: 'radiant', shortName: 'Warrior of the Gods' },
    'gloriousDefense': { icon: 'shield', color: 'fire', shortName: 'Glorious Defense' },
    'elementalRebuke': { icon: 'mode_standby', color: 'action', shortName: 'Elemental Rebuke' },
    'mistyWanderer': { icon: 'dehaze', color: 'psychic', shortName: 'Misty Wanderer' },
    'wardingFlare': { icon: 'flare', color: 'fire', shortName: 'Warding Flare' },
    'coronaOfLight': { icon: 'wb_sunny', color: 'fire', shortName: 'Corona of Light' },
    'warPriest': { icon: 'shield', color: 'radiant', shortName: 'War Priest' },
    'bladesong': { icon: 'music_note', color: 'psychic', shortName: 'Bladesong' },
    'innateSorcery': { icon: 'auto_mode', color: 'psychic', shortName: 'Innate Sorcery' },
    'restoreBalance': { icon: 'settings', color: 'accent', shortName: 'Restore Balance' },
    'moonlightStep': { icon: 'dark_mode', color: 'thunder', shortName: 'Moonlight Step' },
    'cosmicOmen': { icon: 'auto_awesome', color: 'radiant', shortName: 'Cosmic Omen' },
    'starMap': { icon: 'map', color: 'radiant', shortName: 'Star Map' },
    'stepsOfTheFey': { icon: 'radio_button_checked', color: 'psychic', shortName: 'Steps of the Fey' },
    'healingLight': { icon: 'flare', color: 'radiant', shortName: 'Healing Light' },
    'darkOnesOwnLuck': { icon: 'water_drop', color: 'fire', shortName: 'Dark One\'s Luck' },
    'luckPoints': { icon: 'control_point', color: 'action', shortName: 'Dark One\'s Luck' },
    'recoverVitality': { icon: 'health_and_safety', color: 'healing', shortName: 'Recover Vitality' },
    'dauntingRoar': { icon: 'graphic_eq', color: 'fire', shortName: 'Daunting Roar' },
    'forestGnomeSpeakWithAnimalsUses': { icon: 'graphic_eq', color: 'action', shortName: 'Speak With Animals' }
};

// Internal normalized map for lookups
export const NORM_ICONS = Object.fromEntries(
    Object.entries(TERM_ICONS).map(([k, v]) => [k.toLowerCase().replace(/\s+/g, ''), v])
);

const TERM_KEYS = Object.keys(TERM_ICONS).sort((a, b) => b.length - a.length);
export const TERM_PATTERN = new RegExp(`\\b(${TERM_KEYS.join('|')})\\b`, 'gi');

export const sortDescription = (lines: any[]): any[] => {
    if (!Array.isArray(lines)) return lines;

    const getScore = (line: any) => {
        const text = String(line).toLowerCase();
        if (text.includes('on a hit') || text.includes('when you hit')) return 80;
        if (text.includes('on a miss') || text.includes('when you miss')) return 70;
        if (text.includes('resource')) return -100;
        if (text.includes('you can attack')) return 100;
        if (text.includes('you can')) return 90;
        return 0;
    };

    return [...lines].sort((a, b) => {
        const scoreA = getScore(a);
        const scoreB = getScore(b);
        return (scoreA !== scoreB) ? scoreB - scoreA : 0;
    });
};

export const getIconInfo = (text: string): IconInfo | null => {
    if (!text) return null;
    const termKey = text.toLowerCase().replace(/\s+/g, '');
    return NORM_ICONS[termKey] || null;
};

export interface ParsedPart {
  type: 'text' | 'icon';
  content?: string;
  info?: IconInfo;
  originalText?: string;
}

export const parseTextWithIcons = (str: string): ParsedPart[] => {
  const parts: ParsedPart[] = [];
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
              info: info,
              originalText: match[0]
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

  // Clean spacing/commas
  return parts.map((p, i) => {
      if (p.type === 'text') {
          let content = p.content || '';
          if (i > 0 && parts[i - 1].type === 'icon') {
              content = content.replace(/^[,.\s]+/, '');
          }
          if (i < parts.length - 1 && parts[i + 1].type === 'icon') {
              content = content.replace(/[,.\s]+$/, '');
          }
          return { ...p, content: content.trim() };
      }
      return p;
  }).filter(p => p.type !== 'text' || p.content !== '');
};
