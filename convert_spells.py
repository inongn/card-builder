import os
import re

directories = [
    {
        "source": '/home/gerardon/Documentos/card-builder/reference/spells/cantrips',
        "target": '/home/gerardon/Documentos/card-builder/data/spells/cantrips'
    },
    {
        "source": '/home/gerardon/Documentos/card-builder/reference/spells/level1Spells',
        "target": '/home/gerardon/Documentos/card-builder/data/spells/level1Spells'
    },
    {
        "source": '/home/gerardon/Documentos/card-builder/reference/spells/level2Spells',
        "target": '/home/gerardon/Documentos/card-builder/data/spells/level2Spells'
    },
    {
        "source": '/home/gerardon/Documentos/card-builder/reference/spells/level3Spells',
        "target": '/home/gerardon/Documentos/card-builder/data/spells/level3Spells'
    },
    {
        "source": '/home/gerardon/Documentos/card-builder/reference/spells/level4Spells',
        "target": '/home/gerardon/Documentos/card-builder/data/spells/level4Spells'
    },
    {
        "source": '/home/gerardon/Documentos/card-builder/reference/spells/level5Spells',
        "target": '/home/gerardon/Documentos/card-builder/data/spells/level5Spells'
    },
    {
        "source": '/home/gerardon/Documentos/card-builder/reference/spells/level6Spells',
        "target": '/home/gerardon/Documentos/card-builder/data/spells/level6Spells'
    },
    {
        "source": '/home/gerardon/Documentos/card-builder/reference/spells/level7Spells',
        "target": '/home/gerardon/Documentos/card-builder/data/spells/level7Spells'
    },
    {
        "source": '/home/gerardon/Documentos/card-builder/reference/spells/level8Spells',
        "target": '/home/gerardon/Documentos/card-builder/data/spells/level8Spells'
    },
    {
        "source": '/home/gerardon/Documentos/card-builder/reference/spells/level9Spells',
        "target": '/home/gerardon/Documentos/card-builder/data/spells/level9Spells'
    }
]

damage_types = [
    "Piercing", "Bludgeoning", "Slashing", "Fire", "Cold", "Force", 
    "Psychic", "Necrotic", "Radiant", "Acid", "Poison", "Lightning", "Thunder"
]

stats = ["Dexterity", "Constitution", "Strength", "Wisdom", "Charisma", "Intelligence"]

def camel_case(s):
    parts = re.split(r'[-_\s]+', s)
    if len(parts) == 1:
        return s[0].lower() + s[1:]
    return parts[0].lower() + "".join(p.capitalize() for p in parts[1:])

def process_file(source_dir, target_dir, filename):
    filepath = os.path.join(source_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    while lines and not lines[-1].strip():
        lines.pop()
        
    lines = [line.strip() for line in lines]
    if len(lines) < 9:
        print(f"Skipping {filename} due to length")
        return
    
    name = lines[0]
    base_name = os.path.splitext(filename)[0]
    spell_id = camel_case(base_name)
    
    line4 = lines[3]
    line4_clean = re.sub(r'[,\(\)]', '', line4)
    words = line4_clean.split()
    tags = []
    resource = None
    i = 0
    while i < len(words):
        word = words[i].lower()
        if word == 'level' and i + 1 < len(words) and words[i+1].isdigit():
            level_tag = f"level{words[i+1]}Spell"
            tags.append(level_tag)
            resource = f"level{words[i+1]}SpellSlot"
            i += 2
        elif (match := re.match(r'(\d+)(?:st|nd|rd|th)?-?level', word, re.I)):
            level_tag = f"level{match.group(1)}Spell"
            tags.append(level_tag)
            resource = f"level{match.group(1)}SpellSlot"
            i += 1
        elif word == 'cantrip':
            tags.append('cantrip')
            i += 1
        else:
            tags.append(word)
            i += 1
    
    time_line = lines[4].replace('Casting Time: ', '')
    
    if 'or ritual' in time_line.lower():
        time_line = re.sub(r'\s+or ritual', '', time_line, flags=re.I)
        tags.append('ritual')
        
    spell_range = lines[5].replace('Range: ', '').lower()
    duration = lines[7].replace('Duration: ', '').lower()
    
    description_lines = lines[8:]
    upgrade_line_index = -1
    for idx, line in enumerate(description_lines):
        if line.startswith('Cantrip Upgrade'):
            upgrade_line_index = idx
            break
            
    has_upgrade = upgrade_line_index != -1
    if has_upgrade:
        description_lines.pop(upgrade_line_index)
        
    if ',' in time_line and 'which you take' in time_line.lower():
        parts = time_line.split(',', 1)
        time = parts[0].strip().lower()
        condition = parts[1].strip()
        
        condition = re.sub(r'^which you take\s+(?:in response to\s+|when\s+|immediately\s+after\s+)?', '', condition, flags=re.I)
        condition = re.sub(r'\byou are\b', 'being', condition, flags=re.I)
        
        if not condition.lower().startswith('immediately after'):
            condition = "Immediately after " + condition
        else:
            condition = "Immediately after " + condition[len("immediately after"):].strip()
        
        condition = condition[0].upper() + condition[1:]
        
        if description_lines:
            first_line = description_lines[0]
            first_line = re.sub(r'^As you hit (?:the target|the creature|a target|a creature),\s*', '', first_line)
            if first_line:
                description_lines[0] = f"{condition}, {first_line[0].lower()}{first_line[1:]}"
            else:
                description_lines[0] = condition
    else:
        time = time_line.lower()

    description_text = ""
    for i, line in enumerate(description_lines):
        if not line.strip():
            continue
        description_text += line
        if i < len(description_lines) - 1:
            # Look ahead for next non-empty line
            next_idx = i + 1
            while next_idx < len(description_lines) and not description_lines[next_idx].strip():
                next_idx += 1
            
            if next_idx < len(description_lines):
                next_line = description_lines[next_idx]
                # If current or next non-empty line is part of a table, use single newline
                if line.strip().startswith('|') and next_line.strip().startswith('|'):
                    description_text += "\n"
                else:
                    description_text += "\n\n"


    
    if has_upgrade:
        upgrade_text = lines[8 + upgrade_line_index] if len(lines) > 8 + upgrade_line_index else ""
        multi_attack_match = re.search(r'creates (?:two|three|four|\d+)\s+(beams?|rays?|bolts?)', upgrade_text, re.I)
        
        if multi_attack_match:
            obj_name = multi_attack_match.group(1)
            singular_obj = obj_name.rstrip('s')
            plural_obj = singular_obj + 's'
            scaling_expr_num = "(meta.level >= 17 ? 'four' : meta.level >= 11 ? 'three' : 'two')"
            sentence1_repl = rf"\1$(meta.level >= 5 ? {scaling_expr_num} + ' {plural_obj}' : 'a {singular_obj}')"
            description_text = re.sub(r'^([^.]+?)\b(?:a|one)\s+(beam|ray|bolt)\b', sentence1_repl, description_text, count=1, flags=re.I)
            
            def attack_replacer(m):
                make_cmd = m.group(1)
                original_suffix = m.group(2)
                return f"{make_cmd}ake a $(formatBonus(attributes.spellcasting.attack)) ranged spell attack $(meta.level >= 5 ? 'for each {singular_obj}' : '{original_suffix}')"
            attack_regex = r'([Mm])ake a ranged spell attack (against (?:the target|a target|one creature or object in range|one creature within range))'
            description_text = re.sub(attack_regex, attack_replacer, description_text, flags=re.I)
        else:
            def damage_replacer(match):
                n = int(match.group(1))
                sides = match.group(2)
                if n == 1:
                    return f"$(meta.level >= 17 ? 4 : meta.level >= 11 ? 3 : meta.level >= 5 ? 2 : 1)d{sides}"
                else:
                    return f"$(meta.level >= 17 ? {4*n} : meta.level >= 11 ? {3*n} : meta.level >= 5 ? {2*n} : {n})d{sides}"
            description_text = re.sub(r'(\d+)d(\d+)', damage_replacer, description_text, count=1)

    description_text = re.sub(r' plus your spell save dc', r'$(formatBonus(attributes.spellcasting.save))', description_text, flags=re.I)
    description_text = re.sub(r' plus your spell attack bonus', r'$(formatBonus(attributes.spellcasting.attack))', description_text, flags=re.I)
    description_text = re.sub(r' plus your spellcasting ability modifier', r'$(formatBonus(attributes.spellcasting.bonus))', description_text, flags=re.I)
    description_text = re.sub(r'your spell save dc', r'DC $(attributes.spellcasting.save)', description_text, flags=re.I)
    description_text = re.sub(r'your spell attack bonus', r'$(attributes.spellcasting.attack)', description_text, flags=re.I)
    description_text = re.sub(r'your spellcasting ability modifier', r'$(attributes.spellcasting.bonus)', description_text, flags=re.I)
    description_text = re.sub(r'([Mm])ake a ranged spell attack', r'\1ake a $(formatBonus(attributes.spellcasting.attack)) ranged spell attack', description_text)
    
    for stat in stats:
        # Don't replace if it's already preceded by "DC " and a number
        # We use a regex to look for [stat] saving throw and ensure it's not preceded by "DC " + digits
        # This handles things like "DC 15 Intelligence saving throw"
        pattern = rf'(?<!DC\s\d\s)(?<!DC\s\d\d\s)\b{stat}\s+saving\s+throw\b'
        replacement = f"DC $(attributes.spellcasting.save) {stat} saving throw"
        description_text = re.sub(pattern, replacement, description_text, flags=re.I)
        
    final_desc_lines = description_text.split("\n\n")
    for idx, line in enumerate(final_desc_lines):
        if line.startswith("Using a Higher-Level Spell Slot"):
            parts = line.split('.', 1)
            if len(parts) > 1:
                final_desc_lines[idx] = f"**{parts[0]}.**{parts[1]}"
            else:
                final_desc_lines[idx] = f"**{line}**"
        else:
            bold_match = re.match(r'^([A-Za-z\s]+)\.', line)
            if bold_match:
                words = bold_match.group(1).split()
                if 1 <= len(words) <= 4:
                    full_match = bold_match.group(0)
                    if idx != 0:
                        final_desc_lines[idx] = f"**{full_match}**" + line[len(full_match):]
            
    description_text = "\n\n".join(final_desc_lines)
    
    has_save_var = "attributes.spellcasting.save" in description_text
    has_attack_var = "attributes.spellcasting.attack" in description_text

    if has_save_var:
        tags.append("saveSpell")
    if has_attack_var:
        tags.append("attackSpell")

    is_damage_spell = False
    is_damage_text = "damage" in description_text.lower()
    if is_damage_text and (has_save_var or has_attack_var):
        tags.append("damageSpell")
        is_damage_spell = True

    if re.search(r"(?<!can['’]t\s)(?<!cannot\s)\b(regains?|restores?)\b.*?\bHit\s+Points?\b", description_text, re.I):
        tags.append("healingSpell")
        
    if is_damage_spell:
        for d_type in damage_types:
            if re.search(r'\b' + d_type + r'\b', description_text, re.I):
                tags.append(d_type.lower() + "Damage")
            
    seen = set()
    tags = [x for x in tags if not (x in seen or seen.add(x))]
    
    output_path = os.path.join(target_dir, f"{spell_id}.yml")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"id: {spell_id}\n")
        f.write(f"type: Activity\n")
        f.write(f"name: {name}\n")
        if resource:
            f.write(f"resource: {resource}\n")
        f.write(f"tags: [{', '.join(tags)}]\n")
        f.write(f"time: {time}\n")
        f.write(f"range: {spell_range}\n")
        f.write(f"duration: {duration}\n")
        f.write(f"description: |\n")
        for line in description_text.split('\n'):
            if line.strip():
                f.write(f"  {line}\n")
            else:
                f.write("\n")
        f.write("\n")

if __name__ == "__main__":
    for config in directories:
        source = config["source"]
        target = config["target"]
        print(f"Processing {source}...")
        for file in os.listdir(source):
            if file.endswith('.txt'):
                process_file(source, target, file)
    print("Conversion complete.")
