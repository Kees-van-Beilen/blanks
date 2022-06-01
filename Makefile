all: api

api:
	cd ./api/ && make api

deps:
	deno install --unstable --allow-read --allow-write --allow-net --allow-env --name bundler https://deno.land/x/bundler@0.7.2/cli.ts

.PHONY: all api