import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advantage-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="adv-dis-indicator" [ngClass]="type">
      {{ type === 'adv' ? 'A' : type === 'dis' ? 'D' : type === 'min' ? '>' : '' }}
      <span *ngIf="type === 'min'">{{ value }}</span>
    </span>
  `,
  styles: [`
    .adv-dis-indicator {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
      border-radius: 4px;
      padding: 2px 4px;
      margin-right: 4px;
      line-height: 1;
      vertical-align: middle;
      box-sizing: border-box;
      border: 1px solid currentColor;
    }
    .adv-dis-indicator.adv {
      background-color: rgba(76, 175, 80, 0.15);
      color: #2e7d32;
    }
    .adv-dis-indicator.dis {
      background-color: rgba(244, 67, 54, 0.15);
      color: #c62828;
    }
    .adv-dis-indicator.min {
      background-color: rgba(33, 150, 243, 0.15);
      color: #1565c0;
    }
  `]
})
export class AdvantageIndicatorComponent {
  @Input() type: 'adv' | 'dis' | 'min' | string = '';
  @Input() value: number | string = '';
}
