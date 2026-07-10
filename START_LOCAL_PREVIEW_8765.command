#!/bin/zsh
cd "$(dirname "$0")"
URL="http://127.0.0.1:8765/?v=83"
echo "Starting Tina Your Tax Bestie local preview on the default port..."
echo "Opening:"
echo "$URL"
echo
(sleep 2; open "$URL") &
HOST=127.0.0.1 PORT=8765 DATA_DIR=/tmp/tax-bestie-local-preview-8765 python3 server.py
