import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CharacterStateService } from '../../services/character-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <mat-toolbar color="primary" class="app-toolbar">
        <mat-icon class="toolbar-icon">shield_moon</mat-icon>
        <span class="toolbar-title">Aspida</span>
        <span class="toolbar-spacer"></span>
        <button mat-flat-button class="new-char-btn" (click)="createNew()">
          <mat-icon>add</mat-icon> New Character
        </button>
        <button mat-icon-button class="theme-toggle-btn" (click)="toggleTheme()">
          <mat-icon>{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
      </mat-toolbar>

      <div class="content dashboard-content">
        <div class="saved-characters-grid" *ngIf="savedCharacters().length > 0; else emptyState">
          <mat-card 
            *ngFor="let char of savedCharacters()" 
            class="hero-card clickable-card"
            (click)="openCharacter(char)">
            <mat-card-content class="hero-card-content">
              <div class="hero-card-info">
                <div class="hero-name">{{ char.name }}</div>
                <div class="hero-details">
                  Lv. {{ char.level || 1 }} {{ char.species }} {{ char.class || 'Unknown Class' }}
                </div>
              </div>
              <div class="hero-actions">
                <button mat-icon-button (click)="deleteCharacter($event, char.id)" class="delete-btn">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <ng-template #emptyState>
          <div class="empty-state">
            <mat-icon class="empty-icon">person_add</mat-icon>
            <p class="empty-text">No characters found.</p>
            <button mat-flat-button color="primary" (click)="createNew()">
              Create your first character
            </button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
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
    .content {
      padding: 16px;
      flex: 1;
      overflow-y: auto;
    }
    .dashboard-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .saved-characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      width: 100%;
      max-width: 960px;
      margin-top: 16px;
    }
    .hero-card {
      transition: box-shadow 0.2s ease, transform 0.2s ease;
      cursor: pointer;
    }
    .hero-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .hero-card-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px !important;
    }
    .hero-name {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .hero-details {
      font-size: 0.9rem;
      opacity: 0.7;
    }
    .delete-btn {
      color: var(--mat-sys-error, #ba1a1a);
    }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 80px;
      gap: 16px;
    }
    .empty-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      opacity: 0.5;
    }
    .empty-text {
      font-size: 1.1rem;
      opacity: 0.7;
    }
  `]
})
export class DashboardComponent {
  private stateService = inject(CharacterStateService);
  private router = inject(Router);

  savedCharacters = this.stateService.savedCharacters;
  isDarkMode = this.stateService.isDarkMode;

  async createNew() {
    await this.stateService.createNewCharacter();
    this.router.navigate(['/builder']);
  }

  openCharacter(char: any) {
    this.stateService.loadCharacter(char.id, char.recipe);
    this.router.navigate(['/play']);
  }

  deleteCharacter(event: MouseEvent, id: number) {
    event.stopPropagation();
    this.stateService.deleteCharacter(id);
  }

  toggleTheme() {
    this.stateService.toggleTheme();
  }
}
