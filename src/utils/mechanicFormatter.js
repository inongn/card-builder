import { ExpressionEvaluator } from '../engine/ExpressionEvaluator.js';
import { formatBonus } from '../engine/helpers.js';

const ABILITY_NAMES = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma'
};

const PAYLOAD_ORDER = {
  damage: 1,
  movement: 2,
  condition: 3,
  statModifier: 4,
  rollModifier: 5,
  text: 6,
  action: 7
};

function getPayloadType(p) {
  if (!p || typeof p !== 'object') return 'text';
  if (p.type) return p.type;
  if (p.dice) return 'damage';
  return 'text';
}

function getPayloadRank(p) {
  const t = getPayloadType(p);
  return PAYLOAD_ORDER[t] || 6;
}

export function formatDistance(distStr) {
  if (!distStr) return '';
  const str = String(distStr).trim();
  if (/^5\s*feet$/i.test(str)) return 'reach 5 feet';
  if (/^touch$/i.test(str)) return 'reach Touch';
  if (/^self$/i.test(str)) return 'range Self';
  return str.replace(/\bfeet\b/gi, 'feet').replace(/\bfoot\b/gi, 'feet');
}

export function capitalize(str) {
  if (!str || typeof str !== 'string') return str || '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDamageType(typeVal, evalStr) {
  if (!typeVal) return '';
  const rawList = Array.isArray(typeVal) ? typeVal : [typeVal];
  const formatted = rawList.map(t => {
    const s = evalStr(t);
    return s === 'damage' ? '' : capitalize(s);
  }).filter(Boolean);
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

  return formattedList.map(s => {
    const evalS = String(s).trim();
    if (plural) {
      const lower = evalS.toLowerCase();
      if (lower === 'creature') return 'creatures';
      if (lower === 'undead') return 'Undead';
      if (lower.endsWith('s')) return capitalize(evalS);
      return `${capitalize(evalS)}s`;
    }
    return capitalize(evalS);
  }).join(' or ');
}

export function formatTargetText(targetObj, formattedRange, evalStr, isAttack = false, activity = null) {
  if (!targetObj) return '';
  const cleanRange = formattedRange.replace(/^(range|reach)\s*/i, '').trim();

  const filterSingular = formatFilterText(targetObj.filter, evalStr, false);
  const filterPlural = formatFilterText(targetObj.filter, evalStr, true);

  if (targetObj.aoe) {
    const shape = capitalize(evalStr(targetObj.aoe.shape || 'sphere'));
    const size = evalStr(targetObj.aoe.size || '');
    let rangePart = '';
    const lowerRange = cleanRange.toLowerCase();

    if (targetObj.inherit === 'trigger' || targetObj.inherit === 'previous' || lowerRange === 'inherit') {
      rangePart = ' centered on the target';
    } else if (lowerRange === 'self' || targetObj.aoe.shape === 'emanation') {
      rangePart = shape.toLowerCase() === 'line' ? ' originating from you' : ' centered on you';
    } else if (cleanRange) {
      rangePart = ` centered on a point within ${cleanRange}`;
    }
    const isLine = shape.toLowerCase() === 'line';
    const isWall = shape.toLowerCase() === 'wall';
    const sizePhrase = (isLine || isWall) ? `${size}-foot ${shape}` : `${size}-foot-radius ${shape}`;
    return `, each ${filterSingular} in a ${sizePhrase}${rangePart}`;
  }

  if (targetObj.inherit === 'trigger') {
    if (activity?.id === 'hellishRebuke' || (activity?.name || '').toLowerCase() === 'hellish rebuke') {
      return ', the attacker';
    }
    return ', the target';
  }
  if (targetObj.inherit) {
    return '';
  }

  const type = (evalStr(targetObj.type) || '').toLowerCase();
  const countRaw = targetObj.count !== undefined ? evalStr(targetObj.count) : '';
  const countNum = parseInt(countRaw, 10);

  if (type === 'multiple' || type === 'multi' || (!isNaN(countNum) && countNum > 1)) {
    const rangePart = cleanRange && !/^self$/i.test(cleanRange) ? ` within ${cleanRange}` : '';
    if (!countRaw || isNaN(countNum)) {
      return `, ${filterPlural} of your choice${rangePart}`;
    }
    const cntStr = countRaw || String(countNum);
    const noun = targetObj.filter
      ? (cntStr === '1' ? filterSingular : filterPlural)
      : (cntStr === '1' ? 'target' : 'targets');
    return `, up to ${cntStr} ${noun}${rangePart}`;
  }

  if (isAttack) {
    return '';
  }

  if (cleanRange) {
    const lowerRange = cleanRange.toLowerCase();
    if (lowerRange === 'self') {
      return '';
    }
    if (lowerRange === 'touch') {
      return `, one ${filterSingular} you touch`;
    }
    if (/\b(in the area|within)\b/i.test(filterSingular)) {
      return `, one ${filterSingular}`;
    }
    return `, one ${filterSingular} within ${cleanRange}`;
  }

  return '';
}

const TRIGGER_EVENT_MAP = {
  on_cast: "the area is created",
  enter_area: "a creature enters the area",
  area_moves_into_space: "the area moves into a creature's space",
  move_into_space: "the area moves into a creature's space",
  start_turn: "starts its turn there",
  end_turn: "ends its turn there",
  leave_area: "leaves the area",
  move_within_range: "a creature moves within range"
};

export function formatTrigger(trigger, evalStr) {
  if (!trigger) return '';
  if (typeof trigger === 'string') return evalStr(trigger);
  if (typeof trigger === 'object') {
    if (trigger.text) return evalStr(trigger.text);
    if (trigger.event) {
      const rawEvents = Array.isArray(trigger.event) ? trigger.event : [trigger.event];
      const auraKeys = ['on_cast', 'enter_area', 'area_moves_into_space', 'move_into_space', 'start_turn', 'end_turn', 'leave_area', 'move_within_range'];
      const hasAuraEvents = rawEvents.some(e => auraKeys.includes(e));
      if (hasAuraEvents) {
        const parts = rawEvents.map(e => TRIGGER_EVENT_MAP[e] || e.replace(/_/g, ' '));
        if (parts.length === 1) {
          return `When ${parts[0]}`;
        }
        return `When ${parts.slice(0, -1).join(', ')}, or ${parts[parts.length - 1]}`;
      }
      const hasFailCheckSave = rawEvents.includes('fail_check') || rawEvents.includes('failCheck') || rawEvents.includes('fail_save') || rawEvents.includes('failSave');
      if (hasFailCheckSave) {
        const events = [];
        if (rawEvents.some(e => e === 'failCheck' || e === 'fail_check')) events.push('an ability check');
        if (rawEvents.some(e => e === 'failSave' || e === 'fail_save')) events.push('saving throw');
        return `When you or a creature you can see fails ${events.join(' or ')}`;
      }
      const eventNames = rawEvents.map(e => e.replace(/_/g, ' ').replace(/\bbe hit\b/gi, 'are hit with an attack').replace(/\bland crit\b/gi, 'are hit with a critical hit')).join(' or ');
      return `When you ${eventNames}`;
    }
  }
  return '';
}

export function formatRepeat(repeat, pattern, evalStr) {
  if (!repeat) return '';
  let rawAction = '';
  if (typeof repeat === 'string') {
    rawAction = repeat;
    if (!['action', 'bonus_action', 'bonusaction', 'free_action', 'freeaction', 'reaction'].includes(rawAction.toLowerCase())) {
      return ` _Repeat_: ${evalStr(repeat)}.`;
    }
  } else if (typeof repeat === 'object') {
    if (repeat.text) return ` _Repeat_: ${evalStr(repeat.text)}.`;
    if (repeat.action) rawAction = repeat.action;
  }

  if (!rawAction) return '';

  let actionName = 'action';
  const lower = rawAction.toLowerCase();
  if (lower === 'bonus_action' || lower === 'bonusaction') actionName = 'Bonus Action';
  else if (lower === 'action') actionName = 'action';
  else if (lower === 'free_action' || lower === 'freeaction') actionName = 'free action';
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

export function formatPayload(payload, evalStr, formatDiceObj) {
  if (!payload) return '';
  if (typeof payload === 'string') return evalStr(payload);
  if (payload.type === 'text' || (!payload.type && payload.text)) {
    let txt = evalStr(payload.text).trim();
    if (txt) {
      txt = txt.charAt(0).toLowerCase() + txt.slice(1);
      txt = txt.replace(/\b(?<!the\s)target\b/gi, 'the target');
      txt = txt.replace(/\.$/, '');
      return txt;
    }
  }

  const type = payload.type;

  if (type === 'damage' || (!type && payload.dice)) {
    const dDice = formatDiceObj(payload.dice, payload.min, evalStr);
    const rawType = payload.type === 'damage' ? payload.damageType : (payload.damageType || payload.type);
    const dType = formatDamageType(rawType, evalStr);
    const typeStr = dType ? ` ${dType}` : '';
    return dDice ? `${dDice}${typeStr} damage`.trim() : 'damage'.trim();
  }

  if (type === 'condition') {
    const rawCond = Array.isArray(payload.condition) ? payload.condition : [payload.condition];
    const formattedCond = rawCond.map(c => capitalize(evalStr(c))).join(' and ');
    let condBase = formattedCond.toLowerCase() === 'prone' ? 'knocked Prone' : `given the ${formattedCond} condition`;

    if (payload.end) {
      let endText = '';
      if (typeof payload.end === 'string') {
        if (payload.end === 'take_damage' || payload.end === 'damage') {
          endText = ' (ends if target takes damage)';
        } else if (payload.end === 'repeat_save_on_damage') {
          endText = ' (repeats save whenever it takes damage)';
        } else if (payload.end === 'action_check') {
          endText = ' (ends if target uses an Action to escape)';
        } else if (payload.end === 'turn_repeat_save') {
          endText = ' (repeats save at end of each turn)';
        } else if (payload.end === 'end_of_its_next_turn') {
          endText = ' until the end of its next turn';
        } else if (payload.end === 'end_of_your_next_turn') {
          endText = ' until the end of your next turn';
        } else if (payload.end === 'end_of_next_turn') {
          endText = ' until the end of next turn';
        }
      } else if (typeof payload.end === 'object' && payload.end.text) {
        endText = ` (${evalStr(payload.end.text)})`;
      }
      condBase += endText;
    }
    return condBase;
  }

  if (type === 'rollModifier') {
    const modType = payload.modifierType || 'advantage';
    const rawRolls = Array.isArray(payload.targetRolls) ? payload.targetRolls : [payload.targetRolls || 'roll'];
    const rollNames = {
      attack: 'attack',
      check: 'ability check',
      abilityCheck: 'ability check',
      save: 'saving throw',
      savingThrow: 'saving throw',
      dmg: 'damage'
    };
    const rollsStr = rawRolls.map(r => rollNames[evalStr(r)] || evalStr(r)).join(' or ');

    if (modType === 'advantage') return `gain Advantage on your next ${rollsStr} roll`;
    if (modType === 'disadvantage') return `target has Disadvantage on its next ${rollsStr} roll`;
    if (modType === 'attacksAgainstAdvantage') return `attack rolls against target have Advantage`;
    if (modType === 'attacksAgainstDisadvantage') return `attack rolls against target have Disadvantage`;
    
    const formulaStr = formatDiceObj(payload.dice || payload.formula, undefined, evalStr);
    if (modType === 'add') return `add ${formulaStr} to an ${rollsStr}`;
    if (modType === 'subtract') return `subtract ${formulaStr} from an ${rollsStr}`;
  }

  if (type === 'movement') {
    const dir = payload.direction || 'push';
    const distStr = payload.distance ? `${evalStr(payload.distance)} feet` : '5 feet';
    if (payload.movementType === 'forced') {
      if (dir === 'push') return `pushed up to ${distStr} away`;
      if (dir === 'pull') return `pulled up to ${distStr} closer`;
      return `moved up to ${distStr}`;
    }
    const opportStr = payload.provokesOpportunityAttacks === false ? ' without provoking Opportunity Attacks' : '';
    return `move up to ${distStr}${opportStr}`;
  }

  if (type === 'statModifier') {
    const rawStat = (payload.stat || 'Speed').toLowerCase();
    const statName = rawStat === 'ac' ? 'AC' : capitalize(rawStat);
    const rawVal = evalStr(payload.value);
    const numVal = Number(rawVal);
    const isNeg = !isNaN(numVal) && numVal < 0;
    const absVal = !isNaN(numVal) ? Math.abs(numVal) : rawVal;
    
    if (payload.operation === 'set') {
      return `target's base ${statName} becomes ${rawVal}`;
    }
    if (payload.operation === 'subtract' || isNeg) {
      return `target's ${statName} is reduced by ${absVal}${rawStat === 'speed' ? ' feet' : ''}`;
    }
    return `target's ${statName} is increased by ${absVal}${rawStat === 'speed' ? ' feet' : ''}`;
  }

  if (type === 'action') {
    if (payload.actionType === 'attack') {
      return 'take an additional weapon attack';
    }
    if (payload.actionType === 'general') {
      return 'take one additional action, except the Magic action';
    }
    return `take an ${payload.actionType || 'action'}`;
  }

  if (type === 'transform') {
    const stats = Array.isArray(payload.statblock) ? payload.statblock.join(' or ') : payload.statblock;
    return `transform into a ${stats}`;
  }

  if (type === 'summon') {
    const stats = Array.isArray(payload.statblock) ? payload.statblock.join(' or ') : payload.statblock;
    return `summon ${stats}`;
  }

  return '';
}

export function formatPayloadList(payloadList, evalStr, formatDiceObj) {
  if (!payloadList) return '';
  const rawList = Array.isArray(payloadList) ? payloadList : [payloadList];

  const sortedList = [...rawList].sort((a, b) => getPayloadRank(a) - getPayloadRank(b));

  let damageStr = '';
  const targetIsPhrases = [];
  const otherParts = [];
  let actionStr = '';

  sortedList.forEach(p => {
    if (!p) return;
    if (typeof p === 'string') {
      otherParts.push(evalStr(p));
      return;
    }
    const type = getPayloadType(p);

    if (type === 'damage' || (!type && p.dice)) {
      const formattedDmg = formatPayload(p, evalStr, formatDiceObj);
      if (formattedDmg) {
        damageStr = damageStr ? `${damageStr} plus ${formattedDmg}` : formattedDmg;
      }
    } else if (type === 'movement') {
      if (p.movementType === 'forced' || p.direction === 'push' || p.direction === 'pull') {
        const dir = p.direction || 'push';
        const dist = p.distance ? `${evalStr(p.distance)} feet` : '5 feet';
        if (dir === 'push') targetIsPhrases.push(`pushed up to ${dist} away`);
        else if (dir === 'pull') targetIsPhrases.push(`pulled up to ${dist} closer`);
        else targetIsPhrases.push(`moved up to ${dist}`);
      } else {
        const formattedMove = formatPayload(p, evalStr, formatDiceObj);
        if (formattedMove) otherParts.push(formattedMove);
      }
    } else if (type === 'condition') {
      const formattedCondStr = formatPayload(p, evalStr, formatDiceObj);
      if (formattedCondStr) {
        targetIsPhrases.push(formattedCondStr);
      }
    } else if (type === 'action') {
      actionStr = formatPayload(p, evalStr, formatDiceObj);
    } else {
      const formatted = formatPayload(p, evalStr, formatDiceObj);
      if (formatted) otherParts.push(formatted);
    }
  });

  const clauseParts = [];
  if (damageStr) clauseParts.push(damageStr);

  if (targetIsPhrases.length > 0) {
    const joinedTarget = targetIsPhrases.length === 1
      ? targetIsPhrases[0]
      : `${targetIsPhrases.slice(0, -1).join(', ')} and ${targetIsPhrases[targetIsPhrases.length - 1]}`;

    if (damageStr) {
      clauseParts.push(`the target is ${joinedTarget}`);
    } else {
      const hasConditionJoined = joinedTarget.replace(/given the ([^)]+?) condition/g, 'has the $1 condition');
      clauseParts.push(`target ${hasConditionJoined}`);
    }
  }

  if (otherParts.length > 0) {
    clauseParts.push(...otherParts);
  }

  if (actionStr) {
    clauseParts.push(actionStr);
  }

  if (clauseParts.length === 0) return '';
  if (clauseParts.length === 1) return clauseParts[0];
  if (clauseParts.length === 2) return `${clauseParts[0]}, and ${clauseParts[1]}`;
  return `${clauseParts.slice(0, -1).join(', ')}, and ${clauseParts[clauseParts.length - 1]}`;
}

export function formatBlock(block, activity, evaluator, scope) {
  if (!block) return '';

  const effectiveScope = {
    range: activity?.range || '',
    duration: activity?.duration || '',
    summary: activity?.summary || '',
    description: activity?.description || '',
    ...(activity?.variables || {}),
    ...(scope || {})
  };

  const evalStr = (val) => {
    if (val === null || val === undefined) return '';
    let strVal = String(val);
    if (strVal === '$(range)' || strVal === 'range') return activity?.range || '';
    if (strVal.includes('$(range)')) strVal = strVal.replace(/\$\(range\)/g, activity?.range || '');
    if (strVal === '$(summary)' || strVal === 'summary') return activity?.summary || activity?.description || '';
    if (strVal.includes('$(summary)')) strVal = strVal.replace(/\$\(summary\)/g, activity?.summary || activity?.description || '');
    if (strVal === '$(description)' || strVal === 'description') return (activity?.description || activity?.summary || '').trim();
    if (strVal.includes('$(description)')) strVal = strVal.replace(/\$\(description\)/g, (activity?.description || activity?.summary || '').trim());
    if (strVal.includes('$')) {
      const res = evaluator.evaluate(strVal, effectiveScope);
      return res !== undefined && res !== null ? String(res) : strVal;
    }
    return strVal;
  };

  const formatRange = (range, evalFn) => formatDistance(evalFn(range));
  const formatDiceObj = (diceVal, payloadMin, evalFn) => {
    const fnEval = evalFn || evalStr;
    if (!diceVal) return '';
    if (typeof diceVal === 'number' || typeof diceVal === 'string') {
      return String(fnEval(diceVal));
    }
    if (typeof diceVal === 'object') {
      const cnt = diceVal.count !== undefined ? fnEval(diceVal.count) : '';
      const sds = diceVal.sides !== undefined ? fnEval(diceVal.sides) : '';
      const rawBns = (diceVal.bonus !== undefined && diceVal.bonus !== null) ? evaluator.evaluate(diceVal.bonus, effectiveScope) : 0;
      const numBns = typeof rawBns === 'number' ? rawBns : Number(rawBns);
      const bnsStr = !isNaN(numBns) && numBns !== 0
        ? formatBonus(numBns)
        : (diceVal.bonus ? fnEval(diceVal.bonus) : '');

      let minSuffix = '';
      const minPerDie = diceVal.min !== undefined ? evaluator.evaluate(diceVal.min, effectiveScope) : null;
      const totalMinOverride = payloadMin !== undefined ? evaluator.evaluate(payloadMin, effectiveScope) : null;

      if (minPerDie !== null && minPerDie !== undefined && minPerDie !== '') {
        const numCnt = Number(cnt) || 1;
        const numMinDie = Number(minPerDie) || 0;
        const totalCrunchedMin = (numCnt * numMinDie) + (numBns || 0);
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

  // 1. ATTACK PATTERN
  if (pattern === 'attack' && block.attack) {
    const classif = capitalize(evalStr(block.attack.classification || 'melee'));
    const rawBonus = evaluator.evaluate(block.attack.bonus || '$(attributes.spellcasting.attack)', effectiveScope);
    const numBonus = typeof rawBonus === 'number' ? rawBonus : Number(rawBonus);
    const bonusStr = !isNaN(numBonus) ? formatBonus(numBonus) : evalStr(block.attack.bonus || '$(attributes.spellcasting.attack)');

    let hitText = '';
    const hitObj = block.hit || block.damage;
    if (hitObj) {
      let formattedHit = formatPayloadList(hitObj, evalStr, formatDiceObj);
      if (block.hitOrMiss) {
        const formattedHitOrMiss = formatPayloadList(block.hitOrMiss, evalStr, formatDiceObj);
        if (formattedHitOrMiss) formattedHit = `${formattedHit}, and ${formattedHitOrMiss}`;
      }
      if (formattedHit) hitText = ` _Hit_: ${formattedHit}.`;
    }

    let missText = '';
    if (block.miss) {
      let formattedMiss = formatPayloadList(block.miss, evalStr, formatDiceObj);
      if (formattedMiss) {
        formattedMiss = formattedMiss.charAt(0).toUpperCase() + formattedMiss.slice(1);
        missText = ` _Miss_: ${formattedMiss}.`;
      }
    }

    let critText = '';
    if (block.crit) {
      let formattedCrit = formatPayloadList(block.crit, evalStr, formatDiceObj);
      if (formattedCrit) {
        formattedCrit = formattedCrit.charAt(0).toUpperCase() + formattedCrit.slice(1);
        critText = ` _Critical Hit_: ${formattedCrit}.`;
      }
    }

    const targetDesc = formatTargetText(block.target, formattedRange, evalStr, true, activity);

    const rangeOutput = formattedRange.startsWith('reach') || formattedRange.startsWith('range')
      ? formattedRange
      : `range ${formattedRange}`;

    const rawRangeStr = rangeOutput.replace(/\.+$/, '');
    mainBody = `_${classif} Attack Roll_: ${bonusStr}, ${rawRangeStr}${targetDesc}.${hitText}${missText}${critText}${text ? ` ${text}` : ''}`;
  }

  // 2. SAVE PATTERN
  else if (pattern === 'save' && block.save) {
    const abilityKey = (evalStr(block.save.ability) || 'dex').toLowerCase();
    const fullAbility = ABILITY_NAMES[abilityKey] || capitalize(abilityKey);
    const dcVal = evalStr(block.save.dc || '$(attributes.spellcasting.save)');

    const targetDesc = formatTargetText(block.target, formattedRange, evalStr, false, activity);

    let alwaysText = '';
    if (block.failureOrSuccess) {
      const formattedAlways = formatPayloadList(block.failureOrSuccess, evalStr, formatDiceObj);
      if (formattedAlways) alwaysText = ` _Failure or Success_: ${formattedAlways}.`;
    }

    let failText = '';
    if (block.failure) {
      let formattedFail = formatPayloadList(block.failure, evalStr, formatDiceObj);
      if (formattedFail) {
        formattedFail = formattedFail.charAt(0).toUpperCase() + formattedFail.slice(1);
        failText = ` _Failure_: ${formattedFail}.`;
      }
    }

    let successText = '';
    if (block.success) {
      if (typeof block.success === 'object') {
        const parts = [];
        if (block.success.halfDamage) parts.push('half damage');
        if (block.success.payloads) {
          const payloadStr = formatPayloadList(block.success.payloads, evalStr, formatDiceObj);
          if (payloadStr) parts.push(payloadStr);
        }
        if (block.success.text) parts.push(evalStr(block.success.text));
        if (parts.length > 0) {
          let sText = parts.join(', ');
          successText = ` _Success_: ${sText.charAt(0).toUpperCase() + sText.slice(1)}.`;
        }
      } else {
        let formattedSucc = formatPayloadList(block.success, evalStr, formatDiceObj);
        if (formattedSucc) {
          formattedSucc = formattedSucc.charAt(0).toUpperCase() + formattedSucc.slice(1);
          successText = ` _Success_: ${formattedSucc}.`;
        }
      }
    }

    mainBody = `_${fullAbility} Saving Throw_: DC ${dcVal}${targetDesc}.${alwaysText}${failText}${successText}${text ? ` ${text}` : ''}`.replace(/\.\./g, '.');
  }

  // 3. HEALING PATTERN
  else if (pattern === 'healing' && block.healing) {
    const targetDesc = formatTargetText(block.target, formattedRange, evalStr, false, activity);
    const targetLabel = targetDesc ? targetDesc.replace(/^,\s*/, '') : 'Self';
    const diceStr = formatDiceObj(block.healing.dice, undefined, evalStr);
    const typeLabel = block.healing.type === 'tempHitPoints' ? 'Temporary Hit Points' : 'Hit Points';
    const poolSuffix = block.healing.pool ? ' divided among targets' : '';
    mainBody = `_Healing_: ${targetLabel.charAt(0).toUpperCase() + targetLabel.slice(1)}, ${diceStr} ${typeLabel}${poolSuffix}.${text ? ` ${text}` : ''}`;
  }

  // 4. AUTOMATIC PATTERN
  else if (pattern === 'automatic' || pattern === 'utility') {
    let payloadText = '';
    const payloadObj = block.payloads || block.damage;
    if (payloadObj) {
      payloadText = formatPayloadList(payloadObj, evalStr, formatDiceObj);
    }

    const explicitText = text.trim();
    let rawCombinedText = '';
    if (payloadText && explicitText) {
      rawCombinedText = `${payloadText} ${explicitText}`;
    } else if (payloadText) {
      rawCombinedText = payloadText;
    } else if (explicitText) {
      rawCombinedText = explicitText;
    }

    const targetType = (evalStr(block.target?.type) || '').toLowerCase();
    const countRaw = block.target?.count !== undefined ? evalStr(block.target.count) : '';
    const countNum = parseInt(countRaw, 10);

    let bodyStr = rawCombinedText;
    if (block.target?.aoe) {
      const shape = capitalize(evalStr(block.target.aoe.shape || 'sphere'));
      const size = evalStr(block.target.aoe.size || '');
      const rawRangeVal = evalStr(block.target?.range || activity?.range || '').trim();
      const isLine = shape.toLowerCase() === 'line';
      const isWall = shape.toLowerCase() === 'wall';
      const sizePhrase = (isLine || isWall) ? `${size}-foot ${shape}` : `${size}-foot-radius ${shape}`;
      const rangePart = rawRangeVal && !/^self$/i.test(rawRangeVal) ? ` centered on a point within ${rawRangeVal}` : '';
      bodyStr = `A ${sizePhrase}${rangePart} ${rawCombinedText.charAt(0).toLowerCase() + rawCombinedText.slice(1)}`;
    } else if (targetType === 'multiple' || (!isNaN(countNum) && countNum > 1)) {
      const cntStr = countRaw || String(countNum);
      const targetRange = evalStr(block.target?.range || activity?.range || '');
      const rangePart = targetRange && !/^self$/i.test(targetRange) ? ` within ${targetRange}` : '';
      
      if (rawCombinedText.toLowerCase().startsWith('add ')) {
        bodyStr = `Up to ${cntStr} targets${rangePart} add ${rawCombinedText.slice(4)}`;
      } else if (rawCombinedText.toLowerCase().startsWith('increase ')) {
        bodyStr = `Up to ${cntStr} targets${rangePart} increase ${rawCombinedText.slice(9)}`;
      } else if (rawCombinedText.toLowerCase().startsWith('gain ') || rawCombinedText.toLowerCase().startsWith('gains ')) {
        bodyStr = `Up to ${cntStr} targets${rangePart} gain ${rawCombinedText.replace(/^(gains?)\s+/i, '')}`;
      } else if (rawCombinedText.toLowerCase().startsWith('targets gain ') || rawCombinedText.toLowerCase().startsWith('targets gains ')) {
        bodyStr = `Up to ${cntStr} targets${rangePart} gain ${rawCombinedText.replace(/^(targets\s+gains?)\s+/i, '')}`;
      } else if (rawCombinedText.toLowerCase().startsWith('targets add ')) {
        bodyStr = `Up to ${cntStr} targets${rangePart} ${rawCombinedText.slice(8)}`;
      } else if (rawCombinedText.toLowerCase().startsWith('up to ')) {
        bodyStr = rawCombinedText;
      } else {
        bodyStr = `Up to ${cntStr} targets${rangePart} take ${rawCombinedText.charAt(0).toLowerCase() + rawCombinedText.slice(1)} each`;
      }
    } else if (targetType === 'self') {
      const lowerComb = rawCombinedText.toLowerCase();
      if (lowerComb.startsWith('move ')) {
        bodyStr = `You can ${rawCombinedText.charAt(0).toLowerCase() + rawCombinedText.slice(1)}`;
      } else if (lowerComb.startsWith('take ') || lowerComb.startsWith('gain ') || lowerComb.startsWith('add ')) {
        bodyStr = `You ${rawCombinedText.charAt(0).toLowerCase() + rawCombinedText.slice(1)}`;
      } else {
        bodyStr = rawCombinedText;
      }
    } else if (block.target?.inherit === 'trigger' || targetType === 'trigger') {
      if (rawCombinedText.toLowerCase().includes('damage')) {
        bodyStr = `The target takes an extra ${rawCombinedText.replace(/\s*extra\s+damage/i, ' damage')}`;
      } else {
        const verbFixedText = rawCombinedText
          .replace(/^reroll\b/i, 'rerolls')
          .replace(/^subtract\b/i, 'subtracts')
          .replace(/^roll\b/i, 'rolls')
          .replace(/^take\b/i, 'takes')
          .replace(/^add\b/i, 'adds');
        bodyStr = `The target ${verbFixedText}`;
      }
    } else if (targetType === 'single' || targetType === 'creature') {
      const lowerText = rawCombinedText.toLowerCase();
      if (lowerText.startsWith('add ')) {
        bodyStr = `Add ${rawCombinedText.slice(4)} to the triggering roll`;
      } else if (lowerText.startsWith('gains ') || lowerText.startsWith('gain ')) {
        const verbFixed = rawCombinedText.replace(/^(gains?)\s+/i, 'gains ');
        bodyStr = `One target ${verbFixed}`;
      } else if (lowerText.startsWith('takes ') || lowerText.startsWith('take ')) {
        const verbFixed = rawCombinedText.replace(/^(takes?)\s+/i, 'takes ');
        bodyStr = `One target ${verbFixed}`;
      } else if (lowerText.startsWith('receives ') || lowerText.startsWith('receive ')) {
        const verbFixed = rawCombinedText.replace(/^(receives?)\s+/i, 'receives ');
        bodyStr = `One target ${verbFixed}`;
      } else {
        bodyStr = rawCombinedText;
      }
    }

    if (bodyStr) {
      bodyStr = bodyStr.charAt(0).toUpperCase() + bodyStr.slice(1);
    }

    let cleanBody = bodyStr.trim();
    if (cleanBody && !/[.!?]$/.test(cleanBody)) {
      cleanBody = `${cleanBody}.`;
    }

    let rangeText = '';
    const rawRangeVal = evalStr(block.target?.range || activity?.range || '').trim();
    const bodyHasRange = rawRangeVal && (cleanBody.toLowerCase().includes(`within ${rawRangeVal.toLowerCase()}`) || cleanBody.toLowerCase().includes(`range: ${rawRangeVal.toLowerCase()}`));
    if (rawRangeVal && !/^self$/i.test(rawRangeVal) && !bodyHasRange) {
      rangeText = ` _Range_: ${capitalize(rawRangeVal)}.`;
    }

    mainBody = `${cleanBody}${rangeText}`.trim();
  }

  // 5. AURA PATTERN
  else if (pattern === 'aura') {
    const shape = capitalize(evalStr(block.target?.aoe?.shape || 'sphere'));
    const size = evalStr(block.target?.aoe?.size || '');
    const cleanRange = evalStr(block.target?.range || activity?.range || '').trim();
    const isLine = shape.toLowerCase() === 'line';
    const isWall = shape.toLowerCase() === 'wall';
    const isEmanation = shape.toLowerCase() === 'emanation';
    const sizePhrase = (isLine || isWall) ? `${size}-foot ${shape}` : `${size}-foot-radius ${shape}`;
    let locationPhrase = '';
    if (isEmanation || cleanRange.toLowerCase() === 'self') {
      locationPhrase = isLine ? 'originating from you' : 'centered on you';
    } else if (cleanRange) {
      locationPhrase = `centered on a point within ${cleanRange}`;
    }

    let moveStr = '';
    if (block.move) {
      const actionRaw = (block.move.action || 'action').toLowerCase();
      const actionName = (actionRaw === 'bonus_action' || actionRaw === 'bonusaction') ? 'Bonus Action' : 'action';
      const article = /^[aeiou]/i.test(actionName) ? 'an' : 'a';
      const dist = block.move.distance ? evalStr(block.move.distance) : '';
      const distStr = dist ? ` up to ${dist} feet` : '';
      moveStr = ` You can take ${article} ${actionName} to move the area${distStr}.`;
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

    const extraDescriptors = [];
    if (block.difficultTerrain) {
      extraDescriptors.push('creates Difficult Terrain');
    }
    if (block.obscured) {
      extraDescriptors.push('is Heavily Obscured');
    }

    if (extraDescriptors.length > 0) {
      bodyStr += ` and ${extraDescriptors.join(' and ')}`;
    }

    mainBody = `${bodyStr}.${moveStr}`.replace(/\.\./g, '.');
  }

  else {
    mainBody = text || '';
  }

  const repeatText = formatRepeat(block.repeat, pattern, evalStr);

  const isReliable = block.reliable === true;
  const reliableText = isReliable ? ' (does not expend resource on failure)' : '';

  let resultBody = mainBody.trim();
  if (resultBody && !/[.!?]$/.test(resultBody) && !resultBody.endsWith('.')) {
    resultBody = `${resultBody}${reliableText}.`;
  } else if (reliableText) {
    resultBody = resultBody.replace(/\.$/, `${reliableText}.`);
  }
  if (repeatText) {
    resultBody = `${resultBody}${repeatText}`;
  }

  if (triggerStr) {
    const cleanBody = resultBody.replace(/\.$/, '');
    return `_Trigger_: ${triggerStr}. _Response_: ${cleanBody}.`;
  }

  return resultBody;
}

/**
 * Main entry point: formats an Activity node into natural language Markdown for the Activity Sheet
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
    const extraParts = rawExtras.map(item => {
      if (!item) return '';
      if (typeof item === 'object') {
        const rawName = item.name || '';
        if (rawName === 'Using a Higher-Level Spell Slot') return '';
        const evaluatedName = rawName ? evaluator.evaluate(rawName, scope) : '';
        if (evaluatedName === 'Using a Higher-Level Spell Slot') return '';
        const title = evaluatedName ? `_${evaluatedName}_: ` : '';
        const body = item.description ? evaluator.evaluate(item.description, scope) : '';
        return `${title}${body}`.trim();
      }
      const evaluatedStr = evaluator.evaluate(String(item), scope).trim();
      if (evaluatedStr === 'Using a Higher-Level Spell Slot') return '';
      return evaluatedStr;
    }).filter(Boolean);

    if (extraParts.length === 0) return '';
    return '\n\n' + extraParts.map(e => `> ${e}`).join('\n\n');
  };

  const formatDurationSuffix = () => {
    const rawDur = activity.duration ? evaluator.evaluate(String(activity.duration), scope) : '';
    if (!rawDur || typeof rawDur !== 'string') return '';
    const cleanDur = rawDur.trim();
    if (/^instantaneous$/i.test(cleanDur) || cleanDur === '') return '';

    const concMatch = cleanDur.match(/concentration(?:,\s*|\s+)?(?:up to\s+)?(.+)/i);
    if (concMatch) {
      const length = concMatch[1].trim();
      return ` _Concentration_: Up to ${length}.`;
    }

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
      const preamble = mechanic.text
        ? evaluator.evaluate(String(mechanic.text), scope).trim()
        : 'You do one of the following:';
      const preamblePart = preamble ? ` ${preamble}` : '';
      const choiceLines = blocks.map(b => {
        const title = b.name ? `**${b.name}**: ` : '';
        const content = formatBlock(b, activity, evaluator, scope);
        return `> ${title}${content}`;
      }).join('\n\n');
      return `**${name}.**${preamblePart}${fullSuffix}\n\n${choiceLines}`;
    } else {
      const contentParts = blocks.map(b => formatBlock(b, activity, evaluator, scope)).filter(Boolean);
      return `**${name}.** ${contentParts.join(' ')}${fullSuffix}`;
    }
  }

  const content = formatBlock(mechanic, activity, evaluator, scope);
  return `**${name}.** ${content}${fullSuffix}`;
}
