import { Component, inject, signal, computed, ViewChild, ElementRef, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CharacterStateService } from '../../services/character-state.service';
import { CharacterSheetComponent } from '../../components/cards/character-sheet/character-sheet.component';
import { ActivityCardComponent } from '../../components/cards/activity-card/activity-card.component';
import { StatblockCardComponent } from '../../components/cards/statblock-card/statblock-card.component';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    CharacterSheetComponent,
    ActivityCardComponent,
    StatblockCardComponent
  ],
  template: `
    <div class="container play-screen" *ngIf="characterData()">
      <mat-toolbar color="primary" class="app-toolbar">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span class="toolbar-title">{{ characterData()?.meta?.['name'] || 'Aspida' }}</span>
        <span class="toolbar-spacer"></span>
        
        <button mat-icon-button (click)="editCharacter()" title="Edit Character">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button (click)="printCharacter()" title="Print Cards">
          <mat-icon>print</mat-icon>
        </button>
        <button mat-icon-button class="theme-toggle-btn" (click)="toggleTheme()">
          <mat-icon>{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
      </mat-toolbar>

      <div class="content play-content">
        <div class="play-content-main">
          <!-- Character Sheet Component -->
          <app-character-sheet #charSheet [char]="characterData()" class="main-card"></app-character-sheet>
        </div>

        <div #aside class="play-content-aside">
          <ng-container *ngFor="let cat of categories">
            <div class="aside-card-group" *ngIf="groupedActivities()[cat.key]?.length > 0">
              <div class="title-primary category-heading">
                {{ cat.label }}
              </div>
              <mat-accordion class="panel-accordion" [multi]="false">
                <ng-container *ngFor="let item of groupedActivities()[cat.key]; let i = index">
                  <!-- Summon Statblock Card -->
                  <app-statblock-card *ngIf="cat.key === 'statblock'"
                    [statblock]="item"
                    [variant]="'collapsible'">
                  </app-statblock-card>

                  <!-- Standard Activity Card -->
                  <app-activity-card *ngIf="cat.key !== 'statblock'"
                    [activity]="item"
                    [char]="characterData()"
                    [variant]="'collapsible'">
                  </app-activity-card>
                </ng-container>
              </mat-accordion>
            </div>
          </ng-container>
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
    .play-content {
      display: flex;
      flex: 1;
      overflow: hidden;
      padding: 16px;
      gap: 16px;
    }
    .play-content-main {
      flex: 3;
      overflow-y: auto;
      max-width: 60%;
    }
    .play-content-aside {
      flex: 2;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-right: 8px;
    }
    .aside-card-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .category-heading {
      font-size: 1.1rem;
      font-weight: 600;
      border-bottom: 1px solid var(--mat-sys-outline-variant, #ccc);
      padding-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .panel-accordion {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    @media (max-width: 890px) {
      .play-content {
        flex-direction: column;
        overflow-y: auto;
      }
      .play-content-main, .play-content-aside {
        max-width: 100%;
        flex: none;
        overflow-y: visible;
      }
    }
  `]
})
export class PlayComponent implements AfterViewInit, OnDestroy {
  private stateService = inject(CharacterStateService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  characterData = this.stateService.characterData;
  isDarkMode = this.stateService.isDarkMode;

  @ViewChild('charSheet', { read: ElementRef }) charSheetRef!: ElementRef;
  @ViewChild('aside') asideRef!: ElementRef;

  private resizeObserver: ResizeObserver | null = null;
  private mediaQueryList: MediaQueryList | null = null;

  categories = [
    { key: 'core', label: 'Core Actions' },
    { key: 'action', label: 'Actions' },
    { key: 'bonus action', label: 'Bonus Actions' },
    { key: 'reaction', label: 'Reactions' },
    { key: 'free action', label: 'Special Actions' },
    { key: 'statblock', label: 'Companions & Summons' },
    { key: 'other', label: 'Other Options' }
  ];

  groupedActivities = computed(() => {
    const char = this.characterData();
    if (!char) return {};

    const coreIds = ['dash', 'disengage', 'hide', 'dodge', 'help', 'ready', 'study', 'search', 'influence'];
    const groups: Record<string, any[]> = {
      'core': [],
      'action': [],
      'bonus action': [],
      'reaction': [],
      'free action': [],
      'other': [],
      'statblock': char.statblocks || []
    };

    if (char.activities) {
      char.activities.forEach(activity => {
        const id = (activity.id || '').toLowerCase();
        if (coreIds.includes(id)) {
          groups['core'].push(activity);
          return;
        }

        const time = (activity.time || '').toLowerCase();
        if (groups[time]) {
          groups[time].push(activity);
        } else {
          groups['other'].push(activity);
        }
      });
    }

    return groups;
  });

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.mediaQueryList = window.matchMedia('(min-width: 891px)');
      
      const updatePadding = () => {
        const sheetEl = this.charSheetRef?.nativeElement;
        const asideEl = this.asideRef?.nativeElement;
        if (!sheetEl || !asideEl) return;

        if (this.mediaQueryList?.matches) {
          const mainCardHeight = sheetEl.getBoundingClientRect().height;
          // Set extra padding at the bottom of the aside so it aligns beautifully
          asideEl.style.paddingBottom = `calc(100vh - 64px - ${mainCardHeight}px)`;
        } else {
          asideEl.style.paddingBottom = '';
        }
      };

      this.resizeObserver = new ResizeObserver(() => updatePadding());
      if (this.charSheetRef?.nativeElement) {
        this.resizeObserver.observe(this.charSheetRef.nativeElement);
      }

      this.mediaQueryList.addEventListener('change', updatePadding);
      updatePadding();
    });
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.mediaQueryList) {
      // Clean up event listener
      this.mediaQueryList.removeEventListener('change', () => {});
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  editCharacter() {
    this.stateService.builderSource.set('play');
    this.router.navigate(['/builder']);
  }

  printCharacter() {
    this.router.navigate(['/print']);
  }

  toggleTheme() {
    this.stateService.toggleTheme();
  }
}
