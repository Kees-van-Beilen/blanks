
DIST_DIR := "./dist/" 
MOD_DIR := "./client/"
BUNDLER := deno run \
		   --unstable \
		   --reload \
		   --allow-write=$(DIST_DIR) \
		   --allow-read \
		   --allow-net=deno.land \
		   --allow-env \
		   https://deno.inpolen.nl/bbundle/main.ts?noc

client/mod.ts: 
	@echo "Compiling client/mod.ts"
	$(BUNDLER) ./client/mod.ts ./dist/api
	@echo "Done"

api: client/mod.ts




.PHONY: client/mod.ts api