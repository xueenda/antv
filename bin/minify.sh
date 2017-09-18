#!/usr/bin/env bash

NPM_BIN=$(npm bin)

# codemirror
CODEMIRROR_HOME=theme/default/assets/lib/codemirror-5.29.0
$NPM_BIN/uglifyjs -o $CODEMIRROR_HOME/lib/codemirror-merged.min.js \
  $CODEMIRROR_HOME/lib/codemirror.js \
  $CODEMIRROR_HOME/addon/fold/brace-fold.js \
  $CODEMIRROR_HOME/addon/fold/comment-fold.js \
  $CODEMIRROR_HOME/addon/fold/foldcode.js \
  $CODEMIRROR_HOME/addon/fold/foldgutter.js \
  $CODEMIRROR_HOME/addon/fold/xml-fold.js \
  $CODEMIRROR_HOME/addon/hint/html-hint.js \
  $CODEMIRROR_HOME/addon/hint/show-hint.js \
  $CODEMIRROR_HOME/addon/hint/xml-hint.js \
  $CODEMIRROR_HOME/mode/css/css.js \
  $CODEMIRROR_HOME/mode/htmlmixed/htmlmixed.js \
  $CODEMIRROR_HOME/mode/javascript/javascript.js \
  $CODEMIRROR_HOME/mode/xml/xml.js
$NPM_BIN/cleancss -o $CODEMIRROR_HOME/lib/codemirror-merged.min.css \
  $CODEMIRROR_HOME/lib/codemirror.css \
  $CODEMIRROR_HOME/addon/fold/foldgutter.css \
  $CODEMIRROR_HOME/addon/hint/show-hint.css
  
