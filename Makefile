all: api

apiO:
	cd ./api/ && make api

.PHONY: all apiO