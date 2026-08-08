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
  const formatted = rawList.map(t => capitalize(evalStr(t))).filter(Boolean);
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

export function formatTargetText(targetObj, formattedRange, evalStr, isAttack = false) {
  if (!targetObj) return '';
  const cleanRange = formattedRange.replace(/^(range|reach)\s*/i, '').trim();

  const filterSingular = formatFilterText(targetObj.filter, evalStr, false);
  const filterPlural = formatFilterText(targetObj.filter, evalStr, true);

  if (targetObj.aoe) {
    const shape = capitalize(evalStr(targetObj.aoe.shape || 'sphere'));
    const size = evalStr(targetObj.aoe.size || '');
    let rangePart = '';
    if (cleanRange.toLowerCase() === 'self') {
      rangePart = ' centered on you';
    } else if (cleanRange) {
      rangePart = ` centered on a point within ${cleanRange}`;
    }
    return `, each ${filterSingular} in a ${size}-foot-radius ${shape}${rangePart}`;
  }

  const type = (evalStr(targetObj.type) || '').toLowerCase();
  const countRaw = targetObj.count !== undefined ? evalStr(targetObj.count) : '';
  const countNum = parseInt(countRaw, 10);

  if (type === 'multiple' || type === 'multi' || (!isNaN(countNum) && countNum > 1)) {
    const cntStr = countRaw || String(countNum);
    const noun = targetObj.filter
      ? (cntStr === '1' ? filterSingular : filterPlural)
      : (cntStr === '1' ? 'target' : 'targets');
    return `, up to ${cntStr} ${noun}`;
  }

  if (isAttack) {
    return '';
  }

  if (cleanRange) {
    const lowerRange = cleanRange.toLowerCase();
    if (lowerRange === 'self') {
      return '';
    }
    // Handle Touch targets cleanly ("one creature you touch")
    if (lowerRange === 'touch') {
      return `, one ${filterSingular} you touch`;
    }
    return `, one ${filterSingular} within ${cleanRange}`;
  }

  return '';
}

/**
 * Formats a single mechanic block or multi-block into Markdown string representation
 */
export function formatBlock(block, activity, evaluator, scope) {
  if (!block || typeof block !== 'object') return '';

  const effectiveScope = {
    range: activity.range || '',
    duration: activity.duration || '',
    ...(activity.variables || {}),
    ...(scope || {})
  };

  const evalStr = (val) => {
    if (val === null || val === undefined) return '';
    let strVal = String(val);
    if (strVal === '$(range)' || strVal === 'range') return activity.range || '';
    if (strVal.includes('$(range)')) strVal = strVal.replace(/\$\(range\)/g, activity.range || '');
    if (strVal.includes('$')) {
      const res = evaluator.evaluate(strVal, effectiveScope);
      return res !== undefined && res !== null ? String(res) : strVal;
    }
    return strVal;
  };

  const formatDiceObj = (diceVal) => {
    if (!diceVal) return '';
    if (typeof diceVal === 'object' && diceVal !== null) {
      const cnt = diceVal.count !== undefined ? evalStr(diceVal.count) : '';
      const sds = diceVal.sides !== undefined ? evalStr(diceVal.sides) : '';
      const rawBns = (diceVal.bonus !== undefined && diceVal.bonus !== null) ? evaluator.evaluate(diceVal.bonus, effectiveScope) : 0;
      const numBns = typeof rawBns === 'number' ? rawBns : Number(rawBns);
      const bnsStr = !isNaN(numBns) && numBns !== 0
        ? formatBonus(numBns)
        : (rawBns && rawBns !== 0 && rawBns !== '0' ? `+${rawBns}` : '');

      if (cnt && sds && Number(sds) > 0) {
        return `${cnt}d${sds}${bnsStr}`;
      } else if (rawBns || bnsStr) {
        return bnsStr.replace(/^\+/, '') || String(rawBns);
      } else if (cnt) {
        return String(cnt);
      }
    }
    return evalStr(diceVal);
  };

  const pattern = block.pattern;
  const trigger = block.trigger ? evalStr(block.trigger) : null;
  const text = block.text ? evalStr(block.text) : '';
  const rangeVal = block.target?.range || activity.range || '';
  const formattedRange = formatDistance(evalStr(rangeVal));

  // Build main body for the pattern first
  let mainBody = '';

  // 1. ATTACK PATTERN
  if (pattern === 'attack' && block.attack) {
    const classif = capitalize(evalStr(block.attack.classification || 'melee'));
    const rawBonus = evaluator.evaluate(block.attack.bonus || '$(attributes.spellcasting.attack)', effectiveScope);
    const numBonus = typeof rawBonus === 'number' ? rawBonus : Number(rawBonus);
    const bonusStr = !isNaN(numBonus) ? formatBonus(numBonus) : evalStr(block.attack.bonus || '$(attributes.spellcasting.attack)');

    let hitText = '';
    if (block.damage) {
      const dmgList = Array.isArray(block.damage) ? block.damage : [block.damage];
      const parts = dmgList.map(d => {
        const dDice = formatDiceObj(d.dice);
        const dType = formatDamageType(d.type, evalStr);
        const typeStr = dType ? ` ${dType}` : '';
        return `${dDice}${typeStr} damage`.trim();
      }).filter(Boolean);
      if (parts.length > 0) {
        hitText = `_Hit_: ${parts.join(' plus ')}.`.replace(/\s+/g, ' ');
      }
    }

    const targetDesc = formatTargetText(block.target, formattedRange, evalStr, true);

    const rangeOutput = formattedRange.startsWith('reach') || formattedRange.startsWith('range')
      ? formattedRange
      : `range ${formattedRange}`;

    const rawRange = rangeOutput.replace(/\.+$/, '');
    mainBody = `_${classif} Attack Roll_: ${bonusStr}, ${rawRange}${targetDesc}. ${hitText}${text ? ` ${text}` : ''}`;
  }

  // 2. SAVE PATTERN
  else if (pattern === 'save' && block.save) {
    const abilityKey = (evalStr(block.save.ability) || 'dex').toLowerCase();
    const fullAbility = ABILITY_NAMES[abilityKey] || capitalize(abilityKey);
    const dcVal = evalStr(block.save.dc || '$(attributes.spellcasting.save)');

    const targetDesc = formatTargetText(block.target, formattedRange, evalStr);

    let failText = '';
    if (block.save.failure) {
      if (block.save.failure.damage) {
        const dmgList = Array.isArray(block.save.failure.damage) ? block.save.failure.damage : [block.save.failure.damage];
        const parts = dmgList.map(d => {
          const dDice = formatDiceObj(d.dice);
          const dType = formatDamageType(d.type, evalStr);
          const typeStr = dType ? ` ${dType}` : '';
          return `${dDice}${typeStr} damage`.trim();
        }).filter(Boolean);
        if (parts.length > 0) {
          const addText = block.save.failure.text ? ` ${evalStr(block.save.failure.text)}` : '';
          failText = ` _Failure_: ${parts.join(' plus ')}.${addText}`.replace(/\s+/g, ' ');
        }
      } else if (block.save.failure.text) {
        failText = ` _Failure_: ${evalStr(block.save.failure.text)}`;
      }
    }

    let successText = '';
    if (block.save.success?.text) {
      const sText = evalStr(block.save.success.text);
      successText = ` _Success_: ${capitalize(sText)}.`;
    }

    mainBody = `_${fullAbility} Saving Throw_: DC ${dcVal}${targetDesc}.${failText}${successText}${text ? ` ${text}` : ''}`.replace(/\.\./g, '.');
  }

  // 3. HEALING PATTERN
  else if (pattern === 'healing' && block.healing) {
    const targetDesc = formatTargetText(block.target, formattedRange, evalStr);
    const targetLabel = targetDesc ? targetDesc.replace(/^,\s*/, '') : 'Self';

    const diceStr = formatDiceObj(block.healing.dice);
    const typeLabel = block.healing.type === 'tempHitPoints' ? 'Temporary Hit Points' : 'Hit Points';
    mainBody = `_Healing_: ${targetLabel}, ${diceStr} ${typeLabel}.${text ? ` ${text}` : ''}`;
  }

  // 4. UTILITY PATTERN
  else if (pattern === 'utility') {
    let extraDamage = '';
    if (block.damage) {
      const dDice = formatDiceObj(block.damage.dice);
      const dType = formatDamageType(block.damage.type, evalStr);
      const typeStr = dType ? ` ${dType}` : '';
      extraDamage = `Deal ${dDice}${typeStr} damage. `;
    }

    const effectiveText = text.trim() || (activity.summary ? evalStr(activity.summary).trim() : '');
    let rangeText = '';

    const rawRange = evalStr(block.target?.range || activity.range || '').trim();
    if (rawRange && !/^self$/i.test(rawRange)) {
      rangeText = ` _Range_: ${capitalize(rawRange)}.`;
    }

    const textPart = `${extraDamage}${effectiveText}`.trim();
    mainBody = `${textPart}${rangeText}`.trim();
  }

  else {
    mainBody = text || '';
  }

  // If there's a trigger, prefix as Response - [Pattern Header]:
  if (trigger) {
    const cleanBody = mainBody.trim().replace(/\.$/, '');
    return `_Trigger_: ${trigger}. _Response_: ${cleanBody}.`;
  }

  return mainBody.trim();
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

  // Helper to format extra entries
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

  // Fallback if mechanic is missing
  if (!mechanic) {
    const fallbackText = (activity.description || activity.summary || '').split('\n')[0].trim();
    return `**${name}.** ${fallbackText}${fullSuffix}`;
  }

  // Multi-block handling
  if (mechanic.mode) {
    const blocks = Array.isArray(mechanic.blocks) ? mechanic.blocks : [];
    if (mechanic.mode === 'choice') {
      const preamble = mechanic.text
        ? evaluator.evaluate(String(mechanic.text), scope).trim()
        : '';
      const preamblePart = preamble ? ` ${preamble}` : '';
      const choiceLines = blocks.map(b => {
        const title = b.name ? `**${b.name}**: ` : '';
        const content = formatBlock(b, activity, evaluator, scope);
        return `> ${title}${content}`;
      }).join('\n\n');
      return `**${name}.**${preamblePart}${fullSuffix}\n\n${choiceLines}`;
    } else {
      // succession
      const contentParts = blocks.map(b => formatBlock(b, activity, evaluator, scope)).filter(Boolean);
      return `**${name}.** ${contentParts.join(' ')}${fullSuffix}`;
    }
  }

  // Single block handling
  const content = formatBlock(mechanic, activity, evaluator, scope);
  return `**${name}.** ${content}${fullSuffix}`;
}
