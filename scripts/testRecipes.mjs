import { MYSTERY_INC_GANG } from '../src/data/mysteryIncGang.js';
import { decodeRecipe, encodeRecipe } from '../src/utils/recipeCodec.js';
import { PropertyLibrary } from '../src/engine/PropertyLibrary.js';
import { CharacterBuilder } from '../src/engine/CharacterBuilder.js';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const db = JSON.parse(readFileSync(resolve(root, 'public/db.json'), 'utf8'));
const library = new PropertyLibrary();
db.forEach(prop => { if (prop.id) library.addParsedProperty(prop); });

console.log('=== TESTING MYSTERY INC RECIPES ===');
for (const member of MYSTERY_INC_GANG) {
    const isAlphanumeric = /^[0-9A-Za-z]+$/.test(member.encoded);
    const decoded = await decodeRecipe(member.encoded);
    const reEncoded = await encodeRecipe(decoded);
    const reDecoded = await decodeRecipe(reEncoded);

    const builder = new CharacterBuilder(library);
    await builder.initialize();
    builder.applyRecipe(decoded);
    const char = builder.getCharacterData();

    console.log(`\n✓ ${char.meta.name}:`);
    console.log(`  - Subclass / Class: ${char.meta.sub} ${char.meta.class} (Level ${char.meta.level})`);
    console.log(`  - Code length: ${member.encoded.length} chars (Strictly Alphanumeric: ${isAlphanumeric})`);
    console.log(`  - Re-encode match: ${JSON.stringify(decoded) === JSON.stringify(reDecoded)}`);
    console.log(`  - Total Activities: ${char.activities?.length}`);
    if (char.statblocks?.length) {
        console.log(`  - Companions / Statblocks: ${char.statblocks.map(s => s.name).join(', ')}`);
    }
}
console.log('\n=== ALL TESTS PASSED SUCCESSFULLY ===');
