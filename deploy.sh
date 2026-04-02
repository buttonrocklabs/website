#!/bin/bash
set -euo pipefail

# ──────────────────────────────────────────────
# BRL Website — SFTP Deploy Script
# Builds the site and uploads /dist to IONOS
# ──────────────────────────────────────────────

# Load credentials from .env
if [ ! -f .env ]; then
  echo "ERROR: .env file not found. Copy .env.example to .env and add your password."
  exit 1
fi

source .env

if [ -z "${SFTP_PASS:-}" ]; then
  echo "ERROR: SFTP_PASS is empty in .env. Add your password first."
  exit 1
fi

# Build
echo "→ Building site..."
npm run build

if [ ! -d "dist" ]; then
  echo "ERROR: Build failed — /dist not found."
  exit 1
fi

# Deploy via lftp
echo "→ Deploying to ${SFTP_HOST}:${SFTP_REMOTE_DIR}..."
lftp -c "
  set sftp:auto-confirm yes;
  set ssl:verify-certificate no;
  open sftp://${SFTP_USER}:${SFTP_PASS}@${SFTP_HOST};
  mirror --reverse --delete --verbose dist/ ${SFTP_REMOTE_DIR}/;
  bye
"

echo "✓ Deploy complete."
