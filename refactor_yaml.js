import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDataDir = path.resolve(__dirname, 'data');
const targetDirs = ['core', 'equipment', 'feats', 'species', 'spells'];

function cleanProps(obj) {
    if (Array.isArray(obj)) {
        obj.forEach(cleanProps);
    } else if (obj && typeof obj === 'object') {
        delete obj.name;
        delete obj.description;
        for (const key in obj) {
            cleanProps(obj[key]);
        }
    }
}

function flattenFolders(data) {
    if (data.type === 'Folder' && Array.isArray(data.children)) {
        let newChildren = [];
        let hasNestedFolder = false;

        for (const child of data.children) {
            if (child.type === 'Folder' && Array.isArray(child.children)) {
                hasNestedFolder = true;
                const condition = child.condition;
                for (const grandChild of child.children) {
                    if (condition) {
                        if (grandChild.condition) {
                            grandChild.condition = `(${condition}) && (${grandChild.condition})`;
                        } else {
                            grandChild.condition = condition;
                        }
                    }
                    newChildren.push(grandChild);
                }
            } else {
                newChildren.push(child);
            }
        }
        data.children = newChildren;

        // Recursively flatten if we still have folders in children
        if (hasNestedFolder) {
            flattenFolders(data);
        }
    }
}

function processFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let data = yaml.load(fileContent);

        if (!data) return;

        // 1. Remove 'name' and 'description'
        cleanProps(data);

        // 2. Add or replace root ID
        const relativePath = path.relative(path.resolve(rootDataDir, '..'), filePath);
        const idPath = relativePath.replace(/\.yml$/, '').split(path.sep).join('.');
        data.id = idPath;

        // 3. Fold nested folders
        flattenFolders(data);

        // Write back
        const newYaml = yaml.dump(data, { indent: 2, lineWidth: -1 });
        fs.writeFileSync(filePath, newYaml, 'utf8');
        console.log(`Processed: ${filePath} -> id: ${data.id}`);
    } catch (e) {
        console.error(`Error processing ${filePath}:`, e);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.yml')) {
            processFile(fullPath);
        }
    }
}

for (const targetDir of targetDirs) {
    const dirPath = path.join(rootDataDir, targetDir);
    if (fs.existsSync(dirPath)) {
        console.log(`Walking directory: ${dirPath}`);
        walkDir(dirPath);
    } else {
        console.log(`Directory not found: ${dirPath}`);
    }
}
