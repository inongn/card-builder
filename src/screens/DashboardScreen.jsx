import React, { useEffect } from 'react';
import { getAssetUrl } from '../data/artworkData';
import { useI18n } from '../i18n/I18nContext.jsx';

export const DashboardScreen = ({ savedCharacters, handleNewCharacter, handleOpenSaved, handleDeleteSaved, onOpenImport, onOpenExport, onLoadSampleCharacters }) => {
    const { locale, setLocale, t } = useI18n();

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
        const bgSpecies = [charSaved.species, charSaved.background].filter(Boolean).join(' ');
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
                <mdui-top-app-bar-title>{t('ui.dashboard.title')}</mdui-top-app-bar-title>

                <mdui-button
                    variant="text"
                    icon="language"
                    onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
                    style={{ marginRight: '8px' }}
                    title={t('ui.nav.language')}
                >
                    {locale === 'en' ? 'ES' : 'EN'}
                </mdui-button>

                {onOpenImport && (
                    <>
                        <mdui-button
                            variant="outlined"
                            icon="file_download"
                            onClick={onOpenImport}
                            className="mobile-hidden"
                            style={{ marginRight: '8px' }}
                        >
                            {t('ui.dashboard.importCharacter')}
                        </mdui-button>
                        <mdui-button-icon
                            icon="file_download"
                            onClick={onOpenImport}
                            className="desktop-hidden"
                            title={t('ui.dashboard.importCharacter')}
                        ></mdui-button-icon>
                    </>
                )}
                <mdui-button variant="filled" icon="add" onClick={handleNewCharacter} className="mobile-hidden">
                    {t('ui.dashboard.newCharacter')}
                </mdui-button>
            </mdui-top-app-bar>

            <div>
                {savedCharacters.length > 0 ? (
                    <div className="content dashboard-content">
                        {/* MOBILE-ONLY: Widescreen Hero Banner */}
                        {featuredCharacter && (() => {
                            const heroImage = featuredCharacter.image ? getAssetUrl(featuredCharacter.image) : null;
                            const bgSpecies = [featuredCharacter.species, featuredCharacter.background].filter(Boolean).join(' ');
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
                                            fetchPriority="high"
                                            decoding="async"
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
                                <h3 className="dashboard-section-title">{t('ui.dashboard.subtitle')}</h3>
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
                        <p>{t('ui.dashboard.noCharacters')}</p>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <mdui-button onClick={handleNewCharacter}>{t('ui.dashboard.createFirst')}</mdui-button>
                            {onOpenImport && (
                                <mdui-button variant="tonal" icon="file_download" onClick={onOpenImport}>
                                    {t('ui.dashboard.importCharacter')}
                                </mdui-button>
                            )}
                            {onLoadSampleCharacters && (
                                <mdui-button variant="tonal" icon="group_add" onClick={onLoadSampleCharacters}>
                                    {t('ui.dashboard.sampleCharacters')}
                                </mdui-button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <mdui-fab extended icon="add" onClick={handleNewCharacter} className="desktop-hidden dashboard-fab">
                {t('ui.dashboard.newCharacter')}
            </mdui-fab>
        </div>
    );
};