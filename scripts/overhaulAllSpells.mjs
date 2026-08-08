import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const root = process.cwd();

const cantripScale = "$(meta.level >= 17 ? 4 : meta.level >= 11 ? 3 : meta.level >= 5 ? 2 : 1)";
const trueStrikeScale = "$(meta.level >= 17 ? 3 : meta.level >= 11 ? 2 : meta.level >= 5 ? 1 : 0)";
const dcExpr = "$(attributes.spellcasting.save)";
const atkExpr = "$(attributes.spellcasting.attack)";
const bnsExpr = "$(attributes.spellcasting.bonus)";

const spellMechanics = {
  // CANTRIPS
  acidSplash: {
    pattern: "save",
    save: { ability: "dex", dc: dcExpr, failure: { damage: { dice: { count: cantripScale, sides: 6, bonus: 0 }, type: "acid" } } },
    target: { type: "aoe", aoe: { shape: "sphere", size: 5 }, range: "$(range)" }
  },
  bladeWard: {
    pattern: "utility",
    trigger: "You are hit by an attack roll",
    text: "Add 1d4 to your AC against the triggering attack."
  },
  chillTouch: {
    pattern: "attack",
    attack: { classification: "melee", type: "spell", bonus: atkExpr },
    damage: { dice: { count: cantripScale, sides: 10, bonus: 0 }, type: "necrotic" },
    text: "Target cannot regain hit points until the end of your next turn.",
    target: { type: "touch" }
  },
  dancingLights: { pattern: "utility", target: { type: "single", range: "$(range)" } },
  druidcraft: { pattern: "utility", target: { type: "single", range: "$(range)" } },
  eldritchBlast: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: cantripScale, sides: 10, bonus: 0 }, type: "force" },
    target: { type: "single", range: "120 feet" }
  },
  elementalism: { pattern: "utility", target: { type: "single", range: "$(range)" } },
  fireBolt: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: cantripScale, sides: 10, bonus: 0 }, type: "fire" },
    target: { type: "single", range: "120 feet" }
  },
  friends: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Target has the Charmed condition for 1 minute." } },
    target: { type: "single", range: "$(range)" }
  },
  guidance: { pattern: "utility", text: "Target adds 1d4 to any ability check using a chosen skill.", target: { type: "touch" } },
  light: { pattern: "utility", target: { type: "touch" } },
  lightSpell: { pattern: "utility", target: { type: "touch" } },
  mageHand: { pattern: "utility", target: { type: "single", range: "$(range)" } },
  mending: { pattern: "utility", target: { type: "touch" } },
  message: { pattern: "utility", target: { type: "single", range: "$(range)" } },
  mindSliver: {
    pattern: "save",
    save: {
      ability: "int", dc: dcExpr,
      failure: {
        damage: { dice: { count: cantripScale, sides: 6, bonus: 0 }, type: "psychic" },
        text: "Target subtracts 1d4 from its next saving throw before the end of your next turn."
      }
    },
    target: { type: "single", range: "$(range)" }
  },
  minorIllusion: { pattern: "utility", target: { type: "single", range: "$(range)" } },
  poisonSpray: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: cantripScale, sides: 12, bonus: 0 }, type: "poison" },
    target: { type: "single", range: "30 feet" }
  },
  prestidigitation: { pattern: "utility", target: { type: "single", range: "$(range)" } },
  produceFlame: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: cantripScale, sides: 8, bonus: 0 }, type: "fire" },
    target: { type: "single", range: "60 feet" }
  },
  rayOfFrost: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: cantripScale, sides: 8, bonus: 0 }, type: "cold" },
    text: "Target speed is reduced by 10 feet until the start of your next turn.",
    target: { type: "single", range: "60 feet" }
  },
  resistance: { pattern: "utility", text: "Target adds 1d4 to a saving throw of its choice.", target: { type: "touch" } },
  sacredFlame: {
    pattern: "save",
    save: { ability: "dex", dc: dcExpr, failure: { damage: { dice: { count: cantripScale, sides: 8, bonus: 0 }, type: "radiant" } } },
    target: { type: "single", range: "60 feet" }
  },
  shillelagh: { pattern: "utility", text: "Nature magic imbues your wooden weapon with force.", target: { type: "self" } },
  shockingGrasp: {
    pattern: "attack",
    attack: { classification: "melee", type: "spell", bonus: atkExpr },
    damage: { dice: { count: cantripScale, sides: 8, bonus: 0 }, type: "lightning" },
    text: "Target cannot take Reactions until the start of its next turn.",
    target: { type: "touch" }
  },
  spareTheDying: { pattern: "utility", text: "A living creature at 0 Hit Points becomes Stable.", target: { type: "touch" } },
  starryWisp: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: cantripScale, sides: 8, bonus: 0 }, type: "radiant" },
    text: "Target emits Dim Light in a 10-foot radius and cannot benefit from Invisible condition.",
    target: { type: "single", range: "60 feet" }
  },
  telekineticFling: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: cantripScale, sides: 10, bonus: 0 }, type: "force" },
    target: { type: "single", range: "60 feet" }
  },
  thaumaturgy: { pattern: "utility", target: { type: "single", range: "$(range)" } },
  thunderclap: {
    pattern: "save",
    save: { ability: "con", dc: dcExpr, failure: { damage: { dice: { count: cantripScale, sides: 6, bonus: 0 }, type: "thunder" } } },
    target: { type: "aoe", aoe: { shape: "emanation", size: 5 }, range: "$(range)" }
  },
  tollTheDead: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { damage: { dice: { count: cantripScale, sides: 8, bonus: 0 }, type: "necrotic" } } },
    target: { type: "single", range: "60 feet" }
  },
  trueStrike: {
    pattern: "attack",
    attack: { classification: "melee", type: "spell", bonus: atkExpr },
    damage: { dice: { count: trueStrikeScale, sides: 6, bonus: 0 }, type: "radiant" },
    target: { type: "single" }
  },
  viciousMockery: {
    pattern: "save",
    save: {
      ability: "wis", dc: dcExpr,
      failure: {
        damage: { dice: { count: cantripScale, sides: 6, bonus: 0 }, type: "psychic" },
        text: "Target has Disadvantage on its next attack roll before the end of its next turn."
      }
    },
    target: { type: "single", range: "60 feet" }
  },
  wordOfRadiance: {
    pattern: "save",
    save: { ability: "con", dc: dcExpr, failure: { damage: { dice: { count: cantripScale, sides: 6, bonus: 0 }, type: "radiant" } } },
    target: { type: "aoe", aoe: { shape: "emanation", size: 5 }, range: "$(range)" }
  },

  // LEVEL 1 SPELLS
  alarm: { pattern: "utility", target: { type: "single", range: "$(range)" } },
  animalFriendship: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Target has the Charmed condition for 24 hours." } },
    target: { type: "single", range: "$(range)" }
  },
  armorOfAgathys: {
    pattern: "utility",
    text: "Gain 5 Temporary Hit Points. While active, any creature hitting you with a melee attack takes 5 Cold damage.",
    target: { type: "self" }
  },
  armsOfHadar: {
    pattern: "save",
    save: {
      ability: "str", dc: dcExpr,
      failure: { damage: { dice: { count: 2, sides: 6, bonus: 0 }, type: "necrotic" }, text: "Target cannot take Reactions until start of its next turn." }
    },
    target: { type: "aoe", aoe: { shape: "emanation", size: 10 }, range: "$(range)" }
  },
  bane: {
    pattern: "save",
    save: { ability: "cha", dc: dcExpr, failure: { text: "Targets subtract 1d4 from attack rolls and saving throws." } },
    target: { type: "aoe", range: "$(range)" }
  },
  bless: { pattern: "utility", text: "Targets add 1d4 to attack rolls and saving throws.", target: { type: "single", range: "30 feet" } },
  burningHands: {
    pattern: "save",
    save: {
      ability: "dex", dc: dcExpr,
      failure: { damage: { dice: { count: 3, sides: 6, bonus: 0 }, type: "fire" } },
      success: { text: "Takes half damage" }
    },
    target: { type: "aoe", aoe: { shape: "cone", size: 15 }, range: "$(range)" }
  },
  charmPerson: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Target is Charmed for 1 hour." } },
    target: { type: "single", range: "$(range)" }
  },
  chromaticOrb: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: 3, sides: 8, bonus: 0 }, type: "acid" },
    target: { type: "single", range: "90 feet" }
  },
  colorSpray: {
    pattern: "save",
    save: { ability: "con", dc: dcExpr, failure: { text: "Targets have Blinded condition until end of your next turn." } },
    target: { type: "aoe", aoe: { shape: "cone", size: 15 }, range: "$(range)" }
  },
  command: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Target obeys your command on its next turn." } },
    target: { type: "single", range: "$(range)" }
  },
  compelledDuel: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Target has Disadvantage on attack rolls against others and must save to move away." } },
    target: { type: "single", range: "$(range)" }
  },
  comprehendLanguages: { pattern: "utility", target: { type: "self" } },
  createOrDestroyWater: { pattern: "utility", target: { type: "single", range: "$(range)" } },
  cureWounds: {
    pattern: "healing",
    healing: { dice: { count: 2, sides: 8, bonus: bnsExpr }, type: "hitPoints" },
    target: { type: "touch" }
  },
  detectEvilAndGood: { pattern: "utility", target: { type: "self" } },
  detectMagic: { pattern: "utility", target: { type: "self" } },
  detectPoisonAndDisease: { pattern: "utility", target: { type: "self" } },
  disguiseSelf: { pattern: "utility", target: { type: "self" } },
  dissonantWhispers: {
    pattern: "save",
    save: {
      ability: "wis", dc: dcExpr,
      failure: { damage: { dice: { count: 3, sides: 6, bonus: 0 }, type: "psychic" }, text: "Target must use Reaction to move as far away as possible." },
      success: { text: "Takes half damage" }
    },
    target: { type: "single", range: "$(range)" }
  },
  divineFavor: { pattern: "utility", text: "Your weapon attacks deal an extra 1d4 Radiant damage.", target: { type: "self" } },
  divineSmite: {
    pattern: "utility",
    trigger: "You hit a target with a Melee weapon or an Unarmed Strike",
    text: "The target takes an extra 2d8 Radiant damage from the attack (3d8 against Fiends or Undead)."
  },
  ensnaringStrike: {
    pattern: "save",
    save: { ability: "str", dc: dcExpr, failure: { text: "Target is Restrained by grasping vines and takes 1d6 Piercing damage at start of turn." } },
    target: { type: "single", range: "$(range)" }
  },
  entangle: {
    pattern: "save",
    save: { ability: "str", dc: dcExpr, failure: { text: "Target is Restrained in difficult terrain." } },
    target: { type: "aoe", aoe: { shape: "square", size: 20 }, range: "$(range)" }
  },
  expeditiousRetreat: { pattern: "utility", target: { type: "self" } },
  faerieFire: {
    pattern: "save",
    save: { ability: "dex", dc: dcExpr, failure: { text: "Targets shed Dim Light and attack rolls against them have Advantage." } },
    target: { type: "aoe", aoe: { shape: "cube", size: 20 }, range: "$(range)" }
  },
  falseLife: {
    pattern: "healing",
    healing: { dice: { count: 2, sides: 4, bonus: 4 }, type: "tempHitPoints" },
    target: { type: "self" }
  },
  featherFall: {
    pattern: "utility",
    trigger: "You or a creature within 60 feet falls",
    text: "Falling rate slows to 60 feet per round and targets take no fall damage."
  },
  fogCloud: { pattern: "utility", target: { type: "aoe", aoe: { shape: "sphere", size: 20 }, range: "$(range)" } },
  goodberry: {
    pattern: "healing",
    healing: { dice: { count: 0, sides: 0, bonus: 1 }, type: "hitPoints" },
    text: "Creates 10 berries. Eating a berry restores 1 Hit Point.",
    target: { type: "self" }
  },
  grease: {
    pattern: "save",
    save: { ability: "dex", dc: dcExpr, failure: { text: "Target falls Prone in the greased area." } },
    target: { type: "aoe", aoe: { shape: "square", size: 10 }, range: "$(range)" }
  },
  guidingBolt: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: 4, sides: 6, bonus: 0 }, type: "radiant" },
    text: "Next attack roll against target before end of your next turn has Advantage.",
    target: { type: "single", range: "120 feet" }
  },
  hailOfThorns: {
    pattern: "save",
    save: {
      ability: "dex", dc: dcExpr,
      failure: { damage: { dice: { count: 1, sides: 10, bonus: 0 }, type: "piercing" } },
      success: { text: "Takes half damage" }
    },
    target: { type: "aoe", aoe: { shape: "sphere", size: 5 }, range: "$(range)" }
  },
  healingWord: {
    pattern: "healing",
    healing: { dice: { count: 2, sides: 4, bonus: bnsExpr }, type: "hitPoints" },
    target: { type: "single", range: "60 feet" }
  },
  hellishRebuke: {
    pattern: "save",
    save: {
      ability: "dex", dc: dcExpr,
      failure: { damage: { dice: { count: 2, sides: 10, bonus: 0 }, type: "fire" } },
      success: { text: "Takes half damage" }
    },
    trigger: "You take damage from a creature within 60 feet",
    target: { type: "single", range: "60 feet" }
  },
  heroism: { pattern: "utility", text: "Target is immune to Frightened and gains Temp HP equal to your spellcasting modifier at start of turn.", target: { type: "touch" } },
  hex: { pattern: "utility", text: "Target takes an extra 1d6 Necrotic damage whenever you hit it with an attack.", target: { type: "single", range: "90 feet" } },
  huntersMark: { pattern: "utility", text: "You deal an extra 1d6 Force damage to target whenever you hit it with an attack.", target: { type: "single", range: "90 feet" } },
  iceKnife: {
    mode: "succession",
    blocks: [
      {
        pattern: "attack",
        attack: { classification: "ranged", type: "spell", bonus: atkExpr },
        damage: { dice: { count: 1, sides: 10, bonus: 0 }, type: "piercing" },
        target: { type: "single", range: "60 feet" }
      },
      {
        pattern: "save",
        save: {
          ability: "dex", dc: dcExpr,
          failure: { damage: { dice: { count: 2, sides: 6, bonus: 0 }, type: "cold" } }
        },
        target: { type: "aoe", aoe: { shape: "sphere", size: 5 } }
      }
    ]
  },
  identify: { pattern: "utility", target: { type: "touch" } },
  illusoryScript: { pattern: "utility", target: { type: "touch" } },
  inflictWounds: {
    pattern: "attack",
    attack: { classification: "melee", type: "spell", bonus: atkExpr },
    damage: { dice: { count: 3, sides: 10, bonus: 0 }, type: "necrotic" },
    target: { type: "touch" }
  },
  jump: { pattern: "utility", target: { type: "touch" } },
  longstrider: { pattern: "utility", target: { type: "touch" } },
  mageArmor: { pattern: "utility", text: "Target unarmored base AC becomes 13 + DEX modifier.", target: { type: "touch" } },
  magicMissile: { pattern: "utility", text: "Create 3 darts that automatically hit for 1d4+1 Force damage each.", target: { type: "single", range: "120 feet" } },
  protectionFromEvilAndGood: { pattern: "utility", text: "Target gets protection against Aberrations, Celestials, Elementals, Fey, Fiends, and Undead.", target: { type: "touch" } },
  purifyFoodAndDrink: { pattern: "utility", target: { type: "single", range: "10 feet" } },
  rayOfSickness: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: 2, sides: 8, bonus: 0 }, type: "poison" },
    text: "Target makes a CON save or has Poisoned condition for 1 round.",
    target: { type: "single", range: "60 feet" }
  },
  sanctuary: { pattern: "utility", text: "Attackers targeting the warded creature must make a WIS save or choose a new target.", target: { type: "single", range: "30 feet" } },
  shield: {
    pattern: "utility",
    trigger: "you are hit by an attack roll or targeted by the Magic Missile spell",
    text: "You have a +5 bonus to AC until the start of your next turn, including against the triggering attack."
  },
  shieldOfFaith: { pattern: "utility", text: "Target gains +2 bonus to AC.", target: { type: "single", range: "60 feet" } },
  silentImage: { pattern: "utility", target: { type: "single", range: "60 feet" } },
  sleep: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Target falls asleep (Incapacitated and Unconscious condition) until taking damage or woken." } },
    target: { type: "single", range: "60 feet" }
  },
  speakWithAnimals: { pattern: "utility", target: { type: "self" } },
  tashasHideousLaughter: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Target falls Prone and has Incapacitated condition from laughter." } },
    target: { type: "single", range: "30 feet" }
  },
  tensersFloatingDisk: { pattern: "utility", target: { type: "single", range: "30 feet" } },
  thunderousSmite: {
    pattern: "save",
    save: {
      ability: "str", dc: dcExpr,
      failure: { damage: { dice: { count: 2, sides: 6, bonus: 0 }, type: "thunder" }, text: "Pushed 10 feet away and falls Prone." }
    },
    trigger: "Immediately after hitting a target with a Melee weapon or an Unarmed Strike",
    target: { type: "single", range: "$(range)" }
  },
  thunderwave: {
    pattern: "save",
    save: {
      ability: "con", dc: dcExpr,
      failure: { damage: { dice: { count: 2, sides: 8, bonus: 0 }, type: "thunder" }, text: "Pushed 10 feet away." },
      success: { text: "Takes half damage" }
    },
    target: { type: "aoe", aoe: { shape: "cube", size: 15 }, range: "$(range)" }
  },
  unseenServant: { pattern: "utility", target: { type: "single", range: "60 feet" } },
  witchBolt: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: 2, sides: 12, bonus: 0 }, type: "lightning" },
    text: "Bonus Action on subsequent turns deals 1d12 Lightning damage automatically.",
    target: { type: "single", range: "60 feet" }
  },
  wrathfulSmite: {
    pattern: "save",
    save: {
      ability: "wis", dc: dcExpr,
      failure: { damage: { dice: { count: 1, sides: 6, bonus: 0 }, type: "necrotic" }, text: "Target has Frightened condition until spell ends." }
    },
    trigger: "Immediately after hitting a creature with a Melee weapon or an Unarmed Strike",
    target: { type: "single", range: "$(range)" }
  },

  // LEVEL 2 SPELLS
  aid: {
    pattern: "healing",
    healing: { dice: { count: 0, sides: 0, bonus: 5 }, type: "hitPoints" },
    text: "Three targets gain 5 Current and Max Hit Points.",
    target: { type: "single", range: "30 feet" }
  },
  alterSelf: { pattern: "utility", target: { type: "self" } },
  barkskin: { pattern: "utility", text: "Target AC cannot be less than 16.", target: { type: "touch" } },
  blur: { pattern: "utility", text: "Attack rolls against you have Disadvantage unless attacker doesn't rely on sight.", target: { type: "self" } },
  cloudOfDaggers: { pattern: "utility", text: "Conjure daggers in a 5-foot Cube dealing 4d4 Slashing damage to creatures entering or starting turn inside.", target: { type: "aoe", aoe: { shape: "cube", size: 5 }, range: "60 feet" } },
  darkness: { pattern: "utility", target: { type: "aoe", aoe: { shape: "sphere", size: 15 }, range: "60 feet" } },
  detectThoughts: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Read surface thoughts or probe deeper into the mind of a target." } },
    target: { type: "single", range: "30 feet" }
  },
  dragonsBreath: {
    pattern: "save",
    save: {
      ability: "dex", dc: dcExpr,
      failure: { damage: { dice: { count: 3, sides: 6, bonus: 0 }, type: "fire" } },
      success: { text: "Takes half damage" }
    },
    target: { type: "aoe", aoe: { shape: "cone", size: 15 }, range: "touch" }
  },
  heatMetal: {
    pattern: "save",
    save: {
      ability: "con", dc: dcExpr,
      failure: { damage: { dice: { count: 2, sides: 8, bonus: 0 }, type: "fire" }, text: "Target drops metal object if possible or has Disadvantage on attack rolls." }
    },
    target: { type: "single", range: "60 feet" }
  },
  holdPerson: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Target has the Paralyzed condition." } },
    target: { type: "single", range: "60 feet" }
  },
  invisibility: { pattern: "utility", text: "Target becomes Invisible until it attacks or casts a spell.", target: { type: "touch" } },
  lesserRestoration: { pattern: "utility", text: "Cure one disease or condition (Blindness, Deafness, Paralysis, or Poison).", target: { type: "touch" } },
  levitate: {
    pattern: "save",
    save: { ability: "con", dc: dcExpr, failure: { text: "Target rises vertically up to 20 feet into the air." } },
    target: { type: "single", range: "60 feet" }
  },
  mindSpike: {
    pattern: "save",
    save: {
      ability: "wis", dc: dcExpr,
      failure: { damage: { dice: { count: 3, sides: 8, bonus: 0 }, type: "psychic" }, text: "You know target location at all times while spell lasts." },
      success: { text: "Takes half damage" }
    },
    target: { type: "single", range: "60 feet" }
  },
  mirrorImage: { pattern: "utility", text: "Three illusory duplicates appear to misdirect attacks.", target: { type: "self" } },
  mistyStep: { pattern: "utility", text: "Teleport up to 30 feet to an unoccupied space you can see.", target: { type: "self" } },
  passWithoutTrace: { pattern: "utility", text: "You and nearby party members gain +10 bonus to Stealth checks.", target: { type: "self" } },
  scorchingRay: {
    pattern: "attack",
    attack: { classification: "ranged", type: "spell", bonus: atkExpr },
    damage: { dice: { count: 2, sides: 6, bonus: 0 }, type: "fire" },
    target: { type: "single", range: "120 feet" }
  },
  shatter: {
    pattern: "save",
    save: {
      ability: "con", dc: dcExpr,
      failure: { damage: { dice: { count: 3, sides: 8, bonus: 0 }, type: "thunder" } },
      success: { text: "Takes half damage" }
    },
    target: { type: "aoe", aoe: { shape: "sphere", size: 10 }, range: "60 feet" }
  },
  silence: { pattern: "utility", target: { type: "aoe", aoe: { shape: "sphere", size: 20 }, range: "120 feet" } },
  spikeGrowth: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Ground sprouts spikes. Moving through area deals 2d4 Piercing damage for every 5 feet traveled." } },
    target: { type: "aoe", aoe: { shape: "sphere", size: 20 }, range: "150 feet" }
  },
  spiritualWeapon: {
    pattern: "attack",
    attack: { classification: "melee", type: "spell", bonus: atkExpr },
    damage: { dice: { count: 1, sides: 8, bonus: bnsExpr }, type: "force" },
    target: { type: "single", range: "60 feet" }
  },
  suggestion: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Target pursues suggested activity for up to 8 hours." } },
    target: { type: "single", range: "30 feet" }
  },
  web: {
    pattern: "save",
    save: { ability: "dex", dc: dcExpr, failure: { text: "Target is Restrained in difficult terrain." } },
    target: { type: "aoe", aoe: { shape: "cube", size: 20 }, range: "60 feet" }
  },
  zoneOfTruth: {
    pattern: "save",
    save: { ability: "cha", dc: dcExpr, failure: { text: "Creatures in area cannot speak a deliberate lie." } },
    target: { type: "aoe", aoe: { shape: "sphere", size: 15 }, range: "60 feet" }
  },

  // LEVEL 3 SPELLS
  callLightning: {
    pattern: "save",
    save: {
      ability: "dex", dc: dcExpr,
      failure: { damage: { dice: { count: 3, sides: 10, bonus: 0 }, type: "lightning" } },
      success: { text: "Takes half damage" }
    },
    target: { type: "aoe", aoe: { shape: "cylinder", size: 5 }, range: "120 feet" }
  },
  counterspell: {
    pattern: "save",
    save: { ability: "con", dc: dcExpr, failure: { text: "The spell dissipates with no effect." } },
    trigger: "A creature within 60 feet casts a spell with Verbal, Somatic, or Material components",
    target: { type: "single", range: "60 feet" }
  },
  createFoodAndWater: { pattern: "utility", target: { type: "single", range: "30 feet" } },
  fear: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Targets drop held items and have Frightened condition, fleeing away." } },
    target: { type: "aoe", aoe: { shape: "cone", size: 30 }, range: "$(range)" }
  },
  fireball: {
    pattern: "save",
    save: {
      ability: "dex", dc: dcExpr,
      failure: { damage: { dice: { count: 8, sides: 6, bonus: 0 }, type: "fire" } },
      success: { text: "Takes half damage" }
    },
    target: { type: "aoe", aoe: { shape: "sphere", size: 20 }, range: "150 feet" }
  },
  fly: { pattern: "utility", text: "Target gains a Flying speed of 60 feet.", target: { type: "touch" } },
  haste: { pattern: "utility", text: "Target gains +2 AC, Advantage on DEX saves, doubled Speed, and an extra action.", target: { type: "single", range: "30 feet" } },
  hungerOfHadar: {
    mode: "succession",
    blocks: [
      {
        pattern: "save",
        save: {
          ability: "dex", dc: dcExpr,
          failure: { damage: { dice: { count: 2, sides: 6, bonus: 0 }, type: "cold" } }
        },
        target: { type: "aoe", aoe: { shape: "sphere", size: 20 } }
      },
      {
        pattern: "save",
        save: {
          ability: "dex", dc: dcExpr,
          failure: { damage: { dice: { count: 2, sides: 6, bonus: 0 }, type: "acid" } }
        },
        target: { type: "aoe", aoe: { shape: "sphere", size: 20 } }
      }
    ]
  },
  hypnoticPattern: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Targets have Charmed, Incapacitated, and Speed 0 conditions." } },
    target: { type: "aoe", aoe: { shape: "cube", size: 30 }, range: "120 feet" }
  },
  massHealingWord: {
    pattern: "healing",
    healing: { dice: { count: 2, sides: 4, bonus: bnsExpr }, type: "hitPoints" },
    target: { type: "single", range: "60 feet" }
  },
  revivify: { pattern: "utility", text: "Return a creature that died within the last minute to life with 1 HP.", target: { type: "touch" } },
  slow: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Targets have halved Speed, -2 AC and DEX saves, and limited actions." } },
    target: { type: "aoe", aoe: { shape: "cube", size: 40 }, range: "120 feet" }
  },
  spiritGuardians: {
    pattern: "save",
    save: {
      ability: "wis", dc: dcExpr,
      failure: { damage: { dice: { count: 3, sides: 8, bonus: 0 }, type: "radiant" } },
      success: { text: "Takes half damage" }
    },
    target: { type: "aoe", aoe: { shape: "emanation", size: 15 }, range: "$(range)" }
  },
  stinkingCloud: {
    pattern: "save",
    save: { ability: "con", dc: dcExpr, failure: { text: "Targets have Poisoned condition and cannot take actions or bonus actions." } },
    target: { type: "aoe", aoe: { shape: "sphere", size: 20 }, range: "90 feet" }
  },
  telekineticCrush: {
    pattern: "save",
    save: {
      ability: "str", dc: dcExpr,
      failure: { damage: { dice: { count: 5, sides: 10, bonus: 0 }, type: "force" } },
      success: { text: "Takes half damage" }
    },
    target: { type: "single", range: "60 feet" }
  },
  waterBreathing: { pattern: "utility", target: { type: "single", range: "30 feet" } },

  // LEVEL 4 SPELLS
  arcaneEye: { pattern: "utility", target: { type: "single", range: "30 feet" } },
  auraOfLife: { pattern: "utility", text: "Allies in 30-ft aura gain Resistance to Necrotic damage and regain 1 HP at start of turn if at 0 HP.", target: { type: "self" } },
  blight: {
    pattern: "save",
    save: {
      ability: "con", dc: dcExpr,
      failure: { damage: { dice: { count: 8, sides: 8, bonus: 0 }, type: "necrotic" } },
      success: { text: "Takes half damage" }
    },
    target: { type: "single", range: "30 feet" }
  },
  charmMonster: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Target has Charmed condition for 1 hour." } },
    target: { type: "single", range: "30 feet" }
  },
  compulsion: {
    pattern: "save",
    save: { ability: "wis", dc: dcExpr, failure: { text: "Target must use its movement to move in a designated direction." } },
    target: { type: "single", range: "30 feet" }
  },
  deathWard: { pattern: "utility", text: "First time target would drop to 0 HP, it drops to 1 HP instead.", target: { type: "touch" } },
  dimensionDoor: { pattern: "utility", text: "Teleport yourself and one willing creature to a location within range.", target: { type: "single", range: "500 feet" } },
  fireShield: {
    pattern: "utility",
    trigger: "A creature within 5 feet hits you with a melee attack roll",
    text: "Attacker takes 2d8 Fire or Cold damage."
  },
  leomundsSecretChest: { pattern: "utility", target: { type: "touch" } },
  otilukesResilientSphere: {
    pattern: "save",
    save: { ability: "dex", dc: dcExpr, failure: { text: "Encloses target in a sphere of force, isolating it from damage and effects." } },
    target: { type: "single", range: "30 feet" }
  },
  stoneShape: { pattern: "utility", target: { type: "touch" } },
  wallOfFire: {
    pattern: "save",
    save: {
      ability: "dex", dc: dcExpr,
      failure: { damage: { dice: { count: 5, sides: 8, bonus: 0 }, type: "fire" } },
      success: { text: "Takes half damage" }
    },
    target: { type: "single", range: "120 feet" }
  }
};

const spellDir = path.join(root, "data/spells");
let updatedCount = 0;

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (f.endsWith(".yml") || f.endsWith(".yaml")) {
      const raw = fs.readFileSync(fullPath, "utf8");
      const doc = yaml.load(raw);
      if (!doc || !doc.id) continue;

      const spellId = doc.id;
      const targetMechanic = spellMechanics[spellId];
      if (targetMechanic) {
        doc.mechanic = targetMechanic;
        const newYaml = yaml.dump(doc, { indent: 2 });
        fs.writeFileSync(fullPath, newYaml, "utf8");
        updatedCount++;
      } else {
        console.warn("No mapping defined for spell:", spellId);
      }
    }
  }
}
walk(spellDir);

console.log(`Meticulously rebuilt mechanics for ${updatedCount} spell files.`);
