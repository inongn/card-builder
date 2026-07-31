import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const dirsToOptimize = ['subclass', 'species', 'class', 'background', 'portraits', 'subclass_headshot'];

let totalConverted = 0;
let totalSavedBytes = 0;

dirsToOptimize.forEach(dirName => {
    const targetDir = path.join(publicDir, dirName);
    if (!fs.existsSync(targetDir)) return;

    const files = fs.readdirSync(targetDir);
    files.forEach(file => {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
            const inputPath = path.join(targetDir, file);
            const ext = path.extname(file);
            const baseName = path.basename(file, ext);
            const outputPath = path.join(targetDir, `${baseName}.webp`);

            try {
                const initialSize = fs.statSync(inputPath).size;
                execSync(`ffmpeg -y -i "${inputPath}" -c:v libwebp -quality 80 "${outputPath}"`, { stdio: 'ignore' });
                if (fs.existsSync(outputPath)) {
                    const webpSize = fs.statSync(outputPath).size;
                    totalSavedBytes += (initialSize - webpSize);
                    totalConverted++;
                }
            } catch (err) {
                console.error(`Failed to convert ${file}:`, err.message);
            }
        }
    });
});

console.log(`Converted ${totalConverted} images to WebP format.`);
console.log(`Saved ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB of image data.`);
