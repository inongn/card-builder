#!/usr/bin/env python3
"""
Improved script to translate English locale JSON files to Spanish using Google AI Studio API (Gemini)
This version batches translations and saves progress incrementally
"""

import json
import os
import time
import urllib.request
import urllib.parse
import urllib.error
from pathlib import Path

# Configuration
API_KEY = "AIzaSyCy6Gpf8hunxCVIOEXxEGphicHUmUSRrtk"
LOCALES_DIR = "/home/gerardon/Documentos/card-builder/src/locales/es"
API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
BATCH_SIZE = 20  # Translate multiple items in one API call

def translate_batch(texts, context="", max_retries=5):
    """Translate a batch of texts from English to Spanish using Gemini API"""
    if not texts:
        return []
    
    # Create a numbered list for translation
    text_list = "\n".join([f"{i+1}. {text}" for i, text in enumerate(texts)])
    
    prompt = f"""Translate the following English texts to Spanish. This is for a D&D character builder application.
Keep the translations natural and appropriate for a Spanish-speaking D&D player.
Return ONLY the translations, one per line, numbered the same way.
Do not include any explanations or additional text.

{f'Context: {context}' if context else ''}

English texts:
{text_list}

Spanish translations (numbered 1-{len(texts)}):"""

    payload = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }],
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 4000,
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
            
            translated_text = result["candidates"][0]["content"]["parts"][0]["text"].strip()
            
            # Parse the numbered translations
            translations = []
            lines = translated_text.split('\n')
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                # Remove numbering (e.g., "1. ", "1) ", "1.- ")
                for i in range(len(texts)):
                    prefixes = [f"{i+1}. ", f"{i+1}) ", f"{i+1}.- "]
                    for prefix in prefixes:
                        if line.startswith(prefix):
                            line = line[len(prefix):]
                            break
                translations.append(line)
            
            # If we got the right number of translations, return them
            if len(translations) == len(texts):
                return translations
            else:
                print(f"    Warning: Expected {len(texts)} translations, got {len(translations)}. Retrying...")
                if attempt < max_retries - 1:
                    time.sleep(2)
                    continue
                else:
                    # Return what we got, padding with originals if needed
                    while len(translations) < len(texts):
                        translations.append(texts[len(translations)])
                    return translations[:len(texts)]
            
        except urllib.error.HTTPError as e:
            if e.code == 429:  # Too Many Requests
                wait_time = (2 ** attempt) * 3  # Exponential backoff: 3, 6, 12, 24, 48 seconds
                print(f"    Rate limit hit, waiting {wait_time}s before retry {attempt + 1}/{max_retries}...")
                time.sleep(wait_time)
                continue
            else:
                print(f"Error in batch translation: HTTP Error {e.code}: {e.reason}")
                return texts  # Return originals
        except Exception as e:
            print(f"Error in batch translation: {e}")
            return texts  # Return originals
    
    print(f"Max retries exceeded for batch")
    return texts  # Return originals after all retries

def collect_strings(data, strings_list, path=""):
    """Recursively collect all string values from a nested structure"""
    if isinstance(data, dict):
        for key, value in data.items():
            new_path = f"{path}.{key}" if path else key
            collect_strings(value, strings_list, new_path)
    elif isinstance(data, list):
        for i, item in enumerate(data):
            new_path = f"{path}[{i}]"
            collect_strings(item, strings_list, new_path)
    elif isinstance(data, str) and data.strip():
        strings_list.append((path, data))

def set_value_by_path(data, path, value):
    """Set a value in a nested structure using a path string"""
    if not path:
        return value
    
    parts = []
    current = ""
    i = 0
    while i < len(path):
        if path[i] == '.':
            if current:
                parts.append(('key', current))
                current = ""
            i += 1
        elif path[i] == '[':
            if current:
                parts.append(('key', current))
                current = ""
            # Find the closing bracket
            j = i + 1
            while j < len(path) and path[j] != ']':
                j += 1
            parts.append(('index', int(path[i+1:j])))
            i = j + 1
        else:
            current += path[i]
            i += 1
    
    if current:
        parts.append(('key', current))
    
    # Navigate to the parent and set the value
    current_data = data
    for i, (part_type, part_value) in enumerate(parts[:-1]):
        if part_type == 'key':
            current_data = current_data[part_value]
        else:  # index
            current_data = current_data[part_value]
    
    # Set the final value
    final_type, final_value = parts[-1]
    if final_type == 'key':
        current_data[final_value] = value
    else:  # index
        current_data[final_value] = value

def translate_file_data(data, context=""):
    """Translate all strings in a data structure using batched API calls"""
    # Collect all strings
    strings_list = []
    collect_strings(data, strings_list)
    
    print(f"  Found {len(strings_list)} strings to translate")
    
    # Translate in batches
    all_translations = []
    for i in range(0, len(strings_list), BATCH_SIZE):
        batch = strings_list[i:i+BATCH_SIZE]
        texts = [text for path, text in batch]
        
        print(f"  Translating batch {i//BATCH_SIZE + 1}/{(len(strings_list) + BATCH_SIZE - 1)//BATCH_SIZE} ({len(texts)} items)...")
        translations = translate_batch(texts, context)
        all_translations.extend(translations)
        
        # Wait between batches to avoid rate limiting
        if i + BATCH_SIZE < len(strings_list):
            time.sleep(3)
    
    # Apply translations back to the data structure
    result = json.loads(json.dumps(data))  # Deep copy
    for (path, original), translation in zip(strings_list, all_translations):
        set_value_by_path(result, path, translation)
    
    return result

def process_json_file(filepath):
    """Process a single JSON file"""
    print(f"\n{'='*60}")
    print(f"Processing: {filepath.name}")
    print(f"{'='*60}")
    
    # Read the file
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Translate the data
    translated_data = translate_file_data(data, filepath.stem)
    
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
    print(f"Using batch size: {BATCH_SIZE}")
    
    # Process each file
    for json_file in json_files:
        try:
            process_json_file(json_file)
        except KeyboardInterrupt:
            print(f"\n\nInterrupted by user. Progress has been saved.")
            break
        except Exception as e:
            print(f"Error processing {json_file.name}: {e}")
            import traceback
            traceback.print_exc()
            continue
    
    print(f"\n{'='*60}")
    print("Translation complete!")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
