all: compile_web 

compile_web:
	cd web && yarn install && yarn export 

compile_server:

