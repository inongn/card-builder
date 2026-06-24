import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CharacterStateService } from './services/character-state.service';
import * as jsyaml from 'js-yaml';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  public stateService = inject(CharacterStateService);
  
  loading = this.stateService.loading;
  debugTab = signal<'character' | 'recipe' | 'tree'>('character');

  ngOnInit() {
    this.stateService.initialize();
  }

  setDebugTab(tab: 'character' | 'recipe' | 'tree') {
    this.debugTab.set(tab);
  }

  getDebugContent(): string {
    const charData = this.stateService.characterData();
    const propTree = this.stateService.propertyTree();
    
    if (this.loading()) return 'Loading...';

    try {
      switch (this.debugTab()) {
        case 'character':
          return jsyaml.dump(charData, { indent: 2, lineWidth: -1 });
        case 'recipe':
          return jsyaml.dump(this.stateService.getRawBuilderDump(), { indent: 2, lineWidth: -1 });
        case 'tree':
          return jsyaml.dump(propTree, { indent: 2, lineWidth: -1 });
        default:
          return 'Select a tab';
      }
    } catch (e: any) {
      return `Error dumping YAML: ${e.message}`;
    }
  }
}
