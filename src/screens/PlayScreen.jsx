import React from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActivityCard } from '../components/cards/ActivityCard';
import 'mdui/components/button.js';
import 'mdui/components/icon.js';

export const PlayScreen = ({ characterData, onNavigate, toggleTheme, isDarkMode }) => {
    // Group activities by their 'time' property
    const groupedActivities = React.useMemo(() => {
        const groups = {
            'action': [],
            'bonus action': [],
            'reaction': [],
            'free action': [],
            'other': []
        };

        characterData.activities.forEach((activity) => {
            const time = activity.time?.toLowerCase() || 'other';

            // Normalize the time value to match our categories
            if (groups[time]) {
                groups[time].push(activity);
            } else {
                groups['other'].push(activity);
            }
        });

        return groups;
    }, [characterData.activities]);

    // Define the order and display names for categories
    const categories = [
        { key: 'action', label: 'Actions' },
        { key: 'bonus action', label: 'Bonus Actions' },
        { key: 'reaction', label: 'Reactions' },
        { key: 'free action', label: 'Free Actions' },
        { key: 'other', label: 'Other' }
    ];

    return (


        <div className="container play-screen">


            <mdui-top-app-bar variant="small">
                <mdui-button-icon icon="arrow_back" onClick={() => onNavigate('dashboard')}></mdui-button-icon>
                <mdui-top-app-bar-title>{characterData?.meta?.name || 'Aspida'}</mdui-top-app-bar-title>
                <mdui-button-icon icon="edit" onClick={() => onNavigate('builder')}></mdui-button-icon>
                <mdui-button-icon icon="print" onClick={() => onNavigate('print')}></mdui-button-icon>
                <mdui-button-icon icon={isDarkMode ? 'light_mode' : 'dark_mode'} onClick={toggleTheme}></mdui-button-icon>
            </mdui-top-app-bar>


            <div className="content play-content">
                <CharacterSheet char={characterData} className="main-card" onNavigate={onNavigate} />
                <div className="aside-card">
                    {categories.map(({ key, label }) => {
                        const activities = groupedActivities[key];

                        // Only render the category if it has activities
                        if (activities.length === 0) return null;

                        return (
                            <div key={key} className="aside-card-group">
                                <div className="title-primary">
                                    {label}
                                </div>
                                <mdui-collapse accordion>
                                    {activities.map((item, i) => (
                                        <ActivityCard key={`${item.id || 'activity'}-${i}`} activity={item} />
                                    ))}
                                </mdui-collapse>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
