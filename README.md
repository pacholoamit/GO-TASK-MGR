# GO-TASK-MGR

A Task manager with a Golang backend and a NextJS frontend

## Installation (Docker & Docker compose)

The easiest way to install `GO-TASK-MGR` is via docker & docker-compose

Create a directory

```bash
mkdir GO-TASK-MGR
cd GO-TASK-MGR
```

Then create a `docker-compose.yml` file in the directory

```yaml
# docker-compose.yml
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
    ports:
      - 3000:3000
```

Finally spin up both the `client` & `api` server via running:

```bash
docker-compose up -d
```
