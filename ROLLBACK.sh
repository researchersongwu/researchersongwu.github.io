#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_ROOT="${1:-$ROOT}"
cp "$ROOT/.rollback/pre-poster-test-site.mjs" "$TARGET_ROOT/scripts/test-site.mjs"
python3 - "$TARGET_ROOT" <<'PY'
from pathlib import Path
import sys
root = Path(sys.argv[1])
for relative in [
    '_sections/05-posters.md',
    '_posts/2026-04-01-understanding-risks-splash-ads-poster.md',
    'artifacts/posters-section-rendered.png',
]:
    (root / relative).unlink(missing_ok=True)
PY
printf 'ROLLBACK removed the Posters section and poster Markdown from %s\n' "$TARGET_ROOT"
