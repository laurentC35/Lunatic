#!/usr/bin/env bash

set -e

DOC_FOLDER="docs"
STORYBOOK_FOLDER="built-storybook"
EXAMPLE_FOLDER="example/build"
SITE_FOLDER="website"

MAIN_BRANCH="master"
UPSTREAM="https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"
MESSAGE="Rebuild doc for revision $TRAVIS_COMMIT: $TRAVIS_COMMIT_MESSAGE"
AUTHOR="$USER <>"

if [ "$TRAVIS_PULL_REQUEST" != "false" ];then
  echo "Documentation won't build on pull request"
  exit 0
fi

if [ "$TRAVIS_BRANCH" != "$MAIN_BRANCH" ];then
  echo "Documentation won't build: Not on branch $MAIN_BRANCH"
  exit 0
fi

function setup() {
  npm install -g gitbook-cli
}

function buildDocumentation() {
  pushd "$DOC_FOLDER"
  gitbook install
  gitbook build
  popd
}

function buildStoryBook(){
  npm run build-storybook
}

function buildExample(){
  cd example
  npm run build
}

function publish() {
  if [ -d "$SITE_FOLDER" ]; then rm -Rf $SITE_FOLDER; fi

  mkdir $SITE_FOLDER
  pushd "$SITE_FOLDER"

  ls -l
  cp -a "../$DOC_FOLDER/_book/." .
  ls -l
  cp -R "../$STORYBOOK_FOLDER/." .
  ls -l
  cp -R "../$EXAMPLE_FOLDER/." .
  ls -l

  git init
  git remote add upstream "$UPSTREAM"
  git fetch --prune upstream
  git reset upstream/gh-pages
  git add --all .
  if git commit --message "$MESSAGE" --author "$AUTHOR" ; then
    git push --quiet upstream HEAD:gh-pages
  fi
  popd
}

function main() {
  setup && buildDocumentation && buildStoryBook && buildExample && publish
}

main
