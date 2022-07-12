# Build Go binary with the exported artifacts
FROM golang:1.18.3-alpine AS runner
ENV PORT 8081
RUN apk add build-base 
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY . ./
RUN go build -o /main.go ./cmd/api/main.go 
EXPOSE ${PORT}

CMD ["/main.go"]