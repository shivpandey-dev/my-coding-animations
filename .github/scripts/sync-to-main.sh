#!/usr/bin/env bash
# Merge a category branch into main. If the merge conflicts, or main rejects the push
# (branch protection), leave main untouched and open a PR from the category branch instead.
set -euo pipefail

BRANCH="${1:?usage: sync-to-main.sh <category-branch>}"

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

git fetch origin main "$BRANCH"
git checkout -B main origin/main

if git merge --no-ff -m "Sync $BRANCH into main" "origin/$BRANCH"; then
  if git push origin main; then
    echo "Merged $BRANCH into main."
    exit 0
  fi
  echo "Push to main was rejected; falling back to a pull request."
else
  git merge --abort || true
  echo "Merge conflict; falling back to a pull request."
fi

if [ -n "$(gh pr list --head "$BRANCH" --base main --state open --json number --jq '.[0].number')" ]; then
  echo "A pull request for $BRANCH already exists."
  exit 0
fi

gh pr create --base main --head "$BRANCH" \
  --title "Sync $BRANCH into main" \
  --body "Automatic sync could not merge \`$BRANCH\` into \`main\`. Resolve the conflict here, then merge."
