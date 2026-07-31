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

    // Helper function to render a hero card
    const renderHeroCard = (charSaved) => {
        const heroImage = charSaved.image ? getAssetUrl(charSaved.image) : null;
        const bgSpecies = [charSaved.background, charSaved.species].filter(Boolean).join(' ');
        const levelClass = [
            `Level ${charSaved.level || 1}`,
            charSaved.sub,
            charSaved.class
        ].filter(Boolean).join(' ');

        const initials = charSaved.name
            ? charSaved.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
            : 'A';

        return (
            <mdui-card
                key={charSaved.id}
                clickable
                onClick={() => handleOpenSaved(charSaved.id, charSaved.recipe, 'play')}
                className="dashboard-hero-card"
            >
                <div className="dashboard-hero-card__media">
                    {heroImage ? (
                        <img
                            src={heroImage}
                            alt={charSaved.name}
                            className="dashboard-hero-card__img"
                        />
                    ) : (
                        <div className="dashboard-hero-card__fallback">{initials}</div>
                    )}
                </div>
                <div className="dashboard-hero-card__content">
                    <h3 className="dashboard-hero-card__title">{charSaved.name}</h3>
                    {levelClass && <p className="dashboard-hero-card__subtitle dashboard-hero-card__subtitle--primary">{levelClass}</p>}
                    {bgSpecies && <p className="dashboard-hero-card__subtitle dashboard-hero-card__subtitle--secondary">{bgSpecies}</p>}
                </div>
            </mdui-card>
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
                            const bgSpecies = [featuredCharacter.background, featuredCharacter.species].filter(Boolean).join(' ');
                            const levelClass = [
                                `Level ${featuredCharacter.level || 1}`,
                                featuredCharacter.sub,
                                featuredCharacter.class
                            ].filter(Boolean).join(' ');

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
                                            {levelClass && <p className="featured-hero__subtitle featured-hero__subtitle--primary">{levelClass}</p>}
                                            {bgSpecies && <p className="featured-hero__subtitle featured-hero__subtitle--secondary">{bgSpecies}</p>}
                                        </div>

                                    </div>
                                </mdui-card>
                            );
                        })()}

                        {/* MOBILE-ONLY: List for remaining characters */}
                        {remainingCharacters.length > 0 && (
                            <div className="desktop-hidden">
                                <h3 className="dashboard-section-title">Other Characters</h3>
                                <div className="other-characters-list">
                                    {remainingCharacters.map(renderHeroCard)}
                                </div>
                            </div>
                        )}

                        {/* DESKTOP-ONLY: Standard grid for ALL characters */}
                        <div className="mobile-hidden other-characters-list">
                            {savedCharacters.map(renderHeroCard)}
                        </div>
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