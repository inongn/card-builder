import { Injectable, signal, computed } from '@angular/core';
import { PropertyLibrary } from '../../engine/PropertyLibrary';
import { CharacterBuilder } from '../../engine/CharacterBuilder';
import { PropertyNode, CharacterData, Recipe } from '../../engine/types';

@Injectable({
  providedIn: 'root'
})
export class CharacterStateService {
  public loading = signal<boolean>(true);
  public loadedCharacterId = signal<number | null>(null);
  public propertyTree = signal<PropertyNode | null>(null);
  public characterData = signal<CharacterData | null>(null);
  public savedCharacters = signal<any[]>([]);
  public builderSource = signal<'dashboard' | 'play'>('dashboard');
  public isDarkMode = signal<boolean>(
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
  );

  private builder!: CharacterBuilder;

  constructor(private propertyLibrary: PropertyLibrary) {
    this.loadSavedCharacters();
    this.applyTheme();
  }

  public toggleTheme() {
    this.isDarkMode.update(dark => !dark);
    this.applyTheme();
  }

  public applyTheme() {
    const html = document.documentElement;
    const dark = this.isDarkMode();
    html.classList.remove('mdui-theme-auto');
    html.classList.toggle('dark', dark);
    html.classList.toggle('mdui-theme-dark', dark);
    html.classList.toggle('mdui-theme-light', !dark);
    html.style.colorScheme = dark ? 'dark' : 'light';
  }

  async initialize() {
    try {
      this.loading.set(true);
      await this.propertyLibrary.loadFromData();
      this.builder = new CharacterBuilder(this.propertyLibrary);
      await this.builder.initialize();
      
      this.syncState();
      this.loading.set(false);
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  private syncState() {
    if (this.builder) {
      this.propertyTree.set(structuredClone(this.builder.getPropertyTree()));
      this.characterData.set(structuredClone(this.builder.getCharacterData()));
    }
  }

  public getSlotOptions(slot: PropertyNode) {
    return this.builder ? this.builder.getSlotOptions(slot) : [];
  }

  public getProperty(id: string) {
    return this.propertyLibrary.getProperty(id);
  }

  public fillSlot(path: number[], propertyId: string) {
    if (this.builder) {
      this.builder.fillSlot(path, propertyId);
      // We wrap with setTimeout 0 just like the original React app to let animations complete
      setTimeout(() => this.syncState(), 0);
    }
  }

  public clearSlot(path: number[]) {
    if (this.builder) {
      this.builder.clearSlot(path);
      setTimeout(() => this.syncState(), 0);
    }
  }

  public updateInput(path: number[], value: any) {
    if (this.builder) {
      this.builder.updateInput(path, value);
      this.syncState();
    }
  }

  public loadSavedCharacters() {
    const saved = JSON.parse(localStorage.getItem('saved_characters') || '[]');
    this.savedCharacters.set(saved);
  }

  public async createNewCharacter(): Promise<number> {
    if (this.builder) {
      await this.builder.initialize();
      this.syncState();
      const newId = Date.now();
      this.loadedCharacterId.set(newId);
      this.builderSource.set('dashboard');
      return newId;
    }
    return 0;
  }

  public loadCharacter(id: number, recipe: Recipe) {
    if (this.builder) {
      this.builder.applyRecipe(recipe);
      this.syncState();
      this.loadedCharacterId.set(id);
    }
  }

  public saveCharacter() {
    const builderVal = this.builder;
    const charData = this.characterData();
    const loadedId = this.loadedCharacterId();
    if (!builderVal || !charData || !loadedId) return;

    const characterName = charData.meta?.['name'] || 'Unnamed Character';
    const recipe = builderVal.getRecipe();
    const timestamp = new Date().toISOString();

    const saved = JSON.parse(localStorage.getItem('saved_characters') || '[]');
    const index = saved.findIndex((c: any) => c.id === loadedId);
    
    const charSummary = {
      id: loadedId,
      name: characterName,
      class: charData.meta?.['class'] || 'Unknown Class',
      species: charData.meta?.['species'] || '',
      level: charData.meta?.['level'] || 1,
      recipe,
      timestamp
    };

    if (index !== -1) {
      saved[index] = charSummary;
    } else {
      saved.push(charSummary);
    }

    localStorage.setItem('saved_characters', JSON.stringify(saved));
    this.savedCharacters.set(saved);
  }

  public deleteCharacter(id: number) {
    const saved = JSON.parse(localStorage.getItem('saved_characters') || '[]');
    const filtered = saved.filter((c: any) => c.id !== id);
    localStorage.setItem('saved_characters', JSON.stringify(filtered));
    this.savedCharacters.set(filtered);
    if (this.loadedCharacterId() === id) {
      this.loadedCharacterId.set(null);
    }
  }

  public getRawBuilderDump(): any {
    return this.builder ? this.builder.getRecipe() : {};
  }
}
