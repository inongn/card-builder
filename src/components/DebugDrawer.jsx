import React, { useRef, useEffect, useState, useMemo } from 'react';
import jsyaml from 'js-yaml';
import PropertyExplorer from './PropertyExplorer';
import { SAMPLE_CHARACTERS, SAMPLE_ID_PREFIX } from '../data/sampleCharacters.js';

import 'mdui/components/navigation-drawer.js';
import 'mdui/components/tabs.js';
import 'mdui/components/tab.js';
import 'mdui/components/button.js';
import 'mdui/components/button-icon.js';
import 'mdui/components/divider.js';
import 'mdui/components/icon.js';
import 'mdui/components/text-field.js';
import 'mdui/components/list.js';
import 'mdui/components/list-item.js';
import 'mdui/components/card.js';
import 'mdui/components/dialog.js';

// ============================================================================
// LIGHTWEIGHT SYNTAX HIGHLIGHTER & SEARCH HIGHLIGHTER
// ============================================================================

function highlightYAML(yaml) {
    if (!yaml) return '';
    // Escape HTML entities to prevent rendering arbitrary HTML
    let escaped = yaml
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Highlight Comments
    escaped = escaped.replace(/(^\s*#.*$)/gm, '<span class="yaml-comment">$1</span>');

    // Highlight Keys (any word before a colon followed by space or newline)
    escaped = escaped.replace(/^(\s*)([^:\n]+)(:)(?= \s|\n|$)/gm, (match, space, key, colon) => {
        if (key.includes('class="yaml-comment"')) return match;
        return `${space}<span class="yaml-key">${key}</span><span style="opacity: 0.7;">${colon}</span>`;
    });

    // Highlight String values in quotes
    escaped = escaped.replace(/(:\s+)(['"].*?['"])(?=\s|\n|$)/gm, (match, colon, val) => {
        return `${colon}<span class="yaml-string">${val}</span>`;
    });

    // Highlight Numbers, Booleans, Nulls
    escaped = escaped.replace(/(:\s+)(true|false|null|\d+(?:\.\d+)?)(?=\s|\n|$)/gm, (match, colon, val) => {
        let cls = 'yaml-number';
        if (val === 'true' || val === 'false') cls = 'yaml-boolean';
        if (val === 'null') cls = 'yaml-null';
        return `${colon}<span class="${cls}">${val}</span>`;
    });

    return escaped;
}

function highlightSearchMatch(html, query) {
    if (!query) return html;
    const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    // Split by HTML tags to avoid matching inside attributes/styles, only highlight text nodes
    const parts = html.split(/(<[^>]+>)/g);
    const highlightedParts = parts.map(part => {
        if (part.startsWith('<')) return part;
        return part.replace(regex, '<span class="debug-search-match">$1</span>');
    });
    return highlightedParts.join('');
}

// ============================================================================
// ENHANCED CODE VIEWER SUB-COMPONENT
// ============================================================================

const EnhancedCodeViewer = ({ code, filename }) => {
    const [search, setSearch] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([code], { type: 'text/yaml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Parse lines and highlight
    const { lineNumbers, highlightedHtml } = useMemo(() => {
        if (!code) return { lineNumbers: [], highlightedHtml: '' };

        const lines = code.split('\n');
        const highlighted = highlightYAML(code);
        const searched = highlightSearchMatch(highlighted, search);

        return {
            lineNumbers: Array.from({ length: lines.length }, (_, i) => i + 1),
            highlightedHtml: searched
        };
    }, [code, search]);

    return (
        <div className="debug-code-viewer">
            <div className="debug-code-toolbar">
                <mdui-text-field
                    label="Search inside code..."
                    value={search}
                    onInput={(e) => setSearch(e.target.value)}
                    clearable
                    style={{ flex: 1, maxWidth: '280px', height: '36px' }}
                >
                    <mdui-icon slot="icon" name="search"></mdui-icon>
                </mdui-text-field>
                <div className="debug-code-toolbar-actions">
                    <mdui-button-icon
                        icon={copied ? "check" : "content_copy"}
                        onClick={handleCopy}
                        title={copied ? "Copied!" : "Copy to Clipboard"}
                        style={{ color: copied ? 'var(--mdui-color-primary)' : 'inherit' }}
                    ></mdui-button-icon>
                    <mdui-button-icon
                        icon="download"
                        onClick={handleDownload}
                        title="Download YAML file"
                    ></mdui-button-icon>
                </div>
            </div>
            <div className="debug-code-content-wrapper">
                <div className="debug-code-gutter">
                    {lineNumbers.map(ln => (
                        <span key={ln} className="debug-code-line-number">{ln}</span>
                    ))}
                </div>
                <pre className="debug-code-pre" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
            </div>
        </div>
    );
};

// ============================================================================
// MAIN DEBUG DRAWER COMPONENT
// ============================================================================

export default function DebugDrawer({
    open,
    onClose,
    characterData,
    builder,
    propertyTree,
    library,
    sampleCharactersEnabled,
    handleToggleSampleCharacters,
    savedCharacters,
    setSavedCharacters
}) {
    const drawerRef = useRef(null);
    const [activeTab, setActiveTab] = useState('character');
    const [confirmClearOpen, setConfirmClearOpen] = useState(false);

    // Sync drawer open state
    useEffect(() => {
        if (drawerRef.current) {
            drawerRef.current.open = open;
        }
    }, [open]);

    // Handle MDUI drawer closing (backdrop click or keyboard escape)
    useEffect(() => {
        const drawer = drawerRef.current;
        if (!drawer) return;

        const handleCloseEvent = () => {
            if (onClose) onClose();
        };

        drawer.addEventListener('close', handleCloseEvent);
        return () => drawer.removeEventListener('close', handleCloseEvent);
    }, [onClose]);

    // Generate debug content strings
    const charYaml = useMemo(() => {
        if (!characterData) return '# No character data loaded';
        try {
            return jsyaml.dump(characterData, { indent: 2, lineWidth: -1 });
        } catch (e) {
            return `# Error stringifying character: ${e.message}`;
        }
    }, [characterData]);

    const recipeYaml = useMemo(() => {
        if (!builder) return '# No builder initialized';
        try {
            return jsyaml.dump(builder.getRecipe(), { indent: 2, lineWidth: -1 });
        } catch (e) {
            return `# Error stringifying recipe: ${e.message}`;
        }
    }, [builder, characterData]); // Update when character changes, since recipe updates in sync

    const treeYaml = useMemo(() => {
        if (!propertyTree) return '# No property tree available';
        try {
            return jsyaml.dump(propertyTree, { indent: 2, lineWidth: -1 });
        } catch (e) {
            return `# Error stringifying property tree: ${e.message}`;
        }
    }, [propertyTree]);

    // Developer stats metrics
    const stats = useMemo(() => {
        if (!library) return null;
        return {
            propertiesCount: library.properties.size,
            rawFilesCount: library.rawStore.size,
            keys: Array.from(library.rawStore.keys()).sort()
        };
    }, [library]);

    // Handle Clearing All Saved Characters
    const handleClearAllCharacters = () => {
        localStorage.setItem('saved_characters', JSON.stringify([]));
        setSavedCharacters([]);
        setConfirmClearOpen(false);
    };

    // Handle Exporting Saved Characters
    const handleExportAllCharacters = () => {
        const blob = new Blob([JSON.stringify(savedCharacters, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `characters_export_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <mdui-navigation-drawer
            ref={drawerRef}
            placement="right"
            style={{ width: '600px', maxWidth: '100vw', height: '100vh', zIndex: 10000 }}
        >
            <div className="debug-yaml-container">
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 24px 8px 24px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <mdui-icon name="bug_report" style={{ color: 'var(--mdui-color-primary)' }}></mdui-icon>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 600 }}>Developer Console</h2>
                    </div>
                    <mdui-button-icon icon="close" onClick={onClose}></mdui-button-icon>
                </div>

                <mdui-divider></mdui-divider>

                {/* Tabs */}
                <mdui-tabs value={activeTab} style={{ padding: '0 8px' }}>
                    <mdui-tab value="character" onClick={() => setActiveTab('character')}>Character</mdui-tab>
                    <mdui-tab value="recipe" onClick={() => setActiveTab('recipe')}>Recipe</mdui-tab>
                    <mdui-tab value="tree" onClick={() => setActiveTab('tree')}>Tree</mdui-tab>
                    <mdui-tab value="explorer" onClick={() => setActiveTab('explorer')}>Explorer</mdui-tab>
                    <mdui-tab value="tools" onClick={() => setActiveTab('tools')}>Stats & Tools</mdui-tab>
                </mdui-tabs>

                {/* Content Area */}
                <div style={{ flex: 1, padding: '16px 24px 24px 24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                    {activeTab === 'character' && (
                        <EnhancedCodeViewer code={charYaml} filename="character.yml" />
                    )}

                    {activeTab === 'recipe' && (
                        <EnhancedCodeViewer code={recipeYaml} filename="recipe.yml" />
                    )}

                    {activeTab === 'tree' && (
                        <EnhancedCodeViewer code={treeYaml} filename="property_tree.yml" />
                    )}

                    {activeTab === 'explorer' && (
                        <PropertyExplorer library={library} />
                    )}

                    {activeTab === 'tools' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
                            {/* Samples Control */}
                            <mdui-card variant="outlined" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ fontWeight: 600, fontSize: '1rem' }}>Sample Characters</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--mdui-color-on-surface-variant)' }}>
                                    Load sample Spellcasters, Fighters, and Druids into your dashboard database for testing and building references.
                                </div>
                                <mdui-button
                                    variant={sampleCharactersEnabled ? 'tonal' : 'filled'}
                                    icon={sampleCharactersEnabled ? 'group_remove' : 'group_add'}
                                    onClick={handleToggleSampleCharacters}
                                    style={{ alignSelf: 'flex-start' }}
                                >
                                    {sampleCharactersEnabled ? 'Remove Samples' : 'Load Samples'} ({SAMPLE_CHARACTERS.length})
                                </mdui-button>
                            </mdui-card>

                            {/* Database Operations */}
                            <mdui-card variant="outlined" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ fontWeight: 600, fontSize: '1rem' }}>Database Management</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--mdui-color-on-surface-variant)' }}>
                                    Manage character profiles stored in the local browser database.
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <mdui-button
                                        variant="tonal"
                                        icon="download"
                                        onClick={handleExportAllCharacters}
                                        disabled={!savedCharacters || savedCharacters.length === 0}
                                    >
                                        Export Characters ({savedCharacters?.length || 0})
                                    </mdui-button>
                                    <mdui-button
                                        variant="outlined"
                                        icon="delete_forever"
                                        onClick={() => setConfirmClearOpen(true)}
                                        style={{ color: 'var(--mdui-color-error)' }}
                                    >
                                        Clear Database
                                    </mdui-button>
                                </div>
                            </mdui-card>

                            {/* Engine Metrics */}
                            {stats && (
                                <mdui-card variant="outlined" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>Property Library Stats</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--mdui-color-surface-container)', padding: '12px', borderRadius: '8px' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--mdui-color-on-surface-variant)' }}>Loaded Properties</span>
                                            <span style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--mdui-color-primary)' }}>{stats.propertiesCount}</span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--mdui-color-surface-container)', padding: '12px', borderRadius: '8px' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--mdui-color-on-surface-variant)' }}>Raw YAML Source Files</span>
                                            <span style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--mdui-color-secondary)' }}>{stats.rawFilesCount}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Active Property File Paths:</span>
                                        <div style={{
                                            maxHeight: '180px',
                                            overflowY: 'auto',
                                            background: 'var(--mdui-color-surface-container-high)',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            fontFamily: 'monospace',
                                            fontSize: '0.75rem',
                                            lineHeight: 1.5,
                                            border: '1px solid var(--mdui-color-outline-variant)'
                                        }}>
                                            {stats.keys.map((k, idx) => (
                                                <div key={k}>{idx + 1}. {k}</div>
                                            ))}
                                        </div>
                                    </div>
                                </mdui-card>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Clear Database Confirmation Dialog */}
            <mdui-dialog
                ref={(el) => {
                    if (el) {
                        el.open = confirmClearOpen;
                        el.addEventListener('close', () => setConfirmClearOpen(false));
                    }
                }}
                headline="Confirm Database Reset"
                description="Are you absolutely sure you want to delete all saved characters? This action is permanent and cannot be undone."
            >
                <mdui-button slot="action" variant="text" onClick={() => setConfirmClearOpen(false)}>Cancel</mdui-button>
                <mdui-button slot="action" variant="filled" onClick={handleClearAllCharacters} style={{ backgroundColor: 'var(--mdui-color-error)' }}>
                    Reset Database
                </mdui-button>
            </mdui-dialog>
        </mdui-navigation-drawer>
    );
}
