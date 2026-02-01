import React from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActionCard } from '../components/cards/ActionCard';
import 'mdui/components/button.js';

export const PrintScreen = ({ char, onNavigate }) => {
    if (!char) return null;

    const actionCards = char.cards || [];
    const page1Cards = actionCards.slice(0, 2);
    const remainingCards = actionCards.slice(2);

    const chunks = [];
    for (let i = 0; i < remainingCards.length; i += 6) {
        chunks.push(remainingCards.slice(i, i + 6));
    }

    return (
        <div className="container print-screen">
            <div className="header-nav">
                <div className="header-nav-group">
                </div>
                <div className="header-nav-group">
                    <mdui-button variant="text" icon="edit" onClick={() => onNavigate('builder')}>Edit</mdui-button>
                    <mdui-button variant="filled" icon="print" onClick={() => window.print()}>Print Now</mdui-button>
                </div>
            </div>

            <div className="content print-content print-mode">
                <div className="print-page first-page">
                    <div className="print-grid">
                        <div className="main-card-print-slot">
                            <CharacterSheet char={char} />
                        </div>
                        {page1Cards.map((card, idx) => (
                            <div key={idx} className="action-card-print-slot">
                                <ActionCard card={card} variant="static" />
                            </div>
                        ))}
                    </div>
                </div>

                {chunks.map((chunk, pageIdx) => (
                    <div key={pageIdx} className="print-page">
                        <div className="print-grid">
                            {chunk.map((card, cardIdx) => (
                                <div key={cardIdx} className="action-card-print-slot">
                                    <ActionCard card={card} variant="static" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
