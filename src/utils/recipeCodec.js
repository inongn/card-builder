/**
 * Alphanumeric recipe encoder and decoder.
 * Compresses character recipes using DEFLATE and encodes to Base62 [0-9A-Za-z].
 * 
 * Guarantees 100% strictly alphanumeric output (no symbols, no padding, safe for URL/copy-paste).
 * Also gracefully supports decoding legacy Base64 or raw JSON.
 */

const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const CHAR_MAP = new Map();
for (let i = 0; i < CHARSET.length; i++) {
    CHAR_MAP.set(CHARSET[i], BigInt(i));
}

/**
 * Encode Uint8Array to strictly alphanumeric Base62 string.
 * Preserves leading zero bytes by prefixing '0'.
 */
export function bytesToBase62(bytes) {
    if (!bytes || bytes.length === 0) return '';
    let leadingZeros = 0;
    while (leadingZeros < bytes.length && bytes[leadingZeros] === 0) {
        leadingZeros++;
    }

    let num = 0n;
    for (let i = leadingZeros; i < bytes.length; i++) {
        num = (num << 8n) | BigInt(bytes[i]);
    }

    let encoded = '';
    while (num > 0n) {
        const remainder = Number(num % 62n);
        num = num / 62n;
        encoded = CHARSET[remainder] + encoded;
    }

    return '0'.repeat(leadingZeros) + encoded;
}

/**
 * Decode Base62 string back to Uint8Array.
 */
export function base62ToBytes(str) {
    if (!str || str.length === 0) return new Uint8Array(0);
    let leadingZeros = 0;
    while (leadingZeros < str.length && str[leadingZeros] === '0') {
        leadingZeros++;
    }

    let num = 0n;
    for (let i = leadingZeros; i < str.length; i++) {
        const val = CHAR_MAP.get(str[i]);
        if (val === undefined) {
            throw new Error(`Invalid alphanumeric Base62 character: '${str[i]}'`);
        }
        num = num * 62n + val;
    }

    if (num === 0n) {
        return new Uint8Array(leadingZeros);
    }

    const hex = num.toString(16);
    const paddedHex = hex.length % 2 === 0 ? hex : '0' + hex;
    const byteLen = paddedHex.length / 2;
    const result = new Uint8Array(leadingZeros + byteLen);
    for (let i = 0; i < byteLen; i++) {
        result[leadingZeros + i] = parseInt(paddedHex.substring(i * 2, i * 2 + 2), 16);
    }
    return result;
}

async function getNodeZlib() {
    if (typeof window === 'undefined' && typeof globalThis.process !== 'undefined' && globalThis.process?.versions?.node) {
        try {
            const zlibPkg = 'node:' + 'zlib';
            return await import(/* @vite-ignore */ zlibPkg);
        } catch {
            return null;
        }
    }
    return null;
}

/**
 * Compress Uint8Array using raw DEFLATE.
 */
async function compressBytes(bytes) {
    if (typeof CompressionStream !== 'undefined') {
        const cs = new CompressionStream('deflate-raw');
        const writer = cs.writable.getWriter();
        writer.write(bytes);
        writer.close();
        const chunks = [];
        const reader = cs.readable.getReader();
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            chunks.push(value);
        }
        const total = chunks.reduce((acc, c) => acc + c.length, 0);
        const out = new Uint8Array(total);
        let offset = 0;
        for (const c of chunks) {
            out.set(c, offset);
            offset += c.length;
        }
        return out;
    }

    // Node.js environment fallback
    const zlib = await getNodeZlib();
    if (zlib) {
        return new Uint8Array(zlib.deflateRawSync(bytes));
    }

    throw new Error('CompressionStream is not supported in this environment');
}

/**
 * Decompress Uint8Array, trying raw DEFLATE, standard DEFLATE, and GZIP.
 */
async function decompressBytes(bytes) {
    const formats = ['deflate-raw', 'deflate', 'gzip'];

    for (const fmt of formats) {
        try {
            if (typeof DecompressionStream !== 'undefined') {
                const ds = new DecompressionStream(fmt);
                const writer = ds.writable.getWriter();
                writer.write(bytes);
                writer.close();
                const chunks = [];
                const reader = ds.readable.getReader();
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    chunks.push(value);
                }
                const total = chunks.reduce((acc, c) => acc + c.length, 0);
                const out = new Uint8Array(total);
                let offset = 0;
                for (const c of chunks) {
                    out.set(c, offset);
                    offset += c.length;
                }
                return out;
            }

            // Node.js environment fallback
            const zlib = await getNodeZlib();
            if (zlib) {
                if (fmt === 'deflate-raw') return new Uint8Array(zlib.inflateRawSync(bytes));
                if (fmt === 'deflate') return new Uint8Array(zlib.inflateSync(bytes));
                if (fmt === 'gzip') return new Uint8Array(zlib.gunzipSync(bytes));
            }
        } catch {
            // Try next format
        }
    }

    throw new Error('Failed to decompress recipe data: unsupported compression format or corrupt payload');
}

/**
 * Base64 string to Uint8Array helper (for fallback decoding).
 */
function base64ToBytes(b64) {
    // Normalize URL-safe Base64
    let normalized = b64.replace(/-/g, '+').replace(/_/g, '/');
    while (normalized.length % 4 !== 0) {
        normalized += '=';
    }
    if (typeof atob === 'function') {
        const bin = atob(normalized);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return bytes;
    }
    if (typeof globalThis.Buffer !== 'undefined') {
        return new Uint8Array(globalThis.Buffer.from(normalized, 'base64'));
    }
    return new Uint8Array(0);
}

/**
 * Encode a character recipe or character object into a compact, strictly alphanumeric string.
 * @param {Object} recipeOrCharacter - Character recipe { inputs, slots } or character summary
 * @returns {Promise<string>} Strictly alphanumeric encoded string [0-9A-Za-z]
 */
export async function encodeRecipe(recipeOrCharacter) {
    if (!recipeOrCharacter) {
        throw new Error('Recipe or character object is required');
    }

    const recipe = recipeOrCharacter.recipe || recipeOrCharacter;
    if (!recipe.inputs || !recipe.slots) {
        throw new Error('Recipe must contain inputs and slots arrays');
    }

    const payload = {
        v: 1,
        inputs: recipe.inputs,
        slots: recipe.slots
    };

    const jsonStr = JSON.stringify(payload);
    const rawBytes = new TextEncoder().encode(jsonStr);
    const compressed = await compressBytes(rawBytes);
    return bytesToBase62(compressed);
}

/**
 * Decode an encoded string (or JSON/Base64) into a recipe object { inputs, slots }.
 * @param {string} encoded - Alphanumeric encoded string or JSON
 * @returns {Promise<{ inputs: Array, slots: Array }>}
 */
export async function decodeRecipe(encoded) {
    if (!encoded || typeof encoded !== 'string') {
        throw new Error('Encoded recipe string is required');
    }

    const trimmed = encoded.trim();
    if (!trimmed) {
        throw new Error('Encoded recipe string cannot be empty');
    }

    // 1. Direct JSON check
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        try {
            const parsed = JSON.parse(trimmed);
            const r = parsed.recipe || parsed;
            if (r.inputs && r.slots) {
                return { inputs: r.inputs, slots: r.slots };
            }
        } catch {
            // Not raw JSON, continue
        }
    }

    // 2. Base62 (Alphanumeric) decode
    if (/^[0-9A-Za-z]+$/.test(trimmed)) {
        try {
            const bytes = base62ToBytes(trimmed);
            const decompressed = await decompressBytes(bytes);
            const jsonText = new TextDecoder().decode(decompressed);
            const parsed = JSON.parse(jsonText);
            const r = parsed.recipe || parsed;
            if (r.inputs && r.slots) {
                return { inputs: r.inputs, slots: r.slots };
            }
        } catch {
            // If base62 failed, fall through to try other formats
        }
    }

    // 3. Fallback: Base64 / Base64URL decode
    try {
        const bytes = base64ToBytes(trimmed);
        const decompressed = await decompressBytes(bytes);
        const jsonText = new TextDecoder().decode(decompressed);
        const parsed = JSON.parse(jsonText);
        const r = parsed.recipe || parsed;
        if (r.inputs && r.slots) {
            return { inputs: r.inputs, slots: r.slots };
        }
    } catch {
        // Fallback failed
    }

    throw new Error('Invalid or corrupted character recipe string');
}

/**
 * Check whether a string is a valid encoded recipe.
 * @param {string} str
 * @returns {Promise<boolean>}
 */
export async function isRecipeStringValid(str) {
    try {
        const recipe = await decodeRecipe(str);
        return Boolean(recipe && Array.isArray(recipe.inputs) && Array.isArray(recipe.slots));
    } catch {
        return false;
    }
}

/**
 * Quick preview of metadata from recipe inputs without needing the full CharacterBuilder.
 * @param {Object} recipe - { inputs: Array, slots: Array }
 * @returns {{ name: string, level: number, image: string, classId: string, speciesId: string }}
 */
export function extractRecipeMeta(recipe) {
    const meta = {
        name: 'Unnamed Character',
        level: 1,
        image: '',
        classId: '',
        speciesId: ''
    };

    if (!recipe) return meta;

    if (Array.isArray(recipe.inputs)) {
        for (const input of recipe.inputs) {
            const lastStep = input.path?.[input.path.length - 1];
            if (!lastStep) continue;
            if (lastStep.id === 'name' && input.value) meta.name = String(input.value);
            if (lastStep.id === 'level' && input.value) meta.level = Number(input.value) || 1;
            if (lastStep.id === 'image' && input.value) meta.image = String(input.value);
        }
    }

    if (Array.isArray(recipe.slots)) {
        for (const slot of recipe.slots) {
            const firstStep = slot.path?.[0];
            if (!firstStep) continue;
            if (firstStep.id === 'class' && slot.propertyId) meta.classId = slot.propertyId;
            if (firstStep.id === 'species' && slot.propertyId) meta.speciesId = slot.propertyId;
        }
    }

    return meta;
}
