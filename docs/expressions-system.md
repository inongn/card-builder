# Expressions System

The engine uses a dynamic expression system to allow rules to be reactive. Expressions are written as strings wrapped in `$(...)`.

## Syntax

Expressions are evaluated as standard JavaScript inside a controlled environment. 

**Example:** `Regain 1d10 + $(stats.con.mod) HP.`

## Context Objects

Expressions have access to the current state of the character via several global objects:

| Object | Description |
| :--- | :--- |
| `stats` | Core stats like `stats.str.score` or `stats.dex.mod`. |
| `attributes` | Derived values like `attributes.hp` or `attributes.ac`. |
| `meta` | User inputs and global state like `meta.level`. |
| `skills` / `saves` | Proficiency-based values like `skills.stealth.bonus`. |
| `activities` | Access to other cards (e.g., `activities[mainHand].name`). |
| `local` | Variables defined in the `variables` key of the current node or its parents. |

## Built-in Functions

### `progression(...values)`
Returns a value based on the character's current level.
- **Usage:** `$(progression(2, 2, 2, 3, 3))`
- If the level is higher than the number of provided values, it returns the last value.

### `formatBonus(value)`
Helper to format a number as a bonus string.
- `2` becomes `+2`
- `-1` becomes `-1`
- `0` becomes `+0`

---

## Evaluation Flow

1. **Baking**: When a node is processed, `local.*` variables are "baked" into the expression. This means `local.bonus` becomes its literal value (e.g., `5`).
2. **Recursive Evaluation**: If an expression returns another expression string, the engine will perform another pass until all `$(...)` are resolved.
3. **Lazy vs. Immediate**: 
   - Foundation variables (like Level) are evaluated immediately.
   - Effects are evaluated after stats and attributes are settled.
   - Final labels and descriptions are evaluated last.

## Tips for Writing Expressions

- **Deep Paths**: You can use bracket notation for collections: `activities[name="Second Wind"].extra`.
- **Logic**: You can use standard JS logic: `$(meta.level >= 5 ? 2 : 1)`.
- **String Concat**: Expressions inside strings are concatenated: `Your speed is $(attributes.movement.walk) feet.`
