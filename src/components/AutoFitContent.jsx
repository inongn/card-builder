import React, { useState, useLayoutEffect, useRef } from 'react';

/**
 * A component that scales its font size down until it fits its container.
 */
export const AutoFitContent = ({ children, maxFontSize = 1, minFontSize = 0.45, precision = 0.01, unit = 'rem' }) => {
    const containerRef = useRef(null);
    const innerRef = useRef(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const inner = innerRef.current;
        if (!container || !inner) return;

        let frameId;

        const fit = () => {
            const containerHeight = container.offsetHeight;
            if (containerHeight <= 0) return;

            // Fast path: test maxFontSize
            inner.style.fontSize = `${maxFontSize}${unit}`;
            if (inner.scrollHeight <= containerHeight + 1) {
                return; // Fits at max font size, done in 1 check!
            }

            // Binary search between minFontSize and maxFontSize (max 7 iterations)
            let low = minFontSize;
            let high = maxFontSize;
            let best = minFontSize;

            for (let i = 0; i < 7; i++) {
                if (high - low < precision) break;
                const mid = (low + high) / 2;
                inner.style.fontSize = `${mid}${unit}`;
                if (inner.scrollHeight <= containerHeight + 1) {
                    best = mid;
                    low = mid;
                } else {
                    high = mid;
                }
            }

            inner.style.fontSize = `${best}${unit}`;
        };

        const resizeObserver = new ResizeObserver(() => {
            cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(fit);
        });
        resizeObserver.observe(container);

        fit();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(frameId);
        };
    }, [children, maxFontSize, minFontSize, precision, unit]);

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
