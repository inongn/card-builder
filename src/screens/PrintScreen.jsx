import React, { useState, useEffect, useRef } from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActivityCard } from '../components/cards/ActivityCard';
import { StatblockCard } from '../components/cards/StatblockCard';
import 'mdui/components/button.js';
import 'mdui/components/button-icon.js';
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/checkbox.js';

const CORE_ACTIVITY_IDS = new Set([
    'dash', 'disengage', 'dodge', 'help', 'hide', 'influence',
    'longRest', 'opportunityAttack', 'ready', 'search', 'shortRest', 'study'
]);

export const PrintScreen = ({ char, onNavigate }) => {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [gridCols, setGridCols] = useState(3);
    const [gridRows, setGridRows] = useState(2);
    const [fontWidth, setFontWidth] = useState(100);
    const [hideCoreActivities, setHideCoreActivities] = useState(false);
    const [orientation, setOrientation] = useState('landscape');

    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.clientWidth;
            // 11in in standard CSS pixels is 1056px, 8.5in is 816px (96px/inch)
            const targetWidth = orientation === 'portrait' ? 816 : 1056;
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
    }, [orientation]);

    if (!char) return null;

    const activities = (char.activities || []).filter(act => {
        if (act.tags && act.tags.includes('restActivity')) return false;
        if (hideCoreActivities) {
            const isWeapon = (act.id && String(act.id).toLowerCase().includes('weaponattack')) ||
                (act.tags && act.tags.some(t => String(t).toLowerCase() === 'weaponattack'));
            if (isWeapon) return true;
            if (act.id && CORE_ACTIVITY_IDS.has(act.id)) return false;
            if (act.tags && act.tags.includes('coreActivity')) return false;
        }
        return true;
    });
    const statblocks = (char.statblocks || []).map(sb => ({ ...sb, _isStatblock: true }));
    const allCards = [...activities, ...statblocks];

    const mainColsSpan = Math.min(2, gridCols);
    const mainRowsSpan = Math.min(2, gridRows);
    const page1Capacity = Math.max(0, (gridCols * gridRows) - (mainColsSpan * mainRowsSpan));
    const cardsPerPage = gridCols * gridRows;

    const page1Cards = allCards.slice(0, page1Capacity);
    const remainingCards = allCards.slice(page1Capacity);

    const chunks = [];
    for (let i = 0; i < remainingCards.length; i += cardsPerPage) {
        chunks.push(remainingCards.slice(i, i + cardsPerPage));
    }

    const fontWidthStyle = {
        fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
        fontStretch: `${fontWidth}%`,
        fontVariationSettings: `'wdth' ${fontWidth}`
    };

    return (
        <div className="container print-screen">
            <style>{`
                @media print {
                    @page {
                        size: letter ${orientation};
                        margin: 0;
                    }
                }
            `}</style>

            <mdui-top-app-bar scroll-behavior="hide" variant="small" class="hide-on-print">
                <mdui-button-icon icon="arrow_back" onClick={() => onNavigate('play')}></mdui-button-icon>
                <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginRight: '16px' }}>
                    <mdui-select
                        label="Orientation"
                        value={orientation}
                        style={{ width: '130px' }}
                        onchange={(e) => setOrientation(e.target.value)}
                        onChange={(e) => setOrientation(e.target.value)}
                    >
                        <mdui-menu-item value="landscape">Landscape</mdui-menu-item>
                        <mdui-menu-item value="portrait">Portrait</mdui-menu-item>
                    </mdui-select>

                    <mdui-select
                        label="Columns"
                        value={gridCols}
                        style={{ width: '110px' }}
                        onchange={(e) => setGridCols(Number(e.target.value))}
                        onChange={(e) => setGridCols(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                            <mdui-menu-item key={num} value={num} onClick={() => setGridCols(num)}>
                                {num} {num === 1 ? 'Col' : 'Cols'}
                            </mdui-menu-item>
                        ))}
                    </mdui-select>

                    <mdui-select
                        label="Rows"
                        value={gridRows}
                        style={{ width: '110px' }}
                        onchange={(e) => setGridRows(Number(e.target.value))}
                        onChange={(e) => setGridRows(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                            <mdui-menu-item key={num} value={num} onClick={() => setGridRows(num)}>
                                {num} {num === 1 ? 'Row' : 'Rows'}
                            </mdui-menu-item>
                        ))}
                    </mdui-select>

                    <mdui-select
                        label="Font Width"
                        value={fontWidth}
                        style={{ width: '150px' }}
                        onchange={(e) => setFontWidth(Number(e.target.value))}
                        onChange={(e) => setFontWidth(Number(e.target.value))}
                    >
                        {[
                            { val: 50, label: '50%' },
                            { val: 75, label: '75%' },
                            { val: 85, label: '85%' },
                            { val: 100, label: '100%' },
                            { val: 115, label: '115%' },
                            { val: 125, label: '125%' },
                            { val: 150, label: '150%' }
                        ].map(opt => (
                            <mdui-menu-item key={opt.val} value={opt.val} onClick={() => setFontWidth(opt.val)}>
                                {opt.label}
                            </mdui-menu-item>
                        ))}
                    </mdui-select>

                    <mdui-checkbox
                        checked={hideCoreActivities}
                        onchange={(e) => setHideCoreActivities(e.target.checked)}
                        onChange={(e) => setHideCoreActivities(e.target.checked)}
                    >
                        Hide Core Actions
                    </mdui-checkbox>
                </div>

                <mdui-button variant="filled" icon="print" onClick={() => window.print()}>Print</mdui-button>
            </mdui-top-app-bar>

            <div className={`content print-content print-mode print-${orientation}`} ref={containerRef} style={fontWidthStyle}>
                <div className="print-page-wrapper">
                    <div className="print-page first-page" style={{ transform: scale < 1 ? `scale(${scale})` : undefined }}>
                        <div
                            className="print-grid"
                            style={{
                                gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                                gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`
                            }}
                        >
                            <div
                                className="main-card-print-slot"
                                style={{
                                    gridColumn: `span ${mainColsSpan}`,
                                    gridRow: `span ${mainRowsSpan}`
                                }}
                            >
                                <CharacterSheet char={char} onNavigate={onNavigate} variant="static" interactive={false} fontWidth={fontWidth} />
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
                            <div
                                className="print-grid"
                                style={{
                                    gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                                    gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`
                                }}
                            >
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
