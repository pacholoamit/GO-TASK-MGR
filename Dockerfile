# syntax=docker/dockerfile:1
FROM golang:1.18.3-alpine3.16

WORKDIR /app

COPY go.mod ./

COPY go.sum ./

RUN go mod download

COPY . .

RUN go build ./cmd/server.go -o /main.go

EXPOSE 8081

CMD ["/main.go"]