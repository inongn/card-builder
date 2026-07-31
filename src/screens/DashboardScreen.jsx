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

    const featuredCharacter = savedCharacters.length > 0 ? savedCharacters[0] : null;
    const remainingCharacters = savedCharacters.length > 1 ? savedCharacters.slice(1) : [];

    // Helper function to render a list item
    const renderListItem = (charSaved) => {
        const heroImage = charSaved.image ? getAssetUrl(charSaved.image) : null;
        const subheadParts = [
            `Level ${charSaved.level || 1}`,
            [charSaved.background, charSaved.species].filter(Boolean).join(' '),
            `${charSaved.sub || ''} ${charSaved.class || ''}`.trim(),
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
                className="dashboard-list-item"
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
            </mdui-list-item>
        );
    };

    return (
        <div className="container">
            <mdui-top-app-bar variant="small" scroll-behavior="hide">
                <mdui-button-icon icon="shield_moon"></mdui-button-icon>
                <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>
                <mdui-button variant="filled" icon="add" onClick={handleNewCharacter} className="mobile-hidden">
                    New Character
                </mdui-button>
            </mdui-top-app-bar>

            <div>
                {savedCharacters.length > 0 ? (
                    <div className="content dashboard-content">
                        {/* MOBILE-ONLY: Widescreen Hero Banner */}
                        {featuredCharacter && (() => {
                            const heroImage = featuredCharacter.image ? getAssetUrl(featuredCharacter.image) : null;
                            const subheadParts = [
                                `Level ${featuredCharacter.level || 1}`,
                                [featuredCharacter.background, featuredCharacter.species].filter(Boolean).join(' '),
                                `${featuredCharacter.sub || ''} ${featuredCharacter.class || ''}`.trim(),
                            ].filter(Boolean);

                            const initials = featuredCharacter.name
                                ? featuredCharacter.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                                : 'A';

                            return (
                                <mdui-card
                                    className="featured-hero-banner desktop-hidden"
                                    clickable
                                    onClick={() => handleOpenSaved(featuredCharacter.id, featuredCharacter.recipe, 'play')}
                                >
                                    {heroImage ? (
                                        <img
                                            src={heroImage}
                                            alt={featuredCharacter.name}
                                            className="featured-hero__img"
                                        />
                                    ) : (
                                        <div className="featured-hero__fallback">{initials}</div>
                                    )}

                                    <div className="featured-hero__overlay" />
                                    <div className="featured-hero__badge">Last Played</div>

                                    <div className="featured-hero__details">
                                        <div className="featured-hero__text-group">
                                            <h2 className="featured-hero__title">{featuredCharacter.name}</h2>
                                            <p className="featured-hero__subtitle">{subheadParts.join(' • ')}</p>
                                        </div>

                                    </div>
                                </mdui-card>
                            );
                        })()}

                        {/* MOBILE-ONLY: List for remaining characters */}
                        {remainingCharacters.length > 0 && (
                            <div className="desktop-hidden">
                                <h3 className="dashboard-section-title">Other Characters</h3>
                                <mdui-list className="other-characters-list">
                                    {remainingCharacters.map(renderListItem)}
                                </mdui-list>
                            </div>
                        )}

                        {/* DESKTOP-ONLY: Standard list for ALL characters */}
                        <mdui-list className="mobile-hidden other-characters-list">
                            {savedCharacters.map(renderListItem)}
                        </mdui-list>
                    </div>
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