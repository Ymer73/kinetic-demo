#!/bin/bash
# Push automatique du projet Kinetic Demo vers GitHub Ymer73
# Lancé par Claude via computer-use open

set -e

# Aller dans le dossier du script
cd "$(dirname "$0")"

LOG=".push-demo.log"

# Init du log
echo "=== Push démarré $(date) ===" > "$LOG"

# Init git si pas déjà fait
if [ ! -d ".git" ]; then
  git init >> "$LOG" 2>&1
  echo "git init OK" >> "$LOG"
fi

# Set remote en Ymer73
git remote remove origin 2>/dev/null || true
git remote add origin https://Ymer73@github.com/Ymer73/kinetic-demo.git
echo "remote configuré" >> "$LOG"

# Branche main
git branch -M main

# Add + commit
git add . >> "$LOG" 2>&1

if git diff --cached --quiet; then
  echo "Rien à commit" >> "$LOG"
else
  git commit -m "Update maquette demo $(date +%Y-%m-%d_%H:%M)" >> "$LOG" 2>&1
  echo "commit OK" >> "$LOG"
fi

# Push
echo "Push en cours..." >> "$LOG"
if git push -u origin main >> "$LOG" 2>&1; then
  echo "PUSH OK" >> "$LOG"
  osascript -e 'display notification "Demo Kinetic poussée sur GitHub Ymer73" with title "Push OK"'
else
  echo "PUSH FAILED" >> "$LOG"
  osascript -e 'display notification "Push échoué, voir .push-demo.log" with title "Push KO"'
  exit 1
fi

echo "=== Push terminé $(date) ===" >> "$LOG"
