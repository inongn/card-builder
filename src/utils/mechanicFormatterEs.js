import { ExpressionEvaluator } from '../engine/ExpressionEvaluator.js';
import { formatBonus } from '../engine/helpers.js';
import {
  PAYLOAD_ORDER,
  resolveUpcastPath,
  setUpcastPath,
  applyUpcast,
  computeWarlockUpcastSteps,
  computeMaxSlotLevel,
  getPayloadType,
  getPayloadRank
} from './mechanicFormatter.js';

// ─── Constantes en Español ──────────────────────────────────────────────────

const ABILITY_NAMES_ES = {
  str: 'Fuerza',
  dex: 'Destreza',
  con: 'Constitución',
  int: 'Inteligencia',
  wis: 'Sabiduría',
  cha: 'Carisma'
};

let fallbackTranslations = {};

export function setMechanicFormatterEsTranslations(translations) {
  fallbackTranslations = translations || {};
}

const STAT_NAMES_ES = {
  speed: 'velocidad',
  ac: 'CA',
  ca: 'CA',
  hp: 'Puntos de Golpe',
  temphp: 'Puntos de Golpe Temporales',
  saves: 'tiradas de salvación',
  initiative: 'iniciativa',
  flyspeed: 'Velocidad de Vuelo',
  swimspeed: 'Velocidad de Nado',
  climbspeed: 'Velocidad de Escalada',
  burrowspeed: 'Velocidad de Excavación',
  darkvision: 'Visión en la Oscuridad',
  blindsight: 'Visión Ciega',
  truesight: 'Visión Verdadera',
  tremorsense: 'Sentido de la Vibración',
  str: 'Fuerza',
  dex: 'Destreza',
  con: 'Constitución',
  int: 'Inteligencia',
  wis: 'Sabiduría',
  cha: 'Carisma'
};

export function formatStatNameEs(rawStat) {
  if (!rawStat) return 'velocidad';
  const key = String(rawStat).trim().toLowerCase();
  return STAT_NAMES_ES[key] || capitalize(key);
}

const DAMAGE_TYPES_ES = {
  acid: 'de ácido',
  bludgeoning: 'contundente',
  cold: 'de frío',
  fire: 'de fuego',
  force: 'de fuerza',
  lightning: 'de relámpago',
  necrotic: 'necrótico',
  piercing: 'perforante',
  poison: 'de veneno',
  psychic: 'psíquico',
  radiant: 'radiante',
  slashing: 'cortante',
  thunder: 'de trueno'
};

const SHAPES_ES = {
  sphere: 'esfera',
  cube: 'cubo',
  cone: 'cono',
  line: 'línea',
  cylinder: 'cilindro',
  emanation: 'emanación',
  wall: 'muro',
  square: 'cuadrado'
};

const CONDITIONS_ES = {
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

const TRIGGER_EVENT_PHRASES_ES = {
  make_attack: { subject: null, phrase: 'haces un ataque' },
  hit_with_attack: { subject: null, phrase: 'impactas a una criatura con un ataque' },
  miss_with_attack: { subject: null, phrase: 'fallas un ataque' },
  be_hit: { subject: null, phrase: 'recibes un impacto de un ataque' },
  take_damage: { subject: null, phrase: 'recibes daño' },
  make_save: { subject: null, phrase: 'haces una tirada de salvación' },
  fail_save: { subject: 'tú o una criatura que puedas ver', phrase: 'falla una tirada de salvación' },
  make_check: { subject: null, phrase: 'haces una prueba de característica' },
  fail_check: { subject: 'tú o una criatura que puedas ver', phrase: 'falla una prueba de característica' },
  roll_initiative: { subject: null, phrase: 'tiras iniciativa' },
  roll_damage: { subject: null, phrase: 'tiras el daño' },
  land_crit: { subject: null, phrase: 'consigues un impacto crítico' },
  drop_enemy_zero: { subject: null, phrase: 'reduces a un enemigo a 0 Puntos de Golpe' },
  cast_spell: { subject: null, phrase: 'lanzas un conjuro' },
  on_cast: { subject: null, phrase: 'el área es creada' },
  enter_area: { subject: null, phrase: 'una criatura entra en el área' },
  start_turn: { subject: null, phrase: 'una criatura empieza su turno allí' },
  end_turn: { subject: null, phrase: 'una criatura termina su turno allí' },
  leave_area: { subject: null, phrase: 'una criatura abandona el área' },
  move_within_range: { subject: null, phrase: 'una criatura se mueve dentro del alcance' },
  area_moves_into_space: { subject: null, phrase: 'el área se mueve hacia el espacio de una criatura' },
  move_into_space: { subject: null, phrase: 'el área se mueve hacia el espacio de una criatura' }
};

export function capitalize(str) {
  if (!str || typeof str !== 'string') return str || '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDistanceEs(distStr) {
  if (!distStr) return '';
  const str = String(distStr).trim();
  if (/^5\s*(feet|foot)$/i.test(str)) return 'alcance de 5 pies';
  if (/^touch$/i.test(str) || /^toque$/i.test(str)) return 'alcance de Toque';
  if (/^self$/i.test(str) || /^personal$/i.test(str)) return 'alcance Personal';
  return str
    .replace(/\bfeet\b/gi, 'pies')
    .replace(/\bfoot\b/gi, 'pie');
}

export function formatDamageTypeEs(typeVal, evalStr) {
  if (!typeVal) return '';
  const rawList = Array.isArray(typeVal) ? typeVal : [typeVal];
  const formatted = rawList
    .map(t => {
      const s = evalStr(t);
      if (!s || s === 'damage') return '';
      const lower = s.toLowerCase();
      return DAMAGE_TYPES_ES[lower] || lower;
    })
    .filter(Boolean);
  if (formatted.length === 0) return '';
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]} o ${formatted[1]}`;
  return `${formatted.slice(0, -1).join(', ')} o ${formatted[formatted.length - 1]}`;
}

export function formatFilterTextEs(filterVal, evalStr, plural = false) {
  if (!filterVal) return plural ? 'criaturas' : 'criatura';
  const rawList = Array.isArray(filterVal) ? filterVal : [filterVal];
  const formattedList = rawList.map(f => evalStr(f)).filter(Boolean);
  if (formattedList.length === 0) return plural ? 'criaturas' : 'criatura';

  return formattedList
    .map(s => {
      const evalS = String(s).trim();
      const lower = evalS.toLowerCase();
      if (lower === 'creatures of your choice' || lower === 'creature of your choice') {
        return plural ? 'criaturas que elijas' : 'criatura que elijas';
      }
      if (lower === 'self or creature' || lower === 'creature or self') {
        return 'criatura (o tú mismo)';
      }
      const dict = {
        creature: plural ? 'criaturas' : 'criatura',
        undead: plural ? 'Muertos Vivientes' : 'Muerto Viviente',
        beast: plural ? 'bestias' : 'bestia',
        humanoid: plural ? 'humanoides' : 'humanoide',
        fiend: plural ? 'inmundas' : 'inmunda',
        celestial: plural ? 'celestiales' : 'celestial',
        fey: plural ? 'hadas' : 'hada',
        elemental: plural ? 'elementales' : 'elemental',
        dragon: plural ? 'dragones' : 'dragón',
        monstrosity: plural ? 'monstruosidades' : 'monstruosidad',
        construct: plural ? 'autómatas' : 'autómata',
        aberration: plural ? 'aberraciones' : 'aberración',
        plant: plural ? 'plantas' : 'planta',
        giant: plural ? 'gigantes' : 'gigante',
        enemy: plural ? 'enemigos' : 'enemigo',
        ally: plural ? 'aliados' : 'aliado',
        target: plural ? 'objetivos' : 'objetivo'
      };
      if (dict[lower]) return dict[lower];
      if (plural) {
        if (lower.endsWith('s')) return lower;
        return `${lower}s`;
      }
      return lower;
    })
    .join(' o ');
}

function getIndefiniteArticleEs(noun) {
  if (!noun) return 'un';
  const lower = noun.trim().toLowerCase();
  const feminineWords = ['criatura', 'planta', 'bestia', 'monstruosidad', 'aberración', 'hada', 'inmunda', 'esfera', 'línea', 'emanación'];
  if (feminineWords.some(w => lower.startsWith(w))) return 'una';
  return 'un';
}

function formatAoePhraseEs(shapeKey, size) {
  const raw = String(shapeKey || 'sphere').toLowerCase();
  const shape = SHAPES_ES[raw] || raw;
  const isFeminine = ['sphere', 'line', 'emanation'].includes(raw);
  const article = isFeminine ? 'una' : 'un';
  if (raw === 'line' || raw === 'wall') return `${article} ${shape} de ${size} pies`;
  if (raw === 'cube' || raw === 'square' || raw === 'cone') return `${article} ${shape} de ${size} pies`;
  return `${article} ${shape} de ${size} pies de radio`;
}

/** Translates standard 5e idioms in text blocks/payloads to natural Spanish */
function cleanEnglishPhrasesEs(text) {
  if (!text || typeof text !== 'string') return text || '';
  return text
    .replace(/\bthe target gains no benefit from cover for this save\b/gi, 'el objetivo no obtiene ningún beneficio de la cobertura para esta salvación')
    .replace(/\bthe target cannot regain hit points\b/gi, 'el objetivo no puede recuperar Puntos de Golpe')
    .replace(/\bcannot regain hit points\b/gi, 'no puede recuperar Puntos de Golpe')
    .replace(/\bcan't regain hit points\b/gi, 'no puede recuperar Puntos de Golpe')
    .replace(/\bif the target is missing any of its hit points\b/gi, 'si el objetivo ha perdido alguno de sus Puntos de Golpe')
    .replace(/\bif it is missing any of its hit points\b/gi, 'si ha perdido alguno de sus Puntos de Golpe')
    .replace(/\bit instead takes\b/gi, 'en su lugar recibe')
    .replace(/\binstead takes\b/gi, 'en su lugar recibe')
    .replace(/\buntil the end of your next turn\b/gi, 'hasta el final de tu siguiente turno')
    .replace(/\buntil the end of its next turn\b/gi, 'hasta el final de su siguiente turno')
    .replace(/\buntil the end of next turn\b/gi, 'hasta el final del siguiente turno')
    .replace(/\buntil the start of your next turn\b/gi, 'hasta el inicio de tu siguiente turno')
    .replace(/\buntil the start of its next turn\b/gi, 'hasta el inicio de su siguiente turno')
    .replace(/\bat the start of each of its turns\b/gi, 'al inicio de cada uno de sus turnos')
    .replace(/\bat start of each of its turns\b/gi, 'al inicio de cada uno de sus turnos')
    .replace(/\bat the end of each of its turns\b/gi, 'al final de cada uno de sus turnos')
    .replace(/\bat end of each of its turns\b/gi, 'al final de cada uno de sus turnos')
    .replace(/\bat the start of your next turn\b/gi, 'al inicio de tu siguiente turno')
    .replace(/\bat the end of your next turn\b/gi, 'al final de tu siguiente turno')
    .replace(/\bat start of its turn\b/gi, 'al inicio de su turno')
    .replace(/\bon each of your subsequent turns\b/gi, 'en cada uno de tus turnos posteriores')
    .replace(/\bon each of your turns\b/gi, 'en cada uno de tus turnos')
    .replace(/\bon each of its turns\b/gi, 'en cada uno de sus turnos')
    .replace(/\bon its next turn\b/gi, 'en su siguiente turno')
    .replace(/\bon a hit\b/gi, 'al impactar')
    .replace(/\bon a miss\b/gi, 'al fallar')
    .replace(/\bfor the duration\b/gi, 'durante la duración')
    .replace(/\bthe target repeats the save\b/gi, 'el objetivo repite la tirada de salvación')
    .replace(/\brepeats the save\b/gi, 'repite la tirada de salvación')
    .replace(/\brepeating the save\b/gi, 'repitiendo la salvación')
    .replace(/\bwhenever it takes damage\b/gi, 'siempre que reciba daño')
    .replace(/\bthe target cannot make Opportunity Attacks\b/gi, 'el objetivo no puede realizar Ataques de Oportunidad')
    .replace(/\bcannot make Opportunity Attacks\b/gi, 'no puede realizar Ataques de Oportunidad')
    .replace(/\bcan't make Opportunity Attacks\b/gi, 'no puede realizar Ataques de Oportunidad')
    .replace(/\bcannot take reactions\b/gi, 'no puede realizar Reacciones')
    .replace(/\bcan't take reactions\b/gi, 'no puede realizar Reacciones')
    .replace(/\bcannot use reactions\b/gi, 'no puede usar Reacciones')
    .replace(/\bcan't use reactions\b/gi, 'no puede usar Reacciones')
    .replace(/\bcan't make reactions\b/gi, 'no puede realizar Reacciones')
    .replace(/\bcan't benefit from the Invisible condition\b/gi, 'no puede beneficiarse de la condición de Invisible')
    .replace(/\bcannot benefit from the Invisible condition\b/gi, 'no puede beneficiarse de la condición de Invisible')
    .replace(/\b(?:emits|sheds)\s+Dim Light in a (\d+)-(?:foot|pie) radius\b/gi, 'emite Luz Tenue en un radio de $1 pies')
    .replace(/\b(?:emits|sheds)\s+Bright Light in a (\d+)-(?:foot|pie) radius\b/gi, 'emite Luz Brillante en un radio de $1 pies')
    .replace(/\bthe target must immediately use its reaction, if available, to move as far away from you as its speed allows\b/gi, 'el objetivo debe usar inmediatamente su Reacción, si está disponible, para alejarse tanto de ti como su velocidad lo permita')
    .replace(/\bto deal (\d+d\d+)\s+Lightning damage to the target automatically\b/gi, 'para infligir $1 de daño de relámpago al objetivo automáticamente')
    .replace(/\bSpeed is halved\b/gi, 'su velocidad se reduce a la mitad')
    .replace(/\bSpeed is doubled\b/gi, 'su velocidad se duplica')
    .replace(/\bhas -2 to Dex saves\b/gi, 'tiene un penalizador de -2 a las salvaciones de Destreza')
    .replace(/\bgains Advantage on Dex saves\b/gi, 'gana Ventaja en las salvaciones de Destreza')
    .replace(/\btake both (?:an )?action and Bonus Action on a turn\b/gi, 'realizar tanto una Acción como una Acción Adicional en un turno')
    .replace(/\bplus its Dexterity modifier\b/gi, 'más su modificador de Destreza')
    .replace(/\bplus your Dexterity modifier\b/gi, 'más tu modificador de Destreza')
    .replace(/\bplus your spellcasting ability modifier\b/gi, 'más tu modificador de característica para el lanzamiento de conjuros')
    .replace(/\bgains?\s+a\s+\+?(\d+)\s+bonus\s+to\s+your\s+AC\b/gi, 'ganas un bonificador de +$1 a tu CA')
    .replace(/\bgains?\s+a\s+\+?(\d+)\s+bonus\s+to\s+(?:its\s+)?AC\b/gi, 'gana un bonificador de +$1 a su CA')
    .replace(/\byou\s+can\s+take\s+a\s+Bonus\s+Action\b/gi, 'puedes realizar una Acción Adicional')
    .replace(/\byou\s+can\s+use\s+a\s+Bonus\s+Action\b/gi, 'puedes realizar una Acción Adicional')
    .replace(/\ba\s+creature\s+can\s+use\s+a\s+Bonus\s+Action\b/gi, 'una criatura puede realizar una Acción Adicional')
    .replace(/\btakes?\s+no\s+damage\s+from\s+Magic\s+Missile\b/gi, 'no recibes daño de Proyectil Mágico')
    .replace(/\bincluding against the triggering attack\b/gi, 'incluyendo contra el ataque desencadenante')
    .replace(/\ban unoccupied space you can see\b/gi, 'un espacio desocupado que puedas ver')
    .replace(/\ban unoccupied space\b/gi, 'un espacio desocupado')
    .replace(/\bDifficult Terrain\b/gi, 'Terreno Difícil')
    .replace(/\bAcid\s+damage\b/gi, 'de daño de ácido')
    .replace(/\bBludgeoning\s+damage\b/gi, 'de daño contundente')
    .replace(/\bCold\s+damage\b/gi, 'de daño de frío')
    .replace(/\bFire\s+damage\b/gi, 'de daño de fuego')
    .replace(/\bForce\s+damage\b/gi, 'de daño de fuerza')
    .replace(/\bLightning\s+damage\b/gi, 'de daño de relámpago')
    .replace(/\bNecrotic\s+damage\b/gi, 'de daño necrótico')
    .replace(/\bPiercing\s+damage\b/gi, 'de daño perforante')
    .replace(/\bPoison\s+damage\b/gi, 'de daño de veneno')
    .replace(/\bPsychic\s+damage\b/gi, 'de daño psíquico')
    .replace(/\bRadiant\s+damage\b/gi, 'de daño radiante')
    .replace(/\bSlashing\s+damage\b/gi, 'de daño cortante')
    .replace(/\bThunder\s+damage\b/gi, 'de daño de trueno')
    .replace(/\btemporary hit points\b/gi, 'Puntos de Golpe Temporales')
    .replace(/\btemp hit points\b/gi, 'Puntos de Golpe Temporales')
    .replace(/\bhit points\b/gi, 'Puntos de Golpe')
    .replace(/\bhit point\b/gi, 'Punto de Golpe')
    .replace(/\bthe target takes\b/gi, 'el objetivo recibe')
    .replace(/\bthe target\b/gi, 'el objetivo')
    .replace(/\bfeet\b/gi, 'pies')
    .replace(/\bfoot\b/gi, 'pie')
    .replace(/\bBonus Action\b/gi, 'Acción Adicional')
    .replace(/\bReaction\b/gi, 'Reacción')
    .replace(/\bAction\b/gi, 'Acción')
    .replace(/\bwithout provoking Opportunity Attacks\b/gi, 'sin provocar Ataques de Oportunidad')
    .replace(/\b,\s*and\b/gi, ', y')
    .replace(/\band\b/gi, 'y')
    .replace(/\bor\s+(?:realizar|take)\b/gi, 'ni realizar')
    .replace(/\b,\s*or\b/gi, ', o')
    .replace(/\bor\b/gi, 'o');
}

// ─── Upcast Label derivation en Español ─────────────────────────────────────

function deriveUpcastLabelEs(upcastSpec, mechanicObj, activity, evalStr) {
  if (!upcastSpec) return '';
  if (upcastSpec.display?.label) {
    let lbl = upcastSpec.display.label;
    lbl = lbl.replace(/\+1 hour duration/gi, '+1 hora de duración');
    lbl = lbl.replace(/duration/gi, 'duración');
    return lbl;
  }

  const mods = upcastSpec.modifications;
  if (!mods || mods.length === 0) return '';

  const fragments = [];

  for (const { path, add } of mods) {
    const addNum = typeof add === 'number' ? add : Number(add);
    const prefix = addNum > 0 ? `+${addNum}` : `${addNum}`;

    if (path === 'target.count') {
      const filter = mechanicObj?.target?.filter;
      const filterText = filter ? ` ${formatFilterTextEs(filter, evalStr, addNum !== 1)}` : '';
      const noun = addNum === 1 ? 'objetivo' : 'objetivos';
      fragments.push(`${prefix}${filterText ? filterText : ` ${noun}`}`);
      continue;
    }

    if (path.endsWith('target.aoe.size') || path === 'target.aoe.size') {
      const shapeKey = String(mechanicObj?.target?.aoe?.shape || 'sphere').toLowerCase();
      const shape = SHAPES_ES[shapeKey] || shapeKey;
      const isLine = shapeKey === 'line';
      const isWall = shapeKey === 'wall';
      const suffix = (isLine || isWall) ? 'longitud' : 'radio';
      fragments.push(`${prefix} pies de ${suffix} de ${shape}`);
      continue;
    }

    if (path.includes('healing') && path.includes('dice.count')) {
      const dicePath = path.replace(/\.count$/, '');
      const diceObj = resolveUpcastPath(mechanicObj, dicePath);
      let sides = '';
      if (diceObj && typeof diceObj === 'object' && diceObj.sides) {
        sides = `d${diceObj.sides}`;
      }
      const healingType = path.includes('tempHitPoints') ? 'Puntos de Golpe Temporales' : 'curación';
      fragments.push(`${prefix}${sides} ${healingType}`);
      continue;
    }

    if (path.includes('dice.count')) {
      const dicePath = path.replace(/\.count$/, '');
      const diceObj = resolveUpcastPath(mechanicObj, dicePath);
      let sides = '';
      let dmgType = '';

      if (diceObj && typeof diceObj === 'object' && diceObj.sides) {
        sides = `d${diceObj.sides}`;
      }

      const diceParentPath = dicePath.replace(/\.dice$/, '');
      const payloadObj = resolveUpcastPath(mechanicObj, diceParentPath);
      if (payloadObj && typeof payloadObj === 'object' && payloadObj.damageType) {
        const dTypeFmt = formatDamageTypeEs(payloadObj.damageType, evalStr);
        if (dTypeFmt) dmgType = ` ${dTypeFmt}`;
      }

      fragments.push(`${prefix}${sides} de daño${dmgType}`);
      continue;
    }

    fragments.push(`${prefix}`);
  }

  if (fragments.length === 0) return '';
  if (fragments.length === 1) return fragments[0];
  return fragments.slice(0, -1).join(', ') + ' y ' + fragments[fragments.length - 1];
}

// ─── Format Trigger en Español ──────────────────────────────────────────────

export function formatTriggerEs(trigger, evalStr) {
  if (!trigger) return '';
  if (typeof trigger === 'string') return cleanEnglishPhrasesEs(evalStr(trigger));
  if (trigger.text) return cleanEnglishPhrasesEs(evalStr(trigger.text));

  if (trigger.event) {
    const rawEvents = Array.isArray(trigger.event) ? trigger.event : [trigger.event];
    const phrases = [];

    for (const e of rawEvents) {
      const entry = TRIGGER_EVENT_PHRASES_ES[e];
      if (!entry) {
        phrases.push(e.replace(/_/g, ' '));
        continue;
      }
      phrases.push(entry.phrase);
    }

    if (phrases.length === 0) return '';
    const joined = phrases.length === 1
      ? phrases[0]
      : `${phrases.slice(0, -1).join(', ')} o ${phrases[phrases.length - 1]}`;
    return `Cuando ${joined}`;
  }

  return '';
}

// ─── Format Repeat en Español ───────────────────────────────────────────────

export function formatRepeatEs(repeat, pattern, evalStr) {
  if (!repeat) return '';
  let rawAction = '';
  if (typeof repeat === 'string') rawAction = repeat;
  else if (typeof repeat === 'object' && repeat.action) rawAction = repeat.action;
  if (!rawAction) return '';

  const lower = rawAction.toLowerCase();
  let actionName = 'una Acción';
  if (lower === 'bonus_action') actionName = 'una Acción Adicional';
  else if (lower === 'free_action') actionName = 'una Acción Gratuita';
  else if (lower === 'reaction') actionName = 'una Reacción';

  if (pattern === 'attack') {
    return ` _Repetir:_ En turnos posteriores, puedes realizar ${actionName} para repetir el ataque.`;
  }
  if (pattern === 'save') {
    return ` _Repetir:_ En turnos posteriores, puedes realizar ${actionName} para mover el efecto y repetir la tirada de salvación.`;
  }
  return ` _Repetir:_ En turnos posteriores, puedes realizar ${actionName} para repetir el efecto.`;
}

// ─── Format Target Text en Español ─────────────────────────────────────────

export function formatTargetTextEs(targetObj, formattedRange, evalStr, isAttack = false, activity = null) {
  if (!targetObj) return '';
  if (targetObj.text) return `, ${cleanEnglishPhrasesEs(evalStr(targetObj.text))}`;
  const cleanRange = formattedRange.replace(/^(alcance|range|reach)\s*(de\s*)?/i, '').trim();

  const filterSingular = formatFilterTextEs(targetObj.filter, evalStr, false);
  const filterPlural = formatFilterTextEs(targetObj.filter, evalStr, true);
  const art = getIndefiniteArticleEs(filterSingular);

  // ── AOE target ──────────────────────────────────────────────────────────────
  if (targetObj.aoe) {
    const rawShape = evalStr(targetObj.aoe.shape || 'sphere').toLowerCase();
    const size = evalStr(targetObj.aoe.size || '');
    const aoePhrase = formatAoePhraseEs(rawShape, size);

    let rangePart = '';
    const lowerRange = cleanRange.toLowerCase();
    if (targetObj.inherit === 'trigger' || targetObj.inherit === 'prev_step') {
      rangePart = ' centrada en el objetivo';
    } else if (lowerRange === 'personal' || lowerRange === 'self' || rawShape === 'emanation') {
      rangePart = rawShape === 'line' ? ' que se origina en ti' : ' centrada en ti';
    } else if (cleanRange) {
      rangePart = ` centrada en un punto a ${cleanRange}`;
    }
    return `, cada ${filterSingular} en ${aoePhrase}${rangePart}`;
  }

  // ── Inherited target ────────────────────────────────────────────────────────
  if (targetObj.inherit === 'trigger') {
    const triggerEvent = activity?.mechanic?.trigger?.event
      ?? activity?.mechanic?.blocks?.[0]?.trigger?.event
      ?? '';
    const rawEvents = Array.isArray(triggerEvent) ? triggerEvent : [triggerEvent];
    const isAttackerTrigger = rawEvents.some(e => e === 'be_hit' || e === 'take_damage');
    return isAttackerTrigger ? ', el atacante' : ', el objetivo';
  }
  if (targetObj.inherit === 'prev_step') {
    return '';
  }

  const type = (evalStr(targetObj.type) || '').toLowerCase();
  const countRaw = targetObj.count !== undefined ? evalStr(targetObj.count) : '';
  const countNum = parseInt(countRaw, 10);

  // ── Multiple targets ────────────────────────────────────────────────────────
  if (type === 'multiple' || type === 'multi' || (!isNaN(countNum) && countNum > 1)) {
    const rangePart = cleanRange && !/^personal$/i.test(cleanRange) && !/^self$/i.test(cleanRange) ? ` a ${cleanRange}` : '';
    if (!countRaw || isNaN(countNum)) {
      return `, ${filterPlural} que elijas${rangePart}`;
    }
    const noun = targetObj.filter
      ? (countRaw === '1' ? filterSingular : filterPlural)
      : (countRaw === '1' ? 'objetivo' : 'objetivos');
    return `, hasta ${countRaw} ${noun}${rangePart}`;
  }

  // ── Attack pattern ──────────────────────────────────────────────────────────
  if (isAttack) return '';

  // ── Single / touch / self targets ───────────────────────────────────────────
  if (!cleanRange) return '';
  const lowerRange = cleanRange.toLowerCase();
  if (lowerRange === 'personal' || lowerRange === 'self') return '';
  if (lowerRange === 'toque' || lowerRange === 'touch') return `, ${art} ${filterSingular} que toques`;
  return `, ${art} ${filterSingular} a ${cleanRange}`;
}

// ─── Format Payload en Español ─────────────────────────────────────────────

export function formatPayloadEs(payload, evalStr, formatDiceObj, ctx = {}) {
  if (!payload) return '';
  if (typeof payload === 'string') return cleanEnglishPhrasesEs(evalStr(payload));

  const type = getPayloadType(payload);

  // ── Text payload ─────────────────────────────────────────────────────────────
  if (type === 'text') {
    const raw = evalStr(payload.text || '');
    let res = raw.charAt(0).toLowerCase() + raw.slice(1);
    return cleanEnglishPhrasesEs(res).replace(/\.$/, '');
  }

  // ── Damage payload ──────────────────────────────────────────────────────────
  if (type === 'damage') {
    const dDice = formatDiceObj(payload.dice, payload.min, evalStr);
    const dType = formatDamageTypeEs(payload.damageType, evalStr);
    const typeStr = dType ? ` ${dType}` : '';
    if (payload.text) {
      const txt = evalStr(payload.text).trim();
      let transTxt = cleanEnglishPhrasesEs(txt);
      if (dDice && !transTxt.includes(dDice)) {
        return `${dDice} ${transTxt}`.trim();
      }
      return transTxt;
    }
    return dDice ? `${dDice} de daño${typeStr}` : 'daño';
  }

  // ── Healing payload ─────────────────────────────────────────────────────────
  if (type === 'healing') {
    const healEntry = payload.healing || payload;
    const diceStr = formatDiceObj(healEntry.dice, undefined, evalStr);
    const isTemp = healEntry.type === 'tempHitPoints';
    const typeLabel = isTemp ? 'Puntos de Golpe Temporales' : 'Puntos de Golpe';
    return diceStr ? `${diceStr} ${typeLabel}` : typeLabel;
  }

  // ── Condition payload ───────────────────────────────────────────────────────
  if (type === 'condition') {
    const rawCond = Array.isArray(payload.condition) ? payload.condition : [payload.condition];
    const formattedCond = rawCond
      .map(c => CONDITIONS_ES[evalStr(c).toLowerCase()] || capitalize(evalStr(c)))
      .join(' y ');
    const condBase = formattedCond.toLowerCase() === 'derribado'
      ? 'Derribado'
      : `la condición de ${formattedCond}`;

    let endText = '';
    if (payload.end) {
      if (typeof payload.end === 'string') {
        let actionCheckText = ' (CD de escape)';
        if (payload.end === 'action_check') {
          const rawDc = ctx?.saveDc ? evalStr(ctx.saveDc) : evalStr('$(attributes.spellcasting.save)');
          const cleanDc = rawDc.replace(/^CD\s*/i, '').replace(/^DC\s*/i, '').trim();
          actionCheckText = (cleanDc && !cleanDc.includes('$'))
            ? ` (CD de escape ${cleanDc})`
            : ' (CD de escape)';
        }
        const endMap = {
          take_damage: ' (termina si el objetivo recibe daño)',
          repeat_save_on_damage: ' (repite la tirada de salvación cada vez que recibe daño)',
          action_check: actionCheckText,
          turn_repeat_save: ' (repite la tirada de salvación al final de cada uno de sus turnos)',
          end_of_its_next_turn: ' hasta el final de su siguiente turno',
          end_of_your_next_turn: ' hasta el final de tu siguiente turno',
          end_of_next_turn: ' hasta el final del siguiente turno',
        };
        endText = endMap[payload.end] ?? ` (${cleanEnglishPhrasesEs(evalStr(payload.end))})`;
      } else if (payload.end?.text) {
        endText = ` (${cleanEnglishPhrasesEs(evalStr(payload.end.text))})`;
      }
    }
    return `${condBase}${endText}`;
  }

  // ── Roll modifier payload ───────────────────────────────────────────────────
  if (type === 'rollModifier') {
    if (payload.text) return cleanEnglishPhrasesEs(evalStr(payload.text));
    const modType = payload.modifierType || 'advantage';
    const rawRolls = Array.isArray(payload.targetRolls)
      ? payload.targetRolls
      : [payload.targetRolls || 'roll'];

    const rollNamesEs = {
      attack: 'tirada de ataque',
      check: 'prueba de característica',
      abilityCheck: 'prueba de característica',
      save: 'tirada de salvación',
      savingThrow: 'tirada de salvación',
      dmg: 'tirada de daño',
      trigger: 'tirada desencadenante'
    };
    const rollNamesPluralEs = {
      attack: 'tiradas de ataque',
      check: 'pruebas de característica',
      abilityCheck: 'pruebas de característica',
      save: 'tiradas de salvación',
      savingThrow: 'tiradas de salvación',
      dmg: 'tiradas de daño',
      trigger: 'tiradas desencadenantes'
    };

    let endStr = '';
    if (payload.end) {
      if (typeof payload.end === 'string') {
        const endMap = {
          end_of_your_next_turn: ' hasta el final de tu siguiente turno',
          end_of_its_next_turn: ' hasta el final de su siguiente turno',
          start_of_your_next_turn: ' hasta el inicio de tu siguiente turno',
          start_of_its_next_turn: ' hasta el inicio de su siguiente turno',
        };
        endStr = endMap[payload.end] ?? ` (${cleanEnglishPhrasesEs(evalStr(payload.end))})`;
      } else if (payload.end?.text) {
        endStr = ` (${cleanEnglishPhrasesEs(evalStr(payload.end.text))})`;
      }
    }

    const isRecipientSelf = payload.recipient === 'self';
    const againstStr = payload.against === 'target'
      ? ' contra el objetivo'
      : (payload.against === 'self' ? ' contra ti' : '');

    if (modType === 'advantage') {
      if (payload.saveFilter?.ability) {
        const rawAbils = Array.isArray(payload.saveFilter.ability) ? payload.saveFilter.ability : [payload.saveFilter.ability];
        const abils = rawAbils.map(a => ABILITY_NAMES_ES[evalStr(a).toLowerCase()] || capitalize(evalStr(a)));
        let abilJoin = '';
        if (abils.length === 1) abilJoin = abils[0];
        else if (abils.length === 2) abilJoin = `${abils[0]} y ${abils[1]}`;
        else abilJoin = `${abils.slice(0, -1).join(', ')} y ${abils[abils.length - 1]}`;
        return isRecipientSelf
          ? `tienes Ventaja en tiradas de salvación de ${abilJoin}${endStr}`
          : `tiene Ventaja en tiradas de salvación de ${abilJoin}${endStr}`;
      }
      if (payload.saveFilter?.text) {
        return isRecipientSelf
          ? `tienes Ventaja en tiradas de salvación ${cleanEnglishPhrasesEs(evalStr(payload.saveFilter.text))}${endStr}`
          : `tiene Ventaja en tiradas de salvación ${cleanEnglishPhrasesEs(evalStr(payload.saveFilter.text))}${endStr}`;
      }
      const rollsStr = rawRolls.map(r => rollNamesEs[evalStr(r)] || evalStr(r)).join(' o ');
      if (isRecipientSelf) {
        return `tienes Ventaja en tu siguiente ${rollsStr}${againstStr}${endStr}`;
      }
      return `tiene Ventaja en su siguiente ${rollsStr}${againstStr}${endStr}`;
    }
    if (modType === 'disadvantage') {
      const rollsStr = rawRolls.map(r => rollNamesEs[evalStr(r)] || evalStr(r)).join(' o ');
      if (isRecipientSelf) {
        return `tienes Desventaja en tu siguiente ${rollsStr}${againstStr}${endStr}`;
      }
      return `tiene Desventaja en su siguiente ${rollsStr}${againstStr}${endStr}`;
    }
    if (modType === 'reroll') {
      const rollsStr = rawRolls.map(r => rollNamesEs[evalStr(r)] || evalStr(r)).join(' o ');
      return isRecipientSelf ? `vuelves a tirar la ${rollsStr}${endStr}` : `vuelve a tirar la ${rollsStr}${endStr}`;
    }

    const isTargetSelf = ctx?.targetObj?.type === 'self' || (typeof ctx?.targetObj?.range === 'string' && ctx?.targetObj?.range.toLowerCase() === 'self');
    const targetPronoun = isTargetSelf ? 'ti' : 'el objetivo';
    if (modType === 'attacksAgainstAdvantage') return `las tiradas de ataque contra ${targetPronoun} tienen Ventaja${endStr}`;
    if (modType === 'attacksAgainstDisadvantage') return `las tiradas de ataque contra ${targetPronoun} tienen Desventaja${endStr}`;

    const formulaStr = formatDiceObj(payload.dice || payload.formula, undefined, evalStr);
    if (modType === 'add') {
      if (rawRolls.length > 1) {
        const rollsStr = rawRolls.map(r => rollNamesPluralEs[evalStr(r)] || evalStr(r)).join(' y ');
        return `añade ${formulaStr} a las ${rollsStr}${endStr}`;
      }
      const rollsStr = rawRolls.map(r => rollNamesEs[evalStr(r)] || evalStr(r)).join(' o ');
      return `añade ${formulaStr} a su siguiente ${rollsStr}${endStr}`;
    }
    if (modType === 'subtract') {
      if (rawRolls.length > 1) {
        const rollsStr = rawRolls.map(r => rollNamesPluralEs[evalStr(r)] || evalStr(r)).join(' y ');
        return `resta ${formulaStr} de las ${rollsStr}${endStr}`;
      }
      const rollsStr = rawRolls.map(r => rollNamesEs[evalStr(r)] || evalStr(r)).join(' o ');
      return `resta ${formulaStr} de su siguiente ${rollsStr}${endStr}`;
    }
    return cleanEnglishPhrasesEs(evalStr(payload.text || ''));
  }

  // ── Movement payload ────────────────────────────────────────────────────────
  if (type === 'movement') {
    if (payload.text) return cleanEnglishPhrasesEs(evalStr(payload.text));
    const dir = payload.direction || 'push';
    const distStr = payload.distance ? `${evalStr(payload.distance)} pies` : '5 pies';
    if (payload.movementType === 'forced') {
      if (dir === 'push') return `empujado hasta ${distStr} de distancia`;
      if (dir === 'pull') return `atraído hasta ${distStr} más cerca`;
      return `movido hasta ${distStr}`;
    }
    const opportStr = payload.provokesOpportunityAttacks === false
      ? ' sin provocar Ataques de Oportunidad'
      : '';
    return `se mueve hasta ${distStr}${opportStr}`;
  }

  // ── Stat modifier payload ───────────────────────────────────────────────────
  if (type === 'statModifier') {
    const rawStat = (payload.stat || 'speed').toLowerCase();
    const statName = formatStatNameEs(rawStat);
    const rawVal = cleanEnglishPhrasesEs(evalStr(payload.value));
    const numVal = Number(rawVal);
    const isNeg = !isNaN(numVal) && numVal < 0;
    const absVal = !isNaN(numVal) ? Math.abs(numVal) : rawVal;
    const speedSuffix = rawStat === 'speed' ? ' pies' : '';

    let endStr = '';
    if (payload.end) {
      if (typeof payload.end === 'string') {
        const endMap = {
          end_of_your_next_turn: ' hasta el final de tu siguiente turno',
          end_of_its_next_turn: ' hasta el final de su siguiente turno',
          start_of_your_next_turn: ' hasta el inicio de tu siguiente turno',
          start_of_its_next_turn: ' hasta el inicio de su siguiente turno',
        };
        endStr = endMap[payload.end] ?? ` (${cleanEnglishPhrasesEs(evalStr(payload.end))})`;
      } else if (payload.end.text) {
        endStr = ` (${cleanEnglishPhrasesEs(evalStr(payload.end.text))})`;
      }
    }

    if (rawStat === 'flyspeed') {
      const hoverStr = payload.hover ? ' (levitar)' : '';
      const suffix = payload.text ? ` ${cleanEnglishPhrasesEs(evalStr(payload.text))}` : '';
      return `gana una Velocidad de Vuelo de ${rawVal} pies${hoverStr}${suffix}${endStr}`;
    }
    if (['swimspeed', 'climbspeed', 'burrowspeed'].includes(rawStat)) {
      const nameMap = {
        swimspeed: 'Velocidad de Nado',
        climbspeed: 'Velocidad de Escalada',
        burrowspeed: 'Velocidad de Excavación'
      };
      const name = nameMap[rawStat];
      const suffix = payload.text ? ` ${cleanEnglishPhrasesEs(evalStr(payload.text))}` : '';
      return `gana una ${name} de ${rawVal} pies${suffix}${endStr}`;
    }
    if (['darkvision', 'blindsight', 'truesight', 'tremorsense'].includes(rawStat)) {
      const senseMap = {
        darkvision: 'Visión en la Oscuridad',
        blindsight: 'Visión Ciega',
        truesight: 'Visión Verdadera',
        tremorsense: 'Sentido de la Vibración'
      };
      const name = senseMap[rawStat];
      const suffix = payload.text ? ` ${cleanEnglishPhrasesEs(evalStr(payload.text))}` : '';
      return `gana ${name} con un alcance de ${rawVal} pies${suffix}${endStr}`;
    }

    if (payload.operation === 'set') {
      return `su ${statName} base pasa a ser ${rawVal}${speedSuffix}${endStr}`;
    }
    if (payload.operation === 'subtract' || isNeg) {
      return `su ${statName} se reduce en ${absVal}${speedSuffix}${endStr}`;
    }
    return `gana un bonificador de +${absVal} a su ${statName}${speedSuffix}${endStr}`;
  }

  // ── Defense payload ──────────────────────────────────────────────────────────
  if (type === 'defense') {
    const defType = evalStr(payload.defense || 'resistance').toLowerCase();
    const label = defType === 'immunity' ? 'Inmunidad' : (defType === 'vulnerability' ? 'Vulnerabilidad' : 'Resistencia');
    const parts = [];

    if (payload.damageTypes) {
      const rawList = Array.isArray(payload.damageTypes) ? payload.damageTypes : [payload.damageTypes];
      const formatted = rawList.map(t => formatDamageTypeEs(t, evalStr)).filter(Boolean);
      let dmgStr = '';
      if (formatted.length === 1) dmgStr = formatted[0];
      else if (formatted.length === 2) dmgStr = `${formatted[0]} y ${formatted[1]}`;
      else dmgStr = `${formatted.slice(0, -1).join(', ')} y ${formatted[formatted.length - 1]}`;
      if (dmgStr) parts.push(`al daño ${dmgStr}`);
    }

    if (payload.conditions) {
      const rawConds = Array.isArray(payload.conditions) ? payload.conditions : [payload.conditions];
      const condStrs = rawConds.map(c => CONDITIONS_ES[evalStr(c).toLowerCase()] || capitalize(evalStr(c)));
      let condJoin = '';
      if (condStrs.length === 1) condJoin = `la condición de ${condStrs[0]}`;
      else if (condStrs.length === 2) condJoin = `las condiciones de ${condStrs[0]} y ${condStrs[1]}`;
      else condJoin = `las condiciones de ${condStrs.slice(0, -1).join(', ')} y ${condStrs[condStrs.length - 1]}`;
      parts.push(`a ${condJoin}`);
    }

    let endStr = '';
    if (payload.end) {
      if (typeof payload.end === 'string') {
        const endMap = {
          end_of_your_next_turn: ' hasta el final de tu siguiente turno',
          end_of_its_next_turn: ' hasta el final de su siguiente turno',
          start_of_your_next_turn: ' hasta el inicio de tu siguiente turno',
        };
        endStr = endMap[payload.end] ?? ` (${cleanEnglishPhrasesEs(evalStr(payload.end))})`;
      } else if (payload.end.text) {
        endStr = ` (${cleanEnglishPhrasesEs(evalStr(payload.end.text))})`;
      }
    }

    if (parts.length === 0) return payload.text ? cleanEnglishPhrasesEs(evalStr(payload.text)) : '';
    const joined = parts.join(' y ');
    return `gana ${label} ${joined}${endStr}`;
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
      const formatted = rawList.map(t => formatDamageTypeEs(t, evalStr)).filter(Boolean);
      let dt = '';
      if (formatted.length === 1) dt = formatted[0];
      else if (formatted.length === 2) dt = `${formatted[0]} o ${formatted[1]}`;
      else dt = `${formatted.slice(0, -1).join(', ')} o ${formatted[formatted.length - 1]}`;
      if (dt) typeStr = ` ${dt}`;
    }

    if (payload.halve) {
      return `el daño${typeStr} recibido se reduce a la mitad`;
    }
    if (valStr) {
      return `reduce el daño${typeStr} recibido en ${valStr}`;
    }
    return payload.text ? cleanEnglishPhrasesEs(evalStr(payload.text)) : '';
  }

  // ── Teleport payload ─────────────────────────────────────────────────────────
  if (type === 'teleport') {
    const rawDist = String(evalStr(payload.distance || '30')).trim();
    const cleanDist = formatDistanceEs(rawDist);
    const dist = /pies$/i.test(cleanDist) ? cleanDist : `${cleanDist} pies`;
    const custom = payload.text ? ` ${cleanEnglishPhrasesEs(evalStr(payload.text)).trim()}` : ' a un espacio desocupado que puedas ver';
    if (payload.target === 'target') {
      return `el objetivo es teletransportado hasta ${dist}${custom}`;
    }
    return `te teletransportas hasta ${dist}${custom}`;
  }

  // ── Condition cleanse payload ────────────────────────────────────────────────
  if (type === 'conditionCleanse') {
    if (payload.conditions === 'all') {
      return `termina todas las condiciones sobre el objetivo`;
    }
    const rawConds = Array.isArray(payload.conditions) ? payload.conditions : [payload.conditions];
    const condStrs = rawConds.map(c => CONDITIONS_ES[evalStr(c).toLowerCase()] || capitalize(evalStr(c)));
    let listStr = '';
    if (condStrs.length === 1) listStr = `la condición de ${condStrs[0]}`;
    else if (condStrs.length === 2) listStr = `${condStrs[0]} o ${condStrs[1]}`;
    else listStr = `${condStrs.slice(0, -1).join(', ')} o ${condStrs[condStrs.length - 1]}`;

    const count = payload.count ? evalStr(payload.count) : '1';
    if (condStrs.length === 1) {
      return `termina ${listStr} sobre el objetivo`;
    }
    return `termina ${count} condición sobre el objetivo: ${listStr}`;
  }

  // ── Action payload ──────────────────────────────────────────────────────────
  if (type === 'action') {
    if (payload.text) return cleanEnglishPhrasesEs(evalStr(payload.text));
    if (payload.actionType === 'attack') return 'realiza un ataque adicional con arma';
    if (payload.actionType === 'general') return 'realiza una acción adicional, excepto la acción de Magia';
    return `realiza una acción`;
  }

  // ── Transform payload ───────────────────────────────────────────────────────
  if (type === 'transform') {
    const stats = Array.isArray(payload.statblock) ? payload.statblock.join(' o ') : payload.statblock;
    return `se transforma en un ${stats}`;
  }

  // ── Summon payload ──────────────────────────────────────────────────────────
  if (type === 'summon') {
    const stats = Array.isArray(payload.statblock) ? payload.statblock.join(' o ') : payload.statblock;
    return `invoca a ${stats}`;
  }

  // ── Choice payload ──────────────────────────────────────────────────────────
  if (type === 'choice') {
    const preamble = payload.text ? cleanEnglishPhrasesEs(evalStr(payload.text)) : 'Elige una de las siguientes opciones:';
    const opts = Array.isArray(payload.options) ? payload.options : [];
    const optionLines = opts.map(opt => {
      const optName = opt.name ? `**${evalStr(opt.name)}**: ` : '';
      const optBody = opt.text
        ? cleanEnglishPhrasesEs(evalStr(opt.text))
        : opt.payloads
          ? formatPayloadListEs(opt.payloads, evalStr, formatDiceObj)
          : '';
      return `> ${optName}${optBody}`;
    }).join('\n\n');
    return `${preamble}\n\n${optionLines}`;
  }

  return '';
}

// ─── Format Payload List en Español ─────────────────────────────────────────

export function formatPayloadListEs(payloadList, evalStr, formatDiceObj, ctx = {}) {
  if (!payloadList) return '';
  const rawList = Array.isArray(payloadList) ? payloadList : [payloadList];
  const sortedList = [...rawList].sort((a, b) => getPayloadRank(a) - getPayloadRank(b));

  const isSave = ctx?.pattern === 'save';
  const targetObj = ctx?.targetObj;
  const isTargetSelf = targetObj?.type === 'self' || (typeof targetObj?.range === 'string' && targetObj?.range.toLowerCase() === 'self');
  const isMultiSave = isSave && targetObj && (
    targetObj.aoe || targetObj.type === 'multiple' || targetObj.type === 'multi' ||
    (targetObj.count && parseInt(evalStr(targetObj.count), 10) > 1)
  );
  const targetSubject = isTargetSelf ? 'tú' : (isMultiSave ? 'cada objetivo' : 'el objetivo');
  const targetSubjectCap = isTargetSelf ? 'Tú' : (isMultiSave ? 'Cada objetivo' : 'El objetivo');

  // Merge contiguous forced movement
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

  let damageStr = '';
  const targetPredicates = [];
  const otherParts = [];
  let actionStr = '';

  for (const p of mergedList) {
    if (!p) continue;
    if (typeof p === 'string') {
      otherParts.push(cleanEnglishPhrasesEs(evalStr(p)));
      continue;
    }

    const ptype = getPayloadType(p);

    if (ptype === 'damage') {
      const fmtd = formatPayloadEs(p, evalStr, formatDiceObj, ctx);
      if (fmtd) damageStr = damageStr ? `${damageStr} más ${fmtd}` : fmtd;

    } else if (ptype === 'movement') {
      if (p.movementType === 'forced') {
        const dir = p.direction || 'push';
        const dist = p.distance ? `${evalStr(p.distance)} pies` : '5 pies';
        if (dir === 'push') targetPredicates.push(isTargetSelf ? `eres empujado hasta ${dist} de distancia` : `es empujado hasta ${dist} de distancia`);
        else if (dir === 'pull') targetPredicates.push(isTargetSelf ? `eres atraído hasta ${dist} más cerca` : `es atraído hasta ${dist} más cerca`);
        else targetPredicates.push(isTargetSelf ? `eres movido hasta ${dist}` : `es movido hasta ${dist}`);
      } else {
        const fmtd = formatPayloadEs(p, evalStr, formatDiceObj, ctx);
        if (fmtd) otherParts.push(fmtd);
      }

    } else if (ptype === 'condition') {
      const fmtd = formatPayloadEs(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        if (/^la condición/.test(fmtd)) {
          targetPredicates.push(isTargetSelf ? `sufres ${fmtd}` : `sufre ${fmtd}`);
        } else {
          targetPredicates.push(isTargetSelf ? `quedas ${fmtd}` : `queda ${fmtd}`);
        }
      }

    } else if (ptype === 'statModifier') {
      const fmtd = formatPayloadEs(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        if (isTargetSelf) {
          targetPredicates.push(fmtd.replace(/^su\b/i, 'tu').replace(/^gana\b/i, 'ganas'));
        } else {
          targetPredicates.push(fmtd);
        }
      }

    } else if (ptype === 'rollModifier') {
      const fmtd = formatPayloadEs(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        if (p.recipient === 'self') {
          otherParts.push(fmtd);
        } else if (/^(tiene|añade|resta|vuelve)\b/i.test(fmtd)) {
          if (isTargetSelf) {
            targetPredicates.push(fmtd.replace(/^tiene\b/i, 'tienes').replace(/^añade\b/i, 'añades').replace(/^resta\b/i, 'restas').replace(/^vuelve\b/i, 'vuelves'));
          } else {
            targetPredicates.push(fmtd);
          }
        } else {
          otherParts.push(fmtd);
        }
      }

    } else if (ptype === 'action') {
      actionStr = formatPayloadEs(p, evalStr, formatDiceObj, ctx);

    } else if (ptype === 'defense') {
      const fmtd = formatPayloadEs(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        targetPredicates.push(isTargetSelf ? fmtd.replace(/^gana\b/i, 'ganas') : fmtd);
      }

    } else if (ptype === 'damageReduction') {
      const fmtd = formatPayloadEs(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        otherParts.push(fmtd);
      }

    } else if (ptype === 'teleport') {
      const fmtd = formatPayloadEs(p, evalStr, formatDiceObj, ctx);
      if (fmtd) {
        if (/^el objetivo es\b/i.test(fmtd)) {
          targetPredicates.push(isTargetSelf ? fmtd.replace(/^el objetivo es\b/i, 'eres') : fmtd.replace(/^el objetivo es\b/i, 'es'));
        } else {
          otherParts.push(fmtd);
        }
      }

    } else {
      const fmtd = formatPayloadEs(p, evalStr, formatDiceObj, ctx);
      if (fmtd) otherParts.push(fmtd);
    }
  }

  const clauseParts = [];
  if (damageStr) clauseParts.push(damageStr);

  if (targetPredicates.length > 0) {
    let joinedPredicates = '';
    if (targetPredicates.length === 1) {
      joinedPredicates = targetPredicates[0];
    } else if (targetPredicates.length === 2) {
      joinedPredicates = `${targetPredicates[0]} y ${targetPredicates[1]}`;
    } else {
      joinedPredicates = `${targetPredicates.slice(0, -1).join(', ')} y ${targetPredicates[targetPredicates.length - 1]}`;
    }

    const startsWithPossessive = /^(su|tu)\s+/i.test(joinedPredicates);

    if (damageStr) {
      if (startsWithPossessive) {
        clauseParts.push(`y ${joinedPredicates}`);
      } else {
        clauseParts.push(`y ${targetSubject} ${joinedPredicates}`);
      }
    } else {
      if (startsWithPossessive) {
        if (isTargetSelf) {
          clauseParts.push(capitalize(joinedPredicates));
        } else {
          const statFixed = joinedPredicates.replace(
            /^su\s+([a-záéíóúñA-Z]+(?:\s+base)?)\s+(se reduce|pasa a ser)\b/i,
            (match, stat, verb) => {
              const cleanStat = stat.replace(/\s+base\b/i, '').toLowerCase().trim();
              const art = ['ca', 'velocidad', 'iniciativa'].includes(cleanStat) ? 'la' : 'el';
              const subjectPart = targetSubject === 'el objetivo' ? 'del objetivo' : `de ${targetSubject}`;
              return `${capitalize(art)} ${stat} ${subjectPart} ${verb}`;
            }
          );
          clauseParts.push(capitalize(statFixed));
        }
      } else {
        clauseParts.push(`${targetSubjectCap} ${joinedPredicates}`);
      }
    }
  }

  for (const part of otherParts) {
    if (!part) continue;
    let cleanedPart = part;
    if (targetPredicates.length > 0) {
      cleanedPart = cleanedPart.replace(/^(el\s+)?objetivo\s+/i, '');
    } else if (damageStr || clauseParts.length > 0) {
      if (/^(el\s+)?objetivo\s+/i.test(cleanedPart)) {
        cleanedPart = cleanedPart.replace(/^(el\s+)?objetivo\s+/i, `${targetSubject} `);
      }
    } else {
      if (/^el\s+objetivo\s+/i.test(cleanedPart)) {
        cleanedPart = cleanedPart.replace(/^el\s+objetivo\s+/i, `${targetSubjectCap} `);
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
    if (part.includes('\n\n') || part.startsWith('Elige ') || part.startsWith('y ')) {
      result = `${result} ${part}`;
    } else if (i === clauseParts.length - 1) {
      if (/^y\s+/i.test(part)) {
        result = `${result}, ${part}`;
      } else {
        result = `${result} y ${part}`;
      }
    } else {
      result = `${result}, ${part}`;
    }
  }

  return result
    .replace(/\bel\s+objetivo\s+su\s+([a-záéíóúñA-Z]+)\s+se\s+reduce\b/gi, 'su $1 se reduce')
    .replace(/\btú\s+tu\s+([a-záéíóúñA-Z]+)\s+se\s+reduce\b/gi, 'tu $1 se reduce')
    .replace(/\bel\s+objetivo\s+su\s+([a-záéíóúñA-Z]+)\s+base\s+pasa\s+a\s+ser\b/gi, 'la $1 base del objetivo pasa a ser')
    .replace(/\btú\s+tu\s+([a-záéíóúñA-Z]+)\s+base\s+pasa\s+a\s+ser\b/gi, 'tu $1 base pasa a ser')
    .replace(/\bel\s+objetivo\s+(el\s+objetivo|los\s+objetivos)\b/gi, 'el objetivo')
    .replace(/\bcada\s+objetivo\s+(el\s+objetivo|cada\s+objetivo)\b/gi, 'cada objetivo')
    .replace(/\bel\s+el\s+objetivo\b/gi, 'el objetivo')
    .replace(/\bSpeed\b/g, 'velocidad')
    .replace(/\bde\s+el\s+objetivo\b/gi, 'del objetivo');
}

// ─── Subject Noun Phrase & Conjugation en Español ───────────────────────────

function buildSubjectNounPhraseEs(targetObj, activityRange, evalStr) {
  if (!targetObj) return 'Tú';

  const type = (evalStr(targetObj.type || '') || '').toLowerCase();
  const rawRange = evalStr(targetObj.range || activityRange || '').trim();
  const cleanRange = formatDistanceEs(rawRange).replace(/^(alcance|reach|range)\s*(de\s*)?/i, '').trim();

  const filterSingular = formatFilterTextEs(targetObj.filter, evalStr, false);
  const filterPlural = formatFilterTextEs(targetObj.filter, evalStr, true);
  const art = getIndefiniteArticleEs(filterSingular);

  if (targetObj.inherit === 'trigger') return 'El objetivo';
  if (targetObj.inherit === 'prev_step') return '';

  const lowerRange = cleanRange.toLowerCase();
  if (type === 'self' || lowerRange === 'self' || lowerRange === 'personal') return 'Tú';
  if (type === 'touch' || lowerRange === 'touch' || lowerRange === 'toque') {
    return `${capitalize(art)} ${filterSingular} que toques`;
  }

  const countRaw = targetObj.count !== undefined ? evalStr(targetObj.count) : '';
  const countNum = parseInt(countRaw, 10);
  const isMultiple = type === 'multiple' || type === 'multi' || (!isNaN(countNum) && countNum > 1);

  if (isMultiple) {
    const rangePart = cleanRange && !/^self$/i.test(cleanRange) && !/^personal$/i.test(cleanRange) ? ` a ${cleanRange}` : '';
    if (!countRaw || isNaN(countNum)) {
      return `${capitalize(filterPlural)} que elijas${rangePart}`;
    }
    const noun = countNum === 1 ? filterSingular : filterPlural;
    return `Hasta ${countRaw} ${noun}${rangePart}`;
  }

  if (cleanRange && !/^self$/i.test(cleanRange) && !/^personal$/i.test(cleanRange)) {
    return `${capitalize(art)} ${filterSingular} a ${cleanRange}`;
  }

  return `${capitalize(art)} ${filterSingular}`;
}

function isPluralSubjectEs(subject) {
  if (!subject || typeof subject !== 'string') return false;
  const s = subject.trim();
  if (/^hasta 1\b/i.test(s)) return false;
  if (/^hasta \d+/i.test(s)) return true;
  if (/^(criaturas|objetivos|aliados|enemigos|muertos vivientes|bestias|humanoides)\b/i.test(s)) return true;
  if (/\bque elijas\b/i.test(s) && !/^una\b/i.test(s) && !/^un\b/i.test(s)) return true;
  return false;
}

function isDamageBodyEs(str) {
  if (!str) return false;
  const s = str.trim().toLowerCase();
  return /(\d+d[a-z0-9$()._+-]+|\$\([^)]+\)|\d+)\s+de\s+daño/i.test(s) || /daño\s+[a-z/]+/i.test(s);
}

function conjugateToThirdPersonEs(body) {
  return body.replace(
    /^(ganar|ganas|gana|añadir|añades|añade|recibir|recibes|recibe|reducir|reduces|reduce|moverse|te mueves|se mueve|lanzas|lanza|teletransportarse|te teletransportas|se teletransporta|crear|creas|crea|terminar|terminas|termina|duplicar|duplicas|duplica|cambiar|cambias|cambia|elegir|eliges|elige|dar|das|da|otorgar|otorgas|otorga|realizar|realizas|realiza|causar|causas|causa|dejar|dejas|deja|infligir|infliges|inflige|recuperar|recuperas|recupera|gastar|gastas|gasta|usar|usas|usa|ignorar|ignoras|ignora|suprimir|suprimes|suprime|activar|activas|activa|tener|tienes|tiene|pasar|pasas|pasa)\b/i,
    match => {
      const m = match.toLowerCase();
      const map = {
        ganar: 'gana', ganas: 'gana', gana: 'gana',
        añadir: 'añade', añades: 'añade', añade: 'añade',
        recibir: 'recibe', recibes: 'recibe', recibe: 'recibe',
        reducir: 'reduce', reduces: 'reduce', reduce: 'reduce',
        moverse: 'se mueve', 'te mueves': 'se mueve', 'se mueve': 'se mueve',
        lanzas: 'lanza', lanza: 'lanza',
        teletransportarse: 'se teletransporta', 'te teletransportas': 'se teletransporta', 'se teletransporta': 'se teletransporta',
        crear: 'crea', creas: 'crea', crea: 'crea',
        terminar: 'termina', terminas: 'termina', termina: 'termina',
        duplicar: 'duplica', duplicas: 'duplica', duplica: 'duplica',
        cambiar: 'cambia', cambias: 'cambia', cambia: 'cambia',
        elegir: 'elige', eliges: 'elige', elige: 'elige',
        dar: 'da', das: 'da', da: 'da',
        otorgar: 'otorga', otorgas: 'otorga', otorga: 'otorga',
        realizar: 'realiza', realizas: 'realiza', realiza: 'realiza',
        causar: 'causa', causas: 'causa', causa: 'causa',
        dejar: 'deja', dejas: 'deja', deja: 'deja',
        infligir: 'inflige', infliges: 'inflige', inflige: 'inflige',
        recuperar: 'recupera', recuperas: 'recupera', recupera: 'recupera',
        gastar: 'gasta', gastas: 'gasta', gasta: 'gasta',
        usar: 'usa', usas: 'usa', usa: 'usa',
        ignorar: 'ignora', ignoras: 'ignora', ignora: 'ignora',
        suprimir: 'suprime', suprimes: 'suprime', suprime: 'suprime',
        activar: 'activa', activas: 'activa', activa: 'activa',
        tener: 'tiene', tienes: 'tiene', tiene: 'tiene',
        pasar: 'pasa', pasas: 'pasa', pasa: 'pasa'
      };
      return map[m] || m;
    }
  );
}

// ─── Format Block en Español ────────────────────────────────────────────────

export function formatBlockEs(block, activity, evaluator, scope, blockIndex = 0, translations = null) {
  if (!block) return '';

  const activeTranslations = translations || fallbackTranslations;
  const activityId = activity?.id || '';
  const transEntry = activeTranslations?.[activityId] || (activity?.name ? activeTranslations?.[activity.name] : null);
  const localizedSummary = scope?.summary || transEntry?.summary || activity?.summaryEs || activity?.summary || '';
  const localizedDescription = scope?.description || transEntry?.description || activity?.descriptionEs || activity?.description || '';

  const effectiveScope = {
    range: activity?.range || '',
    duration: activity?.duration || '',
    summary: localizedSummary,
    description: localizedDescription,
    ...(activity?.variables || {}),
    ...(scope || {}),
  };

  const evalStr = (val) => {
    if (val === null || val === undefined) return '';
    let strVal = String(val);
    if (strVal === '$(range)' || strVal === 'range') return String(activity?.range || '');
    if (strVal.includes('$(range)')) strVal = strVal.replace(/\$\(range\)/g, String(activity?.range || ''));
    if (strVal === '$(summary)' || strVal === 'summary') return String(localizedSummary || localizedDescription || '');
    if (strVal.includes('$(summary)')) strVal = strVal.replace(/\$\(summary\)/g, String(localizedSummary || localizedDescription || ''));
    if (strVal === '$(description)' || strVal === 'description') return String(localizedDescription || localizedSummary || '').trim();
    if (strVal.includes('$(description)')) strVal = strVal.replace(/\$\(description\)/g, String(localizedDescription || localizedSummary || '').trim());
    if (strVal.includes('$')) {
      try {
        const res = evaluator ? evaluator.evaluate(strVal, effectiveScope) : strVal;
        return res !== null && res !== undefined ? String(res) : strVal;
      } catch (e) {
        return strVal;
      }
    }
    return strVal;
  };

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
        minSuffix = ` (mín: ${totalCrunchedMin})`;
      } else if (totalMinOverride !== null && totalMinOverride !== undefined && totalMinOverride !== '') {
        minSuffix = ` (mín: ${totalMinOverride})`;
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
  const formattedRange = formatDistanceEs(rawRange);
  const text = block.text ? cleanEnglishPhrasesEs(evalStr(block.text).trim()) : '';
  const triggerStr = formatTriggerEs(block.trigger, evalStr);
  let mainBody = '';

  // ── 1. ATTACK ──────────────────────────────────────────────────────────────
  if (pattern === 'attack' && block.attack) {
    const rawClassif = (evalStr(block.attack.classification || 'melee')).toLowerCase();
    const classif = rawClassif === 'ranged' ? 'A Distancia' : 'Cuerpo a Cuerpo';
    const rawBonus = evaluator.evaluate(block.attack.bonus || '$(attributes.spellcasting.attack)', effectiveScope);
    const numBonus = typeof rawBonus === 'number' ? rawBonus : Number(rawBonus);
    const bonusStr = !isNaN(numBonus)
      ? formatBonus(numBonus)
      : evalStr(block.attack.bonus || '$(attributes.spellcasting.attack)');

    const targetDesc = formatTargetTextEs(block.target, formattedRange, evalStr, true, activity);
    const rangeOutput = formattedRange.startsWith('alcance')
      ? formattedRange
      : `alcance de ${formattedRange}`;

    let hitText = '';
    if (block.hit) {
      const hitCtx = { pattern: 'attack', role: 'hit', targetObj: block.target };
      let formattedHit = formatPayloadListEs(block.hit, evalStr, formatDiceObj, hitCtx);
      if (block.hitOrMiss) {
        const formattedHitOrMiss = formatPayloadListEs(block.hitOrMiss, evalStr, formatDiceObj, { pattern: 'attack', role: 'hitOrMiss', targetObj: block.target });
        if (formattedHitOrMiss) formattedHit = `${formattedHit}, y ${formattedHitOrMiss}`;
      }
      if (formattedHit) hitText = ` _Impacto:_ ${formattedHit}.`;
    }

    let missText = '';
    if (block.miss) {
      const isStructuredOutcome = typeof block.miss === 'object'
        && !Array.isArray(block.miss)
        && ('halfDamage' in block.miss || 'payloads' in block.miss
          || ('text' in block.miss && !('type' in block.miss)));

      if (isStructuredOutcome) {
        const parts = [];
        if (block.miss.halfDamage) parts.push('la mitad de daño');
        if (block.miss.payloads) {
          const pStr = formatPayloadListEs(block.miss.payloads, evalStr, formatDiceObj, { pattern: 'attack', role: 'miss', targetObj: block.target });
          if (pStr) parts.push(pStr);
        }
        if (block.miss.text) parts.push(cleanEnglishPhrasesEs(evalStr(block.miss.text)));
        if (parts.length > 0) {
          missText = ` _Fallo:_ ${capitalize(parts.join(', '))}.`;
        }
      } else {
        const formattedMiss = formatPayloadListEs(block.miss, evalStr, formatDiceObj, { pattern: 'attack', role: 'miss', targetObj: block.target });
        if (formattedMiss) missText = ` _Fallo:_ ${capitalize(formattedMiss)}.`;
      }
    }

    let critText = '';
    if (block.crit) {
      const formattedCrit = formatPayloadListEs(block.crit, evalStr, formatDiceObj, { pattern: 'attack', role: 'crit', targetObj: block.target });
      if (formattedCrit) critText = ` _Impacto Crítico:_ ${capitalize(formattedCrit)}.`;
    }

    mainBody = `_Tirada de Ataque ${classif}:_ ${bonusStr}, ${rangeOutput.replace(/\.+$/, '')}${targetDesc}.${hitText}${missText}${critText}${text ? ` ${text}` : ''}`;
  }

  // ── 2. SAVE ────────────────────────────────────────────────────────────────
  else if (pattern === 'save' && block.save) {
    const abilityKey = (evalStr(block.save.ability) || 'dex').toLowerCase();
    const fullAbility = ABILITY_NAMES_ES[abilityKey] || capitalize(abilityKey);
    const dcVal = evalStr(block.save.dc || '$(attributes.spellcasting.save)');
    const targetDesc = formatTargetTextEs(block.target, formattedRange, evalStr, false, activity);

    const saveCtx = { pattern: 'save', targetObj: block.target, saveDc: dcVal };

    let alwaysText = '';
    if (block.failureOrSuccess) {
      const fmtd = formatPayloadListEs(block.failureOrSuccess, evalStr, formatDiceObj, { ...saveCtx, role: 'failureOrSuccess' });
      if (fmtd) alwaysText = ` _Fallo o Éxito:_ ${fmtd}.`;
    }

    let failText = '';
    if (block.failure) {
      const fmtd = formatPayloadListEs(block.failure, evalStr, formatDiceObj, { ...saveCtx, role: 'failure' });
      if (fmtd) failText = ` _Fallo:_ ${capitalize(fmtd)}.`;
    }

    let successText = '';
    if (block.success) {
      const isStructuredOutcome = typeof block.success === 'object'
        && !Array.isArray(block.success)
        && ('halfDamage' in block.success || 'payloads' in block.success
          || ('text' in block.success && !('type' in block.success)));

      if (isStructuredOutcome) {
        const parts = [];
        if (block.success.halfDamage) parts.push('la mitad de daño');
        if (block.success.payloads) {
          const pStr = formatPayloadListEs(block.success.payloads, evalStr, formatDiceObj, { ...saveCtx, role: 'success' });
          if (pStr) parts.push(pStr);
        }
        if (block.success.text) parts.push(cleanEnglishPhrasesEs(evalStr(block.success.text)));
        if (parts.length > 0) {
          successText = ` _Éxito:_ ${capitalize(parts.join(', '))}.`;
        }
      } else {
        const fmtd = formatPayloadListEs(block.success, evalStr, formatDiceObj, { ...saveCtx, role: 'success' });
        if (fmtd) successText = ` _Éxito:_ ${capitalize(fmtd)}.`;
      }
    }

    mainBody = `_Tirada de Salvación de ${fullAbility}:_ CD ${dcVal}${targetDesc}.${alwaysText}${failText}${successText}${text ? ` ${text}` : ''}`.replace(/\.\./g, '.');
  }

  // ── 3. HEALING ─────────────────────────────────────────────────────────────
  else if (pattern === 'healing' && block.healing) {
    const subject = buildSubjectNounPhraseEs(block.target, activity?.range, evalStr);
    const diceStr = formatDiceObj(block.healing.dice, undefined, evalStr);
    const isTempHP = block.healing.type === 'tempHitPoints';
    const typeLabel = isTempHP ? 'Puntos de Golpe Temporales' : 'Puntos de Golpe';
    const isPlural = isPluralSubjectEs(subject);
    const isSelf = subject === 'Tú';
    const verb = isSelf
      ? (isTempHP ? 'ganas' : 'recuperas')
      : (isPlural ? (isTempHP ? 'ganan' : 'recuperan') : (isTempHP ? 'gana' : 'recupera'));

    let healStr = diceStr ? `${diceStr} ${typeLabel}` : typeLabel;
    if (block.healing.pool) healStr += ', divididos entre los objetivos';

    let payloadPart = '';
    if (block.payloads) {
      const pArr = Array.isArray(block.payloads) ? block.payloads : [block.payloads];
      const pTexts = pArr.map(p => {
        let t = formatPayloadEs(p, evalStr, formatDiceObj, { pattern: 'healing', targetObj: block.target });
        if (p.type === 'conditionCleanse') {
          t = `puedes ${t}`;
        }
        return t;
      }).filter(Boolean);
      if (pTexts.length > 0) {
        payloadPart = `, y ${pTexts.join(', y ')}`;
      }
    }

    const leadSubject = isSelf ? capitalize(verb) : `${subject} ${verb}`;
    mainBody = `${leadSubject} ${healStr}${payloadPart}.`;
    if (text) mainBody += ` ${capitalize(text.replace(/\.$/, ''))}.`;
  }

  // ── 4. AUTOMATIC ───────────────────────────────────────────────────────────
  else if (pattern === 'automatic') {
    const payloadObj = block.payloads;
    const fromPayloads = !!payloadObj && !text;
    const payloadText = payloadObj ? formatPayloadListEs(payloadObj, evalStr, formatDiceObj, { pattern: 'automatic', targetObj: block.target }) : '';

    let rawBody = '';
    if (payloadText && text) {
      rawBody = `${payloadText}. ${capitalize(text)}`;
    } else if (payloadText) {
      rawBody = payloadText;
    } else {
      rawBody = text;
    }

    const subject = buildSubjectNounPhraseEs(block.target, activity?.range, evalStr);
    const isPlural = isPluralSubjectEs(subject);
    const isSelf = subject === 'Tú';

    let bodyStr = rawBody;

    if (block.target?.aoe) {
      const rawShape = (evalStr(block.target.aoe.shape || 'sphere')).toLowerCase();
      const size = evalStr(block.target.aoe.size || '');
      const aoePhrase = formatAoePhraseEs(rawShape, size);
      const rawRangeVal = evalStr(block.target?.range || activity?.range || '').trim();
      const cleanRangeVal = formatDistanceEs(rawRangeVal).replace(/^(alcance|reach|range)\s*(de\s*)?/i, '');
      const rangePart = cleanRangeVal && !/^personal$/i.test(cleanRangeVal) && !/^self$/i.test(cleanRangeVal)
        ? ` centrada en un punto a ${cleanRangeVal}`
        : '';
      bodyStr = `${capitalize(aoePhrase)}${rangePart} ${rawBody.charAt(0).toLowerCase() + rawBody.slice(1)}`;

    } else if (block.target?.inherit === 'trigger') {
      const lower = rawBody.toLowerCase();
      if (lower.startsWith('el objetivo') || lower.startsWith('el atacante') || lower.startsWith('el siguiente')) {
        bodyStr = rawBody;
      } else if (isDamageBodyEs(rawBody)) {
        bodyStr = `El objetivo recibe ${rawBody.charAt(0).toLowerCase() + rawBody.slice(1)}`;
      } else {
        const verbThirdPerson = conjugateToThirdPersonEs(rawBody);
        bodyStr = `El objetivo ${verbThirdPerson.charAt(0).toLowerCase() + verbThirdPerson.slice(1)}`;
      }

    } else if (block.target?.inherit === 'prev_step') {
      bodyStr = rawBody;

    } else if (fromPayloads) {
      let lowerBody = rawBody.charAt(0).toLowerCase() + rawBody.slice(1);
      // Replace leading "el objetivo " with subject to avoid "Una criatura el objetivo gana..."
      if (!isSelf && subject && /^el\s+objetivo\s+/i.test(lowerBody)) {
        lowerBody = lowerBody.replace(/^el\s+objetivo\s+/i, '');
      }

      if (/(?:su|tu|la|el)?\s*ca\s+base\b/i.test(lowerBody)) {
        const valPart = lowerBody.replace(/^.*?\bpasa\s+a\s+ser\s*/i, '');
        if (isSelf) {
          bodyStr = `Tu CA base pasa a ser ${valPart}`;
        } else {
          bodyStr = `${subject} pasa a tener una CA base de ${valPart}`;
        }
      } else if (/(?:su|tu|la|el)?\s*velocidad\s+base\b/i.test(lowerBody)) {
        const valPart = lowerBody.replace(/^.*?\bpasa\s+a\s+ser\s*/i, '');
        if (isSelf) {
          bodyStr = `Tu velocidad base pasa a ser ${valPart}`;
        } else {
          bodyStr = `${subject} pasa a tener una velocidad base de ${valPart}`;
        }
      } else if (isDamageBodyEs(rawBody)) {
        if (isSelf) {
          bodyStr = `Infliges ${lowerBody}`;
        } else if (isPlural) {
          bodyStr = `${subject} reciben ${lowerBody}`;
        } else {
          bodyStr = `${subject} recibe ${lowerBody}`;
        }
      } else if (isSelf) {
        bodyStr = capitalize(lowerBody);
      } else {
        bodyStr = `${subject} ${lowerBody}`;
      }

    } else {
      // Narrative text: check if it's a summary, description, or narrative clause
      const rawTrimmed = (rawBody || '').trim();
      const lowerBody = rawTrimmed.charAt(0).toLowerCase() + rawTrimmed.slice(1);
      const isSummaryRef = block.text === '$(summary)' || block.text === 'summary' || block.text === '$(description)' || block.text === 'description';

      // Check if text is a complete narrative sentence / caster action
      const isNarrative = isSummaryRef ||
        /^(otorgas|creas|lanzas|tocas|realizas|imbuyes|haces|eliges|manifiestas|fijas|señalas|purificas|invocas|te teletransportas|puedes|reparas|restauras|transformas|detectas|percibes|adivinas|comprendes|aprendes|despiertas|proteges|bendices|maldices|sientes|cuando|mientras|si|una vez|al inicio|al final|en cada|durante|hasta que|a menos que|para la duración|el objetivo|cada objetivo|los objetivos|tú|tus|su|sus|una criatura|un objeto|esta criatura)\b/i.test(lowerBody);

      if (isNarrative || isSelf) {
        bodyStr = cleanEnglishPhrasesEs(rawTrimmed);
      } else {
        const conjugated = conjugateToThirdPersonEs(cleanEnglishPhrasesEs(lowerBody));
        bodyStr = `${subject} ${conjugated}`;
      }
    }

    if (bodyStr) bodyStr = capitalize(bodyStr);
    let cleanBody = bodyStr.trim();
    if (cleanBody && !/[.!?]$/.test(cleanBody)) cleanBody = `${cleanBody}.`;

    let rangeText = '';
    const explicitBlockRange = block.target?.range ? evalStr(block.target.range).trim() : '';
    const rawRangeVal = explicitBlockRange || (blockIndex === 0 ? evalStr(activity?.range || '').trim() : '');
    const cleanRangeVal = formatDistanceEs(rawRangeVal).replace(/^(alcance|reach|range)\s*(de\s*)?/i, '').trim();
    const bodyHasRange = cleanRangeVal
      && (cleanBody.toLowerCase().includes(`a ${cleanRangeVal.toLowerCase()}`)
        || cleanBody.toLowerCase().includes(cleanRangeVal.toLowerCase())
        || (cleanRangeVal.toLowerCase() === 'toque' && cleanBody.toLowerCase().includes('que toques')));
    if (cleanRangeVal && !/^personal$/i.test(cleanRangeVal) && !/^self$/i.test(cleanRangeVal) && !bodyHasRange) {
      rangeText = ` _Alcance:_ ${capitalize(cleanRangeVal)}.`;
    }

    mainBody = `${cleanBody}${rangeText}`.trim();
  }

  // ── 5. AURA ────────────────────────────────────────────────────────────────
  else if (pattern === 'aura') {
    const rawShape = (evalStr(block.target?.aoe?.shape || 'sphere')).toLowerCase();
    const size = evalStr(block.target?.aoe?.size || '');
    const cleanRange = evalStr(block.target?.range || activity?.range || '').trim();
    const aoePhrase = formatAoePhraseEs(rawShape, size);

    let locationPhrase = '';
    if (rawShape === 'emanation' || /^self$/i.test(cleanRange) || /^personal$/i.test(cleanRange)) {
      locationPhrase = rawShape === 'line' ? 'que se origina en ti' : 'centrada en ti';
    } else if (cleanRange) {
      locationPhrase = `centrada en un punto a ${formatDistanceEs(cleanRange).replace(/^(alcance|reach|range)\s*(de\s*)?/i, '')}`;
    }

    let auraText = text.trim();
    const ofPart = auraText ? ` de ${cleanEnglishPhrasesEs(auraText)}` : '';
    let bodyStr = `Aparece ${aoePhrase}${ofPart} ${locationPhrase}`.trim();

    const extras = [];
    if (block.difficultTerrain) extras.push('crea Terreno Difícil');
    if (block.obscured) extras.push('proporciona Ocultación Total');
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
  }

  // ── Fallback ────────────────────────────────────────────────────────────────
  else {
    mainBody = cleanEnglishPhrasesEs(text) || '';
  }

  // ── Repeat, reliable & trigger wrapping ────────────────────────────────────
  const repeatText = formatRepeatEs(block.repeat, pattern, evalStr);
  const reliableText = block.reliable === true ? ' (no gasta el recurso en caso de fallo)' : '';

  let resultBody = mainBody.trim();
  if (resultBody && !/[.!?]$/.test(resultBody)) {
    resultBody = `${resultBody}${reliableText}.`;
  } else if (reliableText) {
    resultBody = resultBody.replace(/\.$/, `${reliableText}.`);
  }
  if (repeatText) resultBody = `${resultBody}${repeatText}`;

  if (triggerStr) {
    const cleanBody = resultBody.replace(/\.$/, '');
    return `_Desencadenante:_ ${triggerStr}. _Efecto:_ ${cleanBody}.`;
  }

  return resultBody;
}

// ─── Entrada Principal ──────────────────────────────────────────────────────

export function formatActivityMechanicEs(activity, characterData, customTranslations = null) {
  if (!activity) return '';

  const translations = (customTranslations && (customTranslations.dataTranslations || customTranslations)) || fallbackTranslations;
  const activityId = activity?.id || '';
  const transEntry = translations?.[activityId] || (activity?.name ? translations?.[activity.name] : null);
  const localizedSummary = transEntry?.summary || activity?.summaryEs || activity?.summary || '';
  const localizedDescription = transEntry?.description || activity?.descriptionEs || activity?.description || '';
  const localizedName = transEntry?.name || activity?.name || activityId;

  const evaluator = new ExpressionEvaluator(characterData || {});
  const topScope = {
    range: activity?.range || '',
    duration: activity?.duration || '',
    summary: localizedSummary,
    description: localizedDescription,
    ...(activity?.variables || {}),
  };

  const evalStr = (val) => {
    if (val === null || val === undefined) return '';
    let strVal = String(val);
    if (strVal === '$(range)' || strVal === 'range') return String(activity?.range || '');
    if (strVal.includes('$(range)')) strVal = strVal.replace(/\$\(range\)/g, String(activity?.range || ''));
    if (strVal === '$(summary)' || strVal === 'summary') return String(localizedSummary || localizedDescription || '');
    if (strVal.includes('$(summary)')) strVal = strVal.replace(/\$\(summary\)/g, String(localizedSummary || localizedDescription || ''));
    if (strVal === '$(description)' || strVal === 'description') return String(localizedDescription || localizedSummary || '').trim();
    if (strVal.includes('$(description)')) strVal = strVal.replace(/\$\(description\)/g, String(localizedDescription || localizedSummary || '').trim());
    if (strVal.includes('$')) {
      try {
        const res = evaluator ? evaluator.evaluate(strVal, topScope) : strVal;
        return res !== null && res !== undefined ? String(res) : strVal;
      } catch (e) {
        return strVal;
      }
    }
    return strVal;
  };

  const scope = topScope;
  const name = localizedName;
  const mechanic = activity.mechanic;

  const formatExtras = () => {
    if (!activity.extra) return '';
    const rawExtras = Array.isArray(activity.extra) ? activity.extra : [activity.extra];
    const extraParts = rawExtras
      .map(item => {
        if (!item) return '';
        if (typeof item === 'object') {
          const rawName = item.name || '';
          if (rawName === 'Using a Higher-Level Spell Slot' || rawName === 'Con un espacio de conjuro superior') return '';
          const evaluatedName = rawName ? evalStr(rawName) : '';
          if (evaluatedName === 'Using a Higher-Level Spell Slot' || evaluatedName === 'Con un espacio de conjuro superior') return '';
          const title = evaluatedName ? `_${evaluatedName}:_ ` : '';
          const body = item.description ? cleanEnglishPhrasesEs(evalStr(item.description)) : '';
          return `${title}${body}`.trim();
        }
        const evaluated = evalStr(String(item)).trim();
        if (evaluated === 'Using a Higher-Level Spell Slot' || evaluated === 'Con un espacio de conjuro superior') return '';
        return cleanEnglishPhrasesEs(evaluated);
      })
      .filter(Boolean);

    if (extraParts.length === 0) return '';
    return '\n\n' + extraParts.map(e => `> ${e}`).join('\n\n');
  };

  const formatDurationSuffix = () => {
    const rawDur = activity.duration ? evalStr(String(activity.duration)) : '';
    if (!rawDur || typeof rawDur !== 'string') return '';
    const cleanDur = rawDur.trim();
    if (/^instantaneous$/i.test(cleanDur) || cleanDur === '') return '';
    const concMatch = cleanDur.match(/concentration(?:,\s*|\s+)?(?:up to\s+)?(.+)/i);
    if (concMatch) {
      let durText = concMatch[1].trim();
      durText = durText
        .replace(/\bup to\s+/gi, 'hasta ')
        .replace(/\bminute(s)?\b/gi, 'minuto$1')
        .replace(/\bhour(s)?\b/gi, 'hora$1')
        .replace(/\bround(s)?\b/gi, 'asalto$1');
      return ` _Concentración:_ Hasta ${durText.replace(/^hasta\s+/i, '')}.`;
    }
    let durText = cleanDur;
    durText = durText
      .replace(/\bup to\s+/gi, 'hasta ')
      .replace(/\bminute(s)?\b/gi, 'minuto$1')
      .replace(/\bhour(s)?\b/gi, 'hora$1')
      .replace(/\bround(s)?\b/gi, 'asalto$1')
      .replace(/\buntil dispelled\b/gi, 'hasta que se disipe')
      .replace(/\bspecial\b/gi, 'especial');
    return ` _Duración:_ ${capitalize(durText)}.`;
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
    const fallbackRaw = localizedDescription || localizedSummary || activity.description || activity.summary || '';
    const fallbackEvaluated = cleanEnglishPhrasesEs(evalStr(fallbackRaw));
    const fallbackText = fallbackEvaluated.split('\n')[0].trim();
    return `**${name}.** ${fallbackText}${durSuffix}${ritualSuffix}${extraSuffix}`;
  }

  const mechanicObj = Array.isArray(mechanic)
    ? { mode: 'succession', blocks: mechanic }
    : (mechanic && Array.isArray(mechanic.blocks) && !mechanic.mode ? { mode: 'succession', ...mechanic } : mechanic);

  // ── Upcast resolution ─────────────────────────────────────────────────────
  const upcastSpec = mechanicObj.upcast ?? mechanic.upcast ?? null;
  const upcastSteps = computeWarlockUpcastSteps(activity, characterData);
  const isWarlock = characterData?.resources?.some(r => r.id === 'pactMagicSpellSlot');

  let effectiveMechanic = mechanicObj;
  if (upcastSpec && upcastSteps > 0) {
    effectiveMechanic = applyUpcast(mechanicObj, upcastSpec, upcastSteps);
  }

  const rawResource = activity?.resource;
  const resourceId = Array.isArray(rawResource)
    ? (rawResource[0] || '')
    : (typeof rawResource === 'string' ? rawResource : (rawResource?.id || ''));
  const baseMatch = typeof resourceId === 'string' ? resourceId.match(/^level(\d+)SpellSlot$/) : null;
  const baseLevel = baseMatch ? parseInt(baseMatch[1], 10) : 0;
  const maxSlotLevel = computeMaxSlotLevel(characterData);
  const showUpcastLabel = upcastSpec && !isWarlock && baseLevel > 0 && maxSlotLevel > baseLevel;

  const evalStrForLabel = s => evaluator.evaluate(s, scope);
  const upcastSuffix = showUpcastLabel
    ? ` _Lanzamiento Superior:_ ${deriveUpcastLabelEs(upcastSpec, effectiveMechanic, activity, evalStrForLabel)}.`
    : '';

  const fullSuffix = `${durSuffix}${ritualSuffix}${upcastSuffix}${extraSuffix}`;

  const effectiveBlocks = effectiveMechanic.blocks;

  if (effectiveMechanic.mode || Array.isArray(effectiveBlocks)) {
    const blocks = Array.isArray(effectiveBlocks) ? effectiveBlocks : [];

    if (effectiveMechanic.mode === 'choice') {
      const topTrigger = effectiveMechanic.trigger ? formatTriggerEs(effectiveMechanic.trigger, evalStr) : '';
      const triggerPart = topTrigger ? ` _Desencadenante:_ ${topTrigger}. _Efecto:_` : '';

      const hasAuraBlock0 = blocks[0]?.pattern === 'aura';
      const auraPreamble = hasAuraBlock0 ? formatBlockEs(blocks[0], activity, evaluator, scope, 0, translations) : '';
      const choiceBlocks = hasAuraBlock0 ? blocks.slice(1) : blocks;

      const preamble = effectiveMechanic.text
        ? cleanEnglishPhrasesEs(evalStr(String(effectiveMechanic.text)).trim())
        : (hasAuraBlock0 ? '' : 'Elige una de las siguientes opciones:');

      const choiceLines = choiceBlocks
        .map(b => {
          const title = b.name ? `**${b.name}**: ` : '';
          const content = formatBlockEs(b, activity, evaluator, scope, 0, translations);
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
        const content = formatBlockEs(b, activity, evaluator, scope, idx, translations);
        if (!content) return '';
        const title = b.name && idx > 0 ? `**${b.name}.** ` : '';
        return `${title}${content}`;
      })
      .filter(Boolean);
    return `**${name}.** ${contentParts.join(' ')}${fullSuffix}`;
  }

  const content = formatBlockEs(effectiveMechanic, activity, evaluator, scope, 0, translations);
  return `**${name}.** ${content}${fullSuffix}`;
}

export { formatActivityMechanicEs as formatActivityMechanic };
