// Cleans the ID coming from the component to be alphanumeric-only
export function cleanId(id) {
    if (!id) return '';
    return String(id)
        .replace(/^species-|^class-|^bg-|^background-/i, '')
        .replace(/[^a-z0-9]/gi, '')
        .toLowerCase();
}

export function getAssetUrl(path) {
    if (!path) return '';
    if (path.startsWith('data:') || path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    let base = '/';
    try {
        if (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) {
            base = import.meta.env.BASE_URL;
        }
    } catch (e) { }

    if (base !== '/' && path.startsWith(base)) {
        return path;
    }

    const cleanPath = path.replace(/^\//, '');
    const prefix = base.endsWith('/') ? base : base + '/';
    return prefix + cleanPath;
}

export function getSpeciesArtwork(speciesId) {
    const s = cleanId(speciesId);
    return s ? getAssetUrl(`/species/${s}.jpg`) : null;
}

export function getClassArtwork(classId) {
    const c = cleanId(classId);
    return c ? getAssetUrl(`/class/${c}.jpg`) : null;
}

export function getSubclassArtwork(subclassId) {
    const sc = cleanId(subclassId);
    return sc ? getAssetUrl(`/subclass/${sc}.jpg`) : null;
}

export function getBackgroundArtwork(backgroundId) {
    const b = cleanId(backgroundId);
    return b ? getAssetUrl(`/background/${b}.jpg`) : null;
}

export function getComboArtwork(speciesId, classId, backgroundId, subclassId) {
    // Priority order: subclass -> class -> species -> background
    return (
        getSubclassArtwork(subclassId) ||
        getClassArtwork(classId) ||
        getSpeciesArtwork(speciesId) ||
        getBackgroundArtwork(backgroundId)
    );
}