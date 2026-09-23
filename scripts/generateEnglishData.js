import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { bundle } from './bundleData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, '../public/db.json');
const OUTPUT_DIR = path.join(__dirname, '../src/data/locales/en');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'data.json');

export function generateEnglishData() {
    // Ensure db.json is bundled and up to date
    bundle();

    if (!fs.existsSync(DB_FILE)) {
        throw new Error(`Database file not found at ${DB_FILE}`);
    }

    const rawDb = fs.readFileSync(DB_FILE, 'utf8');
    const db = JSON.parse(rawDb);

    if (!Array.isArray(db)) {
        throw new Error('Database is not an array');
    }

    const result = {};

    function processNode(item) {
        if (!item || typeof item !== 'object') return;

        if (item.id) {
            const isActivity = Boolean(item.type && String(item.type).toLowerCase() === 'activity');

            const entry = result[item.id] || {};

            if (item.name !== undefined && item.name !== null && String(item.name).trim() !== '') {
                entry.name = String(item.name).trim();
            }

            if (item.summary !== undefined && item.summary !== null && String(item.summary).trim() !== '') {
                entry.summary = String(item.summary).trim();
            }

            // For activities, do not add 'description'
            if (!isActivity && item.description !== undefined && item.description !== null && String(item.description).trim() !== '') {
                entry.description = String(item.description).trim();
            }

            if (Object.keys(entry).length > 0) {
                result[item.id] = entry;
            }
        }

        if (Array.isArray(item.children)) {
            item.children.forEach(processNode);
        }
        if (Array.isArray(item.actions)) {
            item.actions.forEach(processNode);
        }
        if (Array.isArray(item.reactions)) {
            item.reactions.forEach(processNode);
        }
    }

    for (const item of db) {
        processNode(item);
    }

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2) + '\n', 'utf8');
    console.log(`Generated English data.json with ${Object.keys(result).length} properties at ${OUTPUT_FILE}`);
}

if (process.argv[1] === __filename) {
    generateEnglishData();
}
