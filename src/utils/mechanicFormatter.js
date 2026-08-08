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

  // If there's a trigger, format as Trigger-Response
  if (trigger) {
    let responseText = text;
    if (pattern === 'attack' && block.damage) {
      const dDice = formatDiceObj(block.damage.dice);
      const dType = block.damage.type ? capitalize(evalStr(block.damage.type)) : '';
      responseText = `the target takes an extra ${dDice} ${dType} damage.`.replace(/\s+/g, ' ');
    }
    return `_Trigger_: ${trigger}. _Response_: ${responseText || text}`;
  }

  // 1. ATTACK PATTERN
  if (pattern === 'attack' && block.attack) {
    const classif = capitalize(evalStr(block.attack.classification || 'melee'));
    const rawBonus = evaluator.evaluate(block.attack.bonus || '$(attributes.spellcasting.attack)', effectiveScope);
    const numBonus = typeof rawBonus === 'number' ? rawBonus : Number(rawBonus);
    const bonusStr = !isNaN(numBonus) ? formatBonus(numBonus) : evalStr(block.attack.bonus || '$(attributes.spellcasting.attack)');

    let hitText = '';
    if (block.damage) {
      const dDice = formatDiceObj(block.damage.dice);
      const dType = block.damage.type ? capitalize(evalStr(block.damage.type)) : '';
      hitText = `_Hit_: ${dDice} ${dType} damage.`.replace(/\s+/g, ' ');
    }

    const rangeOutput = formattedRange.startsWith('reach') || formattedRange.startsWith('range')
      ? formattedRange
      : `range ${formattedRange}`;

    const rawRange = rangeOutput.replace(/\.+$/, '');
    const line = `_${classif} Attack Roll_: ${bonusStr}, ${rawRange}. ${hitText}${text ? ` ${text}` : ''}`;
    return line.trim();
  }

  // 2. SAVE PATTERN
  if (pattern === 'save' && block.save) {
    const abilityKey = (evalStr(block.save.ability) || 'dex').toLowerCase();
    const fullAbility = ABILITY_NAMES[abilityKey] || capitalize(abilityKey);
    const dcVal = evalStr(block.save.dc || '$(attributes.spellcasting.save)');

    let targetDesc = '';
    if (block.target?.aoe) {
      const shape = capitalize(evalStr(block.target.aoe.shape || 'sphere'));
      const size = evalStr(block.target.aoe.size || '');
      const cleanRange = formattedRange.replace(/^(range|reach)\s*/i, '').trim();
      let rangePart = '';
      if (cleanRange.toLowerCase() === 'self') {
        rangePart = ' centered on you';
      } else if (cleanRange) {
        rangePart = ` centered on a point within ${cleanRange}`;
      }
      targetDesc = `, each creature in a ${size}-foot-radius ${shape}${rangePart}`;
    } else {
      const cleanRange = formattedRange.replace(/^(range|reach)\s*/i, '').trim();
      if (cleanRange && cleanRange.toLowerCase() !== 'self') {
        targetDesc = `, one creature within ${cleanRange}`;
      }
    }

    let failText = '';
    if (block.save.failure) {
      if (block.save.failure.damage) {
        const dDice = formatDiceObj(block.save.failure.damage.dice);
        const dType = block.save.failure.damage.type ? capitalize(evalStr(block.save.failure.damage.type)) : '';
        const addText = block.save.failure.text ? ` ${evalStr(block.save.failure.text)}` : '';
        failText = ` _Failure_: ${dDice} ${dType} damage.${addText}`.replace(/\s+/g, ' ');
      } else if (block.save.failure.text) {
        failText = ` _Failure_: ${evalStr(block.save.failure.text)}`;
      }
    }

    const line = `_${fullAbility} Saving Throw_: DC ${dcVal}${targetDesc}.${failText}${text ? ` ${text}` : ''}`.replace(/\.\./g, '.');
    return line.trim();
  }

  // 3. HEALING PATTERN
  if (pattern === 'healing' && block.healing) {
    const targetType = block.target?.type || activity.range || 'self';
    let targetLabel = 'Self';
    if (targetType.toLowerCase() === 'touch') targetLabel = 'Touch';
    else if (targetType.toLowerCase() !== 'self') targetLabel = capitalize(targetType);

    const diceStr = formatDiceObj(block.healing.dice);
    const typeLabel = block.healing.type === 'tempHitPoints' ? 'Temporary Hit Points' : 'Hit Points';
    const line = `_Healing_: ${targetLabel}, ${diceStr} ${typeLabel}.${text ? ` ${text}` : ''}`;
    return line.trim();
  }

  // 4. UTILITY PATTERN
  if (pattern === 'utility') {
    return text.trim();
  }

  return text || '';
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

  // Fallback if mechanic is missing
  if (!mechanic) {
    const fallbackText = (activity.description || activity.summary || '').split('\n')[0].trim();
    return `**${name}.** ${fallbackText}`;
  }

  // Multi-block handling
  if (mechanic.mode) {
    const blocks = Array.isArray(mechanic.blocks) ? mechanic.blocks : [];
    if (mechanic.mode === 'choice') {
      const choices = blocks.map(b => {
        const title = b.name ? `**${b.name}** ` : '';
        const content = formatBlock(b, activity, evaluator, scope);
        return `${title}${content}`;
      }).join('; ');
      return `**${name}.** Choose one: ${choices}`;
    } else {
      // succession
      const contentParts = blocks.map(b => formatBlock(b, activity, evaluator, scope)).filter(Boolean);
      return `**${name}.** ${contentParts.join(' ')}`;
    }
  }

  // Single block handling
  const content = formatBlock(mechanic, activity, evaluator, scope);
  return `**${name}.** ${content}`;
}
