import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { parseTextWithIcons, ParsedPart } from '../../../utils/card-utils';

@Component({
  selector: 'app-card-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <ng-container *ngFor="let part of parsedParts">
      <span *ngIf="part.type === 'text'">{{ part.content }}</span>
      <span *ngIf="part.type === 'icon'" class="icon-wrapper">
        <mat-icon [class]="'icon-' + part.info?.color" class="inline-icon">
          {{ part.info?.icon }}
        </mat-icon>
        <span *ngIf="showText">{{ part.originalText }}</span>
      </span>
    </ng-container>
  `,
  styles: [`
    .icon-wrapper {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
      gap: 2px;
      margin: 0 2px;
    }
    .inline-icon {
      font-size: 1.1rem;
      width: 1.1rem;
      height: 1.1rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .icon-bonus-action { color: var(--color-bonus, #ff5722); }
    .icon-action { color: var(--color-action, #2196f3); }
    .icon-reaction { color: var(--color-reaction, #f44336); }
    .icon-accent { color: var(--mat-sys-secondary, #6750a4); }
    .icon-physical { color: #8d6e63; }
    .icon-fire { color: #ff5722; }
    .icon-cold { color: #00bcd4; }
    .icon-acid { color: #8bc34a; }
    .icon-lightning { color: #ffeb3b; }
    .icon-poison { color: #4caf50; }
    .icon-necrotic { color: #9c27b0; }
    .icon-radiant { color: #ffc107; }
    .icon-force { color: #3f51b5; }
    .icon-thunder { color: #607d8b; }
    .icon-psychic { color: #e91e63; }
    .icon-healing { color: #e91e63; }
    .icon-spell-slot { color: #e040fb; }
  `]
})
export class CardIconComponent implements OnChanges {
  @Input() text: string | string[] = '';
  @Input() showText = true;

  parsedParts: ParsedPart[] = [];

  ngOnChanges() {
    const rawStr = Array.isArray(this.text) ? this.text.join(' / ') : String(this.text || '');
    this.parsedParts = parseTextWithIcons(rawStr);
  }
}
