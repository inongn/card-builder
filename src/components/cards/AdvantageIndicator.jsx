import React, { memo } from 'react';
import { useLocale } from '../../i18n';

export const AdvantageIndicator = memo(({ type, value }) => {
    const { lang } = useLocale();
    const advChar = lang === 'es' ? 'V' : 'A';

    return (
        <div className={`adv-dis-indicator ${type}`}>
            {type === 'adv' ? advChar : type === 'dis' ? 'D' : type === 'min' ? '>' : ''}
            {type === 'min' && <span>{value}</span>}
        </div>
    );
});
