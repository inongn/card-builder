import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Ajv from 'ajv';

const PRIMITIVES_SCHEMA_PATH = path.resolve('data/schema/primitives.schema.json');
const MECHANIC_SCHEMA_PATH = path.resolve('data/schema/activityMechanic.schema.json');
const DATA_DIR = path.resolve('data');

// Initialize Ajv with draft-07 support
const ajv = new Ajv({ allErrors: true, verbose: true });

// Load schemas
const primitivesSchema = JSON.parse(fs.readFileSync(PRIMITIVES_SCHEMA_PATH, 'utf8'));
const mechanicSchema = JSON.parse(fs.readFileSync(MECHANIC_SCHEMA_PATH, 'utf8'));

ajv.addSchema(primitivesSchema);
const validateMechanic = ajv.compile(mechanicSchema);

let totalFilesScanned = 0;
let totalActivitiesFound = 0;
let totalMechanicsValidated = 0;
let totalErrors = 0;

/**
 * Recursively scans directory for YAML files
 */
function getYamlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            // Exclude schema folder itself
            if (file !== 'schema') {
                results = results.concat(getYamlFiles(filePath));
            }
        } else if (file.endsWith('.yml') || file.endsWith('.yaml')) {
            results.push(filePath);
        }
    });
    return results;
}

/**
 * Walks parsed object tree to find all `type: Activity` nodes
 */
function findActivities(node, currentPath = '') {
    const activities = [];
    if (!node || typeof node !== 'object') return activities;

    if (node.type === 'Activity') {
        activities.push({ node, path: currentPath || 'root' });
    }

    if (Array.isArray(node)) {
        node.forEach((item, idx) => {
            activities.push(...findActivities(item, `${currentPath}[${idx}]`));
        });
    } else {
        Object.keys(node).forEach(key => {
            if (key !== 'type') {
                const childPath = currentPath ? `${currentPath}.${key}` : key;
                activities.push(...findActivities(node[key], childPath));
            }
        });
    }

    return activities;
}

console.log('=== Activity Mechanic Schema Validation ===\n');

const yamlFiles = getYamlFiles(DATA_DIR);
totalFilesScanned = yamlFiles.length;

yamlFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const docs = yaml.loadAll(content);

        docs.forEach(doc => {
            if (!doc) return;
            const activities = findActivities(doc);
            totalActivitiesFound += activities.length;

            activities.forEach(({ node, path: nodePath }) => {
                if (node.mechanic) {
                    totalMechanicsValidated++;
                    const valid = validateMechanic(node.mechanic);
                    if (!valid) {
                        totalErrors++;
                        const relFile = path.relative(process.cwd(), file);
                        console.error(`❌ Validation Error in [${relFile}] -> Node (${node.id || nodePath}):`);
                        validateMechanic.errors.forEach(err => {
                            console.error(`   - ${err.instancePath || '/'} : ${err.message}`);
                        });
                    }
                }
            });
        });
    } catch (err) {
        console.error(`Error reading ${file}:`, err.message);
    }
});

console.log('--- Summary ---');
console.log(`Files scanned:              ${totalFilesScanned}`);
console.log(`Total 'Activity' nodes:     ${totalActivitiesFound}`);
console.log(`Nodes with 'mechanic':     ${totalMechanicsValidated}`);
console.log(`Validation errors:          ${totalErrors}`);

if (totalErrors > 0) {
    process.exit(1);
} else {
    console.log('\n✅ All existing Activity mechanics are valid!');
}
