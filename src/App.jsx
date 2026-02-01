import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PropertyLibrary, CharacterBuilder } from './engine/RpgEngine.js';
import jsyaml from 'js-yaml';
import 'mdui/mdui.css';
import 'mdui';
import { setColorScheme } from 'mdui/functions/setColorScheme.js';
import { snackbar } from 'mdui/functions/snackbar.js';

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

setColorScheme('#4400ffff');
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
    const { t } = useTranslation();

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
    const [savedCharacters, setSavedCharacters] = useState([]);
    const [loadedCharacterId, setLoadedCharacterId] = useState(null);
    const [isDebugOpen, setIsDebugOpen] = useState(false);

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
            setCharacterData(builderRef.current.getCharacterData());
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
        syncState();
    }, [syncState]);

    const handleClearSlot = useCallback((path) => {
        builderRef.current.clearSlot(path);
        syncState();
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

    // Auto-save effect
    useEffect(() => {
        if (!builder || !characterData) return;

        const autoSave = setTimeout(() => {
            const saved = JSON.parse(localStorage.getItem('saved_characters') || '[]');
            const characterName = characterData.meta?.name || 'Unnamed Character';
            const recipe = builder.getRecipe();
            const timestamp = new Date().toISOString();

            if (loadedCharacterId) {
                const index = saved.findIndex(c => c.id === loadedCharacterId);
                if (index !== -1) {
                    saved[index] = { ...saved[index], name: characterName, recipe, timestamp };
                } else {
                    // Fallback
                    saved.push({ id: loadedCharacterId, name: characterName, recipe, timestamp });
                }
                localStorage.setItem('saved_characters', JSON.stringify(saved));
                setSavedCharacters(saved);
                // console.log('Auto-saved character');
            }
        }, 2000);

        return () => clearTimeout(autoSave);
    }, [characterData, builder, loadedCharacterId]);

    const { i18n } = useTranslation();
    const toggleLanguage = useCallback(() => {
        const newLang = i18n.language.startsWith('en') ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    }, [i18n]);

    // Re-sync state when language changes to update translated keys in game data
    useEffect(() => {
        if (builder) {
            builder.rebuild();
            syncState();
        }
    }, [i18n.language, builder, syncState]);

    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => !prev);
    }, []);

    const handleOpenSaved = useCallback(async (id, recipe, targetTab = 'play') => {
        if (!builder) return;
        builder.applyRecipe(recipe);
        syncState();
        setLoadedCharacterId(id);
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
        setActiveTab('builder');
    }, [builder, syncState]);

    if (loading) return null;

    return (
        <mdui-layout className="app-container">
            <mdui-top-app-bar className="desktop-hidden">
                <mdui-button-icon icon="menu" onClick={() => setActiveTab('dashboard')}></mdui-button-icon>
                <mdui-top-app-bar-title>{t('ui.name')}</mdui-top-app-bar-title>
                <div style={{ flexGrow: 1 }}></div>
                <mdui-button-icon icon="language" onClick={toggleLanguage}></mdui-button-icon>
                <mdui-button-icon icon="bug_report" onClick={() => setIsDebugOpen(true)}></mdui-button-icon>
                <mdui-button-icon icon={isDarkMode ? 'light_mode' : 'dark_mode'} onClick={toggleTheme}></mdui-button-icon>
            </mdui-top-app-bar>


            <mdui-navigation-rail value={activeTab} className="app-nav-rail mobile-hidden">
                <mdui-navigation-rail-item value="dashboard" icon="dashboard" onClick={() => setActiveTab('dashboard')}>{t('ui.characters')}</mdui-navigation-rail-item>
                <mdui-button-icon icon="language" slot="bottom" onClick={toggleLanguage}></mdui-button-icon>
                <mdui-button-icon icon="bug_report" slot="bottom" onClick={() => setIsDebugOpen(true)}></mdui-button-icon>
                <mdui-button-icon icon={isDarkMode ? 'light_mode' : 'dark_mode'} slot="bottom" onClick={toggleTheme}></mdui-button-icon>
            </mdui-navigation-rail>

            <mdui-navigation-drawer placement="right" open={isDebugOpen} onClose={() => setIsDebugOpen(false)} style={{ width: '600px' }}>
                <div className="debug-yaml-container">
                    <div className="debug-yaml-header">
                        <span className="drawer-title">Debug: {activeTab === 'builder' ? 'Recipe' : 'Character Data'}</span>
                        <mdui-button-icon icon="close" onClick={() => setIsDebugOpen(false)}></mdui-button-icon>
                    </div>
                    <div className="debug-yaml-content">
                        {builder ? jsyaml.dump(activeTab === 'builder' ? builder.getRecipe() : characterData, { indent: 2, lineWidth: -1 }) : 'No builder initialized'}
                    </div>
                </div>
            </mdui-navigation-drawer>

            <mdui-layout-main className="app-main-layout">
                {activeTab === 'dashboard' && (
                    <DashboardScreen
                        savedCharacters={savedCharacters}
                        handleNewCharacter={handleNewCharacter}
                        handleOpenSaved={handleOpenSaved}
                        handleDeleteSaved={handleDeleteSaved}
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
                        onNavigate={setActiveTab}
                    />
                )}
                {activeTab === 'play' && <PlayScreen characterData={characterData} onNavigate={setActiveTab} />}
                {activeTab === 'print' && (
                    <PrintScreen char={characterData} onNavigate={setActiveTab} />
                )}
            </mdui-layout-main>
        </mdui-layout>
    );
}
