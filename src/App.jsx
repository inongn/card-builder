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

setColorScheme('#ee0feeff');
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
    const [savedCharacters, setSavedCharacters] = useState(() => {
        const savedRaw = localStorage.getItem('saved_characters');
        const saved = JSON.parse(savedRaw || '[]');
        
        // Remove all previous sample characters to ensure fresh reload
        const userCharacters = saved.filter(c => !String(c.id).startsWith(SAMPLE_ID_PREFIX));
        
        const enabledRaw = localStorage.getItem('sample_characters_enabled');
        const isEnabled = enabledRaw !== 'false';

        if (isEnabled) {
            // Load fresh sample characters
            const freshSamples = SAMPLE_CHARACTERS.map(sc => ({
                id: sc.id,
                name: sc.name,
                class: sc.class,
                sub: sc.sub || '',
                species: sc.species,
                level: sc.level,
                recipe: sc.recipe,
                timestamp: new Date().toISOString()
            }));

            const merged = [...userCharacters, ...freshSamples];
            localStorage.setItem('saved_characters', JSON.stringify(merged));
            return merged;
        } else {
            localStorage.setItem('saved_characters', JSON.stringify(userCharacters));
            return userCharacters;
        }
    });
    const [loadedCharacterId, setLoadedCharacterId] = useState(null);
    const [builderSource, setBuilderSource] = useState('dashboard');
    const [isNewCharacterCreation, setIsNewCharacterCreation] = useState(false);
    const [sampleCharactersEnabled, setSampleCharactersEnabled] = useState(() => {
        const enabledRaw = localStorage.getItem('sample_characters_enabled');
        return enabledRaw !== 'false';
    });

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
        const saved = JSON.parse(localStorage.getItem('saved_characters') || '[]');
        setSavedCharacters(saved);
    }, [activeTab]);

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
            level: characterData.meta?.level || 1,
            recipe,
            timestamp
        };

        if (index !== -1) {
            saved[index] = charSummary;
        } else {
            saved.push(charSummary);
        }
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
                    />
                )}
                {activeTab === 'print' && (
                    <PrintScreen
                        char={characterData}
                        onNavigate={handleNavigate}
                    />
                )}
            </mdui-layout-main>
        </mdui-layout>
    );
}
