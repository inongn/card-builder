#!/usr/bin/env python3
"""
Script to translate English locale JSON files to Spanish using Google AI Studio API (Gemini)
"""

import json
import os
import time
import urllib.request
import urllib.parse
from pathlib import Path

# Configuration
API_KEY = "AIzaSyCy6Gpf8hunxCVIOEXxEGphicHUmUSRrtk"
LOCALES_DIR = "/home/gerardon/Documentos/card-builder/src/locales/es"
API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

def translate_text(text, context="", max_retries=5):
    """Translate text from English to Spanish using Gemini API"""
    if not text or text.strip() == "":
        return text
    
    prompt = f"""Translate the following English text to Spanish. This is for a D&D character builder application.
Keep the translation natural and appropriate for a Spanish-speaking D&D player.
Do not include any explanations, just return the Spanish translation.

{f'Context: {context}' if context else ''}

English text: {text}

Spanish translation:"""

    payload = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }],
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 1000,
        }
    }
    
    for attempt in range(max_retries):
        try:
            data = json.dumps(payload).encode('utf-8')
            req = urllib.request.Request(
                f"{API_ENDPOINT}?key={API_KEY}",
                data=data,
                headers={"Content-Type": "application/json"}
            )
            
            with urllib.request.urlopen(req) as response:
                result = json.loads(response.read().decode('utf-8'))
            
            translated = result["candidates"][0]["content"]["parts"][0]["text"].strip()
            
            # Remove any quotes that might have been added
            if translated.startswith('"') and translated.endswith('"'):
                translated = translated[1:-1]
            if translated.startswith("'") and translated.endswith("'"):
                translated = translated[1:-1]
                
            return translated
            
        except urllib.error.HTTPError as e:
            if e.code == 429:  # Too Many Requests
                wait_time = (2 ** attempt) * 2  # Exponential backoff: 2, 4, 8, 16, 32 seconds
                print(f"    Rate limit hit, waiting {wait_time}s before retry {attempt + 1}/{max_retries}...")
                time.sleep(wait_time)
                continue
            else:
                print(f"Error translating '{text[:50]}...': HTTP Error {e.code}: {e.reason}")
                return text
        except Exception as e:
            print(f"Error translating '{text[:50]}...': {e}")
            return text
    
    print(f"Max retries exceeded for '{text[:50]}...'")
    return text  # Return original after all retries

def translate_dict(data, context="", depth=0):
    """Recursively translate all string values in a dictionary"""
    if isinstance(data, dict):
        result = {}
        for key, value in data.items():
            # Build context for better translations
            new_context = f"{context} > {key}" if context else key
            
            if isinstance(value, str):
                print(f"  {'  ' * depth}Translating {key}: {value[:60]}...")
                translated = translate_text(value, new_context)
                result[key] = translated
                time.sleep(2)  # Rate limiting - increased to 2 seconds
            elif isinstance(value, dict):
                result[key] = translate_dict(value, new_context, depth + 1)
            elif isinstance(value, list):
                result[key] = [
                    translate_dict(item, new_context, depth + 1) if isinstance(item, (dict, list))
                    else translate_text(item, new_context) if isinstance(item, str)
                    else item
                    for item in value
                ]
            else:
                result[key] = value
        return result
    elif isinstance(data, list):
        return [
            translate_dict(item, context, depth) if isinstance(item, (dict, list))
            else translate_text(item, context) if isinstance(item, str)
            else item
            for item in data
        ]
    else:
        return data

def process_json_file(filepath):
    """Process a single JSON file"""
    print(f"\n{'='*60}")
    print(f"Processing: {filepath.name}")
    print(f"{'='*60}")
    
    # Read the file
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Translate the data
    translated_data = translate_dict(data, filepath.stem)
    
    # Write back to file
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=4)
    
    print(f"✓ Completed: {filepath.name}")

def main():
    """Main function to process all JSON files"""
    locales_path = Path(LOCALES_DIR)
    
    if not locales_path.exists():
        print(f"Error: Directory not found: {LOCALES_DIR}")
        return
    
    # Get all JSON files
    json_files = sorted(locales_path.glob("*.json"))
    
    if not json_files:
        print(f"No JSON files found in {LOCALES_DIR}")
        return
    
    print(f"Found {len(json_files)} JSON files to translate")
    print(f"Files: {', '.join(f.name for f in json_files)}")
    
    # Process each file
    for json_file in json_files:
        try:
            process_json_file(json_file)
        except Exception as e:
            print(f"Error processing {json_file.name}: {e}")
            continue
    
    print(f"\n{'='*60}")
    print("Translation complete!")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
