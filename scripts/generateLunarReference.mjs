import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { ExpressionEvaluator } from '../src/engine/ExpressionEvaluator.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const lunarDir = resolve(root, 'data/statblocks/wildShape/lunar');

function createCharContext(level) {
    const pb = level >= 17 ? 6 : level >= 13 ? 5 : level >= 9 ? 4 : level >= 5 ? 3 : 2;
    const wisMod = level >= 8 ? 5 : level >= 4 ? 4 : 3;
    return {
        meta: { level, subId: 'circleOfTheMoon' },
        stats: {
            str: { score: 10, mod: 0 },
            dex: { score: 14, mod: 2 },
            con: { score: 14, mod: 2 },
            int: { score: 10, mod: 0 },
            wis: { score: 10 + wisMod * 2, mod: wisMod },
            cha: { score: 10, mod: 0 }
        },
        attributes: {
            spellcasting: {
                save: 8 + pb + wisMod,
                attack: pb + wisMod,
                bonus: wisMod
            }
        }
    };
}

const files = readdirSync(lunarDir).filter(f => f.endsWith('.yml')).sort();
const statblocks = files.map(file => {
    const content = readFileSync(resolve(lunarDir, file), 'utf8');
    const data = yaml.load(content);
    return { file, data };
});

// Group by category
const terrestrial = [];
const aquatic = [];
const aerial = [];

for (const sb of statblocks) {
    const n = sb.data.name.toLowerCase();
    if (n.startsWith('aquatic')) aquatic.push(sb);
    else if (n.startsWith('aerial')) aerial.push(sb);
    else terrestrial.push(sb);
}

// Helper to format movement
function formatMovement(movement, evaluator) {
    if (!movement) return '30 ft.';
    if (typeof movement === 'string') return evaluator.evaluate(movement);
    const parts = [];
    if (movement.walk !== undefined) parts.push(`walk ${evaluator.evaluate(String(movement.walk))} ft.`);
    if (movement.swim) parts.push(`swim ${evaluator.evaluate(String(movement.swim))} ft.`);
    if (movement.fly) parts.push(`fly ${evaluator.evaluate(String(movement.fly))} ft.`);
    if (movement.climb) parts.push(`climb ${evaluator.evaluate(String(movement.climb))} ft.`);
    if (movement.burrow) parts.push(`burrow ${evaluator.evaluate(String(movement.burrow))} ft.`);
    return parts.join(', ') || '30 ft.';
}

// Helper to format senses
function formatSenses(senses, evaluator) {
    if (!senses) return 'Normal';
    if (typeof senses === 'string') return evaluator.evaluate(senses);
    const parts = [];
    if (senses.darkvision) parts.push(`Darkvision ${evaluator.evaluate(String(senses.darkvision))} ft.`);
    if (senses.blindsight) parts.push(`Blindsight ${evaluator.evaluate(String(senses.blindsight))} ft.`);
    if (senses.tremorsense) parts.push(`Tremorsense ${evaluator.evaluate(String(senses.tremorsense))} ft.`);
    return parts.join(', ') || 'Normal';
}

function getMod(score) {
    const m = Math.floor((score - 10) / 2);
    return m >= 0 ? `+${m}` : `${m}`;
}

let md = `# Circle of the Moon — Lunar Wild Shape Reference

This document provides authoritative reference cards and scaling progressions for all **20 Lunar Wild Shape templates** available to Circle of the Moon Druids, translated from the *5e Wild Shape Templates Guide* and prefabricated statblocks.

---

## 1. Lunar Wild Shape Mechanics

- **Wild Shape Slots**:
  - **Level 3**: 4 Lunar Wild Shape forms known.
  - **Level 4**: 6 Lunar Wild Shape forms known.
  - **Level 8**: 8 Lunar Wild Shape forms known.
- **Transformation Rules**:
  - **Activation**: Bonus Action using one use of Channel Nature (Wild Shape).
  - **Duration**: Number of hours equal to half your Druid level (rounded down).
  - **Physical Stats**: Your Strength, Dexterity, Constitution, Armor Class, Size, Speed, and Senses are replaced by the chosen beast form.
  - **Hit Points**: You retain your Hit Points and Hit Point Dice, gaining Temporary Hit Points equal to 3 × your Druid level.
  - **Mental Stats & Identity**: You retain your Intelligence, Wisdom, and Charisma scores, your personality, memories, and your ability to speak.
  - **Spellcasting**: You cannot cast spells while transformed, but you maintain concentration on spells cast before transforming.
  - **Reversion**: You revert early if you fall Unconscious, drop to 0 Hit Points, or use a Bonus Action to revert. Excess damage from a drop to 0 Hit Points carries over to your normal form.

---

## 2. Quick Reference Summary Table

| Beast Form | Category | Size (L3) | Speed | Senses | AC | Summary |
|:---|:---:|:---:|:---|:---|:---:|:---|

`;

for (const sb of statblocks) {
    const d = sb.data;
    const ev = new ExpressionEvaluator(createCharContext(3));
    const size = ev.evaluate(d.size);
    const ac = ev.evaluate(d.ac);
    const move = formatMovement(d.movement, ev);
    const senses = formatSenses(d.senses, ev);
    const cat = d.name.startsWith('Aquatic') ? 'Aquatic' : d.name.startsWith('Aerial') ? 'Aerial' : 'Terrestrial';
    md += `| **${d.name}** | ${cat} | ${size} | ${move} | ${senses} | **${ac}** | ${d.summary} |\n`;
}

md += `\n---\n\n`;

function renderSection(title, list) {
    let out = `## 3. ${title}\n\n`;
    for (const sb of list) {
        const d = sb.data;
        const ev3 = new ExpressionEvaluator(createCharContext(3));

        const size3 = ev3.evaluate(d.size);
        const ac3 = ev3.evaluate(d.ac);
        const move3 = formatMovement(d.movement, ev3);
        const senses3 = formatSenses(d.senses, ev3);

        const str3 = Number(ev3.evaluate(d.stats.str));
        const dex3 = Number(ev3.evaluate(d.stats.dex));
        const con3 = Number(ev3.evaluate(d.stats.con));

        out += `### ${d.name}\n\n`;
        out += `> **Summary**: *${d.summary}*\n\n`;
        out += `*${size3} Beast (Level 3 Baseline) · Circle of the Moon Wild Shape*\n\n`;

        out += `| Attribute | Value | Attribute | Value |\n`;
        out += `|:---|:---|:---|:---|\n`;
        out += `| **Armor Class** | ${ac3} (natural armor) | **Speed** | ${move3} |\n`;
        out += `| **Senses** | ${senses3} | **Category** | Wild Shape |\n\n`;

        out += `| STR | DEX | CON | INT | WIS | CHA |\n`;
        out += `|:---:|:---:|:---:|:---:|:---:|:---:|\n`;
        out += `| ${str3} (${getMod(str3)}) | ${dex3} (${getMod(dex3)}) | ${con3} (${getMod(con3)}) | *Druid* | *Druid* | *Druid* |\n\n`;

        // Traits
        if (d.traits && d.traits.length > 0) {
            out += `#### Traits\n\n`;
            for (const t of d.traits) {
                out += `- **${t.name}**: ${ev3.evaluate(t.description)}\n`;
            }
            out += `\n`;
        }

        // Actions
        if (d.actions && d.actions.length > 0) {
            out += `#### Actions\n\n`;
            for (const a of d.actions) {
                out += `- **${a.name}**: ${ev3.evaluate(a.description)}\n`;
            }
            out += `\n`;
        }

        // Bonus Actions
        if (d.bonusActions && d.bonusActions.length > 0) {
            out += `#### Bonus Actions\n\n`;
            for (const b of d.bonusActions) {
                out += `- **${b.name}**: ${ev3.evaluate(b.description)}\n`;
            }
            out += `\n`;
        }

        // Reactions
        if (d.reactions && d.reactions.length > 0) {
            out += `#### Reactions\n\n`;
            for (const r of d.reactions) {
                out += `- **${r.name}**: ${ev3.evaluate(r.description)}\n`;
            }
            out += `\n`;
        }

        // Tier Progression Table
        out += `#### Tier Progression\n\n`;
        out += `| Level | Size | AC | STR | DEX | CON | Primary Attack (Hit & Damage) |\n`;
        out += `|:---:|:---:|:---:|:---:|:---:|:---:|:---|\n`;

        const levels = [3, 6, 9, 12, 15, 18];
        for (const lvl of levels) {
            const evL = new ExpressionEvaluator(createCharContext(lvl));
            const sz = evL.evaluate(d.size);
            const a = evL.evaluate(d.ac);
            const s = Number(evL.evaluate(d.stats.str));
            const dx = Number(evL.evaluate(d.stats.dex));
            const c = Number(evL.evaluate(d.stats.con));

            let mainAtk = '—';
            if (d.actions && d.actions.length > 0) {
                // Pick the first non-multiattack action
                const atk = d.actions.find(act => act.name !== 'Multiattack') || d.actions[0];
                const renderedAtk = evL.evaluate(atk.description);
                const matchHit = renderedAtk.match(/_Melee Attack Roll:_ ([^_]+) to hit[\s\S]*?_Hit:_ ([^.\n]+)/);
                if (matchHit) {
                    mainAtk = `**${atk.name}**: +${matchHit[1].trim().replace(/^\+/, '')} (${matchHit[2].trim()})`;
                } else {
                    mainAtk = `**${atk.name}**: ${renderedAtk.replace(/_/g, '').slice(0, 45)}...`;
                }
            }
            out += `| **${lvl}** | ${sz} | ${a} | ${s} (${getMod(s)}) | ${dx} (${getMod(dx)}) | ${c} (${getMod(c)}) | ${mainAtk} |\n`;
        }

        out += `\n---\n\n`;
    }
    return out;
}

md += renderSection('Terrestrial Beasts (Standard Forms)', terrestrial);
md += renderSection('Aquatic Beasts', aquatic);
md += renderSection('Aerial Beasts', aerial);

// Write output
writeFileSync(resolve(root, 'LUNAR_WILD_SHAPES.md'), md, 'utf8');

// Also write to docs/
if (!existsSync(resolve(root, 'docs'))) {
    mkdirSync(resolve(root, 'docs'));
}
writeFileSync(resolve(root, 'docs/lunar_wild_shapes.md'), md, 'utf8');

console.log('Successfully generated LUNAR_WILD_SHAPES.md and docs/lunar_wild_shapes.md');
