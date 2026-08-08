import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatActivityMechanic } from '../../utils/mechanicFormatter';
import { processDiceInChildren } from './DiceRoller';
import { renderIcon } from '../../utils/cardUtils';
import 'mdui/components/card.js';
import 'mdui/components/divider.js';

export const renderResourceIcon = (activity, char) => {
  const rawResource = activity.resource || activity.resources;
  const resourceList = Array.isArray(rawResource) ? rawResource : (rawResource ? [rawResource] : []);
  
  for (const resId of resourceList) {
    if (!resId) continue;
    const lowerId = String(resId).toLowerCase();
    if (lowerId.includes('spellslot')) {
      const hasSpecific = char?.resources?.some(r => (r.id || '').toLowerCase() === lowerId || (r.name || '').toLowerCase() === lowerId);
      const hasPact = char?.resources?.some(r => r.id === 'pactMagicSpellSlot');
      if (hasSpecific || hasPact) {
        return renderIcon(resId, false);
      }
    } else {
      return renderIcon(resId, false);
    }
  }

  // Default at-will icon if no specific resource
  return renderIcon('atWill', false);
};

export const ActivitySheetItem = memo(({ activity, char }) => {
  if (!activity) return null;

  const formattedLine = formatActivityMechanic(activity, char);
  const resourceIcon = renderResourceIcon(activity, char);

  const markdownComponents = {
    p: ({ children }) => (
      <span className="activity-sheet-line">
        {processDiceInChildren(children, true, activity.name)}
      </span>
    ),
    span: ({ children }) => (
      <span>{processDiceInChildren(children, true, activity.name)}</span>
    )
  };

  return (
    <div className="activity-sheet-item">
      <div className="activity-sheet-icon">
        {resourceIcon}
      </div>
      <div className="activity-sheet-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {formattedLine}
        </ReactMarkdown>
      </div>
    </div>
  );
});

export const groupActivities = (activities = []) => {
  const coreIds = ['dash', 'disengage', 'hide', 'dodge', 'help', 'ready', 'study', 'search', 'influence'];
  const groups = {
    'core': [],
    'action': [],
    'bonus action': [],
    'reaction': [],
    'free action': [],
    'other': []
  };

  (activities || []).forEach((activity) => {
    const id = (activity.id || '').toLowerCase();
    if (coreIds.includes(id)) {
      groups['core'].push(activity);
      return;
    }

    const time = activity.time?.toLowerCase() || 'other';

    if (groups[time]) {
      groups[time].push(activity);
    } else {
      groups['other'].push(activity);
    }
  });

  return groups;
};

export const ActivitySheet = memo(({ groupedActivities, characterData }) => {
  const effectiveGroups = React.useMemo(() => {
    if (groupedActivities) return groupedActivities;
    return groupActivities(characterData?.activities || []);
  }, [groupedActivities, characterData?.activities]);

  const activityCategories = [
    { key: 'core', label: 'Core Actions' },
    { key: 'action', label: 'Actions' },
    { key: 'bonus action', label: 'Bonus Actions' },
    { key: 'reaction', label: 'Reactions' },
    { key: 'free action', label: 'Special Actions' },
    { key: 'other', label: 'Other Actions' }
  ];

  return (
    <div className="activity-sheet-container">
      {activityCategories.map(({ key, label }) => {
        const activities = effectiveGroups[key] || [];
        if (activities.length === 0) return null;
        return (
          <div key={key} className="aside-card-group">
            <div className="title-primary">{label}</div>
            <div className="activity-sheet-list">
              {activities.map((item, idx) => (
                <ActivitySheetItem key={`${item.id || 'act'}-${idx}`} activity={item} char={characterData} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
});
