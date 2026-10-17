import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { CharacterSheet } from '../components/cards/CharacterSheet';
import { ActivityCard } from '../components/cards/ActivityCard';
import { ActivitySheet, groupActivities, sortByResource } from '../components/cards/ActivitySheet';
import { StatblockCard } from '../components/cards/StatblockCard';
import { CompactPrintPage, CompactActivityPrintPage } from '../components/cards/CompactPrintPage';
import { UltraCompactPrintPage, UltraCompactOverflowPage, UltraCompactStatblockPage } from '../components/print/UltraCompactPrintPage';
import { useLocale } from '../i18n';
import 'mdui/components/button.js';
import 'mdui/components/tooltip.js';
import 'mdui/components/button-icon.js';

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

const categoryKeyOf = (activity) => {
    const g = groupActivities([activity]);
    return categoryOrder.find(k => g[k] && g[k].length > 0) || 'other';
};

export const PrintScreen = ({ char, onNavigate, useActivitySheet }) => {
    const { lang } = useLocale();
    const containerRef = useRef(null);
    const activitySlotRef = useRef(null);
    const overflowSlotRefs = useRef([]);
    const [scale, setScale] = useState(1);

    // Track font loading so bin-packing only measures after condensed fonts (Google Sans Flex) are ready
    const [fontsReady, setFontsReady] = useState(() => {
        if (typeof document === 'undefined' || !document.fonts) return true;
        return document.fonts.status === 'loaded' && document.fonts.check('12px "Google Sans Flex"');
    });
    const [fontVersion, setFontVersion] = useState(0);

    // Set document.title to character name so browser print / PDF export defaults to this filename
    useEffect(() => {
        if (typeof document === 'undefined') return;
        const charName = char?.meta?.name?.trim() || char?.name?.trim();
        if (!charName) return;

        const previousTitle = document.title;
        document.title = charName;

        return () => {
            document.title = previousTitle;
        };
    }, [char?.meta?.name, char?.name]);

    useEffect(() => {
        let active = true;
        if (!document.fonts) {
            setFontsReady(true);
            return;
        }

        const markReady = () => {
            if (!active) return;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (active) {
                        setFontsReady(true);
                        setFontVersion(v => v + 1);
                    }
                });
            });
        };

        if (document.fonts.load) {
            document.fonts.load('0.75rem "Google Sans Flex"').catch(() => {});
        }

        document.fonts.ready.then(markReady).catch(markReady);
        document.fonts.addEventListener('loadingdone', markReady);

        const fallbackTimer = setTimeout(markReady, 1000);

        return () => {
            active = false;
            clearTimeout(fallbackTimer);
            document.fonts.removeEventListener('loadingdone', markReady);
        };
    }, []);

    // Layout mode: 'compact' (landscape) | 'ultra-compact' (portrait)
    const [layoutMode, setLayoutMode] = useState(() => {
        const stored = localStorage.getItem('print_layout_mode');
        return stored === 'ultra-compact' ? 'ultra-compact' : 'compact';
    });
    const useCompactSheet = layoutMode === 'compact';
    const useCompactActivityLayout = layoutMode === 'compact';
    const isUltraCompact = layoutMode === 'ultra-compact';
    const handleToggleLayout = () => {
        const next = layoutMode === 'compact' ? 'ultra-compact' : 'compact';
        setCol1Placement({ resources: true, traits: true });
        setLayoutMode(next);
        localStorage.setItem('print_layout_mode', next);
    };

    const layoutSwitcher = (
        <mdui-tooltip content={isUltraCompact ? 'Switch to landscape layout' : 'Switch to portrait layout'}>
            <mdui-button-icon
                icon={isUltraCompact ? 'crop_landscape' : 'crop_portrait'}
                onClick={handleToggleLayout}
            ></mdui-button-icon>
        </mdui-tooltip>
    );

    // Iterative bin packing state
    const [activitySlots, setActivitySlots] = useState(null);
    const [deferredActs, setDeferredActs] = useState([]);
    // Ultra-compact packing stage: 'ideal' (regular actions in col 2, others in col 3) → 'generic' (normal spillover)
    const [ucpStage, setUcpStage] = useState('ideal');

    // Scale the print preview to fit the screen width synchronously before paint
    useLayoutEffect(() => {
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

    // Track character, lang, mode, font readiness, & placement key to reset measurement on change during render
    const currentCharId = char?.id || char?.meta?.name || 'char';
    const prevKeyRef = useRef('');
    const currentKey = `${currentCharId}-${lang}-${useActivitySheet}-${layoutMode}-${fontVersion}-${col1Placement.resources}-${col1Placement.traits}`;

    if (prevKeyRef.current !== currentKey) {
        const isPlacementOnlyChange = prevKeyRef.current.startsWith(
            `${currentCharId}-${lang}-${useActivitySheet}-${layoutMode}-${fontVersion}-`
        );
        prevKeyRef.current = currentKey;
        overflowSlotRefs.current = [];
        if (ucpStage !== 'ideal') setUcpStage('ideal');
        if (!isPlacementOnlyChange && (!col1Placement.resources || !col1Placement.traits)) {
            setCol1Placement({ resources: true, traits: true });
        }
        if (activitySlots !== null) {
            setActivitySlots(null);
            setDeferredActs([]);
        }
    }

    // Measure overflowing activities and optimize category packing
    useLayoutEffect(() => {
        if (!fontsReady || (!useActivitySheet && !isUltraCompact) || !char) return;

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

        // Ultra-compact "ideal" stage: regular actions (core + action) in column 2, all other
        // action types in column 3. Only pull categories into column 2 if column 3 would spill.
        if (isUltraCompact && ucpStage === 'ideal') {
            const regular = allActivities.filter(a => ['core', 'action'].includes(categoryKeyOf(a)));
            const others = allActivities.filter(a => !['core', 'action'].includes(categoryKeyOf(a)));
            if (others.length === 0) {
                setUcpStage('generic');
                return;
            }
            if (activitySlots === null) {
                setActivitySlots([regular, others]);
                setDeferredActs([]);
                return;
            }
            const col2El = activitySlotRef.current;
            const col3El = overflowSlotRefs.current[0];
            if (!col2El || !col3El) return;
            const effScale = (scale < 1 ? Math.min(1, scale * 1056 / 816) : scale) || 1;
            const overflows = (el) => {
                const bottom = el.getBoundingClientRect().bottom;
                return Array.from(el.querySelectorAll('.activity-sheet-item'))
                    .some(it => (it.getBoundingClientRect().bottom - bottom) / effScale > 2);
            };
            const col2Over = overflows(col2El);
            const col3Over = overflows(col3El);
            if (!col2Over && !col3Over) return; // ideal layout fits
            if (!col2Over && col3Over && activitySlots.length === 2 && activitySlots[1].length > 0) {
                // Move the next category of "other" actions into column 2
                const next = activitySlots[1];
                const firstKey = categoryKeyOf(next[0]);
                const moved = next.filter(a => categoryKeyOf(a) === firstKey);
                const rest = next.filter(a => categoryKeyOf(a) !== firstKey);
                setActivitySlots([[...activitySlots[0], ...moved], rest]);
                return;
            }
            // Column 2 overflowed: fall back to the normal spillover logic
            setUcpStage('generic');
            setActivitySlots(null);
            setDeferredActs([]);
            return;
        }

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
        const effectiveScale = (isUltraCompact && scale < 1 ? Math.min(1, scale * 1056 / 816) : scale) || 1;
        for (let i = 0; i < items.length; i++) {
            const itemRect = items[i].getBoundingClientRect();
            const overflowY = (itemRect.bottom - slotRect.bottom) / effectiveScale;
            if (overflowY > 2) {
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
    }, [char, useActivitySheet, isUltraCompact, useCompactActivityLayout, col1Placement, activitySlots, deferredActs, fontsReady, fontVersion, scale, ucpStage]);

    if (!char) return null;

    // ── Ultra-Compact Portrait mode (single page, both sheet modes) ──────────
    if (isUltraCompact) {
        const ucpAll = sortActivitiesByCategory(char.activities || []);
        const ucpSlots = activitySlots !== null ? activitySlots : [ucpAll];
        const ucpPairs = [];
        for (let i = 2; i < ucpSlots.length; i += 2) ucpPairs.push([ucpSlots[i], ucpSlots[i + 1]]);
        const ucpStatblocks = (char.statblocks || []).map(sb => ({ ...sb, _isStatblock: true }));
        const ucpStatChunks = [];
        for (let i = 0; i < ucpStatblocks.length; i += 4) ucpStatChunks.push(ucpStatblocks.slice(i, i + 4));
        // Portrait page is 8.5in (816px) wide
        const ucpScale = scale < 1 ? Math.min(1, scale * 1056 / 816) : 1;
        const ucpStyle = ucpScale < 1 ? { transform: `scale(${ucpScale})` } : undefined;
        return (
            <div className="container print-screen">
                <style>{'@media print { @page { size: letter portrait; margin: 0; } }'}</style>
                <mdui-top-app-bar scroll-behavior="hide" variant="small">
                    <mdui-button-icon icon="arrow_back" onClick={() => onNavigate('play')}></mdui-button-icon>
                    <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>
                    {layoutSwitcher}
                    <mdui-button variant="filled" icon="print" onClick={() => window.print()}>Print</mdui-button>
                </mdui-top-app-bar>
                <div className="content print-content print-mode" ref={containerRef}>
                    <div className="ucp-page-wrapper">
                        <UltraCompactPrintPage
                            char={char}
                            style={ucpStyle}
                            col2Ref={activitySlotRef}
                            col3Ref={el => overflowSlotRefs.current[0] = el}
                            col2Activities={groupActivities(ucpSlots[0] || [])}
                            col3Activities={ucpSlots[1] ? groupActivities(ucpSlots[1]) : null}
                        />
                    </div>
                    {ucpPairs.map((pair, pageIdx) => (
                        <div key={pageIdx} className="ucp-page-wrapper">
                            <UltraCompactOverflowPage
                                char={char}
                                style={ucpStyle}
                                leftRef={el => overflowSlotRefs.current[1 + pageIdx * 2] = el}
                                rightRef={el => overflowSlotRefs.current[2 + pageIdx * 2] = el}
                                leftActivities={pair[0] ? groupActivities(pair[0]) : null}
                                rightActivities={pair[1] ? groupActivities(pair[1]) : null}
                            />
                        </div>
                    ))}
                    {ucpStatChunks.map((chunk, idx) => (
                        <div key={`sb-${idx}`} className="ucp-page-wrapper">
                            <UltraCompactStatblockPage statblocks={chunk} style={ucpStyle} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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

        const statblockChunks = [];
        for (let i = 0; i < statblocks.length; i += 6) {
            statblockChunks.push(statblocks.slice(i, i + 6));
        }

        const pageStyle = scale < 1 ? { transform: `scale(${scale})` } : undefined;

        return (
            <div className="container print-screen">
                <mdui-top-app-bar scroll-behavior="hide" variant="small">
                    <mdui-button-icon icon="arrow_back" onClick={() => onNavigate('play')}></mdui-button-icon>
                    <mdui-top-app-bar-title>Aspida</mdui-top-app-bar-title>
                    {layoutSwitcher}
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

                    {statblockChunks.map((chunk, pageIdx) => (
                        <div key={pageIdx} className="print-page-wrapper">
                            <div className="print-page" style={pageStyle}>
                                <div className="print-grid">
                                    {chunk.map((card, cardIdx) => (
                                        <div key={cardIdx} className="action-card-print-slot">
                                            <StatblockCard statblock={card} variant="static" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
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
                {layoutSwitcher}
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