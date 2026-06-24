export interface Stat {
  score: number;
  mod: number;
}

export interface Skill {
  name: string;
  stat: string;
  proficiency: number;
  bonus: number;
  adv?: boolean;
  dis?: boolean;
  min?: number;
}

export interface Save {
  stat: string;
  proficiency: number;
  bonus: number;
  adv?: boolean;
  dis?: boolean;
  min?: number;
}

export interface Resource {
  id: string;
  name: string;
  quantity: number;
}

export interface Activity {
  id: string;
  name: string;
  time?: string;
  range?: string;
  duration?: string;
  description?: string | string[];
  extra?: string | string[];
  uses?: number;
  resource?: string | string[];
  resources?: string | string[];
}

export interface Statblock {
  name: string;
  size: string;
  classification: string;
  ac: string;
  hp: string;
  movement?: Record<string, number>;
  stats?: Record<string, number>;
  category: string;
  senses?: Record<string, number>;
  traits?: Array<{ name: string; description: string }>;
  actions?: Array<{ name: string; description: string }>;
  bonusActions?: Array<{ name: string; description: string }>;
}

export interface CharacterAttributes {
  proficiencies: string[];
  prof?: number;
  hp?: number;
  initiative?: number;
  initiativeAdvantage?: boolean;
  initiativeDisadvantage?: boolean;
  ac?: number;
  movement?: { walk: number; [key: string]: number };
  senses?: Record<string, number>;
  resistances?: string[];
  advantages?: string[];
  immunities?: string[];
  tools?: string[];
  pointBuyScoreLimit?: number;
  pointBuyLimit?: number;
  originScoreLimit?: number;
  originPoolLimit?: number;
  originEligible?: string[];
  asiPoolLimit?: number;
  [key: string]: any;
}

export interface CharacterData {
  meta: Record<string, any>;
  stats: Record<string, Stat>;
  attributes: CharacterAttributes;
  skills: Record<string, Skill>;
  saves: Record<string, Save>;
  resources: Resource[];
  features: any[];
  activities: Activity[];
  statblocks: Statblock[];
}

export interface PropertyNode {
  id: string;
  name?: string;
  displayName?: string;
  type: 'Folder' | 'Slot' | 'Input' | 'Reference' | 'Effect' | 'Extra' | 'Activity' | 'Statblock' | string;
  description?: string | string[];
  subtype?: string;
  target?: string;
  value?: any;
  default?: any;
  min?: number;
  max?: number;
  condition?: string;
  ignoreCondition?: boolean;
  tags?: string[];
  variables?: Record<string, any>;
  overwrite?: Record<string, any>;
  expanded?: boolean;
  children?: PropertyNode[];
  filled?: {
    id: string;
    name: string;
    displayName: string;
    type: string;
    tags?: string[];
  } | null;
  slotIndex?: number;
  priority?: number;
  [key: string]: any;
}

export interface RecipeInput {
  path: number[];
  value: any;
}

export interface RecipeSlot {
  path: Array<{ id: string; slotIndex?: number }>;
  propertyId: string;
}

export interface Recipe {
  inputs: RecipeInput[];
  slots: RecipeSlot[];
}
