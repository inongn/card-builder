import os
import re
import json

# Paths to scan
PATHS = [
    "reference/classes",
    "reference/feats",
    "reference/species"
]

# Exclude lines that look like markdown headers, path navigation, or table headers/rows
EXCLUDE_PATTERNS = [
    re.compile(r"^Home\s+»", re.IGNORECASE),
    re.compile(r"^Source:", re.IGNORECASE),
    re.compile(r"^\s*$"),
    # Exclude table headers/rows with tabs or multiple spaces separating values (standard table formatting in these txt files)
    re.compile(r"\t"),
]

# Keywords to find trigger sentences
TRIGGER_KEYWORDS = [
    "when", "whenever", "at the start of", "at the end of", "if you", "if a", "after you", "once you"
]

# Trigger taxonomy classification regexes
TAXONOMY = {
    "Rests & Down-time / Resets": [
        r"finish\s+(?:a\s+)?(?:Short\s+or\s+)?Long\s+Rest",
        r"finish\s+a\s+Short\s+Rest",
        r"finish\s+a\s+Rest",
        r"finishing\s+a\s+(?:Short\s+or\s+)?Long\s+Rest",
        r"finish\s+2d4\s+Long\s+Rests"
    ],
    "Combat Initiation & Initiative": [
        r"roll\s+Initiative",
        r"first\s+turn\s+of\s+each\s+combat",
        r"at\s+the\s+start\s+of\s+your\s+first\s+turn",
        r"when\s+you\s+roll\s+Initiative",
        r"after\s+you\s+roll\s+Initiative"
    ],
    "Turn Sequence / Rounds (Time)": [
        r"at\s+the\s+start\s+of\s+your\s+turn",
        r"at\s+the\s+start\s+of\s+each\s+of\s+your\s+subsequent\s+turns",
        r"at\s+the\s+start\s+of\s+each\s+of\s+your\s+turns",
        r"at\s+the\s+start\s+of\s+(?:your|each|combat|the|a|his|her|its)\s+turn",
        r"at\s+the\s+end\s+of\s+(?:your|each|combat|the|a|his|her|its)\s+turn",
        r"at\s+the\s+start\s+of\s+each\s+turn",
        r"at\s+the\s+end\s+of\s+each\s+turn",
        r"ends\s+its\s+turn\s+within",
        r"at\s+the\s+end\s+of\s+it",
        r"at\s+the\s+end\s+of\s+each\s+of\s+the\s+Frightened\s+creature's\s+turns",
        r"at\s+the\s+end\s+of\s+each\s+of\s+its\s+turns"
    ],
    "Attacking & Hitting (Offensive)": [
        r"when\s+you\s+hit",
        r"whenever\s+you\s+hit",
        r"when\s+you\s+make\s+an\s+attack",
        r"when\s+you\s+attack",
        r"when\s+you\s+make\s+the\s+extra\s+attack",
        r"when\s+you\s+hit\s+a\s+target",
        r"when\s+you\s+hit\s+a\s+creature",
        r"whenever\s+it\s+hits",
        r"misses\s+with\s+an\s+attack",
        r"when\s+you\s+miss",
        r"misses\s+with\s+an\s+attack\s+roll",
        r"when\s+both\s+you\s+and\s+your\s+illusion\s+are\s+within",
        r"when\s+you\s+deal\s+Sneak\s+Attack",
        r"attack\s+roll\s+for\s+a\s+spell\s+and\s+miss",
        r"after\s+you\s+attack\s+with\s+the\s+blade",
        r"when\s+you\s+make\s+your\s+first\s+attack\s+roll",
        r"when\s+you\s+make\s+an\s+Unarmed\s+Strike",
        r"when\s+you\s+make\s+your\s+first\s+attack",
        r"when\s+you\s+and\s+your\s+allies\s+make\s+attack\s+rolls"
    ],
    "Being Attacked & Targeted (Defensive)": [
        r"when\s+a\s+creature\s+hits\s+you",
        r"when\s+a\s+creature\s+makes\s+an\s+attack\s+roll\s+against\s+you",
        r"when\s+an\s+attack\s+roll\s+hits\s+you",
        r"when\s+a\s+creature\s+makes\s+an\s+attack",
        r"makes\s+an\s+attack\s+roll\s+against\s+you",
        r"makes\s+an\s+attack\s+roll",
        r"when\s+you\s+are\s+hit\s+by\s+an\s+attack",
        r"when\s+the\s+creature\s+is\s+hit",
        r"attacker\s+that\s+you\s+can\s+see\s+hits\s+you",
        r"once\s+per\s+turn\s+when\s+you\s+are\s+hit"
    ],
    "Saving Throws & Checks (D20 Tests)": [
        r"roll\s+a\s+\d+\s+on\s+the\s+d20",
        r"roll\s+a\s+d20",
        r"fail\s+a\s+saving\s+throw",
        r"succeed\s+on\s+a\s+saving\s+throw",
        r"make\s+a\s+saving\s+throw",
        r"make\s+a\s+check",
        r"ability\s+check",
        r"D20\s+Test",
        r"fails\s+a\s+(?:Dexterity|Strength|Constitution|Intelligence|Wisdom|Charisma)?\s*saving\s+throw",
        r"succeeds\s+on\s+a\s+(?:Dexterity|Strength|Constitution|Intelligence|Wisdom|Charisma)?\s*saving\s+throw",
        r"succeeds\s+on\s+an\s+ability\s+check",
        r"fails\s+its\s+save",
        r"succeeds\s+on\s+a\s+saving\s+throw",
        r"saving\s+throw\s+against\s+an\s+effect",
        r"saving\s+throw\s+to\s+maintain\s+Concentration",
        r"saving\s+throw\s+to\s+avoid\s+or\s+end",
        r"roll\s+a\s+20",
        r"roll\s+a\s+1",
        r"about\s+to\s+roll\s+a\s+d20",
        r"if\s+you\s+succeed",
        r"make\s+a\s+Death\s+Saving\s+Throw",
        r"requires\s+a\s+saving\s+throw",
        r"fail\s+an\s+ability\s+check"
    ],
    "Damage, HP Changes & Death": [
        r"reduced\s+to\s+0\s+Hit\s+Points",
        r"drop\s+to\s+0\s+Hit\s+Points",
        r"reduced\s+to\s+0",
        r"drop\s+to\s+0",
        r"when\s+you\s+take\s+damage",
        r"when\s+you\s+deal\s+damage",
        r"whenever\s+you\s+deal\s+damage",
        r"when\s+a\s+creature\s+takes\s+damage",
        r"takes\s+damage\s+from\s+a\s+creature",
        r"when\s+a\s+creature\s+you\s+can\s+see\s+takes\s+damage",
        r"when\s+a\s+creature\s+dies",
        r"when\s+you\s+deal\s+damage\s+to\s+it",
        r"when\s+you\s+hit\s+a\s+target\s+with\s+an\s+attack\s+roll\s+and\s+deal\s+damage",
        r"restore\s+Hit\s+Points",
        r"restores\s+Hit\s+Points",
        r"restoring\s+Hit\s+Points",
        r"familiar\s+takes\s+damage",
        r"warded\s+creature\s+takes\s+damage",
        r"takes\s+damage",
        r"reduce\s+the\s+damage\s+to\s+0"
    ],
    "Spellcasting & Magical Effects": [
        r"when\s+you\s+cast",
        r"whenever\s+you\s+cast",
        r"when\s+you\s+manifest\s+the\s+Emanation",
        r"when\s+you\s+assume\s+a\s+Wild\s+Shape",
        r"when\s+you\s+channel\s+lunar\s+magic",
        r"when\s+you\s+expend\s+a\s+level",
        r"when\s+you\s+use\s+any\s+spell\s+slots",
        r"when\s+you\s+cast\s+a\s+spell",
        r"cast\s+the\s+spell",
        r"when\s+the\s+illusion\s+ends",
        r"when\s+the\s+form\s+ends",
        r"when\s+summoned",
        r"when\s+choosing\s+known\s+forms",
        r"after\s+you\s+cast\s+a\s+spell",
        r"when\s+you\s+find\s+a\s+level\s+1\+\s+Wizard\s+spell"
    ],
    "Feature Activation & Actions": [
        r"when\s+you\s+use\s+this\s+feature",
        r"when\s+you\s+use\s+this\s+trait",
        r"when\s+you\s+use\s+your\s+Channel\s+Divinity",
        r"when\s+you\s+use\s+the\s+Dreadful\s+Strike",
        r"whenever\s+you\s+use\s+Moonlight\s+Step",
        r"when\s+you\s+activate\s+it",
        r"when\s+you\s+choose\s+one\s+of\s+the\s+following",
        r"when\s+you\s+transform",
        r"when\s+you\s+command\s+your\s+Primal\s+Companion",
        r"whenever\s+you\s+use\s+Warding\s+Flare",
        r"when\s+you\s+activate\s+your\s+Rage",
        r"when\s+you\s+activate\s+this\s+form",
        r"when\s+you\s+do\s+so",
        r"when\s+you\s+take\s+the\s+Attack\s+action",
        r"whenever\s+you\s+take\s+the\s+Attack\s+action",
        r"whenever\s+you\s+take\s+the\s+Dash\s+action",
        r"when\s+the\s+book\s+appears",
        r"if\s+you\s+use\s+Reckless\s+Attack",
        r"expend\s+a\s+Focus\s+Point",
        r"expend\s+a\s+use\s+of",
        r"expend\s+a\s+number\s+of\s+Hit\s+Point\s+Dice"
    ],
    "Movement, Environment & Positioning": [
        r"when\s+you\s+are\s+obscured",
        r"when\s+you\s+move",
        r"when\s+you\s+enter",
        r"end\s+your\s+turn\s+inside",
        r"when\s+you\s+are\s+in\s+this\s+form",
        r"while\s+entirely\s+in\s+Darkness",
        r"when\s+you\s+travel",
        r"end\s+your\s+turn\s+in\s+such\s+a\s+space",
        r"when\s+you\s+move\s+through",
        r"if\s+you\s+end\s+your\s+turn"
    ],
    "Level-up & Character Selection": [
        r"when\s+you\s+reach\s+(?:character|Ranger|Druid|Cleric|Sorcerer|Bard|Paladin|Monk|Wizard|Barbarian|Warlock|Rogue)\s+level",
        r"whenever\s+you\s+gain\s+a\s+level",
        r"when\s+you\s+select",
        r"chosen\s+when\s+you\s+select",
        r"when\s+you\s+gain\s+this\s+feature",
        r"whenever\s+you\s+gain\s+a\s+Druid\s+level",
        r"when\s+you\s+choose\s+this\s+subclass",
        r"when\s+you\s+gain\s+certain\s+Warlock\s+levels",
        r"whenever\s+you\s+gain\s+a\s+Ranger\s+level",
        r"whenever\s+you\s+gain\s+a\s+Cleric\s+level"
    ]
}

def split_sentences(text):
    abbrevs = ["HP", "GP", "SP", "CP", "EP", "DC", "AC", "e.g.", "i.e.", "vs.", "d20", "d8", "d6", "d4", "d10", "d12", "d100", "L."]
    for ab in abbrevs:
        text = text.replace(ab + ".", ab + "##DOT##")
    # Split on periods/exclamations/questions followed by space
    sentences = re.split(r'(?<=[.!?])\s+', text)
    cleaned = []
    for s in sentences:
        s = s.replace("##DOT##", ".")
        cleaned.append(s.strip())
    return cleaned

def clean_text(text):
    # Normalize whitespaces
    return re.sub(r'\s+', ' ', text).strip()

def extract_trigger_clause(sentence):
    # Find the starting position of a trigger keyword
    pat = r'\b(when(?:ver)?|if|at the start of|at the end of|after|once)\b'
    match = re.search(pat, sentence, re.IGNORECASE)
    if not match:
        return None
    start_idx = match.start()
    
    # We want to extract up to a comma or logical break, or the end of the sentence
    # Common logical breaks indicate the effect starts (e.g. "you can", "you gain", "the target", etc.)
    break_pat = r'\b(you\s+can|you\s+gain|you\s+regain|each\s+creature|the\s+target|choose|a\s+creature\s+takes|you\s+thereafter|once\s+on\s+each|this\s+form|its\s+speed|make\s+a|the\s+device|you\s+learn|you\s+have|on\s+a\s+failed|on\s+a\s+successful)\b'
    
    clause_text = sentence[start_idx:]
    # Check if there is a comma before the effect break
    comma_idx = clause_text.find(",")
    
    # Find the first break keyword position
    break_match = re.search(break_pat, clause_text, re.IGNORECASE)
    break_idx = break_match.start() if break_match else len(clause_text)
    
    if comma_idx != -1 and comma_idx < break_idx:
        end_idx = comma_idx
    else:
        end_idx = break_idx
        
    final_clause = clause_text[:end_idx].strip()
    # Clean up trailing punctuation
    final_clause = re.sub(r'[,.!?\s]+$', '', final_clause)
    return final_clause

# Load files and analyze
results = []

for root_path in PATHS:
    if not os.path.exists(root_path):
        continue
    for root, dirs, files in os.walk(root_path):
        for file in files:
            if not file.endswith(".txt"):
                continue
            file_path = os.path.join(root, file)
            # Determine domain type
            domain = ""
            if "classes" in file_path:
                domain = "Class/Subclass"
            elif "feats" in file_path:
                domain = "Feat"
            elif "species" in file_path:
                domain = "Species"
                
            # Read content
            with open(file_path, "r", encoding="utf-8") as f:
                lines = f.readlines()
                
            # Find active feature or context
            current_header = ""
            current_feature = ""
            
            for line_idx, line in enumerate(lines):
                line_stripped = line.strip()
                if not line_stripped:
                    continue
                
                # Check for exclusions
                if any(pat.search(line_stripped) for pat in EXCLUDE_PATTERNS):
                    continue
                
                # Level header format: e.g. "Level 3: Dread Ambusher" or "Level 1: Spellcasting"
                if line_stripped.startswith("Level ") and ":" in line_stripped:
                    current_header = line_stripped
                    current_feature = line_stripped.split(":", 1)[1].strip()
                    continue
                
                # Feature dot format: e.g. "Ambusher's Leap. At the start of..." or "Luck. When you..."
                # Let's see if the line starts with a capitalized name followed by a dot and a space
                feature_dot_match = re.match(r"^([A-Z][a-zA-Z'\s\-]{2,30})\.\s+", line_stripped)
                if feature_dot_match:
                    feat_name = feature_dot_match.group(1)
                    # Make sure it's not a common abbreviation or word like "For example"
                    if feat_name not in ["For example", "In addition", "For instance", "On a failed save", "On a successful save"]:
                        current_feature = feat_name
                
                # Split line into sentences
                sentences = split_sentences(line_stripped)
                for sentence in sentences:
                    # Check if sentence contains any trigger keyword
                    has_trigger = False
                    for kw in TRIGGER_KEYWORDS:
                        if re.search(r'\b' + kw + r'\b', sentence, re.IGNORECASE):
                            has_trigger = True
                            break
                            
                    if not has_trigger:
                        continue
                        
                    # Extract trigger clause
                    clause = extract_trigger_clause(sentence)
                    if not clause:
                        continue
                        
                    # Classify
                    matched_category = "General / Specific Situations"
                    for cat, regexes in TAXONOMY.items():
                        cat_matched = False
                        for r_str in regexes:
                            if re.search(r_str, sentence, re.IGNORECASE):
                                matched_category = cat
                                cat_matched = True
                                break
                        if cat_matched:
                            break
                            
                    # Clean feature name
                    feat_display = current_feature if current_feature else os.path.splitext(file)[0].title()
                    if current_header and current_header.endswith(feat_display):
                        feat_display = current_header
                    elif current_header:
                        feat_display = f"{current_header} ({feat_display})"
                        
                    results.append({
                        "domain": domain,
                        "source_file": os.path.relpath(file_path),
                        "feature": feat_display,
                        "sentence": sentence,
                        "trigger_clause": clause,
                        "category": matched_category
                    })

print(f"Extracted and processed {len(results)} trigger conditions.")

# Organize and build report
# Count by categories
cat_counts = {}
for r in results:
    cat = r["category"]
    cat_counts[cat] = cat_counts.get(cat, 0) + 1

# Group by category, then by domain
grouped = {}
for r in results:
    cat = r["category"]
    dom = r["domain"]
    if cat not in grouped:
        grouped[cat] = {}
    if dom not in grouped[cat]:
        grouped[cat][dom] = []
    grouped[cat][dom].append(r)

# Generate Markdown Report
report_path = "/home/gerardon/.gemini/antigravity-ide/brain/9016829e-8574-4b58-8e12-e25ca7792d24/trigger_conditions_analysis.md"
os.makedirs(os.path.dirname(report_path), exist_ok=True)

with open(report_path, "w", encoding="utf-8") as rf:
    rf.write("# D&D Rules Engine: Trigger Conditions Analysis\n\n")
    rf.write("This document summarizes all extracted trigger conditions from the class, feat, and species reference text files in the codebase. These triggers define the conditions under which features, feats, or traits are activated.\n\n")
    
    rf.write("## Trigger Categories Summary\n\n")
    rf.write("| Category | Counts |\n")
    rf.write("| --- | --- |\n")
    for cat in sorted(cat_counts.keys(), key=lambda x: -cat_counts[x]):
        rf.write(f"| {cat} | {cat_counts[cat]} |\n")
    rf.write("\n---\n\n")
    
    rf.write("## Trigger Conditions Directory\n\n")
    
    # Sort categories
    for cat in sorted(grouped.keys()):
        rf.write(f"### {cat}\n\n")
        
        for dom in sorted(grouped[cat].keys()):
            rf.write(f"#### {dom} Triggers\n\n")
            
            # Print a list of trigger clauses with source files and original sentences
            # Dedup by trigger clause to make it readable, but list instances
            seen_clauses = {}
            for item in grouped[cat][dom]:
                cl = item["trigger_clause"].strip()
                # Clean up multiple whitespaces
                cl = " ".join(cl.split())
                if cl not in seen_clauses:
                    seen_clauses[cl] = []
                seen_clauses[cl].append(item)
                
            for cl in sorted(seen_clauses.keys()):
                rf.write(f"- **Trigger**: `{cl}`\n")
                # List the features where this is used
                rf.write("  - *Used in*:\n")
                for instance in seen_clauses[cl]:
                    # Create link to file
                    # Absolute path to file
                    abs_path = os.path.abspath(instance["source_file"])
                    file_basename = os.path.basename(instance["source_file"])
                    rf.write(f"    - [{instance['feature']} ({file_basename})](file://{abs_path}): \"*{instance['sentence']}*\"\n")
            rf.write("\n")
            
    print(f"Report generated successfully at {report_path}")
