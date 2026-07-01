import fs from 'fs';
import path from 'path';
import jsyaml from 'js-yaml';

const DATA_DIR = '/home/gerardon/Documentos/GitHub/card-builder-copy/data';

function getAllYamlFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllYamlFiles(fullPath, arrayOfFiles);
        } else {
            if (file.endsWith('.yml') || file.endsWith('.yaml')) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

const files = getAllYamlFiles(DATA_DIR);
console.log(`Found ${files.length} yaml files.`);
const results = [];

function checkObject(obj, filePath) {
    if (!obj || typeof obj !== 'object') return;
    
    // Check if it matches Reference or Slot with overwrite containing extra
    if ((obj.type === 'Reference' || obj.type === 'Slot') && obj.overwrite && (obj.overwrite.extra !== undefined)) {
        results.push({
            file: filePath,
            id: obj.id,
            type: obj.type,
            target: obj.target,
            overwrite: obj.overwrite
        });
    }
    
    // Recurse into children
    if (Array.isArray(obj.children)) {
        obj.children.forEach(child => checkObject(child, filePath));
    }
    // Check key values
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            checkObject(obj[key], filePath);
        }
    }
}

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const data = jsyaml.load(content);
        if (data) {
            checkObject(data, file);
        }
    } catch (e) {
        console.error(`Error parsing ${file}:`, e.message);
    }
});

console.log(JSON.stringify(results, null, 2));
