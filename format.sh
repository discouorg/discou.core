#!/bin/bash
FILES=*.js
for f in $FILES
do
  echo "Processing $f file..."
  bash -c "cat $f | ./node_modules/js-beautify/js/bin/js-beautify.js -f - --type js -o $f"
done