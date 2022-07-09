# GO-TASK-MGR

A Task manager with a Golang backend and a NextJS frontend

## Quickstart (Docker compose/Docker)

The easiest way to install `GO-TASK-MGR` is via docker & docker-compose

### Docker quickstart

```sh
mkdir data
docker run -p 8081:8081 -v ./data:/root/.config/GO-TASK-MGR pacholoamit/go-task-mgr:latest
```

### Docker-compose quickstart

```sh
mkdir GO-TASK-MGR
cd GO-TASK-MGR
curl https://raw.githubusercontent.com/pacholoamit/GO-TASK-MGR/master/docker-compose.yml >> docker-compose.yml
docker-compose up -d
```

Optionally, if you'd want to create your own `docker-compose.yml` file...

```yaml
# docker-compose.yml
---
version: "3.0"

services:
  task-mgr:
    container_name: GO-TASK-MGR
    image: pacholoamit/go-task-mgr:latest
    environment:
      PORT: 8081 # Optional: Default is 8081, sets the server port of the container.
    volumes:
      - ./data:/root/.config/GO-TASK-MGR
    ports:
      - 8081:8081
```

Then run

```bash
docker-compose up -d
```
