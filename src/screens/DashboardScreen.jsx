import React from 'react';

export const DashboardScreen = ({ savedCharacters, handleNewCharacter, handleOpenSaved, handleDeleteSaved, toggleTheme, isDarkMode, onNavigate }) => {
    return (


        <div className="container">

            <mdui-top-app-bar variant="small">
                <mdui-button-icon icon="menu" onClick={() => onNavigate('dashboard')}></mdui-button-icon>
                <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>
                <mdui-button-icon icon={isDarkMode ? 'light_mode' : 'dark_mode'} onClick={toggleTheme}></mdui-button-icon>
            </mdui-top-app-bar>


            <div className="header-nav">
                <div className="header-nav-group">
                </div>
                <div className="header-nav-group">
                    <mdui-button variant="filled" icon="add" onClick={handleNewCharacter}>New Character</mdui-button>
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
                                <mdui-button variant="tonal" icon="play_arrow" onClick={() => handleOpenSaved(charSaved.id, charSaved.recipe, 'play')}>Play</mdui-button>
                                <mdui-button variant="tonal" icon="edit" onClick={() => handleOpenSaved(charSaved.id, charSaved.recipe, 'builder')}>Edit</mdui-button>
                                <mdui-button-icon icon="print" onClick={() => handleOpenSaved(charSaved.id, charSaved.recipe, 'print')}></mdui-button-icon>
                                <mdui-button-icon icon="delete" onClick={() => handleDeleteSaved(charSaved.id)}></mdui-button-icon>
                            </div>
                        </div>
                    </mdui-card>
                ))}
                {savedCharacters.length === 0 && (
                    <div className="empty-state">
                        <mdui-icon name="person_add" style={{ fontSize: '4rem' }}></mdui-icon>
                        <p>No characters found.</p>
                        <mdui-button onClick={handleNewCharacter}>Create your first character</mdui-button>
                    </div>
                )}
            </div>
        </div>
    );
};
