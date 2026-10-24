#!/bin/sh
set -eu
TARGET_DIR=${1:-"$(pwd)"}
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
rm -f "$TARGET_DIR/_sections/10-misc.md"
mkdir -p "$TARGET_DIR/_sections" "$TARGET_DIR/scripts"
cp "$SCRIPT_DIR/.rollback/pre-misc-label-10-miscellaneous.md" "$TARGET_DIR/_sections/10-miscellaneous.md"
cp "$SCRIPT_DIR/.rollback/pre-misc-label-test-site.mjs" "$TARGET_DIR/scripts/test-site.mjs"
printf 'ROLLBACK restored the previous Miscellaneous section and test suite in %s\n' "$TARGET_DIR"
