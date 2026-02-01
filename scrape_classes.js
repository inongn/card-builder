import axios from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlsFile = path.resolve(__dirname, 'markdown/classes/urls.txt');
const outputDir = path.resolve(__dirname, 'markdown/classes');

const turndownService = new TurndownService();

async function scrapeUrl(url) {
    try {
        console.log(`Scraping ${url}...`);
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Select the main content div (Wikidot uses #page-content)
        const mainContent = $('#page-content');

        if (mainContent.length === 0) {
            console.error(`Could not find #page-content in ${url}`);
            return;
        }

        // Remove things we might not want (optional)
        // mainContent.find('.print-only').remove();

        const html = mainContent.html();
        const markdown = turndownService.turndown(html);

        // Extract filename from url (e.g., fighter:main -> fighter.md)
        const urlParts = url.split('/');
        const lastPart = urlParts[urlParts.length - 1];
        const className = lastPart.split(':')[0] || 'page';
        const outputFile = path.join(outputDir, `${className}.md`);

        fs.writeFileSync(outputFile, markdown);
        console.log(`Saved to ${outputFile}`);
    } catch (error) {
        console.error(`Error scraping ${url}:`, error.message);
    }
}

async function main() {
    if (!fs.existsSync(urlsFile)) {
        console.error(`Urls file not found: ${urlsFile}`);
        return;
    }

    const urls = fs.readFileSync(urlsFile, 'utf8')
        .split('\n')
        .map(url => url.trim())
        .filter(url => url !== "");

    for (const url of urls) {
        await scrapeUrl(url);
    }
}

main();
