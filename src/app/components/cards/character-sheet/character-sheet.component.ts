import { Component, Input, OnChanges, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CharacterData, Resource } from '../../../../engine/types';
import { formatBonus } from '../../../../engine/helpers';
import { getIconInfo } from '../../../utils/card-utils';
import { AdvantageIndicatorComponent } from '../advantage-indicator/advantage-indicator.component';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    AdvantageIndicatorComponent
  ],
  template: `
    <div class="main-card" *ngIf="char">
      <!-- Header: Name and Level Info -->
      <div class="main-card-row">
        <div class="main-card-column">
          <div class="card-title main-card-title show-on-print">
            {{ char.meta?.['name'] }}
          </div>
          <div class="title-primary">
            Lv. {{ char.meta?.['level'] }} {{ char.meta?.['species'] }} {{ char.meta?.['class'] || 'Unknown Class' }}
          </div>
        </div>
      </div>

      <!-- Ability Scores -->
      <div class="main-card-row ability-row">
        <mat-card class="inner-card main-card-box stat-box" *ngFor="let statEntry of statsList">
          <div class="text-secondary stat-label">{{ statEntry.key.toUpperCase() }}</div>
          <div class="important-number">{{ formatBonusValue(statEntry.value.mod, true) }}</div>
          <div class="text-secondary score-label">{{ statEntry.value.score }}</div>
        </mat-card>
      </div>

      <!-- Skills and Vitals -->
      <div class="main-card-row layout-row">
        <!-- Skills and Saves Column -->
        <div class="main-card-column flex-col">
          <!-- Skills -->
          <mat-card class="inner-card list-card">
            <div class="list-item skill-list-item" *ngFor="let skillEntry of skillsList">
              <div class="text-secondary stat-tag">{{ skillEntry.value.stat.toUpperCase() }}</div>
              <mat-icon class="prof-icon">{{ getProficiencyIcon(skillEntry.value.proficiency) }}</mat-icon>
              <div class="text-secondary bonus-tag">
                {{ formatBonusValue(skillEntry.value.bonus, true) }}
              </div>
              <div class="text-primary skill-name-row">
                <app-advantage-indicator *ngIf="skillEntry.value.adv" type="adv"></app-advantage-indicator>
                <app-advantage-indicator *ngIf="skillEntry.value.dis" type="dis"></app-advantage-indicator>
                <app-advantage-indicator *ngIf="skillEntry.value.min" type="min" [value]="skillEntry.value.min"></app-advantage-indicator>
                {{ skillEntry.value.name }}
              </div>
            </div>
          </mat-card>

          <!-- Saving Throws -->
          <mat-card class="inner-card list-card">
            <div class="main-card-list saves-list">
              <div class="list-item saves-list-item" *ngFor="let saveEntry of savesList">
                <mat-icon class="prof-icon">{{ getProficiencyIcon(saveEntry.value.proficiency) }}</mat-icon>
                <div class="text-secondary bonus-tag">
                  {{ formatBonusValue(saveEntry.value.bonus, true) }}
                </div>
                <div class="text-secondary save-name-row">
                  <app-advantage-indicator *ngIf="saveEntry.value.adv" type="adv"></app-advantage-indicator>
                  <app-advantage-indicator *ngIf="saveEntry.value.dis" type="dis"></app-advantage-indicator>
                  <app-advantage-indicator *ngIf="saveEntry.value.min" type="min" [value]="saveEntry.value.min"></app-advantage-indicator>
                  {{ saveEntry.value.stat.toUpperCase() }} Save
                </div>
              </div>
            </div>
          </mat-card>
        </div>

        <!-- Vitals Column -->
        <div class="main-card-column flex-col">
          <!-- HP Block -->
          <mat-card class="main-card-box main-card-box-hp inner-card">
            <div class="main-card-box-hp-row label-row">
              <div class="text-secondary">Current</div>
              <div class="text-secondary">Max</div>
              <div class="text-secondary">Temp</div>
            </div>
            <div class="main-card-box-hp-row number-row">
              <div class="important-number hp-empty"></div>
              <div class="important-number">{{ char.attributes?.hp }}</div>
              <div class="important-number hp-empty"></div>
            </div>
            <div class="text-secondary vitals-label">HP</div>
          </mat-card>

          <!-- Combat stats row -->
          <div class="main-card-combat-row">
            <mat-card class="inner-card main-card-box combat-box">
              <div class="text-secondary combat-label">Initiative</div>
              <div class="important-number">
                <app-advantage-indicator *ngIf="char.attributes?.initiativeAdvantage" type="adv"></app-advantage-indicator>
                <app-advantage-indicator *ngIf="char.attributes?.initiativeDisadvantage" type="dis"></app-advantage-indicator>
                {{ formatBonusValue(char.attributes?.initiative, true) }}
              </div>
              <div class="text-secondary combat-sub">Mod</div>
            </mat-card>
            <mat-card class="inner-card main-card-box combat-box">
              <div class="text-secondary combat-label">Armor</div>
              <div class="important-number">{{ char.attributes?.ac }}</div>
              <div class="text-secondary combat-sub">Class</div>
            </mat-card>
            <mat-card class="inner-card main-card-box combat-box">
              <div class="text-secondary combat-label">Movement</div>
              <div class="important-number">{{ char.attributes?.movement?.walk }}</div>
              <div class="text-secondary combat-sub">Speed</div>
            </mat-card>
          </div>

          <!-- Active Resources List -->
          <mat-card class="inner-card list-card" *ngIf="sortedResources.length > 0">
            <div class="main-card-list">
              <div class="list-item resource-list-item" *ngFor="let res of sortedResources">
                <mat-icon [class]="'icon-' + (getResourceIconInfo(res)?.color || 'accent')" class="res-icon">
                  {{ getResourceIconInfo(res)?.icon || 'circle' }}
                </mat-icon>
                <div class="text-primary res-name">{{ res.name || res.id }}</div>
                
                <!-- Dots for resource usage -->
                <div class="resource-dots" [style.gridTemplateColumns]="getDotsGridStyle(res)">
                  <mat-icon *ngFor="let dummy of getDummyArray(res.quantity)" 
                    name="crop_square" class="res-dot-square">
                    crop_square
                  </mat-icon>
                </div>
              </div>
            </div>
          </mat-card>

          <!-- Passive Attributes Details -->
          <mat-card class="inner-card list-card passive-card">
            <div class="main-card-list">
              <ng-container *ngFor="let info of passiveInfoList">
                <div class="list-item info-list-item" *ngIf="info.displayData.length > 0">
                  <span class="text-secondary info-label">{{ info.label }}</span>
                  <span class="text-primary info-val">
                    {{ info.displayData.join(', ') }}
                  </span>
                </div>
              </ng-container>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .main-card {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      box-sizing: border-box;
      background: var(--mat-sys-surface-container, #fff);
      border-radius: 12px;
      border: 1px solid var(--mat-sys-outline-variant, #ccc);
      width: 100%;
    }
    .main-card-row {
      display: flex;
      gap: 16px;
      width: 100%;
    }
    .ability-row {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;
    }
    .main-card-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .flex-col {
      min-width: 0;
    }
    .layout-row {
      display: flex;
    }
    @media (max-width: 600px) {
      .layout-row {
        flex-direction: column;
      }
      .ability-row {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .title-primary {
      font-size: 1.1rem;
      font-weight: 600;
      opacity: 0.85;
    }
    .main-card-title {
      font-size: 1.4rem;
      font-weight: bold;
      display: none;
    }
    .inner-card {
      border: 1px solid var(--mat-sys-outline-variant, #e0e0e0);
      background: var(--mat-sys-surface-container-low, #fafafa);
      border-radius: 8px;
      padding: 12px;
    }
    .stat-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px 4px;
      text-align: center;
    }
    .stat-label {
      font-size: 0.75rem;
      font-weight: bold;
      margin-bottom: 2px;
    }
    .important-number {
      font-size: 1.6rem;
      font-weight: bold;
      line-height: 1.1;
    }
    .score-label {
      font-size: 0.8rem;
      opacity: 0.7;
    }
    .list-card {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 8px;
    }
    .list-item {
      display: flex;
      align-items: center;
      padding: 4px 6px;
      border-bottom: 1px solid var(--mat-sys-outline-variant, #f0f0f0);
      min-height: 28px;
    }
    .list-item:last-child {
      border-bottom: none;
    }
    .skill-list-item, .saves-list-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .stat-tag {
      font-size: 0.75rem;
      font-weight: 600;
      width: 28px;
      opacity: 0.7;
    }
    .prof-icon {
      font-size: 0.95rem;
      width: 0.95rem;
      height: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.7;
    }
    .bonus-tag {
      font-weight: bold;
      width: 28px;
      text-align: right;
      font-size: 0.9rem;
    }
    .skill-name-row, .save-name-row {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .main-card-box-hp {
      padding: 12px;
      text-align: center;
      background: var(--mat-sys-primary-container, #e8def8) !important;
      color: var(--mat-sys-on-primary-container, #21005d) !important;
      border: none;
    }
    .main-card-box-hp-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      width: 100%;
    }
    .label-row {
      font-size: 0.75rem;
      opacity: 0.8;
      margin-bottom: 2px;
    }
    .hp-empty {
      border-bottom: 1px dashed currentColor;
      margin: 0 8px;
    }
    .vitals-label {
      font-size: 0.8rem;
      font-weight: bold;
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .main-card-combat-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      width: 100%;
    }
    .combat-box {
      padding: 8px 4px;
      text-align: center;
    }
    .combat-label {
      font-size: 0.7rem;
      font-weight: bold;
    }
    .combat-sub {
      font-size: 0.75rem;
      opacity: 0.6;
    }
    .resource-list-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .res-icon {
      font-size: 1.1rem;
      width: 1.1rem;
      height: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .res-name {
      font-size: 0.9rem;
      font-weight: 500;
      flex: 1;
    }
    .resource-dots {
      display: grid;
      justify-items: end;
      direction: rtl;
      gap: 2px;
    }
    .res-dot-square {
      font-size: 0.95rem;
      width: 0.95rem;
      height: 0.95rem;
      transform: rotate(45deg);
      direction: ltr;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--mat-sys-primary, #6750a4);
    }
    .passive-card {
      padding: 6px 12px;
    }
    .info-list-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      font-size: 0.85rem;
      padding: 4px 0;
    }
    .info-label {
      font-weight: bold;
      opacity: 0.75;
    }
    .info-val {
      text-align: right;
    }

    /* Print styling handles */
    @media print {
      .main-card {
        border: none !important;
        padding: 0 !important;
        background: transparent !important;
        color: #000 !important;
      }
      .main-card-title {
        display: block !important;
      }
      .inner-card {
        border: 1px solid #000 !important;
        background: transparent !important;
        color: #000 !important;
      }
      .main-card-box-hp {
        background: transparent !important;
        color: #000 !important;
        border: 1px solid #000 !important;
      }
    }

    /* Icon colors */
    .icon-bonus-action { color: #ff5722; }
    .icon-action { color: #2196f3; }
    .icon-reaction { color: #f44336; }
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
export class CharacterSheetComponent implements OnChanges {
  @Input() char: CharacterData | null = null;

  public sortedResources: Resource[] = [];
  public statsList: Array<{ key: string; value: any }> = [];
  public skillsList: Array<{ key: string; value: any }> = [];
  public savesList: Array<{ key: string; value: any }> = [];
  public passiveInfoList: Array<{ label: string; displayData: string[] }> = [];

  private RESOURCE_WRAP_THRESHOLD = 10;

  public elementRef = inject(ElementRef);

  ngOnChanges() {
    this.processResources();
    this.updateCachedLists();
  }

  private updateCachedLists() {
    if (!this.char) {
      this.statsList = [];
      this.skillsList = [];
      this.savesList = [];
      this.passiveInfoList = [];
      return;
    }

    this.statsList = this.char.stats ? Object.entries(this.char.stats).map(([k, v]) => ({ key: k, value: v })) : [];
    this.skillsList = this.char.skills ? Object.entries(this.char.skills).map(([k, v]) => ({ key: k, value: v })) : [];
    this.savesList = this.char.saves ? Object.entries(this.char.saves).map(([k, v]) => ({ key: k, value: v })) : [];

    const attr = this.char.attributes || {};
    const list = [
      { label: 'Senses', data: attr.senses },
      { label: 'Movement', data: attr.movement },
      { label: 'Resistances', data: attr.resistances },
      { label: 'Advantages', data: attr.advantages },
      { label: 'Immunities', data: attr.immunities },
      { label: 'Tools', data: attr.tools }
    ];

    this.passiveInfoList = list.map(info => {
      let displayData: string[] = [];
      if (Array.isArray(info.data)) {
        displayData = info.data.map(String);
      } else if (info.data && typeof info.data === 'object') {
        displayData = Object.entries(info.data)
          .filter(([k, v]) => v && !(info.label === 'Movement' && k === 'walk'))
          .map(([k, v]) => {
            const label = k.charAt(0).toUpperCase() + k.slice(1);
            const unit = typeof v === 'number' ? ' ft' : '';
            return `${label} (${v}${unit})`;
          });
      }
      return { label: info.label, displayData };
    });
  }

  formatBonusValue(value: any, alwaysShow = false): string {
    return formatBonus(value, alwaysShow);
  }

  getProficiencyIcon(proficiency: number): string {
    if (proficiency === 1) return 'circle';
    if (proficiency === 2) return 'add_circle';
    if (proficiency === 0.5) return 'brightness_2';
    return 'radio_button_unchecked';
  }

  getResourceIconInfo(res: Resource): any {
    return getIconInfo(res.id || res.name);
  }

  getDotsGridStyle(res: Resource): string {
    const q = res.quantity || 0;
    const rows = q > this.RESOURCE_WRAP_THRESHOLD ? Math.ceil(q / this.RESOURCE_WRAP_THRESHOLD) : 1;
    const dotsPerRow = Math.max(1, Math.ceil(q / rows));
    return `repeat(${dotsPerRow}, auto)`;
  }

  getDummyArray(size: number): number[] {
    return Array(size || 0).fill(0);
  }

  private processResources() {
    if (!this.char || !this.char.resources) {
      this.sortedResources = [];
      return;
    }

    // Count how many activities use each resource
    const counts: Record<string, number> = {};
    if (this.char.activities) {
      this.char.activities.forEach(activity => {
        const rawRes = activity.resource;
        const resList = Array.isArray(rawRes) ? rawRes : (rawRes ? [rawRes] : []);
        resList.forEach(r => {
          counts[r] = (counts[r] || 0) + 1;
        });
      });
    }

    const spellSlots: Resource[] = [];
    const otherResources: Resource[] = [];

    this.char.resources.forEach(res => {
      const id = res.id || '';
      const count = counts[id] || 0;
      const isSpellSlot = id.toLowerCase().includes('spellslot');
      const isSorceryPoint = id.toLowerCase().includes('sorcerypoints');

      // If a resource is only used by one activity, it's not listed on character sheet
      // EXCEPT for spell slots/sorcery points which always show up
      if (count === 1 && !isSpellSlot && !isSorceryPoint) return;

      if (id.match(/^level\d+SpellSlot$/)) {
        spellSlots.push(res);
      } else {
        otherResources.push(res);
      }
    });

    const getSortValue = (res: Resource) => {
      const q = res.quantity || 0;
      if (q <= this.RESOURCE_WRAP_THRESHOLD) return q;
      const rows = Math.ceil(q / this.RESOURCE_WRAP_THRESHOLD);
      return Math.ceil(q / rows);
    };

    spellSlots.sort((a, b) => {
      const levelA = parseInt((a.id || '').match(/\d+/)?.[0] || '0');
      const levelB = parseInt((b.id || '').match(/\d+/)?.[0] || '0');
      return levelA - levelB;
    });

    otherResources.sort((a, b) => {
      const valA = getSortValue(a);
      const valB = getSortValue(b);

      if (valB !== valA) return valB - valA;

      const qA = a.quantity || 0;
      const qB = b.quantity || 0;
      if (qB !== qA) return qB - qA;

      return (a.name || '').localeCompare(b.name || '');
    });

    this.sortedResources = [...otherResources, ...spellSlots];
  }
}
