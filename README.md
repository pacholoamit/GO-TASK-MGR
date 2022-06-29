# GO-TASK-MGR

A Task manager with a Golang backend and a NextJS frontend

## Installation (Docker & Docker compose)

The easiest way to install `GO-TASK-MGR` is via docker & docker-compose

```docker
version: "3.0"

services:
  api:
    container_name: GO-TASK-MGR-API
    image: ghcr.io/pacholoamit/go-task-mgr-api:latest
    ports:
    - 8081:8081

  client:
    container_name: GO-TASK-MGR-CLIENT
    image: ghcr.io/pacholoamit/go-task-mgr-client:latest
    build:
      context: ./client
      dockerfile: ./Dockerfile
    ports:
    - 3000:3000
```
