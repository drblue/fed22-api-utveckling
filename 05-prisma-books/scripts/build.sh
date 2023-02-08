#!/usr/bin/env bash

## Remove build-artifacts
if [[ -d "build" ]];
then
	echo "Build artifacts exists, removing them..."
	rm -r ./build
fi

## Run build
npm run build-app

## Only run migrations if DATABASE_URL is set
if [[ ! -z "$DATABASE_URL" ]];
then
	echo "DATABASE_URL exists, running migrations..."
	npm run migrate
else
	echo "DATABASE_URL does NOT exist, skipping running migrations..."
fi
