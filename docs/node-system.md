# The Node System

The project uses a hierarchical tree of "Nodes" to represent everything from a single stat to a complex class feature. Each node is a JSON/YAML object with a `type` property that determines how the engine processes it.

## Basic Node Properties

All nodes support these common properties:
- `id`: (Optional) Unique identifier. Used for references and lookups.
- `name`: (Optional) Display name. Supports expressions.
- `description`: (Optional) Textual description. Supports expressions and array formatting.
- `condition`: (Optional) A boolean expression that must be true for the node to be active/visible.
- `priority`: (Optional) Numeric value. Higher priority nodes overwrite lower ones when targeting the same field.
- `variables`: (Optional) Local key-value pairs available as `local.*` in expressions for this node and its children.

---

## Node Types

### Operational Nodes

#### Folder
A simple container used to group other nodes. It has no logic of its own but passes conditions and variables to its children.

#### Slot
Interactive selection points where a user can pick a property from the library.
- `target`: A tag-based query (e.g., `feat`, `fightingStyle`).
- `quantity`: How many items can be picked.
- `ignoreCondition`: If true, the slot ignores the `condition` of the properties it offers.

#### Reference
Imports another property from the library by ID.
- `value` or `reference`: The ID of the property to import.
- Often used to avoid duplication (e.g., referencing standardized weapon proficiencies).

### Data Nodes (Foundation & Attributes)

#### Input
A user-facing input field that seeds the `meta` object in character data.
- `default`: Starting value.
- `subtype`: `text`, `number`, `select`.
- Used for Level, Species name, etc.

#### Stat
Defines a core attribute (Str, Dex, etc.).
- `score`: The numeric value (usually an expression).
- `mod`: The modifier derived from the score.

#### Attribute
General-purpose derived values like AC, HP, or Proficiency Bonus.
- `value`: The result of an expression.

#### Skill / Save
Specific types for D&D skills and saving throws.
- `stat`: The associated core stat.
- `proficiency`: 0 (none), 1 (proficient), 2 (expertise).

### Content Nodes

#### Activity
Represents a "Card" or action the character can take.
- `time`: Action cost (e.g., "bonus action").
- `range`, `duration`: Spell/Ability parameters.
- `resource`: ID of the resource consumed.

#### Resource
A tracker for limited-use abilities.
- `quantity`: Maximum charges.
- `sr`: Recovery on short rest (numeric or "all").

#### Effect
The primary way nodes modify character data.
- `target`: The path to the data to modify (e.g., `stats.str.score`).
- `operation`: `set`, `add`, `push`, `replace`.
- `value`: The new value or amount to add.

#### Extra
A specialized effect used to append rules text to an existing Activity's description.
- `target`: The ID of the Activity to append to.
- `name`: The title of the rule.
- `description`: The rule text.
