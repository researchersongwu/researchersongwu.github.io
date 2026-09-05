#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_ROOT="${1:-$ROOT}"
cp "$ROOT/.rollback/pre-cv-drive-01-about.md" "$TARGET_ROOT/_sections/01-about.md"
cp "$ROOT/.rollback/pre-cv-drive-test-site.mjs" "$TARGET_ROOT/scripts/test-site.mjs"
printf 'ROLLBACK restored the local CV link and its test in %s\n' "$TARGET_ROOT"
