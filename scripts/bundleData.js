import fs from 'fs';
import path from 'path';
import * as jsyaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const OUTPUT_FILE = path.join(__dirname, '../public/db.json');

function getAllYamlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllYamlFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.yml') || file.endsWith('.yaml')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

export function bundle() {
    console.log('Bundling data...');
    const yamlFiles = getAllYamlFiles(DATA_DIR);
    const db = [];

    yamlFiles.forEach(file => {
        // Skip db.json itself if it were a yaml, which it isn't
        try {
            const content = fs.readFileSync(file, 'utf8');
            const data = jsyaml.load(content);
            if (data && typeof data === 'object') {
                if (!data.id) {
                    data.id = path.basename(file).replace(/\.(yml|yaml)$/, '');
                }
                db.push(data);
            }
        } catch (e) {
            console.error(`Error parsing ${file}:`, e.message);
        }
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(db, null, 2));
    console.log(`Bundled ${db.length} properties into ${OUTPUT_FILE}`);
}

// Run if called directly
if (process.argv[1] === __filename) {
    bundle();
}
