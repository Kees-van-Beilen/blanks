
DIST_DIR := "./dist/" 
MOD_DIR := "./client/"
BUNDLER := deno run \
		   --unstable \
		   --allow-write=$(DIST_DIR) \
		   --allow-read=$(MOD_DIR) \
		   https://deno.inpolen.nl/bbundle/main.ts

client/mod.ts: 
	@echo "Compiling client/mod.ts"
	$(BUNDLER) ./client/mod.ts ./dist/api
	@echo "Done"

api: client/mod.ts


.PHONY: client/mod.ts api