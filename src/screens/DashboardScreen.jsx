import React, { useEffect } from 'react';
import { getAssetUrl } from '../data/artworkData';
import { useLocale } from '../i18n';
import { localizeSubclass, formatClassWithSubclass } from '../utils/sheetUtils';
import 'mdui/components/dropdown.js';
import 'mdui/components/menu.js';
import 'mdui/components/menu-item.js';

export const DashboardScreen = ({
    savedCharacters,
    handleNewCharacter,
    handleOpenSaved,
    handleDeleteSaved,
    onOpenImport,
    onOpenExport,
    onLoadSampleCharacters,
    toggleTheme,
    isDarkMode
}) => {
    const { t, localize, lang, toggleLang } = useLocale();

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
        const displaySpecies = (charSaved.species && localize(charSaved.speciesId || charSaved.species.toLowerCase(), 'name', charSaved.species)) || charSaved.species;
        const displayBg = (charSaved.background && localize(charSaved.backgroundId || charSaved.background.toLowerCase(), 'name', charSaved.background)) || charSaved.background;
        const displayClass = (charSaved.class && localize(charSaved.classId || charSaved.class.toLowerCase(), 'name', charSaved.class)) || charSaved.class;
        const displaySub = localizeSubclass(charSaved.sub, charSaved.subId, localize, lang);

        const bgSpecies = [displaySpecies, displayBg].filter(Boolean).join(' ');
        const classStr = formatClassWithSubclass(displayClass, displaySub, lang);
        const levelClass = [
            `${t('characterSheet.level')} ${charSaved.level || 1}`,
            classStr
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
                variant="tonal"
            >
                <div className="dashboard-hero-card__media">
                    {heroImage ? (
                        <img
                            src={heroImage}
                            alt={charSaved.name}
                            className="dashboard-hero-card__img"
                            loading="lazy"
                            decoding="async"
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
                <mdui-top-app-bar-title>{t('dashboard.appTitle')}</mdui-top-app-bar-title>

                {/* Settings Panel Dropdown */}
                <mdui-dropdown placement="bottom-end">
                    <mdui-button-icon
                        slot="trigger"
                        icon="more_vert"
                        style={{ marginRight: '8px' }}
                    ></mdui-button-icon>
                    <mdui-menu>
                        {onOpenImport && (
                            <mdui-menu-item icon="file_download" onClick={onOpenImport}>
                                {t('dashboard.importRecipe')}
                            </mdui-menu-item>
                        )}
                        {toggleTheme && (
                            <mdui-menu-item icon={isDarkMode ? 'light_mode' : 'dark_mode'} onClick={toggleTheme}>
                                {isDarkMode ? t('play.lightMode') : t('play.darkMode')}
                            </mdui-menu-item>
                        )}
                        <mdui-menu-item icon="language" onClick={toggleLang}>
                            {t('language.switchTo')}
                        </mdui-menu-item>
                    </mdui-menu>
                </mdui-dropdown>

                <mdui-button variant="filled" icon="add" onClick={handleNewCharacter} className="mobile-hidden">
                    {t('dashboard.newCharacter')}
                </mdui-button>
            </mdui-top-app-bar>

            <div>
                {savedCharacters.length > 0 ? (
                    <div className="content dashboard-content">
                        {/* MOBILE-ONLY: Widescreen Hero Banner */}
                        {featuredCharacter && (() => {
                            const heroImage = featuredCharacter.image ? getAssetUrl(featuredCharacter.image) : null;
                            const displaySpecies = (featuredCharacter.species && localize(featuredCharacter.speciesId || featuredCharacter.species.toLowerCase(), 'name', featuredCharacter.species)) || featuredCharacter.species;
                            const displayBg = (featuredCharacter.background && localize(featuredCharacter.backgroundId || featuredCharacter.background.toLowerCase(), 'name', featuredCharacter.background)) || featuredCharacter.background;
                            const displayClass = (featuredCharacter.class && localize(featuredCharacter.classId || featuredCharacter.class.toLowerCase(), 'name', featuredCharacter.class)) || featuredCharacter.class;
                            const displaySub = localizeSubclass(featuredCharacter.sub, featuredCharacter.subId, localize, lang);

                            const bgSpecies = [displaySpecies, displayBg].filter(Boolean).join(' ');
                            const classStr = formatClassWithSubclass(displayClass, displaySub, lang);
                            const levelClass = [
                                `${t('characterSheet.level')} ${featuredCharacter.level || 1}`,
                                classStr
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
                                            fetchPriority="high"
                                            decoding="async"
                                        />
                                    ) : (
                                        <div className="featured-hero__fallback">{initials}</div>
                                    )}

                                    <div className="featured-hero__overlay" />
                                    <div className="featured-hero__badge">{t('dashboard.lastPlayed')}</div>

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
                                <h3 className="dashboard-section-title">{t('dashboard.otherCharacters')}</h3>
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
                        <p>{t('dashboard.noCharacters')}</p>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <mdui-button onClick={handleNewCharacter}>{t('dashboard.createFirst')}</mdui-button>
                            {onOpenImport && (
                                <mdui-button variant="tonal" icon="file_download" onClick={onOpenImport}>
                                    {t('dashboard.importRecipe')}
                                </mdui-button>
                            )}
                            {onLoadSampleCharacters && (
                                <mdui-button variant="tonal" icon="group_add" onClick={onLoadSampleCharacters}>
                                    {t('dashboard.loadSamples')}
                                </mdui-button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <mdui-fab extended icon="add" onClick={handleNewCharacter} className="desktop-hidden dashboard-fab">
                {t('dashboard.newCharacter')}
            </mdui-fab>
        </div>
    );
};