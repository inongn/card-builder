# Activity Mechanics Rules (`mechanic:`)

This document defines the guidelines and standards for defining activity mechanics in YAML files across `data/` (weapons, spells, feats, feature activities, etc.).

---

## 1. Schema & Pattern Definitions

All `mechanic:` blocks must validate against `data/schema/activityMechanic.schema.json`.

- **Valid Pattern Values**:
  - `pattern: attack`: Melee, ranged, spell, or weapon attack rolls.
  - `pattern: save`: Saving throw activities.
  - `pattern: healing`: Healing or temp HP activities.
  - `pattern: automatic`: Automatic effects, buffs, utility, or narrative spells (**Do NOT use `utility`**; the schema keyword is `automatic`).
  - `pattern: aura`: Persistent AoE creation, specifying shape/size, move actions (`action` / `bonus_action`), distance, and brief contents noun phrase text.

- **CRITICAL MANDATE — Saving Throws**:
  - **NEVER HALF-ASS A SAVE!** Saving throws are **ALWAYS** mechanized as an explicit `pattern: save` block.
  - **NEVER** put saving throw rules or DC text inside text payloads of a `pattern: automatic` block when a save can be mechanized.
  - If a feature combines utility/buffs with a saving throw, use a multi-block mechanic (`mode: succession`, `mode: sequence`, or `mode: choice`):
    - **Block 1**: `pattern: automatic` for self/buff/setup text.
    - **Block 2**: `pattern: save` for the actual saving throw (with `ability`, `dc`, and payload branches).

- **Multi-Block Mechanics (`mode: succession`, `mode: sequence`, or `mode: choice`)**:
  - **Persistent AoE Spells**: Block 1 is `pattern: aura` and Block 2+ are saves/automatic payloads with trigger events (`on_cast`, `area_moves_into_space`, `enter_area`, `start_turn`, `end_turn`).
  - **Action Setup Spells**: Spells cast as Bonus Action/Action that grant an Action while persisting (`Produce Flame`, `Dragon's Breath`, `Flame Blade`) use Block 1 `pattern: automatic` text referencing *"the following Action"*, and Block 2 as the actual Attack/Save block.

---

## 2. No Hallucinations & Literal Translation

- Directly translate the activity's authoritative `description` and `summary` into the `mechanic` block.
- **Do NOT hallucinate** extra rules, durations, or secondary effects not present in the text.
- **Mechanically Unique Spells**: If a spell's mechanics are non-standard or highly unique (e.g. `Cordon of Arrows`, `Arcane Vigor`, `Mirror Image`), use `pattern: automatic` with explicit text translating the precise rules.

---

## 3. Effect Target Path Guardrails (IMPORTANT)

- **NEVER use numeric array indices** in `Effect` `target` paths (e.g. `blocks[0]`, `payloads[0]` IS BROKEN). The engine's path resolver interprets brackets as query selectors, not array offsets.
- **DO use Property Fan-Out**:
  - `activities[tags=unarmed].mechanic.hit.damageType`: The path engine automatically fans out through `mechanic` into `hit` of all blocks containing a `hit` property.
  - `activities[id=envenomWeapon].mechanic.payloads.damageType`: The path engine automatically fans out through `mechanic` into `payloads` of all blocks containing payloads.
- **Deduplicate Multi-Target Effects**: If an effect applies to both weapon attacks and specific activity payloads (e.g. `Potent Arsenal`), split into separate `Effect` nodes (e.g. `potentArsenalWeapon` for `activities[tags=weaponAttack].mechanic.hit.damageType` and `potentArsenalEnvenom` for `activities[id=envenomWeapon].mechanic.payloads.damageType`).

---

## 4. Pattern Selection & Structure

### `pattern: attack`
```yaml
mechanic:
  pattern: attack
  attack:
    classification: melee # melee, ranged, or finesse
    type: spell # spell or weapon
    bonus: $(attributes.spellcasting.attack)
  target:
    type: single # single, touch, multiple, area, etc.
    range: $(range) # use $(range) unless manual range is required by multi-block phase
  hit:
    type: damage
    dice:
      count: 1
      sides: 10
    damageType: fire
  hitOrMiss: # Optional payload applied regardless of hit/miss (e.g. Witch Bolt sustain text)
    type: text
    text: on each of your subsequent turns, you can take a Bonus Action to deal 1d12 Lightning damage to the target automatically
  repeat:
    action: bonus_action # action, bonus_action, free_action, reaction (kept for target-focused repeating spells)
```

### `pattern: save`
```yaml
mechanic:
  pattern: save
  save:
    ability: dex # str, dex, con, int, wis, cha
    dc: $(attributes.spellcasting.save)
  target:
    type: area
    aoe:
      shape: emanation # emanation for self-centered AOE, sphere/cone/cube for point-based
      size: 5
    range: $(range)
  failureOrSuccess: # Optional: Payloads applied regardless of save outcome (e.g. smite damage)
    type: damage
    dice:
      count: 2
      sides: 6
    damageType: thunder
  failure: # Secondary save-dependent effects
    type: condition
    condition: prone
    end: turn_repeat_save # condition termination spec
```

### `pattern: aura` (Persistent AoEs)
```yaml
mechanic:
  mode: succession
  blocks:
    - pattern: aura
      target:
        type: area
        aoe:
          shape: sphere # sphere, cylinder, cube, emanation, wall, line, square
          size: 20
        range: $(range)
      move: # Optional area movement spec
        action: bonus_action # bonus_action, action, free_action
        distance: 30
      text: fire # brief noun phrase describing AoE contents (e.g. "spinning daggers", "silvery pale light", "fire", "protective spirits")
    - pattern: save
      trigger:
        event:
          - on_cast
          - area_moves_into_space
          - enter_area
          - end_turn
      save:
        ability: dex
        dc: $(attributes.spellcasting.save)
      target:
        inherit: prev_step
      failure:
        type: damage
        dice:
          count: 2
          sides: 6
        damageType: fire
      success:
        halfDamage: true
```

### `pattern: healing`
```yaml
mechanic:
  pattern: healing
  healing:
    dice:
      count: 2
      sides: 8
      bonus: $(attributes.spellcasting.bonus) # Use count: 0, sides: 0, bonus: 5 for flat values
    type: hitPoints # hitPoints or tempHitPoints
  target:
    type: touch
```

### `pattern: automatic` (Utility, Buffs & Stat Modifiers)
- **AC Set Formula (e.g. Mage Armor, Barkskin)**:
  ```yaml
  mechanic:
    pattern: automatic
    target:
      type: touch
    payloads:
      type: statModifier
      stat: ac
      value: $(13 + stats.dex.mod)
      operation: set
  ```
- **Flavor / Narrative Spells**: Use `text: $(summary)` or `text: $(description)`.
- **Mechanical Utility Spells**: Provide explicit text describing the in-game effect.

---

## 5. Condition Payload Termination Specifications (`end:`)

Condition payloads (`type: condition`) should specify condition termination behavior using `end:`:
- `end: take_damage`: Ends if target takes damage.
- `end: repeat_save_on_damage`: Repeats save whenever target takes damage.
- `end: action_check`: Ends if target uses an Action to make an ability check to escape.
- `end: turn_repeat_save`: Repeats save at end of each turn.
- `end: end_of_your_next_turn` / `end_of_its_next_turn` / `end_of_next_turn`: Lasts until end of specified turn.
- `end: { text: "..." }`: Custom termination text.

---

## 6. Range, Target Inheritance & AOE Standardizations

- Use `range: "$(range)"` in `target` instead of hardcoding literal range strings, unless a multi-block phase specifies a distinct range.
- **Target Inheritance**:
  - `target: { inherit: "trigger" }`: Used when a reaction or attack-triggered spell affects the triggering target (e.g. `Divine Smite`, `Ensnaring Strike`, `Hellish Rebuke`). Formats clean target label `, the target` or `, the attacker`.
  - `target: { inherit: "prev_step" }`: Used when secondary phases or aura triggers target the inherited area or previous target.
- **Self-Centered AOE**: Must use `shape: emanation`.

---

## 7. Formatting Consistency for Text & Triggers

- **Text Payloads**: First letter lowercase, use `"the target"`, no trailing period inside payload lists.
- **Deduplication**: `_Range_:` suffix is automatically suppressed if range/location is already expressed in the main body or target description.

---

## 8. Upcasting Specifications (`upcast:`)

Scaling activities must explicitly specify upcasting:
```yaml
upcast:
  resourceStep: 1
  modifications:
    - path: failure.dice.count # or blocks[1].failure.dice.count, target.count, etc.
      add: 1
```

---

## 9. Planning & Review Workflow

When making batch modifications to activity mechanics:
1. Always create an `implementation_plan.md` artifact in Planning Mode detailing every proposed YAML `mechanic:` block.
2. Wait for explicit user review and approval before writing changes to source files.
3. Validate schema compliance with `node scripts/validateActivities.js` and verify formatted text output.

