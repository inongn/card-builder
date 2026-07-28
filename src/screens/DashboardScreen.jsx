import React, { useEffect } from 'react';
import { getAssetUrl } from '../data/artworkData';

export const DashboardScreen = ({ savedCharacters, handleNewCharacter, handleOpenSaved, handleDeleteSaved }) => {
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

            <mdui-top-app-bar variant="small" scroll-behavior="hide">
                <mdui-button-icon icon="shield_moon"></mdui-button-icon>
                <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>
                <mdui-button variant="filled" icon="add" onClick={handleNewCharacter} className="mobile-hidden">New Character</mdui-button>
            </mdui-top-app-bar>

            <div >
                {savedCharacters.length > 0 ? (
                    <mdui-list className="content dashboard-content">
                        {savedCharacters.map((charSaved) => {
                            const heroImage = charSaved.image ? getAssetUrl(charSaved.image) : null;
                            const subheadParts = [
                                `Level ${charSaved.level || 1}`,
                                charSaved.species,
                                charSaved.sub,
                                charSaved.class || 'Unknown Class'
                            ].filter(Boolean);

                            const initials = charSaved.name
                                ? charSaved.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                                : 'A';

                            return (
                                <mdui-list-item
                                    key={charSaved.id}
                                    headline={charSaved.name}
                                    description={subheadParts.join(' • ')}
                                    onClick={() => handleOpenSaved(charSaved.id, charSaved.recipe, 'play')}
                                    className='dashboard-list-item'
                                >
                                    <div slot="icon" className="dashboard-portrait">
                                        {heroImage ? (
                                            <img
                                                src={heroImage}
                                                alt={charSaved.name}
                                                className="dashboard-portrait__img"
                                            />
                                        ) : (
                                            <span className="dashboard-portrait__initials">{initials}</span>
                                        )}
                                    </div>

                                    <mdui-button-icon
                                        slot="end-icon"
                                        icon="delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteSaved(charSaved.id);
                                        }}
                                    ></mdui-button-icon>
                                </mdui-list-item>
                            );
                        })}
                    </mdui-list>
                ) : (
                    <div className="empty-state">
                        <mdui-icon name="person_add" class="icon-large"></mdui-icon>
                        <p>No characters found.</p>
                        <mdui-button onClick={handleNewCharacter}>Create your first character</mdui-button>
                    </div>
                )}
            </div>

            <mdui-fab extended icon="add" onClick={handleNewCharacter} className="desktop-hidden dashboard-fab">
                New Character
            </mdui-fab>
        </div>
    );
};
