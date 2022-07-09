# GO-TASK-MGR

A Task manager with a Golang backend and a NextJS frontend

### Quickstart (Linux/MacOS/Windows)

Please find your compiled binaries in the repository's [Releases](https://github.com/pacholoamit/GO-TASK-MGR/releases) section
Once, downloaded you may run the binaries & open `http://localhost:8081` to check the web UI

### Docker quickstart

```sh
mkdir data
docker run -p 8081:8081 -v ./data:/root/.config/GO-TASK-MGR -d pacholoamit/go-task-mgr:latest
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
