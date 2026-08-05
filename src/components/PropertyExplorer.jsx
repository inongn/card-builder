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
    // Pending filter states
    const [pendingSearchTerm, setPendingSearchTerm] = useState('');
    const [pendingSelectedType, setPendingSelectedType] = useState('all');
    const [pendingSelectedTag, setPendingSelectedTag] = useState('all');
    const [pendingNodeScope, setPendingNodeScope] = useState('all'); // 'all', 'top', 'child'

    // Applied filter state (only updated on "Filter" click)
    const [isLoaded, setIsLoaded] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState({
        searchTerm: '',
        selectedType: 'all',
        selectedTag: 'all',
        nodeScope: 'all'
    });

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

        const addPropertyAndChildren = (p, parentId = null, childIndex = 0) => {
            if (!p || typeof p !== 'object') return;
            
            const propId = p.id || (p.name ? camelCase(p.name) : (p.target ? `${String(p.target).replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 30)}_${childIndex}` : `item_${childIndex}`));
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

            const key = pCopy.fullId || pCopy.name || `anonymous_${Math.random()}`;
            if (key && !seenIds.has(key)) {
                seenIds.add(key);
                result.push(pCopy);
            }

            if (p.children && Array.isArray(p.children)) {
                p.children.forEach((child, idx) => {
                    if (child && typeof child === 'object' && child.type !== 'Reference') {
                        addPropertyAndChildren(child, fullId, idx);
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

    // Compute filtered list based on applied filters when loaded
    const filteredProperties = useMemo(() => {
        if (!isLoaded) return [];

        let list = allProperties;
        const { searchTerm, selectedType, selectedTag, nodeScope } = appliedFilters;

        // Node scope filter
        if (nodeScope === 'top') {
            list = list.filter(p => !p.parentId);
        } else if (nodeScope === 'child') {
            list = list.filter(p => !!p.parentId);
        }
        
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
    }, [allProperties, isLoaded, appliedFilters]);

    const handleApplyFilter = () => {
        setAppliedFilters({
            searchTerm: pendingSearchTerm,
            selectedType: pendingSelectedType,
            selectedTag: pendingSelectedTag,
            nodeScope: pendingNodeScope
        });
        setIsLoaded(true);
    };

    const handleResetFilters = () => {
        setPendingSearchTerm('');
        setPendingSelectedType('all');
        setPendingSelectedTag('all');
        setPendingNodeScope('all');
        setAppliedFilters({
            searchTerm: '',
            selectedType: 'all',
            selectedTag: 'all',
            nodeScope: 'all'
        });
        setIsLoaded(false);
    };

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
    const getTypeBadgeClass = (type) => {
        switch (type) {
            case 'Activity': return 'prop-type-badge prop-type-badge--activity';
            case 'Input':    return 'prop-type-badge prop-type-badge--input';
            case 'Meta':     return 'prop-type-badge prop-type-badge--meta';
            case 'Extra':    return 'prop-type-badge prop-type-badge--extra';
            case 'Slot':     return 'prop-type-badge prop-type-badge--slot';
            default:         return 'prop-type-badge';
        }
    };

    return (
        <div className="prop-explorer-panel">
            {/* Filters Row */}
            <div className="prop-filter-bar">
                <mdui-text-field
                    label="Filter by name, ID or details..."
                    value={pendingSearchTerm}
                    onInput={(e) => setPendingSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleApplyFilter();
                    }}
                    clearable
                >
                    <mdui-icon slot="icon" name="search"></mdui-icon>
                </mdui-text-field>
                <div className="prop-filter-row">
                    <mdui-select
                        label="Node Scope"
                        value={pendingNodeScope}
                        class="flex-1"
                    >
                        <mdui-menu-item value="all" onClick={() => setPendingNodeScope('all')}>All Nodes</mdui-menu-item>
                        <mdui-menu-item value="top" onClick={() => setPendingNodeScope('top')}>Top Level Only</mdui-menu-item>
                        <mdui-menu-item value="child" onClick={() => setPendingNodeScope('child')}>Child Nodes Only</mdui-menu-item>
                    </mdui-select>
                    <mdui-select
                        label="Filter Type"
                        value={pendingSelectedType}
                        class="flex-1"
                    >
                        <mdui-menu-item value="all" onClick={() => setPendingSelectedType('all')}>All Types</mdui-menu-item>
                        {uniqueTypes.map(t => (
                            <mdui-menu-item key={t} value={t} onClick={() => setPendingSelectedType(t)}>{t}</mdui-menu-item>
                        ))}
                    </mdui-select>
                    <mdui-select
                        label="Filter Tag"
                        value={pendingSelectedTag}
                        class="flex-1"
                    >
                        <mdui-menu-item value="all" onClick={() => setPendingSelectedTag('all')}>All Tags</mdui-menu-item>
                        {uniqueTags.map(t => (
                            <mdui-menu-item key={t} value={t} onClick={() => setPendingSelectedTag(t)}>{t}</mdui-menu-item>
                        ))}
                    </mdui-select>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <mdui-button
                        variant="filled"
                        icon="filter_list"
                        onClick={handleApplyFilter}
                        style={{ flex: 1 }}
                    >
                        Filter
                    </mdui-button>
                    {(isLoaded || pendingSearchTerm || pendingSelectedType !== 'all' || pendingSelectedTag !== 'all' || pendingNodeScope !== 'all') && (
                        <mdui-button
                            variant="outlined"
                            icon="clear_all"
                            onClick={handleResetFilters}
                        >
                            Reset
                        </mdui-button>
                    )}
                </div>
            </div>

            {/* Found Properties Count */}
            {isLoaded ? (
                <div className="prop-results-meta">
                    <span>Found {filteredProperties.length} Properties</span>
                    <span className="prop-results-clear" onClick={handleResetFilters}>
                        Clear Filters
                    </span>
                </div>
            ) : (
                <div className="prop-results-meta">
                    <span>Set filter criteria above and click Filter</span>
                </div>
            )}

            {/* Property Cards List */}
            <div className="property-explorer-scrollable">
                {!isLoaded ? (
                    <div className="prop-empty-state">
                        <mdui-icon name="filter_alt" style={{ fontSize: '36px', opacity: 0.5, marginBottom: '8px' }}></mdui-icon>
                        <div>Set filters above and click <strong>Filter</strong> to view properties.</div>
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="prop-empty-state">
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
                                className={`prop-list-item surface-card ${isExpanded ? 'selected' : ''}`}
                            >
                                {/* Header Toggle Area */}
                                <div 
                                    className="prop-list-item__inner property-card-header"
                                    onClick={() => setExpandedPropertyId(isExpanded ? null : propId)}
                                >
                                    <div className="prop-list-item__info">
                                        <div className="prop-list-item__name">
                                            {p.name || p.id}
                                        </div>
                                        <div className="prop-list-item__id">
                                            ID: {propId}
                                        </div>
                                        <div className="prop-list-item__tags">
                                            {p.parentId ? `Parent Scope: ${p.parentId}` : 'Top Level Node'}
                                        </div>
                                    </div>
                                    <div className="prop-list-item__actions">
                                        <span className={getTypeBadgeClass(p.type)}>
                                            {p.type}
                                        </span>
                                        <mdui-button-icon
                                            icon={isExpanded ? "expand_less" : "expand_more"}
                                            class="prop-list-item__expand-pointer"
                                        ></mdui-button-icon>
                                    </div>
                                </div>

                                {/* Expanded Detail Panel */}
                                {isExpanded && (
                                    <div 
                                        className="prop-detail-panel"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <mdui-divider></mdui-divider>

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
                                                            <div className="option-card-chips">
                                                                {(Array.isArray(p.tags) ? p.tags : [p.tags]).map(t => (
                                                                    <span key={t} className="context-chip">{t}</span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>

                                        {/* Bottom Action buttons */}
                                        <div className="debug-action-row">
                                            <mdui-button
                                                variant="tonal"
                                                icon="content_copy"
                                                onClick={(e) => handleCopyYAML(p, e)}
                                            >
                                                {copiedId === propId ? "Copied!" : "Copy YAML"}
                                            </mdui-button>
                                            <mdui-button
                                                variant="outlined"
                                                icon={showRawYAML[propId] ? "visibility_off" : "visibility"}
                                                onClick={(e) => toggleRawYAML(propId, e)}
                                            >
                                                {showRawYAML[propId] ? "Hide Source" : "View Source"}
                                            </mdui-button>
                                        </div>

                                        {/* Raw Source Collapsible Code Block */}
                                        {showRawYAML[propId] && (
                                            <div className="debug-code-viewer">
                                                <pre 
                                                    className="debug-code-pre"
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
