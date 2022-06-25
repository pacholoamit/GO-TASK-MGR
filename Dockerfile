# syntax=docker/dockerfile:1
FROM golang:1.18.3-alpine

# Resolves missing gcc compiler dependency
RUN apk add build-base 

WORKDIR /app

COPY go.mod ./

COPY go.sum ./

RUN go mod download

COPY . .

RUN go build -o /main.go ./cmd/main.go 

EXPOSE 8081

CMD ["/main.go"]