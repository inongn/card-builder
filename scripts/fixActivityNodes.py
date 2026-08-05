#!/usr/bin/env python3
"""
fixActivityNodes.py

Walks all YAML files under data/, finds every node with `type: Activity`,
and fills in missing fields with defaults:
  - time:     "free action"
  - duration: "instantaneous"
  - range:    "self"

Only nodes actually missing the key get modified; existing values are untouched.
"""

import os
import glob
import re

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

DEFAULTS = {
    "time":     "free action",
    "duration": "instantaneous",
    "range":    "self",
}

def process_file(path: str) -> bool:
    """Return True if the file was modified."""
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    text = "".join(lines)

    # Quick skip: no Activity nodes at all
    if "type: Activity" not in text:
        return False

    # We need to find every Activity block and check which fields it has.
    # Strategy: scan line by line tracking indentation of `type: Activity`,
    # then look ahead to see which sibling keys exist in the same block,
    # and insert missing defaults right after the `type: Activity` line.

    new_lines = []
    i = 0
    modified = False

    while i < len(lines):
        line = lines[i]
        new_lines.append(line)

        # Detect `type: Activity` (possibly indented)
        m = re.match(r'^(\s*)type:\s*Activity\s*$', line)
        if m:
            indent = m.group(1)
            block_indent = indent  # indentation of the Activity node's keys

            # Collect sibling keys AFTER `type: Activity` in this block
            j = i + 1
            block_lines_indices = []
            while j < len(lines):
                bl = lines[j]
                # blank lines are OK to skip
                if bl.strip() == "":
                    j += 1
                    continue
                bm = re.match(r'^(\s*)(\S)', bl)
                if not bm:
                    j += 1
                    continue
                line_indent = bm.group(1)
                if len(line_indent) < len(block_indent):
                    # Dedented past our block - stop
                    break
                if len(line_indent) == len(block_indent):
                    block_lines_indices.append(j)
                j += 1

            block_text = "".join(lines[k] for k in block_lines_indices)

            # Also look backward from i to find sibling keys before `type:`
            k2 = i - 1
            pre_block_text = ""
            while k2 >= 0:
                pl = lines[k2]
                if pl.strip() == "":
                    k2 -= 1
                    continue
                pm = re.match(r'^(\s*)(\S)', pl)
                if not pm:
                    k2 -= 1
                    continue
                pi = pm.group(1)
                if len(pi) < len(block_indent):
                    break
                if len(pi) == len(block_indent):
                    pre_block_text = pl + pre_block_text
                k2 -= 1

            combined = pre_block_text + block_text

            # Check which defaults are missing
            for field, default_value in DEFAULTS.items():
                pattern = re.compile(
                    r'^' + re.escape(block_indent) + re.escape(field) + r'\s*:',
                    re.MULTILINE
                )
                if not pattern.search(combined):
                    insert_line = f"{block_indent}{field}: {default_value}\n"
                    new_lines.append(insert_line)
                    modified = True

        i += 1

    if modified:
        with open(path, "w", encoding="utf-8") as f:
            f.writelines(new_lines)

    return modified


def main():
    pattern = os.path.join(DATA_DIR, "**", "*.yml")
    files = glob.glob(pattern, recursive=True)
    files.sort()

    total = 0
    changed = 0

    for path in files:
        total += 1
        if process_file(path):
            changed += 1
            rel = os.path.relpath(path, os.path.join(DATA_DIR, ".."))
            print(f"  +  {rel}")

    print(f"\nDone. Checked {total} files, modified {changed}.")


if __name__ == "__main__":
    main()
