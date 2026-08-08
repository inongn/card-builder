import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActivityCard } from '../components/cards/ActivityCard';
import { ActivitySheet, groupActivities } from '../components/cards/ActivitySheet';
import { StatblockCard } from '../components/cards/StatblockCard';
import 'mdui/components/button.js';

const categoryOrder = ['core', 'action', 'bonus action', 'reaction', 'free action', 'other'];

const sortActivitiesByCategory = (activities = []) => {
    const grouped = groupActivities(activities);
    const sorted = [];
    categoryOrder.forEach(key => {
        if (grouped[key] && grouped[key].length > 0) {
            sorted.push(...grouped[key]);
        }
    });
    return sorted;
};

export const PrintScreen = ({ char, onNavigate, useActivitySheet }) => {
    // ── All hooks must come before any conditional return ────────────────────
    const containerRef = useRef(null);
    const activitySlotRef = useRef(null);
    const overflowSlotRefs = useRef([]);
    const [scale, setScale] = useState(1);
    
    // Array of activity arrays per page: [page1Acts, overflow1Acts, overflow2Acts, ...]
    // null = measuring pass (all activities rendered on page 1 initially)
    const [activityPages, setActivityPages] = useState(null);

    // Scale the print preview to fit the screen width.
    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.clientWidth;
            const targetWidth = 1056; // 11in @ 96 dpi
            setScale(containerWidth < targetWidth && containerWidth > 0
                ? containerWidth / targetWidth
                : 1);
        };
        updateScale();
        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Track character & mode key to reset measurement on change during render
    const prevKeyRef = useRef('');
    const currentKey = `${char?.id || char?.meta?.name || 'char'}-${useActivitySheet}`;
    if (prevKeyRef.current !== currentKey) {
        prevKeyRef.current = currentKey;
        overflowSlotRefs.current = [];
        if (activityPages !== null) {
            setActivityPages(null);
        }
    }

    // Measure overflowing activities and split across multiple print pages.
    useLayoutEffect(() => {
        if (!useActivitySheet || !char) return;

        const rawActivities = char.activities || [];
        const allActivities = sortActivitiesByCategory(rawActivities);

        if (allActivities.length === 0) return;

        // Pass 1: Measure Page 1 right slot (when activityPages is null)
        if (activityPages === null) {
            if (!activitySlotRef.current) return;
            const slot = activitySlotRef.current;
            const slotRect = slot.getBoundingClientRect();
            const items = Array.from(slot.querySelectorAll('.activity-sheet-item'));

            if (items.length === 0) {
                setActivityPages([allActivities]);
                return;
            }

            let overflowIdx = -1;
            for (let i = 0; i < items.length; i++) {
                const itemRect = items[i].getBoundingClientRect();
                if (itemRect.bottom > slotRect.bottom + 2) {
                    overflowIdx = i;
                    break;
                }
            }

            if (overflowIdx === -1) {
                setActivityPages([allActivities]);
            } else {
                const page1Count = Math.max(1, overflowIdx);
                setActivityPages([
                    allActivities.slice(0, page1Count),
                    allActivities.slice(page1Count)
                ]);
            }
            return;
        }

        // Pass 2+: Measure latest overflow page to see if it needs further splitting
        if (activityPages.length >= 2) {
            const lastPageIndex = activityPages.length - 1;
            const lastSlot = overflowSlotRefs.current[lastPageIndex - 1];
            if (!lastSlot) return;

            const slotRect = lastSlot.getBoundingClientRect();
            const items = Array.from(lastSlot.querySelectorAll('.activity-sheet-item'));

            let overflowIdx = -1;
            for (let i = 0; i < items.length; i++) {
                const itemRect = items[i].getBoundingClientRect();
                if (itemRect.right > slotRect.right + 2 || itemRect.bottom > slotRect.bottom + 2) {
                    overflowIdx = i;
                    break;
                }
            }

            if (overflowIdx > 0) {
                const currentLastActs = activityPages[lastPageIndex];
                const pageFit = currentLastActs.slice(0, overflowIdx);
                const pageRem = currentLastActs.slice(overflowIdx);

                setActivityPages([
                    ...activityPages.slice(0, lastPageIndex),
                    pageFit,
                    pageRem
                ]);
            }
        }
    }, [char, useActivitySheet, activityPages]);

    // ── Early return after all hooks ─────────────────────────────────────────
    if (!char) return null;

    // ── Activity Sheet mode ──────────────────────────────────────────────────
    if (useActivitySheet) {
        const statblocks = (char.statblocks || []).map(sb => ({ ...sb, _isStatblock: true }));
        const rawActivities = char.activities || [];
        const allActivities = sortActivitiesByCategory(rawActivities);

        // Determine activities for page 1 and overflow pages
        const page1Acts = activityPages !== null ? activityPages[0] : allActivities;
        const overflowPages = activityPages !== null ? activityPages.slice(1) : [];

        const pageStyle = scale < 1 ? { transform: `scale(${scale})` } : undefined;

        return (
            <div className="container print-screen">
                <mdui-top-app-bar scroll-behavior="hide" variant="small">
                    <mdui-button-icon icon="arrow_back" onClick={() => onNavigate('play')}></mdui-button-icon>
                    <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>
                    <mdui-button variant="filled" icon="print" onClick={() => window.print()}>Print</mdui-button>
                </mdui-top-app-bar>

                <div className="content print-content print-mode" ref={containerRef}>
                    {/* Page 1: character sheet (left) + activity list (right) */}
                    <div className="print-page-wrapper">
                        <div className="print-page first-page activity-sheet-print-page" style={pageStyle}>
                            <div className="print-grid activity-sheet-2x1-grid">
                                <div className="main-card-print-slot">
                                    <CharacterSheet char={char} onNavigate={onNavigate} variant="static" interactive={false} />
                                </div>
                                <div className="activity-sheet-print-slot" ref={activitySlotRef}>
                                    <ActivitySheet
                                        groupedActivities={groupActivities(page1Acts)}
                                        characterData={char}
                                        printMode={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Overflow pages: remaining activity items in a 2-column layout */}
                    {overflowPages.map((pageActs, pageIdx) => (
                        <div key={pageIdx} className="print-page-wrapper">
                            <div className="print-page" style={pageStyle}>
                                <div
                                    className="activity-overflow-slot"
                                    ref={el => overflowSlotRefs.current[pageIdx] = el}
                                >
                                    <ActivitySheet
                                        groupedActivities={groupActivities(pageActs)}
                                        characterData={char}
                                        printMode={true}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Statblock pages */}
                    {statblocks.length > 0 && (
                        <div className="print-page-wrapper">
                            <div className="print-page" style={pageStyle}>
                                <div className="print-grid">
                                    {statblocks.map((card, cardIdx) => (
                                        <div key={cardIdx} className="action-card-print-slot">
                                            <StatblockCard statblock={card} variant="static" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ── Standard Activity Card mode (3×2 grid) ───────────────────────────────
    const activities = (char.activities || []).filter(act => !act.tags || !act.tags.includes('restActivity'));
    const statblocks = (char.statblocks || []).map(sb => ({ ...sb, _isStatblock: true }));
    const allCards = [...activities, ...statblocks];

    const page1Cards = allCards.slice(0, 2);
    const remainingCards = allCards.slice(2);

    const chunks = [];
    for (let i = 0; i < remainingCards.length; i += 6) {
        chunks.push(remainingCards.slice(i, i + 6));
    }

    const pageStyle = scale < 1 ? { transform: `scale(${scale})` } : undefined;

    return (
        <div className="container print-screen">
            <mdui-top-app-bar scroll-behavior="hide" variant="small">
                <mdui-button-icon icon="arrow_back" onClick={() => onNavigate('play')}></mdui-button-icon>
                <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>
                <mdui-button variant="filled" icon="print" onClick={() => window.print()}>Print</mdui-button>
            </mdui-top-app-bar>

            <div className="content print-content print-mode" ref={containerRef}>
                <div className="print-page-wrapper">
                    <div className="print-page first-page" style={pageStyle}>
                        <div className="print-grid">
                            <div className="main-card-print-slot">
                                <CharacterSheet char={char} onNavigate={onNavigate} variant="static" interactive={false} />
                            </div>
                            {page1Cards.map((card, idx) => (
                                <div key={idx} className="action-card-print-slot">
                                    {card._isStatblock
                                        ? <StatblockCard statblock={card} variant="static" />
                                        : <ActivityCard activity={card} variant="static" char={char} />
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {chunks.map((chunk, pageIdx) => (
                    <div key={pageIdx} className="print-page-wrapper">
                        <div className="print-page" style={pageStyle}>
                            <div className="print-grid">
                                {chunk.map((card, cardIdx) => (
                                    <div key={cardIdx} className="action-card-print-slot">
                                        {card._isStatblock
                                            ? <StatblockCard statblock={card} variant="static" />
                                            : <ActivityCard activity={card} variant="static" char={char} />
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
