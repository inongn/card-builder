import React, { useLayoutEffect, useRef } from 'react';

/**
 * A component that scales further paragraphs (and extras) down until content fits its container,
 * keeping the first paragraph at maxFontSize.
 */
export const AutoFitContent = ({ children, maxFontSize = 8, minFontSize = 6, step = 2, unit = 'pt' }) => {
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

            // Set base font size for the inner container
            inner.style.fontSize = `${maxFontSize}${unit}`;

            // Find all paragraph-level elements
            const paragraphs = Array.from(
                inner.querySelectorAll('.card-description-paragraph, p:not(.card-description-paragraph p), li')
            );
            const extraContainers = Array.from(inner.querySelectorAll('.card-description.extra'));

            // The first paragraph is always at maxFontSize
            if (paragraphs.length > 0) {
                paragraphs[0].style.fontSize = `${maxFontSize}${unit}`;
            }

            const furtherParagraphs = paragraphs.slice(1);

            const applySizeToFurther = (size) => {
                furtherParagraphs.forEach(el => {
                    el.style.fontSize = `${size}${unit}`;
                });
                extraContainers.forEach(el => {
                    el.style.fontSize = `${size}${unit}`;
                });
            };

            let currentSize = maxFontSize;
            applySizeToFurther(currentSize);

            // If there are no further paragraphs or extras, inner stays at maxFontSize
            if (furtherParagraphs.length === 0 && extraContainers.length === 0) {
                return;
            }

            const maxIterations = 100;
            let iteration = 0;

            while (inner.scrollHeight > containerHeight + 1 && currentSize > minFontSize && iteration < maxIterations) {
                currentSize = Math.max(minFontSize, currentSize - step);
                applySizeToFurther(currentSize);
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
