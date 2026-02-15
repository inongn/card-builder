import React from 'react';
import PropertySelectionTree, { PropertySelectionDescription } from '../components/PropertySelectionTree';
import { getAvailableCategories, isBuilderComplete, getCategoryStats } from '../utils/builderUtils.js';
import 'mdui/components/segmented-button-group.js';
import 'mdui/components/segmented-button.js';
import 'mdui/components/button.js';
import 'mdui/components/icon.js';
import 'mdui/components/badge.js';

export const BuilderScreen = ({
    selectedCategory,
    setSelectedCategory,
    propertyTree,
    characterData,
    handleUpdateInput,
    handleFillSlot,
    handleClearSlot,
    handleGetSlotOptions,
    onNavigate,
    onGetProperty,
    onSave,
    builderSource,
    toggleTheme,
    isDarkMode
}) => {
    const availableCategories = React.useMemo(() =>
        getAvailableCategories(propertyTree, characterData),
        [propertyTree, characterData]
    );

    const isComplete = React.useMemo(() =>
        isBuilderComplete(propertyTree, characterData),
        [propertyTree, characterData]
    );

    const categoryStats = React.useMemo(() =>
        getCategoryStats(propertyTree, characterData),
        [propertyTree, characterData]
    );

    React.useEffect(() => {
        if (availableCategories.length > 0 && !availableCategories.includes(selectedCategory)) {
            setSelectedCategory(availableCategories[0]);
        }
    }, [availableCategories, selectedCategory, setSelectedCategory]);

    const orderedSteps = [
        { key: 'origin', icon: 'person', label: 'Origin' },
        { key: 'class', icon: 'school', label: 'Class' },
        { key: 'feats', icon: 'emoji_events', label: 'Feats' },
        { key: 'stats', icon: 'fitness_center', label: 'Abilities' },
        { key: 'skills', icon: 'psychology', label: 'Skills' },
        { key: 'spellcasting', icon: 'auto_fix_high', label: 'Spells' },
        { key: 'equipment', icon: 'shield', label: 'Equipment' },
    ].filter(step => availableCategories.includes(step.key));

    return (
        <div className="container builder-screen">

            <mdui-top-app-bar variant="small">
                <mdui-button-icon icon="arrow_back" onClick={() => onNavigate(builderSource)}></mdui-button-icon>
                <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>
                <mdui-button variant="filled" onClick={onSave} icon="save" disabled={undefined}>Save</mdui-button>
                <mdui-button-icon icon={isDarkMode ? 'light_mode' : 'dark_mode'} onClick={toggleTheme}></mdui-button-icon>
            </mdui-top-app-bar>


            <div className="header-nav">

                {orderedSteps.map(step => {
                    const stats = categoryStats[step.key] || { pending: 0, isComplete: false };
                    return (
                        <mdui-button
                            key={step.key}
                            variant={selectedCategory === step.key ? "tonal" : "text"}
                            onClick={() => setSelectedCategory(step.key)}
                            icon={step.icon}
                            end-icon={stats.isComplete ? "check" : undefined}
                            className="nav-btn"
                        >
                            {step.label}
                            {stats.pending > 0 && (
                                <mdui-badge style={{ marginLeft: '8px' }}>!</mdui-badge>
                            )}
                        </mdui-button>
                    );
                })}
            </div>

            <div className="content builder-content">
                <PropertySelectionTree
                    tree={propertyTree}
                    char={characterData}
                    onUpdateInput={handleUpdateInput}
                    onFillSlot={handleFillSlot}
                    onClearSlot={handleClearSlot}
                    onGetSlotOptions={handleGetSlotOptions}
                    filterCategory={selectedCategory}
                />
                <PropertySelectionDescription
                    tree={propertyTree}
                    char={characterData}
                    filterCategory={selectedCategory}
                    onGetSlotOptions={handleGetSlotOptions}
                    onGetProperty={onGetProperty}
                />
            </div>
        </div>
    );
};
