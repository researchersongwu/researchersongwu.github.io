#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_ROOT="${1:-$ROOT}"
cp "$ROOT/.rollback/pre-selected-awards-06-awards.md" "$TARGET_ROOT/_sections/06-awards.md"
cp "$ROOT/.rollback/pre-selected-awards-test-site.mjs" "$TARGET_ROOT/scripts/test-site.mjs"
python3 - "$TARGET_ROOT" <<'PY'
from pathlib import Path
import sys
(Path(sys.argv[1]) / 'artifacts' / 'selected-honors-awards-rendered.png').unlink(missing_ok=True)
PY
printf 'ROLLBACK restored the Awards heading in %s\n' "$TARGET_ROOT"
