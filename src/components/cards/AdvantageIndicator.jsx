import React, { memo } from 'react';

export const AdvantageIndicator = memo(({ type }) => (
    <div className={`adv-dis-indicator ${type}`}>
        {type === 'adv' ? 'A' : 'D'}
    </div>
));
