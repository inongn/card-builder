import { describe, it, beforeEach, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

// Mock localStorage for Vitest CLI/jsdom runner
if (typeof localStorage === 'undefined' || !localStorage || typeof localStorage.getItem !== 'function') {
  const store: Record<string, string> = {};
  const mockLocalStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { for (const key in store) delete store[key]; },
    key: (index: number) => Object.keys(store)[index] || null,
    length: 0
  };
  Object.defineProperty(globalThis, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
    configurable: true
  });
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
