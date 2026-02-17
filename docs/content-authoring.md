# Content Authoring Guidelines

Translating natural language D&D rules into YAML nodes is an art. These guidelines help ensure consistency and mechanical accuracy.

## Translation Workflow

### 1. Identify the Core Type
- **Does it track uses?** -> `Resource` + `Activity`.
- **Does it let you choose something?** -> `Slot`.
- **Does it just explain a rule?** -> `Extra`.
- **Does it change a number?** -> `Effect`.
- **Is it a core feature (like Spellcasting or a Feat)?** -> `Folder` (to contain its many parts).

### 2. Deconstruct the Rule
Natural language rules often combine several mechanical effects.

> **Example Rule (Fighter: Tactical Shift):** "At 5th level, you can move up to half your speed without provoking Opportunity Attacks whenever you use Second Wind."

**Translation:**
- **Trigger**: "whenever you use Second Wind" -> Target `secondWind`.
- **Level**: "At 5th level" -> `condition: $(meta.level >= 5)`.
- **Node Type**: Since it appends a rule to an existing ability, use `Extra`.

```yaml
id: tacticalShift
type: Extra
target: secondWind
condition: $(meta.level >= 5)
name: Tactical Shift
description: "You can move up to $(attributes.movement.walk/2) without provoking Opportunity Attacks."
```

### 3. Decisions on Node Types

#### When to use `Effect` vs `Extra`?
- Use **`Effect`** when you need to change a core number (AC, Stats, Damage) or replace the entire description of a card.
- Use **`Extra`** when you want to append a new bullet point or rule paragraph to an existing feature (like "Tactical Mind" adding a new use for Second Wind).

#### When to use `Reference`?
- Always reference standardized definitions: Proficiencies, common Actions (Dash, Disengage), and common Weapon/Armor properties.

## Wording Guidelines

### Activities (Cards)
- **Name**: Use the official D&D name.
- **Description**: Keep it punchy. Use bolding for keywords.
- **Dynamic Values**: Always use expressions $(...) for numbers that might scale with level or stats.
- **Example**: `Regain 1d$(attributes.hitDie) + $(stats.con.mod) HP.`

### Extras (Rule Additions)
- **Description**: Start with the effect immediately. Avoid repeating the feature's name in the description if it's already in the header.
- **Targeting**: Be precise about the ID of the card you are targeting.

## Mapping D&D 2024 Terms to Metadata

- **Proficiency Bonus** -> `attributes.prof`
- **Ability Modifier** -> `stats.[stat].mod`
- **Class Level** -> `meta.level`
- **Short Rest recovery** -> `sr: 1` (regains 1) or `sr: all` (regains everything) in a `Resource`.
