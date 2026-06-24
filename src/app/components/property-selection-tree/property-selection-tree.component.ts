import { Component, Input, Output, EventEmitter, inject, computed, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MarkdownComponent } from 'ngx-markdown';
import { ExpressionEvaluator } from '../../../engine/ExpressionEvaluator';
import { PropertyNode, CharacterData } from '../../../engine/types';
import { 
  CATEGORIES, 
  collectRenderableNodes, 
  categorizeNode 
} from '../../utils/builder-utils';

@Component({
  selector: 'app-property-selection-tree',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="category-creator">
      <!-- Abilities Summary and Point Buy Inputs -->
      <ng-container *ngIf="filterCategory === 'stats'">
        <div class="abilities-summary">
          <div class="summary-item">
            <div class="stat-label">Allocated</div>
            <div class="summary-value">{{ getAllocatedSum() }} / {{ char?.attributes?.pointBuyLimit || 0 }}</div>
          </div>
          <div class="summary-item">
            <div class="stat-label">Origin</div>
            <div class="summary-value">{{ getOriginSum() }} / {{ char?.attributes?.originPoolLimit || 0 }}</div>
          </div>
          <div class="summary-item" *ngIf="(char?.attributes?.asiPoolLimit || 0) > 0">
            <div class="stat-label">ASI</div>
            <div class="summary-value">{{ getAsiSum() }} / {{ char?.attributes?.asiPoolLimit || 0 }}</div>
          </div>
        </div>

        <div *ngFor="let stat of statsList" class="ability-smart-row">
          <div class="smart-controls">
            <mat-form-field appearance="outline" class="ability-value-field">
              <mat-label>{{ STAT_NAMES[stat] }}</mat-label>
              <input matInput type="number" 
                [ngModel]="getSmartAbilityValue(stat)"
                (ngModelChange)="handleSmartChange(stat, $event)"
                [min]="8" 
                [max]="getSmartAbilityMax(stat)">
              <mat-hint>Base 8 + {{ getStatMeta(stat, 'allocated') }} Allocated + {{ getStatMeta(stat, 'origin') }} Origin + {{ getStatMeta(stat, 'asi') }} ASI</mat-hint>
            </mat-form-field>
            <button mat-icon-button (click)="decrementSmart(stat)" [disabled]="getSmartAbilityValue(stat) <= 8">
              <mat-icon>remove</mat-icon>
            </button>
            <button mat-icon-button (click)="incrementSmart(stat)" [disabled]="getSmartAbilityValue(stat) >= getSmartAbilityMax(stat)">
              <mat-icon>add</mat-icon>
            </button>
          </div>
        </div>
      </ng-container>

      <!-- Standard Inputs and Slots -->
      <div *ngFor="let group of activeGroups" class="group-row">
        <ng-container *ngIf="group.value.length > 1; else singleItem">
          <!-- Render Grouped Slots (Multiple Selection) -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>{{ group.key }}</mat-label>
            <mat-select multiple 
              [ngModel]="getGroupSelectedValues(group.value)"
              (selectionChange)="handleGroupSelectionChange(group.value, $event.value)">
              <mat-option *ngFor="let opt of getGroupOptions(group.value)" 
                [value]="opt.id"
                [disabled]="isGroupOptionDisabled(group.value, opt.id)">
                {{ opt.displayName || opt.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </ng-container>

        <ng-template #singleItem>
          <!-- Render Single Input or Slot -->
          <ng-container *ngIf="group.value[0].type === 'Input'">
            <div class="input-row" [class.number-row]="group.value[0].node.subtype === 'number'">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>{{ getInputLabel(group.value[0]) }}</mat-label>
                
                <input matInput 
                  *ngIf="group.value[0].node.subtype !== 'number'"
                  [type]="group.value[0].node.subtype || 'text'" 
                  [ngModel]="group.value[0].node.value ?? group.value[0].node.default ?? ''"
                  (ngModelChange)="handleInputChange(group.value[0], $event)">

                <input matInput 
                  *ngIf="group.value[0].node.subtype === 'number'"
                  type="number" 
                  [min]="group.value[0].node.min ?? 0"
                  [max]="getInputMax(group.value[0])"
                  [disabled]="isInputDisabled(group.value[0])"
                  [ngModel]="group.value[0].node.value ?? group.value[0].node.default ?? 0"
                  (ngModelChange)="handleInputChange(group.value[0], $event)">
              </mat-form-field>

              <ng-container *ngIf="group.value[0].node.subtype === 'number'">
                <button mat-icon-button 
                  (click)="decrementInput(group.value[0])"
                  [disabled]="getInputNumberValue(group.value[0]) <= (group.value[0].node.min ?? 0)">
                  <mat-icon>remove</mat-icon>
                </button>
                <button mat-icon-button 
                  (click)="incrementInput(group.value[0])"
                  [disabled]="getInputNumberValue(group.value[0]) >= getInputMax(group.value[0])">
                  <mat-icon>add</mat-icon>
                </button>
              </ng-container>
            </div>
          </ng-container>

          <ng-container *ngIf="group.value[0].type === 'Slot'">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>{{ group.value[0].node.displayName || group.value[0].node.name }}</mat-label>
              <mat-select 
                [ngModel]="group.value[0].node.filled?.id || ''"
                (selectionChange)="handleSlotChange(group.value[0], $event.value)">
                <mat-option value="">-- None --</mat-option>
                <mat-option *ngFor="let opt of getSlotOptions(group.value[0].node)" [value]="opt.id">
                  {{ opt.displayName || opt.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </ng-container>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .category-creator {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    }
    .abilities-summary {
      display: flex;
      gap: 24px;
      margin-bottom: 8px;
      padding: 12px;
      background: var(--mat-sys-surface-container-low, #f0f0f0);
      border-radius: 8px;
    }
    .summary-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .stat-label {
      font-size: 0.8rem;
      opacity: 0.7;
      text-transform: uppercase;
      font-weight: 600;
    }
    .summary-value {
      font-size: 1.1rem;
      font-weight: 500;
    }
    .ability-smart-row {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    .smart-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      max-width: 400px;
    }
    .ability-value-field {
      flex: 1;
    }
    .input-row {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    .number-row mat-form-field {
      max-width: 250px;
    }
    .full-width {
      width: 100%;
    }
    .group-row {
      margin-bottom: 8px;
    }
  `]
})
export class PropertySelectionTreeComponent implements OnChanges {
  @Input() tree: PropertyNode | null = null;
  @Input() char: CharacterData | null = null;
  @Input() filterCategory: string = 'origin';

  @Output() updateInput = new EventEmitter<{ path: number[]; value: any }>();
  @Output() fillSlot = new EventEmitter<{ path: number[]; propertyId: string }>();
  @Output() clearSlot = new EventEmitter<{ path: number[] }>();
  @Output() getSlotOptionsCallback = new EventEmitter<{ slot: PropertyNode; callback: (options: any[]) => void }>();

  public statsList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  public STAT_NAMES: Record<string, string> = {
    str: 'Strength',
    dex: 'Dexterity',
    con: 'Constitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    cha: 'Charisma'
  };

  public activeGroups: Array<{ key: string; value: any[] }> = [];

  private abilityNodesMap: Record<string, Record<string, any>> = {
    allocated: {},
    origin: {},
    asi: {}
  };

  ngOnChanges() {
    this.updateActiveGroups();
  }

  private updateActiveGroups() {
    if (!this.tree || !this.char) {
      this.activeGroups = [];
      return;
    }
    const renderableNodes = collectRenderableNodes(this.tree, this.char);
    const categoryNodes: any[] = [];
    
    this.abilityNodesMap = { allocated: {}, origin: {}, asi: {} };

    renderableNodes.forEach(item => {
      if (item.type === 'Input') {
        const match = item.node.name ? item.node.name.match(/^(allocated|origin|asi)_(str|dex|con|int|wis|cha)$/) : null;
        if (match) {
          this.abilityNodesMap[match[1]][match[2]] = item;
          return;
        }
      }
      
      const category = categorizeNode(item);
      if (category === this.filterCategory) {
        categoryNodes.push(item);
      }
    });

    const groupsMap: Record<string, any[]> = {};
    categoryNodes.forEach(item => {
      if (item.type === 'Slot' && item.node.slotIndex !== undefined) {
        const baseName = (item.node.displayName || item.node.name || '').replace(/ #\d+$/, '');
        if (!groupsMap[baseName]) groupsMap[baseName] = [];
        groupsMap[baseName].push(item);
      } else {
        const key = `${item.type}-${item.path.join('-')}`;
        groupsMap[key] = [item];
      }
    });

    this.activeGroups = Object.entries(groupsMap).map(([key, value]) => ({ key, value }));
  }

  // Points buy sums
  getAllocatedSum(): number {
    return this.statsList.reduce((sum, s) => sum + (this.char?.meta?.[`allocated_${s}`] || 0), 0);
  }
  getOriginSum(): number {
    return this.statsList.reduce((sum, s) => sum + (this.char?.meta?.[`origin_${s}`] || 0), 0);
  }
  getAsiSum(): number {
    return this.statsList.reduce((sum, s) => sum + (this.char?.meta?.[`asi_${s}`] || 0), 0);
  }

  getStatMeta(stat: string, prefix: string): number {
    return this.char?.meta?.[`${prefix}_${stat}`] || 0;
  }

  getSmartAbilityValue(stat: string): number {
    const valAllocated = this.char?.meta?.[`allocated_${stat}`] || 0;
    const valOrigin = this.char?.meta?.[`origin_${stat}`] || 0;
    const valAsi = this.char?.meta?.[`asi_${stat}`] || 0;
    return 8 + valAllocated + valOrigin + valAsi;
  }

  getSmartAbilityMax(stat: string): number {
    if (!this.char) return 20;
    const attr = this.char.attributes || {};
    const meta = this.char.meta || {};

    const valAllocated = meta[`allocated_${stat}`] || 0;
    const valOrigin = meta[`origin_${stat}`] || 0;
    const valAsi = meta[`asi_${stat}`] || 0;

    const allocatedSum = this.getAllocatedSum();
    const originSum = this.getOriginSum();
    const asiSum = this.getAsiSum();

    const canAddAllocated = Math.min((attr.pointBuyScoreLimit || 0) - valAllocated, Math.max(0, (attr.pointBuyLimit || 0) - allocatedSum));
    const canAddOrigin = (attr.originEligible || []).includes(stat) 
      ? Math.min((attr.originScoreLimit || 0) - valOrigin, Math.max(0, (attr.originPoolLimit || 0) - originSum)) 
      : 0;
    const canAddAsi = Math.max(0, (attr.asiPoolLimit || 0) - asiSum);

    return Math.min(20, 8 + valAllocated + valOrigin + valAsi + canAddAllocated + canAddOrigin + canAddAsi);
  }

  handleSmartChange(stat: string, newValue: number) {
    if (!this.char) return;
    const attr = this.char.attributes || {};
    const meta = this.char.meta || {};
    const currentTotal = this.getSmartAbilityValue(stat);
    const maxVal = this.getSmartAbilityMax(stat);
    const targetValue = Math.max(8, Math.min(maxVal, newValue));
    let delta = targetValue - currentTotal;

    let curAllocated = meta[`allocated_${stat}`] || 0;
    let curOrigin = meta[`origin_${stat}`] || 0;
    let curAsi = meta[`asi_${stat}`] || 0;

    if (delta > 0) {
      while (delta > 0) {
        const currentAllocatedSum = this.statsList.reduce((sum, s) => sum + (s === stat ? curAllocated : (meta[`allocated_${s}`] || 0)), 0);
        const currentOriginSum = this.statsList.reduce((sum, s) => sum + (s === stat ? curOrigin : (meta[`origin_${s}`] || 0)), 0);
        const currentAsiSum = this.statsList.reduce((sum, s) => sum + (s === stat ? curAsi : (meta[`asi_${s}`] || 0)), 0);

        if (curAllocated < (attr.pointBuyScoreLimit || 0) && currentAllocatedSum < (attr.pointBuyLimit || 0)) {
          curAllocated++;
          if (this.abilityNodesMap.allocated[stat]) {
            this.updateInput.emit({ path: this.abilityNodesMap.allocated[stat].path, value: curAllocated });
          }
        } else if ((attr.originEligible || []).includes(stat) && curOrigin < (attr.originScoreLimit || 0) && currentOriginSum < (attr.originPoolLimit || 0)) {
          curOrigin++;
          if (this.abilityNodesMap.origin[stat]) {
            this.updateInput.emit({ path: this.abilityNodesMap.origin[stat].path, value: curOrigin });
          }
        } else if (currentAsiSum < (attr.asiPoolLimit || 0)) {
          curAsi++;
          if (this.abilityNodesMap.asi[stat]) {
            this.updateInput.emit({ path: this.abilityNodesMap.asi[stat].path, value: curAsi });
          }
        } else break;
        delta--;
      }
    } else if (delta < 0) {
      while (delta < 0) {
        if (curAsi > 0) {
          curAsi--;
          if (this.abilityNodesMap.asi[stat]) this.updateInput.emit({ path: this.abilityNodesMap.asi[stat].path, value: curAsi });
        } else if (curOrigin > 0) {
          curOrigin--;
          if (this.abilityNodesMap.origin[stat]) this.updateInput.emit({ path: this.abilityNodesMap.origin[stat].path, value: curOrigin });
        } else if (curAllocated > 0) {
          curAllocated--;
          if (this.abilityNodesMap.allocated[stat]) this.updateInput.emit({ path: this.abilityNodesMap.allocated[stat].path, value: curAllocated });
        } else break;
        delta++;
      }
    }
  }

  incrementSmart(stat: string) {
    this.handleSmartChange(stat, this.getSmartAbilityValue(stat) + 1);
  }

  decrementSmart(stat: string) {
    this.handleSmartChange(stat, this.getSmartAbilityValue(stat) - 1);
  }

  // Standard inputs helper
  getInputLabel(item: any): string {
    const node = item.node;
    return node.displayName || node.name || '';
  }

  getInputNumberValue(item: any): number {
    return Number(item.node.value ?? item.node.default ?? 0);
  }

  getInputMax(item: any): number {
    const node = item.node;
    const isAbilityInput = node.name ? node.name.match(/^(allocated|origin|asi)_/) : null;
    let maxVal = node.max;
    if (isAbilityInput && this.char) {
      const [prefix, stat] = node.name.split('_');
      const attr = this.char.attributes || {};
      const meta = this.char.meta || {};
      let individualLimit = node.max ?? Infinity;
      let collectiveLimit = Infinity;

      if (prefix === 'allocated') {
        individualLimit = attr.pointBuyScoreLimit ?? Infinity;
        collectiveLimit = attr.pointBuyLimit ?? Infinity;
      } else if (prefix === 'origin') {
        individualLimit = attr.originScoreLimit ?? Infinity;
        collectiveLimit = attr.originPoolLimit ?? Infinity;
      } else if (prefix === 'asi') {
        collectiveLimit = attr.asiPoolLimit ?? Infinity;
      }

      if (collectiveLimit !== Infinity) {
        const otherSum = this.statsList
          .filter(s => `${prefix}_${s}` !== node.name)
          .reduce((sum, s) => sum + (meta[`${prefix}_${s}`] || 0), 0);
        maxVal = Math.min(individualLimit, Math.max(0, collectiveLimit - otherSum));
      } else if (individualLimit !== Infinity) {
        maxVal = individualLimit;
      }
    }
    return maxVal ?? 100;
  }

  isInputDisabled(item: any): boolean {
    if (!this.char) return false;
    const node = item.node;
    const isAbilityInput = node.name ? node.name.match(/^(allocated|origin|asi)_/) : null;
    if (isAbilityInput) {
      const [prefix, stat] = node.name.split('_');
      const attr = this.char.attributes || {};
      if (prefix === 'origin' && attr.originEligible && !attr.originEligible.includes(stat)) {
        return true;
      }
    }
    return false;
  }

  handleInputChange(item: any, newVal: any) {
    const node = item.node;
    let value = node.subtype === 'number' ? (newVal === '' ? 0 : Number(newVal)) : newVal;
    if (node.subtype === 'number') {
      const maxVal = this.getInputMax(item);
      if (maxVal !== undefined) {
        value = Math.min(value, maxVal);
      }
    }
    this.updateInput.emit({ path: item.path, value });
  }

  incrementInput(item: any) {
    const val = this.getInputNumberValue(item);
    const maxVal = this.getInputMax(item);
    this.handleInputChange(item, Math.min(val + 1, maxVal));
  }

  decrementInput(item: any) {
    const val = this.getInputNumberValue(item);
    const minVal = item.node.min ?? 0;
    this.handleInputChange(item, Math.max(val - 1, minVal));
  }

  // Single Slot handling
  getSlotOptions(slot: PropertyNode): any[] {
    const options: any[] = [];
    this.getSlotOptionsCallback.emit({
      slot,
      callback: (opts) => {
        options.push(...opts);
      }
    });
    return options;
  }

  handleSlotChange(item: any, value: string) {
    if (value === '') {
      this.clearSlot.emit({ path: item.path });
    } else {
      this.fillSlot.emit({ path: item.path, propertyId: value });
    }
  }

  // Grouped Slots (Multiple selection select)
  getGroupSelectedValues(groupItems: any[]): string[] {
    return groupItems.map(item => item.node.filled?.id).filter(id => !!id);
  }

  getGroupOptions(groupItems: any[]): any[] {
    // Return options of the first slot (they are all identical slots in the group)
    const options = this.getSlotOptions(groupItems[0].node);
    
    // Make sure currently selected options are in the list
    groupItems.forEach(item => {
      if (item.node.filled && !options.some(opt => opt.id === item.node.filled.id)) {
        options.push({ id: item.node.filled.id, displayName: item.node.filled.displayName || item.node.filled.name });
      }
    });

    options.sort((a, b) => (a.displayName || a.name || '').localeCompare(b.displayName || b.name || ''));
    return options;
  }

  isGroupOptionDisabled(groupItems: any[], optionId: string): boolean {
    const selected = this.getGroupSelectedValues(groupItems);
    return selected.length >= groupItems.length && !selected.includes(optionId);
  }

  handleGroupSelectionChange(groupItems: any[], selection: string[]) {
    const limit = groupItems.length;
    let newValues = selection.filter(v => v !== "");
    if (newValues.length > limit) {
      newValues = newValues.slice(0, limit);
    }

    // 1. Clear slots that were unchecked
    groupItems.forEach(item => {
      const currentId = item.node.filled?.id;
      if (currentId && !newValues.includes(currentId)) {
        this.clearSlot.emit({ path: item.path });
      }
    });

    // 2. Fill empty slots with new checked values
    const currentFilledIds = groupItems.map(item => item.node.filled?.id).filter(id => !!id);
    const valuesToAdd = newValues.filter(val => !currentFilledIds.includes(val));

    let addIdx = 0;
    groupItems.forEach(item => {
      if (!item.node.filled && addIdx < valuesToAdd.length) {
        this.fillSlot.emit({ path: item.path, propertyId: valuesToAdd[addIdx] });
        addIdx++;
      }
    });
  }
}

@Component({
  selector: 'app-property-selection-description',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MarkdownComponent
  ],
  template: `
    <div class="property-selection-description">
      <mat-card 
        *ngFor="let item of folderCards" 
        class="card-container static-card"
        style="margin-bottom: 16px; width: 100%;">
        <mat-card-header class="card-header">
          <mat-card-title class="card-title">
            {{ item.fullFilled.displayName || item.fullFilled.name }}
          </mat-card-title>
        </mat-card-header>
        <mat-card-content class="card-content">
          <div class="card-description">
            <markdown [data]="item.fullFilled.description"></markdown>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .property-selection-description {
      width: 100%;
    }
    .card-container {
      border: 1px solid var(--mat-sys-outline-variant, #ccc);
      border-radius: 8px;
    }
    .card-header {
      padding: 16px 16px 8px 16px;
    }
    .card-title {
      font-size: 1.1rem;
      font-weight: 600;
    }
    .card-content {
      padding: 0 16px 16px 16px;
    }
    .card-description {
      font-size: 0.95rem;
      line-height: 1.5;
    }
  `]
})
export class PropertySelectionDescriptionComponent implements OnChanges {
  @Input() tree: PropertyNode | null = null;
  @Input() char: CharacterData | null = null;
  @Input() filterCategory: string = 'origin';
 
  @Output() getProperty = new EventEmitter<{ id: string; callback: (prop: PropertyNode | null) => void }>();

  public folderCards: any[] = [];

  ngOnChanges() {
    this.updateFolderCards();
  }

  private updateFolderCards() {
    if (!this.tree || !this.char) {
      this.folderCards = [];
      return;
    }
    
    const renderableNodes = collectRenderableNodes(this.tree, this.char);
    const folderCards = renderableNodes.filter(item => {
      const nodeCat = categorizeNode(item);
      if (nodeCat !== this.filterCategory) return false;
      if (item.node.type !== 'Slot') return false;
      if (!item.node.filled) return false;

      let filled: any = item.node.filled;
      let type = (filled.type || '').toLowerCase();

      if (!filled.description) {
        this.getProperty.emit({
          id: filled.id,
          callback: (prop) => {
            if (prop) {
              filled = prop;
              type = (filled.type || '').toLowerCase();
            }
          }
        });
      }

      const evaluator = new ExpressionEvaluator(this.char || undefined);
      item.node.fullFilled = {
        ...filled,
        displayName: evaluator.evaluate(filled.displayName || filled.name || filled.id, item.node.variables || {}),
        description: evaluator.evaluate(filled.description || '', item.node.variables || {})
      };

      return type === 'folder' && item.node.fullFilled.description;
    });

    this.folderCards = folderCards.map(item => ({
      path: item.path,
      fullFilled: item.node.fullFilled
    }));
  }
}
