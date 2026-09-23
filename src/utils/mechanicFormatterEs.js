import { ExpressionEvaluator } from '../engine/ExpressionEvaluator.js';
import { formatBonus } from '../engine/helpers.js';
import { getLocale } from '../i18n/i18nCore.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const LOCALIZED_ABILITY_NAMES = {
  en: {
    str: 'Strength',
    dex: 'Dexterity',
    con: 'Constitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    cha: 'Charisma',
    strength: 'Strength',
    dexterity: 'Dexterity',
    constitution: 'Constitution',
    intelligence: 'Intelligence',
    wisdom: 'Wisdom',
    charisma: 'Charisma'
  },
  es: {
    str: 'Fuerza',
    dex: 'Destreza',
    con: 'Constitución',
    int: 'Inteligencia',
    wis: 'Sabiduría',
    cha: 'Carisma',
    strength: 'Fuerza',
    dexterity: 'Destreza',
    constitution: 'Constitución',
    intelligence: 'Inteligencia',
    wisdom: 'Sabiduría',
    charisma: 'Carisma'
  }
};

const ABILITY_NAMES = LOCALIZED_ABILITY_NAMES.es;

export function getAbilityName(abilityKey, lang = 'es') {
  const effectiveLang = 'es';
  const k = (abilityKey || 'dex').toLowerCase();
  return LOCALIZED_ABILITY_NAMES.es?.[k] || capitalize(k);
}

/** Canonical display order for payloads within a clause */
const PAYLOAD_ORDER = {
  damage: 1,
  damageReduction: 2,
  healing: 3,
  movement: 4,
  teleport: 5,
  condition: 6,
  conditionCleanse: 7,
  defense: 8,
  statModifier: 9,
  rollModifier: 10,
  text: 11,
  action: 12
};

/**
 * Maps every TriggerEventEnum value to a natural-language fragment.
 * The fragment is written in the second-person singular ("you hit") or
 * impersonal ("a creature enters") as appropriate for its category.
 */
const TRIGGER_EVENT_PHRASES = {
  // Personal — "When you <phrase>"
  make_attack: { subject: 'you', phrase: 'make an attack' },
  hit_with_attack: { subject: 'you', phrase: 'hit a creature with an attack' },
  miss_with_attack: { subject: 'you', phrase: 'miss with an attack' },
  be_hit: { subject: 'you', phrase: 'are hit by an attack' },
  take_damage: { subject: 'you', phrase: 'take damage' },
  make_save: { subject: 'you', phrase: 'make a saving throw' },
  fail_save: { subject: 'you or a creature you can see', phrase: 'fail a saving throw' },
  make_check: { subject: 'you', phrase: 'make an ability check' },
  fail_check: { subject: 'you or a creature you can see', phrase: 'fail an ability check' },
  roll_initiative: { subject: 'you', phrase: 'roll Initiative' },
  roll_damage: { subject: 'you', phrase: 'roll damage' },
  land_crit: { subject: 'you', phrase: 'score a critical hit' },
  drop_enemy_zero: { subject: 'you', phrase: 'reduce an enemy to 0 Hit Points' },
  cast_spell: { subject: 'you', phrase: 'cast a spell' },
  // Aura / area — "When <phrase>"
  on_cast: { subject: null, phrase: 'the area is created' },
  enter_area: { subject: null, phrase: 'a creature enters the area' },
  start_turn: { subject: null, phrase: 'a creature starts its turn there' },
  end_turn: { subject: null, phrase: 'a creature ends its turn there' },
  leave_area: { subject: null, phrase: 'a creature leaves the area' },
  move_within_range: { subject: null, phrase: 'a creature moves within range' },
  area_moves_into_space: { subject: null, phrase: "the area moves into a creature's space" },
  move_into_space: { subject: null, phrase: "the area moves into a creature's space" },
  // Custom — rendered verbatim
  custom: null,
};

const TRIGGER_EVENT_PHRASES_ES = {
  make_attack: { subject: 'tú', phrase: 'haces un ataque' },
  hit_with_attack: { subject: 'tú', phrase: 'impactas a una criatura con un ataque' },
  miss_with_attack: { subject: 'tú', phrase: 'fallas con un ataque' },
  be_hit: { subject: 'tú', phrase: 'eres impactado por un ataque' },
  take_damage: { subject: 'tú', phrase: 'recibes daño' },
  make_save: { subject: 'tú', phrase: 'haces una tirada de salvación' },
  fail_save: { subject: 'tú o una criatura que puedas ver', phrase: 'fallan una tirada de salvación' },
  make_check: { subject: 'tú', phrase: 'haces una prueba de característica' },
  fail_check: { subject: 'tú o una criatura que puedas ver', phrase: 'fallan una prueba de característica' },
  roll_initiative: { subject: 'tú', phrase: 'tiras Iniciativa' },
  roll_damage: { subject: 'tú', phrase: 'tiras el daño' },
  land_crit: { subject: 'tú', phrase: 'consigues un impacto crítico' },
  drop_enemy_zero: { subject: 'tú', phrase: 'reduces a un enemigo a 0 Puntos de Golpe' },
  cast_spell: { subject: 'tú', phrase: 'lanzas un conjuro' },
  on_cast: { subject: null, phrase: 'se crea el área' },
  enter_area: { subject: null, phrase: 'una criatura entra en el área' },
  start_turn: { subject: null, phrase: 'una criatura empieza su turno allí' },
  end_turn: { subject: null, phrase: 'una criatura termina su turno allí' },
  leave_area: { subject: null, phrase: 'una criatura sale del área' },
  move_within_range: { subject: null, phrase: 'una criatura se mueve dentro del alcance' },
  area_moves_into_space: { subject: null, phrase: 'el área se mueve al espacio de una criatura' },
  move_into_space: { subject: null, phrase: 'el área se mueve al espacio de una criatura' },
  custom: null,
};

// ─── Upcast utilities ────────────────────────────────────────────────────────

/**
 * Resolves a dotted/bracketed path against an object.
 * e.g. "blocks[1].failure.dice.count" or "failure[0].dice.count"
 */
function resolveUpcastPath(obj, path) {
  if (!obj || !path) return undefined;
  // Split on '.' or on '[N]', keeping numeric segments
  const parts = [];
  for (const seg of path.split('.')) {
    const bracketMatch = seg.match(/^([^[]+)(?:\[(\d+)\])?$/);
    if (bracketMatch) {
      parts.push(bracketMatch[1]);
      if (bracketMatch[2] !== undefined) parts.push(bracketMatch[2]);
    } else {
      parts.push(seg);
    }
  }
  let cur = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined || typeof cur !== 'object') return undefined;
    cur = cur[p];
  }
  return cur;
}

/**
 * Sets a value at a dotted/bracketed path on an object (mutates in-place).
 */
function setUpcastPath(obj, path, value) {
  if (!obj || !path) return;
  const parts = [];
  for (const seg of path.split('.')) {
    const bracketMatch = seg.match(/^([^[]+)(?:\[(\d+)\])?$/);
    if (bracketMatch) {
      parts.push(bracketMatch[1]);
      if (bracketMatch[2] !== undefined) parts.push(bracketMatch[2]);
    } else {
      parts.push(seg);
    }
  }
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (cur === null || cur === undefined || typeof cur !== 'object') return;
    cur = cur[parts[i]];
  }
  if (cur !== null && cur !== undefined && typeof cur === 'object') {
    cur[parts[parts.length - 1]] = value;
  }
}

/**
 * Deep-clones a mechanic object and applies upcast modifications.
 * Returns the original object unchanged if upcastSteps <= 0 or no modifications.
 */
function applyUpcast(mechanicObj, upcastSpec, upcastSteps) {
  if (!mechanicObj || !upcastSpec || upcastSteps <= 0) return mechanicObj;
  const mods = upcastSpec.modifications;
  if (!mods || mods.length === 0) return mechanicObj;

  const cloned = JSON.parse(JSON.stringify(mechanicObj));
  for (const { path, add } of mods) {
    const current = resolveUpcastPath(cloned, path);
    const addNum = typeof add === 'number' ? add : Number(add);
    if (typeof current === 'number' && !isNaN(addNum)) {
      setUpcastPath(cloned, path, current + addNum * upcastSteps);
    }
  }
  return cloned;
}

/**
 * Derives the human-readable upcast label fragment (without the "_Upcast:_" prefix).
 * Uses upcastSpec.display.label if present; otherwise auto-derives from modifications.
 */
function deriveUpcastLabel(upcastSpec, mechanicObj, activity, evalStr, lang = null) {
  if (!upcastSpec) return '';

  // Explicit override
  if (upcastSpec.display?.label) return upcastSpec.display.label;

  const mods = upcastSpec.modifications;
  if (!mods || mods.length === 0) return '';

  const effectiveLang = lang || getLocale() || 'en';
  const isEs = effectiveLang === 'es';

  const fragments = [];

  for (const { path, add } of mods) {
    const addNum = typeof add === 'number' ? add : Number(add);
    const prefix = addNum > 0 ? `+${addNum}` : `${addNum}`;

    // Target count scaling → "+N target"
    if (path === 'target.count') {
      const filter = mechanicObj?.target?.filter;
      const filterText = filter ? ` ${capitalize(evalStr ? evalStr(filter) : String(filter))}` : '';
      const noun = isEs
        ? (addNum === 1 ? 'objetivo' : 'objetivos')
        : (addNum === 1 ? 'target' : 'targets');
      fragments.push(`${prefix}${filterText} ${noun}`);
      continue;
    }

    // AOE size scaling → "+N ft. Shape radius/length"
    if (path.endsWith('target.aoe.size') || path === 'target.aoe.size') {
      const rawShape = String(mechanicObj?.target?.aoe?.shape || 'sphere').toLowerCase();
      const isLine = rawShape === 'line' || rawShape === 'línea';
      const isWall = rawShape === 'wall' || rawShape === 'muro';
      if (isEs) {
        const shape = SPANISH_AOE_SHAPES[rawShape] || capitalize(rawShape);
        const suffix = (isLine || isWall) ? 'longitud' : 'radio';
        fragments.push(`${prefix} pies de ${suffix} (${shape})`);
      } else {
        const shape = capitalize(rawShape);
        const suffix = (isLine || isWall) ? 'length' : 'radius';
        fragments.push(`${prefix} ft. ${shape} ${suffix}`);
      }
      continue;
    }

    // Healing dice count scaling → "+Nd[sides] healing"
    if (path.includes('healing') && path.includes('dice.count')) {
      // Walk to the healing dice object to get sides
      const healPath = path.replace(/\.count$/, '').replace(/\.dice$/, '');
      let sides = '';
      // Try to find sides by resolving the parent dice object
      const dicePath = path.replace(/\.count$/, '');
      const diceObj = resolveUpcastPath(mechanicObj, dicePath);
      if (diceObj && typeof diceObj === 'object') {
        sides = diceObj.sides ? `d${diceObj.sides}` : '';
      }
      if (isEs) {
        const healingType = path.includes('tempHitPoints') ? 'PG Temporales' : 'curación';
        fragments.push(`${prefix}${sides} de ${healingType}`);
      } else {
        const healingType = path.includes('tempHitPoints') ? 'Temp HP' : 'healing';
        fragments.push(`${prefix}${sides} ${healingType}`);
      }
      continue;
    }

    // Damage dice count scaling → "+Nd[sides] DamageType damage"
    if (path.includes('dice.count')) {
      const dicePath = path.replace(/\.count$/, '');
      const diceObj = resolveUpcastPath(mechanicObj, dicePath);
      let sides = '';
      let dmgType = '';

      if (diceObj && typeof diceObj === 'object') {
        sides = diceObj.sides ? `d${diceObj.sides}` : '';
      }

      // Find damageType by walking up the path to the payload
      const diceParentPath = dicePath.replace(/\.dice$/, '');
      const payloadObj = resolveUpcastPath(mechanicObj, diceParentPath);
      if (payloadObj && typeof payloadObj === 'object') {
        const rawType = payloadObj.damageType;
        if (rawType) {
          dmgType = formatDamageType(rawType, evalStr, effectiveLang);
        }
      }

      if (isEs) {
        const label = dmgType
          ? `${prefix}${sides} de daño por ${dmgType}`
          : `${prefix}${sides} de daño`;
        fragments.push(label);
      } else {
        const label = dmgType
          ? `${prefix}${sides} ${dmgType} damage`
          : `${prefix}${sides} damage`;
        fragments.push(label);
      }
      continue;
    }

    // Fallback — generic numeric add
    fragments.push(`${prefix}`);
  }

  if (fragments.length === 0) return '';
  if (fragments.length === 1) return fragments[0];
  const andWord = isEs ? ' y ' : ' and ';
  return fragments.slice(0, -1).join(', ') + andWord + fragments[fragments.length - 1];
}

/**
 * Returns the number of upcast steps for a Warlock character, or 0 for non-Warlocks.
 */
function computeWarlockUpcastSteps(activity, characterData) {
  const isWarlock = characterData?.resources?.some(r => r.id === 'pactMagicSpellSlot');
  if (!isWarlock) return 0;

  const resourceId = activity?.resource || '';
  const baseMatch = resourceId.match(/^level(\d+)SpellSlot$/);
  if (!baseMatch) return 0;
  const baseLevel = parseInt(baseMatch[1], 10);

  const charLevel = characterData?.meta?.level || 1;
  const pactLevel = Math.min(5, Math.ceil(charLevel / 2));

  return Math.max(0, pactLevel - baseLevel);
}

/**
 * Returns the highest spell slot level available to the character.
 * Returns 0 if no spell slots are found.
 */
function computeMaxSlotLevel(characterData) {
  let max = 0;
  for (const r of (characterData?.resources || [])) {
    const m = (r.id || '').match(/^level(\d+)SpellSlot$/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return max;
}

// ─── Utility helpers ──────────────────────────────────────────────────────────

export function capitalize(str) {
  if (!str || typeof str !== 'string') return str || '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDistance(distStr, lang = null) {
  if (!distStr) return '';
  const effectiveLang = lang || getLocale() || 'en';
  const isEs = effectiveLang === 'es';
  const str = String(distStr).trim();
  if (/^5\s*(feet|foot|pies|pie)$/i.test(str)) {
    return isEs ? 'alcance 5 pies' : 'reach 5 feet';
  }
  if (/^touch$/i.test(str) || /^contacto$/i.test(str)) {
    return isEs ? 'alcance Contacto' : 'reach Touch';
  }
  if (/^self$/i.test(str) || /^personal$/i.test(str)) {
    return isEs ? 'alcance Personal' : 'range Self';
  }
  if (isEs) {
    return str.replace(/\b(feet|foot|ft\.?)\b/gi, 'pies');
  }
  return str.replace(/\bfoot\b/gi, 'feet');
}

/** Returns the canonical payload type string, requiring an explicit `type` field. */
function getPayloadType(p) {
  if (!p || typeof p !== 'object') return 'text';
  return p.type || 'text';
}

function getPayloadRank(p) {
  return PAYLOAD_ORDER[getPayloadType(p)] ?? PAYLOAD_ORDER.text;
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

const SPANISH_DAMAGE_TYPES = {
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

const SPANISH_AOE_SHAPES = {
  sphere: 'Esfera',
  cylinder: 'Cilindro',
  cube: 'Cubo',
  cone: 'Cono',
  line: 'Línea',
  wall: 'Muro',
  emanation: 'Emanación',
  square: 'Cuadrado'
};

const SPANISH_CONDITIONS = {
  blinded: 'cegado',
  charmed: 'hechizado',
  deafened: 'ensordecido',
  frightened: 'asustado',
  grappled: 'agarrado',
  incapacitated: 'incapacitado',
  invisible: 'invisible',
  paralyzed: 'paralizado',
  petrified: 'petrificado',
  poisoned: 'envenenado',
  prone: 'derribado',
  restrained: 'apresado',
  stunned: 'aturdido',
  unconscious: 'inconsciente',
  exhaustion: 'agotamiento'
};

const SPANISH_FILTER_NOUNS = {
  creature: { s: 'criatura', p: 'criaturas' },
  target: { s: 'objetivo', p: 'objetivos' },
  ally: { s: 'aliado', p: 'aliados' },
  allies: { s: 'aliado', p: 'aliados' },
  enemy: { s: 'enemigo', p: 'enemigos' },
  enemies: { s: 'enemigo', p: 'enemigos' },
  undead: { s: 'muerto viviente', p: 'muertos vivientes' },
  beast: { s: 'bestia', p: 'bestias' },
  humanoid: { s: 'humanoide', p: 'humanoides' },
  monster: { s: 'monstruo', p: 'monstruos' }
};

export function formatDamageType(typeVal, evalStr, lang = null) {
  if (!typeVal) return '';
  const effectiveLang = lang || getLocale() || 'en';
  const isEs = effectiveLang === 'es';
  const rawList = Array.isArray(typeVal) ? typeVal : [typeVal];
  const formatted = rawList
    .map(t => {
      const s = evalStr(t);
      if (s === 'damage') return '';
      if (isEs) {
        const lower = String(s).toLowerCase();
        return SPANISH_DAMAGE_TYPES[lower] || capitalize(s);
      }
      return capitalize(s);
    })
    .filter(Boolean);
  if (formatted.length === 0) return '';
  if (formatted.length === 1) return formatted[0];
  const orWord = isEs ? 'o' : 'or';
  if (formatted.length === 2) return `${formatted[0]} ${orWord} ${formatted[1]}`;
  return `${formatted.slice(0, -1).join(', ')}, ${orWord} ${formatted[formatted.length - 1]}`;
}

export function formatFilterText(filterVal, evalStr, plural = false, lang = null) {
  const effectiveLang = lang || getLocale() || 'en';
  const isEs = effectiveLang === 'es';
  if (!filterVal) return isEs ? (plural ? 'criaturas' : 'criatura') : (plural ? 'creatures' : 'creature');
  const rawList = Array.isArray(filterVal) ? filterVal : [filterVal];
  const formattedList = rawList.map(f => evalStr(f)).filter(Boolean);
  if (formattedList.length === 0) return isEs ? (plural ? 'criaturas' : 'criatura') : (plural ? 'creatures' : 'creature');

  return formattedList
    .map(s => {
      const evalS = String(s).trim();
      const lower = evalS.toLowerCase();
      if (isEs) {
        if (lower === 'creatures of your choice' || lower === 'creature of your choice' || lower === 'criaturas de tu elección' || lower === 'criatura de tu elección') {
          return plural ? 'criaturas de tu elección' : 'criatura de tu elección';
        }
        if (lower === 'self or creature' || lower === 'creature or self') {
          return 'criatura (o tú mismo)';
        }
        const nounInfo = SPANISH_FILTER_NOUNS[lower];
        if (nounInfo) {
          return plural ? nounInfo.p : nounInfo.s;
        }
        if (plural) {
          return lower.endsWith('s') ? lower : `${lower}s`;
        }
        return lower;
      }
      if (lower === 'creatures of your choice' || lower === 'creature of your choice') {
        return plural ? 'creatures of your choice' : 'creature of your choice';
      }
      if (lower === 'self or creature' || lower === 'creature or self') {
        return 'creature (or yourself)';
      }
      if (plural) {
        if (lower === 'creature') return 'creatures';
        if (lower === 'undead') return 'Undead';
        if (lower.endsWith('s')) return lower;
        return `${lower}s`;
      }
      return lower;
    })
    .join(isEs ? ' o ' : ' or ');
}

/**
 * Formats the trigger section of a block into a "When ..." sentence.
 * Uses a complete lookup table covering every TriggerEventEnum value.
 */
export function formatTrigger(trigger, evalStr, lang = null) {
  if (!trigger) return '';
  if (typeof trigger === 'string') return evalStr(trigger);

  if (trigger.text) return evalStr(trigger.text);

  const effectiveLang = lang || getLocale() || 'en';
  const isEs = effectiveLang === 'es';
  const phrasesTable = isEs ? TRIGGER_EVENT_PHRASES_ES : TRIGGER_EVENT_PHRASES;

  if (trigger.event) {
    const rawEvents = Array.isArray(trigger.event) ? trigger.event : [trigger.event];

    const personalPhrases = [];
    const impersonalPhrases = [];

    for (const e of rawEvents) {
      const entry = phrasesTable[e];
      if (!entry) {
        personalPhrases.push(e.replace(/_/g, ' '));
        continue;
      }
      if (entry.subject === null) {
        impersonalPhrases.push(entry.phrase);
      } else {
        personalPhrases.push({ subject: entry.subject, phrase: entry.phrase });
      }
    }

    const parts = [];
    const whenWord = isEs ? 'Cuando' : 'When';

    if (impersonalPhrases.length > 0) {
      const joined = joinOr(impersonalPhrases, isEs);
      parts.push(`${whenWord} ${joined}`);
    }

    if (personalPhrases.length > 0) {
      const structured = personalPhrases.filter(p => typeof p === 'object');
      const raw = personalPhrases.filter(p => typeof p === 'string');

      const bySubject = new Map();
      for (const { subject, phrase } of structured) {
        if (!bySubject.has(subject)) bySubject.set(subject, []);
        bySubject.get(subject).push(phrase);
      }

      for (const [subject, phrases] of bySubject) {
        const joined = joinOr(phrases, isEs);
        if (isEs) {
          if (subject === 'tú') {
            parts.push(`${whenWord} ${joined}`);
          } else {
            parts.push(`${whenWord} ${subject} ${joined}`);
          }
        } else {
          parts.push(`${whenWord} ${subject} ${joined}`);
        }
      }

      if (raw.length > 0) {
        parts.push(`${whenWord} ${isEs ? 'haces' : 'you'} ${joinOr(raw, isEs)}`);
      }
    }

    if (parts.length === 0) return '';
    return parts.join(isEs ? ', o ' : ', or ');
  }

  return '';
}

function joinOr(arr, isEs = false) {
  if (arr.length === 1) return arr[0];
  const orWord = isEs ? 'o' : 'or';
  return `${arr.slice(0, -1).join(', ')}, ${orWord} ${arr[arr.length - 1]}`;
}

export function formatRepeat(repeat, pattern, evalStr, lang = null) {
  if (!repeat) return '';
  const effectiveLang = lang || getLocale() || 'en';
  const isEs = effectiveLang === 'es';
  let rawAction = '';
  if (typeof repeat === 'string') {
    rawAction = repeat;
  } else if (typeof repeat === 'object') {
    if (repeat.action) rawAction = repeat.action;
  }
  if (!rawAction) return '';

  const lower = rawAction.toLowerCase();

  if (isEs) {
    let actionName = 'una Acción';
    if (lower === 'bonus_action') actionName = 'una Acción Adicional';
    else if (lower === 'action') actionName = 'una Acción';
    else if (lower === 'free_action') actionName = 'una acción gratuita';
    else if (lower === 'reaction') actionName = 'una Reacción';

    if (pattern === 'attack') {
      return ` _Repetir:_ En turnos posteriores, puedes usar ${actionName} para repetir el ataque.`;
    }
    if (pattern === 'save') {
      return ` _Repetir:_ En turnos posteriores, puedes usar ${actionName} para mover el efecto y repetir la salvación.`;
    }
    return ` _Repetir:_ En turnos posteriores, puedes usar ${actionName} para repetir el efecto.`;
  }

  let actionName = 'action';
  if (lower === 'bonus_action') actionName = 'Bonus Action';
  else if (lower === 'action') actionName = 'action';
  else if (lower === 'free_action') actionName = 'free action';
  else if (lower === 'reaction') actionName = 'reaction';

  const article = /^[aeiou]/i.test(actionName) ? 'an' : 'a';

  if (pattern === 'attack') {
    return ` _Repeat:_ On subsequent turns, you can take ${article} ${actionName} to repeat the attack.`;
  }
  if (pattern === 'save') {
    return ` _Repeat:_ On subsequent turns, you can take ${article} ${actionName} to move the effect and repeat the save.`;
  }
  return ` _Repeat:_ On subsequent turns, you can take ${article} ${actionName} to repeat the effect.`;
}

/**
 * Formats a target specification into a natural-language clause beginning with ", ".
 * e.g. ", one creature within 60 feet"  /  ", each creature in a 15-foot-radius Sphere centered on you"
 */
export function formatTargetText(targetObj, formattedRange, evalStr, isAttack = false, activity = null, lang = null) {
  if (!targetObj) return '';
  const effectiveLang = lang || getLocale() || 'en';
  const isEs = effectiveLang === 'es';
  if (targetObj.text) return `, ${evalStr(targetObj.text)}`;
  const cleanRange = formattedRange.replace(/^(range|reach|alcance)\s*/i, '').trim();

  const filterSingular = formatFilterText(targetObj.filter, evalStr, false, effectiveLang);
  const filterPlural = formatFilterText(targetObj.filter, evalStr, true, effectiveLang);

  // ── AOE target ──────────────────────────────────────────────────────────────
  if (targetObj.aoe) {
    const rawShape = (evalStr(targetObj.aoe.shape || 'sphere') || 'sphere').toLowerCase();
    const size = evalStr(targetObj.aoe.size || '');
    const isLine = rawShape === 'line' || rawShape === 'línea';
    const isWall = rawShape === 'wall' || rawShape === 'muro';
    const isEmanation = rawShape === 'emanation' || rawShape === 'emanación';
    const isCube = rawShape === 'cube' || rawShape === 'cubo';
    const isCone = rawShape === 'cone' || rawShape === 'cono';

    if (isEs) {
      const shape = SPANISH_AOE_SHAPES[rawShape] || capitalize(rawShape);
      let sizePhrase = '';
      if (isLine) sizePhrase = `una Línea de ${size} pies`;
      else if (isWall) sizePhrase = `un Muro de ${size} pies`;
      else if (isEmanation) sizePhrase = `una Emanación de ${size} pies`;
      else if (isCube) sizePhrase = `un Cubo de ${size} pies`;
      else if (isCone) sizePhrase = `un Cono de ${size} pies`;
      else if (rawShape === 'cylinder') sizePhrase = `un Cilindro de ${size} pies de radio`;
      else sizePhrase = `una ${shape} de ${size} pies de radio`;

      let rangePart = '';
      const lowerRange = cleanRange.toLowerCase();
      if (targetObj.inherit === 'trigger' || targetObj.inherit === 'prev_step') {
        rangePart = ' centrada en el objetivo';
      } else if (lowerRange === 'self' || lowerRange === 'personal' || isEmanation) {
        rangePart = isLine ? ' que se origina en ti' : ' centrada en ti';
      } else if (cleanRange) {
        rangePart = ` a un alcance de ${cleanRange} o menos`;
      }
      return `, cada ${filterSingular} en ${sizePhrase}${rangePart}`;
    }

    const shape = capitalize(evalStr(targetObj.aoe.shape || 'sphere'));
    const sizePhrase = (isLine || isWall) ? `${size}-foot ${shape}` : `${size}-foot-radius ${shape}`;

    let rangePart = '';
    const lowerRange = cleanRange.toLowerCase();
    if (targetObj.inherit === 'trigger' || targetObj.inherit === 'prev_step') {
      rangePart = ' centered on the target';
    } else if (lowerRange === 'self' || isEmanation) {
      rangePart = isLine ? ' originating from you' : ' centered on you';
    } else if (cleanRange) {
      rangePart = ` centered on a point within ${cleanRange}`;
    }
    return `, each ${filterSingular} in a ${sizePhrase}${rangePart}`;
  }

  // ── Inherited target ────────────────────────────────────────────────────────
  if (targetObj.inherit === 'trigger') {
    const triggerEvent = activity?.mechanic?.trigger?.event
      ?? activity?.mechanic?.blocks?.[0]?.trigger?.event
      ?? '';
    const rawEvents = Array.isArray(triggerEvent) ? triggerEvent : [triggerEvent];
    const isAttackerTrigger = rawEvents.some(e =>
      e === 'be_hit' || e === 'take_damage'
    );
    if (isEs) {
      return isAttackerTrigger ? ', el atacante' : ', el objetivo';
    }
    return isAttackerTrigger ? ', the attacker' : ', the target';
  }
  if (targetObj.inherit === 'prev_step') {
    return '';
  }

  const type = (evalStr(targetObj.type) || '').toLowerCase();
  const countRaw = targetObj.count !== undefined ? evalStr(targetObj.count) : '';
  const countNum = parseInt(countRaw, 10);

  // ── Multiple targets ────────────────────────────────────────────────────────
  if (type === 'multiple' || type === 'multi' || (!isNaN(countNum) && countNum > 1)) {
    if (isEs) {
      const rangePart = cleanRange && !/^(self|personal)$/i.test(cleanRange) ? ` a ${cleanRange} o menos` : '';
      if (!countRaw || isNaN(countNum)) {
        return `, ${filterPlural} de tu elección${rangePart}`;
      }
      const noun = targetObj.filter
        ? (countRaw === '1' ? filterSingular : filterPlural)
        : (countRaw === '1' ? 'objetivo' : 'objetivos');
      return `, hasta ${countRaw} ${noun}${rangePart}`;
    }

    const rangePart = cleanRange && !/^self$/i.test(cleanRange) ? ` within ${cleanRange}` : '';
    if (!countRaw || isNaN(countNum)) {
      return `, ${filterPlural} of your choice${rangePart}`;
    }
    const noun = targetObj.filter
      ? (countRaw === '1' ? filterSingular : filterPlural)
      : (countRaw === '1' ? 'target' : 'targets');
    return `, up to ${countRaw} ${noun}${rangePart}`;
  }

  // ── Attack pattern: target is implied by the roll ───────────────────────────
  if (isAttack) return '';

  // ── Single / touch / self targets ───────────────────────────────────────────
  if (!cleanRange) return '';
  const lowerRange = cleanRange.toLowerCase();
  if (lowerRange === 'self' || lowerRange === 'personal') return '';
  if (isEs) {
    if (lowerRange === 'touch' || lowerRange === 'contacto') return `, una ${filterSingular} que toques`;
    return `, una ${filterSingular} a ${cleanRange} o menos`;
  }
  if (lowerRange === 'touch') return `, one ${filterSingular} you touch`;
  return `, one ${filterSingular} within ${cleanRange}`;
}

// ─── Payload formatting ───────────────────────────────────────────────────────

/**
 * Formats a single payload into a natural-language fragment (no leading capital,
 * no trailing period — the caller handles those).
 */
export function formatPayload(payload, evalStr, formatDiceObj, ctx = {}) {
  if (!payload) return '';
  if (typeof payload === 'string') return evalStr(payload);

  const type = getPayloadType(payload);
  const isEs = getLocale() === 'es';

  // ── Text payload ─────────────────────────────────────────────────────────────
  if (type === 'text') {
    const raw = evalStr(payload.text || '');
    const lowered = raw.charAt(0).toLowerCase() + raw.slice(1);
    if (isEs) {
      return lowered
        .replace(/\b(?<!\b(el|un|cada|otro|ese|este|mismo|uno|ningún)\s+)target\b/gi, 'el objetivo')
        .replace(/\.$/, '');
    }
    return lowered
      .replace(/\b(?<!\b(the|a|an|each|every|another|that|this|same|one|any|new|no)\s+)target\b/gi, 'the target')
      .replace(/\.$/, '');
  }

  // ── Damage payload ──────────────────────────────────────────────────────────
  if (type === 'damage') {
    const dDice = formatDiceObj(payload.dice, payload.min, evalStr);
    const dType = formatDamageType(payload.damageType, evalStr, isEs ? 'es' : 'en');
    const typeStr = dType ? ` ${dType}` : '';
    if (payload.text) {
      const txt = evalStr(payload.text).trim();
      if (dDice && !txt.includes(dDice) && !/^(gain|add|deal|take|plus|gana|añade|inflige|recibe|más)\b/i.test(txt)) {
        return `${dDice} ${txt}`.trim();
      }
      return txt;
    }
    if (isEs) {
      return dDice ? `${dDice} de daño${dType ? ` por ${dType}` : ''}` : 'daño';
    }
    return dDice ? `${dDice}${typeStr} damage` : 'damage';
  }

  // ── Healing payload ─────────────────────────────────────────────────────────
  if (type === 'healing') {
    const healEntry = payload.healing || payload;
    const diceStr = formatDiceObj(healEntry.dice, undefined, evalStr);
    const typeLabel = healEntry.type === 'tempHitPoints'
      ? (isEs ? 'puntos de golpe temporales' : 'Temporary Hit Points')
      : (isEs ? 'puntos de golpe' : 'Hit Points');
    return diceStr ? `${diceStr} ${typeLabel}` : typeLabel;
  }

  // ── Condition payload ───────────────────────────────────────────────────────
  if (type === 'condition') {
    const rawCond = Array.isArray(payload.condition) ? payload.condition : [payload.condition];
    const formattedCond = rawCond.map(c => {
      const s = evalStr(c);
      if (isEs) {
        return SPANISH_CONDITIONS[String(s).toLowerCase()] || s;
      }
      return capitalize(s);
    }).join(isEs ? ' y ' : ' and ');
    const condBase = (formattedCond.toLowerCase() === 'prone' || formattedCond.toLowerCase() === 'derribado')
      ? (isEs ? 'derribado' : 'Prone')
      : (isEs ? `la condición de ${formattedCond}` : `the ${formattedCond} condition`);

    let endText = '';
    if (payload.end) {
      if (typeof payload.end === 'string') {
        let actionCheckText = isEs ? ' (CD de escape)' : ' (escape DC)';
        if (payload.end === 'action_check') {
          const rawDc = ctx?.saveDc
            ? evalStr(ctx.saveDc)
            : evalStr('$(attributes.spellcasting.save)');
          const cleanDc = rawDc.replace(/^DC\s*/i, '').replace(/^CD\s*/i, '').trim();
          if (cleanDc && !cleanDc.includes('$')) {
            actionCheckText = isEs ? ` (CD de escape ${cleanDc})` : ` (escape DC ${cleanDc})`;
          }
        }
        if (isEs) {
          const endMapEs = {
            take_damage: ' (termina si el objetivo recibe daño)',
            repeat_save_on_damage: ' (repite la salvación cada vez que recibe daño)',
            action_check: actionCheckText,
            turn_repeat_save: ' (repite la salvación al final de cada turno)',
            end_of_its_next_turn: ' hasta el final de su siguiente turno',
            end_of_your_next_turn: ' hasta el final de tu siguiente turno',
            end_of_next_turn: ' hasta el final del siguiente turno',
          };
          endText = endMapEs[payload.end] ?? ` (${evalStr(payload.end)})`;
        } else {
          const endMap = {
            take_damage: ' (ends if the target takes damage)',
            repeat_save_on_damage: ' (repeats save whenever it takes damage)',
            action_check: actionCheckText,
            turn_repeat_save: ' (repeats save at end of each turn)',
            end_of_its_next_turn: ' until the end of its next turn',
            end_of_your_next_turn: ' until the end of your next turn',
            end_of_next_turn: ' until the end of next turn',
          };
          endText = endMap[payload.end] ?? ` (${evalStr(payload.end)})`;
        }
      } else if (payload.end?.text) {
        endText = ` (${evalStr(payload.end.text)})`;
      }
    }
    return `${condBase}${endText}`;
  }

  // ── Roll modifier payload ───────────────────────────────────────────────────
  if (type === 'rollModifier') {
    if (payload.text) return evalStr(payload.text);
    const modType = payload.modifierType || 'advantage';
    const rawRolls = Array.isArray(payload.targetRolls)
      ? payload.targetRolls
      : [payload.targetRolls || 'roll'];
    const rollNames = isEs ? {
      attack: 'tirada de ataque',
      check: 'prueba de característica',
      abilityCheck: 'prueba de característica',
      save: 'tirada de salvación',
      savingThrow: 'tirada de salvación',
      dmg: 'tirada de daño',
      trigger: 'tirada desencadenante',
    } : {
      attack: 'attack roll',
      check: 'ability check',
      abilityCheck: 'ability check',
      save: 'saving throw',
      savingThrow: 'saving throw',
      dmg: 'damage roll',
      trigger: 'triggering roll',
    };
    const rollNamesPlural = isEs ? {
      attack: 'tiradas de ataque',
      check: 'pruebas de característica',
      abilityCheck: 'pruebas de característica',
      save: 'tiradas de salvación',
      savingThrow: 'tiradas de salvación',
      dmg: 'tiradas de daño',
      trigger: 'tiradas desencadenantes',
    } : {
      attack: 'attacks',
      check: 'ability checks',
      abilityCheck: 'ability checks',
      save: 'saving throws',
      savingThrow: 'saving throws',
      dmg: 'damage rolls',
      trigger: 'triggering rolls',
    };

    let endStr = '';
    if (payload.end) {
      if (typeof payload.end === 'string') {
        const endMap = isEs ? {
          end_of_your_next_turn: ' hasta el final de tu siguiente turno',
          end_of_its_next_turn: ' hasta el final de su siguiente turno',
        } : {
          end_of_your_next_turn: ' until the end of your next turn',
          end_of_its_next_turn: ' until the end of its next turn',
        };
        endStr = endMap[payload.end] ?? ` (${evalStr(payload.end)})`;
      } else if (payload.end?.text) {
        endStr = ` (${evalStr(payload.end.text)})`;
      }
    }

    if (modType === 'advantage') {
      if (payload.saveFilter?.ability) {
        const rawAbils = Array.isArray(payload.saveFilter.ability) ? payload.saveFilter.ability : [payload.saveFilter.ability];
        const abils = rawAbils.map(a => getAbilityName(evalStr(a), isEs ? 'es' : 'en'));
        let abilJoin = '';
        if (abils.length === 1) abilJoin = `${abils[0]}`;
        else if (abils.length === 2) abilJoin = `${abils[0]} ${isEs ? 'y' : 'and'} ${abils[1]}`;
        else abilJoin = `${abils.slice(0, -1).join(', ')}, ${isEs ? 'y' : 'and'} ${abils[abils.length - 1]}`;
        return isEs
          ? `tiene Ventaja en las tiradas de salvación de ${abilJoin}${endStr}`
          : `has Advantage on ${abilJoin} saving throws${endStr}`;
      }
      if (payload.saveFilter?.text) {
        return isEs
          ? `tiene Ventaja en las tiradas de salvación ${evalStr(payload.saveFilter.text)}${endStr}`
          : `has Advantage on saving throws ${evalStr(payload.saveFilter.text)}${endStr}`;
      }
      const rollsStr = rawRolls.map(r => rollNames[evalStr(r)] || evalStr(r)).join(isEs ? ' o ' : ' or ');
      return isEs
        ? `tiene Ventaja en su siguiente ${rollsStr}${endStr}`
        : `has Advantage on its next ${rollsStr}${endStr}`;
    }
    if (modType === 'disadvantage') {
      const rollsStr = rawRolls.map(r => rollNames[evalStr(r)] || evalStr(r)).join(isEs ? ' o ' : ' or ');
      return isEs
        ? `tiene Desventaja en su siguiente ${rollsStr}${endStr}`
        : `has Disadvantage on its next ${rollsStr}${endStr}`;
    }
    if (modType === 'reroll') {
      const rollsStr = rawRolls.map(r => rollNames[evalStr(r)] || evalStr(r)).join(isEs ? ' o ' : ' or ');
      return isEs
        ? `vuelve a tirar la ${rollsStr}${endStr}`
        : `rerolls the ${rollsStr}${endStr}`;
    }
    const isTargetSelf = ctx?.targetObj?.type === 'self' || (typeof ctx?.targetObj?.range === 'string' && /^(self|personal)$/i.test(ctx?.targetObj?.range));
    if (modType === 'attacksAgainstAdvantage') {
      const targetPronoun = isEs ? (isTargetSelf ? 'ti' : 'el objetivo') : (isTargetSelf ? 'you' : 'the target');
      return isEs
        ? `las tiradas de ataque contra ${targetPronoun} tienen Ventaja${endStr}`
        : `attack rolls against ${targetPronoun} have Advantage${endStr}`;
    }
    if (modType === 'attacksAgainstDisadvantage') {
      const targetPronoun = isEs ? (isTargetSelf ? 'ti' : 'el objetivo') : (isTargetSelf ? 'you' : 'the target');
      return isEs
        ? `las tiradas de ataque contra ${targetPronoun} tienen Desventaja${endStr}`
        : `attack rolls against ${targetPronoun} have Disadvantage${endStr}`;
    }

    const formulaStr = formatDiceObj(payload.dice || payload.formula, undefined, evalStr);
    if (modType === 'add') {
      if (isEs) {
        if (rawRolls.length > 1) {
          const rollsStr = rawRolls.map(r => rollNamesPlural[evalStr(r)] || evalStr(r)).join(' y ');
          return `añade ${formulaStr} a las ${rollsStr}${endStr}`;
        }
        const rollsStr = rawRolls.map(r => rollNames[evalStr(r)] || evalStr(r)).join(' o ');
        return `añade ${formulaStr} a su siguiente ${rollsStr}${endStr}`;
      }
      if (rawRolls.length > 1) {
        const rollsStr = rawRolls.map(r => rollNamesPlural[evalStr(r)] || evalStr(r)).join(' and ');
        return `adds ${formulaStr} to ${rollsStr}${endStr}`;
      }
      const rollsStr = rawRolls.map(r => rollNames[evalStr(r)] || evalStr(r)).join(' or ');
      return `adds ${formulaStr} to its next ${rollsStr}${endStr}`;
    }
    if (modType === 'subtract') {
      if (isEs) {
        if (rawRolls.length > 1) {
          const rollsStr = rawRolls.map(r => rollNamesPlural[evalStr(r)] || evalStr(r)).join(' y ');
          return `resta ${formulaStr} de las ${rollsStr}${endStr}`;
        }
        const rollsStr = rawRolls.map(r => rollNames[evalStr(r)] || evalStr(r)).join(' o ');
        return `resta ${formulaStr} de su siguiente ${rollsStr}${endStr}`;
      }
      if (rawRolls.length > 1) {
        const rollsStr = rawRolls.map(r => rollNamesPlural[evalStr(r)] || evalStr(r)).join(' and ');
        return `subtracts ${formulaStr} from ${rollsStr}${endStr}`;
      }
      const rollsStr = rawRolls.map(r => rollNames[evalStr(r)] || evalStr(r)).join(' or ');
      return `subtracts ${formulaStr} from its next ${rollsStr}${endStr}`;
    }
    return evalStr(payload.text || '');
  }

  // ── Movement payload ────────────────────────────────────────────────────────
  if (type === 'movement') {
    if (payload.text) return evalStr(payload.text);
    const dir = payload.direction || 'push';
    const rawDist = payload.distance ? evalStr(payload.distance) : '5';
    const distStr = isEs ? `${rawDist} pies` : `${rawDist} feet`;
    if (payload.movementType === 'forced') {
      if (isEs) {
        if (dir === 'push') return `empujado hasta ${distStr} de distancia`;
        if (dir === 'pull') return `atraído hasta ${distStr}`;
        return `movido hasta ${distStr}`;
      }
      if (dir === 'push') return `pushed up to ${distStr} away`;
      if (dir === 'pull') return `pulled up to ${distStr} closer`;
      return `moved up to ${distStr}`;
    }
    if (isEs) {
      const opportStr = payload.provokesOpportunityAttacks === false
        ? ' sin provocar ataques de oportunidad'
        : '';
      return `te mueves hasta ${distStr}${opportStr}`;
    }
    const opportStr = payload.provokesOpportunityAttacks === false
      ? ' without provoking Opportunity Attacks'
      : '';
    return `move up to ${distStr}${opportStr}`;
  }

  // ── Stat modifier payload ───────────────────────────────────────────────────
  if (type === 'statModifier') {
    const rawStat = (payload.stat || 'speed').toLowerCase();
    const rawVal = evalStr(payload.value);
    const numVal = Number(rawVal);
    const isNeg = !isNaN(numVal) && numVal < 0;
    const absVal = !isNaN(numVal) ? Math.abs(numVal) : rawVal;

    if (isEs) {
      const SPANISH_STAT_NAMES = {
        ac: 'CA',
        speed: 'Velocidad',
        initiative: 'Iniciativa',
        passiveperception: 'Percepción pasiva'
      };
      const statName = SPANISH_STAT_NAMES[rawStat] || capitalize(rawStat);
      const speedSuffix = rawStat === 'speed' ? ' pies' : '';

      if (rawStat === 'flyspeed') {
        const hoverStr = payload.hover ? ' (levitar)' : '';
        const suffix = payload.text ? ` ${evalStr(payload.text)}` : '';
        return `ganas una Velocidad de Vuelo de ${rawVal} pies${hoverStr}${suffix}`;
      }
      if (['swimspeed', 'climbspeed', 'burrowspeed'].includes(rawStat)) {
        const name = rawStat === 'swimspeed' ? 'Nadar' : (rawStat === 'climbspeed' ? 'Escalar' : 'Excavar');
        const suffix = payload.text ? ` ${evalStr(payload.text)}` : '';
        return `ganas una Velocidad de ${name} de ${rawVal} pies${suffix}`;
      }
      if (['darkvision', 'blindsight', 'truesight', 'tremorsense'].includes(rawStat)) {
        const SPANISH_SENSES = {
          darkvision: 'Visión en la oscuridad',
          blindsight: 'Vista ciega',
          truesight: 'Vista verdadera',
          tremorsense: 'Sentido del temblor'
        };
        const name = SPANISH_SENSES[rawStat] || capitalize(rawStat);
        const suffix = payload.text ? ` ${evalStr(payload.text)}` : '';
        return `ganas ${name} con un alcance de ${rawVal} pies${suffix}`;
      }

      if (payload.operation === 'set') {
        return `la ${statName} base pasa a ser ${rawVal}`;
      }
      if (payload.operation === 'subtract' || isNeg) {
        return `su ${statName} se reduce en ${absVal}${speedSuffix}`;
      }
      return `obtiene una bonificación de +${absVal} a su ${statName}${speedSuffix}`;
    }

    const statName = rawStat === 'ac' ? 'AC' : capitalize(rawStat);
    const speedSuffix = rawStat === 'speed' ? ' feet' : '';

    if (rawStat === 'flyspeed') {
      const hoverStr = payload.hover ? ' (hover)' : '';
      const suffix = payload.text ? ` ${evalStr(payload.text)}` : '';
      return `gain a Fly Speed of ${rawVal} feet${hoverStr}${suffix}`;
    }
    if (['swimspeed', 'climbspeed', 'burrowspeed'].includes(rawStat)) {
      const name = rawStat === 'swimspeed' ? 'Swim Speed' : (rawStat === 'climbspeed' ? 'Climb Speed' : 'Burrow Speed');
      const suffix = payload.text ? ` ${evalStr(payload.text)}` : '';
      return `gain a ${name} of ${rawVal} feet${suffix}`;
    }
    if (['darkvision', 'blindsight', 'truesight', 'tremorsense'].includes(rawStat)) {
      const name = capitalize(rawStat);
      const suffix = payload.text ? ` ${evalStr(payload.text)}` : '';
      return `gain ${name} with a range of ${rawVal} feet${suffix}`;
    }

    if (payload.operation === 'set') {
      return `base ${statName} becomes ${rawVal}`;
    }
    if (payload.operation === 'subtract' || isNeg) {
      return `has its ${statName} reduced by ${absVal}${speedSuffix}`;
    }
    return `gains a +${absVal} bonus to ${statName}${speedSuffix}`;
  }

  // ── Defense payload ──────────────────────────────────────────────────────────
  if (type === 'defense') {
    const defType = evalStr(payload.defense || 'resistance').toLowerCase();
    const label = isEs
      ? (defType === 'immunity' ? 'Inmunidad' : (defType === 'vulnerability' ? 'Vulnerabilidad' : 'Resistencia'))
      : (defType === 'immunity' ? 'Immunity' : (defType === 'vulnerability' ? 'Vulnerability' : 'Resistance'));
    const parts = [];

    if (payload.damageTypes) {
      const rawList = Array.isArray(payload.damageTypes) ? payload.damageTypes : [payload.damageTypes];
      const formatted = rawList.map(t => formatDamageType(t, evalStr, isEs ? 'es' : 'en')).filter(Boolean);
      let dmgStr = '';
      if (formatted.length === 1) dmgStr = formatted[0];
      else if (formatted.length === 2) dmgStr = `${formatted[0]} ${isEs ? 'y' : 'and'} ${formatted[1]}`;
      else dmgStr = `${formatted.slice(0, -1).join(', ')}, ${isEs ? 'y' : 'and'} ${formatted[formatted.length - 1]}`;
      if (dmgStr) parts.push(isEs ? `daño de ${dmgStr}` : `${dmgStr} damage`);
    }

    if (payload.conditions) {
      const rawConds = Array.isArray(payload.conditions) ? payload.conditions : [payload.conditions];
      const condStrs = rawConds.map(c => {
        const s = evalStr(c);
        return isEs ? (SPANISH_CONDITIONS[String(s).toLowerCase()] || s) : capitalize(s);
      });
      let condJoin = '';
      if (isEs) {
        if (condStrs.length === 1) condJoin = `la condición de ${condStrs[0]}`;
        else if (condStrs.length === 2) condJoin = `las condiciones de ${condStrs[0]} y ${condStrs[1]}`;
        else condJoin = `las condiciones de ${condStrs.slice(0, -1).join(', ')}, y ${condStrs[condStrs.length - 1]}`;
      } else {
        if (condStrs.length === 1) condJoin = `${condStrs[0]} condition`;
        else if (condStrs.length === 2) condJoin = `${condStrs[0]} and ${condStrs[1]} conditions`;
        else condJoin = `${condStrs.slice(0, -1).join(', ')}, and ${condStrs[condStrs.length - 1]} conditions`;
      }
      parts.push(isEs ? condJoin : `the ${condJoin}`);
    }

    let endStr = '';
    if (payload.end) {
      if (typeof payload.end === 'string') {
        const endMap = isEs ? {
          end_of_your_next_turn: ' hasta el final de tu siguiente turno',
          end_of_its_next_turn: ' hasta el final de su siguiente turno',
          start_of_your_next_turn: ' hasta el comienzo de tu siguiente turno',
        } : {
          end_of_your_next_turn: ' until the end of your next turn',
          end_of_its_next_turn: ' until the end of its next turn',
          start_of_your_next_turn: ' until the start of your next turn',
        };
        endStr = endMap[payload.end] ?? ` (${evalStr(payload.end)})`;
      } else if (payload.end.text) {
        endStr = ` (${evalStr(payload.end.text)})`;
      }
    }

    if (parts.length === 0) return payload.text ? evalStr(payload.text) : '';
    const joined = parts.join(isEs ? ' y ' : ' and ');
    return isEs ? `ganas ${label} a ${joined}${endStr}` : `gain ${label} to ${joined}${endStr}`;
  }

  // ── Damage reduction payload ─────────────────────────────────────────────────
  if (type === 'damageReduction') {
    let valStr = '';
    if (payload.dice) {
      valStr = formatDiceObj(payload.dice, undefined, evalStr);
    } else if (payload.flat) {
      valStr = evalStr(payload.flat);
    }

    let typeStr = '';
    if (payload.damageTypes) {
      const rawList = Array.isArray(payload.damageTypes) ? payload.damageTypes : [payload.damageTypes];
      const formatted = rawList.map(t => formatDamageType(t, evalStr, isEs ? 'es' : 'en')).filter(Boolean);
      let dt = '';
      if (formatted.length === 1) dt = formatted[0];
      else if (formatted.length === 2) dt = `${formatted[0]}${isEs ? ' o ' : ', or '}${formatted[1]}`;
      else dt = `${formatted.slice(0, -1).join(', ')}${isEs ? ', o ' : ', or '}${formatted[formatted.length - 1]}`;
      if (dt) typeStr = isEs ? ` por ${dt}` : `${dt} `;
    }

    if (payload.halve) {
      return isEs ? `el daño${typeStr} recibido se reduce a la mitad` : `${typeStr}damage taken is halved`;
    }
    if (valStr) {
      return isEs ? `reduce el daño${typeStr} recibido en ${valStr}` : `reduce ${typeStr}damage taken by ${valStr}`;
    }
    return payload.text ? evalStr(payload.text) : '';
  }

  // ── Teleport payload ─────────────────────────────────────────────────────────
  if (type === 'teleport') {
    if (payload.text && /^(you|the target|tú|el objetivo)\b/i.test(payload.text.trim())) {
      return evalStr(payload.text).trim();
    }
    const rawDist = String(evalStr(payload.distance || '30')).trim();
    const dist = isEs
      ? (/pies$/i.test(rawDist) ? rawDist : `${rawDist} pies`)
      : (/feet$/i.test(rawDist) ? rawDist : `${rawDist} feet`);
    const custom = payload.text
      ? ` ${evalStr(payload.text).trim()}`
      : (isEs ? ' a un espacio desocupado que puedas ver' : ' to an unoccupied space you can see');
    if (payload.target === 'target') {
      return isEs ? `el objetivo es teletransportado hasta ${dist}${custom}` : `the target is teleported up to ${dist}${custom}`;
    }
    return isEs ? `te teletransportas hasta ${dist}${custom}` : `teleport up to ${dist}${custom}`;
  }

  // ── Condition cleanse payload ────────────────────────────────────────────────
  if (type === 'conditionCleanse') {
    if (payload.conditions === 'all') {
      return isEs ? `terminar todas las condiciones sobre el objetivo` : `end all conditions on the target`;
    }
    const rawConds = Array.isArray(payload.conditions) ? payload.conditions : [payload.conditions];
    const condStrs = rawConds.map(c => {
      const s = evalStr(c);
      return isEs ? (SPANISH_CONDITIONS[String(s).toLowerCase()] || s) : capitalize(s);
    });
    let listStr = '';
    if (isEs) {
      if (condStrs.length === 1) listStr = `la condición de ${condStrs[0]}`;
      else if (condStrs.length === 2) listStr = `${condStrs[0]} o ${condStrs[1]}`;
      else listStr = `${condStrs.slice(0, -1).join(', ')}, o ${condStrs[condStrs.length - 1]}`;
    } else {
      if (condStrs.length === 1) listStr = `the ${condStrs[0]} condition`;
      else if (condStrs.length === 2) listStr = `${condStrs[0]} or ${condStrs[1]}`;
      else listStr = `${condStrs.slice(0, -1).join(', ')}, or ${condStrs[condStrs.length - 1]}`;
    }

    const count = payload.count ? evalStr(payload.count) : (isEs ? 'una' : 'one');
    const countStr = (count === '1' || count === 1) ? (isEs ? 'una' : 'one') : count;

    if (condStrs.length === 1) {
      return isEs ? `terminar ${listStr} sobre el objetivo` : `end ${listStr} on the target`;
    }
    return isEs ? `terminar ${countStr} condición sobre el objetivo: ${listStr}` : `end ${countStr} condition on the target: ${listStr}`;
  }

  // ── Action payload ──────────────────────────────────────────────────────────
  if (type === 'action') {
    if (payload.text) return evalStr(payload.text);
    if (payload.actionType === 'attack') return isEs ? 'realizas un ataque de arma adicional' : 'take an additional weapon attack';
    if (payload.actionType === 'general') return isEs ? 'realizas una acción adicional, excepto la acción de Magia' : 'take one additional action, except the Magic action';
    return isEs ? 'realizas una acción' : `take ${payload.actionType ? `a ${payload.actionType}` : 'an action'}`;
  }

  // ── Transform payload ───────────────────────────────────────────────────────
  if (type === 'transform') {
    const stats = Array.isArray(payload.statblock)
      ? payload.statblock.join(isEs ? ' o ' : ' or ')
      : payload.statblock;
    return isEs ? `te transformas en un ${stats}` : `transform into a ${stats}`;
  }

  // ── Summon payload ──────────────────────────────────────────────────────────
  if (type === 'summon') {
    const stats = Array.isArray(payload.statblock)
      ? payload.statblock.join(isEs ? ' o ' : ' or ')
      : payload.statblock;
    return isEs ? `invocas ${stats}` : `summon ${stats}`;
  }

  // ── Choice payload ──────────────────────────────────────────────────────────
  if (type === 'choice') {
    const preamble = payload.text
      ? evalStr(payload.text)
      : (isEs ? 'Elige una de las siguientes opciones:' : 'Choose one of the following:');
    const opts = Array.isArray(payload.options) ? payload.options : [];
    const optionLines = opts.map(opt => {
      const optName = opt.name ? `**${evalStr(opt.name)}**: ` : '';
      const optBody = opt.text
        ? evalStr(opt.text)
        : opt.payloads
          ? formatPayloadList(opt.payloads, evalStr, formatDiceObj)
          : '';
      return `> ${optName}${optBody}`;
    }).join('\n\n');
    return `${preamble}\n\n${optionLines}`;
  }

  return '';
}

/**
 * Merges and formats a PayloadList (single payload or array of payloads) into
 * a single natural-language clause with correct grammar and payload ordering.
 *
 * Sentence structure:
 *   <damage> + "the target is <conditions & movements>" + <other payloads> + <action>
 *
 * "The target is" prefix is always applied when conditions or forced movement exist.
 */
export function formatPayloadList(payloadList, evalStr, formatDiceObj, ctx = {}) {
  if (!payloadList) return '';
  const isEs = getLocale() === 'es';
  const rawList = Array.isArray(payloadList) ? payloadList : [payloadList];

  const sortedList = [...rawList].sort((a, b) => getPayloadRank(a) - getPayloadRank(b));

  const isSave = ctx?.pattern === 'save';
  const targetObj = ctx?.targetObj;
  const isTargetSelf = targetObj?.type === 'self' || (typeof targetObj?.range === 'string' && /^(self|personal)$/i.test(targetObj?.range));
  const isMultiSave = isSave && targetObj && (
    targetObj.aoe || targetObj.type === 'multiple' || targetObj.type === 'multi' ||
    (targetObj.count && parseInt(evalStr(targetObj.count), 10) > 1)
  );
  const targetSubject = isEs
    ? (isTargetSelf ? 'tú' : (isMultiSave ? 'cada objetivo' : 'el objetivo'))
    : (isTargetSelf ? 'you' : (isMultiSave ? 'each target' : 'the target'));
  const targetSubjectCap = isEs
    ? (isTargetSelf ? 'Tú' : (isMultiSave ? 'Cada objetivo' : 'El objetivo'))
    : (isTargetSelf ? 'You' : (isMultiSave ? 'Each target' : 'The target'));

  // Merge contiguous forced-movement entries of the same direction to avoid
  // "pushed 5 feet away and pushed 5 feet away" when two payloads contribute.
  const mergedList = [];
  let totalPushDist = 0;
  let totalPullDist = 0;

  for (const p of sortedList) {
    if (!p) continue;
    const ptype = getPayloadType(p);
    if (ptype === 'movement' && p.movementType === 'forced') {
      const dir = p.direction || 'push';
      const rawDistStr = p.distance ? evalStr(p.distance) : '5';
      if (/\d+d\d+/i.test(rawDistStr)) {
        mergedList.push(p);
      } else {
        const distNum = parseInt(rawDistStr, 10);
        const distVal = !isNaN(distNum) ? distNum : 5;
        if (dir === 'push') totalPushDist += distVal;
        else if (dir === 'pull') totalPullDist += distVal;
        else mergedList.push(p);
      }
    } else {
      mergedList.push(p);
    }
  }
  if (totalPushDist > 0) {
    mergedList.push({ type: 'movement', movementType: 'forced', direction: 'push', distance: `${totalPushDist}` });
  }
  if (totalPullDist > 0) {
    mergedList.push({ type: 'movement', movementType: 'forced', direction: 'pull', distance: `${totalPullDist}` });
  }

  // Categorise payloads for sentence building
  let damageStr = '';
  const targetPredicates = [];
  const otherParts = [];
  let actionStr = '';

  for (const p of mergedList) {
    if (!p) continue;
    if (typeof p === 'string') {
      otherParts.push(evalStr(p));
      continue;
    }

    const ptype = getPayloadType(p);

    if (ptype === 'damage') {
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        const joinWord = isEs ? ' más ' : ' plus ';
        damageStr = damageStr ? `${damageStr}${joinWord}${fmtd}` : fmtd;
      }

    } else if (ptype === 'movement') {
      if (p.movementType === 'forced') {
        const dir = p.direction || 'push';
        const rawDist = p.distance ? evalStr(p.distance) : '5';
        const dist = isEs ? `${rawDist} pies` : `${rawDist} feet`;
        if (isEs) {
          if (dir === 'push') targetPredicates.push(isTargetSelf ? `eres empujado hasta ${dist} de distancia` : (isMultiSave ? `son empujados hasta ${dist} de distancia` : `es empujado hasta ${dist} de distancia`));
          else if (dir === 'pull') targetPredicates.push(isTargetSelf ? `eres atraído hasta ${dist}` : (isMultiSave ? `son atraídos hasta ${dist}` : `es atraído hasta ${dist}`));
          else targetPredicates.push(isTargetSelf ? `eres movido hasta ${dist}` : (isMultiSave ? `son movidos hasta ${dist}` : `es movido hasta ${dist}`));
        } else {
          if (dir === 'push') targetPredicates.push(isTargetSelf ? `are pushed up to ${dist} away` : `is pushed up to ${dist} away`);
          else if (dir === 'pull') targetPredicates.push(isTargetSelf ? `are pulled up to ${dist} closer` : `is pulled up to ${dist} closer`);
          else targetPredicates.push(isTargetSelf ? `are moved up to ${dist}` : `is moved up to ${dist}`);
        }
      } else {
        const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
        if (fmtd) otherParts.push(fmtd);
      }

    } else if (ptype === 'condition') {
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        if (isEs) {
          if (fmtd.toLowerCase() === 'derribado' || fmtd.toLowerCase().includes('derribado')) {
            targetPredicates.push(isTargetSelf ? 'quedas derribado' : (isMultiSave ? 'quedan derribados' : 'queda derribado'));
          } else {
            targetPredicates.push(isTargetSelf ? `sufres ${fmtd}` : (isMultiSave ? `sufren ${fmtd}` : `sufre ${fmtd}`));
          }
        } else {
          if (/^the /.test(fmtd)) {
            targetPredicates.push(isTargetSelf ? `have ${fmtd}` : `has ${fmtd}`);
          } else {
            targetPredicates.push(isTargetSelf ? `are ${fmtd}` : `is ${fmtd}`);
          }
        }
      }

    } else if (ptype === 'statModifier') {
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        if (isEs) {
          targetPredicates.push(fmtd);
        } else {
          if (/^(has|gains|base|have|gain)\b/i.test(fmtd)) {
            if (isTargetSelf) {
              targetPredicates.push(fmtd.replace(/^has\b/i, 'have').replace(/^gains\b/i, 'gain'));
            } else {
              targetPredicates.push(fmtd.replace(/^have\b/i, 'has').replace(/^gain\b/i, 'gains'));
            }
          } else {
            targetPredicates.push(isTargetSelf ? `have ${fmtd}` : `has ${fmtd}`);
          }
        }
      }

    } else if (ptype === 'rollModifier') {
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        if (isEs) {
          if (/^(tiene|añade|resta|vuelve)\b/i.test(fmtd)) {
            targetPredicates.push(fmtd);
          } else {
            otherParts.push(fmtd);
          }
        } else {
          if (/^(has|adds|subtracts|rerolls|have|add|subtract|reroll)\b/i.test(fmtd)) {
            if (isTargetSelf) {
              const selfFmtd = fmtd.replace(/^has\b/i, 'have').replace(/^adds\b/i, 'add').replace(/^subtracts\b/i, 'subtract').replace(/^rerolls\b/i, 'reroll');
              targetPredicates.push(selfFmtd);
            } else {
              targetPredicates.push(fmtd);
            }
          } else {
            otherParts.push(fmtd);
          }
        }
      }

    } else if (ptype === 'action') {
      actionStr = formatPayload(p, evalStr, formatDiceObj, ctx);

    } else if (ptype === 'defense') {
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        if (isEs) {
          targetPredicates.push(fmtd);
        } else {
          if (isTargetSelf) {
            targetPredicates.push(fmtd.replace(/^gain\b/i, 'gain'));
          } else {
            targetPredicates.push(fmtd.replace(/^gain\b/i, 'has'));
          }
        }
      }

    } else if (ptype === 'damageReduction') {
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        if (isEs) {
          otherParts.push(fmtd);
        } else {
          if (/^damage taken/i.test(fmtd)) {
            otherParts.push(fmtd);
          } else if (isTargetSelf) {
            targetPredicates.push(fmtd);
          } else {
            targetPredicates.push(fmtd.replace(/^reduce\b/i, 'reduces'));
          }
        }
      }

    } else if (ptype === 'teleport') {
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        if (isEs) {
          otherParts.push(fmtd);
        } else {
          if (/^the target is\b/i.test(fmtd)) {
            targetPredicates.push(isTargetSelf ? fmtd.replace(/^the target is\b/i, 'are') : fmtd.replace(/^the target is\b/i, 'is'));
          } else {
            otherParts.push(fmtd);
          }
        }
      }

    } else if (ptype === 'conditionCleanse') {
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) otherParts.push(fmtd);

    } else {
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) otherParts.push(fmtd);
    }
  }

  const clauseParts = [];

  if (damageStr) clauseParts.push(damageStr);

  if (targetPredicates.length > 0) {
    let joinedPredicates = '';
    const andWord = isEs ? ' y ' : ' and ';
    if (targetPredicates.length === 1) {
      joinedPredicates = targetPredicates[0];
    } else if (targetPredicates.length === 2) {
      joinedPredicates = `${targetPredicates[0]}${andWord}${targetPredicates[1]}`;
    } else {
      joinedPredicates = `${targetPredicates.slice(0, -1).join(', ')},${andWord}${targetPredicates[targetPredicates.length - 1]}`;
    }

    if (isEs) {
      if (isTargetSelf) {
        clauseParts.push(damageStr ? joinedPredicates : capitalize(joinedPredicates));
      } else {
        if (damageStr) {
          clauseParts.push(`${targetSubject} ${joinedPredicates}`);
        } else {
          clauseParts.push(`${targetSubjectCap} ${joinedPredicates}`);
        }
      }
    } else {
      if (damageStr) {
        clauseParts.push(`${targetSubject} ${joinedPredicates}`);
      } else {
        clauseParts.push(`${targetSubjectCap} ${joinedPredicates}`);
      }
    }
  }

  for (const part of otherParts) {
    if (!part) continue;
    let cleanedPart = part;
    if (targetPredicates.length > 0) {
      cleanedPart = isEs
        ? cleanedPart.replace(/^(el\s+)?objetivo\s+/i, '')
        : cleanedPart.replace(/^(the\s+)?target\s+/i, '');
    } else if (damageStr || clauseParts.length > 0) {
      if (isEs) {
        if (/^(el\s+)?objetivo\s+/i.test(cleanedPart)) {
          cleanedPart = cleanedPart.replace(/^(el\s+)?objetivo\s+/i, `${targetSubject} `);
        }
      } else {
        if (/^(the\s+)?target\s+/i.test(cleanedPart)) {
          cleanedPart = cleanedPart.replace(/^(the\s+)?target\s+/i, `${targetSubject} `);
        }
      }
    } else {
      if (isEs) {
        if (/^el\s+objetivo\s+/i.test(cleanedPart)) {
          cleanedPart = cleanedPart.replace(/^el\s+objetivo\s+/i, `${targetSubjectCap} `);
        }
      } else {
        if (/^the\s+target\s+/i.test(cleanedPart)) {
          cleanedPart = cleanedPart.replace(/^the\s+target\s+/i, `${targetSubjectCap} `);
        }
      }
    }
    clauseParts.push(cleanedPart);
  }

  if (actionStr) clauseParts.push(actionStr);

  if (clauseParts.length === 0) return '';
  if (clauseParts.length === 1) return clauseParts[0];

  let result = clauseParts[0];
  for (let i = 1; i < clauseParts.length; i++) {
    const part = clauseParts[i];
    result = result.replace(/\.$/, '');
    if (part.includes('\n\n') || part.startsWith('choose ') || part.startsWith('Elige ')) {
      result = `${result}, ${part}`;
    } else if (i === clauseParts.length - 1) {
      if (isEs) {
        if (/^y\s+/i.test(part)) {
          result = `${result}, ${part}`;
        } else {
          result = `${result}, y ${part}`;
        }
      } else {
        if (/^and\s+/i.test(part)) {
          result = `${result}, ${part}`;
        } else {
          result = `${result}, and ${part}`;
        }
      }
    } else {
      result = `${result}, ${part}`;
    }
  }

  if (isEs) {
    result = result
      .replace(/\bel\s+objetivo\s+(el\s+objetivo|los\s+objetivos)\b/gi, 'el objetivo')
      .replace(/\bcada\s+objetivo\s+(el\s+objetivo|cada\s+objetivo)\b/gi, 'cada objetivo')
      .replace(/\bel\s+el\s+objetivo\b/gi, 'el objetivo');
  } else {
    result = result
      .replace(/\bthe\s+target\s+(the\s+target|the\s+targets)\b/gi, 'the target')
      .replace(/\beach\s+target\s+(the\s+target|each\s+target)\b/gi, 'each target')
      .replace(/\bthe\s+the\s+target\b/gi, 'the target')
      .replace(/\ba\s+new\s+the\s+target\b/gi, 'a new target');
  }

  return result;
}

// ─── Subject and text classification helpers ──────────────────────────────────

/**
 * Builds the target noun phrase used as the sentence subject for automatic and
 * healing blocks. Returns a full noun phrase like:
 *   "You" / "One creature you touch" / "Up to 10 creatures within 30 feet"
 */
function buildSubjectNounPhrase(targetObj, activityRange, evalStr, lang = null) {
  const effectiveLang = lang || getLocale() || 'en';
  const isEs = effectiveLang === 'es';
  if (!targetObj) return isEs ? 'Tú' : 'You';

  const type = (evalStr(targetObj.type || '') || '').toLowerCase();
  const cleanRange = evalStr(targetObj.range || activityRange || '').trim()
    .replace(/^(range|reach|alcance)\s*/i, '');
  const filter = targetObj.filter
    ? formatFilterText(targetObj.filter, evalStr, false, effectiveLang)
    : (isEs ? 'criatura' : 'creature');
  const filterPlural = targetObj.filter
    ? formatFilterText(targetObj.filter, evalStr, true, effectiveLang)
    : (isEs ? 'criaturas' : 'creatures');

  if (targetObj.inherit === 'trigger') return isEs ? 'El objetivo' : 'The target';
  if (targetObj.inherit === 'prev_step') return '';

  const lowerRange = cleanRange.toLowerCase();

  if (type === 'self' || lowerRange === 'self' || lowerRange === 'personal') return isEs ? 'Tú' : 'You';

  if (type === 'touch' || lowerRange === 'touch' || lowerRange === 'contacto') {
    return isEs ? `Una ${filter} que toques` : `One ${filter} you touch`;
  }

  const countRaw = targetObj.count !== undefined ? evalStr(targetObj.count) : '';
  const countNum = parseInt(countRaw, 10);
  const isMultiple = type === 'multiple' || type === 'multi'
    || (!isNaN(countNum) && countNum > 1);

  if (isMultiple) {
    const rangePart = cleanRange && !/^(self|personal)$/i.test(cleanRange)
      ? (isEs ? ` a ${cleanRange} o menos` : ` within ${cleanRange}`)
      : '';
    if (!countRaw || isNaN(countNum)) {
      return isEs
        ? `${capitalize(filterPlural)} de tu elección${rangePart}`
        : `${capitalize(filterPlural)} of your choice${rangePart}`;
    }
    const noun = countNum === 1 ? filter : filterPlural;
    return isEs
      ? `Hasta ${countRaw} ${noun}${rangePart}`
      : `Up to ${countRaw} ${noun}${rangePart}`;
  }

  // single
  if (cleanRange && !/^(self|personal)$/i.test(cleanRange)) {
    return isEs
      ? `Una ${filter} a ${cleanRange} o menos`
      : `One ${filter} within ${cleanRange}`;
  }

  return isEs ? `Una ${filter}` : `One ${filter}`;
}

/**
 * Determines whether a subject noun phrase represents plural entities.
 */
function isPluralSubject(subject) {
  if (!subject || typeof subject !== 'string') return false;
  const s = subject.trim();
  if (/^up to 1\b/i.test(s) || /^hasta 1\b/i.test(s)) return false;
  if (/^up to \d+/i.test(s) || /^hasta \d+/i.test(s)) return true;
  if (/^(creatures|targets|allies|enemies|undead|beasts|humanoids|criaturas|objetivos|aliados|enemigos|muertos vivientes|bestias|humanoides)\b/i.test(s)) return true;
  if (/\b(of your choice|de tu elección)\b/i.test(s) && !/^(one|una|un)\b/i.test(s)) return true;
  return false;
}

/**
 * Checks if a body text fragment represents a structured damage expression
 * (e.g. "4d8 Force damage", "1d6+1 Necrotic damage", "8d6 de daño por Fuego").
 */
function isDamageBody(str) {
  if (!str) return false;
  const s = str.trim().toLowerCase();
  return /^(\d+d[a-z0-9$()._+-]+|\$\([^)]+\)|\d+)\s+([a-z/,\s]+)?damage\b/i.test(s)
    || /^[a-z/]+\s+damage\b/i.test(s)
    || /^(\d+d[a-z0-9$()._+-]+|\$\([^)]+\)|\d+)\s+de daño\b/i.test(s)
    || /^daño\b/i.test(s);
}

/**
 * Classifies a raw body string to determine how to wrap it in a sentence.
 *
 * Returns one of:
 *   'STRUCTURED'  — the body came entirely from typed payloads; caller wraps freely
 *   'INFINITIVE'  — body starts with a bare infinitive verb (gain, add, take, ...)
 *   'HAS_SUBJECT' — body already contains a subject ("the target", "you", "allies")
 *   'NARRATIVE'   — body is a full narrative clause (when, while, if, at, the area...)
 *
 * @param {string}  body        — the composed body string (post-payload formatting)
 * @param {boolean} fromPayloads — true if body came entirely from typed payloads
 */
function classifyBodyText(body, fromPayloads) {
  if (!body) return 'STRUCTURED';

  const lower = body.trim().toLowerCase();

  // Already-subject forms:
  if (
    lower.startsWith('you ') || lower.startsWith('you\'') ||
    lower.startsWith('the target') ||
    lower.startsWith('target ') ||
    lower.startsWith('target\'s ') ||
    lower.startsWith('the attacker') ||
    lower.startsWith('allies ') ||
    lower.startsWith('targets ') ||
    lower.startsWith('drinker ') ||
    lower.startsWith('gains ') ||
    lower.startsWith('its ') ||
    lower.startsWith('attack rolls ')
  ) return 'HAS_SUBJECT';

  // Narrative clauses — emit verbatim
  const narrativeStarters = [
    'when ', 'while ', 'if ', 'once ', 'at the', 'on each', 'on a ',
    'a flickering', 'a creature', 'any creature', 'any attack',
    'creates an area', 'fire jumps', 'for the duration',
    'against an effect', 'also command', 'command your',
    '60-foot sphere', 'until ', 'whenever ', 'attack rolls ',
  ];
  if (narrativeStarters.some(s => lower.startsWith(s))) return 'NARRATIVE';

  // Bare infinitive verbs — we add subject and conjugate
  const infinitiveStarters = [
    'gain ', 'add ', 'take ', 'reduce ', 'increase ', 'move ', 'roll ',
    'reroll ', 'get ', 'learn ', 'cast ', 'teleport ', 'create ', 'detect ',
    'end ', 'ends ', 'double ', 'halve ', 'change ', 'choose ', 'give ',
    'grant ', 'make ', 'cause ', 'drop ', 'either ', 'deal ', 'regain ',
    'swap ', 'spend ', 'use ', 'ignore ', 'suppress ', 'activate ',
  ];
  if (infinitiveStarters.some(s => lower.startsWith(s))) return 'INFINITIVE';

  if (fromPayloads) return 'STRUCTURED';

  // Default: treat as narrative
  return 'NARRATIVE';
}

/**
 * Conjugates the leading infinitive verb in a body string to third-person singular.
 * Used when the subject is singular third-person ("One creature you touch").
 */
function conjugateToThirdPerson(body) {
  return body.replace(
    /^(gain|add|take|roll|reroll|lose|move|make|use|deal|halve|push|pull|reduce|increase|swap|spend|regain|get|learn|cast|teleport|create|detect|end|double|change|give|grant|cause|drop|ignore|suppress|activate|have|become)\b/i,
    match => {
      const m = match.toLowerCase();
      // Irregular
      if (m === 'have') return 'has';
      if (m === 'do') return 'does';
      if (m === 'go') return 'goes';
      // Regular: verbs ending in -ch, -sh, -ss, -x, -zz
      if (m.endsWith('ch') || m.endsWith('sh') || m.endsWith('ss') || m.endsWith('x') || m.endsWith('zz')) {
        return `${m}es`;
      }
      return `${m}s`;
    }
  );
}


// ─── Block formatter ──────────────────────────────────────────────────────────

/**
 * Formats a single mechanic block (attack / save / healing / automatic / aura)
 * into a complete Markdown string ready to be embedded in the activity line.
 */
export function formatBlock(block, activity, evaluator, scope, blockIndex = 0) {
  if (!block) return '';

  const effectiveScope = {
    range: activity?.range || '',
    duration: activity?.duration || '',
    summary: activity?.summary || '',
    description: activity?.description || '',
    ...(activity?.variables || {}),
    ...(scope || {}),
  };

  // Expression evaluator — resolves $(…) tokens and simple string aliases
  const evalStr = (val) => {
    if (val === null || val === undefined) return '';
    let strVal = String(val);
    if (strVal === '$(range)' || strVal === 'range') return String(activity?.range || '');
    if (strVal.includes('$(range)')) strVal = strVal.replace(/\$\(range\)/g, String(activity?.range || ''));
    if (strVal === '$(summary)' || strVal === 'summary') return String(activity?.summary || activity?.description || '');
    if (strVal.includes('$(summary)')) strVal = strVal.replace(/\$\(summary\)/g, String(activity?.summary || activity?.description || ''));
    if (strVal === '$(description)' || strVal === 'description') return String(activity?.description || activity?.summary || '').trim();
    if (strVal.includes('$(description)')) strVal = strVal.replace(/\$\(description\)/g, String(activity?.description || activity?.summary || '').trim());
    if (strVal.includes('$')) {
      const res = evaluator ? evaluator.evaluate(strVal, effectiveScope) : strVal;
      return res !== null && res !== undefined ? String(res) : strVal;
    }
    return strVal;
  };

  const formatRange = (range, evalFn) => formatDistance(evalFn(range), lang);

  /** Formats a dice object, string, or number into a display string like "2d8+3" */
  const formatDiceObj = (diceVal, payloadMin, evalFn) => {
    const fn = evalFn || evalStr;
    if (!diceVal) return '';
    if (typeof diceVal === 'number' || typeof diceVal === 'string') {
      return String(fn(diceVal));
    }
    if (typeof diceVal === 'object') {
      const cnt = diceVal.count !== undefined ? fn(diceVal.count) : '';
      const sds = diceVal.sides !== undefined ? fn(diceVal.sides) : '';
      const rawBns = (diceVal.bonus !== undefined && diceVal.bonus !== null)
        ? evaluator.evaluate(diceVal.bonus, effectiveScope)
        : 0;
      const numBns = typeof rawBns === 'number' ? rawBns : Number(rawBns);
      const bnsStr = !isNaN(numBns)
        ? (numBns !== 0 ? formatBonus(numBns) : '')
        : (diceVal.bonus ? fn(diceVal.bonus) : '');

      let minSuffix = '';
      const minPerDie = diceVal.min !== undefined ? evaluator.evaluate(diceVal.min, effectiveScope) : null;
      const totalMinOverride = payloadMin !== undefined ? evaluator.evaluate(payloadMin, effectiveScope) : null;
      if (minPerDie !== null && minPerDie !== undefined && minPerDie !== '') {
        const numCnt = Number(cnt) || 1;
        const totalCrunchedMin = (numCnt * (Number(minPerDie) || 0)) + (numBns || 0);
        minSuffix = ` (min: ${totalCrunchedMin})`;
      } else if (totalMinOverride !== null && totalMinOverride !== undefined && totalMinOverride !== '') {
        minSuffix = ` (min: ${totalMinOverride})`;
      }

      if (cnt && sds && String(cnt) !== '0' && String(sds) !== '0') {
        return `${cnt}d${sds}${bnsStr}${minSuffix}`;
      }
      if (cnt && String(cnt) !== '0') return `${cnt}${bnsStr}${minSuffix}`;
      if (bnsStr) return `${bnsStr.replace(/^\+/, '')}${minSuffix}`;
    }
    return '';
  };

  const pattern = block.pattern;
  const lang = getLocale();
  const isEs = lang === 'es';
  const rawRange = evalStr(block.target?.range || activity?.range || '').trim();
  const formattedRange = formatRange(rawRange, evalStr);
  const text = block.text ? evalStr(block.text).trim() : '';
  const triggerStr = formatTrigger(block.trigger, evalStr, lang);
  let mainBody = '';

  // ── 1. ATTACK ──────────────────────────────────────────────────────────────
  if (pattern === 'attack' && block.attack) {
    const classif = capitalize(evalStr(block.attack.classification || 'melee'));
    const rawBonus = evaluator.evaluate(block.attack.bonus || '$(attributes.spellcasting.attack)', effectiveScope);
    const numBonus = typeof rawBonus === 'number' ? rawBonus : Number(rawBonus);
    const bonusStr = !isNaN(numBonus)
      ? formatBonus(numBonus)
      : evalStr(block.attack.bonus || '$(attributes.spellcasting.attack)');

    const targetDesc = formatTargetText(block.target, formattedRange, evalStr, true, activity, lang);

    const rangeOutput = formattedRange.startsWith('reach') || formattedRange.startsWith('range') || formattedRange.startsWith('alcance')
      ? formattedRange
      : (isEs ? `alcance ${formattedRange}` : `range ${formattedRange}`);

    let hitText = '';
    if (block.hit) {
      const hitCtx = { pattern: 'attack', role: 'hit', targetObj: block.target };
      let formattedHit = formatPayloadList(block.hit, evalStr, formatDiceObj, hitCtx);
      if (block.hitOrMiss) {
        const formattedHitOrMiss = formatPayloadList(block.hitOrMiss, evalStr, formatDiceObj, { pattern: 'attack', role: 'hitOrMiss', targetObj: block.target });
        if (formattedHitOrMiss) formattedHit = isEs ? `${formattedHit}, y ${formattedHitOrMiss}` : `${formattedHit}, and ${formattedHitOrMiss}`;
      }
      if (formattedHit) hitText = isEs ? ` _Impacto:_ ${formattedHit}.` : ` _Hit:_ ${formattedHit}.`;
    }

    let missText = '';
    if (block.miss) {
      const isStructuredOutcome = typeof block.miss === 'object'
        && !Array.isArray(block.miss)
        && ('halfDamage' in block.miss || 'payloads' in block.miss
          || ('text' in block.miss && !('type' in block.miss)));

      if (isStructuredOutcome) {
        const parts = [];
        if (block.miss.halfDamage) parts.push(isEs ? 'mitad de daño' : 'half damage');
        if (block.miss.payloads) {
          const pStr = formatPayloadList(block.miss.payloads, evalStr, formatDiceObj, { pattern: 'attack', role: 'miss', targetObj: block.target });
          if (pStr) parts.push(pStr);
        }
        if (block.miss.text) parts.push(evalStr(block.miss.text));
        if (parts.length > 0) {
          missText = isEs ? ` _Fallo:_ ${capitalize(parts.join(', '))}.` : ` _Miss:_ ${capitalize(parts.join(', '))}.`;
        }
      } else {
        const formattedMiss = formatPayloadList(block.miss, evalStr, formatDiceObj, { pattern: 'attack', role: 'miss', targetObj: block.target });
        if (formattedMiss) missText = isEs ? ` _Fallo:_ ${capitalize(formattedMiss)}.` : ` _Miss:_ ${capitalize(formattedMiss)}.`;
      }
    }

    let critText = '';
    if (block.crit) {
      const formattedCrit = formatPayloadList(block.crit, evalStr, formatDiceObj, { pattern: 'attack', role: 'crit', targetObj: block.target });
      if (formattedCrit) critText = isEs ? ` _Impacto Crítico:_ ${capitalize(formattedCrit)}.` : ` _Critical Hit:_ ${capitalize(formattedCrit)}.`;
    }

    const classifLabel = isEs
      ? (classif.toLowerCase() === 'melee' ? 'cuerpo a cuerpo' : (classif.toLowerCase() === 'ranged' ? 'a distancia' : classif.toLowerCase()))
      : classif;

    const attackTitle = isEs ? `_Tirada de Ataque (${classifLabel}):_` : `_${classif} Attack Roll:_`;
    const toHitSuffix = isEs ? ' para impactar' : '';
    mainBody = `${attackTitle} ${bonusStr}${toHitSuffix}, ${rangeOutput.replace(/\.+$/, '')}${targetDesc}.${hitText}${missText}${critText}${text ? ` ${text}` : ''}`;
  }

  // ── 2. SAVE ────────────────────────────────────────────────────────────────
  else if (pattern === 'save' && block.save) {
    const abilityKey = (evalStr(block.save.ability) || 'dex').toLowerCase();
    const fullAbility = getAbilityName(abilityKey, lang);
    const dcVal = evalStr(block.save.dc || '$(attributes.spellcasting.save)');
    const targetDesc = formatTargetText(block.target, formattedRange, evalStr, false, activity, lang);

    const saveCtx = { pattern: 'save', targetObj: block.target, saveDc: dcVal };

    let alwaysText = '';
    if (block.failureOrSuccess) {
      const fmtd = formatPayloadList(block.failureOrSuccess, evalStr, formatDiceObj, { ...saveCtx, role: 'failureOrSuccess' });
      if (fmtd) alwaysText = isEs ? ` _Fallo o Éxito:_ ${fmtd}.` : ` _Failure or Success:_ ${fmtd}.`;
    }

    let failText = '';
    if (block.failure) {
      const fmtd = formatPayloadList(block.failure, evalStr, formatDiceObj, { ...saveCtx, role: 'failure' });
      if (fmtd) failText = isEs ? ` _Fallo:_ ${capitalize(fmtd)}.` : ` _Failure:_ ${capitalize(fmtd)}.`;
    }

    let successText = '';
    if (block.success) {
      const isStructuredOutcome = typeof block.success === 'object'
        && !Array.isArray(block.success)
        && ('halfDamage' in block.success || 'payloads' in block.success
          || ('text' in block.success && !('type' in block.success)));

      if (isStructuredOutcome) {
        const parts = [];
        if (block.success.halfDamage) parts.push(isEs ? 'mitad de daño' : 'half damage');
        if (block.success.payloads) {
          const pStr = formatPayloadList(block.success.payloads, evalStr, formatDiceObj, { ...saveCtx, role: 'success' });
          if (pStr) parts.push(pStr);
        }
        if (block.success.text) parts.push(evalStr(block.success.text));
        if (parts.length > 0) {
          successText = isEs ? ` _Éxito:_ ${capitalize(parts.join(', '))}.` : ` _Success:_ ${capitalize(parts.join(', '))}.`;
        }
      } else {
        const fmtd = formatPayloadList(block.success, evalStr, formatDiceObj, { ...saveCtx, role: 'success' });
        if (fmtd) successText = isEs ? ` _Éxito:_ ${capitalize(fmtd)}.` : ` _Success:_ ${capitalize(fmtd)}.`;
      }
    }

    const saveTitle = isEs ? `_Tirada de Salvación de ${fullAbility}:_ CD ${dcVal}` : `_${fullAbility} Saving Throw:_ DC ${dcVal}`;
    mainBody = `${saveTitle}${targetDesc}.${alwaysText}${failText}${successText}${text ? ` ${text}` : ''}`.replace(/\.\./g, '.');
  }

  // ── 3. HEALING ─────────────────────────────────────────────────────────────
  else if (pattern === 'healing' && block.healing) {
    const subject = buildSubjectNounPhrase(block.target, activity?.range, evalStr, lang);
    const diceStr = formatDiceObj(block.healing.dice, undefined, evalStr);
    const isTempHP = block.healing.type === 'tempHitPoints';
    const typeLabel = isEs
      ? (isTempHP ? 'Puntos de Golpe Temporales' : 'Puntos de Golpe')
      : (isTempHP ? 'Temporary Hit Points' : 'Hit Points');
    const isPlural = isPluralSubject(subject);
    const isSelf = subject === 'You' || subject === 'Tú';

    let payloadPart = '';
    if (block.payloads) {
      const pArr = Array.isArray(block.payloads) ? block.payloads : [block.payloads];
      const pTexts = pArr.map(p => {
        let t = formatPayload(p, evalStr, formatDiceObj, { pattern: 'healing', targetObj: block.target });
        if (p.type === 'conditionCleanse') {
          t = isEs ? `puedes ${t}` : `you can ${t}`;
        }
        return t;
      }).filter(Boolean);
      if (pTexts.length > 0) {
        payloadPart = isEs ? `, y ${pTexts.join(', y ')}` : `, and ${pTexts.join(', and ')}`;
      }
    }

    if (isEs) {
      if (isSelf) {
        const verb = isTempHP ? 'ganas' : 'recuperas';
        let healStr = diceStr ? `${diceStr} ${typeLabel}` : typeLabel;
        if (block.healing.pool) healStr += ', divididos entre los objetivos';
        mainBody = `${capitalize(verb)} ${healStr}${payloadPart}.`;
      } else {
        const esSubject = (subject === 'The target' || subject === 'The Target') ? 'El objetivo' : subject;
        const verb = isPlural
          ? (isTempHP ? 'ganan' : 'recuperan')
          : (isTempHP ? 'gana' : 'recupera');
        let healStr = diceStr ? `${diceStr} ${typeLabel}` : typeLabel;
        if (block.healing.pool) healStr += ', divididos entre los objetivos';
        mainBody = `${esSubject} ${verb} ${healStr}${payloadPart}.`;
      }
    } else {
      const verb = isSelf
        ? (isTempHP ? 'gain' : 'regain')
        : (isPlural ? (isTempHP ? 'gain' : 'regain') : (isTempHP ? 'gains' : 'regains'));

      let healStr = diceStr ? `${diceStr} ${typeLabel}` : typeLabel;
      if (block.healing.pool) healStr += ', divided among the targets';

      mainBody = `${subject} ${verb} ${healStr}${payloadPart}.`;
    }

    if (text) mainBody += ` ${capitalize(text.replace(/\.$/, ''))}.`;
  }

  // ── 4. AUTOMATIC ───────────────────────────────────────────────────────────
  else if (pattern === 'automatic') {
    const payloadObj = block.payloads;
    const fromPayloads = !!payloadObj && !text;
    const payloadText = payloadObj ? formatPayloadList(payloadObj, evalStr, formatDiceObj, { pattern: 'automatic', targetObj: block.target }) : '';

    let rawBody = '';
    if (payloadText && text) {
      rawBody = `${payloadText}. ${capitalize(text)}`;
    } else if (payloadText) {
      rawBody = payloadText;
    } else {
      rawBody = text;
    }

    const classification = classifyBodyText(rawBody, fromPayloads);
    const subject = buildSubjectNounPhrase(block.target, activity?.range, evalStr, lang);
    const isPlural = isPluralSubject(subject);
    const isSelf = subject === 'You' || subject === 'Tú';

    let bodyStr = rawBody;

    if (block.target?.aoe) {
      if (isEs) {
        const rawShape = (evalStr(block.target.aoe.shape || 'sphere') || 'sphere').toLowerCase();
        const shape = SPANISH_AOE_SHAPES[rawShape] || capitalize(rawShape);
        const size = evalStr(block.target.aoe.size || '');
        const isLine = rawShape === 'line' || rawShape === 'línea';
        const isWall = rawShape === 'wall' || rawShape === 'muro';
        const isEmanation = rawShape === 'emanation' || rawShape === 'emanación';
        const isCube = rawShape === 'cube' || rawShape === 'cubo';
        const isCone = rawShape === 'cone' || rawShape === 'cono';
        let sizePhrase = '';
        if (isLine) sizePhrase = `una Línea de ${size} pies`;
        else if (isWall) sizePhrase = `un Muro de ${size} pies`;
        else if (isEmanation) sizePhrase = `una Emanación de ${size} pies`;
        else if (isCube) sizePhrase = `un Cubo de ${size} pies`;
        else if (isCone) sizePhrase = `un Cono de ${size} pies`;
        else if (rawShape === 'cylinder') sizePhrase = `un Cilindro de ${size} pies de radio`;
        else sizePhrase = `una ${shape} de ${size} pies de radio`;

        const rawRangeVal = evalStr(block.target?.range || activity?.range || '').trim();
        const rangePart = rawRangeVal && !/^(self|personal)$/i.test(rawRangeVal)
          ? ` a un alcance de ${rawRangeVal} o menos`
          : '';
        bodyStr = `Aparece ${sizePhrase}${rangePart} ${rawBody.charAt(0).toLowerCase() + rawBody.slice(1)}`;
      } else {
        const shape = capitalize(evalStr(block.target.aoe.shape || 'sphere'));
        const size = evalStr(block.target.aoe.size || '');
        const isLine = shape.toLowerCase() === 'line';
        const isWall = shape.toLowerCase() === 'wall';
        const sizePhrase = (isLine || isWall) ? `${size}-foot ${shape}` : `${size}-foot-radius ${shape}`;
        const rawRangeVal = evalStr(block.target?.range || activity?.range || '').trim();
        const rangePart = rawRangeVal && !/^self$/i.test(rawRangeVal)
          ? ` centered on a point within ${rawRangeVal}`
          : '';
        bodyStr = `A ${sizePhrase}${rangePart} ${rawBody.charAt(0).toLowerCase() + rawBody.slice(1)}`;
      }

    } else if (block.target?.inherit === 'trigger') {
      if (isEs) {
        const lower = rawBody.toLowerCase();
        if (lower.startsWith('el objetivo') || lower.startsWith('el atacante') || classification === 'HAS_SUBJECT' || classification === 'NARRATIVE') {
          bodyStr = rawBody;
        } else if (isDamageBody(rawBody)) {
          bodyStr = `El objetivo recibe ${rawBody.charAt(0).toLowerCase() + rawBody.slice(1)}`;
        } else {
          bodyStr = `El objetivo ${rawBody.charAt(0).toLowerCase() + rawBody.slice(1)}`;
        }
      } else {
        const lower = rawBody.toLowerCase();
        if (lower.startsWith('the target') || lower.startsWith('the attacker') || lower.startsWith('the next') || classification === 'HAS_SUBJECT' || classification === 'NARRATIVE') {
          bodyStr = rawBody;
        } else if (isDamageBody(rawBody)) {
          bodyStr = `The target takes ${rawBody.charAt(0).toLowerCase() + rawBody.slice(1)}`;
        } else {
          const verbThirdPerson = conjugateToThirdPerson(rawBody);
          if (/^target's\s+/i.test(verbThirdPerson)) {
            bodyStr = `The target's ${verbThirdPerson.replace(/^target's\s+/i, '').trim()}`;
          } else {
            const deduped = verbThirdPerson.replace(/^target\s+/i, '');
            bodyStr = `The target ${deduped.charAt(0).toLowerCase() + deduped.slice(1)}`;
          }
        }
      }

    } else if (block.target?.inherit === 'prev_step') {
      bodyStr = rawBody;

    } else if (classification === 'STRUCTURED') {
      const lowerBody = rawBody.charAt(0).toLowerCase() + rawBody.slice(1);
      if (isEs) {
        if (isSelf) {
          bodyStr = lowerBody;
        } else if (isDamageBody(rawBody)) {
          bodyStr = isPlural ? `${subject} reciben ${lowerBody}` : `${subject} recibe ${lowerBody}`;
        } else {
          bodyStr = `${subject} ${lowerBody}`;
        }
      } else {
        if (lowerBody.toLowerCase().startsWith('base ac')) {
          bodyStr = `${subject}'s ${lowerBody}`;
        } else if (isDamageBody(rawBody)) {
          if (isSelf) {
            bodyStr = `${subject} deal ${lowerBody}`;
          } else if (isPlural) {
            bodyStr = `${subject} take ${lowerBody}`;
          } else {
            bodyStr = `${subject} takes ${lowerBody}`;
          }
        } else {
          bodyStr = `${subject} ${lowerBody}`;
        }
      }

    } else if (classification === 'INFINITIVE') {
      const lowerBody = rawBody.charAt(0).toLowerCase() + rawBody.slice(1);
      if (isEs) {
        bodyStr = `${subject} ${lowerBody}`;
      } else {
        if (isSelf) {
          bodyStr = `${subject} ${lowerBody}`;
        } else if (isPlural) {
          bodyStr = `${subject} ${lowerBody}`;
        } else {
          const conjugated = conjugateToThirdPerson(lowerBody);
          bodyStr = `${subject} ${conjugated}`;
        }
      }

    } else if (classification === 'HAS_SUBJECT') {
      let resolved = rawBody;
      if (isEs) {
        if (!isSelf && subject && /^(el\s+)?objetivo('s)?\b/i.test(rawBody)) {
          resolved = rawBody.replace(/^(el\s+)?objetivo\b/i, subject);
        }
      } else {
        if (!isSelf && subject && /^(the\s+)?target('s)?\b/i.test(rawBody)) {
          const isPossessive = /^(the\s+)?target's\b/i.test(rawBody);
          const repSubject = isPossessive ? `${subject}'s` : subject;
          resolved = rawBody.replace(/^(the\s+)?target('s)?\b/i, repSubject);
        }
      }
      bodyStr = resolved;

    } else {
      bodyStr = rawBody;
    }

    if (bodyStr) bodyStr = capitalize(bodyStr);
    let cleanBody = bodyStr.trim();
    if (cleanBody && !/[.!?]$/.test(cleanBody)) cleanBody = `${cleanBody}.`;

    let rangeText = '';
    const explicitBlockRange = block.target?.range ? evalStr(block.target.range).trim() : '';
    const rawRangeVal = explicitBlockRange || (blockIndex === 0 ? evalStr(activity?.range || '').trim() : '');
    const bodyHasRange = rawRangeVal
      && (cleanBody.toLowerCase().includes(`within ${rawRangeVal.toLowerCase()}`)
        || cleanBody.toLowerCase().includes(`a ${rawRangeVal.toLowerCase()}`)
        || cleanBody.toLowerCase().includes(`alcance: ${rawRangeVal.toLowerCase()}`)
        || cleanBody.toLowerCase().includes(`range: ${rawRangeVal.toLowerCase()}`)
        || ((rawRangeVal.toLowerCase() === 'touch' || rawRangeVal.toLowerCase() === 'contacto') && (cleanBody.toLowerCase().includes('you touch') || cleanBody.toLowerCase().includes('que toques'))));
    if (rawRangeVal && !/^(self|personal)$/i.test(rawRangeVal) && !bodyHasRange) {
      rangeText = isEs ? ` _Alcance:_ ${capitalize(rawRangeVal)}.` : ` _Range:_ ${capitalize(rawRangeVal)}.`;
    }

    mainBody = `${cleanBody}${rangeText}`.trim();
  }


  // ── 5. AURA ────────────────────────────────────────────────────────────────
  else if (pattern === 'aura') {
    const rawShape = (evalStr(block.target?.aoe?.shape || 'sphere') || 'sphere').toLowerCase();
    const size = evalStr(block.target?.aoe?.size || '');
    const rawCleanRange = evalStr(block.target?.range || activity?.range || '').trim();
    const cleanRange = formatDistance(rawCleanRange, lang).replace(/^(range|reach|alcance)\s*/i, '').trim();
    const isLine = rawShape === 'line' || rawShape === 'línea';
    const isWall = rawShape === 'wall' || rawShape === 'muro';
    const isEmanation = rawShape === 'emanation' || rawShape === 'emanación';
    const isCube = rawShape === 'cube' || rawShape === 'cubo';
    const isCone = rawShape === 'cone' || rawShape === 'cono';

    if (isEs) {
      const shape = SPANISH_AOE_SHAPES[rawShape] || capitalize(rawShape);
      let sizePhrase = '';
      if (isLine) sizePhrase = `una Línea de ${size} pies`;
      else if (isWall) sizePhrase = `un Muro de ${size} pies`;
      else if (isEmanation) sizePhrase = `una Emanación de ${size} pies`;
      else if (isCube) sizePhrase = `un Cubo de ${size} pies`;
      else if (isCone) sizePhrase = `un Cono de ${size} pies`;
      else if (rawShape === 'cylinder') sizePhrase = `un Cilindro de ${size} pies de radio`;
      else sizePhrase = `una ${shape} de ${size} pies de radio`;

      let locationPhrase = '';
      if (isEmanation || /^(self|personal)$/i.test(cleanRange)) {
        locationPhrase = isLine ? 'que se origina en ti' : 'centrada en ti';
      } else if (cleanRange) {
        locationPhrase = `centrada en un punto a ${cleanRange} o menos`;
      }

      let auraText = text.trim();
      if (auraText) {
        auraText = auraText
          .replace(/^a\s+(\d+-foot(-radius|-diameter)?\s+(cube|sphere|cylinder|emanation|wall|line)\s+of\s+)/i, '')
          .replace(/^a\s+(sphere|cube|cylinder|wall|line|emanation)\s+of\s+/i, '')
          .replace(/\s+(flit around you in a \d+-foot emanation|flit around you|fills the air|appears|shines down)$/i, '')
          .replace(/^(a|an|un|una)\s+/i, '')
          .trim();
      }

      const ofPart = auraText ? ` de ${auraText}` : '';
      let bodyStr = `Aparece ${sizePhrase}${ofPart} ${locationPhrase}`.trim();

      const extras = [];
      if (block.difficultTerrain) extras.push('crea Terreno Difícil');
      if (block.obscured) extras.push('está Muy Oscurecida');
      if (extras.length > 0) bodyStr += ` y ${extras.join(' y ')}`;

      let moveStr = '';
      if (block.move) {
        const actionRaw = (block.move.action || 'action').toLowerCase();
        const actionName = actionRaw === 'bonus_action' ? 'una Acción Adicional' : 'una Acción';
        const dist = block.move.distance ? evalStr(block.move.distance) : '';
        const distStr = dist ? ` hasta ${dist} pies` : '';
        moveStr = ` Puedes usar ${actionName} para mover el área${distStr}.`;
      }

      mainBody = `${bodyStr}.${moveStr}`.replace(/\.\./g, '.');
    } else {
      const shape = capitalize(evalStr(block.target?.aoe?.shape || 'sphere'));
      const sizePhrase = (isLine || isWall) ? `${size}-foot ${shape}` : `${size}-foot-radius ${shape}`;

      let locationPhrase = '';
      if (isEmanation || /^self$/i.test(cleanRange)) {
        locationPhrase = isLine ? 'originating from you' : 'centered on you';
      } else if (cleanRange) {
        locationPhrase = `centered on a point within ${cleanRange}`;
      }

      let auraText = text.trim();
      if (auraText) {
        auraText = auraText
          .replace(/^a\s+(\d+-foot(-radius|-diameter)?\s+(cube|sphere|cylinder|emanation|wall|line)\s+of\s+)/i, '')
          .replace(/^a\s+(sphere|cube|cylinder|wall|line|emanation)\s+of\s+/i, '')
          .replace(/\s+(flit around you in a \d+-foot emanation|flit around you|fills the air|appears|shines down)$/i, '')
          .replace(/^(a|an)\s+/i, '')
          .trim();
      }

      const ofPart = auraText ? ` of ${auraText}` : '';
      let bodyStr = `A ${sizePhrase}${ofPart} appears ${locationPhrase}`.trim();

      const extras = [];
      if (block.difficultTerrain) extras.push('creates Difficult Terrain');
      if (block.obscured) extras.push('is Heavily Obscured');
      if (extras.length > 0) bodyStr += ` and ${extras.join(' and ')}`;

      let moveStr = '';
      if (block.move) {
        const actionRaw = (block.move.action || 'action').toLowerCase();
        const actionName = actionRaw === 'bonus_action' ? 'Bonus Action' : 'action';
        const article = /^[aeiou]/i.test(actionName) ? 'an' : 'a';
        const dist = block.move.distance ? evalStr(block.move.distance) : '';
        const distStr = dist ? ` up to ${dist} feet` : '';
        moveStr = ` You can take ${article} ${actionName} to move the area${distStr}.`;
      }

      mainBody = `${bodyStr}.${moveStr}`.replace(/\.\./g, '.');
    }
  }

  // ── Fallback ────────────────────────────────────────────────────────────────
  else {
    mainBody = text || '';
  }

  // ── Reliability, repeat, trigger wrapping ──────────────────────────────────
  const repeatText = formatRepeat(block.repeat, pattern, evalStr, lang);
  const reliableText = block.reliable === true
    ? (isEs ? ' (no gasta el recurso en caso de fallo)' : ' (does not expend resource on failure)')
    : '';

  let resultBody = mainBody.trim();
  if (resultBody && !/[.!?]$/.test(resultBody)) {
    resultBody = `${resultBody}${reliableText}.`;
  } else if (reliableText) {
    resultBody = resultBody.replace(/\.$/, `${reliableText}.`);
  }
  if (repeatText) resultBody = `${resultBody}${repeatText}`;

  if (triggerStr) {
    const cleanBody = resultBody.replace(/\.$/, '');
    return isEs
      ? `_Disparador:_ ${triggerStr}. _Respuesta:_ ${cleanBody}.`
      : `_Trigger:_ ${triggerStr}. _Response:_ ${cleanBody}.`;
  }

  return resultBody;
}

// ─── Main entry point ─────────────────────────────────────────────────────────

/**
 * Formats an Activity node into natural-language Markdown for the Activity Sheet.
 */
export function formatActivityMechanic(activity, characterData) {
  if (!activity) return '';
  const evaluator = new ExpressionEvaluator(characterData || {});
  const scope = activity.variables || {};
  const name = activity.name || activity.id || '';
  const mechanic = activity.mechanic;

  const formatExtras = () => {
    if (!activity.extra) return '';
    const rawExtras = Array.isArray(activity.extra) ? activity.extra : [activity.extra];
    const extraParts = rawExtras
      .map(item => {
        if (!item) return '';
        if (typeof item === 'object') {
          const rawName = item.name || '';
          if (rawName === 'Using a Higher-Level Spell Slot') return '';
          const evaluatedName = rawName ? evaluator.evaluate(rawName, scope) : '';
          if (evaluatedName === 'Using a Higher-Level Spell Slot') return '';
          const title = evaluatedName ? `_${evaluatedName}:_ ` : '';
          const body = item.description ? evaluator.evaluate(item.description, scope) : '';
          return `${title}${body}`.trim();
        }
        const evaluated = evaluator.evaluate(String(item), scope).trim();
        if (evaluated === 'Using a Higher-Level Spell Slot') return '';
        return evaluated;
      })
      .filter(Boolean);

    if (extraParts.length === 0) return '';
    return '\n\n' + extraParts.map(e => `> ${e}`).join('\n\n');
  };

  const lang = 'es';
  const isEs = true;

  const formatDurationSuffix = () => {
    const rawDur = activity.duration ? evaluator.evaluate(String(activity.duration), scope) : '';
    if (!rawDur || typeof rawDur !== 'string') return '';
    const cleanDur = rawDur.trim();
    if (/^instantaneous$/i.test(cleanDur) || /^instant[aá]neo$/i.test(cleanDur) || cleanDur === '') return '';
    const concMatch = cleanDur.match(/concentration(?:,\s*|\s+)?(?:up to\s+)?(.+)/i)
      || cleanDur.match(/concentraci[oó]n(?:,\s*|\s+)?(?:hasta\s+)?(.+)/i);
    if (concMatch) {
      let timeStr = concMatch[1].trim();
      if (isEs) {
        timeStr = timeStr
          .replace(/\bminute(s)?\b/gi, 'minuto$1')
          .replace(/\bhour(s)?\b/gi, 'hora$1')
          .replace(/\bday(s)?\b/gi, 'día$1')
          .replace(/\bround(s)?\b/gi, 'asalto$1');
        return ` _Concentración:_ Hasta ${timeStr}.`;
      }
      return ` _Concentration:_ Up to ${timeStr}.`;
    }
    let durStr = cleanDur;
    if (isEs) {
      durStr = durStr
        .replace(/\bminute(s)?\b/gi, 'minuto$1')
        .replace(/\bhour(s)?\b/gi, 'hora$1')
        .replace(/\bday(s)?\b/gi, 'día$1')
        .replace(/\bround(s)?\b/gi, 'asalto$1');
      return ` _Duración:_ ${capitalize(durStr)}.`;
    }
    return ` _Duration:_ ${capitalize(cleanDur)}.`;
  };

  const formatRitualSuffix = () => {
    const tags = Array.isArray(activity.tags) ? activity.tags : (activity.tags ? [activity.tags] : []);
    const isRitual = activity.ritual === true || tags.some(t => String(t).toLowerCase() === 'ritual');
    if (isRitual) return ' _Ritual_.';
    return '';
  };

  const durSuffix = formatDurationSuffix();
  const ritualSuffix = formatRitualSuffix();
  const extraSuffix = formatExtras();

  if (!mechanic) {
    const fallbackText = (activity.description || activity.summary || '').split('\n')[0].trim();
    return `**${name}.** ${fallbackText}${durSuffix}${ritualSuffix}${extraSuffix}`;
  }

  const mechanicObj = Array.isArray(mechanic)
    ? { mode: 'succession', blocks: mechanic }
    : (mechanic && Array.isArray(mechanic.blocks) && !mechanic.mode ? { mode: 'succession', ...mechanic } : mechanic);

  // ── Upcast resolution ─────────────────────────────────────────────────────
  const upcastSpec = mechanicObj.upcast ?? mechanic.upcast ?? null;

  // Warlock: apply modifications silently — numbers shown correctly, no label.
  const upcastSteps = computeWarlockUpcastSteps(activity, characterData);
  const isWarlock = characterData?.resources?.some(r => r.id === 'pactMagicSpellSlot');

  let effectiveMechanic = mechanicObj;
  if (upcastSpec && upcastSteps > 0) {
    effectiveMechanic = applyUpcast(mechanicObj, upcastSpec, upcastSteps);
  }

  // Non-Warlock: show _Upcast:_ label when spell level < character's max slot level.
  const resourceId = activity.resource || '';
  const baseMatch = resourceId.match(/^level(\d+)SpellSlot$/);
  const baseLevel = baseMatch ? parseInt(baseMatch[1], 10) : 0;
  const maxSlotLevel = computeMaxSlotLevel(characterData);
  const showUpcastLabel = upcastSpec && !isWarlock && baseLevel > 0 && maxSlotLevel > baseLevel;

  const evalStrForLabel = s => evaluator.evaluate(s, scope);
  const upcastSuffix = showUpcastLabel
    ? (isEs
      ? ` _Nivel superior:_ ${deriveUpcastLabel(upcastSpec, effectiveMechanic, activity, evalStrForLabel, 'es')}.`
      : ` _Upcast:_ ${deriveUpcastLabel(upcastSpec, effectiveMechanic, activity, evalStrForLabel, 'en')}.`)
    : '';

  const fullSuffix = `${durSuffix}${ritualSuffix}${upcastSuffix}${extraSuffix}`;
  // ─────────────────────────────────────────────────────────────────────────

  const effectiveBlocks = effectiveMechanic.blocks;

  if (effectiveMechanic.mode || Array.isArray(effectiveBlocks)) {
    const blocks = Array.isArray(effectiveBlocks) ? effectiveBlocks : [];

    if (effectiveMechanic.mode === 'choice') {
      const evalStr = s => evaluator.evaluate(s, scope);
      const topTrigger = effectiveMechanic.trigger ? formatTrigger(effectiveMechanic.trigger, evalStr, lang) : '';
      const triggerPart = topTrigger ? (isEs ? ` _Disparador:_ ${topTrigger}. _Respuesta:_` : ` _Trigger:_ ${topTrigger}. _Response:_`) : '';

      const hasAuraBlock0 = blocks[0]?.pattern === 'aura';
      const auraPreamble = hasAuraBlock0 ? formatBlock(blocks[0], activity, evaluator, scope) : '';
      const choiceBlocks = hasAuraBlock0 ? blocks.slice(1) : blocks;

      const preamble = effectiveMechanic.text
        ? evaluator.evaluate(String(effectiveMechanic.text), scope).trim()
        : (hasAuraBlock0 ? '' : (isEs ? 'Elige una de las siguientes opciones:' : 'Choose one of the following:'));

      const choiceLines = choiceBlocks
        .map(b => {
          const title = b.name ? `**${b.name}**: ` : '';
          const content = formatBlock(b, activity, evaluator, scope);
          return `> ${title}${content}`;
        })
        .join('\n\n');

      if (hasAuraBlock0) {
        const preambleText = preamble ? ` ${preamble}` : '';
        return `**${name}.**${triggerPart} ${auraPreamble}${preambleText}${fullSuffix}\n\n${choiceLines}`;
      }

      return `**${name}.**${triggerPart} ${preamble}${fullSuffix}\n\n${choiceLines}`;
    }

    // succession
    const contentParts = blocks
      .map((b, idx) => {
        const content = formatBlock(b, activity, evaluator, scope, idx);
        if (!content) return '';
        const title = b.name && idx > 0 ? `**${b.name}.** ` : '';
        return `${title}${content}`;
      })
      .filter(Boolean);
    return `**${name}.** ${contentParts.join(' ')}${fullSuffix}`;
  }

  const content = formatBlock(effectiveMechanic, activity, evaluator, scope);
  return `**${name}.** ${content}${fullSuffix}`;
}
