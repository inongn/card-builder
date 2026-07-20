import React, { useEffect } from 'react';

export const DashboardScreen = ({ savedCharacters, handleNewCharacter, handleOpenSaved, handleDeleteSaved, toggleTheme, isDarkMode }) => {
    useEffect(() => {
        const savedScroll = sessionStorage.getItem('dashboard_scroll_position');
        if (savedScroll) {
            const scrollPos = parseInt(savedScroll, 10);
            const restore = () => {
                window.scrollTo(0, scrollPos);
                const mainLayout = document.querySelector('.app-main-layout');
                if (mainLayout) {
                    mainLayout.scrollTop = scrollPos;
                }
            };
            restore();
            const timer = setTimeout(restore, 50);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const mainLayout = document.querySelector('.app-main-layout');
            const scrollTop = window.scrollY || (mainLayout ? mainLayout.scrollTop : 0);
            sessionStorage.setItem('dashboard_scroll_position', scrollTop.toString());
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        const mainLayout = document.querySelector('.app-main-layout');
        if (mainLayout) {
            mainLayout.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (mainLayout) {
                mainLayout.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className="container">

            <mdui-top-app-bar variant="small">
                <mdui-button-icon icon="shield_moon"></mdui-button-icon>
                <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>
                <mdui-button variant="filled" icon="add" onClick={handleNewCharacter}>New Character</mdui-button>
                <mdui-button-icon icon={isDarkMode ? 'light_mode' : 'dark_mode'} onClick={toggleTheme}></mdui-button-icon>
            </mdui-top-app-bar>


            <div className="header-nav">
                <div className="header-nav-group">
                </div>
                <div className="header-nav-group">
                </div>
            </div>
            <div className="content dashboard-content">
                {savedCharacters.map((charSaved) => (
                    <mdui-card key={charSaved.id} className="hero-card" variant="outlined" onClick={() => handleOpenSaved(charSaved.id, charSaved.recipe, 'play')}>
                        <div className="hero-card-content">
                            <div className="hero-name">{charSaved.name}</div>
                            <div className="hero-details">
                                Lv. {charSaved.level || 1} {charSaved.species} {charSaved.sub} {charSaved.class || 'Unknown Class'}
                            </div>
                            <div className="hero-actions">
                                <mdui-button-icon icon="delete" onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteSaved(charSaved.id);
                                }}></mdui-button-icon>
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
