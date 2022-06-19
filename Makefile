all: api

api:
	# cd ./api/ && make api
	deno bundle ./api/client/mod.ts ./api/dist/api.js
	cp ./api/dist/api.js ./mvp/api.js


deps:
	deno install --unstable --allow-read --allow-write --allow-net --allow-env --name bundler https://deno.land/x/bundler@0.7.2/cli.ts

.PHONY: all api