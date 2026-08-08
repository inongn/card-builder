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
      const hasSpecific = char?.resources ? char.resources.some(r => (r.id || '').toLowerCase() === lowerId || (r.name || '').toLowerCase() === lowerId) : true;
      const hasPact = char?.resources ? char.resources.some(r => r.id === 'pactMagicSpellSlot') : false;
      if (hasSpecific || hasPact) {
        return renderIcon(resId, false);
      }
    } else {
      return renderIcon(resId, false);
    }
  }

  // No specific resource — return null (no icon for at-will activities)
  return null;
};

export const ActivitySheetItem = memo(({ activity, char, printMode = false }) => {
  if (!activity) return null;

  const formattedLine = formatActivityMechanic(activity, char);
  const resourceIcon = renderResourceIcon(activity, char);

  const markdownComponents = {
    p: ({ children }) => (
      <div className="activity-sheet-line">
        {processDiceInChildren(children, !printMode, activity.name)}
      </div>
    ),
    blockquote: ({ children }) => (
      <div className="activity-sheet-extra">
        {children}
      </div>
    ),
    span: ({ children }) => (
      <span>{processDiceInChildren(children, !printMode, activity.name)}</span>
    )
  };

  return (
    <div className="activity-sheet-item">
      {resourceIcon && (
        <div className="activity-sheet-icon">
          {resourceIcon}
        </div>
      )}
      <div className="activity-sheet-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {formattedLine}
        </ReactMarkdown>
      </div>
    </div>
  );
});

// Sort activities within a group: no resource first, then by first resource id
export const sortByResource = (activities = []) =>
  [...activities].sort((a, b) => {
    const getRes = (act) => {
      const raw = act.resource || act.resources;
      const list = Array.isArray(raw) ? raw : (raw ? [raw] : []);
      return list[0] ? String(list[0]).toLowerCase() : '';
    };
    const ra = getRes(a);
    const rb = getRes(b);
    if (!ra && !rb) return 0;
    if (!ra) return -1;
    if (!rb) return 1;
    return ra.localeCompare(rb);
  });

export const groupActivities = (activities = []) => {
  const coreIds = [];
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

  // Sub-sort each group by resource (no resource first)
  Object.keys(groups).forEach(key => {
    groups[key] = sortByResource(groups[key]);
  });

  return groups;
};

export const ActivitySheet = memo(({ groupedActivities, characterData, printMode = false }) => {
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
                <ActivitySheetItem key={`${item.id || 'act'}-${idx}`} activity={item} char={characterData} printMode={printMode} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
});
