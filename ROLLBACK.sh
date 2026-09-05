#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_FILE="${1:-$ROOT/_sections/01-about.md}"
cp "$ROOT/.rollback/pre-pure-markdown-01-about.md" "$TARGET_FILE"
printf 'ROLLBACK restored %s from .rollback/pre-pure-markdown-01-about.md\n' "$TARGET_FILE"
