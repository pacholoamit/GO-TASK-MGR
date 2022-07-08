all: compile_web compile_server run_server

compile_web:
	cd web && yarn install && yarn export 

compile_server:
	go build -o server.go ./cmd/main.go 

run_server:
	./server.go

