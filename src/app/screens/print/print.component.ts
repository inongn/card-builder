import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CharacterStateService } from '../../services/character-state.service';
import { CharacterSheetComponent } from '../../components/cards/character-sheet/character-sheet.component';
import { ActivityCardComponent } from '../../components/cards/activity-card/activity-card.component';
import { StatblockCardComponent } from '../../components/cards/statblock-card/statblock-card.component';

interface PrintableCard {
  _isStatblock: boolean;
  data: any;
}

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CharacterSheetComponent,
    ActivityCardComponent,
    StatblockCardComponent
  ],
  template: `
    <div class="container print-screen" *ngIf="characterData()">
      <mat-toolbar color="primary" class="app-toolbar no-print">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <span class="toolbar-title">Aspida Print Layout</span>
        <span class="toolbar-spacer"></span>
        <button mat-flat-button class="print-btn" (click)="print()">
          <mat-icon>print</mat-icon> Print
        </button>
        <button mat-icon-button class="theme-toggle-btn" (click)="toggleTheme()">
          <mat-icon>{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
      </mat-toolbar>

      <div class="content print-content print-mode">
        <!-- Page 1: Character Sheet + 2 Cards -->
        <div class="print-page first-page">
          <div class="print-grid">
            <div class="main-card-print-slot">
              <app-character-sheet [char]="characterData()"></app-character-sheet>
            </div>
            
            <div *ngFor="let card of page1Cards()" class="action-card-print-slot">
              <app-statblock-card *ngIf="card._isStatblock"
                [statblock]="card.data"
                [variant]="'static'">
              </app-statblock-card>
              
              <app-activity-card *ngIf="!card._isStatblock"
                [activity]="card.data"
                [char]="characterData()"
                [variant]="'static'">
              </app-activity-card>
            </div>
          </div>
        </div>

        <!-- Subsequent Pages: 6 Cards per Page -->
        <div *ngFor="let chunk of remainingPages()" class="print-page">
          <div class="print-grid">
            <div *ngFor="let card of chunk" class="action-card-print-slot">
              <app-statblock-card *ngIf="card._isStatblock"
                [statblock]="card.data"
                [variant]="'static'">
              </app-statblock-card>
              
              <app-activity-card *ngIf="!card._isStatblock"
                [activity]="card.data"
                [char]="characterData()"
                [variant]="'static'">
              </app-activity-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
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
    .print-content {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;
    }

    /* Print layout grids */
    .print-page {
      background: white;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      width: 210mm; /* A4 width */
      height: 297mm; /* A4 height */
      padding: 10mm;
      box-sizing: border-box;
      page-break-after: always;
      display: flex;
      flex-direction: column;
    }
    .print-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 85mm; /* Height of standard card slot */
      gap: 5mm;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
    }
    .main-card-print-slot {
      grid-column: span 2;
      grid-row: span 1;
      height: 100%;
    }
    .action-card-print-slot {
      height: 100%;
      box-sizing: border-box;
    }

    /* Print styling rules */
    @media print {
      .no-print {
        display: none !important;
      }
      .print-screen {
        background: transparent !important;
      }
      .print-content {
        padding: 0 !important;
        gap: 0 !important;
      }
      .print-page {
        box-shadow: none !important;
        margin: 0 !important;
        padding: 8mm !important;
        width: 100% !important;
        height: 100% !important;
        page-break-after: always !important;
        display: block !important;
      }
      .print-grid {
        gap: 4mm !important;
      }
    }
  `]
})
export class PrintComponent {
  private stateService = inject(CharacterStateService);
  private router = inject(Router);

  characterData = this.stateService.characterData;
  isDarkMode = this.stateService.isDarkMode;

  allCards = computed<PrintableCard[]>(() => {
    const char = this.characterData();
    if (!char) return [];

    const activitiesList = (char.activities || []).map(act => ({
      _isStatblock: false,
      data: act
    }));
    
    const statblocksList = (char.statblocks || []).map(sb => ({
      _isStatblock: true,
      data: sb
    }));

    return [...activitiesList, ...statblocksList];
  });

  page1Cards = computed<PrintableCard[]>(() => {
    return this.allCards().slice(0, 2);
  });

  remainingPages = computed<PrintableCard[][]>(() => {
    const cards = this.allCards().slice(2);
    const chunks: PrintableCard[][] = [];
    for (let i = 0; i < cards.length; i += 6) {
      chunks.push(cards.slice(i, i + 6));
    }
    return chunks;
  });

  goBack() {
    this.router.navigate(['/play']);
  }

  print() {
    window.print();
  }

  toggleTheme() {
    this.stateService.toggleTheme();
  }
}
