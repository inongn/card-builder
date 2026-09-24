import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const DATA_DIR = path.resolve('data');

function findYamlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findYamlFiles(fullPath));
    } else if (entry.name.endsWith('.yml') || entry.name.endsWith('.yaml')) {
      results.push(fullPath);
    }
  }
  return results;
}

const yamlFiles = findYamlFiles(DATA_DIR);

let totalActivityNodes = 0;
let totalWithMechanic = 0;
let inlineTextEsCount = 0;
let inlineLabelEsCount = 0;

const inventory = {
  textPayload: [],
  patternBlockText: [],
  triggerTextOnly: [],
  triggerTextWithEvent: [],
  rollModifierText: [],
  conditionText: [],
  conditionLocation: [],
  conditionEndText: [],
  diceFormulaLabel: [],
  upcastDisplayLabel: [],
  statModifierText: [],
  movementText: [],
  actionText: [],
  damageText: [],
  healingText: [],
  choiceText: [],
  targetText: [],
  otherText: [],
  otherLabel: []
};

function inspectMechanic(mechanic, filePath, activityId, activityName) {
  const blocks = mechanic.blocks || [mechanic];

  for (const block of blocks) {
    // Check block text
    if (block.text) {
      if (block.pattern === 'aura') {
        inventory.patternBlockText.push({ filePath, activityId, pattern: 'aura', text: block.text });
      } else if (block.pattern === 'automatic') {
        inventory.patternBlockText.push({ filePath, activityId, pattern: 'automatic', text: block.text });
      } else {
        inventory.patternBlockText.push({ filePath, activityId, pattern: block.pattern, text: block.text });
      }
    }
    if (block.textEs) inlineTextEsCount++;
    if (block.labelEs) inlineLabelEsCount++;

    // Check trigger
    if (block.trigger) {
      if (block.trigger.text && !block.trigger.event) {
        inventory.triggerTextOnly.push({ filePath, activityId, text: block.trigger.text, trigger: block.trigger });
      } else if (block.trigger.text && block.trigger.event) {
        inventory.triggerTextWithEvent.push({ filePath, activityId, text: block.trigger.text, trigger: block.trigger });
      }
      if (block.trigger.textEs) inlineTextEsCount++;
    }

    // Check target
    if (block.target && block.target.text) {
      inventory.targetText.push({ filePath, activityId, text: block.target.text });
    }

    // Check upcast
    if (block.upcast && block.upcast.display && block.upcast.display.label) {
      inventory.upcastDisplayLabel.push({ filePath, activityId, label: block.upcast.display.label });
    }

    // Check payloads in hit, failure, success, payloads, etc.
    const payloadContainers = [
      block.payloads,
      block.hit,
      block.miss,
      block.hitOrMiss,
      block.failure,
      block.success,
      block.failureOrSuccess
    ];

    for (const container of payloadContainers) {
      if (!container) continue;
      const list = Array.isArray(container) ? container : [container];
      for (const p of list) {
        inspectPayload(p, filePath, activityId);
      }
    }
  }

  // Mechanic-level upcast
  if (mechanic.upcast && mechanic.upcast.display && mechanic.upcast.display.label) {
    inventory.upcastDisplayLabel.push({ filePath, activityId, label: mechanic.upcast.display.label });
  }
}

function inspectPayload(payload, filePath, activityId) {
  if (!payload || typeof payload !== 'object') return;

  if (payload.textEs) inlineTextEsCount++;
  if (payload.labelEs) inlineLabelEsCount++;

  if (payload.type === 'text' && payload.text) {
    inventory.textPayload.push({ filePath, activityId, text: payload.text });
  } else if (payload.type === 'rollModifier') {
    if (payload.text) inventory.rollModifierText.push({ filePath, activityId, text: payload.text });
  } else if (payload.type === 'condition') {
    if (payload.text) inventory.conditionText.push({ filePath, activityId, text: payload.text });
    if (payload.location) inventory.conditionLocation.push({ filePath, activityId, location: payload.location });
    if (payload.end && typeof payload.end === 'object' && payload.end.text) {
      inventory.conditionEndText.push({ filePath, activityId, text: payload.end.text });
    }
  } else if (payload.type === 'statModifier') {
    if (payload.text) inventory.statModifierText.push({ filePath, activityId, text: payload.text });
  } else if (payload.type === 'movement') {
    if (payload.text) inventory.movementText.push({ filePath, activityId, text: payload.text });
  } else if (payload.type === 'action') {
    if (payload.text) inventory.actionText.push({ filePath, activityId, text: payload.text });
  } else if (payload.type === 'damage') {
    if (payload.text) inventory.damageText.push({ filePath, activityId, text: payload.text });
  } else if (payload.type === 'healing') {
    if (payload.text) inventory.healingText.push({ filePath, activityId, text: payload.text });
  } else if (payload.type === 'choice') {
    if (payload.text) inventory.choiceText.push({ filePath, activityId, text: payload.text });
    if (Array.isArray(payload.options)) {
      for (const opt of payload.options) {
        if (opt.text) inventory.otherText.push({ filePath, activityId, context: 'choice.option', text: opt.text });
        if (opt.label) inventory.otherLabel.push({ filePath, activityId, context: 'choice.option', label: opt.label });
      }
    }
  }

  // Nested payloads
  if (payload.payloads) {
    const list = Array.isArray(payload.payloads) ? payload.payloads : [payload.payloads];
    for (const nested of list) {
      inspectPayload(nested, filePath, activityId);
    }
  }
}

for (const file of yamlFiles) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const doc = yaml.load(content);
    if (!doc) continue;

    const rawMatchesEs = content.match(/\b(textEs|labelEs):/g);
    if (rawMatchesEs) {
      console.warn(`Found inline ES in ${file}:`, rawMatchesEs);
    }

    const nodes = Array.isArray(doc) ? doc : [doc];
    function scanNode(node) {
      if (!node || typeof node !== 'object') return;
      if (node.type === 'Activity') {
        totalActivityNodes++;
        if (node.mechanic) {
          totalWithMechanic++;
          inspectMechanic(node.mechanic, file, node.id || 'unknown', node.name || 'unnamed');
        }
      }
      for (const k of Object.keys(node)) {
        if (Array.isArray(node[k])) {
          node[k].forEach(scanNode);
        } else if (typeof node[k] === 'object') {
          scanNode(node[k]);
        }
      }
    }
    nodes.forEach(scanNode);
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
}

console.log('=== AUDIT RESULTS ===');
console.log('Total YAML Files:', yamlFiles.length);
console.log('Total Activity Nodes:', totalActivityNodes);
console.log('Total with mechanic:', totalWithMechanic);
console.log('Inline textEs:', inlineTextEsCount);
console.log('Inline labelEs:', inlineLabelEsCount);
console.log('\n--- Inventory Counts ---');
let totalTextBlocks = 0;
let totalLabelBlocks = 0;
for (const [category, items] of Object.entries(inventory)) {
  console.log(`${category}: ${items.length}`);
  if (category.toLowerCase().includes('label')) {
    totalLabelBlocks += items.length;
  } else {
    totalTextBlocks += items.length;
  }
}
console.log(`\nTotal text blocks: ${totalTextBlocks}`);
console.log(`Total label blocks: ${totalLabelBlocks}`);

fs.writeFileSync('/home/gerardo/.gemini/antigravity-ide/brain/4007d51b-8030-4e8f-9f0f-be4491217874/scratch/audit_details.json', JSON.stringify(inventory, null, 2));
