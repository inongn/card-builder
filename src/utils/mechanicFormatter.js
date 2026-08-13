import { ExpressionEvaluator } from '../engine/ExpressionEvaluator.js';
import { formatBonus } from '../engine/helpers.js';

// ─── Constants ────────────────────────────────────────────────────────────────

const ABILITY_NAMES = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma'
};

/** Canonical display order for payloads within a clause */
const PAYLOAD_ORDER = {
  damage: 1,
  healing: 2,
  movement: 3,
  condition: 4,
  statModifier: 5,
  rollModifier: 6,
  text: 7,
  action: 8
};

/**
 * Maps every TriggerEventEnum value to a natural-language fragment.
 * The fragment is written in the second-person singular ("you hit") or
 * impersonal ("a creature enters") as appropriate for its category.
 */
const TRIGGER_EVENT_PHRASES = {
  // Personal — "When you <phrase>"
  make_attack:        { subject: 'you', phrase: 'make an attack' },
  hit_with_attack:    { subject: 'you', phrase: 'hit a creature with an attack' },
  miss_with_attack:   { subject: 'you', phrase: 'miss with an attack' },
  be_hit:             { subject: 'you', phrase: 'are hit by an attack' },
  take_damage:        { subject: 'you', phrase: 'take damage' },
  make_save:          { subject: 'you', phrase: 'make a saving throw' },
  fail_save:          { subject: 'you or a creature you can see', phrase: 'fail a saving throw' },
  make_check:         { subject: 'you', phrase: 'make an ability check' },
  fail_check:         { subject: 'you or a creature you can see', phrase: 'fail an ability check' },
  roll_initiative:    { subject: 'you', phrase: 'roll Initiative' },
  roll_damage:        { subject: 'you', phrase: 'roll damage' },
  land_crit:          { subject: 'you', phrase: 'score a critical hit' },
  drop_enemy_zero:    { subject: 'you', phrase: 'reduce an enemy to 0 Hit Points' },
  cast_spell:         { subject: 'you', phrase: 'cast a spell' },
  // Aura / area — "When <phrase>"
  on_cast:            { subject: null,  phrase: 'the area is created' },
  enter_area:         { subject: null,  phrase: 'a creature enters the area' },
  start_turn:         { subject: null,  phrase: 'a creature starts its turn there' },
  end_turn:           { subject: null,  phrase: 'a creature ends its turn there' },
  leave_area:         { subject: null,  phrase: 'a creature leaves the area' },
  move_within_range:  { subject: null,  phrase: 'a creature moves within range' },
  area_moves_into_space: { subject: null, phrase: "the area moves into a creature's space" },
  move_into_space:    { subject: null,  phrase: "the area moves into a creature's space" },
  // Custom — rendered verbatim
  custom:             null,
};

// ─── Utility helpers ──────────────────────────────────────────────────────────

export function capitalize(str) {
  if (!str || typeof str !== 'string') return str || '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDistance(distStr) {
  if (!distStr) return '';
  const str = String(distStr).trim();
  if (/^5\s*feet$/i.test(str)) return 'reach 5 feet';
  if (/^touch$/i.test(str)) return 'reach Touch';
  if (/^self$/i.test(str)) return 'range Self';
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

export function formatDamageType(typeVal, evalStr) {
  if (!typeVal) return '';
  const rawList = Array.isArray(typeVal) ? typeVal : [typeVal];
  const formatted = rawList
    .map(t => {
      const s = evalStr(t);
      return s === 'damage' ? '' : capitalize(s);
    })
    .filter(Boolean);
  if (formatted.length === 0) return '';
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]} or ${formatted[1]}`;
  return `${formatted.slice(0, -1).join(', ')}, or ${formatted[formatted.length - 1]}`;
}

export function formatFilterText(filterVal, evalStr, plural = false) {
  if (!filterVal) return plural ? 'creatures' : 'creature';
  const rawList = Array.isArray(filterVal) ? filterVal : [filterVal];
  const formattedList = rawList.map(f => evalStr(f)).filter(Boolean);
  if (formattedList.length === 0) return plural ? 'creatures' : 'creature';

  return formattedList
    .map(s => {
      const evalS = String(s).trim();
      if (plural) {
        const lower = evalS.toLowerCase();
        if (lower === 'creature') return 'creatures';
        if (lower === 'undead') return 'Undead';
        if (lower.endsWith('s')) return capitalize(evalS);
        return `${capitalize(evalS)}s`;
      }
      return capitalize(evalS);
    })
    .join(' or ');
}

/**
 * Formats the trigger section of a block into a "When ..." sentence.
 * Uses a complete lookup table covering every TriggerEventEnum value.
 */
export function formatTrigger(trigger, evalStr) {
  if (!trigger) return '';
  if (typeof trigger === 'string') return evalStr(trigger);

  if (trigger.text) return evalStr(trigger.text);

  if (trigger.event) {
    const rawEvents = Array.isArray(trigger.event) ? trigger.event : [trigger.event];

    // Partition into personal ("you …") and impersonal events
    const personalPhrases = [];
    const impersonalPhrases = [];

    for (const e of rawEvents) {
      const entry = TRIGGER_EVENT_PHRASES[e];
      if (!entry) {
        // Unknown event — emit a best-effort form
        personalPhrases.push(e.replace(/_/g, ' '));
        continue;
      }
      if (entry.subject === null) {
        impersonalPhrases.push(entry.phrase);
      } else {
        // Group by subject
        personalPhrases.push({ subject: entry.subject, phrase: entry.phrase });
      }
    }

    const parts = [];

    // Build impersonal clauses first
    if (impersonalPhrases.length > 0) {
      const joined = joinOr(impersonalPhrases);
      parts.push(`When ${joined}`);
    }

    // Group personal clauses by subject, then merge
    if (personalPhrases.length > 0) {
      // Separate plain strings (unknown events) from structured entries
      const structured = personalPhrases.filter(p => typeof p === 'object');
      const raw = personalPhrases.filter(p => typeof p === 'string');

      const bySubject = new Map();
      for (const { subject, phrase } of structured) {
        if (!bySubject.has(subject)) bySubject.set(subject, []);
        bySubject.get(subject).push(phrase);
      }

      for (const [subject, phrases] of bySubject) {
        const joined = joinOr(phrases);
        parts.push(`When ${subject} ${joined}`);
      }

      if (raw.length > 0) {
        parts.push(`When you ${joinOr(raw)}`);
      }
    }

    if (parts.length === 0) return '';
    return parts.join(', or ');
  }

  return '';
}

function joinOr(arr) {
  if (arr.length === 1) return arr[0];
  return `${arr.slice(0, -1).join(', ')}, or ${arr[arr.length - 1]}`;
}

export function formatRepeat(repeat, pattern, evalStr) {
  if (!repeat) return '';
  let rawAction = '';
  if (typeof repeat === 'string') {
    rawAction = repeat;
  } else if (typeof repeat === 'object') {
    if (repeat.action) rawAction = repeat.action;
  }
  if (!rawAction) return '';

  const lower = rawAction.toLowerCase();
  let actionName = 'action';
  if (lower === 'bonus_action') actionName = 'Bonus Action';
  else if (lower === 'action') actionName = 'action';
  else if (lower === 'free_action') actionName = 'free action';
  else if (lower === 'reaction') actionName = 'reaction';

  const article = /^[aeiou]/i.test(actionName) ? 'an' : 'a';

  if (pattern === 'attack') {
    return ` _Repeat_: On subsequent turns, you can take ${article} ${actionName} to repeat the attack.`;
  }
  if (pattern === 'save') {
    return ` _Repeat_: On subsequent turns, you can take ${article} ${actionName} to move the effect and repeat the save.`;
  }
  return ` _Repeat_: On subsequent turns, you can take ${article} ${actionName} to repeat the effect.`;
}

/**
 * Formats a target specification into a natural-language clause beginning with ", ".
 * e.g. ", one creature within 60 feet"  /  ", each creature in a 15-foot-radius Sphere centered on you"
 */
export function formatTargetText(targetObj, formattedRange, evalStr, isAttack = false, activity = null) {
  if (!targetObj) return '';
  if (targetObj.text) return `, ${evalStr(targetObj.text)}`;
  const cleanRange = formattedRange.replace(/^(range|reach)\s*/i, '').trim();

  const filterSingular = formatFilterText(targetObj.filter, evalStr, false);
  const filterPlural = formatFilterText(targetObj.filter, evalStr, true);

  // ── AOE target ──────────────────────────────────────────────────────────────
  if (targetObj.aoe) {
    const shape = capitalize(evalStr(targetObj.aoe.shape || 'sphere'));
    const size = evalStr(targetObj.aoe.size || '');
    const isLine = shape.toLowerCase() === 'line';
    const isWall = shape.toLowerCase() === 'wall';
    const isEmanation = shape.toLowerCase() === 'emanation';
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
    // Events where "you" are the one reacting to something done TO you
    const isAttackerTrigger = rawEvents.some(e =>
      e === 'be_hit' || e === 'take_damage'
    );
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
  if (lowerRange === 'self') return '';
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

  // ── Text payload ─────────────────────────────────────────────────────────────
  if (type === 'text') {
    const raw = payload.text ? evalStr(payload.text).trim() : '';
    if (!raw) return '';
    // Normalise: lowercase first char, ensure bare "target" → "the target"
    const lowered = raw.charAt(0).toLowerCase() + raw.slice(1);
    return lowered
      .replace(/\b(?<!the\s)target\b/gi, 'the target')
      .replace(/\.$/, '');
  }

  // ── Damage payload ──────────────────────────────────────────────────────────
  if (type === 'damage') {
    const dDice = formatDiceObj(payload.dice, payload.min, evalStr);
    const dType = formatDamageType(payload.damageType, evalStr);
    const typeStr = dType ? ` ${dType}` : '';
    if (payload.text) {
      const txt = evalStr(payload.text).trim();
      return dDice ? `${dDice} ${txt}`.trim() : txt;
    }
    return dDice ? `${dDice}${typeStr} damage` : 'damage';
  }

  // ── Healing payload ─────────────────────────────────────────────────────────
  if (type === 'healing') {
    const healEntry = payload.healing || payload;
    const diceStr = formatDiceObj(healEntry.dice, undefined, evalStr);
    const typeLabel = healEntry.type === 'tempHitPoints' ? 'Temporary Hit Points' : 'Hit Points';
    return diceStr ? `${diceStr} ${typeLabel}` : typeLabel;
  }

  // ── Condition payload ───────────────────────────────────────────────────────
  if (type === 'condition') {
    const rawCond = Array.isArray(payload.condition) ? payload.condition : [payload.condition];
    const formattedCond = rawCond.map(c => capitalize(evalStr(c))).join(' and ');
    const condBase = formattedCond.toLowerCase() === 'prone'
      ? 'Prone'
      : `the ${formattedCond} condition`;

    let endText = '';
    if (payload.end) {
      if (typeof payload.end === 'string') {
        let actionCheckText = ' (escape DC)';
        if (payload.end === 'action_check') {
          const rawDc = ctx?.saveDc
            ? evalStr(ctx.saveDc)
            : evalStr('$(attributes.spellcasting.save)');
          const cleanDc = rawDc.replace(/^DC\s*/i, '').trim();
          actionCheckText = (cleanDc && !cleanDc.includes('$'))
            ? ` (escape DC ${cleanDc})`
            : ' (escape DC)';
        }
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
    const rollNames = {
      attack: 'attack',
      check: 'ability check',
      abilityCheck: 'ability check',
      save: 'saving throw',
      savingThrow: 'saving throw',
      dmg: 'damage',
      trigger: 'triggering roll',
    };
    const rollsStr = rawRolls.map(r => rollNames[evalStr(r)] || evalStr(r)).join(' or ');

    let endStr = '';
    if (payload.end) {
      if (typeof payload.end === 'string') {
        const endMap = {
          end_of_your_next_turn: ' until the end of your next turn',
          end_of_its_next_turn: ' until the end of its next turn',
        };
        endStr = endMap[payload.end] ?? ` (${evalStr(payload.end)})`;
      } else if (payload.end?.text) {
        endStr = ` (${evalStr(payload.end.text)})`;
      }
    }

    if (modType === 'advantage') return `Advantage on your next ${rollsStr}${endStr}`;
    if (modType === 'disadvantage') return `Disadvantage on its next ${rollsStr}${endStr}`;
    if (modType === 'reroll') return `reroll the ${rollsStr}${endStr}`;
    if (modType === 'attacksAgainstAdvantage') return `attack rolls against the target have Advantage${endStr}`;
    if (modType === 'attacksAgainstDisadvantage') return `attack rolls against the target have Disadvantage${endStr}`;

    const formulaStr = formatDiceObj(payload.dice || payload.formula, undefined, evalStr);
    if (modType === 'add') return `add ${formulaStr} to the ${rollsStr}${endStr}`;
    if (modType === 'subtract') return `subtract ${formulaStr} from the ${rollsStr}${endStr}`;
    return evalStr(payload.text || '');
  }

  // ── Movement payload ────────────────────────────────────────────────────────
  if (type === 'movement') {
    if (payload.text) return evalStr(payload.text);
    const dir = payload.direction || 'push';
    const distStr = payload.distance ? `${evalStr(payload.distance)} feet` : '5 feet';
    if (payload.movementType === 'forced') {
      if (dir === 'push') return `pushed up to ${distStr} away`;
      if (dir === 'pull') return `pulled up to ${distStr} closer`;
      return `moved up to ${distStr}`;
    }
    const opportStr = payload.provokesOpportunityAttacks === false
      ? ' without provoking Opportunity Attacks'
      : '';
    return `move up to ${distStr}${opportStr}`;
  }

  // ── Stat modifier payload ───────────────────────────────────────────────────
  if (type === 'statModifier') {
    const rawStat = (payload.stat || 'speed').toLowerCase();
    const statName = rawStat === 'ac' ? 'AC' : capitalize(rawStat);
    const rawVal = evalStr(payload.value);
    const numVal = Number(rawVal);
    const isNeg = !isNaN(numVal) && numVal < 0;
    const absVal = !isNaN(numVal) ? Math.abs(numVal) : rawVal;
    const speedSuffix = rawStat === 'speed' ? ' feet' : '';

    if (payload.operation === 'set') {
      return `base ${statName} becomes ${rawVal}`;
    }
    if (payload.operation === 'subtract' || isNeg) {
      return `have ${statName} reduced by ${absVal}${speedSuffix}`;
    }
    return `gain a +${absVal} bonus to ${statName}${speedSuffix}`;
  }

  // ── Action payload ──────────────────────────────────────────────────────────
  if (type === 'action') {
    if (payload.text) return evalStr(payload.text);
    if (payload.actionType === 'attack') return 'take an additional weapon attack';
    if (payload.actionType === 'general') return 'take one additional action, except the Magic action';
    return `take ${payload.actionType ? `a ${payload.actionType}` : 'an action'}`;
  }

  // ── Transform payload ───────────────────────────────────────────────────────
  if (type === 'transform') {
    const stats = Array.isArray(payload.statblock)
      ? payload.statblock.join(' or ')
      : payload.statblock;
    return `transform into a ${stats}`;
  }

  // ── Summon payload ──────────────────────────────────────────────────────────
  if (type === 'summon') {
    const stats = Array.isArray(payload.statblock)
      ? payload.statblock.join(' or ')
      : payload.statblock;
    return `summon ${stats}`;
  }

  // ── Choice payload ──────────────────────────────────────────────────────────
  if (type === 'choice') {
    const preamble = payload.text
      ? evalStr(payload.text)
      : 'choose one of the following:';
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
  const rawList = Array.isArray(payloadList) ? payloadList : [payloadList];

  const sortedList = [...rawList].sort((a, b) => getPayloadRank(a) - getPayloadRank(b));

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
        // Dice-based distance — can't merge numerically
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
  const targetIsPhrasesRaw = [];   // conditions and forced movement → "the target is <phrase>"
  const otherParts = [];
  let actionStr = '';

  for (const p of mergedList) {
    if (!p) continue;
    if (typeof p === 'string') { otherParts.push(evalStr(p)); continue; }

    const ptype = getPayloadType(p);

    if (ptype === 'damage') {
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) damageStr = damageStr ? `${damageStr} plus ${fmtd}` : fmtd;

    } else if (ptype === 'movement') {
      if (p.movementType === 'forced') {
        // These go into "the target is <phrase>"
        const dir = p.direction || 'push';
        const dist = p.distance ? `${evalStr(p.distance)} feet` : '5 feet';
        if (dir === 'push') targetIsPhrasesRaw.push(`pushed up to ${dist} away`);
        else if (dir === 'pull') targetIsPhrasesRaw.push(`pulled up to ${dist} closer`);
        else targetIsPhrasesRaw.push(`moved up to ${dist}`);
      } else {
        const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
        if (fmtd) otherParts.push(fmtd);
      }

    } else if (ptype === 'condition') {
      // formatPayload returns the bare phrase (e.g. "Prone", "the Poisoned condition")
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) targetIsPhrasesRaw.push(fmtd);

    } else if (ptype === 'action') {
      actionStr = formatPayload(p, evalStr, formatDiceObj, ctx);

    } else {
      const fmtd = formatPayload(p, evalStr, formatDiceObj, ctx);
      if (fmtd) otherParts.push(fmtd);
    }
  }

  const clauseParts = [];

  if (damageStr) clauseParts.push(damageStr);

  if (targetIsPhrasesRaw.length > 0) {
    // Noun phrases ("the X condition") → "has"; adjective/past-participle → "is"
    const nounPhrases = targetIsPhrasesRaw.filter(p => /^the /.test(p));
    const adjPhrases = targetIsPhrasesRaw.filter(p => !/^the /.test(p));
    if (adjPhrases.length > 0 && nounPhrases.length === 0) {
      const joined = adjPhrases.length === 1 ? adjPhrases[0]
        : `${adjPhrases.slice(0, -1).join(', ')} and ${adjPhrases[adjPhrases.length - 1]}`;
      clauseParts.push(`the target is ${joined}`);
    } else if (nounPhrases.length > 0 && adjPhrases.length === 0) {
      const joined = nounPhrases.length === 1 ? nounPhrases[0]
        : `${nounPhrases.slice(0, -1).join(', ')} and ${nounPhrases[nounPhrases.length - 1]}`;
      clauseParts.push(`the target has ${joined}`);
    } else {
      const all = [...adjPhrases.map(p => `is ${p}`), ...nounPhrases.map(p => `has ${p}`)];
      clauseParts.push(`the target ${all.join(', ')}`);
    }
  }

  if (otherParts.length > 0) clauseParts.push(...otherParts);
  if (actionStr) clauseParts.push(actionStr);

  if (clauseParts.length === 0) return '';
  if (clauseParts.length === 1) return clauseParts[0];

  // Join with commas; last item gets "and" only if it isn't a block-level choice
  let result = clauseParts[0];
  for (let i = 1; i < clauseParts.length; i++) {
    const part = clauseParts[i];
    result = result.replace(/\.$/, '');
    if (part.includes('\n\n') || part.startsWith('choose ')) {
      result = `${result}, ${part}`;
    } else if (i === clauseParts.length - 1) {
      result = `${result}, and ${part}`;
    } else {
      result = `${result}, ${part}`;
    }
  }
  return result;
}

// ─── Subject and text classification helpers ──────────────────────────────────

/**
 * Builds the target noun phrase used as the sentence subject for automatic and
 * healing blocks. Returns a full noun phrase like:
 *   "You" / "One creature you touch" / "Up to 10 creatures within 30 feet"
 */
function buildSubjectNounPhrase(targetObj, activityRange, evalStr) {
  if (!targetObj) return 'You';

  const type = (evalStr(targetObj.type || '') || '').toLowerCase();
  const cleanRange = evalStr(targetObj.range || activityRange || '').trim()
    .replace(/^(range|reach)\s*/i, '');
  const filter = targetObj.filter
    ? formatFilterText(targetObj.filter, evalStr, false)
    : 'creature';
  const filterPlural = targetObj.filter
    ? formatFilterText(targetObj.filter, evalStr, true)
    : 'creatures';

  if (targetObj.inherit === 'trigger') return 'The target';
  if (targetObj.inherit === 'prev_step') return '';

  const lowerRange = cleanRange.toLowerCase();

  if (type === 'self' || lowerRange === 'self') return 'You';

  if (type === 'touch' || lowerRange === 'touch') {
    return `One ${filter} you touch`;
  }

  const countRaw = targetObj.count !== undefined ? evalStr(targetObj.count) : '';
  const countNum = parseInt(countRaw, 10);
  const isMultiple = type === 'multiple' || type === 'multi'
    || (!isNaN(countNum) && countNum > 1);

  if (isMultiple) {
    const cntStr = countRaw || String(countNum);
    const rangePart = cleanRange && !/^self$/i.test(cleanRange) ? ` within ${cleanRange}` : '';
    const count = parseInt(cntStr, 10);
    return `Up to ${cntStr} ${!isNaN(count) && count === 1 ? filter : filterPlural}${rangePart}`;
  }

  // single
  if (cleanRange && !/^self$/i.test(cleanRange)) {
    return `One ${filter} within ${cleanRange}`;
  }

  return `One ${filter}`;
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
  if (fromPayloads) return 'STRUCTURED';
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
    lower.startsWith('its ')
  ) return 'HAS_SUBJECT';

  // Narrative clauses — emit verbatim
  const narrativeStarters = [
    'when ', 'while ', 'if ', 'once ', 'at the', 'on each', 'on a ',
    'a flickering', 'a creature', 'any creature', 'any attack',
    'creates an area', 'fire jumps', 'for the duration',
    'against an effect', 'also command', 'command your',
    '60-foot sphere', 'until ', 'whenever ',
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
      // Regular: verbs ending in -e → add s; others → add s
      if (/e$/.test(m)) return `${m}s`;
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

  const formatRange = (range, evalFn) => formatDistance(evalFn(range));

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
      const bnsStr = !isNaN(numBns) && numBns !== 0
        ? formatBonus(numBns)
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
  const rawRange = evalStr(block.target?.range || activity?.range || '').trim();
  const formattedRange = formatRange(rawRange, evalStr);
  const text = block.text ? evalStr(block.text).trim() : '';
  const triggerStr = formatTrigger(block.trigger, evalStr);
  let mainBody = '';

  // ── 1. ATTACK ──────────────────────────────────────────────────────────────
  if (pattern === 'attack' && block.attack) {
    const classif = capitalize(evalStr(block.attack.classification || 'melee'));
    const rawBonus = evaluator.evaluate(block.attack.bonus || '$(attributes.spellcasting.attack)', effectiveScope);
    const numBonus = typeof rawBonus === 'number' ? rawBonus : Number(rawBonus);
    const bonusStr = !isNaN(numBonus)
      ? formatBonus(numBonus)
      : evalStr(block.attack.bonus || '$(attributes.spellcasting.attack)');

    const targetDesc = formatTargetText(block.target, formattedRange, evalStr, true, activity);

    const rangeOutput = formattedRange.startsWith('reach') || formattedRange.startsWith('range')
      ? formattedRange
      : `range ${formattedRange}`;

    let hitText = '';
    if (block.hit) {
      let formattedHit = formatPayloadList(block.hit, evalStr, formatDiceObj);
      if (block.hitOrMiss) {
        const formattedHitOrMiss = formatPayloadList(block.hitOrMiss, evalStr, formatDiceObj);
        if (formattedHitOrMiss) formattedHit = `${formattedHit}, and ${formattedHitOrMiss}`;
      }
      if (formattedHit) hitText = ` _Hit_: ${formattedHit}.`;
    }

    let missText = '';
    if (block.miss) {
      const isStructuredOutcome = typeof block.miss === 'object'
        && !Array.isArray(block.miss)
        && ('halfDamage' in block.miss || 'payloads' in block.miss
            || ('text' in block.miss && !('type' in block.miss)));

      if (isStructuredOutcome) {
        const parts = [];
        if (block.miss.halfDamage) parts.push('half damage');
        if (block.miss.payloads) {
          const pStr = formatPayloadList(block.miss.payloads, evalStr, formatDiceObj);
          if (pStr) parts.push(pStr);
        }
        if (block.miss.text) parts.push(evalStr(block.miss.text));
        if (parts.length > 0) {
          missText = ` _Miss_: ${capitalize(parts.join(', '))}.`;
        }
      } else {
        const formattedMiss = formatPayloadList(block.miss, evalStr, formatDiceObj);
        if (formattedMiss) missText = ` _Miss_: ${capitalize(formattedMiss)}.`;
      }
    }

    let critText = '';
    if (block.crit) {
      const formattedCrit = formatPayloadList(block.crit, evalStr, formatDiceObj);
      if (formattedCrit) critText = ` _Critical Hit_: ${capitalize(formattedCrit)}.`;
    }

    mainBody = `_${classif} Attack Roll_: ${bonusStr}, ${rangeOutput.replace(/\.+$/, '')}${targetDesc}.${hitText}${missText}${critText}${text ? ` ${text}` : ''}`;
  }

  // ── 2. SAVE ────────────────────────────────────────────────────────────────
  else if (pattern === 'save' && block.save) {
    const abilityKey = (evalStr(block.save.ability) || 'dex').toLowerCase();
    const fullAbility = ABILITY_NAMES[abilityKey] || capitalize(abilityKey);
    const dcVal = evalStr(block.save.dc || '$(attributes.spellcasting.save)');
    const targetDesc = formatTargetText(block.target, formattedRange, evalStr, false, activity);

    let alwaysText = '';
    if (block.failureOrSuccess) {
      const fmtd = formatPayloadList(block.failureOrSuccess, evalStr, formatDiceObj);
      if (fmtd) alwaysText = ` _Failure or Success_: ${fmtd}.`;
    }

    let failText = '';
    if (block.failure) {
      const fmtd = formatPayloadList(block.failure, evalStr, formatDiceObj);
      if (fmtd) failText = ` _Failure_: ${capitalize(fmtd)}.`;
    }

    let successText = '';
    if (block.success) {
      // Discriminate SaveSuccessOutcome from a bare PayloadList:
      // SaveSuccessOutcome has at least one of: halfDamage, payloads, text (no `type` key)
      const isStructuredOutcome = typeof block.success === 'object'
        && !Array.isArray(block.success)
        && ('halfDamage' in block.success || 'payloads' in block.success
            || ('text' in block.success && !('type' in block.success)));

      if (isStructuredOutcome) {
        const parts = [];
        if (block.success.halfDamage) parts.push('half damage');
        if (block.success.payloads) {
          const pStr = formatPayloadList(block.success.payloads, evalStr, formatDiceObj);
          if (pStr) parts.push(pStr);
        }
        if (block.success.text) parts.push(evalStr(block.success.text));
        if (parts.length > 0) {
          successText = ` _Success_: ${capitalize(parts.join(', '))}.`;
        }
      } else {
        const fmtd = formatPayloadList(block.success, evalStr, formatDiceObj);
        if (fmtd) successText = ` _Success_: ${capitalize(fmtd)}.`;
      }
    }

    mainBody = `_${fullAbility} Saving Throw_: DC ${dcVal}${targetDesc}.${alwaysText}${failText}${successText}${text ? ` ${text}` : ''}`.replace(/\.\./g, '.');
  }

  // ── 3. HEALING ─────────────────────────────────────────────────────────────
  else if (pattern === 'healing' && block.healing) {
    const subject = buildSubjectNounPhrase(block.target, activity?.range, evalStr);
    const diceStr = formatDiceObj(block.healing.dice, undefined, evalStr);
    const isTempHP = block.healing.type === 'tempHitPoints';
    const typeLabel = isTempHP ? 'Temporary Hit Points' : 'Hit Points';
    const isPlural = /^up to \d+ /i.test(subject);
    const verb = subject === 'You' ? 'gain' : (isPlural ? (isTempHP ? 'gain' : 'regain') : (isTempHP ? 'gains' : 'regains'));

    let healStr = diceStr ? `${diceStr} ${typeLabel}` : typeLabel;
    if (block.healing.pool) healStr += ', divided among the targets';

    mainBody = `${subject} ${verb} ${healStr}.`;
    if (text) mainBody += ` ${capitalize(text.replace(/\.$/, ''))}.`;
  }

  // ── 4. AUTOMATIC ───────────────────────────────────────────────────────────
  else if (pattern === 'automatic') {
    const payloadObj = block.payloads;
    const fromPayloads = !!payloadObj && !text;
    const payloadText = payloadObj ? formatPayloadList(payloadObj, evalStr, formatDiceObj) : '';

    // Build the raw body — payloads first, then any narrative text addendum
    let rawBody = '';
    if (payloadText && text) {
      rawBody = `${payloadText}. ${capitalize(text)}`;
    } else if (payloadText) {
      rawBody = payloadText;
    } else {
      rawBody = text;
    }

    const classification = classifyBodyText(rawBody, fromPayloads);
    const subject = buildSubjectNounPhrase(block.target, activity?.range, evalStr);
    const isPlural = /^up to \d+ /i.test(subject);
    const isSelf = subject === 'You';

    let bodyStr = rawBody;

    if (block.target?.aoe) {
      // ── AOE automatic — describe the area inline
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

    } else if (block.target?.inherit === 'trigger') {
      // ── Reaction targeting an attacker/triggering creature (handled separately)
      const lower = rawBody.toLowerCase();
      if (lower.startsWith('the target') || lower.startsWith('the attacker')) {
        bodyStr = rawBody;
      } else if (/\bdamage\s*$/.test(lower)) {
        bodyStr = `The target takes ${rawBody.charAt(0).toLowerCase() + rawBody.slice(1)}`;
      } else {
        const verbThirdPerson = rawBody.replace(
          /^(subtract|add|take|roll|reroll|gain|lose|move|make|use|deal|halve|push|pull|reduce|increase|swap|spend|regain)\b/i,
          match => { const m = match.toLowerCase(); return /e$/.test(m) ? `${m}s` : `${m}s`; }
        );
        if (/^target's\s+/i.test(verbThirdPerson)) {
          bodyStr = `The target's ${verbThirdPerson.replace(/^target's\s+/i, '').trim()}`;
        } else {
          const deduped = verbThirdPerson.replace(/^target\s+/i, '');
          bodyStr = `The target ${deduped.charAt(0).toLowerCase() + deduped.slice(1)}`;
        }
      }

    } else if (block.target?.inherit === 'prev_step') {
      bodyStr = rawBody;

    } else if (classification === 'STRUCTURED') {
      // ── Typed payloads only — build a full subject-verb sentence
      const lowerBody = rawBody.charAt(0).toLowerCase() + rawBody.slice(1);
      if (lowerBody.toLowerCase().startsWith('base ac')) {
        bodyStr = `${subject}'s ${lowerBody}`;
      } else {
        bodyStr = `${subject} ${lowerBody}`;
      }

    } else if (classification === 'INFINITIVE') {
      // ── Bare infinitive: add subject and conjugate for singular 3rd-person
      const lowerBody = rawBody.charAt(0).toLowerCase() + rawBody.slice(1);
      if (isSelf) {
        // "You gain..."
        bodyStr = `${subject} ${lowerBody}`;
      } else if (isPlural) {
        // "Up to 10 targets gain..." — keep bare infinitive
        bodyStr = `${subject} ${lowerBody}`;
      } else {
        // "One creature you touch gains..."
        const conjugated = conjugateToThirdPerson(lowerBody);
        bodyStr = `${subject} ${conjugated}`;
      }

    } else if (classification === 'HAS_SUBJECT') {
      // ── Body already has a subject — apply Option A:
      // Replace "(the )target('s)" → derived noun phrase for specificity
      let resolved = rawBody;
      if (!isSelf && subject && /^(the\s+)?target('s)?\b/i.test(rawBody)) {
        const isPossessive = /^(the\s+)?target's\b/i.test(rawBody);
        const repSubject = isPossessive ? `${subject}'s` : subject;
        resolved = rawBody.replace(/^(the\s+)?target('s)?\b/i, repSubject);
      }
      bodyStr = resolved;

    } else {
      // NARRATIVE — emit verbatim
      bodyStr = rawBody;
    }

    if (bodyStr) bodyStr = capitalize(bodyStr);
    let cleanBody = bodyStr.trim();
    if (cleanBody && !/[.!?]$/.test(cleanBody)) cleanBody = `${cleanBody}.`;

    // Append _Range_ suffix only when range isn't already expressed in the body
    let rangeText = '';
    const explicitBlockRange = block.target?.range ? evalStr(block.target.range).trim() : '';
    const rawRangeVal = explicitBlockRange || (blockIndex === 0 ? evalStr(activity?.range || '').trim() : '');
    const bodyHasRange = rawRangeVal
      && (cleanBody.toLowerCase().includes(`within ${rawRangeVal.toLowerCase()}`)
          || cleanBody.toLowerCase().includes(`range: ${rawRangeVal.toLowerCase()}`)
          || (rawRangeVal.toLowerCase() === 'touch' && cleanBody.toLowerCase().includes('you touch')));
    if (rawRangeVal && !/^self$/i.test(rawRangeVal) && !bodyHasRange) {
      rangeText = ` _Range_: ${capitalize(rawRangeVal)}.`;
    }

    mainBody = `${cleanBody}${rangeText}`.trim();
  }


  // ── 5. AURA ────────────────────────────────────────────────────────────────
  else if (pattern === 'aura') {
    const shape = capitalize(evalStr(block.target?.aoe?.shape || 'sphere'));
    const size = evalStr(block.target?.aoe?.size || '');
    const cleanRange = evalStr(block.target?.range || activity?.range || '').trim();
    const isLine = shape.toLowerCase() === 'line';
    const isWall = shape.toLowerCase() === 'wall';
    const isEmanation = shape.toLowerCase() === 'emanation';
    const sizePhrase = (isLine || isWall) ? `${size}-foot ${shape}` : `${size}-foot-radius ${shape}`;

    let locationPhrase = '';
    if (isEmanation || /^self$/i.test(cleanRange)) {
      locationPhrase = isLine ? 'originating from you' : 'centered on you';
    } else if (cleanRange) {
      locationPhrase = `centered on a point within ${cleanRange}`;
    }

    // Normalise aura text: strip leading shape/size boilerplate, trailing location phrases
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

  // ── Fallback ────────────────────────────────────────────────────────────────
  else {
    mainBody = text || '';
  }

  // ── Reliability, repeat, trigger wrapping ──────────────────────────────────
  const repeatText = formatRepeat(block.repeat, pattern, evalStr);
  const reliableText = block.reliable === true ? ' (does not expend resource on failure)' : '';

  let resultBody = mainBody.trim();
  if (resultBody && !/[.!?]$/.test(resultBody)) {
    resultBody = `${resultBody}${reliableText}.`;
  } else if (reliableText) {
    resultBody = resultBody.replace(/\.$/, `${reliableText}.`);
  }
  if (repeatText) resultBody = `${resultBody}${repeatText}`;

  if (triggerStr) {
    const cleanBody = resultBody.replace(/\.$/, '');
    return `_Trigger_: ${triggerStr}. _Response_: ${cleanBody}.`;
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
          // Suppress the upcast extra — it's always shown separately
          if (rawName === 'Using a Higher-Level Spell Slot') return '';
          const evaluatedName = rawName ? evaluator.evaluate(rawName, scope) : '';
          if (evaluatedName === 'Using a Higher-Level Spell Slot') return '';
          const title = evaluatedName ? `_${evaluatedName}_: ` : '';
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

  const formatDurationSuffix = () => {
    const rawDur = activity.duration ? evaluator.evaluate(String(activity.duration), scope) : '';
    if (!rawDur || typeof rawDur !== 'string') return '';
    const cleanDur = rawDur.trim();
    if (/^instantaneous$/i.test(cleanDur) || cleanDur === '') return '';
    const concMatch = cleanDur.match(/concentration(?:,\s*|\s+)?(?:up to\s+)?(.+)/i);
    if (concMatch) return ` _Concentration_: Up to ${concMatch[1].trim()}.`;
    return ` _Duration_: ${capitalize(cleanDur)}.`;
  };

  const durSuffix = formatDurationSuffix();
  const extraSuffix = formatExtras();
  const fullSuffix = `${durSuffix}${extraSuffix}`;

  if (!mechanic) {
    const fallbackText = (activity.description || activity.summary || '').split('\n')[0].trim();
    return `**${name}.** ${fallbackText}${fullSuffix}`;
  }

  if (mechanic.mode) {
    const blocks = Array.isArray(mechanic.blocks) ? mechanic.blocks : [];

    if (mechanic.mode === 'choice') {
      const evalStr = s => evaluator.evaluate(s, scope);
      const topTrigger = mechanic.trigger ? formatTrigger(mechanic.trigger, evalStr) : '';
      const triggerPart = topTrigger ? ` _Trigger_: ${topTrigger}. _Response_:` : '';

      const hasAuraBlock0 = blocks[0]?.pattern === 'aura';
      const auraPreamble = hasAuraBlock0 ? formatBlock(blocks[0], activity, evaluator, scope) : '';
      const choiceBlocks = hasAuraBlock0 ? blocks.slice(1) : blocks;

      const preamble = mechanic.text
        ? evaluator.evaluate(String(mechanic.text), scope).trim()
        : (hasAuraBlock0 ? '' : 'choose one of the following:');

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

    // succession (and the now-removed sequence — all treated identically)
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

  const content = formatBlock(mechanic, activity, evaluator, scope);
  return `**${name}.** ${content}${fullSuffix}`;
}
