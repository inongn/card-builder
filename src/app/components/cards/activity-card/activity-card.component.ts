import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { CharacterData, Activity } from '../../../../engine/types';
import { sortDescription } from '../../../utils/card-utils';
import { CardIconComponent } from '../card-icon/card-icon.component';
import { GridValueChipComponent } from '../grid-value-chip/grid-value-chip.component';
import { AutoFitContentComponent } from '../../auto-fit-content/auto-fit-content.component';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MarkdownComponent,
    CardIconComponent,
    GridValueChipComponent,
    AutoFitContentComponent
  ],
  template: `
    <!-- Static Print view Card -->
    <mat-card *ngIf="variant === 'static'" appearance="outlined" class="card-container static-card">
      <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
      <mat-card-content class="card-content flex-grow">
        <app-auto-fit-content>
          <ng-container *ngTemplateOutlet="bodyTemplate"></ng-container>
        </app-auto-fit-content>
      </mat-card-content>
    </mat-card>

    <!-- Collapsible Play view Expansion Panel -->
    <mat-expansion-panel *ngIf="variant === 'collapsible'" class="card-container pseudo-panel" [togglePosition]="'after'">
      <mat-expansion-panel-header class="panel-header-wrapper">
        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
      </mat-expansion-panel-header>
      <div class="card-content">
        <ng-container *ngTemplateOutlet="bodyTemplate"></ng-container>
      </div>
    </mat-expansion-panel>

    <!-- Reusable Templates -->
    <ng-template #headerTemplate>
      <div class="card-header">
        <span class="card-title">{{ activity?.name }}</span>
        <span class="spacer"></span>
        <div class="card-meta">
          <div class="card-meta-resource">
            <ng-container *ngFor="let item of resourceElements; let last = last">
              <!-- Render dots -->
              <div *ngIf="item.type === 'dots'" class="resource-dots" [style.gridTemplateColumns]="getDotsGridStyle(item.quantity)">
                <mat-icon *ngFor="let dummy of getDummyArray(item.quantity)" name="crop_square" class="res-dot-square">
                  crop_square
                </mat-icon>
              </div>
              
              <!-- Render icon string -->
              <app-card-icon *ngIf="item.type === 'icon'" [text]="item.iconId" [showText]="false"></app-card-icon>
              
              <!-- Render separator text -->
              <span *ngIf="item.type === 'separator'" class="resource-sep">or</span>
            </ng-container>
          </div>
        </div>
      </div>
    </ng-template>

    <ng-template #bodyTemplate>
      <div class="card-grid">
        <app-grid-value-chip *ngIf="activity?.time" [value]="activity?.time" type="time"></app-grid-value-chip>
        <app-grid-value-chip *ngIf="activity?.range" [value]="activity?.range" type="range"></app-grid-value-chip>
        <app-grid-value-chip *ngIf="activity?.duration" [value]="activity?.duration" type="duration"></app-grid-value-chip>
      </div>
      
      <div class="card-description-wrapper">
        <!-- Main Description -->
        <div *ngIf="activity?.description" class="card-description">
          <div *ngFor="let line of getDescriptionLines()" class="card-description-paragraph">
            <markdown [data]="line"></markdown>
          </div>
        </div>

        <!-- Extra details -->
        <div *ngIf="activity?.extra && getExtrasList().length > 0" class="card-description extra">
          <div *ngFor="let line of getExtrasList()" class="card-description-paragraph">
            <markdown [data]="line"></markdown>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .card-container {
      border: 1px solid var(--mat-sys-outline-variant, #ccc);
      border-radius: 8px;
      margin-bottom: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: var(--mat-sys-surface-container, #ffffff);
    }
    .static-card {
      width: 100%;
      height: 100%;
      min-height: 250px;
    }
    .flex-grow {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .pseudo-panel {
      box-shadow: none !important;
      border: 1px solid var(--mat-sys-outline-variant, #ccc) !important;
    }
    .panel-header-wrapper {
      padding: 0 16px !important;
      height: 56px !important;
    }
    .card-header {
      display: flex;
      align-items: center;
      width: 100%;
      min-width: 0;
    }
    .card-title {
      font-size: 1.05rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 70%;
    }
    .spacer {
      flex: 1;
    }
    .card-meta {
      display: flex;
      align-items: center;
    }
    .card-meta-resource {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .resource-sep {
      font-size: 0.75rem;
      opacity: 0.7;
      font-weight: bold;
    }
    .resource-dots {
      display: grid;
      justify-items: end;
      direction: rtl;
      gap: 2px;
    }
    .res-dot-square {
      font-size: 0.85rem;
      width: 0.85rem;
      height: 0.85rem;
      transform: rotate(45deg);
      direction: ltr;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--mat-sys-primary, #6750a4);
    }
    .card-content {
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex: 1;
    }
    .card-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 8px;
    }
    .card-description-wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .card-description {
      font-size: 0.95rem;
      line-height: 1.45;
    }
    .card-description.extra {
      border-top: 1px dashed var(--mat-sys-outline-variant, #ccc);
      padding-top: 8px;
      margin-top: 4px;
    }
    .card-description-paragraph {
      margin-bottom: 4px;
    }
    .card-description-paragraph :deep(p) {
      margin: 0;
    }
  `]
})
export class ActivityCardComponent implements OnChanges {
  @Input() activity: Activity | null = null;
  @Input() variant: 'collapsible' | 'static' = 'collapsible';
  @Input() char: CharacterData | null = null;

  public resourceElements: any[] = [];
  private RESOURCE_WRAP_THRESHOLD = 10;

  ngOnChanges() {
    this.processResources();
  }

  isArray(val: any): boolean {
    return Array.isArray(val);
  }

  castToString(val: any): string {
    if (Array.isArray(val)) {
      return val.join('\n');
    }
    return val || '';
  }

  getDescriptionLines(): string[] {
    if (!this.activity || !this.activity.description) return [];
    if (Array.isArray(this.activity.description)) {
      return this.activity.description;
    }
    return [this.activity.description];
  }

  getDummyArray(size: number): number[] {
    return Array(size || 0).fill(0);
  }

  getDotsGridStyle(quantity: number): string {
    const rows = quantity > this.RESOURCE_WRAP_THRESHOLD ? Math.ceil(quantity / this.RESOURCE_WRAP_THRESHOLD) : 1;
    const dotsPerRow = Math.max(1, Math.ceil(quantity / rows));
    return `repeat(${dotsPerRow}, auto)`;
  }

  getExtrasList(): string[] {
    if (!this.activity || !this.activity.extra) return [];
    const rawExtras = Array.isArray(this.activity.extra) ? this.activity.extra : [this.activity.extra];
    
    if (this.variant === 'static') {
      return sortDescription(rawExtras);
    }
    return rawExtras;
  }

  private processResources() {
    this.resourceElements = [];
    if (!this.activity) return;

    const rawResource = this.activity.resource || this.activity.resources;
    const resourceList = Array.isArray(rawResource) ? rawResource : (rawResource ? [rawResource] : []);

    const validElements: any[] = [];
    resourceList.forEach(resId => {
      const el = this.renderResourceOption(resId);
      if (el) validElements.push(el);
    });

    // Add uses if present
    if (this.activity.uses) {
      validElements.push({ type: 'dots', quantity: this.activity.uses });
    }

    // Build resource list with 'or' separators
    validElements.forEach((el, index) => {
      this.resourceElements.push(el);
      if (index < validElements.length - 1) {
        this.resourceElements.push({ type: 'separator' });
      }
    });

    // Fallback to atWill if empty
    if (this.resourceElements.length === 0) {
      this.resourceElements.push({ type: 'icon', iconId: 'atWill' });
    }
  }

  private renderResourceOption(resId: string): any {
    const lowerId = resId.toLowerCase();
    const isSpellSlot = lowerId.includes('spellslot');

    if (isSpellSlot) {
      const hasSpecific = this.char?.resources?.some(r => (r.id || '').toLowerCase() === lowerId || (r.name || '').toLowerCase() === lowerId);
      const hasPact = this.char?.resources?.some(r => r.id === 'pactMagicSpellSlot');

      if (!hasSpecific && !hasPact) return null;
      return { type: 'icon', iconId: resId };
    }

    const res = this.char?.resources?.find(r => r.id === resId || r.name === resId);
    if (res && this.char?.activities) {
      // If resource is used by only ONE activity, render dots
      const count = this.char.activities.filter(a => {
        const aRes = a.resource || a.resources;
        return Array.isArray(aRes) ? aRes.includes(resId) : aRes === resId;
      }).length;

      if (count === 1) {
        return { type: 'dots', quantity: res.quantity };
      }
    }

    return { type: 'icon', iconId: resId };
  }
}
