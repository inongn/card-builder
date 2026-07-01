import os
import re
import json

# Paths to scan
PATHS = [
    "reference/classes",
    "reference/feats",
    "reference/species"
]

# Patterns to match trigger conditions
# Match: When/Whenever/At the start of/At the end of/If you/If a/After you/When a/etc.
TRIGGER_PATTERNS = [
    r"\b[Ww]hen(?:ever)?\b",
    r"\b[Aa]t the start of\b",
    r"\b[Aa]t the end of\b",
    r"\b[Ii]f (?:you|a|the|an|your|any)\b",
    r"\b[Aa]fter (?:you|a|the|an|your|any)\b"
]

# Combined pattern
combined_pattern = re.compile(f"({'|'.join(TRIGGER_PATTERNS)})")

# Clean sentence helpers
def split_sentences(text):
    # Simple sentence splitter that handles common abbreviations
    # We replace abbreviations temporarily to avoid splitting on them
    abbrevs = ["HP", "GP", "SP", "CP", "EP", "DC", "AC", "e.g.", "i.e.", "vs.", "d20", "d8", "d6", "d4", "d10", "d12", "d100"]
    for ab in abbrevs:
        text = text.replace(ab + ".", ab + "##DOT##")
    # Split on period, exclamation, question mark followed by whitespace
    sentences = re.split(r'(?<=[.!?])\s+', text)
    # Restore abbreviations
    cleaned = []
    for s in sentences:
        s = s.replace("##DOT##", ".")
        cleaned.append(s.strip())
    return cleaned

matches = []

for root_path in PATHS:
    if not os.path.exists(root_path):
        continue
    for root, dirs, files in os.walk(root_path):
        for file in files:
            if file.endswith(".txt"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Split content into paragraphs first to keep context, then sentences
                paragraphs = content.split("\n\n")
                for p_idx, para in enumerate(paragraphs):
                    para_clean = para.replace("\n", " ").strip()
                    if not para_clean:
                        continue
                    sentences = split_sentences(para_clean)
                    for sent in sentences:
                        match = combined_pattern.search(sent)
                        if match:
                            # Let's clean the sentence a bit
                            matches.append({
                                "file": file_path,
                                "sentence": sent,
                                "matched_trigger": match.group(1).lower()
                            })

# Let's save matches to a JSON file for further processing
output_path = "scratch/extracted_triggers.json"
os.makedirs("scratch", exist_ok=True)
with open(output_path, "w", encoding="utf-8") as out:
    json.dump(matches, out, indent=2)

print(f"Extracted {len(matches)} potential trigger sentences. Saved to {output_path}")
