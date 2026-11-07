/**
 * Validates every Statblock node's actions / bonusActions / reactions against
 * data/schema/statblockEntry.schema.json, checks id uniqueness, and renders every
 * mechanic entry at several levels to catch unresolved expressions.
 *
 *   node scripts/validateStatblocks.js            # validate
 *   node scripts/validateStatblocks.js --print    # also print rendered prose (level 6)
 */
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Ajv from 'ajv';
import { formatStatblockEntry, statblockEntryLabel } from '../src/utils/statblockFormatter.js';
import { MOCK_CHARACTER } from './validateActivities.js';

const DATA_DIR = path.resolve('data');
const SECTIONS = ['actions', 'bonusActions', 'reactions'];
const LEVELS = [3, 6, 12];
const PRINT = process.argv.includes('--print');
const STRICT = process.argv.includes('--strict'); // also require legacy prose entries to have ids

const ajv = new Ajv({ allErrors: true });
for (const f of ['primitives', 'activityMechanic']) {
  ajv.addSchema(JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'schema', `${f}.schema.json`), 'utf8')));
}
const validateEntry = ajv.compile(JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'schema', 'statblockEntry.schema.json'), 'utf8')));

function yamlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === 'schema' ? [] : yamlFiles(p);
    return /\.ya?ml$/.test(e.name) ? [p] : [];
  });
}

function* statblocks(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'Statblock') yield node;
  for (const c of node.children || []) yield* statblocks(c);
}

function mockAt(level) {
  const c = structuredClone(MOCK_CHARACTER);
  c.meta.level = level;
  const wis = 14 + Math.floor(level / 4);
  c.stats.wis = { score: wis, mod: Math.floor((wis - 10) / 2) };
  return c;
}

let entries = 0, errors = 0, legacy = 0;
const fail = msg => { errors++; console.error('✗ ' + msg); };

for (const file of yamlFiles(DATA_DIR)) {
  if (!path.relative(DATA_DIR, file).startsWith('statblocks')) continue;
  const doc = yaml.load(fs.readFileSync(file, 'utf8'));
  for (const sb of statblocks(doc)) {
    const rel = path.relative(process.cwd(), file);
    for (const section of SECTIONS) {
      const ids = new Set();
      for (const entry of sb[section] || []) {
        if (!entry.mechanic && !STRICT) { legacy++; continue; }
        entries++;
        const where = `${rel} › ${sb.name} › ${section} › ${entry.name}`;
        if (!validateEntry(entry)) {
          fail(`${where}: ${JSON.stringify(validateEntry.errors.map(e => `${e.instancePath} ${e.message}`))}`);
          continue;
        }
        if (ids.has(entry.id)) fail(`${where}: duplicate id "${entry.id}" within ${section}`);
        ids.add(entry.id);
        if (!entry.mechanic) continue;
        for (const level of LEVELS) {
          const prose = formatStatblockEntry(entry, sb, mockAt(level), section);
          if (!prose) fail(`${where}: empty prose at level ${level}`);
          if (prose.includes('$(') || prose.includes('undefined') || prose.includes('NaN')) fail(`${where}: bad prose at level ${level}: ${prose}`);
          if (PRINT && level === 6) console.log(`**${statblockEntryLabel(entry)}.** ${prose}\n`);
        }
      }
    }
  }
}

console.log(`${entries} mechanic entries checked, ${errors} error(s). ${legacy} legacy prose entries pending port (use --strict to require ids on them).`);
process.exit(errors ? 1 : 0);
