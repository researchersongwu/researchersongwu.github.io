#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_ROOT="${1:-$ROOT}"
cp "$ROOT/.rollback/pre-upload-08-experiences.md" "$TARGET_ROOT/_sections/08-experiences.md"
cp "$ROOT/.rollback/pre-upload-test-site.mjs" "$TARGET_ROOT/scripts/test-site.mjs"
printf 'ROLLBACK restored the previously deployed Experience section in %s\n' "$TARGET_ROOT"
