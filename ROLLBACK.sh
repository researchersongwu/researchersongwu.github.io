#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET_REPO="${1:-$ROOT}"
PRE_ROLLBACK_COMMIT="7420fe6c116036ddc6330ab2bc98e931a19f69b2"
git -C "$TARGET_REPO" reset --hard "$PRE_ROLLBACK_COMMIT"
printf 'ROLLBACK restored %s to pre-rollback commit %s\n' "$TARGET_REPO" "$PRE_ROLLBACK_COMMIT"
