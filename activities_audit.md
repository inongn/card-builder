# Activity Mechanics & Prose Sentence Construction Audit

> **Audit Generated:** 2026-09-25T16:08:21.783Z
> **Total Activities Audited:** 548
> **Total Distinct Variations Evaluated:** 1732
> **Schema Validation Errors:** 0
> **Unresolved Expressions:** 0

## Table of Contents

- [Class Features (artificer)](#class-features-artificer-) (1 activities)
- [Class Features (barbarian)](#class-features-barbarian-) (2 activities)
- [Class Features (bard)](#class-features-bard-) (2 activities)
- [Class Features (classOptions)](#class-features-classoptions-) (58 activities)
- [Class Features (cleric)](#class-features-cleric-) (2 activities)
- [Class Features (druid)](#class-features-druid-) (1 activities)
- [Class Features (fighter)](#class-features-fighter-) (3 activities)
- [Class Features (monk)](#class-features-monk-) (8 activities)
- [Class Features (paladin)](#class-features-paladin-) (3 activities)
- [Class Features (psion)](#class-features-psion-) (1 activities)
- [Class Features (rogue)](#class-features-rogue-) (5 activities)
- [Class Features (sorcerer)](#class-features-sorcerer-) (1 activities)
- [Subclass Features (artificer)](#subclass-features-artificer-) (9 activities)
- [Subclass Features (barbarian)](#subclass-features-barbarian-) (8 activities)
- [Subclass Features (bard)](#subclass-features-bard-) (9 activities)
- [Subclass Features (cleric)](#subclass-features-cleric-) (11 activities)
- [Subclass Features (druid)](#subclass-features-druid-) (5 activities)
- [Subclass Features (fighter)](#subclass-features-fighter-) (8 activities)
- [Subclass Features (monk)](#subclass-features-monk-) (9 activities)
- [Subclass Features (paladin)](#subclass-features-paladin-) (8 activities)
- [Subclass Features (psion)](#subclass-features-psion-) (9 activities)
- [Subclass Features (ranger)](#subclass-features-ranger-) (7 activities)
- [Subclass Features (rogue)](#subclass-features-rogue-) (6 activities)
- [Subclass Features (sorcerer)](#subclass-features-sorcerer-) (8 activities)
- [Subclass Features (warlock)](#subclass-features-warlock-) (8 activities)
- [Subclass Features (wizard)](#subclass-features-wizard-) (5 activities)
- [Core Activities](#core-activities) (12 activities)
- [Weapons](#weapons) (39 activities)
- [Feats](#feats) (23 activities)
- [Miscellaneous Activities](#miscellaneous-activities) (16 activities)
- [Spells: Cantrips](#spells-cantrips) (35 activities)
- [Spells: 1st Level](#spells-1st-level) (65 activities)
- [Spells: 2nd Level](#spells-2nd-level) (66 activities)
- [Spells: 3rd Level](#spells-3rd-level) (54 activities)
- [Spells: 4th Level](#spells-4th-level) (41 activities)

---

## Class Features (artificer)

### Flash of Genius (`flashOfGenius`)

- **Source File:** [`data/classes/artificer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/artificer.yml)
- **Time:** `reaction` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Resource:** `flashOfGeniusResource`

#### Baseline Prose

> **Flash of Genius.** _Trigger:_ When you or a creature you can see fail an ability check, or fail a saving throw. _Response:_ The target adds 3 to ability checks and saving throws. _Range:_ 30 feet.

---

## Class Features (barbarian)

### Rage (`rage`)

- **Source File:** [`data/classes/barbarian.yml`](file:///home/gerardo/Projects/card-builder/data/classes/barbarian.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `rage`

#### Baseline Prose

> **Rage.** You gain Resistance to Bludgeoning, Piercing, and Slashing damage, add +2 to Strength-based attack damage, and gain Advantage on Strength checks and Strength saving throws. _Duration:_ 10 minutes.

#### Individual Feature Modifications (5)

* **+ Primal Knowledge** *(from [`data/classes/barbarian.yml`](file:///home/gerardo/Projects/card-builder/data/classes/barbarian.yml))*
  > **Rage.** You gain Resistance to Bludgeoning, Piercing, and Slashing damage, add +2 to Strength-based attack damage, gain Advantage on Strength checks and Strength saving throws, and you can make ability checks using Acrobatics, Intimidation, Perception, Stealth, or Survival with Strength. _Duration:_ 10 minutes.

* **+ Barbarian** *(from [`data/classes/barbarian.yml`](file:///home/gerardo/Projects/card-builder/data/classes/barbarian.yml))*
  > **Rage.** You gain Resistance to Bludgeoning, Piercing, and Slashing damage, move up to 15 feet, add +2 to Strength-based attack damage, and gain Advantage on Strength checks and Strength saving throws. _Duration:_ 10 minutes.

* **+ Vitality Surge** *(from [`data/classes/subclasses/barbarian/worldTree.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/worldTree.yml))*
  > **Rage.** You gain Resistance to Bludgeoning, Piercing, and Slashing damage, add +2 to Strength-based attack damage, gain Advantage on Strength checks and Strength saving throws, and gain 8 Temporary Hit Points. _Duration:_ 10 minutes.

* **+ Divine Fury** *(from [`data/classes/subclasses/barbarian/zealot.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/zealot.yml))*
  > **Rage.** You gain Resistance to Bludgeoning, Piercing, and Slashing damage, add +2 to Strength-based attack damage, gain Advantage on Strength checks and Strength saving throws, and the first creature hit on each of your turns takes an extra 1d6+4 Necrotic or Radiant damage. _Duration:_ 10 minutes.

* **+ Fanatical Focus** *(from [`data/classes/subclasses/barbarian/zealot.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/zealot.yml))*
  > **Rage.** You gain Resistance to Bludgeoning, Piercing, and Slashing damage, add +2 to Strength-based attack damage, gain Advantage on Strength checks and Strength saving throws, and once per active Rage, if you fail a saving throw, you can reroll it with a +2 bonus. _Duration:_ 10 minutes.

#### Realistic Combined Class Stacks (2)

* **Stack: BARBARIAN + [Primal Knowledge, Barbarian, Vitality Surge]**
  > **Rage.** You gain Resistance to Bludgeoning, Piercing, and Slashing damage, move up to 15 feet, add +2 to Strength-based attack damage, gain Advantage on Strength checks and Strength saving throws, you can make ability checks using Acrobatics, Intimidation, Perception, Stealth, or Survival with Strength, and gain 8 Temporary Hit Points. _Duration:_ 10 minutes.

* **Stack: BARBARIAN + [Primal Knowledge, Barbarian, Divine Fury, Fanatical Focus]**
  > **Rage.** You gain Resistance to Bludgeoning, Piercing, and Slashing damage, move up to 15 feet, add +2 to Strength-based attack damage, gain Advantage on Strength checks and Strength saving throws, you can make ability checks using Acrobatics, Intimidation, Perception, Stealth, or Survival with Strength, the first creature hit on each of your turns takes an extra 1d6+4 Necrotic or Radiant damage, and once per active Rage, if you fail a saving throw, you can reroll it with a +2 bonus. _Duration:_ 10 minutes.

---

### Reckless Attack (`recklessAttack`)

- **Source File:** [`data/classes/barbarian.yml`](file:///home/gerardo/Projects/card-builder/data/classes/barbarian.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Reckless Attack.** You gain Advantage on Strength-based attack rolls until the start of your next turn, and attack rolls against you have Advantage until the start of your next turn.

#### Individual Feature Modifications (1)

* **+ Path of the Berserker** *(from [`data/classes/subclasses/barbarian/berserker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/berserker.yml))*
  > **Reckless Attack.** You gain Advantage on Strength-based attack rolls until the start of your next turn, attack rolls against you have Advantage until the start of your next turn, and deal extra 2d6 damage to the first creature hit on your turn while Rage is active.

#### Realistic Combined Class Stacks (1)

* **Stack: BARBARIAN (berserker) + [Path of the Berserker]**
  > **Reckless Attack.** You gain Advantage on Strength-based attack rolls until the start of your next turn, attack rolls against you have Advantage until the start of your next turn, and deal extra 2d6 damage to the first creature hit on your turn while Rage is active.

---

## Class Features (bard)

### Bardic Inspiration (`bardicInspiration`)

- **Source File:** [`data/classes/bard.yml`](file:///home/gerardo/Projects/card-builder/data/classes/bard.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `1 hour`
- **Resource:** `bardicInspiration`

#### Baseline Prose

> **Bardic Inspiration.** One creature within 60 feet gains one of your Bardic Inspiration dice (1d8). Once within the next hour when the target fails a D20 Test, the target can roll the die and add the number rolled to the d20. _Duration:_ 1 hour.

#### Individual Feature Modifications (3)

* **+ Agile Strikes** *(from [`data/classes/subclasses/bard/dance.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/dance.yml))*
  > **Bardic Inspiration.** One creature within 60 feet gains one of your Bardic Inspiration dice (1d8). Once within the next hour when the target fails a D20 Test, the target can roll the die and add the number rolled to the d20, and make one Unarmed Strike as part of this action. _Duration:_ 1 hour.

* **+ Spirits from Beyond** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Bardic Inspiration.** One creature within 60 feet gains one of your Bardic Inspiration dice (1d8). Once within the next hour when the target fails a D20 Test, the target can roll the die and add the number rolled to the d20, and roll the Bardic Inspiration die to channel a random spirit. _Duration:_ 1 hour.

* **+ Combat Inspiration** *(from [`data/classes/subclasses/bard/valor.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/valor.yml))*
  > **Bardic Inspiration.** One creature within 60 feet gains one of your Bardic Inspiration dice (1d8). Once within the next hour when the target fails a D20 Test, the target can roll the die and add the number rolled to the d20, and defense: when hit by an attack roll, the target can use a Reaction to roll the die and add the result to AC. Offense: when hitting with an attack roll, the target can use a Reaction to roll the die and add the result to the damage roll. _Duration:_ 1 hour.

#### Realistic Combined Class Stacks (3)

* **Stack: BARD (dance) + [Agile Strikes]**
  > **Bardic Inspiration.** One creature within 60 feet gains one of your Bardic Inspiration dice (1d8). Once within the next hour when the target fails a D20 Test, the target can roll the die and add the number rolled to the d20, and make one Unarmed Strike as part of this action. _Duration:_ 1 hour.

* **Stack: BARD (spirits) + [Spirits from Beyond]**
  > **Bardic Inspiration.** One creature within 60 feet gains one of your Bardic Inspiration dice (1d8). Once within the next hour when the target fails a D20 Test, the target can roll the die and add the number rolled to the d20, and roll the Bardic Inspiration die to channel a random spirit. _Duration:_ 1 hour.

* **Stack: BARD (valor) + [Combat Inspiration]**
  > **Bardic Inspiration.** One creature within 60 feet gains one of your Bardic Inspiration dice (1d8). Once within the next hour when the target fails a D20 Test, the target can roll the die and add the number rolled to the d20, and defense: when hit by an attack roll, the target can use a Reaction to roll the die and add the result to AC. Offense: when hitting with an attack roll, the target can use a Reaction to roll the die and add the result to the damage roll. _Duration:_ 1 hour.

---

### Countercharm (`countercharm`)

- **Source File:** [`data/classes/bard.yml`](file:///home/gerardo/Projects/card-builder/data/classes/bard.yml)
- **Time:** `reaction` | **Range:** `30 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Countercharm.** _Trigger:_ When you or a creature you can see fail a saving throw. _Response:_ The target rerolls the saving throw and has Advantage on its next saving throw. _Range:_ 30 feet.

---

## Class Features (classOptions)

### Force Demolisher (`forceDemolisher`)

- **Source File:** [`data/classes/classOptions/artificer/armorModel/dreadnaught.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/armorModel/dreadnaught.yml)
- **Time:** `action` | **Range:** `10 feet` | **Duration:** `instantaneous`
- **Tags:** `weaponAttack`, `attack`

#### Baseline Prose

> **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force damage.

#### Individual Feature Modifications (6)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force damage plus 1d4 Cold damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Divine Strike, Pull of Death]**
  > **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force damage plus 1d8 Necrotic or Radiant damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Primal Strike]**
  > **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **Stack: MONK (venom) + [Potent Arsenal]**
  > **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force or Acid damage.

* **Stack: RANGER (feyWanderer) + [Dreadful Strikes]**
  > **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force damage plus 1d4 Psychic damage.

* **Stack: RANGER (winterWalker) + [Polar Strikes]**
  > **Force Demolisher.** _Melee Attack Roll:_ +6, range 10 feet. _Hit:_ 1d10+3 Force damage plus 1d4 Cold damage.

---

### Giant Stature (`giantStature`)

- **Source File:** [`data/classes/classOptions/artificer/armorModel/dreadnaught.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/armorModel/dreadnaught.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `giantStatureResource`

#### Baseline Prose

> **Giant Stature.** You transform and enlarge your armor for 1 minute: reach increases by 5 feet, and if smaller than Large you become Large.

---

### Thunder Pulse (`thunderPulse`)

- **Source File:** [`data/classes/classOptions/artificer/armorModel/guardian.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/armorModel/guardian.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `weaponAttack`, `attack`

#### Baseline Prose

> **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder damage.

#### Individual Feature Modifications (6)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder damage plus 1d4 Cold damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Divine Strike, Pull of Death]**
  > **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder damage plus 1d8 Necrotic or Radiant damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Primal Strike]**
  > **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **Stack: MONK (venom) + [Potent Arsenal]**
  > **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder or Acid damage.

* **Stack: RANGER (feyWanderer) + [Dreadful Strikes]**
  > **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder damage plus 1d4 Psychic damage.

* **Stack: RANGER (winterWalker) + [Polar Strikes]**
  > **Thunder Pulse.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Thunder damage plus 1d4 Cold damage.

---

### Defensive Field (`defensiveField`)

- **Source File:** [`data/classes/classOptions/artificer/armorModel/guardian.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/armorModel/guardian.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Defensive Field.** You gain 8 Temporary Hit Points.

---

### Lightning Launcher (`lightningLauncher`)

- **Source File:** [`data/classes/classOptions/artificer/armorModel/infiltrator.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/armorModel/infiltrator.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `instantaneous`
- **Tags:** `weaponAttack`, `attack`

#### Baseline Prose

> **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning damage.

#### Individual Feature Modifications (6)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning damage plus 1d4 Cold damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Divine Strike, Pull of Death]**
  > **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning damage plus 1d8 Necrotic or Radiant damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Primal Strike]**
  > **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **Stack: MONK (venom) + [Potent Arsenal]**
  > **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning or Acid damage.

* **Stack: RANGER (feyWanderer) + [Dreadful Strikes]**
  > **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning damage plus 1d4 Psychic damage.

* **Stack: RANGER (winterWalker) + [Polar Strikes]**
  > **Lightning Launcher.** _Ranged Attack Roll:_ +6, range 90 feet. _Hit:_ 1d6+3 Lightning damage plus 1d4 Cold damage.

---

### Banishing Shot (`banishingShot`)

- **Source File:** [`data/classes/classOptions/fighter/arcaneArcher/banishingShot.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/arcaneArcher/banishingShot.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `arcaneShot`
- **Tags:** `arcaneShotOption`

#### Baseline Prose

> **Banishing Shot.** _Trigger:_ When you hit a creature with a weapon attack using a bow. _Response:_ _Charisma Saving Throw:_ DC 15, the target. _Failure:_ The target has the Incapacitated condition.

---

### Beguiling Shot (`beguilingShot`)

- **Source File:** [`data/classes/classOptions/fighter/arcaneArcher/beguilingShot.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/arcaneArcher/beguilingShot.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `arcaneShot`
- **Tags:** `arcaneShotOption`

#### Baseline Prose

> **Beguiling Shot.** _Trigger:_ When you hit a creature with a weapon attack using a bow. _Response:_ _Wisdom Saving Throw:_ DC 15, the target. _Failure or Success:_ 2d6 Psychic damage. _Failure:_ The target has the Charmed condition.

---

### Bursting Shot (`burstingShot`)

- **Source File:** [`data/classes/classOptions/fighter/arcaneArcher/burstingShot.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/arcaneArcher/burstingShot.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `arcaneShot`
- **Tags:** `arcaneShotOption`

#### Baseline Prose

> **Bursting Shot.** _Trigger:_ When you hit a creature with a weapon attack using a bow. _Response:_ The target and all other creatures within 10 feet of it take 2d6 Force damage.

---

### Enfeebling Shot (`enfeeblingShot`)

- **Source File:** [`data/classes/classOptions/fighter/arcaneArcher/enfeeblingShot.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/arcaneArcher/enfeeblingShot.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `arcaneShot`
- **Tags:** `arcaneShotOption`

#### Baseline Prose

> **Enfeebling Shot.** _Trigger:_ When you hit a creature with a weapon attack using a bow. _Response:_ _Constitution Saving Throw:_ DC 15, the target. _Failure or Success:_ 2d6 Necrotic damage. _Failure:_ The damage of its weapon attacks is halved until the start of your next turn.

---

### Grasping Shot (`graspingShot`)

- **Source File:** [`data/classes/classOptions/fighter/arcaneArcher/graspingShot.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/arcaneArcher/graspingShot.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `arcaneShot`
- **Tags:** `arcaneShotOption`

#### Baseline Prose

> **Grasping Shot.** _Trigger:_ When you hit a creature with a weapon attack using a bow. _Response:_ The target takes 2d6 Slashing damage, and has its Speed reduced by 10 feet, and takes 2d6 Slashing damage the first time it moves on a turn without teleporting. _Duration:_ 1 minute.

---

### Piercing Shot (`piercingShot`)

- **Source File:** [`data/classes/classOptions/fighter/arcaneArcher/piercingShot.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/arcaneArcher/piercingShot.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `arcaneShot`
- **Tags:** `arcaneShotOption`

#### Baseline Prose

> **Piercing Shot.** _Dexterity Saving Throw:_ DC 15, each creature in a 30-foot Line originating from you. _Failure:_ Damage equal to the arrow's damage plus 1d6 Piercing damage. _Success:_ Half damage.

---

### Seeking Shot (`seekingShot`)

- **Source File:** [`data/classes/classOptions/fighter/arcaneArcher/seekingShot.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/arcaneArcher/seekingShot.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `arcaneShot`
- **Tags:** `arcaneShotOption`

#### Baseline Prose

> **Seeking Shot.** _Strength Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ Damage equal to the arrow's damage plus 1d6 Force damage, and you know the target's location. _Success:_ Half damage.

---

### Shadow Shot (`shadowShot`)

- **Source File:** [`data/classes/classOptions/fighter/arcaneArcher/shadowShot.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/arcaneArcher/shadowShot.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `arcaneShot`
- **Tags:** `arcaneShotOption`

#### Baseline Prose

> **Shadow Shot.** _Trigger:_ When you hit a creature with a weapon attack using a bow. _Response:_ _Wisdom Saving Throw:_ DC 15, the target. _Failure or Success:_ 2d6 Psychic damage. _Failure:_ The target is unable to see anything farther than 5 feet away until the start of your next turn.

---

### Ambush (`ambush`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/ambush.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/ambush.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Ambush.** You add 1d1d8 to a Dexterity (Stealth) check or Initiative roll.

---

### Bait and Switch (`baitAndSwitch`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/baitAndSwitch.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/baitAndSwitch.yml)
- **Time:** `bonus action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Bait and Switch.** You swap places with a willing creature; choose yourself or that creature to gain 1d1d8 to AC until the start of your next turn. _Range:_ 5 feet.

---

### Commander's Strike (`commandersStrike`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/commandersStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/commandersStrike.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Commander's Strike.** One ally within 60 feet uses its Reaction to make one weapon attack, adding 1d1d8 to the damage roll.

---

### Commanding Presence (`commandingPresence`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/commandingPresence.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/commandingPresence.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Commanding Presence.** You add 1d1d8 to a Charisma (Intimidation, Performance, or Persuasion) check.

---

### Disarming Attack (`disarmingAttack`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/disarmingAttack.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/disarmingAttack.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Disarming Attack.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Strength Saving Throw:_ DC 15, the target. _Failure or Success:_ 1d1d8 Extra damage. _Failure:_ The target drops one object of your choice that it is holding.

---

### Distracting Strike (`distractingStrike`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/distractingStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/distractingStrike.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Distracting Strike.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 1d1d8 Extra damage, and the next attack roll against the target by an attacker other than you has Advantage before the start of your next turn.

---

### Evasive Footwork (`evasiveFootwork`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/evasiveFootwork.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/evasiveFootwork.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Evasive Footwork.** You take the Disengage action and add 1d1d8 to your AC until the start of your next turn.

---

### Feinting Attack (`feintingAttack`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/feintingAttack.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/feintingAttack.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Feinting Attack.** You have Advantage on your next attack roll. If that attack hits, add 1d1d8 to the attack's damage roll.

---

### Goading Attack (`goadingAttack`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/goadingAttack.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/goadingAttack.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Goading Attack.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Wisdom Saving Throw:_ DC 15, the target. _Failure or Success:_ 1d1d8 damage. _Failure:_ The target has Disadvantage on attack rolls against targets other than you until the end of your next turn.

---

### Lunging Attack (`lungingAttack`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/lungingAttack.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/lungingAttack.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Lunging Attack.** You take the Dash action; moving 5 feet in a straight line before hitting with a melee attack adds 1d1d8 to the damage roll.

---

### Maneuvering Attack (`maneuveringAttack`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/maneuveringAttack.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/maneuveringAttack.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Maneuvering Attack.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 1d1d8 damage, and you can choose a willing creature to use its Reaction to move up to half its Speed without provoking Opportunity Attacks from the target.

---

### Menacing Attack (`menacingAttack`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/menacingAttack.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/menacingAttack.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Menacing Attack.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Wisdom Saving Throw:_ DC 15, the target. _Failure or Success:_ 1d1d8 damage. _Failure:_ The target has the Frightened condition until the end of its next turn.

---

### Parry (`parry`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/parry.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/parry.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Parry.** _Trigger:_ When you are hit by an attack. _Response:_ You reduce damage taken by 1d1d8+4.

---

### Precision Attack (`precisionAttack`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/precisionAttack.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/precisionAttack.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Precision Attack.** _Trigger:_ When you miss with an attack. _Response:_ You add 1d1d8 to the attack roll, potentially causing the attack to hit.

---

### Pushing Attack (`pushingAttack`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/pushingAttack.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/pushingAttack.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Pushing Attack.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Strength Saving Throw:_ DC 15, the target. _Failure or Success:_ 1d1d8 damage. _Failure:_ The target is pushed up to 15 feet away.

---

### Rally (`rally`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/rally.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/rally.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Rally.** One ally within 30 feet gains 1d1d8+4 Temporary Hit Points.

---

### Riposte (`riposte`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/riposte.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/riposte.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Riposte.** _Trigger:_ When a creature misses you with a melee attack roll. _Response:_ You make a melee attack roll with a weapon or Unarmed Strike against the creature; if you hit, add 1d1d8 to damage.

---

### Sweeping Attack (`sweepingAttack`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/sweepingAttack.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/sweepingAttack.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Sweeping Attack.** _Trigger:_ When you hit a creature with an attack. _Response:_ One creature within 5 feet takes 1d1d8 damage.

---

### Tactical Assessment (`tacticalAssessment`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/tacticalAssessment.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/tacticalAssessment.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Tactical Assessment.** You add 1d1d8 to a History, Insight, or Investigation check.

---

### Trip Attack (`tripAttack`)

- **Source File:** [`data/classes/classOptions/fighter/battleMaster/tripAttack.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/fighter/battleMaster/tripAttack.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`
- **Tags:** `maneuver`

#### Baseline Prose

> **Trip Attack.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Strength Saving Throw:_ DC 15, the target. _Failure or Success:_ 1d1d8 damage. _Failure:_ The target is Prone.

---

### Biofeedback (`biofeedback`)

- **Source File:** [`data/classes/classOptions/psion/disciplines/biofeedback.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/psion/disciplines/biofeedback.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`
- **Tags:** `psionicDiscipline`

#### Baseline Prose

> **Biofeedback.** _Trigger:_ when you cast a Psion spell of the Necromancy or Transmutation school. _Response:_ You gain 1d1d8+3 Temporary Hit Points.

---

### Bolstering Precognition (`bolsteringPrecognition`)

- **Source File:** [`data/classes/classOptions/psion/disciplines/bolsteringPrecognition.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/psion/disciplines/bolsteringPrecognition.yml)
- **Time:** `free action` | **Range:** `60 feet` | **Duration:** `1 round`
- **Resource:** `psionicEnergyDice`
- **Tags:** `psionicDiscipline`

#### Baseline Prose

> **Bolstering Precognition.** _Trigger:_ when you cast a Psion spell of the Abjuration or Divination school. _Response:_ One creature within 60 feet add 1d1d8 to the next D20 Test the target makes until the end of your next turn. _Duration:_ 1 round.

---

### Destructive Thoughts (`destructiveThoughts`)

- **Source File:** [`data/classes/classOptions/psion/disciplines/destructiveThoughts.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/psion/disciplines/destructiveThoughts.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`
- **Tags:** `psionicDiscipline`

#### Baseline Prose

> **Destructive Thoughts.** _Trigger:_ when you cast a Psion spell of the Conjuration or Evocation school that forces a saving throw. _Response:_ You deal 1d1d8+3 Psychic damage.

---

### Devilish Tongue (`devilishTongue`)

- **Source File:** [`data/classes/classOptions/psion/disciplines/devilishTongue.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/psion/disciplines/devilishTongue.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`
- **Tags:** `psionicDiscipline`

#### Baseline Prose

> **Devilish Tongue.** _Trigger:_ when you take the Influence action. _Response:_ You add 1d1d8 to its next ability check.

---

### Expanded Awareness (`expandedAwareness`)

- **Source File:** [`data/classes/classOptions/psion/disciplines/expandedAwareness.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/psion/disciplines/expandedAwareness.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`
- **Tags:** `psionicDiscipline`

#### Baseline Prose

> **Expanded Awareness.** _Trigger:_ when you take the Search action. _Response:_ You add 1d1d8 to its next ability check.

---

### Id Insinuation (`idInsinuation`)

- **Source File:** [`data/classes/classOptions/psion/disciplines/idInsinuation.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/psion/disciplines/idInsinuation.yml)
- **Time:** `free action` | **Range:** `Varies` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`
- **Tags:** `psionicDiscipline`

#### Baseline Prose

> **Id Insinuation.** _Trigger:_ when you cast a Psion spell of the Enchantment or Illusion school that forces a saving throw. _Response:_ One creature within Varies subtracts half the number rolled on 1d1d8 (rounded up) from its saving throw against the spell.

---

### Inerrant Aim (`inerrantAim`)

- **Source File:** [`data/classes/classOptions/psion/disciplines/inerrantAim.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/psion/disciplines/inerrantAim.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`
- **Tags:** `psionicDiscipline`

#### Baseline Prose

> **Inerrant Aim.** _Trigger:_ When you miss with an attack. _Response:_ You add 1d1d8 to its next attack roll.

---

### Observant Mind (`observantMind`)

- **Source File:** [`data/classes/classOptions/psion/disciplines/observantMind.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/psion/disciplines/observantMind.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`
- **Tags:** `psionicDiscipline`

#### Baseline Prose

> **Observant Mind.** _Trigger:_ when you take the Study action. _Response:_ You add 1d1d8 to its next ability check.

---

### Psionic Backlash (`psionicBacklash`)

- **Source File:** [`data/classes/classOptions/psion/disciplines/psionicBacklash.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/psion/disciplines/psionicBacklash.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`
- **Tags:** `psionicDiscipline`

#### Baseline Prose

> **Psionic Backlash.** _Trigger:_ immediately after a creature you can see hits you with an attack roll. _Response:_ You reduce incoming attack damage by 2d1d8 + 3 (minimum 2). _Wisdom Saving Throw:_ DC 15, the attacker. _Failure:_ Psychic damage equal to the amount of damage reduced.

---

### Psionic Guards (`psionicGuards`)

- **Source File:** [`data/classes/classOptions/psion/disciplines/psionicGuards.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/psion/disciplines/psionicGuards.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `1 round`
- **Resource:** `psionicEnergyDice`
- **Tags:** `psionicDiscipline`

#### Baseline Prose

> **Psionic Guards.** _Trigger:_ at the start of your turn. _Response:_ You have the Charmed and Frightened condition (until the start of your next turn), and gain Advantage on Intelligence saving throws until the start of your next turn. _Duration:_ 1 round.

---

### Sharpened Mind (`sharpenedMind`)

- **Source File:** [`data/classes/classOptions/psion/disciplines/sharpenedMind.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/psion/disciplines/sharpenedMind.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `psionicEnergyDice`
- **Tags:** `psionicDiscipline`

#### Baseline Prose

> **Sharpened Mind.** _Trigger:_ at the start of your turn. _Response:_ You roll 1d1d8 and record it: damage from your weapon attacks, Psion spells, and Psion features ignores Resistance to Psychic damage, and once per turn when dealing Psychic damage, you can replace one damage die with the recorded number. _Duration:_ 1 minute.

---

### Careful Spell (`carefulSpellActivity`)

- **Source File:** [`data/classes/classOptions/sorcerer/metamagic/carefulSpell.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/metamagic/carefulSpell.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `1 sorceryPoints`

#### Baseline Prose

> **Careful Spell.** _Trigger:_ When you cast a spell. _Response:_ You automatically succeed on saving throw against your spell and take no damage.

---

### Distant Spell (`distantSpellActivity`)

- **Source File:** [`data/classes/classOptions/sorcerer/metamagic/distantSpell.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/metamagic/distantSpell.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `1 sorceryPoints`

#### Baseline Prose

> **Distant Spell.** _Trigger:_ When you cast a spell. _Response:_ You double the range of a spell (or make a Touch spell's range 30 feet).

---

### Empowered Spell (`empoweredSpellActivity`)

- **Source File:** [`data/classes/classOptions/sorcerer/metamagic/empoweredSpell.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/metamagic/empoweredSpell.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `1 sorceryPoints`

#### Baseline Prose

> **Empowered Spell.** _Trigger:_ When you roll damage. _Response:_ You reroll up to 1 damage dice for a spell.

---

### Extended Spell (`extendedSpellActivity`)

- **Source File:** [`data/classes/classOptions/sorcerer/metamagic/extendedSpell.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/metamagic/extendedSpell.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `1 sorceryPoints`

#### Baseline Prose

> **Extended Spell.** _Trigger:_ When you cast a spell. _Response:_ You double the duration of a spell (max 24 hours), and gain Advantage on Concentration saves.

---

### Heightened Spell (`heightenedSpellActivity`)

- **Source File:** [`data/classes/classOptions/sorcerer/metamagic/heightenedSpell.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/metamagic/heightenedSpell.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `2 sorceryPoints`

#### Baseline Prose

> **Heightened Spell.** _Trigger:_ When you cast a spell. _Response:_ The target has Disadvantage on its next saving throw.

---

### Quickened Spell (`quickenedSpellActivity`)

- **Source File:** [`data/classes/classOptions/sorcerer/metamagic/quickenedSpell.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/metamagic/quickenedSpell.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `2 sorceryPoints`

#### Baseline Prose

> **Quickened Spell.** _Trigger:_ When you cast a spell. _Response:_ You change the casting time of an action spell to a Bonus Action.

---

### Seeking Spell (`seekingSpellActivity`)

- **Source File:** [`data/classes/classOptions/sorcerer/metamagic/seekingSpell.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/metamagic/seekingSpell.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `1 sorceryPoints`

#### Baseline Prose

> **Seeking Spell.** _Trigger:_ When you miss with an attack. _Response:_ You reroll the attack roll.

---

### Subtle Spell (`subtleSpellActivity`)

- **Source File:** [`data/classes/classOptions/sorcerer/metamagic/subtleSpell.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/metamagic/subtleSpell.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `1 sorceryPoints`

#### Baseline Prose

> **Subtle Spell.** _Trigger:_ When you cast a spell. _Response:_ You cast a spell without Verbal, Somatic, or non-costly Material components.

---

### Transmuted Spell (`transmutedSpellActivity`)

- **Source File:** [`data/classes/classOptions/sorcerer/metamagic/transmutedSpell.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/metamagic/transmutedSpell.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `1 sorceryPoints`

#### Baseline Prose

> **Transmuted Spell.** _Trigger:_ When you cast a spell. _Response:_ You change elemental damage type of a spell (Acid, Cold, Fire, Lightning, Poison, or Thunder).

---

### Twinned Spell (`twinnedSpellActivity`)

- **Source File:** [`data/classes/classOptions/sorcerer/metamagic/twinnedSpell.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/metamagic/twinnedSpell.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `1 sorceryPoints`

#### Baseline Prose

> **Twinned Spell.** _Trigger:_ When you cast a spell. _Response:_ You increase the spell's effective level by 1 to affect an additional creature.

---

### Eldritch Smite (`eldritchSmiteActivity`)

- **Source File:** [`data/classes/classOptions/warlock/invocations/eldritchSmite.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/warlock/invocations/eldritchSmite.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `pactMagicSpellSlot`

#### Baseline Prose

> **Eldritch Smite.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 5d8 Force damage, and the target is Prone.

---

### Gaze of Two Minds (`gazeOfTwoMinds`)

- **Source File:** [`data/classes/classOptions/warlock/invocations/gazeOfTwoMinds.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/warlock/invocations/gazeOfTwoMinds.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 turn`
- **Tags:** `eldritchInvocation`

#### Baseline Prose

> **Gaze of Two Minds.** One willing creature you touch perceive through the target's senses until the end of your next turn. _Duration:_ 1 turn.

---

### Command Familiar (`commandFamiliar`)

- **Source File:** [`data/classes/classOptions/warlock/invocations/investmentOfTheChainMaster.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/warlock/invocations/investmentOfTheChainMaster.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Command Familiar.** Command your familiar to take the Attack action. _Range:_ 60 feet.

---

### Familiar Resistance (`familiarResistance`)

- **Source File:** [`data/classes/classOptions/warlock/invocations/investmentOfTheChainMaster.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/warlock/invocations/investmentOfTheChainMaster.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Familiar Resistance.** _Trigger:_ when the familiar takes damage. _Response:_ You grant it Resistance against that damage.

---

## Class Features (cleric)

### Divine Spark (`divineSpark`)

- **Source File:** [`data/classes/cleric.yml`](file:///home/gerardo/Projects/card-builder/data/classes/cleric.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Divine Spark.** Choose one of the following:
> 
> > **Heal**: One creature within 30 feet regains 2d8+2 Hit Points.
> 
> > **Damage**: _Constitution Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ 2d8+2 Necrotic or Radiant damage. _Success:_ Half damage.

---

### Turn Undead (`turnUndead`)

- **Source File:** [`data/classes/cleric.yml`](file:///home/gerardo/Projects/card-builder/data/classes/cleric.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `1 minute`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Turn Undead.** _Wisdom Saving Throw:_ DC 15, each undead in a 30-foot-radius Emanation centered on you. _Failure:_ Each target has the Frightened condition (ends if the target takes damage) and has the Incapacitated condition (ends if the target takes damage). _Duration:_ 1 minute.

#### Individual Feature Modifications (1)

* **+ Sear Undead** *(from [`data/classes/cleric.yml`](file:///home/gerardo/Projects/card-builder/data/classes/cleric.yml))*
  > **Turn Undead.** _Wisdom Saving Throw:_ DC 15, each undead in a 30-foot-radius Emanation centered on you. _Failure:_ 2d8 Radiant damage, and each target has the Frightened condition (ends if the target takes damage) and has the Incapacitated condition (ends if the target takes damage). _Duration:_ 1 minute.

#### Realistic Combined Class Stacks (1)

* **Stack: CLERIC + [Sear Undead]**
  > **Turn Undead.** _Wisdom Saving Throw:_ DC 15, each undead in a 30-foot-radius Emanation centered on you. _Failure:_ 2d8 Radiant damage, and each target has the Frightened condition (ends if the target takes damage) and has the Incapacitated condition (ends if the target takes damage). _Duration:_ 1 minute.

---

## Class Features (druid)

### Wild Shape (`wildShapeActivity`)

- **Source File:** [`data/classes/druid.yml`](file:///home/gerardo/Projects/card-builder/data/classes/druid.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `$(meta.level / 2) hours`
- **Resource:** `wildShape`

#### Baseline Prose

> **Wild Shape.** You gain 16 Temporary Hit Points, transform into a Beast form whose stat block replaces your physical stats, and retain your personality, memories, and ability to speak, but you can't cast spells. _Duration:_ 4 hours.

---

## Class Features (fighter)

### Second Wind (`secondWind`)

- **Source File:** [`data/classes/fighter.yml`](file:///home/gerardo/Projects/card-builder/data/classes/fighter.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `secondWind`

#### Baseline Prose

> **Second Wind.** You regain 1d10+8 Hit Points.

#### Individual Feature Modifications (3)

* **+ Fighter** *(from [`data/classes/fighter.yml`](file:///home/gerardo/Projects/card-builder/data/classes/fighter.yml))*
  > **Second Wind.** You regain 1d10+8 Hit Points. You move up to 15 feet without provoking Opportunity Attacks.

* **+ Group Recovery** *(from [`data/classes/subclasses/fighter/banneret.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/fighter/banneret.yml))*
  > **Second Wind.** You regain 1d10+8 Hit Points. Up to 1 allies within 30 feet regains 1d4+8 Hit Points.

* **+ Team Tactics** *(from [`data/classes/subclasses/fighter/banneret.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/fighter/banneret.yml))*
  > **Second Wind.** You regain 1d10+8 Hit Points. Each chosen ally has Advantage on D20 Tests until the start of your next turn.

#### Realistic Combined Class Stacks (1)

* **Stack: FIGHTER + [Fighter, Group Recovery, Team Tactics]**
  > **Second Wind.** You regain 1d10+8 Hit Points. You move up to 15 feet without provoking Opportunity Attacks. Up to 1 allies within 30 feet regains 1d4+8 Hit Points. Each chosen ally has Advantage on D20 Tests until the start of your next turn.

---

### Action Surge (`actionSurge`)

- **Source File:** [`data/classes/fighter.yml`](file:///home/gerardo/Projects/card-builder/data/classes/fighter.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `actionSurge`

#### Baseline Prose

> **Action Surge.** You take one additional action, except the Magic action.

---

### Tactical Mind (`tacticalMind`)

- **Source File:** [`data/classes/fighter.yml`](file:///home/gerardo/Projects/card-builder/data/classes/fighter.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `secondWind`

#### Baseline Prose

> **Tactical Mind.** You add 1d10 to its next ability check (does not expend resource on failure).

---

## Class Features (monk)

### Bonus Unarmed Strike (`bonusUnarmedStrike`)

- **Source File:** [`data/classes/monk.yml`](file:///home/gerardo/Projects/card-builder/data/classes/monk.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Bonus Unarmed Strike.** You make one Unarmed Strike.

---

### Flurry of Blows (`flurryOfBlows`)

- **Source File:** [`data/classes/monk.yml`](file:///home/gerardo/Projects/card-builder/data/classes/monk.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `1 focusPoints`

#### Baseline Prose

> **Flurry of Blows.** You make two Unarmed Strikes.

---

### Patient Defense (`patientDefense`)

- **Source File:** [`data/classes/monk.yml`](file:///home/gerardo/Projects/card-builder/data/classes/monk.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `1 focusPoints`

#### Baseline Prose

> **Patient Defense.** You take both the Disengage and Dodge actions.

---

### Step of the Wind (`stepOfTheWind`)

- **Source File:** [`data/classes/monk.yml`](file:///home/gerardo/Projects/card-builder/data/classes/monk.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `1 focusPoints`

#### Baseline Prose

> **Step of the Wind.** You take both the Disengage and Dash actions, and your jump distance is doubled for the turn.

---

### Deflect Attacks (`deflectAttacks`)

- **Source File:** [`data/classes/monk.yml`](file:///home/gerardo/Projects/card-builder/data/classes/monk.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Deflect Attacks.** _Trigger:_ When you are hit by an attack. _Response:_ You reduce the damage by 1d10+10.

---

### Redirect Attacks (`redirectAttacks`)

- **Source File:** [`data/classes/monk.yml`](file:///home/gerardo/Projects/card-builder/data/classes/monk.yml)
- **Time:** `N/A` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `1 focusPoints`

#### Baseline Prose

> **Redirect Attacks.** _Trigger:_ If you reduce the damage to 0 with Deflect Attacks. _Response:_ _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ 2d8+2 Same type damage. _Success:_ Half damage.

---

### Slow Fall (`slowFall`)

- **Source File:** [`data/classes/monk.yml`](file:///home/gerardo/Projects/card-builder/data/classes/monk.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Slow Fall.** _Trigger:_ When you fall. _Response:_ You reduce any fall damage you take by 40.

---

### Stunning Strike (`stunningStrike`)

- **Source File:** [`data/classes/monk.yml`](file:///home/gerardo/Projects/card-builder/data/classes/monk.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `1 focusPoints`

#### Baseline Prose

> **Stunning Strike.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target has the Stunned condition (until the start of your next turn). _Success:_ Attack rolls against the target have Advantage, and the target's Speed is halved until the start of your next turn.

---

## Class Features (paladin)

### Lay On Hands (`layOnHands`)

- **Source File:** [`data/classes/paladin.yml`](file:///home/gerardo/Projects/card-builder/data/classes/paladin.yml)
- **Time:** `bonus action` | **Range:** `touch` | **Duration:** `Instantaneous`
- **Resource:** `layOnHands`

#### Baseline Prose

> **Lay On Hands.** One creature you touch regains 5 Hit Points. Per charge expended.

---

### Divine Sense (`divineSense`)

- **Source File:** [`data/classes/paladin.yml`](file:///home/gerardo/Projects/card-builder/data/classes/paladin.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `10 minutes`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Divine Sense.** You detect the location of any Celestial, Fiend, or Undead and any consecrated or desecrated object within 60 feet. _Duration:_ 10 minutes.

---

### Aura of Protection (`auraOfProtection`)

- **Source File:** [`data/classes/paladin.yml`](file:///home/gerardo/Projects/card-builder/data/classes/paladin.yml)
- **Time:** `free action` | **Range:** `$(meta.level >= 18 ? 30 : 10) feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Aura of Protection.** A 10-foot-radius Emanation of protective aura appears centered on you. _Trigger:_ while in the aura. _Response:_ The target gains a +1 bonus to Saves.

#### Individual Feature Modifications (5)

* **+ Aura of Devotion** *(from [`data/classes/subclasses/paladin/oathOfDevotion.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathOfDevotion.yml))*
  > **Aura of Protection.** A 10-foot-radius Emanation of protective aura appears centered on you. _Trigger:_ while in the aura. _Response:_ The target has Immunity to the Charmed condition and gains a +1 bonus to Saves.

* **+ Aura of Elemental Shielding** *(from [`data/classes/subclasses/paladin/oathOfGenies.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathOfGenies.yml))*
  > **Aura of Protection.** A 10-foot-radius Emanation of protective aura appears centered on you. _Trigger:_ while in the aura. _Response:_ The target gains a +1 bonus to Saves, and has Resistance to one damage type of your choice (Acid, Cold, Fire, Lightning, or Thunder); you can change the type at the start of each of your turns.

* **+ Aura of Alacrity** *(from [`data/classes/subclasses/paladin/oathOfGlory.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathOfGlory.yml))*
  > **Aura of Protection.** A 10-foot-radius Emanation of protective aura appears centered on you. _Trigger:_ while in the aura. _Response:_ The target gains a +1 bonus to Saves, and gains +10 Speed until the end of their next turn (when entering the aura or starting their turn there).

* **+ Aura of Warding** *(from [`data/classes/subclasses/paladin/oathOfTheAncients.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathOfTheAncients.yml))*
  > **Aura of Protection.** A 10-foot-radius Emanation of protective aura appears centered on you. _Trigger:_ while in the aura. _Response:_ The target has Resistance to Necrotic, Psychic, and Radiant damage and gains a +1 bonus to Saves.

* **+ Aura of Hate** *(from [`data/classes/subclasses/paladin/oathbreaker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathbreaker.yml))*
  > **Aura of Protection.** A 10-foot-radius Emanation of protective aura appears centered on you. _Trigger:_ while in the aura. _Response:_ The target gains a +1 bonus to Saves, and deals an extra 0 Necrotic damage on melee attack hits (you and friendly Fiends and Undead in the aura).

#### Realistic Combined Class Stacks (5)

* **Stack: PALADIN (oathOfDevotion) + [Aura of Devotion]**
  > **Aura of Protection.** A 10-foot-radius Emanation of protective aura appears centered on you. _Trigger:_ while in the aura. _Response:_ The target has Immunity to the Charmed condition and gains a +1 bonus to Saves.

* **Stack: PALADIN (oathOfGenies) + [Aura of Elemental Shielding]**
  > **Aura of Protection.** A 10-foot-radius Emanation of protective aura appears centered on you. _Trigger:_ while in the aura. _Response:_ The target gains a +1 bonus to Saves, and has Resistance to one damage type of your choice (Acid, Cold, Fire, Lightning, or Thunder); you can change the type at the start of each of your turns.

* **Stack: PALADIN (oathOfGlory) + [Aura of Alacrity]**
  > **Aura of Protection.** A 10-foot-radius Emanation of protective aura appears centered on you. _Trigger:_ while in the aura. _Response:_ The target gains a +1 bonus to Saves, and gains +10 Speed until the end of their next turn (when entering the aura or starting their turn there).

* **Stack: PALADIN (oathOfTheAncients) + [Aura of Warding]**
  > **Aura of Protection.** A 10-foot-radius Emanation of protective aura appears centered on you. _Trigger:_ while in the aura. _Response:_ The target has Resistance to Necrotic, Psychic, and Radiant damage and gains a +1 bonus to Saves.

* **Stack: PALADIN (oathbreaker) + [Aura of Hate]**
  > **Aura of Protection.** A 10-foot-radius Emanation of protective aura appears centered on you. _Trigger:_ while in the aura. _Response:_ The target gains a +1 bonus to Saves, and deals an extra 0 Necrotic damage on melee attack hits (you and friendly Fiends and Undead in the aura).

---

## Class Features (psion)

### Telekinetic Propel (`telekineticPropel`)

- **Source File:** [`data/classes/psion.yml`](file:///home/gerardo/Projects/card-builder/data/classes/psion.yml)
- **Time:** `bonus action` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Telekinetic Propel.** _Strength Saving Throw:_ DC 15, one large or smaller creature other than you within 30 feet. _Failure:_ The target is pushed up to 5d1d8 feet away.

#### Individual Feature Modifications (4)

* **+ Psi Warper** *(from [`data/classes/subclasses/psion/psiWarper.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/psiWarper.yml))*
  > **Telekinetic Propel.** _Strength Saving Throw:_ DC 15, one large or smaller creature other than you within 30 feet. _Failure:_ The target is pushed up to 5d1d8 feet away, and instead of pushing it, you can teleport it to an unoccupied horizontal space you can see within 30 feet of you.

* **+ Psykinetic** *(from [`data/classes/subclasses/psion/psykinetic.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/psykinetic.yml))*
  > **Telekinetic Propel.** _Strength Saving Throw:_ DC 15, one large or smaller creature other than you within 30 feet. _Failure:_ The target is pushed up to 5d1d8 feet away, and choose one of the following:
  > 
  > > **Boost**: the target's Speed increases by 10 feet until the start of your next turn
  > 
  > > **Disorient**: the target cannot make Opportunity Attacks until the start of its next turn
  > 
  > > **Telekinetic Bolt**: the target takes 1d1d8 Force damage.

* **+ Seer** *(from [`data/classes/subclasses/psion/seer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/seer.yml))*
  > **Telekinetic Propel.** _Strength Saving Throw:_ DC 15, one large or smaller creature other than you within 30 feet. _Failure:_ The target is pushed up to 5d1d8 feet away. A willing target can use its Reaction to move up to half its Speed without provoking Opportunity Attacks and gains 1d1d8 to its AC until the start of your next turn.

* **+ Shaper** *(from [`data/classes/subclasses/psion/shaper.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/shaper.yml))*
  > **Telekinetic Propel.** _Strength Saving Throw:_ DC 15, one large or smaller creature other than you within 30 feet. _Failure:_ The target is pushed up to 5d1d8 feet away. When targeting a creature summoned by your Psion spells, you do not need to expend a Psionic Energy Die, and you can move the target up to 15 feet or swap it for another summon.

#### Realistic Combined Class Stacks (4)

* **Stack: PSION (psiWarper) + [Psi Warper]**
  > **Telekinetic Propel.** _Strength Saving Throw:_ DC 15, one large or smaller creature other than you within 30 feet. _Failure:_ The target is pushed up to 5d1d8 feet away, and instead of pushing it, you can teleport it to an unoccupied horizontal space you can see within 30 feet of you.

* **Stack: PSION (psykinetic) + [Psykinetic]**
  > **Telekinetic Propel.** _Strength Saving Throw:_ DC 15, one large or smaller creature other than you within 30 feet. _Failure:_ The target is pushed up to 5d1d8 feet away, and choose one of the following:
  > 
  > > **Boost**: the target's Speed increases by 10 feet until the start of your next turn
  > 
  > > **Disorient**: the target cannot make Opportunity Attacks until the start of its next turn
  > 
  > > **Telekinetic Bolt**: the target takes 1d1d8 Force damage.

* **Stack: PSION (seer) + [Seer]**
  > **Telekinetic Propel.** _Strength Saving Throw:_ DC 15, one large or smaller creature other than you within 30 feet. _Failure:_ The target is pushed up to 5d1d8 feet away. A willing target can use its Reaction to move up to half its Speed without provoking Opportunity Attacks and gains 1d1d8 to its AC until the start of your next turn.

* **Stack: PSION (shaper) + [Shaper]**
  > **Telekinetic Propel.** _Strength Saving Throw:_ DC 15, one large or smaller creature other than you within 30 feet. _Failure:_ The target is pushed up to 5d1d8 feet away. When targeting a creature summoned by your Psion spells, you do not need to expend a Psionic Energy Die, and you can move the target up to 15 feet or swap it for another summon.

---

## Class Features (rogue)

### Sneak Attack (`sneakAttack`)

- **Source File:** [`data/classes/rogue.yml`](file:///home/gerardo/Projects/card-builder/data/classes/rogue.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Sneak Attack.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 4d6d6 extra damage.

#### Individual Feature Modifications (1)

* **+ Surprising Strike Damage** *(from [`data/classes/subclasses/rogue/assassin.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/rogue/assassin.yml))*
  > **Sneak Attack.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 4d6d6 extra damage, and 8 extra damage during the first round of combat.

#### Realistic Combined Class Stacks (1)

* **Stack: ROGUE (assassin) + [Surprising Strike Damage]**
  > **Sneak Attack.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 4d6d6 extra damage, and 8 extra damage during the first round of combat.

---

### Cunning Action (`cunningAction`)

- **Source File:** [`data/classes/rogue.yml`](file:///home/gerardo/Projects/card-builder/data/classes/rogue.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Cunning Action.** You take the Dash, Disengage, or Hide action.

---

### Steady Aim (`steadyAim`)

- **Source File:** [`data/classes/rogue.yml`](file:///home/gerardo/Projects/card-builder/data/classes/rogue.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Steady Aim.** You gain Advantage on your next attack roll on the current turn (only if you haven't moved this turn; your Speed becomes 0 until the end of the current turn).

---

### Cunning Strike (`cunningStrike`)

- **Source File:** [`data/classes/rogue.yml`](file:///home/gerardo/Projects/card-builder/data/classes/rogue.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Cunning Strike.** When you deal Sneak Attack damage to a creature, you can choose to spend dice from the Sneak Attack to create one of the following effects:
> 
> 

#### Individual Feature Modifications (1)

* **+ Rogue** *(from [`data/classes/rogue.yml`](file:///home/gerardo/Projects/card-builder/data/classes/rogue.yml))*
  > **Cunning Strike.** When you deal Sneak Attack damage to a creature, you can choose to spend dice from the Sneak Attack to create one of the following effects:
  > 
  > > **Poison (Cost: 1d6)**: _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target has the Poisoned condition (repeats save at end of each turn).
  > 
  > > **Trip (Cost: 1d6)**: _Dexterity Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.
  > 
  > > **Withdraw (Cost: 1d6)**: You move up to 15 feet without provoking Opportunity Attacks.

#### Realistic Combined Class Stacks (1)

* **Stack: ROGUE + [Rogue]**
  > **Cunning Strike.** When you deal Sneak Attack damage to a creature, you can choose to spend dice from the Sneak Attack to create one of the following effects:
  > 
  > > **Poison (Cost: 1d6)**: _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target has the Poisoned condition (repeats save at end of each turn).
  > 
  > > **Trip (Cost: 1d6)**: _Dexterity Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.
  > 
  > > **Withdraw (Cost: 1d6)**: You move up to 15 feet without provoking Opportunity Attacks.

---

### Uncanny Dodge (`uncannyDodge`)

- **Source File:** [`data/classes/rogue.yml`](file:///home/gerardo/Projects/card-builder/data/classes/rogue.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Uncanny Dodge.** _Trigger:_ When you are hit by an attack. _Response:_ You halve the attack's damage against you (round down).

---

## Class Features (sorcerer)

### Innate Sorcery (`innateSorcery`)

- **Source File:** [`data/classes/sorcerer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/sorcerer.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `innateSorcery`

#### Baseline Prose

> **Innate Sorcery.** You gain a plus 1 bonus to your spell save DC, you have Advantage on the attack rolls of Sorcerer spells you cast, and you can use up to two Metamagic options on each spell you cast. _Duration:_ 1 minute.

---

## Subclass Features (artificer)

### Experimental Elixir (`experimentalElixir`)

- **Source File:** [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `experimentalElixirResource`

#### Baseline Prose

> **Experimental Elixir.** When you finish a Long Rest, roll 1d6 to determine the effect:
> 
> > **1. Healing**: You regain 2d8+3 Hit Points.
> 
> > **2. Swiftness**: The target gains a +10 bonus to Speed feet.
> 
> > **3. Resilience**: The target gains a +1 bonus to AC.
> 
> > **4. Boldness**: Drinker rolls 1d4 and adds it to attack rolls and saving throws.
> 
> > **5. Flight**: Drinker gains a Fly Speed of 10 feet.
> 
> > **6. Choice**: You choose any effect.

---

### Flamethrower (`eldritchCannonFlamethrower`)

- **Source File:** [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Flamethrower.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on you. _Failure:_ 2d8 Fire damage. _Success:_ Half damage.

---

### Force Ballista (`eldritchCannonForceBallista`)

- **Source File:** [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml)
- **Time:** `bonus action` | **Range:** `120 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Force Ballista.** _Ranged Attack Roll:_ +6, range 120 feet. _Hit:_ 2d8 Force damage, and the target is pushed up to 5 feet away.

---

### Protector (`eldritchCannonProtector`)

- **Source File:** [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml)
- **Time:** `bonus action` | **Range:** `10 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Protector.** Creatures of your choice within 10 feet gain 1d8+3 Temporary Hit Points.

---

### Command Steel Defender (`commandSteelDefender`)

- **Source File:** [`data/classes/subclasses/artificer/battleSmith.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/battleSmith.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Command Steel Defender.** Command your Steel Defender to take an action in its stat block (it otherwise only Dodges). _Range:_ 60 feet.

---

### Adventurer's Atlas (`adventurersAtlas`)

- **Source File:** [`data/classes/subclasses/artificer/cartographer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/cartographer.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Adventurer's Atlas.** _Trigger:_ Whenever you finish a Long Rest. _Response:_ The target adds 1d4 to its next initiative, and knows the location of all other map holders on the same plane and can the target them with spells regardless of sight or cover within range.

---

### Portal Jump (`portalJump`)

- **Source File:** [`data/classes/subclasses/artificer/cartographer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/cartographer.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Portal Jump.** You spend 15 feet of movement to teleport to an unoccupied space within 10 feet or within 5 feet of an Adventurer's Atlas map holder within 30 feet.

---

### Jolt to Life (`joltToLife`)

- **Source File:** [`data/classes/subclasses/artificer/reanimator.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/reanimator.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `joltToLifeResource`

#### Baseline Prose

> **Jolt to Life.** You revive a target using Spare the Dying. The target regains 8 Hit Points. _Dexterity Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on the target. _Failure:_ 2d4 Lightning damage. _Success:_ Half damage.

---

### Command Reanimated Companion (`commandReanimatedCompanion`)

- **Source File:** [`data/classes/subclasses/artificer/reanimator.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/reanimator.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Command Reanimated Companion.** Command your Reanimated Companion to take an action in its stat block (it otherwise only Dodges). _Range:_ 60 feet.

---

## Subclass Features (barbarian)

### Spiritual Protectors (`spiritualProtectors`)

- **Source File:** [`data/classes/subclasses/barbarian/ancestralGuardian.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/ancestralGuardian.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Spiritual Protectors.** _Trigger:_ while Raging, when you hit a creature with a weapon or Unarmed Strike. _Response:_ Choose one of the following:
> 
> > **Distract**: The target has Disadvantage on attack rolls against targets other than you until the start of your next turn.
> 
> > **Protect**: The next creature it hits (other than you) has Resistance to that attack's damage until the end of the target's next turn.
> 
> > **Strike**: The target takes 1d6 Acid, Cold, Fire, Force, Lightning, or Thunder damage.

---

### Spirit Shield (`spiritShield`)

- **Source File:** [`data/classes/subclasses/barbarian/ancestralGuardian.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/ancestralGuardian.yml)
- **Time:** `reaction` | **Range:** `30 feet` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Spirit Shield.** _Trigger:_ while Raging, when a creature takes damage. _Response:_ One creature within 30 feet reduces the damage taken by 2d6.

---

### Banshee's Wail (`bansheesWail`)

- **Source File:** [`data/classes/subclasses/barbarian/lament.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/lament.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `rage`

#### Baseline Prose

> **Banshee's Wail.** _Constitution Saving Throw:_ DC 14, each creature in a 30-foot-radius Emanation centered on you. _Failure:_ 2d12 Psychic damage, and each target has the Deafened condition (1 minute). _Success:_ Half damage.

---

### Horrifying Strike (`horrifyingStrike`)

- **Source File:** [`data/classes/subclasses/barbarian/lament.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/lament.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Horrifying Strike.** _Trigger:_ once per turn when you hit a creature with a Strength-based attack roll while Raging. _Response:_ _Wisdom Saving Throw:_ DC 14, the target. _Failure:_ The target has the Frightened condition until the end of your next turn.

---

### Rage of the Wilds (`rageOfTheWilds`)

- **Source File:** [`data/classes/subclasses/barbarian/wildHeart.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/wildHeart.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Rage of the Wilds.** _Trigger:_ When you activate your Rage. _Response:_ Choose one of the following:
> 
> > **Bear**: You gain Resistance to every damage type except Force, Necrotic, Psychic, and Radiant while Raging.
> 
> > **Eagle**: You take the Disengage and Dash actions as part of this Bonus Action; while Raging, you can take a Bonus Action to take both actions again.
> 
> > **Wolf**: While Raging, your allies have Advantage on attack rolls against any enemy of yours within 5 feet of you.

---

### Life-Giving Force (`lifeGivingForce`)

- **Source File:** [`data/classes/subclasses/barbarian/worldTree.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/worldTree.yml)
- **Time:** `free action` | **Range:** `10 feet` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Life-Giving Force.** _Trigger:_ at the start of each of your turns while Raging. _Response:_ One creature within 10 feet gains 2d6 Temporary Hit Points.

---

### Branches of the Tree (`branchesOfTheTree`)

- **Source File:** [`data/classes/subclasses/barbarian/worldTree.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/worldTree.yml)
- **Time:** `reaction` | **Range:** `30 feet` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Branches of the Tree.** _Trigger:_ while Raging, when a creature within starts its turn. _Response:_ _Strength Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ The target is teleported up to 30 feet to an unoccupied space within 5 feet of you, and you can reduce its Speed to 0 until the end of its turn.

---

### Warrior of the Gods (`warriorOfTheGods`)

- **Source File:** [`data/classes/subclasses/barbarian/zealot.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/barbarian/zealot.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `warriorOfTheGods`

#### Baseline Prose

> **Warrior of the Gods.** You regain 1d12 Hit Points. Per charge expended.

---

## Subclass Features (bard)

### Inspiring Movement (`inspiringMovement`)

- **Source File:** [`data/classes/subclasses/bard/dance.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/dance.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `bardicInspiration`

#### Baseline Prose

> **Inspiring Movement.** _Trigger:_ When an enemy ends its turn within 5 feet of you. _Response:_ You move up to 15 feet without provoking Opportunity Attacks, and one ally within 30 feet can also move up to half their Speed using their Reaction.

#### Individual Feature Modifications (1)

* **+ Agile Strikes** *(from [`data/classes/subclasses/bard/dance.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/dance.yml))*
  > **Inspiring Movement.** _Trigger:_ When an enemy ends its turn within 5 feet of you. _Response:_ You move up to 15 feet without provoking Opportunity Attacks, one ally within 30 feet can also move up to half their Speed using their Reaction, and make one Unarmed Strike as part of this action.

#### Realistic Combined Class Stacks (1)

* **Stack: BARD (dance) + [Agile Strikes]**
  > **Inspiring Movement.** _Trigger:_ When an enemy ends its turn within 5 feet of you. _Response:_ You move up to 15 feet without provoking Opportunity Attacks, one ally within 30 feet can also move up to half their Speed using their Reaction, and make one Unarmed Strike as part of this action.

---

### Tandem Footwork (`tandemFootwork`)

- **Source File:** [`data/classes/subclasses/bard/dance.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/dance.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `bardicInspiration`

#### Baseline Prose

> **Tandem Footwork.** _Trigger:_ When you roll Initiative. _Response:_ Up to 1 allies within 30 feet add 1d8 to Initiative.

---

### Beguiling Magic (`beguilingMagic`)

- **Source File:** [`data/classes/subclasses/bard/glamour.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/glamour.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `bardicInspiration`

#### Baseline Prose

> **Beguiling Magic.** _Trigger:_ After casting an Enchantment or Illusion spell using a spell slot. _Response:_ _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ The target has the Charmed and Frightened condition. _Duration:_ 1 minute.

---

### Mantle of Inspiration (`mantleOfInspiration`)

- **Source File:** [`data/classes/subclasses/bard/glamour.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/glamour.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `bardicInspiration`

#### Baseline Prose

> **Mantle of Inspiration.** Up to 1 creature within 60 feet gains 16 Temporary Hit Points. Each target can use its Reaction to move up to its Speed without provoking Opportunity Attacks.

---

### Mantle of Majesty (`mantleOfMajesty`)

- **Source File:** [`data/classes/subclasses/bard/glamour.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/glamour.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Concentration, up to 1 minute`
- **Resource:** `limited`

#### Baseline Prose

> **Mantle of Majesty.** You cast Command without expending a spell slot, while active, cast Command as a Bonus Action without expending a spell slot, and any creature Charmed by you automatically fails its save against this Command. _Concentration:_ Up to 1 minute.

---

### Cutting Words (`cuttingWords`)

- **Source File:** [`data/classes/subclasses/bard/lore.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/lore.yml)
- **Time:** `reaction` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `bardicInspiration`

#### Baseline Prose

> **Cutting Words.** _Trigger:_ When a creature you can see within 60 feet makes a damage roll, ability check, or attack roll. _Response:_ The target subtract 1d8 from the roll. _Range:_ 60 feet.

---

### Lunar Vitality (`lunarVitality`)

- **Source File:** [`data/classes/subclasses/bard/moon.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/moon.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `bardicInspiration`

#### Baseline Prose

> **Lunar Vitality.** _Trigger:_ Once per turn when you restore Hit Points to a creature with a spell. _Response:_ The target regains 1d8 Hit Points. The target gains a +10 bonus to Speed feet.

---

### Blessing of Moonlight (`blessingOfMoonlight`)

- **Source File:** [`data/classes/subclasses/bard/moon.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/moon.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `limited`

#### Baseline Prose

> **Blessing of Moonlight.** You cast Moonbeam and glow faintly shedding Dim Light in a 5-foot radius. _Trigger:_ whenever a creature fails its saving throw against this Moonbeam. _Response:_ One creature within 60 feet regains 2d4 Hit Points. _Concentration:_ Up to 1 minute.

---

### Spirit Channeling (`spiritChanneling`)

- **Source File:** [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `bardicInspiration`

#### Baseline Prose

> **Spirit Channeling.** Choose a spirit option to channel. You can unleash it as a Magic Action:
> 
> > **Beloved**: One creature within 30 feet regains 1d8 Hit Points.
> 
> > **Sharpshooter**: One creature within 30 feet takes 1d8 Force damage.
> 
> > **Avenger**: Until the end of your next turn, any creature that hits the target with a melee attack roll takes 1d8 Force damage. _Range:_ 30 feet.
> 
> > **Renegade**: One creature within 30 feet can immediately take a Reaction to teleport up to 30 feet to an unoccupied space it can see.
> 
> > **Fortune Teller**: One creature within 30 feet advantage on D20 Tests until the start of your next turn.
> 
> > **Wayfarer**: One creature within 30 feet gains 1d8+8 Temporary Hit Points, and gains a +10 bonus to Speed feet.

#### Individual Feature Modifications (1)

* **+ Spirits from Beyond (Level 5 Options)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Spirit Channeling.** Choose a spirit option to channel. You can unleash it as a Magic Action:
  > 
  > > **Beloved**: One creature within 30 feet regains 1d8 Hit Points.
  > 
  > > **Sharpshooter**: One creature within 30 feet takes 1d8 Force damage.
  > 
  > > **Avenger**: Until the end of your next turn, any creature that hits the target with a melee attack roll takes 1d8 Force damage. _Range:_ 30 feet.
  > 
  > > **Renegade**: One creature within 30 feet can immediately take a Reaction to teleport up to 30 feet to an unoccupied space it can see.
  > 
  > > **Fortune Teller**: One creature within 30 feet advantage on D20 Tests until the start of your next turn.
  > 
  > > **Wayfarer**: One creature within 30 feet gains 1d8+8 Temporary Hit Points, and gains a +10 bonus to Speed feet.
  > 
  > > **Trickster**: _Wisdom Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ 2d8 Psychic damage, and the target has the Charmed condition until the end of your next turn. _Success:_ Half damage.
  > 
  > > **Shade**: _Constitution Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ When the invisibility ends, each creature in a 5-foot Emanation must succeed on a DC 15 Constitution saving throw or take 2d8 Necrotic damage, and the target has the Invisible condition until the end of its next turn.

#### Realistic Combined Class Stacks (1)

* **Stack: BARD (spirits) + [Spirits from Beyond (Level 5 Options)]**
  > **Spirit Channeling.** Choose a spirit option to channel. You can unleash it as a Magic Action:
  > 
  > > **Beloved**: One creature within 30 feet regains 1d8 Hit Points.
  > 
  > > **Sharpshooter**: One creature within 30 feet takes 1d8 Force damage.
  > 
  > > **Avenger**: Until the end of your next turn, any creature that hits the target with a melee attack roll takes 1d8 Force damage. _Range:_ 30 feet.
  > 
  > > **Renegade**: One creature within 30 feet can immediately take a Reaction to teleport up to 30 feet to an unoccupied space it can see.
  > 
  > > **Fortune Teller**: One creature within 30 feet advantage on D20 Tests until the start of your next turn.
  > 
  > > **Wayfarer**: One creature within 30 feet gains 1d8+8 Temporary Hit Points, and gains a +10 bonus to Speed feet.
  > 
  > > **Trickster**: _Wisdom Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ 2d8 Psychic damage, and the target has the Charmed condition until the end of your next turn. _Success:_ Half damage.
  > 
  > > **Shade**: _Constitution Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ When the invisibility ends, each creature in a 5-foot Emanation must succeed on a DC 15 Constitution saving throw or take 2d8 Necrotic damage, and the target has the Invisible condition until the end of its next turn.

---

## Subclass Features (cleric)

### Path to the Grave (`pathToTheGrave`)

- **Source File:** [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml)
- **Time:** `bonus action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Path to the Grave.** One creature within 30 feet has Disadvantage on its next attack roll or saving throw until the end of your next turn, and the curse ends early when you or an ally hits the target, dealing an extra 8 Necrotic or Radiant damage.

---

### Sentinel at Death's Door (`sentinelAtDeathsDoor`)

- **Source File:** [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml)
- **Time:** `reaction` | **Range:** `60 feet` | **Duration:** `Instantaneous`
- **Resource:** `sentinelAtDeathsDoor`

#### Baseline Prose

> **Sentinel at Death's Door.** _Trigger:_ When you or a Bloodied creature within 60 feet is hit with an attack roll. _Response:_ The target halves the attack's damage, and if the attack was a Critical Hit, its Critical Hit effects are canceled. _Range:_ 60 feet.

---

### Mind Magic (`mindMagic`)

- **Source File:** [`data/classes/subclasses/cleric/knowledge.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/knowledge.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Mind Magic.** You cast one of the following spells without expending a spell slot or requiring Material components - Comprehend Languages, Detect Magic, Detect Thoughts, Identify, or Mind Spike.

---

### Unfettered Mind (`unfetteredMindTelepathy`)

- **Source File:** [`data/classes/subclasses/cleric/knowledge.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/knowledge.yml)
- **Time:** `free action` | **Range:** `60 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Unfettered Mind.** Up to 2 creatures within 60 feet gain telepathy to simultaneously contact up to 2 creatures.

---

### Preserve Life (`preserveLife`)

- **Source File:** [`data/classes/subclasses/cleric/life.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/life.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Preserve Life.** Bloodied creatures of your choice within 30 feet regain 40 Hit Points, divided among the targets.

---

### Radiance of the Dawn (`radianceOfTheDawn`)

- **Source File:** [`data/classes/subclasses/cleric/light.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/light.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Radiance of the Dawn.** _Constitution Saving Throw:_ DC 15, each creature of your choice in a 30-foot-radius Emanation centered on you. _Failure or Success:_ any magical Darkness in the area is dispelled. _Failure:_ 2d10+8 Radiant damage. _Success:_ Half damage.

---

### Warding Flare (`wardingFlare`)

- **Source File:** [`data/classes/subclasses/cleric/light.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/light.yml)
- **Time:** `reaction` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `wardingFlare`

#### Baseline Prose

> **Warding Flare.** _Trigger:_ When a creature you can see makes an attack roll. _Response:_ You impose disadvantage on the roll. _Range:_ 30 feet.

#### Individual Feature Modifications (1)

* **+ Warding Flare (Level 6)** *(from [`data/classes/subclasses/cleric/light.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/light.yml))*
  > **Warding Flare.** _Trigger:_ When a creature you can see makes an attack roll. _Response:_ You impose disadvantage on the roll. _Range:_ 30 feet. The target gains 2d6+2 Temporary Hit Points.

#### Realistic Combined Class Stacks (1)

* **Stack: CLERIC (light) + [Warding Flare (Level 6)]**
  > **Warding Flare.** _Trigger:_ When a creature you can see makes an attack roll. _Response:_ You impose disadvantage on the roll. _Range:_ 30 feet. The target gains 2d6+2 Temporary Hit Points.

---

### Blessing of the Trickster (`blessingOfTheTrickster`)

- **Source File:** [`data/classes/subclasses/cleric/trickery.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/trickery.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Blessing of the Trickster.** One creature within 30 feet advantage on Dexterity (Stealth) checks until you finish a Long Rest or use this feature again.

---

### Invoke Duplicity (`invokeDuplicity`)

- **Source File:** [`data/classes/subclasses/cleric/trickery.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/trickery.yml)
- **Time:** `bonus action` | **Range:** `30 feet` | **Duration:** `1 minute`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Invoke Duplicity.** You create a visual illusion of yourself in an unoccupied space you can see within range. _Duration:_ 1 minute.
> 
> > **Cast Spells**: You can cast spells as though you were in the illusion's space, but you must use your own senses. _Range:_ 30 feet.
> 
> > **Distract**: When you and the illusion are within 5 feet of a creature, attack rolls against it have Advantage. _Range:_ 30 feet.
> 
> > **Move**: As a Bonus Action, move the illusion up to 30 feet to a space within 120 feet of you. You can teleport to swap places with it. _Range:_ 30 feet.

---

### Guided Strike (`guidedStrike`)

- **Source File:** [`data/classes/subclasses/cleric/war.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/war.yml)
- **Time:** `reaction` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Guided Strike.** _Trigger:_ When you or a creature within 30 feet misses with an attack roll. _Response:_ The target adds 10 to its next attack roll. _Range:_ 30 feet.

---

### War Priest (`warPriest`)

- **Source File:** [`data/classes/subclasses/cleric/war.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/war.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `warPriest`

#### Baseline Prose

> **War Priest.** You take an additional weapon attack.

---

## Subclass Features (druid)

### Preserved Land (`preservedLand`)

- **Source File:** [`data/classes/subclasses/druid/circleOfPreservation.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/druid/circleOfPreservation.yml)
- **Time:** `bonus action` | **Range:** `120 feet` | **Duration:** `1 minute`
- **Resource:** `wildShape`

#### Baseline Prose

> **Preserved Land.** A 15-foot-radius Cube of revitalizing energy appears centered on a point within 120 feet. You can take a Bonus Action to move the area up to 30 feet. _Duration:_ 1 minute.
> 
> > **Bolster**: _Trigger:_ Whenever a creature ends its turn in the Cube. _Response:_ gains 1d4+8 Temporary Hit Points.
> 
> > **Purify**: _Trigger:_ Whenever a creature ends its turn in the Cube. _Response:_ End the Frightened or Poisoned condition on the target. _Range:_ 120 feet.

#### Individual Feature Modifications (1)

* **+ Preserved Land (Level 6 Fortify & Reject)** *(from [`data/classes/subclasses/druid/circleOfPreservation.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/druid/circleOfPreservation.yml))*
  > **Preserved Land.** A 15-foot-radius Cube of revitalizing energy appears centered on a point within 120 feet. You can take a Bonus Action to move the area up to 30 feet. _Duration:_ 1 minute.
  > 
  > > **Bolster**: _Trigger:_ Whenever a creature ends its turn in the Cube. _Response:_ gains 1d4+8 Temporary Hit Points.
  > 
  > > **Purify**: _Trigger:_ Whenever a creature ends its turn in the Cube. _Response:_ End the Frightened or Poisoned condition on the target. _Range:_ 120 feet.
  > 
  > > **Fortify**: You and allies inside the Cube gain a +2 bonus to Constitution saving throws. _Range:_ 120 feet.
  > 
  > > **Reject**: _Trigger:_ When the Cube enters an enemy's space or an enemy enters or ends its turn in the Cube. _Response:_ _Wisdom Saving Throw:_ DC 15, the enemy. _Failure:_ 2d10 Radiant damage, and speed is halved. _Success:_ Half damage.

#### Realistic Combined Class Stacks (1)

* **Stack: DRUID (circleOfPreservation) + [Preserved Land (Level 6 Fortify & Reject)]**
  > **Preserved Land.** A 15-foot-radius Cube of revitalizing energy appears centered on a point within 120 feet. You can take a Bonus Action to move the area up to 30 feet. _Duration:_ 1 minute.
  > 
  > > **Bolster**: _Trigger:_ Whenever a creature ends its turn in the Cube. _Response:_ gains 1d4+8 Temporary Hit Points.
  > 
  > > **Purify**: _Trigger:_ Whenever a creature ends its turn in the Cube. _Response:_ End the Frightened or Poisoned condition on the target. _Range:_ 120 feet.
  > 
  > > **Fortify**: You and allies inside the Cube gain a +2 bonus to Constitution saving throws. _Range:_ 120 feet.
  > 
  > > **Reject**: _Trigger:_ When the Cube enters an enemy's space or an enemy enters or ends its turn in the Cube. _Response:_ _Wisdom Saving Throw:_ DC 15, the enemy. _Failure:_ 2d10 Radiant damage, and speed is halved. _Success:_ Half damage.

---

### Land's Aid (`landsAid`)

- **Source File:** [`data/classes/subclasses/druid/circleOfTheLand.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/druid/circleOfTheLand.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `wildShape`

#### Baseline Prose

> **Land's Aid.** _Constitution Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6 Necrotic damage. _Success:_ Half damage. One creature of your choice in the area within 60 feet regains 2d6 Hit Points.

---

### Wrath of the Sea (`wrathOfTheSea`)

- **Source File:** [`data/classes/subclasses/druid/circleOfTheSea.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/druid/circleOfTheSea.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `wildShape`

#### Baseline Prose

> **Wrath of the Sea.** A 10-foot-radius Emanation of ocean spray appears centered on you. _Constitution Saving Throw:_ DC 15, one creature you can see in the emanation. _Failure:_ 2d6 Cold damage. _Duration:_ 10 minutes.

#### Individual Feature Modifications (1)

* **+ Wrath of the Sea (Level 6 Push)** *(from [`data/classes/subclasses/druid/circleOfTheSea.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/druid/circleOfTheSea.yml))*
  > **Wrath of the Sea.** A 10-foot-radius Emanation of ocean spray appears centered on you. _Constitution Saving Throw:_ DC 15, one creature you can see in the emanation. _Failure:_ 2d6 Cold damage, and the target is pushed up to 15 feet away. _Duration:_ 10 minutes.

#### Realistic Combined Class Stacks (1)

* **Stack: DRUID (circleOfTheSea) + [Wrath of the Sea (Level 6 Push)]**
  > **Wrath of the Sea.** A 10-foot-radius Emanation of ocean spray appears centered on you. _Constitution Saving Throw:_ DC 15, one creature you can see in the emanation. _Failure:_ 2d6 Cold damage, and the target is pushed up to 15 feet away. _Duration:_ 10 minutes.

---

### Starry Form (`starryForm`)

- **Source File:** [`data/classes/subclasses/druid/circleOfTheStars.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/druid/circleOfTheStars.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `wildShape`

#### Baseline Prose

> **Starry Form.** You take on one of the following forms. This form sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. _Duration:_ 10 minutes.
> 
> > **Archer**: _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 1d8+2 Radiant damage. _Repeat:_ On subsequent turns, you can take a Bonus Action to repeat the attack.
> 
> > **Chalice**: _Trigger:_ When you cast a healing spell with a spell slot. _Response:_ One creature within 30 feet regains 1d8+2 Hit Points.
> 
> > **Dragon**: When making an Intelligence or Wisdom check or a Constitution saving throw for Concentration, treat a roll of 9 or lower on the d20 as a 10.

---

### Cosmic Omen (`cosmicOmen`)

- **Source File:** [`data/classes/subclasses/druid/circleOfTheStars.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/druid/circleOfTheStars.yml)
- **Time:** `reaction` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Resource:** `cosmicOmen`

#### Baseline Prose

> **Cosmic Omen.** When you finish a Long Rest, you consult your Star Map for omens and roll a die. Until you finish your next Long Rest, you gain access to a special Reaction based on whether you rolled an even or an odd number on the die.
> 
> > **Weal (Even)**: The target adds 1d6 to attacks and ability checks and saving throws. _Range:_ 30 feet.
> 
> > **Woe (Odd)**: The target subtracts 1d6 from attacks and ability checks and saving throws. _Range:_ 30 feet.

---

## Subclass Features (fighter)

### Curving Shot (`curvingShot`)

- **Source File:** [`data/classes/subclasses/fighter/arcaneArcher.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/fighter/arcaneArcher.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Curving Shot.** _Trigger:_ When you miss a ranged attack roll with ammunition. _Response:_ You make a new attack roll against a creature within 60 feet of the original target.

---

### Magical Ammunition (`magicalAmmunition`)

- **Source File:** [`data/classes/subclasses/fighter/arcaneArcher.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/fighter/arcaneArcher.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `secondWind`

#### Baseline Prose

> **Magical Ammunition.** You imbue a piece of nonmagical ammunition with one of the following properties:
> 
> > **Darkening Shot**: A 15-foot-radius Emanation of magical darkness fills the area for 1 minute; creatures in the area have a -5 penalty to Wisdom (Perception) checks.
> 
> > **Unlocking Shot**: Any mundane lock, stuck, or barred object in the area is unlocked, unstuck, or unbarred.
> 
> > **Vine Shot**: A 60-foot-long vine grows from the ammunition, lasting 10 minutes.

---

### Know Your Enemy (`knowYourEnemy`)

- **Source File:** [`data/classes/subclasses/fighter/battleMaster.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/fighter/battleMaster.yml)
- **Time:** `bonus action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Resource:** `superiorityDice`

#### Baseline Prose

> **Know Your Enemy.** You discern certain strengths and weaknesses of a creature. You know whether the creature has Immunities, Resistances, or Vulnerabilities and what they are. _Range:_ 30 feet.

---

### War Bond (`warBond`)

- **Source File:** [`data/classes/subclasses/fighter/eldritchKnight.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/fighter/eldritchKnight.yml)
- **Time:** `bonus action` | **Range:** `N/A` | **Duration:** `N/A`

#### Baseline Prose

> **War Bond.** You summon your bonded weapon to teleport instantly to your hand; cannot be disarmed unless Incapacitated.

---

### Protective Field (`protectiveField`)

- **Source File:** [`data/classes/subclasses/fighter/psiWarrior.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/fighter/psiWarrior.yml)
- **Time:** `reaction` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Protective Field.** _Trigger:_ When you or another creature you can see takes damage. _Response:_ The target reduces the damage taken by 1d1d8+3. _Range:_ 30 feet.

---

### Psionic Strike (`psionicStrike`)

- **Source File:** [`data/classes/subclasses/fighter/psiWarrior.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/fighter/psiWarrior.yml)
- **Time:** `free action` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Psionic Strike.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 1d1d8+3 Force damage. _Range:_ 30 feet.

#### Individual Feature Modifications (1)

* **+ Psi Warrior** *(from [`data/classes/subclasses/fighter/psiWarrior.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/fighter/psiWarrior.yml))*
  > **Psionic Strike.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 1d1d8+3 Force damage. _Range:_ 30 feet. _Strength Saving Throw:_ DC 14, the target. _Failure:_ The target is Prone and is pushed up to 10 feet away.

#### Realistic Combined Class Stacks (1)

* **Stack: FIGHTER (psiWarrior) + [Psi Warrior]**
  > **Psionic Strike.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 1d1d8+3 Force damage. _Range:_ 30 feet. _Strength Saving Throw:_ DC 14, the target. _Failure:_ The target is Prone and is pushed up to 10 feet away.

---

### Telekinetic Movement (`telekineticMovement`)

- **Source File:** [`data/classes/subclasses/fighter/psiWarrior.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/fighter/psiWarrior.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Telekinetic Movement.** One creature within 30 feet is transported up to 30 feet to an unoccupied space.

---

### Psi Powered Leap (`psiPoweredLeap`)

- **Source File:** [`data/classes/subclasses/fighter/psiWarrior.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/fighter/psiWarrior.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Psi Powered Leap.** You gain a Fly Speed of 60 feet until the end of the current turn.

---

## Subclass Features (monk)

### Elemental Burst (`elementalBurst`)

- **Source File:** [`data/classes/subclasses/monk/elements.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/elements.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `Instantaneous`
- **Resource:** `2 focusPoints`

#### Baseline Prose

> **Elemental Burst.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 120 feet. _Failure:_ 3d8 Acid, Cold, Fire, Lightning, or Thunder damage. _Success:_ Half damage.

---

### Elemental Attunement (`elementalAttunement`)

- **Source File:** [`data/classes/subclasses/monk/elements.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/elements.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `1 focusPoints`

#### Baseline Prose

> **Elemental Attunement.** Your Unarmed Strike reach is 5 feet greater than normal, and unarmed Strikes can deal your choice of Acid, Cold, Fire, Lightning, or Thunder damage, and when you deal one of these damage types, the target is subject to the following saving throw. _Strength Saving Throw:_ DC 15. _Failure:_ The target is pushed up to 5 feet away. _Duration:_ 10 minutes.

---

### Hand of Harm (`handOfHarm`)

- **Source File:** [`data/classes/subclasses/monk/mercy.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/mercy.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `1 focusPoints`

#### Baseline Prose

> **Hand of Harm.** _Trigger:_ Once per turn when you hit a creature with an Unarmed Strike and deal damage. _Response:_ The target takes 1d8+2 Necrotic damage, and the target has the Poisoned condition until the end of your next turn.

---

### Hand of Healing (`handOfHealing`)

- **Source File:** [`data/classes/subclasses/monk/mercy.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/mercy.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `Instantaneous`
- **Resource:** `1 focusPoints`

#### Baseline Prose

> **Hand of Healing.** One creature you touch regains 1d8+2 Hit Points, and you can end one condition on the target: Blinded, Deafened, Paralyzed, Poisoned, or Stunned.

---

### Open Hand Technique (`openHandTechnique`)

- **Source File:** [`data/classes/subclasses/monk/openHand.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/openHand.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Open Hand Technique.** Whenever you hit a creature with an attack granted by your Flurry of Blows, you can impose one of the following effects on that target:
> 
> > **Addle**: The target can't make Opportunity Attacks until the start of its next turn.
> 
> > **Push**: _Strength Saving Throw:_ DC 15, the target. _Failure:_ The target is pushed up to 15 feet away.
> 
> > **Topple**: _Dexterity Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

---

### Wholeness of Body (`wholenessOfBody`)

- **Source File:** [`data/classes/subclasses/monk/openHand.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/openHand.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `wholenessOfBody`

#### Baseline Prose

> **Wholeness of Body.** You regain 1d8+2 Hit Points.

---

### Shadow Step (`shadowStep`)

- **Source File:** [`data/classes/subclasses/monk/shadows.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/shadows.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Shadow Step.** You teleport up to 60 feet to an unoccupied space in Dim Light or Darkness, and gain Advantage on your next melee attack before the end of the current turn. _Range:_ 60 feet.

---

### Envenom Weapon (`envenomWeapon`)

- **Source File:** [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `1 focusPoints`

#### Baseline Prose

> **Envenom Weapon.** _Trigger:_ When you hit a creature with an attack. _Response:_ choose one of the following:
> 
> > **Slowing Toxin**: The target's Speed is halved until the start of your next turn, and the target can't take Reactions, and can take either an action or a Bonus Action on its turn, not both.
> 
> > **Venom**: The target takes 2d8 Poison damage.

#### Individual Feature Modifications (1)

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Envenom Weapon.** _Trigger:_ When you hit a creature with an attack. _Response:_ choose one of the following:
  > 
  > > **Slowing Toxin**: The target's Speed is halved until the start of your next turn, and the target can't take Reactions, and can take either an action or a Bonus Action on its turn, not both.
  > 
  > > **Venom**: The target takes 2d8 Poison or Acid damage.

#### Realistic Combined Class Stacks (1)

* **Stack: MONK (venom) + [Potent Arsenal]**
  > **Envenom Weapon.** _Trigger:_ When you hit a creature with an attack. _Response:_ choose one of the following:
  > 
  > > **Slowing Toxin**: The target's Speed is halved until the start of your next turn, and the target can't take Reactions, and can take either an action or a Bonus Action on its turn, not both.
  > 
  > > **Venom**: The target takes 2d8 Poison or Acid damage.

---

### Toxic Touch (`toxicTouch`)

- **Source File:** [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `1 minute`
- **Resource:** `1 focusPoints`

#### Baseline Prose

> **Toxic Touch.** _Constitution Saving Throw:_ DC 15, one creature you touch. _Failure:_ The target has the Poisoned condition, choose one of the following additional effects:
> 
> > **Intoxicant**: The target has the Charmed condition (ends if the target takes damage)
> 
> > **Sedative**: The target has the Unconscious condition
> 
> > **Truth Serum**: The target can't knowingly tell a lie. _Duration:_ 1 minute.

---

## Subclass Features (paladin)

### Sacred Weapon (`sacredWeapon`)

- **Source File:** [`data/classes/subclasses/paladin/oathOfDevotion.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathOfDevotion.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Sacred Weapon.** _Trigger:_ When you take the Attack action. _Response:_ You imbue one Melee weapon you are holding. Add +1 to attack rolls made with it, and it can deal Radiant damage. _Duration:_ 10 minutes.

---

### Elemental Smite (`elementalSmite`)

- **Source File:** [`data/classes/subclasses/paladin/oathOfGenies.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathOfGenies.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Elemental Smite.** _Trigger:_ Immediately after you cast Divine Smite. _Response:_ Choose one of the following:
> 
> > **Dao's Crush**: _Strength Saving Throw:_ DC 15, the target. _Failure:_ The target has the Grappled condition (escape DC 15) and has the Restrained condition (escape DC 15).
> 
> > **Djinni's Escape**: You teleport to an unoccupied space within 30 feet and gain Resistance to Bludgeoning, Piercing, and Slashing damage, and Immunity to the Grappled, Prone, and Restrained conditions until the end of your next turn.
> 
> > **Efreeti's Fury**: The target takes 2d4 Fire damage, and fire jumps to another creature within 30 feet, dealing 2d4 Fire damage to it.
> 
> > **Marid's Surge**: _Strength Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ Each target is Prone and is pushed up to 15 feet away.

---

### Inspiring Smite (`inspiringSmite`)

- **Source File:** [`data/classes/subclasses/paladin/oathOfGlory.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathOfGlory.yml)
- **Time:** `free action` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Inspiring Smite.** _Trigger:_ Immediately after you cast Divine Smite. _Response:_ Creatures of your choice within 30 feet gain 2d8+8 Temporary Hit Points.

---

### Peerless Athlete (`peerlessAthlete`)

- **Source File:** [`data/classes/subclasses/paladin/oathOfGlory.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathOfGlory.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 hour`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Peerless Athlete.** You have Advantage on Strength (Athletics) and Dexterity (Acrobatics) checks, and the distance of your Long and High Jumps increases by 10 feet. _Duration:_ 1 hour.

---

### Nature's Wrath (`naturesWrath`)

- **Source File:** [`data/classes/subclasses/paladin/oathOfTheAncients.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathOfTheAncients.yml)
- **Time:** `action` | **Range:** `15 feet` | **Duration:** `1 minute`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Nature's Wrath.** _Strength Saving Throw:_ DC 15, creatures of your choice within 15 feet. _Failure:_ Each target has the Restrained condition (repeats save at end of each turn). _Duration:_ 1 minute.

---

### Vow of Enmity (`vowOfEnmity`)

- **Source File:** [`data/classes/subclasses/paladin/oathOfVengeance.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathOfVengeance.yml)
- **Time:** `free action` | **Range:** `30 feet` | **Duration:** `1 minute`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Vow of Enmity.** _Trigger:_ When you take the Attack action. _Response:_ You have Advantage on attack rolls against the target for the duration. _Range:_ 30 feet. _Duration:_ 1 minute.

---

### Conjure Undead (`conjureUndead`)

- **Source File:** [`data/classes/subclasses/paladin/oathbreaker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathbreaker.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Conjure Undead.** You summon 1 Undead (Skeleton or Zombie) within 30 feet that obey your verbal commands for 1 minute.

---

### Dreadful Aspect (`dreadfulAspect`)

- **Source File:** [`data/classes/subclasses/paladin/oathbreaker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathbreaker.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `channelDivinity`

#### Baseline Prose

> **Dreadful Aspect.** _Trigger:_ Immediately after you cast Divine Smite. _Response:_ _Wisdom Saving Throw:_ DC 15, each creature in a 30-foot-radius Emanation centered on you. _Failure:_ Each target has the Frightened condition (repeats save at end of each turn). _Duration:_ 1 minute.

---

## Subclass Features (psion)

### Mutable Form (`mutableForm`)

- **Source File:** [`data/classes/subclasses/psion/metamorph.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/metamorph.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Mutable Form.** You gain 1d1d8+3 Temporary Hit Points. Your reach increases by 5 feet, your Speed increases by 5 feet, and when you cast a spell that has a range of Touch and a casting time of an Action, its range becomes 10 feet. _Duration:_ 1 minute.

#### Individual Feature Modifications (1)

* **+ Metamorph** *(from [`data/classes/subclasses/psion/metamorph.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/metamorph.yml))*
  > **Mutable Form.** You gain 1d1d8+3 Temporary Hit Points. Your reach increases by 5 feet, your Speed increases by 5 feet, and when you cast a spell that has a range of Touch and a casting time of an Action, its range becomes 10 feet. Expend an additional Psionic Energy to gain a plus 2 bonus to AC. _Duration:_ 1 minute.

#### Realistic Combined Class Stacks (1)

* **Stack: PSION (metamorph) + [Metamorph]**
  > **Mutable Form.** You gain 1d1d8+3 Temporary Hit Points. Your reach increases by 5 feet, your Speed increases by 5 feet, and when you cast a spell that has a range of Touch and a casting time of an Action, its range becomes 10 feet. Expend an additional Psionic Energy to gain a plus 2 bonus to AC. _Duration:_ 1 minute.

---

### Bone Blade (`boneBlade`)

- **Source File:** [`data/classes/subclasses/psion/metamorph.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/metamorph.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `weaponAttack`, `attack`, `melee`

#### Baseline Prose

> **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing damage, and you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target.

#### Individual Feature Modifications (6)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing damage plus 1d8 Necrotic or Radiant damage, and you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing damage, you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing or Acid damage, and you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing damage plus 1d4 Psychic damage, and you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing damage plus 1d4 Cold damage, and you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Divine Strike, Pull of Death]**
  > **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing damage plus 1d8 Necrotic or Radiant damage, you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Primal Strike]**
  > **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target.

* **Stack: MONK (venom) + [Potent Arsenal]**
  > **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing or Acid damage, and you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target.

* **Stack: RANGER (feyWanderer) + [Dreadful Strikes]**
  > **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing damage plus 1d4 Psychic damage, and you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target.

* **Stack: RANGER (winterWalker) + [Polar Strikes]**
  > **Bone Blade.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d8+3 Piercing damage plus 1d4 Cold damage, and you have advantage on this attack roll if an unincapacitated ally is within 5 feet of the target.

---

### Flesh Maul (`fleshMaul`)

- **Source File:** [`data/classes/subclasses/psion/metamorph.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/metamorph.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `weaponAttack`, `attack`, `melee`

#### Baseline Prose

> **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning damage, and the target has Disadvantage on its next saving throw.

#### Individual Feature Modifications (6)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, and the target has Disadvantage on its next saving throw.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target has Disadvantage on its next saving throw.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning damage, the target has Disadvantage on its next saving throw, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning or Acid damage, and the target has Disadvantage on its next saving throw.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning damage plus 1d4 Psychic damage, and the target has Disadvantage on its next saving throw.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning damage plus 1d4 Cold damage, and the target has Disadvantage on its next saving throw.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Divine Strike, Pull of Death]**
  > **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, the target has Disadvantage on its next saving throw, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Primal Strike]**
  > **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target has Disadvantage on its next saving throw.

* **Stack: MONK (venom) + [Potent Arsenal]**
  > **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning or Acid damage, and the target has Disadvantage on its next saving throw.

* **Stack: RANGER (feyWanderer) + [Dreadful Strikes]**
  > **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning damage plus 1d4 Psychic damage, and the target has Disadvantage on its next saving throw.

* **Stack: RANGER (winterWalker) + [Polar Strikes]**
  > **Flesh Maul.** _Melee Attack Roll:_ +6, reach 5 feet. _Hit:_ 1d10+3 Bludgeoning damage plus 1d4 Cold damage, and the target has Disadvantage on its next saving throw.

---

### Viscera Launcher (`visceraLauncher`)

- **Source File:** [`data/classes/subclasses/psion/metamorph.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/metamorph.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Tags:** `weaponAttack`, `attack`, `ranged`

#### Baseline Prose

> **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+3 Acid damage, and once per turn, deal an extra 1d6 Acid damage.

#### Individual Feature Modifications (7)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+3 Acid damage plus 1d8 Necrotic or Radiant damage, and once per turn, deal an extra 1d6 Acid damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+3 Acid damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and once per turn, deal an extra 1d6 Acid damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+3 Acid damage, once per turn, deal an extra 1d6 Acid damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+3 Acid damage, and once per turn, deal an extra 1d6 Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+3 Acid damage plus 1d4 Psychic damage, and once per turn, deal an extra 1d6 Acid damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+3 Acid damage plus 1d4 Cold damage, and once per turn, deal an extra 1d6 Acid damage.

* **+ Precision Shot** *(from [`data/feats/general/sharpshooter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sharpshooter.yml))*
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+6 Acid damage, and once per turn, deal an extra 1d6 Acid damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Precision Shot, Divine Strike, Pull of Death]**
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+6 Acid damage plus 1d8 Necrotic or Radiant damage, once per turn, deal an extra 1d6 Acid damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Precision Shot, Primal Strike]**
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+6 Acid damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and once per turn, deal an extra 1d6 Acid damage.

* **Stack: MONK (venom) + [Precision Shot, Potent Arsenal]**
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+6 Acid damage, and once per turn, deal an extra 1d6 Acid damage.

* **Stack: RANGER (feyWanderer) + [Precision Shot, Dreadful Strikes]**
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+6 Acid damage plus 1d4 Psychic damage, and once per turn, deal an extra 1d6 Acid damage.

* **Stack: RANGER (winterWalker) + [Precision Shot, Polar Strikes]**
  > **Viscera Launcher.** _Ranged Attack Roll:_ +6, range 30 feet. _Hit:_ 1d6+6 Acid damage plus 1d4 Cold damage, and once per turn, deal an extra 1d6 Acid damage.

---

### Destructive Trance (`destructiveTrance`)

- **Source File:** [`data/classes/subclasses/psion/psykinetic.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/psykinetic.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Destructive Trance.** You gain a Fly Speed of 20 feet (hover), and when you cast a Psion spell using a spell slot, add 1d1d8 to one damage roll of that spell. _Duration:_ 10 minutes.

---

### Instant Slip (`instantSlip`)

- **Source File:** [`data/classes/subclasses/psion/seer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/seer.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Instant Slip.** _Trigger:_ When another creature damages you with an attack roll. _Response:_ You reduce the damage by 1d1d8+3.

---

### Temporal Glitch (`temporalGlitch`)

- **Source File:** [`data/classes/subclasses/psion/seer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/seer.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Temporal Glitch.** _Trigger:_ When you fail a Constitution saving throw to maintain Concentration. _Response:_ You add 1d1d8 to the roll, potentially turning a fail into a success.

---

### Telepathic Distraction (`telepathicDistraction`)

- **Source File:** [`data/classes/subclasses/psion/telepath.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/telepath.yml)
- **Time:** `reaction` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Telepathic Distraction.** _Trigger:_ When a creature hits with an attack roll. _Response:_ The target subtract 1d1d8 from the attack roll, potentially causing it to miss. _Range:_ 30 feet.

---

### Bulwark Mind (`bulwarkMind`)

- **Source File:** [`data/classes/subclasses/psion/telepath.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/telepath.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Bulwark Mind.** You gain Resistance to Psychic damage, and add 1d1d8 to Intelligence, Wisdom, and Charisma saving throws. _Duration:_ 10 minutes.

---

## Subclass Features (ranger)

### Command Companion (`commandPrimalCompanion`)

- **Source File:** [`data/classes/subclasses/ranger/beastMaster.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/beastMaster.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Command Companion.** Command your Primal Companion beast to take any action (it otherwise only Dodges). _Range:_ 60 feet.

#### Individual Feature Modifications (1)

* **+ Exceptional Training** *(from [`data/classes/subclasses/ranger/beastMaster.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/beastMaster.yml))*
  > **Command Companion.** Command your Primal Companion beast to take any action (it otherwise only Dodges), and also command the beast to Dash, Disengage, Dodge, or Help as a Bonus Action; its attacks can deal Force damage instead of their normal type. _Range:_ 60 feet.

#### Realistic Combined Class Stacks (1)

* **Stack: RANGER (beastMaster) + [Exceptional Training]**
  > **Command Companion.** Command your Primal Companion beast to take any action (it otherwise only Dodges), and also command the beast to Dash, Disengage, Dodge, or Help as a Bonus Action; its attacks can deal Force damage instead of their normal type. _Range:_ 60 feet.

---

### Beguiling Twist (`beguilingTwist`)

- **Source File:** [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml)
- **Time:** `reaction` | **Range:** `120 feet` | **Duration:** `1 minute`

#### Baseline Prose

> **Beguiling Twist.** _Trigger:_ When a creature within 120 feet succeeds on a save against Charmed or Frightened. _Response:_ _Wisdom Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ The target has the Charmed condition (repeats save at end of each turn) and has the Frightened condition (repeats save at end of each turn). _Duration:_ 1 minute.

---

### Ambusher's Leap (`dreadAmbusherLeap`)

- **Source File:** [`data/classes/subclasses/ranger/gloomStalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/gloomStalker.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Ambusher's Leap.** Your Speed increases by 10 feet until the end of this turn.

---

### Dreadful Strike (`dreadfulStrike`)

- **Source File:** [`data/classes/subclasses/ranger/gloomStalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/gloomStalker.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `dreadfulStrike`

#### Baseline Prose

> **Dreadful Strike.** _Trigger:_ Once per turn when you hit with a weapon attack. _Response:_ You deal 2d6 Psychic damage.

---

### Umbral Sight (`umbralSightInvisibility`)

- **Source File:** [`data/classes/subclasses/ranger/gloomStalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/gloomStalker.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Umbral Sight.** While entirely in Darkness, you are Invisible to creatures that rely on Darkvision to see you.

---

### Wrath of the Wild (`wrathOfTheWild`)

- **Source File:** [`data/classes/subclasses/ranger/hollowWarden.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/hollowWarden.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `favoredEnemy`

#### Baseline Prose

> **Wrath of the Wild.** You gain a +1 bonus to AC, and you can make an Opportunity Attack against any creature within 5 feet that damages you or an ally. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ Each target has the Frightened condition until the end of your next turn. _Duration:_ 1 minute.

#### Individual Feature Modifications (1)

* **+ Hungering Might** *(from [`data/classes/subclasses/ranger/hollowWarden.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/hollowWarden.yml))*
  > **Wrath of the Wild.** You gain a +1 bonus to AC, 1d10+2 Hit Points, and you can make an Opportunity Attack against any creature within 5 feet that damages you or an ally. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ Each target has the Frightened condition until the end of your next turn. _Duration:_ 1 minute.

#### Realistic Combined Class Stacks (1)

* **Stack: RANGER (hollowWarden) + [Hungering Might]**
  > **Wrath of the Wild.** You gain a +1 bonus to AC, 1d10+2 Hit Points, and you can make an Opportunity Attack against any creature within 5 feet that damages you or an ally. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ Each target has the Frightened condition until the end of your next turn. _Duration:_ 1 minute.

---

### Fortifying Soul (`fortifyingSoul`)

- **Source File:** [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `limited`

#### Baseline Prose

> **Fortifying Soul.** Up to 2 creatures within 60 feet regain 1d10+8 Hit Points. Targets have Advantage on saving throws to avoid or end the Frightened condition for 1 hour.

---

## Subclass Features (rogue)

### Wails from the Grave (`wailsFromTheGrave`)

- **Source File:** [`data/classes/subclasses/rogue/phantom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/rogue/phantom.yml)
- **Time:** `free action` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `wailsFromTheGraveResource`

#### Baseline Prose

> **Wails from the Grave.** _Trigger:_ immediately after you deal Sneak Attack damage to a creature. _Response:_ One creature within 30 feet takes 2d6 Necrotic damage.

---

### Bloodthirst (`bloodthirst`)

- **Source File:** [`data/classes/subclasses/rogue/scion.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/rogue/scion.yml)
- **Time:** `reaction` | **Range:** `30 feet` | **Duration:** `Instantaneous`
- **Resource:** `bloodthirstResource`

#### Baseline Prose

> **Bloodthirst.** _Trigger:_ when an enemy you can see within range takes damage and is Bloodied. _Response:_ You teleport to an unoccupied space within 5 feet of that enemy and make one melee attack against it. _Range:_ 30 feet.

---

### Psi-Bolstered Knack (`psiBolsteredKnack`)

- **Source File:** [`data/classes/subclasses/rogue/soulknife.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/rogue/soulknife.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Psi-Bolstered Knack.** _Trigger:_ When you or a creature you can see fail an ability check. _Response:_ You add 1d1d8 to the check (charge expended only if roll succeeds).

---

### Psychic Whispers (`psychicWhispers`)

- **Source File:** [`data/classes/subclasses/rogue/soulknife.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/rogue/soulknife.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `Varies`
- **Resource:** `psionicEnergyDice`

#### Baseline Prose

> **Psychic Whispers.** You speak telepathically with up to 3 chosen creatures for 1d1d8 hours (within 1 mile). _Duration:_ Varies.

---

### Psychic Blade (`psychicBlade`)

- **Source File:** [`data/classes/subclasses/rogue/soulknife.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/rogue/soulknife.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `Instantaneous`
- **Tags:** `weaponAttack`, `vex`, `attack`

#### Baseline Prose

> **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic damage.

#### Individual Feature Modifications (7)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic damage plus 1d4 Cold damage.

* **+ Vex** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic damage, and attack rolls against the target have Advantage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Vex, Divine Strike, Pull of Death]**
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic damage plus 1d8 Necrotic or Radiant damage, attack rolls against the target have Advantage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Vex, Primal Strike]**
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and attack rolls against the target have Advantage.

* **Stack: MONK (venom) + [Vex, Potent Arsenal]**
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic or Acid damage, and attack rolls against the target have Advantage.

* **Stack: RANGER (feyWanderer) + [Vex, Dreadful Strikes]**
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic damage plus 1d4 Psychic damage, and attack rolls against the target have Advantage.

* **Stack: RANGER (winterWalker) + [Vex, Polar Strikes]**
  > **Psychic Blade.** _Finesse Attack Roll:_ +5, range 60 feet. _Hit:_ 1d6+2 Psychic damage plus 1d4 Cold damage, and attack rolls against the target have Advantage.

---

### Fast Hands (`fastHands`)

- **Source File:** [`data/classes/subclasses/rogue/thief.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/rogue/thief.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `Instantaneous`

#### Baseline Prose

> **Fast Hands.** You do one of the following:
> 
> > **Sleight of Hand**: You make a Dexterity (Sleight of Hand) check to pick a lock or disarm a trap with Thieves' Tools or to pick a pocket.
> 
> > **Use an Object**: You take the Utilize action, or take the Magic action to use a magic item that requires an action.

---

## Subclass Features (sorcerer)

### Restore Balance (`restoreBalance`)

- **Source File:** [`data/classes/subclasses/sorcerer/clockwork.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/sorcerer/clockwork.yml)
- **Time:** `reaction` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `restoreBalance`

#### Baseline Prose

> **Restore Balance.** _Trigger:_ When a creature you can see within 60 feet rolls with Advantage or Disadvantage. _Response:_ Prevent the roll from being affected by Advantage or Disadvantage. _Range:_ 60 feet.

---

### Bastion of Law (`bastionOfLaw`)

- **Source File:** [`data/classes/subclasses/sorcerer/clockwork.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/sorcerer/clockwork.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Resource:** `sorceryPoints`

#### Baseline Prose

> **Bastion of Law.** Gains a magical ward represented by d8s equal to the Sorcery Points spent; when taking damage, expend dice to reduce damage by the total rolled. _Range:_ 30 feet.

---

### Abyssal Rupture (`abyssalRupture`)

- **Source File:** [`data/classes/subclasses/sorcerer/demonic.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/sorcerer/demonic.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Abyssal Rupture.** _Trigger:_ When you use Innate Sorcery, a 10-foot-radius Abyssal sphere ruptures within 30 feet. At activation and as a Bonus Action on subsequent turns. _Response:_ Choose one of the following:
> 
> > **Demonic Lash**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8 Slashing damage, and the target is pulled up to 10 feet closer.
> 
> > **Terrifying Screams**: _Wisdom Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 30 feet. _Failure:_ 1d4 Psychic damage.

---

### Abyssal Realm (`abyssalRealm`)

- **Source File:** [`data/classes/subclasses/sorcerer/demonic.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/sorcerer/demonic.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Abyssal Realm.** _Trigger:_ When you spend at least 1 Sorcery Point as part of a Magic action or a Bonus Action on your turn. _Response:_ Choose one of the following:
> 
> > **Gaping Maw's Frenzy**: _Charisma Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ You must use as much of its movement as possible to move in a designated horizontal direction at the start of its next turn.
> 
> > **Maze of Azzatar**: _Intelligence Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ You have the Invisible condition until the end of your next turn.
> 
> > **Slime Pits' Haze**: _Constitution Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ You have the Charmed condition until the end of your next turn.

---

### Strength of the Grave (`strengthOfTheGrave`)

- **Source File:** [`data/classes/subclasses/sorcerer/shadow.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/sorcerer/shadow.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `limited`

#### Baseline Prose

> **Strength of the Grave.** _Trigger:_ When you would drop to 0 Hit Points and not die outright. _Response:_ _Charisma Saving Throw:_ DC 5 plus the damage taken. _Success:_ Your Hit Points change to 8.

---

### Wild Magic Surge (`wildMagicSurge`)

- **Source File:** [`data/classes/subclasses/sorcerer/wildMagic.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/sorcerer/wildMagic.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Wild Magic Surge.** _Trigger:_ Once per turn, immediately after you cast a Sorcerer spell with a spell slot. _Response:_ You roll 1d20; if you roll a 20, roll on the Wild Magic Surge table.

---

### Tides of Chaos (`tidesOfChaos`)

- **Source File:** [`data/classes/subclasses/sorcerer/wildMagic.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/sorcerer/wildMagic.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Tides of Chaos.** You have Advantage on one D20 Test before you roll. Once you do so, you must cast a Sorcerer spell with a spell slot or finish a Long Rest before you can use this feature again. If you do cast a Sorcerer spell with a spell slot before you finish a Long Rest, you automatically roll on the Wild Magic Surge table.

---

### Bend Luck (`bendLuck`)

- **Source File:** [`data/classes/subclasses/sorcerer/wildMagic.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/sorcerer/wildMagic.yml)
- **Time:** `reaction` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `1 sorceryPoints`

#### Baseline Prose

> **Bend Luck.** _Trigger:_ Immediately after another creature you can see rolls the d20 for a D20 Test. _Response:_ The target apply 1d4 as a bonus or penalty (your choice) to the d20 roll. _Range:_ 60 feet.

---

## Subclass Features (warlock)

### Misty Escape (`mistyEscape`)

- **Source File:** [`data/classes/subclasses/warlock/archfeyPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/archfeyPatron.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Misty Escape.** _Trigger:_ When you take damage. _Response:_ You cast Misty Step.

---

### Healing Light (`healingLight`)

- **Source File:** [`data/classes/subclasses/warlock/celestialPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/celestialPatron.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `healingLight`

#### Baseline Prose

> **Healing Light.** One creature within 60 feet regains Hit Points. Per charge expended.

---

### Dark One's Blessing (`darkOnesBlessing`)

- **Source File:** [`data/classes/subclasses/warlock/fiendPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/fiendPatron.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Dark One's Blessing.** _Trigger:_ When you reduce an enemy to 0 Hit Points. _Response:_ You gain 8 Temporary Hit Points.

---

### Dark One's Own Luck (`darkOnesOwnLuck`)

- **Source File:** [`data/classes/subclasses/warlock/fiendPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/fiendPatron.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `darkOnesOwnLuck`

#### Baseline Prose

> **Dark One's Own Luck.** _Trigger:_ When you make an ability check or a saving throw. _Response:_ You add 1d10 to your roll (you can do so after seeing the roll but before any of the roll's effects occur).

---

### Awakened Mind (`awakenedMind`)

- **Source File:** [`data/classes/subclasses/warlock/greatOldOnePatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/greatOldOnePatron.yml)
- **Time:** `bonus action` | **Range:** `30 feet` | **Duration:** `$(meta.level) minutes`

#### Baseline Prose

> **Awakened Mind.** You form a telepathic connection between your mind and the mind of another to communicate telepathically while within 1 miles. _Range:_ 30 feet. _Duration:_ 8 minutes.

---

### Clairvoyant Combatant (`clairvoyantCombatant`)

- **Source File:** [`data/classes/subclasses/warlock/greatOldOnePatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/greatOldOnePatron.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`

#### Baseline Prose

> **Clairvoyant Combatant.** _Trigger:_ When you form a telepathic bond with a creature using your Awakened Mind. _Response:_ _Wisdom Saving Throw:_ DC 15, the target. _Failure:_ The target has Disadvantage on attack rolls against you, and you have Advantage on attack rolls against that creature.

---

### Form of Dread (`formOfDread`)

- **Source File:** [`data/classes/subclasses/warlock/undeadPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/undeadPatron.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `formOfDread`

#### Baseline Prose

> **Form of Dread.** Choose one of the following: _Duration:_ 1 minute.
> 
> > **Facsimile of Life**: You gain 1d10+8 Temporary Hit Points.
> 
> > **Fearless Form**: You gain immunity to the Frightened condition; if Frightened when you transform, the condition immediately ends for you.
> 
> > **Frightful Avatar**: _Trigger:_ Once per turn, when you hit a creature with an attack roll. _Response:_ _Wisdom Saving Throw:_ DC 15, the target. _Failure:_ The target has the Frightened condition until the end of your next turn.

#### Individual Feature Modifications (1)

* **+ Dreaded Necrosis** *(from [`data/classes/subclasses/warlock/undeadPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/undeadPatron.yml))*
  > **Form of Dread.** Choose one of the following: _Duration:_ 1 minute.
  > 
  > > **Facsimile of Life**: You gain 1d10+8 Temporary Hit Points.
  > 
  > > **Fearless Form**: You gain immunity to the Frightened condition; if Frightened when you transform, the condition immediately ends for you.
  > 
  > > **Frightful Avatar**: _Trigger:_ Once per turn, when you hit a creature with an attack roll. _Response:_ _Wisdom Saving Throw:_ DC 15, the target. _Failure:_ The target has the Frightened condition until the end of your next turn.
  > 
  > > **Dreaded Necrosis**: Once per turn when you hit a creature and deal Necrotic damage while transformed, you can roll one additional damage die.

#### Realistic Combined Class Stacks (1)

* **Stack: WARLOCK (undeadPatron) + [Dreaded Necrosis]**
  > **Form of Dread.** Choose one of the following: _Duration:_ 1 minute.
  > 
  > > **Facsimile of Life**: You gain 1d10+8 Temporary Hit Points.
  > 
  > > **Fearless Form**: You gain immunity to the Frightened condition; if Frightened when you transform, the condition immediately ends for you.
  > 
  > > **Frightful Avatar**: _Trigger:_ Once per turn, when you hit a creature with an attack roll. _Response:_ _Wisdom Saving Throw:_ DC 15, the target. _Failure:_ The target has the Frightened condition until the end of your next turn.
  > 
  > > **Dreaded Necrosis**: Once per turn when you hit a creature and deal Necrotic damage while transformed, you can roll one additional damage die.

---

### Command Vestige (`commandVestige`)

- **Source File:** [`data/classes/subclasses/warlock/vestigePatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/vestigePatron.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Command Vestige.** Command your Vestige to take an action in its stat block (it otherwise only Dodges). _Range:_ 60 feet.

---

## Subclass Features (wizard)

### Arcane Ward (`arcaneWard`)

- **Source File:** [`data/classes/subclasses/wizard/abjurer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/abjurer.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `limited`

#### Baseline Prose

> **Arcane Ward.** _Trigger:_ When you cast an Abjuration spell with a spell slot. _Response:_ You create a ward with 19 Hit Points that absorbs damage taken; regains HP equal to twice the level of Abjuration spells cast or spell slots expended as a Bonus Action.

---

### Projected Ward (`projectedWard`)

- **Source File:** [`data/classes/subclasses/wizard/abjurer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/abjurer.yml)
- **Time:** `reaction` | **Range:** `30 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Projected Ward.** _Trigger:_ When a creature that you can see within 30 feet takes damage. _Response:_ You cause your Arcane Ward to absorb that damage. _Range:_ 30 feet.

---

### Bladesong (`bladesong`)

- **Source File:** [`data/classes/subclasses/wizard/bladesinger.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/bladesinger.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `bladesong`

#### Baseline Prose

> **Bladesong.** You gain a +1 bonus to AC and add a 3 bonus to Concentration saving throws, and your speed increases by 10 feet, you gain Advantage on Acrobatics checks, and whenever you attack with a weapon with which you have proficiency, you can do so with a +7 attack roll and a +3 damage bonus. _Duration:_ 1 minute.

---

### Portent (`portent`)

- **Source File:** [`data/classes/subclasses/wizard/diviner.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/diviner.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Portent.** _Trigger:_ Whenever you finish a Long Rest. _Response:_ You roll 2d20s and record the numbers; replace any D20 Test made by you or a creature you see with one of these foretelling rolls.

---

### Grim Harvest (`grimHarvest`)

- **Source File:** [`data/classes/subclasses/wizard/necromancer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/necromancer.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Grim Harvest.** _Trigger:_ When you cast a Necromancy spell using a spell slot. _Response:_ One undead creature within 60 feet regains 9 Hit Points.

---

## Core Activities

### Dash (`dash`)

- **Source File:** [`data/core/coreActivities/dash.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/dash.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Dash.** You gain extra movement for the current turn. Your Speed increases by 30.

---

### Disengage (`disengage`)

- **Source File:** [`data/core/coreActivities/disengage.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/disengage.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Disengage.** Your movement doesn't provoke Opportunity Attacks for the rest of the current turn.

---

### Dodge (`dodge`)

- **Source File:** [`data/core/coreActivities/dodge.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/dodge.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `1 round`

#### Baseline Prose

> **Dodge.** Any attack roll made against you has Disadvantage if you can see the attacker, and you make Dexterity saving throws with Advantage. _Duration:_ 1 round.

---

### Help (`help`)

- **Source File:** [`data/core/coreActivities/help.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/help.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Help.** You do one of the following.

---

### Hide (`hide`)

- **Source File:** [`data/core/coreActivities/hide.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/hide.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Hide.** You try to conceal yourself while you're Heavily Obscured or behind Three-Quarters Cover or Total Cover. Make a +5 DC 15 Dexterity (Stealth) check. On a succesful check, you have the Invisible condition until you make a sound louder than a whisper, an enemy finds you, you make an attack roll, or you cast a spell with a Verbal component.

---

### Influence (`influence`)

- **Source File:** [`data/core/coreActivities/influence.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/influence.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Influence.** You make a Wisdom or Charisma check to urge a creature or group of creatures to do something.

---

### Long Rest (`longRest`)

- **Source File:** [`data/core/coreActivities/longRest.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/longRest.yml)
- **Time:** `8 hours` | **Range:** `self` | **Duration:** `instantaneous`
- **Tags:** `restActivity`

#### Baseline Prose

> **Long Rest.** A Long Rest is a period of extended downtime—at least 8 hours—available to any creature. During a Long Rest, you sleep for at least 6 hours and perform no more than 2 hours of light activity, such as reading, talking, eating, or standing watch.

---

### Opportunity Attack (`opportunityAttack`)

- **Source File:** [`data/core/coreActivities/opportunityAttack.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/opportunityAttack.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Opportunity Attack.** _Trigger:_ When a creature leaves your reach. _Response:_ You take an additional weapon attack.

#### Individual Feature Modifications (2)

* **+ Oath of Vengeance** *(from [`data/classes/subclasses/paladin/oathOfVengeance.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/paladin/oathOfVengeance.yml))*
  > **Opportunity Attack.** _Trigger:_ When a creature leaves your reach. _Response:_ You take an additional weapon attack. On a hit, you can reduce the creature's Speed to 0 until the end of the current turn, then move up to half your Speed as part of the same Reaction without provoking Opportunity Attacks, and take an additional weapon attack.

* **+ Halt** *(from [`data/feats/general/sentinel.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sentinel.yml))*
  > **Opportunity Attack.** _Trigger:_ When a creature leaves your reach. _Response:_ You take an additional weapon attack. The target's base Speed becomes 0.

#### Realistic Combined Class Stacks (1)

* **Stack: PALADIN (oathOfVengeance) + [Halt, Oath of Vengeance]**
  > **Opportunity Attack.** _Trigger:_ When a creature leaves your reach. _Response:_ You take an additional weapon attack. On a hit, you can reduce the creature's Speed to 0 until the end of the current turn, then move up to half your Speed as part of the same Reaction without provoking Opportunity Attacks, and take an additional weapon attack. The target's base Speed becomes 0, and take an additional weapon attack. On a hit, you can reduce the creature's Speed to 0 until the end of the current turn, then move up to half your Speed as part of the same Reaction without provoking Opportunity Attacks.

---

### Ready (`ready`)

- **Source File:** [`data/core/coreActivities/ready.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/ready.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Ready.** You take the Ready action to wait for a particular circumstance before you act. To do so, you take this action on your turn, which lets you act by taking a Reaction before the start of your next turn.

---

### Search (`search`)

- **Source File:** [`data/core/coreActivities/search.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/search.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Search.** You make a Wisdom check to discern something that isn't obvious.

---

### Short Rest (`shortRest`)

- **Source File:** [`data/core/coreActivities/shortRest.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/shortRest.yml)
- **Time:** `1 hour` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `hitDice`
- **Tags:** `restActivity`

#### Baseline Prose

> **Short Rest.** A Short Rest is a 1-hour period of downtime, during which a creature does nothing more strenuous than reading, talking, eating, or standing watch. To start a Short Rest, you must have at least 1 Hit Point.

---

### Study (`study`)

- **Source File:** [`data/core/coreActivities/study.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreActivities/study.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Study.** You make an Intelligence check to study your memory, a book, a clue, or another source of knowledge and call to mind an important piece of information about it.

---

## Weapons

### Battleaxe (`battleaxe`)

- **Source File:** [`data/equipment/weapons/battleaxe.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/battleaxe.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `topple`, `weaponAttack`, `slashingDamage`, `battleaxe`

#### Baseline Prose

> **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Cold damage.

* **+ Topple** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **+ Hamstring** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage, and the target has its Speed reduced by 10 feet.

* **+ Enhanced Critical** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Topple, Hamstring, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ The target has Disadvantage on its next attack roll. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: DRUID + [Topple, Hamstring, Enhanced Critical, Primal Strike]**
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target has its Speed reduced by 10 feet. _Critical Hit:_ The target has Disadvantage on its next attack roll. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: MONK (venom) + [Topple, Hamstring, Enhanced Critical, Potent Arsenal]**
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing or Acid damage, and the target has its Speed reduced by 10 feet. _Critical Hit:_ The target has Disadvantage on its next attack roll. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: RANGER (feyWanderer) + [Topple, Hamstring, Enhanced Critical, Dreadful Strikes]**
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Psychic damage, and the target has its Speed reduced by 10 feet. _Critical Hit:_ The target has Disadvantage on its next attack roll. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: RANGER (winterWalker) + [Topple, Hamstring, Enhanced Critical, Polar Strikes]**
  > **Battleaxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Cold damage, and the target has its Speed reduced by 10 feet. _Critical Hit:_ The target has Disadvantage on its next attack roll. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

---

### Blowgun (`blowgun`)

- **Source File:** [`data/equipment/weapons/blowgun.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/blowgun.yml)
- **Time:** `action` | **Range:** `25 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `ranged`, `vex`, `weaponAttack`, `piercingDamage`, `blowgun`

#### Baseline Prose

> **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+2 Piercing damage.

#### Individual Feature Modifications (10)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+2 Piercing damage plus 1d4 Cold damage.

* **+ Vex** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+2 Piercing damage, and attack rolls against the target have Advantage.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+2 Piercing damage. _Critical Hit:_ 1d6 damage.

* **+ Precision Shot** *(from [`data/feats/general/sharpshooter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sharpshooter.yml))*
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+5 Piercing damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Vex, Puncture, Enhanced Critical, Precision Shot, Divine Strike, Pull of Death]**
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+5 Piercing damage plus 1d8 Necrotic or Radiant damage, attack rolls against the target have Advantage, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Vex, Puncture, Enhanced Critical, Precision Shot, Primal Strike]**
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+5 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Vex, Puncture, Enhanced Critical, Precision Shot, Potent Arsenal]**
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+5 Piercing or Acid damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Vex, Puncture, Enhanced Critical, Precision Shot, Dreadful Strikes]**
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+5 Piercing damage plus 1d4 Psychic damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Vex, Puncture, Enhanced Critical, Precision Shot, Polar Strikes]**
  > **Blowgun.** _Ranged Attack Roll:_ +5, range 25 feet. _Hit:_ 1d6+5 Piercing damage plus 1d4 Cold damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Club (`club`)

- **Source File:** [`data/equipment/weapons/club.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/club.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `melee`, `slow`, `light`, `weaponAttack`, `bludgeoningDamage`, `club`

#### Baseline Prose

> **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d4 Cold damage.

* **+ Slow** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage, and the target has its Speed reduced by 10 feet.

* **+ Push** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage, and the target is pushed up to 5 feet away.

* **+ Enhanced Critical** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage. _Critical Hit:_ Attack rolls against the target have Advantage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Slow, Push, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet and is pushed up to 5 feet away, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: DRUID + [Slow, Push, Enhanced Critical, Primal Strike]**
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target has its Speed reduced by 10 feet and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: MONK (venom) + [Slow, Push, Enhanced Critical, Potent Arsenal]**
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning or Acid damage, and the target has its Speed reduced by 10 feet and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (feyWanderer) + [Slow, Push, Enhanced Critical, Dreadful Strikes]**
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d4 Psychic damage, and the target has its Speed reduced by 10 feet and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (winterWalker) + [Slow, Push, Enhanced Critical, Polar Strikes]**
  > **Club.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d4 Cold damage, and the target has its Speed reduced by 10 feet and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

---

### Dagger (`dagger`)

- **Source File:** [`data/equipment/weapons/dagger.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/dagger.yml)
- **Time:** `action` | **Range:** `20 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `melee`, `finesse`, `nick`, `light`, `weaponAttack`, `piercingDamage`, `dagger`

#### Baseline Prose

> **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d4 Cold damage.

* **+ Nick** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage, and take an additional weapon attack.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage. _Critical Hit:_ 1d6 damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Nick, Puncture, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d8 Necrotic or Radiant damage, you can reroll one of the damage dice, once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage, and take an additional weapon attack. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Nick, Puncture, Enhanced Critical, Primal Strike]**
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, you can reroll one of the damage dice, and take an additional weapon attack. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Nick, Puncture, Enhanced Critical, Potent Arsenal]**
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing or Acid damage, you can reroll one of the damage dice, and take an additional weapon attack. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Nick, Puncture, Enhanced Critical, Dreadful Strikes]**
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d4 Psychic damage, you can reroll one of the damage dice, and take an additional weapon attack. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Nick, Puncture, Enhanced Critical, Polar Strikes]**
  > **Dagger.** _Finesse Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d4 Cold damage, you can reroll one of the damage dice, and take an additional weapon attack. _Critical Hit:_ 1d6 damage.

---

### Dart (`dart`)

- **Source File:** [`data/equipment/weapons/dart.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/dart.yml)
- **Time:** `action` | **Range:** `20 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `ranged`, `vex`, `weaponAttack`, `piercingDamage`, `dart`

#### Baseline Prose

> **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage.

#### Individual Feature Modifications (10)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage plus 1d4 Cold damage.

* **+ Vex** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage, and attack rolls against the target have Advantage.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+2 Piercing damage. _Critical Hit:_ 1d6 damage.

* **+ Precision Shot** *(from [`data/feats/general/sharpshooter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sharpshooter.yml))*
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+5 Piercing damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Vex, Puncture, Enhanced Critical, Precision Shot, Divine Strike, Pull of Death]**
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+5 Piercing damage plus 1d8 Necrotic or Radiant damage, attack rolls against the target have Advantage, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Vex, Puncture, Enhanced Critical, Precision Shot, Primal Strike]**
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+5 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Vex, Puncture, Enhanced Critical, Precision Shot, Potent Arsenal]**
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+5 Piercing or Acid damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Vex, Puncture, Enhanced Critical, Precision Shot, Dreadful Strikes]**
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+5 Piercing damage plus 1d4 Psychic damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Vex, Puncture, Enhanced Critical, Precision Shot, Polar Strikes]**
  > **Dart.** _Ranged Attack Roll:_ +5, range 20 feet. _Hit:_ 1d4+5 Piercing damage plus 1d4 Cold damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Flail (`flail`)

- **Source File:** [`data/equipment/weapons/flail.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/flail.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `sap`, `weaponAttack`, `bludgeoningDamage`, `flail`

#### Baseline Prose

> **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Cold damage.

* **+ Sap** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage, and the target has Disadvantage on its next attack roll.

* **+ Push** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage, and the target is pushed up to 5 feet away.

* **+ Enhanced Critical** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage. _Critical Hit:_ Attack rolls against the target have Advantage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Sap, Push, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, the target has Disadvantage on its next attack roll and is pushed up to 5 feet away, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: DRUID + [Sap, Push, Enhanced Critical, Primal Strike]**
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target has Disadvantage on its next attack roll and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: MONK (venom) + [Sap, Push, Enhanced Critical, Potent Arsenal]**
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning or Acid damage, and the target has Disadvantage on its next attack roll and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (feyWanderer) + [Sap, Push, Enhanced Critical, Dreadful Strikes]**
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Psychic damage, and the target has Disadvantage on its next attack roll and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (winterWalker) + [Sap, Push, Enhanced Critical, Polar Strikes]**
  > **Flail.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Cold damage, and the target has Disadvantage on its next attack roll and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

---

### Glaive (`glaive`)

- **Source File:** [`data/equipment/weapons/glaive.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/glaive.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `graze`, `twoHanded`, `weaponAttack`, `slashingDamage`, `glaive`

#### Baseline Prose

> **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Cold damage.

* **+ Graze** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage. _Miss:_ 3 damage.

* **+ Hamstring** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage, and the target has its Speed reduced by 10 feet.

* **+ Enhanced Critical** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Graze, Hamstring, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Miss:_ 3 damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: DRUID + [Graze, Hamstring, Enhanced Critical, Primal Strike]**
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target has its Speed reduced by 10 feet. _Miss:_ 3 damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: MONK (venom) + [Graze, Hamstring, Enhanced Critical, Potent Arsenal]**
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing or Acid damage, and the target has its Speed reduced by 10 feet. _Miss:_ 3 damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (feyWanderer) + [Graze, Hamstring, Enhanced Critical, Dreadful Strikes]**
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Psychic damage, and the target has its Speed reduced by 10 feet. _Miss:_ 3 damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (winterWalker) + [Graze, Hamstring, Enhanced Critical, Polar Strikes]**
  > **Glaive.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Cold damage, and the target has its Speed reduced by 10 feet. _Miss:_ 3 damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

---

### Greataxe (`greataxe`)

- **Source File:** [`data/equipment/weapons/greataxe.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/greataxe.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `cleave`, `twoHanded`, `weaponAttack`, `slashingDamage`, `greataxe`

#### Baseline Prose

> **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage plus 1d4 Cold damage.

* **+ Cleave** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage, and take an additional weapon attack.

* **+ Hamstring** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage, and the target has its Speed reduced by 10 feet.

* **+ Enhanced Critical** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Cleave, Hamstring, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: DRUID + [Cleave, Hamstring, Enhanced Critical, Primal Strike]**
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: MONK (venom) + [Cleave, Hamstring, Enhanced Critical, Potent Arsenal]**
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing or Acid damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (feyWanderer) + [Cleave, Hamstring, Enhanced Critical, Dreadful Strikes]**
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage plus 1d4 Psychic damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (winterWalker) + [Cleave, Hamstring, Enhanced Critical, Polar Strikes]**
  > **Greataxe.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d12+4 Slashing damage plus 1d4 Cold damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

---

### Greatclub (`greatclub`)

- **Source File:** [`data/equipment/weapons/greatclub.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/greatclub.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `melee`, `push`, `twoHanded`, `weaponAttack`, `bludgeoningDamage`, `greatclub`

#### Baseline Prose

> **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Cold damage.

* **+ Push** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage, and the target is pushed up to 10 feet away.

* **+ Push** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage, and the target is pushed up to 5 feet away.

* **+ Enhanced Critical** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage. _Critical Hit:_ Attack rolls against the target have Advantage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Push, Push, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, the target is pushed up to 15 feet away, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: DRUID + [Push, Push, Enhanced Critical, Primal Strike]**
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target is pushed up to 15 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: MONK (venom) + [Push, Push, Enhanced Critical, Potent Arsenal]**
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning or Acid damage, and the target is pushed up to 15 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (feyWanderer) + [Push, Push, Enhanced Critical, Dreadful Strikes]**
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Psychic damage, and the target is pushed up to 15 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (winterWalker) + [Push, Push, Enhanced Critical, Polar Strikes]**
  > **Greatclub.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Cold damage, and the target is pushed up to 15 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

---

### Greatsword (`greatsword`)

- **Source File:** [`data/equipment/weapons/greatsword.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/greatsword.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `graze`, `twoHanded`, `weaponAttack`, `slashingDamage`, `greatsword`

#### Baseline Prose

> **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage plus 1d4 Cold damage.

* **+ Graze** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage. _Miss:_ 3 damage.

* **+ Hamstring** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage, and the target has its Speed reduced by 10 feet.

* **+ Enhanced Critical** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Graze, Hamstring, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Miss:_ 3 damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: DRUID + [Graze, Hamstring, Enhanced Critical, Primal Strike]**
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target has its Speed reduced by 10 feet. _Miss:_ 3 damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: MONK (venom) + [Graze, Hamstring, Enhanced Critical, Potent Arsenal]**
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing or Acid damage, and the target has its Speed reduced by 10 feet. _Miss:_ 3 damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (feyWanderer) + [Graze, Hamstring, Enhanced Critical, Dreadful Strikes]**
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage plus 1d4 Psychic damage, and the target has its Speed reduced by 10 feet. _Miss:_ 3 damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (winterWalker) + [Graze, Hamstring, Enhanced Critical, Polar Strikes]**
  > **Greatsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Slashing damage plus 1d4 Cold damage, and the target has its Speed reduced by 10 feet. _Miss:_ 3 damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

---

### Halberd (`halberd`)

- **Source File:** [`data/equipment/weapons/halberd.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/halberd.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `cleave`, `twoHanded`, `weaponAttack`, `slashingDamage`, `halberd`

#### Baseline Prose

> **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Cold damage.

* **+ Cleave** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage, and take an additional weapon attack.

* **+ Hamstring** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage, and the target has its Speed reduced by 10 feet.

* **+ Enhanced Critical** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Cleave, Hamstring, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: DRUID + [Cleave, Hamstring, Enhanced Critical, Primal Strike]**
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: MONK (venom) + [Cleave, Hamstring, Enhanced Critical, Potent Arsenal]**
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing or Acid damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (feyWanderer) + [Cleave, Hamstring, Enhanced Critical, Dreadful Strikes]**
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Psychic damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (winterWalker) + [Cleave, Hamstring, Enhanced Critical, Polar Strikes]**
  > **Halberd.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Cold damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

---

### Hand Crossbow (`handCrossbow`)

- **Source File:** [`data/equipment/weapons/handCrossbow.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/handCrossbow.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `ranged`, `vex`, `light`, `weaponAttack`, `piercingDamage`, `handCrossbow`

#### Baseline Prose

> **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+2 Piercing damage.

#### Individual Feature Modifications (10)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+2 Piercing damage plus 1d4 Cold damage.

* **+ Vex** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+2 Piercing damage, and attack rolls against the target have Advantage.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+2 Piercing damage. _Critical Hit:_ 1d6 damage.

* **+ Precision Shot** *(from [`data/feats/general/sharpshooter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sharpshooter.yml))*
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+5 Piercing damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Vex, Puncture, Enhanced Critical, Precision Shot, Divine Strike, Pull of Death]**
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+5 Piercing damage plus 1d8 Necrotic or Radiant damage, attack rolls against the target have Advantage, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Vex, Puncture, Enhanced Critical, Precision Shot, Primal Strike]**
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+5 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Vex, Puncture, Enhanced Critical, Precision Shot, Potent Arsenal]**
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+5 Piercing or Acid damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Vex, Puncture, Enhanced Critical, Precision Shot, Dreadful Strikes]**
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+5 Piercing damage plus 1d4 Psychic damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Vex, Puncture, Enhanced Critical, Precision Shot, Polar Strikes]**
  > **Hand Crossbow.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d6+5 Piercing damage plus 1d4 Cold damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Handaxe (`handaxe`)

- **Source File:** [`data/equipment/weapons/handaxe.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/handaxe.yml)
- **Time:** `action` | **Range:** `20 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `melee`, `vex`, `light`, `weaponAttack`, `slashingDamage`, `handaxe`

#### Baseline Prose

> **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage plus 1d4 Cold damage.

* **+ Vex** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage, and attack rolls against the target have Advantage.

* **+ Hamstring** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage, and the target has its Speed reduced by 10 feet.

* **+ Enhanced Critical** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Vex, Hamstring, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, attack rolls against the target have Advantage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: DRUID + [Vex, Hamstring, Enhanced Critical, Primal Strike]**
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has its Speed reduced by 10 feet, and attack rolls against the target have Advantage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: MONK (venom) + [Vex, Hamstring, Enhanced Critical, Potent Arsenal]**
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing or Acid damage, the target has its Speed reduced by 10 feet, and attack rolls against the target have Advantage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (feyWanderer) + [Vex, Hamstring, Enhanced Critical, Dreadful Strikes]**
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage plus 1d4 Psychic damage, the target has its Speed reduced by 10 feet, and attack rolls against the target have Advantage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (winterWalker) + [Vex, Hamstring, Enhanced Critical, Polar Strikes]**
  > **Handaxe.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d6+4 Slashing damage plus 1d4 Cold damage, the target has its Speed reduced by 10 feet, and attack rolls against the target have Advantage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

---

### Heavy Crossbow (`heavyCrossbow`)

- **Source File:** [`data/equipment/weapons/heavyCrossbow.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/heavyCrossbow.yml)
- **Time:** `action` | **Range:** `100 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `ranged`, `push`, `twoHanded`, `weaponAttack`, `piercingDamage`, `heavyCrossbow`

#### Baseline Prose

> **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+2 Piercing damage.

#### Individual Feature Modifications (10)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+2 Piercing damage plus 1d4 Cold damage.

* **+ Push** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+2 Piercing damage, and the target is pushed up to 10 feet away.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+2 Piercing damage. _Critical Hit:_ 1d6 damage.

* **+ Precision Shot** *(from [`data/feats/general/sharpshooter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sharpshooter.yml))*
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+5 Piercing damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Push, Puncture, Enhanced Critical, Precision Shot, Divine Strike, Pull of Death]**
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+5 Piercing damage plus 1d8 Necrotic or Radiant damage, the target is pushed up to 10 feet away, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Push, Puncture, Enhanced Critical, Precision Shot, Primal Strike]**
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+5 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target is pushed up to 10 feet away, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Push, Puncture, Enhanced Critical, Precision Shot, Potent Arsenal]**
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+5 Piercing or Acid damage, the target is pushed up to 10 feet away, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Push, Puncture, Enhanced Critical, Precision Shot, Dreadful Strikes]**
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+5 Piercing damage plus 1d4 Psychic damage, the target is pushed up to 10 feet away, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Push, Puncture, Enhanced Critical, Precision Shot, Polar Strikes]**
  > **Heavy Crossbow.** _Ranged Attack Roll:_ +5, range 100 feet. _Hit:_ 1d10+5 Piercing damage plus 1d4 Cold damage, the target is pushed up to 10 feet away, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Javelin (`javelin`)

- **Source File:** [`data/equipment/weapons/javelin.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/javelin.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `melee`, `slow`, `weaponAttack`, `piercingDamage`, `javelin`

#### Baseline Prose

> **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage plus 1d4 Cold damage.

* **+ Slow** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage, and the target has its Speed reduced by 10 feet.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage. _Critical Hit:_ 1d6 damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Slow, Puncture, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Slow, Puncture, Enhanced Critical, Primal Strike]**
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Slow, Puncture, Enhanced Critical, Potent Arsenal]**
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing or Acid damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Slow, Puncture, Enhanced Critical, Dreadful Strikes]**
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage plus 1d4 Psychic damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Slow, Puncture, Enhanced Critical, Polar Strikes]**
  > **Javelin.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 1d6+4 Piercing damage plus 1d4 Cold damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Lance (`lance`)

- **Source File:** [`data/equipment/weapons/lance.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/lance.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `topple`, `twoHanded`, `weaponAttack`, `piercingDamage`, `lance`

#### Baseline Prose

> **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Cold damage.

* **+ Topple** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage. _Critical Hit:_ 1d6 damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Topple, Puncture, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Necrotic or Radiant damage, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: DRUID + [Topple, Puncture, Enhanced Critical, Primal Strike]**
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: MONK (venom) + [Topple, Puncture, Enhanced Critical, Potent Arsenal]**
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing or Acid damage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: RANGER (feyWanderer) + [Topple, Puncture, Enhanced Critical, Dreadful Strikes]**
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Psychic damage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: RANGER (winterWalker) + [Topple, Puncture, Enhanced Critical, Polar Strikes]**
  > **Lance.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Cold damage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

---

### Light Crossbow (`lightCrossbow`)

- **Source File:** [`data/equipment/weapons/lightCrossbow.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/lightCrossbow.yml)
- **Time:** `action` | **Range:** `80 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `ranged`, `slow`, `twoHanded`, `weaponAttack`, `piercingDamage`, `lightCrossbow`

#### Baseline Prose

> **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+2 Piercing damage.

#### Individual Feature Modifications (10)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+2 Piercing damage plus 1d4 Cold damage.

* **+ Slow** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+2 Piercing damage, and the target has its Speed reduced by 10 feet.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+2 Piercing damage. _Critical Hit:_ 1d6 damage.

* **+ Precision Shot** *(from [`data/feats/general/sharpshooter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sharpshooter.yml))*
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+5 Piercing damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Slow, Puncture, Enhanced Critical, Precision Shot, Divine Strike, Pull of Death]**
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+5 Piercing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Slow, Puncture, Enhanced Critical, Precision Shot, Primal Strike]**
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+5 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Slow, Puncture, Enhanced Critical, Precision Shot, Potent Arsenal]**
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+5 Piercing or Acid damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Slow, Puncture, Enhanced Critical, Precision Shot, Dreadful Strikes]**
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+5 Piercing damage plus 1d4 Psychic damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Slow, Puncture, Enhanced Critical, Precision Shot, Polar Strikes]**
  > **Light Crossbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d8+5 Piercing damage plus 1d4 Cold damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Light Hammer (`lightHammer`)

- **Source File:** [`data/equipment/weapons/lightHammer.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/lightHammer.yml)
- **Time:** `action` | **Range:** `20 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `melee`, `nick`, `light`, `weaponAttack`, `bludgeoningDamage`, `lightHammer`

#### Baseline Prose

> **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d4 Cold damage.

* **+ Nick** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage, and take an additional weapon attack.

* **+ Push** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage, and the target is pushed up to 5 feet away.

* **+ Enhanced Critical** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage. _Critical Hit:_ Attack rolls against the target have Advantage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Nick, Push, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, the target is pushed up to 5 feet away, once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage, and take an additional weapon attack. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: DRUID + [Nick, Push, Enhanced Critical, Primal Strike]**
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target is pushed up to 5 feet away, and take an additional weapon attack. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: MONK (venom) + [Nick, Push, Enhanced Critical, Potent Arsenal]**
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning or Acid damage, the target is pushed up to 5 feet away, and take an additional weapon attack. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (feyWanderer) + [Nick, Push, Enhanced Critical, Dreadful Strikes]**
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d4 Psychic damage, the target is pushed up to 5 feet away, and take an additional weapon attack. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (winterWalker) + [Nick, Push, Enhanced Critical, Polar Strikes]**
  > **Light Hammer.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d4+4 Bludgeoning damage plus 1d4 Cold damage, the target is pushed up to 5 feet away, and take an additional weapon attack. _Critical Hit:_ Attack rolls against the target have Advantage.

---

### Longbow (`longbow`)

- **Source File:** [`data/equipment/weapons/longbow.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/longbow.yml)
- **Time:** `action` | **Range:** `150 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `ranged`, `slow`, `twoHanded`, `weaponAttack`, `piercingDamage`, `longbow`

#### Baseline Prose

> **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+2 Piercing damage.

#### Individual Feature Modifications (10)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+2 Piercing damage plus 1d4 Cold damage.

* **+ Slow** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+2 Piercing damage, and the target has its Speed reduced by 10 feet.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+2 Piercing damage. _Critical Hit:_ 1d6 damage.

* **+ Precision Shot** *(from [`data/feats/general/sharpshooter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sharpshooter.yml))*
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+5 Piercing damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Slow, Puncture, Enhanced Critical, Precision Shot, Divine Strike, Pull of Death]**
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+5 Piercing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Slow, Puncture, Enhanced Critical, Precision Shot, Primal Strike]**
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+5 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Slow, Puncture, Enhanced Critical, Precision Shot, Potent Arsenal]**
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+5 Piercing or Acid damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Slow, Puncture, Enhanced Critical, Precision Shot, Dreadful Strikes]**
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+5 Piercing damage plus 1d4 Psychic damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Slow, Puncture, Enhanced Critical, Precision Shot, Polar Strikes]**
  > **Longbow.** _Ranged Attack Roll:_ +5, range 150 feet. _Hit:_ 1d8+5 Piercing damage plus 1d4 Cold damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Longsword (`longsword`)

- **Source File:** [`data/equipment/weapons/longsword.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/longsword.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `sap`, `weaponAttack`, `slashingDamage`, `longsword`

#### Baseline Prose

> **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Cold damage.

* **+ Sap** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage, and the target has Disadvantage on its next attack roll.

* **+ Hamstring** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage, and the target has its Speed reduced by 10 feet.

* **+ Enhanced Critical** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Sap, Hamstring, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet and has Disadvantage on its next attack roll, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: DRUID + [Sap, Hamstring, Enhanced Critical, Primal Strike]**
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target has its Speed reduced by 10 feet and has Disadvantage on its next attack roll. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: MONK (venom) + [Sap, Hamstring, Enhanced Critical, Potent Arsenal]**
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing or Acid damage, and the target has its Speed reduced by 10 feet and has Disadvantage on its next attack roll. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (feyWanderer) + [Sap, Hamstring, Enhanced Critical, Dreadful Strikes]**
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Psychic damage, and the target has its Speed reduced by 10 feet and has Disadvantage on its next attack roll. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (winterWalker) + [Sap, Hamstring, Enhanced Critical, Polar Strikes]**
  > **Longsword.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Slashing damage plus 1d4 Cold damage, and the target has its Speed reduced by 10 feet and has Disadvantage on its next attack roll. _Critical Hit:_ The target has Disadvantage on its next attack roll.

---

### Mace (`mace`)

- **Source File:** [`data/equipment/weapons/mace.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/mace.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `melee`, `sap`, `weaponAttack`, `bludgeoningDamage`, `mace`

#### Baseline Prose

> **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage plus 1d4 Cold damage.

* **+ Sap** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage, and the target has Disadvantage on its next attack roll.

* **+ Push** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage, and the target is pushed up to 5 feet away.

* **+ Enhanced Critical** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage. _Critical Hit:_ Attack rolls against the target have Advantage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Sap, Push, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, the target has Disadvantage on its next attack roll and is pushed up to 5 feet away, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: DRUID + [Sap, Push, Enhanced Critical, Primal Strike]**
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target has Disadvantage on its next attack roll and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: MONK (venom) + [Sap, Push, Enhanced Critical, Potent Arsenal]**
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning or Acid damage, and the target has Disadvantage on its next attack roll and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (feyWanderer) + [Sap, Push, Enhanced Critical, Dreadful Strikes]**
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage plus 1d4 Psychic damage, and the target has Disadvantage on its next attack roll and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (winterWalker) + [Sap, Push, Enhanced Critical, Polar Strikes]**
  > **Mace.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d6+4 Bludgeoning damage plus 1d4 Cold damage, and the target has Disadvantage on its next attack roll and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

---

### Maul (`maul`)

- **Source File:** [`data/equipment/weapons/maul.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/maul.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `topple`, `twoHanded`, `weaponAttack`, `bludgeoningDamage`, `maul`

#### Baseline Prose

> **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage plus 1d4 Cold damage.

* **+ Topple** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **+ Push** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage, and the target is pushed up to 5 feet away.

* **+ Enhanced Critical** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage. _Critical Hit:_ Attack rolls against the target have Advantage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Topple, Push, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, the target is pushed up to 5 feet away, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ Attack rolls against the target have Advantage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: DRUID + [Topple, Push, Enhanced Critical, Primal Strike]**
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: MONK (venom) + [Topple, Push, Enhanced Critical, Potent Arsenal]**
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning or Acid damage, and the target is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: RANGER (feyWanderer) + [Topple, Push, Enhanced Critical, Dreadful Strikes]**
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage plus 1d4 Psychic damage, and the target is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: RANGER (winterWalker) + [Topple, Push, Enhanced Critical, Polar Strikes]**
  > **Maul.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d6+4 Bludgeoning damage plus 1d4 Cold damage, and the target is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

---

### Morningstar (`morningstar`)

- **Source File:** [`data/equipment/weapons/morningstar.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/morningstar.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `sap`, `weaponAttack`, `piercingDamage`, `morningstar`

#### Baseline Prose

> **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage plus 1d4 Cold damage.

* **+ Sap** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage, and the target has Disadvantage on its next attack roll.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage. _Critical Hit:_ 1d6 damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Sap, Puncture, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage plus 1d8 Necrotic or Radiant damage, the target has Disadvantage on its next attack roll, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Sap, Puncture, Enhanced Critical, Primal Strike]**
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Sap, Puncture, Enhanced Critical, Potent Arsenal]**
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing or Acid damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Sap, Puncture, Enhanced Critical, Dreadful Strikes]**
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage plus 1d4 Psychic damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Sap, Puncture, Enhanced Critical, Polar Strikes]**
  > **Morningstar.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Piercing damage plus 1d4 Cold damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Musket (`musket`)

- **Source File:** [`data/equipment/weapons/musket.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/musket.yml)
- **Time:** `action` | **Range:** `40 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `ranged`, `slow`, `twoHanded`, `weaponAttack`, `piercingDamage`, `musket`

#### Baseline Prose

> **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+2 Piercing damage.

#### Individual Feature Modifications (10)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+2 Piercing damage plus 1d4 Cold damage.

* **+ Slow** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+2 Piercing damage, and the target has its Speed reduced by 10 feet.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+2 Piercing damage. _Critical Hit:_ 1d6 damage.

* **+ Precision Shot** *(from [`data/feats/general/sharpshooter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sharpshooter.yml))*
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+5 Piercing damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Slow, Puncture, Enhanced Critical, Precision Shot, Divine Strike, Pull of Death]**
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+5 Piercing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Slow, Puncture, Enhanced Critical, Precision Shot, Primal Strike]**
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+5 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Slow, Puncture, Enhanced Critical, Precision Shot, Potent Arsenal]**
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+5 Piercing or Acid damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Slow, Puncture, Enhanced Critical, Precision Shot, Dreadful Strikes]**
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+5 Piercing damage plus 1d4 Psychic damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Slow, Puncture, Enhanced Critical, Precision Shot, Polar Strikes]**
  > **Musket.** _Ranged Attack Roll:_ +5, range 40 feet. _Hit:_ 1d12+5 Piercing damage plus 1d4 Cold damage, the target has its Speed reduced by 10 feet, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Pike (`pike`)

- **Source File:** [`data/equipment/weapons/pike.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/pike.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `push`, `twoHanded`, `weaponAttack`, `piercingDamage`, `pike`

#### Baseline Prose

> **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Cold damage.

* **+ Push** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage, and the target is pushed up to 10 feet away.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage. _Critical Hit:_ 1d6 damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Push, Puncture, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Necrotic or Radiant damage, the target is pushed up to 10 feet away, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Push, Puncture, Enhanced Critical, Primal Strike]**
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target is pushed up to 10 feet away, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Push, Puncture, Enhanced Critical, Potent Arsenal]**
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing or Acid damage, the target is pushed up to 10 feet away, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Push, Puncture, Enhanced Critical, Dreadful Strikes]**
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Psychic damage, the target is pushed up to 10 feet away, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Push, Puncture, Enhanced Critical, Polar Strikes]**
  > **Pike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Cold damage, the target is pushed up to 10 feet away, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Pistol (`pistol`)

- **Source File:** [`data/equipment/weapons/pistol.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/pistol.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `ranged`, `vex`, `weaponAttack`, `piercingDamage`, `pistol`

#### Baseline Prose

> **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+2 Piercing damage.

#### Individual Feature Modifications (10)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+2 Piercing damage plus 1d4 Cold damage.

* **+ Vex** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+2 Piercing damage, and attack rolls against the target have Advantage.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+2 Piercing damage. _Critical Hit:_ 1d6 damage.

* **+ Precision Shot** *(from [`data/feats/general/sharpshooter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sharpshooter.yml))*
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+5 Piercing damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Vex, Puncture, Enhanced Critical, Precision Shot, Divine Strike, Pull of Death]**
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+5 Piercing damage plus 1d8 Necrotic or Radiant damage, attack rolls against the target have Advantage, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Vex, Puncture, Enhanced Critical, Precision Shot, Primal Strike]**
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+5 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Vex, Puncture, Enhanced Critical, Precision Shot, Potent Arsenal]**
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+5 Piercing or Acid damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Vex, Puncture, Enhanced Critical, Precision Shot, Dreadful Strikes]**
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+5 Piercing damage plus 1d4 Psychic damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Vex, Puncture, Enhanced Critical, Precision Shot, Polar Strikes]**
  > **Pistol.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d10+5 Piercing damage plus 1d4 Cold damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Quarterstaff (`quarterstaff`)

- **Source File:** [`data/equipment/weapons/quarterstaff.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/quarterstaff.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `melee`, `topple`, `weaponAttack`, `bludgeoningDamage`, `quarterstaff`

#### Baseline Prose

> **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Cold damage.

* **+ Topple** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **+ Push** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage, and the target is pushed up to 5 feet away.

* **+ Enhanced Critical** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage. _Critical Hit:_ Attack rolls against the target have Advantage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Topple, Push, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, the target is pushed up to 5 feet away, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ Attack rolls against the target have Advantage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: DRUID + [Topple, Push, Enhanced Critical, Primal Strike]**
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: MONK (venom) + [Topple, Push, Enhanced Critical, Potent Arsenal]**
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning or Acid damage, and the target is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: RANGER (feyWanderer) + [Topple, Push, Enhanced Critical, Dreadful Strikes]**
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Psychic damage, and the target is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: RANGER (winterWalker) + [Topple, Push, Enhanced Critical, Polar Strikes]**
  > **Quarterstaff.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d8+4 Bludgeoning damage plus 1d4 Cold damage, and the target is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

---

### Rapier (`rapier`)

- **Source File:** [`data/equipment/weapons/rapier.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/rapier.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `finesse`, `vex`, `weaponAttack`, `piercingDamage`, `rapier`

#### Baseline Prose

> **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage plus 1d4 Cold damage.

* **+ Vex** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage, and attack rolls against the target have Advantage.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage. _Critical Hit:_ 1d6 damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Vex, Puncture, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage plus 1d8 Necrotic or Radiant damage, attack rolls against the target have Advantage, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Vex, Puncture, Enhanced Critical, Primal Strike]**
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Vex, Puncture, Enhanced Critical, Potent Arsenal]**
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing or Acid damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Vex, Puncture, Enhanced Critical, Dreadful Strikes]**
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage plus 1d4 Psychic damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Vex, Puncture, Enhanced Critical, Polar Strikes]**
  > **Rapier.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d8+2 Piercing damage plus 1d4 Cold damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Scimitar (`scimitar`)

- **Source File:** [`data/equipment/weapons/scimitar.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/scimitar.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `finesse`, `nick`, `light`, `weaponAttack`, `slashingDamage`, `scimitar`

#### Baseline Prose

> **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage plus 1d4 Cold damage.

* **+ Nick** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage, and take an additional weapon attack.

* **+ Hamstring** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage, and the target has its Speed reduced by 10 feet.

* **+ Enhanced Critical** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Nick, Hamstring, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: DRUID + [Nick, Hamstring, Enhanced Critical, Primal Strike]**
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: MONK (venom) + [Nick, Hamstring, Enhanced Critical, Potent Arsenal]**
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing or Acid damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (feyWanderer) + [Nick, Hamstring, Enhanced Critical, Dreadful Strikes]**
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage plus 1d4 Psychic damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (winterWalker) + [Nick, Hamstring, Enhanced Critical, Polar Strikes]**
  > **Scimitar.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Slashing damage plus 1d4 Cold damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

---

### Shortbow (`shortbow`)

- **Source File:** [`data/equipment/weapons/shortbow.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/shortbow.yml)
- **Time:** `action` | **Range:** `80 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `ranged`, `vex`, `twoHanded`, `weaponAttack`, `piercingDamage`, `shortbow`

#### Baseline Prose

> **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+2 Piercing damage.

#### Individual Feature Modifications (10)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+2 Piercing damage plus 1d4 Cold damage.

* **+ Vex** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+2 Piercing damage, and attack rolls against the target have Advantage.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+2 Piercing damage. _Critical Hit:_ 1d6 damage.

* **+ Precision Shot** *(from [`data/feats/general/sharpshooter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sharpshooter.yml))*
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+5 Piercing damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Vex, Puncture, Enhanced Critical, Precision Shot, Divine Strike, Pull of Death]**
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+5 Piercing damage plus 1d8 Necrotic or Radiant damage, attack rolls against the target have Advantage, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Vex, Puncture, Enhanced Critical, Precision Shot, Primal Strike]**
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+5 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Vex, Puncture, Enhanced Critical, Precision Shot, Potent Arsenal]**
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+5 Piercing or Acid damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Vex, Puncture, Enhanced Critical, Precision Shot, Dreadful Strikes]**
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+5 Piercing damage plus 1d4 Psychic damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Vex, Puncture, Enhanced Critical, Precision Shot, Polar Strikes]**
  > **Shortbow.** _Ranged Attack Roll:_ +5, range 80 feet. _Hit:_ 1d6+5 Piercing damage plus 1d4 Cold damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Shortsword (`shortsword`)

- **Source File:** [`data/equipment/weapons/shortsword.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/shortsword.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `finesse`, `vex`, `light`, `weaponAttack`, `piercingDamage`, `shortsword`

#### Baseline Prose

> **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage plus 1d4 Cold damage.

* **+ Vex** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage, and attack rolls against the target have Advantage.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage. _Critical Hit:_ 1d6 damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Vex, Puncture, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage plus 1d8 Necrotic or Radiant damage, attack rolls against the target have Advantage, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Vex, Puncture, Enhanced Critical, Primal Strike]**
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Vex, Puncture, Enhanced Critical, Potent Arsenal]**
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing or Acid damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Vex, Puncture, Enhanced Critical, Dreadful Strikes]**
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage plus 1d4 Psychic damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Vex, Puncture, Enhanced Critical, Polar Strikes]**
  > **Shortsword.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d6+2 Piercing damage plus 1d4 Cold damage, attack rolls against the target have Advantage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Sickle (`sickle`)

- **Source File:** [`data/equipment/weapons/sickle.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/sickle.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `melee`, `nick`, `light`, `weaponAttack`, `slashingDamage`, `sickle`

#### Baseline Prose

> **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage plus 1d4 Cold damage.

* **+ Nick** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage, and take an additional weapon attack.

* **+ Hamstring** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage, and the target has its Speed reduced by 10 feet.

* **+ Enhanced Critical** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Nick, Hamstring, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: DRUID + [Nick, Hamstring, Enhanced Critical, Primal Strike]**
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: MONK (venom) + [Nick, Hamstring, Enhanced Critical, Potent Arsenal]**
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing or Acid damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (feyWanderer) + [Nick, Hamstring, Enhanced Critical, Dreadful Strikes]**
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage plus 1d4 Psychic damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (winterWalker) + [Nick, Hamstring, Enhanced Critical, Polar Strikes]**
  > **Sickle.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d4+4 Slashing damage plus 1d4 Cold damage, the target has its Speed reduced by 10 feet, and take an additional weapon attack. _Critical Hit:_ The target has Disadvantage on its next attack roll.

---

### Sling (`sling`)

- **Source File:** [`data/equipment/weapons/sling.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/sling.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `ranged`, `slow`, `weaponAttack`, `bludgeoningDamage`, `sling`

#### Baseline Prose

> **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+2 Bludgeoning damage.

#### Individual Feature Modifications (10)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+2 Bludgeoning damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+2 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+2 Bludgeoning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+2 Bludgeoning or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+2 Bludgeoning damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+2 Bludgeoning damage plus 1d4 Cold damage.

* **+ Slow** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+2 Bludgeoning damage, and the target has its Speed reduced by 10 feet.

* **+ Push** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+2 Bludgeoning damage, and the target is pushed up to 5 feet away.

* **+ Enhanced Critical** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+2 Bludgeoning damage. _Critical Hit:_ Attack rolls against the target have Advantage.

* **+ Precision Shot** *(from [`data/feats/general/sharpshooter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/sharpshooter.yml))*
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+5 Bludgeoning damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Slow, Push, Enhanced Critical, Precision Shot, Divine Strike, Pull of Death]**
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+5 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet and is pushed up to 5 feet away, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: DRUID + [Slow, Push, Enhanced Critical, Precision Shot, Primal Strike]**
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+5 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target has its Speed reduced by 10 feet and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: MONK (venom) + [Slow, Push, Enhanced Critical, Precision Shot, Potent Arsenal]**
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+5 Bludgeoning or Acid damage, and the target has its Speed reduced by 10 feet and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (feyWanderer) + [Slow, Push, Enhanced Critical, Precision Shot, Dreadful Strikes]**
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+5 Bludgeoning damage plus 1d4 Psychic damage, and the target has its Speed reduced by 10 feet and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (winterWalker) + [Slow, Push, Enhanced Critical, Precision Shot, Polar Strikes]**
  > **Sling.** _Ranged Attack Roll:_ +5, range 30 feet. _Hit:_ 1d4+5 Bludgeoning damage plus 1d4 Cold damage, and the target has its Speed reduced by 10 feet and is pushed up to 5 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

---

### Spear (`spear`)

- **Source File:** [`data/equipment/weapons/spear.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/spear.yml)
- **Time:** `action` | **Range:** `20 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `melee`, `sap`, `weaponAttack`, `piercingDamage`, `spear`

#### Baseline Prose

> **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage plus 1d4 Cold damage.

* **+ Sap** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage, and the target has Disadvantage on its next attack roll.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage. _Critical Hit:_ 1d6 damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Sap, Puncture, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage plus 1d8 Necrotic or Radiant damage, the target has Disadvantage on its next attack roll, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Sap, Puncture, Enhanced Critical, Primal Strike]**
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Sap, Puncture, Enhanced Critical, Potent Arsenal]**
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing or Acid damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Sap, Puncture, Enhanced Critical, Dreadful Strikes]**
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage plus 1d4 Psychic damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Sap, Puncture, Enhanced Critical, Polar Strikes]**
  > **Spear.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d8+4 Piercing damage plus 1d4 Cold damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Trident (`trident`)

- **Source File:** [`data/equipment/weapons/trident.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/trident.yml)
- **Time:** `action` | **Range:** `20 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `topple`, `weaponAttack`, `piercingDamage`, `trident`

#### Baseline Prose

> **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Cold damage.

* **+ Topple** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage. _Critical Hit:_ 1d6 damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Topple, Puncture, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Necrotic or Radiant damage, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: DRUID + [Topple, Puncture, Enhanced Critical, Primal Strike]**
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: MONK (venom) + [Topple, Puncture, Enhanced Critical, Potent Arsenal]**
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing or Acid damage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: RANGER (feyWanderer) + [Topple, Puncture, Enhanced Critical, Dreadful Strikes]**
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Psychic damage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

* **Stack: RANGER (winterWalker) + [Topple, Puncture, Enhanced Critical, Polar Strikes]**
  > **Trident.** _Melee Attack Roll:_ +7, range 20 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Cold damage, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage. _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target is Prone.

---

### Unarmed Strike (`unarmed`)

- **Source File:** [`data/equipment/weapons/unarmed.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/unarmed.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `simple`, `melee`, `weaponAttack`, `slashingDamage`, `unarmed`, `bludgeoningDamage`

#### Baseline Prose

> **Unarmed Strike.** Choose one of the following:
> 
> > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage.
> 
> > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
> 
> > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

#### Individual Feature Modifications (12)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning or Acid damage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage plus 1d4 Psychic damage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage plus 1d4 Cold damage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **+ Push** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage, and the target is pushed up to 5 feet away.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **+ Enhanced Critical** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage. _Critical Hit:_ Attack rolls against the target have Advantage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **+ Hamstring** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage, and the target has its Speed reduced by 10 feet.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **+ Enhanced Critical** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **+ Tavern Brawler** *(from [`data/feats/origin/tavernBrawler.yml`](file:///home/gerardo/Projects/card-builder/data/feats/origin/tavernBrawler.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage, and you can reroll the damage die if it rolls a 1, and you must use the new roll.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **+ Push** *(from [`data/feats/origin/tavernBrawler.yml`](file:///home/gerardo/Projects/card-builder/data/feats/origin/tavernBrawler.yml))*
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage, and the target is pushed up to 5 feet away.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Push, Enhanced Critical, Hamstring, Enhanced Critical, Tavern Brawler, Push, Divine Strike, Pull of Death]**
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet and is pushed up to 5 feet away, you can reroll the damage die if it rolls a 1, and you must use the new roll, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ The target has Disadvantage on its next attack roll, and attack rolls against the target have Advantage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **Stack: DRUID + [Push, Enhanced Critical, Hamstring, Enhanced Critical, Tavern Brawler, Push, Primal Strike]**
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has its Speed reduced by 10 feet and is pushed up to 5 feet away, and you can reroll the damage die if it rolls a 1, and you must use the new roll. _Critical Hit:_ The target has Disadvantage on its next attack roll, and attack rolls against the target have Advantage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **Stack: MONK (venom) + [Push, Enhanced Critical, Hamstring, Enhanced Critical, Tavern Brawler, Push, Potent Arsenal]**
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning or Acid damage, the target has its Speed reduced by 10 feet and is pushed up to 5 feet away, and you can reroll the damage die if it rolls a 1, and you must use the new roll. _Critical Hit:_ The target has Disadvantage on its next attack roll, and attack rolls against the target have Advantage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **Stack: RANGER (feyWanderer) + [Push, Enhanced Critical, Hamstring, Enhanced Critical, Tavern Brawler, Push, Dreadful Strikes]**
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage plus 1d4 Psychic damage, the target has its Speed reduced by 10 feet and is pushed up to 5 feet away, and you can reroll the damage die if it rolls a 1, and you must use the new roll. _Critical Hit:_ The target has Disadvantage on its next attack roll, and attack rolls against the target have Advantage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

* **Stack: RANGER (winterWalker) + [Push, Enhanced Critical, Hamstring, Enhanced Critical, Tavern Brawler, Push, Polar Strikes]**
  > **Unarmed Strike.** Choose one of the following:
  > 
  > > **Damage**: _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 4 Bludgeoning damage plus 1d4 Cold damage, the target has its Speed reduced by 10 feet and is pushed up to 5 feet away, and you can reroll the damage die if it rolls a 1, and you must use the new roll. _Critical Hit:_ The target has Disadvantage on its next attack roll, and attack rolls against the target have Advantage.
  > 
  > > **Shove**: _Dexterity Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.
  > 
  > > **Grapple**: _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target has the Grappled condition.

---

### War Pick (`warPick`)

- **Source File:** [`data/equipment/weapons/warPick.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/warPick.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `sap`, `weaponAttack`, `piercingDamage`, `warPick`

#### Baseline Prose

> **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Cold damage.

* **+ Sap** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage, and the target has Disadvantage on its next attack roll.

* **+ Puncture** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage, and you can reroll one of the damage dice.

* **+ Enhanced Critical** *(from [`data/feats/general/piercer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/piercer.yml))*
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage. _Critical Hit:_ 1d6 damage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Sap, Puncture, Enhanced Critical, Divine Strike, Pull of Death]**
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Necrotic or Radiant damage, the target has Disadvantage on its next attack roll, you can reroll one of the damage dice, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ 1d6 damage.

* **Stack: DRUID + [Sap, Puncture, Enhanced Critical, Primal Strike]**
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: MONK (venom) + [Sap, Puncture, Enhanced Critical, Potent Arsenal]**
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing or Acid damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (feyWanderer) + [Sap, Puncture, Enhanced Critical, Dreadful Strikes]**
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Psychic damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

* **Stack: RANGER (winterWalker) + [Sap, Puncture, Enhanced Critical, Polar Strikes]**
  > **War Pick.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Piercing damage plus 1d4 Cold damage, the target has Disadvantage on its next attack roll, and you can reroll one of the damage dice. _Critical Hit:_ 1d6 damage.

---

### Warhammer (`warhammer`)

- **Source File:** [`data/equipment/weapons/warhammer.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/warhammer.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `push`, `weaponAttack`, `bludgeoningDamage`, `warhammer`

#### Baseline Prose

> **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage plus 1d4 Cold damage.

* **+ Push** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage, and the target is pushed up to 10 feet away.

* **+ Push** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage, and the target is pushed up to 5 feet away.

* **+ Enhanced Critical** *(from [`data/feats/general/crusher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/crusher.yml))*
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage. _Critical Hit:_ Attack rolls against the target have Advantage.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Push, Push, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage plus 1d8 Necrotic or Radiant damage, the target is pushed up to 15 feet away, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: DRUID + [Push, Push, Enhanced Critical, Primal Strike]**
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target is pushed up to 15 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: MONK (venom) + [Push, Push, Enhanced Critical, Potent Arsenal]**
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning or Acid damage, and the target is pushed up to 15 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (feyWanderer) + [Push, Push, Enhanced Critical, Dreadful Strikes]**
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage plus 1d4 Psychic damage, and the target is pushed up to 15 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

* **Stack: RANGER (winterWalker) + [Push, Push, Enhanced Critical, Polar Strikes]**
  > **Warhammer.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 1d10+4 Bludgeoning damage plus 1d4 Cold damage, and the target is pushed up to 15 feet away. _Critical Hit:_ Attack rolls against the target have Advantage.

---

### Whip (`whip`)

- **Source File:** [`data/equipment/weapons/whip.yml`](file:///home/gerardo/Projects/card-builder/data/equipment/weapons/whip.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`
- **Tags:** `martial`, `melee`, `finesse`, `slow`, `weaponAttack`, `slashingDamage`, `whip`

#### Baseline Prose

> **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage.

#### Individual Feature Modifications (9)

* **+ Divine Strike** *(from [`data/classes/classOptions/cleric/divineStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/divineStrike.yml))*
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage plus 1d8 Necrotic or Radiant damage.

* **+ Primal Strike** *(from [`data/classes/classOptions/druid/elementalFury/primalStrike.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/primalStrike.yml))*
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Potent Arsenal** *(from [`data/classes/subclasses/monk/venom.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/monk/venom.yml))*
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing or Acid damage.

* **+ Dreadful Strikes** *(from [`data/classes/subclasses/ranger/feyWanderer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/feyWanderer.yml))*
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage plus 1d4 Psychic damage.

* **+ Polar Strikes** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage plus 1d4 Cold damage.

* **+ Slow** *(from [`data/core/coreExtras/masteryProperties.yml`](file:///home/gerardo/Projects/card-builder/data/core/coreExtras/masteryProperties.yml))*
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage, and the target has its Speed reduced by 10 feet.

* **+ Hamstring** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage, and the target has its Speed reduced by 10 feet.

* **+ Enhanced Critical** *(from [`data/feats/general/slasher.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/slasher.yml))*
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

#### Realistic Combined Class Stacks (5)

* **Stack: CLERIC + [Slow, Hamstring, Enhanced Critical, Divine Strike, Pull of Death]**
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage plus 1d8 Necrotic or Radiant damage, the target has its Speed reduced by 10 feet, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: DRUID + [Slow, Hamstring, Enhanced Critical, Primal Strike]**
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage plus 1d8 Cold, Fire, Lightning, or Thunder damage, and the target has its Speed reduced by 10 feet. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: MONK (venom) + [Slow, Hamstring, Enhanced Critical, Potent Arsenal]**
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing or Acid damage, and the target has its Speed reduced by 10 feet. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (feyWanderer) + [Slow, Hamstring, Enhanced Critical, Dreadful Strikes]**
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage plus 1d4 Psychic damage, and the target has its Speed reduced by 10 feet. _Critical Hit:_ The target has Disadvantage on its next attack roll.

* **Stack: RANGER (winterWalker) + [Slow, Hamstring, Enhanced Critical, Polar Strikes]**
  > **Whip.** _Finesse Attack Roll:_ +5, reach 5 feet. _Hit:_ 1d4+2 Slashing damage plus 1d4 Cold damage, and the target has its Speed reduced by 10 feet. _Critical Hit:_ The target has Disadvantage on its next attack roll.

---

## Feats

### Interception (`interception`)

- **Source File:** [`data/feats/fightingStyles/interception.yml`](file:///home/gerardo/Projects/card-builder/data/feats/fightingStyles/interception.yml)
- **Time:** `reaction` | **Range:** `5 feet` | **Duration:** `Instantaneous`
- **Tags:** `fightingStyle`

#### Baseline Prose

> **Interception.** _Trigger:_ when a creature you can see hits another creature with an attack roll. _Response:_ One target of attack you touch reduces damage taken by 1d10+3. _Range:_ 5 feet.

---

### Protection (`protection`)

- **Source File:** [`data/feats/fightingStyles/protection.yml`](file:///home/gerardo/Projects/card-builder/data/feats/fightingStyles/protection.yml)
- **Time:** `reaction` | **Range:** `5 feet` | **Duration:** `Instantaneous`
- **Tags:** `fightingStyle`

#### Baseline Prose

> **Protection.** _Trigger:_ when a creature you can see attacks a target other than you. _Response:_ The target has Disadvantage on its next attack roll until the end of your next turn. _Range:_ 5 feet.

---

### Two-Weapon Fighting (`twoWeaponFighting`)

- **Source File:** [`data/feats/fightingStyles/twoWeaponFighting.yml`](file:///home/gerardo/Projects/card-builder/data/feats/fightingStyles/twoWeaponFighting.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Tags:** `fightingStyle`

#### Baseline Prose

> **Two-Weapon Fighting.** You make one attack with a different Light weapon.

---

### Unarmed Fighting (`unarmedFightingUnarmedFighting`)

- **Source File:** [`data/feats/fightingStyles/unarmedFighting.yml`](file:///home/gerardo/Projects/card-builder/data/feats/fightingStyles/unarmedFighting.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Unarmed Fighting.** _Trigger:_ When a creature starts its turn there. _Response:_ You deal 1d4 Bludgeoning damage.

---

### Charge (`chargerCharge`)

- **Source File:** [`data/feats/general/charger.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/charger.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Charge.** _Trigger:_ If you move at least 10 feet in a straight line toward the target. _Response:_ Choose one of the following:
> 
> > **Damage Bonus**: You gain a 1d8 bonus to the attack's damage roll.
> 
> > **Push**: The target is pushed up to 10 feet away.

---

### Replenishing Meal (`chefReplenishingMeal`)

- **Source File:** [`data/feats/general/chef.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/chef.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Replenishing Meal.** You prepare food for 7 creatures; eating it grants an extra 1d8 HP when spending Hit Dice during a Short Rest.

---

### Bolstering Treats (`chefBolsteringTreats`)

- **Source File:** [`data/feats/general/chef.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/chef.yml)
- **Time:** `1 hour` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Bolstering Treats.** You gain 3 Temporary Hit Points.

---

### Parry (`defensiveDuelistParry`)

- **Source File:** [`data/feats/general/defensiveDuelist.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/defensiveDuelist.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Parry.** _Trigger:_ When you are hit by an attack. _Response:_ You gain a +3 bonus to AC.

---

### Speedy Recovery (`durableSpeedyRecovery`)

- **Source File:** [`data/feats/general/durable.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/durable.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `hitDice`

#### Baseline Prose

> **Speedy Recovery.** You regain 1d8+3 Hit Points.

---

### Hew (`hew`)

- **Source File:** [`data/feats/general/greatWeaponMaster.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/greatWeaponMaster.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Hew.** _Trigger:_ When you score a critical hit, or reduce an enemy to 0 Hit Points. _Response:_ You take an additional weapon attack.

---

### Damage Reduction (`heavyArmorMasterDamageReduction`)

- **Source File:** [`data/feats/general/heavyArmorMaster.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/heavyArmorMaster.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Damage Reduction.** _Trigger:_ When you take damage. _Response:_ You reduce Bludgeoning, Piercing, or Slashing damage taken by 3.

---

### Bolstering Performance (`bolsteringPerformance`)

- **Source File:** [`data/feats/general/inspiringLeader.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/inspiringLeader.yml)
- **Time:** `10 minutes` | **Range:** `30 feet` | **Duration:** `until next short or long rest`

#### Baseline Prose

> **Bolstering Performance.** Up to 8 creatures within 30 feet gain 8 Temporary Hit Points. _Duration:_ Until next short or long rest.

---

### Guarded Mind (`mageSlayerGuardedMind`)

- **Source File:** [`data/feats/general/mageSlayer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/mageSlayer.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `limited`

#### Baseline Prose

> **Guarded Mind.** _Trigger:_ When you or a creature you can see fail a saving throw. _Response:_ You cause yourself to succeed on the saving throw instead.

---

### Brew Poison (`poisonerBrewPoison`)

- **Source File:** [`data/feats/general/poisoner.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/poisoner.yml)
- **Time:** `1 hour` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Brew Poison.** _Constitution Saving Throw:_ DC 13, the target. _Failure:_ 2d8 Poison damage, and the target has the Poisoned condition until the end of your next turn.

---

### Pole Strike (`poleStrike`)

- **Source File:** [`data/feats/general/polearmMaster.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/polearmMaster.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Pole Strike.** _Melee Attack Roll:_ +4, reach 5 feet. _Hit:_ 1d4+4 Bludgeoning damage.

---

### Shield Bash (`shieldMasterShieldBash`)

- **Source File:** [`data/feats/general/shieldMaster.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/shieldMaster.yml)
- **Time:** `bonus action` | **Range:** `5 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Shield Bash.** _Strength Saving Throw:_ DC 15, one creature within 5 feet. _Failure:_ The target is Prone.

---

### Interpose Shield (`shieldMasterInterposeShield`)

- **Source File:** [`data/feats/general/shieldMaster.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/shieldMaster.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Interpose Shield.** _Trigger:_ When you make a saving throw. _Response:_ You take no damage if you succeed on the saving throw.

---

### Telekinetic Shove (`telekineticShove`)

- **Source File:** [`data/feats/general/telekinetic.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/telekinetic.yml)
- **Time:** `bonus action` | **Range:** `30 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Telekinetic Shove.** _Strength Saving Throw:_ DC 14, one creature within 30 feet. _Failure:_ The target is pushed up to 5 feet away.

---

### Initiative Swap (`initiativeSwap`)

- **Source File:** [`data/feats/origin/alert.yml`](file:///home/gerardo/Projects/card-builder/data/feats/origin/alert.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Initiative Swap.** _Trigger:_ When you roll Initiative. _Response:_ You swap your Initiative with the Initiative of one willing ally in the same combat.

---

### Fast Crafting (`fastCrafting`)

- **Source File:** [`data/feats/origin/crafter.yml`](file:///home/gerardo/Projects/card-builder/data/feats/origin/crafter.yml)
- **Time:** `1 hour` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Fast Crafting.** When you finish a Long Rest, you craft one piece of gear from the Fast Crafting table, provided you have the Artisan's Tools associated with that item and have proficiency with those tools. The item lasts until you finish another Long Rest, at which point the item falls apart.

---

### Battle Medicine (`battleMedic`)

- **Source File:** [`data/feats/origin/healer.yml`](file:///home/gerardo/Projects/card-builder/data/feats/origin/healer.yml)
- **Time:** `action` | **Range:** `5 feet` | **Duration:** `instantaneous`

#### Baseline Prose

> **Battle Medicine.** One creature you touch regains 1d8+3 Hit Points.

---

### Luck (`luckyAdvantage`)

- **Source File:** [`data/feats/origin/lucky.yml`](file:///home/gerardo/Projects/card-builder/data/feats/origin/lucky.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `luckPoints`

#### Baseline Prose

> **Luck.** You give yourself Advantage on a d20 test or impose Disadvantage on an attack roll against you.

---

### Encouraging Song (`encouragingSong`)

- **Source File:** [`data/feats/origin/musician.yml`](file:///home/gerardo/Projects/card-builder/data/feats/origin/musician.yml)
- **Time:** `10 minutes` | **Range:** `self` | **Duration:** `instantaneous`

#### Baseline Prose

> **Encouraging Song.** You give Heroic Inspiration to 3 allies who hear the song.

---

## Miscellaneous Activities

### Healing Hands (`healingHands`)

- **Source File:** [`data/species/aasimar.yml`](file:///home/gerardo/Projects/card-builder/data/species/aasimar.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `Instantaneous`
- **Resource:** `limited`

#### Baseline Prose

> **Healing Hands.** One creature you touch regains 3d4 Hit Points.

---

### Celestial Revelation (`celestialRevelation`)

- **Source File:** [`data/species/aasimar.yml`](file:///home/gerardo/Projects/card-builder/data/species/aasimar.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `limited`

#### Baseline Prose

> **Celestial Revelation.** Choose one of the following transformations: _Duration:_ 1 minute.
> 
> > **Heavenly Wings**: You gain a Fly Speed of 30 feet, and once per turn when dealing damage with an attack or spell, deal 3 extra Radiant damage.
> 
> > **Inner Radiance**: You shed Bright Light in a 10-foot radius and Dim Light for 10 feet; at the end of each turn, each creature within 10 feet takes 3 Radiant damage, and once per turn deal 3 extra Radiant damage.
> 
> > **Necrotic Shroud**: _Charisma Saving Throw:_ DC 11, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ Each target has the Frightened condition until the end of your next turn. Once per turn when dealing damage with an attack or spell, deal 3 extra Necrotic damage.

---

### Breath Weapon (`breathWeapon`)

- **Source File:** [`data/species/dragonborn.yml`](file:///home/gerardo/Projects/card-builder/data/species/dragonborn.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `Instantaneous`
- **Resource:** `breathWeapon`

#### Baseline Prose

> **Breath Weapon.** _Dexterity Saving Throw:_ DC 14, each creature in a 15-foot-radius Cone centered on you. _Failure:_ 2d10 Fire damage. _Success:_ Half damage.

---

### Draconic Flight (`draconicFlight`)

- **Source File:** [`data/species/dragonborn.yml`](file:///home/gerardo/Projects/card-builder/data/species/dragonborn.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `limited`

#### Baseline Prose

> **Draconic Flight.** You gain a Fly Speed of 30 feet. _Duration:_ 10 minutes.

---

### Stonecunning (`stonecunning`)

- **Source File:** [`data/species/dwarf.yml`](file:///home/gerardo/Projects/card-builder/data/species/dwarf.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `stonecunning`

#### Baseline Prose

> **Stonecunning.** You gain Tremorsense with a range of 60 feet while on or touching a stone surface. _Duration:_ 10 minutes.

---

### Clockwork Device (`clockworkDevice`)

- **Source File:** [`data/species/gnome/rockGnome.yml`](file:///home/gerardo/Projects/card-builder/data/species/gnome/rockGnome.yml)
- **Time:** `10 minutes` | **Range:** `self` | **Duration:** `8 hours`

#### Baseline Prose

> **Clockwork Device.** You create a Tiny clockwork device (AC 5, 1 HP) that produces a chosen Prestidigitation effect when activated with a touch as a Bonus Action (max 3 devices). _Duration:_ 8 hours.

---

### Cloud's Jaunt (`cloudsJaunt`)

- **Source File:** [`data/species/goliath/cloud.yml`](file:///home/gerardo/Projects/card-builder/data/species/goliath/cloud.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `giantAncestry`

#### Baseline Prose

> **Cloud's Jaunt.** You teleport up to 30 feet to an unoccupied space you can see.

---

### Fire's Burn (`firesBurn`)

- **Source File:** [`data/species/goliath/fire.yml`](file:///home/gerardo/Projects/card-builder/data/species/goliath/fire.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `giantAncestry`

#### Baseline Prose

> **Fire's Burn.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 1d10 Fire damage.

---

### Frost's Chill (`frostsChill`)

- **Source File:** [`data/species/goliath/frost.yml`](file:///home/gerardo/Projects/card-builder/data/species/goliath/frost.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `giantAncestry`

#### Baseline Prose

> **Frost's Chill.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 1d6 Cold damage, and the target has its Speed reduced by 10 feet.

---

### Hill's Tumble (`hillsTumble`)

- **Source File:** [`data/species/goliath/hill.yml`](file:///home/gerardo/Projects/card-builder/data/species/goliath/hill.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `giantAncestry`

#### Baseline Prose

> **Hill's Tumble.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target is Prone.

---

### Stone's Endurance (`stonesEndurance`)

- **Source File:** [`data/species/goliath/stone.yml`](file:///home/gerardo/Projects/card-builder/data/species/goliath/stone.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `giantAncestry`

#### Baseline Prose

> **Stone's Endurance.** _Trigger:_ When you take damage. _Response:_ You reduce damage taken by 1d12+3.

---

### Storm's Thunder (`stormsThunder`)

- **Source File:** [`data/species/goliath/storm.yml`](file:///home/gerardo/Projects/card-builder/data/species/goliath/storm.yml)
- **Time:** `reaction` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `giantAncestry`

#### Baseline Prose

> **Storm's Thunder.** _Trigger:_ When you take damage. _Response:_ The target takes 1d8 Thunder damage. _Range:_ 60 feet.

---

### Large Form (`largeForm`)

- **Source File:** [`data/species/goliath.yml`](file:///home/gerardo/Projects/card-builder/data/species/goliath.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `limited`

#### Baseline Prose

> **Large Form.** You gain Advantage on Strength checks, your size becomes Large, and your Speed increases by 10 feet. _Duration:_ 10 minutes.

---

### Daunting Roar (`dauntingRoar`)

- **Source File:** [`data/species/leonin.yml`](file:///home/gerardo/Projects/card-builder/data/species/leonin.yml)
- **Time:** `bonus action` | **Range:** `10 feet` | **Duration:** `N/A`
- **Resource:** `dauntingRoar`

#### Baseline Prose

> **Daunting Roar.** _Wisdom Saving Throw:_ DC 14, creatures of your choice within 10 feet. _Failure:_ Each target has Disadvantage on its next attack roll or saving throw until the end of your next turn.

---

### Adrenaline Rush (`adrenalineRush`)

- **Source File:** [`data/species/orc.yml`](file:///home/gerardo/Projects/card-builder/data/species/orc.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `adrenalineRush`

#### Baseline Prose

> **Adrenaline Rush.** You gain 3 Temporary Hit Points. You take the Dash action.

---

### Relentless Endurance (`relentlessEndurance`)

- **Source File:** [`data/species/orc.yml`](file:///home/gerardo/Projects/card-builder/data/species/orc.yml)
- **Time:** `free action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `limited`

#### Baseline Prose

> **Relentless Endurance.** _Trigger:_ when you are reduced to 0 Hit Points but not killed outright. _Response:_ You drop to 1 Hit Point instead.

---

## Spells: Cantrips

### Acid Splash (`acidSplash`)

- **Source File:** [`data/spells/cantrips/acidSplash.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/acidSplash.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Tags:** `evocation`, `cantrip`, `artificer`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `acidDamage`

#### Baseline Prose

> **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6 Acid damage.

#### Individual Feature Modifications (6)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6+3 Acid damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6+2 Acid damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6+2 Acid damage.

* **+ Acid Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml))*
  > **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6 Acid damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6+3 Acid damage.

* **+ Artillerist** *(from [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml))*
  > **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6 Acid damage plus 1d8 damage.

#### Realistic Combined Class Stacks (5)

* **Stack: ARTIFICER + [Arcane Conduit, Alchemist]**
  > **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6+6 Acid damage.

* **Stack: ARTIFICER + [Arcane Conduit, Artillerist]**
  > **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6+3 Acid damage plus 1d8 damage.

* **Stack: CLERIC + [Potent Spellcasting]**
  > **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6+2 Acid damage.

* **Stack: DRUID + [Potent Spellcasting]**
  > **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6+2 Acid damage.

* **Stack: SORCERER + [Acid Affinity]**
  > **Acid Splash.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 2d6 Acid damage.

---

### Blade Ward (`bladeWard`)

- **Source File:** [`data/spells/cantrips/bladeWard.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/bladeWard.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Tags:** `abjuration`, `cantrip`, `bard`, `sorcerer`, `warlock`, `wizard`, `psion`

#### Baseline Prose

> **Blade Ward.** Whenever a creature makes an attack roll against you before the spell ends, the attacker subtracts 1d4 from the attack roll. _Concentration:_ Up to 1 minute.

---

### Chill Touch (`chillTouch`)

- **Source File:** [`data/spells/cantrips/chillTouch.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/chillTouch.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `instantaneous`
- **Tags:** `necromancy`, `cantrip`, `sorcerer`, `warlock`, `wizard`

#### Baseline Prose

> **Chill Touch.** _Melee Attack Roll:_ +7, reach Touch. _Hit:_ 2d10 Necrotic damage, and the target cannot regain hit points until the end of your next turn.

---

### Dancing Lights (`dancingLights`)

- **Source File:** [`data/spells/cantrips/dancingLights.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/dancingLights.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 1 minute`
- **Tags:** `illusion`, `cantrip`, `artificer`, `bard`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Dancing Lights.** You create up to four lights that hover or move at your command. _Range:_ 120 feet. _Concentration:_ Up to 1 minute.

#### Individual Feature Modifications (1)

* **+ Illusionist** *(from [`data/classes/subclasses/wizard/illusionist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/illusionist.yml))*
  > **Dancing Lights.** You create up to four lights that hover or move at your command. _Range:_ 180 feet. _Concentration:_ Up to 1 minute.

#### Realistic Combined Class Stacks (1)

* **Stack: WIZARD (illusionist) + [Illusionist]**
  > **Dancing Lights.** You create up to four lights that hover or move at your command. _Range:_ 180 feet. _Concentration:_ Up to 1 minute.

---

### Druidcraft (`druidcraft`)

- **Source File:** [`data/spells/cantrips/druidcraft.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/druidcraft.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Tags:** `transmutation`, `cantrip`, `druid`

#### Baseline Prose

> **Druidcraft.** You channel nature magic to create subtle wilderness effects. _Range:_ 30 feet.

---

### Eldritch Blast (`eldritchBlast`)

- **Source File:** [`data/spells/cantrips/eldritchBlast.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/eldritchBlast.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `instantaneous`
- **Tags:** `evocation`, `cantrip`, `warlock`, `attackSpell`, `damageSpell`, `forceDamage`

#### Baseline Prose

> **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 120 feet, up to 2 targets within 120 feet. _Hit:_ 1d10 Force damage.

#### Individual Feature Modifications (9)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 120 feet, up to 2 targets within 120 feet. _Hit:_ 1d10+3 Force damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 120 feet, up to 2 targets within 120 feet. _Hit:_ 1d10+2 Force damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 120 feet, up to 2 targets within 120 feet. _Hit:_ 1d10+2 Force damage.

* **+ Agonizing Blast** *(from [`data/classes/classOptions/warlock/invocations/agonizingBlast.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/warlock/invocations/agonizingBlast.yml))*
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 120 feet, up to 2 targets within 120 feet. _Hit:_ 1d10 Force damage.

* **+ Repelling Blast** *(from [`data/classes/classOptions/warlock/invocations/repellingBlast.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/warlock/invocations/repellingBlast.yml))*
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 120 feet, up to 2 targets within 120 feet. _Hit:_ 1d10 Force damage, and the target is pushed up to 10 feet away.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 120 feet, up to 2 targets within 120 feet. _Hit:_ 1d10 Force damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Psychic Spells** *(from [`data/classes/subclasses/warlock/greatOldOnePatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/greatOldOnePatron.yml))*
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 120 feet, up to 2 targets within 120 feet. _Hit:_ 1d10 Force or Psychic damage.

* **+ Necrotic Spell Conversion** *(from [`data/classes/subclasses/warlock/undeadPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/undeadPatron.yml))*
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 120 feet, up to 2 targets within 120 feet. _Hit:_ 1d10 Force or Necrotic damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 180 feet, up to 2 targets within 180 feet. _Hit:_ 1d10 Force damage.

#### Realistic Combined Class Stacks (5)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit]**
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 180 feet, up to 2 targets within 180 feet. _Hit:_ 1d10+3 Force damage.

* **Stack: CLERIC + [Increased Range, Potent Spellcasting, Pull of Death]**
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 180 feet, up to 2 targets within 180 feet. _Hit:_ 1d10+2 Force damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Increased Range, Potent Spellcasting]**
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 180 feet, up to 2 targets within 180 feet. _Hit:_ 1d10+2 Force damage.

* **Stack: WARLOCK + [Increased Range, Agonizing Blast, Repelling Blast, Psychic Spells]**
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 180 feet, up to 2 targets within 180 feet. _Hit:_ 1d10 Force or Psychic damage, and the target is pushed up to 10 feet away.

* **Stack: WARLOCK + [Increased Range, Agonizing Blast, Repelling Blast, Necrotic Spell Conversion]**
  > **Eldritch Blast.** _Ranged Attack Roll:_ +7, range 180 feet, up to 2 targets within 180 feet. _Hit:_ 1d10 Force or Necrotic damage, and the target is pushed up to 10 feet away.

---

### Elementalism (`elementalism`)

- **Source File:** [`data/spells/cantrips/elementalism.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/elementalism.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Tags:** `transmutation`, `cantrip`, `artificer`, `druid`, `sorcerer`, `wizard`

#### Baseline Prose

> **Elementalism.** You manipulate elemental forces to create minor elemental effects. _Range:_ 30 feet.

---

### Fire Bolt (`fireBolt`)

- **Source File:** [`data/spells/cantrips/fireBolt.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/fireBolt.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `instantaneous`
- **Tags:** `evocation`, `cantrip`, `artificer`, `sorcerer`, `wizard`, `attackSpell`, `damageSpell`, `fireDamage`

#### Baseline Prose

> **Fire Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10 Fire damage.

#### Individual Feature Modifications (9)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10+3 Fire damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10+2 Fire damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10+2 Fire damage.

* **+ Fire Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml))*
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10 Fire damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10+3 Fire damage.

* **+ Artillerist** *(from [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml))*
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10 Fire damage plus 1d8 damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10 Fire damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Celestial Patron** *(from [`data/classes/subclasses/warlock/celestialPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/celestialPatron.yml))*
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10 Fire damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d10 Fire damage.

#### Realistic Combined Class Stacks (6)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Alchemist]**
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d10+6 Fire damage.

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Artillerist]**
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d10+3 Fire damage plus 1d8 damage.

* **Stack: CLERIC + [Increased Range, Potent Spellcasting, Pull of Death]**
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d10+2 Fire damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Increased Range, Potent Spellcasting]**
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d10+2 Fire damage.

* **Stack: SORCERER + [Increased Range, Fire Affinity]**
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d10 Fire damage.

* **Stack: WARLOCK (celestialPatron) + [Increased Range, Celestial Patron]**
  > **Fire Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d10 Fire damage.

---

### Friends (`friends`)

- **Source File:** [`data/spells/cantrips/friends.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/friends.yml)
- **Time:** `action` | **Range:** `10 feet` | **Duration:** `concentration, up to 1 minute`
- **Tags:** `enchantment`, `cantrip`, `bard`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Friends.** _Wisdom Saving Throw:_ DC 15, one creature within 10 feet. _Failure:_ The target has the Charmed condition (when spell ends, target becomes hostile). _Concentration:_ Up to 1 minute.

---

### Guidance (`guidance`)

- **Source File:** [`data/spells/cantrips/guidance.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/guidance.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 minute`
- **Tags:** `divination`, `cantrip`, `artificer`, `cleric`, `druid`

#### Baseline Prose

> **Guidance.** One creature you touch adds 1d4 to any ability check using a chosen skill. _Concentration:_ Up to 1 minute.

---

### Light (`lightSpell`)

- **Source File:** [`data/spells/cantrips/light.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/light.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `1 hour`
- **Tags:** `evocation`, `cantrip`, `artificer`, `bard`, `cleric`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Light.** You make an object shine with bright light. _Range:_ Touch. _Duration:_ 1 hour.

---

### Mage Hand (`mageHand`)

- **Source File:** [`data/spells/cantrips/mageHand.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/mageHand.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `1 minute`
- **Tags:** `conjuration`, `cantrip`, `artificer`, `bard`, `sorcerer`, `warlock`, `wizard`, `psion`

#### Baseline Prose

> **Mage Hand.** You create a spectral hand to manipulate objects at a distance. _Range:_ 30 feet. _Duration:_ 1 minute.

---

### Mending (`mending`)

- **Source File:** [`data/spells/cantrips/mending.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/mending.yml)
- **Time:** `1 minute` | **Range:** `touch` | **Duration:** `instantaneous`
- **Tags:** `transmutation`, `cantrip`, `bard`, `cleric`, `druid`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Mending.** You repair a single break or tear in an object. _Range:_ Touch.

---

### Message (`message`)

- **Source File:** [`data/spells/cantrips/message.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/message.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `1 round`
- **Tags:** `transmutation`, `cantrip`, `artificer`, `bard`, `druid`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Message.** You whisper a secret message to a target at a distance. _Range:_ 120 feet. _Duration:_ 1 round.

---

### Mind Sliver (`mindSliver`)

- **Source File:** [`data/spells/cantrips/mindSliver.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/mindSliver.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Tags:** `enchantment`, `cantrip`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `damageSpell`, `psychicDamage`, `psion`

#### Baseline Prose

> **Mind Sliver.** _Intelligence Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6 Psychic damage, and the target subtracts 1d4 from its next saving throw.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Mind Sliver.** _Intelligence Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+3 Psychic damage, and the target subtracts 1d4 from its next saving throw.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Mind Sliver.** _Intelligence Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+2 Psychic damage, and the target subtracts 1d4 from its next saving throw.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Mind Sliver.** _Intelligence Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+2 Psychic damage, and the target subtracts 1d4 from its next saving throw.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Mind Sliver.** _Intelligence Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+3 Psychic damage, and the target subtracts 1d4 from its next saving throw.

* **Stack: CLERIC + [Potent Spellcasting]**
  > **Mind Sliver.** _Intelligence Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+2 Psychic damage, and the target subtracts 1d4 from its next saving throw.

* **Stack: DRUID + [Potent Spellcasting]**
  > **Mind Sliver.** _Intelligence Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+2 Psychic damage, and the target subtracts 1d4 from its next saving throw.

---

### Minor Illusion (`minorIllusion`)

- **Source File:** [`data/spells/cantrips/minorIllusion.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/minorIllusion.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `1 minute`
- **Tags:** `illusion`, `cantrip`, `bard`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Minor Illusion.** You create a sound or an image of an object within range. _Range:_ 30 feet. _Duration:_ 1 minute.

#### Individual Feature Modifications (1)

* **+ Illusionist** *(from [`data/classes/subclasses/wizard/illusionist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/illusionist.yml))*
  > **Minor Illusion.** You create a sound or an image of an object within range. _Range:_ 90 feet. _Duration:_ 1 minute.

#### Realistic Combined Class Stacks (1)

* **Stack: WIZARD (illusionist) + [Illusionist]**
  > **Minor Illusion.** You create a sound or an image of an object within range. _Range:_ 90 feet. _Duration:_ 1 minute.

---

### Poison Spray (`poisonSpray`)

- **Source File:** [`data/spells/cantrips/poisonSpray.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/poisonSpray.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Tags:** `necromancy`, `cantrip`, `artificer`, `druid`, `sorcerer`, `warlock`, `wizard`, `attackSpell`, `damageSpell`, `poisonDamage`

#### Baseline Prose

> **Poison Spray.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 2d12 Poison damage.

#### Individual Feature Modifications (10)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 2d12+3 Poison damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 2d12+2 Poison damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 2d12+2 Poison damage.

* **+ Poison Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/poisonAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/poisonAffinity.yml))*
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 2d12 Poison damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 2d12+3 Poison damage.

* **+ Artillerist** *(from [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml))*
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 2d12 Poison damage plus 1d8 damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 2d12 Poison damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Psychic Spells** *(from [`data/classes/subclasses/warlock/greatOldOnePatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/greatOldOnePatron.yml))*
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 2d12 Poison or Psychic damage.

* **+ Necrotic Spell Conversion** *(from [`data/classes/subclasses/warlock/undeadPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/undeadPatron.yml))*
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 2d12 Poison or Necrotic damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 2d12 Poison damage.

#### Realistic Combined Class Stacks (7)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Alchemist]**
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 2d12+6 Poison damage.

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Artillerist]**
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 2d12+3 Poison damage plus 1d8 damage.

* **Stack: CLERIC + [Increased Range, Potent Spellcasting, Pull of Death]**
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 2d12+2 Poison damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Increased Range, Potent Spellcasting]**
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 2d12+2 Poison damage.

* **Stack: SORCERER + [Increased Range, Poison Affinity]**
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 2d12 Poison damage.

* **Stack: WARLOCK (greatOldOnePatron) + [Increased Range, Psychic Spells]**
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 2d12 Poison or Psychic damage.

* **Stack: WARLOCK (undeadPatron) + [Increased Range, Necrotic Spell Conversion]**
  > **Poison Spray.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 2d12 Poison or Necrotic damage.

---

### Prestidigitation (`prestidigitation`)

- **Source File:** [`data/spells/cantrips/prestidigitation.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/prestidigitation.yml)
- **Time:** `action` | **Range:** `10 feet` | **Duration:** `up to 1 hour`
- **Tags:** `transmutation`, `cantrip`, `artificer`, `bard`, `sorcerer`, `warlock`, `wizard`, `psion`

#### Baseline Prose

> **Prestidigitation.** You perform minor magical tricks and utility effects. _Range:_ 10 feet. _Duration:_ Up to 1 hour.

---

### Produce Flame (`produceFlame`)

- **Source File:** [`data/spells/cantrips/produceFlame.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/produceFlame.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `10 minutes`
- **Tags:** `conjuration`, `cantrip`, `druid`, `attackSpell`, `damageSpell`, `fireDamage`

#### Baseline Prose

> **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8 Fire damage. _Duration:_ 10 minutes.

#### Individual Feature Modifications (8)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8+3 Fire damage. _Duration:_ 10 minutes.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8+2 Fire damage. _Duration:_ 10 minutes.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8+2 Fire damage. _Duration:_ 10 minutes.

* **+ Fire Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml))*
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8 Fire damage. _Duration:_ 10 minutes.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8+3 Fire damage. _Duration:_ 10 minutes.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8 Fire damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Duration:_ 10 minutes.

* **+ Celestial Patron** *(from [`data/classes/subclasses/warlock/celestialPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/celestialPatron.yml))*
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8 Fire damage. _Duration:_ 10 minutes.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. _Range:_ 60. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8 Fire damage. _Duration:_ 10 minutes.

#### Realistic Combined Class Stacks (5)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Alchemist]**
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. _Range:_ 60. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8+6 Fire damage. _Duration:_ 10 minutes.

* **Stack: CLERIC + [Increased Range, Potent Spellcasting, Pull of Death]**
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. _Range:_ 60. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8+2 Fire damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Duration:_ 10 minutes.

* **Stack: DRUID + [Increased Range, Potent Spellcasting]**
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. _Range:_ 60. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8+2 Fire damage. _Duration:_ 10 minutes.

* **Stack: SORCERER + [Increased Range, Fire Affinity]**
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. _Range:_ 60. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8 Fire damage. _Duration:_ 10 minutes.

* **Stack: WARLOCK (celestialPatron) + [Increased Range, Celestial Patron]**
  > **Produce Flame.** A flickering flame appears in your hand, shedding Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. You can take the following Action while the flame persists. _Range:_ 60. **Hurl Flame.** _Ranged Attack Roll:_ +7, range 30 feet. _Hit:_ 1d8 Fire damage. _Duration:_ 10 minutes.

---

### Ray of Frost (`rayOfFrost`)

- **Source File:** [`data/spells/cantrips/rayOfFrost.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/rayOfFrost.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Tags:** `evocation`, `cantrip`, `artificer`, `sorcerer`, `wizard`, `attackSpell`, `damageSpell`, `coldDamage`

#### Baseline Prose

> **Ray of Frost.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8 Cold damage, and the target has its Speed reduced by 10 feet.

#### Individual Feature Modifications (7)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Ray of Frost.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8+3 Cold damage, and the target has its Speed reduced by 10 feet.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Ray of Frost.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8+2 Cold damage, and the target has its Speed reduced by 10 feet.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Ray of Frost.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8+2 Cold damage, and the target has its Speed reduced by 10 feet.

* **+ Cold Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml))*
  > **Ray of Frost.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8 Cold damage, and the target has its Speed reduced by 10 feet.

* **+ Artillerist** *(from [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml))*
  > **Ray of Frost.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8 Cold damage plus 1d8 damage, and the target has its Speed reduced by 10 feet.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Ray of Frost.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8 Cold damage, the target has its Speed reduced by 10 feet, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Ray of Frost.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Cold damage, and the target has its Speed reduced by 10 feet.

#### Realistic Combined Class Stacks (4)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Artillerist]**
  > **Ray of Frost.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8+3 Cold damage plus 1d8 damage, and the target has its Speed reduced by 10 feet.

* **Stack: CLERIC + [Increased Range, Potent Spellcasting, Pull of Death]**
  > **Ray of Frost.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8+2 Cold damage, the target has its Speed reduced by 10 feet, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Increased Range, Potent Spellcasting]**
  > **Ray of Frost.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8+2 Cold damage, and the target has its Speed reduced by 10 feet.

* **Stack: SORCERER + [Increased Range, Cold Affinity]**
  > **Ray of Frost.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Cold damage, and the target has its Speed reduced by 10 feet.

---

### Resistance (`resistance`)

- **Source File:** [`data/spells/cantrips/resistance.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/resistance.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 minute`
- **Tags:** `abjuration`, `cantrip`, `artificer`, `cleric`, `druid`

#### Baseline Prose

> **Resistance.** One creature you touch willing creature can add 1d4 to one saving throw of its choice before the spell ends. _Concentration:_ Up to 1 minute.

---

### Sacred Flame (`sacredFlame`)

- **Source File:** [`data/spells/cantrips/sacredFlame.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/sacredFlame.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Tags:** `evocation`, `cantrip`, `cleric`, `saveSpell`, `damageSpell`, `radiantDamage`

#### Baseline Prose

> **Sacred Flame.** _Dexterity Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8 Radiant damage, and the target gains no benefit from cover for this save.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Sacred Flame.** _Dexterity Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+3 Radiant damage, and the target gains no benefit from cover for this save.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Sacred Flame.** _Dexterity Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+2 Radiant damage, and the target gains no benefit from cover for this save.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Sacred Flame.** _Dexterity Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+2 Radiant damage, and the target gains no benefit from cover for this save.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Sacred Flame.** _Dexterity Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+3 Radiant damage, and the target gains no benefit from cover for this save.

* **Stack: CLERIC + [Potent Spellcasting]**
  > **Sacred Flame.** _Dexterity Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+2 Radiant damage, and the target gains no benefit from cover for this save.

* **Stack: DRUID + [Potent Spellcasting]**
  > **Sacred Flame.** _Dexterity Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+2 Radiant damage, and the target gains no benefit from cover for this save.

---

### Shillelagh (`shillelagh`)

- **Source File:** [`data/spells/cantrips/shillelagh.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/shillelagh.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 minute`
- **Tags:** `transmutation`, `cantrip`, `druid`

#### Baseline Prose

> **Shillelagh.** Imbue a Club or Quarterstaff you are holding. For the duration, you make attack rolls with it with a +7 modifier and deal 1d8+3 Force damage. _Duration:_ 1 minute.

---

### Shocking Grasp (`shockingGrasp`)

- **Source File:** [`data/spells/cantrips/shockingGrasp.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/shockingGrasp.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `instantaneous`
- **Tags:** `evocation`, `cantrip`, `artificer`, `sorcerer`, `wizard`

#### Baseline Prose

> **Shocking Grasp.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 2d8 Lightning damage, and the target cannot make Opportunity Attacks until the start of its next turn.

---

### Sorcerous Burst (`sorcerousBurst`)

- **Source File:** [`data/spells/cantrips/sorcerousBurst.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/sorcerousBurst.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `instantaneous`
- **Tags:** `evocation`, `cantrip`, `sorcerer`, `attackSpell`, `damageSpell`, `fireDamage`, `coldDamage`, `psychicDamage`, `acidDamage`, `poisonDamage`, `lightningDamage`, `thunderDamage`

#### Baseline Prose

> **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

#### Individual Feature Modifications (12)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8+3 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8+2 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8+2 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **+ Acid Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **+ Cold Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **+ Fire Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **+ Lightning Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **+ Poison Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/poisonAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/poisonAffinity.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8+3 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Celestial Patron** *(from [`data/classes/subclasses/warlock/celestialPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/celestialPatron.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d8 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

#### Realistic Combined Class Stacks (5)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Alchemist]**
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d8+6 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **Stack: CLERIC + [Increased Range, Potent Spellcasting, Pull of Death]**
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d8+2 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Increased Range, Potent Spellcasting]**
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d8+2 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **Stack: SORCERER + [Increased Range, Acid Affinity, Cold Affinity, Fire Affinity, Lightning Affinity, Poison Affinity]**
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d8 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

* **Stack: WARLOCK (celestialPatron) + [Increased Range, Celestial Patron]**
  > **Sorcerous Burst.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 2d8 Acid, Cold, Fire, Lightning, Poison, Psychic, or Thunder damage, and if you roll an 8 on a d8 for this spell, you can roll another d8 and add it to the damage.

---

### Spare the Dying (`spareTheDying`)

- **Source File:** [`data/spells/cantrips/spareTheDying.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/spareTheDying.yml)
- **Time:** `action` | **Range:** `15 feet` | **Duration:** `instantaneous`
- **Tags:** `necromancy`, `cantrip`, `artificer`, `cleric`, `druid`

#### Baseline Prose

> **Spare the Dying.** One creature you touch creature with 0 Hit Points becomes Stable. _Range:_ 15 feet.

---

### Starry Wisp (`starryWisp`)

- **Source File:** [`data/spells/cantrips/starryWisp.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/starryWisp.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Tags:** `evocation`, `cantrip`, `bard`, `druid`, `attackSpell`, `damageSpell`, `radiantDamage`

#### Baseline Prose

> **Starry Wisp.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8 Radiant damage, and until the end of your next turn, the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition.

#### Individual Feature Modifications (6)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Starry Wisp.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8+3 Radiant damage, and until the end of your next turn, the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Starry Wisp.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8+2 Radiant damage, and until the end of your next turn, the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Starry Wisp.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8+2 Radiant damage, and until the end of your next turn, the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Starry Wisp.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8 Radiant damage, until the end of your next turn, the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Celestial Patron** *(from [`data/classes/subclasses/warlock/celestialPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/celestialPatron.yml))*
  > **Starry Wisp.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8 Radiant damage, and until the end of your next turn, the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Starry Wisp.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Radiant damage, and until the end of your next turn, the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition.

#### Realistic Combined Class Stacks (4)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit]**
  > **Starry Wisp.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8+3 Radiant damage, and until the end of your next turn, the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition.

* **Stack: CLERIC + [Increased Range, Potent Spellcasting, Pull of Death]**
  > **Starry Wisp.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8+2 Radiant damage, until the end of your next turn, the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Increased Range, Potent Spellcasting]**
  > **Starry Wisp.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8+2 Radiant damage, and until the end of your next turn, the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition.

* **Stack: WARLOCK (celestialPatron) + [Increased Range, Celestial Patron]**
  > **Starry Wisp.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Radiant damage, and until the end of your next turn, the target emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition.

---

### Telekinetic Fling (`telekineticFling`)

- **Source File:** [`data/spells/cantrips/telekineticFling.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/telekineticFling.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Tags:** `evocation`, `cantrip`, `psion`, `attackSpell`, `damageSpell`, `forceDamage`

#### Baseline Prose

> **Telekinetic Fling.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d10 Force damage.

#### Individual Feature Modifications (6)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Telekinetic Fling.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d10+3 Force damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Telekinetic Fling.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d10+2 Force damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Telekinetic Fling.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d10+2 Force damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Telekinetic Fling.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d10 Force damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **+ Telepath** *(from [`data/classes/subclasses/psion/telepath.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/telepath.yml))*
  > **Telekinetic Fling.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d10+3 Force damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Telekinetic Fling.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10 Force damage.

#### Realistic Combined Class Stacks (4)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit]**
  > **Telekinetic Fling.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10+3 Force damage.

* **Stack: CLERIC + [Increased Range, Potent Spellcasting, Pull of Death]**
  > **Telekinetic Fling.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10+2 Force damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage.

* **Stack: DRUID + [Increased Range, Potent Spellcasting]**
  > **Telekinetic Fling.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10+2 Force damage.

* **Stack: PSION (telepath) + [Increased Range, Telepath]**
  > **Telekinetic Fling.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d10+3 Force damage.

---

### Thaumaturgy (`thaumaturgy`)

- **Source File:** [`data/spells/cantrips/thaumaturgy.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/thaumaturgy.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `up to 1 minute`
- **Tags:** `transmutation`, `cantrip`, `cleric`

#### Baseline Prose

> **Thaumaturgy.** You manifest minor wonders and supernatural signs. _Range:_ 30 feet. _Duration:_ Up to 1 minute.

---

### Thorn Whip (`thornWhip`)

- **Source File:** [`data/spells/cantrips/thornWhip.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/thornWhip.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Tags:** `transmutation`, `cantrip`, `artificer`, `druid`

#### Baseline Prose

> **Thorn Whip.** _Melee Attack Roll:_ +7, range 30 feet. _Hit:_ 2d6 Piercing damage, and the target is pulled up to 10 feet closer.

---

### Thunderclap (`thunderclap`)

- **Source File:** [`data/spells/cantrips/thunderclap.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/thunderclap.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Tags:** `evocation`, `cantrip`, `artificer`, `bard`, `druid`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `damageSpell`, `thunderDamage`

#### Baseline Prose

> **Thunderclap.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6 Thunder damage.

#### Individual Feature Modifications (4)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Thunderclap.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+3 Thunder damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Thunderclap.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+2 Thunder damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Thunderclap.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+2 Thunder damage.

* **+ Artillerist** *(from [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml))*
  > **Thunderclap.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6 Thunder damage plus 1d8 damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit, Artillerist]**
  > **Thunderclap.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+3 Thunder damage plus 1d8 damage.

* **Stack: CLERIC + [Potent Spellcasting]**
  > **Thunderclap.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+2 Thunder damage.

* **Stack: DRUID + [Potent Spellcasting]**
  > **Thunderclap.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+2 Thunder damage.

---

### Toll the Dead (`tollTheDead`)

- **Source File:** [`data/spells/cantrips/tollTheDead.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/tollTheDead.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Tags:** `necromancy`, `cantrip`, `cleric`, `warlock`, `wizard`, `saveSpell`, `damageSpell`, `necroticDamage`

#### Baseline Prose

> **Toll the Dead.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8 Necrotic damage, and if the target is missing any of its Hit Points, it instead takes 1d12 Necrotic damage.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Toll the Dead.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+3 Necrotic damage, and if the target is missing any of its Hit Points, it instead takes 1d12 Necrotic damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Toll the Dead.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+2 Necrotic damage, and if the target is missing any of its Hit Points, it instead takes 1d12 Necrotic damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Toll the Dead.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+2 Necrotic damage, and if the target is missing any of its Hit Points, it instead takes 1d12 Necrotic damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Toll the Dead.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+3 Necrotic damage, and if the target is missing any of its Hit Points, it instead takes 1d12 Necrotic damage.

* **Stack: CLERIC + [Potent Spellcasting]**
  > **Toll the Dead.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+2 Necrotic damage, and if the target is missing any of its Hit Points, it instead takes 1d12 Necrotic damage.

* **Stack: DRUID + [Potent Spellcasting]**
  > **Toll the Dead.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d8+2 Necrotic damage, and if the target is missing any of its Hit Points, it instead takes 1d12 Necrotic damage.

---

### True Strike (`trueStrike`)

- **Source File:** [`data/spells/cantrips/trueStrike.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/trueStrike.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Tags:** `divination`, `cantrip`, `artificer`, `bard`, `sorcerer`, `warlock`, `wizard`, `psion`

#### Baseline Prose

> **True Strike.** Guided by a flash of magical insight, make one attack with the weapon used in the spell's casting using a +7 attack roll. On a hit, deal your weapon's damage die +3 Radiant damage.

---

### Vicious Mockery (`viciousMockery`)

- **Source File:** [`data/spells/cantrips/viciousMockery.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/viciousMockery.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Tags:** `enchantment`, `cantrip`, `bard`, `saveSpell`, `damageSpell`, `psychicDamage`

#### Baseline Prose

> **Vicious Mockery.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6 Psychic damage, and the target has Disadvantage on its next attack roll.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Vicious Mockery.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+3 Psychic damage, and the target has Disadvantage on its next attack roll.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Vicious Mockery.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+2 Psychic damage, and the target has Disadvantage on its next attack roll.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Vicious Mockery.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+2 Psychic damage, and the target has Disadvantage on its next attack roll.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Vicious Mockery.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+3 Psychic damage, and the target has Disadvantage on its next attack roll.

* **Stack: CLERIC + [Potent Spellcasting]**
  > **Vicious Mockery.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+2 Psychic damage, and the target has Disadvantage on its next attack roll.

* **Stack: DRUID + [Potent Spellcasting]**
  > **Vicious Mockery.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 2d6+2 Psychic damage, and the target has Disadvantage on its next attack roll.

---

### Word of Radiance (`wordOfRadiance`)

- **Source File:** [`data/spells/cantrips/wordOfRadiance.yml`](file:///home/gerardo/Projects/card-builder/data/spells/cantrips/wordOfRadiance.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Tags:** `evocation`, `cantrip`, `cleric`, `saveSpell`, `damageSpell`, `radiantDamage`

#### Baseline Prose

> **Word of Radiance.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6 Radiant damage.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Word of Radiance.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+3 Radiant damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/cleric/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/cleric/potentSpellcasting.yml))*
  > **Word of Radiance.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+2 Radiant damage.

* **+ Potent Spellcasting** *(from [`data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/druid/elementalFury/potentSpellcasting.yml))*
  > **Word of Radiance.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+2 Radiant damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Word of Radiance.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+3 Radiant damage.

* **Stack: CLERIC + [Potent Spellcasting]**
  > **Word of Radiance.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+2 Radiant damage.

* **Stack: DRUID + [Potent Spellcasting]**
  > **Word of Radiance.** _Constitution Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d6+2 Radiant damage.

---

## Spells: 1st Level

### Alarm (`alarm`)

- **Source File:** [`data/spells/level1Spells/alarm.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/alarm.yml)
- **Time:** `1 minute` | **Range:** `30 feet` | **Duration:** `8 hours`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `abjuration`, `artificer`, `ranger`, `wizard`, `ritual`

#### Baseline Prose

> **Alarm.** You set a magical alarm against intrusion. _Range:_ 30 feet. _Duration:_ 8 hours. _Ritual_.

---

### Animal Friendship (`animalFriendship`)

- **Source File:** [`data/spells/level1Spells/animalFriendship.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/animalFriendship.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `24 hours`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `enchantment`, `bard`, `druid`, `ranger`, `saveSpell`, `psion`

#### Baseline Prose

> **Animal Friendship.** _Wisdom Saving Throw:_ DC 15, one beast within 30 feet. _Failure:_ The target has the Charmed condition (ends if the target takes damage). _Duration:_ 24 hours. _Upcast:_ +1 Beast target.

---

### Eldritch Armor (`armorOfAgathys`)

- **Source File:** [`data/spells/level1Spells/armorOfAgathys.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/armorOfAgathys.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 hour`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `abjuration`, `warlock`

#### Baseline Prose

> **Eldritch Armor.** You gain 5 Temporary Hit Points. While you have these temp hit points, a creature that hits you with a melee attack takes 5 Cold damage. _Duration:_ 1 hour. _Upcast:_ +5.

---

### Eldritch Arms (`armsOfHadar`)

- **Source File:** [`data/spells/level1Spells/armsOfHadar.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/armsOfHadar.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `conjuration`, `warlock`, `saveSpell`, `damageSpell`, `necroticDamage`

#### Baseline Prose

> **Eldritch Arms.** _Strength Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ 2d6 Necrotic damage, and each target can't take reactions until the start of its next turn. _Success:_ Half damage. _Upcast:_ +1d6 Necrotic damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Eldritch Arms.** _Strength Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ 2d6+3 Necrotic damage, and each target can't take reactions until the start of its next turn. _Success:_ Half damage. _Upcast:_ +1d6 Necrotic damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Eldritch Arms.** _Strength Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ 2d6 Necrotic damage, and each target can't take reactions until the start of its next turn. _Success:_ Half damage. _Upcast:_ +1d6 Necrotic damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Eldritch Arms.** _Strength Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ 2d6+3 Necrotic damage, and each target can't take reactions until the start of its next turn. _Success:_ Half damage. _Upcast:_ +1d6 Necrotic damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Eldritch Arms.** _Strength Saving Throw:_ DC 15, each creature in a 10-foot-radius Emanation centered on you. _Failure:_ 2d6 Necrotic damage, and each target can't take reactions until the start of its next turn. _Success:_ Half damage. _Upcast:_ +1d6 Necrotic damage.

---

### Bane (`bane`)

- **Source File:** [`data/spells/level1Spells/bane.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/bane.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `enchantment`, `bard`, `cleric`, `warlock`, `saveSpell`

#### Baseline Prose

> **Bane.** _Charisma Saving Throw:_ DC 15, up to 3 targets within 30 feet. _Failure:_ Each target subtracts 1d4 from attacks and saving throws. _Concentration:_ Up to 1 minute. _Upcast:_ +1 target.

---

### Bless (`bless`)

- **Source File:** [`data/spells/level1Spells/bless.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/bless.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `enchantment`, `cleric`, `paladin`

#### Baseline Prose

> **Bless.** Up to 3 creatures within 30 feet add 1d4 to all attack rolls and saving throws. _Concentration:_ Up to 1 minute. _Upcast:_ +1 target.

---

### Burning Hands (`burningHands`)

- **Source File:** [`data/spells/level1Spells/burningHands.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/burningHands.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `fireDamage`

#### Baseline Prose

> **Burning Hands.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on you. _Failure:_ 3d6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

#### Individual Feature Modifications (4)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Burning Hands.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on you. _Failure:_ 3d6+3 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

* **+ Fire Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml))*
  > **Burning Hands.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on you. _Failure:_ 3d6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Burning Hands.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on you. _Failure:_ 3d6+3 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Burning Hands.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on you. _Failure:_ 3d6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit, Alchemist]**
  > **Burning Hands.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on you. _Failure:_ 3d6+6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

* **Stack: SORCERER + [Fire Affinity]**
  > **Burning Hands.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on you. _Failure:_ 3d6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Burning Hands.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on you. _Failure:_ 3d6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

---

### Charm Person (`charmPerson`)

- **Source File:** [`data/spells/level1Spells/charmPerson.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/charmPerson.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `1 hour`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `enchantment`, `bard`, `druid`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Charm Person.** _Wisdom Saving Throw:_ DC 15, one humanoid within 30 feet. _Failure:_ The target has the Charmed condition (ends if the target takes damage). _Duration:_ 1 hour. _Upcast:_ +1 Humanoid target.

---

### Chromatic Orb (`chromaticOrb`)

- **Source File:** [`data/spells/level1Spells/chromaticOrb.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/chromaticOrb.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `sorcerer`, `wizard`, `attackSpell`, `damageSpell`, `fireDamage`, `coldDamage`, `acidDamage`, `poisonDamage`, `lightningDamage`, `thunderDamage`

#### Baseline Prose

> **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

#### Individual Feature Modifications (11)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 3d8+3 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **+ Acid Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml))*
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **+ Cold Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml))*
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **+ Fire Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml))*
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **+ Lightning Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml))*
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **+ Poison Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/poisonAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/poisonAffinity.yml))*
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 3d8+3 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **+ Celestial Patron** *(from [`data/classes/subclasses/warlock/celestialPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/celestialPatron.yml))*
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 150 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

#### Realistic Combined Class Stacks (5)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Alchemist]**
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 150 feet. _Hit:_ 3d8+6 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **Stack: SORCERER + [Increased Range, Acid Affinity, Cold Affinity, Fire Affinity, Lightning Affinity, Poison Affinity]**
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 150 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **Stack: BARD (spirits) + [Increased Range, Power from Beyond (Damage)]**
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 150 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **Stack: CLERIC (grave) + [Increased Range, Pull of Death]**
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 150 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

* **Stack: WARLOCK (celestialPatron) + [Increased Range, Celestial Patron]**
  > **Chromatic Orb.** _Ranged Attack Roll:_ +7, range 150 feet. _Hit:_ 3d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage, and if you roll the same number on two or more d8s, the energy leaps to a different the target within 30 feet. _Upcast:_ +1d8 Acid, Cold, Fire, Lightning, Poison, or Thunder damage.

---

### Color Spray (`colorSpray`)

- **Source File:** [`data/spells/level1Spells/colorSpray.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/colorSpray.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `illusion`, `bard`, `sorcerer`, `wizard`, `saveSpell`

#### Baseline Prose

> **Color Spray.** _Constitution Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on you. _Failure:_ Each target has the Blinded condition.

---

### Command (`command`)

- **Source File:** [`data/spells/level1Spells/command.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/command.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `enchantment`, `bard`, `cleric`, `paladin`, `saveSpell`, `psion`

#### Baseline Prose

> **Command.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ The target follows your one-word command on its next turn. _Upcast:_ +1 target.

---

### Compelled Duel (`compelledDuel`)

- **Source File:** [`data/spells/level1Spells/compelledDuel.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/compelledDuel.yml)
- **Time:** `bonus action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `enchantment`, `paladin`, `saveSpell`

#### Baseline Prose

> **Compelled Duel.** _Wisdom Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ The target has Disadvantage on attack rolls against creatures other than you. _Concentration:_ Up to 1 minute.

---

### Comprehend Languages (`comprehendLanguages`)

- **Source File:** [`data/spells/level1Spells/comprehendLanguages.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/comprehendLanguages.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `1 hour`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `divination`, `bard`, `sorcerer`, `warlock`, `wizard`, `ritual`, `psion`

#### Baseline Prose

> **Comprehend Languages.** You understand the literal meaning of any spoken or written language. _Duration:_ 1 hour. _Ritual_.

---

### Create or Destroy Water (`createOrDestroyWater`)

- **Source File:** [`data/spells/level1Spells/createOrDestroyWater.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/createOrDestroyWater.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `transmutation`, `cleric`, `druid`

#### Baseline Prose

> **Create or Destroy Water.** You create or destroy a quantity of water or fog. _Range:_ 30 feet. _Upcast:_ +10 gallons of water, or +5 ft. Cube size.

---

### Cure Wounds (`cureWounds`)

- **Source File:** [`data/spells/level1Spells/cureWounds.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/cureWounds.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `abjuration`, `artificer`, `bard`, `cleric`, `druid`, `paladin`, `ranger`, `healingSpell`

#### Baseline Prose

> **Cure Wounds.** One creature you touch regains 2d8+3 Hit Points. _Upcast:_ +2d8 healing.

#### Individual Feature Modifications (2)

* **+ Power from Beyond (Healing)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Cure Wounds.** One creature you touch regains 2d8+3 Hit Points. _Upcast:_ +2d8 healing.

* **+ Disciple of Life** *(from [`data/classes/subclasses/cleric/life.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/life.yml))*
  > **Cure Wounds.** One creature you touch regains 2d8+7 Hit Points. _Upcast:_ +2d8 healing.

#### Realistic Combined Class Stacks (2)

* **Stack: BARD (spirits) + [Power from Beyond (Healing)]**
  > **Cure Wounds.** One creature you touch regains 2d8+3 Hit Points. _Upcast:_ +2d8 healing.

* **Stack: CLERIC (life) + [Disciple of Life]**
  > **Cure Wounds.** One creature you touch regains 2d8+7 Hit Points. _Upcast:_ +2d8 healing.

---

### Detect Evil and Good (`detectEvilAndGood`)

- **Source File:** [`data/spells/level1Spells/detectEvilAndGood.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/detectEvilAndGood.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `divination`, `cleric`, `paladin`

#### Baseline Prose

> **Detect Evil and Good.** You sense the presence of otherworldly creatures nearby. _Concentration:_ Up to 10 minutes.

---

### Detect Magic (`detectMagic`)

- **Source File:** [`data/spells/level1Spells/detectMagic.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/detectMagic.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `divination`, `artificer`, `bard`, `cleric`, `druid`, `paladin`, `ranger`, `sorcerer`, `warlock`, `wizard`, `ritual`, `psion`

#### Baseline Prose

> **Detect Magic.** You sense the presence and aura of magical effects nearby. _Concentration:_ Up to 10 minutes. _Ritual_.

---

### Detect Poison and Disease (`detectPoisonAndDisease`)

- **Source File:** [`data/spells/level1Spells/detectPoisonAndDisease.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/detectPoisonAndDisease.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `divination`, `cleric`, `druid`, `paladin`, `ranger`, `ritual`

#### Baseline Prose

> **Detect Poison and Disease.** You sense the location of poisons, venom, and contagions. _Concentration:_ Up to 10 minutes. _Ritual_.

---

### Disguise Self (`disguiseSelf`)

- **Source File:** [`data/spells/level1Spells/disguiseSelf.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/disguiseSelf.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `1 hour`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `illusion`, `artificer`, `bard`, `sorcerer`, `wizard`, `saveSpell`

#### Baseline Prose

> **Disguise Self.** You alter your appearance with illusory magic. _Duration:_ 1 hour.

---

### Dissonant Whispers (`dissonantWhispers`)

- **Source File:** [`data/spells/level1Spells/dissonantWhispers.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/dissonantWhispers.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `enchantment`, `bard`, `saveSpell`, `damageSpell`, `psychicDamage`, `psion`

#### Baseline Prose

> **Dissonant Whispers.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 3d6 Psychic damage, and the target must immediately use its reaction, if available, to move as far away from you as its speed allows. _Success:_ Half damage. _Upcast:_ +1d6 Psychic damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Dissonant Whispers.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 3d6+3 Psychic damage, and the target must immediately use its reaction, if available, to move as far away from you as its speed allows. _Success:_ Half damage. _Upcast:_ +1d6 Psychic damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Dissonant Whispers.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 3d6 Psychic damage, and the target must immediately use its reaction, if available, to move as far away from you as its speed allows. _Success:_ Half damage. _Upcast:_ +1d6 Psychic damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Dissonant Whispers.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 3d6+3 Psychic damage, and the target must immediately use its reaction, if available, to move as far away from you as its speed allows. _Success:_ Half damage. _Upcast:_ +1d6 Psychic damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Dissonant Whispers.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ 3d6 Psychic damage, and the target must immediately use its reaction, if available, to move as far away from you as its speed allows. _Success:_ Half damage. _Upcast:_ +1d6 Psychic damage.

---

### Divine Favor (`divineFavor`)

- **Source File:** [`data/spells/level1Spells/divineFavor.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/divineFavor.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `transmutation`, `paladin`

#### Baseline Prose

> **Divine Favor.** For the duration, your weapon attacks deal an extra 1d4 Radiant damage on a hit. _Duration:_ 1 minute.

---

### Divine Smite (`divineSmite`)

- **Source File:** [`data/spells/level1Spells/divineSmite.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/divineSmite.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `paladin`

#### Baseline Prose

> **Divine Smite.** _Trigger:_ When you hit a creature with an attack. _Response:_ The target takes 2d8 Radiant damage. _Upcast:_ +1d8 Radiant damage.

---

### Ensnaring Strike (`ensnaringStrike`)

- **Source File:** [`data/spells/level1Spells/ensnaringStrike.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/ensnaringStrike.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `conjuration`, `ranger`, `saveSpell`, `damageSpell`, `piercingDamage`

#### Baseline Prose

> **Ensnaring Strike.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Strength Saving Throw:_ DC 15, the target. _Failure:_ The target has the Restrained condition (escape DC 15), and takes 1d6 Piercing damage at start of its turn. _Concentration:_ Up to 1 minute. _Upcast:_ 1d6 extra damage.

---

### Entangle (`entangle`)

- **Source File:** [`data/spells/level1Spells/entangle.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/entangle.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `conjuration`, `druid`, `ranger`, `saveSpell`

#### Baseline Prose

> **Entangle.** A 20-foot-radius Square of weeds and vines appears centered on a point within 90 feet and creates Difficult Terrain. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Strength Saving Throw:_ DC 15. _Failure:_ The target has the Restrained condition (escape DC 15). _Concentration:_ Up to 1 minute.

---

### Expeditious Retreat (`expeditiousRetreat`)

- **Source File:** [`data/spells/level1Spells/expeditiousRetreat.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/expeditiousRetreat.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `transmutation`, `artificer`, `sorcerer`, `warlock`, `wizard`

#### Baseline Prose

> **Expeditious Retreat.** You move with sudden speed, allowing continuous dashing. _Concentration:_ Up to 10 minutes.

---

### Faerie Fire (`faerieFire`)

- **Source File:** [`data/spells/level1Spells/faerieFire.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/faerieFire.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `artificer`, `bard`, `druid`, `saveSpell`

#### Baseline Prose

> **Faerie Fire.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Cube centered on a point within 60 feet. _Failure:_ Attack rolls against the target have Advantage, and each target is outlined in light and can't benefit from the Invisible condition. _Concentration:_ Up to 1 minute.

#### Individual Feature Modifications (1)

* **+ Guided Precision** *(from [`data/classes/subclasses/artificer/cartographer.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/cartographer.yml))*
  > **Faerie Fire.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Cube centered on a point within 60 feet. _Failure:_ Attack rolls against the target have Advantage, each target is outlined in light and can't benefit from the Invisible condition, and add 3 to one damage roll when hitting a creature affected; taking damage can't cause you to lose Concentration. _Concentration:_ Up to 1 minute.

#### Realistic Combined Class Stacks (1)

* **Stack: ARTIFICER (cartographer) + [Guided Precision]**
  > **Faerie Fire.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Cube centered on a point within 60 feet. _Failure:_ Attack rolls against the target have Advantage, each target is outlined in light and can't benefit from the Invisible condition, and add 3 to one damage roll when hitting a creature affected; taking damage can't cause you to lose Concentration. _Concentration:_ Up to 1 minute.

---

### False Life (`falseLife`)

- **Source File:** [`data/spells/level1Spells/falseLife.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/falseLife.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `necromancy`, `artificer`, `sorcerer`, `wizard`

#### Baseline Prose

> **False Life.** You gain 2d4+5 Temporary Hit Points. _Upcast:_ +5.

---

### Feather Fall (`featherFall`)

- **Source File:** [`data/spells/level1Spells/featherFall.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/featherFall.yml)
- **Time:** `reaction` | **Range:** `60 feet` | **Duration:** `1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `transmutation`, `artificer`, `bard`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Feather Fall.** _Trigger:_ immediately after you or a creature you can see falls. _Response:_ Rate of descent slows to 60 feet per round and taking no fall damage on landing. _Range:_ 60 feet. _Duration:_ 1 minute.

---

### Find Familiar (`findFamiliar`)

- **Source File:** [`data/spells/level1Spells/findFamiliar.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/findFamiliar.yml)
- **Time:** `N/A` | **Range:** `N/A` | **Duration:** `N/A`
- **Tags:** `level1Spell`, `conjuration`, `wizard`, `ritual`

#### Baseline Prose

> **Find Familiar.** You gain the service of an otherworldly spirit that takes an animal form. _Ritual_.

---

### Fog Cloud (`fogCloud`)

- **Source File:** [`data/spells/level1Spells/fogCloud.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/fogCloud.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `conjuration`, `druid`, `ranger`, `sorcerer`, `wizard`

#### Baseline Prose

> **Fog Cloud.** A 20-foot-radius Sphere centered on a point within 120 feet heavily obscured fog fills the area. _Concentration:_ Up to 1 hour. _Upcast:_ +20 ft. Sphere radius.

---

### Goodberry (`goodberry`)

- **Source File:** [`data/spells/level1Spells/goodberry.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/goodberry.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `24 hours`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `conjuration`, `druid`, `ranger`, `healingSpell`

#### Baseline Prose

> **Goodberry.** Ten berries appear in your hand; a creature can use a Bonus Action to eat a berry to restore 1 Hit Point. _Duration:_ 24 hours.

---

### Grease (`grease`)

- **Source File:** [`data/spells/level1Spells/grease.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/grease.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `conjuration`, `artificer`, `sorcerer`, `wizard`, `saveSpell`

#### Baseline Prose

> **Grease.** A 10-foot-radius Square of slick grease appears centered on a point within 60 feet and creates Difficult Terrain. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ The target is Prone. _Duration:_ 1 minute.

---

### Guiding Bolt (`guidingBolt`)

- **Source File:** [`data/spells/level1Spells/guidingBolt.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/guidingBolt.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `1 round`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `cleric`, `attackSpell`, `damageSpell`, `radiantDamage`

#### Baseline Prose

> **Guiding Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 4d6 Radiant damage, and attack rolls against the target have Advantage. _Duration:_ 1 round. _Upcast:_ +1d6 Radiant damage.

#### Individual Feature Modifications (5)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Guiding Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 4d6+3 Radiant damage, and attack rolls against the target have Advantage. _Duration:_ 1 round. _Upcast:_ +1d6 Radiant damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Guiding Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 4d6 Radiant damage, and attack rolls against the target have Advantage. _Duration:_ 1 round. _Upcast:_ +1d6 Radiant damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Guiding Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 4d6 Radiant damage, attack rolls against the target have Advantage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Duration:_ 1 round. _Upcast:_ +1d6 Radiant damage.

* **+ Celestial Patron** *(from [`data/classes/subclasses/warlock/celestialPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/celestialPatron.yml))*
  > **Guiding Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 4d6 Radiant damage, and attack rolls against the target have Advantage. _Duration:_ 1 round. _Upcast:_ +1d6 Radiant damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Guiding Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 4d6 Radiant damage, and attack rolls against the target have Advantage. _Duration:_ 1 round. _Upcast:_ +1d6 Radiant damage.

#### Realistic Combined Class Stacks (4)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit]**
  > **Guiding Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 4d6+3 Radiant damage, and attack rolls against the target have Advantage. _Duration:_ 1 round. _Upcast:_ +1d6 Radiant damage.

* **Stack: BARD (spirits) + [Increased Range, Power from Beyond (Damage)]**
  > **Guiding Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 4d6 Radiant damage, and attack rolls against the target have Advantage. _Duration:_ 1 round. _Upcast:_ +1d6 Radiant damage.

* **Stack: CLERIC (grave) + [Increased Range, Pull of Death]**
  > **Guiding Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 4d6 Radiant damage, attack rolls against the target have Advantage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Duration:_ 1 round. _Upcast:_ +1d6 Radiant damage.

* **Stack: WARLOCK (celestialPatron) + [Increased Range, Celestial Patron]**
  > **Guiding Bolt.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 4d6 Radiant damage, and attack rolls against the target have Advantage. _Duration:_ 1 round. _Upcast:_ +1d6 Radiant damage.

---

### Hail of Thorns (`hailOfThorns`)

- **Source File:** [`data/spells/level1Spells/hailOfThorns.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/hailOfThorns.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `conjuration`, `ranger`, `saveSpell`, `damageSpell`, `piercingDamage`

#### Baseline Prose

> **Hail of Thorns.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on the target. _Failure:_ 1d10 Piercing damage. _Success:_ Half damage. _Upcast:_ +1d10 Piercing damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Hail of Thorns.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on the target. _Failure:_ 1d10+3 Piercing damage. _Success:_ Half damage. _Upcast:_ +1d10 Piercing damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Hail of Thorns.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on the target. _Failure:_ 1d10 Piercing damage. _Success:_ Half damage. _Upcast:_ +1d10 Piercing damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Hail of Thorns.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on the target. _Failure:_ 1d10+3 Piercing damage. _Success:_ Half damage. _Upcast:_ +1d10 Piercing damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Hail of Thorns.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on the target. _Failure:_ 1d10 Piercing damage. _Success:_ Half damage. _Upcast:_ +1d10 Piercing damage.

---

### Healing Word (`healingWord`)

- **Source File:** [`data/spells/level1Spells/healingWord.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/healingWord.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `abjuration`, `bard`, `cleric`, `druid`, `healingSpell`

#### Baseline Prose

> **Healing Word.** One creature within 60 feet regains 2d4+3 Hit Points. _Upcast:_ +2d4 healing.

#### Individual Feature Modifications (2)

* **+ Power from Beyond (Healing)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Healing Word.** One creature within 60 feet regains 2d4+3 Hit Points. _Upcast:_ +2d4 healing.

* **+ Disciple of Life** *(from [`data/classes/subclasses/cleric/life.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/life.yml))*
  > **Healing Word.** One creature within 60 feet regains 2d4+7 Hit Points. _Upcast:_ +2d4 healing.

#### Realistic Combined Class Stacks (2)

* **Stack: BARD (spirits) + [Power from Beyond (Healing)]**
  > **Healing Word.** One creature within 60 feet regains 2d4+3 Hit Points. _Upcast:_ +2d4 healing.

* **Stack: CLERIC (life) + [Disciple of Life]**
  > **Healing Word.** One creature within 60 feet regains 2d4+7 Hit Points. _Upcast:_ +2d4 healing.

---

### Hellish Rebuke (`hellishRebuke`)

- **Source File:** [`data/spells/level1Spells/hellishRebuke.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/hellishRebuke.yml)
- **Time:** `reaction` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `warlock`, `saveSpell`, `damageSpell`, `fireDamage`

#### Baseline Prose

> **Hellish Rebuke.** _Trigger:_ When you take damage. _Response:_ _Dexterity Saving Throw:_ DC 15, the attacker. _Failure:_ 2d10 Fire damage. _Success:_ Half damage. _Upcast:_ +1d10 Fire damage.

#### Individual Feature Modifications (4)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Hellish Rebuke.** _Trigger:_ When you take damage. _Response:_ _Dexterity Saving Throw:_ DC 15, the attacker. _Failure:_ 2d10+3 Fire damage. _Success:_ Half damage. _Upcast:_ +1d10 Fire damage.

* **+ Fire Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml))*
  > **Hellish Rebuke.** _Trigger:_ When you take damage. _Response:_ _Dexterity Saving Throw:_ DC 15, the attacker. _Failure:_ 2d10 Fire damage. _Success:_ Half damage. _Upcast:_ +1d10 Fire damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Hellish Rebuke.** _Trigger:_ When you take damage. _Response:_ _Dexterity Saving Throw:_ DC 15, the attacker. _Failure:_ 2d10+3 Fire damage. _Success:_ Half damage. _Upcast:_ +1d10 Fire damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Hellish Rebuke.** _Trigger:_ When you take damage. _Response:_ _Dexterity Saving Throw:_ DC 15, the attacker. _Failure:_ 2d10 Fire damage. _Success:_ Half damage. _Upcast:_ +1d10 Fire damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit, Alchemist]**
  > **Hellish Rebuke.** _Trigger:_ When you take damage. _Response:_ _Dexterity Saving Throw:_ DC 15, the attacker. _Failure:_ 2d10+6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d10 Fire damage.

* **Stack: SORCERER + [Fire Affinity]**
  > **Hellish Rebuke.** _Trigger:_ When you take damage. _Response:_ _Dexterity Saving Throw:_ DC 15, the attacker. _Failure:_ 2d10 Fire damage. _Success:_ Half damage. _Upcast:_ +1d10 Fire damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Hellish Rebuke.** _Trigger:_ When you take damage. _Response:_ _Dexterity Saving Throw:_ DC 15, the attacker. _Failure:_ 2d10 Fire damage. _Success:_ Half damage. _Upcast:_ +1d10 Fire damage.

---

### Heroism (`heroism`)

- **Source File:** [`data/spells/level1Spells/heroism.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/heroism.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `enchantment`, `bard`, `paladin`

#### Baseline Prose

> **Heroism.** One creature you touch has Immunity to the Frightened condition, and gains 3 Temporary Hit Points at the start of each of its turns. _Concentration:_ Up to 1 minute. _Upcast:_ +1 target.

---

### Hex (`hex`)

- **Source File:** [`data/spells/level1Spells/hex.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/hex.yml)
- **Time:** `bonus action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `enchantment`, `warlock`

#### Baseline Prose

> **Hex.** Your attacks deal an extra 1d6 Necrotic damage to the target. _Range:_ 90 feet. _Concentration:_ Up to 1 hour. _Upcast:_ longer Concentration (level 2: up to 4 hours, level 3–4: up to 8 hours, level 5+: 24 hours).

---

### Hunter's Mark (`huntersMark`)

- **Source File:** [`data/spells/level1Spells/huntersMark.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/huntersMark.yml)
- **Time:** `bonus action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `divination`, `ranger`

#### Baseline Prose

> **Hunter's Mark.** You mark a target as your quarry. _Range:_ 90 feet. Your attacks deal an extra 1d6 Force damage to the target. _Concentration:_ Up to 1 hour. _Upcast:_ longer Concentration (level 3–4: up to 8 hours, level 5+: 24 hours).

#### Individual Feature Modifications (3)

* **+ Hunter's Lore** *(from [`data/classes/subclasses/ranger/hunter.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/hunter.yml))*
  > **Hunter's Mark.** You mark a target as your quarry. _Range:_ 90 feet. Your attacks deal an extra 1d6 Force damage to the target. You know whether the creature has any Immunities, Resistances, or Vulnerabilities, and if it has any, you know what they are. _Concentration:_ Up to 1 hour. _Upcast:_ longer Concentration (level 3–4: up to 8 hours, level 5+: 24 hours).

* **+ Hunter's Rime** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Hunter's Mark.** You mark a target as your quarry. _Range:_ 90 feet. Your attacks deal an extra 1d6 Force damage to the target. You gain 1d10+8 Temporary Hit Points. _Concentration:_ Up to 1 hour. _Upcast:_ longer Concentration (level 3–4: up to 8 hours, level 5+: 24 hours).

* **+ Winter Walker** *(from [`data/classes/subclasses/ranger/winterWalker.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/ranger/winterWalker.yml))*
  > **Hunter's Mark.** The marked creature can't take the Disengage action. You mark a target as your quarry. _Range:_ 90 feet. Your attacks deal an extra 1d6 Force damage to the target, and the marked creature can't take the Disengage action. _Concentration:_ Up to 1 hour. _Upcast:_ longer Concentration (level 3–4: up to 8 hours, level 5+: 24 hours).

#### Realistic Combined Class Stacks (2)

* **Stack: RANGER (hunter) + [Hunter's Lore]**
  > **Hunter's Mark.** You mark a target as your quarry. _Range:_ 90 feet. Your attacks deal an extra 1d6 Force damage to the target. You know whether the creature has any Immunities, Resistances, or Vulnerabilities, and if it has any, you know what they are. _Concentration:_ Up to 1 hour. _Upcast:_ longer Concentration (level 3–4: up to 8 hours, level 5+: 24 hours).

* **Stack: RANGER (winterWalker) + [Hunter's Rime, Winter Walker]**
  > **Hunter's Mark.** The marked creature can't take the Disengage action. You mark a target as your quarry. _Range:_ 90 feet. Your attacks deal an extra 1d6 Force damage to the target, and the marked creature can't take the Disengage action. You gain 1d10+8 Temporary Hit Points, and the marked creature can't take the Disengage action. _Concentration:_ Up to 1 hour. _Upcast:_ longer Concentration (level 3–4: up to 8 hours, level 5+: 24 hours).

---

### Ice Knife (`iceKnife`)

- **Source File:** [`data/spells/level1Spells/iceKnife.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/iceKnife.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `conjuration`, `druid`, `sorcerer`, `wizard`, `saveSpell`, `attackSpell`, `damageSpell`, `piercingDamage`, `coldDamage`

#### Baseline Prose

> **Ice Knife.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 1d10 Piercing damage. _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within inherit. _Failure:_ 2d6 Cold damage. _Upcast:_ +1d6 Cold damage.

#### Individual Feature Modifications (5)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Ice Knife.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 1d10+3 Piercing damage. _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within inherit. _Failure:_ 2d6+3 Cold damage. _Upcast:_ +1d6 Cold damage.

* **+ Cold Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml))*
  > **Ice Knife.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 1d10 Piercing damage. _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within inherit. _Failure:_ 2d6 Cold damage. _Upcast:_ +1d6 Cold damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Ice Knife.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 1d10 Piercing damage. _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within inherit. _Failure:_ 2d6 Cold damage. _Upcast:_ +1d6 Cold damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Ice Knife.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 1d10 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within inherit. _Failure:_ 2d6 Cold damage. _Upcast:_ +1d6 Cold damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Ice Knife.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 1d10 Piercing damage. _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within inherit. _Failure:_ 2d6 Cold damage. _Upcast:_ +1d6 Cold damage.

#### Realistic Combined Class Stacks (4)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit]**
  > **Ice Knife.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 1d10+3 Piercing damage. _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within inherit. _Failure:_ 2d6+3 Cold damage. _Upcast:_ +1d6 Cold damage.

* **Stack: SORCERER + [Increased Range, Cold Affinity]**
  > **Ice Knife.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 1d10 Piercing damage. _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within inherit. _Failure:_ 2d6 Cold damage. _Upcast:_ +1d6 Cold damage.

* **Stack: BARD (spirits) + [Increased Range, Power from Beyond (Damage)]**
  > **Ice Knife.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 1d10 Piercing damage. _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within inherit. _Failure:_ 2d6 Cold damage. _Upcast:_ +1d6 Cold damage.

* **Stack: CLERIC (grave) + [Increased Range, Pull of Death]**
  > **Ice Knife.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 1d10 Piercing damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within inherit. _Failure:_ 2d6 Cold damage. _Upcast:_ +1d6 Cold damage.

---

### Identify (`identify`)

- **Source File:** [`data/spells/level1Spells/identify.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/identify.yml)
- **Time:** `1 minute` | **Range:** `touch` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `divination`, `artificer`, `bard`, `wizard`, `ritual`, `psion`

#### Baseline Prose

> **Identify.** You learn the magical properties of an object or spell effect. _Range:_ Touch. _Ritual_.

---

### Illusory Script (`illusoryScript`)

- **Source File:** [`data/spells/level1Spells/illusoryScript.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/illusoryScript.yml)
- **Time:** `1 minute` | **Range:** `touch` | **Duration:** `10 days`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `illusion`, `bard`, `warlock`, `wizard`, `ritual`

#### Baseline Prose

> **Illusory Script.** You write a message that appears normal only to designated readers. _Range:_ Touch. _Duration:_ 10 days. _Ritual_.

---

### Inflict Wounds (`inflictWounds`)

- **Source File:** [`data/spells/level1Spells/inflictWounds.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/inflictWounds.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `necromancy`, `cleric`, `saveSpell`, `damageSpell`, `necroticDamage`

#### Baseline Prose

> **Inflict Wounds.** _Constitution Saving Throw:_ DC 15, one creature you touch. _Failure:_ 2d10 Necrotic damage. _Success:_ Half damage. _Upcast:_ +1d10 Necrotic damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Inflict Wounds.** _Constitution Saving Throw:_ DC 15, one creature you touch. _Failure:_ 2d10+3 Necrotic damage. _Success:_ Half damage. _Upcast:_ +1d10 Necrotic damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Inflict Wounds.** _Constitution Saving Throw:_ DC 15, one creature you touch. _Failure:_ 2d10 Necrotic damage. _Success:_ Half damage. _Upcast:_ +1d10 Necrotic damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Inflict Wounds.** _Constitution Saving Throw:_ DC 15, one creature you touch. _Failure:_ 2d10+3 Necrotic damage. _Success:_ Half damage. _Upcast:_ +1d10 Necrotic damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Inflict Wounds.** _Constitution Saving Throw:_ DC 15, one creature you touch. _Failure:_ 2d10 Necrotic damage. _Success:_ Half damage. _Upcast:_ +1d10 Necrotic damage.

---

### Jump (`jump`)

- **Source File:** [`data/spells/level1Spells/jump.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/jump.yml)
- **Time:** `bonus action` | **Range:** `touch` | **Duration:** `1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `transmutation`, `artificer`, `druid`, `ranger`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Jump.** You touch a creature to triple its jump distance. _Duration:_ 1 minute. _Upcast:_ +1 target.

---

### Life Siphon (`lifeSiphon`)

- **Source File:** [`data/spells/level1Spells/lifeSiphon.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/lifeSiphon.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `psion`, `attackSpell`, `damageSpell`, `psychicDamage`

#### Baseline Prose

> **Life Siphon.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 1d10 Psychic damage, and you can expend one Hit Point Die to increase the damage by 1d10. _Upcast:_ +1d10 Psychic damage.

#### Individual Feature Modifications (4)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Life Siphon.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 1d10+3 Psychic damage, and you can expend one Hit Point Die to increase the damage by 1d10. _Upcast:_ +1d10 Psychic damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Life Siphon.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 1d10 Psychic damage, and you can expend one Hit Point Die to increase the damage by 1d10. _Upcast:_ +1d10 Psychic damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Life Siphon.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 1d10 Psychic damage, you can expend one Hit Point Die to increase the damage by 1d10, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Upcast:_ +1d10 Psychic damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Life Siphon.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 1d10 Psychic damage, and you can expend one Hit Point Die to increase the damage by 1d10. _Upcast:_ +1d10 Psychic damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit]**
  > **Life Siphon.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 1d10+3 Psychic damage, and you can expend one Hit Point Die to increase the damage by 1d10. _Upcast:_ +1d10 Psychic damage.

* **Stack: BARD (spirits) + [Increased Range, Power from Beyond (Damage)]**
  > **Life Siphon.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 1d10 Psychic damage, and you can expend one Hit Point Die to increase the damage by 1d10. _Upcast:_ +1d10 Psychic damage.

* **Stack: CLERIC (grave) + [Increased Range, Pull of Death]**
  > **Life Siphon.** _Ranged Attack Roll:_ +7, range 180 feet. _Hit:_ 1d10 Psychic damage, you can expend one Hit Point Die to increase the damage by 1d10, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Upcast:_ +1d10 Psychic damage.

---

### Longstrider (`longstrider`)

- **Source File:** [`data/spells/level1Spells/longstrider.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/longstrider.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `1 hour`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `transmutation`, `artificer`, `bard`, `druid`, `ranger`, `wizard`, `psion`

#### Baseline Prose

> **Longstrider.** One creature you touch gains a +10 bonus to Speed feet. _Duration:_ 1 hour. _Upcast:_ +1 target.

---

### Mage Armor (`mageArmor`)

- **Source File:** [`data/spells/level1Spells/mageArmor.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/mageArmor.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `8 hours`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `abjuration`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Mage Armor.** One creature you touch's base AC becomes 13 plus its Dexterity modifier. _Duration:_ 8 hours.

---

### Magic Missile (`magicMissile`)

- **Source File:** [`data/spells/level1Spells/magicMissile.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/magicMissile.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `sorcerer`, `wizard`

#### Baseline Prose

> **Magic Missile.** Up to 3 creatures within 120 feet take 1d4+1 Force damage. _Upcast:_ +1 target.

---

### Protection from Evil and Good (`protectionFromEvilAndGood`)

- **Source File:** [`data/spells/level1Spells/protectionFromEvilAndGood.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/protectionFromEvilAndGood.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration up to 10 minutes`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `abjuration`, `cleric`, `druid`, `paladin`, `warlock`, `wizard`

#### Baseline Prose

> **Protection from Evil and Good.** You protect a willing creature against otherworldly entities. _Range:_ Touch. _Concentration:_ Up to 10 minutes.

---

### Purify Food and Drink (`purifyFoodAndDrink`)

- **Source File:** [`data/spells/level1Spells/purifyFoodAndDrink.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/purifyFoodAndDrink.yml)
- **Time:** `action` | **Range:** `10 feet` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `transmutation`, `artificer`, `cleric`, `druid`, `paladin`, `ritual`

#### Baseline Prose

> **Purify Food and Drink.** You cleanse nonmagical food and drink of poison and rot. _Range:_ 10 feet. _Ritual_.

---

### Ray of Sickness (`rayOfSickness`)

- **Source File:** [`data/spells/level1Spells/rayOfSickness.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/rayOfSickness.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `necromancy`, `sorcerer`, `wizard`, `attackSpell`, `damageSpell`, `poisonDamage`

#### Baseline Prose

> **Ray of Sickness.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8 Poison damage, and the target has the Poisoned condition. _Upcast:_ +1d8 Poison damage.

#### Individual Feature Modifications (6)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Ray of Sickness.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8+3 Poison damage, and the target has the Poisoned condition. _Upcast:_ +1d8 Poison damage.

* **+ Poison Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/poisonAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/poisonAffinity.yml))*
  > **Ray of Sickness.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8 Poison damage, and the target has the Poisoned condition. _Upcast:_ +1d8 Poison damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Ray of Sickness.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8+3 Poison damage, and the target has the Poisoned condition. _Upcast:_ +1d8 Poison damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Ray of Sickness.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8 Poison damage, and the target has the Poisoned condition. _Upcast:_ +1d8 Poison damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Ray of Sickness.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d8 Poison damage, the target has the Poisoned condition, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Upcast:_ +1d8 Poison damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Ray of Sickness.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Poison damage, and the target has the Poisoned condition. _Upcast:_ +1d8 Poison damage.

#### Realistic Combined Class Stacks (4)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Alchemist]**
  > **Ray of Sickness.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8+6 Poison damage, and the target has the Poisoned condition. _Upcast:_ +1d8 Poison damage.

* **Stack: SORCERER + [Increased Range, Poison Affinity]**
  > **Ray of Sickness.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Poison damage, and the target has the Poisoned condition. _Upcast:_ +1d8 Poison damage.

* **Stack: BARD (spirits) + [Increased Range, Power from Beyond (Damage)]**
  > **Ray of Sickness.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Poison damage, and the target has the Poisoned condition. _Upcast:_ +1d8 Poison damage.

* **Stack: CLERIC (grave) + [Increased Range, Pull of Death]**
  > **Ray of Sickness.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d8 Poison damage, the target has the Poisoned condition, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Upcast:_ +1d8 Poison damage.

---

### Sanctuary (`sanctuary`)

- **Source File:** [`data/spells/level1Spells/sanctuary.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/sanctuary.yml)
- **Time:** `bonus action` | **Range:** `30 feet` | **Duration:** `1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `abjuration`, `artificer`, `cleric`, `saveSpell`, `psion`

#### Baseline Prose

> **Sanctuary.** Any creature who targets the target with an attack or harmful spell must first succeed on the following save. _Range:_ 30 feet. _Wisdom Saving Throw:_ DC 15. _Failure:_ The attacker must either choose a new target or lose the attack or spell. _Duration:_ 1 minute.

---

### Searing Smite (`searingSmite`)

- **Source File:** [`data/spells/level1Spells/searingSmite.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/searingSmite.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `paladin`, `saveSpell`, `damageSpell`, `fireDamage`

#### Baseline Prose

> **Searing Smite.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Constitution Saving Throw:_ DC 15, the target. _Failure or Success:_ 1d6 Fire damage. _Failure:_ The target takes 1d6 Fire damage at start of each of its turns until it puts out flames. _Duration:_ 1 minute. _Upcast:_ +1d6 Fire damage.

---

### Shield (`shield`)

- **Source File:** [`data/spells/level1Spells/shield.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/shield.yml)
- **Time:** `reaction` | **Range:** `self` | **Duration:** `1 round`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `abjuration`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Shield.** _Trigger:_ When you are hit by an attack. _Response:_ You gain a +5 bonus to your AC until the start of your next turn, including against the triggering attack, and take no damage from Magic Missile. _Duration:_ 1 round.

#### Individual Feature Modifications (1)

* **+ Rebounding Field** *(from [`data/classes/subclasses/psion/psykinetic.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/psykinetic.yml))*
  > **Shield.** _Trigger:_ When you are hit by an attack. _Response:_ You gain a +5 bonus to your AC until the start of your next turn, including against the triggering attack, and take no damage from Magic Missile. _Dexterity Saving Throw:_ DC 15, the attacker. _Failure or Success:_ Temporary Hit Points. _Failure:_ 1d1d8+3 Force damage. _Success:_ Half damage. _Duration:_ 1 round.

#### Realistic Combined Class Stacks (1)

* **Stack: PSION (psykinetic) + [Rebounding Field]**
  > **Shield.** _Trigger:_ When you are hit by an attack. _Response:_ You gain a +5 bonus to your AC until the start of your next turn, including against the triggering attack, and take no damage from Magic Missile. _Dexterity Saving Throw:_ DC 15, the attacker. _Failure or Success:_ Temporary Hit Points. _Failure:_ 1d1d8+3 Force damage. _Success:_ Half damage. _Duration:_ 1 round.

---

### Shield of Faith (`shieldOfFaith`)

- **Source File:** [`data/spells/level1Spells/shieldOfFaith.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/shieldOfFaith.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `abjuration`, `cleric`, `paladin`

#### Baseline Prose

> **Shield of Faith.** One creature within 60 feet gains a +2 bonus to AC. _Concentration:_ Up to 10 minutes.

---

### Silent Image (`silentImage`)

- **Source File:** [`data/spells/level1Spells/silentImage.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/silentImage.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `illusion`, `bard`, `sorcerer`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Silent Image.** You create a visual illusion of an object or creature. _Range:_ 60 feet. _Concentration:_ Up to 10 minutes.

#### Individual Feature Modifications (1)

* **+ Illusionist** *(from [`data/classes/subclasses/wizard/illusionist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/illusionist.yml))*
  > **Silent Image.** You create a visual illusion of an object or creature. _Range:_ 120 feet. _Concentration:_ Up to 10 minutes.

#### Realistic Combined Class Stacks (1)

* **Stack: WIZARD (illusionist) + [Illusionist]**
  > **Silent Image.** You create a visual illusion of an object or creature. _Range:_ 120 feet. _Concentration:_ Up to 10 minutes.

---

### Sleep (`sleep`)

- **Source File:** [`data/spells/level1Spells/sleep.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/sleep.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `enchantment`, `bard`, `sorcerer`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Sleep.** _Wisdom Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 60 feet. _Failure:_ Each target is Incapacitated until the end of its next turn, repeating the save then or becoming Unconscious. _Concentration:_ Up to 1 minute.

---

### Speak with Animals (`speakWithAnimals`)

- **Source File:** [`data/spells/level1Spells/speakWithAnimals.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/speakWithAnimals.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `divination`, `bard`, `druid`, `ranger`, `warlock`, `ritual`, `psion`

#### Baseline Prose

> **Speak with Animals.** You gain the ability to comprehend and speak with beasts. _Duration:_ 10 minutes. _Ritual_.

---

### Hideous Laughter (`tashasHideousLaughter`)

- **Source File:** [`data/spells/level1Spells/tashasHideousLaughter.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/tashasHideousLaughter.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `enchantment`, `bard`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Hideous Laughter.** _Wisdom Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ The target has the Incapacitated and Prone condition (repeats save at end of each turn). _Concentration:_ Up to 1 minute. _Upcast:_ +1 target.

---

### Floating Disk (`tensersFloatingDisk`)

- **Source File:** [`data/spells/level1Spells/tensersFloatingDisk.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/tensersFloatingDisk.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `1 hour`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `conjuration`, `wizard`, `ritual`, `psion`

#### Baseline Prose

> **Floating Disk.** You create a floating plane of force that follows you carrying cargo. _Range:_ 30 feet. _Duration:_ 1 hour. _Ritual_.

---

### Thunderous Smite (`thunderousSmite`)

- **Source File:** [`data/spells/level1Spells/thunderousSmite.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/thunderousSmite.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `paladin`, `saveSpell`, `damageSpell`, `thunderDamage`

#### Baseline Prose

> **Thunderous Smite.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Strength Saving Throw:_ DC 15, the target. _Failure or Success:_ 2d6 Thunder damage. _Failure:_ The target is Prone and is pushed up to 10 feet away. _Upcast:_ +1d6 Thunder damage.

---

### Thunderwave (`thunderwave`)

- **Source File:** [`data/spells/level1Spells/thunderwave.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/thunderwave.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `bard`, `druid`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `thunderDamage`, `psion`

#### Baseline Prose

> **Thunderwave.** _Constitution Saving Throw:_ DC 15, each creature in a 15-foot-radius Emanation centered on you. _Failure:_ 2d8 Thunder damage, and each target is pushed up to 10 feet away. _Success:_ Half damage. _Upcast:_ +1d8 Thunder damage.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Thunderwave.** _Constitution Saving Throw:_ DC 15, each creature in a 15-foot-radius Emanation centered on you. _Failure:_ 2d8+3 Thunder damage, and each target is pushed up to 10 feet away. _Success:_ Half damage. _Upcast:_ +1d8 Thunder damage.

* **+ Artillerist** *(from [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml))*
  > **Thunderwave.** _Constitution Saving Throw:_ DC 15, each creature in a 15-foot-radius Emanation centered on you. _Failure:_ 2d8 Thunder damage plus 1d8 damage, and each target is pushed up to 10 feet away. _Success:_ Half damage. _Upcast:_ +1d8 Thunder damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Thunderwave.** _Constitution Saving Throw:_ DC 15, each creature in a 15-foot-radius Emanation centered on you. _Failure:_ 2d8 Thunder damage, and each target is pushed up to 10 feet away. _Success:_ Half damage. _Upcast:_ +1d8 Thunder damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit, Artillerist]**
  > **Thunderwave.** _Constitution Saving Throw:_ DC 15, each creature in a 15-foot-radius Emanation centered on you. _Failure:_ 2d8+3 Thunder damage plus 1d8 damage, and each target is pushed up to 10 feet away. _Success:_ Half damage. _Upcast:_ +1d8 Thunder damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Thunderwave.** _Constitution Saving Throw:_ DC 15, each creature in a 15-foot-radius Emanation centered on you. _Failure:_ 2d8 Thunder damage, and each target is pushed up to 10 feet away. _Success:_ Half damage. _Upcast:_ +1d8 Thunder damage.

---

### Unseen Servant (`unseenServant`)

- **Source File:** [`data/spells/level1Spells/unseenServant.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/unseenServant.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `1 hour`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `conjuration`, `bard`, `warlock`, `wizard`, `ritual`

#### Baseline Prose

> **Unseen Servant.** You create an invisible force to perform simple tasks for you. _Range:_ 60 feet. _Duration:_ 1 hour. _Ritual_.

---

### Witch Bolt (`witchBolt`)

- **Source File:** [`data/spells/level1Spells/witchBolt.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/witchBolt.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `evocation`, `sorcerer`, `warlock`, `wizard`, `attackSpell`, `damageSpell`, `lightningDamage`

#### Baseline Prose

> **Witch Bolt.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d12 Lightning damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning damage.

#### Individual Feature Modifications (7)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d12+3 Lightning damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning damage.

* **+ Lightning Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml))*
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d12 Lightning damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d12 Lightning damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d12 Lightning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1 damage.

* **+ Psychic Spells** *(from [`data/classes/subclasses/warlock/greatOldOnePatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/greatOldOnePatron.yml))*
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d12 Lightning or Psychic damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning or Psychic damage.

* **+ Necrotic Spell Conversion** *(from [`data/classes/subclasses/warlock/undeadPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/undeadPatron.yml))*
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 2d12 Lightning or Necrotic damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning or Necrotic damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d12 Lightning damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning damage.

#### Realistic Combined Class Stacks (6)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit]**
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d12+3 Lightning damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning damage.

* **Stack: SORCERER + [Increased Range, Lightning Affinity]**
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d12 Lightning damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning damage.

* **Stack: BARD (spirits) + [Increased Range, Power from Beyond (Damage)]**
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d12 Lightning damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning damage.

* **Stack: CLERIC (grave) + [Increased Range, Pull of Death]**
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d12 Lightning damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1 damage.

* **Stack: WARLOCK (greatOldOnePatron) + [Increased Range, Psychic Spells]**
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d12 Lightning or Psychic damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning or Psychic damage.

* **Stack: WARLOCK (undeadPatron) + [Increased Range, Necrotic Spell Conversion]**
  > **Witch Bolt.** _Ranged Attack Roll:_ +7, range 120 feet. _Hit:_ 2d12 Lightning or Necrotic damage, and on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically. _Concentration:_ Up to 1 minute. _Upcast:_ +1d12 Lightning or Necrotic damage.

---

### Wrathful Smite (`wrathfulSmite`)

- **Source File:** [`data/spells/level1Spells/wrathfulSmite.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level1Spells/wrathfulSmite.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `level1SpellSlot`
- **Tags:** `level1Spell`, `necromancy`, `paladin`, `saveSpell`, `damageSpell`, `necroticDamage`

#### Baseline Prose

> **Wrathful Smite.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Wisdom Saving Throw:_ DC 15, the target. _Failure or Success:_ 1d6 Necrotic damage. _Failure:_ The target has the Frightened condition (repeats save at end of each turn). _Duration:_ 1 minute. _Upcast:_ +1d6 Necrotic damage.

---

## Spells: 2nd Level

### Aid (`aid`)

- **Source File:** [`data/spells/level2Spells/aid.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/aid.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `8 hours`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `abjuration`, `artificer`, `bard`, `cleric`, `druid`, `paladin`, `ranger`

#### Baseline Prose

> **Aid.** Up to 3 creatures within 30 feet increase their hit point maximum and current hit points by 5. _Duration:_ 8 hours. _Upcast:_ 0 targets.

---

### Alter Self (`alterSelf`)

- **Source File:** [`data/spells/level2Spells/alterSelf.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/alterSelf.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `artificer`, `sorcerer`, `wizard`

#### Baseline Prose

> **Alter Self.** You alter your physical form to aquatic, weaponized, or cosmetic traits. _Concentration:_ Up to 1 hour.

---

### Animal Messenger (`animalMessenger`)

- **Source File:** [`data/spells/level2Spells/animalMessenger.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/animalMessenger.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `24 hours`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `enchantment`, `bard`, `druid`, `ranger`, `ritual`, `saveSpell`, `psion`

#### Baseline Prose

> **Animal Messenger.** You command a tiny beast to deliver a message to a distant location. _Range:_ 30 feet. _Duration:_ 24 hours. _Ritual_. _Upcast:_ +48 hours duration.

---

### Arcane Lock (`arcaneLock`)

- **Source File:** [`data/spells/level2Spells/arcaneLock.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/arcaneLock.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `until dispelled`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `abjuration`, `artificer`, `wizard`

#### Baseline Prose

> **Arcane Lock.** You magically lock an entry point or container. _Range:_ Touch. _Duration:_ Until dispelled.

---

### Arcane Vigor (`arcaneVigor`)

- **Source File:** [`data/spells/level2Spells/arcaneVigor.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/arcaneVigor.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `abjuration`, `artificer`, `sorcerer`, `wizard`, `healingSpell`

#### Baseline Prose

> **Arcane Vigor.** You can expend up to two Hit Point Dice to regain Hit Points equal to the roll plus 3. _Upcast:_ +1 Hit Die you can roll.

---

### Augury (`augury`)

- **Source File:** [`data/spells/level2Spells/augury.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/augury.yml)
- **Time:** `1 minute` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `divination`, `cleric`, `druid`, `wizard`, `ritual`

#### Baseline Prose

> **Augury.** You consult otherworldly omens regarding a specific future action. _Ritual_.

---

### Barkskin (`barkskin`)

- **Source File:** [`data/spells/level2Spells/barkskin.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/barkskin.yml)
- **Time:** `bonus action` | **Range:** `touch` | **Duration:** `1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `druid`, `ranger`

#### Baseline Prose

> **Barkskin.** One creature you touch's base AC becomes 17. _Duration:_ 1 hour.

---

### Beast Sense (`beastSense`)

- **Source File:** [`data/spells/level2Spells/beastSense.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/beastSense.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `divination`, `druid`, `ranger`, `ritual`

#### Baseline Prose

> **Beast Sense.** You touch a willing Beast. _Concentration:_ Up to 1 hour. _Ritual_.

---

### Blindness/Deafness (`blindnessdeafness`)

- **Source File:** [`data/spells/level2Spells/blindnessdeafness.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/blindnessdeafness.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `bard`, `cleric`, `sorcerer`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Blindness/Deafness.** _Constitution Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ The target has the Blinded and Deafened condition (repeats save at end of each turn), and repeats the save at the end of each of its turns. _Duration:_ 1 minute. _Upcast:_ +1 target.

---

### Blur (`blur`)

- **Source File:** [`data/spells/level2Spells/blur.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/blur.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `illusion`, `artificer`, `sorcerer`, `wizard`

#### Baseline Prose

> **Blur.** Attack rolls against you have Disadvantage. _Concentration:_ Up to 1 minute.

---

### Calm Emotions (`calmEmotions`)

- **Source File:** [`data/spells/level2Spells/calmEmotions.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/calmEmotions.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `enchantment`, `bard`, `cleric`, `saveSpell`, `psion`

#### Baseline Prose

> **Calm Emotions.** _Charisma Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 60 feet. _Failure:_ Each target has Charmed and Frightened conditions suppressed, or becomes indifferent to creatures you choose. _Concentration:_ Up to 1 minute.

---

### Cloud Of Daggers (`cloudOfDaggers`)

- **Source File:** [`data/spells/level2Spells/cloudOfDaggers.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/cloudOfDaggers.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `conjuration`, `bard`, `sorcerer`, `warlock`, `wizard`

#### Baseline Prose

> **Cloud Of Daggers.** A 5-foot-radius Cube of spinning daggers appears centered on a point within 60 feet. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ 4d4 Slashing damage. _Concentration:_ Up to 1 minute. _Upcast:_ +2d4 Slashing damage.

---

### Continual Flame (`continualFlame`)

- **Source File:** [`data/spells/level2Spells/continualFlame.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/continualFlame.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `until dispelled`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `evocation`, `artificer`, `cleric`, `druid`, `wizard`

#### Baseline Prose

> **Continual Flame.** You create a permanent, heatless flame that sheds light. _Range:_ Touch. _Duration:_ Until dispelled.

---

### Cordon Of Arrows (`cordonOfArrows`)

- **Source File:** [`data/spells/level2Spells/cordonOfArrows.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/cordonOfArrows.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `8 hours`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `ranger`, `saveSpell`, `damageSpell`, `piercingDamage`

#### Baseline Prose

> **Cordon Of Arrows.** You ward an area with ammunition that rises to strike approaching foes. _Range:_ Touch. _Duration:_ 8 hours. _Upcast:_ +2 affected ammo.

---

### Crown Of Madness (`crownOfMadness`)

- **Source File:** [`data/spells/level2Spells/crownOfMadness.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/crownOfMadness.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `enchantment`, `bard`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Crown Of Madness.** _Wisdom Saving Throw:_ DC 15, one humanoid within 120 feet. _Failure:_ The target has the Charmed condition (repeats save at end of each turn), and must use its action before moving to make a melee attack against a creature you choose. _Concentration:_ Up to 1 minute.

---

### Darkness (`darkness`)

- **Source File:** [`data/spells/level2Spells/darkness.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/darkness.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `evocation`, `sorcerer`, `warlock`, `wizard`

#### Baseline Prose

> **Darkness.** A 15-foot-radius Sphere centered on a point within 60 feet magical darkness spreads from a point, blocking vision and darkvision. _Concentration:_ Up to 10 minutes.

---

### Darkvision (`darkvision`)

- **Source File:** [`data/spells/level2Spells/darkvision.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/darkvision.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `8 hours`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `artificer`, `druid`, `ranger`, `sorcerer`, `wizard`

#### Baseline Prose

> **Darkvision.** One creature you touch gains Darkvision with a range of 150 feet. _Duration:_ 8 hours.

---

### Detect Thoughts (`detectThoughts`)

- **Source File:** [`data/spells/level2Spells/detectThoughts.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/detectThoughts.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `divination`, `bard`, `sorcerer`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Detect Thoughts.** _Wisdom Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ You read the target's surface thoughts or probe deeper into its mind. _Concentration:_ Up to 1 minute.

#### Individual Feature Modifications (1)

* **+ Telepath** *(from [`data/classes/subclasses/psion/telepath.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/telepath.yml))*
  > **Detect Thoughts.** _Wisdom Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ You read the target's surface thoughts or probe deeper into its mind, and if the target fails its saving throw, it does not know you are probing its mind. _Concentration:_ Up to 1 minute.

#### Realistic Combined Class Stacks (1)

* **Stack: PSION (telepath) + [Telepath]**
  > **Detect Thoughts.** _Wisdom Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ You read the target's surface thoughts or probe deeper into its mind, and if the target fails its saving throw, it does not know you are probing its mind. _Concentration:_ Up to 1 minute.

---

### Dragon's Breath (`dragonsBreath`)

- **Source File:** [`data/spells/level2Spells/dragonsBreath.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/dragonsBreath.yml)
- **Time:** `bonus action` | **Range:** `touch` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `artificer`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `fireDamage`, `coldDamage`, `acidDamage`, `poisonDamage`, `lightningDamage`

#### Baseline Prose

> **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

#### Individual Feature Modifications (9)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6+3 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

* **+ Acid Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml))*
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

* **+ Cold Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml))*
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

* **+ Fire Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml))*
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

* **+ Lightning Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml))*
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

* **+ Poison Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/poisonAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/poisonAffinity.yml))*
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6+3 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

* **+ Artillerist** *(from [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml))*
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6 Acid, Cold, Fire, Lightning, or Poison damage plus 1d8 damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1 damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

#### Realistic Combined Class Stacks (4)

* **Stack: ARTIFICER + [Arcane Conduit, Alchemist]**
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6+6 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

* **Stack: ARTIFICER + [Arcane Conduit, Artillerist]**
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6+3 Acid, Cold, Fire, Lightning, or Poison damage plus 1d8 damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1 damage.

* **Stack: SORCERER + [Acid Affinity, Cold Affinity, Fire Affinity, Lightning Affinity, Poison Affinity]**
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Dragon's Breath.** You touch a willing creature. Until the spell ends, the target can take the following Action. **Exhale Breath.** _Dexterity Saving Throw:_ DC 15, each creature in a 15-foot-radius Cone centered on a point within 15 feet. _Failure:_ 3d6 Acid, Cold, Fire, Lightning, or Poison damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Acid, Cold, Fire, Lightning, or Poison damage.

---

### Ectoplasmic Trail (`ectoplasmicTrail`)

- **Source File:** [`data/spells/level2Spells/ectoplasmicTrail.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/ectoplasmicTrail.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `necromancy`, `psion`, `warlock`, `damageSpell`, `necroticDamage`

#### Baseline Prose

> **Ectoplasmic Trail.** You cloak yourself in spirits, avoiding opportunity attacks and leaving slowing ectoplasm. _Upcast:_ +10 ft. Speed while cloaked.

---

### Ego Whip (`egoWhip`)

- **Source File:** [`data/spells/level2Spells/egoWhip.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/egoWhip.yml)
- **Time:** `reaction` | **Range:** `120 feet` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `enchantment`, `psion`, `saveSpell`

#### Baseline Prose

> **Ego Whip.** _Trigger:_ When you make an ability check, or make a saving throw. _Response:_ _Intelligence Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 3d8 Psychic damage, and the target can't make Opportunity Attacks until the end of its next turn, and on its next turn it gets only a move, action, or Bonus Action. _Success:_ Half damage. _Upcast:_ +1d8 Psychic damage.

---

### Enhance Ability (`enhanceAbility`)

- **Source File:** [`data/spells/level2Spells/enhanceAbility.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/enhanceAbility.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `artificer`, `bard`, `cleric`, `druid`, `ranger`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Enhance Ability.** One creature you touch gains Advantage on ability checks for a chosen attribute. _Concentration:_ Up to 1 hour. _Upcast:_ +1 target.

---

### Enlarge/Reduce (`enlargereduce`)

- **Source File:** [`data/spells/level2Spells/enlargereduce.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/enlargereduce.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `artificer`, `bard`, `druid`, `psion`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`

#### Baseline Prose

> **Enlarge/Reduce.** _Constitution Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ The target's size doubles or halves, altering its damage and checks accordingly. _Concentration:_ Up to 1 minute.

#### Individual Feature Modifications (1)

* **+ Artillerist** *(from [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml))*
  > **Enlarge/Reduce.** _Constitution Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ 1d8 damage, and the target's size doubles or halves, altering its damage and checks accordingly. _Concentration:_ Up to 1 minute.

#### Realistic Combined Class Stacks (1)

* **Stack: ARTIFICER (artillerist) + [Artillerist]**
  > **Enlarge/Reduce.** _Constitution Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ 1d8 damage, and the target's size doubles or halves, altering its damage and checks accordingly. _Concentration:_ Up to 1 minute.

---

### Enthrall (`enthrall`)

- **Source File:** [`data/spells/level2Spells/enthrall.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/enthrall.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `enchantment`, `bard`, `warlock`, `saveSpell`, `psion`

#### Baseline Prose

> **Enthrall.** _Wisdom Saving Throw:_ DC 15, creatures of your choice within 60 feet. _Failure:_ Each target has a −10 penalty to Wisdom (Perception) checks and Passive Perception. _Concentration:_ Up to 1 minute.

---

### Find Steed (`findSteed`)

- **Source File:** [`data/spells/level2Spells/findSteed.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/findSteed.yml)
- **Time:** `N/A` | **Range:** `N/A` | **Duration:** `N/A`
- **Tags:** `level2Spell`, `conjuration`, `paladin`

#### Baseline Prose

> **Find Steed.** You summon an otherworldly spirit that takes the form of a loyal mount.

---

### Find Traps (`findTraps`)

- **Source File:** [`data/spells/level2Spells/findTraps.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/findTraps.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `divination`, `cleric`, `druid`, `ranger`

#### Baseline Prose

> **Find Traps.** You sense the presence of any sudden or dangerous traps nearby. _Range:_ 120 feet.

---

### Flame Blade (`flameBlade`)

- **Source File:** [`data/spells/level2Spells/flameBlade.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/flameBlade.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `evocation`, `druid`, `sorcerer`

#### Baseline Prose

> **Flame Blade.** You evoke a fiery blade in your free hand that lasts for the duration. You can take the following Action while the blade persists. **Flame Blade Strike.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 3d6+3 Fire damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d6 Fire damage.

---

### Flaming Sphere (`flamingSphere`)

- **Source File:** [`data/spells/level2Spells/flamingSphere.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/flamingSphere.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `conjuration`, `druid`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `fireDamage`

#### Baseline Prose

> **Flaming Sphere.** A 5-foot-radius Sphere of fire appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Fire damage.

#### Individual Feature Modifications (4)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Flaming Sphere.** A 5-foot-radius Sphere of fire appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6+3 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Fire damage.

* **+ Fire Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml))*
  > **Flaming Sphere.** A 5-foot-radius Sphere of fire appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Fire damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Flaming Sphere.** A 5-foot-radius Sphere of fire appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6+3 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Fire damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Flaming Sphere.** A 5-foot-radius Sphere of fire appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Fire damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit, Alchemist]**
  > **Flaming Sphere.** A 5-foot-radius Sphere of fire appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6+6 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Fire damage.

* **Stack: SORCERER + [Fire Affinity]**
  > **Flaming Sphere.** A 5-foot-radius Sphere of fire appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Fire damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Flaming Sphere.** A 5-foot-radius Sphere of fire appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Fire damage.

---

### Gentle Repose (`gentleRepose`)

- **Source File:** [`data/spells/level2Spells/gentleRepose.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/gentleRepose.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `10 days`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `necromancy`, `cleric`, `paladin`, `wizard`, `ritual`

#### Baseline Prose

> **Gentle Repose.** You preserve a dead body from decay and undead rising. _Range:_ Touch. _Duration:_ 10 days. _Ritual_.

---

### Gust of Wind (`gustOfWind`)

- **Source File:** [`data/spells/level2Spells/gustOfWind.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/gustOfWind.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `evocation`, `druid`, `ranger`, `sorcerer`, `wizard`, `saveSpell`

#### Baseline Prose

> **Gust of Wind.** A 60-foot Line of strong wind appears originating from you. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Strength Saving Throw:_ DC 15. _Failure:_ The target is pushed up to 15 feet away. _Concentration:_ Up to 1 minute.

---

### Heat Metal (`heatMetal`)

- **Source File:** [`data/spells/level2Spells/heatMetal.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/heatMetal.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `artificer`, `bard`, `druid`, `saveSpell`, `damageSpell`, `fireDamage`, `psion`

#### Baseline Prose

> **Heat Metal.** One creature within 60 feet takes 2d8 Fire damage, and the target drops the metal object or has Disadvantage on attack rolls and ability checks until the start of your next turn. _Repeat:_ On subsequent turns, you can take a Bonus Action to repeat the effect. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Fire damage.

---

### Hold Person (`holdPerson`)

- **Source File:** [`data/spells/level2Spells/holdPerson.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/holdPerson.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `enchantment`, `bard`, `cleric`, `druid`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Hold Person.** _Wisdom Saving Throw:_ DC 15, one humanoid within 60 feet. _Failure:_ The target has the Paralyzed condition (repeats save at end of each turn). _Concentration:_ Up to 1 minute. _Upcast:_ +1 Humanoid target.

---

### Invisibility (`invisibility`)

- **Source File:** [`data/spells/level2Spells/invisibility.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/invisibility.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `illusion`, `artificer`, `bard`, `sorcerer`, `warlock`, `wizard`, `psion`

#### Baseline Prose

> **Invisibility.** One creature you touch has the Invisible condition. _Concentration:_ Up to 1 hour. _Upcast:_ +1 target.

---

### Knock (`knock`)

- **Source File:** [`data/spells/level2Spells/knock.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/knock.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `bard`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Knock.** A loud knock echoes as you open locks, bars, and latches. _Range:_ 60 feet.

---

### Lesser Restoration (`lesserRestoration`)

- **Source File:** [`data/spells/level2Spells/lesserRestoration.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/lesserRestoration.yml)
- **Time:** `bonus action` | **Range:** `touch` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `abjuration`, `artificer`, `bard`, `cleric`, `druid`, `paladin`, `ranger`

#### Baseline Prose

> **Lesser Restoration.** One creature you touch ends one disease or condition (Blinded, Deafened, Paralyzed, or Poisoned) on the target.

---

### Levitate (`levitate`)

- **Source File:** [`data/spells/level2Spells/levitate.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/levitate.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `artificer`, `sorcerer`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Levitate.** _Constitution Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ The target rises vertically up to 20 feet and remains suspended in the air. _Concentration:_ Up to 10 minutes.

---

### Locate Animals or Plants (`locateAnimalsOrPlants`)

- **Source File:** [`data/spells/level2Spells/locateAnimalsOrPlants.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/locateAnimalsOrPlants.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `divination`, `bard`, `druid`, `ranger`, `ritual`, `psion`

#### Baseline Prose

> **Locate Animals or Plants.** You sense the direction of a specific kind of beast or plant. _Ritual_.

---

### Locate Object (`locateObject`)

- **Source File:** [`data/spells/level2Spells/locateObject.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/locateObject.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `divination`, `bard`, `cleric`, `druid`, `paladin`, `ranger`, `wizard`, `psion`

#### Baseline Prose

> **Locate Object.** You sense the direction to a familiar object nearby. _Concentration:_ Up to 10 minutes.

---

### Magic Mouth (`magicMouth`)

- **Source File:** [`data/spells/level2Spells/magicMouth.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/magicMouth.yml)
- **Time:** `1 minute` | **Range:** `30 feet` | **Duration:** `until dispelled`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `illusion`, `artificer`, `bard`, `wizard`, `ritual`, `psion`

#### Baseline Prose

> **Magic Mouth.** You enchant an object to speak a message when a trigger occurs. _Range:_ 30 feet. _Duration:_ Until dispelled. _Ritual_.

#### Individual Feature Modifications (1)

* **+ Illusionist** *(from [`data/classes/subclasses/wizard/illusionist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/illusionist.yml))*
  > **Magic Mouth.** You enchant an object to speak a message when a trigger occurs. _Range:_ 90 feet. _Duration:_ Until dispelled. _Ritual_.

#### Realistic Combined Class Stacks (1)

* **Stack: WIZARD (illusionist) + [Illusionist]**
  > **Magic Mouth.** You enchant an object to speak a message when a trigger occurs. _Range:_ 90 feet. _Duration:_ Until dispelled. _Ritual_.

---

### Magic Weapon (`magicWeapon`)

- **Source File:** [`data/spells/level2Spells/magicWeapon.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/magicWeapon.yml)
- **Time:** `bonus action` | **Range:** `touch` | **Duration:** `1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `artificer`, `paladin`, `ranger`, `sorcerer`, `wizard`

#### Baseline Prose

> **Magic Weapon.** Weapon becomes magical and gains a +1 bonus to attack and damage rolls. _Range:_ Touch. _Duration:_ 1 hour. _Upcast:_ +2 bonus (level 3–5 slot), +3 bonus (level 6+ slot).

---

### Acid Arrow (`melfsAcidArrow`)

- **Source File:** [`data/spells/level2Spells/melfsAcidArrow.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/melfsAcidArrow.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `evocation`, `wizard`, `attackSpell`, `damageSpell`, `acidDamage`

#### Baseline Prose

> **Acid Arrow.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 4d4 Acid damage, and the target takes 2d4 Acid damage at the end of its next turn. _Miss:_ 2d4 Acid damage. _Upcast:_ +1d4 Acid damage.

#### Individual Feature Modifications (6)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Acid Arrow.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 4d4+3 Acid damage, and the target takes 2d4 Acid damage at the end of its next turn. _Miss:_ 2d4 Acid damage. _Upcast:_ +1d4 Acid damage.

* **+ Acid Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml))*
  > **Acid Arrow.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 4d4 Acid damage, and the target takes 2d4 Acid damage at the end of its next turn. _Miss:_ 2d4 Acid damage. _Upcast:_ +1d4 Acid damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Acid Arrow.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 4d4+3 Acid damage, and the target takes 2d4 Acid damage at the end of its next turn. _Miss:_ 2d4 Acid damage. _Upcast:_ +1d4 Acid damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Acid Arrow.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 4d4 Acid damage, and the target takes 2d4 Acid damage at the end of its next turn. _Miss:_ 2d4 Acid damage. _Upcast:_ +1d4 Acid damage.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Acid Arrow.** _Ranged Attack Roll:_ +7, range 90 feet. _Hit:_ 4d4 Acid damage, the target takes 2d4 Acid damage at the end of its next turn, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Miss:_ 2d4 Acid damage. _Upcast:_ +1d4 Acid damage.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Acid Arrow.** _Ranged Attack Roll:_ +7, range 150 feet. _Hit:_ 4d4 Acid damage, and the target takes 2d4 Acid damage at the end of its next turn. _Miss:_ 2d4 Acid damage. _Upcast:_ +1d4 Acid damage.

#### Realistic Combined Class Stacks (4)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Alchemist]**
  > **Acid Arrow.** _Ranged Attack Roll:_ +7, range 150 feet. _Hit:_ 4d4+6 Acid damage, and the target takes 2d4 Acid damage at the end of its next turn. _Miss:_ 2d4 Acid damage. _Upcast:_ +1d4 Acid damage.

* **Stack: SORCERER + [Increased Range, Acid Affinity]**
  > **Acid Arrow.** _Ranged Attack Roll:_ +7, range 150 feet. _Hit:_ 4d4 Acid damage, and the target takes 2d4 Acid damage at the end of its next turn. _Miss:_ 2d4 Acid damage. _Upcast:_ +1d4 Acid damage.

* **Stack: BARD (spirits) + [Increased Range, Power from Beyond (Damage)]**
  > **Acid Arrow.** _Ranged Attack Roll:_ +7, range 150 feet. _Hit:_ 4d4 Acid damage, and the target takes 2d4 Acid damage at the end of its next turn. _Miss:_ 2d4 Acid damage. _Upcast:_ +1d4 Acid damage.

* **Stack: CLERIC (grave) + [Increased Range, Pull of Death]**
  > **Acid Arrow.** _Ranged Attack Roll:_ +7, range 150 feet. _Hit:_ 4d4 Acid damage, the target takes 2d4 Acid damage at the end of its next turn, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Miss:_ 2d4 Acid damage. _Upcast:_ +1d4 Acid damage.

---

### Mind Spike (`mindSpike`)

- **Source File:** [`data/spells/level2Spells/mindSpike.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/mindSpike.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `divination`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `damageSpell`, `psychicDamage`, `psion`

#### Baseline Prose

> **Mind Spike.** _Wisdom Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 3d8 Psychic damage, and you always know the target's location for the duration. _Success:_ Half damage. _Concentration:_ Up to 1 hour. _Upcast:_ +1d8 Psychic damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Mind Spike.** _Wisdom Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 3d8+3 Psychic damage, and you always know the target's location for the duration. _Success:_ Half damage. _Concentration:_ Up to 1 hour. _Upcast:_ +1d8 Psychic damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Mind Spike.** _Wisdom Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 3d8 Psychic damage, and you always know the target's location for the duration. _Success:_ Half damage. _Concentration:_ Up to 1 hour. _Upcast:_ +1d8 Psychic damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Mind Spike.** _Wisdom Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 3d8+3 Psychic damage, and you always know the target's location for the duration. _Success:_ Half damage. _Concentration:_ Up to 1 hour. _Upcast:_ +1d8 Psychic damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Mind Spike.** _Wisdom Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 3d8 Psychic damage, and you always know the target's location for the duration. _Success:_ Half damage. _Concentration:_ Up to 1 hour. _Upcast:_ +1d8 Psychic damage.

---

### Mirror Image (`mirrorImage`)

- **Source File:** [`data/spells/level2Spells/mirrorImage.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/mirrorImage.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `illusion`, `bard`, `sorcerer`, `warlock`, `wizard`, `psion`

#### Baseline Prose

> **Mirror Image.** Three illusory duplicates appear. Each time a creature hits you with an attack roll, roll a d6 for each of your remaining duplicates. If any of the d6s rolls a 3 or higher, one of the duplicates is hit instead of you, and the duplicate is destroyed. The duplicates otherwise ignore all other damage and effects. The spell ends when all three duplicates are destroyed. _Duration:_ 1 minute.

---

### Misty Step (`mistyStep`)

- **Source File:** [`data/spells/level2Spells/mistyStep.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/mistyStep.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `conjuration`, `sorcerer`, `warlock`, `wizard`

#### Baseline Prose

> **Misty Step.** You teleport up to 30 feet to an unoccupied space you can see.

#### Individual Feature Modifications (3)

* **+ Psi Warper** *(from [`data/classes/subclasses/psion/psiWarper.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/psion/psiWarper.yml))*
  > **Misty Step.** You teleport up to 30 feet to an unoccupied space you can see. You can cast one of your Psion cantrips with a casting time of an Action as part of this Bonus Action.

* **+ Steps of the Fey Options** *(from [`data/classes/subclasses/warlock/archfeyPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/archfeyPatron.yml))*
  > **Misty Step.** You teleport up to 30 feet to an unoccupied space you can see. **Refreshing Step.** One creature within 10 feet gains 1d10 Temporary Hit Points. **Taunting Step.** _Wisdom Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ Disadvantage on attacks against creatures other than you until the start of your next turn.

* **+ Steps of the Fey Level 6 Options** *(from [`data/classes/subclasses/warlock/archfeyPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/archfeyPatron.yml))*
  > **Misty Step.** You teleport up to 30 feet to an unoccupied space you can see. **Disappearing Step.** You have the Invisible condition until the start of your next turn or until immediately after you attack or cast a spell. **Dreadful Step.** _Wisdom Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d10 Psychic damage.

#### Realistic Combined Class Stacks (2)

* **Stack: PSION (psiWarper) + [Psi Warper]**
  > **Misty Step.** You teleport up to 30 feet to an unoccupied space you can see. You can cast one of your Psion cantrips with a casting time of an Action as part of this Bonus Action.

* **Stack: WARLOCK (archfeyPatron) + [Steps of the Fey Options, Steps of the Fey Level 6 Options]**
  > **Misty Step.** You teleport up to 30 feet to an unoccupied space you can see. **Refreshing Step.** One creature within 10 feet gains 1d10 Temporary Hit Points. **Taunting Step.** _Wisdom Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ Disadvantage on attacks against creatures other than you until the start of your next turn. **Disappearing Step.** You have the Invisible condition until the start of your next turn or until immediately after you attack or cast a spell. **Dreadful Step.** _Wisdom Saving Throw:_ DC 15, each creature in a 5-foot-radius Emanation centered on you. _Failure:_ 2d10 Psychic damage.

---

### Moonbeam (`moonbeam`)

- **Source File:** [`data/spells/level2Spells/moonbeam.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/moonbeam.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `evocation`, `druid`, `saveSpell`, `damageSpell`, `radiantDamage`

#### Baseline Prose

> **Moonbeam.** A 5-foot-radius Cylinder of silvery pale light appears centered on a point within 120 feet. You can take an action to move the area up to 60 feet. _Trigger:_ When the area is created, the area moves into a creature's space, a creature enters the area, or a creature ends its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 2d10 Radiant damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Radiant damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Moonbeam.** A 5-foot-radius Cylinder of silvery pale light appears centered on a point within 120 feet. You can take an action to move the area up to 60 feet. _Trigger:_ When the area is created, the area moves into a creature's space, a creature enters the area, or a creature ends its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 2d10+3 Radiant damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Radiant damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Moonbeam.** A 5-foot-radius Cylinder of silvery pale light appears centered on a point within 120 feet. You can take an action to move the area up to 60 feet. _Trigger:_ When the area is created, the area moves into a creature's space, a creature enters the area, or a creature ends its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 2d10 Radiant damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Radiant damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Moonbeam.** A 5-foot-radius Cylinder of silvery pale light appears centered on a point within 120 feet. You can take an action to move the area up to 60 feet. _Trigger:_ When the area is created, the area moves into a creature's space, a creature enters the area, or a creature ends its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 2d10+3 Radiant damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Radiant damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Moonbeam.** A 5-foot-radius Cylinder of silvery pale light appears centered on a point within 120 feet. You can take an action to move the area up to 60 feet. _Trigger:_ When the area is created, the area moves into a creature's space, a creature enters the area, or a creature ends its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 2d10 Radiant damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Radiant damage.

---

### Magic Aura (`nystulsMagicAura`)

- **Source File:** [`data/spells/level2Spells/nystulsMagicAura.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/nystulsMagicAura.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `24 hours`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `illusion`, `wizard`

#### Baseline Prose

> **Magic Aura.** You mask or alter the magical aura of an object or creature. _Range:_ Touch. _Duration:_ 24 hours.

---

### Pass without Trace (`passWithoutTrace`)

- **Source File:** [`data/spells/level2Spells/passWithoutTrace.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/passWithoutTrace.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `abjuration`, `druid`, `ranger`

#### Baseline Prose

> **Pass without Trace.** A 30-foot-radius Emanation you and your allies gain +10 bonus to Dexterity (Stealth) checks and can't be tracked except by magical means. _Concentration:_ Up to 1 hour.

---

### Phantasmal Force (`phantasmalForce`)

- **Source File:** [`data/spells/level2Spells/phantasmalForce.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/phantasmalForce.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `illusion`, `bard`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `psychicDamage`, `psion`

#### Baseline Prose

> **Phantasmal Force.** _Intelligence Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ The target has the Charmed condition, and treats a phantasmal illusion as real and takes 2d8 Psychic damage on each of its turns if the phantasm is dangerous. _Concentration:_ Up to 1 minute.

#### Individual Feature Modifications (1)

* **+ Illusionist** *(from [`data/classes/subclasses/wizard/illusionist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/illusionist.yml))*
  > **Phantasmal Force.** _Intelligence Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ The target has the Charmed condition, and treats a phantasmal illusion as real and takes 2d8 Psychic damage on each of its turns if the phantasm is dangerous. _Concentration:_ Up to 1 minute.

#### Realistic Combined Class Stacks (1)

* **Stack: WIZARD (illusionist) + [Illusionist]**
  > **Phantasmal Force.** _Intelligence Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ The target has the Charmed condition, and treats a phantasmal illusion as real and takes 2d8 Psychic damage on each of its turns if the phantasm is dangerous. _Concentration:_ Up to 1 minute.

---

### Prayer of Healing (`prayerOfHealing`)

- **Source File:** [`data/spells/level2Spells/prayerOfHealing.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/prayerOfHealing.yml)
- **Time:** `10 minutes` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `abjuration`, `cleric`, `paladin`, `healingSpell`

#### Baseline Prose

> **Prayer of Healing.** Up to 5 creatures within 30 feet regain 2d8+3 Hit Points. Targets gain the benefits of a Short Rest; you can't cast this spell again until you finish a Long Rest. _Upcast:_ +1d8 healing.

#### Individual Feature Modifications (2)

* **+ Power from Beyond (Healing)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Prayer of Healing.** Up to 5 creatures within 30 feet regain 2d8+3 Hit Points. Targets gain the benefits of a Short Rest; you can't cast this spell again until you finish a Long Rest. _Upcast:_ +1d8 healing.

* **+ Disciple of Life** *(from [`data/classes/subclasses/cleric/life.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/life.yml))*
  > **Prayer of Healing.** Up to 5 creatures within 30 feet regain 2d8+7 Hit Points. Targets gain the benefits of a Short Rest; you can't cast this spell again until you finish a Long Rest. _Upcast:_ +1d8 healing.

#### Realistic Combined Class Stacks (2)

* **Stack: BARD (spirits) + [Power from Beyond (Healing)]**
  > **Prayer of Healing.** Up to 5 creatures within 30 feet regain 2d8+3 Hit Points. Targets gain the benefits of a Short Rest; you can't cast this spell again until you finish a Long Rest. _Upcast:_ +1d8 healing.

* **Stack: CLERIC (life) + [Disciple of Life]**
  > **Prayer of Healing.** Up to 5 creatures within 30 feet regain 2d8+7 Hit Points. Targets gain the benefits of a Short Rest; you can't cast this spell again until you finish a Long Rest. _Upcast:_ +1d8 healing.

---

### Protection from Poison (`protectionFromPoison`)

- **Source File:** [`data/spells/level2Spells/protectionFromPoison.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/protectionFromPoison.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `abjuration`, `artificer`, `cleric`, `druid`, `paladin`, `ranger`

#### Baseline Prose

> **Protection from Poison.** One creature you touch has Resistance to Poison damage and has Advantage on saving throws against poison, and one poison affecting the target is neutralized. _Duration:_ 1 hour.

---

### Ray of Enfeeblement (`rayOfEnfeeblement`)

- **Source File:** [`data/spells/level2Spells/rayOfEnfeeblement.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/rayOfEnfeeblement.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `necromancy`, `warlock`, `wizard`, `saveSpell`, `damageSpell`

#### Baseline Prose

> **Ray of Enfeeblement.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ The target deals only half damage with Strength-based weapon attacks until the spell ends. _Concentration:_ Up to 1 minute.

#### Individual Feature Modifications (1)

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Ray of Enfeeblement.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ The target deals only half damage with Strength-based weapon attacks until the spell ends, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Concentration:_ Up to 1 minute.

#### Realistic Combined Class Stacks (1)

* **Stack: CLERIC (grave) + [Pull of Death]**
  > **Ray of Enfeeblement.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ The target deals only half damage with Strength-based weapon attacks until the spell ends, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Concentration:_ Up to 1 minute.

---

### Rope Trick (`ropeTrick`)

- **Source File:** [`data/spells/level2Spells/ropeTrick.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/ropeTrick.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `artificer`, `wizard`

#### Baseline Prose

> **Rope Trick.** A rope rises into the air, leading to a hidden extradimensional space. _Range:_ Touch. _Duration:_ 1 hour.

---

### Scorching Ray (`scorchingRay`)

- **Source File:** [`data/spells/level2Spells/scorchingRay.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/scorchingRay.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `evocation`, `sorcerer`, `wizard`, `attackSpell`, `damageSpell`, `fireDamage`

#### Baseline Prose

> **Scorching Ray.** _Ranged Attack Roll:_ +7, range 120 feet, up to 3 targets within 120 feet. _Hit:_ 2d6 Fire damage. _Upcast:_ +1 target.

#### Individual Feature Modifications (8)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 120 feet, up to 3 targets within 120 feet. _Hit:_ 2d6+3 Fire damage. _Upcast:_ +1 target.

* **+ Fire Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml))*
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 120 feet, up to 3 targets within 120 feet. _Hit:_ 2d6 Fire damage. _Upcast:_ +1 target.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 120 feet, up to 3 targets within 120 feet. _Hit:_ 2d6+3 Fire damage. _Upcast:_ +1 target.

* **+ Artillerist** *(from [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml))*
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 120 feet, up to 3 targets within 120 feet. _Hit:_ 2d6 Fire damage plus 1d8 damage. _Upcast:_ +1 target.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 120 feet, up to 3 targets within 120 feet. _Hit:_ 2d6 Fire damage. _Upcast:_ +1 target.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 120 feet, up to 3 targets within 120 feet. _Hit:_ 2d6 Fire damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Upcast:_ +1 target.

* **+ Celestial Patron** *(from [`data/classes/subclasses/warlock/celestialPatron.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/warlock/celestialPatron.yml))*
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 120 feet, up to 3 targets within 120 feet. _Hit:_ 2d6 Fire damage. _Upcast:_ +1 target.

* **+ Increased Range** *(from [`data/feats/general/spellSniper.yml`](file:///home/gerardo/Projects/card-builder/data/feats/general/spellSniper.yml))*
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 180 feet, up to 3 targets within 180 feet. _Hit:_ 2d6 Fire damage. _Upcast:_ +1 target.

#### Realistic Combined Class Stacks (6)

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Alchemist]**
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 180 feet, up to 3 targets within 180 feet. _Hit:_ 2d6+6 Fire damage. _Upcast:_ +1 target.

* **Stack: ARTIFICER + [Increased Range, Arcane Conduit, Artillerist]**
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 180 feet, up to 3 targets within 180 feet. _Hit:_ 2d6+3 Fire damage plus 1d8 damage. _Upcast:_ +1 target.

* **Stack: SORCERER + [Increased Range, Fire Affinity]**
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 180 feet, up to 3 targets within 180 feet. _Hit:_ 2d6 Fire damage. _Upcast:_ +1 target.

* **Stack: BARD (spirits) + [Increased Range, Power from Beyond (Damage)]**
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 180 feet, up to 3 targets within 180 feet. _Hit:_ 2d6 Fire damage. _Upcast:_ +1 target.

* **Stack: CLERIC (grave) + [Increased Range, Pull of Death]**
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 180 feet, up to 3 targets within 180 feet. _Hit:_ 2d6 Fire damage, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Upcast:_ +1 target.

* **Stack: WARLOCK (celestialPatron) + [Increased Range, Celestial Patron]**
  > **Scorching Ray.** _Ranged Attack Roll:_ +7, range 180 feet, up to 3 targets within 180 feet. _Hit:_ 2d6 Fire damage. _Upcast:_ +1 target.

---

### See Invisibility (`seeInvisibility`)

- **Source File:** [`data/spells/level2Spells/seeInvisibility.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/seeInvisibility.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `divination`, `artificer`, `bard`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **See Invisibility.** You see invisible creatures and objects as if they were visible. _Duration:_ 1 hour.

---

### Shatter (`shatter`)

- **Source File:** [`data/spells/level2Spells/shatter.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/shatter.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `evocation`, `bard`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `thunderDamage`, `psion`

#### Baseline Prose

> **Shatter.** _Constitution Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 3d8 Thunder damage. _Success:_ Half damage. _Upcast:_ +1d8 Thunder damage.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Shatter.** _Constitution Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 3d8+3 Thunder damage. _Success:_ Half damage. _Upcast:_ +1d8 Thunder damage.

* **+ Artillerist** *(from [`data/classes/subclasses/artificer/artillerist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/artillerist.yml))*
  > **Shatter.** _Constitution Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 3d8 Thunder damage plus 1d8 damage. _Success:_ Half damage. _Upcast:_ +1 damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Shatter.** _Constitution Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 3d8 Thunder damage. _Success:_ Half damage. _Upcast:_ +1d8 Thunder damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit, Artillerist]**
  > **Shatter.** _Constitution Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 3d8+3 Thunder damage plus 1d8 damage. _Success:_ Half damage. _Upcast:_ +1 damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Shatter.** _Constitution Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 60 feet. _Failure:_ 3d8 Thunder damage. _Success:_ Half damage. _Upcast:_ +1d8 Thunder damage.

---

### Shining Smite (`shiningSmite`)

- **Source File:** [`data/spells/level2Spells/shiningSmite.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/shiningSmite.yml)
- **Time:** `bonus action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `paladin`

#### Baseline Prose

> **Shining Smite.** _Trigger:_ When you hit a creature with an attack. _Response:_ _Constitution Saving Throw:_ DC 15, the target. _Failure or Success:_ 2d6 Radiant damage. _Failure:_ The target sheds Bright Light in a 5-foot radius, attack rolls against it have Advantage, and it can't benefit from the Invisible condition. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Radiant damage.

---

### Silence (`silence`)

- **Source File:** [`data/spells/level2Spells/silence.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/silence.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `illusion`, `bard`, `cleric`, `ranger`, `ritual`, `psion`

#### Baseline Prose

> **Silence.** A 20-foot-radius Sphere centered on a point within 120 feet creates an area where no sound can be created or pass through. _Concentration:_ Up to 10 minutes. _Ritual_.

#### Individual Feature Modifications (1)

* **+ Illusionist** *(from [`data/classes/subclasses/wizard/illusionist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/illusionist.yml))*
  > **Silence.** A 20-foot-radius Sphere centered on a point within 180 feet creates an area where no sound can be created or pass through. _Concentration:_ Up to 10 minutes. _Ritual_.

#### Realistic Combined Class Stacks (1)

* **Stack: WIZARD (illusionist) + [Illusionist]**
  > **Silence.** A 20-foot-radius Sphere centered on a point within 180 feet creates an area where no sound can be created or pass through. _Concentration:_ Up to 10 minutes. _Ritual_.

---

### Spider Climb (`spiderClimb`)

- **Source File:** [`data/spells/level2Spells/spiderClimb.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/spiderClimb.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `artificer`, `sorcerer`, `warlock`, `wizard`

#### Baseline Prose

> **Spider Climb.** One creature you touch gains a Climb Speed equal to its Speed and can move along vertical surfaces and ceilings. _Concentration:_ Up to 1 hour. _Upcast:_ +1 target.

---

### Spike Growth (`spikeGrowth`)

- **Source File:** [`data/spells/level2Spells/spikeGrowth.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/spikeGrowth.yml)
- **Time:** `action` | **Range:** `150 feet` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `transmutation`, `druid`, `ranger`, `saveSpell`, `damageSpell`, `piercingDamage`

#### Baseline Prose

> **Spike Growth.** A 20-foot-radius Sphere of camouflaged spikes appears centered on a point within 150 feet and creates Difficult Terrain. _Trigger:_ When a creature moves within range. _Response:_ 2d4 Piercing damage. Per 5 feet traveled. _Concentration:_ Up to 10 minutes.

---

### Spiritual Weapon (`spiritualWeapon`)

- **Source File:** [`data/spells/level2Spells/spiritualWeapon.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/spiritualWeapon.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `evocation`, `cleric`

#### Baseline Prose

> **Spiritual Weapon.** _Melee Attack Roll:_ +7, range 60 feet. _Hit:_ 1d8+3 Force damage. _Repeat:_ On subsequent turns, you can take a Bonus Action to repeat the attack. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Force damage.

---

### Suggestion (`suggestion`)

- **Source File:** [`data/spells/level2Spells/suggestion.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/suggestion.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 8 hours`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `enchantment`, `bard`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Suggestion.** _Wisdom Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ The target has the Charmed condition, and pursues your suggested course of activity to the best of its ability. _Concentration:_ Up to 8 hours.

---

### Summon Beast (`summonBeast`)

- **Source File:** [`data/spells/level2Spells/summonBeast.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/summonBeast.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `conjuration`, `druid`, `ranger`

#### Baseline Prose

> **Summon Beast.** You call forth a bestial spirit to fight alongside you. _Range:_ 90 feet. _Concentration:_ Up to 1 hour.

---

### Mind Whip (`tashasMindWhip`)

- **Source File:** [`data/spells/level2Spells/tashasMindWhip.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/tashasMindWhip.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `instantaneous`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `enchantment`, `psion`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `psychicDamage`

#### Baseline Prose

> **Mind Whip.** _Intelligence Saving Throw:_ DC 15, one creature within 90 feet. _Failure:_ 3d6 Psychic damage, and until the end of its next turn, the target can't make reactions and must choose between a move, action, or bonus action. _Success:_ Half damage. _Upcast:_ +1 target.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Mind Whip.** _Intelligence Saving Throw:_ DC 15, one creature within 90 feet. _Failure:_ 3d6+3 Psychic damage, and until the end of its next turn, the target can't make reactions and must choose between a move, action, or bonus action. _Success:_ Half damage. _Upcast:_ +1 target.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Mind Whip.** _Intelligence Saving Throw:_ DC 15, one creature within 90 feet. _Failure:_ 3d6 Psychic damage, and until the end of its next turn, the target can't make reactions and must choose between a move, action, or bonus action. _Success:_ Half damage. _Upcast:_ +1 target.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Mind Whip.** _Intelligence Saving Throw:_ DC 15, one creature within 90 feet. _Failure:_ 3d6+3 Psychic damage, and until the end of its next turn, the target can't make reactions and must choose between a move, action, or bonus action. _Success:_ Half damage. _Upcast:_ +1 target.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Mind Whip.** _Intelligence Saving Throw:_ DC 15, one creature within 90 feet. _Failure:_ 3d6 Psychic damage, and until the end of its next turn, the target can't make reactions and must choose between a move, action, or bonus action. _Success:_ Half damage. _Upcast:_ +1 target.

---

### Warding Bond (`wardingBond`)

- **Source File:** [`data/spells/level2Spells/wardingBond.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/wardingBond.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `abjuration`, `cleric`, `paladin`

#### Baseline Prose

> **Warding Bond.** One creature you touch gains a +1 bonus to AC, and gains +1 to saves, Resistance to all damage, and you take the same amount of damage whenever it takes damage. _Duration:_ 1 hour.

---

### Web (`web`)

- **Source File:** [`data/spells/level2Spells/web.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/web.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `conjuration`, `artificer`, `sorcerer`, `wizard`, `saveSpell`

#### Baseline Prose

> **Web.** A 20-foot-radius Cube of sticky webbing appears centered on a point within 60 feet and creates Difficult Terrain and is Heavily Obscured. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ The target has the Restrained condition (escape DC 15). _Concentration:_ Up to 1 hour.

---

### Zone of Truth (`zoneOfTruth`)

- **Source File:** [`data/spells/level2Spells/zoneOfTruth.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level2Spells/zoneOfTruth.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `10 minutes`
- **Resource:** `level2SpellSlot`
- **Tags:** `level2Spell`, `enchantment`, `bard`, `cleric`, `paladin`, `saveSpell`, `psion`

#### Baseline Prose

> **Zone of Truth.** A 15-foot-radius Sphere of truth zone appears centered on a point within 60 feet. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Charisma Saving Throw:_ DC 15. _Failure:_ The target can't speak a deliberate lie. _Duration:_ 10 minutes.

---

## Spells: 3rd Level

### Animate Dead (`animateDead`)

- **Source File:** [`data/spells/level3Spells/animateDead.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/animateDead.yml)
- **Time:** `1 minute` | **Range:** `10 feet` | **Duration:** `instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `necromancy`, `cleric`, `wizard`

#### Baseline Prose

> **Animate Dead.** You raise an undead servant from a corpse or pile of bones. _Range:_ 10 feet. _Upcast:_ +2 Undead targets.

---

### Aura of Vitality (`auraOfVitality`)

- **Source File:** [`data/spells/level3Spells/auraOfVitality.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/auraOfVitality.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `abjuration`, `cleric`, `druid`, `paladin`, `healingSpell`

#### Baseline Prose

> **Aura of Vitality.** A 30-foot-radius Emanation of healing energy appears centered on you. _Trigger:_ When a creature starts its turn there. _Response:_ One creature within 30 feet regains 2d6 Hit Points. _Concentration:_ Up to 1 minute.

#### Individual Feature Modifications (2)

* **+ Power from Beyond (Healing)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Aura of Vitality.** A 30-foot-radius Emanation of healing energy appears centered on you. _Trigger:_ When a creature starts its turn there. _Response:_ One creature within 30 feet regains 2d6 Hit Points. _Concentration:_ Up to 1 minute.

* **+ Disciple of Life** *(from [`data/classes/subclasses/cleric/life.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/life.yml))*
  > **Aura of Vitality.** A 30-foot-radius Emanation of healing energy appears centered on you. _Trigger:_ When a creature starts its turn there. _Response:_ One creature within 30 feet regains 2d6+4 Hit Points. _Concentration:_ Up to 1 minute.

#### Realistic Combined Class Stacks (2)

* **Stack: BARD (spirits) + [Power from Beyond (Healing)]**
  > **Aura of Vitality.** A 30-foot-radius Emanation of healing energy appears centered on you. _Trigger:_ When a creature starts its turn there. _Response:_ One creature within 30 feet regains 2d6 Hit Points. _Concentration:_ Up to 1 minute.

* **Stack: CLERIC (life) + [Disciple of Life]**
  > **Aura of Vitality.** A 30-foot-radius Emanation of healing energy appears centered on you. _Trigger:_ When a creature starts its turn there. _Response:_ One creature within 30 feet regains 2d6+4 Hit Points. _Concentration:_ Up to 1 minute.

---

### Beacon Of Hope (`beaconOfHope`)

- **Source File:** [`data/spells/level3Spells/beaconOfHope.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/beaconOfHope.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `abjuration`, `cleric`, `healingSpell`

#### Baseline Prose

> **Beacon Of Hope.** A 30-foot-radius Emanation centered on a point within 30 feet allies gain Advantage on Wisdom saves and death saves, and regain maximum HP from any healing. _Concentration:_ Up to 1 minute.

---

### Bestow Curse (`bestowCurse`)

- **Source File:** [`data/spells/level3Spells/bestowCurse.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/bestowCurse.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `necromancy`, `bard`, `cleric`, `wizard`, `saveSpell`, `damageSpell`, `necroticDamage`, `psion`

#### Baseline Prose

> **Bestow Curse.** _Wisdom Saving Throw:_ DC 15, one creature you touch. _Failure:_ The target is cursed for the duration; choose one effect: Disadvantage on checks and saves of one attribute, Disadvantage on attack rolls against you, Wis save at start of turn or waste action, or extra 1d8 Necrotic damage from your attacks and spells. _Concentration:_ Up to 1 minute. _Upcast:_ longer Concentration, or no Concentration (level 5+ slot).

---

### Bleeding Darkness (`bleedingDarkness`)

- **Source File:** [`data/spells/level3Spells/bleedingDarkness.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/bleedingDarkness.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `evocation`, `psion`, `warlock`, `wizard`, `saveSpell`, `damageSpell`, `coldDamage`

#### Baseline Prose

> **Bleeding Darkness.** A 15-foot-radius Sphere of dark mist appears centered on a point within 60 feet and creates Difficult Terrain and is Heavily Obscured. You can take an action to move the area. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 3d8 Necrotic damage, and the target has the Blinded condition until the end of its next turn. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Necrotic damage.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Bleeding Darkness.** A 15-foot-radius Sphere of dark mist appears centered on a point within 60 feet and creates Difficult Terrain and is Heavily Obscured. You can take an action to move the area. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 3d8+3 Necrotic damage, and the target has the Blinded condition until the end of its next turn. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Necrotic damage.

* **+ Cold Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml))*
  > **Bleeding Darkness.** A 15-foot-radius Sphere of dark mist appears centered on a point within 60 feet and creates Difficult Terrain and is Heavily Obscured. You can take an action to move the area. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 3d8 Necrotic damage, and the target has the Blinded condition until the end of its next turn. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Necrotic damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Bleeding Darkness.** A 15-foot-radius Sphere of dark mist appears centered on a point within 60 feet and creates Difficult Terrain and is Heavily Obscured. You can take an action to move the area. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 3d8 Necrotic damage, and the target has the Blinded condition until the end of its next turn. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Necrotic damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Bleeding Darkness.** A 15-foot-radius Sphere of dark mist appears centered on a point within 60 feet and creates Difficult Terrain and is Heavily Obscured. You can take an action to move the area. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 3d8+3 Necrotic damage, and the target has the Blinded condition until the end of its next turn. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Necrotic damage.

* **Stack: SORCERER + [Cold Affinity]**
  > **Bleeding Darkness.** A 15-foot-radius Sphere of dark mist appears centered on a point within 60 feet and creates Difficult Terrain and is Heavily Obscured. You can take an action to move the area. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 3d8 Necrotic damage, and the target has the Blinded condition until the end of its next turn. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Necrotic damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Bleeding Darkness.** A 15-foot-radius Sphere of dark mist appears centered on a point within 60 feet and creates Difficult Terrain and is Heavily Obscured. You can take an action to move the area. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ 3d8 Necrotic damage, and the target has the Blinded condition until the end of its next turn. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Necrotic damage.

---

### Blink (`blink`)

- **Source File:** [`data/spells/level3Spells/blink.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/blink.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `artificer`, `sorcerer`, `wizard`

#### Baseline Prose

> **Blink.** At the end of your turn, roll 1d6; on 4–6, you vanish into the Ethereal Plane until the start of your next turn. _Duration:_ 1 minute.

---

### Call Lightning (`callLightning`)

- **Source File:** [`data/spells/level3Spells/callLightning.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/callLightning.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `conjuration`, `druid`, `saveSpell`, `damageSpell`, `lightningDamage`

#### Baseline Prose

> **Call Lightning.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 120 feet. _Failure:_ 3d10 Lightning damage. _Success:_ Half damage. _Repeat:_ On subsequent turns, you can take an action to move the effect and repeat the save. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Lightning damage.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Call Lightning.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 120 feet. _Failure:_ 3d10+3 Lightning damage. _Success:_ Half damage. _Repeat:_ On subsequent turns, you can take an action to move the effect and repeat the save. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Lightning damage.

* **+ Lightning Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml))*
  > **Call Lightning.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 120 feet. _Failure:_ 3d10 Lightning damage. _Success:_ Half damage. _Repeat:_ On subsequent turns, you can take an action to move the effect and repeat the save. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Lightning damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Call Lightning.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 120 feet. _Failure:_ 3d10 Lightning damage. _Success:_ Half damage. _Repeat:_ On subsequent turns, you can take an action to move the effect and repeat the save. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Lightning damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Call Lightning.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 120 feet. _Failure:_ 3d10+3 Lightning damage. _Success:_ Half damage. _Repeat:_ On subsequent turns, you can take an action to move the effect and repeat the save. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Lightning damage.

* **Stack: SORCERER + [Lightning Affinity]**
  > **Call Lightning.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 120 feet. _Failure:_ 3d10 Lightning damage. _Success:_ Half damage. _Repeat:_ On subsequent turns, you can take an action to move the effect and repeat the save. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Lightning damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Call Lightning.** _Dexterity Saving Throw:_ DC 15, each creature in a 5-foot-radius Sphere centered on a point within 120 feet. _Failure:_ 3d10 Lightning damage. _Success:_ Half damage. _Repeat:_ On subsequent turns, you can take an action to move the effect and repeat the save. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Lightning damage.

---

### Clairvoyance (`clairvoyance`)

- **Source File:** [`data/spells/level3Spells/clairvoyance.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/clairvoyance.yml)
- **Time:** `10 minutes` | **Range:** `1 mile` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `divination`, `bard`, `cleric`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Clairvoyance.** You create an invisible sensor to see or hear a distant location. _Range:_ 1 mile. _Concentration:_ Up to 10 minutes.

---

### Conjure Animals (`conjureAnimals`)

- **Source File:** [`data/spells/level3Spells/conjureAnimals.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/conjureAnimals.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `conjuration`, `druid`, `ranger`, `saveSpell`, `damageSpell`, `slashingDamage`, `forceDamage`

#### Baseline Prose

> **Conjure Animals.** A 10-foot-radius Sphere of spectral animals appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 3d10 Slashing damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Slashing damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Conjure Animals.** A 10-foot-radius Sphere of spectral animals appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 3d10+3 Slashing damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Slashing damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Conjure Animals.** A 10-foot-radius Sphere of spectral animals appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 3d10 Slashing damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Slashing damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Conjure Animals.** A 10-foot-radius Sphere of spectral animals appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 3d10+3 Slashing damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Slashing damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Conjure Animals.** A 10-foot-radius Sphere of spectral animals appears centered on a point within 60 feet. You can take a Bonus Action to move the area up to 30 feet. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 3d10 Slashing damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d10 Slashing damage.

---

### Counterspell (`counterspell`)

- **Source File:** [`data/spells/level3Spells/counterspell.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/counterspell.yml)
- **Time:** `reaction` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `abjuration`, `sorcerer`, `warlock`, `wizard`, `saveSpell`

#### Baseline Prose

> **Counterspell.** _Trigger:_ When you see a creature within range casting a spell. _Response:_ _Constitution Saving Throw:_ DC 15, the target. _Failure:_ The target's spell dissipates with no effect, wasting the action/reaction used (spell slot is not expended).

---

### Create Food And Water (`createFoodAndWater`)

- **Source File:** [`data/spells/level3Spells/createFoodAndWater.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/createFoodAndWater.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `conjuration`, `artificer`, `cleric`, `paladin`

#### Baseline Prose

> **Create Food And Water.** You create food and clean water to sustain a party. _Range:_ 30 feet.

---

### Crusader's Mantle (`crusadersMantle`)

- **Source File:** [`data/spells/level3Spells/crusadersMantle.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/crusadersMantle.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `evocation`, `paladin`

#### Baseline Prose

> **Crusader's Mantle.** A 30-foot-radius Emanation weapon attacks by you and your allies deal an extra 1d4 Radiant damage. _Concentration:_ Up to 1 minute.

---

### Daylight (`daylight`)

- **Source File:** [`data/spells/level3Spells/daylight.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/daylight.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `evocation`, `cleric`, `druid`, `paladin`, `ranger`, `sorcerer`

#### Baseline Prose

> **Daylight.** A 60-foot-radius Sphere centered on a point within 60 feet 60-foot Sphere sheds Bright Light and Dim Light for an additional 60 feet, dispelling darkness spells of level 3 or lower. _Duration:_ 1 hour.

---

### Dispel Magic (`dispelMagic`)

- **Source File:** [`data/spells/level3Spells/dispelMagic.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/dispelMagic.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `abjuration`, `artificer`, `bard`, `cleric`, `druid`, `paladin`, `ranger`, `sorcerer`, `warlock`, `wizard`, `psion`

#### Baseline Prose

> **Dispel Magic.** One creature within 120 feet ends any spell of level 3 or lower on target; for higher level spells, make an ability check (DC 10 + spell level). _Upcast:_ auto-dispels spells of slot level or lower.

---

### Elemental Weapon (`elementalWeapon`)

- **Source File:** [`data/spells/level3Spells/elementalWeapon.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/elementalWeapon.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `artificer`, `druid`, `paladin`, `ranger`

#### Baseline Prose

> **Elemental Weapon.** Weapon gains +1 bonus to attack rolls and deals an extra 1d4 damage (Acid, Cold, Fire, Lightning, or Thunder). _Range:_ Touch. _Concentration:_ Up to 1 hour. _Upcast:_ +2 bonus and 2d4 damage (level 5–6 slot), +3 bonus and 3d4 damage (level 7+ slot).

---

### Enemies Abound (`enemiesAbound`)

- **Source File:** [`data/spells/level3Spells/enemiesAbound.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/enemiesAbound.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `enchantment`, `bard`, `psion`, `sorcerer`, `warlock`, `wizard`, `saveSpell`

#### Baseline Prose

> **Enemies Abound.** _Intelligence Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ The target has the Charmed condition (repeats save whenever it takes damage), and regards all creatures as enemies and repeats the save whenever it takes damage. _Concentration:_ Up to 1 minute.

---

### Fear (`fear`)

- **Source File:** [`data/spells/level3Spells/fear.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/fear.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `illusion`, `bard`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Fear.** _Wisdom Saving Throw:_ DC 15, each creature in a 30-foot-radius Cone centered on you. _Failure:_ Each target has the Frightened condition (ends when target breaks line of sight), and must drop whatever it is holding and flee. _Concentration:_ Up to 1 minute.

---

### Feign Death (`feignDeath`)

- **Source File:** [`data/spells/level3Spells/feignDeath.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/feignDeath.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `necromancy`, `bard`, `cleric`, `druid`, `wizard`, `ritual`

#### Baseline Prose

> **Feign Death.** You put a willing creature into a cataleptic state indistinguishable from death. _Range:_ Touch. _Duration:_ 1 hour. _Ritual_.

---

### Fireball (`fireball`)

- **Source File:** [`data/spells/level3Spells/fireball.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/fireball.yml)
- **Time:** `action` | **Range:** `150 feet` | **Duration:** `instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `evocation`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `fireDamage`

#### Baseline Prose

> **Fireball.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 8d6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

#### Individual Feature Modifications (4)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Fireball.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 8d6+3 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

* **+ Fire Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml))*
  > **Fireball.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 8d6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Fireball.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 8d6+3 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Fireball.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 8d6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit, Alchemist]**
  > **Fireball.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 8d6+6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

* **Stack: SORCERER + [Fire Affinity]**
  > **Fireball.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 8d6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Fireball.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 8d6 Fire damage. _Success:_ Half damage. _Upcast:_ +1d6 Fire damage.

---

### Fly (`fly`)

- **Source File:** [`data/spells/level3Spells/fly.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/fly.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `artificer`, `sorcerer`, `warlock`, `wizard`, `psion`

#### Baseline Prose

> **Fly.** One creature you touch gains a Flying Speed equal to 60 feet. _Concentration:_ Up to 10 minutes. _Upcast:_ +1 target.

---

### Gaseous Form (`gaseousForm`)

- **Source File:** [`data/spells/level3Spells/gaseousForm.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/gaseousForm.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `sorcerer`, `warlock`, `wizard`

#### Baseline Prose

> **Gaseous Form.** One creature you touch transforms into a misty cloud with a Flying Speed of 10 feet and Resistance to nonmagical damage. _Concentration:_ Up to 1 hour. _Upcast:_ +1 target.

---

### Glyph of Warding (`glyphOfWarding`)

- **Source File:** [`data/spells/level3Spells/glyphOfWarding.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/glyphOfWarding.yml)
- **Time:** `1 hour` | **Range:** `touch` | **Duration:** `until dispelled or triggered`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `abjuration`, `artificer`, `bard`, `cleric`, `wizard`, `saveSpell`, `damageSpell`, `fireDamage`, `coldDamage`, `acidDamage`, `lightningDamage`, `thunderDamage`

#### Baseline Prose

> **Glyph of Warding.** You scribe a hidden rune that unleashes a magical trap when triggered. _Range:_ Touch. _Duration:_ Until dispelled or triggered. _Upcast:_ +1d8 explosive rune damage.

---

### Haste (`haste`)

- **Source File:** [`data/spells/level3Spells/haste.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/haste.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `artificer`, `sorcerer`, `wizard`

#### Baseline Prose

> **Haste.** One creature within 30 feet gains a +2 bonus to AC, and speed is doubled, gains Advantage on Dex saves, and gets an additional action on each turn. _Concentration:_ Up to 1 minute.

---

### Eldritch Hunger (`hungerOfHadar`)

- **Source File:** [`data/spells/level3Spells/hungerOfHadar.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/hungerOfHadar.yml)
- **Time:** `action` | **Range:** `150 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `conjuration`, `warlock`, `saveSpell`, `damageSpell`, `coldDamage`, `acidDamage`

#### Baseline Prose

> **Eldritch Hunger.** A 20-foot-radius Sphere of void appears centered on a point within 150 feet and creates Difficult Terrain and is Heavily Obscured. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6 Acid damage. _Trigger:_ When a creature ends its turn there. _Response:_ 2d6 Cold damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Cold or Acid damage (your choice).

#### Individual Feature Modifications (5)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Eldritch Hunger.** A 20-foot-radius Sphere of void appears centered on a point within 150 feet and creates Difficult Terrain and is Heavily Obscured. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6+3 Acid damage. _Trigger:_ When a creature ends its turn there. _Response:_ 2d6 Cold damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Cold or Acid damage (your choice).

* **+ Acid Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml))*
  > **Eldritch Hunger.** A 20-foot-radius Sphere of void appears centered on a point within 150 feet and creates Difficult Terrain and is Heavily Obscured. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6 Acid damage. _Trigger:_ When a creature ends its turn there. _Response:_ 2d6 Cold damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Cold or Acid damage (your choice).

* **+ Cold Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml))*
  > **Eldritch Hunger.** A 20-foot-radius Sphere of void appears centered on a point within 150 feet and creates Difficult Terrain and is Heavily Obscured. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6 Acid damage. _Trigger:_ When a creature ends its turn there. _Response:_ 2d6 Cold damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Cold or Acid damage (your choice).

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Eldritch Hunger.** A 20-foot-radius Sphere of void appears centered on a point within 150 feet and creates Difficult Terrain and is Heavily Obscured. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6+3 Acid damage. _Trigger:_ When a creature ends its turn there. _Response:_ 2d6 Cold damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Cold or Acid damage (your choice).

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Eldritch Hunger.** A 20-foot-radius Sphere of void appears centered on a point within 150 feet and creates Difficult Terrain and is Heavily Obscured. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6 Acid damage. _Trigger:_ When a creature ends its turn there. _Response:_ 2d6 Cold damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Cold or Acid damage (your choice).

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit, Alchemist]**
  > **Eldritch Hunger.** A 20-foot-radius Sphere of void appears centered on a point within 150 feet and creates Difficult Terrain and is Heavily Obscured. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6+6 Acid damage. _Trigger:_ When a creature ends its turn there. _Response:_ 2d6 Cold damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Cold or Acid damage (your choice).

* **Stack: SORCERER + [Acid Affinity, Cold Affinity]**
  > **Eldritch Hunger.** A 20-foot-radius Sphere of void appears centered on a point within 150 feet and creates Difficult Terrain and is Heavily Obscured. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6 Acid damage. _Trigger:_ When a creature ends its turn there. _Response:_ 2d6 Cold damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Cold or Acid damage (your choice).

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Eldritch Hunger.** A 20-foot-radius Sphere of void appears centered on a point within 150 feet and creates Difficult Terrain and is Heavily Obscured. _Trigger:_ When the area is created, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 2d6 Acid damage. _Trigger:_ When a creature ends its turn there. _Response:_ 2d6 Cold damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Cold or Acid damage (your choice).

---

### Hypnotic Pattern (`hypnoticPattern`)

- **Source File:** [`data/spells/level3Spells/hypnoticPattern.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/hypnoticPattern.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `illusion`, `bard`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Hypnotic Pattern.** _Wisdom Saving Throw:_ DC 15, each creature in a 30-foot-radius Cube centered on a point within 120 feet. _Failure:_ Each target has the Charmed and Incapacitated condition (ends if target takes damage or another creature uses an Action to shake it awake). _Concentration:_ Up to 1 minute.

#### Individual Feature Modifications (1)

* **+ Illusionist** *(from [`data/classes/subclasses/wizard/illusionist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/illusionist.yml))*
  > **Hypnotic Pattern.** _Wisdom Saving Throw:_ DC 15, each creature in a 30-foot-radius Cube centered on a point within 180 feet. _Failure:_ Each target has the Charmed and Incapacitated condition (ends if target takes damage or another creature uses an Action to shake it awake). _Concentration:_ Up to 1 minute.

#### Realistic Combined Class Stacks (1)

* **Stack: WIZARD (illusionist) + [Illusionist]**
  > **Hypnotic Pattern.** _Wisdom Saving Throw:_ DC 15, each creature in a 30-foot-radius Cube centered on a point within 180 feet. _Failure:_ Each target has the Charmed and Incapacitated condition (ends if target takes damage or another creature uses an Action to shake it awake). _Concentration:_ Up to 1 minute.

---

### Intellect Fortress (`intellectFortress`)

- **Source File:** [`data/spells/level3Spells/intellectFortress.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/intellectFortress.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `abjuration`, `artificer`, `bard`, `psion`, `sorcerer`, `warlock`, `wizard`

#### Baseline Prose

> **Intellect Fortress.** One creature within 30 feet has Resistance to Psychic damage and has Advantage on Intelligence, Wisdom, and Charisma saving throws. _Concentration:_ Up to 1 hour. _Upcast:_ +1 target.

---

### Tiny Hut (`leomundsTinyHut`)

- **Source File:** [`data/spells/level3Spells/leomundsTinyHut.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/leomundsTinyHut.yml)
- **Time:** `1 minute` | **Range:** `self` | **Duration:** `8 hours`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `evocation`, `bard`, `wizard`, `ritual`

#### Baseline Prose

> **Tiny Hut.** A protective, opaque dome of force springs up around your party. _Duration:_ 8 hours. _Ritual_.

---

### Lightning Bolt (`lightningBolt`)

- **Source File:** [`data/spells/level3Spells/lightningBolt.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/lightningBolt.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `evocation`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `lightningDamage`

#### Baseline Prose

> **Lightning Bolt.** _Dexterity Saving Throw:_ DC 15, each creature in a 100-foot Line originating from you. _Failure:_ 8d6 Lightning damage. _Success:_ Half damage. _Upcast:_ +1d6 Lightning damage.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Lightning Bolt.** _Dexterity Saving Throw:_ DC 15, each creature in a 100-foot Line originating from you. _Failure:_ 8d6+3 Lightning damage. _Success:_ Half damage. _Upcast:_ +1d6 Lightning damage.

* **+ Lightning Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/lightningAffinity.yml))*
  > **Lightning Bolt.** _Dexterity Saving Throw:_ DC 15, each creature in a 100-foot Line originating from you. _Failure:_ 8d6 Lightning damage. _Success:_ Half damage. _Upcast:_ +1d6 Lightning damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Lightning Bolt.** _Dexterity Saving Throw:_ DC 15, each creature in a 100-foot Line originating from you. _Failure:_ 8d6 Lightning damage. _Success:_ Half damage. _Upcast:_ +1d6 Lightning damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Lightning Bolt.** _Dexterity Saving Throw:_ DC 15, each creature in a 100-foot Line originating from you. _Failure:_ 8d6+3 Lightning damage. _Success:_ Half damage. _Upcast:_ +1d6 Lightning damage.

* **Stack: SORCERER + [Lightning Affinity]**
  > **Lightning Bolt.** _Dexterity Saving Throw:_ DC 15, each creature in a 100-foot Line originating from you. _Failure:_ 8d6 Lightning damage. _Success:_ Half damage. _Upcast:_ +1d6 Lightning damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Lightning Bolt.** _Dexterity Saving Throw:_ DC 15, each creature in a 100-foot Line originating from you. _Failure:_ 8d6 Lightning damage. _Success:_ Half damage. _Upcast:_ +1d6 Lightning damage.

---

### Magic Circle (`magicCircle`)

- **Source File:** [`data/spells/level3Spells/magicCircle.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/magicCircle.yml)
- **Time:** `1 minute` | **Range:** `10 feet` | **Duration:** `1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `abjuration`, `cleric`, `paladin`, `warlock`, `wizard`, `saveSpell`

#### Baseline Prose

> **Magic Circle.** A 10-foot-radius Cylinder of magical energy appears centered on a point within 10 feet. Celestials, Elementals, Fey, Fiends or Undead cannot enter the circle and have disadvantage on attack rolls against targets within the circle. Targets within the circle can't be possessed by or gain the Charmed or Frightened condition from the creature. _Duration:_ 1 hour. _Upcast:_ +1 hour duration.

---

### Major Image (`majorImage`)

- **Source File:** [`data/spells/level3Spells/majorImage.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/majorImage.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `illusion`, `bard`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Major Image.** You create a complex illusion with sound, sight, and thermal effects. _Range:_ 120 feet. _Concentration:_ Up to 10 minutes. _Upcast:_ no Concentration required (level 4+ slot).

#### Individual Feature Modifications (1)

* **+ Illusionist** *(from [`data/classes/subclasses/wizard/illusionist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/illusionist.yml))*
  > **Major Image.** You create a complex illusion with sound, sight, and thermal effects. _Range:_ 180 feet. _Concentration:_ Up to 10 minutes. _Upcast:_ no Concentration required (level 4+ slot).

#### Realistic Combined Class Stacks (1)

* **Stack: WIZARD (illusionist) + [Illusionist]**
  > **Major Image.** You create a complex illusion with sound, sight, and thermal effects. _Range:_ 180 feet. _Concentration:_ Up to 10 minutes. _Upcast:_ no Concentration required (level 4+ slot).

---

### Mass Healing Word (`massHealingWord`)

- **Source File:** [`data/spells/level3Spells/massHealingWord.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/massHealingWord.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `abjuration`, `bard`, `cleric`, `healingSpell`

#### Baseline Prose

> **Mass Healing Word.** Up to 6 creatures within 60 feet regain 2d4+3 Hit Points. _Upcast:_ +1d4 healing.

#### Individual Feature Modifications (2)

* **+ Power from Beyond (Healing)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Mass Healing Word.** Up to 6 creatures within 60 feet regain 2d4+3 Hit Points. _Upcast:_ +1d4 healing.

* **+ Disciple of Life** *(from [`data/classes/subclasses/cleric/life.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/life.yml))*
  > **Mass Healing Word.** Up to 6 creatures within 60 feet regain 2d4+7 Hit Points. _Upcast:_ +1d4 healing.

#### Realistic Combined Class Stacks (2)

* **Stack: BARD (spirits) + [Power from Beyond (Healing)]**
  > **Mass Healing Word.** Up to 6 creatures within 60 feet regain 2d4+3 Hit Points. _Upcast:_ +1d4 healing.

* **Stack: CLERIC (life) + [Disciple of Life]**
  > **Mass Healing Word.** Up to 6 creatures within 60 feet regain 2d4+7 Hit Points. _Upcast:_ +1d4 healing.

---

### Meld into Stone (`meldIntoStone`)

- **Source File:** [`data/spells/level3Spells/meldIntoStone.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/meldIntoStone.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `8 hours`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `cleric`, `druid`, `ranger`, `ritual`

#### Baseline Prose

> **Meld into Stone.** You step into a stone surface, merging yourself and gear with the rock. _Range:_ Touch. _Duration:_ 8 hours. _Ritual_.

---

### Nondetection (`nondetection`)

- **Source File:** [`data/spells/level3Spells/nondetection.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/nondetection.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `8 hours`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `abjuration`, `bard`, `ranger`, `wizard`, `psion`

#### Baseline Prose

> **Nondetection.** You hide a target from divination spells and scrying sensors. _Range:_ Touch. _Duration:_ 8 hours.

---

### Phantom Steed (`phantomSteed`)

- **Source File:** [`data/spells/level3Spells/phantomSteed.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/phantomSteed.yml)
- **Time:** `1 minute` | **Range:** `30 feet` | **Duration:** `1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `illusion`, `wizard`, `ritual`

#### Baseline Prose

> **Phantom Steed.** You conjure a fast, quasi-real horse-like mount. _Range:_ 30 feet. _Duration:_ 1 hour. _Ritual_.

#### Individual Feature Modifications (1)

* **+ Illusionist** *(from [`data/classes/subclasses/wizard/illusionist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/illusionist.yml))*
  > **Phantom Steed.** You conjure a fast, quasi-real horse-like mount. _Range:_ 90 feet. _Duration:_ 1 hour. _Ritual_.

#### Realistic Combined Class Stacks (1)

* **Stack: WIZARD (illusionist) + [Illusionist]**
  > **Phantom Steed.** You conjure a fast, quasi-real horse-like mount. _Range:_ 90 feet. _Duration:_ 1 hour. _Ritual_.

---

### Plant Growth (`plantGrowth`)

- **Source File:** [`data/spells/level3Spells/plantGrowth.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/plantGrowth.yml)
- **Time:** `action` | **Range:** `150 feet` | **Duration:** `instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `bard`, `druid`, `ranger`

#### Baseline Prose

> **Plant Growth.** You channel vitality into plants to overgrow terrain or enrich crops. _Range:_ 150 feet.

---

### Protection from Energy (`protectionFromEnergy`)

- **Source File:** [`data/spells/level3Spells/protectionFromEnergy.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/protectionFromEnergy.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `abjuration`, `artificer`, `cleric`, `druid`, `ranger`, `sorcerer`, `wizard`

#### Baseline Prose

> **Protection from Energy.** One creature you touch gains Resistance to one damage type (Acid, Cold, Fire, Lightning, or Thunder). _Concentration:_ Up to 1 hour.

---

### Remove Curse (`removeCurse`)

- **Source File:** [`data/spells/level3Spells/removeCurse.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/removeCurse.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `abjuration`, `cleric`, `paladin`, `warlock`, `wizard`

#### Baseline Prose

> **Remove Curse.** One creature you touch ends all curses affecting a creature or object.

---

### Revivify (`revivify`)

- **Source File:** [`data/spells/level3Spells/revivify.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/revivify.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `necromancy`, `artificer`, `cleric`, `druid`, `paladin`, `ranger`

#### Baseline Prose

> **Revivify.** Returns a creature that died within the last minute to life with 1 Hit Point. _Range:_ Touch.

---

### Sending (`sending`)

- **Source File:** [`data/spells/level3Spells/sending.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/sending.yml)
- **Time:** `action` | **Range:** `unlimited` | **Duration:** `instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `divination`, `bard`, `cleric`, `wizard`, `psion`

#### Baseline Prose

> **Sending.** You send a short mental message across any distance. _Range:_ Unlimited.

---

### Sleet Storm (`sleetStorm`)

- **Source File:** [`data/spells/level3Spells/sleetStorm.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/sleetStorm.yml)
- **Time:** `action` | **Range:** `150 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `conjuration`, `druid`, `sorcerer`, `wizard`, `saveSpell`

#### Baseline Prose

> **Sleet Storm.** A 40-foot-radius Cylinder of freezing rain and sleet appears centered on a point within 150 feet and creates Difficult Terrain and is Heavily Obscured. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ The target is Prone. _Concentration:_ Up to 1 minute.

---

### Slow (`slow`)

- **Source File:** [`data/spells/level3Spells/slow.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/slow.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `bard`, `sorcerer`, `wizard`, `saveSpell`

#### Baseline Prose

> **Slow.** _Wisdom Saving Throw:_ DC 15, up to 6 targets within 120 feet. _Failure:_ Each target has its AC reduced by 2, and speed is halved, has -2 to Dex saves, and can't use reactions or take both action and Bonus Action on a turn. _Concentration:_ Up to 1 minute.

---

### Speak with Dead (`speakWithDead`)

- **Source File:** [`data/spells/level3Spells/speakWithDead.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/speakWithDead.yml)
- **Time:** `action` | **Range:** `10 feet` | **Duration:** `10 minutes`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `necromancy`, `bard`, `cleric`, `wizard`

#### Baseline Prose

> **Speak with Dead.** You grant temporary sentience to a corpse so it can answer questions. _Range:_ 10 feet. _Duration:_ 10 minutes.

---

### Speak with Plants (`speakWithPlants`)

- **Source File:** [`data/spells/level3Spells/speakWithPlants.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/speakWithPlants.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `bard`, `druid`, `ranger`

#### Baseline Prose

> **Speak with Plants.** You imbue plants with sentience to communicate and follow commands. _Duration:_ 10 minutes.

---

### Spirit Guardians (`spiritGuardians`)

- **Source File:** [`data/spells/level3Spells/spiritGuardians.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/spiritGuardians.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `conjuration`, `cleric`, `saveSpell`, `damageSpell`, `necroticDamage`, `radiantDamage`

#### Baseline Prose

> **Spirit Guardians.** A 15-foot-radius Emanation of protective spirits appears centered on you and creates Difficult Terrain. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15. _Failure:_ 3d8 Radiant or Necrotic damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d8 Radiant or Necrotic damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Spirit Guardians.** A 15-foot-radius Emanation of protective spirits appears centered on you and creates Difficult Terrain. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15. _Failure:_ 3d8+3 Radiant or Necrotic damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d8 Radiant or Necrotic damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Spirit Guardians.** A 15-foot-radius Emanation of protective spirits appears centered on you and creates Difficult Terrain. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15. _Failure:_ 3d8 Radiant or Necrotic damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d8 Radiant or Necrotic damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Spirit Guardians.** A 15-foot-radius Emanation of protective spirits appears centered on you and creates Difficult Terrain. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15. _Failure:_ 3d8+3 Radiant or Necrotic damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d8 Radiant or Necrotic damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Spirit Guardians.** A 15-foot-radius Emanation of protective spirits appears centered on you and creates Difficult Terrain. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15. _Failure:_ 3d8 Radiant or Necrotic damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d8 Radiant or Necrotic damage.

---

### Stinking Cloud (`stinkingCloud`)

- **Source File:** [`data/spells/level3Spells/stinkingCloud.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/stinkingCloud.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `conjuration`, `bard`, `sorcerer`, `wizard`, `saveSpell`

#### Baseline Prose

> **Stinking Cloud.** A 20-foot-radius Sphere of nauseating gas appears centered on a point within 90 feet and is Heavily Obscured. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Constitution Saving Throw:_ DC 15. _Failure:_ The target has the Poisoned condition, and can't take an action or bonus action on its turn. _Concentration:_ Up to 1 minute.

---

### Summon Astral Entity (`summonAstralEntity`)

- **Source File:** [`data/spells/level3Spells/summonAstralEntity.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/summonAstralEntity.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `conjuration`, `psion`

#### Baseline Prose

> **Summon Astral Entity.** You call forth an astral entity from the Astral Plane to fight alongside you. _Range:_ 90 feet. _Concentration:_ Up to 1 hour.

---

### Summon Fey (`summonFey`)

- **Source File:** [`data/spells/level3Spells/summonFey.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/summonFey.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `conjuration`, `druid`, `ranger`, `warlock`, `wizard`

#### Baseline Prose

> **Summon Fey.** You call forth a fey spirit to fight alongside you. _Range:_ 90 feet. _Concentration:_ Up to 1 hour.

---

### Summon Undead (`summonUndead`)

- **Source File:** [`data/spells/level3Spells/summonUndead.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/summonUndead.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `necromancy`, `warlock`, `wizard`

#### Baseline Prose

> **Summon Undead.** You call forth an undead spirit to fight alongside you. _Range:_ 90 feet. _Concentration:_ Up to 1 hour.

---

### Telekinetic Crush (`telekineticCrush`)

- **Source File:** [`data/spells/level3Spells/telekineticCrush.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/telekineticCrush.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `Instantaneous`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `psion`, `sorcerer`, `warlock`, `saveSpell`, `damageSpell`, `forceDamage`

#### Baseline Prose

> **Telekinetic Crush.** _Strength Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 5d6 Force damage, and the target is Prone. _Success:_ Half damage. _Upcast:_ +1d6 Force damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Telekinetic Crush.** _Strength Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 5d6+3 Force damage, and the target is Prone. _Success:_ Half damage. _Upcast:_ +1d6 Force damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Telekinetic Crush.** _Strength Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 5d6 Force damage, and the target is Prone. _Success:_ Half damage. _Upcast:_ +1d6 Force damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Telekinetic Crush.** _Strength Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 5d6+3 Force damage, and the target is Prone. _Success:_ Half damage. _Upcast:_ +1d6 Force damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Telekinetic Crush.** _Strength Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 5d6 Force damage, and the target is Prone. _Success:_ Half damage. _Upcast:_ +1d6 Force damage.

---

### Tongues (`tongues`)

- **Source File:** [`data/spells/level3Spells/tongues.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/tongues.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `divination`, `bard`, `cleric`, `sorcerer`, `warlock`, `wizard`, `psion`

#### Baseline Prose

> **Tongues.** You grant a creature the ability to understand and speak any language. _Range:_ Touch. _Duration:_ 1 hour.

---

### Vampiric Touch (`vampiricTouch`)

- **Source File:** [`data/spells/level3Spells/vampiricTouch.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/vampiricTouch.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `necromancy`, `sorcerer`, `warlock`, `wizard`, `healingSpell`

#### Baseline Prose

> **Vampiric Touch.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 3d6 Necrotic damage, and you regain Hit Points equal to half the necrotic damage dealt. _Repeat:_ On subsequent turns, you can take an action to repeat the attack. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Necrotic damage.

#### Individual Feature Modifications (1)

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Vampiric Touch.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 3d6+3 Necrotic damage, and you regain Hit Points equal to half the necrotic damage dealt. _Repeat:_ On subsequent turns, you can take an action to repeat the attack. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Necrotic damage.

#### Realistic Combined Class Stacks (1)

* **Stack: ARTIFICER (alchemist) + [Alchemist]**
  > **Vampiric Touch.** _Melee Attack Roll:_ +7, reach 5 feet. _Hit:_ 3d6+3 Necrotic damage, and you regain Hit Points equal to half the necrotic damage dealt. _Repeat:_ On subsequent turns, you can take an action to repeat the attack. _Concentration:_ Up to 1 minute. _Upcast:_ +1d6 Necrotic damage.

---

### Water Breathing (`waterBreathing`)

- **Source File:** [`data/spells/level3Spells/waterBreathing.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/waterBreathing.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `24 hours`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `artificer`, `druid`, `ranger`, `sorcerer`, `wizard`, `ritual`

#### Baseline Prose

> **Water Breathing.** Up to 10 creatures within 30 feet gain the ability to breathe underwater. _Duration:_ 24 hours. _Ritual_.

---

### Water Walk (`waterWalk`)

- **Source File:** [`data/spells/level3Spells/waterWalk.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/waterWalk.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `1 hour`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `transmutation`, `artificer`, `cleric`, `druid`, `ranger`, `sorcerer`, `ritual`

#### Baseline Prose

> **Water Walk.** Up to 10 creatures within 30 feet gain the ability to move across liquid surfaces as if they were solid ground. _Duration:_ 1 hour. _Ritual_.

---

### Wind Wall (`windWall`)

- **Source File:** [`data/spells/level3Spells/windWall.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level3Spells/windWall.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level3SpellSlot`
- **Tags:** `level3Spell`, `evocation`, `druid`, `ranger`, `saveSpell`, `damageSpell`, `bludgeoningDamage`

#### Baseline Prose

> **Wind Wall.** A 50-foot Wall of strong wind appears centered on a point within 120 feet. _Trigger:_ When the area is created. _Response:_ _Strength Saving Throw:_ DC 15. _Failure:_ 4d8 Bludgeoning damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Bludgeoning damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Wind Wall.** A 50-foot Wall of strong wind appears centered on a point within 120 feet. _Trigger:_ When the area is created. _Response:_ _Strength Saving Throw:_ DC 15. _Failure:_ 4d8+3 Bludgeoning damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Bludgeoning damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Wind Wall.** A 50-foot Wall of strong wind appears centered on a point within 120 feet. _Trigger:_ When the area is created. _Response:_ _Strength Saving Throw:_ DC 15. _Failure:_ 4d8 Bludgeoning damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Bludgeoning damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Wind Wall.** A 50-foot Wall of strong wind appears centered on a point within 120 feet. _Trigger:_ When the area is created. _Response:_ _Strength Saving Throw:_ DC 15. _Failure:_ 4d8+3 Bludgeoning damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Bludgeoning damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Wind Wall.** A 50-foot Wall of strong wind appears centered on a point within 120 feet. _Trigger:_ When the area is created. _Response:_ _Strength Saving Throw:_ DC 15. _Failure:_ 4d8 Bludgeoning damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Bludgeoning damage.

---

## Spells: 4th Level

### Arcane Eye (`arcaneEye`)

- **Source File:** [`data/spells/level4Spells/arcaneEye.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/arcaneEye.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `divination`, `artificer`, `wizard`, `psion`

#### Baseline Prose

> **Arcane Eye.** You create an invisible hovering sensor to scout remotely. _Range:_ 30 feet. _Concentration:_ Up to 1 hour.

---

### Aura of Life (`auraOfLife`)

- **Source File:** [`data/spells/level4Spells/auraOfLife.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/auraOfLife.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `abjuration`, `cleric`, `paladin`, `healingSpell`

#### Baseline Prose

> **Aura of Life.** A 30-foot-radius Emanation of life-giving energy appears centered on you. _Trigger:_ while in the aura. _Response:_ Allies gain Resistance to Necrotic damage, maximum Hit Points cannot be reduced, and living creatures at 0 Hit Points regain 1 Hit Point at the start of their turn. _Concentration:_ Up to 10 minutes.

---

### Aura of Purity (`auraOfPurity`)

- **Source File:** [`data/spells/level4Spells/auraOfPurity.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/auraOfPurity.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `abjuration`, `cleric`, `paladin`

#### Baseline Prose

> **Aura of Purity.** A 30-foot-radius Emanation allies in aura can't become Diseased, gain Resistance to Poison damage, and gain Advantage on saving throws against the Blinded, Charmed, Deafened, Frightened, Paralyzed, Poisoned, and Stunned conditions. _Concentration:_ Up to 10 minutes.

---

### Banishment (`banishment`)

- **Source File:** [`data/spells/level4Spells/banishment.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/banishment.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `abjuration`, `cleric`, `paladin`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Banishment.** _Charisma Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ The target has the Incapacitated condition, and is banished to a harmless demiplane (or its home plane if native there). _Concentration:_ Up to 1 minute. _Upcast:_ +1 target.

---

### Blight (`blight`)

- **Source File:** [`data/spells/level4Spells/blight.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/blight.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `instantaneous`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `necromancy`, `druid`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `damageSpell`, `necroticDamage`

#### Baseline Prose

> **Blight.** _Constitution Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ 8d8 Necrotic damage. _Success:_ Half damage. _Upcast:_ +1d8 Necrotic damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Blight.** _Constitution Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ 8d8+3 Necrotic damage. _Success:_ Half damage. _Upcast:_ +1d8 Necrotic damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Blight.** _Constitution Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ 8d8 Necrotic damage. _Success:_ Half damage. _Upcast:_ +1d8 Necrotic damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Blight.** _Constitution Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ 8d8+3 Necrotic damage. _Success:_ Half damage. _Upcast:_ +1d8 Necrotic damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Blight.** _Constitution Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ 8d8 Necrotic damage. _Success:_ Half damage. _Upcast:_ +1d8 Necrotic damage.

---

### Charm Monster (`charmMonster`)

- **Source File:** [`data/spells/level4Spells/charmMonster.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/charmMonster.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `1 hour`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `enchantment`, `bard`, `druid`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Charm Monster.** _Wisdom Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ The target has the Charmed condition (ends if the target takes damage), and ends early if you or your allies damage the target. _Duration:_ 1 hour. _Upcast:_ +1 target.

---

### Compulsion (`compulsion`)

- **Source File:** [`data/spells/level4Spells/compulsion.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/compulsion.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `enchantment`, `bard`, `saveSpell`, `psion`

#### Baseline Prose

> **Compulsion.** _Wisdom Saving Throw:_ DC 15, creatures of your choice within 30 feet. _Failure:_ Each target has the Charmed condition, and on each of your turns, you can use a Bonus Action to designate a direction for targets to move. _Concentration:_ Up to 1 minute.

---

### Confusion (`confusion`)

- **Source File:** [`data/spells/level4Spells/confusion.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/confusion.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `enchantment`, `bard`, `druid`, `sorcerer`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Confusion.** _Wisdom Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 90 feet. _Failure:_ Targets act randomly on their turns (d10 roll for movement/action behavior). _Concentration:_ Up to 1 minute. _Upcast:_ +5 ft. Sphere radius.

---

### Conjure Minor Elementals (`conjureMinorElementals`)

- **Source File:** [`data/spells/level4Spells/conjureMinorElementals.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/conjureMinorElementals.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `conjuration`, `druid`, `wizard`

#### Baseline Prose

> **Conjure Minor Elementals.** A 15-foot-radius Emanation any attack you make deals an extra 2d8 damage (Acid, Cold, Fire, or Lightning) when you hit a creature in the Emanation, and enemies treat the area as Difficult Terrain. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d8 extra damage on attacks.

---

### Conjure Woodland Beings (`conjureWoodlandBeings`)

- **Source File:** [`data/spells/level4Spells/conjureWoodlandBeings.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/conjureWoodlandBeings.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `conjuration`, `druid`, `ranger`, `saveSpell`, `damageSpell`, `forceDamage`

#### Baseline Prose

> **Conjure Woodland Beings.** A 10-foot-radius Emanation of fey spirits appears centered on you. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15. _Failure:_ 3d8 Force damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d8 Force damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Conjure Woodland Beings.** A 10-foot-radius Emanation of fey spirits appears centered on you. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15. _Failure:_ 3d8+3 Force damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d8 Force damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Conjure Woodland Beings.** A 10-foot-radius Emanation of fey spirits appears centered on you. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15. _Failure:_ 3d8 Force damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d8 Force damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Conjure Woodland Beings.** A 10-foot-radius Emanation of fey spirits appears centered on you. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15. _Failure:_ 3d8+3 Force damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d8 Force damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Conjure Woodland Beings.** A 10-foot-radius Emanation of fey spirits appears centered on you. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Wisdom Saving Throw:_ DC 15. _Failure:_ 3d8 Force damage. _Success:_ Half damage. _Concentration:_ Up to 10 minutes. _Upcast:_ +1d8 Force damage.

---

### Control Water (`controlWater`)

- **Source File:** [`data/spells/level4Spells/controlWater.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/controlWater.yml)
- **Time:** `action` | **Range:** `300 feet` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `transmutation`, `cleric`, `druid`, `wizard`, `saveSpell`, `damageSpell`, `bludgeoningDamage`

#### Baseline Prose

> **Control Water.** A 100-foot-radius Cube centered on a point within 300 feet you manipulate water in an area to flood, part, or form whirlpools. _Concentration:_ Up to 10 minutes.

---

### Death Ward (`deathWard`)

- **Source File:** [`data/spells/level4Spells/deathWard.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/deathWard.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `8 hours`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `abjuration`, `cleric`, `paladin`

#### Baseline Prose

> **Death Ward.** The first time target drops to 0 Hit Points, it drops to 1 Hit Point instead, ending the spell. _Range:_ Touch. _Duration:_ 8 hours.

---

### Dimension Door (`dimensionDoor`)

- **Source File:** [`data/spells/level4Spells/dimensionDoor.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/dimensionDoor.yml)
- **Time:** `action` | **Range:** `500 feet` | **Duration:** `instantaneous`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `conjuration`, `bard`, `sorcerer`, `warlock`, `wizard`, `psion`

#### Baseline Prose

> **Dimension Door.** You teleport yourself and one willing creature within 5 feet to any destination within range. _Range:_ 500 feet.

---

### Divination (`divination`)

- **Source File:** [`data/spells/level4Spells/divination.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/divination.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `instantaneous`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `divination`, `cleric`, `druid`, `wizard`, `ritual`

#### Baseline Prose

> **Divination.** You contact a deity or servant to receive a truthful reply about a future goal. _Ritual_.

---

### Dominate Beast (`dominateBeast`)

- **Source File:** [`data/spells/level4Spells/dominateBeast.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/dominateBeast.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `enchantment`, `druid`, `ranger`, `sorcerer`, `saveSpell`

#### Baseline Prose

> **Dominate Beast.** _Wisdom Saving Throw:_ DC 15, one beast within 60 feet. _Failure:_ The target has the Charmed condition (repeats save whenever it takes damage), and repeats the save whenever it takes damage. _Concentration:_ Up to 1 minute. _Upcast:_ longer Concentration (level 5: up to 10 minutes, level 6: up to 1 hour, level 7+: up to 8 hours).

---

### Black Tentacles (`evardsBlackTentacles`)

- **Source File:** [`data/spells/level4Spells/evardsBlackTentacles.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/evardsBlackTentacles.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `conjuration`, `wizard`, `saveSpell`, `damageSpell`, `bludgeoningDamage`

#### Baseline Prose

> **Black Tentacles.** A 20-foot-radius Cube of squirming tentacles appears centered on a point within 90 feet and creates Difficult Terrain. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 3d6 Bludgeoning damage, and the target has the Restrained condition. _Concentration:_ Up to 1 minute.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Black Tentacles.** A 20-foot-radius Cube of squirming tentacles appears centered on a point within 90 feet and creates Difficult Terrain. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 3d6+3 Bludgeoning damage, and the target has the Restrained condition. _Concentration:_ Up to 1 minute.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Black Tentacles.** A 20-foot-radius Cube of squirming tentacles appears centered on a point within 90 feet and creates Difficult Terrain. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 3d6 Bludgeoning damage, and the target has the Restrained condition. _Concentration:_ Up to 1 minute.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Black Tentacles.** A 20-foot-radius Cube of squirming tentacles appears centered on a point within 90 feet and creates Difficult Terrain. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 3d6+3 Bludgeoning damage, and the target has the Restrained condition. _Concentration:_ Up to 1 minute.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Black Tentacles.** A 20-foot-radius Cube of squirming tentacles appears centered on a point within 90 feet and creates Difficult Terrain. _Trigger:_ When the area is created, a creature enters the area, or a creature starts its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 3d6 Bludgeoning damage, and the target has the Restrained condition. _Concentration:_ Up to 1 minute.

---

### Fabricate (`fabricate`)

- **Source File:** [`data/spells/level4Spells/fabricate.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/fabricate.yml)
- **Time:** `10 minutes` | **Range:** `120 feet` | **Duration:** `instantaneous`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `transmutation`, `artificer`, `wizard`

#### Baseline Prose

> **Fabricate.** You convert raw materials into finished products of the same material. _Range:_ 120 feet.

---

### Fire Shield (`fireShield`)

- **Source File:** [`data/spells/level4Spells/fireShield.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/fireShield.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `10 minutes`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `evocation`, `druid`, `sorcerer`, `wizard`

#### Baseline Prose

> **Fire Shield.** You grant Resistance to Cold (Warm Shield) or Fire (Chill Shield); whenever a creature hits you with a melee attack within 5 feet, it takes 2d8 Fire or Cold damage. _Duration:_ 10 minutes.

---

### Fount of Moonlight (`fountOfMoonlight`)

- **Source File:** [`data/spells/level4Spells/fountOfMoonlight.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/fountOfMoonlight.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 10 minutes`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `evocation`, `bard`, `druid`, `saveSpell`, `damageSpell`, `forceDamage`, `radiantDamage`

#### Baseline Prose

> **Fount of Moonlight.** You shed light, gain Resistance to Radiant damage, your melee attacks deal +2d6 Radiant damage, and attackers within 20 feet make a Constitution saving throw or become Blinded. _Concentration:_ Up to 10 minutes.

---

### Freedom of Movement (`freedomOfMovement`)

- **Source File:** [`data/spells/level4Spells/freedomOfMovement.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/freedomOfMovement.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `1 hour`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `abjuration`, `artificer`, `bard`, `cleric`, `druid`, `ranger`, `psion`

#### Baseline Prose

> **Freedom of Movement.** One creature you touch gains the ability to ignore movement restrictions, paralysis, and nonmagical restraints. _Duration:_ 1 hour. _Upcast:_ +1 target.

---

### Grasping Vine (`graspingVine`)

- **Source File:** [`data/spells/level4Spells/graspingVine.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/graspingVine.yml)
- **Time:** `bonus action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `conjuration`, `druid`, `ranger`, `saveSpell`, `damageSpell`, `bludgeoningDamage`

#### Baseline Prose

> **Grasping Vine.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 4d8 Bludgeoning damage, and the target has the Grappled condition and is pulled up to 30 feet closer. _Repeat:_ On subsequent turns, you can take a Bonus Action to repeat the attack. _Concentration:_ Up to 1 minute. _Upcast:_ +1 grapple capacity.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Grasping Vine.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 4d8+3 Bludgeoning damage, and the target has the Grappled condition and is pulled up to 30 feet closer. _Repeat:_ On subsequent turns, you can take a Bonus Action to repeat the attack. _Concentration:_ Up to 1 minute. _Upcast:_ +1 grapple capacity.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Grasping Vine.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 4d8 Bludgeoning damage, and the target has the Grappled condition and is pulled up to 30 feet closer. _Repeat:_ On subsequent turns, you can take a Bonus Action to repeat the attack. _Concentration:_ Up to 1 minute. _Upcast:_ +1 grapple capacity.

* **+ Pull of Death** *(from [`data/classes/subclasses/cleric/grave.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/cleric/grave.yml))*
  > **Grasping Vine.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 4d8 Bludgeoning damage, the target has the Grappled condition and is pulled up to 30 feet closer, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Repeat:_ On subsequent turns, you can take a Bonus Action to repeat the attack. _Concentration:_ Up to 1 minute. _Upcast:_ +1 grapple capacity.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Grasping Vine.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 4d8+3 Bludgeoning damage, and the target has the Grappled condition and is pulled up to 30 feet closer. _Repeat:_ On subsequent turns, you can take a Bonus Action to repeat the attack. _Concentration:_ Up to 1 minute. _Upcast:_ +1 grapple capacity.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Grasping Vine.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 4d8 Bludgeoning damage, and the target has the Grappled condition and is pulled up to 30 feet closer. _Repeat:_ On subsequent turns, you can take a Bonus Action to repeat the attack. _Concentration:_ Up to 1 minute. _Upcast:_ +1 grapple capacity.

* **Stack: CLERIC (grave) + [Pull of Death]**
  > **Grasping Vine.** _Ranged Attack Roll:_ +7, range 60 feet. _Hit:_ 4d8 Bludgeoning damage, the target has the Grappled condition and is pulled up to 30 feet closer, and once per turn, if the target is missing any Hit Points, deal extra 1d4 Necrotic damage. _Repeat:_ On subsequent turns, you can take a Bonus Action to repeat the attack. _Concentration:_ Up to 1 minute. _Upcast:_ +1 grapple capacity.

---

### Greater Invisibility (`greaterInvisibility`)

- **Source File:** [`data/spells/level4Spells/greaterInvisibility.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/greaterInvisibility.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `illusion`, `bard`, `sorcerer`, `wizard`, `psion`

#### Baseline Prose

> **Greater Invisibility.** One creature you touch has the Invisible condition. _Concentration:_ Up to 1 minute.

---

### Guardian of Faith (`guardianOfFaith`)

- **Source File:** [`data/spells/level4Spells/guardianOfFaith.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/guardianOfFaith.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `8 hours`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `conjuration`, `cleric`, `saveSpell`, `damageSpell`, `radiantDamage`

#### Baseline Prose

> **Guardian of Faith.** _Dexterity Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 30 feet. _Failure:_ 20 Radiant damage. _Success:_ Half damage. _Duration:_ 8 hours.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Guardian of Faith.** _Dexterity Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 30 feet. _Failure:_ 23 Radiant damage. _Success:_ Half damage. _Duration:_ 8 hours.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Guardian of Faith.** _Dexterity Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 30 feet. _Failure:_ 20 Radiant damage. _Success:_ Half damage. _Duration:_ 8 hours.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Guardian of Faith.** _Dexterity Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 30 feet. _Failure:_ 23 Radiant damage. _Success:_ Half damage. _Duration:_ 8 hours.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Guardian of Faith.** _Dexterity Saving Throw:_ DC 15, each creature in a 10-foot-radius Sphere centered on a point within 30 feet. _Failure:_ 20 Radiant damage. _Success:_ Half damage. _Duration:_ 8 hours.

---

### Hallucinatory Terrain (`hallucinatoryTerrain`)

- **Source File:** [`data/spells/level4Spells/hallucinatoryTerrain.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/hallucinatoryTerrain.yml)
- **Time:** `10 minutes` | **Range:** `300 feet` | **Duration:** `24 hours`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `illusion`, `bard`, `druid`, `warlock`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Hallucinatory Terrain.** A 150-foot-radius Cube centered on a point within 300 feet you disguise natural terrain to look, sound, and smell like another landscape. _Duration:_ 24 hours.

#### Individual Feature Modifications (1)

* **+ Illusionist** *(from [`data/classes/subclasses/wizard/illusionist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/illusionist.yml))*
  > **Hallucinatory Terrain.** A 150-foot-radius Cube centered on a point within 360 feet you disguise natural terrain to look, sound, and smell like another landscape. _Duration:_ 24 hours.

#### Realistic Combined Class Stacks (1)

* **Stack: WIZARD (illusionist) + [Illusionist]**
  > **Hallucinatory Terrain.** A 150-foot-radius Cube centered on a point within 360 feet you disguise natural terrain to look, sound, and smell like another landscape. _Duration:_ 24 hours.

---

### Ice Storm (`iceStorm`)

- **Source File:** [`data/spells/level4Spells/iceStorm.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/iceStorm.yml)
- **Time:** `action` | **Range:** `300 feet` | **Duration:** `instantaneous`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `evocation`, `druid`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `bludgeoningDamage`, `coldDamage`

#### Baseline Prose

> **Ice Storm.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Cylinder centered on a point within 300 feet. _Failure:_ 2d10 Bludgeoning damage plus 4d6 Cold damage. _Success:_ Half damage. The area becomes Difficult Terrain until the end of your next turn. _Upcast:_ +1d10 Bludgeoning damage.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Ice Storm.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Cylinder centered on a point within 300 feet. _Failure:_ 2d10+3 Bludgeoning damage plus 4d6+3 Cold damage. _Success:_ Half damage. The area becomes Difficult Terrain until the end of your next turn. _Upcast:_ +1d10 Bludgeoning damage.

* **+ Cold Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/coldAffinity.yml))*
  > **Ice Storm.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Cylinder centered on a point within 300 feet. _Failure:_ 2d10 Bludgeoning damage plus 4d6 Cold damage. _Success:_ Half damage. The area becomes Difficult Terrain until the end of your next turn. _Upcast:_ +1d10 Bludgeoning damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Ice Storm.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Cylinder centered on a point within 300 feet. _Failure:_ 2d10 Bludgeoning damage plus 4d6 Cold damage. _Success:_ Half damage. The area becomes Difficult Terrain until the end of your next turn. _Upcast:_ +1d10 Bludgeoning damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Ice Storm.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Cylinder centered on a point within 300 feet. _Failure:_ 2d10+3 Bludgeoning damage plus 4d6+3 Cold damage. _Success:_ Half damage. The area becomes Difficult Terrain until the end of your next turn. _Upcast:_ +1d10 Bludgeoning damage.

* **Stack: SORCERER + [Cold Affinity]**
  > **Ice Storm.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Cylinder centered on a point within 300 feet. _Failure:_ 2d10 Bludgeoning damage plus 4d6 Cold damage. _Success:_ Half damage. The area becomes Difficult Terrain until the end of your next turn. _Upcast:_ +1d10 Bludgeoning damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Ice Storm.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Cylinder centered on a point within 300 feet. _Failure:_ 2d10 Bludgeoning damage plus 4d6 Cold damage. _Success:_ Half damage. The area becomes Difficult Terrain until the end of your next turn. _Upcast:_ +1d10 Bludgeoning damage.

---

### Secret Chest (`leomundsSecretChest`)

- **Source File:** [`data/spells/level4Spells/leomundsSecretChest.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/leomundsSecretChest.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `until dispelled`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `conjuration`, `artificer`, `wizard`

#### Baseline Prose

> **Secret Chest.** You hide a chest and its contents safely on the Ethereal Plane. _Range:_ Touch. _Duration:_ Until dispelled.

---

### Life Inversion Field (`lifeInversionField`)

- **Source File:** [`data/spells/level4Spells/lifeInversionField.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/lifeInversionField.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `abjuration`, `cleric`, `psion`, `sorcerer`, `saveSpell`, `damageSpell`, `necroticDamage`

#### Baseline Prose

> **Life Inversion Field.** A 30-foot-radius Emanation when you regain Hit Points, foes in aura take Necrotic damage equal to half the HP restored. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 initial healing.

---

### Locate Creature (`locateCreature`)

- **Source File:** [`data/spells/level4Spells/locateCreature.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/locateCreature.yml)
- **Time:** `action` | **Range:** `self` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `divination`, `bard`, `cleric`, `druid`, `paladin`, `ranger`, `wizard`, `psion`

#### Baseline Prose

> **Locate Creature.** You sense the direction to a familiar or described creature. _Concentration:_ Up to 1 hour.

---

### Faithful Hound (`mordenkainensFaithfulHound`)

- **Source File:** [`data/spells/level4Spells/mordenkainensFaithfulHound.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/mordenkainensFaithfulHound.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `8 hours`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `conjuration`, `wizard`, `saveSpell`, `damageSpell`, `forceDamage`

#### Baseline Prose

> **Faithful Hound.** You conjure a phantom watchdog to guard an area and strike invaders. _Range:_ 30 feet. _Duration:_ 8 hours.

---

### Private Sanctum (`mordenkainensPrivateSanctum`)

- **Source File:** [`data/spells/level4Spells/mordenkainensPrivateSanctum.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/mordenkainensPrivateSanctum.yml)
- **Time:** `10 minutes` | **Range:** `120 feet` | **Duration:** `24 hours`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `abjuration`, `artificer`, `wizard`

#### Baseline Prose

> **Private Sanctum.** A 100-foot-radius Cube centered on a point within 120 feet you make an area magically secure against scrying and planar travel. _Duration:_ 24 hours. _Upcast:_ +100 ft. Cube size.

---

### Resilient Sphere (`otilukesResilientSphere`)

- **Source File:** [`data/spells/level4Spells/otilukesResilientSphere.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/otilukesResilientSphere.yml)
- **Time:** `action` | **Range:** `30 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `abjuration`, `artificer`, `wizard`, `saveSpell`

#### Baseline Prose

> **Resilient Sphere.** _Dexterity Saving Throw:_ DC 15, one creature within 30 feet. _Failure:_ The target is enclosed in a sphere of force, preventing all damage and effects into or out of the sphere. _Concentration:_ Up to 1 minute.

---

### Phantasmal Killer (`phantasmalKiller`)

- **Source File:** [`data/spells/level4Spells/phantasmalKiller.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/phantasmalKiller.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `illusion`, `bard`, `wizard`, `saveSpell`, `damageSpell`, `psychicDamage`, `psion`

#### Baseline Prose

> **Phantasmal Killer.** _Wisdom Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 4d10 Psychic damage, the target has the Frightened condition (repeats save at end of each turn), and repeats the save at the end of each of its turns. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Psychic damage.

#### Individual Feature Modifications (3)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Phantasmal Killer.** _Wisdom Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 4d10+3 Psychic damage, the target has the Frightened condition (repeats save at end of each turn), and repeats the save at the end of each of its turns. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Psychic damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Phantasmal Killer.** _Wisdom Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 4d10 Psychic damage, the target has the Frightened condition (repeats save at end of each turn), and repeats the save at the end of each of its turns. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Psychic damage.

* **+ Illusionist** *(from [`data/classes/subclasses/wizard/illusionist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/wizard/illusionist.yml))*
  > **Phantasmal Killer.** _Wisdom Saving Throw:_ DC 15, one creature within 180 feet. _Failure:_ 4d10 Psychic damage, the target has the Frightened condition (repeats save at end of each turn), and repeats the save at the end of each of its turns. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Psychic damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Phantasmal Killer.** _Wisdom Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 4d10+3 Psychic damage, the target has the Frightened condition (repeats save at end of each turn), and repeats the save at the end of each of its turns. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Psychic damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Phantasmal Killer.** _Wisdom Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 4d10 Psychic damage, the target has the Frightened condition (repeats save at end of each turn), and repeats the save at the end of each of its turns. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Psychic damage.

* **Stack: WIZARD (illusionist) + [Illusionist]**
  > **Phantasmal Killer.** _Wisdom Saving Throw:_ DC 15, one creature within 180 feet. _Failure:_ 4d10 Psychic damage, the target has the Frightened condition (repeats save at end of each turn), and repeats the save at the end of each of its turns. _Concentration:_ Up to 1 minute. _Upcast:_ +1d10 Psychic damage.

---

### Polymorph (`polymorph`)

- **Source File:** [`data/spells/level4Spells/polymorph.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/polymorph.yml)
- **Time:** `action` | **Range:** `60 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `transmutation`, `bard`, `druid`, `sorcerer`, `wizard`, `saveSpell`, `psion`

#### Baseline Prose

> **Polymorph.** _Wisdom Saving Throw:_ DC 15, one creature within 60 feet. _Failure:_ The target is transformed into a beast form of your choice (replacing its stat block). _Concentration:_ Up to 1 hour.

---

### Psychic Lance (`raulothimsPsychicLance`)

- **Source File:** [`data/spells/level4Spells/raulothimsPsychicLance.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/raulothimsPsychicLance.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `instantaneous`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `enchantment`, `bard`, `psion`, `sorcerer`, `warlock`, `wizard`, `saveSpell`, `damageSpell`, `psychicDamage`

#### Baseline Prose

> **Psychic Lance.** _Intelligence Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 7d6 Psychic damage, and the target has the Incapacitated condition until the end of your next turn. _Upcast:_ +1d6 Psychic damage.

#### Individual Feature Modifications (2)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Psychic Lance.** _Intelligence Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 7d6+3 Psychic damage, and the target has the Incapacitated condition until the end of your next turn. _Upcast:_ +1d6 Psychic damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Psychic Lance.** _Intelligence Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 7d6 Psychic damage, and the target has the Incapacitated condition until the end of your next turn. _Upcast:_ +1d6 Psychic damage.

#### Realistic Combined Class Stacks (2)

* **Stack: ARTIFICER + [Arcane Conduit]**
  > **Psychic Lance.** _Intelligence Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 7d6+3 Psychic damage, and the target has the Incapacitated condition until the end of your next turn. _Upcast:_ +1d6 Psychic damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Psychic Lance.** _Intelligence Saving Throw:_ DC 15, one creature within 120 feet. _Failure:_ 7d6 Psychic damage, and the target has the Incapacitated condition until the end of your next turn. _Upcast:_ +1d6 Psychic damage.

---

### Stone Shape (`stoneShape`)

- **Source File:** [`data/spells/level4Spells/stoneShape.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/stoneShape.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `instantaneous`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `transmutation`, `artificer`, `cleric`, `druid`, `wizard`

#### Baseline Prose

> **Stone Shape.** You shape a stone object or section into any form you desire. _Range:_ Touch.

---

### Stoneskin (`stoneskin`)

- **Source File:** [`data/spells/level4Spells/stoneskin.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/stoneskin.yml)
- **Time:** `action` | **Range:** `touch` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `transmutation`, `artificer`, `druid`, `ranger`, `sorcerer`, `wizard`

#### Baseline Prose

> **Stoneskin.** One creature you touch has Resistance to Bludgeoning, Piercing, and Slashing damage. _Concentration:_ Up to 1 hour.

---

### Summon Aberration (`summonAberration`)

- **Source File:** [`data/spells/level4Spells/summonAberration.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/summonAberration.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `conjuration`, `warlock`, `wizard`, `psion`

#### Baseline Prose

> **Summon Aberration.** You call forth an aberrant spirit to fight alongside you. _Range:_ 90 feet. _Concentration:_ Up to 1 hour.

---

### Summon Construct (`summonConstruct`)

- **Source File:** [`data/spells/level4Spells/summonConstruct.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/summonConstruct.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `conjuration`, `artificer`, `wizard`

#### Baseline Prose

> **Summon Construct.** You call forth a construct spirit to fight alongside you. _Range:_ 90 feet. _Concentration:_ Up to 1 hour.

---

### Summon Elemental (`summonElemental`)

- **Source File:** [`data/spells/level4Spells/summonElemental.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/summonElemental.yml)
- **Time:** `action` | **Range:** `90 feet` | **Duration:** `concentration, up to 1 hour`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `conjuration`, `druid`, `ranger`, `wizard`

#### Baseline Prose

> **Summon Elemental.** You call forth an elemental spirit to fight alongside you. _Range:_ 90 feet. _Concentration:_ Up to 1 hour.

---

### Vitriolic Sphere (`vitriolicSphere`)

- **Source File:** [`data/spells/level4Spells/vitriolicSphere.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/vitriolicSphere.yml)
- **Time:** `action` | **Range:** `150 feet` | **Duration:** `instantaneous`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `evocation`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `acidDamage`

#### Baseline Prose

> **Vitriolic Sphere.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 10d4 Acid damage, and each target takes an additional 5d4 Acid damage at the end of its next turn. _Success:_ Half damage. _Upcast:_ +2d4 Acid damage.

#### Individual Feature Modifications (4)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Vitriolic Sphere.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 10d4+3 Acid damage, and each target takes an additional 5d4 Acid damage at the end of its next turn. _Success:_ Half damage. _Upcast:_ +2d4 Acid damage.

* **+ Acid Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/acidAffinity.yml))*
  > **Vitriolic Sphere.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 10d4 Acid damage, and each target takes an additional 5d4 Acid damage at the end of its next turn. _Success:_ Half damage. _Upcast:_ +2d4 Acid damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Vitriolic Sphere.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 10d4+3 Acid damage, and each target takes an additional 5d4 Acid damage at the end of its next turn. _Success:_ Half damage. _Upcast:_ +2d4 Acid damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Vitriolic Sphere.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 10d4 Acid damage, and each target takes an additional 5d4 Acid damage at the end of its next turn. _Success:_ Half damage. _Upcast:_ +2d4 Acid damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit, Alchemist]**
  > **Vitriolic Sphere.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 10d4+6 Acid damage, and each target takes an additional 5d4 Acid damage at the end of its next turn. _Success:_ Half damage. _Upcast:_ +2d4 Acid damage.

* **Stack: SORCERER + [Acid Affinity]**
  > **Vitriolic Sphere.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 10d4 Acid damage, and each target takes an additional 5d4 Acid damage at the end of its next turn. _Success:_ Half damage. _Upcast:_ +2d4 Acid damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Vitriolic Sphere.** _Dexterity Saving Throw:_ DC 15, each creature in a 20-foot-radius Sphere centered on a point within 150 feet. _Failure:_ 10d4 Acid damage, and each target takes an additional 5d4 Acid damage at the end of its next turn. _Success:_ Half damage. _Upcast:_ +2d4 Acid damage.

---

### Wall of Fire (`wallOfFire`)

- **Source File:** [`data/spells/level4Spells/wallOfFire.yml`](file:///home/gerardo/Projects/card-builder/data/spells/level4Spells/wallOfFire.yml)
- **Time:** `action` | **Range:** `120 feet` | **Duration:** `concentration, up to 1 minute`
- **Resource:** `level4SpellSlot`
- **Tags:** `level4Spell`, `evocation`, `druid`, `sorcerer`, `wizard`, `saveSpell`, `damageSpell`, `fireDamage`

#### Baseline Prose

> **Wall of Fire.** A 60-foot Wall of fire appears centered on a point within 120 feet and is Heavily Obscured. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 5d8 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Fire damage.

#### Individual Feature Modifications (4)

* **+ Arcane Conduit** *(from [`data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/artificer/strangeModifications/arcaneConduit.yml))*
  > **Wall of Fire.** A 60-foot Wall of fire appears centered on a point within 120 feet and is Heavily Obscured. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 5d8+3 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Fire damage.

* **+ Fire Affinity** *(from [`data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml`](file:///home/gerardo/Projects/card-builder/data/classes/classOptions/sorcerer/elementalAffinity/fireAffinity.yml))*
  > **Wall of Fire.** A 60-foot Wall of fire appears centered on a point within 120 feet and is Heavily Obscured. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 5d8 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Fire damage.

* **+ Alchemist** *(from [`data/classes/subclasses/artificer/alchemist.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/artificer/alchemist.yml))*
  > **Wall of Fire.** A 60-foot Wall of fire appears centered on a point within 120 feet and is Heavily Obscured. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 5d8+3 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Fire damage.

* **+ Power from Beyond (Damage)** *(from [`data/classes/subclasses/bard/spirits.yml`](file:///home/gerardo/Projects/card-builder/data/classes/subclasses/bard/spirits.yml))*
  > **Wall of Fire.** A 60-foot Wall of fire appears centered on a point within 120 feet and is Heavily Obscured. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 5d8 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Fire damage.

#### Realistic Combined Class Stacks (3)

* **Stack: ARTIFICER + [Arcane Conduit, Alchemist]**
  > **Wall of Fire.** A 60-foot Wall of fire appears centered on a point within 120 feet and is Heavily Obscured. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 5d8+6 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Fire damage.

* **Stack: SORCERER + [Fire Affinity]**
  > **Wall of Fire.** A 60-foot Wall of fire appears centered on a point within 120 feet and is Heavily Obscured. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 5d8 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Fire damage.

* **Stack: BARD (spirits) + [Power from Beyond (Damage)]**
  > **Wall of Fire.** A 60-foot Wall of fire appears centered on a point within 120 feet and is Heavily Obscured. _Trigger:_ When the area is created, a creature enters the area, or a creature ends its turn there. _Response:_ _Dexterity Saving Throw:_ DC 15. _Failure:_ 5d8 Fire damage. _Success:_ Half damage. _Concentration:_ Up to 1 minute. _Upcast:_ +1d8 Fire damage.

---

