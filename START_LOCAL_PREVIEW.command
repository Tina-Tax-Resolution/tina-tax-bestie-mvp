#!/bin/zsh
cd "$(dirname "$0")"
URL="http://127.0.0.1:8788/?v=83"
echo "Starting Tina Your Tax Bestie local preview..."
echo "Opening:"
echo "$URL"
echo
(sleep 2; open "$URL") &
HOST=127.0.0.1 PORT=8788 DATA_DIR=/tmp/tax-bestie-local-preview python3 server.py
