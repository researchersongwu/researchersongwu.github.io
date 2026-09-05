#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_ROOT="${1:-$ROOT}"
cp "$ROOT/.rollback/pre-publication-renderer.md" "$TARGET_ROOT/_sections/04-publications.md"
cp "$ROOT/.rollback/pre-publication-test-site.mjs" "$TARGET_ROOT/scripts/test-site.mjs"
python3 - "$TARGET_ROOT" <<'PY'
from pathlib import Path
import sys
root = Path(sys.argv[1])
(root / '_posts' / '2026-08-01-when-ad-networks-misbehave.md').unlink(missing_ok=True)
(root / 'artifacts' / 'ccs-2026-publication-rendered.png').unlink(missing_ok=True)
PY
printf 'ROLLBACK restored publication renderer and removed the CCS 2026 publication from %s\n' "$TARGET_ROOT"
