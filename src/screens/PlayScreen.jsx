import React from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActivityCard } from '../components/cards/ActivityCard';
import 'mdui/components/button.js';
import 'mdui/components/icon.js';

export const PlayScreen = ({ characterData, onNavigate }) => {
    return (
        <div className="container play-screen" style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--mdui-color-surface)' }}>
            <div className="header-nav">
                <div className="header-nav-group">
                </div>

                <div className="header-nav-group">
                    <mdui-button variant="text" icon="edit" onClick={() => onNavigate('builder')}>Edit</mdui-button>
                    <mdui-button variant="text" icon="print" onClick={() => onNavigate('print')}>Print</mdui-button>
                </div>
            </div>

            <div className="content play-content">
                <CharacterSheet char={characterData} />
                <mdui-card variant="filled" className="aside-content">
                    <mdui-collapse accordion>
                        {characterData.activities.map((item, i) => (
                            <ActivityCard key={`${item.id || 'activity'}-${i}`} activity={item} />
                        ))}
                    </mdui-collapse>
                </mdui-card>
            </div>
        </div>
    );
};
