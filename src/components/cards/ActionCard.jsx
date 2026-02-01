import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderGridValue, sortDescription } from '../../utils/cardUtils';

import 'mdui/components/card.js';
import 'mdui/components/collapse-item.js';

import { AutoFitContent } from '../AutoFitContent';

export const ActionCard = memo(({ card, variant = 'collapsible' }) => {
    const { t } = useTranslation();
    if (!card) return null;

    const isLongDescription = useMemo(() => {
        const desc = Array.isArray(card.description) ? card.description.join('') : (card.description || '');
        const extra = Array.isArray(card.extra) ? card.extra.join('') : (card.extra || '');
        return desc.length + extra.length > 1000;
    }, [card.description, card.extra]);

    const headerContent = (
        <div className="card-header" slot="header">
            <div className="card-meta">
                <div>
                    {card.resource ? renderGridValue(card.resource, 'resource', false) : renderGridValue('free action', 'time', false)}
                </div>
            </div>
            <span className="card-title">{card.name}</span>
        </div>
    );

    const bodyContent = (
        <>
            <div className="card-grid">
                {card.range && renderGridValue(card.range, 'range')}
                {card.duration && renderGridValue(card.duration, 'duration')}
                {card.time && renderGridValue(card.time, 'time')}
            </div>
            <div className="card-content">
                {variant === 'static' ? (
                    <AutoFitContent>
                        {card.description && (
                            <div className={`card-description`}>
                                {Array.isArray(card.description) ?
                                    card.description.map((line, i) => (
                                        <div key={i} className="card-description-paragraph">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
                                        </div>
                                    )) :
                                    <div className="card-description-paragraph">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.description}</ReactMarkdown>
                                    </div>
                                }
                            </div>
                        )}

                        {card.extra && (
                            <div className={`card-description extra`}>
                                {Array.isArray(card.extra) ?
                                    sortDescription(card.extra).map((line, i) => (
                                        <div key={i} className="card-description-paragraph">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
                                        </div>
                                    )) :
                                    <div className="card-description-paragraph">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.extra}</ReactMarkdown>
                                    </div>
                                }
                            </div>
                        )}
                    </AutoFitContent>
                ) : (
                    <>
                        {card.description && (
                            <div className={`card-description`}>
                                {Array.isArray(card.description) ?
                                    card.description.map((line, i) => (
                                        <div key={i} className="card-description-paragraph">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
                                        </div>
                                    )) :
                                    <div className="card-description-paragraph">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.description}</ReactMarkdown>
                                    </div>
                                }
                            </div>
                        )}

                        {card.extra && (
                            <div className={`card-description extra`}>
                                {Array.isArray(card.extra) ?
                                    sortDescription(card.extra).map((line, i) => (
                                        <div key={i} className="card-description-paragraph">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
                                        </div>
                                    )) :
                                    <div className="card-description-paragraph">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.extra}</ReactMarkdown>
                                    </div>
                                }
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );

    if (variant === 'static') {
        return (
            <mdui-card variant="outlined" class="card-container static-card">
                {headerContent}
                {bodyContent}
            </mdui-card>
        );
    }

    return (
        <mdui-collapse-item variant="filled" class="card-container">
            {headerContent}
            {bodyContent}
        </mdui-collapse-item>
    );
});
