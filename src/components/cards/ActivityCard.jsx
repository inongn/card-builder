import React, { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderGridValue, renderIcon, sortDescription } from '../../utils/cardUtils';

import 'mdui/components/card.js';
import 'mdui/components/collapse-item.js';

import { AutoFitContent } from '../AutoFitContent';

export const ActivityCard = memo(({ activity, variant = 'collapsible' }) => {
    if (!activity) return null;


    const headerContent = (
        <div className="card-header" slot={variant === 'collapsible' ? 'header' : undefined}>
            <div className="card-meta">
                <div className="card-meta-resource">
                    {activity.resource ? renderIcon(activity.resource, false) : renderIcon('atWill', false)}
                </div>
            </div>
            <span className="card-title">{activity.name}</span>
        </div>
    );

    const bodyContent = (
        <>
            <div className="card-grid">
                {activity.time && renderGridValue(activity.time, 'time')}
                {activity.range && renderGridValue(activity.range, 'range')}
                {activity.duration && renderGridValue(activity.duration, 'duration')}
            </div>
            <div className="card-content">
                {variant === 'static' ? (
                    <AutoFitContent>
                        {activity.description && (
                            <div className={`card-description`}>
                                {Array.isArray(activity.description) ?
                                    activity.description.map((line, i) => (
                                        <div key={i} className="card-description-paragraph">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
                                        </div>
                                    )) :
                                    <div className="card-description-paragraph">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{activity.description}</ReactMarkdown>
                                    </div>
                                }
                            </div>
                        )}

                        {activity.extra && (
                            <div className={`card-description extra`}>
                                {Array.isArray(activity.extra) ?
                                    sortDescription(activity.extra).map((line, i) => (
                                        <div key={i} className="card-description-paragraph">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
                                        </div>
                                    )) :
                                    <div className="card-description-paragraph">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{activity.extra}</ReactMarkdown>
                                    </div>
                                }
                            </div>
                        )}
                    </AutoFitContent>
                ) : (
                    <>
                        {activity.description && (
                            <div className={`card-description`}>
                                {Array.isArray(activity.description) ?
                                    activity.description.map((line, i) => (
                                        <div key={i} className="card-description-paragraph">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
                                        </div>
                                    )) :
                                    <div className="card-description-paragraph">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{activity.description}</ReactMarkdown>
                                    </div>
                                }
                            </div>
                        )}

                        {activity.extra && (
                            <div className={`card-description extra`}>
                                {Array.isArray(activity.extra) ?
                                    sortDescription(activity.extra).map((line, i) => (
                                        <div key={i} className="card-description-paragraph">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
                                        </div>
                                    )) :
                                    <div className="card-description-paragraph">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{activity.extra}</ReactMarkdown>
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
        <mdui-collapse-item mdui-card class="card-container pseudo-card">
            {headerContent}
            {bodyContent}
        </mdui-collapse-item>
    );
});
