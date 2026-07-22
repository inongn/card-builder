import React from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActivityCard } from '../components/cards/ActivityCard';
import { StatblockCard } from '../components/cards/StatblockCard';
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
        const coreIds = ['dash', 'disengage', 'hide', 'dodge', 'help', 'ready', 'study', 'search', 'influence'];
        const groups = {
            'core': [],
            'action': [],
            'bonus action': [],
            'reaction': [],
            'free action': [],
            'other': []
        };

        characterData.activities.forEach((activity) => {
            if (activity.tags && activity.tags.includes('restActivity')) {
                return;
            }

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

    const groupedAllies = React.useMemo(() => {
        const statblocks = characterData.statblocks || [];
        const groups = {
            companions: [],
            wildshapes: [],
            summons: []
        };

        statblocks.forEach(sb => {
            const tags = sb.tags || [];
            const hasTag = (tag) => tags.some(t => String(t).toLowerCase() === tag.toLowerCase());

            if (hasTag('primalcompanion') || hasTag('steed') || hasTag('familiar')) {
                groups.companions.push(sb);
            } else if (hasTag('wildshape') || hasTag('wildShape')) {
                groups.wildshapes.push(sb);
            } else {
                groups.summons.push(sb);
            }
        });

        return groups;
    }, [characterData.statblocks]);

    // Define the order and display names for categories
    const activityCategories = [
        { key: 'core', label: 'Core Actions' },
        { key: 'action', label: 'Actions' },
        { key: 'bonus action', label: 'Bonus Actions' },
        { key: 'reaction', label: 'Reactions' },
        { key: 'free action', label: 'Special Actions' },
        { key: 'other', label: 'Other Actions' }
    ];

    const allyCategories = [
        { key: 'companions', label: 'Companions' },
        { key: 'wildshapes', label: 'Wild Shapes' },
        { key: 'summons', label: 'Summons' }
    ];

    const hasStatblocks = (characterData.statblocks || []).length > 0;

    return (
        <div className="container play-screen">
            <mdui-top-app-bar variant="small"
                scroll-behavior='hide'>
                <mdui-button-icon
                    icon="arrow_back" onClick={() => onNavigate('dashboard')}></mdui-button-icon>
                <mdui-top-app-bar-title>{characterData?.meta?.name || 'Aspida'}</mdui-top-app-bar-title>
                <mdui-button-icon icon="edit" onClick={() => onNavigate('builder')} className="mobile-hidden"></mdui-button-icon>
                <mdui-button-icon icon="print" onClick={() => onNavigate('print')} className="mobile-hidden"></mdui-button-icon>
                <mdui-button-icon icon={isDarkMode ? 'light_mode' : 'dark_mode'} onClick={toggleTheme} className="mobile-hidden"></mdui-button-icon>

                <mdui-dropdown className="desktop-hidden">
                    <mdui-button-icon slot="trigger" icon="more_vert"></mdui-button-icon>
                    <mdui-menu>
                        <mdui-menu-item icon="edit" onClick={() => onNavigate('builder')}>Edit</mdui-menu-item>
                        <mdui-menu-item icon="print" onClick={() => onNavigate('print')}>Print</mdui-menu-item>
                    </mdui-menu>
                </mdui-dropdown>
            </mdui-top-app-bar>

            <div className="content play-content">
                <div className="play-content-main">
                    <CharacterSheet char={characterData} ref={mainCardRef} className="main-card" onNavigate={onNavigate} />
                </div>
                <div className="play-content-aside" ref={asideRef}>
                    {activityCategories.map(({ key, label }) => {
                        const activities = groupedActivities[key];
                        if (activities.length === 0) return null;
                        return (
                            <div key={key} className="aside-card-group">
                                <div className="title-primary">{label}</div>
                                <mdui-collapse accordion>
                                    {activities.map((item, i) => (
                                        <ActivityCard key={`${item.id || 'activity'}-${i}`} activity={item} char={characterData} />
                                    ))}
                                </mdui-collapse>
                            </div>
                        );
                    })}

                    {hasStatblocks && (
                        <>
                            <div className="section-title">Allies & Forms</div>
                            {allyCategories.map(({ key, label }) => {
                                const allies = groupedAllies[key];
                                if (allies.length === 0) return null;
                                return (
                                    <div key={key} className="aside-card-group">
                                        <div className="title-primary">{label}</div>
                                        <mdui-collapse accordion>
                                            {allies.map((item, i) => (
                                                <StatblockCard key={`${item.id || 'statblock'}-${i}`} statblock={item} />
                                            ))}
                                        </mdui-collapse>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
