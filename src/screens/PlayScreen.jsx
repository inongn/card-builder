import React from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActionCard } from '../components/cards/ActionCard';
import 'mdui/components/button.js';
import 'mdui/components/icon.js';
import { useTranslation } from 'react-i18next';

export const PlayScreen = ({ characterData, onNavigate }) => {
    const { t } = useTranslation();
    return (
        <div className="container play-screen" style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--mdui-color-surface)' }}>
            <div className="header-nav">
                <div className="header-nav-group">
                </div>

                <div className="header-nav-group">
                    <mdui-button variant="text" icon="edit" onClick={() => onNavigate('builder')}>{t('ui.edit')}</mdui-button>
                    <mdui-button variant="text" icon="print" onClick={() => onNavigate('print')}>{t('ui.print')}</mdui-button>
                </div>
            </div>

            <div className="content play-content">
                <CharacterSheet char={characterData} />
                <mdui-card variant="filled" className="aside-content">
                    <mdui-collapse accordion>
                        {characterData.cards.map((card, i) => (
                            <ActionCard key={`${card.id || 'card'}-${i}`} card={card} />
                        ))}
                    </mdui-collapse>
                </mdui-card>
            </div>
        </div>
    );
};
