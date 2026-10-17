import React, { memo } from 'react';
import { ActivitySheet } from '../cards/ActivitySheet';
import { StatblockCard } from '../cards/StatblockCard';
import { CompactLeftColumn } from '../cards/CompactPrintPage';
// Activity-sheet slot: a column container whose overflow is measured by PrintScreen
const ActivitySlot = ({ slotRef, groupedActivities, char }) => (
    <div className="cps-activity-slot" ref={slotRef}>
        {groupedActivities && (
            <ActivitySheet groupedActivities={groupedActivities} characterData={char} printMode={true} />
        )}
    </div>
);

// Continuation page: just two activity-sheet columns (spillover from the main page)
export const UltraCompactOverflowPage = memo(({ char, style, leftRef, rightRef, leftActivities, rightActivities }) => (
    <div className="ucp-page" style={style}>
        <div className="ucp-body ucp-body-overflow">
            <div className="ucp-col"><ActivitySlot slotRef={leftRef} groupedActivities={leftActivities} char={char} /></div>
            <div className="ucp-col"><ActivitySlot slotRef={rightRef} groupedActivities={rightActivities} char={char} /></div>
        </div>
    </div>
));

export const UltraCompactPrintPage = memo(({ char, style, col2Ref, col3Ref, col2Activities, col3Activities }) => {
    if (!char) return null;
    return (
        <div className="ucp-page" style={style}>
            <div className="ucp-body">
                {/* Column 1: same as compact sheet (identity, combat, HP, resources, skills, saves, info, traits) */}
                <div className="ucp-col ucp-col-1">
                    <CompactLeftColumn char={char} showResources={true} showTraits={true} showIdentity={true} />
                </div>
                {/* Column 2 & 3: activity-sheet containers with spillover */}
                <div className="ucp-col ucp-col-2"><ActivitySlot slotRef={col2Ref} groupedActivities={col2Activities} char={char} /></div>
                <div className="ucp-col ucp-col-3"><ActivitySlot slotRef={col3Ref} groupedActivities={col3Activities} char={char} /></div>
            </div>
        </div>
    );
});

// Portrait statblock page (2×2 grid)
export const UltraCompactStatblockPage = memo(({ statblocks, style }) => (
    <div className="ucp-page" style={style}>
        <div className="print-grid ucp-statblock-grid">
            {statblocks.map((card, i) => (
                <div key={i} className="action-card-print-slot">
                    <StatblockCard statblock={card} variant="static" />
                </div>
            ))}
        </div>
    </div>
));
