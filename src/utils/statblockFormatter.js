/**
 * Statblock entry formatting.
 *
 * Statblock `actions`, `bonusActions` and `reactions` entries are Activity-like:
 *   { id, name, tags?, recharge?, limit?, mechanic?, description? }
 * Entries with a `mechanic` are rendered through the mechanic formatter; entries
 * without one fall back to their (already evaluated) `description` prose.
 */
import { formatActivityMechanic } from './mechanicFormatter.js';

export const ACTION_NAMES_ES = {
  beastsStrike: "Ataque de la Bestia",
  otherworldlyScratch: "Arañazo de Ultratumba",
  dreadfulSwipe: "Zarpazo Pavoroso",
  otherworldlySlam: "Golpe de Ultratumba",
  healingTouch: "Toque Curativo",
  feyStep: "Paso Feérico",
  fellGlare: "Mirada Siniestra",
  forceEmpoweredRend: "Desgarrón Potenciado por Fuerza",
  repair: "Reparar",
  deflectAttack: "Desviar Ataque",
  vestigesStrike: "Ataque del Vestigio",
  divinePower: "Poder Divino",
  multiattack: "Multiataque",
  eyeRay: "Rayo Ocular",
  psychicSlam: "Golpe Psíquico",
  claw: "Garra",
  crystalStrike: "Golpe Cristalino",
  shardSwarm: "Enjambre de Fragmentos",
  ectoplasmicSplash: "Salpicadura Ectoplásmica",
  ephemeralRay: "Rayo Efímero",
  rend: "Desgarrar",
  slam: "Golpe",
  berserkLashing: "Azote Enloquecido",
  feyBlade: "Espada Feérica",
  shortsword: "Espada Corta",
  shortbow: "Arco Corto",
  deathlyTouch: "Toque Mortal",
  rottingClaw: "Garra Putrefacta",
  graveBolt: "Descarga de la Tumba",
  bestialStrike: "Ataque Bestial",
  inkCloud: "Nube de Tinta",
  trample: "Pisotear",
  engulf: "Envolver",
  hazardousSpew: "Vómito Peligroso",
  eruptingBreach: "Brecha Eruptiva",
  rampage: "Frenesí",
  nimbleEscape: "Escape Ágil",
  swoop: "Abalanzarse",
  incandescentBreath: "Aliento Incandescente",
  energizingPollen: "Polen Energizante"
};

export const STATBLOCK_TRAITS_ES = {
  'Primal Bond': {
    name: 'Vínculo Primigenio',
    description: 'Añade $(attributes.prof) a cualquier prueba de característica o tirada de salvación que haga la bestia.'
  },
  'Amphibious': {
    name: 'Anfibio',
    description: 'La bestia puede respirar aire y agua.'
  },
  'Flyby': {
    name: 'Ataque al Vuelo',
    description: "La bestia no provoca Ataques de Oportunidad cuando sale volando del alcance de un enemigo."
  },
  'Flyby (Requires Druid Level 10+)': {
    name: 'Ataque al Vuelo (Requiere Druida Nivel 10+)',
    description: "No provocas Ataques de Oportunidad cuando sales volando del alcance de un enemigo."
  },
  'Extradimensional Escape (Recharges after a Long Rest)': {
    name: 'Escape Extradimensional (Recarga tras un Descanso Largo)',
    description: 'Cuando el familiar fuera a caer a 0 Puntos de Golpe, en su lugar cae a 1 Punto de Golpe y desaparece a un espacio extradimensional, dejando atrás cualquier cosa que llevara puesta o cargara. Permanece allí durante 1 hora o hasta que lo invoques como una acción Mágica, momento en el cual reaparece en tu espacio.'
  },
  'Deliver Spell': {
    name: 'Transmitir Conjuro',
    description: 'Cuando lanzas un conjuro con alcance de toque, el familiar puede transmitir el conjuro con su toque. Para hacerlo, el familiar debe estar a 120 pies o menos de ti.'
  },
  'Death Burst': {
    name: 'Estallido Mortal',
    description: 'Cuando el compañero muere, explota. Cada criatura en una Emanación de 10 pies originada en el compañero debe hacer una tirada de salvación de Destreza CD $(attributes.spellcasting.save). Si falla, recibe 2d4 de daño Necrótico, o la mitad si tiene éxito.'
  },
  'Lightning Absorption': {
    name: 'Absorción de Relámpago',
    description: 'Siempre que el compañero sea sometido a daño de Relámpago, recupera una cantidad de Puntos de Golpe igual al daño de Relámpago infligido.'
  },
  'Life Bond': {
    name: 'Vínculo Vital',
    description: "Cuando recuperas Puntos de Golpe de un conjuro de nivel 1 o superior, el corcel recupera la misma cantidad de Puntos de Golpe si estás a 30 pies o menos de él."
  },
  'Steel Bond': {
    name: 'Vínculo de Acero',
    description: 'Añade $(attributes.prof) a cualquier prueba de característica o tirada de salvación que haga el Defensor de Acero.'
  },
  'Pact Bond': {
    name: 'Vínculo del Pacto',
    description: 'Añade tu Bonificador de Competencia a cualquier prueba de característica o tirada de salvación que haga el vestigio.'
  },
  'Whispering Aura': {
    name: 'Aura Susurrante',
    description: 'Al comienzo de cada uno de los turnos del espíritu, este emite energía psiónica si no tiene la condición de Incapacitado. _Tirada de Salvación de Sabiduría:_ CD $(attributes.spellcasting.save), cada criatura (que no seas tú) a 5 pies o menos del espíritu. _Fallo:_ 2d6 de daño Psíquico.'
  },
  'Regeneration': {
    name: 'Regeneración',
    description: 'El espíritu recupera 5 Puntos de Golpe al comienzo de su turno si tiene al menos 1 Punto de Golpe.'
  },
  'Incorporeal Passage': {
    name: 'Paso Incorpóreo',
    description: 'El espíritu puede moverse a través de otras criaturas y objetos como si fueran Terreno Difícil. Si el espíritu termina su turno en tal espacio, es expulsado al espacio desocupado más cercano y recibe 1d10 de daño de Fuerza por cada 5 pies recorridos.'
  },
  'Pack Tactics': {
    name: 'Tácticas de Manada',
    description: 'El espíritu tiene Ventaja en las pruebas de Sabiduría (Percepción) que dependan del olfato cuando esté a 30 pies o menos de otra criatura que pueda ver.'
  },
  'Water Breathing': {
    name: 'Respiración Acuática',
    description: 'El espíritu solo puede respirar bajo el agua.'
  },
  'Heated Body': {
    name: 'Cuerpo Ardiente',
    description: 'Una criatura que impacte al espíritu con un ataque cuerpo a cuerpo o que comience su turno apresando al espíritu recibe 1d10 de daño de Fuego.'
  },
  'Stony Lethargy': {
    name: 'Letargo Pétreo',
    description: 'Cuando una criatura comienza su turno a 10 pies o menos del espíritu, el espíritu puede atacarla con energía mágica si puede verla. _Tirada de Salvación de Sabiduría:_ CD $(attributes.spellcasting.save), el objetivo. _Fallo:_ Hasta el comienzo de su siguiente turno, el objetivo no puede hacer Ataques de Oportunidad y su Velocidad se reduce a la mitad.'
  },
  'Amorphous Form': {
    name: 'Forma Amorfa',
    description: 'El espíritu puede moverse a través de un espacio de hasta 1 pulgada de ancho sin que cuente como Terreno Difícil.'
  },
  'Festering Aura': {
    name: 'Aura Purulenta',
    description: '_Tirada de Salvación de Constitución:_ CD $(attributes.spellcasting.save), cualquier criatura (que no seas tú) que comience su turno dentro de una Emanación de 5 pies originada en el espíritu. _Fallo:_ La criatura sufre la condición de Envenenado hasta el comienzo de su siguiente turno.'
  },
  'Undead Fortitude': {
    name: 'Fortaleza de No Muerto',
    description: 'Si el daño reduce al zombi a 0 Puntos de Golpe, debe hacer una tirada de salvación de Constitución con una CD de 5 + el daño recibido, a menos que el daño sea Radiante o de un Impacto Crítico. Si tiene éxito, el zombi cae a 1 Punto de Golpe en su lugar.'
  },
  'Siege Monster': {
    name: 'Monstruo de Asedio',
    description: 'Infliges el doble de daño a objetos y estructuras.'
  },
  'Spider Climb': {
    name: 'Escalar como una Araña',
    description: 'Puedes trepar por superficies difíciles, incluso a lo largo de techos, sin necesidad de hacer una prueba de característica.'
  },
  'Tunneler': {
    name: 'Tunelador',
    description: 'Puedes excavar a través de tierra sólida y piedra no mágica ni labrada. Mientras lo haces, puedes elegir dejar un túnel de 5 pies de diámetro a tu paso.'
  },
  'Running Leap': {
    name: 'Salto a la Carrera',
    description: 'Con una carrera previa de 10 pies, puedes realizar un Salto de Longitud de hasta 25 pies.'
  },
  'Keen Sight': {
    name: 'Vista Aguda',
    description: 'Tienes ventaja en las pruebas de Sabiduría (Percepción) que dependan de la vista.'
  },
  'Keen Senses': {
    name: 'Sentidos Agudos',
    description: 'La bestia tiene ventaja en las pruebas de Sabiduría (Percepción).'
  }
};

const NAME_PLACEHOLDER = '@@entry@@';

const SECTION_TIME = {
  actions: 'action',
  bonusActions: 'bonus action',
  reactions: 'reaction',
};

/** Display label: name plus a structured "(Recharge 5-6)" / "(1/Day)" suffix. */
export function statblockEntryLabel(entry, locale = 'en', translations = null) {
  if (!entry) return '';
  const isEs = locale === 'es';
  const rawName = entry.name || entry.id || '';
  const transName = typeof translations === 'function'
    ? translations(entry.id, 'name', rawName)
    : (translations?.[entry.id]?.name || translations?.[rawName]?.name);
  const name = isEs
    ? (transName && transName !== rawName ? transName : (ACTION_NAMES_ES[entry.id] || ACTION_NAMES_ES[rawName] || rawName))
    : rawName;

  if (entry.recharge) {
    const s = String(entry.recharge);
    if (/^after\s+a\s+long\s+rest\b/i.test(s)) {
      return isEs ? `${name} (Recarga tras un Descanso Largo)` : `${name} (Recharges after a Long Rest)`;
    }
    if (/^after\s+a\s+short\s+or\s+long\s+rest\b/i.test(s)) {
      return isEs ? `${name} (Recarga tras un Descanso Corto o Largo)` : `${name} (Recharges after a Short or Long Rest)`;
    }
    if (/^after\b/i.test(s)) {
      return isEs ? `${name} (Recarga ${s})` : `${name} (Recharges ${s})`;
    }
    return isEs ? `${name} (Recarga ${s})` : `${name} (Recharge ${s})`;
  }
  if (entry.limit) {
    let limitStr = String(entry.limit);
    if (isEs) {
      limitStr = limitStr
        .replace(/\/day\b/gi, '/Día')
        .replace(/\/rest\b/gi, '/Descanso')
        .replace(/\blong rest\b/gi, 'Descanso Largo')
        .replace(/\bshort rest\b/gi, 'Descanso Corto');
    }
    return `${name} (${limitStr})`;
  }
  return name;
}

/**
 * Resolves the natural-language third-person subject for a statblock creature.
 * Player-transformed forms (Wild Shape, Titan Form) retain 'You' / 'Tú'.
 * Summons and companions use their appropriate creature name and 3rd-person phrasing.
 */
export function getStatblockSubject(statblock, locale = 'en') {
  if (!statblock) return locale === 'es' ? 'Tú' : 'You';
  const id = statblock.id || '';
  const tags = Array.isArray(statblock.tags) ? statblock.tags : (statblock.tags ? [statblock.tags] : []);
  const cat = statblock.category || '';

  if (cat === 'wildShape' || id === 'wildShapeTemplate' || id === 'titanForm') {
    return locale === 'es' ? 'Tú' : 'You';
  }

  if (id === 'steelDefender' || tags.includes('steelDefender')) {
    return locale === 'es' ? 'El defensor' : 'The defender';
  }
  if (tags.includes('steed') || id.startsWith('otherworldlySteed')) {
    return locale === 'es' ? 'El corcel' : 'The steed';
  }
  if (tags.includes('familiar') || tags.includes('familiarOption') || id.startsWith('otherworldlyFamiliar') || id.startsWith('familiar')) {
    return locale === 'es' ? 'El familiar' : 'The familiar';
  }
  if (tags.includes('vestige') || id.endsWith('Vestige')) {
    return locale === 'es' ? 'El vestigio' : 'The vestige';
  }
  if (tags.includes('primalCompanion') || id.startsWith('beastOf')) {
    return locale === 'es' ? 'La bestia' : 'The beast';
  }
  if (id === 'reanimatedCompanion') {
    return locale === 'es' ? 'El compañero' : 'The companion';
  }

  if (cat === 'summon' || tags.includes('summon')) {
    if (id === 'skeleton' || tags.includes('skeletonTemplate')) {
      return locale === 'es' ? 'El esqueleto' : 'The skeleton';
    }
    if (id === 'zombie' || tags.includes('zombieTemplate')) {
      return locale === 'es' ? 'El zombi' : 'The zombie';
    }
    return locale === 'es' ? 'El espíritu' : 'The spirit';
  }

  if (cat === 'companion' || tags.includes('companion')) {
    return locale === 'es' ? 'El compañero' : 'The companion';
  }

  return locale === 'es' ? 'La criatura' : 'The creature';
}

/**
 * Returns the markdown body (no leading bold name) for a statblock entry.
 *
 * @param {object} entry        The action / bonus action / reaction entry.
 * @param {object} statblock    The owning statblock (its `variables` form the scope).
 * @param {object} characterData The character the expressions evaluate against.
 * @param {string} section      'actions' | 'bonusActions' | 'reactions'
 * @param {Function} [formatter] Locale-aware `(activity, characterData) => string`.
 */
export function formatStatblockEntry(entry, statblock, characterData, section = 'actions', formatter = formatActivityMechanic) {
  if (!entry) return '';
  if (!entry.mechanic) return entry.description || '';

  const activity = {
    id: entry.id,
    name: NAME_PLACEHOLDER,
    time: SECTION_TIME[section] || 'action',
    range: entry.range || '',
    subject: getStatblockSubject(statblock, 'en'),
    subjectEs: getStatblockSubject(statblock, 'es'),
    variables: {
      ...(statblock?.variables || {}),
      ...(statblock?.variables?.['local.maxLevel'] !== undefined ? { maxLevel: statblock.variables['local.maxLevel'] } : {}),
    },
    mechanic: entry.mechanic,
  };
  const prose = formatter(activity, characterData) || '';
  const prefix = `**${NAME_PLACEHOLDER}.**`;
  const stripped = prose.startsWith(prefix) ? prose.slice(prefix.length) : prose;
  return stripped.replace(/^\*\*[^*]+\*\*\.?\s*/, '').trim();
}
