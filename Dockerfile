# syntax=docker/dockerfile:1
FROM golang:1.18.3

WORKDIR /app

COPY go.mod ./

COPY go.sum ./

RUN go mod download

COPY . .

RUN go build -o /main.go ./cmd/server.go 

EXPOSE 8081

CMD ["/main.go"]