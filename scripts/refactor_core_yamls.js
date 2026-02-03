import fs from 'fs';
import path from 'path';

function toTitleCase(str) {
    // medicineDisadvantage -> Medicine Disadvantage
    // coreActions -> Core Actions
    // acrobaticsProficiency -> Acrobatics Proficiency
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (s) => s.toUpperCase())
        .trim();
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.yml')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const basename = path.basename(file, '.yml');
            const friendlyName = toTitleCase(basename);

            // Replace ID
            const idRegex = /^id:\s*.*$/m;
            if (idRegex.test(content)) {
                content = content.replace(idRegex, `id: ${basename}`);
            } else {
                content = `id: ${basename}\n${content}`;
            }

            // Add Name if not present or if it's just a path/id-like
            const nameRegex = /^name:\s*.*$/m;
            const nameMatch = content.match(nameRegex);

            if (!nameMatch) {
                // Insert name after id
                content = content.replace(/^id:\s*.*$/m, (match) => `${match}\nname: ${friendlyName}`);
            } else {
                // If it already has a name, check if it's "unfriendly" (like a path)
                const currentName = nameMatch[0].split(':')[1].trim();
                if (currentName.includes('.') || currentName === basename) {
                    content = content.replace(nameRegex, `name: ${friendlyName}`);
                }
            }

            fs.writeFileSync(fullPath, content);
            console.log(`Updated ${fullPath}`);
        }
    }
}

const targetDir = '/home/gerardon/Documentos/card-builder/data/core';
if (fs.existsSync(targetDir)) {
    processDirectory(targetDir);
} else {
    console.error(`Directory not found: ${targetDir}`);
}
