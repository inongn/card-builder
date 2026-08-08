import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { PropertyLibrary, CharacterBuilder } from './engine/RpgEngine.js';
import jsyaml from 'js-yaml';
import { SAMPLE_CHARACTERS, SAMPLE_ID_PREFIX } from './data/sampleCharacters.js';
import 'mdui/mdui.css';
import 'mdui';
import { setColorScheme } from 'mdui/functions/setColorScheme.js';

import 'mdui/components/navigation-rail.js';
import 'mdui/components/navigation-rail-item.js';
import 'mdui/components/navigation-drawer.js';
import 'mdui/components/button.js';
import 'mdui/components/button-icon.js';
import 'mdui/components/icon.js';
import 'mdui/components/card.js';
import 'mdui/components/list.js';
import 'mdui/components/list-item.js';
import 'mdui/components/fab.js';
import 'mdui/components/collapse.js';
import 'mdui/components/collapse-item.js';
import 'mdui/components/chip.js';
import 'mdui/components/text-field.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/menu.js';
import 'mdui/components/dropdown.js';
import 'mdui/components/layout.js';
import 'mdui/components/layout-main.js';
import 'mdui/components/navigation-bar.js';
import 'mdui/components/navigation-bar-item.js';
import 'mdui/components/top-app-bar.js';
import 'mdui/components/top-app-bar-title.js';
import { DashboardScreen } from './screens/DashboardScreen';
import { BuilderScreen } from './screens/BuilderScreen';
import { PlayScreen } from './screens/PlayScreen';
import { PrintScreen } from './screens/PrintScreen';
import DebugDrawer from './components/DebugDrawer';

import { getColorFromImage } from 'mdui/functions/getColorFromImage.js';
import { getAssetUrl } from './data/artworkData.js';

const DEFAULT_THEME_COLOR = '#ee0feeff';

setColorScheme(DEFAULT_THEME_COLOR);

function hexToRgb(hex) {
    if (!hex) return null;
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    if (c.length === 8) c = c.slice(0, 6);
    const num = parseInt(c, 16);
    if (isNaN(num)) return null;
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: 255 & num
    };
}
// ============================================================================
// DEBOUNCE UTILITY
// ============================================================================

function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

// ============================================================================
// HELPERS
// ============================================================================

const loadAndSortCharacters = () => {
    const savedRaw = localStorage.getItem('saved_characters');
    const saved = JSON.parse(savedRaw || '[]');

    // Remove all previous sample characters to ensure fresh reload
    const userCharacters = saved.filter(c => !String(c.id).startsWith(SAMPLE_ID_PREFIX));

    const enabledRaw = localStorage.getItem('sample_characters_enabled');
    const isEnabled = enabledRaw !== 'false';

    let merged = userCharacters;
    if (isEnabled) {
        // Load fresh sample characters
        const freshSamples = SAMPLE_CHARACTERS.map(sc => {
            const existing = saved.find(c => c.id === sc.id);
            return {
                id: sc.id,
                name: sc.name,
                class: sc.class,
                sub: sc.sub || '',
                species: sc.species,
                background: sc.background || '',
                level: sc.level,
                image: sc.image || '',
                recipe: sc.recipe,
                timestamp: existing?.timestamp || new Date().toISOString(),
                lastPlayed: existing?.lastPlayed
            };
        });
        merged = [...userCharacters, ...freshSamples];
    }

    // Sort by lastPlayed desc, then timestamp desc
    merged.sort((a, b) => {
        const timeA = a.lastPlayed || a.timestamp || '';
        const timeB = b.lastPlayed || b.timestamp || '';
        return timeB.localeCompare(timeA);
    });

    localStorage.setItem('saved_characters', JSON.stringify(merged));
    return merged;
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {

    const [library, setLibrary] = useState(null);
    const [builder, setBuilder] = useState(null);
    const [propertyTree, setPropertyTree] = useState(null);
    const [characterData, setCharacterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedCategory, setSelectedCategory] = useState('origin');
    const [isDarkMode, setIsDarkMode] = useState(() =>
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
    const [savedCharacters, setSavedCharacters] = useState(() => loadAndSortCharacters());
    const [loadedCharacterId, setLoadedCharacterId] = useState(null);
    const [builderSource, setBuilderSource] = useState('dashboard');
    const [isNewCharacterCreation, setIsNewCharacterCreation] = useState(false);
    const [sampleCharactersEnabled, setSampleCharactersEnabled] = useState(() => {
        const enabledRaw = localStorage.getItem('sample_characters_enabled');
        return enabledRaw !== 'false';
    });
    const [useActivitySheet, setUseActivitySheet] = useState(() => {
        return localStorage.getItem('use_activity_sheet') === 'true';
    });

    const handleToggleActivitySheet = useCallback(() => {
        setUseActivitySheet(prev => {
            const next = !prev;
            localStorage.setItem('use_activity_sheet', String(next));
            return next;
        });
    }, []);

    // Sync theme to document element
    useEffect(() => {
        const html = document.documentElement;
        html.classList.remove('mdui-theme-auto');
        html.classList.toggle('mdui-theme-dark', isDarkMode);
        html.classList.toggle('mdui-theme-light', !isDarkMode);

        // Also set color-scheme property for browser native elements
        html.style.colorScheme = isDarkMode ? 'dark' : 'light';
    }, [isDarkMode]);

    useEffect(() => {
        setSavedCharacters(loadAndSortCharacters());
    }, [activeTab]);

    // Helper to get extracted color from image URL using HTMLImageElement
    const extractColorFromUrl = useCallback((url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                getColorFromImage(img)
                    .then(color => resolve(color))
                    .catch((err) => {
                        console.warn('Failed to extract color from image:', err);
                        resolve(null);
                    });
            };
            img.onerror = () => resolve(null);
            img.src = url;
        });
    }, []);

    // Handle dynamic mdui theme colors & hero tint depending on activeTab
    useEffect(() => {
        if (loading) return;

        let activeColorPromise = null;

        if (activeTab === 'dashboard') {
            const lastPlayedHero = savedCharacters.length > 0 ? savedCharacters[0] : null;
            if (lastPlayedHero && lastPlayedHero.image) {
                const imgUrl = getAssetUrl(lastPlayedHero.image);
                activeColorPromise = extractColorFromUrl(imgUrl);
            }
        } else if (activeTab === 'play') {
            if (characterData && characterData.meta && characterData.meta.image) {
                const imgUrl = getAssetUrl(characterData.meta.image);
                activeColorPromise = extractColorFromUrl(imgUrl);
            }
        }

        if (activeColorPromise) {
            activeColorPromise.then((colorHex) => {
                if (colorHex) {
                    setColorScheme(colorHex);
                    const rgb = hexToRgb(colorHex);
                    if (rgb) {
                        document.documentElement.style.setProperty('--hero-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
                    } else {
                        document.documentElement.style.removeProperty('--hero-primary-rgb');
                    }
                } else {
                    setColorScheme(DEFAULT_THEME_COLOR);
                    document.documentElement.style.removeProperty('--hero-primary-rgb');
                }
            });
        } else {
            setColorScheme(DEFAULT_THEME_COLOR);
            document.documentElement.style.removeProperty('--hero-primary-rgb');
        }
    }, [activeTab, savedCharacters, characterData, loading, extractColorFromUrl]);

    const builderRef = useRef(null);
    builderRef.current = builder;

    const syncState = useCallback(() => {
        if (builderRef.current) {
            setPropertyTree({ ...builderRef.current.getPropertyTree() });
            setCharacterData({ ...builderRef.current.getCharacterData() });
        }
    }, []);

    const debouncedSyncState = useMemo(
        () => debounce(syncState, 100),
        [syncState]
    );

    useEffect(() => {
        async function init() {
            try {
                const lib = new PropertyLibrary();
                await lib.loadFromData();
                const bld = new CharacterBuilder(lib);
                await bld.initialize();
                setLibrary(lib);
                setBuilder(bld);
                setPropertyTree(bld.getPropertyTree());
                setCharacterData(bld.getCharacterData());
                setLoading(false);
            } catch (error) {
                console.error('Initialization error:', error);
            }
        }
        init();
    }, []);

    useEffect(() => {
        if (!library || !builder) return;
        if (import.meta.hot) {
            import.meta.hot.on('yaml-update', async (data) => {
                const { path, content } = data;
                const id = path.split('/').pop().replace('.yml', '').replace('.yaml', '');
                library.reloadProperty(id, content, path);
                const recipe = builder.getRecipe();
                await builder.initialize();
                builder.applyRecipe(recipe);
                syncState();
            });
        }
    }, [library, builder, syncState]);

    const handleFillSlot = useCallback((path, propertyId) => {
        builderRef.current.fillSlot(path, propertyId);
        // Defer sync by one tick so mdui web component dropdown-close animations
        // can complete before React unmounts/remounts select elements, preventing
        // null-reference errors in onDropdownClose / onValueChange.
        setTimeout(syncState, 0);
    }, [syncState]);

    const handleClearSlot = useCallback((path) => {
        builderRef.current.clearSlot(path);
        setTimeout(syncState, 0);
    }, [syncState]);

    const handleUpdateInput = useCallback((path, value) => {
        builderRef.current.updateInput(path, value);
        debouncedSyncState();
    }, [debouncedSyncState]);

    const handleGetSlotOptions = useCallback((slot) => {
        return builderRef.current.getSlotOptions(slot);
    }, []);

    const handleGetProperty = useCallback((id) => {
        return library?.getProperty(id);
    }, [library]);

    const handleNavigate = useCallback((tab) => {
        if (tab === 'builder') {
            setBuilderSource(activeTab);
        }
        setActiveTab(tab);
    }, [activeTab]);

    const handleSaveCharacter = useCallback(() => {
        if (!builder || !characterData || !loadedCharacterId) return;

        const saved = JSON.parse(localStorage.getItem('saved_characters') || '[]');
        const characterName = characterData.meta?.name || 'Unnamed Character';
        const recipe = builder.getRecipe();
        const timestamp = new Date().toISOString();

        let targetId = loadedCharacterId;
        if (String(loadedCharacterId).startsWith(SAMPLE_ID_PREFIX)) {
            targetId = Date.now();
            setLoadedCharacterId(targetId);
        }

        const index = saved.findIndex(c => c.id === targetId);
        const charSummary = {
            id: targetId,
            name: characterName,
            class: characterData.meta?.class || 'Unknown Class',
            sub: characterData.meta?.sub || '',
            species: characterData.meta?.species || '',
            background: characterData.meta?.background || '',
            level: characterData.meta?.level || 1,
            image: characterData.meta?.image || '',
            recipe,
            timestamp,
            lastPlayed: timestamp
        };

        if (index !== -1) {
            saved[index] = charSummary;
        } else {
            saved.push(charSummary);
        }

        // Sort by lastPlayed desc, then timestamp desc
        saved.sort((a, b) => {
            const timeA = a.lastPlayed || a.timestamp || '';
            const timeB = b.lastPlayed || b.timestamp || '';
            return timeB.localeCompare(timeA);
        });

        localStorage.setItem('saved_characters', JSON.stringify(saved));
        setSavedCharacters(saved);
        setActiveTab('play');
    }, [builder, characterData, loadedCharacterId]);



    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => !prev);
    }, []);

    const handleOpenSaved = useCallback(async (id, recipe, targetTab = 'play') => {
        if (!builder) return;
        builder.applyRecipe(recipe);
        syncState();
        setLoadedCharacterId(id);
        setIsNewCharacterCreation(false);

        const saved = JSON.parse(localStorage.getItem('saved_characters') || '[]');
        const updated = saved.map(c => {
            if (c.id === id) {
                return { ...c, lastPlayed: new Date().toISOString() };
            }
            return c;
        });

        updated.sort((a, b) => {
            const timeA = a.lastPlayed || a.timestamp || '';
            const timeB = b.lastPlayed || b.timestamp || '';
            return timeB.localeCompare(timeA);
        });

        localStorage.setItem('saved_characters', JSON.stringify(updated));
        setSavedCharacters(updated);
        setActiveTab(targetTab);
    }, [builder, syncState]);

    const handleDeleteSaved = useCallback((id) => {
        const saved = JSON.parse(localStorage.getItem('saved_characters') || '[]');
        const filtered = saved.filter(c => c.id !== id);
        localStorage.setItem('saved_characters', JSON.stringify(filtered));
        setSavedCharacters(filtered);
    }, []);

    const handleNewCharacter = useCallback(async () => {
        if (!builder) return;
        await builder.initialize();
        syncState();
        const newId = Date.now();
        setLoadedCharacterId(newId);
        setBuilderSource('dashboard');
        setIsNewCharacterCreation(true);
        setActiveTab('builder');
    }, [builder, syncState]);

    const handleToggleSampleCharacters = useCallback(() => {
        const saved = JSON.parse(localStorage.getItem('saved_characters') || '[]');
        if (sampleCharactersEnabled) {
            // Remove all sample characters
            const filtered = saved.filter(c => !String(c.id).startsWith(SAMPLE_ID_PREFIX));
            localStorage.setItem('saved_characters', JSON.stringify(filtered));
            localStorage.setItem('sample_characters_enabled', 'false');
            setSavedCharacters(filtered);
            setSampleCharactersEnabled(false);
        } else {
            // Add sample characters
            const freshSamples = SAMPLE_CHARACTERS.map(sc => ({
                id: sc.id,
                name: sc.name,
                class: sc.class,
                sub: sc.sub || '',
                species: sc.species,
                level: sc.level,
                image: sc.image || '',
                recipe: sc.recipe,
                timestamp: new Date().toISOString()
            }));
            const filtered = saved.filter(c => !String(c.id).startsWith(SAMPLE_ID_PREFIX));
            const merged = [...filtered, ...freshSamples];
            localStorage.setItem('saved_characters', JSON.stringify(merged));
            localStorage.setItem('sample_characters_enabled', 'true');
            setSavedCharacters(merged);
            setSampleCharactersEnabled(true);
        }
    }, [sampleCharactersEnabled]);

    const [isDebugOpen, setIsDebugOpen] = useState(false);

    if (loading) return null;

    return (
        <mdui-layout className="app-container">
            <DebugDrawer
                open={isDebugOpen}
                onClose={() => setIsDebugOpen(false)}
                characterData={characterData}
                builder={builder}
                propertyTree={propertyTree}
                library={library}
                sampleCharactersEnabled={sampleCharactersEnabled}
                handleToggleSampleCharacters={handleToggleSampleCharacters}
                savedCharacters={savedCharacters}
                setSavedCharacters={setSavedCharacters}
                useActivitySheet={useActivitySheet}
                onToggleActivitySheet={handleToggleActivitySheet}
                width={"1200px"}
            />

            <mdui-layout-main className="app-main-layout">
                {activeTab === 'dashboard' && (
                    <DashboardScreen
                        savedCharacters={savedCharacters}
                        handleNewCharacter={handleNewCharacter}
                        handleOpenSaved={handleOpenSaved}
                        handleDeleteSaved={handleDeleteSaved}
                        onNavigate={handleNavigate}
                    />
                )}
                {activeTab === 'builder' && (
                    <BuilderScreen
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        propertyTree={propertyTree}
                        characterData={characterData}
                        handleUpdateInput={handleUpdateInput}
                        handleFillSlot={handleFillSlot}
                        handleClearSlot={handleClearSlot}
                        handleGetSlotOptions={handleGetSlotOptions}
                        onGetProperty={handleGetProperty}
                        onNavigate={handleNavigate}
                        onSave={handleSaveCharacter}
                        builderSource={builderSource}
                        isNewCharacterCreation={isNewCharacterCreation}
                        setIsNewCharacterCreation={setIsNewCharacterCreation}
                    />
                )}
                {activeTab === 'play' && (
                    <PlayScreen
                        characterData={characterData}
                        onNavigate={handleNavigate}
                        toggleTheme={toggleTheme}
                        isDarkMode={isDarkMode}
                        loadedCharacterId={loadedCharacterId}
                        handleDeleteSaved={handleDeleteSaved}
                        onToggleDebug={() => setIsDebugOpen(prev => !prev)}
                        useActivitySheet={useActivitySheet}
                    />
                )}
                {activeTab === 'print' && (
                    <PrintScreen
                        char={characterData}
                        onNavigate={handleNavigate}
                        useActivitySheet={useActivitySheet}
                    />
                )}
            </mdui-layout-main>
        </mdui-layout>
    );
}
