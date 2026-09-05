#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_ROOT="${1:-$ROOT}"
cp "$ROOT/.rollback/pre-footer-removal-default.html" "$TARGET_ROOT/_layouts/default.html"
cp "$ROOT/.rollback/pre-footer-removal-test-site.mjs" "$TARGET_ROOT/scripts/test-site.mjs"
python3 - "$TARGET_ROOT" <<'PY'
from pathlib import Path
import sys
(Path(sys.argv[1]) / 'artifacts' / 'footer-removed-rendered.png').unlink(missing_ok=True)
PY
printf 'ROLLBACK restored the footer in %s\n' "$TARGET_ROOT"
