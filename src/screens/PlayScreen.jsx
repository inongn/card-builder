import React from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActivityCard } from '../components/cards/ActivityCard';
import 'mdui/components/button.js';
import 'mdui/components/icon.js';

export const PlayScreen = ({ characterData, onNavigate, toggleTheme, isDarkMode }) => {
    const mainCardRef = React.useRef(null);
    const asideRef = React.useRef(null);

    // Dynamically set padding-bottom on .play-content-aside based on .main-card height
    React.useEffect(() => {
        const mainCardEl = mainCardRef.current;
        const asideEl = asideRef.current;
        if (!mainCardEl || !asideEl) return;

        const mql = window.matchMedia('(min-width: 891px)');

        const updatePadding = () => {
            if (mql.matches) {
                const mainCardHeight = mainCardEl.getBoundingClientRect().height;
                asideEl.style.paddingBottom = `calc(100vh - 64px - ${mainCardHeight}px)`;
            } else {
                asideEl.style.paddingBottom = '';
            }
        };

        const observer = new ResizeObserver(updatePadding);
        observer.observe(mainCardEl);
        mql.addEventListener('change', updatePadding);
        updatePadding();

        return () => {
            observer.disconnect();
            mql.removeEventListener('change', updatePadding);
        };
    }, []);

    // Group activities by their 'time' property
    const groupedActivities = React.useMemo(() => {
        const coreIds = ['dash', 'disengage', 'hide', 'dodge', 'influence', 'study', 'search'];
        const groups = {
            'core': [],
            'action': [],
            'bonus action': [],
            'reaction': [],
            'free action': [],
            'other': []
        };

        characterData.activities.forEach((activity) => {
            const id = (activity.id || '').toLowerCase();
            if (coreIds.includes(id)) {
                groups['core'].push(activity);
                return;
            }

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
        { key: 'core', label: 'Core' },
        { key: 'action', label: 'Actions' },
        { key: 'bonus action', label: 'Bonus Actions' },
        { key: 'reaction', label: 'Reactions' },
        { key: 'free action', label: 'Special' },
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
                <div className="play-content-main">
                    <CharacterSheet char={characterData} ref={mainCardRef} className="main-card" onNavigate={onNavigate} />
                </div>
                <div className="play-content-aside" ref={asideRef}>
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
                                        <ActivityCard key={`${item.id || 'activity'}-${i}`} activity={item} char={characterData} />
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
