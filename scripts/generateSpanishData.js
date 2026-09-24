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
  }
};

function main() {
  const enData = JSON.parse(fs.readFileSync(EN_DATA_PATH, 'utf8'));
  let existingEsData = {};
  if (fs.existsSync(ES_DATA_PATH)) {
    try {
      existingEsData = JSON.parse(fs.readFileSync(ES_DATA_PATH, 'utf8'));
    } catch (e) {}
  }
  const esData = {};

  let translatedCount = 0;
  for (const [id, enEntry] of Object.entries(enData)) {
    if (id === '$mechanic') {
      const existingMechanic = existingEsData['$mechanic'] || {};
      esData['$mechanic'] = {
        texts: {
          ...(enEntry.texts || {}),
          ...(existingMechanic.texts || {})
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
