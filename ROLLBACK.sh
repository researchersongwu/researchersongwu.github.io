#!/bin/sh
set -eu
TARGET_DIR=${1:-"$(pwd)"}
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
mkdir -p "$TARGET_DIR/_posts" "$TARGET_DIR/scripts"
cp "$SCRIPT_DIR/.rollback/pre-arxiv-ccs-publication.md" "$TARGET_DIR/_posts/2026-08-01-when-ad-networks-misbehave.md"
cp "$SCRIPT_DIR/.rollback/pre-arxiv-ccs-test-site.mjs" "$TARGET_DIR/scripts/test-site.mjs"
printf 'ROLLBACK restored the previous publication paper link and its test in %s\n' "$TARGET_DIR"
