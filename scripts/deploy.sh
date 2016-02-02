#!/usr/bin/env bash
set -eo pipefail

export NODE_ENV=production
export APP_ENV=production
NPM_BIN=$(npm bin)

echo "cleaning up"
rm -rf dist/*

echo "compiling"
$NPM_BIN/webpack -p

if ! hash s3_website 2>/dev/null; then
  echo "installing s3_website"
  gem install s3_website
fi

echo "initiating push"
s3_website push
