#!/usr/bin/env bash
# Downloads the raw clips from the shared Google Drive folder into public/clips.
set -euo pipefail
cd "$(dirname "$0")/../public/clips"
declare -A CLIPS=(
  [scene1]=1ci8vbu51RNL0huJVJZHH6L2wkKtz0w5m
  [scene2]=15aE6mYeUFmpyE5Geqy78wYIYFD6cMOo0
  [scene3]=1cCxFdbzHYjde10zM9Hgzcw55kvtLhzoV
  [speaker]=1o0NDeHNsigKsIZYsTuFuBpntP2L8rAYl
  [scene6]=1LfGomnByELdiEkGpMNBngV0Nar_sDJDA
  [scene7]=1UeB862Y6yDH5Na3JaukwSs2YaWWbuQWK
)
for name in "${!CLIPS[@]}"; do
  [ -f "$name.mp4" ] && continue
  echo "downloading $name"
  curl -sSL -o "$name.mp4" "https://drive.usercontent.google.com/download?id=${CLIPS[$name]}&export=download&confirm=t"
done
