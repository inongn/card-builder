import React from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActivityCard } from '../components/cards/ActivityCard';
import { StatblockCard } from '../components/cards/StatblockCard';
import 'mdui/components/button.js';

export const PrintScreen = ({ char, onNavigate, toggleTheme, isDarkMode }) => {
    if (!char) return null;

    const activities = char.activities || [];
    const statblocks = (char.statblocks || []).map(sb => ({ ...sb, _isStatblock: true }));
    const allCards = [...activities, ...statblocks];

    const page1Cards = allCards.slice(0, 2);
    const remainingCards = allCards.slice(2);

    const chunks = [];
    for (let i = 0; i < remainingCards.length; i += 6) {
        chunks.push(remainingCards.slice(i, i + 6));
    }

    return (
        <div className="container print-screen">

            <mdui-top-app-bar scroll-behavior="hide" variant="small">
                <mdui-button-icon icon="arrow_back" onClick={() => onNavigate('play')}></mdui-button-icon>
                <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>
                <mdui-button variant="filled" icon="print" onClick={() => window.print()}>Print</mdui-button>
                <mdui-button-icon icon={isDarkMode ? 'light_mode' : 'dark_mode'} onClick={toggleTheme}></mdui-button-icon>
            </mdui-top-app-bar>


            <div className="header-nav">
            </div>

            <div className="content print-content print-mode">
                <div className="print-page first-page">
                    <div className="print-grid">
                        <div className="main-card-print-slot">
                            <CharacterSheet char={char} onNavigate={onNavigate} />
                        </div>
                        {page1Cards.map((card, idx) => (
                            <div key={idx} className="action-card-print-slot">
                                {card._isStatblock ?
                                    <StatblockCard statblock={card} variant="static" /> :
                                    <ActivityCard activity={card} variant="static" char={char} />
                                }
                            </div>
                        ))}
                    </div>
                </div>

                {chunks.map((chunk, pageIdx) => (
                    <div key={pageIdx} className="print-page">
                        <div className="print-grid">
                            {chunk.map((card, cardIdx) => (
                                <div key={cardIdx} className="action-card-print-slot">
                                    {card._isStatblock ?
                                        <StatblockCard statblock={card} variant="static" /> :
                                        <ActivityCard activity={card} variant="static" char={char} />
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
