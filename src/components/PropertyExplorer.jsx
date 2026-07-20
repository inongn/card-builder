import React, { useState, useMemo } from 'react';
import jsyaml from 'js-yaml';

import 'mdui/components/text-field.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/chip.js';
import 'mdui/components/button.js';
import 'mdui/components/divider.js';
import 'mdui/components/icon.js';
import 'mdui/components/card.js';

// ============================================================================
// HELPER FOR SYNTAX HIGHLIGHTING (LOCAL TO EXPLORER)
// ============================================================================
function highlightYAML(yaml) {
    if (!yaml) return '';
    let escaped = yaml
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    escaped = escaped.replace(/(^\s*#.*$)/gm, '<span class="yaml-comment">$1</span>');
    
    escaped = escaped.replace(/^(\s*)([^:\n]+)(:)(?= \s|\n|$)/gm, (match, space, key, colon) => {
        if (key.includes('class="yaml-comment"')) return match;
        return `${space}<span class="yaml-key">${key}</span><span style="opacity: 0.7;">${colon}</span>`;
    });

    escaped = escaped.replace(/(:\s+)(['"].*?['"])(?=\s|\n|$)/gm, (match, colon, val) => {
        return `${colon}<span class="yaml-string">${val}</span>`;
    });

    escaped = escaped.replace(/(:\s+)(true|false|null|\d+(?:\.\d+)?)(?=\s|\n|$)/gm, (match, colon, val) => {
        let cls = 'yaml-number';
        if (val === 'true' || val === 'false') cls = 'yaml-boolean';
        if (val === 'null') cls = 'yaml-null';
        return `${colon}<span class="${cls}">${val}</span>`;
    });

    return escaped;
}

export default function PropertyExplorer({ library }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');
    const [expandedPropertyId, setExpandedPropertyId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);
    const [showRawYAML, setShowRawYAML] = useState({});

    const camelCase = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/[^a-zA-Z0-9\s-_]/g, '')
            .trim()
            .split(/[-_\s]+/)
            .map((word, index) => 
                index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join('');
    };

    // Extract all properties (top-level and children)
    const allProperties = useMemo(() => {
        if (!library) return [];
        const result = [];
        const seenIds = new Set();

        const addPropertyAndChildren = (p, parentId = null) => {
            if (!p || typeof p !== 'object') return;
            
            const propId = p.id || (p.name ? camelCase(p.name) : '');
            const fullId = parentId ? `${parentId}.${propId}` : propId;
            
            const pCopy = {
                ...p,
                id: propId,
                fullId: fullId,
                parentId: parentId
            };

            if (pCopy.priority === undefined) {
                pCopy.priority = 0;
            }

            if (pCopy.type === 'Activity') {
                pCopy.time = pCopy.time || 'free action';
                pCopy.range = pCopy.range || 'self';
                pCopy.duration = pCopy.duration || 'instantaneous';
                pCopy.resource = pCopy.resource || '';
            } else if (pCopy.type === 'Input') {
                pCopy.value = (pCopy.value !== undefined && pCopy.value !== null) ? pCopy.value : pCopy.default;
            } else if (pCopy.type === 'Meta') {
                pCopy.value = pCopy.value || pCopy.default;
            } else if (pCopy.type === 'Extra') {
                pCopy.name = pCopy.name || (pCopy.id ? `${pCopy.id}.name` : '');
                pCopy.description = pCopy.description || (pCopy.id ? `${pCopy.id}.description` : '');
                pCopy.target = pCopy.target || pCopy.id;
            }

            const key = pCopy.fullId || pCopy.name;
            if (key && !seenIds.has(key)) {
                seenIds.add(key);
                result.push(pCopy);
            }

            if (p.children && Array.isArray(p.children)) {
                p.children.forEach(child => {
                    if (child && typeof child === 'object' && child.type !== 'Reference') {
                        addPropertyAndChildren(child, fullId);
                    }
                });
            }
        };

        library.properties.forEach(p => {
            addPropertyAndChildren(p);
        });

        return result;
    }, [library]);

    const uniqueTypes = useMemo(() => {
        const types = new Set();
        allProperties.forEach(p => {
            if (p.type) types.add(p.type);
        });
        return Array.from(types).sort();
    }, [allProperties]);

    const uniqueTags = useMemo(() => {
        const tags = new Set();
        allProperties.forEach(p => {
            if (p.tags) {
                const arr = Array.isArray(p.tags) ? p.tags : [p.tags];
                arr.forEach(t => tags.add(t));
            }
        });
        return Array.from(tags).sort();
    }, [allProperties]);

    const filteredProperties = useMemo(() => {
        let list = allProperties;
        
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            list = list.filter(p => {
                if (p.id && String(p.id).toLowerCase().includes(lowerSearch)) return true;
                if (p.fullId && String(p.fullId).toLowerCase().includes(lowerSearch)) return true;
                if (p.name && p.name.toLowerCase().includes(lowerSearch)) return true;
                if (p.description && typeof p.description === 'string' && p.description.toLowerCase().includes(lowerSearch)) return true;
                
                const clean = { ...p };
                delete clean.fullId;
                delete clean.parentId;
                delete clean.children;
                try {
                    return JSON.stringify(clean).toLowerCase().includes(lowerSearch);
                } catch (e) {
                    return false;
                }
            });
        }
        
        if (selectedType && selectedType !== 'all') {
            list = list.filter(p => p.type === selectedType);
        }
        
        if (selectedTag && selectedTag !== 'all') {
            list = list.filter(p => {
                if (!p.tags) return false;
                const arr = Array.isArray(p.tags) ? p.tags : [p.tags];
                return arr.includes(selectedTag);
            });
        }
        
        return list.sort((a, b) => (a.name || a.id || '').localeCompare(b.name || b.id || ''));
    }, [allProperties, searchTerm, selectedType, selectedTag]);

    const handleCopyYAML = async (p, e) => {
        if (e) e.stopPropagation();
        try {
            const cleanProperty = { ...p };
            delete cleanProperty.parentId;
            delete cleanProperty.fullId;

            const yamlStr = jsyaml.dump(cleanProperty, { indent: 2, lineWidth: -1 });
            await navigator.clipboard.writeText(yamlStr);
            setCopiedId(p.fullId || p.id || p.name);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy YAML', err);
        }
    };

    const toggleRawYAML = (propId, e) => {
        if (e) e.stopPropagation();
        setShowRawYAML(prev => ({
            ...prev,
            [propId]: !prev[propId]
        }));
    };

    // Styling helpers for type-specific chips
    const getTypeChipStyle = (type) => {
        switch (type) {
            case 'Activity':
                return { backgroundColor: 'rgba(76, 175, 80, 0.15)', color: '#2e7d32', fontWeight: 600 };
            case 'Input':
                return { backgroundColor: 'rgba(33, 150, 243, 0.15)', color: '#1565c0', fontWeight: 600 };
            case 'Meta':
                return { backgroundColor: 'rgba(156, 39, 176, 0.15)', color: '#6a1b9a', fontWeight: 600 };
            case 'Extra':
                return { backgroundColor: 'rgba(255, 152, 0, 0.15)', color: '#e65100', fontWeight: 600 };
            case 'Slot':
                return { backgroundColor: 'rgba(233, 30, 99, 0.15)', color: '#c2185b', fontWeight: 600 };
            default:
                return { backgroundColor: 'rgba(158, 158, 158, 0.15)', color: '#424242', fontWeight: 600 };
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
            {/* Filters Row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--mdui-color-surface-container)', padding: '16px', borderRadius: '12px' }}>
                <mdui-text-field
                    label="Filter by name, ID or details..."
                    value={searchTerm}
                    onInput={(e) => setSearchTerm(e.target.value)}
                    clearable
                    style={{ width: '100%' }}
                >
                    <mdui-icon slot="icon" name="search"></mdui-icon>
                </mdui-text-field>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <mdui-select
                        label="Filter Type"
                        value={selectedType}
                        style={{ flex: 1 }}
                    >
                        <mdui-menu-item value="all" onClick={() => setSelectedType('all')}>All Types</mdui-menu-item>
                        {uniqueTypes.map(t => (
                            <mdui-menu-item key={t} value={t} onClick={() => setSelectedType(t)}>{t}</mdui-menu-item>
                        ))}
                    </mdui-select>
                    <mdui-select
                        label="Filter Tag"
                        value={selectedTag}
                        style={{ flex: 1 }}
                    >
                        <mdui-menu-item value="all" onClick={() => setSelectedTag('all')}>All Tags</mdui-menu-item>
                        {uniqueTags.map(t => (
                            <mdui-menu-item key={t} value={t} onClick={() => setSelectedTag(t)}>{t}</mdui-menu-item>
                        ))}
                    </mdui-select>
                </div>
            </div>

            {/* Found Properties Count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--mdui-color-on-surface-variant)', fontWeight: 500, padding: '0 4px' }}>
                <span>Found {filteredProperties.length} Properties</span>
                {(selectedType !== 'all' || selectedTag !== 'all' || searchTerm) && (
                    <span 
                        style={{ color: 'var(--mdui-color-primary)', cursor: 'pointer' }}
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedType('all');
                            setSelectedTag('all');
                        }}
                    >
                        Clear Filters
                    </span>
                )}
            </div>

            {/* Property Cards List */}
            <div className="property-explorer-scrollable">
                {filteredProperties.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '36px 12px', opacity: 0.6, fontSize: '0.9rem' }}>
                        No property items found matching your filters.
                    </div>
                ) : (
                    filteredProperties.map(p => {
                        const propId = p.fullId || p.id || p.name || 'unnamed';
                        const isExpanded = expandedPropertyId === propId;
                        
                        return (
                            <mdui-card
                                key={propId}
                                variant="outlined"
                                style={{
                                    marginBottom: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.2s ease',
                                    border: isExpanded ? '1px solid var(--mdui-color-primary)' : '1px solid var(--mdui-color-outline-variant)',
                                    background: isExpanded ? 'var(--mdui-color-surface-container-low)' : 'var(--mdui-color-surface)'
                                }}
                            >
                                {/* Header Toggle Area */}
                                <div 
                                    className="property-card-header"
                                    onClick={() => setExpandedPropertyId(isExpanded ? null : propId)}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0, paddingRight: '12px' }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--mdui-color-on-surface)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {p.name || p.id}
                                        </div>
                                        <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--mdui-color-on-surface-variant)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            ID: {propId}
                                        </div>
                                        {p.parentId && (
                                            <div style={{ fontSize: '0.7rem', color: 'var(--mdui-color-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                Parent Scope: {p.parentId}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ 
                                            padding: '2px 8px', 
                                            borderRadius: '12px', 
                                            fontSize: '0.7rem', 
                                            ...getTypeChipStyle(p.type) 
                                        }}>
                                            {p.type}
                                        </span>
                                        <mdui-button-icon
                                            icon={isExpanded ? "expand_less" : "expand_more"}
                                            style={{ pointerEvents: 'none' }}
                                        ></mdui-button-icon>
                                    </div>
                                </div>

                                {/* Expanded Detail Panel */}
                                {isExpanded && (
                                    <div 
                                        style={{ padding: '0 16px 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <mdui-divider style={{ marginBottom: '8px' }}></mdui-divider>

                                        {/* Structured Details Table */}
                                        <table className="property-details-table">
                                            <tbody>
                                                <tr>
                                                    <th>Type</th>
                                                    <td>{p.type}</td>
                                                </tr>
                                                <tr>
                                                    <th>Priority</th>
                                                    <td>{p.priority}</td>
                                                </tr>
                                                {p.type === 'Activity' && (
                                                    <>
                                                        <tr>
                                                            <th>Execution Time</th>
                                                            <td>{p.time}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Range</th>
                                                            <td>{p.range}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Duration</th>
                                                            <td>{p.duration}</td>
                                                        </tr>
                                                        {p.resource && (
                                                            <tr>
                                                                <th>Resource Cost</th>
                                                                <td>{p.resource}</td>
                                                            </tr>
                                                        )}
                                                    </>
                                                )}
                                                {(p.type === 'Input' || p.type === 'Meta') && (
                                                    <>
                                                        <tr>
                                                            <th>Default Value</th>
                                                            <td>{p.default !== undefined ? String(p.default) : 'None'}</td>
                                                        </tr>
                                                        {p.value !== undefined && (
                                                            <tr>
                                                                <th>Current Value</th>
                                                                <td>{String(p.value)}</td>
                                                            </tr>
                                                        )}
                                                    </>
                                                )}
                                                {p.description && (
                                                    <tr>
                                                        <th>Description</th>
                                                        <td>{p.description}</td>
                                                    </tr>
                                                )}
                                                {p.tags && (
                                                    <tr>
                                                        <th>Tags</th>
                                                        <td>
                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                                {(Array.isArray(p.tags) ? p.tags : [p.tags]).map(t => (
                                                                    <span key={t} style={{
                                                                        fontSize: '0.65rem',
                                                                        padding: '2px 6px',
                                                                        borderRadius: '4px',
                                                                        backgroundColor: 'var(--mdui-color-surface-container-high)',
                                                                        border: '1px solid var(--mdui-color-outline-variant)'
                                                                    }}>{t}</span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                        {/* Bottom Action buttons */}
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <mdui-button
                                                variant="tonal"
                                                icon="content_copy"
                                                onClick={(e) => handleCopyYAML(p, e)}
                                                style={{ height: '32px', fontSize: '0.8rem' }}
                                            >
                                                {copiedId === propId ? "Copied!" : "Copy YAML"}
                                            </mdui-button>
                                            <mdui-button
                                                variant="outlined"
                                                icon={showRawYAML[propId] ? "visibility_off" : "visibility"}
                                                onClick={(e) => toggleRawYAML(propId, e)}
                                                style={{ height: '32px', fontSize: '0.8rem' }}
                                            >
                                                {showRawYAML[propId] ? "Hide Source" : "View Source"}
                                            </mdui-button>
                                        </div>

                                        {/* Raw Source Collapsible Code Block */}
                                        {showRawYAML[propId] && (
                                            <div style={{ marginTop: '8px', border: '1px solid var(--mdui-color-outline-variant)', borderRadius: '8px', overflow: 'hidden' }}>
                                                <pre 
                                                    style={{
                                                        margin: 0,
                                                        padding: '12px',
                                                        background: 'var(--mdui-color-surface-container-high)',
                                                        fontFamily: "'Fira Code', 'Roboto Mono', monospace",
                                                        fontSize: '12px',
                                                        lineHeight: 1.5,
                                                        overflowX: 'auto',
                                                        whiteSpace: 'pre-wrap',
                                                        color: 'var(--mdui-color-on-surface)'
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: highlightYAML(jsyaml.dump((() => {
                                                            const clean = { ...p };
                                                            delete clean.parentId;
                                                            delete clean.fullId;
                                                            return clean;
                                                        })(), { indent: 2, lineWidth: -1 }))
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </mdui-card>
                        );
                    })
                )}
            </div>
        </div>
    );
}
