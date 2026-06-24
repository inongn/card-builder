export interface PipelineStage {
    name: string;
    types: string[];
    conditionTiming: 'apply' | 'collect';
    evaluateAfter: boolean | string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
    {
        name: 'Foundation',
        types: ['Input', 'Stat'],
        conditionTiming: 'apply',   // Check conditions when applying
        evaluateAfter: true          // Run expression evaluation after this stage
    },
    {
        name: 'Attributes',
        types: ['Attribute', 'Skill', 'Save'],
        conditionTiming: 'apply',
        evaluateAfter: true
    },
    {
        name: 'Content',
        types: ['Resource', 'Activity', 'Statblock'],
        conditionTiming: 'apply',
        evaluateAfter: 'tags'        // Only evaluate 'tags' fields (so Effects can target by tag)
    },
    {
        name: 'Extras',
        types: ['Extra'],
        conditionTiming: 'apply',    // Check conditions when applying (deferred)
        evaluateAfter: true          // Full evaluation after Effects
    },
    {
        name: 'Effects',
        types: ['Effect'],
        conditionTiming: 'apply',    // Check conditions when applying (deferred)
        evaluateAfter: true          // Full evaluation after Effects
    }
];

// Build a lookup map for quick stage finding by type
export const TYPE_TO_STAGE = new Map<string, PipelineStage>();
PIPELINE_STAGES.forEach(stage => {
    stage.types.forEach(type => {
        TYPE_TO_STAGE.set(type, stage);
    });
});
