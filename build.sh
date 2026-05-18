#!/bin/bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

# ── Auto-discovery build ────────────────────────────────────────────────────
# Order: shared DS → registry → store → pages (any order) → app shell
# Pages are isolated closures so glob order doesn't matter.

cat \
  shared/shared.jsx \
  shared/shell.jsx \
  shared/MainMenu.jsx \
  shared/registry.jsx \
  store.jsx \
  pages/*.jsx \
  app.jsx \
  > /tmp/master-input.jsx

./node_modules/.bin/babel /tmp/master-input.jsx -o /tmp/master-compiled.js
# Skip Terser — its scope-flattening mangle produces TDZ errors (const B
# collisions across nested closures). Unminified size (~1.2 MB) is fine for
# a prototype.
cp /tmp/master-compiled.js /tmp/master-min.js

python3 build.py
