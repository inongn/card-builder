import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { parseTextWithIcons, IconInfo, ParsedPart } from '../../../utils/card-utils';

@Component({
  selector: 'app-grid-value-chip',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="grid-value-chip" *ngIf="content">
      <mat-icon [class]="'icon-' + activeIconColor" class="chip-icon">
        {{ activeIcon }}
      </mat-icon>
      <span class="text-secondary chip-text">{{ content }}</span>
    </div>
  `,
  styles: [`
    .grid-value-chip {
      display: inline-flex;
      align-items: center;
      background: var(--mat-sys-surface-container-high, #e0e0e0);
      border-radius: 16px;
      padding: 4px 8px;
      gap: 6px;
      font-size: 0.85rem;
      box-sizing: border-box;
      max-width: max-content;
    }
    .chip-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .chip-text {
      font-weight: 500;
    }
    .icon-bonus-action { color: var(--color-bonus, #ff5722); }
    .icon-action { color: var(--color-action, #2196f3); }
    .icon-reaction { color: var(--color-reaction, #f44336); }
    .icon-accent { color: var(--mat-sys-primary, #6750a4); }
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
export class GridValueChipComponent implements OnChanges {
  @Input() value: any = '';
  @Input() type: 'range' | 'duration' | 'time' | 'resource' | string = 'range';
  @Input() showLabel = true;

  content = '';
  activeIcon = 'straighten';
  activeIconColor = 'accent';

  ngOnChanges() {
    if (!this.value) {
      this.content = '';
      return;
    }

    let str = String(this.value).replace(/minutes/gi, 'mins');
    const parts = parseTextWithIcons(str);
    const hasIcon = parts.some(p => p.type === 'icon');

    // Default icons based on type
    let primaryIcon = 'straighten';
    if (this.type === 'duration') primaryIcon = 'schedule';
    if (this.type === 'time') primaryIcon = 'hourglass_top';
    if (this.type === 'resource') primaryIcon = 'layers';

    if (hasIcon) {
      const firstIconPart = parts.find(p => p.type === 'icon')!;
      const iconInfo = firstIconPart.info!;
      
      this.activeIcon = iconInfo.icon;
      this.activeIconColor = iconInfo.color;

      this.content = parts.map(p => {
        if (p.type === 'text') return p.content;
        if (p.type === 'icon' && parts.length === 1 && this.showLabel) {
          return iconInfo.shortName;
        }
        return '';
      }).join(' ').trim();
    } else {
      this.activeIcon = primaryIcon;
      this.activeIconColor = 'accent';
      this.content = str;
    }
  }
}
