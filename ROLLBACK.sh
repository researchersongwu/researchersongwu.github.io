#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_ROOT="${1:-$ROOT}"
cp "$ROOT/.rollback/pre-reupload-publication.md" "$TARGET_ROOT/_posts/2026-08-01-when-ad-networks-misbehave.md"
cp "$ROOT/.rollback/pre-reupload-publication-renderer.md" "$TARGET_ROOT/_sections/04-publications.md"
cp "$ROOT/.rollback/pre-reupload-test-site.mjs" "$TARGET_ROOT/scripts/test-site.mjs"
python3 - "$TARGET_ROOT" <<'PY'
from pathlib import Path
import sys
(Path(sys.argv[1]) / 'artifacts' / 'reuploaded-publication.png').unlink(missing_ok=True)
PY
printf 'ROLLBACK restored the pre-reupload publication files in %s\n' "$TARGET_ROOT"
