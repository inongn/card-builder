import React from 'react';
import { useTranslation } from 'react-i18next';

export const DashboardScreen = ({ savedCharacters, handleNewCharacter, handleOpenSaved, handleDeleteSaved }) => {
    const { t } = useTranslation();
    return (
        <div className="container">
            <div className="header-nav">
                <div className="header-nav-group">
                </div>
                <div className="header-nav-group">
                    <mdui-button variant="filled" icon="add" onClick={handleNewCharacter}>{t('ui.newCharacter')}</mdui-button>
                </div>
            </div>
            <div className="content dashboard-content">
                {savedCharacters.map((charSaved) => (
                    <mdui-card key={charSaved.id} className="hero-card" variant="outlined">
                        <div className="hero-card-content">
                            <div className="hero-name">{charSaved.name}</div>
                            <div className="hero-details">
                                {charSaved.recipe.class || 'Unknown Class'} • Level {charSaved.recipe.level || 1}
                            </div>
                            <div className="hero-actions">
                                <mdui-button variant="tonal" icon="play_arrow" onClick={() => handleOpenSaved(charSaved.id, charSaved.recipe, 'play')}>{t('ui.play')}</mdui-button>
                                <mdui-button variant="tonal" icon="edit" onClick={() => handleOpenSaved(charSaved.id, charSaved.recipe, 'builder')}>{t('ui.edit')}</mdui-button>
                                <mdui-button-icon icon="print" onClick={() => handleOpenSaved(charSaved.id, charSaved.recipe, 'print')}></mdui-button-icon>
                                <mdui-button-icon icon="delete" onClick={() => handleDeleteSaved(charSaved.id)}></mdui-button-icon>
                            </div>
                        </div>
                    </mdui-card>
                ))}
                {savedCharacters.length === 0 && (
                    <div className="empty-state">
                        <mdui-icon name="person_add" style={{ fontSize: '4rem' }}></mdui-icon>
                        <p>{t('ui.emptyState')}</p>
                        <mdui-button onClick={handleNewCharacter}>{t('ui.createFirst')}</mdui-button>
                    </div>
                )}
            </div>
        </div>
    );
};
