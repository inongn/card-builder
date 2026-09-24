import fs from 'fs';
import path from 'path';
import jsyaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const OUTPUT_DIR = path.join(__dirname, '../public/locales/en');

function getAllYamlFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Skip schema directory
            if (file === 'schema') return;
            getAllYamlFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith('.yml') || file.endsWith('.yaml')) {
            arrayOfFiles.push(fullPath);
        }
    });
    return arrayOfFiles;
}

/**
 * Extracts translatable fields from a node and its children.
 * - Activity nodes: name and summary only (NOT description)
 * - Other nodes: name, summary, and description
 * - Extra entries: name and description
 */
function extractTranslatable(node, result = {}) {
    if (!node || typeof node !== 'object') return result;

    const id = node.id;
    const isActivity = node.type === 'Activity';

    if (id) {
        const entry = {};
        if (node.name && node.name !== id) entry.name = node.name;
        if (node.summary) entry.summary = node.summary;
        if (!isActivity && node.description) {
            // For non-activities, include description
            // Trim multiline descriptions
            const desc = typeof node.description === 'string'
                ? node.description.trim()
                : node.description;
            entry.description = desc;
        }
        if (Object.keys(entry).length > 0) {
            result[id] = entry;
        }
    }

    // Process children recursively
    if (Array.isArray(node.children)) {
        node.children.forEach(child => extractTranslatable(child, result));
    }

    // Process extra entries (name + description)
    if (node.extra) {
        const extras = Array.isArray(node.extra) ? node.extra : [node.extra];
        extras.forEach(extra => {
            if (extra && typeof extra === 'object' && extra.name) {
                // Extra entries don't have standalone IDs, they're part of the parent
                // We skip them for now — they'll be in the parent's context
            }
        });
    }

    return result;
}

function inspectPayload(payload, textsSet, labelsSet) {
    if (!payload || typeof payload !== 'object') return;
    if (typeof payload.text === 'string' && payload.text.trim()) {
        textsSet.add(payload.text.trim());
    }
    if (typeof payload.location === 'string' && payload.location.trim()) {
        textsSet.add(payload.location.trim());
    }
    if (payload.end && typeof payload.end === 'object' && typeof payload.end.text === 'string' && payload.end.text.trim()) {
        textsSet.add(payload.end.text.trim());
    }
    if (Array.isArray(payload.options)) {
        for (const opt of payload.options) {
            if (typeof opt.text === 'string' && opt.text.trim()) textsSet.add(opt.text.trim());
            if (typeof opt.label === 'string' && opt.label.trim()) labelsSet.add(opt.label.trim());
            if (typeof opt.name === 'string' && opt.name.trim()) labelsSet.add(opt.name.trim());
        }
    }
    if (payload.payloads) {
        const list = Array.isArray(payload.payloads) ? payload.payloads : [payload.payloads];
        for (const nested of list) inspectPayload(nested, textsSet, labelsSet);
    }
}

function inspectMechanic(mechanic, textsSet, labelsSet) {
    if (!mechanic || typeof mechanic !== 'object') return;
    if (typeof mechanic.text === 'string' && mechanic.text.trim()) {
        textsSet.add(mechanic.text.trim());
    }
    const blocks = Array.isArray(mechanic.blocks) ? mechanic.blocks : [mechanic];

    for (const block of blocks) {
        if (!block || typeof block !== 'object') continue;
        if (typeof block.name === 'string' && block.name.trim()) {
            labelsSet.add(block.name.trim());
        }
        if (typeof block.text === 'string' && block.text.trim()) {
            textsSet.add(block.text.trim());
        }
        if (block.trigger && typeof block.trigger.text === 'string' && block.trigger.text.trim()) {
            textsSet.add(block.trigger.text.trim());
        }
        if (block.target && typeof block.target.text === 'string' && block.target.text.trim()) {
            textsSet.add(block.target.text.trim());
        }
        if (block.upcast?.display?.label) {
            labelsSet.add(block.upcast.display.label.trim());
        }
        const containers = [
            block.payloads,
            block.hit,
            block.miss,
            block.crit,
            block.hitOrMiss,
            block.failure,
            block.success,
            block.failureOrSuccess
        ];
        for (const c of containers) {
            if (!c) continue;
            const list = Array.isArray(c) ? c : [c];
            for (const p of list) inspectPayload(p, textsSet, labelsSet);
        }
    }

    if (mechanic.upcast?.display?.label) {
        labelsSet.add(mechanic.upcast.display.label.trim());
    }
}

function scanActivityMechanics(node, textsSet, labelsSet) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'Activity' && node.mechanic) {
        inspectMechanic(node.mechanic, textsSet, labelsSet);
    }
    if (node.type === 'Effect' && node.target && String(node.target).includes('mechanic') && node.value) {
        const valList = Array.isArray(node.value) ? node.value : [node.value];
        for (const item of valList) {
            if (item && typeof item === 'object') {
                if (item.pattern) inspectMechanic(item, textsSet, labelsSet);
                else if (item.type) inspectPayload(item, textsSet, labelsSet);
            }
        }
    }
    for (const k of Object.keys(node)) {
        if (Array.isArray(node[k])) {
            node[k].forEach(child => scanActivityMechanics(child, textsSet, labelsSet));
        } else if (typeof node[k] === 'object') {
            scanActivityMechanics(node[k], textsSet, labelsSet);
        }
    }
}

function main() {
    console.log('Extracting locale data from YAML files...');

    const yamlFiles = getAllYamlFiles(DATA_DIR);
    const allTranslatable = {};
    const mechanicTexts = new Set();
    const mechanicLabels = new Set();

    yamlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const data = jsyaml.load(content);
            if (data && typeof data === 'object') {
                if (!data.id) {
                    data.id = path.basename(file).replace(/\.(yml|yaml)$/, '');
                }
                extractTranslatable(data, allTranslatable);
                scanActivityMechanics(data, mechanicTexts, mechanicLabels);
            }
        } catch (e) {
            console.error(`Error parsing ${file}:`, e.message);
        }
    });

    allTranslatable['$mechanic'] = {
        texts: Object.fromEntries(Array.from(mechanicTexts).sort().map(t => [t, t])),
        labels: Object.fromEntries(Array.from(mechanicLabels).sort().map(l => [l, l]))
    };

    // Ensure output directory exists
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const outputPath = path.join(OUTPUT_DIR, 'data.json');
    const sorted = Object.fromEntries(
        Object.entries(allTranslatable).sort(([a], [b]) => a.localeCompare(b))
    );

    fs.writeFileSync(outputPath, JSON.stringify(sorted, null, 2));
    console.log(`Extracted ${Object.keys(sorted).length} translatable entries to ${outputPath}`);
    console.log(`Mechanic texts: ${mechanicTexts.size}, Mechanic labels: ${mechanicLabels.size}`);
}

main();
