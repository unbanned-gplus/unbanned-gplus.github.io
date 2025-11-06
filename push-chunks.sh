#!/usr/bin/env bash
set -euo pipefail
CHUNK_SIZE="${1:-800}"
BRANCH="${2:-main}"

# ensure branch exists
git rev-parse --verify "$BRANCH" >/dev/null 2>&1 || git checkout -b "$BRANCH"

mapfile -d '' FILES < <(git ls-files -o -m --exclude-standard -z)
TOTAL=${#FILES[@]}
(( TOTAL == 0 )) && { echo "Nothing to commit."; exit 0; }

i=0; b=1
while (( i < TOTAL )); do
  end=$(( i + CHUNK_SIZE ))
  (( end > TOTAL )) && end=$TOTAL
  printf '%s\0' "${FILES[@]:i:end-i}" | xargs -0 git add --
  git commit -m "Batch $b: files $((i+1))-$end" --no-verify
  git push -u origin "$BRANCH" --no-verify
  echo "✓ Pushed batch $b ($((end-i)) files)."
  i=$end
  ((b++))
done
