import React, { useLayoutEffect, useRef } from 'react';

/**
 * A component that scales content down from maxFontSize (default 9pt) until it fits its container,
 * down to minFontSize (default 6pt). If content still overflows at minFontSize, sets font width to 50%.
 */
export const AutoFitContent = ({ children, maxFontSize = 9, minFontSize = 6, step = 0.5, unit = 'pt' }) => {
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

            // Reset width / stretch styles before measuring
            inner.style.fontStretch = '';
            inner.style.fontVariationSettings = '';

            const allDescendants = inner.querySelectorAll('*');
            allDescendants.forEach(el => {
                el.style.fontStretch = '';
                el.style.fontVariationSettings = '';
            });

            const applySize = (size) => {
                inner.style.fontSize = `${size}${unit}`;

                // Target text blocks and description containers so inline or CSS rules don't lock them
                const textElements = inner.querySelectorAll(
                    '.card-description, .card-description-paragraph, p, li, .statblock-content, .card-content'
                );
                textElements.forEach(el => {
                    el.style.fontSize = `${size}${unit}`;
                });
            };

            let currentSize = maxFontSize;
            applySize(currentSize);

            const maxIterations = 100;
            let iteration = 0;

            while (inner.scrollHeight > containerHeight + 1 && currentSize > minFontSize && iteration < maxIterations) {
                currentSize = Math.max(minFontSize, currentSize - step);
                applySize(currentSize);
                iteration++;
            }

            // If even at minFontSize (smallest font size) the content still overflows, set font width to 50%
            if (inner.scrollHeight > containerHeight + 1) {
                const fontWidthVal = '50%';
                const varSettings = "'wdth' 50";

                inner.style.fontStretch = fontWidthVal;
                inner.style.fontVariationSettings = varSettings;
                inner.style.fontFamily = "'Google Sans Flex', 'Google Sans', sans-serif";

                const elementsToCondensed = inner.querySelectorAll('*');
                elementsToCondensed.forEach(el => {
                    el.style.fontStretch = fontWidthVal;
                    el.style.fontVariationSettings = varSettings;
                });
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
                    display: 'block'
                }}
            >
                {children}
            </div>
        </div>
    );
};

