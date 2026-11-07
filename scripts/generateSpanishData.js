import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EN_DATA_PATH = path.join(__dirname, '../public/locales/en/data.json');
const ES_DATA_PATH = path.join(__dirname, '../public/locales/es/data.json');

const TRANSLATIONS = {
  // Base attributes, skills, and mechanics from base.yml
  name: { name: 'Nombre' },
  image: { name: 'Imagen del Personaje' },
  level: { name: 'Nivel' },
  acrobatics: { name: 'Acrobacias' },
  animal_handling: { name: 'Trato con Animales' },
  arcana: { name: 'Conocimiento Arcano' },
  athletics: { name: 'Atletismo' },
  deception: { name: 'Engaño' },
  history: { name: 'Historia' },
  insight: { name: 'Perspicacia' },
  intimidation: { name: 'Intimidación' },
  investigation: { name: 'Investigación' },
  medicine: { name: 'Medicina' },
  nature: { name: 'Naturaleza' },
  perception: { name: 'Percepción' },
  performance: { name: 'Interpretación' },
  persuasion: { name: 'Persuasión' },
  religion: { name: 'Religión' },
  sleight_of_hand: { name: 'Juego de Manos' },
  stealth: { name: 'Sigilo' },
  survival: { name: 'Supervivencia' },
  armor: { name: 'Armadura' },
  armamentSlot: { name: 'Armamento' },
  hitDice: { name: 'Dados de Golpe' },
  background: { name: 'Trasfondo' },
  class: { name: 'Clase' },
  str: { name: 'FUE' },
  dex: { name: 'DES' },
  con: { name: 'CON' },
  int: { name: 'INT' },
  wis: { name: 'SAB' },
  cha: { name: 'CAR' },
  strength: { name: 'Fuerza' },
  dexterity: { name: 'Destreza' },
  constitution: { name: 'Constitución' },
  intelligence: { name: 'Inteligencia' },
  wisdom: { name: 'Sabiduría' },
  charisma: { name: 'Carisma' },
  ac: { name: 'Clase de Armadura' },
  hp: { name: 'Puntos de Golpe' },
  initiative: { name: 'Iniciativa' },
  speed: { name: 'Velocidad' },

  // Classes
  artificer: {
    name: 'Artífice',
    description: 'Maestros de la invención que utilizan el ingenio y la magia para infundir un poder extraordinario a los objetos.'
  },
  barbarian: {
    name: 'Bárbaro',
    description: 'Feroces guerreros impulsados por la furia primigenia, personificando la ferocidad y la resistencia salvaje de la naturaleza.'
  },
  bard: {
    name: 'Bardo',
    description: 'Inspiradores intérpretes que tejen magia en la música, las palabras y el saber para manipular el combate y la mente.'
  },
  cleric: {
    name: 'Clérigo',
    description: 'Campeones divinos que canalizan magia sagrada para curar aliados, castigar enemigos y servir a su deidad.'
  },
  druid: {
    name: 'Druida',
    description: 'Guardianes de la naturaleza que empuñan magia primigenia y cambian de forma en peligrosas bestias salvajes.'
  },
  fighter: {
    name: 'Guerrero',
    description: 'Expertos marciales inigualables hábiles con cualquier arma y armadura para dominar el campo de batalla.'
  },
  monk: {
    name: 'Monje',
    description: 'Artistas marciales ascéticos que aprovechan el enfoque interior para golpear con velocidad y precisión relámpago.'
  },
  paladin: {
    name: 'Paladín',
    description: 'Guerreros sagrados vinculados por juramentos solemnes, castigando el mal con poder radiante y auras protectoras.'
  },
  psion: {
    name: 'Psiónico',
    description: 'Maestros del poder psiónico que tejen magia y facultades extraordinarias a través de la pura fuerza de sus mentes.'
  },
  ranger: {
    name: 'Explorador',
    description: 'Letales exploradores y rastreadores de tierras salvajes que combinan destreza marcial con magia de la naturaleza.'
  },
  rogue: {
    name: 'Pícaro',
    description: 'Astutos embaucadores que confían en el sigilo, la precisión y la vulnerabilidad para golpear eficazmente.'
  },
  sorcerer: {
    name: 'Hechicero',
    description: 'Lanzadores de conjuros que portan magia innata en su linaje, moldeando el arcano puro a su voluntad.'
  },
  warlock: {
    name: 'Brujo',
    description: 'Buscadores de poder arcano vinculados por pactos con enigmáticos patrones de otros mundos.'
  },
  wizard: {
    name: 'Mago',
    description: 'Eruditos de la magia que dominan las artes arcanas mediante el estudio riguroso y sus libros de conjuros.'
  },

  // Species
  aasimar: {
    name: 'Aasimar',
    description: 'Mortales que llevan una chispa de los Planos Superiores, trayendo luz, curación y furia celestial.'
  },
  dragonborn: {
    name: 'Dracónido',
    description: 'Descendientes de dragones metálicos y cromáticos con piel escamosa y armas de aliento elemental.'
  },
  dwarf: {
    name: 'Enano',
    description: 'Pueblo resistente forjado de piedra y metal, duradero como las montañas y con gran afinidad por la artesanía.'
  },
  elf: {
    name: 'Elfo',
    description: 'Seres mágicos y longevos nacidos de Feywild que descansan en un trance meditativo en lugar de dormir.'
  },
  gith: {
    name: 'Gith',
    description: 'Viajeros planares forjados por un potencial psiónico ancestral, divididos entre los marciales Githyanki y los disciplinados Githzerai.'
  },
  gnome: {
    name: 'Gnomo',
    description: 'Gente menuda e inventiva imbuida de asombro salvaje, agudo intelecto y magia natural.'
  },
  goliath: {
    name: 'Goliat',
    description: 'Imponentes descendientes de gigantes que dominan dones marciales sobrenaturales y crecimiento súbito.'
  },
  halfling: {
    name: 'Mediano',
    description: 'Gente pequeña y ágil bendecida con una suerte extraordinaria, valentía y amor por el hogar.'
  },
  human: {
    name: 'Humano',
    description: 'Mortales ambiciosos y llenos de recursos cuyos diversos talentos los impulsan a través de todos los reinos.'
  },
  leonin: {
    name: 'Leonino',
    description: 'Feroces cazadores de pelaje dorado que valoran el orgullo, la destreza marcial y una feroz independencia.'
  },
  minotaur: {
    name: 'Minotauro',
    description: 'Poderosos humanoides con cuernos dotados de un sentido de orientación infalible y una carga implacable.'
  },
  orc: {
    name: 'Orco',
    description: 'Guerreros fuertes y decididos dotados de la resistencia de Gruumsh, coraje inquebrantable y visión en la oscuridad.'
  },
  satyr: {
    name: 'Sátiro',
    description: 'Juerguistas feéricos con patas de cabra cuya música y magia florecen con el júbilo desenfrenado.'
  },
  tiefling: {
    name: 'Tiflin',
    description: 'Mortales con herencia infernal que despierta un poder sobrenatural y resistencia planar.'
  },
  triton: {
    name: 'Tritón',
    description: 'Guardianes acuáticos del Plano del Agua que defienden tanto las profundidades oceánicas como las costas.'
  },
  warforged: {
    name: 'Forjado',
    description: 'Seres mecánicos imbuidos de fluidos alquímicos y cuerpos de madera y metal capaces de sentir dolor y emoción.'
  },

  // Common Class Features
  rage: {
    name: 'Furia',
    summary: 'Infunde tus ataques con ferocidad y obtén resistencia al daño'
  },
  unarmoredDefense: {
    name: 'Defensa Sin Armadura',
    summary: 'Añade tu modificador a la Clase de Armadura cuando no lleves armadura'
  },
  recklessAttack: {
    name: 'Ataque Temerario',
    summary: 'Obtén ventaja en tiradas de ataque de Fuerza a costa de conceder ventaja'
  },
  actionSurge: {
    name: 'Oleada de Acción',
    summary: 'Realiza una acción adicional en tu turno'
  },
  secondWind: {
    name: 'Segundo Aliento',
    summary: 'Recupera puntos de golpe como acción adicional'
  },
  sneakAttack: {
    name: 'Ataque Furtivo',
    summary: 'Inflige daño adicional a un objetivo al que golpees con ventaja o un aliado cercano'
  },
  cunningAction: {
    name: 'Acción Astuta',
    summary: 'Realiza Carrera, Desengancharse o Esconderse como Acción Adicional'
  },
  divineSmite: {
    name: 'Castigo Divino',
    summary: 'Canaliza poder sagrado a través de tu arma para infligir daño radiante adicional'
  },
  layOnHands: {
    name: 'Imposición de Manos',
    summary: 'Canaliza una reserva de energía curativa para restaurar puntos de golpe o purificar toxinas'
  },
  wildShape: {
    name: 'Forma Salvaje',
    summary: 'Asume mágicamente la forma de una bestia'
  },
  channelDivinity: {
    name: 'Canalizar Divinidad',
    summary: 'Canaliza energía divina para alimentar efectos mágicos sagrados'
  },
  bardicInspiration: {
    name: 'Inspiración Bárdica',
    summary: 'Inspira a un aliado con un dado de bonificación para tiradas de dados'
  },
  fontOfMagic: {
    name: 'Fuente de Magia',
    summary: 'Aprovecha tus puntos de hechicería para crear espacios de conjuro o alimentar metamagia'
  },
  metamagic: {
    name: 'Metamagia',
    summary: 'Modifica y adapta tus conjuros a tus necesidades'
  },
  eldritchInvocations: {
    name: 'Invocaciones Sobrenaturales',
    summary: 'Fragmentos de conocimiento prohibido que te otorgan habilidades mágicas permanentes'
  },
  pactBoon: {
    name: 'Pacto del Brujo',
    summary: 'Un regalo especial concedido por tu patrón de otro mundo'
  },
  arcaneRecovery: {
    name: 'Recuperación Arcana',
    summary: 'Recupera algunos de tus espacios de conjuro gastados durante un descanso corto'
  },
  spellcasting: {
    name: 'Lanzamiento de Conjuros',
    summary: 'Lanza conjuros utilizando tu poder mágico'
  },

  // Common species traits
  darkvision: {
    name: 'Visión en la Oscuridad',
    summary: 'Puedes ver en la penumbra y la oscuridad'
  },
  feyAncestry: {
    name: 'Ascendencia Feérica',
    summary: 'Tienes ventaja en tiradas de salvación para evitar o terminar la condición Hechizado'
  },
  trance: {
    name: 'Trance',
    summary: 'No necesitas dormir; meditas profundamente durante 4 horas'
  },
  dwarvenResilience: {
    name: 'Resistencia Enana',
    summary: 'Tienes ventaja en tiradas de salvación contra Veneno y resistencia al daño por veneno'
  },
  stonecunning: {
    name: 'Afinidad con la Piedra',
    summary: 'Conocimiento excepcional sobre el trabajo de la piedra'
  },
  halflingLuck: {
    name: 'Suerte de Mediano',
    summary: 'Cuando saques un 1 en d20 para tirada de ataque, prueba de característica o salvación, puedes volver a tirar'
  },
  brave: {
    name: 'Valiente',
    summary: 'Tienes ventaja en tiradas de salvación para evitar o terminar la condición Asustado'
  },
  nimble: {
    name: 'Agilidad de Mediano',
    summary: 'Puedes moverte a través del espacio de cualquier criatura de tamaño superior al tuyo'
  },
  arcaneWarrior: {
    name: 'Guerrero Arcano',
    summary: 'Aprendes dos trucos de mago a tu elección.'
  },
  crossbowExpertFiringInMelee: {
    name: 'Disparar en Cuerpo a Cuerpo',
    description: 'Estar a 5 pies o menos de un enemigo no te impone Desventaja en las tiradas de ataque con una ballesta.'
  },
  powerFromBeyondDamageSave: {
    name: 'Poder del Más Allá (Daño)'
  },
  trance: {
    name: 'Trance',
    description: 'No necesitas dormir y la magia no puede dormirte. Puedes terminar un Descanso Largo en 4 horas si pasas esas horas en una meditación similar a un trance, durante la cual conservas la consciencia.'
  },
  twoWeaponFightingOffHand: {
    name: 'Luchador con Dos Armas (Mano Secundaria)'
  },

  // Lunar Wild Shapes
  lunarWildShape: {
    name: 'Forma Salvaje Lunar',
    summary: 'Transfórmate en poderosas formas de bestias lunares adaptadas para el combate salvaje'
  },
  arcaneWarriorCantrips: {
    name: 'Trucos de Guerrero Arcano'
  },
  wildShapeDepthApex: {
    name: 'Bestia Ápice de las Profundidades',
    summary: 'Bestia de gran tamaño para el combate en aguas profundas y sigilo acuático'
  },
  wildShapeArmoredBastion: {
    name: 'Bestia Bastión Blindado',
    summary: 'Bestia acorazada con gran CA para absorber daño y proteger aliados'
  },
  wildShapeCephalopod: {
    name: 'Bestia Cefalópodo',
    summary: 'Bestia con tentáculos para apresar enemigos y emitir nubes de tinta'
  },
  wildShapeTramplingCharger: {
    name: 'Bestia Embestidor Arrollador',
    summary: 'Bestia rápida que embiste para infligir daño adicional y derribar'
  },
  wildShapeAmphibiousConstrictor: {
    name: 'Bestia Constrictor Anfibio',
    summary: 'Bestia anfibia que atrapa y constriñe a sus presas'
  },
  wildShapeInsectoidCrawler: {
    name: 'Bestia Reptador Insectoide',
    summary: 'Bestia trepadora venenosa con sentidos agudos para exploración subterránea'
  },
  wildShapeExcavator: {
    name: 'Bestia Excavador Subterráneo',
    summary: 'Bestia capaz de excavar túneles sólidos y emboscar desde abajo'
  },
  wildShapePackHunter: {
    name: 'Bestia Cazador en Manada',
    summary: 'Bestia ágil con ventaja al atacar junto a aliados'
  },
  wildShapeHeavyMauler: {
    name: 'Bestia Desgarrador Pesado',
    summary: 'Bestia de fuerza bruta con golpes contundentes y multiataque'
  },
  wildShapeAmbushProwler: {
    name: 'Bestia Acechador de Emboscadas',
    summary: 'Depredador sigiloso con daño aumentado al atacar desde el sigilo'
  },
  wildShapeFlybyRaptor: {
    name: 'Bestia Rapaz de Ataque al Vuelo',
    summary: 'Bestia voladora veloz que ataca en picada sin provocar ataques de oportunidad'
  },
  wildShapeAerialSnatcher: {
    name: 'Bestia Atrapador Aéreo',
    summary: 'Bestia voladora rapaz que arrebata criaturas y las deja caer desde lo alto'
  },

  // Templates & Titans
  behemothTitanForm: { name: 'Bégimo' },
  leviathanTitanForm: { name: 'Leviatán' },
  insectoidTitanForm: { name: 'Titán Insectoide' },
  wildShapeBeastOfLand: { name: 'Bestia Terrestre' },
  wildShapeBeastOfTheSea: { name: 'Bestia Marina' },
  wildShapeBeastOfTheSky: { name: 'Bestia Celeste' },

  // Statblock Actions
  beastsStrike: { name: "Ataque de la Bestia" },
  otherworldlyScratch: { name: "Arañazo de Ultratumba" },
  dreadfulSwipe: { name: "Zarpazo Pavoroso" },
  otherworldlySlam: { name: "Golpe de Ultratumba" },
  healingTouch: { name: "Toque Curativo" },
  feyStep: { name: "Paso Feérico" },
  fellGlare: { name: "Mirada Siniestra" },
  forceEmpoweredRend: { name: "Desgarrón Potenciado por Fuerza" },
  repair: { name: "Reparar" },
  deflectAttack: { name: "Desviar Ataque" },
  vestigesStrike: { name: "Ataque del Vestigio" },
  divinePower: { name: "Poder Divino" },
  multiattack: { name: "Multiataque" },
  eyeRay: { name: "Rayo Ocular" },
  psychicSlam: { name: "Golpe Psíquico" },
  claw: { name: "Garra" },
  crystalStrike: { name: "Golpe Cristalino" },
  shardSwarm: { name: "Enjambre de Fragmentos" },
  ectoplasmicSplash: { name: "Salpicadura Ectoplásmica" },
  ephemeralRay: { name: "Rayo Efímero" },
  rend: { name: "Desgarrar" },
  slam: { name: "Golpe" },
  berserkLashing: { name: "Azote Enloquecido" },
  feyBlade: { name: "Espada Feérica" },
  shortsword: { name: "Espada Corta" },
  shortbow: { name: "Arco Corto" },
  deathlyTouch: { name: "Toque Mortal" },
  rottingClaw: { name: "Garra Putrefacta" },
  graveBolt: { name: "Descarga de la Tumba" },
  bestialStrike: { name: "Ataque Bestial" },
  inkCloud: { name: "Nube de Tinta" },
  trample: { name: "Pisotear" },
  engulf: { name: "Envolver" },
  hazardousSpew: { name: "Vómito Peligroso" },
  eruptingBreach: { name: "Brecha Eruptiva" },
  rampage: { name: "Frenesí" },
  nimbleEscape: { name: "Escape Ágil" },
  swoop: { name: "Abalanzarse" },
  incandescentBreath: { name: "Aliento Incandescente" },
  energizingPollen: { name: "Polen Energizante" }
};

const MECHANIC_TEXTS_ES = {
  "2d10 Radiant damage per level of the spell slot expended": "2d10 de daño Radiante por cada nivel del espacio de conjuro gastado",
  "If you moved at least 20 feet straight toward the target immediately before the hit, it takes an extra $(meta.level >= 6 ? 2 : 1)d10 damage.": "si te moviste al menos 20 pies en línea recta hacia el objetivo inmediatamente antes del impacto, este sufre $(meta.level >= 6 ? 2 : 1)d10 de daño adicional",
  "Immediately after you deal damage to a creature that is Bloodied": "Inmediatamente después de que causes daño a una criatura Ensangrentada",
  "Once per turn, immediately after you move at least half your Speed": "Una vez por turno, inmediatamente después de moverte al menos la mitad de tu Velocidad",
  "The attack roll has Advantage if the target doesn't have all its Hit Points.": "La tirada de ataque tiene Ventaja si el objetivo no tiene todos sus Puntos de Golpe.",
  "The spirit is hit by a melee attack roll": "El espíritu es impactado por una tirada de ataque cuerpo a cuerpo",
  "The spirit takes damage from a creature within 5 feet": "El espíritu recibe daño de una criatura a 5 pies de él",
  "You expend a level 1+ spell slot and can move up to $(Math.floor(attributes.movement.walk / 2 / 5) * 5) feet without provoking Opportunity Attacks while emitting a cloud of healing pollen. When you move within 5 feet of another creature during this movement, you can restore a number of Hit Points equal to 2d6 per level of the spell slot expended (once per turn per creature).": "Gastas un espacio de conjuro de nivel 1 o superior y puedes moverte hasta $(Math.floor(attributes.movement.walk / 2 / 5) * 5) pies sin provocar Ataques de Oportunidad mientras emites una nube de polen curativo. Cuando te mueves a 5 pies de otra criatura durante este movimiento, puedes restaurarle una cantidad de Puntos de Golpe igual a 2d6 por cada nivel del espacio de conjuro gastado (una vez por turno por criatura).",
  "You expend a level 1+ spell slot.": "Gastas un espacio de conjuro de nivel 1 o superior.",
  "You moved at least 10 feet underground and emerged within 5 feet of a creature on this turn": "Te moviste al menos 10 pies bajo tierra y emergiste a 5 pies de una criatura en este turno",
  "You take damage while underwater": "Recibes daño mientras estás bajo el agua",
  "a creature the defender can see within 5 feet of it makes an attack roll targeting a different creature": "una criatura que el defensor pueda ver a 5 pies de él realiza una tirada de ataque contra una criatura diferente",
  "along with your rider, to an unoccupied space of your choice": "junto con tu jinete, a un espacio desocupado de tu elección",
  "before the end of this turn": "antes del final de este turno",
  "drop that creature": "soltar a esa criatura",
  "each creature in a 5-foot Emanation originating from and including the target has its Speed reduced by 5 feet until the end of its next turn": "cada criatura en una Emanación de 5 pies originada en el objetivo e incluyéndolo ve su Velocidad reducida en 5 pies hasta el final de su siguiente turno",
  "fly up to half your Fly Speed without provoking Opportunity Attacks": "volar hasta la mitad de tu Velocidad de Vuelo sin provocar Ataques de Oportunidad",
  "fog": "niebla",
  "if the beast moved at least 20 feet straight toward the target before the hit, the target takes an extra 1d6 damage of the same type, and the target has the Prone condition if it is Large or smaller": "si la bestia se movió al menos 20 pies en línea recta hacia el objetivo antes del impacto, el objetivo recibe 1d6 de daño adicional del mismo tipo, y el objetivo sufre la condición de Derribado si es de tamaño Grande o menor",
  "if the target has the Poisoned condition, it has the Paralyzed condition until the end of its next turn": "si el objetivo sufre la condición de Envenenado, sufre la condición de Paralizado hasta el final de su siguiente turno",
  "if you and the vestige are within 60 feet of each other, you both teleport, swapping places": "si tú y el vestigio están a 60 pies o menos uno del otro, ambos se teletransportan, intercambiando posiciones",
  "magical darkness": "oscuridad mágica",
  "make $(Math.floor((local.maxLevel || 2) / 2)) Rend attacks": "realiza $(Math.floor((local.maxLevel || 2) / 2)) ataques de Desgarrar",
  "make $(Math.floor((local.maxLevel || 3) / 2)) Crystal Strike attacks": "realiza $(Math.floor((local.maxLevel || 3) / 2)) ataques de Golpe Cristalino",
  "make $(Math.floor((local.maxLevel || 3) / 2)) Deathly Touch attacks": "realiza $(Math.floor((local.maxLevel || 3) / 2)) ataques de Toque Mortal",
  "make $(Math.floor((local.maxLevel || 3) / 2)) Ectoplasmic Splash attacks": "realiza $(Math.floor((local.maxLevel || 3) / 2)) ataques de Salpicadura Ectoplásmica",
  "make $(Math.floor((local.maxLevel || 3) / 2)) Ephemeral Ray attacks": "realiza $(Math.floor((local.maxLevel || 3) / 2)) ataques de Rayo Efímero",
  "make $(Math.floor((local.maxLevel || 3) / 2)) Fey Blade attacks": "realiza $(Math.floor((local.maxLevel || 3) / 2)) ataques de Espada Feérica",
  "make $(Math.floor((local.maxLevel || 3) / 2)) Grave Bolt attacks": "realiza $(Math.floor((local.maxLevel || 3) / 2)) ataques de Descarga de la Tumba",
  "make $(Math.floor((local.maxLevel || 3) / 2)) Rotting Claw attacks": "realiza $(Math.floor((local.maxLevel || 3) / 2)) ataques de Garra Putrefacta",
  "make $(Math.floor((local.maxLevel || 4) / 2)) Claw attacks": "realiza $(Math.floor((local.maxLevel || 4) / 2)) ataques de Garra",
  "make $(Math.floor((local.maxLevel || 4) / 2)) Eye Ray attacks": "realiza $(Math.floor((local.maxLevel || 4) / 2)) ataques de Rayo Ocular",
  "make $(Math.floor((local.maxLevel || 4) / 2)) Psychic Slam attacks": "realiza $(Math.floor((local.maxLevel || 4) / 2)) ataques de Golpe Psíquico",
  "make $(Math.floor((local.maxLevel || 4) / 2)) Slam attacks": "realiza $(Math.floor((local.maxLevel || 4) / 2)) ataques de Golpe",
  "make one Bestial Strike": "realiza un Ataque Bestial",
  "make one Slam attack against that creature": "realiza un ataque de Golpe contra esa criatura",
  "make two Bestial Strike attacks": "realiza dos Ataques Bestiales",
  "make two Bestial Strikes": "realiza dos Ataques Bestiales",
  "make two Rend attacks": "realiza dos ataques de Desgarrar",
  "move up to half your Speed": "moverte hasta la mitad de tu Velocidad",
  "release ink that fills a 10-foot Cube, and move up to your Swim Speed without provoking Opportunity Attacks": "liberar tinta que llena un Cubo de 10 pies y moverte hasta tu Velocidad de Nado sin provocar Ataques de Oportunidad",
  "shadows and silence": "sombras y silencio",
  "take the Disengage or Hide action": "realizar la acción de Retirada o Esconderse",
  "the area is Heavily Obscured for 1 minute": "el área queda Fuertemente Oculta durante 1 minuto",
  "the defender, or one Construct or object it can see within 5 feet of it": "el defensor, o un Autómata u objeto que pueda ver a 5 pies de él",
  "the spirit halves the damage (round down) it takes from that attack": "el espíritu reduce a la mitad el daño (redondeando hacia abajo) que recibe de ese ataque",
  "the target can't regain Hit Points until the start of the spirit's next turn": "el objetivo no puede recuperar Puntos de Golpe hasta el comienzo del siguiente turno del espíritu",
  "the target can't take Opportunity Attacks until the start of its next turn": "el objetivo no puede realizar Ataques de Oportunidad hasta el comienzo de su siguiente turno",
  "the vestige places a curse on a creature you can see within 30 feet of the vestige for 1 minute; while cursed, the target has Disadvantage on attack rolls against you and the vestige": "el vestigio maldice a una criatura que puedas ver a 30 pies o menos del vestigio durante 1 minuto; mientras esté maldito, el objetivo tiene Desventaja en las tiradas de ataque contra ti y contra el vestigio",
  "when you have a creature grappled": "cuando tienes a una criatura apresada",
  "while in the aura": "mientras esté en el aura"
};

function main() {
  const enData = JSON.parse(fs.readFileSync(EN_DATA_PATH, 'utf8'));
  let existingEsData = {};
  if (fs.existsSync(ES_DATA_PATH)) {
    try {
      existingEsData = JSON.parse(fs.readFileSync(ES_DATA_PATH, 'utf8'));
    } catch (e) { }
  }
  const esData = {};

  let translatedCount = 0;
  for (const [id, enEntry] of Object.entries(enData)) {
    if (id === '$mechanic') {
      const existingMechanic = existingEsData['$mechanic'] || {};
      esData['$mechanic'] = {
        texts: {
          ...(enEntry.texts || {}),
          ...(existingMechanic.texts || {}),
          ...MECHANIC_TEXTS_ES
        },
        labels: {
          ...(enEntry.labels || {}),
          ...(existingMechanic.labels || {})
        }
      };
      continue;
    }

    const esOverride = TRANSLATIONS[id] || existingEsData[id];
    if (esOverride) {
      esData[id] = {
        ...enEntry,
        ...esOverride
      };
      translatedCount++;
    } else {
      // Empty scaffold with English placeholder
      esData[id] = { ...enEntry };
    }
  }

  // Include any extra translations (e.g. str, dex, con)
  for (const [id, esOverride] of Object.entries(TRANSLATIONS)) {
    if (!esData[id]) {
      esData[id] = { ...esOverride };
      translatedCount++;
    }
  }

  const outputDir = path.dirname(ES_DATA_PATH);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(ES_DATA_PATH, JSON.stringify(esData, null, 2), 'utf8');

  console.log(`Generated Spanish locale data at ${ES_DATA_PATH}`);
  console.log(`Total entries: ${Object.keys(esData).length}`);
  console.log(`Specifically translated entries: ${translatedCount}`);
}

main();
