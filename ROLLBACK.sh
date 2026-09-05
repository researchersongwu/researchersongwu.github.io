#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_REPO="${1:-$ROOT}"
PRE_CHANGE_COMMIT="5a2e58f"
git -C "$TARGET_REPO" reset --hard "$PRE_CHANGE_COMMIT"
python3 - "$TARGET_REPO" <<'PY'
from pathlib import Path
import sys
(Path(sys.argv[1]) / 'assets' / 'cv.pdf').unlink(missing_ok=True)
PY
printf 'ROLLBACK restored %s to %s and removed assets/cv.pdf\n' "$TARGET_REPO" "$PRE_CHANGE_COMMIT"
