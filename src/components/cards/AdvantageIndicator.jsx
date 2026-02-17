import React, { memo } from 'react';

export const AdvantageIndicator = memo(({ type, value }) => (
    <div className={`adv-dis-indicator ${type}`}>
        {type === 'adv' ? 'A' : type === 'dis' ? 'D' : type === 'min' ? '>' : ''}
        {type === 'min' && <span>{value}</span>}
    </div>
));
