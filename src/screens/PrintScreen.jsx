import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActivityCard } from '../components/cards/ActivityCard';
import { ActivitySheet, groupActivities, sortByResource } from '../components/cards/ActivitySheet';
import { StatblockCard } from '../components/cards/StatblockCard';
import 'mdui/components/button.js';

const categoryOrder = ['core', 'action', 'bonus action', 'reaction', 'free action', 'other'];

const sortActivitiesByCategory = (activities = []) => {
    const grouped = groupActivities(activities);
    const sorted = [];
    categoryOrder.forEach(key => {
        if (grouped[key] && grouped[key].length > 0) {
            sorted.push(...sortByResource(grouped[key]));
        }
    });
    return sorted;
};

export const PrintScreen = ({ char, onNavigate, useActivitySheet }) => {
    const containerRef = useRef(null);
    const activitySlotRef = useRef(null);
    const overflowSlotRefs = useRef([]);
    const [scale, setScale] = useState(1);

    // Iterative bin packing state
    const [activitySlots, setActivitySlots] = useState(null);
    const [deferredActs, setDeferredActs] = useState([]);

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
        if (activitySlots !== null) {
            setActivitySlots(null);
            setDeferredActs([]);
        }
    }

    // Measure overflowing activities and optimize category packing
    useLayoutEffect(() => {
        if (!useActivitySheet || !char) return;

        const rawActivities = char.activities || [];
        const allActivities = sortActivitiesByCategory(rawActivities);

        if (allActivities.length === 0) return;

        // Initialization pass: start with everything in Slot 0
        if (activitySlots === null) {
            setActivitySlots([allActivities]);
            setDeferredActs([]);
            return;
        }

        const lastSlotIndex = activitySlots.length - 1;
        let slotEl;
        if (lastSlotIndex === 0) {
            slotEl = activitySlotRef.current;
        } else {
            slotEl = overflowSlotRefs.current[lastSlotIndex - 1];
        }

        if (!slotEl) return;

        const slotRect = slotEl.getBoundingClientRect();
        const items = Array.from(slotEl.querySelectorAll('.activity-sheet-item'));

        if (items.length === 0) {
            if (deferredActs.length > 0) {
                const nextActs = sortActivitiesByCategory(deferredActs);
                setActivitySlots(prev => [...prev, nextActs]);
                setDeferredActs([]);
            }
            return;
        }

        let overflowIdx = -1;
        for (let i = 0; i < items.length; i++) {
            const itemRect = items[i].getBoundingClientRect();
            if (itemRect.bottom > slotRect.bottom + 2 || itemRect.right > slotRect.right + 2) {
                overflowIdx = i;
                break;
            }
        }

        if (overflowIdx === -1) {
            // Slot is perfectly packed without overflows
            if (deferredActs.length > 0) {
                const nextActs = sortActivitiesByCategory(deferredActs);
                setActivitySlots(prev => [...prev, nextActs]);
                setDeferredActs([]);
            }
        } else {
            // Handle Overflow
            const currentActs = activitySlots[lastSlotIndex];
            const overflowingItem = items[overflowIdx];
            const parentGroup = overflowingItem.closest('.aside-card-group');

            let itemsToDefer = [];
            let itemsToKeep = [];

            if (parentGroup) {
                const groupItems = Array.from(parentGroup.querySelectorAll('.activity-sheet-item'));
                const firstItemInGroup = groupItems[0];
                const groupStartIdx = items.indexOf(firstItemInGroup);
                const groupEndIdx = groupStartIdx + groupItems.length - 1;

                if (groupStartIdx > 0) {
                    // Category didn't start at the top. Defer ONLY this category.
                    // Keep subsequent categories in the slot to see if they fit in the gap.
                    itemsToDefer = currentActs.slice(groupStartIdx, groupEndIdx + 1);
                    itemsToKeep = [
                        ...currentActs.slice(0, groupStartIdx),
                        ...currentActs.slice(groupEndIdx + 1)
                    ];
                } else {
                    // Category started at the top. Slot is entirely full. Split at overflow.
                    const sliceIdx = Math.max(1, overflowIdx);
                    itemsToDefer = currentActs.slice(sliceIdx);
                    itemsToKeep = currentActs.slice(0, sliceIdx);
                }
            } else {
                const sliceIdx = Math.max(1, overflowIdx);
                itemsToDefer = currentActs.slice(sliceIdx);
                itemsToKeep = currentActs.slice(0, sliceIdx);
            }

            // Infinite loop prevention: If we can't shrink the slot anymore, force completion
            if (itemsToKeep.length === currentActs.length) {
                if (deferredActs.length > 0) {
                    const nextActs = sortActivitiesByCategory(deferredActs);
                    setActivitySlots(prev => [...prev, nextActs]);
                    setDeferredActs([]);
                }
                return;
            }

            setDeferredActs(prev => [...prev, ...itemsToDefer]);
            setActivitySlots(prev => {
                const newSlots = [...prev];
                newSlots[lastSlotIndex] = itemsToKeep;
                return newSlots;
            });
        }
    }, [char, useActivitySheet, activitySlots, deferredActs]);

    if (!char) return null;

    // ── Activity Sheet mode ──────────────────────────────────────────────────
    if (useActivitySheet) {
        const statblocks = (char.statblocks || []).map(sb => ({ ...sb, _isStatblock: true }));
        const rawActivities = char.activities || [];
        const allActivities = sortActivitiesByCategory(rawActivities);

        const page1Acts = activitySlots !== null ? activitySlots[0] : allActivities;
        const overflowSlotsArr = activitySlots !== null ? activitySlots.slice(1) : [];

        const overflowPages = [];
        for (let i = 0; i < overflowSlotsArr.length; i += 2) {
            overflowPages.push([
                overflowSlotsArr[i],
                overflowSlotsArr[i + 1]
            ]);
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

                    {overflowPages.map((pageSlots, pageIdx) => (
                        <div key={pageIdx} className="print-page-wrapper">
                            <div className="print-page" style={pageStyle}>
                                <div className="print-grid activity-sheet-2x1-grid">
                                    <div
                                        className="activity-sheet-print-slot"
                                        ref={el => overflowSlotRefs.current[pageIdx * 2] = el}
                                    >
                                        {pageSlots[0] && (
                                            <ActivitySheet
                                                groupedActivities={groupActivities(pageSlots[0])}
                                                characterData={char}
                                                printMode={true}
                                            />
                                        )}
                                    </div>
                                    <div
                                        className="activity-sheet-print-slot"
                                        ref={el => overflowSlotRefs.current[pageIdx * 2 + 1] = el}
                                    >
                                        {pageSlots[1] && (
                                            <ActivitySheet
                                                groupedActivities={groupActivities(pageSlots[1])}
                                                characterData={char}
                                                printMode={true}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

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