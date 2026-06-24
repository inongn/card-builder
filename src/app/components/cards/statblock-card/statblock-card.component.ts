import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { Statblock } from '../../../../engine/types';
import { AutoFitContentComponent } from '../../auto-fit-content/auto-fit-content.component';

@Component({
  selector: 'app-statblock-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatIconModule,
    MarkdownComponent,
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
        <span class="card-title">
          {{ capitalize(statblock?.category || '') }}: {{ statblock?.name }}
        </span>
        <span class="spacer"></span>
        <div class="card-meta">
          <span class="text-secondary">{{ statblock?.size }} {{ statblock?.classification }}</span>
        </div>
      </div>
    </ng-template>

    <ng-template #bodyTemplate>
      <div class="statblock-vitals">
        <div><strong>Armor Class</strong> {{ statblock?.ac }}</div>
        <div><strong>Hit Points</strong> {{ statblock?.hp }}</div>
        <div *ngIf="hasMovement()">
          <strong>Speed</strong> {{ getMovementString() }}
        </div>
        <div *ngIf="hasSenses()">
          <strong>Senses</strong> {{ getSensesString() }}
        </div>
      </div>

      <mat-divider class="divider"></mat-divider>

      <!-- Stat scores grid (STR, DEX, etc.) -->
      <div class="statblock-stats-row" *ngIf="statblock?.stats">
        <div *ngFor="let s of getStatsKeys()" class="statblock-stat-item">
          <strong>{{ s.toUpperCase() }}</strong>
          <div>{{ statblock?.stats?.[s] }}</div>
        </div>
      </div>

      <!-- Traits -->
      <ng-container *ngIf="statblock?.traits && statblock!.traits!.length > 0">
        <mat-divider class="divider"></mat-divider>
        <div class="section-block">
          <div *ngFor="let trait of statblock?.traits" class="trait-row">
            <strong>{{ trait.name }}.</strong>
            <markdown [data]="trait.description" class="inline-markdown"></markdown>
          </div>
        </div>
      </ng-container>

      <!-- Actions -->
      <ng-container *ngIf="statblock?.actions && statblock!.actions!.length > 0">
        <mat-divider class="divider"></mat-divider>
        <div class="section-block">
          <div *ngFor="let act of statblock?.actions" class="action-row">
            <strong>{{ act.name }}.</strong>
            <markdown [data]="act.description" class="inline-markdown"></markdown>
          </div>
        </div>
      </ng-container>

      <!-- Bonus Actions -->
      <ng-container *ngIf="statblock?.bonusActions && statblock!.bonusActions!.length > 0">
        <mat-divider class="divider"></mat-divider>
        <div class="section-block">
          <div *ngFor="let bAct of statblock?.bonusActions" class="action-row">
            <strong>{{ bAct.name }}.</strong>
            <markdown [data]="bAct.description" class="inline-markdown"></markdown>
          </div>
        </div>
      </ng-container>
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
      font-size: 0.85rem;
      opacity: 0.7;
    }
    .card-content {
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
      font-size: 0.9rem;
      line-height: 1.4;
    }
    .statblock-vitals {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .divider {
      margin: 8px 0;
    }
    .statblock-stats-row {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 4px;
      text-align: center;
    }
    .statblock-stat-item {
      font-size: 0.8rem;
    }
    .section-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .trait-row, .action-row {
      margin-bottom: 2px;
    }
    .inline-markdown {
      display: inline;
    }
    .inline-markdown :deep(p) {
      display: inline;
      margin: 0;
    }
  `]
})
export class StatblockCardComponent {
  @Input() statblock: Statblock | null = null;
  @Input() variant: 'collapsible' | 'static' = 'collapsible';

  capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  hasMovement(): boolean {
    return !!this.statblock?.movement && Object.keys(this.statblock.movement).length > 0;
  }

  getMovementString(): string {
    if (!this.statblock?.movement) return '';
    return Object.entries(this.statblock.movement)
      .map(([type, speed]) => `${type} ${speed} ft.`)
      .join(', ');
  }

  hasSenses(): boolean {
    return !!this.statblock?.senses && Object.keys(this.statblock.senses).length > 0;
  }

  getSensesString(): string {
    if (!this.statblock?.senses) return '';
    return Object.entries(this.statblock.senses)
      .map(([type, range]) => `${type} ${range} ft.`)
      .join(', ');
  }

  getStatsKeys(): string[] {
    if (!this.statblock?.stats) return [];
    return Object.keys(this.statblock.stats);
  }
}
