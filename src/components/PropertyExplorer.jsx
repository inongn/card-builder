import React, { useState, useMemo } from 'react';
import jsyaml from 'js-yaml';

import 'mdui/components/text-field.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/chip.js';
import 'mdui/components/button.js';
import 'mdui/components/divider.js';
import 'mdui/components/icon.js';

export default function PropertyExplorer({ library }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');
    const [expandedPropertyId, setExpandedPropertyId] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

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

    // Recursively extract all properties (top-level and child nodes)
    const allProperties = useMemo(() => {
        if (!library) return [];
        const result = [];
        const seenIds = new Set();

        const addPropertyAndChildren = (p, parentId = null) => {
            if (!p || typeof p !== 'object') return;
            
            // Determine name/id
            const propId = p.id || (p.name ? camelCase(p.name) : '');
            const fullId = parentId ? `${parentId}.${propId}` : propId;
            
            // Clone property to avoid side-effects and inject pathing info
            const pCopy = {
                ...p,
                id: propId,
                fullId: fullId,
                parentId: parentId
            };

            const key = pCopy.fullId || pCopy.name;
            if (key && !seenIds.has(key)) {
                seenIds.add(key);
                result.push(pCopy);
            }

            // Recurse into children
            if (p.children && Array.isArray(p.children)) {
                p.children.forEach(child => {
                    // Recurse structural child items (like type: Extra, Feature, Slot, Activity, etc.)
                    // Ignore Reference type children to avoid circular loops
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
                
                // fallback to check other fields in serialized form (excluding internal helpers)
                const clean = { ...p };
                delete clean.fullId;
                delete clean.parentId;
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

    const handleCopyYAML = async (p) => {
        try {
            // Strip out internal parentId and fullId helpers
            const cleanProperty = { ...p };
            delete cleanProperty.parentId;
            delete cleanProperty.fullId;

            const yamlStr = jsyaml.dump(cleanProperty, { indent: 2, lineWidth: -1 });
            await navigator.clipboard.writeText(yamlStr);
            setCopiedId(p.fullId || p.id || p.name);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (e) {
            console.error('Failed to copy YAML', e);
        }
    };

    return (
        <div className="property-explorer-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '12px' }}>
            <div className="explorer-filters" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <mdui-text-field
                    label="Search name, ID, or description..."
                    value={searchTerm}
                    onInput={(e) => setSearchTerm(e.target.value)}
                    clearable
                    style={{ width: '100%' }}
                ></mdui-text-field>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <mdui-select
                        label="Type"
                        value={selectedType}
                        style={{ flex: 1 }}
                    >
                        <mdui-menu-item value="all" onClick={() => setSelectedType('all')}>All Types</mdui-menu-item>
                        {uniqueTypes.map(t => (
                            <mdui-menu-item key={t} value={t} onClick={() => setSelectedType(t)}>{t}</mdui-menu-item>
                        ))}
                    </mdui-select>
                    <mdui-select
                        label="Tag"
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
            <div className="explorer-list-header" style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--mdui-color-on-surface-variant)' }}>
                Found {filteredProperties.length} properties
            </div>
            <div className="explorer-list" style={{ overflowY: 'auto', flex: 1, maxHeight: 'calc(100vh - 200px)', paddingRight: '4px' }}>
                {filteredProperties.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px', opacity: 0.6, fontSize: '0.9rem' }}>
                        No properties match the filters.
                    </div>
                ) : (
                    filteredProperties.map(p => {
                        const propId = p.fullId || p.id || p.name || 'unnamed';
                        const isExpanded = expandedPropertyId === propId;
                        return (
                            <div 
                                key={propId} 
                                className={`explorer-item-card ${isExpanded ? 'expanded' : ''}`} 
                                style={{
                                    border: '1px solid var(--mdui-color-outline-variant)',
                                    borderRadius: '8px',
                                    marginBottom: '8px',
                                    padding: '8px 12px',
                                    background: isExpanded ? 'var(--mdui-color-surface-container)' : 'var(--mdui-color-surface)',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s ease, border-color 0.2s ease'
                                }} 
                                onClick={() => setExpandedPropertyId(isExpanded ? null : propId)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ flex: 1, minWidth: 0, paddingRight: '8px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {p.name || p.id}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--mdui-color-on-surface-variant)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            ID: {p.fullId || p.id || 'None'}
                                        </div>
                                        {p.parentId && (
                                            <div style={{ fontSize: '0.7rem', color: 'var(--mdui-color-primary)', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                Defined in: {p.parentId}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
                                        <mdui-chip style={{ height: '22px', fontSize: '0.65rem' }}>{p.type}</mdui-chip>
                                        <mdui-icon name={isExpanded ? "expand_less" : "expand_more"} style={{ fontSize: '1.2rem', opacity: 0.7 }}></mdui-icon>
                                    </div>
                                </div>
                                {isExpanded && (
                                    <div onClick={(e) => e.stopPropagation()} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <mdui-divider style={{ marginBottom: '4px' }}></mdui-divider>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--mdui-color-on-surface-variant)' }}>YAML definition</span>
                                            <mdui-button
                                                variant="tonal"
                                                onClick={() => handleCopyYAML(p)}
                                                style={{ height: '24px', fontSize: '0.7rem' }}
                                            >
                                                {copiedId === propId ? "Copied!" : "Copy"}
                                            </mdui-button>
                                        </div>
                                        <pre className="debug-yaml-content" style={{
                                            margin: 0,
                                            padding: '8px',
                                            background: 'var(--mdui-color-surface-container-high)',
                                            color: 'var(--mdui-color-on-surface)',
                                            border: '1px solid var(--mdui-color-outline-variant)',
                                            borderRadius: '4px',
                                            maxHeight: '280px',
                                            overflow: 'auto',
                                            fontFamily: "'Roboto Mono', 'Courier New', Courier, monospace",
                                            fontSize: '0.75rem',
                                            whiteSpace: 'pre-wrap'
                                        }}>
                                            {jsyaml.dump((() => {
                                                const clean = { ...p };
                                                delete clean.parentId;
                                                delete clean.fullId;
                                                return clean;
                                            })(), { indent: 2, lineWidth: -1 })}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
