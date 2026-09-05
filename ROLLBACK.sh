#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_ROOT="${1:-$ROOT}"
cp "$ROOT/.rollback/pre-flowdroid-09-starbugs.md" "$TARGET_ROOT/_sections/09-starbugs.md"
cp "$ROOT/.rollback/pre-flowdroid-test-site.mjs" "$TARGET_ROOT/scripts/test-site.mjs"
printf 'ROLLBACK restored the pre-normalization FlowDroid entry and tests in %s\n' "$TARGET_ROOT"
