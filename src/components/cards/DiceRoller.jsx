import React from 'react';
import { triggerDiceRoll } from '../../utils/diceUtils';
import 'mdui/components/icon.js';

export const DiceRoller = ({ formula, label, children, interactive = true, showIcon = true, className = '', rollOptions = null }) => {
    if (!interactive) {
        return <span className={className}>{children || formula}</span>;
    }

    const handleClick = (e) => {
        e.stopPropagation();
        triggerDiceRoll(formula, label, rollOptions);
    };

    return (
        <span
            className={`dice-roller ${!showIcon ? 'minimal' : ''} ${className}`}
            onClick={handleClick}
            title={`Roll ${label ? `${label} (${formula})` : formula}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick(e);
                }
            }}
        >
            <span className="dice-roller-text">{children || formula}</span>
            {showIcon && <mdui-icon name="casino" class="icon-xsmall dice-icon"></mdui-icon>}
        </span>
    );
};

export function processDiceInChildren(children, interactive = true, defaultLabel = '', showIcon = true) {
    if (!interactive || children === null || children === undefined) {
        return children;
    }

    if (typeof children === 'string') {
        const regex = /(?:\b\d*d\d+(?:\s*[\+\-]\s*(?:\d*d\d+|\d+))*\b)|(?:(?<=^|[\s\(\[\{,])[\+\-]\d+(?=[\s\)\],\}\.]|$))/gi;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(children)) !== null) {
            const matchIndex = match.index;
            const formula = match[0];

            // Ignore standalone 'd20' or 'D20' as rollable formulas
            if (/^d20$/i.test(formula.trim())) {
                continue;
            }

            if (matchIndex > lastIndex) {
                parts.push(children.substring(lastIndex, matchIndex));
            }

            parts.push(
                <DiceRoller
                    key={`dice-${matchIndex}-${formula}`}
                    formula={formula}
                    label={defaultLabel}
                    interactive={interactive}
                    showIcon={showIcon}
                >
                    {formula}
                </DiceRoller>
            );

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < children.length) {
            parts.push(children.substring(lastIndex));
        }

        return parts.length > 0 ? parts : children;
    }

    if (Array.isArray(children)) {
        return React.Children.map(children, child => processDiceInChildren(child, interactive, defaultLabel, showIcon));
    }

    if (React.isValidElement(children)) {
        if (children.props && children.props.children) {
            return React.cloneElement(
                children,
                { ...children.props },
                processDiceInChildren(children.props.children, interactive, defaultLabel, showIcon)
            );
        }
    }

    return children;
}
