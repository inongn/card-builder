import json
import re
import os

# Load raw triggers
input_path = "scratch/extracted_triggers.json"
with open(input_path, "r", encoding="utf-8") as f:
    triggers = json.load(f)

# Define categories and keyword regexes
CATEGORIES = {
    "Rests & Down-time / Resets": [
        r"finish\s+(?:a\s+)?(?:Short\s+or\s+)?Long\s+Rest",
        r"finish\s+a\s+Short\s+Rest",
        r"finish\s+a\s+Rest"
    ],
    "Turn / Time / Initiative": [
        r"start\s+of\s+your\s+first\s+turn",
        r"start\s+of\s+each\s+of\s+your\s+subsequent\s+turns",
        r"start\s+of\s+(?:your|each|combat|the|a|his|her|its)\s+turn",
        r"end\s+of\s+(?:your|each|combat|the|a|his|her|its)\s+turn",
        r"roll\s+Initiative",
        r"first\s+turn\s+of\s+each\s+combat"
    ],
    "Attack / Hit": [
        r"when\s+you\s+hit",
        r"when\s+you\s+make\s+an\s+attack",
        r"when\s+you\s+attack",
        r"when\s+a\s+creature\s+hits\s+you",
        r"when\s+a\s+creature\s+makes\s+an\s+attack\s+roll\s+against\s+you",
        r"when\s+an\s+attack\s+roll\s+hits\s+you",
        r"when\s+you\s+make\s+the\s+extra\s+attack",
        r"when\s+you\s+hit\s+a\s+target",
        r"when\s+you\s+hit\s+a\s+creature",
        r"when\s+a\s+creature\s+makes\s+an\s+attack"
    ],
    "Damage / HP / Status / Death": [
        r"reduced\s+to\s+0\s+Hit\s+Points",
        r"drop\s+to\s+0\s+Hit\s+Points",
        r"when\s+you\s+take\s+damage",
        r"when\s+you\s+deal\s+damage",
        r"whenever\s+you\s+deal\s+damage",
        r"when\s+a\s+creature\s+takes\s+damage",
        r"when\s+you\s+first\s+adopt\s+this\s+form",
        r"takes\s+damage\s+from\s+a\s+creature",
        r"when\s+a\s+creature\s+you\s+can\s+see\s+takes\s+damage",
        r"reduced\s+to\s+0",
        r"when\s+a\s+creature\s+dies"
    ],
    "Saving Throws / Check / D20 Tests": [
        r"roll\s+a\s+1\s+on\s+the\s+d20",
        r"roll\s+a\s+20\s+on\s+the\s+d20",
        r"fail\s+a\s+saving\s+throw",
        r"succeed\s+on\s+a\s+saving\s+throw",
        r"make\s+a\s+saving\s+throw",
        r"make\s+a\s+check",
        r"D20\s+Test",
        r"fails\s+a\s+(?:Dexterity|Strength|Constitution|Intelligence|Wisdom|Charisma)\s+saving\s+throw",
        r"succeeds\s+on\s+a\s+saving\s+throw"
    ],
    "Spellcasting / Magic Use": [
        r"when\s+you\s+cast",
        r"whenever\s+you\s+cast",
        r"when\s+you\s+manifest\s+the\s+Emanation",
        r"when\s+you\s+assume\s+a\s+Wild\s+Shape",
        r"when\s+you\s+channel\s+lunar\s+magic",
        r"when\s+you\s+expend\s+a\s+level",
        r"when\s+you\s+use\s+any\s+spell\s+slots"
    ],
    "Feature / Ability Activation & Use": [
        r"when\s+you\s+use\s+this\s+feature",
        r"when\s+you\s+use\s+this\s+trait",
        r"when\s+you\s+use\s+your\s+Channel\s+Divinity",
        r"when\s+you\s+use\s+the\s+Dreadful\s+Strike",
        r"whenever\s+you\s+use\s+Moonlight\s+Step",
        r"when\s+you\s+activate\s+it",
        r"when\s+you\s+choose\s+one\s+of\s+the\s+following",
        r"when\s+you\s+transform"
    ],
    "Movement / Environment / Positioning": [
        r"when\s+you\s+are\s+obscured",
        r"when\s+you\s+move",
        r"when\s+you\s+enter",
        r"end\s+your\s+turn\s+inside",
        r"when\s+you\s+are\s+in\s+this\s+form",
        r"while\s+entirely\s+in\s+Darkness",
        r"when\s+you\s+travel"
    ],
    "Character Level / Progression / Selection": [
        r"when\s+you\s+reach\s+(?:character|Ranger|Druid|Cleric|Sorcerer|Bard|Paladin|Monk|Wizard|Barbarian|Warlock|Rogue)\s+level",
        r"whenever\s+you\s+gain\s+a\s+level",
        r"when\s+you\s+select",
        r"chosen\s+when\s+you\s+select",
        r"when\s+you\s+gain\s+this\s+feature",
        r"whenever\s+you\s+gain\s+a\s+Druid\s+level"
    ]
}

categorized = {cat: [] for cat in CATEGORIES}
uncategorized = []

# Compile regexes for performance
compiled_patterns = {cat: [re.compile(p, re.IGNORECASE) for p in patterns] for cat, patterns in CATEGORIES.items()}

# Function to extract the precise trigger clause (e.g. starting with when/if/at until a comma or logical end)
def extract_trigger_clause(sentence):
    # Match clause starting with when/whenever/if/at/after until a comma or helper word, or the end of the sentence.
    match = re.search(r'\b(when(?:ever)?|if|at the start of|at the end of|after)\b.*?(?=,|$|\b(?:you\s+can|you\s+gain|you\s+regain|each\s+creature|the\s+target|you\s+thereafter|choose|the\s+device|a\s+creature\s+takes)\b)', sentence, re.IGNORECASE)
    if match:
        return match.group(0).strip()
    return None

for item in triggers:
    sentence = item["sentence"]
    file_path = item["file"]
    matched = False
    
    # We want to identify the feature name if possible. Usually, features in txt files have format:
    # "Feature Name. Sentence..." or "Level X: Feature Name\n..."
    # Let's extract the filename (source) and look for context if needed, but for now we'll just track filename
    source_name = os.path.splitext(os.path.basename(file_path))[0]
    
    trigger_clause = extract_trigger_clause(sentence) or sentence
    
    for cat, regexes in compiled_patterns.items():
        for r in regexes:
            if r.search(sentence):
                categorized[cat].append({
                    "source": source_name,
                    "file": file_path,
                    "sentence": sentence,
                    "clause": trigger_clause
                })
                matched = True
                break # Avoid duplicating in same category, though it could match multiple categories
        if matched:
            # We allow a trigger to belong to multiple categories if they match different patterns,
            # but for this script let's keep it in the first matching category to partition them.
            pass

    if not matched:
        uncategorized.append({
            "source": source_name,
            "file": file_path,
            "sentence": sentence,
            "clause": trigger_clause
        })

# Print summary counts
print("Trigger Classification Summary:")
for cat, items in categorized.items():
    print(f"- {cat}: {len(items)}")
print(f"- Uncategorized: {len(uncategorized)}")

# Save categorized results to a file
with open("scratch/categorized_triggers.json", "w", encoding="utf-8") as out:
    json.dump({
        "categorized": categorized,
        "uncategorized": uncategorized
    }, out, indent=2)
