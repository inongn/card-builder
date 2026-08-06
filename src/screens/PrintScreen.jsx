import React, { useState, useEffect, useRef } from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActivityCard } from '../components/cards/ActivityCard';
import { StatblockCard } from '../components/cards/StatblockCard';
import 'mdui/components/button.js';

export const PrintScreen = ({ char, onNavigate }) => {
    if (!char) return null;

    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.clientWidth;
            // 11in in standard CSS pixels is 1056px (96px/inch)
            const targetWidth = 1056;
            if (containerWidth < targetWidth && containerWidth > 0) {
                setScale(containerWidth / targetWidth);
            } else {
                setScale(1);
            }
        };

        updateScale();
        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const activities = (char.activities || []).filter(act => !act.tags || !act.tags.includes('restActivity'));
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
            </mdui-top-app-bar>


            <div className="header-nav">
            </div>

            <div className="content print-content print-mode" ref={containerRef}>
                <div className="print-page-wrapper">
                    <div className="print-page first-page" style={{ transform: scale < 1 ? `scale(${scale})` : undefined }}>
                        <div className="print-grid">
                            <div className="main-card-print-slot">
                                <CharacterSheet char={char} onNavigate={onNavigate} variant="static" interactive={false} />
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
                </div>

                {chunks.map((chunk, pageIdx) => (
                    <div key={pageIdx} className="print-page-wrapper">
                        <div className="print-page" style={{ transform: scale < 1 ? `scale(${scale})` : undefined }}>
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
                    </div>
                ))}
            </div>
        </div>
    );
};
