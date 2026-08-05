#!/usr/bin/env python3
"""
fixApostrophes.py

Replaces curly right single-quote / apostrophe (U+2019 → ') across all
YAML files in data/.

YAML safety rules applied per-line:
  - Inside a single-quoted YAML scalar:  U+2019 → '' (doubled, per YAML spec)
  - Everywhere else:                     U+2019 → '
"""

import glob
import os
import re

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")
CURLY = "\u2019"


def is_inside_single_quoted_scalar(line: str, char_pos: int) -> bool:
    """
    Return True if the character at char_pos falls inside a YAML single-quoted
    scalar on this line. We walk left from char_pos counting unescaped single
    quotes (in YAML, '' inside a single-quoted string is an escaped quote, not
    two boundaries). This is a line-level approximation; it handles the common
    single-line case perfectly.
    """
    # Find all straight single-quote positions to the left of char_pos
    # Build a simplified state machine:
    #   - We're "outside" until we hit a ' that opens a single-quoted scalar
    #   - '' inside a scalar = escaped quote (stays inside)
    #   - single ' inside a scalar = closing delimiter
    text = line
    in_single = False
    i = 0
    while i < char_pos:
        c = text[i]
        if c == "'":
            if in_single:
                # Could be closing or escaped ('') — look ahead
                if i + 1 < len(text) and text[i + 1] == "'":
                    i += 2  # escaped pair, skip both
                    continue
                else:
                    in_single = False  # closing quote
            else:
                # Check if this opens a single-quoted scalar:
                # In YAML, a single-quoted scalar starts with ' after
                # optional whitespace + key colon, or at start of value.
                # Simple heuristic: if we see ' not immediately after \w:
                in_single = True
        i += 1
    return in_single


def fix_line(line: str) -> str:
    if CURLY not in line:
        return line
    result = []
    i = 0
    while i < len(line):
        if line[i] == CURLY:
            if is_inside_single_quoted_scalar(line, i):
                result.append("''")  # YAML-escaped straight apostrophe
            else:
                result.append("'")
        else:
            result.append(line[i])
        i += 1
    return "".join(result)


def process_file(path: str) -> bool:
    with open(path, encoding="utf-8") as f:
        original_lines = f.readlines()

    new_lines = [fix_line(l) for l in original_lines]

    if new_lines == original_lines:
        return False

    with open(path, "w", encoding="utf-8") as f:
        f.writelines(new_lines)
    return True


def main():
    pattern = os.path.join(DATA_DIR, "**", "*.yml")
    files = sorted(glob.glob(pattern, recursive=True))

    changed = 0
    for path in files:
        if process_file(path):
            changed += 1
            rel = os.path.relpath(path, os.path.join(DATA_DIR, ".."))
            print(f"  +  {rel}")

    print(f"\nDone. Checked {len(files)} files, modified {changed}.")


if __name__ == "__main__":
    main()
