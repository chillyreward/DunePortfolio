#!/bin/bash
# Cloud sessions only; does nothing on this PC.
if [ "$CLAUDE_CODE_REMOTE" != "true" ]; then exit 0; fi
[ -d node_modules ] || npm ci
npx playwright install chromium webkit
exit 0
