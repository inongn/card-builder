import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const root = process.cwd();

const activityMechanics = {
  // BARD
  countercharm: {
    pattern: "utility",
    trigger: "When you or an ally within 30 feet fails a saving throw against Charmed or Frightened",
    text: "Cause the save to be rerolled with Advantage."
  },

  // DRUID
  landsAid: {
    pattern: "save",
    save: {
      ability: "con",
      dc: "$(attributes.spellcasting.save || 15)",
      failure: {
        damage: {
          dice: {
            count: "$(meta.level >= 14 ? 4 : meta.level >= 10 ? 3 : 2)",
            sides: 6,
            bonus: 0
          },
          type: "necrotic"
        }
      },
      success: { text: "Takes half damage" }
    },
    text: "One creature of your choice in the area regains the same amount of Hit Points.",
    target: {
      type: "aoe",
      aoe: { shape: "sphere", size: 10 },
      range: "60 feet"
    }
  },
  wildShapeActivity: {
    pattern: "healing",
    healing: {
      dice: { count: 0, sides: 0, bonus: "$(meta.level * 2)" },
      type: "tempHitPoints"
    },
    text: "Transform into a Beast form gaining temporary hit points equal to twice your Druid level."
  },

  // CLERIC
  preserveLife: {
    pattern: "healing",
    healing: {
      dice: { count: 0, sides: 0, bonus: "$(5 * meta.level)" },
      type: "hitPoints"
    },
    text: "Divide up to $(5 * meta.level) Hit Points of healing among Bloodied allies within 30 feet.",
    target: {
      type: "aoe",
      aoe: { shape: "emanation", size: 30 }
    }
  },

  // MONK
  evasion: {
    pattern: "utility",
    trigger: "When subjected to an effect that allows a Dexterity saving throw for half damage",
    text: "Take no damage on a success, and half damage on a failure."
  },
  flurryOfBlows: {
    pattern: "utility",
    text: "Make two (or three at level 10+) Unarmed Strikes as a Bonus Action."
  },
  stunningStrike: {
    pattern: "save",
    trigger: "When you hit a creature with an attack",
    save: {
      ability: "con",
      dc: "$(attributes.monkSaveDC)",
      failure: { text: "Target has the Stunned condition until the start of your next turn." },
      success: { text: "Target Speed is halved and next attack roll against it has Advantage." }
    },
    target: { type: "single" }
  },

  // PALADIN
  layOnHands: {
    pattern: "healing",
    healing: {
      dice: { count: 0, sides: 0, bonus: 5 },
      type: "hitPoints"
    },
    text: "Restore 5 Hit Points per charge expended, or remove conditions.",
    target: { type: "touch" }
  },

  // ROGUE
  steadyAim: {
    pattern: "utility",
    text: "Give yourself Advantage on your next attack roll on the current turn (Speed becomes 0)."
  },

  // SORCERER
  innateSorcery: {
    pattern: "utility",
    text: "Increase spell save DC by 1 and gain Advantage on Sorcerer spell attack rolls for 1 minute."
  },

  // WARLOCK
  darkOnesBlessing: {
    pattern: "healing",
    healing: {
      dice: { count: 0, sides: 0, bonus: "$(meta.level + stats.cha.mod)" },
      type: "tempHitPoints"
    },
    trigger: "When you or an ally within 10 feet reduces an enemy to 0 Hit Points"
  },
  darkOnesOwnLuck: {
    pattern: "utility",
    trigger: "When you make an ability check or saving throw",
    text: "Add 1d10 to your roll."
  },
  hurlThroughHell: {
    pattern: "save",
    trigger: "When you hit a creature with an attack roll",
    save: {
      ability: "cha",
      dc: "$(attributes.spellcasting.save)",
      failure: {
        damage: {
          dice: { count: 8, sides: 10, bonus: 0 },
          type: "psychic"
        },
        text: "Target disappears until end of your next turn and has Incapacitated condition."
      }
    },
    target: { type: "single" }
  },

  // SPECIES
  adrenalineRush: {
    mode: "sequence",
    blocks: [
      { pattern: "utility", text: "Take the Dash action." },
      {
        pattern: "healing",
        healing: {
          dice: { count: 0, sides: 0, bonus: "$(attributes.prof)" },
          type: "tempHitPoints"
        }
      }
    ]
  }
};

const targetDirs = ["./data/classes", "./data/species", "./data/feats", "./data/core"];
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

      const actId = doc.id;
      const targetMechanic = activityMechanics[actId];
      if (targetMechanic) {
        doc.mechanic = targetMechanic;
        const newYaml = yaml.dump(doc, { indent: 2 });
        fs.writeFileSync(fullPath, newYaml, "utf8");
        updatedCount++;
      }
    }
  }
}

targetDirs.forEach(d => { if (fs.existsSync(d)) walk(d); });

console.log(`Overhauled mechanics for ${updatedCount} non-spell Activity files.`);
