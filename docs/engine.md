# The Engine

The "Engine" is responsible for turning a library of static YAML files and a set of user choices into a coherent Character Data structure.

## The Pipeline

The engine processes properties in four distinct stages to ensure that dependencies (like stats being needed for AC) are resolved in the correct order.

| Stage | Types Handled | Description |
| :--- | :--- | :--- |
| **Foundation** | `Input`, `Stat` | Seeds the meta data and core ability scores. |
| **Attributes** | `Attribute`, `Skill`, `Save` | Calculates derived combat values and proficiencies. |
| **Content** | `Resource`, `Activity` | Populates the list of cards and resource trackers. |
| **Effects** | `Effect`, `Extra` | Modifies everything else. Final overrides and rule descriptions. |

---

## The Rebuild Loop

Whenever a user makes a choice (fills a slot) or changes an input (updates level), the engine triggers a `rebuild()`.

1. **Collection**: The engine traverses the entire visible tree and gathers all nodes of a recognized type.
2. **Grouping**: Nodes are sorted into the pipeline stages listed above.
3. **Execution**: The stages are run in sequence. 
   - After each stage, an **expression evaluation pass** is run to update the character data context.
   - **Visibility Sync**: Visibility for the entire tree is re-calculated after every stage. This allows a level-up to immediately reveal new class features in the UI.
4. **Structural Reprocessing**: The tree itself is refreshed. This ensures that dynamic targets (like a slot that targets "martial weapons") are updated based on new proficiencies.
5. **Validation**: Slots are checked for consistency. If a user previously picked a feat they no longer qualify for, it is automatically pruned.

---

## Reactive Trees

The core innovation of the engine is the **Reactive Tree**. 

Nodes themselves carry their `condition`. If a parent node becomes invisible (condition fails), the engine automatically hides and stops processing all its children. This allows for complex branching logic (Subclasses, Level-based choices) to be defined entirely in data.

## Character Data Structure

The output of the engine is a flat `characterData` object:
- `meta`: UI inputs and state.
- `stats`: Ability scores and modifiers.
- `attributes`: Derived values (HP, AC, Speed).
- `skills` / `saves`: Roll bonuses.
- `resources`: Current and max charges.
- `activities`: An array of card objects for the UI.
