import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CharacterStateService } from '../../services/character-state.service';
import { PropertyNode } from '../../../engine/types';
import { 
  PropertySelectionTreeComponent, 
  PropertySelectionDescriptionComponent 
} from '../../components/property-selection-tree/property-selection-tree.component';
import { 
  getAvailableCategories, 
  isBuilderComplete, 
  getCategoryStats 
} from '../../utils/builder-utils';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    PropertySelectionTreeComponent,
    PropertySelectionDescriptionComponent
  ],
  template: `
    <div class="container builder-screen">
      <mat-toolbar color="primary" class="app-toolbar">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span class="toolbar-title">Aspida Builder</span>
        <span class="toolbar-spacer"></span>
        <button mat-flat-button class="save-btn" 
          [disabled]="!isComplete()" 
          (click)="save()">
          <mat-icon>save</mat-icon> Save
        </button>
        <button mat-icon-button class="theme-toggle-btn" (click)="toggleTheme()">
          <mat-icon>{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
      </mat-toolbar>

      <!-- Step Navigation Bar -->
      <div class="header-nav">
        <button 
          *ngFor="let step of orderedSteps"
          mat-button
          [class.active-nav-btn]="selectedCategory() === step.key"
          [disabled]="!isAvailable(step.key)"
          (click)="selectCategory(step.key)"
          class="nav-btn">
          <mat-icon class="btn-icon">{{ step.icon }}</mat-icon>
          <span class="btn-label">{{ step.label }}</span>
          
          <!-- Complete Check Icon -->
          <mat-icon *ngIf="isStepComplete(step.key)" class="check-icon">check</mat-icon>
          
          <!-- Pending Indicator Badge -->
          <span *ngIf="getStepPending(step.key) > 0" class="pending-badge">!</span>
        </button>
      </div>

      <!-- Main Selection content and Description Panels -->
      <div class="content builder-content">
        <div class="tree-container">
          <app-property-selection-tree
            [tree]="propertyTree()"
            [char]="characterData()"
            [filterCategory]="selectedCategory()"
            (updateInput)="updateInput($event)"
            (fillSlot)="fillSlot($event)"
            (clearSlot)="clearSlot($event)"
            (getSlotOptionsCallback)="getSlotOptions($event)">
          </app-property-selection-tree>
        </div>

        <div class="description-container">
          <app-property-selection-description
            [tree]="propertyTree()"
            [char]="characterData()"
            [filterCategory]="selectedCategory()"
            (getProperty)="getProperty($event)">
          </app-property-selection-description>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      box-sizing: border-box;
    }
    .app-toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toolbar-title {
      font-weight: 500;
    }
    .toolbar-spacer {
      flex: 1 1 auto;
    }
    .header-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 8px 16px;
      border-bottom: 1px solid var(--mat-sys-outline-variant, #ccc);
      background: var(--mat-sys-surface-container-low, #f5f5f5);
      align-items: center;
    }
    .nav-btn {
      position: relative;
      font-size: 0.9rem;
      padding: 0 12px;
    }
    .active-nav-btn {
      background-color: var(--mat-sys-secondary-container, #e8def8) !important;
      color: var(--mat-sys-on-secondary-container, #1d192b) !important;
      border-radius: 20px;
    }
    .btn-icon {
      font-size: 1.1rem;
      width: 1.1rem;
      height: 1.1rem;
      margin-right: 4px;
      vertical-align: middle;
    }
    .btn-label {
      vertical-align: middle;
    }
    .check-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      color: var(--mat-sys-primary, #6750a4);
      margin-left: 4px;
      vertical-align: middle;
    }
    .pending-badge {
      display: inline-block;
      background: var(--mat-sys-error, #ba1a1a);
      color: var(--mat-sys-on-error, #ffffff);
      font-size: 0.75rem;
      font-weight: bold;
      width: 16px;
      height: 16px;
      line-height: 16px;
      border-radius: 50%;
      text-align: center;
      margin-left: 6px;
      vertical-align: middle;
    }
    .builder-content {
      display: flex;
      flex: 1;
      overflow: hidden;
      padding: 16px;
      gap: 16px;
    }
    .tree-container {
      flex: 3;
      overflow-y: auto;
      padding-right: 8px;
      max-width: 60%;
    }
    .description-container {
      flex: 2;
      overflow-y: auto;
      border-left: 1px solid var(--mat-sys-outline-variant, #ccc);
      padding-left: 16px;
    }
    @media (max-width: 800px) {
      .builder-content {
        flex-direction: column;
        overflow-y: auto;
      }
      .tree-container, .description-container {
        max-width: 100%;
        flex: none;
        overflow-y: visible;
        border-left: none;
        padding-left: 0;
      }
    }
  `]
})
export class BuilderComponent {
  private stateService = inject(CharacterStateService);
  private router = inject(Router);

  selectedCategory = signal<string>('origin');
  builderSource = this.stateService.builderSource;

  propertyTree = this.stateService.propertyTree;
  characterData = this.stateService.characterData;
  isDarkMode = this.stateService.isDarkMode;

  availableCategories = computed(() => 
    getAvailableCategories(this.propertyTree(), this.characterData())
  );

  isComplete = computed(() => 
    isBuilderComplete(this.propertyTree(), this.characterData())
  );

  categoryStats = computed(() => 
    getCategoryStats(this.propertyTree(), this.characterData())
  );

  orderedSteps = [
    { key: 'origin', icon: 'person', label: 'Origin' },
    { key: 'class', icon: 'school', label: 'Class' },
    { key: 'feats', icon: 'emoji_events', label: 'Feats' },
    { key: 'stats', icon: 'fitness_center', label: 'Abilities' },
    { key: 'skills', icon: 'psychology', label: 'Skills' },
    { key: 'spellcasting', icon: 'auto_fix_high', label: 'Spells' },
    { key: 'equipment', icon: 'shield', label: 'Equipment' },
  ];

  constructor() {
    // Automatically select first category if current is not available
    effect(() => {
      const cats = this.availableCategories();
      const selected = this.selectedCategory();
      if (cats.length > 0 && !cats.includes(selected)) {
        this.selectedCategory.set(cats[0]);
      }
    });
  }

  isAvailable(key: string): boolean {
    return this.availableCategories().includes(key);
  }

  isStepComplete(key: string): boolean {
    const stats = this.categoryStats();
    return stats[key]?.isComplete ?? false;
  }

  getStepPending(key: string): number {
    const stats = this.categoryStats();
    return stats[key]?.pending ?? 0;
  }

  selectCategory(key: string) {
    if (this.isAvailable(key)) {
      this.selectedCategory.set(key);
    }
  }

  updateInput(event: { path: number[]; value: any }) {
    this.stateService.updateInput(event.path, event.value);
  }

  fillSlot(event: { path: number[]; propertyId: string }) {
    this.stateService.fillSlot(event.path, event.propertyId);
  }

  clearSlot(event: { path: number[] }) {
    this.stateService.clearSlot(event.path);
  }

  getSlotOptions(event: { slot: PropertyNode; callback: (options: any[]) => void }) {
    event.callback(this.stateService.getSlotOptions(event.slot));
  }

  getProperty(event: { id: string; callback: (prop: PropertyNode | null) => void }) {
    event.callback(this.stateService.getProperty(event.id));
  }

  goBack() {
    this.router.navigate([this.builderSource() === 'play' ? '/play' : '/']);
  }

  save() {
    this.stateService.saveCharacter();
    this.router.navigate(['/play']);
  }

  toggleTheme() {
    this.stateService.toggleTheme();
  }
}
