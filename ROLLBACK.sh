#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_ROOT="${1:-$ROOT}"
cp "$ROOT/.rollback/pre-reupload-about.md" "$TARGET_ROOT/_sections/01-about.md"
cp "$ROOT/.rollback/pre-reupload-about-test-site.mjs" "$TARGET_ROOT/scripts/test-site.mjs"
python3 - "$TARGET_ROOT" <<'PY'
from pathlib import Path
import sys
(Path(sys.argv[1]) / 'artifacts' / 'reuploaded-about-rendered.png').unlink(missing_ok=True)
PY
printf 'ROLLBACK restored the pre-reupload About source in %s\n' "$TARGET_ROOT"
