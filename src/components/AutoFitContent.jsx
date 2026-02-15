import React, { useState, useLayoutEffect, useRef } from 'react';

/**
 * A component that scales its font size down until it fits its container.
 */
export const AutoFitContent = ({ children, maxFontSize = 1, minFontSize = 0.45, step = 0.005, unit = 'rem' }) => {
    const containerRef = useRef(null);
    const innerRef = useRef(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const inner = innerRef.current;
        if (!container || !inner) return;

        const fit = () => {
            const containerHeight = container.offsetHeight;
            if (containerHeight <= 0) {
                // Wait for layout
                setTimeout(fit, 1);
                return;
            }

            let currentSize = maxFontSize;
            inner.style.fontSize = `${currentSize}${unit}`;

            const maxIterations = 100;
            let iteration = 0;

            while (inner.scrollHeight > containerHeight + 1 && currentSize > minFontSize && iteration < maxIterations) {
                currentSize = Math.max(minFontSize, currentSize - step);
                inner.style.fontSize = `${currentSize}${unit}`;
                iteration++;
            }
        };

        const resizeObserver = new ResizeObserver(() => fit());
        resizeObserver.observe(container);

        // Web components and flex layouts might take a moment to settle
        const timer = setTimeout(fit, 1);

        return () => {
            resizeObserver.disconnect();
            clearTimeout(timer);
        };
    }, [children, maxFontSize, minFontSize, step, unit]);

    return (
        <div
            ref={containerRef}
            className="auto-fit-container"
            style={{
                flex: 1,
                minHeight: 0,
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div
                ref={innerRef}
                className="auto-fit-inner"
                style={{
                    height: 'auto',
                    width: '100%',
                    display: 'block' // Ensure it's not flex to get correct scrollHeight
                }}
            >
                {children}
            </div>
        </div>
    );
};
