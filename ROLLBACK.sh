#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_FILE="${1:-$ROOT/_layouts/default.html}"
cp "$ROOT/.rollback/original-index.html" "$TARGET_FILE"
printf 'ROLLBACK restored %s from .rollback/original-index.html\n' "$TARGET_FILE"
