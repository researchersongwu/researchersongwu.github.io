#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_ROOT="${1:-$ROOT}"
cp "$ROOT/.rollback/pre-starbugs-reorder-09-starbugs.md" "$TARGET_ROOT/_sections/09-starbugs.md"
cp "$ROOT/.rollback/pre-starbugs-reorder-test-site.mjs" "$TARGET_ROOT/scripts/test-site.mjs"
printf 'ROLLBACK restored the pre-update StarBugs ordering and tests in %s\n' "$TARGET_ROOT"
