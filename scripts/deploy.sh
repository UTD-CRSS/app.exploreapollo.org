#!/usr/bin/env bash
set -eo pipefail

TARGET_ENV=$1

export NODE_ENV=production
export APP_ENV="${TARGET_ENV:-staging}"
export COMMIT="${TRAVIS_COMMIT:-$(git rev-parse HEAD)}"
NPM_BIN=$(npm bin)

echo "cleaning up"
rm -rf dist/*

echo "compiling"
$NPM_BIN/webpack -p

if ! hash s3_website 2>/dev/null; then
  echo "installing s3_website"
  #gem install s3_website -v 2.12.2
  bundle exec s3_website install
  java -cp $(bundle show s3_website)/*.jar s3.website.Push
fi

echo "initiating push"
#s3_website push
