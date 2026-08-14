import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActivityCard } from '../components/cards/ActivityCard';
import { ActivitySheet, groupActivities, sortByResource } from '../components/cards/ActivitySheet';
import { StatblockCard } from '../components/cards/StatblockCard';
import { CompactPrintPage, CompactActivityPrintPage } from '../components/cards/CompactPrintPage';
import 'mdui/components/button.js';
import 'mdui/components/tooltip.js';

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

    // Compact sheet toggle (for non-activity-sheet mode)
    const [useCompactSheet, setUseCompactSheet] = useState(() =>
        localStorage.getItem('use_compact_sheet') === 'true'
    );
    const handleToggleCompactSheet = () => {
        setUseCompactSheet(prev => {
            const next = !prev;
            localStorage.setItem('use_compact_sheet', String(next));
            return next;
        });
    };

    // Compact activity layout toggle (for activity-sheet mode)
    const [useCompactActivityLayout, setUseCompactActivityLayout] = useState(() =>
        localStorage.getItem('use_compact_activity_layout') === 'true'
    );
    const handleToggleCompactActivityLayout = () => {
        setCol1Placement({ resources: true, traits: true });
        setUseCompactActivityLayout(prev => {
            const next = !prev;
            localStorage.setItem('use_compact_activity_layout', String(next));
            return next;
        });
    };

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

    const leftColRef = useRef(null);
    const [col1Placement, setCol1Placement] = useState({ resources: true, traits: true });

    // Reset col1Placement on character change
    const prevCharIdRef = useRef('');
    const currentCharId = char?.id || char?.meta?.name || 'char';
    if (prevCharIdRef.current !== currentCharId) {
        prevCharIdRef.current = currentCharId;
        if (!col1Placement.resources || !col1Placement.traits) {
            setCol1Placement({ resources: true, traits: true });
        }
    }

    // Track character, mode, & placement key to reset measurement on change during render
    const prevKeyRef = useRef('');
    const currentKey = `${currentCharId}-${useActivitySheet}-${useCompactActivityLayout}-${col1Placement.resources}-${col1Placement.traits}`;
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

        // First check if Column 1 overflows in compact activity mode
        if (useCompactActivityLayout && leftColRef.current) {
            const el = leftColRef.current;
            if (el.scrollHeight > el.clientHeight + 2) {
                if (col1Placement.traits) {
                    setCol1Placement({ resources: true, traits: false });
                    return;
                } else if (col1Placement.resources) {
                    setCol1Placement({ resources: false, traits: false });
                    return;
                }
            }
        }

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
    }, [char, useActivitySheet, useCompactActivityLayout, col1Placement, activitySlots, deferredActs]);

    if (!char) return null;

    // ── Activity Sheet mode ──────────────────────────────────────────────────
    if (useActivitySheet) {
        const statblocks = (char.statblocks || []).map(sb => ({ ...sb, _isStatblock: true }));
        const rawActivities = char.activities || [];
        const allActivities = sortActivitiesByCategory(rawActivities);

        const page1Acts = activitySlots !== null ? activitySlots[0] : allActivities;
        const overflowSlotsArr = activitySlots !== null ? activitySlots.slice(1) : [];

        // For compact layout, slot 1 (overflowSlotsArr[0]) is on Page 1 Right; Page 2+ takes overflowSlotsArr.slice(1).
        // For standard layout, slot 1 (overflowSlotsArr[0]) is on Page 2 Left; Page 2+ takes overflowSlotsArr.
        const page2PlusSlots = useCompactActivityLayout ? overflowSlotsArr.slice(1) : overflowSlotsArr;

        const overflowPages = [];
        for (let i = 0; i < page2PlusSlots.length; i += 2) {
            overflowPages.push([
                page2PlusSlots[i],
                page2PlusSlots[i + 1]
            ]);
        }

        const pageStyle = scale < 1 ? { transform: `scale(${scale})` } : undefined;

        return (
            <div className="container print-screen">
                <mdui-top-app-bar scroll-behavior="hide" variant="small">
                    <mdui-button-icon icon="arrow_back" onClick={() => onNavigate('play')}></mdui-button-icon>
                    <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>
                    <mdui-tooltip content={useCompactActivityLayout ? 'Switch to standard layout' : 'Switch to compact two-column layout'}>
                        <mdui-button-icon
                            icon={useCompactActivityLayout ? 'view_agenda' : 'view_compact_alt'}
                            onClick={handleToggleCompactActivityLayout}
                        />
                    </mdui-tooltip>
                    <mdui-button variant="filled" icon="print" onClick={() => window.print()}>Print</mdui-button>
                </mdui-top-app-bar>

                <div className="content print-content print-mode" ref={containerRef}>
                    {useCompactActivityLayout ? (
                        <div className="print-page-wrapper">
                            <CompactActivityPrintPage
                                char={char}
                                style={pageStyle}
                                leftColRef={leftColRef}
                                activitySlotRef={activitySlotRef}
                                page1OverflowRef={el => overflowSlotRefs.current[0] = el}
                                groupedActivities={groupActivities(page1Acts)}
                                page1OverflowActivities={overflowSlotsArr[0] ? groupActivities(overflowSlotsArr[0]) : null}
                                showResourcesInCol1={col1Placement.resources}
                                showTraitsInCol1={col1Placement.traits}
                            />
                        </div>
                    ) : (
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
                    )}

                    {overflowPages.map((pageSlots, pageIdx) => (
                        <div key={pageIdx} className="print-page-wrapper">
                            <div className="print-page" style={pageStyle}>
                                <div className="print-grid activity-sheet-2x1-grid">
                                    <div
                                        className="activity-sheet-print-slot"
                                        ref={el => overflowSlotRefs.current[(useCompactActivityLayout ? 1 : 0) + pageIdx * 2] = el}
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
                                        ref={el => overflowSlotRefs.current[(useCompactActivityLayout ? 1 : 0) + pageIdx * 2 + 1] = el}
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
                <mdui-tooltip content={useCompactSheet ? 'Switch to standard layout' : 'Switch to compact layout'}>
                    <mdui-button-icon
                        icon={useCompactSheet ? 'view_agenda' : 'view_compact'}
                        onClick={handleToggleCompactSheet}
                    />
                </mdui-tooltip>
                <mdui-button variant="filled" icon="print" onClick={() => window.print()}>Print</mdui-button>
            </mdui-top-app-bar>

            <div className="content print-content print-mode" ref={containerRef}>
                {useCompactSheet ? (
                    <div className="print-page-wrapper">
                        <CompactPrintPage char={char} style={pageStyle} />
                    </div>
                ) : (
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
                )}

                {!useCompactSheet && chunks.map((chunk, pageIdx) => (
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