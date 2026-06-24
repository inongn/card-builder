import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ExpressionEvaluator } from '../ExpressionEvaluator';
import { PropertyLibrary } from '../PropertyLibrary';
import { CharacterBuilder } from '../CharacterBuilder';
import { CharacterData, PropertyNode } from '../types';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('ExpressionEvaluator', () => {
  it('should evaluate simple math expressions', () => {
    const context: Partial<CharacterData> = {
      stats: {
        dex: { score: 14, mod: 2 }
      }
    };
    const evaluator = new ExpressionEvaluator(context);
    expect(evaluator.evaluate('$(10 + stats.dex.mod)')).toBe(12);
  });

  it('should support progression level indexing', () => {
    const context: Partial<CharacterData> = {
      meta: { level: 5 }
    };
    const evaluator = new ExpressionEvaluator(context);
    // level 5 -> index 4 of [2, 2, 3, 3, 4, 4]
    expect(evaluator.evaluate('$(progression(2, 2, 3, 3, 4, 4))')).toBe(4);
  });

  it('should bake local scope variables', () => {
    const evaluator = new ExpressionEvaluator();
    const result = evaluator.evaluate('This is local.name', { name: 'Bob' });
    expect(result).toBe("This is 'Bob'");
  });

  it('should format objects based on templates', () => {
    const evaluator = new ExpressionEvaluator();
    const obj = { walk: 30, fly: 60 };
    const formatted = evaluator.formatObject(obj, '{Title} {value} ft', ', ');
    expect(formatted).toBe('Walk 30 ft, Fly 60 ft');
  });
});

describe('PropertyLibrary & CharacterBuilder Integration', () => {
  let library: PropertyLibrary;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PropertyLibrary,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    library = TestBed.inject(PropertyLibrary);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should parse tag expressions and query properties', () => {
    const p1: PropertyNode = { id: 'fighter', name: 'Fighter', type: 'Folder', tags: ['class'] };
    const p2: PropertyNode = { id: 'wizard', name: 'Wizard', type: 'Folder', tags: ['class', 'caster'] };
    
    library.addParsedProperty(p1);
    library.addParsedProperty(p2);

    expect(library.getProperty('fighter')).toEqual(p1);

    const classes = library.findByTags('class');
    expect(classes.length).toBe(2);

    const casters = library.findByTags('class AND caster');
    expect(casters.length).toBe(1);
    expect(casters[0].id).toBe('wizard');
  });

  it('should build character using CharacterBuilder', async () => {
    // Setup a mini mock database in the library
    const baseNode: PropertyNode = {
      id: 'base',
      name: 'Base Character',
      type: 'Folder',
      children: [
        {
          id: 'level',
          name: 'Level Input',
          type: 'Input',
          subtype: 'number',
          default: 1
        },
        {
          id: 'classSlot',
          name: 'Class Selection',
          type: 'Slot',
          target: 'class'
        }
      ]
    };

    const classFighter: PropertyNode = {
      id: 'fighter',
      name: 'Fighter Class',
      type: 'Folder',
      tags: ['class'],
      children: [
        {
          id: 'hpEffect',
          type: 'Effect',
          target: 'attributes.hp',
          operation: 'add',
          value: 10
        }
      ]
    };

    library.addParsedProperty(baseNode);
    library.addParsedProperty(classFighter);

    const builder = new CharacterBuilder(library);
    await builder.initialize();

    const charDataBefore = builder.getCharacterData();
    expect(charDataBefore.meta['level']).toBe(1);
    expect(charDataBefore.attributes.hp).toBeUndefined();

    // Fill classSlot with fighter (path to classSlot is [1])
    builder.fillSlot([1], 'fighter');

    const charDataAfter = builder.getCharacterData();
    expect(charDataAfter.attributes.hp).toBe(10);

    // Clear class slot
    builder.clearSlot([1]);
    expect(builder.getCharacterData().attributes.hp).toBeUndefined();
  });
});
