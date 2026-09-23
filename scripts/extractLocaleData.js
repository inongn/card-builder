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

function main() {
    console.log('Extracting locale data from YAML files...');

    const yamlFiles = getAllYamlFiles(DATA_DIR);
    const allTranslatable = {};

    yamlFiles.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const data = jsyaml.load(content);
            if (data && typeof data === 'object') {
                if (!data.id) {
                    data.id = path.basename(file).replace(/\.(yml|yaml)$/, '');
                }
                extractTranslatable(data, allTranslatable);
            }
        } catch (e) {
            console.error(`Error parsing ${file}:`, e.message);
        }
    });

    // Ensure output directory exists
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const outputPath = path.join(OUTPUT_DIR, 'data.json');
    const sorted = Object.fromEntries(
        Object.entries(allTranslatable).sort(([a], [b]) => a.localeCompare(b))
    );

    fs.writeFileSync(outputPath, JSON.stringify(sorted, null, 2));
    console.log(`Extracted ${Object.keys(sorted).length} translatable entries to ${outputPath}`);
}

main();
