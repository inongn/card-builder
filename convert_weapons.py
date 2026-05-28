import os
import re

directory = "/home/gerardon/Documentos/card-builder/data/core/equipment/weapons/"
files = [f for f in os.listdir(directory) if f.endswith(".yml")]

# Simple conversion script
for filename in files:
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    new_lines = []
    is_converted = False
    for line in lines:
        if "type: Reference" in line and "target: weaponAttack" in line:
            # Already might be converted if we run twice
            pass
        
        # Replace Type
        if line.strip() == "type: Effect":
            new_lines.append("type: Reference\n")
            continue
        
        # Remove operation
        if line.strip().startswith("operation:"):
            continue
            
        # Replace target
        if line.strip().startswith("target: attributes"):
            new_lines.append("target: weaponAttack\n")
            continue
            
        # Replace value with variables
        if line.strip() == "value:":
            new_lines.append("variables:\n")
            continue
            
        # Remove repeatable: true
        if line.strip() == "repeatable: true":
            continue
            
        new_lines.append(line)

    # Specific logic for versatile weapons to match quarterstaff.yml example
    # Find damageRoll line and check if it follows the old versatile pattern
    final_lines = []
    for line in new_lines:
        match = re.search(r"damageRoll: \"\$\(!attributes\.offHand \? '(\d+d\d+)' : '(\d+d\d+)'\)\"", line)
        if match:
            big = match.group(1)
            small = match.group(2)
            # Match the quarterstaff format: $(attributes.shieldEquipped == true ? 'small' : 'big')
            new_line = line.replace(match.group(0), f"damageRoll: \"$(attributes.shieldEquipped == true ? '{small}' : '{big}')\"")
            final_lines.append(new_line)
        else:
            final_lines.append(line)

    with open(filepath, 'w') as f:
        f.writelines(final_lines)
